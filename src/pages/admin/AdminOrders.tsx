import { useState } from "react";
import MobileHeader from "@/components/MobileHeader";
import SegmentedControl from "@/components/SegmentedControl";
import StatusBadge from "@/components/StatusBadge";
import { Calendar, Building2, Search, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const orders = [
  { id: "DV-101", type: "service", name: "Vệ sinh NVS KTX Block A", client: "KTX ĐH X", partner: "Eco Clean", date: "16/03/2026", status: "dispatching" },
  { id: "DV-102", type: "service", name: "Bảo trì hệ thống Block C", client: "Công ty Z", partner: "—", date: "15/03/2026", status: "new" },
  { id: "BH-201", type: "sales", name: "Nước rửa tay Eco x100", client: "Đại lý MN", partner: "—", date: "15/03/2026", status: "new" },
  { id: "DV-103", type: "service", name: "Tư vấn số hóa NVS", client: "Trường THPT Y", partner: "Green Tech", date: "14/03/2026", status: "processing" },
  { id: "BH-202", type: "sales", name: "Giấy tái chế x200", client: "Đại lý MB", partner: "Eco Store", date: "13/03/2026", status: "done" },
];

const tabs = ["Tất cả", "Cần điều phối", "Đang xử lý", "Hoàn thành"];
const statusLabel: Record<string, string> = { new: "Mới", dispatching: "Đang điều phối", processing: "Đang xử lý", done: "Hoàn thành" };

const AdminOrders = () => {
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  const filtered = orders
    .filter((o) => {
      if (tab === 1) return o.status === "new";
      if (tab === 2) return o.status === "processing" || o.status === "dispatching";
      if (tab === 3) return o.status === "done";
      return true;
    })
    .filter((o) => !typeFilter || o.type === typeFilter)
    .filter((o) => o.name.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <MobileHeader title="Đơn hàng" />
      <div className="py-4">
        <div className="px-4 mb-4 relative">
          <Search size={16} className="absolute left-7 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Tìm đơn hàng..." className="pl-9 rounded-xl bg-card/80 border-border/50" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className="px-4 mb-4 flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {tabs.map((t, i) => (
            <button key={t} onClick={() => setTab(i)} className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${tab === i ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{t}</button>
          ))}
        </div>

        <div className="px-4 mb-4 flex gap-2">
          <button onClick={() => setTypeFilter(null)} className={`px-3 py-1 rounded-full text-[11px] font-semibold ${!typeFilter ? "bg-foreground text-background" : "bg-muted text-muted-foreground"}`}>Tất cả</button>
          <button onClick={() => setTypeFilter("service")} className={`px-3 py-1 rounded-full text-[11px] font-semibold ${typeFilter === "service" ? "bg-foreground text-background" : "bg-muted text-muted-foreground"}`}>Dịch vụ</button>
          <button onClick={() => setTypeFilter("sales")} className={`px-3 py-1 rounded-full text-[11px] font-semibold ${typeFilter === "sales" ? "bg-foreground text-background" : "bg-muted text-muted-foreground"}`}>Bán hàng</button>
        </div>

        <div className="px-4 space-y-3">
          {filtered.map((o, i) => (
            <motion.div key={o.id} className="glass-card rounded-2xl p-4 card-hover" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div className="flex justify-between items-start mb-1">
                <div>
                  <p className="font-bold text-sm text-foreground">{o.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] text-muted-foreground font-mono">#{o.id}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${o.type === "service" ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"}`}>
                      {o.type === "service" ? "Dịch vụ" : "Bán hàng"}
                    </span>
                  </div>
                </div>
                <StatusBadge status={o.status === "dispatching" ? "processing" : o.status} label={statusLabel[o.status]} />
              </div>
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-border/50">
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Building2 size={12} />{o.client}</span>
                  <span className="flex items-center gap-1"><Calendar size={12} />{o.date}</span>
                </div>
              </div>
              {o.partner !== "—" && (
                <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1"><Users size={12} /> Đối tác: <span className="font-semibold text-foreground">{o.partner}</span></p>
              )}
              {o.status === "new" && (
                <Button size="sm" className="w-full mt-3 touch-target font-bold rounded-xl gradient-primary border-0 shadow-glow">Điều phối</Button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
