import { useState } from "react";
import MobileHeader from "@/components/MobileHeader";
import SegmentedControl from "@/components/SegmentedControl";
import StatusBadge from "@/components/StatusBadge";
import { Calendar, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const allOrders = [
  { id: "PDH-001", name: "Gói vệ sinh tháng 3", client: "Công ty ABC", date: "16/03/2026", amount: "5.000.000đ", status: "new" },
  { id: "PDH-002", name: "Bảo trì hệ thống Q1", client: "KTX Đại học X", date: "14/03/2026", amount: "8.500.000đ", status: "processing" },
  { id: "PDH-003", name: "Lắp đặt thiết bị mới", client: "Trường THPT Y", date: "10/03/2026", amount: "15.000.000đ", status: "done" },
];

const tabs = ["Tất cả", "Mới", "Đang xử lý", "Hoàn thành"];
const tabStatus = ["all", "new", "processing", "done"];
const statusLabel: Record<string, string> = { new: "Mới", processing: "Đang xử lý", done: "Hoàn thành" };

const PartnerOrders = () => {
  const [tab, setTab] = useState(0);
  const filtered = tabStatus[tab] === "all" ? allOrders : allOrders.filter((o) => o.status === tabStatus[tab]);

  return (
    <div>
      <MobileHeader title="QL Đơn hàng" />
      <div className="py-4 animate-fade-in">
        <SegmentedControl tabs={tabs} active={tab} onChange={setTab} />
        <div className="px-4 space-y-3">
          {filtered.map((o) => (
            <div key={o.id} className="bg-card rounded-xl border border-border p-4">
              <div className="flex justify-between items-start mb-1">
                <p className="font-semibold text-sm text-foreground">{o.name}</p>
                <StatusBadge status={o.status} label={statusLabel[o.status]} />
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                <Building2 size={12} />{o.client}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar size={12} />{o.date}</span>
                <span className="font-bold text-sm text-primary">{o.amount}</span>
              </div>
              {o.status === "new" && (
                <Button size="sm" className="w-full mt-3 touch-target font-medium">Điều phối đơn hàng</Button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnerOrders;
