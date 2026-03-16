import { useState } from "react";
import PartnerHeader from "./components/PartnerHeader";
import StatusBadge from "@/components/StatusBadge";
import { Clock, User, Play, Search, MapPin, FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { useRole } from "@/contexts/RoleContext";

interface Task {
  id: number;
  title: string;
  type: "VSLD" | "SCBD";
  assignee: string;
  creator: string;
  deadline: string;
  status: string;
  nvs: string;
  orderId?: string;
}

const allTasks: Task[] = [
  { id: 1, title: "Kiểm tra chất lượng NVS Block A", type: "VSLD", assignee: "Tôi", creator: "Admin KTX", deadline: "16/03/2026", status: "processing", nvs: "NVS Block A", orderId: "DV-101" },
  { id: 2, title: "Lập báo cáo tháng 3", type: "SCBD", assignee: "Tôi", creator: "Admin KTX", deadline: "20/03/2026", status: "new", nvs: "NVS Tầng 3" },
  { id: 3, title: "Vệ sinh NVS Tầng 2", type: "VSLD", assignee: "Trần Văn A", creator: "Tôi", deadline: "16/03/2026", status: "processing", nvs: "NVS Tầng 2" },
  { id: 4, title: "Thay vật tư NVS Sảnh C", type: "SCBD", assignee: "Lê Thị B", creator: "Tôi", deadline: "17/03/2026", status: "new", nvs: "NVS Sảnh C" },
  { id: 5, title: "Khử mùi NVS Tầng 4", type: "VSLD", assignee: "Phạm Văn C", creator: "Tôi", deadline: "15/03/2026", status: "done", nvs: "NVS Tầng 4" },
  { id: 6, title: "Sửa chữa van nước NVS Eco", type: "SCBD", assignee: "Nguyễn Văn D", creator: "Admin KTX", deadline: "18/03/2026", status: "new", nvs: "NVS Eco Park" },
];

const statusLabel: Record<string, string> = { new: "Mới", processing: "Đang xử lý", done: "Hoàn thành" };
const typeLabel: Record<string, string> = { VSLD: "Vệ sinh lau dọn", SCBD: "Sửa chữa bảo dưỡng" };
const typeColor: Record<string, string> = { VSLD: "bg-primary/10 text-primary", SCBD: "bg-amber-500/10 text-amber-600" };

const PartnerTasks = () => {
  const { isBusinessOwner } = useRole();
  const tabs = isBusinessOwner ? ["Việc của tôi", "Việc của nhân viên"] : ["Việc của tôi"];
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string | null>(null);

  const filtered = allTasks
    .filter((t) => {
      if (tab === 0) return t.assignee === "Tôi";
      // Tab 1: employee tasks (not "Tôi")
      return t.assignee !== "Tôi";
    })
    .filter((t) => !filterType || t.type === filterType)
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <PartnerHeader title="QL Công việc" />
      <div className="py-4">
        {/* Tabs */}
        <div className="px-4 mb-4 flex gap-2">
          {tabs.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                tab === i ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="px-4 mb-3 relative">
          <Search size={16} className="absolute left-7 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Tìm công việc..." className="pl-9 rounded-xl bg-card/80 border-border/50" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className="px-4 mb-4 flex gap-2 flex-wrap">
          {[{ k: null, l: "Tất cả" }, { k: "VSLD", l: "VSLD" }, { k: "SCBD", l: "SCBD" }].map((f) => (
            <button
              key={f.l}
              onClick={() => setFilterType(f.k)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                filterType === f.k ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {f.l}
            </button>
          ))}
        </div>

        {isBusinessOwner && tab === 1 && (
          <div className="px-4 mb-4">
            <Button className="w-full h-11 font-bold gap-2 rounded-2xl gradient-primary border-0 shadow-glow">
              <Plus size={18} /> Giao việc cho nhân viên
            </Button>
          </div>
        )}

        <div className="px-4 space-y-3 pb-24">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-muted flex items-center justify-center">
                  <FileText size={28} className="text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-sm font-medium">Không tìm thấy công việc</p>
              </motion.div>
            )}
            {filtered.map((t, i) => (
              <motion.div
                key={t.id}
                className="glass-card rounded-2xl p-4 card-hover"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: i * 0.04 }}
                layout
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1 mr-2">
                    <p className="font-semibold text-sm text-foreground">{t.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${typeColor[t.type]}`}>{typeLabel[t.type]}</span>
                      {t.orderId && <span className="text-[10px] font-mono text-muted-foreground">#{t.orderId}</span>}
                    </div>
                  </div>
                  <StatusBadge status={t.status} label={statusLabel[t.status]} />
                </div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground mt-2">
                  <span className="flex items-center gap-1"><User size={12} />{t.assignee}</span>
                  <span className="flex items-center gap-1"><Clock size={12} />{t.deadline}</span>
                  <span className="flex items-center gap-1"><MapPin size={12} />{t.nvs}</span>
                </div>
                {t.assignee === "Tôi" && t.status !== "done" && (
                  <Button size="sm" className="w-full mt-3 h-9 font-bold rounded-xl gradient-primary border-0 text-xs gap-1 shadow-glow">
                    <Play size={12} /> Thực hiện
                  </Button>
                )}
                {t.assignee !== "Tôi" && t.creator === "Tôi" && t.status !== "done" && (
                  <Button size="sm" variant="outline" className="w-full mt-3 h-9 font-bold rounded-xl text-xs gap-1 border-primary/30 text-primary">
                    <Clock size={12} /> Nhắc nhở
                  </Button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default PartnerTasks;
