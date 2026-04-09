import { motion } from "framer-motion";
import { AlertTriangle, Clock, CheckCircle2 } from "lucide-react";
import {
  ChartContainer, ChartTooltip, ChartTooltipContent,
} from "@/components/ui/chart";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const kpis = [
  { label: "Tổng ticket", value: "34", icon: AlertTriangle, bg: "bg-destructive/10", color: "text-destructive" },
  { label: "Đang xử lý", value: "8", icon: Clock, bg: "bg-secondary/10", color: "text-secondary" },
  { label: "Hoàn thành", value: "26", icon: CheckCircle2, bg: "bg-primary/10", color: "text-primary" },
];

const statusData = [
  { name: "Mới", value: 5, fill: "hsl(var(--destructive))" },
  { name: "Đang xử lý", value: 8, fill: "hsl(var(--secondary))" },
  { name: "Chờ phản hồi", value: 3, fill: "hsl(var(--muted-foreground))" },
  { name: "Hoàn thành", value: 18, fill: "hsl(var(--primary))" },
];

const recentTickets = [
  { id: "TK-045", title: "Rò rỉ nước NVS Tầng 2", status: "Đang xử lý", priority: "Cao", date: "05/04/2026" },
  { id: "TK-044", title: "Hỏng bồn rửa tay", status: "Mới", priority: "Trung bình", date: "04/04/2026" },
  { id: "TK-043", title: "Thiếu vật tư vệ sinh", status: "Hoàn thành", priority: "Thấp", date: "03/04/2026" },
  { id: "TK-042", title: "Cửa NVS không khóa được", status: "Hoàn thành", priority: "Cao", date: "02/04/2026" },
];

const priorityColor: Record<string, string> = {
  "Cao": "text-destructive bg-destructive/10",
  "Trung bình": "text-secondary bg-secondary/10",
  "Thấp": "text-muted-foreground bg-muted",
};

const statusColor: Record<string, string> = {
  "Mới": "text-destructive",
  "Đang xử lý": "text-secondary",
  "Hoàn thành": "text-primary",
};

const PartnerReportTickets = () => (
  <div className="space-y-5">
    <div className="grid grid-cols-3 gap-2.5">
      {kpis.map((k, i) => (
        <motion.div
          key={k.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="rounded-2xl bg-card border border-border p-3"
        >
          <div className={`w-7 h-7 rounded-lg ${k.bg} flex items-center justify-center mb-1.5`}>
            <k.icon size={14} className={k.color} />
          </div>
          <p className="text-lg font-bold text-foreground">{k.value}</p>
          <p className="text-[10px] text-muted-foreground">{k.label}</p>
        </motion.div>
      ))}
    </div>

    <div className="rounded-2xl bg-card border border-border p-4">
      <h3 className="text-sm font-bold text-foreground mb-3">Phân bổ theo trạng thái</h3>
      <div className="flex items-center gap-4">
        <div className="h-[160px] flex-1">
          <ChartContainer config={{}} className="h-full w-full">
            <PieChart>
              <Pie data={statusData} dataKey="value" cx="50%" cy="50%" outerRadius={60} innerRadius={30}>
                {statusData.map((d, i) => <Cell key={i} fill={d.fill} />)}
              </Pie>
              <Tooltip formatter={(v: number) => `${v} ticket`} />
            </PieChart>
          </ChartContainer>
        </div>
        <div className="space-y-2">
          {statusData.map(d => (
            <div key={d.name} className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: d.fill }} />
              <span className="text-[11px] text-muted-foreground">{d.name}</span>
              <span className="text-[11px] font-bold text-foreground">{d.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="rounded-2xl bg-card border border-border p-4">
      <h3 className="text-sm font-bold text-foreground mb-3">Ticket gần đây</h3>
      <div className="space-y-2.5">
        {recentTickets.map(t => (
          <div key={t.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/50">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-foreground truncate">{t.title}</p>
              <p className="text-[10px] text-muted-foreground">{t.id} · {t.date}</p>
            </div>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${priorityColor[t.priority]}`}>{t.priority}</span>
            <span className={`text-[10px] font-semibold ${statusColor[t.status]}`}>{t.status}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default PartnerReportTickets;
