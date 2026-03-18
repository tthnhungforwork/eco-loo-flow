import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  CheckCircle2, ClipboardList, Image as ImageIcon, Plus, Trash2,
  Filter, X, SlidersHorizontal, QrCode, Wrench, Sparkles,
  ChevronRight, AlertCircle, RotateCcw
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

const allTasks: Task[] = [
  {
    id: 1, title: "Vệ sinh tổng hợp NVS Block A", type: "VSLD", assignee: "Trần Văn A", creator: "Tôi",
    deadline: "16/03/2026", status: "processing", nvs: "NVS Block A", orderId: "DV-101",
    description: "Thực hiện vệ sinh tổng thể NVS Block A, bao gồm sàn, bồn cầu, lavabo.",
    checklist: [
      { item: "Lau sàn nhà vệ sinh", done: true, required: true },
      { item: "Vệ sinh bồn cầu", done: true, required: true },
      { item: "Lau chùi lavabo & gương", done: false, required: true },
      { item: "Bổ sung giấy & xà phòng", done: false },
      { item: "Khử mùi", done: false },
    ],
  },
  {
    id: 2, title: "Lập báo cáo vệ sinh tháng 3", type: "VSLD", assignee: "Tôi", creator: "Admin KTX",
    deadline: "20/03/2026", status: "new", nvs: "NVS Tầng 3",
    description: "Lập báo cáo vệ sinh tổng hợp tháng 3 cho toàn bộ khu vực NVS Tầng 3.",
    checklist: [
      { item: "Thu thập dữ liệu vệ sinh", done: false, required: true },
      { item: "Kiểm tra vật tư tiêu hao", done: false, required: true },
      { item: "Tổng hợp báo cáo", done: false },
    ],
  },
  {
    id: 3, title: "Vệ sinh NVS Tầng 2", type: "VSLD", assignee: "Trần Văn A", creator: "Tôi",
    deadline: "16/03/2026", status: "processing", nvs: "NVS Tầng 2",
    description: "Vệ sinh định kỳ NVS Tầng 2.",
    checklist: [
      { item: "Lau sàn", done: true, required: true },
      { item: "Vệ sinh thiết bị", done: false, required: true },
    ],
  },
  {
    id: 4, title: "Thay vật tư NVS Sảnh C", type: "SCBD", assignee: "Phạm Văn C", creator: "Tôi",
    deadline: "17/03/2026", status: "new", nvs: "NVS Sảnh C",
    description: "Thay thế van nước và vòi hỏng tại NVS Sảnh C.",
    devices: ["Van xả", "Vòi nước"],
  },
  {
    id: 5, title: "Khử mùi NVS Tầng 4", type: "VSLD", assignee: "Tôi", creator: "Admin KTX",
    deadline: "15/03/2026", status: "done", nvs: "NVS Tầng 4",
    description: "Sử dụng chế phẩm sinh học để khử mùi.",
    checklist: [
      { item: "Kiểm tra nguồn gây mùi", done: true, required: true },
      { item: "Xịt chế phẩm sinh học", done: true },
      { item: "Vệ sinh đường ống", done: true },
    ],
  },
  {
    id: 6, title: "Sửa chữa van nước NVS Eco", type: "SCBD", assignee: "Nguyễn Văn D", creator: "Admin KTX",
    deadline: "18/03/2026", status: "new", nvs: "NVS Eco Park",
    description: "Thay thế van nước bị hỏng tại phòng vệ sinh nam khu Eco Park.",
    devices: ["Van xả", "Ống thoát nước"],
  },
  {
    id: 7, title: "Bảo dưỡng hệ thống quạt hút", type: "SCBD", assignee: "Tôi", creator: "Admin KTX",
    deadline: "19/03/2026", status: "processing", nvs: "NVS Tầng 5",
    description: "Kiểm tra và bảo dưỡng hệ thống quạt hút gió tại NVS Tầng 5.",
    devices: ["Quạt hút"],
  },
  {
    id: 8, title: "Vệ sinh sàn NVS Tầng 5", type: "VSLD", assignee: "Hoàng Thị E", creator: "Tôi",
    deadline: "18/03/2026", status: "done", nvs: "NVS Tầng 5",
    checklist: [
      { item: "Lau sàn ướt", done: true, required: true },
      { item: "Lau khô", done: true },
    ],
  },
];

const statusLabel: Record<string, string> = { new: "Mới", processing: "Đang xử lý", done: "Hoàn thành" };
const typeLabel: Record<string, string> = { VSLD: "Vệ sinh lau dọn", SCBD: "Sửa chữa bảo dưỡng" };
const typeColor: Record<string, string> = { VSLD: "bg-primary/10 text-primary", SCBD: "bg-eco-orange/10 text-eco-orange" };
const statusOptions = [
  { key: "new", label: "Mới" },
  { key: "processing", label: "Đang xử lý" },
  { key: "done", label: "Hoàn thành" },
];
const timeFilterOptions = [
  { key: "today", label: "Hôm nay" },
  { key: "week", label: "Tuần này" },
  { key: "all", label: "Tất cả" },
];

// ── Component ─────────────────────────────────────────

const PartnerTasks = () => {
  const navigate = useNavigate();
  const { isBusinessOwner } = useRole();

  // Tabs
  const tabs = isBusinessOwner ? ["Việc của tôi", "Việc tôi giao"] : ["Việc của tôi"];
  const [tab, setTab] = useState(0);

  // Search & Filters
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterNvs, setFilterNvs] = useState<string | null>(null);
  const [filterAssignee, setFilterAssignee] = useState<string | null>(null);
  const [filterTime, setFilterTime] = useState<string>("all");
  const [filterOrder, setFilterOrder] = useState("");

  // Sheets
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [showComplete, setShowComplete] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  // Create form state
  const [createType, setCreateType] = useState<"VSLD" | "SCBD">("VSLD");
  const [createTitle, setCreateTitle] = useState("");
  const [createAssignee, setCreateAssignee] = useState("");
  const [createNvs, setCreateNvs] = useState("");
  const [createDeadline, setCreateDeadline] = useState("");
  const [createDescription, setCreateDescription] = useState("");
  const [createChecklist, setCreateChecklist] = useState<string[]>([""]);
  const [createDevices, setCreateDevices] = useState<string[]>([]);
  const [createRecurring, setCreateRecurring] = useState("");

  // Complete form state
  const [completeNote, setCompleteNote] = useState("");
  const [completeResult, setCompleteResult] = useState("");
  const [completeDevices, setCompleteDevices] = useState<string[]>([]);

  const activeFilterCount = [filterType, filterStatus, filterNvs, filterAssignee, filterOrder].filter(Boolean).length + (filterTime !== "all" ? 1 : 0);

  // Filter logic
  const filtered = allTasks
    .filter((t) => {
      if (tab === 0) return t.assignee === "Tôi"; // Việc của tôi
      return t.creator === "Tôi"; // Việc tôi giao
    })
    .filter((t) => !filterType || t.type === filterType)
    .filter((t) => !filterStatus || t.status === filterStatus)
    .filter((t) => !filterNvs || t.nvs === filterNvs)
    .filter((t) => !filterAssignee || t.assignee === filterAssignee)
    .filter((t) => !filterOrder || (t.orderId && t.orderId.toLowerCase().includes(filterOrder.toLowerCase())))
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));

  const clearFilters = () => {
    setFilterType(null);
    setFilterStatus(null);
    setFilterNvs(null);
    setFilterAssignee(null);
    setFilterTime("all");
    setFilterOrder("");
  };

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

  const handleCreate = () => {
    setShowCreate(false);
    resetCreateForm();
  };

  const handleComplete = () => {
    setShowComplete(false);
    setCompleteNote("");
    setCompleteResult("");
    setCompleteDevices([]);
    setSelectedTask(null);
  };

  const handleDelete = () => {
    setShowDelete(false);
    setSelectedTask(null);
  };

  const filteredEmployees = employeeOptions.filter((e) =>
    createType === "VSLD" ? e.role === "VSLD" : e.role === "SCBD"
  );

  return (
    <div className="gradient-surface min-h-screen">
      <PartnerHeader title="QL Công việc" />
      <div className="py-4">
        {/* Tabs */}
        {tabs.length > 1 ? (
          <SegmentedControl tabs={tabs} active={tab} onChange={setTab} />
        ) : (
          <div className="px-4 mb-3">
            <h2 className="text-sm font-bold text-foreground">Việc của tôi</h2>
          </div>
        )}

        {/* Search */}
        <div className="px-4 mb-3">
          <div className="relative flex gap-2">
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Tìm công việc..."
                className="pl-10 rounded-xl bg-card/60 backdrop-blur-sm border-border/40 h-11 text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowFilters(true)}
              className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 relative transition-colors ${
                activeFilterCount > 0 ? "gradient-primary text-primary-foreground" : "bg-card border border-border/40 text-muted-foreground"
              }`}
            >
              <SlidersHorizontal size={18} />
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[9px] font-bold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </motion.button>
          </div>
        </div>

        {/* Quick type chips */}
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

        {/* Create task button (business owner, tab "Việc tôi giao") */}
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

        {/* Task cards */}
        <div className="px-4 space-y-3 pb-28">
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
                {/* Quick action on card */}
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
                {t.assignee !== "Tôi" && t.creator === "Tôi" && t.status !== "done" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full mt-3 h-9 font-bold rounded-xl text-xs gap-1 border-primary/30 text-primary"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Clock size={12} /> Nhắc nhở
                  </Button>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* ═══ Advanced Filters Sheet ═══ */}
      <Sheet open={showFilters} onOpenChange={setShowFilters}>
        <SheetContent side="bottom" className="rounded-t-3xl max-h-[85vh] overflow-y-auto px-5 pb-8">
          <SheetHeader className="pb-3">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-base text-left">Bộ lọc nâng cao</SheetTitle>
              {activeFilterCount > 0 && (
                <button onClick={clearFilters} className="text-xs text-destructive font-semibold flex items-center gap-1">
                  <X size={12} /> Xóa bộ lọc
                </button>
              )}
            </div>
          </SheetHeader>

          <div className="space-y-5">
            {/* Loại công việc */}
            <div>
              <label className="text-[12px] font-bold text-foreground mb-2 block">Loại công việc</label>
              <div className="flex gap-2">
                {[{ key: null, label: "Tất cả" }, { key: "VSLD", label: "Vệ sinh lau dọn" }, { key: "SCBD", label: "Sửa chữa bảo dưỡng" }].map((f) => (
                  <button
                    key={f.label}
                    onClick={() => setFilterType(f.key)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      filterType === f.key ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Trạng thái */}
            <div>
              <label className="text-[12px] font-bold text-foreground mb-2 block">Trạng thái</label>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setFilterStatus(null)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    !filterStatus ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  Tất cả
                </button>
                {statusOptions.map((s) => (
                  <button
                    key={s.key}
                    onClick={() => setFilterStatus(s.key)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      filterStatus === s.key ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* NVS */}
            <div>
              <label className="text-[12px] font-bold text-foreground mb-2 block">Nhà vệ sinh</label>
              <Select value={filterNvs || "all"} onValueChange={(v) => setFilterNvs(v === "all" ? null : v)}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Chọn NVS" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả NVS</SelectItem>
                  {nvsOptions.map((n) => (
                    <SelectItem key={n} value={n}>{n}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Người thực hiện */}
            {tab === 1 && (
              <div>
                <label className="text-[12px] font-bold text-foreground mb-2 block">Người thực hiện</label>
                <Select value={filterAssignee || "all"} onValueChange={(v) => setFilterAssignee(v === "all" ? null : v)}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Chọn người thực hiện" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    {employeeOptions.map((e) => (
                      <SelectItem key={e.name} value={e.name}>{e.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Thời gian */}
            <div>
              <label className="text-[12px] font-bold text-foreground mb-2 block">Thời gian</label>
              <div className="flex gap-2">
                {timeFilterOptions.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => setFilterTime(t.key)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      filterTime === t.key ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Đơn hàng */}
            <div>
              <label className="text-[12px] font-bold text-foreground mb-2 block">Mã đơn hàng</label>
              <Input
                placeholder="VD: DV-101"
                className="rounded-xl"
                value={filterOrder}
                onChange={(e) => setFilterOrder(e.target.value)}
              />
            </div>

            <Button className="w-full h-12 font-bold rounded-2xl gradient-primary border-0 shadow-glow text-primary-foreground" onClick={() => setShowFilters(false)}>
              Áp dụng bộ lọc
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* ═══ Task Detail Sheet ═══ */}
      <Sheet open={!!selectedTask && !showComplete && !showDelete} onOpenChange={() => setSelectedTask(null)}>
        <SheetContent side="bottom" className="rounded-t-3xl max-h-[85vh] overflow-y-auto px-5 pb-8">
          {selectedTask && (
            <>
              <SheetHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-primary-foreground shadow-sm ${
                    selectedTask.type === "VSLD" ? "gradient-primary" : "gradient-warm"
                  }`}>
                    {selectedTask.type === "VSLD" ? <Sparkles size={22} /> : <Wrench size={22} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <SheetTitle className="text-base text-left leading-snug">{selectedTask.title}</SheetTitle>
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
                <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">{selectedTask.description}</p>
              )}

              {/* Info cards */}
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

              {/* Action buttons */}
              <div className="space-y-2.5">
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
                  >
                    <Clock size={18} /> Nhắc nhở nhân viên
                  </Button>
                )}
                {selectedTask.creator === "Tôi" && selectedTask.status !== "done" && (
                  <Button
                    variant="outline"
                    className="w-full h-11 font-semibold rounded-2xl gap-2 border-destructive/30 text-destructive"
                    onClick={() => setShowDelete(true)}
                  >
                    <Trash2 size={16} /> Xóa công việc
                  </Button>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* ═══ Delete Confirmation Sheet ═══ */}
      <Sheet open={showDelete} onOpenChange={setShowDelete}>
        <SheetContent side="bottom" className="rounded-t-3xl px-5 pb-8">
          <SheetHeader className="pb-4">
            <SheetTitle className="text-base text-left">Xóa công việc</SheetTitle>
          </SheetHeader>
          <div className="flex items-start gap-3 bg-destructive/5 border border-destructive/20 rounded-xl p-4 mb-5">
            <AlertCircle size={20} className="text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="text-[13px] font-semibold text-foreground">Bạn có chắc chắn muốn xóa?</p>
              <p className="text-[12px] text-muted-foreground mt-1">
                Công việc "{selectedTask?.title}" sẽ bị xóa vĩnh viễn và không thể khôi phục.
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1 h-12 rounded-2xl font-semibold" onClick={() => setShowDelete(false)}>
              Hủy
            </Button>
            <Button className="flex-1 h-12 rounded-2xl font-bold bg-destructive text-destructive-foreground hover:bg-destructive/90" onClick={handleDelete}>
              Xóa
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      {/* ═══ Complete Task Sheet ═══ */}
      <Sheet open={showComplete} onOpenChange={setShowComplete}>
        <SheetContent side="bottom" className="rounded-t-3xl max-h-[90vh] overflow-y-auto px-5 pb-8">
          <SheetHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-primary-foreground">
                <QrCode size={20} />
              </div>
              <div>
                <SheetTitle className="text-base text-left">Khai báo hoàn thành</SheetTitle>
                <p className="text-[11px] text-muted-foreground mt-0.5">Quét QR hoặc khai báo thủ công</p>
              </div>
            </div>
          </SheetHeader>

          {selectedTask && (
            <div className="space-y-4">
              {/* QR scan button */}
              <Button variant="outline" className="w-full h-12 rounded-xl gap-2 font-semibold border-dashed border-primary/40 text-primary">
                <QrCode size={18} /> Quét QR công việc
              </Button>

              <div className="bg-muted/40 rounded-xl p-3">
                <p className="text-[10px] text-muted-foreground">Công việc</p>
                <p className="text-[13px] font-semibold text-foreground">{selectedTask.title}</p>
              </div>

              {/* VSLD: Checklist report */}
              {selectedTask.type === "VSLD" && selectedTask.checklist && (
                <div>
                  <label className="text-[12px] font-bold text-foreground mb-2 block">Báo cáo checklist</label>
                  <div className="space-y-2">
                    {selectedTask.checklist.map((c, i) => (
                      <div key={i} className="flex items-center gap-2.5 bg-card border border-border/30 rounded-xl p-3">
                        <CheckCircle2 size={16} className="text-primary" />
                        <span className="text-[12px] text-foreground flex-1">{c.item}</span>
                        {c.required && (
                          <span className="text-[8px] font-bold text-destructive px-1.5 py-0.5 rounded bg-destructive/10">Bắt buộc</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SCBD: Result input */}
              {selectedTask.type === "SCBD" && (
                <>
                  <div>
                    <label className="text-[12px] font-bold text-foreground mb-1.5 block">Kết quả sửa chữa</label>
                    <Textarea
                      placeholder="Nhập nội dung kết quả sửa chữa/bảo dưỡng..."
                      className="rounded-xl min-h-[80px]"
                      value={completeResult}
                      onChange={(e) => setCompleteResult(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-[12px] font-bold text-foreground mb-2 block">Thiết bị thay thế/sửa chữa</label>
                    <div className="flex flex-wrap gap-2">
                      {deviceOptions.map((d) => (
                        <button
                          key={d}
                          onClick={() =>
                            setCompleteDevices((prev) =>
                              prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
                            )
                          }
                          className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all ${
                            completeDevices.includes(d)
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

              {/* Note */}
              <div>
                <label className="text-[12px] font-bold text-foreground mb-1.5 block">Ghi chú bổ sung</label>
                <Textarea
                  placeholder="Ghi chú thêm (tùy chọn)..."
                  className="rounded-xl min-h-[60px]"
                  value={completeNote}
                  onChange={(e) => setCompleteNote(e.target.value)}
                />
              </div>

              {/* Attach photo */}
              <Button variant="outline" className="w-full rounded-xl gap-2 font-semibold border-dashed h-11">
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

            {/* Assignee - filtered by role */}
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

            {/* Recurring */}
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
                  <label className="text-[12px] font-bold text-foreground mb-1.5 block">Mô tả nội dung</label>
                  <Textarea
                    placeholder="Mô tả chi tiết nội dung sửa chữa/bảo dưỡng..."
                    className="rounded-xl min-h-[80px]"
                    value={createDescription}
                    onChange={(e) => setCreateDescription(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-[12px] font-bold text-foreground mb-2 block">Thiết bị liên quan</label>
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
