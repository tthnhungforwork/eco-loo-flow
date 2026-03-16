import MobileHeader from "@/components/MobileHeader";
import StatusBadge from "@/components/StatusBadge";
import { ShoppingBag, Wrench, BarChart3, TrendingUp, Users, Bath, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const serviceOrders = [
  { id: "DV-101", name: "Vệ sinh NVS KTX Block A", client: "KTX Đại học X", status: "new" },
  { id: "DV-102", name: "Bảo trì thiết bị Tầng 3", client: "Công ty ABC", status: "new" },
];

const salesOrders = [
  { id: "BH-201", name: "Nước rửa tay Eco x100", client: "Đại lý Miền Nam", status: "new" },
];

const dashStats = [
  { label: "Tổng NVS", value: "1,245", icon: Bath, gradient: "gradient-primary" },
  { label: "Đối tác", value: "89", icon: Users, gradient: "gradient-blue" },
  { label: "Đơn tháng", value: "342", icon: ShoppingBag, gradient: "gradient-warm" },
  { label: "Doanh thu", value: "1.2 tỷ", icon: TrendingUp, gradient: "gradient-primary" },
];

const monthlyData = [
  { month: "T1", value: 45 }, { month: "T2", value: 62 }, { month: "T3", value: 78 },
  { month: "T4", value: 55 }, { month: "T5", value: 85 }, { month: "T6", value: 92 },
];

const stagger = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.06 } } },
  item: { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } },
};

const AdminHome = () => (
  <div>
    <MobileHeader title="Dashboard" showSwitcher />
    <motion.div className="px-4 py-5 space-y-6" variants={stagger.container} initial="hidden" animate="show">
      {/* Welcome */}
      <motion.section variants={stagger.item} className="gradient-hero rounded-3xl p-5 text-primary-foreground relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
        <div className="relative z-10">
          <p className="text-sm opacity-80 mb-1">Dashboard Admin 🛡️</p>
          <h2 className="text-xl font-bold mb-1">Hệ thống KTX</h2>
          <p className="text-sm opacity-80 flex items-center gap-1"><Sparkles size={14} /> Tổng quan hoạt động</p>
        </div>
      </motion.section>

      {/* Stats */}
      <motion.div variants={stagger.item} className="grid grid-cols-2 gap-3">
        {dashStats.map((s, i) => (
          <motion.div key={s.label} className="glass-card rounded-2xl p-4 card-hover" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 + i * 0.06 }}>
            <div className={`icon-container-sm ${s.gradient} text-primary-foreground mb-3 shadow-sm`}>
              <s.icon size={18} />
            </div>
            <p className="text-xl font-extrabold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Service Orders */}
      <motion.section variants={stagger.item}>
        <h2 className="section-title mb-4 flex items-center gap-2"><Wrench size={18} className="text-primary" /> Đơn dịch vụ cần điều phối</h2>
        {serviceOrders.map((o) => (
          <div key={o.id} className="glass-card rounded-2xl p-4 mb-3 card-hover">
            <div className="flex justify-between items-start mb-1">
              <p className="font-semibold text-sm text-foreground">{o.name}</p>
              <StatusBadge status={o.status} label="Mới" />
            </div>
            <p className="text-xs text-muted-foreground font-mono mb-3">{o.client} · #{o.id}</p>
            <Button size="sm" className="w-full touch-target font-bold rounded-xl gradient-primary border-0 shadow-glow">Điều phối</Button>
          </div>
        ))}
      </motion.section>

      {/* Sales Orders */}
      <motion.section variants={stagger.item}>
        <h2 className="section-title mb-4 flex items-center gap-2"><ShoppingBag size={18} className="text-secondary" /> Đơn bán hàng cần điều phối</h2>
        {salesOrders.map((o) => (
          <div key={o.id} className="glass-card rounded-2xl p-4 mb-3 card-hover">
            <div className="flex justify-between items-start mb-1">
              <p className="font-semibold text-sm text-foreground">{o.name}</p>
              <StatusBadge status={o.status} label="Mới" />
            </div>
            <p className="text-xs text-muted-foreground font-mono mb-3">{o.client} · #{o.id}</p>
            <Button size="sm" className="w-full touch-target font-bold rounded-xl gradient-blue border-0 shadow-glow-blue">Điều phối</Button>
          </div>
        ))}
      </motion.section>

      {/* Chart */}
      <motion.section variants={stagger.item} className="glass-card rounded-2xl p-5">
        <h3 className="section-title text-sm mb-5 flex items-center gap-2"><BarChart3 size={16} className="text-primary" /> Báo cáo tổng quan</h3>
        <div className="flex items-end justify-between gap-2 h-32">
          {monthlyData.map((d, i) => (
            <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
              <span className="text-[10px] font-bold text-foreground">{d.value}</span>
              <motion.div className="w-full gradient-primary rounded-lg" initial={{ height: 0 }} animate={{ height: `${d.value}%` }} transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }} />
              <span className="text-[10px] font-medium text-muted-foreground">{d.month}</span>
            </div>
          ))}
        </div>
      </motion.section>

      <div className="h-4" />
    </motion.div>
  </div>
);

export default AdminHome;
