import { useState } from "react";
import MobileHeader from "@/components/MobileHeader";
import SegmentedControl from "@/components/SegmentedControl";
import StatusBadge from "@/components/StatusBadge";
import { Calendar } from "lucide-react";
import { motion } from "framer-motion";

const orders = [
  { id: "DH-001", name: "Gói vệ sinh tháng", date: "16/03/2026", amount: "2.500.000đ", status: "new" },
  { id: "DH-002", name: "Nước rửa tay hữu cơ x10", date: "14/03/2026", amount: "850.000đ", status: "processing" },
  { id: "DH-003", name: "Bảo trì thiết bị Q1", date: "10/03/2026", amount: "5.000.000đ", status: "done" },
  { id: "DH-004", name: "Giấy tái chế Eco x50", date: "08/03/2026", amount: "2.250.000đ", status: "done" },
];

const tabLabels = ["Mới", "Đang xử lý", "Hoàn thành"];
const tabStatus = ["new", "processing", "done"];
const statusLabel: Record<string, string> = { new: "Mới", processing: "Đang xử lý", done: "Hoàn thành" };

const CustomerOrders = () => {
  const [tab, setTab] = useState(0);
  const filtered = orders.filter((o) => o.status === tabStatus[tab]);

  return (
    <div>
      <MobileHeader title="Đơn hàng" />
      <div className="py-4">
        <SegmentedControl tabs={tabLabels} active={tab} onChange={setTab} />
        <div className="px-4 space-y-3">
          {filtered.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-muted flex items-center justify-center">
                <Calendar size={28} className="text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm font-medium">Không có đơn hàng nào</p>
            </div>
          )}
          {filtered.map((o, i) => (
            <motion.div
              key={o.id}
              className="glass-card rounded-2xl p-4 card-hover"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1 mr-2">
                  <p className="font-bold text-sm text-foreground">{o.name}</p>
                  <p className="text-[11px] text-muted-foreground font-mono mt-0.5">#{o.id}</p>
                </div>
                <StatusBadge status={o.status} label={statusLabel[o.status]} />
              </div>
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-border/50">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar size={12} />{o.date}
                </span>
                <span className="font-extrabold text-sm text-primary">{o.amount}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerOrders;
