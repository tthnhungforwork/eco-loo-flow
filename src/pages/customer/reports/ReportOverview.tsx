import { motion } from "framer-motion";
import { Building2, Activity, AlertTriangle, Wrench, ShoppingBag, TrendingUp, BarChart3 } from "lucide-react";
import {
  ChartContainer, ChartConfig, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const kpis = [
  { label: "Tổng NVS", value: "12", sub: "3 khu vực", icon: Building2, color: "text-primary", bg: "bg-primary/10" },
  { label: "Đang hoạt động", value: "10", sub: "83%", icon: Activity, color: "text-primary", bg: "bg-primary/10" },
  { label: "Ticket mở", value: "5", sub: "+2 tuần này", icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10" },
  { label: "Công việc đang XL", value: "8", sub: "3 quá hạn", icon: Wrench, color: "text-secondary", bg: "bg-secondary/10" },
  { label: "Đơn DV đang TH", value: "4", sub: "2 Netzero", icon: ShoppingBag, color: "text-primary", bg: "bg-primary/10" },
  { label: "Tổng chi kỳ này", value: "18.5M", sub: "+12% vs kỳ trước", icon: TrendingUp, color: "text-primary", bg: "bg-primary/10" },
];

const monthlyOverview = [
  { month: "T1", tickets: 2, orders: 4, tasks: 8 },
  { month: "T2", tickets: 1, orders: 5, tasks: 6 },
  { month: "T3", tickets: 3, orders: 3, tasks: 10 },
  { month: "T4", tickets: 0, orders: 6, tasks: 5 },
  { month: "T5", tickets: 4, orders: 3, tasks: 9 },
  { month: "T6", tickets: 2, orders: 5, tasks: 7 },
];

const serviceBreakdown = [
  { name: "VSLD", value: 35, fill: "hsl(var(--primary))" },
  { name: "SCBD", value: 25, fill: "hsl(var(--secondary))" },
  { name: "Netzero", value: 20, fill: "hsl(var(--eco-teal))" },
  { name: "Cải tạo/Xây mới", value: 12, fill: "hsl(var(--eco-purple))" },
  { name: "Tư vấn số hóa", value: 8, fill: "hsl(var(--eco-orange))" },
];

const chartConfig: ChartConfig = {
  tickets: { label: "Ticket", color: "hsl(var(--destructive))" },
  orders: { label: "Đơn hàng", color: "hsl(var(--primary))" },
  tasks: { label: "Công việc", color: "hsl(var(--secondary))" },
};

const card = "glass-card rounded-2xl p-5";
const anim = (i: number) => ({ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.04 } });

const ReportOverview = () => (
  <div className="space-y-4">
    {/* KPI Grid */}
    <div className="grid grid-cols-2 gap-3">
      {kpis.map((k, i) => (
        <motion.div key={k.label} className={card} {...anim(i)}>
          <div className="flex items-center justify-between mb-2">
            <div className={`w-9 h-9 rounded-xl ${k.bg} flex items-center justify-center`}>
              <k.icon size={16} className={k.color} />
            </div>
          </div>
          <p className="text-xl font-black text-foreground">{k.value}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">{k.label}</p>
          <p className="text-[10px] text-primary font-semibold">{k.sub}</p>
        </motion.div>
      ))}
    </div>

    {/* Monthly bar chart */}
    <motion.div className={card} {...anim(6)}>
      <h3 className="font-bold text-sm text-foreground mb-4 flex items-center gap-2">
        <BarChart3 size={16} className="text-primary" /> Tổng quan 6 tháng
      </h3>
      <ChartContainer config={chartConfig} className="h-[200px] w-full">
        <BarChart data={monthlyOverview} barGap={2}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={11} tick={{ fill: "hsl(var(--muted-foreground))" }} />
          <YAxis tickLine={false} axisLine={false} fontSize={10} tick={{ fill: "hsl(var(--muted-foreground))" }} width={25} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="tickets" fill="var(--color-tickets)" radius={[4, 4, 0, 0]} barSize={10} />
          <Bar dataKey="orders" fill="var(--color-orders)" radius={[4, 4, 0, 0]} barSize={10} />
          <Bar dataKey="tasks" fill="var(--color-tasks)" radius={[4, 4, 0, 0]} barSize={10} />
        </BarChart>
      </ChartContainer>
    </motion.div>

    {/* Service pie */}
    <motion.div className={card} {...anim(7)}>
      <h3 className="font-bold text-sm text-foreground mb-4 flex items-center gap-2">
        <ShoppingBag size={16} className="text-primary" /> Phân bổ dịch vụ
      </h3>
      <div className="flex items-center gap-4">
        <div className="w-[140px] h-[140px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={serviceBreakdown} cx="50%" cy="50%" innerRadius={35} outerRadius={60} paddingAngle={3} dataKey="value">
                {serviceBreakdown.map((e, i) => <Cell key={i} fill={e.fill} />)}
              </Pie>
              <Tooltip formatter={(v: number) => [`${v}%`, ""]} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-2">
          {serviceBreakdown.map((s) => (
            <div key={s.name} className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.fill }} />
              <span className="text-[11px] text-foreground flex-1">{s.name}</span>
              <span className="text-[11px] font-bold text-foreground">{s.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  </div>
);

export default ReportOverview;
