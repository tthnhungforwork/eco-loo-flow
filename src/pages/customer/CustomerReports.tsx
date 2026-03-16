import CustomerHeader from "./components/CustomerHeader";
import { BarChart3, TrendingUp, AlertTriangle, ShoppingBag, Wrench, PieChart as PieIcon, Activity } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  ChartContainer,
  ChartConfig,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  PieChart, Pie, Cell, ResponsiveContainer,
  AreaChart, Area, LineChart, Line, RadialBarChart, RadialBar,
  Legend, Tooltip,
} from "recharts";

const monthlyData = [
  { month: "T1", tickets: 2, orders: 4, tasks: 3 },
  { month: "T2", tickets: 1, orders: 5, tasks: 2 },
  { month: "T3", tickets: 3, orders: 3, tasks: 4 },
  { month: "T4", tickets: 0, orders: 6, tasks: 1 },
  { month: "T5", tickets: 4, orders: 3, tasks: 3 },
  { month: "T6", tickets: 2, orders: 3, tasks: 2 },
];

const ticketPieData = [
  { name: "Đã xử lý", value: 8, fill: "hsl(var(--primary))" },
  { name: "Đang xử lý", value: 3, fill: "hsl(var(--secondary))" },
  { name: "Chờ phản hồi", value: 1, fill: "hsl(var(--eco-orange))" },
];

const orderTrendData = [
  { month: "T1", amount: 1200000, count: 4 },
  { month: "T2", amount: 1800000, count: 5 },
  { month: "T3", amount: 1500000, count: 3 },
  { month: "T4", amount: 2200000, count: 6 },
  { month: "T5", amount: 1600000, count: 3 },
  { month: "T6", amount: 2800000, count: 5 },
];

const taskEfficiency = [
  { name: "VSLD", completed: 15, total: 18, fill: "hsl(var(--primary))" },
  { name: "SCBD", completed: 10, total: 12, fill: "hsl(var(--secondary))" },
  { name: "Tư vấn", completed: 5, total: 5, fill: "hsl(var(--eco-teal))" },
];

const serviceBreakdown = [
  { name: "Vệ sinh lau dọn", value: 45, fill: "hsl(var(--primary))" },
  { name: "Sửa chữa BD", value: 25, fill: "hsl(var(--secondary))" },
  { name: "Tư vấn", value: 15, fill: "hsl(var(--eco-teal))" },
  { name: "Khác", value: 15, fill: "hsl(var(--muted-foreground))" },
];

const barChartConfig: ChartConfig = {
  tickets: { label: "Ticket", color: "hsl(var(--destructive))" },
  orders: { label: "Đơn hàng", color: "hsl(var(--primary))" },
  tasks: { label: "Công việc", color: "hsl(var(--secondary))" },
};

const areaChartConfig: ChartConfig = {
  amount: { label: "Chi phí", color: "hsl(var(--primary))" },
};

const tabs = ["Tổng quan", "Ticket", "Đơn hàng", "Công việc"];

const CustomerReports = () => {
  const [tab, setTab] = useState(0);

  return (
    <div>
      <CustomerHeader title="Báo cáo" />
      <div className="py-4">
        {/* Tabs */}
        <div className="px-4 mb-4 flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {tabs.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                tab === i ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="px-4 space-y-4 pb-24">
          {tab === 0 && <OverviewTab />}
          {tab === 1 && <TicketTab />}
          {tab === 2 && <OrderTab />}
          {tab === 3 && <TaskTab />}
        </div>
      </div>
    </div>
  );
};

/* ===== OVERVIEW TAB ===== */
const OverviewTab = () => (
  <>
    {/* KPI cards */}
    <div className="grid grid-cols-2 gap-3">
      {[
        { label: "Tổng ticket", value: "12", change: "-2", icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10" },
        { label: "Tổng đơn hàng", value: "24", change: "+3", icon: ShoppingBag, color: "text-primary", bg: "bg-primary/10" },
        { label: "Công việc", value: "35", change: "+5", icon: Wrench, color: "text-secondary", bg: "bg-secondary/10" },
        { label: "Tổng chi", value: "8.5M", change: "+12%", icon: TrendingUp, color: "text-primary", bg: "bg-primary/10" },
      ].map((kpi, i) => (
        <motion.div
          key={kpi.label}
          className="glass-card rounded-2xl p-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className={`w-9 h-9 rounded-xl ${kpi.bg} flex items-center justify-center`}>
              <kpi.icon size={16} className={kpi.color} />
            </div>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              kpi.change.startsWith("+") ? "bg-primary/10 text-primary" : "bg-destructive/10 text-destructive"
            }`}>
              {kpi.change}
            </span>
          </div>
          <p className="text-xl font-black text-foreground">{kpi.value}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">{kpi.label}</p>
        </motion.div>
      ))}
    </div>

    {/* Bar chart - 6 months overview */}
    <motion.div
      className="glass-card rounded-2xl p-5"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h3 className="font-bold text-sm text-foreground mb-4 flex items-center gap-2">
        <BarChart3 size={16} className="text-primary" /> Tổng quan 6 tháng
      </h3>
      <ChartContainer config={barChartConfig} className="h-[200px] w-full">
        <BarChart data={monthlyData} barGap={2}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={11} tick={{ fill: "hsl(var(--muted-foreground))" }} />
          <YAxis tickLine={false} axisLine={false} fontSize={10} tick={{ fill: "hsl(var(--muted-foreground))" }} width={25} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="tickets" fill="var(--color-tickets)" radius={[4, 4, 0, 0]} barSize={12} />
          <Bar dataKey="orders" fill="var(--color-orders)" radius={[4, 4, 0, 0]} barSize={12} />
          <Bar dataKey="tasks" fill="var(--color-tasks)" radius={[4, 4, 0, 0]} barSize={12} />
        </BarChart>
      </ChartContainer>
    </motion.div>

    {/* Service breakdown pie */}
    <motion.div
      className="glass-card rounded-2xl p-5"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
    >
      <h3 className="font-bold text-sm text-foreground mb-4 flex items-center gap-2">
        <PieIcon size={16} className="text-primary" /> Phân bổ dịch vụ
      </h3>
      <div className="flex items-center gap-4">
        <div className="w-[140px] h-[140px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={serviceBreakdown} cx="50%" cy="50%" innerRadius={35} outerRadius={60} paddingAngle={3} dataKey="value">
                {serviceBreakdown.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`${value}%`, ""]} />
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
  </>
);

/* ===== TICKET TAB ===== */
const TicketTab = () => (
  <>
    {/* Ticket stats */}
    <div className="grid grid-cols-3 gap-2">
      {[
        { label: "Đã xử lý", value: "8", color: "text-primary", bg: "bg-primary/10" },
        { label: "Đang xử lý", value: "3", color: "text-secondary", bg: "bg-secondary/10" },
        { label: "Chờ phản hồi", value: "1", color: "text-amber-500", bg: "bg-amber-500/10" },
      ].map((s, i) => (
        <motion.div key={s.label} className="glass-card rounded-2xl p-3 text-center" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
          <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">{s.label}</p>
        </motion.div>
      ))}
    </div>

    {/* Ticket Pie chart */}
    <motion.div className="glass-card rounded-2xl p-5" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
      <h3 className="font-bold text-sm text-foreground mb-4 flex items-center gap-2">
        <PieIcon size={16} className="text-primary" /> Trạng thái Ticket
      </h3>
      <div className="flex items-center gap-4">
        <div className="w-[140px] h-[140px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={ticketPieData} cx="50%" cy="50%" innerRadius={35} outerRadius={60} paddingAngle={4} dataKey="value">
                {ticketPieData.map((entry, index) => (
                  <Cell key={index} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-2.5">
          {ticketPieData.map((s) => (
            <div key={s.name} className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.fill }} />
              <span className="text-[11px] text-foreground flex-1">{s.name}</span>
              <span className="text-[12px] font-bold text-foreground">{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>

    {/* Ticket trend */}
    <motion.div className="glass-card rounded-2xl p-5" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
      <h3 className="font-bold text-sm text-foreground mb-4 flex items-center gap-2">
        <Activity size={16} className="text-primary" /> Xu hướng Ticket
      </h3>
      <ChartContainer config={{ tickets: { label: "Ticket", color: "hsl(var(--destructive))" } }} className="h-[160px] w-full">
        <AreaChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={11} tick={{ fill: "hsl(var(--muted-foreground))" }} />
          <YAxis tickLine={false} axisLine={false} fontSize={10} tick={{ fill: "hsl(var(--muted-foreground))" }} width={25} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area type="monotone" dataKey="tickets" fill="var(--color-tickets)" fillOpacity={0.2} stroke="var(--color-tickets)" strokeWidth={2} />
        </AreaChart>
      </ChartContainer>
    </motion.div>
  </>
);

/* ===== ORDER TAB ===== */
const OrderTab = () => (
  <>
    <div className="grid grid-cols-2 gap-3">
      {[
        { label: "Tổng đơn", value: "24", color: "text-primary" },
        { label: "Hoàn thành", value: "18", color: "text-primary" },
        { label: "Đang xử lý", value: "4", color: "text-secondary" },
        { label: "Tổng chi", value: "8.5M", color: "text-primary" },
      ].map((s, i) => (
        <motion.div key={s.label} className="glass-card rounded-2xl p-3.5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
          <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">{s.label}</p>
        </motion.div>
      ))}
    </div>

    {/* Order cost trend */}
    <motion.div className="glass-card rounded-2xl p-5" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
      <h3 className="font-bold text-sm text-foreground mb-4 flex items-center gap-2">
        <TrendingUp size={16} className="text-primary" /> Chi phí theo tháng
      </h3>
      <ChartContainer config={areaChartConfig} className="h-[180px] w-full">
        <AreaChart data={orderTrendData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={11} tick={{ fill: "hsl(var(--muted-foreground))" }} />
          <YAxis tickLine={false} axisLine={false} fontSize={10} tick={{ fill: "hsl(var(--muted-foreground))" }} width={30} tickFormatter={(v) => `${v / 1000000}M`} />
          <ChartTooltip content={<ChartTooltipContent formatter={(value) => `${(Number(value) / 1000000).toFixed(1)}M đ`} />} />
          <defs>
            <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <Area type="monotone" dataKey="amount" fill="url(#colorAmount)" stroke="hsl(var(--primary))" strokeWidth={2.5} />
        </AreaChart>
      </ChartContainer>
    </motion.div>

    {/* Orders per month bar */}
    <motion.div className="glass-card rounded-2xl p-5" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
      <h3 className="font-bold text-sm text-foreground mb-4 flex items-center gap-2">
        <BarChart3 size={16} className="text-primary" /> Số đơn theo tháng
      </h3>
      <ChartContainer config={{ count: { label: "Số đơn", color: "hsl(var(--secondary))" } }} className="h-[160px] w-full">
        <BarChart data={orderTrendData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={11} tick={{ fill: "hsl(var(--muted-foreground))" }} />
          <YAxis tickLine={false} axisLine={false} fontSize={10} tick={{ fill: "hsl(var(--muted-foreground))" }} width={25} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="count" fill="var(--color-count)" radius={[6, 6, 0, 0]} barSize={24} />
        </BarChart>
      </ChartContainer>
    </motion.div>
  </>
);

/* ===== TASK TAB ===== */
const TaskTab = () => (
  <>
    <div className="grid grid-cols-2 gap-3">
      {[
        { label: "Tổng công việc", value: "35", color: "text-foreground" },
        { label: "Hoàn thành", value: "30", color: "text-primary" },
        { label: "Đang xử lý", value: "3", color: "text-secondary" },
        { label: "Hiệu suất", value: "87%", color: "text-primary" },
      ].map((s, i) => (
        <motion.div key={s.label} className="glass-card rounded-2xl p-3.5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
          <p className={`text-xl font-black ${s.color}`}>{s.value}</p>
          <p className="text-[10px] text-muted-foreground mt-0.5">{s.label}</p>
        </motion.div>
      ))}
    </div>

    {/* Task efficiency by type */}
    <motion.div className="glass-card rounded-2xl p-5" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
      <h3 className="font-bold text-sm text-foreground mb-4 flex items-center gap-2">
        <Activity size={16} className="text-primary" /> Hiệu suất theo loại
      </h3>
      <div className="space-y-4">
        {taskEfficiency.map((t) => {
          const pct = Math.round((t.completed / t.total) * 100);
          return (
            <div key={t.name}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[12px] font-semibold text-foreground">{t.name}</span>
                <span className="text-[11px] font-bold text-primary">{t.completed}/{t.total} ({pct}%)</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: t.fill }}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>

    {/* Task trend */}
    <motion.div className="glass-card rounded-2xl p-5" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
      <h3 className="font-bold text-sm text-foreground mb-4 flex items-center gap-2">
        <TrendingUp size={16} className="text-primary" /> Xu hướng công việc
      </h3>
      <ChartContainer config={{ tasks: { label: "Công việc", color: "hsl(var(--secondary))" } }} className="h-[160px] w-full">
        <LineChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={11} tick={{ fill: "hsl(var(--muted-foreground))" }} />
          <YAxis tickLine={false} axisLine={false} fontSize={10} tick={{ fill: "hsl(var(--muted-foreground))" }} width={25} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line type="monotone" dataKey="tasks" stroke="var(--color-tasks)" strokeWidth={2.5} dot={{ fill: "var(--color-tasks)", r: 4 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ChartContainer>
    </motion.div>
  </>
);

export default CustomerReports;
