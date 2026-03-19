import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CustomerHeader from "./components/CustomerHeader";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  CheckCircle2, Circle, MapPin, Phone, User, Mail, Bath,
  Building2, Calendar, FileText, Star, Send, Image as ImageIcon,
  Clock, ChevronDown, ChevronUp, XCircle, DollarSign, FileSignature, Eye,
  AlertCircle, Clipboard, PenTool, Paperclip
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useOrders } from "@/contexts/OrderContext";
import { ORDER_STATUS_CONFIG, SERVICE_TYPE_CONFIG, SERVICE_STEPS, QUOTATION_CATEGORIES } from "@/data/orderData";

// Tab definitions for customer order detail
const ORDER_TABS = [
  { key: "order", label: "Đơn hàng mới" },
  { key: "quote", label: "Tư vấn/Báo giá" },
  { key: "contract", label: "Hợp đồng" },
  { key: "execute", label: "Thực hiện" },
  { key: "accept", label: "Nghiệm thu" },
];

// Sub-tabs for survey section
const SURVEY_TABS = [
  { key: "overview", label: "Tổng quan" },
  { key: "equipment", label: "Thiết bị" },
  { key: "bio", label: "CP sinh học" },
  { key: "rating", label: "Đánh giá" },
];

// Sub-tabs for contract section
const CONTRACT_TABS = [
  { key: "contract", label: "Hợp đồng" },
  { key: "design", label: "Thiết kế" },
  { key: "appendix", label: "Phụ lục HĐ" },
];

// Determine which tabs are unlocked based on status
const getTabAccess = (status: string) => {
  const map: Record<string, string[]> = {
    cho_dieu_phoi: ["order"],
    cho_tiep_nhan: ["order"],
    da_tiep_nhan: ["order"],
    dang_khao_sat: ["order", "quote"],
    da_bao_gia: ["order", "quote"],
    da_duyet_bao_gia: ["order", "quote", "contract"],
    da_ky_hop_dong: ["order", "quote", "contract", "execute"],
    dang_thuc_hien: ["order", "quote", "contract", "execute"],
    cho_nghiem_thu: ["order", "quote", "contract", "execute", "accept"],
    hoan_thanh: ["order", "quote", "contract", "execute", "accept"],
    cho_thanh_ly: ["order", "quote", "contract", "execute", "accept"],
    da_thanh_ly: ["order", "quote", "contract", "execute", "accept"],
    da_danh_gia: ["order", "quote", "contract", "execute", "accept"],
    da_huy: ["order", "quote", "contract", "execute", "accept"],
  };
  return map[status] || ["order"];
};

const CustomerOrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { getOrder, advanceOrder } = useOrders();
  const [activeTab, setActiveTab] = useState("order");
  const [surveyTab, setSurveyTab] = useState("overview");
  const [contractTab, setContractTab] = useState("contract");
  const [showRate, setShowRate] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [rating, setRating] = useState(5);
  const [rateContent, setRateContent] = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);

  const order = getOrder(orderId || "");
  if (!order) {
    return (
      <div className="gradient-surface min-h-screen">
        <CustomerHeader title="Chi tiết đơn hàng" />
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-muted-foreground">Không tìm thấy đơn hàng</p>
          <Button variant="outline" className="mt-4" onClick={() => navigate("/customer/orders")}>Quay lại</Button>
        </div>
      </div>
    );
  }

  const statusConfig = ORDER_STATUS_CONFIG[order.status];
  const accessibleTabs = getTabAccess(order.status);

  const handleApproveQuote = () => {
    advanceOrder(orderId || "", "da_duyet_bao_gia", "Khách hàng duyệt báo giá", "Nguyễn Văn Khách", { quotationApproved: true });
    toast.success("Đã duyệt báo giá!");
  };

  const handleRejectQuote = () => {
    advanceOrder(orderId || "", "da_huy", `Khách hàng từ chối báo giá${rejectReason ? `: ${rejectReason}` : ''}`, "Nguyễn Văn Khách", { quotationRejectedReason: rejectReason });
    toast.info("Đã từ chối báo giá");
    navigate("/customer/orders");
  };

  const handleConfirmCompletion = () => {
    advanceOrder(orderId || "", "hoan_thanh", "Khách hàng xác nhận nghiệm thu", "Nguyễn Văn Khách");
    toast.success("Đã xác nhận nghiệm thu!");
    setShowConfirm(false);
  };

  const handleRate = () => {
    advanceOrder(orderId || "", "da_danh_gia", `Đánh giá ${rating}/5 sao`, "Nguyễn Văn Khách", { rating, ratingContent: rateContent });
    toast.success(`Đánh giá ${rating}/5 sao đã được gửi!`);
    setShowRate(false);
  };

  const handleCancel = () => {
    advanceOrder(orderId || "", "da_huy", "Khách hàng hủy đơn hàng", "Nguyễn Văn Khách");
    toast.info("Đơn hàng đã được hủy");
    navigate("/customer/orders");
  };

  // ===== TAB CONTENT RENDERERS =====

  const renderOrderTab = () => (
    <div className="space-y-4">
      {/* Thông tin đơn hàng */}
      <div>
        <p className="text-[13px] font-bold text-foreground mb-3">Thông tin đơn hàng</p>
        <div className="space-y-2.5 text-[12px]">
          <InfoRow label="Đơn hàng" value={order.id} />
          <InfoRow label="Ngày đăng ký" value={order.createdAt} />
          <InfoRow label="Dịch vụ" value={order.typeLabel} />
          <InfoRow label="Tên khách hàng" value={order.customerName} />
          <InfoRow label="Số điện thoại" value={order.customerPhone} />
          <InfoRow label="Địa chỉ" value={order.address} />
          {order.content && <InfoRow label="Mô tả" value={order.content} />}
          {order.partnerName && <InfoRow label="Đối tác thực hiện" value={order.partnerName} highlight />}
        </div>
      </div>

      {/* Thông tin khảo sát */}
      {order.surveyItems && order.surveyItems.length > 0 && (
        <div>
          <p className="text-[13px] font-bold text-foreground mb-3">Thông tin khảo sát</p>
          {/* Survey sub-tabs */}
          <div className="flex border-b border-border/50 mb-3 overflow-x-auto">
            {SURVEY_TABS.map(t => (
              <button
                key={t.key}
                onClick={() => setSurveyTab(t.key)}
                className={`px-3 py-2 text-[11px] font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  surveyTab === t.key
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {surveyTab === "overview" && (
            <div className="space-y-2">
              <p className="text-[12px] font-semibold text-foreground mb-2">Danh sách nhà vệ sinh trong đơn hàng</p>
              {order.surveyItems.map((item, i) => (
                <div key={i} className="p-3 rounded-xl border border-border/50 bg-card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[12px] font-bold text-foreground">{item.toiletName}</p>
                      <p className="text-[10px] text-muted-foreground">{item.area}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      item.condition === "Tốt" ? "bg-primary/10 text-primary" :
                      item.condition === "Trung bình" ? "bg-amber-500/10 text-amber-600" :
                      "bg-destructive/10 text-destructive"
                    }`}>
                      {item.condition || "Chờ khảo sát"}
                    </span>
                  </div>
                  {item.toiletType && (
                    <div className="mt-2 grid grid-cols-2 gap-1.5 text-[10px]">
                      <span className="text-muted-foreground">Loại: <span className="text-foreground">{item.toiletType}</span></span>
                      <span className="text-muted-foreground">Tần suất: <span className="text-foreground">{item.usageFrequency}</span></span>
                    </div>
                  )}
                  {item.notes && <p className="text-[10px] text-muted-foreground mt-1.5 italic">{item.notes}</p>}
                </div>
              ))}
            </div>
          )}

          {surveyTab === "equipment" && (
            <div className="space-y-2">
              {order.surveyEquipment && order.surveyEquipment.length > 0 ? (
                order.surveyEquipment.map(eq => (
                  <div key={eq.id} className="p-3 rounded-xl border border-border/50 bg-card flex items-center justify-between">
                    <div>
                      <p className="text-[12px] font-semibold text-foreground">{eq.name}</p>
                      <p className="text-[10px] text-muted-foreground">SL: {eq.quantity} · {eq.condition}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground text-[12px] py-6">Chưa có dữ liệu thiết bị</p>
              )}
            </div>
          )}

          {surveyTab === "bio" && (
            <div className="space-y-2">
              {order.surveyBioProducts && order.surveyBioProducts.length > 0 ? (
                order.surveyBioProducts.map((bp, i) => (
                  <div key={i} className="p-3 rounded-xl border border-border/50 bg-card">
                    <p className="text-[12px] text-foreground">{bp}</p>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground text-[12px] py-6">Chưa có dữ liệu CP sinh học</p>
              )}
            </div>
          )}

          {surveyTab === "rating" && (
            <div className="space-y-2">
              {order.surveyNote ? (
                <div className="p-3 rounded-xl border border-border/50 bg-card">
                  <p className="text-[12px] text-foreground">{order.surveyNote}</p>
                </div>
              ) : (
                <p className="text-center text-muted-foreground text-[12px] py-6">Chưa có đánh giá khảo sát</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* NVS list if no survey yet */}
      {(!order.surveyItems || order.surveyItems.length === 0) && order.toilets.length > 0 && (
        <div>
          <p className="text-[13px] font-bold text-foreground mb-3">Nhà vệ sinh liên quan</p>
          {order.toilets.map((t, i) => (
            <div key={i} className="p-3 rounded-xl border border-border/50 bg-card mb-2">
              <p className="text-[12px] font-semibold text-foreground">• {t}</p>
            </div>
          ))}
        </div>
      )}

      {/* Cancel button */}
      {order.status === "cho_dieu_phoi" && (
        <Button variant="outline" className="w-full h-12 rounded-2xl font-semibold gap-2 border-destructive/30 text-destructive hover:bg-destructive/10" onClick={handleCancel}>
          Hủy đơn hàng
        </Button>
      )}
    </div>
  );

  const renderQuoteTab = () => (
    <div className="space-y-4">
      <p className="text-[13px] font-bold text-foreground">Tư vấn / Báo giá</p>

      {order.quotationItems && order.quotationItems.length > 0 ? (
        <>
          {QUOTATION_CATEGORIES.map(cat => {
            const items = order.quotationItems?.filter(i => i.category === cat.key);
            if (!items?.length) return null;
            return (
              <div key={cat.key}>
                <p className="text-[11px] font-bold text-primary mb-1.5">{cat.label}</p>
                {items.map(item => (
                  <div key={item.id} className="flex items-center gap-2 p-2.5 rounded-xl border border-border/50 bg-card mb-1.5">
                    <div className="flex-1">
                      <p className="text-[11px] font-semibold text-foreground">{item.name}</p>
                      <p className="text-[10px] text-muted-foreground">{item.quantity} {item.unit} × {item.unitPrice.toLocaleString("vi-VN")}đ</p>
                    </div>
                    <p className="text-[11px] font-bold text-foreground">{item.total.toLocaleString("vi-VN")}đ</p>
                  </div>
                ))}
              </div>
            );
          })}

          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            <p className="text-[13px] font-bold text-foreground">Tổng cộng</p>
            <p className="text-[16px] font-extrabold text-primary">{(order.quotationTotal || 0).toLocaleString("vi-VN")}đ</p>
          </div>

          {order.quotationPaymentTerms && (
            <div className="p-3 rounded-xl bg-muted/30">
              <p className="text-[10px] text-muted-foreground mb-1">Điều khoản thanh toán:</p>
              <p className="text-[11px] text-foreground">{order.quotationPaymentTerms}</p>
            </div>
          )}

          {order.quotationApproved && (
            <div className="p-3 rounded-xl bg-primary/5 text-center">
              <p className="text-[12px] font-bold text-primary flex items-center justify-center gap-1"><CheckCircle2 size={14} /> Báo giá đã được duyệt</p>
            </div>
          )}

          {order.status === "da_bao_gia" && !order.quotationApproved && (
            <div className="space-y-3 pt-2">
              <Textarea placeholder="Lý do từ chối (nếu từ chối)..." className="rounded-xl min-h-[50px] text-[12px]" value={rejectReason} onChange={e => setRejectReason(e.target.value)} />
              <div className="flex gap-2.5">
                <Button variant="outline" className="flex-1 h-12 rounded-2xl font-semibold border-destructive/30 text-destructive hover:bg-destructive/10 gap-1" onClick={handleRejectQuote}>
                  <XCircle size={15} /> Từ chối
                </Button>
                <Button className="flex-1 h-12 rounded-2xl font-bold gradient-primary border-0 shadow-glow text-primary-foreground gap-1" onClick={handleApproveQuote}>
                  <CheckCircle2 size={15} /> Duyệt báo giá
                </Button>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-10">
          <DollarSign size={32} className="mx-auto text-muted-foreground/30 mb-2" />
          <p className="text-muted-foreground text-[12px]">Chưa có thông tin báo giá</p>
          <p className="text-muted-foreground/60 text-[11px] mt-1">Đối tác sẽ gửi báo giá sau khi khảo sát</p>
        </div>
      )}
    </div>
  );

  const renderContractTab = () => (
    <div className="space-y-4">
      {/* Contract sub-tabs */}
      <div className="flex border-b border-border/50 mb-1 overflow-x-auto">
        {CONTRACT_TABS.map(t => {
          // Hide design tab if not applicable
          
          return (
            <button
              key={t.key}
              onClick={() => setContractTab(t.key)}
              className={`px-3 py-2 text-[11px] font-semibold whitespace-nowrap border-b-2 transition-colors ${
                contractTab === t.key
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {contractTab === "contract" && (
        order.contract ? (
          <div className="space-y-3">
            <div className="p-4 rounded-xl border border-border/50 bg-card space-y-2.5 text-[12px]">
              <InfoRow label="Số hợp đồng" value={order.contract.contractNo} />
              <InfoRow label="Bên A (Khách hàng)" value={order.contract.partyA} />
              <InfoRow label="Bên B (Đối tác)" value={order.contract.partyB} />
              <InfoRow label="Giá trị hợp đồng" value={order.contract.value} highlight />
              <InfoRow label="Thời hạn" value={order.contract.duration} />
              {order.contract.signedDate && <InfoRow label="Ngày ký" value={order.contract.signedDate} />}
            </div>
            {order.contract.terms && (
              <div className="p-3 rounded-xl bg-muted/30">
                <p className="text-[10px] text-muted-foreground mb-1">Điều khoản:</p>
                <p className="text-[11px] text-foreground whitespace-pre-line">{order.contract.terms}</p>
              </div>
            )}
          </div>
        ) : (
          <EmptyState icon={<FileSignature size={32} />} text="Chưa có hợp đồng" sub="Hợp đồng sẽ được tạo sau khi duyệt báo giá" />
        )
      )}

      {contractTab === "design" && (
        order.designFile || order.designNote ? (
          <div className="space-y-3">
            {order.designNote && (
              <div className="p-3 rounded-xl border border-border/50 bg-card">
                <p className="text-[10px] text-muted-foreground mb-1">Ghi chú thiết kế:</p>
                <p className="text-[12px] text-foreground">{order.designNote}</p>
              </div>
            )}
            {order.designFile && (
              <div className="p-3 rounded-xl border border-border/50 bg-card flex items-center gap-2">
                <Paperclip size={14} className="text-primary" />
                <p className="text-[12px] text-primary font-semibold">{order.designFile}</p>
              </div>
            )}
          </div>
        ) : (
          <EmptyState icon={<PenTool size={32} />} text="Chưa có thiết kế" sub="Bản thiết kế sẽ được đính kèm (nếu có)" />
        )
      )}

      {contractTab === "appendix" && (
        <EmptyState icon={<Paperclip size={32} />} text="Chưa có phụ lục hợp đồng" sub="Phụ lục sẽ được bổ sung khi cần thiết" />
      )}
    </div>
  );

  const renderExecuteTab = () => {
    const tasks = order.orderTasks || [];
    const completedCount = tasks.filter(t => t.status === "completed").length;
    const inProgressCount = tasks.filter(t => t.status === "in_progress").length;

    return (
      <div className="space-y-4">
        <p className="text-[13px] font-bold text-foreground">Thực hiện hợp đồng</p>

        {/* Summary */}
        {tasks.length > 0 && (
          <div className="flex gap-2">
            <div className="flex-1 p-3 rounded-xl bg-primary/5 border border-primary/20 text-center">
              <p className="text-lg font-extrabold text-primary">{completedCount}/{tasks.length}</p>
              <p className="text-[10px] text-muted-foreground">Hoàn thành</p>
            </div>
            <div className="flex-1 p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-center">
              <p className="text-lg font-extrabold text-amber-600">{inProgressCount}</p>
              <p className="text-[10px] text-muted-foreground">Đang thực hiện</p>
            </div>
            <div className="flex-1 p-3 rounded-xl bg-muted border border-border/50 text-center">
              <p className="text-lg font-extrabold text-muted-foreground">{tasks.length - completedCount - inProgressCount}</p>
              <p className="text-[10px] text-muted-foreground">Chờ thực hiện</p>
            </div>
          </div>
        )}

        {/* Task list */}
        {tasks.length > 0 ? (
          <div className="space-y-2">
            <p className="text-[12px] font-semibold text-foreground">Danh sách công việc</p>
            {tasks.map((task) => {
              const isExpanded = expandedTaskId === task.id;
              return (
                <div
                  key={task.id}
                  className="rounded-xl border border-border/50 bg-card overflow-hidden cursor-pointer"
                  onClick={() => setExpandedTaskId(isExpanded ? null : task.id)}
                >
                  {/* Task summary row */}
                  <div className="p-3 flex items-start gap-2.5">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      task.status === "completed" ? "bg-primary/10" : task.status === "in_progress" ? "bg-amber-500/10" : "bg-muted"
                    }`}>
                      {task.status === "completed" ? (
                        <CheckCircle2 size={13} className="text-primary" />
                      ) : task.status === "in_progress" ? (
                        <Clock size={11} className="text-amber-600" />
                      ) : (
                        <Circle size={11} className="text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-[12px] font-semibold ${task.status === "completed" ? "text-muted-foreground" : "text-foreground"}`}>{task.title}</p>
                      {!isExpanded && (
                        <div className="flex flex-wrap gap-x-3 gap-y-0.5 mt-1">
                          {task.assignee && (
                            <span className="text-[10px] text-muted-foreground flex items-center gap-0.5"><User size={10} /> {task.assignee}</span>
                          )}
                          {task.scheduledDate && (
                            <span className="text-[10px] text-muted-foreground flex items-center gap-0.5"><Calendar size={10} /> {task.scheduledDate}</span>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap ${
                        task.status === "completed" ? "bg-primary/10 text-primary" :
                        task.status === "in_progress" ? "bg-amber-500/10 text-amber-600" :
                        "bg-muted text-muted-foreground"
                      }`}>
                        {task.status === "completed" ? "Hoàn thành" : task.status === "in_progress" ? "Đang làm" : "Chờ"}
                      </span>
                      {isExpanded ? <ChevronUp size={14} className="text-muted-foreground" /> : <ChevronDown size={14} className="text-muted-foreground" />}
                    </div>
                  </div>

                  {/* Task detail (expanded) */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-3 pb-3 pt-0 border-t border-border/30">
                          <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-3">
                            <div>
                              <p className="text-[10px] text-muted-foreground">Nhà vệ sinh</p>
                              <p className="text-[11px] font-medium text-foreground flex items-center gap-1"><Bath size={10} className="text-primary" /> {task.toiletName || "—"}</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-muted-foreground">Người thực hiện</p>
                              <p className="text-[11px] font-medium text-foreground flex items-center gap-1"><User size={10} className="text-primary" /> {task.assignee || "—"}</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-muted-foreground">Ngày dự kiến</p>
                              <p className="text-[11px] font-medium text-foreground flex items-center gap-1"><Calendar size={10} className="text-primary" /> {task.scheduledDate || "—"}</p>
                            </div>
                            <div>
                              <p className="text-[10px] text-muted-foreground">Ngày hoàn thành</p>
                              <p className="text-[11px] font-medium text-foreground flex items-center gap-1">
                                {task.completedDate ? (
                                  <><CheckCircle2 size={10} className="text-primary" /> {task.completedDate}</>
                                ) : "—"}
                              </p>
                            </div>
                          </div>
                          {task.notes && (
                            <div className="mt-2.5 p-2.5 rounded-lg bg-muted/50 border border-border/30">
                              <p className="text-[10px] text-muted-foreground mb-0.5">Ghi chú</p>
                              <p className="text-[11px] text-foreground">{task.notes}</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState icon={<Clipboard size={32} />} text="Chưa có công việc" sub="Công việc sẽ được tạo khi hợp đồng bắt đầu thực hiện" />
        )}

        {/* Staff assigned */}
        {order.assignedStaff && order.assignedStaff.length > 0 && (
          <div>
            <p className="text-[12px] font-semibold text-foreground mb-2">Nhân viên thực hiện</p>
            {order.assignedStaff.map(s => (
              <div key={s.id} className="flex items-center gap-3 p-3 rounded-xl border border-border/50 bg-card mb-1.5">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User size={14} className="text-primary" />
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-foreground">{s.name}</p>
                  <p className="text-[10px] text-muted-foreground">{s.role} · {s.phone}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderAcceptTab = () => (
    <div className="space-y-4">
      <p className="text-[13px] font-bold text-foreground">Nghiệm thu</p>

      {/* BBNT */}
      {order.acceptanceReport ? (
        <div className="space-y-3">
          <div className="p-4 rounded-xl border border-border/50 bg-card">
            <p className="text-[12px] font-semibold text-foreground mb-2">Biên bản nghiệm thu</p>
            <p className="text-[10px] text-muted-foreground mb-2">Ngày gửi: {order.acceptanceReport.sentDate}</p>
            <div className="space-y-1.5">
              {order.acceptanceReport.completedItems.map((item, i) => (
                <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                  <CheckCircle2 size={12} className="text-primary" />
                  <span className="text-[11px] text-foreground">{item}</span>
                </div>
              ))}
            </div>
            {order.acceptanceReport.notes && <p className="text-[11px] text-muted-foreground italic mt-2">{order.acceptanceReport.notes}</p>}
          </div>

          {order.status === "cho_nghiem_thu" && (
            <Button className="w-full touch-target font-bold rounded-2xl gradient-primary border-0 shadow-glow h-14 text-primary-foreground gap-2" onClick={() => setShowConfirm(true)}>
              <CheckCircle2 size={18} /> Xác nhận nghiệm thu
            </Button>
          )}
        </div>
      ) : (
        <EmptyState icon={<Clipboard size={32} />} text="Chưa có biên bản nghiệm thu" sub="Đối tác sẽ gửi biên bản sau khi hoàn thành công việc" />
      )}

      {/* Settlement */}
      {order.settlement && (
        <div className="p-4 rounded-xl border border-border/50 bg-card space-y-2.5">
          <p className="text-[12px] font-semibold text-foreground">Biên bản thanh lý HĐ</p>
          <InfoRow label="Giá trị cuối" value={order.settlement.finalAmount} highlight />
          {order.settlement.deductions && <InfoRow label="Khấu trừ" value={order.settlement.deductions} />}
          {order.settlement.signedDate && <InfoRow label="Ngày ký" value={order.settlement.signedDate} />}
          {order.settlement.notes && <p className="text-[11px] text-muted-foreground italic">{order.settlement.notes}</p>}
        </div>
      )}

      {/* Rating */}
      {order.rating ? (
        <div className="p-4 rounded-xl border border-border/50 bg-card">
          <p className="text-[12px] font-semibold text-foreground mb-2">Đánh giá của bạn</p>
          <div className="flex items-center gap-1 mb-1">
            {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} className={s <= order.rating! ? "text-primary fill-primary" : "text-muted-foreground/30"} />)}
            <span className="text-[12px] font-bold text-foreground ml-1">{order.rating}/5</span>
          </div>
          {order.ratingContent && <p className="text-[11px] text-muted-foreground italic">"{order.ratingContent}"</p>}
        </div>
      ) : (
        (order.status === "hoan_thanh" || order.status === "da_thanh_ly") && (
          <Button className="w-full touch-target font-bold rounded-2xl gradient-primary border-0 shadow-glow h-14 text-primary-foreground gap-2" onClick={() => setShowRate(true)}>
            <Star size={18} /> Đánh giá dịch vụ
          </Button>
        )
      )}
    </div>
  );

  return (
    <div className="gradient-surface min-h-screen pb-8">
      <CustomerHeader title={order.id} />

      {/* Status badge */}
      <div className="px-4 pt-2 pb-1 flex items-center justify-between">
        <StatusBadge status={statusConfig.badgeStatus} label={statusConfig.label} />
        <span className="text-[10px] text-muted-foreground">{order.createdAt}</span>
      </div>

      {/* Horizontal scrollable tabs */}
      <div className="border-b border-border/50 overflow-x-auto">
        <div className="flex min-w-max px-2">
          {ORDER_TABS.map(tab => {
            const isAccessible = accessibleTabs.includes(tab.key);
            return (
              <button
                key={tab.key}
                onClick={() => isAccessible && setActiveTab(tab.key)}
                disabled={!isAccessible}
                className={`px-3 py-2.5 text-[11px] font-semibold whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === tab.key
                    ? "border-primary text-primary"
                    : isAccessible
                      ? "border-transparent text-muted-foreground hover:text-foreground"
                      : "border-transparent text-muted-foreground/30 cursor-not-allowed"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab content */}
      <div className="px-4 py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.15 }}
          >
            {activeTab === "order" && renderOrderTab()}
            {activeTab === "quote" && renderQuoteTab()}
            {activeTab === "contract" && renderContractTab()}
            {activeTab === "execute" && renderExecuteTab()}
            {activeTab === "accept" && renderAcceptTab()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ====== SHEETS ====== */}

      {/* Confirm completion sheet */}
      <Sheet open={showConfirm} onOpenChange={setShowConfirm}>
        <SheetContent side="bottom" className="rounded-t-3xl max-h-[70vh] overflow-y-auto px-5 pb-8">
          <SheetHeader className="pb-4"><SheetTitle className="text-base text-left">Xác nhận nghiệm thu</SheetTitle></SheetHeader>
          <div className="space-y-4">
            {order.acceptanceReport && (
              <div className="space-y-1.5">
                <p className="text-[12px] font-semibold text-foreground">Các hạng mục đã thực hiện:</p>
                {order.acceptanceReport.completedItems.map((item, i) => (
                  <div key={i} className="flex items-center gap-2 p-2 rounded-lg bg-muted/30">
                    <CheckCircle2 size={12} className="text-primary" />
                    <span className="text-[11px] text-foreground">{item}</span>
                  </div>
                ))}
              </div>
            )}
            <p className="text-[12px] text-muted-foreground">Bạn xác nhận đối tác đã hoàn thành dịch vụ theo hợp đồng?</p>
            <Textarea placeholder="Ghi chú thêm (tùy chọn)..." className="rounded-xl min-h-[60px]" />
            <Button className="w-full touch-target font-bold rounded-2xl gradient-primary border-0 shadow-glow h-14 text-primary-foreground gap-2" onClick={handleConfirmCompletion}>
              <CheckCircle2 size={18} /> Xác nhận hoàn thành
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Rating sheet */}
      <Sheet open={showRate} onOpenChange={setShowRate}>
        <SheetContent side="bottom" className="rounded-t-3xl max-h-[85vh] overflow-y-auto px-5 pb-8">
          <SheetHeader className="pb-4"><SheetTitle className="text-base text-left">Đánh giá dịch vụ</SheetTitle></SheetHeader>
          <div className="space-y-4">
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground mb-3">Bạn đánh giá chất lượng dịch vụ thế nào?</p>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map(s => (
                  <motion.button key={s} onClick={() => setRating(s)} whileTap={{ scale: 0.8, rotate: -15 }} className="p-1">
                    <Star size={32} className={s <= rating ? "text-primary fill-primary" : "text-muted-foreground/30"} />
                  </motion.button>
                ))}
              </div>
              <p className="text-lg font-bold text-foreground mt-2">{rating}/5</p>
            </div>
            <Textarea placeholder="Chia sẻ trải nghiệm của bạn..." className="rounded-xl min-h-[80px]" value={rateContent} onChange={e => setRateContent(e.target.value)} />
            <Button variant="outline" className="w-full rounded-xl gap-2 font-semibold border-dashed"><ImageIcon size={16} /> Đính kèm hình ảnh</Button>
            <Button className="w-full touch-target font-bold rounded-2xl gradient-primary border-0 shadow-glow h-14 text-primary-foreground gap-2" onClick={handleRate}>
              <Send size={18} /> Gửi đánh giá
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

// ===== HELPER COMPONENTS =====

const InfoRow = ({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) => (
  <div className="flex justify-between items-start gap-2">
    <span className="text-[11px] text-muted-foreground shrink-0">{label}:</span>
    <span className={`text-[11px] text-right ${highlight ? "font-bold text-primary" : "text-foreground"}`}>{value}</span>
  </div>
);

const EmptyState = ({ icon, text, sub }: { icon: React.ReactNode; text: string; sub: string }) => (
  <div className="text-center py-10">
    <div className="mx-auto text-muted-foreground/30 mb-2 flex justify-center">{icon}</div>
    <p className="text-muted-foreground text-[12px]">{text}</p>
    <p className="text-muted-foreground/60 text-[11px] mt-1">{sub}</p>
  </div>
);

export default CustomerOrderDetail;
