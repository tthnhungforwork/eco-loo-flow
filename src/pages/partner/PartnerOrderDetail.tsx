import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PartnerHeader from "./components/PartnerHeader";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  CheckCircle2, Circle, XCircle, MapPin, Phone, User, Mail, Bath,
  Building2, Calendar, FileText, Clock, ChevronDown, ChevronUp,
  Users, ClipboardCheck, DollarSign, FileSignature, Upload, Send,
  Plus, Trash2, Eye, Pencil
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useOrders } from "@/contexts/OrderContext";
import {
  MOCK_PARTNER_STAFF, ORDER_STATUS_CONFIG,
  SERVICE_TYPE_CONFIG, SERVICE_STEPS, QUOTATION_CATEGORIES,
  type StaffMember, type QuotationItem, type SurveyToiletItem, type SurveyEquipment,
  type OrderTask, type OperationalReport
} from "@/data/orderData";

type SheetType = "accept" | "reject" | "staff" | "survey_form" | "equip_form" | "quote_item" | "contract" | "bbnt" | "tlhd" | null;

const TABS = [
  { key: "info", label: "Đơn hàng mới" },
  { key: "quote", label: "Tư vấn/Báo giá" },
  { key: "contract", label: "Hợp đồng" },
  { key: "execute", label: "Thực hiện" },
  { key: "settle", label: "Nghiệm thu" },
];

const SURVEY_SUB_TABS = ["Tổng quan", "Thiết bị", "CP sinh học", "Đánh giá"];

const PartnerOrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { getOrder, advanceOrder, assignStaff, updateOrder } = useOrders();

  const [activeTab, setActiveTab] = useState("info");
  const [activeSheet, setActiveSheet] = useState<SheetType>(null);
  const [showTimeline, setShowTimeline] = useState(false);
  const [surveySubTab, setSurveySubTab] = useState(0);
  const [selectedToiletIdx, setSelectedToiletIdx] = useState(0);
  const [partnerExecSubTab, setPartnerExecSubTab] = useState("stats");

  // Staff selection
  const [selectedStaff, setSelectedStaff] = useState<number[]>([]);

  // Survey form
  const [surveyForm, setSurveyForm] = useState<Partial<SurveyToiletItem>>({});
  const [editingSurveyIdx, setEditingSurveyIdx] = useState<number | null>(null);

  // Equipment form
  const [equipForm, setEquipForm] = useState<Partial<SurveyEquipment>>({});

  // Quotation
  const [quoteItem, setQuoteItem] = useState<Partial<QuotationItem>>({ category: "thiet_bi", categoryLabel: "Thiết bị" });
  const [paymentTerms, setPaymentTerms] = useState("");
  const [bankInfo, setBankInfo] = useState("STK: 0123456789 - Ngân hàng Vietcombank - Eco Clean Co.");

  // Contract
  const [contractNo, setContractNo] = useState("");
  const [contractTerms, setContractTerms] = useState("");
  const [contractDuration, setContractDuration] = useState("");

  // BBNT
  const [bbntNotes, setBbntNotes] = useState("");
  const [bbntItems, setBbntItems] = useState<string[]>([]);
  const [bbntNewItem, setBbntNewItem] = useState("");

  // TLHD
  const [tlhdNotes, setTlhdNotes] = useState("");
  const [tlhdDeductions, setTlhdDeductions] = useState("");

  const order = getOrder(orderId || "");
  if (!order) {
    return (
      <div className="min-h-screen">
        <PartnerHeader title="Chi tiết đơn hàng" />
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-muted-foreground">Không tìm thấy đơn hàng</p>
          <Button variant="outline" className="mt-4" onClick={() => navigate("/partner/orders")}>Quay lại</Button>
        </div>
      </div>
    );
  }

  const serviceConfig = SERVICE_TYPE_CONFIG[order.type];
  const ServiceIcon = serviceConfig.icon;
  const statusConfig = ORDER_STATUS_CONFIG[order.status];
  const steps = SERVICE_STEPS[order.type];
  const currentStepIndex = steps.indexOf(order.status);
  const hasKhaoSat = steps.includes("dang_khao_sat");

  // Determine which tabs are available based on service type and status
  const getAvailableTabs = () => {
    const statusIdx = steps.indexOf(order.status);
    const tabs = [TABS[0]]; // Đơn hàng mới always visible

    const quoteStatusIdx = steps.indexOf("da_bao_gia");
    if (quoteStatusIdx >= 0 && statusIdx >= steps.indexOf(hasKhaoSat ? "da_tiep_nhan" : "da_tiep_nhan")) tabs.push(TABS[1]); // Tư vấn/Báo giá
    if (steps.includes("da_ky_hop_dong") && statusIdx >= steps.indexOf("da_duyet_bao_gia")) tabs.push(TABS[2]); // Hợp đồng
    if (statusIdx >= steps.indexOf("da_ky_hop_dong")) tabs.push(TABS[3]); // Thực hiện
    if (statusIdx >= steps.indexOf("hoan_thanh")) tabs.push(TABS[4]); // Nghiệm thu

    return tabs;
  };

  const availableTabs = getAvailableTabs();

  // Handlers
  const handleAccept = () => {
    if (selectedStaff.length === 0) {
      toast.error("Vui lòng chọn tư vấn viên phụ trách");
      return;
    }
    const staffMembers = MOCK_PARTNER_STAFF.filter(s => selectedStaff.includes(s.id));
    assignStaff(orderId || "", staffMembers);
    advanceOrder(orderId || "", "da_tiep_nhan", `Tiếp nhận đơn hàng. Tư vấn viên: ${staffMembers.map(s => s.name).join(", ")}`, "Eco Clean Co.");
    toast.success("Đã tiếp nhận đơn hàng!");
    setActiveSheet(null);
    setSelectedStaff([]);
  };

  const handleReject = () => {
    advanceOrder(orderId || "", "da_huy", "Đối tác từ chối đơn hàng", "Eco Clean Co.");
    toast.info("Đã từ chối đơn hàng");
    setActiveSheet(null);
    navigate("/partner/orders");
  };

  // Survey
  const handleSaveSurveyItem = () => {
    if (!surveyForm.toiletName) { toast.error("Nhập tên NVS"); return; }
    const items = [...(order.surveyItems || [])];
    const item: SurveyToiletItem = {
      toiletName: surveyForm.toiletName || "",
      area: surveyForm.area || "",
      toiletType: surveyForm.toiletType || "",
      usageFrequency: surveyForm.usageFrequency || "",
      condition: surveyForm.condition || "",
      equipmentCondition: surveyForm.equipmentCondition || "",
      notes: surveyForm.notes || "",
    };
    if (editingSurveyIdx !== null) {
      items[editingSurveyIdx] = item;
    } else {
      items.push(item);
    }
    updateOrder(orderId || "", { surveyItems: items });
    setActiveSheet(null);
    setSurveyForm({});
    setEditingSurveyIdx(null);
    toast.success("Đã lưu thông tin khảo sát");
  };

  const handleSaveEquipment = () => {
    if (!equipForm.name) { toast.error("Nhập tên thiết bị"); return; }
    const equips = [...(order.surveyEquipment || [])];
    equips.push({
      id: `eq-${Date.now()}`,
      name: equipForm.name || "",
      quantity: equipForm.quantity || 1,
      condition: equipForm.condition || "",
      description: equipForm.description || "",
    });
    updateOrder(orderId || "", { surveyEquipment: equips });
    setActiveSheet(null);
    setEquipForm({});
    toast.success("Đã thêm thiết bị");
  };

  const handleCompleteSurvey = () => {
    advanceOrder(orderId || "", "dang_khao_sat", "Hoàn tất khảo sát thông tin NVS", "Eco Clean Co.", {
      surveyCompleted: true,
    });
    toast.success("Đã hoàn tất khảo sát!");
    setActiveTab("quote");
  };

  // Quotation
  const handleAddQuoteItem = () => {
    if (!quoteItem.name || !quoteItem.quantity || !quoteItem.unitPrice) {
      toast.error("Vui lòng điền đầy đủ thông tin");
      return;
    }
    const items = [...(order.quotationItems || [])];
    const total = (quoteItem.quantity || 0) * (quoteItem.unitPrice || 0);
    items.push({
      id: `qi-${Date.now()}`,
      category: quoteItem.category as any || "thiet_bi",
      categoryLabel: quoteItem.categoryLabel || "Thiết bị",
      name: quoteItem.name || "",
      unit: quoteItem.unit || "cái",
      quantity: quoteItem.quantity || 0,
      unitPrice: quoteItem.unitPrice || 0,
      total,
    });
    const newTotal = items.reduce((sum, i) => sum + i.total, 0);
    updateOrder(orderId || "", { quotationItems: items, quotationTotal: newTotal });
    setActiveSheet(null);
    setQuoteItem({ category: "thiet_bi", categoryLabel: "Thiết bị" });
    toast.success("Đã thêm hạng mục");
  };

  const handleRemoveQuoteItem = (idx: number) => {
    const items = [...(order.quotationItems || [])];
    items.splice(idx, 1);
    const newTotal = items.reduce((sum, i) => sum + i.total, 0);
    updateOrder(orderId || "", { quotationItems: items, quotationTotal: newTotal });
  };

  const handleSendQuotation = () => {
    if (!order.quotationItems?.length) { toast.error("Chưa có hạng mục báo giá nào"); return; }
    const formatted = (order.quotationTotal || 0).toLocaleString("vi-VN") + "đ";
    advanceOrder(orderId || "", "da_bao_gia", `Gửi báo giá: ${formatted}`, "Eco Clean Co.", {
      amount: formatted,
      quotationPaymentTerms: paymentTerms,
      quotationBankInfo: bankInfo,
    });
    toast.success("Đã gửi báo giá cho khách hàng!");
  };

  // Contract
  const handleSendContract = () => {
    if (!contractNo) { toast.error("Nhập số hợp đồng"); return; }
    advanceOrder(orderId || "", "da_ky_hop_dong", "Hợp đồng đã được ký kết", "Eco Clean Co.", {
      contract: {
        contractNo,
        partyA: order.customerName,
        partyB: "Eco Clean Co.",
        value: order.amount || "",
        terms: contractTerms,
        duration: contractDuration,
        signedDate: new Date().toLocaleDateString("vi-VN"),
      },
    });
    toast.success("Đã ký và gửi hợp đồng!");
    setActiveSheet(null);
  };

  // Execution - assign staff & start
  const handleStartExecution = () => {
    if (selectedStaff.length === 0) { toast.error("Chọn nhân viên thực hiện"); return; }
    const staffMembers = MOCK_PARTNER_STAFF.filter(s => selectedStaff.includes(s.id));
    // Generate tasks from toilets and quotation items
    const tasks: OrderTask[] = [];
    const toilets = order.toilets.length > 0 ? order.toilets : (order.surveyItems || []).map(s => s.toiletName);
    toilets.forEach((toilet, tIdx) => {
      tasks.push({
        id: `task-${Date.now()}-${tIdx}`,
        title: `${order.typeLabel} - ${toilet}`,
        toiletName: toilet,
        assignee: staffMembers[tIdx % staffMembers.length]?.name,
        status: "pending",
        scheduledDate: new Date(Date.now() + (tIdx + 1) * 86400000).toLocaleDateString("vi-VN"),
      });
    });
    if (tasks.length === 0) {
      tasks.push({
        id: `task-${Date.now()}-0`,
        title: `${order.typeLabel} - ${order.name}`,
        assignee: staffMembers[0]?.name,
        status: "pending",
        scheduledDate: new Date(Date.now() + 86400000).toLocaleDateString("vi-VN"),
      });
    }
    assignStaff(orderId || "", staffMembers);
    advanceOrder(orderId || "", "dang_thuc_hien", `Bắt đầu thực hiện. NV: ${staffMembers.map(s => s.name).join(", ")}`, "Eco Clean Co.", {
      orderTasks: tasks,
    });
    toast.success("Đã bắt đầu thực hiện!");
    setActiveSheet(null);
    setSelectedStaff([]);
  };

  // BBNT
  const handleSendBBNT = () => {
    advanceOrder(orderId || "", "cho_nghiem_thu", "Gửi biên bản nghiệm thu cho khách hàng", "Eco Clean Co.", {
      acceptanceReport: {
        completedItems: bbntItems,
        notes: bbntNotes,
        sentDate: new Date().toLocaleDateString("vi-VN"),
      },
    });
    toast.success("Đã gửi BBNT cho khách hàng!");
    setActiveSheet(null);
  };

  // TLHD
  const handleSendTLHD = () => {
    advanceOrder(orderId || "", "da_thanh_ly", "Ký và gửi biên bản thanh lý hợp đồng", "Eco Clean Co.", {
      settlement: {
        finalAmount: order.amount || "",
        deductions: tlhdDeductions,
        notes: tlhdNotes,
        signedDate: new Date().toLocaleDateString("vi-VN"),
      },
    });
    toast.success("Đã ký và gửi biên bản TLHĐ!");
    setActiveSheet(null);
  };

  const toggleStaff = (id: number) => {
    setSelectedStaff(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  // ======================== RENDER ========================
  const renderSurveyOverview = (item: SurveyToiletItem) => (
    <div className="space-y-3 text-[13px]">
      <p className="text-xs font-bold text-foreground">Thông tin khảo sát</p>
      {[
        { label: "Loại hình nhà vệ sinh", value: item.toiletType },
        { label: "Tình trạng", value: item.condition || "(Select)" },
        { label: "Độ tuổi", value: item.area || "(Nhập text dạng khoảng)" },
        { label: "Tần suất sử dụng", value: item.usageFrequency || "(Select: Thường xuyên/ít)" },
        { label: "Công năng", value: "(Select chọn nhiều)" },
        { label: "Địa điểm xây dựng", value: "(Select Gần liền tòa nhà)" },
        { label: "Diện tích", value: item.area || "(Nhập số + m2)" },
        { label: "Tình trạng", value: item.equipmentCondition || "(Cũ/Mới/Hỏng/Cần cải tạo)" },
        { label: "Tần suất dọn dẹp", value: "(Select)" },
      ].map((row, i) => (
        <div key={i}>
          <span className="font-semibold text-foreground">{row.label}: </span>
          <span className="text-muted-foreground">{row.value}</span>
        </div>
      ))}
    </div>
  );

  const renderSurveyEquipmentList = () => (
    <div className="space-y-2">
      {(!order.surveyEquipment || order.surveyEquipment.length === 0) ? (
        <p className="text-xs text-muted-foreground text-center py-6">Chưa có dữ liệu thiết bị</p>
      ) : (
        order.surveyEquipment.map((eq, idx) => (
          <div key={idx} className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/30">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-[10px] font-bold text-accent-foreground">{eq.quantity}</div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-foreground">{eq.name}</p>
              <p className="text-[10px] text-muted-foreground">{eq.condition} {eq.description && `· ${eq.description}`}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );

  const renderInfoTab = () => {
    const surveyItems = order.surveyItems || [];
    const toiletNames = order.toilets.length > 0
      ? order.toilets
      : surveyItems.map(s => s.toiletName);
    const currentToilet = surveyItems[selectedToiletIdx];
    const showSurvey = hasKhaoSat && steps.indexOf(order.status) >= steps.indexOf("da_tiep_nhan");

    return (
      <div className="space-y-5">
        {/* Thông tin đơn hàng */}
        <div>
          <p className="text-sm font-bold text-foreground mb-3">Thông tin đơn hàng</p>
          <div className="space-y-2 text-[13px]">
            {[
              { label: "Đơn hàng", value: order.id },
              { label: "Ngày đăng ký", value: order.createdAt },
              { label: "Dịch vụ", value: order.typeLabel },
              { label: "Tên khách hàng", value: order.customerName },
              { label: "Số điện thoại", value: order.customerPhone },
              { label: "Địa chỉ", value: order.address },
              { label: "Mô tả", value: order.content },
            ].map((row, i) => (
              <div key={i}>
                <span className="font-semibold text-foreground">{row.label}: </span>
                <span className="text-muted-foreground">{row.value || "—"}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Thông tin khảo sát */}
        {showSurvey && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-bold text-foreground">Thông tin khảo sát</p>
              {order.status === "da_tiep_nhan" && (
                <Button size="sm" variant="outline" className="h-7 text-[11px] gap-1 rounded-lg" onClick={() => { setSurveyForm({}); setEditingSurveyIdx(null); setActiveSheet("survey_form"); }}>
                  <Plus size={12} /> Thêm NVS
                </Button>
              )}
            </div>

            {/* Survey sub-tabs */}
            <div className="flex gap-4 border-b border-border/50 mb-3">
              {SURVEY_SUB_TABS.map((t, i) => (
                <button
                  key={t}
                  onClick={() => setSurveySubTab(i)}
                  className={`pb-2 text-xs font-medium transition-colors relative ${
                    surveySubTab === i ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  {t}
                  {surveySubTab === i && (
                    <motion.div layoutId="surveySubTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                  )}
                </button>
              ))}
            </div>

            {/* Toilet chips */}
            {toiletNames.length > 0 && (
              <div className="flex gap-2 overflow-x-auto scrollbar-hide mb-4 pb-1">
                {toiletNames.map((name, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedToiletIdx(i)}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all ${
                      selectedToiletIdx === i
                        ? "gradient-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            )}

            {/* Sub-tab content */}
            <AnimatePresence mode="wait">
              <motion.div key={`${surveySubTab}-${selectedToiletIdx}`} initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.15 }}>
                {surveySubTab === 0 && (
                  currentToilet ? (
                    <div>
                      {renderSurveyOverview(currentToilet)}
                      {order.status === "da_tiep_nhan" && (
                        <button className="mt-2 text-primary text-xs font-medium flex items-center gap-1" onClick={() => { setSurveyForm(currentToilet); setEditingSurveyIdx(selectedToiletIdx); setActiveSheet("survey_form"); }}>
                          <Pencil size={12} /> Chỉnh sửa
                        </button>
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground text-center py-6">Chưa có dữ liệu khảo sát. Nhấn "Thêm NVS" để bắt đầu.</p>
                  )
                )}
                {surveySubTab === 1 && renderSurveyEquipmentList()}
                {surveySubTab === 2 && (
                  <div className="text-xs text-muted-foreground text-center py-6">Chưa có dữ liệu chế phẩm sinh học</div>
                )}
                {surveySubTab === 3 && (
                  <div className="text-xs text-muted-foreground text-center py-6">Chưa có đánh giá khảo sát</div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Complete survey */}
            {order.status === "da_tiep_nhan" && (surveyItems.length > 0) && (
              <Button className="w-full h-11 rounded-2xl font-bold gap-1.5 gradient-primary border-0 shadow-glow text-primary-foreground mt-4" onClick={handleCompleteSurvey}>
                <CheckCircle2 size={16} /> Hoàn thành khảo sát
              </Button>
            )}
            {order.surveyCompleted && (
              <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-center mt-3">
                <p className="text-xs font-bold text-primary flex items-center justify-center gap-1.5"><CheckCircle2 size={14} /> Khảo sát đã hoàn tất</p>
              </div>
            )}
          </div>
        )}

        {/* Accept/Reject */}
        {order.status === "cho_tiep_nhan" && (
          <div className="flex gap-2.5">
            <Button variant="outline" className="flex-1 h-12 rounded-2xl font-semibold gap-1.5 border-destructive/30 text-destructive hover:bg-destructive/10" onClick={() => setActiveSheet("reject")}>
              <XCircle size={16} /> Từ chối
            </Button>
            <Button className="flex-1 h-12 rounded-2xl font-bold gap-1.5 gradient-primary border-0 shadow-glow text-primary-foreground" onClick={() => setActiveSheet("accept")}>
              <CheckCircle2 size={16} /> Tiếp nhận
            </Button>
          </div>
        )}
      </div>
    );
  };

  // Survey content is now embedded in renderInfoTab

  const renderQuoteTab = () => {
    const grouped = (order.quotationItems || []).reduce((acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    }, {} as Record<string, QuotationItem[]>);

    return (
      <div className="space-y-4">
        <motion.div className="glass-card rounded-2xl p-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center justify-between mb-3">
            <p className="text-[12px] font-bold text-foreground">Hạng mục báo giá</p>
            {(order.status === "dang_khao_sat" || (order.status === "da_tiep_nhan" && !hasKhaoSat)) && (
              <Button size="sm" variant="outline" className="h-7 text-[11px] gap-1 rounded-lg" onClick={() => { setQuoteItem({ category: "thiet_bi", categoryLabel: "Thiết bị" }); setActiveSheet("quote_item"); }}>
                <Plus size={12} /> Thêm
              </Button>
            )}
          </div>

          {Object.keys(grouped).length === 0 ? (
            <p className="text-[11px] text-muted-foreground text-center py-6">Chưa có hạng mục. Nhấn "Thêm" để bắt đầu báo giá.</p>
          ) : (
            <div className="space-y-3">
              {QUOTATION_CATEGORIES.map(cat => {
                const items = grouped[cat.key];
                if (!items) return null;
                return (
                  <div key={cat.key}>
                    <p className="text-[11px] font-bold text-primary mb-1.5">{cat.label}</p>
                    {items.map((item, idx) => (
                      <div key={item.id} className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 mb-1">
                        <div className="flex-1">
                          <p className="text-[11px] font-semibold text-foreground">{item.name}</p>
                          <p className="text-[10px] text-muted-foreground">{item.quantity} {item.unit} × {item.unitPrice.toLocaleString("vi-VN")}đ</p>
                        </div>
                        <p className="text-[11px] font-bold text-foreground">{item.total.toLocaleString("vi-VN")}đ</p>
                        {order.status === "dang_khao_sat" && (
                          <button className="text-destructive" onClick={() => handleRemoveQuoteItem((order.quotationItems || []).indexOf(item))}>
                            <Trash2 size={13} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })}
              <div className="flex items-center justify-between pt-3 border-t border-border/50">
                <p className="text-[12px] font-bold text-foreground">Tổng cộng</p>
                <p className="text-[14px] font-extrabold text-primary">{(order.quotationTotal || 0).toLocaleString("vi-VN")}đ</p>
              </div>
            </div>
          )}
        </motion.div>

        {/* Payment terms */}
        {(order.status === "dang_khao_sat" || (order.status === "da_tiep_nhan" && !hasKhaoSat)) && (order.quotationItems?.length || 0) > 0 && (
          <motion.div className="glass-card rounded-2xl p-4 space-y-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div>
              <label className="text-[12px] font-bold text-foreground mb-1.5 block">Điều khoản thanh toán</label>
              <Textarea placeholder="VD: Thanh toán 50% khi ký HĐ, 50% khi nghiệm thu..." className="rounded-xl min-h-[60px] text-[12px]" value={paymentTerms} onChange={e => setPaymentTerms(e.target.value)} />
            </div>
            <div>
              <label className="text-[12px] font-bold text-foreground mb-1.5 block">Thông tin thanh toán</label>
              <Input className="rounded-xl text-[12px]" value={bankInfo} onChange={e => setBankInfo(e.target.value)} />
            </div>
            <Button className="w-full h-12 rounded-2xl font-bold gap-1.5 gradient-primary border-0 shadow-glow text-primary-foreground" onClick={handleSendQuotation}>
              <Send size={16} /> Gửi báo giá
            </Button>
          </motion.div>
        )}

        {order.status === "da_bao_gia" && (
          <div className="p-3 rounded-xl bg-accent/50 border border-primary/20 text-center">
            <p className="text-[12px] font-semibold text-accent-foreground">⏳ Đang chờ khách hàng duyệt báo giá</p>
          </div>
        )}
        {order.quotationApproved && (
          <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-center">
            <p className="text-[12px] font-bold text-primary flex items-center justify-center gap-1.5"><CheckCircle2 size={14} /> Khách hàng đã duyệt báo giá</p>
          </div>
        )}
      </div>
    );
  };

  const renderContractTab = () => (
    <div className="space-y-4">
      {order.contract ? (
        <motion.div className="glass-card rounded-2xl p-4 space-y-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-[12px] font-bold text-foreground">Thông tin hợp đồng</p>
          <div className="space-y-2 text-[12px]">
            <div className="flex justify-between"><span className="text-muted-foreground">Số HĐ:</span><span className="font-semibold text-foreground">{order.contract.contractNo}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Bên A:</span><span className="text-foreground">{order.contract.partyA}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Bên B:</span><span className="text-foreground">{order.contract.partyB}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Giá trị:</span><span className="font-bold text-primary">{order.contract.value}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Thời hạn:</span><span className="text-foreground">{order.contract.duration}</span></div>
            {order.contract.signedDate && <div className="flex justify-between"><span className="text-muted-foreground">Ngày ký:</span><span className="text-foreground">{order.contract.signedDate}</span></div>}
          </div>
          {order.contract.terms && (
            <div className="mt-2 p-2.5 rounded-lg bg-muted/30">
              <p className="text-[10px] text-muted-foreground mb-1">Điều khoản:</p>
              <p className="text-[11px] text-foreground">{order.contract.terms}</p>
            </div>
          )}
          <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-center">
            <p className="text-[12px] font-bold text-primary flex items-center justify-center gap-1.5"><CheckCircle2 size={14} /> Hợp đồng đã ký</p>
          </div>
        </motion.div>
      ) : (
        <motion.div className="glass-card rounded-2xl p-4 space-y-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-[12px] font-bold text-foreground">Soạn hợp đồng</p>
          <div>
            <label className="text-[11px] font-semibold text-foreground mb-1 block">Số hợp đồng</label>
            <Input className="rounded-xl text-[12px]" placeholder="VD: HĐ-2026/03-001" value={contractNo} onChange={e => setContractNo(e.target.value)} />
          </div>
          <div className="grid grid-cols-2 gap-3 text-[12px]">
            <div className="p-2.5 rounded-xl bg-muted/40">
              <p className="text-[10px] text-muted-foreground">Bên A (KH)</p>
              <p className="font-semibold text-foreground">{order.customerName}</p>
            </div>
            <div className="p-2.5 rounded-xl bg-muted/40">
              <p className="text-[10px] text-muted-foreground">Bên B (ĐT)</p>
              <p className="font-semibold text-foreground">Eco Clean Co.</p>
            </div>
          </div>
          <div>
            <label className="text-[11px] font-semibold text-foreground mb-1 block">Giá trị hợp đồng</label>
            <Input className="rounded-xl text-[12px]" value={order.amount || ""} readOnly />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-foreground mb-1 block">Thời hạn thực hiện</label>
            <Input className="rounded-xl text-[12px]" placeholder="VD: 30 ngày kể từ ngày ký" value={contractDuration} onChange={e => setContractDuration(e.target.value)} />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-foreground mb-1 block">Điều khoản</label>
            <Textarea className="rounded-xl min-h-[60px] text-[12px]" placeholder="Nhập điều khoản..." value={contractTerms} onChange={e => setContractTerms(e.target.value)} />
          </div>
          <Button variant="outline" className="w-full rounded-xl gap-2 font-semibold border-dashed text-[12px]">
            <Upload size={14} /> Đính kèm file HĐ (PDF)
          </Button>
          {order.status === "da_duyet_bao_gia" && (
            <Button className="w-full h-12 rounded-2xl font-bold gap-1.5 gradient-primary border-0 shadow-glow text-primary-foreground" onClick={handleSendContract}>
              <FileSignature size={16} /> Ký & Gửi hợp đồng
            </Button>
          )}
        </motion.div>
      )}
    </div>
  );

  // ===== NETZERO PARTNER EXECUTE =====
  // ===== NETZERO PARTNER EXECUTE =====

  const getPartnerReportStatusBadge = (status: string, isEditable: boolean) => {
    if (status === "draft" && !isEditable) {
      return <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-muted text-muted-foreground">Chưa đến hạn</span>;
    }
    const map: Record<string, { label: string; cls: string }> = {
      draft: { label: "Chờ KH nhập", cls: "bg-muted text-muted-foreground" },
      submitted: { label: "Chờ duyệt", cls: "bg-amber-500/10 text-amber-600" },
      approved: { label: "Đã duyệt", cls: "bg-primary/10 text-primary" },
      rejected: { label: "Từ chối", cls: "bg-destructive/10 text-destructive" },
    };
    const c = map[status] || map.draft;
    return <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${c.cls}`}>{c.label}</span>;
  };

  const isMonthEditablePartner = (month: number, year: number) => {
    const now = new Date();
    return year < now.getFullYear() || (year === now.getFullYear() && month <= now.getMonth() + 1);
  };

  const handleApproveReport = (reportId: string) => {
    const reports = order.operationalReports || [];
    const updated = reports.map(r =>
      r.id === reportId ? { ...r, status: "approved" as const, reviewedAt: new Date().toLocaleDateString("vi-VN") } : r
    );
    updateOrder(orderId || "", { operationalReports: updated });
    toast.success("Đã phê duyệt báo cáo");
  };

  const handleRejectReport = (reportId: string) => {
    const reason = prompt("Lý do từ chối:");
    if (reason !== null) {
      const reports = order.operationalReports || [];
      const updated = reports.map(r =>
        r.id === reportId ? { ...r, status: "rejected" as const, rejectedReason: reason, reviewedAt: new Date().toLocaleDateString("vi-VN") } : r
      );
      updateOrder(orderId || "", { operationalReports: updated });
      toast.info("Đã từ chối báo cáo");
    }
  };

  const renderNetzeroPartnerStats = () => {
    const reports = order.operationalReports || [];
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    const currentMonthReport = reports.find(r => r.month === currentMonth && r.year === currentYear);
    const pastReports = reports.filter(r => r.year < currentYear || (r.year === currentYear && r.month < currentMonth));
    const futureReports = reports.filter(r => r.year > currentYear || (r.year === currentYear && r.month > currentMonth));

    const submittedCount = reports.filter(r => r.status === "submitted" || r.status === "approved").length;
    const approvedCount = reports.filter(r => r.status === "approved").length;
    const overdueCount = reports.filter(r => r.status === "draft" && isMonthEditablePartner(r.month, r.year) && !(r.month === currentMonth && r.year === currentYear)).length;

    const renderPartnerReportCard = (r: OperationalReport) => {
      const editable = isMonthEditablePartner(r.month, r.year);
      return (
        <div key={r.id} className="p-3 rounded-xl border border-border/50 bg-card mb-2 space-y-2">
          <div className="flex items-start justify-between">
            <p className="text-[12px] font-semibold text-foreground">
              Thống kê vận hành Tháng {r.month}/{r.year} của MVS NVS {r.toiletName || order.toilets[0]}
            </p>
            {getPartnerReportStatusBadge(r.status, editable)}
          </div>
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
            <span>Trạng thái thực hiện:</span>
            {editable && r.status === "draft" && r.month !== currentMonth ? (
              <span className="text-destructive font-bold px-1.5 py-0.5 rounded bg-destructive/10">Quá hạn</span>
            ) : (
              <span>{!editable ? "Chưa đến hạn" : r.status === "draft" ? "Chờ KH nhập" : r.status === "submitted" ? "Đã gửi" : r.status === "approved" ? "Đã phê duyệt" : "Đã từ chối"}</span>
            )}
          </div>
          <p className="text-[10px] text-muted-foreground">
            Trạng thái phê duyệt: {r.status === "approved" ? "Đã phê duyệt" : r.status === "rejected" ? "Từ chối" : "Chờ phê duyệt"}
          </p>

          {/* Show data summary for submitted/approved/rejected */}
          {(r.status === "submitted" || r.status === "approved" || r.status === "rejected") && (
            <div className="grid grid-cols-2 gap-2 text-[10px] p-2 rounded-lg bg-muted/30">
              <span className="text-muted-foreground">Điện: <strong className="text-foreground">{r.electricityUsage} kWh</strong></span>
              <span className="text-muted-foreground">Nước: <strong className="text-foreground">{r.waterUsage} m³</strong></span>
              <span className="text-muted-foreground">CP sinh học: <strong className="text-foreground">{r.bioProductUsage} m³</strong></span>
              <span className="text-muted-foreground">VS lau dọn: <strong className="text-foreground">{r.cleaningCount} lần</strong></span>
            </div>
          )}

          {r.notes && <p className="text-[10px] text-muted-foreground italic">{r.notes}</p>}
          {r.rejectedReason && <p className="text-[10px] text-destructive">Lý do từ chối: {r.rejectedReason}</p>}

          {/* Approve/Reject buttons for submitted reports */}
          {r.status === "submitted" && (
            <div className="flex gap-2 pt-1">
              <Button
                size="sm"
                variant="outline"
                className="flex-1 h-9 rounded-xl text-[11px] font-semibold border-destructive/30 text-destructive hover:bg-destructive/10 gap-1"
                onClick={() => handleRejectReport(r.id)}
              >
                <XCircle size={13} /> Từ chối
              </Button>
              <Button
                size="sm"
                className="flex-1 h-9 rounded-xl text-[11px] font-bold gradient-primary border-0 text-primary-foreground gap-1"
                onClick={() => handleApproveReport(r.id)}
              >
                <CheckCircle2 size={13} /> Phê duyệt
              </Button>
            </div>
          )}
        </div>
      );
    };

    return (
      <div className="space-y-4">
        {/* Summary */}
        <div className="flex gap-2">
          <div className="flex-1 p-3 rounded-xl bg-primary/5 border border-primary/20 text-center">
            <p className="text-lg font-extrabold text-primary">{submittedCount}</p>
            <p className="text-[10px] text-muted-foreground">Đã nộp</p>
          </div>
          <div className="flex-1 p-3 rounded-xl bg-muted border border-border/50 text-center">
            <p className="text-lg font-extrabold text-muted-foreground">{approvedCount}</p>
            <p className="text-[10px] text-muted-foreground">Đã duyệt</p>
          </div>
          <div className="flex-1 p-3 rounded-xl bg-destructive/5 border border-destructive/20 text-center">
            <p className="text-lg font-extrabold text-destructive">{overdueCount}</p>
            <p className="text-[10px] text-muted-foreground">Quá hạn</p>
          </div>
          <div className="flex-1 p-3 rounded-xl bg-muted border border-border/50 text-center">
            <p className="text-lg font-extrabold text-muted-foreground">{futureReports.length}</p>
            <p className="text-[10px] text-muted-foreground">Chưa đến</p>
          </div>
        </div>

        {/* Current month */}
        {currentMonthReport && (
          <div>
            <p className="text-[12px] font-bold text-foreground mb-2">Tháng hiện tại</p>
            {renderPartnerReportCard(currentMonthReport)}
          </div>
        )}

        {/* Past */}
        {pastReports.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[12px] font-bold text-foreground">Các tháng khác</p>
              <span className="text-[10px] text-muted-foreground">Số lượt tháng: {pastReports.length + futureReports.length}</span>
            </div>
            {pastReports.map(renderPartnerReportCard)}
          </div>
        )}

        {/* Future */}
        {futureReports.length > 0 && (
          <div>
            {pastReports.length === 0 && (
              <div className="flex items-center justify-between mb-2">
                <p className="text-[12px] font-bold text-foreground">Các tháng khác</p>
                <span className="text-[10px] text-muted-foreground">Số lượt tháng: {futureReports.length}</span>
              </div>
            )}
            {futureReports.map(renderPartnerReportCard)}
          </div>
        )}
      </div>
    );
  };

  const renderExecuteTab = () => {
    const isNetzero = order.type === "netzero";

    if (isNetzero) {
      const PARTNER_EXEC_SUB_TABS = [
        { key: "stats", label: "Thống kê vận hành", badge: (order.operationalReports || []).filter(r => r.status === "submitted").length },
        { key: "manage", label: "Quản lý công việc" },
        { key: "addon", label: "Dịch vụ bổ sung" },
      ];

      return (
        <div className="space-y-4">
          {/* Sub-tabs */}
          <div className="flex border-b border-border/50 overflow-x-auto">
            {PARTNER_EXEC_SUB_TABS.map(t => (
              <button
                key={t.key}
                onClick={() => setPartnerExecSubTab(t.key)}
                className={`px-3 py-2 text-[11px] font-semibold whitespace-nowrap border-b-2 transition-colors relative ${
                  partnerExecSubTab === t.key ? "border-primary text-primary" : "border-transparent text-muted-foreground"
                }`}
              >
                {t.label}
                {t.badge && t.badge > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 rounded-full bg-destructive text-destructive-foreground text-[9px] font-bold flex items-center justify-center px-1">
                    {t.badge}
                  </span>
                )}
              </button>
            ))}
          </div>

          {partnerExecSubTab === "stats" && renderNetzeroPartnerStats()}

          {partnerExecSubTab === "manage" && (
            <div className="space-y-3">
              {/* Staff + execution */}
              {order.contract && (
                <motion.div className="glass-card rounded-2xl p-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <p className="text-[12px] font-bold text-foreground mb-2">Hợp đồng #{order.contract.contractNo}</p>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground">Giá trị: <strong className="text-primary">{order.contract.value}</strong></span>
                    <span className="text-muted-foreground">Thời hạn: {order.contract.duration}</span>
                  </div>
                </motion.div>
              )}
              {order.assignedStaff && order.assignedStaff.length > 0 && (
                <motion.div className="glass-card rounded-2xl p-4 space-y-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <p className="text-[12px] font-bold text-foreground">Nhân viên thực hiện</p>
                  {order.assignedStaff.map(s => (
                    <div key={s.id} className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                      <User size={12} className="text-primary" />
                      <span className="text-[11px] text-foreground">{s.name} ({s.role})</span>
                    </div>
                  ))}
                </motion.div>
              )}
              {order.status === "dang_thuc_hien" && (
                <Button className="w-full h-12 rounded-2xl font-bold gap-1.5 gradient-primary border-0 shadow-glow text-primary-foreground" onClick={() => setActiveSheet("bbnt")}>
                  <Send size={16} /> Tạo & Gửi BBNT
                </Button>
              )}
            </div>
          )}

          {partnerExecSubTab === "addon" && (
            <div className="text-center py-10">
              <Plus size={32} className="mx-auto text-muted-foreground/30 mb-2" />
              <p className="text-muted-foreground text-[12px]">Thêm dịch vụ bổ sung</p>
              <p className="text-muted-foreground/60 text-[11px] mt-1">Tính năng đang phát triển</p>
            </div>
          )}
        </div>
      );
    }

    // Non-Netzero default execute tab
    return (
      <div className="space-y-4">
        {order.contract && (
          <motion.div className="glass-card rounded-2xl p-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[12px] font-bold text-foreground mb-2">Hợp đồng #{order.contract.contractNo}</p>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-muted-foreground">Giá trị: <strong className="text-primary">{order.contract.value}</strong></span>
              <span className="text-muted-foreground">Thời hạn: {order.contract.duration}</span>
            </div>
          </motion.div>
        )}

        {order.status === "da_ky_hop_dong" && (
          <motion.div className="glass-card rounded-2xl p-4 space-y-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[12px] font-bold text-foreground">Gán nhân viên thực hiện</p>
            <div className="space-y-2">
              {MOCK_PARTNER_STAFF.map(s => {
                const sel = selectedStaff.includes(s.id);
                return (
                  <button key={s.id} className={`w-full rounded-xl p-3 flex items-center gap-3 text-left border transition-colors ${sel ? "bg-primary/5 border-primary/30" : "bg-card border-border/30"}`} onClick={() => toggleStaff(s.id)}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${sel ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}><User size={14} /></div>
                    <div className="flex-1">
                      <p className="text-[12px] font-semibold text-foreground">{s.name}</p>
                      <p className="text-[10px] text-muted-foreground">{s.role} · {s.phone}</p>
                    </div>
                    {sel && <CheckCircle2 size={14} className="text-primary" />}
                  </button>
                );
              })}
            </div>
            <Button className="w-full h-12 rounded-2xl font-bold gap-1.5 gradient-primary border-0 shadow-glow text-primary-foreground" onClick={handleStartExecution}>
              <Users size={16} /> Gán & Bắt đầu thực hiện ({selectedStaff.length})
            </Button>
          </motion.div>
        )}

        {order.status === "dang_thuc_hien" && (
          <motion.div className="glass-card rounded-2xl p-4 space-y-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[12px] font-bold text-foreground">Đang thực hiện dịch vụ</p>
            {order.assignedStaff && order.assignedStaff.length > 0 && (
              <div className="space-y-1.5">
                {order.assignedStaff.map(s => (
                  <div key={s.id} className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                    <User size={12} className="text-primary" />
                    <span className="text-[11px] text-foreground">{s.name} ({s.role})</span>
                  </div>
                ))}
              </div>
            )}
            <Button className="w-full h-12 rounded-2xl font-bold gap-1.5 gradient-primary border-0 shadow-glow text-primary-foreground" onClick={() => setActiveSheet("bbnt")}>
              <Send size={16} /> Tạo & Gửi BBNT
            </Button>
          </motion.div>
        )}

        {order.acceptanceReport && (
          <motion.div className="glass-card rounded-2xl p-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[12px] font-bold text-foreground mb-2">Biên bản nghiệm thu</p>
            <p className="text-[10px] text-muted-foreground mb-2">Gửi ngày: {order.acceptanceReport.sentDate}</p>
            {order.acceptanceReport.completedItems.map((item, i) => (
              <p key={i} className="text-[11px] text-foreground">✓ {item}</p>
            ))}
            {order.acceptanceReport.notes && <p className="text-[11px] text-muted-foreground mt-2 italic">{order.acceptanceReport.notes}</p>}
            {order.status === "cho_nghiem_thu" && (
              <div className="mt-3 p-2.5 rounded-xl bg-accent/50 text-center">
                <p className="text-[11px] font-semibold text-accent-foreground">⏳ Chờ khách hàng nghiệm thu</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    );
  };

  const renderSettleTab = () => (
    <div className="space-y-4">
      {order.settlement ? (
        <motion.div className="glass-card rounded-2xl p-4 space-y-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-[12px] font-bold text-foreground">Biên bản thanh lý hợp đồng</p>
          <div className="space-y-2 text-[12px]">
            <div className="flex justify-between"><span className="text-muted-foreground">Giá trị cuối:</span><span className="font-bold text-primary">{order.settlement.finalAmount}</span></div>
            {order.settlement.deductions && <div className="flex justify-between"><span className="text-muted-foreground">Khấu trừ:</span><span className="text-foreground">{order.settlement.deductions}</span></div>}
            <div className="flex justify-between"><span className="text-muted-foreground">Ngày ký:</span><span className="text-foreground">{order.settlement.signedDate}</span></div>
          </div>
          {order.settlement.notes && <p className="text-[11px] text-muted-foreground italic">{order.settlement.notes}</p>}
          <div className="p-3 rounded-xl bg-primary/5 border border-primary/20 text-center">
            <p className="text-[12px] font-bold text-primary flex items-center justify-center gap-1.5"><CheckCircle2 size={14} /> Đã thanh lý hợp đồng</p>
          </div>
        </motion.div>
      ) : (
        <motion.div className="glass-card rounded-2xl p-4 space-y-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-[12px] font-bold text-foreground">Thanh lý hợp đồng</p>
          <p className="text-[11px] text-muted-foreground">Sau khi khách hàng nghiệm thu thành công, tiến hành ký biên bản TLHĐ.</p>
          <div>
            <label className="text-[11px] font-semibold text-foreground mb-1 block">Giá trị thanh toán cuối</label>
            <Input className="rounded-xl text-[12px]" value={order.amount || ""} readOnly />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-foreground mb-1 block">Khấu trừ (nếu có)</label>
            <Input className="rounded-xl text-[12px]" placeholder="VD: Phạt trễ hạn 500.000đ" value={tlhdDeductions} onChange={e => setTlhdDeductions(e.target.value)} />
          </div>
          <div>
            <label className="text-[11px] font-semibold text-foreground mb-1 block">Ghi chú</label>
            <Textarea className="rounded-xl min-h-[60px] text-[12px]" placeholder="Ghi chú thanh lý..." value={tlhdNotes} onChange={e => setTlhdNotes(e.target.value)} />
          </div>
          <Button variant="outline" className="w-full rounded-xl gap-2 font-semibold border-dashed text-[12px]">
            <Upload size={14} /> Đính kèm biên bản TLHĐ
          </Button>
          {(order.status === "hoan_thanh" || order.status === "cho_thanh_ly") && (
            <Button className="w-full h-12 rounded-2xl font-bold gap-1.5 gradient-primary border-0 shadow-glow text-primary-foreground" onClick={handleSendTLHD}>
              <FileSignature size={16} /> Ký & Gửi biên bản TLHĐ
            </Button>
          )}
        </motion.div>
      )}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "info": return renderInfoTab();
      case "quote": return renderQuoteTab();
      case "contract": return renderContractTab();
      case "execute": return renderExecuteTab();
      case "settle": return renderSettleTab();
      default: return renderInfoTab();
    }
  };

  return (
    <div className="min-h-screen pb-8">
      <PartnerHeader title="Chi tiết đơn hàng" />

      {/* Header card */}
      <div className="px-4 pt-4 pb-2">
        <motion.div className="glass-card rounded-2xl p-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-start gap-3">
            <div className={`w-12 h-12 rounded-xl ${serviceConfig.gradient} flex items-center justify-center text-primary-foreground shrink-0`}>
              <ServiceIcon size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-[15px] text-foreground">{order.name}</p>
              <p className="text-[11px] text-muted-foreground font-mono mt-0.5">#{order.id} · {order.typeLabel}</p>
            </div>
            <StatusBadge status={statusConfig.badgeStatus} label={statusConfig.label} />
          </div>
          {order.amount && (
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/30">
              <span className="text-xs text-muted-foreground flex items-center gap-1.5"><Calendar size={12} /> {order.createdAt}</span>
              <span className="font-extrabold text-base text-primary">{order.amount}</span>
            </div>
          )}
        </motion.div>
      </div>

      {/* Tab bar */}
      <div className="px-4 py-2">
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1">
          {availableTabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap transition-all ${
                activeTab === tab.key ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <div className="px-4 pb-24">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.15 }}>
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ====== SHEETS ====== */}

      {/* Accept - choose consultant */}
      <Sheet open={activeSheet === "accept"} onOpenChange={() => setActiveSheet(null)}>
        <SheetContent side="bottom" className="rounded-t-3xl max-h-[85vh] overflow-y-auto px-5 pb-8">
          <SheetHeader className="pb-3"><SheetTitle className="text-base text-left">Tiếp nhận đơn hàng</SheetTitle></SheetHeader>
          <p className="text-[12px] text-muted-foreground mb-3">Chọn tư vấn viên phụ trách đơn hàng này:</p>
          <div className="space-y-2 mb-4">
            {MOCK_PARTNER_STAFF.map(s => {
              const sel = selectedStaff.includes(s.id);
              return (
                <button key={s.id} className={`w-full rounded-xl p-3 flex items-center gap-3 text-left border transition-colors ${sel ? "bg-primary/5 border-primary/30" : "bg-card border-border/30"}`} onClick={() => toggleStaff(s.id)}>
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${sel ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}><User size={15} /></div>
                  <div className="flex-1">
                    <p className="text-[12px] font-semibold text-foreground">{s.name}</p>
                    <p className="text-[10px] text-muted-foreground">{s.role} · {s.phone}</p>
                  </div>
                  {sel && <CheckCircle2 size={14} className="text-primary" />}
                </button>
              );
            })}
          </div>
          <Button className="w-full h-12 rounded-2xl font-bold gradient-primary border-0 shadow-glow text-primary-foreground gap-1.5" onClick={handleAccept}>
            <CheckCircle2 size={16} /> Xác nhận tiếp nhận
          </Button>
        </SheetContent>
      </Sheet>

      {/* Reject */}
      <Sheet open={activeSheet === "reject"} onOpenChange={() => setActiveSheet(null)}>
        <SheetContent side="bottom" className="rounded-t-3xl px-5 pb-8">
          <SheetHeader className="pb-3"><SheetTitle className="text-base text-left">Từ chối đơn hàng</SheetTitle></SheetHeader>
          <p className="text-[12px] text-muted-foreground mb-4">Bạn xác nhận từ chối đơn hàng #{order.id}? Hành động này không thể hoàn tác.</p>
          <div className="flex gap-2.5">
            <Button variant="outline" className="flex-1 h-12 rounded-2xl font-semibold" onClick={() => setActiveSheet(null)}>Hủy</Button>
            <Button className="flex-1 h-12 rounded-2xl font-bold gap-1.5 bg-destructive text-destructive-foreground" onClick={handleReject}>
              <XCircle size={16} /> Xác nhận từ chối
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Survey form */}
      <Sheet open={activeSheet === "survey_form"} onOpenChange={() => setActiveSheet(null)}>
        <SheetContent side="bottom" className="rounded-t-3xl max-h-[90vh] overflow-y-auto px-5 pb-8">
          <SheetHeader className="pb-3"><SheetTitle className="text-base text-left">{editingSurveyIdx !== null ? "Sửa" : "Thêm"} khảo sát NVS</SheetTitle></SheetHeader>
          <div className="space-y-3">
            <div><label className="text-[11px] font-semibold text-foreground mb-1 block">Tên NVS *</label><Input className="rounded-xl text-[12px]" placeholder="VD: NVS Tầng 1 - Sạch" value={surveyForm.toiletName || ""} onChange={e => setSurveyForm(p => ({ ...p, toiletName: e.target.value }))} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-[11px] font-semibold text-foreground mb-1 block">Diện tích</label><Input className="rounded-xl text-[12px]" placeholder="VD: 25m²" value={surveyForm.area || ""} onChange={e => setSurveyForm(p => ({ ...p, area: e.target.value }))} /></div>
              <div><label className="text-[11px] font-semibold text-foreground mb-1 block">Loại NVS</label><Input className="rounded-xl text-[12px]" placeholder="VD: Công cộng" value={surveyForm.toiletType || ""} onChange={e => setSurveyForm(p => ({ ...p, toiletType: e.target.value }))} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-[11px] font-semibold text-foreground mb-1 block">Tần suất SD</label><Input className="rounded-xl text-[12px]" placeholder="VD: Cao" value={surveyForm.usageFrequency || ""} onChange={e => setSurveyForm(p => ({ ...p, usageFrequency: e.target.value }))} /></div>
              <div><label className="text-[11px] font-semibold text-foreground mb-1 block">Tình trạng</label><Input className="rounded-xl text-[12px]" placeholder="VD: Đã xuống cấp" value={surveyForm.condition || ""} onChange={e => setSurveyForm(p => ({ ...p, condition: e.target.value }))} /></div>
            </div>
            <div><label className="text-[11px] font-semibold text-foreground mb-1 block">Tình trạng thiết bị</label><Input className="rounded-xl text-[12px]" placeholder="VD: Bồn cầu cũ, lavabo OK" value={surveyForm.equipmentCondition || ""} onChange={e => setSurveyForm(p => ({ ...p, equipmentCondition: e.target.value }))} /></div>
            <div><label className="text-[11px] font-semibold text-foreground mb-1 block">Ghi chú</label><Textarea className="rounded-xl min-h-[50px] text-[12px]" placeholder="Ghi chú thêm..." value={surveyForm.notes || ""} onChange={e => setSurveyForm(p => ({ ...p, notes: e.target.value }))} /></div>
            <Button variant="outline" className="w-full rounded-xl gap-2 font-semibold border-dashed text-[12px]"><Upload size={14} /> Đính kèm hình ảnh</Button>
            <Button className="w-full h-12 rounded-2xl font-bold gradient-primary border-0 shadow-glow text-primary-foreground gap-1.5" onClick={handleSaveSurveyItem}>
              <CheckCircle2 size={16} /> Xác nhận
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Equipment form */}
      <Sheet open={activeSheet === "equip_form"} onOpenChange={() => setActiveSheet(null)}>
        <SheetContent side="bottom" className="rounded-t-3xl px-5 pb-8">
          <SheetHeader className="pb-3"><SheetTitle className="text-base text-left">Thêm thiết bị</SheetTitle></SheetHeader>
          <div className="space-y-3">
            <div><label className="text-[11px] font-semibold text-foreground mb-1 block">Tên thiết bị *</label><Input className="rounded-xl text-[12px]" placeholder="VD: Bồn cầu TOTO" value={equipForm.name || ""} onChange={e => setEquipForm(p => ({ ...p, name: e.target.value }))} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-[11px] font-semibold text-foreground mb-1 block">Số lượng</label><Input type="number" className="rounded-xl text-[12px]" value={equipForm.quantity || ""} onChange={e => setEquipForm(p => ({ ...p, quantity: Number(e.target.value) }))} /></div>
              <div><label className="text-[11px] font-semibold text-foreground mb-1 block">Tình trạng</label><Input className="rounded-xl text-[12px]" placeholder="VD: Hỏng" value={equipForm.condition || ""} onChange={e => setEquipForm(p => ({ ...p, condition: e.target.value }))} /></div>
            </div>
            <div><label className="text-[11px] font-semibold text-foreground mb-1 block">Mô tả</label><Textarea className="rounded-xl min-h-[50px] text-[12px]" value={equipForm.description || ""} onChange={e => setEquipForm(p => ({ ...p, description: e.target.value }))} /></div>
            <Button className="w-full h-12 rounded-2xl font-bold gradient-primary border-0 shadow-glow text-primary-foreground gap-1.5" onClick={handleSaveEquipment}>
              <CheckCircle2 size={16} /> Lưu
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Quote item form */}
      <Sheet open={activeSheet === "quote_item"} onOpenChange={() => setActiveSheet(null)}>
        <SheetContent side="bottom" className="rounded-t-3xl max-h-[85vh] overflow-y-auto px-5 pb-8">
          <SheetHeader className="pb-3"><SheetTitle className="text-base text-left">Thêm hạng mục báo giá</SheetTitle></SheetHeader>
          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-semibold text-foreground mb-1.5 block">Nhóm hạng mục</label>
              <div className="flex gap-1.5 flex-wrap">
                {QUOTATION_CATEGORIES.map(cat => (
                  <button key={cat.key} onClick={() => setQuoteItem(p => ({ ...p, category: cat.key as any, categoryLabel: cat.label }))} className={`px-2.5 py-1 rounded-full text-[10px] font-semibold transition-colors ${quoteItem.category === cat.key ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
            <div><label className="text-[11px] font-semibold text-foreground mb-1 block">Tên sản phẩm/dịch vụ *</label><Input className="rounded-xl text-[12px]" placeholder="VD: Nước lau sàn Eco" value={quoteItem.name || ""} onChange={e => setQuoteItem(p => ({ ...p, name: e.target.value }))} /></div>
            <div className="grid grid-cols-3 gap-2">
              <div><label className="text-[11px] font-semibold text-foreground mb-1 block">SL</label><Input type="number" className="rounded-xl text-[12px]" value={quoteItem.quantity || ""} onChange={e => setQuoteItem(p => ({ ...p, quantity: Number(e.target.value) }))} /></div>
              <div><label className="text-[11px] font-semibold text-foreground mb-1 block">Đơn vị</label><Input className="rounded-xl text-[12px]" placeholder="chai" value={quoteItem.unit || ""} onChange={e => setQuoteItem(p => ({ ...p, unit: e.target.value }))} /></div>
              <div><label className="text-[11px] font-semibold text-foreground mb-1 block">Đơn giá</label><Input type="number" className="rounded-xl text-[12px]" value={quoteItem.unitPrice || ""} onChange={e => setQuoteItem(p => ({ ...p, unitPrice: Number(e.target.value) }))} /></div>
            </div>
            {(quoteItem.quantity && quoteItem.unitPrice) ? (
              <div className="text-right text-[12px]">Thành tiền: <strong className="text-primary">{((quoteItem.quantity || 0) * (quoteItem.unitPrice || 0)).toLocaleString("vi-VN")}đ</strong></div>
            ) : null}
            <Button className="w-full h-12 rounded-2xl font-bold gradient-primary border-0 shadow-glow text-primary-foreground gap-1.5" onClick={handleAddQuoteItem}>
              <Plus size={16} /> Thêm vào báo giá
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* BBNT */}
      <Sheet open={activeSheet === "bbnt"} onOpenChange={() => setActiveSheet(null)}>
        <SheetContent side="bottom" className="rounded-t-3xl max-h-[85vh] overflow-y-auto px-5 pb-8">
          <SheetHeader className="pb-3"><SheetTitle className="text-base text-left">Tạo biên bản nghiệm thu</SheetTitle></SheetHeader>
          <div className="space-y-3">
            <div>
              <label className="text-[11px] font-semibold text-foreground mb-1.5 block">Hạng mục đã hoàn thành</label>
              <div className="space-y-1.5 mb-2">
                {bbntItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                    <CheckCircle2 size={12} className="text-primary" />
                    <span className="text-[11px] text-foreground flex-1">{item}</span>
                    <button onClick={() => setBbntItems(prev => prev.filter((_, idx) => idx !== i))} className="text-destructive"><XCircle size={12} /></button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input className="rounded-xl text-[12px] flex-1" placeholder="Nhập hạng mục..." value={bbntNewItem} onChange={e => setBbntNewItem(e.target.value)} />
                <Button size="sm" variant="outline" className="rounded-lg" onClick={() => { if (bbntNewItem.trim()) { setBbntItems(prev => [...prev, bbntNewItem.trim()]); setBbntNewItem(""); } }}>
                  <Plus size={14} />
                </Button>
              </div>
            </div>
            <div><label className="text-[11px] font-semibold text-foreground mb-1 block">Ghi chú</label><Textarea className="rounded-xl min-h-[60px] text-[12px]" placeholder="Ghi chú nghiệm thu..." value={bbntNotes} onChange={e => setBbntNotes(e.target.value)} /></div>
            <Button variant="outline" className="w-full rounded-xl gap-2 font-semibold border-dashed text-[12px]"><Upload size={14} /> Đính kèm hình ảnh/tài liệu</Button>
            <Button className="w-full h-12 rounded-2xl font-bold gradient-primary border-0 shadow-glow text-primary-foreground gap-1.5" onClick={handleSendBBNT}>
              <Send size={16} /> Gửi biên bản nghiệm thu
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default PartnerOrderDetail;
