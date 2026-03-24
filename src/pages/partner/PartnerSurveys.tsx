import { useState } from "react";
import PartnerHeader from "./components/PartnerHeader";
import { FileText, BarChart, ChevronRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import SurveyGreenSheet from "./components/SurveyGreenSheet";

const surveySections = [
  {
    title: "Tư vấn Số hóa NVS",
    desc: "Đánh giá và tư vấn giải pháp số hóa cho nhà vệ sinh",
    icon: FileText,
    gradient: "gradient-primary",
    action: "expand",
    items: [
      { id: "TV-001", name: "Tư vấn NVS Tầng 3", date: "16/03/2026", status: "Đã hoàn thành" },
      { id: "TV-002", name: "Tư vấn NVS KTX Block B", date: "14/03/2026", status: "Đang thực hiện" },
    ],
  },
  {
    title: "Khảo sát Sạch - Xanh - Tuần hoàn",
    desc: "Đánh giá tiêu chuẩn bền vững cho nhà vệ sinh",
    icon: BarChart,
    gradient: "gradient-blue",
    action: "sheet",
    items: [],
  },
];

const PartnerSurveys = () => {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [showGreenSheet, setShowGreenSheet] = useState(false);

  return (
    <div>
      <PartnerHeader title="Khảo sát" />
      <div className="px-4 py-5 space-y-3">
        {surveySections.map((s, i) => (
          <motion.div key={s.title} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <button
              className="w-full glass-card rounded-2xl p-5 flex items-center gap-4 text-left touch-target card-hover"
              onClick={() => {
                if (s.action === "sheet") {
                  setShowGreenSheet(true);
                } else {
                  setExpandedIdx(expandedIdx === i ? null : i);
                }
              }}
            >
              <div className={`icon-container ${s.gradient} text-primary-foreground shadow-glow`}>
                <s.icon size={22} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-sm text-foreground">{s.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
              </div>
              <ChevronRight size={18} className={`text-muted-foreground shrink-0 transition-transform ${expandedIdx === i && s.action !== "sheet" ? "rotate-90" : ""}`} />
            </button>

            {expandedIdx === i && s.action === "expand" && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-2 space-y-2 pl-2">
                {s.items.map((item) => (
                  <div key={item.id} className="glass-card rounded-xl p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-semibold text-foreground">{item.name}</p>
                        <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5"><Calendar size={11} /> {item.date}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${
                        item.status === "Đã hoàn thành" ? "bg-primary/10 text-primary" : "bg-eco-orange/10 text-eco-orange"
                      }`}>{item.status}</span>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showGreenSheet && <SurveyGreenSheet onClose={() => setShowGreenSheet(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default PartnerSurveys;
