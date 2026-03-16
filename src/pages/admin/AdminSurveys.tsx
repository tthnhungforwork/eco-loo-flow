import MobileHeader from "@/components/MobileHeader";
import { FileText, BarChart, ChevronRight, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

const surveySections = [
  {
    title: "Tư vấn Số hóa NVS",
    desc: "Quản lý các phiếu tư vấn số hóa nhà vệ sinh",
    icon: FileText,
    gradient: "gradient-primary",
    count: 24,
    items: [
      { id: "TV-001", name: "Tư vấn NVS Tòa A", client: "Nguyễn Văn K", date: "16/03/2026", status: "Đã hoàn thành" },
      { id: "TV-002", name: "Tư vấn NVS KTX Block B", client: "Công ty ABC", date: "14/03/2026", status: "Đang xử lý" },
      { id: "TV-003", name: "Tư vấn NVS Eco Park", client: "Eco Park Corp", date: "10/03/2026", status: "Đã hoàn thành" },
    ],
  },
  {
    title: "Sạch - Xanh - Tuần hoàn",
    desc: "Dữ liệu khảo sát 12 tháng từ đối tác",
    icon: BarChart,
    gradient: "gradient-blue",
    count: 156,
    items: [
      { id: "KS-001", name: "Khảo sát NVS Tầng 3 - T3/2026", client: "Eco Clean", date: "15/03/2026", status: "Đã duyệt" },
      { id: "KS-002", name: "Khảo sát NVS Sảnh B - T3/2026", client: "Green Tech", date: "12/03/2026", status: "Chờ duyệt" },
      { id: "KS-003", name: "Khảo sát Eco Park - T2/2026", client: "Eco Clean", date: "28/02/2026", status: "Đã duyệt" },
    ],
  },
];

const AdminSurveys = () => {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <div>
      <MobileHeader title="Khảo sát" />
      <div className="px-4 py-5 space-y-3">
        {surveySections.map((s, i) => (
          <motion.div key={s.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <button
              className="w-full glass-card rounded-2xl p-5 flex items-center gap-4 text-left touch-target card-hover"
              onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
            >
              <div className={`icon-container ${s.gradient} text-primary-foreground shadow-glow`}>
                <s.icon size={22} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm text-foreground">{s.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
                <p className="text-xs text-primary font-bold mt-1.5">{s.count} phiếu khảo sát</p>
              </div>
              <ChevronRight size={18} className={`text-muted-foreground shrink-0 transition-transform ${expandedIdx === i ? "rotate-90" : ""}`} />
            </button>

            {expandedIdx === i && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-2 space-y-2 pl-2"
              >
                {s.items.map((item) => (
                  <div key={item.id} className="glass-card rounded-xl p-3 flex items-center gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-foreground">{item.name}</p>
                      <p className="text-[11px] text-muted-foreground">{item.client} · {item.date}</p>
                    </div>
                    <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${item.status.includes("Chờ") ? "bg-eco-orange/10 text-eco-orange" : "bg-primary/10 text-primary"}`}>
                      {item.status}
                    </span>
                    <button className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                      <Eye size={14} className="text-muted-foreground" />
                    </button>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminSurveys;
