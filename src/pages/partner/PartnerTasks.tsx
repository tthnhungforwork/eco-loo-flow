import { useState } from "react";
import PartnerHeader from "./components/PartnerHeader";
import SegmentedControl from "@/components/SegmentedControl";
import StatusBadge from "@/components/StatusBadge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Clock, User, Play, Search, MapPin, FileText, Bath, Calendar,
  CheckCircle2, ClipboardList, Image as ImageIcon, ChevronRight,
  Plus, Trash2, X, Sparkles, Wrench, RotateCcw, SlidersHorizontal
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRole } from "@/contexts/RoleContext";

// ── Types ─────────────────────────────────────────────

interface ChecklistItem {
  item: string;
  done: boolean;
  required?: boolean;
}

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
  checklist?: ChecklistItem[];
  recurring?: string;
  devices?: string[];
}

// ── Mock Data ─────────────────────────────────────────

const nvsOptions = ["NVS Block A", "NVS Tầng 2", "NVS Tầng 3", "NVS Sảnh C", "NVS Tầng 4", "NVS Eco Park", "NVS Tầng 5"];
const employeeOptions = [
  { name: "Trần Văn A", role: "VSLD" },
  { name: "Lê Thị B", role: "VSLD" },
  { name: "Phạm Văn C", role: "SCBD" },
  { name: "Nguyễn Văn D", role: "SCBD" },
  { name: "Hoàng Thị E", role: "VSLD" },
];
const deviceOptions = ["Bồn cầu", "Vòi nước", "Lavabo", "Bình nước nóng", "Quạt hút", "Van xả", "Ống thoát nước", "Máy sấy tay"];
const orderOptions = ["DV-101", "DV-102", "DV-103", "DV-104"];

const allTasks: Task[] = [
  {
    id: 1, title: "Vệ sinh NVS Tầng 3 - Tòa A", type: "VSLD", assignee: "Tôi", creator: "Admin KTX",
    deadline: "16/03/2026", status: "processing", nvs: "NVS Tầng 3", orderId: "DV-101",
    description: "Thực hiện vệ sinh tổng thể NVS tầng 3, bao gồm sàn, bồn cầu, lavabo và bổ sung vật tư.",
    checklist: [
      { item: "Lau sàn nhà vệ sinh", done: true, required: true },
      { item: "Vệ sinh bồn cầu", done: true, required: true },
      { item: "Lau chùi lavabo & gương", done: false, required: true },
      { item: "Bổ sung giấy & xà phòng", done: false },
      { item: "Khử mùi", done: false },
    ],
  },
  {
    id: 2, title: "Kiểm tra hệ thống thoát nước", type: "SCBD", assignee: "Tôi", creator: "Admin KTX",
    deadline: "17/03/2026", status: "new", nvs: "NVS Sảnh C",
    description: "Kiểm tra toàn bộ hệ thống ống thoát nước tại NVS Sảnh C, phát hiện và xử lý tắc nghẽn.",
  },
  {
    id: 3, title: "Bảo trì thiết bị vệ sinh", type: "SCBD", assignee: "Tôi", creator: "Nguyễn Văn A",
    deadline: "15/03/2026", status: "done", nvs: "NVS Block A",
    description: "Bảo trì các thiết bị vệ sinh bao gồm vòi nước, bồn cầu, hệ thống xả.",
    devices: ["Vòi nước", "Bồn cầu"],
  },
  {
    id: 4, title: "Khử mùi NVS Sảnh C", type: "VSLD", assignee: "Trần Văn A", creator: "Tôi",
    deadline: "18/03/2026", status: "processing", nvs: "NVS Sảnh C", orderId: "DV-102",
    description: "Sử dụng chế phẩm sinh học để khử mùi khu vực NVS Sảnh C.",
    checklist: [
      { item: "Kiểm tra nguồn gây mùi", done: true, required: true },
      { item: "Xịt chế phẩm sinh học", done: false },
      { item: "Vệ sinh đường ống thoát", done: false },
    ],
  },
  {
    id: 5, title: "Thay bình xà phòng tầng 5", type: "VSLD", assignee: "Lê Thị B", creator: "Tôi",
    deadline: "19/03/2026", status: "new", nvs: "NVS Tầng 5",
    description: "Thay thế bình xà phòng đã hết tại các vị trí lavabo tầng 5.",
  },
  {
    id: 6, title: "Sửa chữa van nước NVS Eco", type: "SCBD", assignee: "Phạm Văn C", creator: "Tôi",
    deadline: "20/03/2026", status: "new", nvs: "NVS Eco Park",
    description: "Thay thế van nước bị hỏng tại phòng vệ sinh nam khu Eco Park.",
    devices: ["Van xả", "Vòi nước"],
  },
];

const statusLabel: Record<string, string> = { new: "Mới", processing: "Đang xử lý", done: "Hoàn thành" };
const typeLabel: Record<string, string> = { VSLD: "Vệ sinh lau dọn", SCBD: "Sửa chữa bảo dưỡng" };
const typeColor: Record<string, string> = { VSLD: "bg-primary/10 text-primary", SCBD: "bg-eco-orange/10 text-eco-orange" };

const PartnerTasks = () => {
  const { isBusinessOwner } = useRole();
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showComplete, setShowComplete] = useState(false);
  const [completeNote, setCompleteNote] = useState("");

  // Advanced filter state
  const [showFilter, setShowFilter] = useState(false);
  const [filterNvs, setFilterNvs] = useState("");
  const [filterOrder, setFilterOrder] = useState("");
  const [filterTime, setFilterTime] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterAssignee, setFilterAssignee] = useState("");
  const [filterType, setFilterType] = useState("");

  // Create task state
  const [showCreate, setShowCreate] = useState(false);
  const [createType, setCreateType] = useState<"VSLD" | "SCBD">("VSLD");
  const [createTitle, setCreateTitle] = useState("");
  const [createAssignee, setCreateAssignee] = useState("");
  const [createNvs, setCreateNvs] = useState("");
  const [createDeadline, setCreateDeadline] = useState("");
  const [createDescription, setCreateDescription] = useState("");
  const [createChecklist, setCreateChecklist] = useState<string[]>([""]);
  const [createDevices, setCreateDevices] = useState<string[]>([]);
  const [createRecurring, setCreateRecurring] = useState("");

  const tabs = isBusinessOwner
    ? ["Tất cả", "Việc tôi giao", "Việc của tôi"]
    : ["Việc của tôi"];

  const activeFilterCount = [filterNvs, filterOrder, filterTime, filterStatus, filterAssignee, filterType].filter(Boolean).length;

  const filtered = allTasks
    .filter((t) => {
      if (isBusinessOwner) {
        if (tab === 1) return t.creator === "Tôi";
        if (tab === 2) return t.assignee === "Tôi";
      } else {
        return t.assignee === "Tôi";
      }
      return true;
    })
    .filter((t) => !filterType || t.type === filterType)
    .filter((t) => !filterNvs || t.nvs === filterNvs)
    .filter((t) => !filterOrder || t.orderId === filterOrder)
    .filter((t) => !filterStatus || t.status === filterStatus)
    .filter((t) => !filterAssignee || t.assignee === filterAssignee)
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));

  const filteredEmployees = employeeOptions.filter((e) =>
    createType === "VSLD" ? e.role === "VSLD" : e.role === "SCBD"
  );

  const resetCreateForm = () => {
    setCreateTitle("");
    setCreateAssignee("");
    setCreateNvs("");
    setCreateDeadline("");
    setCreateDescription("");
    setCreateChecklist([""]);
    setCreateDevices([]);
    setCreateRecurring("");
  };

  const resetFilters = () => {
    setFilterNvs("");
    setFilterOrder("");
    setFilterTime("");
    setFilterStatus("");
    setFilterAssignee("");
    setFilterType("");
  };

  const handleCreate = () => {
    setShowCreate(false);
    resetCreateForm();
  };

  const handleComplete = () => {
    setShowComplete(false);
    setCompleteNote("");
    setSelectedTask(null);
  };

  return (
    <div className="gradient-surface min-h-screen">
      <PartnerHeader title="Công việc" />
      <div className="py-4">
        <SegmentedControl tabs={tabs} active={tab} onChange={setTab} />

        {/* Search + Filter button */}
        <div className="px-4 mb-4 flex gap-2">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Tìm công việc..."
              className="pl-10 rounded-xl bg-card/60 backdrop-blur-sm border-border/40 h-11 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            className="h-11 w-11 rounded-xl shrink-0 border-border/40 relative"
            onClick={() => setShowFilter(true)}
          >
            <SlidersHorizontal size={16} />
            {activeFilterCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full gradient-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </Button>
        </div>

        {/* Active filter chips */}
        {activeFilterCount > 0 && (
          <div className="px-4 mb-4 flex gap-2 flex-wrap">
            {filterNvs && (
              <span className="chip chip-active text-[10px] flex items-center gap-1">
                {filterNvs} <X size={10} className="cursor-pointer" onClick={() => setFilterNvs("")} />
              </span>
            )}
            {filterOrder && (
              <span className="chip chip-active text-[10px] flex items-center gap-1">
                #{filterOrder} <X size={10} className="cursor-pointer" onClick={() => setFilterOrder("")} />
              </span>
            )}
            {filterStatus && (
              <span className="chip chip-active text-[10px] flex items-center gap-1">
                {statusLabel[filterStatus]} <X size={10} className="cursor-pointer" onClick={() => setFilterStatus("")} />
              </span>
            )}
            {filterAssignee && (
              <span className="chip chip-active text-[10px] flex items-center gap-1">
                {filterAssignee} <X size={10} className="cursor-pointer" onClick={() => setFilterAssignee("")} />
              </span>
            )}
            {filterType && (
              <span className="chip chip-active text-[10px] flex items-center gap-1">
                {typeLabel[filterType]} <X size={10} className="cursor-pointer" onClick={() => setFilterType("")} />
              </span>
            )}
            {filterTime && (
              <span className="chip chip-active text-[10px] flex items-center gap-1">
                {filterTime === "today" ? "Hôm nay" : filterTime === "week" ? "Tuần này" : "Tháng này"}
                <X size={10} className="cursor-pointer" onClick={() => setFilterTime("")} />
              </span>
            )}
            <button onClick={resetFilters} className="text-[10px] text-destructive font-semibold underline">Xóa tất cả</button>
          </div>
        )}

        {/* Create task button - only on "Việc tôi giao" tab for business owners */}
        {isBusinessOwner && tab === 1 && (
          <div className="px-4 mb-4">
            <Button
              className="w-full h-12 font-bold gap-2 rounded-2xl gradient-primary border-0 shadow-glow text-primary-foreground"
              onClick={() => {
                resetCreateForm();
                setShowCreate(true);
              }}
            >
              <Plus size={18} /> Tạo công việc mới
            </Button>
          </div>
        )}

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
                      {t.recurring && (
                        <span className="text-[10px] font-semibold text-secondary flex items-center gap-0.5">
                          <RotateCcw size={9} /> {t.recurring}
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
                {/* Quick action - only assignee can execute */}
                {t.assignee === "Tôi" && t.status !== "done" && (
                  <Button
                    size="sm"
                    className="w-full mt-3 h-9 font-bold rounded-xl gradient-primary border-0 text-xs gap-1 shadow-glow text-primary-foreground"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTask(t);
                      setShowComplete(true);
                    }}
                  >
                    <Play size={12} /> Thực hiện
                  </Button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* ═══ Advanced Filter Sheet ═══ */}
      <Sheet open={showFilter} onOpenChange={setShowFilter}>
        <SheetContent side="bottom" className="rounded-t-3xl max-h-[85vh] overflow-y-auto px-5 pb-8">
          <SheetHeader className="pb-4">
            <SheetTitle className="text-base text-left">Bộ lọc nâng cao</SheetTitle>
          </SheetHeader>
          <div className="space-y-4">
            <div>
              <label className="text-[12px] font-bold text-foreground mb-1.5 block">Nhà vệ sinh</label>
              <Select value={filterNvs} onValueChange={setFilterNvs}>
                <SelectTrigger className="rounded-xl"><SelectValue placeholder="Tất cả NVS" /></SelectTrigger>
                <SelectContent>
                  {nvsOptions.map((n) => <SelectItem key={n} value={n}>{n}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-[12px] font-bold text-foreground mb-1.5 block">Đơn hàng</label>
              <Select value={filterOrder} onValueChange={setFilterOrder}>
                <SelectTrigger className="rounded-xl"><SelectValue placeholder="Tất cả đơn hàng" /></SelectTrigger>
                <SelectContent>
                  {orderOptions.map((o) => <SelectItem key={o} value={o}>#{o}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-[12px] font-bold text-foreground mb-1.5 block">Thời gian</label>
              <Select value={filterTime} onValueChange={setFilterTime}>
                <SelectTrigger className="rounded-xl"><SelectValue placeholder="Tất cả thời gian" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Hôm nay</SelectItem>
                  <SelectItem value="week">Tuần này</SelectItem>
                  <SelectItem value="month">Tháng này</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-[12px] font-bold text-foreground mb-1.5 block">Trạng thái</label>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="rounded-xl"><SelectValue placeholder="Tất cả trạng thái" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">Mới</SelectItem>
                  <SelectItem value="processing">Đang xử lý</SelectItem>
                  <SelectItem value="done">Hoàn thành</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-[12px] font-bold text-foreground mb-1.5 block">Người thực hiện</label>
              <Select value={filterAssignee} onValueChange={setFilterAssignee}>
                <SelectTrigger className="rounded-xl"><SelectValue placeholder="Tất cả nhân viên" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tôi">Tôi</SelectItem>
                  {employeeOptions.map((e) => <SelectItem key={e.name} value={e.name}>{e.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-[12px] font-bold text-foreground mb-1.5 block">Loại công việc</label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="rounded-xl"><SelectValue placeholder="Tất cả loại" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="VSLD">Vệ sinh lau dọn</SelectItem>
                  <SelectItem value="SCBD">Sửa chữa bảo dưỡng</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-3 pt-2">
              <Button variant="outline" className="flex-1 rounded-2xl h-12 font-bold" onClick={resetFilters}>
                Xóa bộ lọc
              </Button>
              <Button className="flex-1 rounded-2xl h-12 font-bold gradient-primary border-0 text-primary-foreground" onClick={() => setShowFilter(false)}>
                Áp dụng
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* ═══ Task Detail Sheet ═══ */}
      <Sheet open={!!selectedTask && !showComplete} onOpenChange={() => setSelectedTask(null)}>
        <SheetContent side="bottom" className="rounded-t-3xl max-h-[85vh] overflow-y-auto px-5 pb-8">
          {selectedTask && (
            <>
              <SheetHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-primary-foreground shadow-sm ${selectedTask.type === "VSLD" ? "gradient-primary" : "gradient-warm"}`}>
                    {selectedTask.type === "VSLD" ? <Sparkles size={22} /> : <Wrench size={22} />}
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

              <div className="space-y-2.5 mb-5">
                <div className="flex items-center gap-3 bg-muted/40 rounded-xl p-3">
                  <User size={16} className="text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] text-muted-foreground">Người thực hiện</p>
                    <p className="text-[13px] font-semibold text-foreground">{selectedTask.assignee}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-muted/40 rounded-xl p-3">
                  <User size={16} className="text-secondary shrink-0" />
                  <div>
                    <p className="text-[10px] text-muted-foreground">Người tạo</p>
                    <p className="text-[13px] font-semibold text-foreground">{selectedTask.creator}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-muted/40 rounded-xl p-3">
                  <Calendar size={16} className="text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] text-muted-foreground">Thời gian thực hiện</p>
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
                        <span className={`text-[12px] flex-1 ${c.done ? "text-foreground line-through opacity-60" : "text-foreground"}`}>{c.item}</span>
                        {c.required && (
                          <span className="text-[8px] font-bold text-destructive px-1.5 py-0.5 rounded bg-destructive/10">Bắt buộc</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Devices for SCBD */}
              {selectedTask.devices && selectedTask.devices.length > 0 && (
                <div className="mb-5">
                  <p className="text-[12px] font-bold text-foreground mb-2">Thiết bị liên quan</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedTask.devices.map((d) => (
                      <span key={d} className="text-[11px] font-semibold px-3 py-1.5 rounded-xl bg-eco-orange/10 text-eco-orange">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action buttons - only assignee can complete */}
              <div className="space-y-2.5">
                {selectedTask.assignee === "Tôi" && selectedTask.status !== "done" && (
                  <Button
                    className="w-full touch-target font-bold rounded-2xl gradient-primary border-0 shadow-glow h-14 text-primary-foreground gap-2"
                    onClick={() => setShowComplete(true)}
                  >
                    <CheckCircle2 size={18} /> Khai báo hoàn thành
                  </Button>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* ═══ Complete Task Sheet ═══ */}
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

      {/* ═══ Create Task Sheet ═══ */}
      <Sheet open={showCreate} onOpenChange={setShowCreate}>
        <SheetContent side="bottom" className="rounded-t-3xl max-h-[90vh] overflow-y-auto px-5 pb-8">
          <SheetHeader className="pb-4">
            <SheetTitle className="text-base text-left">Tạo công việc mới</SheetTitle>
          </SheetHeader>

          <div className="space-y-4">
            {/* Task type */}
            <div>
              <label className="text-[12px] font-bold text-foreground mb-2 block">Loại công việc</label>
              <div className="flex gap-2">
                <button
                  onClick={() => { setCreateType("VSLD"); setCreateAssignee(""); }}
                  className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    createType === "VSLD" ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Sparkles size={14} /> Vệ sinh lau dọn
                </button>
                <button
                  onClick={() => { setCreateType("SCBD"); setCreateAssignee(""); }}
                  className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    createType === "SCBD" ? "gradient-warm text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Wrench size={14} /> Sửa chữa BD
                </button>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="text-[12px] font-bold text-foreground mb-1.5 block">Tiêu đề công việc</label>
              <Input
                placeholder="VD: Vệ sinh NVS Tầng 3..."
                className="rounded-xl h-11"
                value={createTitle}
                onChange={(e) => setCreateTitle(e.target.value)}
              />
            </div>

            {/* NVS */}
            <div>
              <label className="text-[12px] font-bold text-foreground mb-1.5 block">Nhà vệ sinh</label>
              <Select value={createNvs} onValueChange={setCreateNvs}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Chọn NVS" />
                </SelectTrigger>
                <SelectContent>
                  {nvsOptions.map((n) => (
                    <SelectItem key={n} value={n}>{n}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Assignee */}
            <div>
              <label className="text-[12px] font-bold text-foreground mb-1.5 block">
                Người thực hiện
                <span className="text-[10px] text-muted-foreground font-normal ml-1">(vai trò {createType})</span>
              </label>
              <Select value={createAssignee} onValueChange={setCreateAssignee}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Chọn nhân viên" />
                </SelectTrigger>
                <SelectContent>
                  {filteredEmployees.map((e) => (
                    <SelectItem key={e.name} value={e.name}>{e.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Deadline */}
            <div>
              <label className="text-[12px] font-bold text-foreground mb-1.5 block">Thời gian thực hiện</label>
              <Input
                type="datetime-local"
                className="rounded-xl h-11"
                value={createDeadline}
                onChange={(e) => setCreateDeadline(e.target.value)}
              />
            </div>

            {/* Recurring - only for VSLD */}
            {createType === "VSLD" && (
              <div>
                <label className="text-[12px] font-bold text-foreground mb-1.5 block">Định kỳ (tùy chọn)</label>
                <Select value={createRecurring} onValueChange={setCreateRecurring}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Không định kỳ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">Không định kỳ</SelectItem>
                    <SelectItem value="daily">Hàng ngày</SelectItem>
                    <SelectItem value="weekly">Hàng tuần</SelectItem>
                    <SelectItem value="monthly">Hàng tháng</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* VSLD: Checklist */}
            {createType === "VSLD" && (
              <div>
                <label className="text-[12px] font-bold text-foreground mb-2 block">Checklist thực hiện</label>
                <div className="space-y-2">
                  {createChecklist.map((item, i) => (
                    <div key={i} className="flex gap-2">
                      <Input
                        placeholder={`Bước ${i + 1}...`}
                        className="rounded-xl h-10 flex-1"
                        value={item}
                        onChange={(e) => {
                          const updated = [...createChecklist];
                          updated[i] = e.target.value;
                          setCreateChecklist(updated);
                        }}
                      />
                      {createChecklist.length > 1 && (
                        <button
                          onClick={() => setCreateChecklist(createChecklist.filter((_, j) => j !== i))}
                          className="w-10 h-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center shrink-0"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => setCreateChecklist([...createChecklist, ""])}
                    className="w-full h-10 rounded-xl border border-dashed border-primary/30 text-primary text-xs font-semibold flex items-center justify-center gap-1"
                  >
                    <Plus size={14} /> Thêm bước
                  </button>
                </div>
              </div>
            )}

            {/* SCBD: Description + Devices */}
            {createType === "SCBD" && (
              <>
                <div>
                  <label className="text-[12px] font-bold text-foreground mb-1.5 block">Mô tả nội dung công việc</label>
                  <Textarea
                    placeholder="Mô tả chi tiết nội dung sửa chữa/bảo dưỡng..."
                    className="rounded-xl min-h-[80px]"
                    value={createDescription}
                    onChange={(e) => setCreateDescription(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-[12px] font-bold text-foreground mb-2 block">Chọn thiết bị liên quan</label>
                  <div className="flex flex-wrap gap-2">
                    {deviceOptions.map((d) => (
                      <button
                        key={d}
                        onClick={() =>
                          setCreateDevices((prev) =>
                            prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
                          )
                        }
                        className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all ${
                          createDevices.includes(d)
                            ? "gradient-warm text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <Button
              className="w-full touch-target font-bold rounded-2xl gradient-primary border-0 shadow-glow h-14 text-primary-foreground gap-2"
              onClick={handleCreate}
            >
              <Plus size={18} /> Tạo công việc
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default PartnerTasks;
