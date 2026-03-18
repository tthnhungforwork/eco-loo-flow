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
  Clock, ChevronDown, ChevronUp
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useOrders } from "@/contexts/OrderContext";
import { ORDER_STATUS_CONFIG, SERVICE_TYPE_CONFIG, SERVICE_STEPS } from "@/data/orderData";

const CustomerOrderDetail = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const { getOrder, advanceOrder } = useOrders();
  const [showTimeline, setShowTimeline] = useState(false);
  const [showRate, setShowRate] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [rating, setRating] = useState(5);
  const [rateContent, setRateContent] = useState("");

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

  const serviceConfig = SERVICE_TYPE_CONFIG[order.type];
  const ServiceIcon = serviceConfig.icon;
  const statusConfig = ORDER_STATUS_CONFIG[order.status];
  const steps = SERVICE_STEPS[order.type];
  const currentStepIndex = steps.indexOf(order.status);

  const handleConfirmCompletion = () => {
    advanceOrder(orderId || "", "hoan_thanh", "Khách hàng xác nhận nghiệm thu", "Nguyễn Văn Khách");
    toast.success("Đã xác nhận nghiệm thu!", { description: "Đơn hàng đã chuyển sang hoàn thành." });
    setShowConfirm(false);
  };

  const handleRate = () => {
    advanceOrder(orderId || "", "da_danh_gia", `Đánh giá ${rating}/5 sao`, "Nguyễn Văn Khách", {
      rating,
      ratingContent: rateContent,
    });
    toast.success("Đánh giá đã được gửi!", { description: `Bạn đã đánh giá ${rating}/5 sao.` });
    setShowRate(false);
    setRating(5);
    setRateContent("");
  };

  const handleCancel = () => {
    advanceOrder(orderId || "", "da_huy", "Khách hàng hủy đơn hàng", "Nguyễn Văn Khách");
    toast.info("Đơn hàng đã được hủy");
    navigate("/customer/orders");
  };

  return (
    <div className="gradient-surface min-h-screen pb-8">
      <CustomerHeader title="Chi tiết đơn hàng" />

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
                  {[...order.timeline].reverse().map((t, i) => (
                    <div key={i} className="flex gap-3 relative">
                      <div className="flex flex-col items-center">
                        {i === 0 ? <CheckCircle2 size={16} className="text-primary shrink-0 mt-0.5" /> : <Circle size={14} className="text-muted-foreground/40 shrink-0 mt-1" />}
                        {i < order.timeline.length - 1 && <div className="w-px flex-1 bg-border/50 my-1" />}
                      </div>
                      <div className="pb-3 min-w-0">
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

        {/* Order info */}
        <motion.div className="glass-card rounded-2xl p-4 space-y-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <p className="text-[12px] font-bold text-foreground">Thông tin đơn hàng</p>
          <div className="space-y-2.5 text-[12px]">
            <div className="flex items-start gap-2">
              <FileText size={13} className="text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="text-muted-foreground text-[10px]">Nội dung</p>
                <p className="text-foreground">{order.content}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin size={13} className="text-muted-foreground shrink-0 mt-0.5" />
              <div>
                <p className="text-muted-foreground text-[10px]">Địa điểm</p>
                <p className="text-foreground">{order.address}</p>
              </div>
            </div>
            {order.toilets.length > 0 && (
              <div className="flex items-start gap-2">
                <Bath size={13} className="text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="text-muted-foreground text-[10px]">NVS liên quan</p>
                  {order.toilets.map((t, i) => <p key={i} className="text-foreground">• {t}</p>)}
                </div>
              </div>
            )}
            {order.partnerName && (
              <div className="flex items-start gap-2">
                <Building2 size={13} className="text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="text-muted-foreground text-[10px]">Đối tác thực hiện</p>
                  <p className="text-foreground font-semibold">{order.partnerName}</p>
                  {order.partnerPhone && <p className="text-muted-foreground">{order.partnerPhone}</p>}
                </div>
              </div>
            )}
            {order.assignedStaff && order.assignedStaff.length > 0 && (
              <div className="flex items-start gap-2">
                <User size={13} className="text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="text-muted-foreground text-[10px]">Nhân viên thực hiện</p>
                  {order.assignedStaff.map((s) => <p key={s.id} className="text-foreground">• {s.name} ({s.role})</p>)}
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div className="space-y-2.5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          {order.status === "cho_nghiem_thu" && (
            <Button className="w-full touch-target font-bold rounded-2xl gradient-primary border-0 shadow-glow h-14 text-primary-foreground gap-2" onClick={() => setShowConfirm(true)}>
              <CheckCircle2 size={18} /> Xác nhận nghiệm thu
            </Button>
          )}
          {order.status === "hoan_thanh" && (
            <Button className="w-full touch-target font-bold rounded-2xl gradient-primary border-0 shadow-glow h-14 text-primary-foreground gap-2" onClick={() => setShowRate(true)}>
              <Star size={18} /> Đánh giá dịch vụ
            </Button>
          )}
          {order.status === "cho_dieu_phoi" && (
            <Button
              variant="outline"
              className="w-full h-12 rounded-2xl font-semibold gap-2 border-destructive/30 text-destructive hover:bg-destructive/10"
              onClick={handleCancel}
            >
              Hủy đơn hàng
            </Button>
          )}
        </motion.div>
      </div>

      {/* Confirm completion sheet */}
      <Sheet open={showConfirm} onOpenChange={setShowConfirm}>
        <SheetContent side="bottom" className="rounded-t-3xl max-h-[70vh] overflow-y-auto px-5 pb-8">
          <SheetHeader className="pb-4"><SheetTitle className="text-base text-left">Xác nhận nghiệm thu</SheetTitle></SheetHeader>
          <div className="space-y-4">
            <p className="text-[13px] text-muted-foreground">
              Bạn xác nhận đối tác đã hoàn thành dịch vụ theo hợp đồng? Sau khi xác nhận, đơn hàng sẽ chuyển sang trạng thái hoàn thành.
            </p>
            <Textarea placeholder="Ghi chú thêm (tùy chọn)..." className="rounded-xl min-h-[80px]" />
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
                {[1, 2, 3, 4, 5].map((s) => (
                  <motion.button key={s} onClick={() => setRating(s)} whileTap={{ scale: 0.8, rotate: -15 }} className="p-1">
                    <Star size={32} className={s <= rating ? "text-primary fill-primary" : "text-muted-foreground/30"} />
                  </motion.button>
                ))}
              </div>
              <p className="text-lg font-bold text-foreground mt-2">{rating}/5</p>
            </div>
            <Textarea placeholder="Chia sẻ trải nghiệm của bạn..." className="rounded-xl min-h-[80px]" value={rateContent} onChange={(e) => setRateContent(e.target.value)} />
            <Button variant="outline" className="w-full rounded-xl gap-2 font-semibold border-dashed">
              <ImageIcon size={16} /> Đính kèm hình ảnh
            </Button>
            <Button className="w-full touch-target font-bold rounded-2xl gradient-primary border-0 shadow-glow h-14 text-primary-foreground gap-2" onClick={handleRate}>
              <Send size={18} /> Gửi đánh giá
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CustomerOrderDetail;
