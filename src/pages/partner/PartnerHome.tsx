import PartnerHeader from "./components/PartnerHeader";
import {
  ArrowRight, Leaf, ShoppingCart, Star, Newspaper, Crown,
  ChevronRight, ChevronDown, Briefcase, Bath, ClipboardCheck,
  Users, FileText, Package, TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";

const quickActions = [
  { label: "QL Đơn hàng", icon: ShoppingCart, gradient: "gradient-primary", path: "/partner/orders" },
  { label: "QL Công việc", icon: Briefcase, gradient: "gradient-blue", path: "/partner/tasks" },
  { label: "QL NVS", icon: Bath, gradient: "gradient-warm", path: "/partner/toilets" },
  { label: "Khảo sát", icon: ClipboardCheck, gradient: "gradient-primary", path: "/partner/surveys" },
  { label: "Nhân sự", icon: Users, gradient: "gradient-blue" },
  { label: "Báo cáo", icon: FileText, gradient: "gradient-warm" },
  { label: "Sản phẩm", icon: Package, gradient: "gradient-primary" },
  { label: "Doanh thu", icon: TrendingUp, gradient: "gradient-blue" },
];

const banners = [
  { id: 1, title: "Tuyển đối tác vệ sinh khu vực Q.7", subtitle: "Hoa hồng hấp dẫn, hỗ trợ đào tạo", gradient: "gradient-hero-blue", emoji: "📢" },
  { id: 2, title: "Chính sách hoa hồng mới T4", subtitle: "Tăng 15% cho đối tác VIP", gradient: "gradient-hero", emoji: "💰" },
  { id: 3, title: "Đào tạo kỹ thuật miễn phí", subtitle: "Đăng ký ngay hôm nay", gradient: "gradient-warm", emoji: "🎓" },
];

const servicePlans = [
  { name: "Cơ bản", price: "500K/tháng", features: ["Tiếp nhận đơn hàng", "Quản lý 5 NVS"], popular: false },
  { name: "Nâng cao", price: "1.5M/tháng", features: ["Không giới hạn đơn", "20 NVS", "Báo cáo chi tiết"], popular: true },
  { name: "VIP", price: "3M/tháng", features: ["Toàn bộ quyền lợi", "Ưu tiên điều phối", "Hỗ trợ 24/7"], popular: false },
];

const products = [
  { id: 1, name: "Bộ vệ sinh Eco Pro", price: "350.000đ", rating: 4.9, sold: 456 },
  { id: 2, name: "Bình khử mùi sinh học", price: "120.000đ", rating: 4.7, sold: 234 },
  { id: 3, name: "Nước rửa tay hữu cơ", price: "85.000đ", rating: 4.8, sold: 789 },
  { id: 4, name: "Giấy tái chế Eco", price: "45.000đ", rating: 4.5, sold: 1200 },
];

const stagger = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.05 } } },
  item: { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } },
};

const PartnerHome = () => {
  const [showMore, setShowMore] = useState(false);
  const [showAllActions, setShowAllActions] = useState(false);
  const displayProducts = showMore ? products : products.slice(0, 2);
  const displayActions = showAllActions ? quickActions : quickActions.slice(0, 4);

  return (
    <div className="min-h-screen">
      <PartnerHeader showSwitcher />

      {/* Hero */}
      <div className="bg-primary px-4 pb-8 pt-3 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="orb w-32 h-32 bg-primary-foreground/20 -top-10 -right-10" />
          <div className="orb w-24 h-24 bg-primary-foreground/10 bottom-0 left-10" style={{ animationDelay: "2s" }} />
        </div>
        <motion.div
          className="relative z-10 bg-primary-foreground/12 backdrop-blur-lg rounded-2xl p-4 border border-primary-foreground/10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-primary-foreground/70 text-xs font-medium">Tổng quan đối tác</p>
            <ChevronRight size={14} className="text-primary-foreground/50" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <p className="text-xl font-black text-primary-foreground">12</p>
              <p className="text-[10px] text-primary-foreground/60 font-medium">Đơn tiếp nhận</p>
            </div>
            <div className="text-center border-x border-primary-foreground/10">
              <p className="text-xl font-black text-primary-foreground">8</p>
              <p className="text-[10px] text-primary-foreground/60 font-medium">NVS quản lý</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-black text-primary-foreground">15M</p>
              <p className="text-[10px] text-primary-foreground/60 font-medium">Doanh thu</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Quick actions */}
      <div className="px-4 -mt-4 relative z-10">
        <motion.div className="bg-card rounded-2xl shadow-elevated p-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <div className="grid grid-cols-4 gap-y-4 gap-x-2">
            {displayActions.map((action, i) => (
              <motion.button key={action.label} className="flex flex-col items-center gap-1.5" whileTap={{ scale: 0.9 }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + i * 0.04 }}>
                <div className={`w-12 h-12 rounded-2xl ${action.gradient} flex items-center justify-center shadow-sm`}>
                  <action.icon size={20} className="text-primary-foreground" />
                </div>
                <span className="text-[11px] font-medium text-foreground leading-tight text-center">{action.label}</span>
              </motion.button>
            ))}
          </div>
          {quickActions.length > 4 && (
            <motion.button onClick={() => setShowAllActions(!showAllActions)} className="w-full flex items-center justify-center mt-3 pt-2 border-t border-border/30" whileTap={{ scale: 0.95 }}>
              <motion.div animate={{ rotate: showAllActions ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={20} className="text-primary" />
              </motion.div>
            </motion.button>
          )}
        </motion.div>
      </div>

      <motion.div className="px-4 py-5 space-y-6" variants={stagger.container} initial="hidden" animate="show">
        {/* Banners */}
        <motion.section variants={stagger.item}>
          <div className="flex gap-3 overflow-x-auto -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
            {banners.map((b, i) => (
              <motion.div key={b.id} className={`min-w-[85%] rounded-2xl p-5 shrink-0 snap-center relative overflow-hidden noise-overlay ${b.gradient}`} whileTap={{ scale: 0.98 }} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.08 }}>
                <div className="relative z-10 flex items-center gap-3">
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-primary-foreground mb-1 leading-snug">{b.title}</h3>
                    <p className="text-xs text-primary-foreground/75 mb-3">{b.subtitle}</p>
                    <Button size="sm" className="bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-0 rounded-xl text-xs font-bold h-8 px-4 backdrop-blur-sm">Xem ngay</Button>
                  </div>
                  <span className="text-5xl opacity-80">{b.emoji}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center gap-1.5 mt-3">
            {banners.map((_, i) => (
              <span key={i} className={`w-1.5 h-1.5 rounded-full transition-all ${i === 0 ? "w-4 bg-primary" : "bg-muted-foreground/30"}`} />
            ))}
          </div>
        </motion.section>

        {/* Gói dịch vụ */}
        <motion.section variants={stagger.item}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="section-title flex items-center gap-2"><Crown size={16} className="text-primary" /> Gói dịch vụ</h2>
            <button className="text-xs text-primary font-semibold flex items-center gap-0.5">Chi tiết <ChevronRight size={14} /></button>
          </div>
          <div className="flex gap-3 overflow-x-auto -mx-4 px-4 snap-x snap-mandatory scrollbar-hide pb-1">
            {servicePlans.map((plan) => (
              <motion.div key={plan.name} className={`min-w-[180px] rounded-2xl p-4 shrink-0 snap-start relative overflow-hidden ${plan.popular ? "gradient-primary text-primary-foreground shadow-glow" : "bg-card shadow-card border border-border/30"}`} whileTap={{ scale: 0.97 }}>
                {plan.popular && <span className="absolute top-2 right-2 text-[8px] font-bold uppercase bg-primary-foreground/20 backdrop-blur-sm px-2 py-0.5 rounded-full">⭐ Phổ biến</span>}
                <h3 className={`font-bold text-sm mb-0.5 ${plan.popular ? "" : "text-foreground"}`}>{plan.name}</h3>
                <p className={`text-lg font-black mb-2 ${plan.popular ? "" : "text-primary"}`}>{plan.price}</p>
                <ul className="space-y-1">
                  {plan.features.map((f) => (
                    <li key={f} className={`text-[10px] flex items-center gap-1.5 ${plan.popular ? "opacity-85" : "text-muted-foreground"}`}>
                      <span className={`w-1 h-1 rounded-full ${plan.popular ? "bg-primary-foreground/60" : "bg-primary"}`} /> {f}
                    </li>
                  ))}
                </ul>
                <Button size="sm" className={`w-full mt-3 rounded-xl font-bold text-[11px] h-8 ${plan.popular ? "bg-primary-foreground/90 text-foreground hover:bg-primary-foreground border-0" : "gradient-primary border-0 text-primary-foreground"}`}>
                  {plan.popular ? "✓ Đang dùng" : "Nâng cấp"}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Tin tức */}
        <motion.section variants={stagger.item}>
          <div className="flex justify-between items-center mb-3">
            <h2 className="section-title flex items-center gap-2"><Newspaper size={16} className="text-primary" /> Tin tức</h2>
            <button className="text-xs text-primary font-semibold flex items-center gap-0.5">Tất cả <ArrowRight size={14} /></button>
          </div>
          <div className="flex gap-3 overflow-x-auto -mx-4 px-4 snap-x scrollbar-hide pb-1">
            {[
              { id: 1, title: "Tuyển đối tác vệ sinh Q.7", emoji: "📢", tag: "Tuyển dụng" },
              { id: 2, title: "Xu hướng NVS xanh 2026", emoji: "🌿", tag: "Tin tức" },
              { id: 3, title: "Hoa hồng mới T4/2026", emoji: "💰", tag: "Thông báo" },
            ].map((n) => (
              <motion.div key={n.id} className="min-w-[160px] bg-card rounded-2xl overflow-hidden shrink-0 snap-start shadow-card border border-border/30 card-hover" whileTap={{ scale: 0.97 }}>
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

        {/* Sản phẩm */}
        <motion.section variants={stagger.item}>
          <div className="flex justify-between items-center mb-3">
            <h2 className="section-title flex items-center gap-1.5">🌱 Sản phẩm Xanh</h2>
            <button className="text-xs text-primary font-semibold flex items-center gap-0.5">Tất cả <ArrowRight size={14} /></button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {displayProducts.map((p, i) => (
              <motion.div key={p.id} className="bg-card rounded-2xl overflow-hidden shadow-card border border-border/30 card-hover" whileTap={{ scale: 0.97 }} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.04 }}>
                <div className="h-20 gradient-mesh flex items-center justify-center noise-overlay relative">
                  <div className="relative z-10 w-10 h-10 rounded-xl bg-card/50 backdrop-blur-md flex items-center justify-center border border-border/20">
                    <Leaf size={18} className="text-primary" />
                  </div>
                </div>
                <div className="p-2.5">
                  <p className="text-[12px] font-semibold text-foreground mb-1 leading-tight">{p.name}</p>
                  <div className="flex items-center gap-1.5 mb-1">
                    <Star size={10} className="text-eco-orange fill-eco-orange" />
                    <span className="text-[10px] font-bold text-foreground">{p.rating}</span>
                    <span className="text-[9px] text-muted-foreground">· {p.sold}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-extrabold text-primary">{p.price}</span>
                    <motion.button whileTap={{ scale: 0.8 }} className="w-7 h-7 rounded-lg gradient-primary text-primary-foreground flex items-center justify-center">
                      <ShoppingCart size={13} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {!showMore && products.length > 2 && (
            <Button variant="outline" onClick={() => setShowMore(true)} className="w-full mt-4 touch-target font-semibold rounded-2xl border border-border/40 text-primary">
              Xem thêm
            </Button>
          )}
        </motion.section>

        <div className="h-6" />
      </motion.div>
    </div>
  );
};

export default PartnerHome;
