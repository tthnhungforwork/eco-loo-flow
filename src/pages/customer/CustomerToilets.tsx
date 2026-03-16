import { useState } from "react";
import CustomerHeader from "./components/CustomerHeader";
import { MapPin, QrCode, ScanLine, ChevronRight, Phone, User, FileText, Award, Briefcase, Search, Calendar, Filter, Edit, Trash2, Eye, Home, ClipboardList, BarChart3, Menu, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface Task {
  id: number;
  title: string;
  assignee: string;
  phone: string;
  type: string;
  description: string;
  status: "pending" | "in_progress" | "overdue";
}

interface Ticket {
  id: number;
  title: string;
  category: string;
  createdAt: string;
  createdBy: string;
  relatedTo: string;
  description: string;
  status: "pending" | "in_progress" | "done";
}

interface Toilet {
  id: number;
  code: string;
  name: string;
  address: string;
  area: string;
  category: string;
  qr: string;
  status: string;
  owner: string;
  phone: string;
  description: string;
  createdAt: string;
  certificates: string[];
  serviceRegistered: string[];
  registeredDate: string;
  consultant: string;
  progress: string;
  progressStatus: string;
  tasks: Task[];
  tickets: Ticket[];
}

const toilets: Toilet[] = [
  {
    id: 1, code: "NVS11-15425", name: "Nhà vệ sinh ở Phường Cầu Giấy, TP Hà Nội, Việt Nam",
    address: "Trường Đại học Sư phạm Hà Nội, Phường Cầu Giấy, TP Hà Nội, Việt Nam",
    area: "Cầu Giấy", category: "Cho người lao động/Sản xuất", qr: "NVS11-15425", status: "active",
    owner: "Nguyễn Văn Khách", phone: "0848887450", description: "",
    createdAt: "15/04/2025", certificates: ["Sạch", "Xanh"],
    serviceRegistered: ["Sạch", "Xanh"], registeredDate: "30/06/2025", consultant: "KTX Group",
    progress: "5/12", progressStatus: "Đang đánh giá",
    tasks: [
      { id: 1, title: "Sửa chữa bảo dưỡng nhà vệ sinh NVS11-15425 - Nhà vệ sinh ở Phường Cầu Giấy, TP Hà Nội, Việt Nam", assignee: "Nguyễn Thanh Tùng", phone: "0123456789", type: "Sửa chữa bảo dưỡng", description: "Sửa chữa bảo dưỡng nhà vệ sinh ở Phường Cầu Giấy, TP Hà Nội", status: "pending" },
      { id: 2, title: "Khai báo vận hành nhà vệ sinh NVS11-15425 - Nhà vệ sinh ở Phường Cầu Giấy, TP Hà Nội, Việt Nam", assignee: "Nguyễn Thanh Tùng", phone: "0123456789", type: "Khai báo vận hành", description: "Khai báo vận hành nhà vệ sinh ở Phường Cầu Giấy, TP Hà Nội", status: "in_progress" },
      { id: 3, title: "Vệ sinh lau dọn nhà vệ sinh NVS11-15425 - Nhà vệ sinh ở Phường Cầu Giấy, TP Hà Nội, Việt Nam", assignee: "Nguyễn Thanh Tùng", phone: "0123456789", type: "Khai báo vận hành", description: "Khai báo vận hành nhà vệ sinh ở Phường Cầu Giấy, TP Hà Nội", status: "overdue" },
    ],
    tickets: [
      { id: 1, title: "Sửa chữa nhà vệ sinh", category: "Phản hồi/ Góp ý", createdAt: "17/07/2025", createdBy: "Nguyễn Thanh Tùng", relatedTo: "Phản hồi về KTX", description: "Sửa chữa bảo dưỡng nhà vệ sinh ở Phường Cầu Giấy, TP Hà Nội", status: "pending" },
    ],
  },
  {
    id: 2, code: "NVS11-15426", name: "NVS Sảnh B - KTX Lê Lợi",
    address: "456 Lê Lợi, Q.3, TP.HCM",
    area: "Quận 3", category: "Ký túc xá", qr: "NVS11-15426", status: "maintenance",
    owner: "Công ty TNHH ABC", phone: "0912345678", description: "NVS khu ký túc xá Block B, đang bảo trì hệ thống nước",
    createdAt: "15/02/2026", certificates: ["Sạch"],
    serviceRegistered: ["Sạch"], registeredDate: "01/03/2026", consultant: "EcoClean",
    progress: "2/8", progressStatus: "Đang triển khai",
    tasks: [
      { id: 1, title: "Bảo trì hệ thống nước NVS Sảnh B", assignee: "Trần Văn B", phone: "0987654321", type: "Sửa chữa bảo dưỡng", description: "Bảo trì đường ống nước tầng 1", status: "in_progress" },
    ],
    tickets: [],
  },
];

const statusMap: Record<string, { label: string; dot: string; badgeClass: string }> = {
  active: { label: "Vận hành", dot: "bg-primary", badgeClass: "bg-primary/10 text-primary border-primary/20" },
  maintenance: { label: "Bảo trì", dot: "bg-eco-orange animate-pulse-soft", badgeClass: "bg-eco-orange/10 text-eco-orange border-eco-orange/20" },
};

const taskStatusMap: Record<string, { label: string; className: string }> = {
  pending: { label: "Chưa thực hiện", className: "bg-eco-orange/10 text-eco-orange border-eco-orange/30" },
  in_progress: { label: "Đang thực hiện", className: "bg-primary/10 text-primary border-primary/30" },
  overdue: { label: "Quá hạn", className: "bg-destructive/10 text-destructive border-destructive/30" },
};

const ticketStatusMap: Record<string, { label: string; className: string }> = {
  pending: { label: "Chưa thực hiện", className: "bg-eco-orange/10 text-eco-orange border-eco-orange/30" },
  in_progress: { label: "Đang xử lý", className: "bg-primary/10 text-primary border-primary/30" },
  done: { label: "Hoàn thành", className: "bg-primary/10 text-primary border-primary/30" },
};

const certColor: Record<string, string> = {
  "Sạch": "bg-primary/10 text-primary",
  "Xanh": "bg-eco-teal/10 text-eco-teal",
  "Tuần hoàn": "bg-secondary/10 text-secondary",
};

type DetailTab = "overview" | "reports" | "tasks";

const CustomerToilets = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<DetailTab>("overview");
  const [taskSearch, setTaskSearch] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "", address: "", area: "", category: "", phone: "", owner: "", description: "", certificates: [] as string[],
  });

  const handleFormChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleCertificate = (cert: string) => {
    setFormData((prev) => ({
      ...prev,
      certificates: prev.certificates.includes(cert)
        ? prev.certificates.filter((c) => c !== cert)
        : [...prev.certificates, cert],
    }));
  };

  const handleSubmit = () => {
    if (!formData.name.trim() || !formData.address.trim() || !formData.phone.trim()) {
      toast.error("Vui lòng điền đầy đủ các trường bắt buộc");
      return;
    }
    toast.success("Thêm nhà vệ sinh thành công!");
    setShowAddForm(false);
    setFormData({ name: "", address: "", area: "", category: "", phone: "", owner: "", description: "", certificates: [] });
  };
  const selected = toilets.find((t) => t.id === selectedId);
  const filtered = toilets.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.code.toLowerCase().includes(search.toLowerCase()) ||
    t.address.toLowerCase().includes(search.toLowerCase())
  );

  const tabs: { key: DetailTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    { key: "overview", label: "Tổng quan", icon: <Home size={14} /> },
    { key: "reports", label: "Báo cáo", icon: <BarChart3 size={14} /> },
    { key: "tasks", label: "Công việc", icon: <ClipboardList size={14} />, badge: selected?.tasks.length },
  ];

  const renderOverviewTab = () => {
    if (!selected) return null;
    return (
      <div className="space-y-4">
        {/* Banner image with service overlay */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-eco-teal/20 h-44">
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-primary-foreground space-y-1 text-sm">
            <div className="flex items-center gap-2"><span className="text-primary-foreground/70">Dịch vụ đăng ký:</span><span className="font-semibold">{selected.serviceRegistered.join(" - ")}</span></div>
            <div className="flex items-center gap-2"><span className="text-primary-foreground/70">Ngày đăng ký:</span><span className="font-semibold">{selected.registeredDate}</span></div>
            <div className="flex items-center gap-2"><span className="text-primary-foreground/70">Đơn vị tư vấn:</span><span className="font-semibold">{selected.consultant}</span></div>
            <div className="flex items-center gap-2"><span className="text-primary-foreground/70">Tiến độ:</span><span className="font-semibold">{selected.progress}</span></div>
            <div className="flex items-center gap-2"><span className="text-primary-foreground/70">Trạng thái:</span><span className="font-semibold">{selected.progressStatus}</span></div>
          </div>
        </div>

        {/* QR code link */}
        <div className="flex items-center justify-end gap-2 text-sm text-muted-foreground">
          <QrCode size={16} className="text-primary" />
          <span>Mã QR nhà vệ sinh</span>
        </div>

        {/* Info rows */}
        <div className="space-y-3.5">
          <div className="flex items-start gap-3 text-sm">
            <Filter size={15} className="text-primary mt-0.5 shrink-0" />
            <span className="text-foreground">Phân loại: {selected.category}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Phone size={15} className="text-primary shrink-0" />
            <span className="text-foreground">Số điện thoại liên hệ: {selected.phone}</span>
          </div>
          <div className="flex items-start gap-3 text-sm">
            <MapPin size={15} className="text-primary mt-0.5 shrink-0" />
            <span className="text-foreground">Địa chỉ: {selected.address}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Calendar size={15} className="text-primary shrink-0" />
            <span className="text-foreground">Ngày tạo: {selected.createdAt}</span>
          </div>
        </div>

        {/* Tickets section */}
        {selected.tickets.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-sm text-foreground">Quản lý Ticket</h3>
              <button className="text-xs text-primary font-semibold">Xem thêm</button>
            </div>
            <div className="space-y-3">
              {selected.tickets.map((ticket) => (
                <div key={ticket.id} className="glass-card rounded-2xl p-4 space-y-2.5">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <FileText size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-foreground">{ticket.title}</p>
                      <span className="text-[11px] text-muted-foreground bg-muted px-2 py-0.5 rounded-md">{ticket.category}</span>
                    </div>
                  </div>
                  <div className="space-y-1.5 text-xs text-muted-foreground pl-1">
                    <p><span className="text-foreground font-medium">Ngày tạo:</span> {ticket.createdAt}</p>
                    <p><span className="text-foreground font-medium">Người tạo yêu cầu:</span> {ticket.createdBy}</p>
                    <p><span className="text-foreground font-medium">Đối tượng liên quan:</span> {ticket.relatedTo}</p>
                    <p><span className="text-foreground font-medium">Mô tả:</span> {ticket.description}</p>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${ticketStatusMap[ticket.status].className}`}>
                      {ticketStatusMap[ticket.status].label}
                    </span>
                    <div className="flex items-center gap-2">
                      <button className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center"><Edit size={14} className="text-muted-foreground" /></button>
                      <button className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center"><Eye size={14} className="text-muted-foreground" /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Today's tasks table */}
        <div>
          <h3 className="font-bold text-sm text-foreground mb-3">Công việc hôm nay</h3>
          <div className="glass-card rounded-2xl overflow-hidden">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="text-left p-3 font-semibold text-muted-foreground">Task</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">End date</th>
                  <th className="text-right p-3 font-semibold text-muted-foreground">Status ▼</th>
                </tr>
              </thead>
              <tbody>
                {selected.tasks.slice(0, 3).map((task) => (
                  <tr key={task.id} className="border-b border-border/30 last:border-0">
                    <td className="p-3 text-primary font-medium">{task.type.split(" ")[0]}</td>
                    <td className="p-3 text-foreground">20/10/2025</td>
                    <td className="p-3 text-right">
                      <span className={`text-[10px] font-bold ${task.status === "in_progress" ? "text-primary" : task.status === "overdue" ? "text-destructive" : "text-eco-orange"}`}>
                        {task.status === "in_progress" ? "Inpro" : task.status === "overdue" ? "Quá hạn" : "Pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderTasksTab = () => {
    if (!selected) return null;
    const filteredTasks = selected.tasks.filter((t) =>
      t.title.toLowerCase().includes(taskSearch.toLowerCase())
    );
    return (
      <div className="space-y-4">
        {/* Search & filter */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Tìm kiếm công việc" className="pl-9 rounded-xl bg-card/60 border-border/40 h-10 text-sm" value={taskSearch} onChange={(e) => setTaskSearch(e.target.value)} />
          </div>
          <Button variant="outline" size="sm" className="rounded-xl h-10 text-xs gap-1.5 border-border/40">
            <Filter size={14} /> Bộ lọc công việc
          </Button>
        </div>

        {/* Month group */}
        <div>
          <h4 className="font-bold text-sm text-foreground mb-3">Tháng hiện tại</h4>
          <div className="space-y-3">
            {filteredTasks.map((task, i) => (
              <motion.div key={task.id} className="glass-card rounded-2xl p-4 space-y-2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <p className="font-bold text-sm text-foreground leading-snug">
                  {i + 1}. {task.title}
                </p>
                <div className="space-y-1.5 text-xs text-muted-foreground">
                  <p>Người thực hiện: {task.assignee}</p>
                  <p>Số điện thoại: {task.phone}</p>
                  <p>Loại công việc: {task.type}</p>
                  <p>Mô tả: {task.description}</p>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${taskStatusMap[task.status].className}`}>
                    {taskStatusMap[task.status].label}
                  </span>
                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center"><Edit size={14} className="text-muted-foreground" /></button>
                    <button className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center"><Trash2 size={14} className="text-destructive" /></button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <Button className="w-full touch-target font-bold gap-2 rounded-2xl gradient-primary border-0 shadow-glow h-14 text-primary-foreground">
          Thêm công việc
        </Button>
      </div>
    );
  };

  const renderReportsTab = () => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <BarChart3 size={48} className="text-muted-foreground/30 mb-3" />
      <p className="text-sm text-muted-foreground">Chưa có báo cáo nào</p>
    </div>
  );

  return (
    <div className="gradient-surface min-h-screen">
      <CustomerHeader title="Quản lý nhà vệ sinh" />

      <AnimatePresence mode="wait">
        {selectedId && selected ? (
          <motion.div key="detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="px-4 py-4 space-y-4">
            {/* Header with code */}
            <div className="flex items-center justify-between">
              <motion.button onClick={() => { setSelectedId(null); setActiveTab("overview"); }} className="text-sm text-primary font-semibold flex items-center gap-1" whileTap={{ x: -4 }}>
                ← Quay lại
              </motion.button>
              <span className="font-bold text-sm text-foreground">{selected.code}</span>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 bg-card/60 backdrop-blur-sm rounded-xl p-1 border border-border/30">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-semibold transition-all relative ${
                    activeTab === tab.key
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                  {tab.badge && tab.badge > 0 && (
                    <span className={`absolute -top-1 -right-0.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full text-[10px] font-bold ${
                      activeTab === tab.key ? "bg-primary-foreground text-primary" : "bg-primary text-primary-foreground"
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Title */}
            <h2 className="font-bold text-base text-foreground leading-snug">{selected.code} - {selected.name}</h2>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }}>
                {activeTab === "overview" && renderOverviewTab()}
                {activeTab === "tasks" && renderTasksTab()}
                {activeTab === "reports" && renderReportsTab()}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Search & filters */}
            <div className="px-4 pt-5 pb-3 flex gap-2">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Tìm kiếm nhà vệ sinh" className="pl-10 rounded-xl bg-card/60 backdrop-blur-sm border-border/40 h-11 text-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <Button variant="outline" size="sm" className="rounded-xl h-11 text-xs gap-1.5 border-border/40 px-3">
                Sắp xếp
              </Button>
              <Button variant="outline" size="sm" className="rounded-xl h-11 text-xs gap-1.5 border-border/40 px-3">
                <Filter size={14} /> Bộ lọc
              </Button>
            </div>

            {/* List */}
            <div className="px-4 pb-3 space-y-3">
              {filtered.map((t, i) => (
                <motion.div
                  key={t.id}
                  className="glass-card rounded-2xl p-4 card-hover cursor-pointer"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setSelectedId(t.id)}
                  whileTap={{ scale: 0.98 }}
                >
                  <p className="font-bold text-sm text-foreground mb-2">{t.code} - {t.name}</p>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p>Ngày tạo: {t.createdAt}</p>
                    <p>Phân loại: {t.category || "-"}</p>
                    <p>Vị trí: {t.area || "-"}</p>
                    <p>Người sở hữu: {t.owner || "-"}</p>
                    <p>Địa chỉ: {t.address}</p>
                    <p>Mô tả: {t.description || "-"}</p>
                    <p>Chứng chỉ: {t.certificates.join(", ") || "-"}</p>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${statusMap[t.status].badgeClass}`}>
                      Trạng thái: {statusMap[t.status].label}
                    </span>
                    <QrCode size={20} className="text-primary" />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Add button */}
            <div className="px-4 pb-6">
              <Button className="w-full touch-target font-bold gap-2 rounded-2xl gradient-primary border-0 shadow-glow h-14 text-primary-foreground">
                Thêm nhà vệ sinh
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomerToilets;
