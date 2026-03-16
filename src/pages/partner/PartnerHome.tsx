import MobileHeader from "@/components/MobileHeader";
import { ArrowRight, Leaf, ShoppingCart, Star, Sparkles, Newspaper, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";

const servicePlans = [
  { name: "Cơ bản", price: "500K/tháng", features: ["Tiếp nhận đơn hàng", "Quản lý 5 NVS"], gradient: "bg-muted", popular: false },
  { name: "Nâng cao", price: "1.5M/tháng", features: ["Tiếp nhận không giới hạn", "Quản lý 20 NVS", "Báo cáo chi tiết"], gradient: "gradient-primary", popular: true },
  { name: "VIP", price: "3M/tháng", features: ["Toàn bộ quyền lợi", "Ưu tiên điều phối", "Hỗ trợ 24/7", "API tích hợp"], gradient: "gradient-hero", popular: false },
];

const news = [
  { id: 1, title: "Tuyển đối tác vệ sinh khu vực Q.7", emoji: "📢", tag: "Tuyển dụng" },
  { id: 2, title: "Xu hướng NVS xanh 2026", emoji: "🌿", tag: "Tin tức" },
  { id: 3, title: "Chính sách hoa hồng mới T4/2026", emoji: "💰", tag: "Thông báo" },
];

const products = [
  { id: 1, name: "Bộ vệ sinh Eco Pro", price: "350.000đ", rating: 4.9, sold: 456 },
  { id: 2, name: "Bình khử mùi sinh học", price: "120.000đ", rating: 4.7, sold: 234 },
  { id: 3, name: "Nước rửa tay hữu cơ", price: "85.000đ", rating: 4.8, sold: 789 },
  { id: 4, name: "Giấy tái chế Eco", price: "45.000đ", rating: 4.5, sold: 1200 },
];

const stagger = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.06 } } },
  item: { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } },
};

const PartnerHome = () => {
  const [showMore, setShowMore] = useState(false);
  const displayProducts = showMore ? products : products.slice(0, 2);

  return (
    <div>
      <MobileHeader showSwitcher />
      <motion.div className="px-4 py-5 space-y-7" variants={stagger.container} initial="hidden" animate="show">
        {/* Welcome */}
        <motion.section variants={stagger.item} className="gradient-blue rounded-3xl p-5 text-secondary-foreground relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
          <div className="relative z-10">
            <p className="text-sm opacity-80 mb-1">Xin chào Đối tác 🤝</p>
            <h2 className="text-xl font-bold mb-1">Công ty Eco Clean</h2>
            <p className="text-sm opacity-80 flex items-center gap-1"><Sparkles size={14} /> Đối tác chính thức</p>
          </div>
        </motion.section>

        {/* Gói dịch vụ */}
        <motion.section variants={stagger.item}>
          <h2 className="section-title mb-4 flex items-center gap-2"><Crown size={18} className="text-primary" /> Gói dịch vụ</h2>
          <div className="flex gap-3 overflow-x-auto pb-3 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
            {servicePlans.map((plan) => (
              <motion.div
                key={plan.name}
                className={`min-w-[220px] rounded-2xl p-4 shrink-0 snap-start relative overflow-hidden ${plan.popular ? "gradient-primary text-primary-foreground" : "glass-card"}`}
                whileTap={{ scale: 0.97 }}
              >
                {plan.popular && (
                  <span className="absolute top-2 right-2 text-[9px] font-bold uppercase bg-card/20 backdrop-blur-sm px-2 py-0.5 rounded-full">Phổ biến</span>
                )}
                <h3 className={`font-bold text-base mb-1 ${plan.popular ? "" : "text-foreground"}`}>{plan.name}</h3>
                <p className={`text-lg font-extrabold mb-3 ${plan.popular ? "" : "text-primary"}`}>{plan.price}</p>
                <ul className="space-y-1.5">
                  {plan.features.map((f) => (
                    <li key={f} className={`text-xs flex items-center gap-1.5 ${plan.popular ? "opacity-90" : "text-muted-foreground"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${plan.popular ? "bg-primary-foreground/60" : "bg-primary"}`} /> {f}
                    </li>
                  ))}
                </ul>
                <Button size="sm" className={`w-full mt-4 rounded-xl font-bold ${plan.popular ? "bg-card/90 text-foreground hover:bg-card border-0" : "gradient-primary border-0 shadow-glow"}`}>
                  {plan.popular ? "Đang sử dụng" : "Nâng cấp"}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Tin tức, tuyển dụng - Lướt ngang */}
        {news.length > 0 && (
          <motion.section variants={stagger.item}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="section-title flex items-center gap-2"><Newspaper size={18} className="text-primary" /> Tin tức & Tuyển dụng</h2>
              <button className="text-xs text-primary font-semibold flex items-center gap-1">Tất cả <ArrowRight size={14} /></button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-3 -mx-4 px-4 snap-x">
              {news.map((n) => (
                <motion.div key={n.id} className="min-w-[200px] glass-card rounded-2xl overflow-hidden shrink-0 snap-start card-hover" whileTap={{ scale: 0.97 }}>
                  <div className="h-24 gradient-mesh flex items-center justify-center text-3xl">{n.emoji}</div>
                  <div className="p-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary mb-1 block">{n.tag}</span>
                    <p className="text-sm font-semibold text-foreground leading-tight">{n.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Sản phẩm Xanh - Loadmore */}
        <motion.section variants={stagger.item}>
          <h2 className="section-title mb-4">Sản phẩm Xanh 🌱</h2>
          <div className="grid grid-cols-2 gap-3">
            {displayProducts.map((p) => (
              <motion.div key={p.id} className="glass-card rounded-2xl overflow-hidden card-hover" whileTap={{ scale: 0.97 }}>
                <div className="h-24 gradient-mesh flex items-center justify-center">
                  <div className="w-12 h-12 rounded-xl bg-card/60 backdrop-blur-sm flex items-center justify-center">
                    <Leaf size={24} className="text-primary" />
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold text-foreground mb-1">{p.name}</p>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-0.5">
                      <Star size={11} className="text-eco-orange fill-eco-orange" />
                      <span className="text-[11px] font-bold text-foreground">{p.rating}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">Đã bán {p.sold}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-extrabold text-primary">{p.price}</span>
                    <motion.button whileTap={{ scale: 0.85 }} className="w-9 h-9 rounded-xl gradient-primary text-primary-foreground flex items-center justify-center shadow-glow">
                      <ShoppingCart size={15} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {!showMore && products.length > 2 && (
            <Button variant="outline" onClick={() => setShowMore(true)} className="w-full mt-4 touch-target font-semibold rounded-2xl border-2 border-primary/20 text-primary hover:bg-accent">
              Xem thêm sản phẩm
            </Button>
          )}
        </motion.section>

        <div className="h-4" />
      </motion.div>
    </div>
  );
};

export default PartnerHome;
