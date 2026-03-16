import MobileHeader from "@/components/MobileHeader";
import StatusBadge from "@/components/StatusBadge";
import { ShoppingBag, Wrench, BarChart3, TrendingUp, Users, Bath, Sparkles, AlertTriangle, ArrowRight, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const serviceOrders = [
  { id: "DV-101", name: "Vệ sinh NVS KTX Block A", client: "KTX Đại học X", status: "new" },
  { id: "DV-102", name: "Bảo trì thiết bị Tầng 3", client: "Công ty ABC", status: "new" },
];

const tickets = [
  { id: "T-001", title: "Rò rỉ nước NVS Tầng 5", reporter: "Phạm Thị L", priority: "high" },
  { id: "T-003", title: "Nhân viên không đến đúng giờ", reporter: "Lê Văn H", priority: "medium" },
];

const salesOrders = [
  { id: "BH-201", name: "Nước rửa tay Eco x100", client: "Đại lý Miền Nam", status: "new" },
];

const pendingOrders = [
  { id: "DV-105", name: "Đơn sửa chữa NVS Tòa B", client: "Trường THPT Y", status: "processing" },
];

const nvsJobs = [
  { id: 1, title: "VSLD NVS Block A - Ca sáng", nvs: "NVS Block A", time: "07:00", status: "processing" },
  { id: 2, title: "SCBD Hệ thống nước Tầng 3", nvs: "NVS Tầng 3", time: "09:30", status: "new" },
  { id: 3, title: "VSLD NVS Sảnh C - Ca chiều", nvs: "NVS Sảnh C", time: "13:00", status: "done" },
  { id: 4, title: "Kiểm tra thiết bị Eco Park", nvs: "NVS Eco Park", time: "15:00", status: "new" },
];

const completedServices = [
  { month: "T1", count: 45 }, { month: "T2", count: 62 }, { month: "T3", count: 78 },
  { month: "T4", count: 55 }, { month: "T5", count: 85 }, { month: "T6", count: 92 },
];

const dashStats = [
  { label: "Tổng NVS", value: "1,245", icon: Bath, gradient: "gradient-primary" },
  { label: "Đối tác", value: "89", icon: Users, gradient: "gradient-blue" },
  { label: "Đơn tháng", value: "342", icon: ShoppingBag, gradient: "gradient-warm" },
  { label: "Doanh thu", value: "1.2 tỷ", icon: TrendingUp, gradient: "gradient-primary" },
];

const statusLabel: Record<string, string> = { new: "Mới", processing: "Đang xử lý", done: "Hoàn thành" };

const stagger = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.06 } } },
  item: { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.4 } } },
};

const AdminHome = () => {
  const navigate = useNavigate();

  return (
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

        {/* Đơn dịch vụ cần điều phối */}
        {serviceOrders.length > 0 && (
          <motion.section variants={stagger.item}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="section-title flex items-center gap-2"><Wrench size={18} className="text-primary" /> Đơn DV cần điều phối</h2>
              <button onClick={() => navigate("/admin/orders")} className="text-xs text-primary font-semibold flex items-center gap-1">Tất cả <ArrowRight size={14} /></button>
            </div>
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
        )}

        {/* Ticket cần xử lý */}
        {tickets.length > 0 && (
          <motion.section variants={stagger.item}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="section-title flex items-center gap-2"><AlertTriangle size={18} className="text-destructive" /> Ticket cần xử lý</h2>
              <button onClick={() => navigate("/admin/tickets")} className="text-xs text-primary font-semibold flex items-center gap-1">Tất cả <ArrowRight size={14} /></button>
            </div>
            {tickets.map((t) => (
              <div key={t.id} className="glass-card rounded-2xl p-4 mb-3 card-hover">
                <div className="flex items-start gap-2">
                  <AlertTriangle size={16} className={`mt-0.5 shrink-0 ${t.priority === "high" ? "text-destructive" : "text-eco-orange"}`} />
                  <div className="flex-1">
                    <p className="font-semibold text-sm text-foreground">{t.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">Báo cáo: {t.reporter} · #{t.id}</p>
                  </div>
                  <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${t.priority === "high" ? "bg-destructive/10 text-destructive" : "bg-eco-orange/10 text-eco-orange"}`}>
                    {t.priority === "high" ? "Cao" : "TB"}
                  </span>
                </div>
              </div>
            ))}
          </motion.section>
        )}

        {/* Đơn bán hàng cần điều phối */}
        {salesOrders.length > 0 && (
          <motion.section variants={stagger.item}>
            <h2 className="section-title mb-4 flex items-center gap-2"><ShoppingBag size={18} className="text-secondary" /> Đơn bán hàng cần điều phối</h2>
            {salesOrders.map((o) => (
              <div key={o.id} className="glass-card rounded-2xl p-4 mb-3 card-hover">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-semibold text-sm text-foreground">{o.name}</p>
                  <StatusBadge status={o.status} label="Mới" />
                </div>
                <p className="text-xs text-muted-foreground font-mono mb-3">{o.client} · #{o.id}</p>
                <Button size="sm" className="w-full touch-target font-bold rounded-xl gradient-blue border-0">Điều phối</Button>
              </div>
            ))}
          </motion.section>
        )}

        {/* Đơn hàng cần xử lý */}
        {pendingOrders.length > 0 && (
          <motion.section variants={stagger.item}>
            <h2 className="section-title mb-4 flex items-center gap-2"><Briefcase size={18} className="text-primary" /> Đơn hàng cần xử lý</h2>
            {pendingOrders.map((o) => (
              <div key={o.id} className="glass-card rounded-2xl p-4 mb-3 card-hover">
                <div className="flex justify-between items-start mb-1">
                  <p className="font-semibold text-sm text-foreground">{o.name}</p>
                  <StatusBadge status={o.status} label="Đang xử lý" />
                </div>
                <p className="text-xs text-muted-foreground font-mono">{o.client} · #{o.id}</p>
              </div>
            ))}
          </motion.section>
        )}

        {/* Công việc NVS - Lướt ngang */}
        <motion.section variants={stagger.item}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="section-title">Công việc NVS</h2>
            <button className="text-xs text-primary font-semibold flex items-center gap-1">Tất cả <ArrowRight size={14} /></button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-3 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
            {nvsJobs.map((j) => (
              <motion.div key={j.id} className="min-w-[240px] glass-card rounded-2xl p-4 shrink-0 snap-start card-hover" whileTap={{ scale: 0.97 }}>
                <div className="flex justify-between items-start mb-2">
                  <p className="font-semibold text-sm text-foreground flex-1 mr-2 leading-tight">{j.title}</p>
                  <StatusBadge status={j.status} label={statusLabel[j.status]} />
                </div>
                <p className="text-xs text-muted-foreground">{j.nvs} · {j.time}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Dịch vụ đã thực hiện - Chart */}
        <motion.section variants={stagger.item} className="glass-card rounded-2xl p-5">
          <h3 className="section-title text-sm mb-5 flex items-center gap-2"><BarChart3 size={16} className="text-primary" /> Dịch vụ đã thực hiện</h3>
          <div className="flex items-end justify-between gap-2 h-32">
            {completedServices.map((d, i) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
                <span className="text-[10px] font-bold text-foreground">{d.count}</span>
                <motion.div className="w-full gradient-primary rounded-lg" initial={{ height: 0 }} animate={{ height: `${d.count}%` }} transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }} />
                <span className="text-[10px] font-medium text-muted-foreground">{d.month}</span>
              </div>
            ))}
          </div>
        </motion.section>

        <div className="h-4" />
      </motion.div>
    </div>
  );
};

export default AdminHome;
