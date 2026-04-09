import { motion } from "framer-motion";
import { Sparkles, Wrench, Hammer, Leaf, Monitor, Clock, CheckCircle2, Loader2, TrendingUp } from "lucide-react";
import {
  ChartContainer, ChartConfig, ChartTooltip, ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const services = [
  { key: "vsld", label: "Vệ sinh lau dọn", icon: Sparkles, total: 15, completed: 12, processing: 3, avgTime: "2 ngày", cost: "4.5M" },
  { key: "scbd", label: "Sửa chữa bảo dưỡng", icon: Wrench, total: 8, completed: 6, processing: 2, avgTime: "3 ngày", cost: "6.2M" },
  { key: "caitan", label: "Cải tạo / Xây mới", icon: Hammer, total: 3, completed: 1, processing: 2, avgTime: "15 ngày", cost: "25M" },
  { key: "netzero", label: "Netzero", icon: Leaf, total: 4, completed: 2, processing: 2, avgTime: "30 ngày", cost: "12M" },
  { key: "tuvan", label: "Tư vấn số hóa", icon: Monitor, total: 5, completed: 4, processing: 1, avgTime: "5 ngày", cost: "3.8M" },
];

const monthlyByService = [
  { month: "T1", VSLD: 3, SCBD: 1, "Cải tạo": 0, Netzero: 1, "Tư vấn": 1 },
  { month: "T2", VSLD: 2, SCBD: 2, "Cải tạo": 1, Netzero: 0, "Tư vấn": 1 },
  { month: "T3", VSLD: 3, SCBD: 1, "Cải tạo": 0, Netzero: 1, "Tư vấn": 0 },
  { month: "T4", VSLD: 2, SCBD: 2, "Cải tạo": 1, Netzero: 0, "Tư vấn": 1 },
  { month: "T5", VSLD: 3, SCBD: 1, "Cải tạo": 0, Netzero: 1, "Tư vấn": 1 },
  { month: "T6", VSLD: 2, SCBD: 1, "Cải tạo": 1, Netzero: 1, "Tư vấn": 1 },
];

const chartConfig: ChartConfig = {
  VSLD: { label: "VSLD", color: "hsl(var(--primary))" },
  SCBD: { label: "SCBD", color: "hsl(var(--secondary))" },
  "Cải tạo": { label: "Cải tạo", color: "hsl(var(--eco-purple))" },
  Netzero: { label: "Netzero", color: "hsl(var(--eco-teal))" },
  "Tư vấn": { label: "Tư vấn", color: "hsl(var(--eco-orange))" },
};

const card = "glass-card rounded-2xl p-5";
const anim = (i: number) => ({ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.04 } });

const ReportServices = () => (
  <div className="space-y-4">
    {/* Summary row */}
    <div className="grid grid-cols-3 gap-2">
      {[
        { label: "Tổng đơn DV", value: "35", color: "text-primary" },
        { label: "Hoàn thành", value: "25", color: "text-primary" },
        { label: "Tổng chi phí", value: "51.5M", color: "text-foreground" },
      ].map((s, i) => (
        <motion.div key={s.label} className="glass-card rounded-2xl p-3 text-center" {...anim(i)}>
          <p className={`text-lg font-black ${s.color}`}>{s.value}</p>
          <p className="text-[10px] text-muted-foreground">{s.label}</p>
        </motion.div>
      ))}
    </div>

    {/* Monthly stacked bar */}
    <motion.div className={card} {...anim(3)}>
      <h3 className="font-bold text-sm text-foreground mb-4 flex items-center gap-2">
        <TrendingUp size={16} className="text-primary" /> Đơn dịch vụ theo tháng
      </h3>
      <ChartContainer config={chartConfig} className="h-[200px] w-full">
        <BarChart data={monthlyByService} barGap={1}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={11} tick={{ fill: "hsl(var(--muted-foreground))" }} />
          <YAxis tickLine={false} axisLine={false} fontSize={10} tick={{ fill: "hsl(var(--muted-foreground))" }} width={25} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="VSLD" stackId="a" fill="var(--color-VSLD)" barSize={20} />
          <Bar dataKey="SCBD" stackId="a" fill="var(--color-SCBD)" />
          <Bar dataKey="Cải tạo" stackId="a" fill="var(--color-Cải tạo)" />
          <Bar dataKey="Netzero" stackId="a" fill="var(--color-Netzero)" />
          <Bar dataKey="Tư vấn" stackId="a" fill="var(--color-Tư vấn)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ChartContainer>
    </motion.div>

    {/* Service detail cards */}
    <div className="space-y-3">
      {services.map((s, i) => (
        <motion.div key={s.key} className={card} {...anim(i + 4)}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <s.icon size={18} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm text-foreground">{s.label}</p>
              <p className="text-[11px] text-muted-foreground">{s.total} đơn · Chi phí {s.cost}</p>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={12} className="text-primary" />
              <div>
                <p className="text-xs font-bold text-primary">{s.completed}</p>
                <p className="text-[9px] text-muted-foreground">Xong</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Loader2 size={12} className="text-secondary" />
              <div>
                <p className="text-xs font-bold text-secondary">{s.processing}</p>
                <p className="text-[9px] text-muted-foreground">Đang XL</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={12} className="text-muted-foreground" />
              <div>
                <p className="text-xs font-bold text-foreground">{s.avgTime}</p>
                <p className="text-[9px] text-muted-foreground">TB xử lý</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-foreground">{s.cost}</p>
              <p className="text-[9px] text-muted-foreground">Chi phí</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default ReportServices;
