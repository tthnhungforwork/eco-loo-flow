import { motion } from "framer-motion";
import { ClipboardCheck, Clock, CheckCircle2, Activity } from "lucide-react";
import {
  ChartContainer, ChartTooltip, ChartTooltipContent,
} from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid } from "recharts";

const kpis = [
  { label: "Tổng công việc", value: "156", icon: ClipboardCheck, bg: "bg-primary/10", color: "text-primary" },
  { label: "Đang làm", value: "23", icon: Clock, bg: "bg-secondary/10", color: "text-secondary" },
  { label: "Hoàn thành", value: "128", icon: CheckCircle2, bg: "bg-primary/10", color: "text-primary" },
  { label: "Hiệu suất", value: "82%", icon: Activity, bg: "bg-primary/10", color: "text-primary" },
];

const performanceData = [
  { month: "T1", dunghan: 18, trehan: 3, quahan: 1 },
  { month: "T2", dunghan: 22, trehan: 2, quahan: 0 },
  { month: "T3", dunghan: 15, trehan: 5, quahan: 2 },
  { month: "T4", dunghan: 25, trehan: 3, quahan: 1 },
  { month: "T5", dunghan: 20, trehan: 4, quahan: 3 },
  { month: "T6", dunghan: 28, trehan: 2, quahan: 0 },
];

const chartConfig = {
  dunghan: { label: "Đúng hạn", color: "hsl(var(--primary))" },
  trehan: { label: "Trễ hạn", color: "hsl(var(--secondary))" },
  quahan: { label: "Quá hạn", color: "hsl(var(--destructive))" },
};

const PartnerReportTasks = () => (
  <div className="space-y-5">
    <div className="grid grid-cols-2 gap-3">
      {kpis.map((k, i) => (
        <motion.div
          key={k.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="rounded-2xl bg-card border border-border p-3.5"
        >
          <div className={`w-8 h-8 rounded-lg ${k.bg} flex items-center justify-center mb-2`}>
            <k.icon size={16} className={k.color} />
          </div>
          <p className="text-xl font-bold text-foreground">{k.value}</p>
          <p className="text-[11px] text-muted-foreground">{k.label}</p>
        </motion.div>
      ))}
    </div>

    {/* Performance bar */}
    <div className="rounded-2xl bg-card border border-border p-4">
      <h3 className="text-sm font-bold text-foreground mb-2">Hiệu suất thực hiện</h3>
      <div className="flex items-center gap-2 mb-3">
        <div className="flex-1 h-3 rounded-full bg-muted overflow-hidden flex">
          <div className="h-full bg-primary rounded-l-full" style={{ width: "82%" }} />
          <div className="h-full bg-secondary" style={{ width: "12%" }} />
          <div className="h-full bg-destructive rounded-r-full" style={{ width: "6%" }} />
        </div>
      </div>
      <div className="flex gap-4 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary" /> Đúng hạn 82%</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-secondary" /> Trễ hạn 12%</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-destructive" /> Quá hạn 6%</span>
      </div>
    </div>

    <div className="rounded-2xl bg-card border border-border p-4">
      <h3 className="text-sm font-bold text-foreground mb-3">Công việc theo tháng</h3>
      <ChartContainer config={chartConfig} className="h-[220px] w-full">
        <LineChart data={performanceData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <XAxis dataKey="month" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line type="monotone" dataKey="dunghan" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="trehan" stroke="hsl(var(--secondary))" strokeWidth={2} dot={{ r: 3 }} />
          <Line type="monotone" dataKey="quahan" stroke="hsl(var(--destructive))" strokeWidth={2} dot={{ r: 3 }} />
        </LineChart>
      </ChartContainer>
      <div className="flex gap-4 mt-2 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-primary" /> Đúng hạn</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-secondary" /> Trễ hạn</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-destructive" /> Quá hạn</span>
      </div>
    </div>
  </div>
);

export default PartnerReportTasks;
