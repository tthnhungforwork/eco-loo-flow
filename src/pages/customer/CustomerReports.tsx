import MobileHeader from "@/components/MobileHeader";
import SegmentedControl from "@/components/SegmentedControl";
import { BarChart3, TrendingUp, AlertTriangle, ShoppingBag, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const reportSections = [
  {
    title: "Ticket / Phản ánh",
    icon: AlertTriangle,
    gradient: "gradient-warm",
    stats: [
      { label: "Tổng ticket", value: "12" },
      { label: "Đang xử lý", value: "3" },
      { label: "Đã xử lý", value: "8" },
      { label: "Chờ phản hồi", value: "1" },
    ],
  },
  {
    title: "Đơn hàng sản phẩm",
    icon: ShoppingBag,
    gradient: "gradient-blue",
    stats: [
      { label: "Tổng đơn", value: "24" },
      { label: "Hoàn thành", value: "18" },
      { label: "Đang xử lý", value: "4" },
      { label: "Tổng chi", value: "8.5M" },
    ],
  },
  {
    title: "Công việc SCBD",
    icon: Wrench,
    gradient: "gradient-primary",
    stats: [
      { label: "Tổng CV", value: "15" },
      { label: "Hoàn thành", value: "10" },
      { label: "Đang xử lý", value: "3" },
      { label: "Hiệu suất", value: "87%" },
    ],
  },
];

const monthlyData = [
  { month: "T1", tickets: 2, orders: 4, tasks: 3 },
  { month: "T2", tickets: 1, orders: 5, tasks: 2 },
  { month: "T3", tickets: 3, orders: 3, tasks: 4 },
  { month: "T4", tickets: 0, orders: 6, tasks: 1 },
  { month: "T5", tickets: 4, orders: 3, tasks: 3 },
  { month: "T6", tickets: 2, orders: 3, tasks: 2 },
];

const CustomerReports = () => {
  return (
    <div>
      <MobileHeader title="Báo cáo" />
      <div className="px-4 py-5 space-y-6">
        {/* Report sections */}
        {reportSections.map((section, si) => (
          <motion.section
            key={section.title}
            className="glass-card rounded-2xl p-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: si * 0.1 }}
          >
            <h3 className="section-title text-sm mb-4 flex items-center gap-2">
              <div className={`icon-container-sm ${section.gradient} text-primary-foreground shadow-sm`}>
                <section.icon size={16} />
              </div>
              {section.title}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {section.stats.map((s) => (
                <div key={s.label} className="bg-muted/40 rounded-xl p-3">
                  <p className="text-xl font-extrabold text-foreground">{s.value}</p>
                  <p className="text-[11px] text-muted-foreground font-medium">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.section>
        ))}

        {/* Chart */}
        <motion.section
          className="glass-card rounded-2xl p-5"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="section-title text-sm mb-5 flex items-center gap-2">
            <BarChart3 size={16} className="text-primary" /> Tổng quan 6 tháng
          </h3>
          <div className="flex items-end justify-between gap-2 h-36">
            {monthlyData.map((d, i) => {
              const total = d.tickets + d.orders + d.tasks;
              const maxTotal = 14;
              return (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1.5">
                  <span className="text-[10px] font-bold text-foreground">{total}</span>
                  <motion.div
                    className="w-full gradient-primary rounded-lg"
                    initial={{ height: 0 }}
                    animate={{ height: `${(total / maxTotal) * 100}%` }}
                    transition={{ delay: 0.4 + i * 0.08, duration: 0.5 }}
                  />
                  <span className="text-[10px] font-medium text-muted-foreground">{d.month}</span>
                </div>
              );
            })}
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default CustomerReports;
