import { useState } from "react";
import MobileHeader from "@/components/MobileHeader";
import SegmentedControl from "@/components/SegmentedControl";
import StatusBadge from "@/components/StatusBadge";
import { Package, Calendar } from "lucide-react";

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
      <div className="py-4 animate-fade-in">
        <SegmentedControl tabs={tabLabels} active={tab} onChange={setTab} />
        <div className="px-4 space-y-3">
          {filtered.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">Không có đơn hàng nào</div>
          )}
          {filtered.map((o) => (
            <div key={o.id} className="bg-card rounded-xl border border-border p-4">
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1 mr-2">
                  <p className="font-semibold text-sm text-foreground">{o.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">#{o.id}</p>
                </div>
                <StatusBadge status={o.status} label={statusLabel[o.status]} />
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Calendar size={12} />{o.date}
                </span>
                <span className="font-bold text-sm text-primary">{o.amount}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerOrders;
