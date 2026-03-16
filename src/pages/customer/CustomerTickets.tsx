import { useState } from "react";
import CustomerHeader from "./components/CustomerHeader";
import StatusBadge from "@/components/StatusBadge";
import SegmentedControl from "@/components/SegmentedControl";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from "@/components/ui/select";
import {
  MessageSquareWarning, Plus, Calendar, Bath, Search,
  Send, Image as ImageIcon, Clock, CheckCircle2, AlertTriangle,
  ShoppingCart, Wrench, FileText, Package, QrCode, X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MOCK_CUSTOMER_ORDERS, SERVICE_TYPE_CONFIG } from "@/data/orderData";

// --- Data types ---
interface Ticket {
  id: string;
  title: string;
  type: "order" | "service" | "accident";
  /** order type: mã đơn hàng */
  orderId?: string;
  orderName?: string;
  /** service type: tên dịch vụ */
  serviceType?: string;
  serviceName?: string;
  /** accident type: NVS */
  nvs?: string;
  status: string;
  createdAt: string;
  description: string;
  response?: string;
  responseAt?: string;
}

// --- Constants ---
const typeLabel: Record<string, string> = {
  order: "Phản ánh đơn hàng",
  service: "Phản ánh dịch vụ",
  accident: "Phản ánh tai nạn sự cố NVS",
};
const typeIcon: Record<string, React.ReactNode> = {
  order: <ShoppingCart size={14} />,
  service: <Wrench size={14} />,
  accident: <AlertTriangle size={14} />,
};
const typeColor: Record<string, string> = {
  order: "bg-secondary/10 text-secondary",
  service: "bg-primary/10 text-primary",
  accident: "bg-destructive/10 text-destructive",
};
const statusLabel: Record<string, string> = {
  pending: "Chờ xử lý", processing: "Đang xử lý", done: "Đã xử lý",
};
const tabLabels = ["Đơn hàng", "Dịch vụ", "Sự cố NVS"];
const tabKeys = ["order", "service", "accident"];

// Mock services
const MOCK_SERVICES = [
  { id: "DV-001", name: "Vệ sinh lau dọn hàng ngày", type: "vsld" },
  { id: "DV-002", name: "Bảo trì thiết bị định kỳ", type: "scbd" },
  { id: "DV-003", name: "Tư vấn giải pháp Netzero", type: "netzero" },
  { id: "DV-004", name: "Cải tạo NVS Block B", type: "caitao" },
];

// Mock NVS list
const MOCK_NVS = [
  "NVS Tầng 1 - Tòa A", "NVS Tầng 2 - Tòa A", "NVS Tầng 3 - Tòa A",
  "NVS Tầng 5 - Tòa A", "NVS Sảnh B - KTX", "NVS Tầng 1 - Tòa C",
  "NVS Sảnh A - VP", "NVS Công viên Eco Park",
];

// Mock tickets
const tickets: Ticket[] = [
  {
    id: "TK-001", title: "Đơn DH-001 chưa được xử lý đúng hạn",
    type: "order", orderId: "DH-001", orderName: "Gói vệ sinh tháng 3",
    status: "processing", createdAt: "15/03/2026",
    description: "Đơn hàng DH-001 đã quá hạn xử lý 2 ngày nhưng chưa có phản hồi từ đối tác.",
  },
  {
    id: "TK-002", title: "Sai thông tin đơn hàng DH-003",
    type: "order", orderId: "DH-003", orderName: "Bảo trì thiết bị Q1",
    status: "done", createdAt: "10/03/2026",
    description: "Thông tin địa chỉ giao hàng trên đơn DH-003 bị sai so với yêu cầu ban đầu.",
    response: "Đã cập nhật lại thông tin đơn hàng và thông báo đối tác.", responseAt: "11/03/2026",
  },
  {
    id: "TK-003", title: "Nhân viên vệ sinh không đến đúng giờ",
    type: "service", serviceType: "vsld", serviceName: "Vệ sinh lau dọn hàng ngày",
    status: "pending", createdAt: "14/03/2026",
    description: "Nhân viên vệ sinh ca sáng không đến đúng giờ quy định, khu vực NVS chưa được dọn.",
  },
  {
    id: "TK-004", title: "Chất lượng vệ sinh kém",
    type: "service", serviceType: "scbd", serviceName: "Bảo trì thiết bị định kỳ",
    status: "processing", createdAt: "13/03/2026",
    description: "Sau khi vệ sinh xong, sàn nhà vệ sinh vẫn còn ẩm ướt và có mùi hôi.",
  },
  {
    id: "TK-005", title: "Rò rỉ nước NVS Tầng 5",
    type: "accident", nvs: "NVS Tầng 5 - Tòa A",
    status: "pending", createdAt: "16/03/2026",
    description: "Đường ống nước bị vỡ gây ngập sàn nhà vệ sinh tầng 5, cần xử lý khẩn cấp.",
  },
  {
    id: "TK-006", title: "Hư hỏng thiết bị bồn cầu",
    type: "accident", nvs: "NVS Sảnh A - VP",
    status: "done", createdAt: "05/03/2026",
    description: "Bồn cầu tự động bị hỏng nút xả, nước chảy liên tục.",
    response: "Đã thay thế van xả mới và kiểm tra hoạt động bình thường.", responseAt: "07/03/2026",
  },
];

// --- Helper: subtitle for each ticket type ---
function getTicketRef(t: Ticket) {
  if (t.type === "order") return { icon: <Package size={12} />, text: `${t.orderId} · ${t.orderName}` };
  if (t.type === "service") return { icon: <Wrench size={12} />, text: t.serviceName || "" };
  return { icon: <Bath size={12} />, text: t.nvs || "" };
}

function getRefLabel(type: string) {
  if (type === "order") return "Đơn hàng";
  if (type === "service") return "Dịch vụ";
  return "Nhà vệ sinh";
}

// --- Component ---
const CustomerTickets = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [newTicket, setNewTicket] = useState({ title: "", type: tabKeys[0], refId: "", description: "" });

  const filtered = tickets
    .filter((t) => t.type === tabKeys[activeTab])
    .filter((t) => !filterStatus || t.status === filterStatus)
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));

  const handleCreate = () => {
    setShowCreate(false);
    setNewTicket({ title: "", type: tabKeys[activeTab], refId: "", description: "" });
  };

  // Options for select in create form
  const refOptions = () => {
    const type = newTicket.type;
    if (type === "order") return MOCK_CUSTOMER_ORDERS.map((o) => ({ value: o.id, label: `${o.id} · ${o.name}` }));
    if (type === "service") return MOCK_SERVICES.map((s) => ({ value: s.id, label: `${s.id} · ${s.name}` }));
    return MOCK_NVS.map((n) => ({ value: n, label: n }));
  };

  return (
    <div className="gradient-surface min-h-screen">
      <CustomerHeader title="Ticket hỗ trợ" />

      <div className="pt-4">
        <SegmentedControl tabs={tabLabels} active={activeTab} onChange={setActiveTab} />
      </div>

      {/* Search */}
      <div className="px-4 pb-3">
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Tìm ticket..."
            className="pl-10 rounded-xl bg-card/60 backdrop-blur-sm border-border/40 h-11 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Status filter chips */}
      <div className="px-4 mb-4 flex gap-2 overflow-x-auto scrollbar-hide">
        {[
          { key: null, label: "Tất cả" },
          { key: "pending", label: "Chờ xử lý" },
          { key: "processing", label: "Đang xử lý" },
          { key: "done", label: "Đã xử lý" },
        ].map((f) => (
          <motion.button
            key={f.label}
            onClick={() => setFilterStatus(f.key)}
            className={`chip ${filterStatus === f.key ? "chip-active" : "chip-inactive"}`}
            whileTap={{ scale: 0.93 }}
          >
            {f.label}
          </motion.button>
        ))}
      </div>

      {/* Ticket list */}
      <div className="px-4 space-y-3 pb-24">
        <AnimatePresence mode="popLayout">
          {filtered.map((t, i) => {
            const ref = getTicketRef(t);
            return (
              <motion.div
                key={t.id}
                className="glass-card rounded-2xl p-4 card-hover cursor-pointer"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => setSelectedTicket(t)}
                whileTap={{ scale: 0.98 }}
                layout
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1 mr-2">
                    <p className="font-semibold text-sm text-foreground leading-snug">{t.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-mono text-muted-foreground">#{t.id}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${typeColor[t.type]}`}>
                        {typeIcon[t.type]} {typeLabel[t.type]}
                      </span>
                    </div>
                  </div>
                  <StatusBadge status={t.status} label={statusLabel[t.status] || t.status} />
                </div>
                <div className="flex items-center gap-3 text-[11px] text-muted-foreground mt-3 pt-3 border-t border-border/30">
                  <span className="flex items-center gap-1">{ref.icon}{ref.text}</span>
                  <span className="flex items-center gap-1 ml-auto"><Calendar size={12} />{t.createdAt}</span>
                </div>
              </motion.div>
            );
          })}
          {filtered.length === 0 && (
            <motion.div className="text-center py-20" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted/60 flex items-center justify-center">
                <MessageSquareWarning size={28} className="text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm font-medium">Không có ticket nào</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* FAB */}
      <motion.button
        className="fixed bottom-24 right-4 w-14 h-14 rounded-2xl gradient-primary text-primary-foreground shadow-glow flex items-center justify-center z-40"
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setNewTicket({ title: "", type: tabKeys[activeTab], refId: "", description: "" });
          setShowCreate(true);
        }}
      >
        <Plus size={24} />
      </motion.button>

      {/* Detail Sheet */}
      <Sheet open={!!selectedTicket} onOpenChange={() => setSelectedTicket(null)}>
        <SheetContent side="bottom" className="rounded-t-3xl max-h-[85vh] overflow-y-auto px-5 pb-8">
          {selectedTicket && (
            <>
              <SheetHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl gradient-warm flex items-center justify-center text-primary-foreground shadow-sm">
                    <MessageSquareWarning size={22} />
                  </div>
                  <div>
                    <SheetTitle className="text-base text-left">{selectedTicket.title}</SheetTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-mono text-muted-foreground">#{selectedTicket.id}</span>
                      <StatusBadge status={selectedTicket.status} label={statusLabel[selectedTicket.status]} />
                    </div>
                  </div>
                </div>
              </SheetHeader>

              <div className="space-y-3 mb-5">
                {/* Context-aware reference */}
                <div className="flex items-center gap-3 bg-muted/40 rounded-xl p-3">
                  {selectedTicket.type === "order" ? <Package size={16} className="text-primary shrink-0" /> :
                   selectedTicket.type === "service" ? <Wrench size={16} className="text-primary shrink-0" /> :
                   <Bath size={16} className="text-primary shrink-0" />}
                  <div>
                    <p className="text-[10px] text-muted-foreground">{getRefLabel(selectedTicket.type)}</p>
                    <p className="text-[13px] font-semibold text-foreground">{getTicketRef(selectedTicket).text}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-muted/40 rounded-xl p-3">
                  <AlertTriangle size={16} className="text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] text-muted-foreground">Loại phản ánh</p>
                    <p className="text-[13px] font-semibold text-foreground">{typeLabel[selectedTicket.type]}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-muted/40 rounded-xl p-3">
                  <Calendar size={16} className="text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] text-muted-foreground">Ngày gửi</p>
                    <p className="text-[13px] font-semibold text-foreground">{selectedTicket.createdAt}</p>
                  </div>
                </div>
              </div>

              <div className="mb-5">
                <p className="text-[12px] font-bold text-foreground mb-2">Nội dung phản ánh</p>
                <p className="text-[13px] text-muted-foreground leading-relaxed bg-muted/30 rounded-xl p-3">
                  {selectedTicket.description}
                </p>
              </div>

              {selectedTicket.response && (
                <div>
                  <p className="text-[12px] font-bold text-foreground mb-2 flex items-center gap-1.5">
                    <CheckCircle2 size={14} className="text-primary" /> Phản hồi xử lý
                  </p>
                  <div className="bg-primary/5 border border-primary/10 rounded-xl p-3">
                    <p className="text-[13px] text-foreground leading-relaxed">{selectedTicket.response}</p>
                    <p className="text-[10px] text-muted-foreground mt-2 flex items-center gap-1">
                      <Clock size={10} /> {selectedTicket.responseAt}
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Create Sheet */}
      <Sheet open={showCreate} onOpenChange={setShowCreate}>
        <SheetContent side="bottom" className="rounded-t-3xl max-h-[90vh] overflow-y-auto px-5 pb-8">
          <SheetHeader className="pb-4">
            <SheetTitle className="text-base text-left">Tạo ticket mới</SheetTitle>
          </SheetHeader>

          <div className="space-y-4">
            <div>
              <label className="text-[12px] font-bold text-foreground mb-1.5 block">Loại phản ánh</label>
              <div className="flex gap-2 flex-wrap">
                {tabKeys.map((key, i) => (
                  <motion.button
                    key={key}
                    onClick={() => setNewTicket({ ...newTicket, type: key, refId: "" })}
                    className={`chip ${newTicket.type === key ? "chip-active" : "chip-inactive"}`}
                    whileTap={{ scale: 0.93 }}
                  >
                    {tabLabels[i]}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Context-aware select */}
            <div>
              <label className="text-[12px] font-bold text-foreground mb-1.5 block">
                {newTicket.type === "order" ? "Chọn đơn hàng" : newTicket.type === "service" ? "Chọn dịch vụ" : "Chọn nhà vệ sinh"}
              </label>
              <Select value={newTicket.refId} onValueChange={(v) => setNewTicket({ ...newTicket, refId: v })}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder={
                    newTicket.type === "order" ? "Chọn đơn hàng liên quan..." :
                    newTicket.type === "service" ? "Chọn dịch vụ liên quan..." :
                    "Chọn NVS liên quan..."
                  } />
                </SelectTrigger>
                <SelectContent>
                  {refOptions().map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-[12px] font-bold text-foreground mb-1.5 block">Tiêu đề</label>
              <Input
                placeholder="Mô tả ngắn gọn vấn đề..."
                className="rounded-xl"
                value={newTicket.title}
                onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
              />
            </div>

            <div>
              <label className="text-[12px] font-bold text-foreground mb-1.5 block">Nội dung chi tiết</label>
              <Textarea
                placeholder="Mô tả chi tiết vấn đề gặp phải..."
                className="rounded-xl min-h-[100px]"
                value={newTicket.description}
                onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
              />
            </div>

            <Button variant="outline" className="w-full rounded-xl gap-2 font-semibold border-dashed">
              <ImageIcon size={16} /> Đính kèm hình ảnh
            </Button>

            <Button
              className="w-full touch-target font-bold rounded-2xl gradient-primary border-0 shadow-glow h-14 text-primary-foreground gap-2"
              onClick={handleCreate}
              disabled={!newTicket.title || !newTicket.description || !newTicket.refId}
            >
              <Send size={18} /> Gửi ticket
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CustomerTickets;
