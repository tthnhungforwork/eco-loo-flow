import { useState } from "react";
import MobileHeader from "@/components/MobileHeader";
import SegmentedControl from "@/components/SegmentedControl";
import StatusBadge from "@/components/StatusBadge";
import { Clock, User, Play, Search, MapPin, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

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
  { id: 1, title: "Vệ sinh NVS Tầng 3 - Tòa A", type: "VSLD", assignee: "Tôi", creator: "Admin KTX", deadline: "16/03/2026", status: "processing", nvs: "NVS Tầng 3", orderId: "DV-101" },
  { id: 2, title: "Kiểm tra hệ thống thoát nước", type: "SCBD", assignee: "Tôi", creator: "Admin KTX", deadline: "17/03/2026", status: "new", nvs: "NVS Sảnh B" },
  { id: 3, title: "Bảo trì thiết bị vệ sinh", type: "SCBD", assignee: "Tôi", creator: "Nguyễn Văn A", deadline: "15/03/2026", status: "done", nvs: "NVS Tầng 1" },
  { id: 4, title: "Khử mùi NVS Sảnh B", type: "VSLD", assignee: "Nguyễn Văn A", creator: "Tôi", deadline: "18/03/2026", status: "processing", nvs: "NVS Sảnh B", orderId: "DV-102" },
  { id: 5, title: "Thay bình xà phòng tầng 5", type: "VSLD", assignee: "Trần Thị B", creator: "Tôi", deadline: "19/03/2026", status: "new", nvs: "NVS Tầng 5" },
  { id: 6, title: "Sửa chữa van nước NVS Eco", type: "SCBD", assignee: "Phạm Văn C", creator: "Admin KTX", deadline: "20/03/2026", status: "new", nvs: "NVS Eco Park" },
];

const statusLabel: Record<string, string> = { new: "Mới", processing: "Đang xử lý", done: "Hoàn thành" };
const typeLabel: Record<string, string> = { VSLD: "Vệ sinh lau dọn", SCBD: "Sửa chữa bảo dưỡng" };
const typeColor: Record<string, string> = { VSLD: "bg-primary/10 text-primary", SCBD: "bg-eco-orange/10 text-eco-orange" };

const CustomerTasks = () => {
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string | null>(null);

  const filtered = allTasks
    .filter((t) => {
      if (tab === 1) return t.creator === "Tôi";
      if (tab === 2) return t.assignee === "Tôi";
      return true;
    })
    .filter((t) => !filterType || t.type === filterType)
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="gradient-surface min-h-screen">
      <MobileHeader title="Công việc" />
      <div className="py-4">
        <SegmentedControl tabs={["Tất cả", "Việc tôi giao", "Việc của tôi"]} active={tab} onChange={setTab} />

        <div className="px-4 mb-4">
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Tìm công việc..."
              className="pl-10 rounded-xl bg-card/60 backdrop-blur-sm border-border/40 h-11 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="px-4 mb-4 flex gap-2">
          {[
            { key: null, label: "Tất cả" },
            { key: "VSLD", label: "VSLD" },
            { key: "SCBD", label: "SCBD" },
          ].map((f) => (
            <motion.button
              key={f.label}
              onClick={() => setFilterType(f.key)}
              className={`chip ${filterType === f.key ? "chip-active" : "chip-inactive"}`}
              whileTap={{ scale: 0.93 }}
            >
              {f.label}
            </motion.button>
          ))}
        </div>

        <div className="px-4 space-y-3">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-20">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted/60 flex items-center justify-center">
                  <FileText size={28} className="text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-sm font-medium">Không tìm thấy công việc</p>
                <p className="text-[11px] text-muted-foreground/60 mt-1">Thử tìm kiếm với từ khóa khác</p>
              </motion.div>
            )}
            {filtered.map((t, i) => (
              <motion.div
                key={t.id}
                className="glass-card rounded-2xl p-4 card-hover"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.04 }}
                layout
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1 mr-2">
                    <p className="font-semibold text-sm text-foreground leading-snug">{t.title}</p>
                    <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${typeColor[t.type]}`}>
                        {typeLabel[t.type]}
                      </span>
                      {t.orderId && (
                        <span className="text-[10px] font-mono text-muted-foreground bg-muted/50 px-1.5 py-0.5 rounded-md">
                          #{t.orderId}
                        </span>
                      )}
                    </div>
                  </div>
                  <StatusBadge status={t.status} label={statusLabel[t.status]} />
                </div>
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground mt-3 pt-3 border-t border-border/30">
                  <span className="flex items-center gap-1"><User size={12} />{t.assignee}</span>
                  <span className="flex items-center gap-1"><Clock size={12} />{t.deadline}</span>
                  <span className="flex items-center gap-1"><MapPin size={12} />{t.nvs}</span>
                </div>
                {t.status !== "done" && (
                  <Button
                    size="sm"
                    className="w-full mt-3 touch-target font-bold rounded-xl gradient-primary border-0 text-primary-foreground text-xs gap-1.5 shadow-sm h-10"
                  >
                    <Play size={13} /> Thực hiện
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

export default CustomerTasks;
