import { useState } from "react";
import PartnerHeader from "./components/PartnerHeader";
import { FileText, BarChart, ChevronRight, Eye, Calendar, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const surveySections = [
  {
    title: "Tư vấn Số hóa NVS",
    desc: "Đánh giá và tư vấn giải pháp số hóa cho nhà vệ sinh",
    icon: FileText,
    gradient: "gradient-primary",
    items: [
      { id: "TV-001", name: "Tư vấn NVS Tầng 3", date: "16/03/2026", status: "Đã hoàn thành" },
      { id: "TV-002", name: "Tư vấn NVS KTX Block B", date: "14/03/2026", status: "Đang thực hiện" },
    ],
  },
  {
    title: "Khảo sát Sạch - Xanh - Tuần hoàn",
    desc: "Form nhập liệu 12 tháng theo tiêu chí bền vững",
    icon: BarChart,
    gradient: "gradient-blue",
    items: [
      { id: "KS-001", name: "NVS Tầng 3 - Tháng 3/2026", date: "15/03/2026", status: "Đã nộp", details: { dienNang: "120 kWh", nuoc: "45m³", chePham: "5L", vsld: "22 lần" } },
      { id: "KS-002", name: "NVS Sảnh B - Tháng 3/2026", date: "10/03/2026", status: "Chưa nộp", details: null },
      { id: "KS-003", name: "NVS Tầng 3 - Tháng 2/2026", date: "28/02/2026", status: "Đã duyệt", details: { dienNang: "115 kWh", nuoc: "42m³", chePham: "4.5L", vsld: "20 lần" } },
    ],
  },
];

const PartnerSurveys = () => {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <div>
      <PartnerHeader title="Khảo sát" />
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
              </div>
              <ChevronRight size={18} className={`text-muted-foreground shrink-0 transition-transform ${expandedIdx === i ? "rotate-90" : ""}`} />
            </button>

            {expandedIdx === i && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-2 space-y-2 pl-2">
                {s.items.map((item) => (
                  <div key={item.id} className="glass-card rounded-xl p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{item.name}</p>
                        <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5"><Calendar size={11} /> {item.date}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                        item.status === "Đã duyệt" ? "bg-primary/10 text-primary" :
                        item.status === "Đã nộp" ? "bg-secondary/10 text-secondary" :
                        item.status === "Chưa nộp" ? "bg-destructive/10 text-destructive" :
                        "bg-eco-orange/10 text-eco-orange"
                      }`}>{item.status}</span>
                    </div>

                    {"details" in item && item.details && (
                      <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/50">
                        <div className="text-xs"><span className="text-muted-foreground">Điện năng:</span> <span className="font-semibold text-foreground">{item.details.dienNang}</span></div>
                        <div className="text-xs"><span className="text-muted-foreground">Nước:</span> <span className="font-semibold text-foreground">{item.details.nuoc}</span></div>
                        <div className="text-xs"><span className="text-muted-foreground">Chế phẩm:</span> <span className="font-semibold text-foreground">{item.details.chePham}</span></div>
                        <div className="text-xs"><span className="text-muted-foreground">Số lần VSLD:</span> <span className="font-semibold text-foreground">{item.details.vsld}</span></div>
                      </div>
                    )}

                    {item.status === "Chưa nộp" && (
                      <Button size="sm" className="w-full rounded-xl font-bold gradient-primary border-0 shadow-glow">
                        <FileText size={14} className="mr-1" /> Nhập liệu
                      </Button>
                    )}
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

export default PartnerSurveys;
