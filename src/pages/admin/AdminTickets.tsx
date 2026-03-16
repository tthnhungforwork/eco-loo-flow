import { useState } from "react";
import AdminHeader from "./components/AdminHeader";
import StatusBadge from "@/components/StatusBadge";
import SegmentedControl from "@/components/SegmentedControl";
import { Clock, User, AlertTriangle, Search, MessageSquare, ShoppingCart, Wrench } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const ticketData = [
  { id: "T-001", title: "Đơn DV-101 chưa được xử lý", type: "order", reporter: "Nguyễn Văn K", date: "16/03/2026", status: "new", priority: "high" },
  { id: "T-002", title: "Sai thông tin đơn BH-201", type: "order", reporter: "Trần Thị M", date: "15/03/2026", status: "processing", priority: "medium" },
  { id: "T-003", title: "Nhân viên không đến đúng giờ", type: "service", reporter: "Lê Văn H", date: "14/03/2026", status: "new", priority: "high" },
  { id: "T-004", title: "Chất lượng vệ sinh kém", type: "service", reporter: "Hoàng Thị P", date: "12/03/2026", status: "done", priority: "low" },
  { id: "T-005", title: "Rò rỉ nước NVS Tầng 5", type: "accident", reporter: "Phạm Thị L", date: "16/03/2026", status: "new", priority: "high" },
  { id: "T-006", title: "Hư hỏng thiết bị NVS Sảnh A", type: "accident", reporter: "Đặng Văn N", date: "13/03/2026", status: "done", priority: "medium" },
];

const typeLabel: Record<string, string> = { order: "Phản ánh đơn hàng", service: "Phản ánh dịch vụ", accident: "Phản ánh sự cố NVS" };
const typeColor: Record<string, string> = { order: "bg-secondary/10 text-secondary", service: "bg-primary/10 text-primary", accident: "bg-destructive/10 text-destructive" };
const typeIcon: Record<string, React.ReactNode> = {
  order: <ShoppingCart size={12} />,
  service: <Wrench size={12} />,
  accident: <AlertTriangle size={12} />,
};
const statusLabel: Record<string, string> = { new: "Mới", processing: "Đang xử lý", done: "Đã xử lý" };
const priorityLabel: Record<string, string> = { high: "Cao", medium: "TB", low: "Thấp" };
const priorityColor: Record<string, string> = { high: "text-destructive", medium: "text-eco-orange", low: "text-muted-foreground" };

const tabLabels = ["Đơn hàng", "Dịch vụ", "Sự cố NVS"];
const tabKeys = ["order", "service", "accident"];

const AdminTickets = () => {
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");

  const filtered = ticketData
    .filter((t) => t.type === tabKeys[tab])
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <AdminHeader title="Ticket" />
      <div className="py-4">
        <SegmentedControl tabs={tabLabels} active={tab} onChange={setTab} />

        <div className="px-4 mb-4 relative">
          <Search size={16} className="absolute left-7 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Tìm ticket..." className="pl-9 rounded-xl bg-card/80 border-border/50" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className="px-4 space-y-3">
          {filtered.map((t, i) => (
            <motion.div key={t.id} className="glass-card rounded-2xl p-4 card-hover" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-start gap-2 flex-1 mr-2">
                  {t.type === "accident" && t.status === "new" && (
                    <AlertTriangle size={16} className="text-destructive mt-0.5 shrink-0" />
                  )}
                  <div>
                    <p className="font-semibold text-sm text-foreground">{t.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 ${typeColor[t.type]}`}>{typeIcon[t.type]} {typeLabel[t.type]}</span>
                      <span className={`text-[10px] font-bold ${priorityColor[t.priority]}`}>● {priorityLabel[t.priority]}</span>
                    </div>
                  </div>
                </div>
                <StatusBadge status={t.status} label={statusLabel[t.status]} />
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                <span className="flex items-center gap-1"><User size={12} />{t.reporter}</span>
                <span className="flex items-center gap-1"><Clock size={12} />{t.date}</span>
                <span className="font-mono text-[10px]">#{t.id}</span>
              </div>
              {t.status !== "done" && (
                <Button size="sm" className="w-full mt-3 rounded-xl font-bold gap-1 gradient-primary border-0 shadow-glow">
                  <MessageSquare size={14} /> Xử lý ticket
                </Button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminTickets;
