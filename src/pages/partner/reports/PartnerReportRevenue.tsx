import { motion } from "framer-motion";
import { DollarSign, TrendingUp, TrendingDown, Wrench, ShoppingCart } from "lucide-react";
import {
  ChartContainer, ChartTooltip, ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, AreaChart, Area } from "recharts";

const kpis = [
  { label: "Tổng doanh thu", value: "425M", sub: "+18% vs kỳ trước", icon: DollarSign, trend: "up" },
  { label: "DT Dịch vụ", value: "310M", sub: "73% tổng DT", icon: Wrench, trend: "up" },
  { label: "DT Bán hàng", value: "115M", sub: "27% tổng DT", icon: ShoppingCart, trend: "down" },
];

const monthlyRevenue = [
  { month: "T1", dichvu: 42, banhang: 15 },
  { month: "T2", dichvu: 48, banhang: 18 },
  { month: "T3", dichvu: 38, banhang: 12 },
  { month: "T4", dichvu: 55, banhang: 20 },
  { month: "T5", dichvu: 52, banhang: 22 },
  { month: "T6", dichvu: 65, banhang: 28 },
];

const growthData = [
  { month: "T1", growth: 5 },
  { month: "T2", growth: 12 },
  { month: "T3", growth: -8 },
  { month: "T4", growth: 22 },
  { month: "T5", growth: 15 },
  { month: "T6", growth: 18 },
];

const chartConfig = {
  dichvu: { label: "DT Dịch vụ (M)", color: "hsl(var(--primary))" },
  banhang: { label: "DT Bán hàng (M)", color: "hsl(var(--secondary))" },
  growth: { label: "Tăng trưởng (%)", color: "hsl(var(--primary))" },
};

const PartnerReportRevenue = () => (
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
          <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center mb-1.5">
            <k.icon size={14} className="text-primary" />
          </div>
          <p className="text-lg font-bold text-foreground">{k.value}</p>
          <p className="text-[10px] text-muted-foreground">{k.label}</p>
          <div className="flex items-center gap-0.5 mt-0.5">
            {k.trend === "up" ? <TrendingUp size={9} className="text-primary" /> : <TrendingDown size={9} className="text-destructive" />}
            <span className={`text-[9px] font-medium ${k.trend === "up" ? "text-primary" : "text-destructive"}`}>{k.sub}</span>
          </div>
        </motion.div>
      ))}
    </div>

    <div className="rounded-2xl bg-card border border-border p-4">
      <h3 className="text-sm font-bold text-foreground mb-3">Doanh thu theo tháng (triệu VNĐ)</h3>
      <ChartContainer config={chartConfig} className="h-[220px] w-full">
        <BarChart data={monthlyRevenue}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <XAxis dataKey="month" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="dichvu" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={14} stackId="a" />
          <Bar dataKey="banhang" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} barSize={14} stackId="a" />
        </BarChart>
      </ChartContainer>
    </div>

    <div className="rounded-2xl bg-card border border-border p-4">
      <h3 className="text-sm font-bold text-foreground mb-3">Tăng trưởng / Giảm theo tháng (%)</h3>
      <ChartContainer config={chartConfig} className="h-[180px] w-full">
        <AreaChart data={growthData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <XAxis dataKey="month" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <defs>
            <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="growth" stroke="hsl(var(--primary))" fill="url(#growthGrad)" strokeWidth={2} dot={{ r: 3, fill: "hsl(var(--primary))" }} />
        </AreaChart>
      </ChartContainer>
    </div>
  </div>
);

export default PartnerReportRevenue;
