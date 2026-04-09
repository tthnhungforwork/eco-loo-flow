import { motion } from "framer-motion";
import { AlertTriangle, Clock, CheckCircle2, Activity, Building2 } from "lucide-react";
import {
  ChartContainer, ChartConfig, ChartTooltip, ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell, ResponsiveContainer, Tooltip, AreaChart, Area,
} from "recharts";

const ticketByMonth = [
  { month: "T1", created: 5, resolved: 4 },
  { month: "T2", created: 3, resolved: 3 },
  { month: "T3", created: 7, resolved: 5 },
  { month: "T4", created: 2, resolved: 4 },
  { month: "T5", created: 6, resolved: 5 },
  { month: "T6", created: 4, resolved: 6 },
];

const byStatus = [
  { name: "Đã đóng", value: 18, fill: "hsl(var(--primary))" },
  { name: "Đang xử lý", value: 5, fill: "hsl(var(--secondary))" },
  { name: "Chờ phản hồi", value: 2, fill: "hsl(var(--eco-orange))" },
  { name: "Mới tạo", value: 2, fill: "hsl(var(--muted-foreground))" },
];

const byPriority = [
  { name: "Khẩn cấp", value: 3, fill: "hsl(var(--destructive))" },
  { name: "Cao", value: 8, fill: "hsl(var(--eco-orange))" },
  { name: "Trung bình", value: 10, fill: "hsl(var(--secondary))" },
  { name: "Thấp", value: 6, fill: "hsl(var(--muted-foreground))" },
];

const byToilet = [
  { name: "NVS-001", tickets: 8 },
  { name: "NVS-002", tickets: 6 },
  { name: "NVS-003", tickets: 5 },
  { name: "NVS-004", tickets: 8 },
];

const trendConfig: ChartConfig = {
  created: { label: "Tạo mới", color: "hsl(var(--destructive))" },
  resolved: { label: "Đã giải quyết", color: "hsl(var(--primary))" },
};

const card = "glass-card rounded-2xl p-5";
const anim = (i: number) => ({ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.04 } });

const PieSection = ({ title, data, icon: Icon }: { title: string; data: typeof byStatus; icon: typeof AlertTriangle }) => (
  <motion.div className={card} {...anim(3)}>
    <h3 className="font-bold text-sm text-foreground mb-4 flex items-center gap-2">
      <Icon size={16} className="text-primary" /> {title}
    </h3>
    <div className="flex items-center gap-4">
      <div className="w-[120px] h-[120px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={30} outerRadius={50} paddingAngle={3} dataKey="value">
              {data.map((e, i) => <Cell key={i} fill={e.fill} />)}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex-1 space-y-2">
        {data.map((s) => (
          <div key={s.name} className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: s.fill }} />
            <span className="text-[11px] text-foreground flex-1">{s.name}</span>
            <span className="text-[11px] font-bold text-foreground">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
);

const ReportTickets = () => (
  <div className="space-y-4">
    {/* Top KPIs */}
    <div className="grid grid-cols-2 gap-3">
      {[
        { label: "Tổng ticket", value: "27", icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10" },
        { label: "Đã giải quyết", value: "18", icon: CheckCircle2, color: "text-primary", bg: "bg-primary/10" },
        { label: "TB phản hồi", value: "1.5h", icon: Clock, color: "text-secondary", bg: "bg-secondary/10" },
        { label: "TB đóng ticket", value: "4.2h", icon: Activity, color: "text-foreground", bg: "bg-muted" },
      ].map((k, i) => (
        <motion.div key={k.label} className="glass-card rounded-2xl p-4" {...anim(i)}>
          <div className={`w-9 h-9 rounded-xl ${k.bg} flex items-center justify-center mb-2`}>
            <k.icon size={16} className={k.color} />
          </div>
          <p className="text-xl font-black text-foreground">{k.value}</p>
          <p className="text-[10px] text-muted-foreground">{k.label}</p>
        </motion.div>
      ))}
    </div>

    {/* Trend */}
    <motion.div className={card} {...anim(4)}>
      <h3 className="font-bold text-sm text-foreground mb-4 flex items-center gap-2">
        <Activity size={16} className="text-primary" /> Xu hướng Ticket
      </h3>
      <ChartContainer config={trendConfig} className="h-[180px] w-full">
        <AreaChart data={ticketByMonth}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          <XAxis dataKey="month" tickLine={false} axisLine={false} fontSize={11} tick={{ fill: "hsl(var(--muted-foreground))" }} />
          <YAxis tickLine={false} axisLine={false} fontSize={10} tick={{ fill: "hsl(var(--muted-foreground))" }} width={25} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area type="monotone" dataKey="created" fill="hsl(var(--destructive) / 0.15)" stroke="hsl(var(--destructive))" strokeWidth={2} />
          <Area type="monotone" dataKey="resolved" fill="hsl(var(--primary) / 0.15)" stroke="hsl(var(--primary))" strokeWidth={2} />
        </AreaChart>
      </ChartContainer>
    </motion.div>

    {/* By status & priority */}
    <PieSection title="Theo trạng thái" data={byStatus} icon={CheckCircle2} />
    <PieSection title="Theo mức độ ưu tiên" data={byPriority} icon={AlertTriangle} />

    {/* By toilet */}
    <motion.div className={card} {...anim(6)}>
      <h3 className="font-bold text-sm text-foreground mb-4 flex items-center gap-2">
        <Building2 size={16} className="text-primary" /> Ticket theo NVS
      </h3>
      <ChartContainer config={{ tickets: { label: "Ticket", color: "hsl(var(--destructive))" } }} className="h-[160px] w-full">
        <BarChart data={byToilet} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
          <XAxis type="number" tickLine={false} axisLine={false} fontSize={10} tick={{ fill: "hsl(var(--muted-foreground))" }} />
          <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} fontSize={10} tick={{ fill: "hsl(var(--muted-foreground))" }} width={55} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="tickets" fill="var(--color-tickets)" radius={[0, 6, 6, 0]} barSize={16} />
        </BarChart>
      </ChartContainer>
    </motion.div>
  </div>
);

export default ReportTickets;
