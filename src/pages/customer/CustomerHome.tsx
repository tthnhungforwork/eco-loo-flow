import MobileHeader from "@/components/MobileHeader";
import StatusBadge from "@/components/StatusBadge";
import { Recycle, Send, QrCode, Newspaper, ShoppingCart, Leaf, ArrowRight, Star, CheckCircle2, Sparkles, Wrench, Droplets } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const services = [
  { icon: Recycle, label: "Vệ sinh", gradient: "gradient-primary" },
  { icon: Droplets, label: "Khử mùi", gradient: "gradient-blue" },
  { icon: QrCode, label: "Quét QR", gradient: "gradient-warm" },
  { icon: Wrench, label: "Bảo trì", gradient: "gradient-primary" },
];

const tasks = [
  { id: 1, title: "Vệ sinh NVS Tầng 3 - Tòa A", status: "processing", date: "16/03/2026", priority: "Cao" },
  { id: 2, title: "Kiểm tra hệ thống nước NVS B2", status: "new", date: "17/03/2026", priority: "Trung bình" },
  { id: 3, title: "Bảo trì thiết bị NVS Sảnh C", status: "done", date: "15/03/2026", priority: "Thấp" },
];

const statusLabel: Record<string, string> = { new: "Mới", processing: "Đang xử lý", done: "Hoàn thành" };

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
  container: { hidden: {}, show: { transition: { staggerChildren: 0.06 } } },
  item: { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } },
};

const CustomerHome = () => (
  <div>
    <MobileHeader />
    <motion.div
      className="px-4 py-5 space-y-7"
      variants={stagger.container}
      initial="hidden"
      animate="show"
    >
      {/* Welcome Banner */}
      <motion.section variants={stagger.item} className="gradient-hero rounded-3xl p-5 text-primary-foreground relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute bottom-2 left-4 w-20 h-20 rounded-full bg-white/5 blur-xl" />
        <div className="relative z-10">
          <p className="text-sm opacity-80 mb-1">Xin chào 👋</p>
          <h2 className="text-xl font-bold mb-1">Nguyễn Văn Khách</h2>
          <p className="text-sm opacity-80 flex items-center gap-1">
            <Sparkles size={14} /> Sạch - Xanh - Tuần hoàn
          </p>
        </div>
      </motion.section>

      {/* Services Grid */}
      <motion.section variants={stagger.item}>
        <h2 className="section-title mb-4">Dịch vụ</h2>
        <div className="grid grid-cols-4 gap-3">
          {services.map((s, i) => (
            <motion.button
              key={s.label}
              className="flex flex-col items-center gap-2 touch-target"
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05 }}
            >
              <div className={`icon-container ${s.gradient} text-primary-foreground shadow-glow`}>
                <s.icon size={22} />
              </div>
              <span className="text-xs font-semibold text-foreground">{s.label}</span>
            </motion.button>
          ))}
        </div>
      </motion.section>

      {/* Send Ticket */}
      <motion.div variants={stagger.item}>
        <Button className="w-full touch-target text-base font-bold gap-2 rounded-2xl gradient-primary border-0 shadow-glow btn-glow h-14">
          <Send size={18} />
          Gửi Ticket hỗ trợ
        </Button>
      </motion.div>

      {/* Task Cards - Horizontal Scroll */}
      <motion.section variants={stagger.item}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="section-title">Công việc NVS</h2>
          <button className="text-xs text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all">
            Xem tất cả <ArrowRight size={14} />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-3 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              className="min-w-[270px] glass-card rounded-2xl p-4 shrink-0 snap-start card-hover"
              whileTap={{ scale: 0.97 }}
            >
              <div className="flex justify-between items-start mb-3">
                <p className="font-semibold text-sm text-foreground leading-tight flex-1 mr-2">{task.title}</p>
                <StatusBadge status={task.status} label={statusLabel[task.status]} />
              </div>
              <div className="flex justify-between items-center">
                <p className="text-xs text-muted-foreground">{task.date}</p>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${
                  task.priority === "Cao" ? "text-eco-red" : task.priority === "Trung bình" ? "text-eco-orange" : "text-muted-foreground"
                }`}>{task.priority}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Stats Cards */}
      <motion.section variants={stagger.item} className="grid grid-cols-2 gap-3">
        <div className="glass-card rounded-2xl p-4 card-hover">
          <div className="icon-container-sm bg-eco-green-light mb-3">
            <CheckCircle2 size={20} className="text-primary" />
          </div>
          <p className="text-2xl font-extrabold text-foreground animate-count-up">128</p>
          <p className="text-xs text-muted-foreground font-medium">Đã thực hiện</p>
        </div>
        <div className="glass-card rounded-2xl p-4 card-hover">
          <div className="icon-container-sm bg-eco-blue-light mb-3">
            <Sparkles size={20} className="text-secondary" />
          </div>
          <p className="text-2xl font-extrabold text-foreground">92%</p>
          <p className="text-xs text-muted-foreground font-medium">Hiệu suất</p>
        </div>
      </motion.section>

      {/* Partner Banner */}
      <motion.section variants={stagger.item} className="gradient-hero rounded-3xl p-6 text-primary-foreground relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/4 blur-2xl" />
        <div className="relative z-10">
          <h3 className="font-extrabold text-lg mb-1">Trở thành Đối tác 🤝</h3>
          <p className="text-sm opacity-85 mb-4 leading-relaxed">Đăng ký ngay để nhận nhiều ưu đãi và mở rộng kinh doanh</p>
          <Button size="sm" className="font-bold bg-card/90 text-foreground hover:bg-card rounded-xl shadow-elevated border-0 px-6">
            Đăng ký ngay
          </Button>
        </div>
      </motion.section>

      {/* Service Plans */}
      <motion.section variants={stagger.item}>
        <h2 className="section-title mb-4">Gói dịch vụ</h2>
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="grid grid-cols-4 text-xs font-semibold text-center">
            <div className="p-3 bg-muted/50 text-left text-muted-foreground">Quyền lợi</div>
            <div className="p-3 text-muted-foreground">Cơ bản</div>
            <div className="p-3 text-primary-foreground gradient-primary font-bold">Nâng cao</div>
            <div className="p-3 text-muted-foreground">VIP</div>
          </div>
          {["Vệ sinh định kỳ", "Khử mùi", "Bảo trì thiết bị", "Báo cáo chi tiết"].map((item, i) => (
            <div key={item} className="grid grid-cols-4 text-xs text-center border-t border-border/50">
              <div className="p-3 text-left text-foreground font-medium">{item}</div>
              <div className="p-3 text-muted-foreground">{i < 2 ? "✓" : "—"}</div>
              <div className="p-3 bg-accent/40 font-bold text-primary">✓</div>
              <div className="p-3">✓</div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* News - Horizontal */}
      <motion.section variants={stagger.item}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="section-title">Tin tức</h2>
          <button className="text-xs text-primary font-semibold flex items-center gap-1">
            Xem tất cả <ArrowRight size={14} />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-3 -mx-4 px-4 snap-x">
          {news.map((n) => (
            <motion.div
              key={n.id}
              className="min-w-[200px] glass-card rounded-2xl overflow-hidden shrink-0 snap-start card-hover"
              whileTap={{ scale: 0.97 }}
            >
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

      {/* Green Products */}
      <motion.section variants={stagger.item}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="section-title">Sản phẩm Xanh 🌱</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {products.map((p) => (
            <motion.div
              key={p.id}
              className="glass-card rounded-2xl overflow-hidden card-hover"
              whileTap={{ scale: 0.97 }}
            >
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
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    className="w-9 h-9 rounded-xl gradient-primary text-primary-foreground flex items-center justify-center shadow-glow"
                  >
                    <ShoppingCart size={15} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4 touch-target font-semibold rounded-2xl border-2 border-primary/20 text-primary hover:bg-accent">
          Xem thêm sản phẩm
        </Button>
      </motion.section>

      {/* Bottom spacer */}
      <div className="h-4" />
    </motion.div>
  </div>
);

export default CustomerHome;
