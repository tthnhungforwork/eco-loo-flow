import { motion } from "framer-motion";
import { ShoppingBag, DollarSign, TrendingUp, TrendingDown, Wrench, ShoppingCart } from "lucide-react";
import {
  ChartContainer, ChartTooltip, ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, Tooltip } from "recharts";

const monthlyData = [
  { month: "T1", orders: 12, revenue: 45 },
  { month: "T2", orders: 15, revenue: 52 },
  { month: "T3", orders: 10, revenue: 38 },
  { month: "T4", orders: 18, revenue: 65 },
  { month: "T5", orders: 14, revenue: 50 },
  { month: "T6", orders: 20, revenue: 72 },
];

const serviceBreakdown = [
  { name: "VSLD", value: 35, fill: "hsl(var(--primary))" },
  { name: "SCBD", value: 25, fill: "hsl(var(--secondary))" },
  { name: "Netzero", value: 15, fill: "hsl(var(--eco-teal))" },
  { name: "Cải tạo", value: 10, fill: "hsl(var(--eco-purple))" },
];

const salesBreakdown = [
  { name: "Thiết bị VS", value: 40, fill: "hsl(var(--primary))" },
  { name: "Chế phẩm SH", value: 30, fill: "hsl(var(--eco-teal))" },
  { name: "Phụ kiện", value: 20, fill: "hsl(var(--secondary))" },
  { name: "Khác", value: 10, fill: "hsl(var(--muted-foreground))" },
];

const kpis = [
  { label: "Tổng đơn / tháng", value: "20", sub: "+15% vs tháng trước", icon: ShoppingBag, trend: "up" },
  { label: "Tổng doanh thu / tháng", value: "72M", sub: "+8% vs tháng trước", icon: DollarSign, trend: "up" },
  { label: "Đơn dịch vụ", value: "14", sub: "70% tổng đơn", icon: Wrench, trend: "up" },
  { label: "Đơn mua bán", value: "6", sub: "30% tổng đơn", icon: ShoppingCart, trend: "down" },
];

const chartConfig = {
  orders: { label: "Đơn hàng", color: "hsl(var(--primary))" },
  revenue: { label: "Doanh thu (M)", color: "hsl(var(--secondary))" },
};

const PartnerReportOverview = () => (
  <div className="space-y-5">
    {/* KPIs */}
    <div className="grid grid-cols-2 gap-3">
      {kpis.map((k, i) => (
        <motion.div
          key={k.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="rounded-2xl bg-card border border-border p-3.5"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <k.icon size={16} className="text-primary" />
            </div>
          </div>
          <p className="text-xl font-bold text-foreground">{k.value}</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">{k.label}</p>
          <div className="flex items-center gap-1 mt-1">
            {k.trend === "up" ? <TrendingUp size={10} className="text-primary" /> : <TrendingDown size={10} className="text-destructive" />}
            <span className={`text-[10px] font-medium ${k.trend === "up" ? "text-primary" : "text-destructive"}`}>{k.sub}</span>
          </div>
        </motion.div>
      ))}
    </div>

    {/* Monthly chart */}
    <div className="rounded-2xl bg-card border border-border p-4">
      <h3 className="text-sm font-bold text-foreground mb-3">Đơn hàng & Doanh thu theo tháng</h3>
      <ChartContainer config={chartConfig} className="h-[200px] w-full">
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <XAxis dataKey="month" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="orders" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={14} />
          <Bar dataKey="revenue" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} barSize={14} />
        </BarChart>
      </ChartContainer>
    </div>

    {/* Service & Sales breakdown */}
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-2xl bg-card border border-border p-4">
        <h3 className="text-xs font-bold text-foreground mb-3">Phân bổ đơn dịch vụ</h3>
        <div className="h-[140px]">
          <ChartContainer config={{}} className="h-full w-full">
            <PieChart>
              <Pie data={serviceBreakdown} dataKey="value" cx="50%" cy="50%" outerRadius={50} innerRadius={25}>
                {serviceBreakdown.map((d, i) => <Cell key={i} fill={d.fill} />)}
              </Pie>
              <Tooltip formatter={(v: number) => `${v}%`} />
            </PieChart>
          </ChartContainer>
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
          {serviceBreakdown.map(d => (
            <div key={d.name} className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full" style={{ background: d.fill }} />
              <span className="text-[10px] text-muted-foreground">{d.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-2xl bg-card border border-border p-4">
        <h3 className="text-xs font-bold text-foreground mb-3">Phân bổ đơn bán hàng</h3>
        <div className="h-[140px]">
          <ChartContainer config={{}} className="h-full w-full">
            <PieChart>
              <Pie data={salesBreakdown} dataKey="value" cx="50%" cy="50%" outerRadius={50} innerRadius={25}>
                {salesBreakdown.map((d, i) => <Cell key={i} fill={d.fill} />)}
              </Pie>
              <Tooltip formatter={(v: number) => `${v}%`} />
            </PieChart>
          </ChartContainer>
        </div>
        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
          {salesBreakdown.map(d => (
            <div key={d.name} className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full" style={{ background: d.fill }} />
              <span className="text-[10px] text-muted-foreground">{d.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Note */}
    <div className="rounded-2xl bg-muted/50 border border-border p-4">
      <p className="text-xs font-semibold text-foreground mb-1">📋 Ghi chú nghiệp vụ</p>
      <ul className="text-[11px] text-muted-foreground space-y-1 list-disc pl-4">
        <li>Đối tác <strong>dịch vụ</strong>: hiển thị Đơn hàng DV, Doanh thu DV, Công việc, Ticket.</li>
        <li>Đối tác <strong>bán hàng</strong>: hiển thị Đơn hàng mua bán, Doanh thu bán hàng.</li>
        <li>Đối tác <strong>cả 2 loại hình</strong>: Tổng quan gom chung, doanh thu tách riêng DV và bán hàng.</li>
      </ul>
    </div>
  </div>
);

export default PartnerReportOverview;
