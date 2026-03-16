import { useState } from "react";
import CustomerHeader from "./components/CustomerHeader";
import SegmentedControl from "@/components/SegmentedControl";
import StatusBadge from "@/components/StatusBadge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Clock, User, Play, Search, MapPin, FileText, Bath, Calendar,
  CheckCircle2, ClipboardList, Image as ImageIcon, ChevronRight
} from "lucide-react";
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
  description?: string;
  checklist?: { item: string; done: boolean }[];
}

const allTasks: Task[] = [
  {
    id: 1, title: "Vệ sinh NVS Tầng 3 - Tòa A", type: "VSLD", assignee: "Tôi", creator: "Admin KTX",
    deadline: "16/03/2026", status: "processing", nvs: "NVS Tầng 3", orderId: "DV-101",
    description: "Thực hiện vệ sinh tổng thể NVS tầng 3, bao gồm sàn, bồn cầu, lavabo và bổ sung vật tư.",
    checklist: [
      { item: "Lau sàn nhà vệ sinh", done: true },
      { item: "Vệ sinh bồn cầu", done: true },
      { item: "Lau chùi lavabo & gương", done: false },
      { item: "Bổ sung giấy & xà phòng", done: false },
      { item: "Khử mùi", done: false },
    ],
  },
  {
    id: 2, title: "Kiểm tra hệ thống thoát nước", type: "SCBD", assignee: "Tôi", creator: "Admin KTX",
    deadline: "17/03/2026", status: "new", nvs: "NVS Sảnh B",
    description: "Kiểm tra toàn bộ hệ thống ống thoát nước tại NVS Sảnh B, phát hiện và xử lý tắc nghẽn.",
  },
  {
    id: 3, title: "Bảo trì thiết bị vệ sinh", type: "SCBD", assignee: "Tôi", creator: "Nguyễn Văn A",
    deadline: "15/03/2026", status: "done", nvs: "NVS Tầng 1",
    description: "Bảo trì các thiết bị vệ sinh bao gồm vòi nước, bồn cầu, hệ thống xả.",
  },
  {
    id: 4, title: "Khử mùi NVS Sảnh B", type: "VSLD", assignee: "Nguyễn Văn A", creator: "Tôi",
    deadline: "18/03/2026", status: "processing", nvs: "NVS Sảnh B", orderId: "DV-102",
    description: "Sử dụng chế phẩm sinh học để khử mùi khu vực NVS Sảnh B.",
    checklist: [
      { item: "Kiểm tra nguồn gây mùi", done: true },
      { item: "Xịt chế phẩm sinh học", done: false },
      { item: "Vệ sinh đường ống thoát", done: false },
    ],
  },
  {
    id: 5, title: "Thay bình xà phòng tầng 5", type: "VSLD", assignee: "Trần Thị B", creator: "Tôi",
    deadline: "19/03/2026", status: "new", nvs: "NVS Tầng 5",
    description: "Thay thế bình xà phòng đã hết tại các vị trí lavabo tầng 5.",
  },
  {
    id: 6, title: "Sửa chữa van nước NVS Eco", type: "SCBD", assignee: "Phạm Văn C", creator: "Admin KTX",
    deadline: "20/03/2026", status: "new", nvs: "NVS Eco Park",
    description: "Thay thế van nước bị hỏng tại phòng vệ sinh nam khu Eco Park.",
  },
];

const statusLabel: Record<string, string> = { new: "Mới", processing: "Đang xử lý", done: "Hoàn thành" };
const typeLabel: Record<string, string> = { VSLD: "Vệ sinh lau dọn", SCBD: "Sửa chữa bảo dưỡng" };
const typeColor: Record<string, string> = { VSLD: "bg-primary/10 text-primary", SCBD: "bg-eco-orange/10 text-eco-orange" };

const CustomerTasks = () => {
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showComplete, setShowComplete] = useState(false);
  const [completeNote, setCompleteNote] = useState("");

  const filtered = allTasks
    .filter((t) => {
      if (tab === 1) return t.creator === "Tôi";
      if (tab === 2) return t.assignee === "Tôi";
      return true;
    })
    .filter((t) => !filterType || t.type === filterType)
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));

  const handleComplete = () => {
    setShowComplete(false);
    setCompleteNote("");
    setSelectedTask(null);
  };

  return (
    <div className="gradient-surface min-h-screen">
      <CustomerHeader title="Công việc" />
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
                className="glass-card rounded-2xl p-4 card-hover cursor-pointer"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.04 }}
                layout
                onClick={() => setSelectedTask(t)}
                whileTap={{ scale: 0.98 }}
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
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Task Detail Sheet */}
      <Sheet open={!!selectedTask && !showComplete} onOpenChange={() => setSelectedTask(null)}>
        <SheetContent side="bottom" className="rounded-t-3xl max-h-[85vh] overflow-y-auto px-5 pb-8">
          {selectedTask && (
            <>
              <SheetHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-primary-foreground shadow-sm ${selectedTask.type === "VSLD" ? "gradient-primary" : "gradient-warm"}`}>
                    <ClipboardList size={22} />
                  </div>
                  <div>
                    <SheetTitle className="text-base text-left">{selectedTask.title}</SheetTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${typeColor[selectedTask.type]}`}>
                        {typeLabel[selectedTask.type]}
                      </span>
                      <StatusBadge status={selectedTask.status} label={statusLabel[selectedTask.status]} />
                    </div>
                  </div>
                </div>
              </SheetHeader>

              {selectedTask.description && (
                <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">
                  {selectedTask.description}
                </p>
              )}

              <div className="space-y-3 mb-5">
                <div className="flex items-center gap-3 bg-muted/40 rounded-xl p-3">
                  <User size={16} className="text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] text-muted-foreground">Người thực hiện</p>
                    <p className="text-[13px] font-semibold text-foreground">{selectedTask.assignee}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-muted/40 rounded-xl p-3">
                  <User size={16} className="text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] text-muted-foreground">Người tạo</p>
                    <p className="text-[13px] font-semibold text-foreground">{selectedTask.creator}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-muted/40 rounded-xl p-3">
                  <Calendar size={16} className="text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] text-muted-foreground">Thời hạn</p>
                    <p className="text-[13px] font-semibold text-foreground">{selectedTask.deadline}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-muted/40 rounded-xl p-3">
                  <Bath size={16} className="text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] text-muted-foreground">Nhà vệ sinh</p>
                    <p className="text-[13px] font-semibold text-foreground">{selectedTask.nvs}</p>
                  </div>
                </div>
                {selectedTask.orderId && (
                  <div className="flex items-center gap-3 bg-muted/40 rounded-xl p-3">
                    <FileText size={16} className="text-primary shrink-0" />
                    <div>
                      <p className="text-[10px] text-muted-foreground">Đơn hàng</p>
                      <p className="text-[13px] font-semibold text-foreground">#{selectedTask.orderId}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Checklist for VSLD */}
              {selectedTask.checklist && (
                <div className="mb-5">
                  <p className="text-[12px] font-bold text-foreground mb-2">Checklist thực hiện</p>
                  <div className="space-y-2">
                    {selectedTask.checklist.map((c, i) => (
                      <div key={i} className="flex items-center gap-2.5 bg-card border border-border/30 rounded-xl p-3">
                        <CheckCircle2 size={16} className={c.done ? "text-primary" : "text-muted-foreground/30"} />
                        <span className={`text-[12px] ${c.done ? "text-foreground line-through opacity-60" : "text-foreground"}`}>{c.item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedTask.assignee === "Tôi" && selectedTask.status !== "done" && (
                <Button
                  className="w-full touch-target font-bold rounded-2xl gradient-primary border-0 shadow-glow h-14 text-primary-foreground gap-2"
                  onClick={() => setShowComplete(true)}
                >
                  <CheckCircle2 size={18} /> Khai báo hoàn thành
                </Button>
              )}
              {selectedTask.assignee !== "Tôi" && selectedTask.creator === "Tôi" && selectedTask.status !== "done" && (
                <Button
                  variant="outline"
                  className="w-full touch-target font-bold rounded-2xl h-14 gap-2 border-primary/30 text-primary"
                  onClick={() => {/* TODO: send reminder */}}
                >
                  <Clock size={18} /> Nhắc nhở
                </Button>
              )}
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Complete Task Sheet */}
      <Sheet open={showComplete} onOpenChange={setShowComplete}>
        <SheetContent side="bottom" className="rounded-t-3xl max-h-[90vh] overflow-y-auto px-5 pb-8">
          <SheetHeader className="pb-4">
            <SheetTitle className="text-base text-left">Khai báo hoàn thành</SheetTitle>
          </SheetHeader>

          {selectedTask && (
            <div className="space-y-4">
              <div className="bg-muted/40 rounded-xl p-3">
                <p className="text-[10px] text-muted-foreground">Công việc</p>
                <p className="text-[13px] font-semibold text-foreground">{selectedTask.title}</p>
              </div>

              {selectedTask.type === "VSLD" && selectedTask.checklist && (
                <div>
                  <label className="text-[12px] font-bold text-foreground mb-1.5 block">Xác nhận checklist</label>
                  <div className="space-y-2">
                    {selectedTask.checklist.map((c, i) => (
                      <div key={i} className="flex items-center gap-2.5 bg-card border border-border/30 rounded-xl p-3">
                        <CheckCircle2 size={16} className="text-primary" />
                        <span className="text-[12px] text-foreground">{c.item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedTask.type === "SCBD" && (
                <div>
                  <label className="text-[12px] font-bold text-foreground mb-1.5 block">Kết quả sửa chữa</label>
                  <Textarea
                    placeholder="Nhập nội dung kết quả..."
                    className="rounded-xl min-h-[80px]"
                    value={completeNote}
                    onChange={(e) => setCompleteNote(e.target.value)}
                  />
                </div>
              )}

              <div>
                <label className="text-[12px] font-bold text-foreground mb-1.5 block">Ghi chú bổ sung</label>
                <Textarea
                  placeholder="Ghi chú thêm (tùy chọn)..."
                  className="rounded-xl min-h-[60px]"
                />
              </div>

              <Button variant="outline" className="w-full rounded-xl gap-2 font-semibold border-dashed">
                <ImageIcon size={16} /> Đính kèm ảnh
              </Button>

              <Button
                className="w-full touch-target font-bold rounded-2xl gradient-primary border-0 shadow-glow h-14 text-primary-foreground gap-2"
                onClick={handleComplete}
              >
                <CheckCircle2 size={18} /> Xác nhận hoàn thành
              </Button>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CustomerTasks;
