import MobileHeader from "@/components/MobileHeader";
import { FileText, BarChart, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

const AdminSurveys = () => (
  <div>
    <MobileHeader title="Khảo sát" />
    <div className="px-4 py-5 space-y-3">
      {[
        { title: "Tư vấn số hóa NVS", desc: "Quản lý các phiếu tư vấn số hóa nhà vệ sinh", icon: FileText, gradient: "gradient-primary", count: 24 },
        { title: "Sạch - Xanh - Tuần hoàn", desc: "Dữ liệu khảo sát 12 tháng từ đối tác", icon: BarChart, gradient: "gradient-blue", count: 156 },
      ].map((s, i) => (
        <motion.button
          key={s.title}
          className="w-full glass-card rounded-2xl p-5 flex items-center gap-4 text-left touch-target card-hover"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          whileTap={{ scale: 0.97 }}
        >
          <div className={`icon-container ${s.gradient} text-primary-foreground shadow-glow`}>
            <s.icon size={22} />
          </div>
          <div className="flex-1">
            <p className="font-bold text-sm text-foreground">{s.title}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
            <p className="text-xs text-primary font-bold mt-1.5">{s.count} phiếu khảo sát</p>
          </div>
          <ChevronRight size={18} className="text-muted-foreground shrink-0" />
        </motion.button>
      ))}
    </div>
  </div>
);

export default AdminSurveys;
