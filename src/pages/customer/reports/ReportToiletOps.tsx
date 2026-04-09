import { motion } from "framer-motion";
import { Building2, Star, Clock, AlertTriangle, Sparkles, Wrench } from "lucide-react";
import {
  ChartContainer, ChartConfig, ChartTooltip, ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const toilets = [
  { id: "NVS-001", name: "NVS Công viên Lê Văn Tám", cleanCount: 120, repairCount: 8, incidents: 3, avgResolve: "2.5h", rating: 4.2 },
  { id: "NVS-002", name: "NVS Trung tâm TDTT Q1", cleanCount: 95, repairCount: 12, incidents: 5, avgResolve: "3.1h", rating: 3.8 },
  { id: "NVS-003", name: "NVS Trường THPT Nguyễn Du", cleanCount: 150, repairCount: 5, incidents: 1, avgResolve: "1.8h", rating: 4.5 },
  { id: "NVS-004", name: "NVS Bệnh viện Q3", cleanCount: 180, repairCount: 15, incidents: 7, avgResolve: "2.0h", rating: 4.0 },
];

const comparisonData = toilets.map(t => ({
  name: t.id,
  "Vệ sinh": t.cleanCount,
  "Sửa chữa": t.repairCount,
  "Sự cố": t.incidents,
}));

const chartConfig: ChartConfig = {
  "Vệ sinh": { label: "Vệ sinh", color: "hsl(var(--primary))" },
  "Sửa chữa": { label: "Sửa chữa", color: "hsl(var(--secondary))" },
  "Sự cố": { label: "Sự cố", color: "hsl(var(--destructive))" },
};

const card = "glass-card rounded-2xl p-5";
const anim = (i: number) => ({ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.04 } });

const ReportToiletOps = () => (
  <div className="space-y-4">
    {/* Summary stats */}
    <div className="grid grid-cols-3 gap-2">
      {[
        { label: "Tổng lần VS", value: "545", icon: Sparkles, color: "text-primary" },
        { label: "Tổng sửa chữa", value: "40", icon: Wrench, color: "text-secondary" },
        { label: "Tổng sự cố", value: "16", icon: AlertTriangle, color: "text-destructive" },
      ].map((s, i) => (
        <motion.div key={s.label} className="glass-card rounded-2xl p-3 text-center" {...anim(i)}>
          <s.icon size={16} className={`${s.color} mx-auto mb-1`} />
          <p className={`text-lg font-black ${s.color}`}>{s.value}</p>
          <p className="text-[10px] text-muted-foreground">{s.label}</p>
        </motion.div>
      ))}
    </div>

    {/* Comparison chart */}
    <motion.div className={card} {...anim(3)}>
      <h3 className="font-bold text-sm text-foreground mb-4 flex items-center gap-2">
        <Building2 size={16} className="text-primary" /> So sánh vận hành theo NVS
      </h3>
      <ChartContainer config={chartConfig} className="h-[200px] w-full">
        <BarChart data={comparisonData} barGap={2}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <XAxis dataKey="name" tickLine={false} axisLine={false} fontSize={10} tick={{ fill: "hsl(var(--muted-foreground))" }} />
          <YAxis tickLine={false} axisLine={false} fontSize={10} tick={{ fill: "hsl(var(--muted-foreground))" }} width={30} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="Vệ sinh" fill="var(--color-Vệ sinh)" radius={[4, 4, 0, 0]} barSize={10} />
          <Bar dataKey="Sửa chữa" fill="var(--color-Sửa chữa)" radius={[4, 4, 0, 0]} barSize={10} />
          <Bar dataKey="Sự cố" fill="var(--color-Sự cố)" radius={[4, 4, 0, 0]} barSize={10} />
        </BarChart>
      </ChartContainer>
    </motion.div>

    {/* Per-toilet detail cards */}
    <div className="space-y-3">
      {toilets.map((t, i) => (
        <motion.div key={t.id} className={card} {...anim(i + 4)}>
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-bold text-sm text-foreground">{t.id}</p>
              <p className="text-[11px] text-muted-foreground">{t.name}</p>
            </div>
            <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full">
              <Star size={12} className="text-primary fill-primary" />
              <span className="text-xs font-bold text-primary">{t.rating}</span>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: "Vệ sinh", value: t.cleanCount, color: "text-primary" },
              { label: "Sửa chữa", value: t.repairCount, color: "text-secondary" },
              { label: "Sự cố", value: t.incidents, color: "text-destructive" },
              { label: "TB xử lý", value: t.avgResolve, color: "text-foreground" },
            ].map(m => (
              <div key={m.label} className="text-center">
                <p className={`text-sm font-bold ${m.color}`}>{m.value}</p>
                <p className="text-[9px] text-muted-foreground">{m.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default ReportToiletOps;
