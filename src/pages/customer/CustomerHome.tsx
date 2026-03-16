import CustomerHeader from "./components/CustomerHeader";
import {
  Newspaper, ShoppingCart, Leaf, ArrowRight, Star, Crown,
  ChevronRight, Briefcase, BarChart3, Bath, FileText,
  Wrench, ClipboardCheck, Package, ChevronDown, Hammer, Recycle, HardHat, Sparkles,
  CalendarDays, CheckCircle2, Plus, MapPin, User, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const quickActions = [
  { label: "Liên hệ tư vấn", icon: FileText, gradient: "gradient-blue", path: "/customer/surveys" },
  { label: "Vệ sinh lau dọn", icon: Sparkles, gradient: "gradient-primary", path: "/customer/orders" },
  { label: "Sửa chữa bảo dưỡng", icon: Wrench, gradient: "gradient-warm", path: "/customer/orders" },
  { label: "Xây mới", icon: HardHat, gradient: "gradient-primary", path: "/customer/orders" },
  { label: "Cải tạo", icon: Hammer, gradient: "gradient-blue", path: "/customer/orders" },
  { label: "Netzero", icon: Recycle, gradient: "gradient-warm", path: "/customer/orders" },
];


const myServices = [
  {
    name: "Vệ sinh lau dọn", icon: Sparkles, status: "completed", gradient: "gradient-primary",
    date: "01/01/2026", completedDate: "28/02/2026",
    location: "Tòa nhà Landmark 81, Q. Bình Thạnh",
    staff: "Nguyễn Văn A", contractCode: "HD-2026-001",
    description: "Dịch vụ vệ sinh lau dọn định kỳ hàng tháng cho khu vực nhà vệ sinh công cộng.",
    tasks: ["Lau sàn nhà vệ sinh", "Vệ sinh bồn cầu & lavabo", "Bổ sung vật tư tiêu hao", "Khử mùi & diệt khuẩn"],
  },
  {
    name: "Liên hệ tư vấn", icon: FileText, status: "completed", gradient: "gradient-blue",
    date: "15/02/2026", completedDate: "10/03/2026",
    location: "Trung tâm thương mại Vincom, Q.1",
    staff: "Trần Thị B", contractCode: "HD-2026-015",
    description: "Liên hệ tư vấn giải pháp số hóa quản lý nhà vệ sinh thông minh.",
    tasks: ["Khảo sát hiện trạng", "Đề xuất giải pháp", "Tư vấn lắp đặt", "Bàn giao báo cáo"],
  },
  {
    name: "Sửa chữa bảo dưỡng", icon: Wrench, status: "completed", gradient: "gradient-warm",
    date: "10/12/2025", completedDate: "25/12/2025",
    location: "Bệnh viện Đa khoa Q.7",
    staff: "Lê Văn C", contractCode: "HD-2025-089",
    description: "Sửa chữa và bảo dưỡng toàn bộ hệ thống ống nước, thiết bị vệ sinh tại tầng 1-3.",
    tasks: ["Kiểm tra hệ thống ống nước", "Thay thế van vòi hỏng", "Bảo dưỡng bồn cầu", "Kiểm tra rò rỉ"],
  },
  { name: "Xây mới", icon: HardHat, status: "inactive", gradient: "bg-muted" },
  { name: "Cải tạo", icon: Hammer, status: "inactive", gradient: "bg-muted" },
  { name: "Netzero", icon: Recycle, status: "inactive", gradient: "bg-muted" },
];

const news = [
  { id: 1, title: "Xu hướng nhà vệ sinh xanh 2026", emoji: "🌿", tag: "Xu hướng" },
  { id: 2, title: "Công nghệ khử mùi mới nhất", emoji: "🔬", tag: "Công nghệ" },
  { id: 3, title: "Tiêu chuẩn vệ sinh quốc tế", emoji: "🏆", tag: "Tiêu chuẩn" },
];

const products = [
  { id: 1, name: "Nước rửa tay hữu cơ", price: "85.000đ", rating: 4.8, sold: 234 },
  { id: 2, name: "Giấy tái chế Eco", price: "45.000đ", rating: 4.5, sold: 567 },
  { id: 3, name: "Bình xịt khử mùi sinh học", price: "120.000đ", rating: 4.9, sold: 189 },
  { id: 4, name: "Túi rác tự phân hủy", price: "35.000đ", rating: 4.3, sold: 890 },
];

const stagger = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.05 } } },
  item: { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } },
};

const CustomerHome = () => {
  const [visibleProducts, setVisibleProducts] = useState(4);
  const [selectedService, setSelectedService] = useState<typeof myServices[0] | null>(null);

  return (
    <div className="min-h-screen">
      <CustomerHeader showSwitcher />

      {/* Hero area with gradient continuation from header */}
      <div className="bg-primary px-4 pb-8 pt-3 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="orb w-32 h-32 bg-primary-foreground/20 -top-10 -right-10" />
          <div className="orb w-24 h-24 bg-primary-foreground/10 bottom-0 left-10" style={{ animationDelay: "2s" }} />
        </div>

        {/* Account summary card */}
        <motion.div
          className="relative z-10 bg-primary-foreground/12 backdrop-blur-lg rounded-2xl p-4 border border-primary-foreground/10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-primary-foreground/70 text-xs font-medium">Tổng quan</p>
            <ChevronRight size={14} className="text-primary-foreground/50" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <p className="text-xl font-black text-primary-foreground">3</p>
              <p className="text-[10px] text-primary-foreground/60 font-medium">NVS</p>
            </div>
            <div className="text-center border-x border-primary-foreground/10">
              <p className="text-xl font-black text-primary-foreground">5</p>
              <p className="text-[10px] text-primary-foreground/60 font-medium">Công việc</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-black text-primary-foreground">8</p>
              <p className="text-[10px] text-primary-foreground/60 font-medium">Đơn hàng</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick actions grid - overlapping the hero */}
      <div className="px-4 -mt-4 relative z-10">
        <motion.div
          className="bg-card rounded-2xl shadow-elevated p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <div className="grid grid-cols-3 gap-y-4 gap-x-2">
            {quickActions.map((action, i) => (
              <motion.button
                key={action.label}
                className="flex flex-col items-center gap-1.5 relative"
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.04 }}
              >
                <div className={`w-12 h-12 rounded-2xl ${action.gradient} flex items-center justify-center shadow-sm`}>
                  <action.icon size={20} className="text-primary-foreground" />
                </div>
                <span className="text-[11px] font-medium text-foreground leading-tight text-center">{action.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div className="px-4 py-5 space-y-6" variants={stagger.container} initial="hidden" animate="show">

        {/* Gửi ticket - Banner CTA */}
        <motion.section variants={stagger.item}>
          <motion.div
            className="relative rounded-2xl overflow-hidden cursor-pointer"
            whileTap={{ scale: 0.98 }}
            onClick={() => window.location.href = "/customer/tickets"}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/70" />
            <div className="absolute inset-0 opacity-10">
              <div className="orb w-24 h-24 bg-primary-foreground/30 -top-6 -right-6" />
              <div className="orb w-16 h-16 bg-primary-foreground/20 bottom-0 left-8" style={{ animationDelay: "1.5s" }} />
            </div>
            <div className="relative z-10 p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-primary-foreground/15 backdrop-blur-md flex items-center justify-center border border-primary-foreground/10 shrink-0">
                <ClipboardCheck size={22} className="text-primary-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-bold text-primary-foreground">Gửi yêu cầu hỗ trợ</p>
                <p className="text-[11px] text-primary-foreground/70 mt-0.5">Tạo ticket để được hỗ trợ nhanh chóng</p>
              </div>
              <div className="w-8 h-8 rounded-full bg-primary-foreground/15 flex items-center justify-center shrink-0">
                <ArrowRight size={16} className="text-primary-foreground" />
              </div>
            </div>
          </motion.div>
        </motion.section>

        {/* Gói dịch vụ */}
        <motion.section variants={stagger.item}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="section-title flex items-center gap-2">
              <Crown size={16} className="text-primary" /> Gói dịch vụ
            </h2>
            <button className="text-xs text-primary font-semibold flex items-center gap-0.5">Tất cả <ChevronRight size={14} /></button>
          </div>
          <div className="space-y-2.5">
            {myServices.filter(s => s.status === "completed").map((svc) => (
              <motion.button
                key={svc.name}
                className="w-full rounded-2xl p-3.5 flex items-center gap-3 bg-card shadow-card border border-border/30 card-hover relative overflow-hidden text-left"
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedService(svc)}
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${svc.gradient} text-primary-foreground shadow-sm`}>
                  <svc.icon size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold text-foreground leading-tight">{svc.name}</p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <CalendarDays size={10} className="text-muted-foreground shrink-0" />
                    <span className="text-[10px] text-muted-foreground">{svc.date}</span>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-accent text-primary text-[10px] font-bold shrink-0">
                  <CheckCircle2 size={10} /> Hoàn thành
                </span>
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* Service detail sheet */}
        <Sheet open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
          <SheetContent side="bottom" className="rounded-t-3xl max-h-[85vh] overflow-y-auto px-5 pb-8">
            {selectedService && (
              <>
                <SheetHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${selectedService.gradient} text-primary-foreground shadow-sm`}>
                      <selectedService.icon size={22} />
                    </div>
                    <div>
                      <SheetTitle className="text-base text-left">{selectedService.name}</SheetTitle>
                      <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-accent text-primary text-[10px] font-bold">
                        <CheckCircle2 size={10} /> Hoàn thành
                      </span>
                    </div>
                  </div>
                </SheetHeader>

                <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">
                  {selectedService.description}
                </p>

                <div className="space-y-3 mb-5">
                  <div className="flex items-center gap-3 bg-muted/40 rounded-xl p-3">
                    <FileText size={16} className="text-primary shrink-0" />
                    <div>
                      <p className="text-[10px] text-muted-foreground">Mã hợp đồng</p>
                      <p className="text-[13px] font-semibold text-foreground">{selectedService.contractCode}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-muted/40 rounded-xl p-3">
                    <CalendarDays size={16} className="text-primary shrink-0" />
                    <div>
                      <p className="text-[10px] text-muted-foreground">Ngày đăng ký → Hoàn thành</p>
                      <p className="text-[13px] font-semibold text-foreground">{selectedService.date} → {selectedService.completedDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-muted/40 rounded-xl p-3">
                    <MapPin size={16} className="text-primary shrink-0" />
                    <div>
                      <p className="text-[10px] text-muted-foreground">Địa điểm</p>
                      <p className="text-[13px] font-semibold text-foreground">{selectedService.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-muted/40 rounded-xl p-3">
                    <User size={16} className="text-primary shrink-0" />
                    <div>
                      <p className="text-[10px] text-muted-foreground">Nhân viên phụ trách</p>
                      <p className="text-[13px] font-semibold text-foreground">{selectedService.staff}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[12px] font-bold text-foreground mb-2">Hạng mục công việc</p>
                  <div className="space-y-2">
                    {selectedService.tasks?.map((task, i) => (
                      <div key={i} className="flex items-center gap-2.5 bg-card border border-border/30 rounded-xl p-3">
                        <CheckCircle2 size={16} className="text-primary shrink-0" />
                        <span className="text-[12px] text-foreground">{task}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </SheetContent>
        </Sheet>

        {/* Tin tức */}
        <motion.section variants={stagger.item}>
          <div className="flex justify-between items-center mb-3">
            <h2 className="section-title flex items-center gap-2">
              <Newspaper size={16} className="text-primary" /> Tin tức
            </h2>
            <button className="text-xs text-primary font-semibold flex items-center gap-0.5">Tất cả <ArrowRight size={14} /></button>
          </div>
          <div className="flex gap-3 overflow-x-auto -mx-4 px-4 snap-x scrollbar-hide pb-1">
            {news.map((n, i) => (
              <motion.div
                key={n.id}
                className="min-w-[160px] bg-card rounded-2xl overflow-hidden shrink-0 snap-start shadow-card border border-border/30 card-hover"
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.05 }}
              >
                <div className="h-20 gradient-mesh-hero flex items-center justify-center text-2xl noise-overlay relative">
                  <span className="relative z-10">{n.emoji}</span>
                </div>
                <div className="p-2.5">
                  <span className="text-[8px] font-bold uppercase tracking-widest text-primary mb-0.5 block">{n.tag}</span>
                  <p className="text-[12px] font-semibold text-foreground leading-tight">{n.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Sản phẩm Xanh */}
        <motion.section variants={stagger.item}>
          <div className="flex justify-between items-center mb-3">
            <h2 className="section-title flex items-center gap-1.5">🌱 Sản phẩm Xanh</h2>
            <button className="text-xs text-primary font-semibold flex items-center gap-0.5">Tất cả <ArrowRight size={14} /></button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {products.slice(0, visibleProducts).map((p, i) => (
              <motion.div
                key={p.id}
                className="bg-card rounded-2xl overflow-hidden shadow-card border border-border/30 card-hover"
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.04 }}
              >
                <div className="h-24 gradient-mesh flex items-center justify-center noise-overlay relative">
                  <div className="relative z-10 w-12 h-12 rounded-2xl bg-card/50 backdrop-blur-md flex items-center justify-center border border-border/20">
                    <Leaf size={22} className="text-primary" />
                  </div>
                </div>
                <div className="p-2.5">
                  <p className="text-[12px] font-semibold text-foreground mb-1 leading-tight line-clamp-2">{p.name}</p>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Star size={10} className="text-eco-orange fill-eco-orange" />
                    <span className="text-[10px] font-bold text-foreground">{p.rating}</span>
                    <span className="text-[9px] text-muted-foreground">· {p.sold} đã bán</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-extrabold text-primary">{p.price}</span>
                    <motion.button
                      whileTap={{ scale: 0.8, rotate: -10 }}
                      className="w-7 h-7 rounded-lg gradient-primary text-primary-foreground flex items-center justify-center shadow-sm"
                    >
                      <ShoppingCart size={13} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {visibleProducts < products.length && (
            <Button
              variant="outline"
              onClick={() => setVisibleProducts((v) => v + 4)}
              className="w-full mt-4 touch-target font-semibold rounded-2xl border border-border/40 text-primary hover:bg-accent/50"
            >
              Xem thêm
            </Button>
          )}
        </motion.section>

        <div className="h-6" />
      </motion.div>
    </div>
  );
};

export default CustomerHome;
