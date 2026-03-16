import MobileHeader from "@/components/MobileHeader";
import { BarChart3, TrendingUp, CheckCircle2, Clock } from "lucide-react";

const stats = [
  { label: "Tổng công việc", value: "48", icon: BarChart3, color: "bg-eco-blue-light text-secondary" },
  { label: "Hoàn thành", value: "35", icon: CheckCircle2, color: "bg-eco-green-light text-primary" },
  { label: "Đang xử lý", value: "10", icon: Clock, color: "bg-accent text-accent-foreground" },
  { label: "Hiệu suất", value: "92%", icon: TrendingUp, color: "bg-eco-green-light text-primary" },
];

const monthlyData = [
  { month: "T1", value: 65 }, { month: "T2", value: 78 }, { month: "T3", value: 85 },
  { month: "T4", value: 72 }, { month: "T5", value: 90 }, { month: "T6", value: 88 },
];

const CustomerReports = () => (
  <div>
    <MobileHeader title="Báo cáo" />
    <div className="px-4 py-4 space-y-6 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-card rounded-xl border border-border p-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${s.color}`}>
              <s.icon size={20} />
            </div>
            <p className="text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Simple Bar Chart */}
      <section className="bg-card rounded-xl border border-border p-4">
        <h3 className="font-semibold text-sm mb-4">Hiệu suất 6 tháng gần nhất</h3>
        <div className="flex items-end justify-between gap-2 h-32">
          {monthlyData.map((d) => (
            <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[10px] font-medium text-muted-foreground">{d.value}%</span>
              <div
                className="w-full bg-primary rounded-t-md transition-all"
                style={{ height: `${d.value}%` }}
              />
              <span className="text-[10px] text-muted-foreground">{d.month}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  </div>
);

export default CustomerReports;
