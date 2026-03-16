import MobileHeader from "@/components/MobileHeader";
import StatusBadge from "@/components/StatusBadge";
import { ArrowRight, CheckCircle2, Leaf, ShoppingCart, Star, Megaphone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const orders = [
  { id: "PDH-001", name: "Đơn vệ sinh NVS Tầng 5", client: "Công ty ABC", status: "new" },
  { id: "PDH-002", name: "Đơn bảo trì hệ thống", client: "KTX Đại học X", status: "processing" },
];

const tasks = [
  { id: 1, title: "Lắp đặt thiết bị NVS mới", status: "new", date: "18/03/2026" },
  { id: 2, title: "Vệ sinh định kỳ Block C", status: "processing", date: "16/03/2026" },
  { id: 3, title: "Kiểm tra chất lượng nước", status: "done", date: "15/03/2026" },
];

const statusLabel: Record<string, string> = { new: "Mới", processing: "Đang xử lý", done: "Hoàn thành" };

const stagger = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.06 } } },
  item: { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } },
};

const PartnerHome = () => (
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

      {/* Orders */}
      <motion.section variants={stagger.item}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="section-title">Đơn hàng mới</h2>
          <button className="text-xs text-primary font-semibold flex items-center gap-1">Xem tất cả <ArrowRight size={14} /></button>
        </div>
        {orders.map((o) => (
          <div key={o.id} className="glass-card rounded-2xl p-4 mb-3 card-hover">
            <div className="flex justify-between items-start mb-1">
              <p className="font-semibold text-sm text-foreground">{o.name}</p>
              <StatusBadge status={o.status} label={statusLabel[o.status]} />
            </div>
            <p className="text-xs text-muted-foreground font-mono">{o.client} · #{o.id}</p>
            <Button size="sm" className="w-full mt-3 touch-target font-bold rounded-xl gradient-primary border-0 shadow-glow">Điều phối</Button>
          </div>
        ))}
      </motion.section>

      {/* Tasks Horizontal */}
      <motion.section variants={stagger.item}>
        <h2 className="section-title mb-4">Công việc NVS</h2>
        <div className="flex gap-3 overflow-x-auto pb-3 -mx-4 px-4 snap-x">
          {tasks.map((t) => (
            <motion.div key={t.id} className="min-w-[250px] glass-card rounded-2xl p-4 shrink-0 snap-start card-hover" whileTap={{ scale: 0.97 }}>
              <div className="flex justify-between items-start mb-2">
                <p className="font-semibold text-sm text-foreground flex-1 mr-2">{t.title}</p>
                <StatusBadge status={t.status} label={statusLabel[t.status]} />
              </div>
              <p className="text-xs text-muted-foreground">{t.date}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Stats */}
      <motion.section variants={stagger.item} className="grid grid-cols-2 gap-3">
        <div className="glass-card rounded-2xl p-4 card-hover">
          <div className="icon-container-sm gradient-primary text-primary-foreground mb-3 shadow-sm">
            <CheckCircle2 size={18} />
          </div>
          <p className="text-2xl font-extrabold text-foreground">256</p>
          <p className="text-xs text-muted-foreground font-medium">Đã thực hiện</p>
        </div>
        <div className="glass-card rounded-2xl p-4 card-hover">
          <div className="icon-container-sm gradient-blue text-secondary-foreground mb-3 shadow-sm">
            <Sparkles size={18} />
          </div>
          <p className="text-2xl font-extrabold text-foreground">4.8★</p>
          <p className="text-xs text-muted-foreground font-medium">Đánh giá</p>
        </div>
      </motion.section>

      {/* Agent Banner */}
      <motion.section variants={stagger.item} className="gradient-warm rounded-3xl p-6 text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/4 blur-2xl" />
        <div className="relative z-10 flex items-start gap-3">
          <Megaphone size={24} className="mt-0.5 shrink-0" />
          <div>
            <h3 className="font-extrabold text-lg mb-1">Trở thành Đại lý</h3>
            <p className="text-sm opacity-85 mb-4">Bán hàng dropshipping, nhận hoa hồng hấp dẫn</p>
            <Button size="sm" className="font-bold bg-card/90 text-foreground hover:bg-card rounded-xl border-0 px-6">Đăng ký</Button>
          </div>
        </div>
      </motion.section>

      {/* Products */}
      <motion.section variants={stagger.item}>
        <h2 className="section-title mb-4">Sản phẩm Xanh 🌱</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: "Bộ vệ sinh Eco Pro", price: "350.000đ", rating: 4.9 },
            { name: "Bình khử mùi sinh học", price: "120.000đ", rating: 4.7 },
          ].map((p) => (
            <motion.div key={p.name} className="glass-card rounded-2xl overflow-hidden card-hover" whileTap={{ scale: 0.97 }}>
              <div className="h-24 gradient-mesh flex items-center justify-center">
                <div className="w-12 h-12 rounded-xl bg-card/60 backdrop-blur-sm flex items-center justify-center">
                  <Leaf size={24} className="text-primary" />
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm font-semibold text-foreground mb-1">{p.name}</p>
                <div className="flex items-center gap-1 mb-2">
                  <Star size={11} className="text-eco-orange fill-eco-orange" />
                  <span className="text-[11px] font-bold text-foreground">{p.rating}</span>
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
      </motion.section>

      <div className="h-4" />
    </motion.div>
  </div>
);

export default PartnerHome;
