import { motion } from "framer-motion";
import { Sparkles, Leaf, Recycle, Monitor, TrendingUp, CheckCircle2 } from "lucide-react";
import {
  ChartContainer, ChartConfig, ChartTooltip, ChartTooltipContent,
} from "@/components/ui/chart";
import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const surveyScores = [
  { subject: "Sạch", before: 55, after: 82 },
  { subject: "Xanh", before: 40, after: 75 },
  { subject: "Tuần hoàn", before: 30, after: 68 },
  { subject: "An toàn", before: 65, after: 88 },
  { subject: "Tiện nghi", before: 50, after: 78 },
];

const netzeroProgress = [
  { name: "NVS-001", progress: 78, target: 100 },
  { name: "NVS-002", progress: 55, target: 100 },
  { name: "NVS-003", progress: 92, target: 100 },
  { name: "NVS-004", progress: 40, target: 100 },
];

const digitalConsulting = [
  { category: "Quy trình vận hành", score: 85, status: "Hoàn thành" },
  { category: "Hệ thống giám sát", score: 70, status: "Đang triển khai" },
  { category: "Báo cáo tự động", score: 60, status: "Đang triển khai" },
  { category: "Đào tạo nhân sự", score: 90, status: "Hoàn thành" },
];

const qualityCategories = [
  {
    title: "Sạch", icon: Sparkles, color: "text-primary", bg: "bg-primary/10",
    items: [
      { label: "Không có côn trùng", passed: true },
      { label: "Thoát nước tốt", passed: true },
      { label: "Thông thoáng", passed: false },
      { label: "Không mùi hôi", passed: true },
    ],
  },
  {
    title: "Xanh", icon: Leaf, color: "text-primary", bg: "bg-primary/10",
    items: [
      { label: "Không hóa chất", passed: true },
      { label: "Tiết kiệm nước/điện", passed: false },
      { label: "Chế phẩm sinh học", passed: true },
    ],
  },
  {
    title: "Tuần hoàn", icon: Recycle, color: "text-primary", bg: "bg-primary/10",
    items: [
      { label: "Năng lượng tái tạo", passed: false },
      { label: "Nước tái sử dụng", passed: false },
      { label: "Giảm phát thải carbon", passed: true },
    ],
  },
];

const card = "glass-card rounded-2xl p-5";
const anim = (i: number) => ({ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, transition: { delay: i * 0.04 } });

const ReportQuality = () => {
  const totalItems = qualityCategories.reduce((s, c) => s + c.items.length, 0);
  const passedItems = qualityCategories.reduce((s, c) => s + c.items.filter(i => i.passed).length, 0);
  const overallScore = Math.round((passedItems / totalItems) * 100);

  return (
    <div className="space-y-4">
      {/* Score overview */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Điểm chất lượng", value: `${overallScore}%`, color: "text-primary" },
          { label: "Đạt tiêu chí", value: `${passedItems}/${totalItems}`, color: "text-primary" },
          { label: "NVS Netzero", value: "2/4", color: "text-foreground" },
        ].map((s, i) => (
          <motion.div key={s.label} className="glass-card rounded-2xl p-3 text-center" {...anim(i)}>
            <p className={`text-lg font-black ${s.color}`}>{s.value}</p>
            <p className="text-[10px] text-muted-foreground">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Radar: Before vs After */}
      <motion.div className={card} {...anim(3)}>
        <h3 className="font-bold text-sm text-foreground mb-4 flex items-center gap-2">
          <TrendingUp size={16} className="text-primary" /> Cải thiện trước & sau triển khai
        </h3>
        <div className="h-[220px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={surveyScores} cx="50%" cy="50%" outerRadius="70%">
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
              <Radar name="Trước" dataKey="before" stroke="hsl(var(--muted-foreground))" fill="hsl(var(--muted-foreground))" fillOpacity={0.15} strokeWidth={1.5} />
              <Radar name="Sau" dataKey="after" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-muted-foreground rounded" />
            <span className="text-[11px] text-muted-foreground">Trước</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-0.5 bg-primary rounded" />
            <span className="text-[11px] text-primary font-semibold">Sau</span>
          </div>
        </div>
      </motion.div>

      {/* Checklist summary */}
      {qualityCategories.map((cat, ci) => (
        <motion.div key={cat.title} className={card} {...anim(ci + 4)}>
          <h3 className="font-bold text-sm text-foreground mb-3 flex items-center gap-2">
            <cat.icon size={16} className={cat.color} /> Khảo sát {cat.title}
          </h3>
          <div className="space-y-2">
            {cat.items.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <CheckCircle2 size={14} className={item.passed ? "text-primary" : "text-muted-foreground/40"} />
                <span className={`text-[12px] ${item.passed ? "text-foreground" : "text-muted-foreground"}`}>{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Netzero progress */}
      <motion.div className={card} {...anim(7)}>
        <h3 className="font-bold text-sm text-foreground mb-4 flex items-center gap-2">
          <Recycle size={16} className="text-primary" /> Tiến độ Netzero
        </h3>
        <div className="space-y-4">
          {netzeroProgress.map((n, i) => (
            <div key={n.name}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[12px] font-semibold text-foreground">{n.name}</span>
                <span className="text-[11px] font-bold text-primary">{n.progress}%</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${n.progress}%` }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Digital consulting */}
      <motion.div className={card} {...anim(8)}>
        <h3 className="font-bold text-sm text-foreground mb-4 flex items-center gap-2">
          <Monitor size={16} className="text-primary" /> Tư vấn số hóa
        </h3>
        <div className="space-y-3">
          {digitalConsulting.map((d) => (
            <div key={d.category} className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-[12px] font-semibold text-foreground">{d.category}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${d.score}%` }} />
                  </div>
                  <span className="text-[10px] font-bold text-primary">{d.score}%</span>
                </div>
              </div>
              <span className={`ml-3 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                d.status === "Hoàn thành" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"
              }`}>
                {d.status}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ReportQuality;
