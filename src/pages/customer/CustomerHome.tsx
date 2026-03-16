import MobileHeader from "@/components/MobileHeader";
import { Newspaper, ShoppingCart, Leaf, ArrowRight, Star, Sparkles, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";

const servicePlans = [
  { name: "Cơ bản", price: "Miễn phí", features: ["Quản lý 1 NVS", "Báo cáo cơ bản"], gradient: "bg-muted", popular: false },
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

const stagger = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.06 } } },
  item: { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } },
};

const CustomerHome = () => {
  const [visibleProducts, setVisibleProducts] = useState(4);

  return (
    <div>
      <MobileHeader showSwitcher />
      <motion.div className="px-4 py-5 space-y-7" variants={stagger.container} initial="hidden" animate="show">
        {/* Welcome Banner */}
        <motion.section variants={stagger.item} className="gradient-hero rounded-3xl p-5 text-primary-foreground relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute bottom-2 left-4 w-20 h-20 rounded-full bg-white/5 blur-xl" />
          <div className="relative z-10">
            <p className="text-sm opacity-80 mb-1">Xin chào 👋</p>
            <h2 className="text-xl font-bold mb-1">Nguyễn Văn Khách</h2>
            <p className="text-sm opacity-80 flex items-center gap-1"><Sparkles size={14} /> Sạch - Xanh - Tuần hoàn</p>
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
                  {plan.popular ? "Đang sử dụng" : "Chọn gói"}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Tin tức & Tuyển dụng - Lướt ngang */}
        {news.length > 0 && (
          <motion.section variants={stagger.item}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="section-title flex items-center gap-2"><Newspaper size={18} className="text-primary" /> Tin tức & Tuyển dụng</h2>
              <button className="text-xs text-primary font-semibold flex items-center gap-1">Tất cả <ArrowRight size={14} /></button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-3 -mx-4 px-4 snap-x">
              {news.map((n) => (
                <motion.div key={n.id} className="min-w-[200px] glass-card rounded-2xl overflow-hidden shrink-0 snap-start card-hover" whileTap={{ scale: 0.97 }}>
                  <div className="h-28 gradient-mesh flex items-center justify-center text-4xl relative">
                    <span className="relative z-10">{n.emoji}</span>
                  </div>
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
            {products.slice(0, visibleProducts).map((p) => (
              <motion.div key={p.id} className="glass-card rounded-2xl overflow-hidden card-hover" whileTap={{ scale: 0.97 }}>
                <div className="h-28 gradient-mesh flex items-center justify-center relative">
                  <div className="w-14 h-14 rounded-2xl bg-card/60 backdrop-blur-sm flex items-center justify-center">
                    <Leaf size={28} className="text-primary" />
                  </div>
                </div>
                <div className="p-3">
                  <p className="text-sm font-semibold text-foreground mb-1 leading-tight">{p.name}</p>
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
          {visibleProducts < products.length && (
            <Button variant="outline" onClick={() => setVisibleProducts((v) => v + 4)} className="w-full mt-4 touch-target font-semibold rounded-2xl border-2 border-primary/20 text-primary hover:bg-accent">
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
