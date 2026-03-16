import { useState } from "react";
import MobileHeader from "@/components/MobileHeader";
import SegmentedControl from "@/components/SegmentedControl";
import StatusBadge from "@/components/StatusBadge";
import { Calendar, Building2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const orders = [
  { id: "DV-101", type: "service", name: "Vệ sinh NVS KTX Block A", client: "KTX ĐH X", date: "16/03/2026", status: "new" },
  { id: "BH-201", type: "sales", name: "Nước rửa tay Eco x100", client: "Đại lý MN", date: "15/03/2026", status: "processing" },
  { id: "DV-103", type: "service", name: "Bảo trì hệ thống Block C", client: "Công ty Z", date: "14/03/2026", status: "done" },
  { id: "BH-202", type: "sales", name: "Giấy tái chế x200", client: "Đại lý MB", date: "13/03/2026", status: "done" },
];

const tabs = ["Tất cả", "Dịch vụ", "Bán hàng"];
const statusLabel: Record<string, string> = { new: "Mới", processing: "Đang xử lý", done: "Hoàn thành" };

const AdminOrders = () => {
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");
  const filtered = orders
    .filter((o) => tab === 0 || (tab === 1 && o.type === "service") || (tab === 2 && o.type === "sales"))
    .filter((o) => o.name.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <MobileHeader title="Đơn hàng" />
      <div className="py-4">
        <div className="px-4 mb-4 relative">
          <Search size={16} className="absolute left-7 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Tìm kiếm đơn hàng..." className="pl-9 touch-target rounded-xl bg-card/80 backdrop-blur-sm border-border/50" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <SegmentedControl tabs={tabs} active={tab} onChange={setTab} />
        <div className="px-4 space-y-3">
          {filtered.map((o, i) => (
            <motion.div key={o.id} className="glass-card rounded-2xl p-4 card-hover" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div className="flex justify-between items-start mb-1">
                <div>
                  <p className="font-bold text-sm text-foreground">{o.name}</p>
                  <p className="text-[11px] text-muted-foreground font-mono">#{o.id} · {o.type === "service" ? "Dịch vụ" : "Bán hàng"}</p>
                </div>
                <StatusBadge status={o.status} label={statusLabel[o.status]} />
              </div>
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-border/50">
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Building2 size={12} />{o.client}</span>
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar size={12} />{o.date}</span>
              </div>
              {o.status === "new" && <Button size="sm" className="w-full mt-3 touch-target font-bold rounded-xl gradient-primary border-0 shadow-glow">Điều phối</Button>}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
