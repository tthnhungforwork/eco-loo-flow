import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminHeader from "./components/AdminHeader";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  CheckCircle2, Circle, MapPin, Phone, User, Mail, Bath,
  Building2, Calendar, FileText, Clock, ChevronDown, ChevronUp,
  Users, Send, Star, ArrowRight, DollarSign, FileSignature, Eye
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useOrders } from "@/contexts/OrderContext";
import {
  MOCK_PARTNERS, ORDER_STATUS_CONFIG,
  SERVICE_TYPE_CONFIG, SERVICE_STEPS, QUOTATION_CATEGORIES
} from "@/data/orderData";

const AdminOrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { getOrder, dispatchToPartner } = useOrders();
  const [showTimeline, setShowTimeline] = useState(false);
  const [showDispatch, setShowDispatch] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [showContract, setShowContract] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);
  const [dispatchNote, setDispatchNote] = useState("");

  const order = getOrder(orderId || "");
  if (!order) {
    return (
      <div className="min-h-screen">
        <AdminHeader title="Chi tiết đơn hàng" />
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-muted-foreground">Không tìm thấy đơn hàng</p>
          <Button variant="outline" className="mt-4" onClick={() => navigate("/admin/orders")}>Quay lại</Button>
        </div>
      </div>
    );
  }

  const serviceConfig = SERVICE_TYPE_CONFIG[order.type];
  const ServiceIcon = serviceConfig.icon;
  const statusConfig = ORDER_STATUS_CONFIG[order.status];
  const steps = SERVICE_STEPS[order.type];
  const currentStepIndex = steps.indexOf(order.status);

  const handleManualDispatch = () => {
    if (!selectedPartner) { toast.error("Vui lòng chọn đối tác"); return; }
    const partner = MOCK_PARTNERS.find(p => p.id === selectedPartner);
    if (!partner) return;
    dispatchToPartner(orderId || "", partner.name, partner.phone, dispatchNote);
    toast.success(`Đã gán đơn hàng cho ${partner.name}`);
    setShowDispatch(false);
    setSelectedPartner(null);
    setDispatchNote("");
  };

  return (
    <div className="min-h-screen pb-8">
      <AdminHeader title="Chi tiết đơn hàng" />

      <div className="px-4 py-5 space-y-4">
        {/* Header card */}
        <motion.div className="glass-card rounded-2xl p-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-start gap-3">
            <div className={`w-12 h-12 rounded-xl ${serviceConfig.gradient} flex items-center justify-center text-primary-foreground shrink-0`}><ServiceIcon size={22} /></div>
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

        {/* Progress */}
        <motion.div className="glass-card rounded-2xl p-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
          <p className="text-[12px] font-bold text-foreground mb-3">Tiến trình xử lý</p>
          <div className="flex items-center gap-1 mb-2">
            {steps.map((s, i) => (<div key={s} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= currentStepIndex ? "bg-primary" : "bg-muted"}`} />))}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-muted-foreground">{ORDER_STATUS_CONFIG[steps[0]]?.label}</span>
            <span className="text-[10px] font-bold text-primary">{currentStepIndex + 1}/{steps.length}</span>
            <span className="text-[10px] text-muted-foreground">{ORDER_STATUS_CONFIG[steps[steps.length - 1]]?.label}</span>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div className="glass-card rounded-2xl p-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <button className="w-full flex items-center justify-between" onClick={() => setShowTimeline(!showTimeline)}>
            <p className="text-[12px] font-bold text-foreground flex items-center gap-1.5"><Clock size={13} /> Lịch sử ({order.timeline.length})</p>
            {showTimeline ? <ChevronUp size={16} className="text-muted-foreground" /> : <ChevronDown size={16} className="text-muted-foreground" />}
          </button>
          <AnimatePresence>
            {showTimeline && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                <div className="mt-3">
                  {[...order.timeline].reverse().map((t, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center">
                        {i === 0 ? <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" /> : <Circle size={14} className="text-muted-foreground/40 shrink-0 mt-1" />}
                        {i < order.timeline.length - 1 && <div className="w-px flex-1 bg-border/50 my-1" />}
                      </div>
                      <div className="pb-3">
                        <p className={`text-[12px] font-semibold ${i === 0 ? "text-foreground" : "text-muted-foreground"}`}>{t.label}</p>
                        <p className="text-[10px] text-muted-foreground/70 mt-0.5">{t.date} {t.actor && `· ${t.actor}`}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Customer + Order info */}
        <motion.div className="glass-card rounded-2xl p-4 space-y-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <p className="text-[12px] font-bold text-foreground">Thông tin khách hàng & đơn hàng</p>
          <div className="space-y-2.5 text-[12px]">
            <div className="flex items-center gap-2"><User size={13} className="text-muted-foreground" /><span className="font-semibold text-foreground">{order.customerName}</span></div>
            <div className="flex items-center gap-2"><Phone size={13} className="text-muted-foreground" /><span className="text-foreground">{order.customerPhone}</span></div>
            <div className="flex items-center gap-2"><Mail size={13} className="text-muted-foreground" /><span className="text-foreground">{order.customerEmail}</span></div>
            <div className="flex items-start gap-2"><MapPin size={13} className="text-muted-foreground shrink-0 mt-0.5" /><span className="text-foreground">{order.address}</span></div>
            {order.content && <div className="flex items-start gap-2"><FileText size={13} className="text-muted-foreground shrink-0 mt-0.5" /><span className="text-foreground">{order.content}</span></div>}
            {order.toilets.length > 0 && (
              <div className="flex items-start gap-2"><Bath size={13} className="text-muted-foreground shrink-0 mt-0.5" /><div>{order.toilets.map((t, i) => <p key={i}>• {t}</p>)}</div></div>
            )}
          </div>
        </motion.div>

        {/* Partner info */}
        {order.partnerName && (
          <motion.div className="glass-card rounded-2xl p-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <p className="text-[12px] font-bold text-foreground mb-2">Đối tác thực hiện</p>
            <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/20">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground"><Building2 size={18} /></div>
              <div className="flex-1">
                <p className="text-[13px] font-bold text-foreground">{order.partnerName}</p>
                {order.partnerPhone && <p className="text-[11px] text-muted-foreground">{order.partnerPhone}</p>}
              </div>
              <ArrowRight size={16} className="text-primary" />
            </div>
            {order.assignedStaff && order.assignedStaff.length > 0 && (
              <div className="mt-3 space-y-1.5">
                <p className="text-[11px] text-muted-foreground font-medium">Nhân viên:</p>
                {order.assignedStaff.map(s => <p key={s.id} className="text-[12px] text-foreground">• {s.name} ({s.role})</p>)}
              </div>
            )}
          </motion.div>
        )}

        {/* Quotation summary */}
        {order.quotationItems && order.quotationItems.length > 0 && (
          <motion.div className="glass-card rounded-2xl p-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[12px] font-bold text-foreground flex items-center gap-1.5"><DollarSign size={13} /> Báo giá</p>
              <button className="text-primary text-[11px] font-semibold flex items-center gap-1" onClick={() => setShowQuote(true)}><Eye size={12} /> Chi tiết</button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">{order.quotationItems.length} hạng mục · {order.quotationApproved ? "✅ KH đã duyệt" : "⏳ Chờ KH duyệt"}</span>
              <span className="text-[14px] font-extrabold text-primary">{(order.quotationTotal || 0).toLocaleString("vi-VN")}đ</span>
            </div>
          </motion.div>
        )}

        {/* Contract summary */}
        {order.contract && (
          <motion.div className="glass-card rounded-2xl p-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[12px] font-bold text-foreground flex items-center gap-1.5"><FileSignature size={13} /> Hợp đồng #{order.contract.contractNo}</p>
              <button className="text-primary text-[11px] font-semibold flex items-center gap-1" onClick={() => setShowContract(true)}><Eye size={12} /> Xem</button>
            </div>
            <div className="flex items-center justify-between text-[11px]">
              <span className="text-muted-foreground">Giá trị: <strong className="text-primary">{order.contract.value}</strong></span>
              <span className="text-muted-foreground">Ký: {order.contract.signedDate}</span>
            </div>
          </motion.div>
        )}

        {/* BBNT + Settlement summary */}
        {order.acceptanceReport && (
          <motion.div className="glass-card rounded-2xl p-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[12px] font-bold text-foreground mb-1">📋 BBNT · {order.acceptanceReport.completedItems.length} hạng mục</p>
            <p className="text-[10px] text-muted-foreground">Gửi: {order.acceptanceReport.sentDate} · {order.status === "cho_nghiem_thu" ? "⏳ Chờ KH nghiệm thu" : "✅ Đã nghiệm thu"}</p>
          </motion.div>
        )}
        {order.settlement && (
          <motion.div className="glass-card rounded-2xl p-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[12px] font-bold text-foreground mb-1">📃 TLHĐ · Giá trị: {order.settlement.finalAmount}</p>
            <p className="text-[10px] text-muted-foreground">Ký: {order.settlement.signedDate}</p>
          </motion.div>
        )}

        {/* Rating */}
        {order.rating && (
          <motion.div className="glass-card rounded-2xl p-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-[12px] font-bold text-foreground mb-1">⭐ Đánh giá: {order.rating}/5</p>
            {order.ratingContent && <p className="text-[11px] text-muted-foreground italic">"{order.ratingContent}"</p>}
          </motion.div>
        )}

        {/* Admin actions */}
        {order.status === "cho_dieu_phoi" && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
            <Button className="w-full h-12 rounded-2xl font-bold gap-2 gradient-primary border-0 shadow-glow text-primary-foreground" onClick={() => setShowDispatch(true)}>
              <Users size={16} /> Gán thủ công cho đối tác
            </Button>
          </motion.div>
        )}
      </div>

      {/* Manual dispatch */}
      <Sheet open={showDispatch} onOpenChange={setShowDispatch}>
        <SheetContent side="bottom" className="rounded-t-3xl max-h-[85vh] overflow-y-auto px-5 pb-8">
          <SheetHeader className="pb-4"><SheetTitle className="text-base text-left">Gán thủ công cho đối tác</SheetTitle></SheetHeader>
          <div className="space-y-4">
            <p className="text-[13px] text-muted-foreground">Chọn đối tác:</p>
            <div className="space-y-2">
              {MOCK_PARTNERS.filter(p => p.status === "active").map(p => {
                const selected = selectedPartner === p.id;
                const hasService = p.services.includes(order.type);
                return (
                  <motion.button key={p.id} className={`w-full rounded-2xl p-3.5 flex items-center gap-3 text-left border transition-colors ${selected ? "bg-primary/5 border-primary/30" : "bg-card border-border/30"} ${!hasService ? "opacity-50" : ""}`} whileTap={{ scale: 0.98 }} onClick={() => setSelectedPartner(p.id)}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selected ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}><Building2 size={16} /></div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5"><p className="text-[12px] font-semibold text-foreground">{p.name}</p>{!hasService && <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-accent text-accent-foreground font-medium">Khác DV</span>}</div>
                      <p className="text-[10px] text-muted-foreground">{p.services.map(s => SERVICE_TYPE_CONFIG[s].label).join(", ")}</p>
                      <p className="text-[10px] text-muted-foreground"><Star size={9} className="inline text-primary fill-primary" /> {p.rating} · {p.completedOrders} đơn</p>
                    </div>
                    {selected && <CheckCircle2 size={16} className="text-primary shrink-0" />}
                  </motion.button>
                );
              })}
            </div>
            <Textarea placeholder="Ghi chú (tùy chọn)..." className="rounded-xl min-h-[60px]" value={dispatchNote} onChange={e => setDispatchNote(e.target.value)} />
            <Button className="w-full h-12 rounded-2xl font-bold gradient-primary border-0 shadow-glow text-primary-foreground gap-1.5" onClick={handleManualDispatch}>
              <Send size={16} /> Gán đối tác
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* Quote detail */}
      <Sheet open={showQuote} onOpenChange={setShowQuote}>
        <SheetContent side="bottom" className="rounded-t-3xl max-h-[85vh] overflow-y-auto px-5 pb-8">
          <SheetHeader className="pb-3"><SheetTitle className="text-base text-left">Chi tiết báo giá</SheetTitle></SheetHeader>
          <div className="space-y-3">
            {QUOTATION_CATEGORIES.map(cat => {
              const items = order.quotationItems?.filter(i => i.category === cat.key);
              if (!items?.length) return null;
              return (
                <div key={cat.key}>
                  <p className="text-[11px] font-bold text-primary mb-1.5">{cat.label}</p>
                  {items.map(item => (
                    <div key={item.id} className="flex items-center gap-2 p-2 rounded-lg bg-muted/30 mb-1">
                      <div className="flex-1"><p className="text-[11px] font-semibold text-foreground">{item.name}</p><p className="text-[10px] text-muted-foreground">{item.quantity} {item.unit} × {item.unitPrice.toLocaleString("vi-VN")}đ</p></div>
                      <p className="text-[11px] font-bold text-foreground">{item.total.toLocaleString("vi-VN")}đ</p>
                    </div>
                  ))}
                </div>
              );
            })}
            <div className="flex items-center justify-between pt-3 border-t border-border/50">
              <p className="text-[13px] font-bold text-foreground">Tổng</p>
              <p className="text-[16px] font-extrabold text-primary">{(order.quotationTotal || 0).toLocaleString("vi-VN")}đ</p>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Contract detail */}
      <Sheet open={showContract} onOpenChange={setShowContract}>
        <SheetContent side="bottom" className="rounded-t-3xl max-h-[80vh] overflow-y-auto px-5 pb-8">
          <SheetHeader className="pb-3"><SheetTitle className="text-base text-left">Hợp đồng</SheetTitle></SheetHeader>
          {order.contract && (
            <div className="space-y-3 text-[12px]">
              <div className="flex justify-between"><span className="text-muted-foreground">Số HĐ:</span><span className="font-semibold">{order.contract.contractNo}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Bên A:</span><span>{order.contract.partyA}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Bên B:</span><span>{order.contract.partyB}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Giá trị:</span><span className="font-bold text-primary">{order.contract.value}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Thời hạn:</span><span>{order.contract.duration}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Ngày ký:</span><span>{order.contract.signedDate}</span></div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminOrderDetail;
