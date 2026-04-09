import { motion } from "framer-motion";
import { ShoppingBag, Wrench, ShoppingCart, TrendingUp } from "lucide-react";
import {
  ChartContainer, ChartTooltip, ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line } from "recharts";

const kpis = [
  { label: "Tổng đơn hàng", value: "89", sub: "+12 tháng này", icon: ShoppingBag, color: "text-primary", bg: "bg-primary/10" },
  { label: "Đơn dịch vụ", value: "62", sub: "69.7%", icon: Wrench, color: "text-primary", bg: "bg-primary/10" },
  { label: "Đơn mua bán", value: "27", sub: "30.3%", icon: ShoppingCart, color: "text-secondary", bg: "bg-secondary/10" },
  { label: "Tăng trưởng", value: "+15%", sub: "vs tháng trước", icon: TrendingUp, color: "text-primary", bg: "bg-primary/10" },
];

const monthlyOrders = [
  { month: "T1", dichvu: 8, muaban: 4 },
  { month: "T2", dichvu: 10, muaban: 3 },
  { month: "T3", dichvu: 7, muaban: 5 },
  { month: "T4", dichvu: 12, muaban: 4 },
  { month: "T5", dichvu: 11, muaban: 6 },
  { month: "T6", dichvu: 14, muaban: 5 },
];

const monthlyValue = [
  { month: "T1", value: 32 },
  { month: "T2", value: 38 },
  { month: "T3", value: 28 },
  { month: "T4", value: 45 },
  { month: "T5", value: 42 },
  { month: "T6", value: 55 },
];

const chartConfig = {
  dichvu: { label: "Dịch vụ", color: "hsl(var(--primary))" },
  muaban: { label: "Mua bán", color: "hsl(var(--secondary))" },
  value: { label: "Giá trị (M)", color: "hsl(var(--primary))" },
};

const PartnerReportOrders = () => (
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
          <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2" style={{ background: "hsl(var(--primary) / 0.1)" }}>
            <k.icon size={16} className={k.color} />
          </div>
          <p className="text-xl font-bold text-foreground">{k.value}</p>
          <p className="text-[11px] text-muted-foreground">{k.label}</p>
          <p className="text-[10px] text-muted-foreground/70 mt-0.5">{k.sub}</p>
        </motion.div>
      ))}
    </div>

    <div className="rounded-2xl bg-card border border-border p-4">
      <h3 className="text-sm font-bold text-foreground mb-3">Số lượng đơn theo tháng</h3>
      <ChartContainer config={chartConfig} className="h-[200px] w-full">
        <BarChart data={monthlyOrders}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <XAxis dataKey="month" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="dichvu" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={14} stackId="a" />
          <Bar dataKey="muaban" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} barSize={14} stackId="a" />
        </BarChart>
      </ChartContainer>
    </div>

    <div className="rounded-2xl bg-card border border-border p-4">
      <h3 className="text-sm font-bold text-foreground mb-3">Giá trị đơn hàng theo tháng (triệu VNĐ)</h3>
      <ChartContainer config={chartConfig} className="h-[200px] w-full">
        <LineChart data={monthlyValue}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <XAxis dataKey="month" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: "hsl(var(--primary))" }} />
        </LineChart>
      </ChartContainer>
    </div>
  </div>
);

export default PartnerReportOrders;
