import { useState } from "react";
import CustomerHeader from "./components/CustomerHeader";
import StatusBadge from "@/components/StatusBadge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MessageSquareWarning, Plus, Calendar, MapPin, Bath, Search,
  ChevronRight, Send, Image as ImageIcon, Clock, CheckCircle2, AlertTriangle, X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Ticket {
  id: string;
  title: string;
  nvs: string;
  category: string;
  status: string;
  createdAt: string;
  description: string;
  response?: string;
  responseAt?: string;
}

const tickets: Ticket[] = [
  {
    id: "TK-001", title: "Bồn cầu tầng 3 bị tắc", nvs: "NVS Tầng 3 - Tòa A",
    category: "Sự cố thiết bị", status: "processing", createdAt: "15/03/2026",
    description: "Bồn cầu phòng vệ sinh nam tầng 3 bị tắc nghẽn, nước không thoát được.",
  },
  {
    id: "TK-002", title: "Thiếu giấy vệ sinh Block B", nvs: "NVS Sảnh B - KTX",
    category: "Vật tư tiêu hao", status: "done", createdAt: "10/03/2026",
    description: "Giấy vệ sinh khu Block B đã hết từ sáng, cần bổ sung gấp.",
    response: "Đã bổ sung giấy vệ sinh cho toàn bộ khu Block B.", responseAt: "10/03/2026",
  },
  {
    id: "TK-003", title: "Mùi hôi khu vực lavabo", nvs: "NVS Tầng 1 - Tòa C",
    category: "Vệ sinh", status: "pending", createdAt: "12/03/2026",
    description: "Khu vực lavabo có mùi hôi khó chịu, nghi do hệ thống thoát nước bị nghẹt.",
  },
  {
    id: "TK-004", title: "Đèn nhà vệ sinh bị hỏng", nvs: "NVS Công viên Eco Park",
    category: "Sự cố thiết bị", status: "done", createdAt: "05/03/2026",
    description: "Đèn LED phòng vệ sinh nữ không sáng.",
    response: "Đã thay bóng đèn LED mới và kiểm tra hệ thống điện.", responseAt: "07/03/2026",
  },
];

const statusLabel: Record<string, string> = {
  pending: "Chờ xử lý", processing: "Đang xử lý", done: "Đã xử lý",
};

const categories = ["Sự cố thiết bị", "Vệ sinh", "Vật tư tiêu hao", "Khác"];

const CustomerTickets = () => {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [showCreate, setShowCreate] = useState(false);
  const [newTicket, setNewTicket] = useState({ title: "", category: categories[0], nvs: "", description: "" });

  const filtered = tickets
    .filter((t) => !filterStatus || t.status === filterStatus)
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));

  const handleCreate = () => {
    // Mock create - in real app would POST to API
    setShowCreate(false);
    setNewTicket({ title: "", category: categories[0], nvs: "", description: "" });
  };

  return (
    <div className="gradient-surface min-h-screen">
      <MobileHeader title="Ticket hỗ trợ" />

      <div className="px-4 pt-5 pb-3">
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

      <div className="px-4 space-y-3 pb-24">
        <AnimatePresence mode="popLayout">
          {filtered.map((t, i) => (
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
                  <p className="text-[11px] text-muted-foreground font-mono mt-0.5">#{t.id}</p>
                </div>
                <StatusBadge status={t.status} label={statusLabel[t.status] || t.status} />
              </div>
              <div className="flex items-center gap-3 text-[11px] text-muted-foreground mt-3 pt-3 border-t border-border/30">
                <span className="flex items-center gap-1"><Bath size={12} />{t.nvs}</span>
                <span className="flex items-center gap-1 ml-auto"><Calendar size={12} />{t.createdAt}</span>
              </div>
            </motion.div>
          ))}
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
        onClick={() => setShowCreate(true)}
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
                <div className="flex items-center gap-3 bg-muted/40 rounded-xl p-3">
                  <Bath size={16} className="text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] text-muted-foreground">Nhà vệ sinh</p>
                    <p className="text-[13px] font-semibold text-foreground">{selectedTicket.nvs}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-muted/40 rounded-xl p-3">
                  <AlertTriangle size={16} className="text-primary shrink-0" />
                  <div>
                    <p className="text-[10px] text-muted-foreground">Phân loại</p>
                    <p className="text-[13px] font-semibold text-foreground">{selectedTicket.category}</p>
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
              <label className="text-[12px] font-bold text-foreground mb-1.5 block">Tiêu đề</label>
              <Input
                placeholder="Mô tả ngắn gọn vấn đề..."
                className="rounded-xl"
                value={newTicket.title}
                onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
              />
            </div>

            <div>
              <label className="text-[12px] font-bold text-foreground mb-1.5 block">Phân loại</label>
              <div className="flex gap-2 flex-wrap">
                {categories.map((c) => (
                  <motion.button
                    key={c}
                    onClick={() => setNewTicket({ ...newTicket, category: c })}
                    className={`chip ${newTicket.category === c ? "chip-active" : "chip-inactive"}`}
                    whileTap={{ scale: 0.93 }}
                  >
                    {c}
                  </motion.button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-[12px] font-bold text-foreground mb-1.5 block">Nhà vệ sinh liên quan</label>
              <Input
                placeholder="Chọn NVS..."
                className="rounded-xl"
                value={newTicket.nvs}
                onChange={(e) => setNewTicket({ ...newTicket, nvs: e.target.value })}
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
              disabled={!newTicket.title || !newTicket.description}
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
