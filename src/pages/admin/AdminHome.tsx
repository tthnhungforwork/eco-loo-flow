import AdminHeader from "./components/AdminHeader";
import StatusBadge from "@/components/StatusBadge";
import {
  ShoppingBag, Wrench, BarChart3, TrendingUp, Users, Bath,
  AlertTriangle, ArrowRight, Briefcase, ChevronRight, ChevronDown,
  ClipboardCheck, FileText, Settings, MessageSquareWarning
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const quickActions = [
  { label: "Đơn hàng", icon: ShoppingBag, gradient: "gradient-primary", path: "/admin/orders" },
  { label: "Ticket", icon: MessageSquareWarning, gradient: "gradient-warm", path: "/admin/tickets" },
  { label: "QL NVS", icon: Bath, gradient: "gradient-blue", path: "/admin/toilets" },
  { label: "Khảo sát", icon: ClipboardCheck, gradient: "gradient-primary", path: "/admin/surveys" },
  { label: "Đối tác", icon: Users, gradient: "gradient-blue", path: "/admin/partners" },
  { label: "Báo cáo", icon: FileText, gradient: "gradient-warm" },
  { label: "Bảo trì", icon: Wrench, gradient: "gradient-primary" },
  { label: "Cài đặt", icon: Settings, gradient: "gradient-blue" },
];

const serviceOrders = [
  { id: "DV-101", name: "Vệ sinh NVS KTX Block A", client: "KTX Đại học X", status: "new" },
  { id: "DV-102", name: "Bảo trì thiết bị Tầng 3", client: "Công ty ABC", status: "new" },
];

const tickets = [
  { id: "T-001", title: "Rò rỉ nước NVS Tầng 5", reporter: "Phạm Thị L", priority: "high" },
  { id: "T-003", title: "Nhân viên không đến đúng giờ", reporter: "Lê Văn H", priority: "medium" },
];

const nvsJobs = [
  { id: 1, title: "VSLD NVS Block A - Ca sáng", nvs: "NVS Block A", time: "07:00", status: "processing" },
  { id: 2, title: "SCBD Hệ thống nước Tầng 3", nvs: "NVS Tầng 3", time: "09:30", status: "new" },
  { id: 3, title: "VSLD NVS Sảnh C - Ca chiều", nvs: "NVS Sảnh C", time: "13:00", status: "done" },
];

const completedServices = [
  { month: "T1", count: 45 }, { month: "T2", count: 62 }, { month: "T3", count: 78 },
  { month: "T4", count: 55 }, { month: "T5", count: 85 }, { month: "T6", count: 92 },
];

const dashStats = [
  { label: "Tổng NVS", value: "1,245", icon: Bath, color: "text-primary" },
  { label: "Đối tác", value: "89", icon: Users, color: "text-secondary" },
  { label: "Đơn tháng", value: "342", icon: ShoppingBag, color: "text-eco-orange" },
  { label: "Doanh thu", value: "1.2 tỷ", icon: TrendingUp, color: "text-primary" },
];

const statusLabel: Record<string, string> = { new: "Mới", processing: "Đang xử lý", done: "Hoàn thành" };

const stagger = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.05 } } },
  item: { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } },
};

const AdminHome = () => {
  const navigate = useNavigate();
  const [showAllActions, setShowAllActions] = useState(false);
  const displayActions = showAllActions ? quickActions : quickActions.slice(0, 4);

  return (
    <div className="min-h-screen">
      <AdminHeader title="Dashboard" showSwitcher />

      {/* Hero */}
      <div className="bg-primary px-4 pb-8 pt-3 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="orb w-32 h-32 bg-primary-foreground/20 -top-10 -right-10" />
        </div>
        <motion.div
          className="relative z-10 bg-primary-foreground/12 backdrop-blur-lg rounded-2xl p-4 border border-primary-foreground/10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="grid grid-cols-4 gap-2">
            {dashStats.map((s) => (
              <div key={s.label} className="text-center">
                <s.icon size={16} className="text-primary-foreground/60 mx-auto mb-1" />
                <p className="text-lg font-black text-primary-foreground leading-none">{s.value}</p>
                <p className="text-[9px] text-primary-foreground/55 font-medium mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Quick actions */}
      <div className="px-4 -mt-4 relative z-10">
        <motion.div className="bg-card rounded-2xl shadow-elevated p-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <div className="grid grid-cols-4 gap-y-4 gap-x-2">
            {displayActions.map((action, i) => (
              <motion.button key={action.label} className="flex flex-col items-center gap-1.5" whileTap={{ scale: 0.9 }} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + i * 0.04 }}
                onClick={() => action.path && navigate(action.path)}
              >
                <div className={`w-12 h-12 rounded-2xl ${action.gradient} flex items-center justify-center shadow-sm`}>
                  <action.icon size={20} className="text-primary-foreground" />
                </div>
                <span className="text-[11px] font-medium text-foreground leading-tight text-center">{action.label}</span>
              </motion.button>
            ))}
          </div>
          {quickActions.length > 4 && (
            <motion.button onClick={() => setShowAllActions(!showAllActions)} className="w-full flex items-center justify-center mt-3 pt-2 border-t border-border/30" whileTap={{ scale: 0.95 }}>
              <motion.div animate={{ rotate: showAllActions ? 180 : 0 }}>
                <ChevronDown size={20} className="text-primary" />
              </motion.div>
            </motion.button>
          )}
        </motion.div>
      </div>

      <motion.div className="px-4 py-5 space-y-5" variants={stagger.container} initial="hidden" animate="show">
        {/* Đơn dịch vụ cần điều phối */}
        {serviceOrders.length > 0 && (
          <motion.section variants={stagger.item}>
            <div className="flex justify-between items-center mb-3">
              <h2 className="section-title flex items-center gap-2">
                <Wrench size={16} className="text-primary" /> Đơn DV cần điều phối
              </h2>
              <button onClick={() => navigate("/admin/orders")} className="text-xs text-primary font-semibold flex items-center gap-0.5">Tất cả <ChevronRight size={14} /></button>
            </div>
            <div className="space-y-2.5">
              {serviceOrders.map((o, i) => (
                <motion.div key={o.id} className="bg-card rounded-2xl p-4 shadow-card border border-border/30 card-hover" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 + i * 0.05 }}>
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-semibold text-sm text-foreground">{o.name}</p>
                    <StatusBadge status={o.status} label="Mới" />
                  </div>
                  <p className="text-[11px] text-muted-foreground font-mono mb-3">{o.client} · #{o.id}</p>
                  <Button size="sm" className="w-full font-bold rounded-xl gradient-primary border-0 text-primary-foreground h-9 text-xs">Điều phối</Button>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Tickets */}
        {tickets.length > 0 && (
          <motion.section variants={stagger.item}>
            <div className="flex justify-between items-center mb-3">
              <h2 className="section-title flex items-center gap-2">
                <AlertTriangle size={16} className="text-destructive" /> Ticket cần xử lý
              </h2>
              <button onClick={() => navigate("/admin/tickets")} className="text-xs text-primary font-semibold flex items-center gap-0.5">Tất cả <ChevronRight size={14} /></button>
            </div>
            <div className="space-y-2.5">
              {tickets.map((t) => (
                <div key={t.id} className="bg-card rounded-2xl p-4 shadow-card border border-border/30 card-hover">
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${t.priority === "high" ? "bg-destructive/10" : "bg-eco-orange/10"}`}>
                      <AlertTriangle size={16} className={t.priority === "high" ? "text-destructive" : "text-eco-orange"} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground">{t.title}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{t.reporter} · #{t.id}</p>
                    </div>
                    <span className={`text-[9px] font-bold uppercase px-2 py-1 rounded-full ${t.priority === "high" ? "bg-destructive/10 text-destructive" : "bg-eco-orange/10 text-eco-orange"}`}>
                      {t.priority === "high" ? "Cao" : "TB"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Công việc NVS */}
        <motion.section variants={stagger.item}>
          <div className="flex justify-between items-center mb-3">
            <h2 className="section-title">Công việc NVS</h2>
            <button className="text-xs text-primary font-semibold flex items-center gap-0.5">Tất cả <ChevronRight size={14} /></button>
          </div>
          <div className="flex gap-3 overflow-x-auto -mx-4 px-4 snap-x snap-mandatory scrollbar-hide pb-1">
            {nvsJobs.map((j, i) => (
              <motion.div key={j.id} className="min-w-[200px] bg-card rounded-2xl p-3.5 shrink-0 snap-start shadow-card border border-border/30 card-hover" whileTap={{ scale: 0.97 }} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.05 }}>
                <div className="flex justify-between items-start mb-2">
                  <p className="font-semibold text-[12px] text-foreground flex-1 mr-2 leading-tight">{j.title}</p>
                  <StatusBadge status={j.status} label={statusLabel[j.status]} />
                </div>
                <p className="text-[11px] text-muted-foreground">{j.nvs} · {j.time}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Chart */}
        <motion.section variants={stagger.item} className="bg-card rounded-2xl p-4 shadow-card border border-border/30">
          <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 size={15} className="text-primary" /> Dịch vụ đã thực hiện
          </h3>
          <div className="flex items-end justify-between gap-2 h-28">
            {completedServices.map((d, i) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[9px] font-bold text-foreground">{d.count}</span>
                <motion.div className="w-full rounded-md overflow-hidden" initial={{ height: 0 }} animate={{ height: `${d.count}%` }} transition={{ delay: 0.5 + i * 0.08, duration: 0.5 }}>
                  <div className="w-full h-full gradient-primary" />
                </motion.div>
                <span className="text-[9px] font-medium text-muted-foreground">{d.month}</span>
              </div>
            ))}
          </div>
        </motion.section>

        <div className="h-6" />
      </motion.div>
    </div>
  );
};

export default AdminHome;
