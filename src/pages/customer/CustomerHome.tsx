import MobileHeader from "@/components/MobileHeader";
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
  { label: "Đơn hàng", icon: ShoppingCart, gradient: "gradient-primary", path: "/customer/orders" },
  { label: "Công việc", icon: Briefcase, gradient: "gradient-blue", path: "/customer/tasks" },
  { label: "Báo cáo", icon: BarChart3, gradient: "gradient-warm", path: "/customer/reports" },
  { label: "NVS", icon: Bath, gradient: "gradient-primary", path: "/customer/toilets" },
  { label: "Khảo sát", icon: ClipboardCheck, gradient: "gradient-blue", badge: "Mới" },
  { label: "Tư vấn", icon: FileText, gradient: "gradient-warm" },
  { label: "Bảo trì", icon: Wrench, gradient: "gradient-primary" },
  { label: "Sản phẩm", icon: Package, gradient: "gradient-blue" },
];

const banners = [
  { id: 1, title: "Gói vệ sinh NVS tháng 3", subtitle: "Giảm 20% cho đơn hàng đầu tiên", gradient: "gradient-hero", emoji: "🧹" },
  { id: 2, title: "Tư vấn Số hóa NVS", subtitle: "Miễn phí khảo sát lần đầu", gradient: "gradient-blue", emoji: "💡" },
  { id: 3, title: "Sản phẩm Xanh mới", subtitle: "Bộ sưu tập Eco Pro 2026", gradient: "gradient-warm", emoji: "🌿" },
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
    name: "Tư vấn số hóa", icon: FileText, status: "completed", gradient: "gradient-blue",
    date: "15/02/2026", completedDate: "10/03/2026",
    location: "Trung tâm thương mại Vincom, Q.1",
    staff: "Trần Thị B", contractCode: "HD-2026-015",
    description: "Tư vấn giải pháp số hóa quản lý nhà vệ sinh thông minh, bao gồm IoT sensor và dashboard.",
    tasks: ["Khảo sát hiện trạng", "Đề xuất giải pháp IoT", "Lắp đặt sensor thử nghiệm", "Bàn giao báo cáo"],
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
  const [showAllActions, setShowAllActions] = useState(false);
  const displayActions = showAllActions ? quickActions : quickActions.slice(0, 4);

  return (
    <div className="min-h-screen">
      <MobileHeader showSwitcher />

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
          <div className="grid grid-cols-4 gap-y-4 gap-x-2">
            {displayActions.map((action, i) => (
              <motion.button
                key={action.label}
                className="flex flex-col items-center gap-1.5 relative"
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.04 }}
              >
                {action.badge && (
                  <span className="absolute -top-1 right-1 text-[7px] font-bold bg-destructive text-destructive-foreground px-1.5 py-0.5 rounded-full z-10">
                    {action.badge}
                  </span>
                )}
                <div className={`w-12 h-12 rounded-2xl ${action.gradient} flex items-center justify-center shadow-sm`}>
                  <action.icon size={20} className="text-primary-foreground" />
                </div>
                <span className="text-[11px] font-medium text-foreground leading-tight text-center">{action.label}</span>
              </motion.button>
            ))}
          </div>
          {quickActions.length > 4 && (
            <motion.button
              onClick={() => setShowAllActions(!showAllActions)}
              className="w-full flex items-center justify-center mt-3 pt-2 border-t border-border/30"
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: showAllActions ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={20} className="text-primary" />
              </motion.div>
            </motion.button>
          )}
        </motion.div>
      </div>

      <motion.div className="px-4 py-5 space-y-6" variants={stagger.container} initial="hidden" animate="show">
        {/* Banner carousel */}
        <motion.section variants={stagger.item}>
          <div className="flex gap-3 overflow-x-auto -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
            {banners.map((b, i) => (
              <motion.div
                key={b.id}
                className={`min-w-[85%] rounded-2xl p-5 shrink-0 snap-center relative overflow-hidden noise-overlay ${b.gradient}`}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
              >
                <div className="relative z-10 flex items-center gap-3">
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-primary-foreground mb-1 leading-snug">{b.title}</h3>
                    <p className="text-xs text-primary-foreground/75 mb-3">{b.subtitle}</p>
                    <Button size="sm" className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-0 rounded-xl text-xs font-bold h-8 px-4 backdrop-blur-sm">
                      Xem ngay
                    </Button>
                  </div>
                  <span className="text-5xl opacity-80">{b.emoji}</span>
                </div>
                <div className="orb w-20 h-20 bg-primary-foreground/10 -bottom-6 -right-6" />
              </motion.div>
            ))}
          </div>
          {/* Dots indicator */}
          <div className="flex justify-center gap-1.5 mt-3">
            {banners.map((_, i) => (
              <span key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === 0 ? "w-4 bg-primary" : "bg-muted-foreground/30"}`} />
            ))}
          </div>
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
            {myServices.filter(s => s.status !== "inactive").map((svc) => (
              <motion.button
                key={svc.name}
                className="w-full rounded-2xl p-3.5 flex items-center gap-3 bg-card shadow-card border border-border/30 card-hover relative overflow-hidden text-left"
                whileTap={{ scale: 0.98 }}
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
                <div className="shrink-0">
                  {svc.status === "active" ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
                      <Clock size={10} /> {svc.statusLabel}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-accent text-primary text-[10px] font-bold">
                      <CheckCircle2 size={10} /> {svc.statusLabel}
                    </span>
                  )}
                </div>
              </motion.button>
            ))}
            {/* Inactive services */}
            <div className="grid grid-cols-3 gap-2 mt-1">
              {myServices.filter(s => s.status === "inactive").map((svc) => (
                <motion.button
                  key={svc.name}
                  className="rounded-2xl p-3 flex flex-col items-center gap-2 text-center bg-muted/30 border border-dashed border-border/40 opacity-70"
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-muted text-muted-foreground">
                    <svc.icon size={16} />
                  </div>
                  <span className="text-[10px] font-medium text-muted-foreground leading-tight">{svc.name}</span>
                  <Plus size={12} className="text-muted-foreground/60" />
                </motion.button>
              ))}
            </div>
          </div>
        </motion.section>

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
