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
  Users, ClipboardCheck, DollarSign, FileSignature, Upload, Send
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  MOCK_PARTNER_ORDERS, MOCK_PARTNER_STAFF, ORDER_STATUS_CONFIG,
  SERVICE_TYPE_CONFIG, SERVICE_STEPS, type OrderData, type StaffMember
} from "@/data/orderData";

type SheetType = "accept" | "dispatch" | "survey" | "quote" | "contract" | "complete" | null;

const PartnerOrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [showTimeline, setShowTimeline] = useState(false);
  const [activeSheet, setActiveSheet] = useState<SheetType>(null);
  const [selectedStaff, setSelectedStaff] = useState<number[]>([]);
  const [surveyNote, setSurveyNote] = useState("");
  const [quoteAmount, setQuoteAmount] = useState("");
  const [contractNote, setContractNote] = useState("");

  const order = MOCK_PARTNER_ORDERS.find((o) => o.id === orderId);
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

  const toggleStaff = (id: number) => {
    setSelectedStaff((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
  };

  const handleAccept = () => {
    toast.success("Đã tiếp nhận đơn hàng!");
    setActiveSheet(null);
  };

  const handleReject = () => {
    toast.info("Đã từ chối đơn hàng");
    setActiveSheet(null);
    navigate("/partner/orders");
  };

  const handleDispatch = () => {
    if (selectedStaff.length === 0) {
      toast.error("Vui lòng chọn ít nhất 1 nhân viên");
      return;
    }
    toast.success(`Đã điều phối ${selectedStaff.length} nhân viên!`);
    setActiveSheet(null);
    setSelectedStaff([]);
  };

  const handleSurvey = () => {
    toast.success("Đã hoàn tất khảo sát!");
    setActiveSheet(null);
    setSurveyNote("");
  };

  const handleQuote = () => {
    if (!quoteAmount) {
      toast.error("Vui lòng nhập giá trị báo giá");
      return;
    }
    toast.success("Đã gửi báo giá!");
    setActiveSheet(null);
    setQuoteAmount("");
  };

  const handleContract = () => {
    toast.success("Đã cập nhật hợp đồng!");
    setActiveSheet(null);
    setContractNote("");
  };

  const handleComplete = () => {
    toast.success("Đã gửi yêu cầu nghiệm thu!");
    setActiveSheet(null);
  };

  // Determine available actions based on status
  const getActions = () => {
    switch (order.status) {
      case "cho_tiep_nhan":
        return (
          <div className="flex gap-2.5">
            <Button
              variant="outline"
              className="flex-1 h-12 rounded-2xl font-semibold gap-1.5 border-destructive/30 text-destructive hover:bg-destructive/10"
              onClick={handleReject}
            >
              <XCircle size={16} /> Từ chối
            </Button>
            <Button
              className="flex-1 h-12 rounded-2xl font-bold gap-1.5 gradient-primary border-0 shadow-glow text-primary-foreground"
              onClick={() => setActiveSheet("accept")}
            >
              <CheckCircle2 size={16} /> Tiếp nhận
            </Button>
          </div>
        );
      case "da_tiep_nhan":
        return (
          <div className="space-y-2.5">
            <Button
              className="w-full h-12 rounded-2xl font-bold gap-1.5 gradient-primary border-0 shadow-glow text-primary-foreground"
              onClick={() => setActiveSheet("dispatch")}
            >
              <Users size={16} /> Điều phối nhân sự
            </Button>
            {(order.type === "vsld" || order.type === "scbd" || order.type === "netzero") && (
              <Button
                variant="outline"
                className="w-full h-12 rounded-2xl font-semibold gap-1.5"
                onClick={() => setActiveSheet("survey")}
              >
                <ClipboardCheck size={16} /> Bắt đầu khảo sát
              </Button>
            )}
          </div>
        );
      case "dang_khao_sat":
        return (
          <div className="space-y-2.5">
            <Button
              className="w-full h-12 rounded-2xl font-bold gap-1.5 gradient-primary border-0 shadow-glow text-primary-foreground"
              onClick={() => setActiveSheet("survey")}
            >
              <ClipboardCheck size={16} /> Hoàn tất khảo sát
            </Button>
          </div>
        );
      case "da_bao_gia":
        return null; // Waiting for customer
      case "da_ky_hop_dong":
        return (
          <Button
            className="w-full h-12 rounded-2xl font-bold gap-1.5 gradient-primary border-0 shadow-glow text-primary-foreground"
            onClick={() => setActiveSheet("dispatch")}
          >
            <Users size={16} /> Gán nhân viên vào NVS
          </Button>
        );
      case "dang_thuc_hien":
        return (
          <Button
            className="w-full h-12 rounded-2xl font-bold gap-1.5 gradient-primary border-0 shadow-glow text-primary-foreground"
            onClick={() => setActiveSheet("complete")}
          >
            <CheckCircle2 size={16} /> Gửi yêu cầu nghiệm thu
          </Button>
        );
      default:
        return null;
    }
  };

  // After survey, show quote button
  const getSecondaryActions = () => {
    if (order.status === "dang_khao_sat" || order.status === "da_tiep_nhan") {
      return (
        <Button
          variant="outline"
          className="w-full h-12 rounded-2xl font-semibold gap-1.5 mt-2.5"
          onClick={() => setActiveSheet("quote")}
        >
          <DollarSign size={16} /> Gửi báo giá
        </Button>
      );
    }
    if (order.status === "da_bao_gia") {
      return (
        <Button
          className="w-full h-12 rounded-2xl font-bold gap-1.5 gradient-primary border-0 shadow-glow text-primary-foreground"
          onClick={() => setActiveSheet("contract")}
        >
          <FileSignature size={16} /> Cập nhật hợp đồng
        </Button>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen pb-8">
      <PartnerHeader title="Chi tiết đơn hàng" />

      <div className="px-4 py-5 space-y-4">
        {/* Header card */}
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

        {/* Progress bar */}
        <motion.div className="glass-card rounded-2xl p-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <p className="text-[12px] font-bold text-foreground mb-3">Tiến trình xử lý</p>
          <div className="flex items-center gap-1 mb-2">
            {steps.map((s, i) => (
              <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= currentStepIndex ? "bg-primary" : "bg-muted"}`} />
            ))}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-muted-foreground">{ORDER_STATUS_CONFIG[steps[0]].label}</span>
            <span className="text-[10px] font-bold text-primary">{currentStepIndex + 1}/{steps.length}</span>
            <span className="text-[10px] text-muted-foreground">{ORDER_STATUS_CONFIG[steps[steps.length - 1]].label}</span>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div className="glass-card rounded-2xl p-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <button className="w-full flex items-center justify-between" onClick={() => setShowTimeline(!showTimeline)}>
            <p className="text-[12px] font-bold text-foreground flex items-center gap-1.5">
              <Clock size={13} /> Lịch sử xử lý ({order.timeline.length})
            </p>
            {showTimeline ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
          </button>
          <AnimatePresence>
            {showTimeline && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="mt-3 space-y-0">
                  {[...order.timeline].reverse().map((t, i) => {
                    const isFirst = i === 0;
                    return (
                      <div key={i} className="flex gap-3 relative">
                        <div className="flex flex-col items-center">
                          {isFirst ? <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" /> : <Circle size={14} className="text-muted-foreground/40 shrink-0 mt-1" />}
                          {i < order.timeline.length - 1 && <div className="w-px flex-1 bg-border/50 my-1" />}
                        </div>
                        <div className="pb-3 min-w-0">
                          <p className={`text-[12px] font-semibold ${isFirst ? "text-foreground" : "text-muted-foreground"}`}>{t.label}</p>
                          <p className="text-[10px] text-muted-foreground/70 mt-0.5">{t.date} {t.actor && `· ${t.actor}`}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Customer info */}
        <motion.div className="glass-card rounded-2xl p-4 space-y-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <p className="text-[12px] font-bold text-foreground">Thông tin khách hàng</p>
          <div className="space-y-2.5 text-[12px]">
            <div className="flex items-center gap-2"><User size={13} className="text-muted-foreground" /><span className="text-foreground font-semibold">{order.customerName}</span></div>
            <div className="flex items-center gap-2"><Phone size={13} className="text-muted-foreground" /><span className="text-foreground">{order.customerPhone}</span></div>
            <div className="flex items-center gap-2"><Mail size={13} className="text-muted-foreground" /><span className="text-foreground">{order.customerEmail}</span></div>
            <div className="flex items-start gap-2"><MapPin size={13} className="text-muted-foreground shrink-0 mt-0.5" /><span className="text-foreground">{order.address}</span></div>
            {order.content && (
              <div className="flex items-start gap-2"><FileText size={13} className="text-muted-foreground shrink-0 mt-0.5" /><span className="text-foreground">{order.content}</span></div>
            )}
            {order.toilets.length > 0 && (
              <div className="flex items-start gap-2">
                <Bath size={13} className="text-muted-foreground shrink-0 mt-0.5" />
                <div>{order.toilets.map((t, i) => <p key={i} className="text-foreground">• {t}</p>)}</div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Assigned staff */}
        {order.assignedStaff && order.assignedStaff.length > 0 && (
          <motion.div className="glass-card rounded-2xl p-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <p className="text-[12px] font-bold text-foreground mb-2.5">Nhân viên được gán</p>
            <div className="space-y-2">
              {order.assignedStaff.map((s) => (
                <div key={s.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/40">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <User size={14} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[12px] font-semibold text-foreground">{s.name}</p>
                    <p className="text-[10px] text-muted-foreground">{s.role} · {s.phone}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Action buttons */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          {getActions()}
          {getSecondaryActions()}
        </motion.div>
      </div>

      {/* Accept confirmation */}
      <Sheet open={activeSheet === "accept"} onOpenChange={() => setActiveSheet(null)}>
        <SheetContent side="bottom" className="rounded-t-3xl max-h-[60vh] px-5 pb-8">
          <SheetHeader className="pb-4"><SheetTitle className="text-base text-left">Xác nhận tiếp nhận</SheetTitle></SheetHeader>
          <div className="space-y-4">
            <p className="text-[13px] text-muted-foreground">Bạn xác nhận tiếp nhận đơn hàng <strong>#{order.id}</strong> - {order.name}?</p>
            <div className="flex gap-2.5">
              <Button variant="outline" className="flex-1 h-12 rounded-2xl font-semibold" onClick={() => setActiveSheet(null)}>Hủy</Button>
              <Button className="flex-1 h-12 rounded-2xl font-bold gradient-primary border-0 shadow-glow text-primary-foreground gap-1.5" onClick={handleAccept}>
                <CheckCircle2 size={16} /> Tiếp nhận
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Dispatch staff */}
      <Sheet open={activeSheet === "dispatch"} onOpenChange={() => setActiveSheet(null)}>
        <SheetContent side="bottom" className="rounded-t-3xl max-h-[85vh] overflow-y-auto px-5 pb-8">
          <SheetHeader className="pb-4"><SheetTitle className="text-base text-left">Điều phối nhân sự</SheetTitle></SheetHeader>
          <div className="space-y-4">
            <p className="text-[13px] text-muted-foreground">Chọn nhân viên thực hiện đơn hàng này:</p>
            <div className="space-y-2">
              {MOCK_PARTNER_STAFF.map((s) => {
                const selected = selectedStaff.includes(s.id);
                return (
                  <motion.button
                    key={s.id}
                    className={`w-full rounded-2xl p-3.5 flex items-center gap-3 text-left border transition-colors ${
                      selected ? "bg-primary/5 border-primary/30" : "bg-card border-border/30"
                    }`}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleStaff(s.id)}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${selected ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      <User size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[12px] font-semibold text-foreground">{s.name}</p>
                      <p className="text-[10px] text-muted-foreground">{s.role} · {s.phone}</p>
                    </div>
                    {selected && <CheckCircle2 size={16} className="text-primary" />}
                  </motion.button>
                );
              })}
            </div>
            <Button className="w-full h-12 rounded-2xl font-bold gradient-primary border-0 shadow-glow text-primary-foreground gap-1.5" onClick={handleDispatch}>
              <Send size={16} /> Xác nhận điều phối ({selectedStaff.length})
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Survey */}
      <Sheet open={activeSheet === "survey"} onOpenChange={() => setActiveSheet(null)}>
        <SheetContent side="bottom" className="rounded-t-3xl max-h-[85vh] overflow-y-auto px-5 pb-8">
          <SheetHeader className="pb-4"><SheetTitle className="text-base text-left">Khảo sát NVS</SheetTitle></SheetHeader>
          <div className="space-y-4">
            <div>
              <label className="text-[12px] font-bold text-foreground mb-1.5 block">Ghi nhận tổng quan</label>
              <Textarea placeholder="Diện tích, mức độ bẩn, tần suất sử dụng, thiết bị hiện hữu..." className="rounded-xl min-h-[100px]" value={surveyNote} onChange={(e) => setSurveyNote(e.target.value)} />
            </div>
            <Button variant="outline" className="w-full rounded-xl gap-2 font-semibold border-dashed">
              <Upload size={16} /> Đính kèm hình ảnh khảo sát
            </Button>
            <Button className="w-full h-12 rounded-2xl font-bold gradient-primary border-0 shadow-glow text-primary-foreground gap-1.5" onClick={handleSurvey}>
              <CheckCircle2 size={16} /> Hoàn tất khảo sát
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Quote */}
      <Sheet open={activeSheet === "quote"} onOpenChange={() => setActiveSheet(null)}>
        <SheetContent side="bottom" className="rounded-t-3xl max-h-[85vh] overflow-y-auto px-5 pb-8">
          <SheetHeader className="pb-4"><SheetTitle className="text-base text-left">Gửi báo giá</SheetTitle></SheetHeader>
          <div className="space-y-4">
            <div>
              <label className="text-[12px] font-bold text-foreground mb-1.5 block">Giá trị báo giá (VNĐ)</label>
              <Input placeholder="VD: 5000000" className="rounded-xl" value={quoteAmount} onChange={(e) => setQuoteAmount(e.target.value)} />
            </div>
            <Button variant="outline" className="w-full rounded-xl gap-2 font-semibold border-dashed">
              <Upload size={16} /> Đính kèm file báo giá
            </Button>
            <Button className="w-full h-12 rounded-2xl font-bold gradient-primary border-0 shadow-glow text-primary-foreground gap-1.5" onClick={handleQuote}>
              <DollarSign size={16} /> Gửi báo giá
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Contract */}
      <Sheet open={activeSheet === "contract"} onOpenChange={() => setActiveSheet(null)}>
        <SheetContent side="bottom" className="rounded-t-3xl max-h-[85vh] overflow-y-auto px-5 pb-8">
          <SheetHeader className="pb-4"><SheetTitle className="text-base text-left">Cập nhật hợp đồng</SheetTitle></SheetHeader>
          <div className="space-y-4">
            <div>
              <label className="text-[12px] font-bold text-foreground mb-1.5 block">Điều khoản thanh toán</label>
              <Textarea placeholder="Nhập điều khoản thanh toán..." className="rounded-xl min-h-[80px]" value={contractNote} onChange={(e) => setContractNote(e.target.value)} />
            </div>
            <Button variant="outline" className="w-full rounded-xl gap-2 font-semibold border-dashed">
              <Upload size={16} /> Đính kèm file hợp đồng đã ký
            </Button>
            <Button variant="outline" className="w-full rounded-xl gap-2 font-semibold border-dashed">
              <Upload size={16} /> Đính kèm phụ lục
            </Button>
            <Button className="w-full h-12 rounded-2xl font-bold gradient-primary border-0 shadow-glow text-primary-foreground gap-1.5" onClick={handleContract}>
              <FileSignature size={16} /> Lưu hợp đồng
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Complete / request acceptance */}
      <Sheet open={activeSheet === "complete"} onOpenChange={() => setActiveSheet(null)}>
        <SheetContent side="bottom" className="rounded-t-3xl max-h-[85vh] overflow-y-auto px-5 pb-8">
          <SheetHeader className="pb-4"><SheetTitle className="text-base text-left">Gửi yêu cầu nghiệm thu</SheetTitle></SheetHeader>
          <div className="space-y-4">
            <p className="text-[13px] text-muted-foreground">Xác nhận đã hoàn thành dịch vụ và gửi yêu cầu nghiệm thu đến khách hàng.</p>
            <Button variant="outline" className="w-full rounded-xl gap-2 font-semibold border-dashed">
              <Upload size={16} /> Đính kèm tài liệu nghiệm thu
            </Button>
            <Textarea placeholder="Ghi chú kết quả thực hiện..." className="rounded-xl min-h-[80px]" />
            <Button className="w-full h-12 rounded-2xl font-bold gradient-primary border-0 shadow-glow text-primary-foreground gap-1.5" onClick={handleComplete}>
              <Send size={16} /> Gửi yêu cầu nghiệm thu
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default PartnerOrderDetail;
