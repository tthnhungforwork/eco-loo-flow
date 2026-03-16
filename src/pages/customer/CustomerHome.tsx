import MobileHeader from "@/components/MobileHeader";
import { Newspaper, ShoppingCart, Leaf, ArrowRight, Star, Sparkles, Crown, TrendingUp, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";

const servicePlans = [
  { name: "Cơ bản", price: "Miễn phí", features: ["Quản lý 1 NVS", "Báo cáo cơ bản"], gradient: "bg-muted/60", popular: false },
  { name: "Nâng cao", price: "300K/tháng", features: ["Quản lý 10 NVS", "Báo cáo chi tiết", "Ưu tiên hỗ trợ"], gradient: "gradient-primary", popular: true },
  { name: "VIP", price: "800K/tháng", features: ["Không giới hạn NVS", "Hỗ trợ 24/7", "API tích hợp", "Tư vấn riêng"], gradient: "gradient-hero", popular: false },
];

const news = [
  { id: 1, title: "Xu hướng nhà vệ sinh xanh 2026", emoji: "🌿", tag: "Xu hướng" },
  { id: 2, title: "Công nghệ khử mùi mới nhất", emoji: "🔬", tag: "Công nghệ" },
  { id: 3, title: "Tiêu chuẩn vệ sinh quốc tế", emoji: "🏆", tag: "Tiêu chuẩn" },
  { id: 4, title: "Tuyển dụng nhân viên VSLD", emoji: "📢", tag: "Tuyển dụng" },
];

const products = [
  { id: 1, name: "Nước rửa tay hữu cơ", price: "85.000đ", rating: 4.8, sold: 234 },
  { id: 2, name: "Giấy tái chế Eco", price: "45.000đ", rating: 4.5, sold: 567 },
  { id: 3, name: "Bình xịt khử mùi sinh học", price: "120.000đ", rating: 4.9, sold: 189 },
  { id: 4, name: "Túi rác tự phân hủy", price: "35.000đ", rating: 4.3, sold: 890 },
  { id: 5, name: "Bộ vệ sinh Eco Pro", price: "350.000đ", rating: 4.9, sold: 456 },
  { id: 6, name: "Xà phòng thiên nhiên", price: "65.000đ", rating: 4.6, sold: 321 },
];

const quickStats = [
  { label: "NVS của tôi", value: "3", trend: "+1", icon: "🏢" },
  { label: "Công việc", value: "5", trend: "2 mới", icon: "📋" },
  { label: "Đơn hàng", value: "8", trend: "đang xử lý", icon: "📦" },
];

const stagger = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.07 } } },
  item: { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } },
};

const CustomerHome = () => {
  const [visibleProducts, setVisibleProducts] = useState(4);

  return (
    <div className="gradient-surface min-h-screen">
      <MobileHeader showSwitcher />
      <motion.div className="px-4 py-5 space-y-6" variants={stagger.container} initial="hidden" animate="show">
        {/* Hero Banner */}
        <motion.section variants={stagger.item} className="relative rounded-3xl p-5 overflow-hidden noise-overlay">
          <div className="absolute inset-0 gradient-hero" />
          <div className="orb orb-blue w-24 h-24 -top-6 -right-6" style={{ animationDelay: "0s" }} />
          <div className="orb orb-teal w-16 h-16 bottom-2 left-4" style={{ animationDelay: "2s" }} />
          <div className="relative z-10 text-primary-foreground">
            <motion.p
              className="text-sm opacity-80 mb-1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 0.8, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Xin chào 👋
            </motion.p>
            <h2 className="text-xl font-extrabold mb-1 tracking-tight">Nguyễn Văn Khách</h2>
            <p className="text-sm opacity-75 flex items-center gap-1.5">
              <Sparkles size={14} /> Sạch · Xanh · Tuần hoàn
            </p>
          </div>
        </motion.section>

        {/* Quick Stats */}
        <motion.div variants={stagger.item} className="grid grid-cols-3 gap-2.5">
          {quickStats.map((s, i) => (
            <motion.div
              key={s.label}
              className="glass-card rounded-2xl p-3 text-center card-hover"
              whileTap={{ scale: 0.95 }}
            >
              <span className="text-xl">{s.icon}</span>
              <p className="text-lg font-extrabold text-foreground mt-1">{s.value}</p>
              <p className="text-[10px] text-muted-foreground font-medium">{s.label}</p>
              <p className="text-[9px] text-primary font-bold mt-0.5">{s.trend}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Gói dịch vụ */}
        <motion.section variants={stagger.item}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="section-title flex items-center gap-2">
              <div className="icon-container-xs gradient-primary text-primary-foreground shadow-sm">
                <Crown size={14} />
              </div>
              Gói dịch vụ
            </h2>
            <button className="text-xs text-primary font-semibold flex items-center gap-1">
              Chi tiết <ChevronRight size={14} />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-3 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
            {servicePlans.map((plan) => (
              <motion.div
                key={plan.name}
                className={`min-w-[200px] rounded-2xl p-4 shrink-0 snap-start relative overflow-hidden noise-overlay ${
                  plan.popular ? "gradient-primary text-primary-foreground shadow-glow" : "glass-card"
                }`}
                whileTap={{ scale: 0.97 }}
              >
                {plan.popular && (
                  <span className="absolute top-2.5 right-2.5 text-[8px] font-bold uppercase bg-card/25 backdrop-blur-sm px-2 py-0.5 rounded-full tracking-wider">
                    ⭐ Phổ biến
                  </span>
                )}
                <h3 className={`font-bold text-base mb-0.5 ${plan.popular ? "" : "text-foreground"}`}>{plan.name}</h3>
                <p className={`text-xl font-black mb-3 ${plan.popular ? "" : "text-gradient-primary"}`}>{plan.price}</p>
                <ul className="space-y-1.5">
                  {plan.features.map((f) => (
                    <li key={f} className={`text-[11px] flex items-center gap-1.5 ${plan.popular ? "opacity-85" : "text-muted-foreground"}`}>
                      <span className={`w-1 h-1 rounded-full ${plan.popular ? "bg-primary-foreground/60" : "bg-primary"}`} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  size="sm"
                  className={`w-full mt-4 rounded-xl font-bold text-xs h-9 ${
                    plan.popular
                      ? "bg-card/90 text-foreground hover:bg-card border-0"
                      : "gradient-primary border-0 text-primary-foreground shadow-sm"
                  }`}
                >
                  {plan.popular ? "✓ Đang sử dụng" : "Chọn gói"}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Tin tức */}
        {news.length > 0 && (
          <motion.section variants={stagger.item}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="section-title flex items-center gap-2">
                <div className="icon-container-xs bg-secondary/10 text-secondary">
                  <Newspaper size={14} />
                </div>
                Tin tức & Tuyển dụng
              </h2>
              <button className="text-xs text-primary font-semibold flex items-center gap-1">
                Tất cả <ArrowRight size={14} />
              </button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-3 -mx-4 px-4 snap-x scrollbar-hide">
              {news.map((n, i) => (
                <motion.div
                  key={n.id}
                  className="min-w-[180px] glass-card rounded-2xl overflow-hidden shrink-0 snap-start card-hover"
                  whileTap={{ scale: 0.97 }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                >
                  <div className="h-24 gradient-mesh-hero flex items-center justify-center text-3xl relative noise-overlay">
                    <span className="relative z-10 drop-shadow-sm">{n.emoji}</span>
                  </div>
                  <div className="p-3">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-primary mb-1 block">{n.tag}</span>
                    <p className="text-[13px] font-semibold text-foreground leading-tight">{n.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Sản phẩm Xanh */}
        <motion.section variants={stagger.item}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="section-title flex items-center gap-2">
              <span className="text-lg">🌱</span>
              Sản phẩm Xanh
            </h2>
            <button className="text-xs text-primary font-semibold flex items-center gap-1">
              Xem tất cả <ArrowRight size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {products.slice(0, visibleProducts).map((p, i) => (
              <motion.div
                key={p.id}
                className="glass-card rounded-2xl overflow-hidden card-hover"
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <div className="h-28 gradient-mesh flex items-center justify-center relative noise-overlay">
                  <div className="relative z-10 w-14 h-14 rounded-2xl bg-card/50 backdrop-blur-md flex items-center justify-center border border-border/30">
                    <Leaf size={26} className="text-primary" />
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-[13px] font-semibold text-foreground mb-1.5 leading-tight line-clamp-2">{p.name}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-0.5">
                      <Star size={11} className="text-eco-orange fill-eco-orange" />
                      <span className="text-[11px] font-bold text-foreground">{p.rating}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">Đã bán {p.sold}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold text-primary">{p.price}</span>
                    <motion.button
                      whileTap={{ scale: 0.8, rotate: -10 }}
                      className="w-8 h-8 rounded-xl gradient-primary text-primary-foreground flex items-center justify-center shadow-sm"
                    >
                      <ShoppingCart size={14} />
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
              className="w-full mt-4 touch-target font-semibold rounded-2xl border-2 border-primary/15 text-primary hover:bg-accent/50 transition-all"
            >
              <TrendingUp size={14} className="mr-1" />
              Xem thêm sản phẩm
            </Button>
          )}
        </motion.section>

        <div className="h-4" />
      </motion.div>
    </div>
  );
};

export default CustomerHome;
