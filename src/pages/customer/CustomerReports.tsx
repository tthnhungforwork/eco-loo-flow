import MobileHeader from "@/components/MobileHeader";
import { BarChart3, TrendingUp, CheckCircle2, Clock } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { label: "Tổng công việc", value: "48", icon: BarChart3, gradient: "gradient-blue" },
  { label: "Hoàn thành", value: "35", icon: CheckCircle2, gradient: "gradient-primary" },
  { label: "Đang xử lý", value: "10", icon: Clock, bg: "bg-eco-orange", color: "text-primary-foreground" },
  { label: "Hiệu suất", value: "92%", icon: TrendingUp, gradient: "gradient-primary" },
];

const monthlyData = [
  { month: "T1", value: 65 }, { month: "T2", value: 78 }, { month: "T3", value: 85 },
  { month: "T4", value: 72 }, { month: "T5", value: 90 }, { month: "T6", value: 88 },
];

const CustomerReports = () => (
  <div>
    <MobileHeader title="Báo cáo" />
    <div className="px-4 py-5 space-y-6">
      <div className="grid grid-cols-2 gap-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            className="glass-card rounded-2xl p-4 card-hover"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
          >
            <div className={`icon-container-sm ${s.gradient || s.bg} text-primary-foreground mb-3 shadow-sm`}>
              <s.icon size={18} />
            </div>
            <p className="text-2xl font-extrabold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground font-medium">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <motion.section
        className="glass-card rounded-2xl p-5"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="section-title text-sm mb-5">Hiệu suất 6 tháng gần nhất</h3>
        <div className="flex items-end justify-between gap-2 h-36">
          {monthlyData.map((d, i) => (
            <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
              <span className="text-[10px] font-bold text-foreground">{d.value}%</span>
              <motion.div
                className="w-full gradient-primary rounded-lg"
                initial={{ height: 0 }}
                animate={{ height: `${d.value}%` }}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.5, ease: "easeOut" }}
              />
              <span className="text-[10px] font-medium text-muted-foreground">{d.month}</span>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  </div>
);

export default CustomerReports;
