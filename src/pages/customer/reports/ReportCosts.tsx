import { motion } from "framer-motion";
import { useState } from "react";
import { TrendingUp, Building2, Wrench, Users } from "lucide-react";
import {
  ChartContainer, ChartConfig, ChartTooltip, ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, AreaChart, Area } from "recharts";

const periods = ["Tháng", "Quý", "Năm"];

const monthlyData = [
  { period: "T1", cost: 2800000 }, { period: "T2", cost: 3200000 }, { period: "T3", cost: 2500000 },
  { period: "T4", cost: 4100000 }, { period: "T5", cost: 3600000 }, { period: "T6", cost: 2900000 },
];
const quarterlyData = [
  { period: "Q1", cost: 8500000 }, { period: "Q2", cost: 10600000 },
];
const yearlyData = [
  { period: "2024", cost: 35000000 }, { period: "2025", cost: 19100000 },
];

const byToilet = [
  { name: "NVS-001", cost: 5200000 }, { name: "NVS-002", cost: 4800000 },
  { name: "NVS-003", cost: 3500000 }, { name: "NVS-004", cost: 5600000 },
];

const byService = [
  { name: "VSLD", cost: 4500000 }, { name: "SCBD", cost: 6200000 },
  { name: "Cải tạo", cost: 5000000 }, { name: "Netzero", cost: 2400000 }, { name: "Tư vấn", cost: 1000000 },
];

const byPartner = [
  { name: "EcoClean", cost: 8500000 }, { name: "GreenTech", cost: 6200000 },
  { name: "NetZero VN", cost: 4400000 },
];

const card = "glass-card rounded-2xl p-5";
const anim = (i: number) => ({ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.04 } });

const HorizontalBar = ({ title, data, icon: Icon, valueKey = "cost" }: { title: string; data: any[]; icon: typeof Building2; valueKey?: string }) => (
  <motion.div className={card} {...anim(4)}>
    <h3 className="font-bold text-sm text-foreground mb-4 flex items-center gap-2">
      <Icon size={16} className="text-primary" /> {title}
    </h3>
    <div className="space-y-3">
      {data.map((d, i) => {
        const max = Math.max(...data.map(x => x[valueKey]));
        const pct = (d[valueKey] / max) * 100;
        return (
          <div key={i}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[11px] font-semibold text-foreground">{d.name}</span>
              <span className="text-[11px] font-bold text-primary">{(d[valueKey] / 1000000).toFixed(1)}M</span>
            </div>
            <div className="h-2.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              />
            </div>
          </div>
        );
      })}
    </div>
  </motion.div>
);

const ReportCosts = () => {
  const [periodIdx, setPeriodIdx] = useState(0);
  const datasets = [monthlyData, quarterlyData, yearlyData];
  const data = datasets[periodIdx];
  const total = data.reduce((s, d) => s + d.cost, 0);
  const avgPerToilet = Math.round(total / 4);

  return (
    <div className="space-y-4">
      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3">
        <motion.div className="glass-card rounded-2xl p-4" {...anim(0)}>
          <p className="text-xl font-black text-foreground">{(total / 1000000).toFixed(1)}M</p>
          <p className="text-[10px] text-muted-foreground">Tổng chi phí kỳ</p>
        </motion.div>
        <motion.div className="glass-card rounded-2xl p-4" {...anim(1)}>
          <p className="text-xl font-black text-primary">{(avgPerToilet / 1000000).toFixed(1)}M</p>
          <p className="text-[10px] text-muted-foreground">TB / NVS</p>
        </motion.div>
      </div>

      {/* Period selector */}
      <div className="flex gap-2">
        {periods.map((p, i) => (
          <button
            key={p}
            onClick={() => setPeriodIdx(i)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              periodIdx === i ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Cost trend */}
      <motion.div className={card} {...anim(2)}>
        <h3 className="font-bold text-sm text-foreground mb-4 flex items-center gap-2">
          <TrendingUp size={16} className="text-primary" /> Chi phí theo {periods[periodIdx].toLowerCase()}
        </h3>
        <ChartContainer config={{ cost: { label: "Chi phí", color: "hsl(var(--primary))" } }} className="h-[180px] w-full">
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis dataKey="period" tickLine={false} axisLine={false} fontSize={11} tick={{ fill: "hsl(var(--muted-foreground))" }} />
            <YAxis tickLine={false} axisLine={false} fontSize={10} tick={{ fill: "hsl(var(--muted-foreground))" }} width={30} tickFormatter={(v) => `${v / 1000000}M`} />
            <ChartTooltip content={<ChartTooltipContent formatter={(v) => `${(Number(v) / 1000000).toFixed(1)}M đ`} />} />
            <defs>
              <linearGradient id="costGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="cost" fill="url(#costGrad)" stroke="hsl(var(--primary))" strokeWidth={2.5} />
          </AreaChart>
        </ChartContainer>
      </motion.div>

      <HorizontalBar title="Chi phí theo NVS" data={byToilet} icon={Building2} />
      <HorizontalBar title="Chi phí theo dịch vụ" data={byService} icon={Wrench} />
      <HorizontalBar title="Chi phí theo đối tác" data={byPartner} icon={Users} />
    </div>
  );
};

export default ReportCosts;
