import { useState } from "react";
import MobileHeader from "@/components/MobileHeader";
import SegmentedControl from "@/components/SegmentedControl";
import StatusBadge from "@/components/StatusBadge";
import { Clock, User, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

const ticketData: Record<string, Array<{ id: string; title: string; reporter: string; date: string; status: string }>> = {
  order: [
    { id: "T-001", title: "Đơn DV-101 chưa được xử lý", reporter: "Nguyễn Văn K", date: "16/03/2026", status: "new" },
    { id: "T-002", title: "Sai thông tin đơn BH-201", reporter: "Trần Thị M", date: "15/03/2026", status: "processing" },
  ],
  service: [
    { id: "T-003", title: "Nhân viên không đến đúng giờ", reporter: "Lê Văn H", date: "14/03/2026", status: "new" },
  ],
  accident: [
    { id: "T-004", title: "Rò rỉ nước NVS Tầng 5", reporter: "Phạm Thị L", date: "16/03/2026", status: "new" },
    { id: "T-005", title: "Hư hỏng thiết bị NVS Sảnh A", reporter: "Đặng Văn N", date: "13/03/2026", status: "done" },
  ],
};

const tabs = ["Đơn hàng", "Dịch vụ", "Sự cố"];
const tabKeys = ["order", "service", "accident"];
const statusLabel: Record<string, string> = { new: "Mới", processing: "Đang xử lý", done: "Đã xử lý" };

const AdminTickets = () => {
  const [tab, setTab] = useState(0);
  const tickets = ticketData[tabKeys[tab]];

  return (
    <div>
      <MobileHeader title="Ticket" />
      <div className="py-4">
        <SegmentedControl tabs={tabs} active={tab} onChange={setTab} />
        <div className="px-4 space-y-3">
          {tickets.map((t, i) => (
            <motion.div key={t.id} className="glass-card rounded-2xl p-4 card-hover" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-start gap-2 flex-1 mr-2">
                  {tabKeys[tab] === "accident" && t.status === "new" && (
                    <AlertTriangle size={16} className="text-eco-red mt-0.5 shrink-0" />
                  )}
                  <p className="font-semibold text-sm text-foreground">{t.title}</p>
                </div>
                <StatusBadge status={t.status} label={statusLabel[t.status]} />
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><User size={12} />{t.reporter}</span>
                <span className="flex items-center gap-1"><Clock size={12} />{t.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminTickets;
