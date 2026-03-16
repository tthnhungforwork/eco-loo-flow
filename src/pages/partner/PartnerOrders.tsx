import { useState } from "react";
import PartnerHeader from "./components/PartnerHeader";
import SegmentedControl from "@/components/SegmentedControl";
import StatusBadge from "@/components/StatusBadge";
import { Calendar, Building2, Search, CheckCircle, XCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const allOrders = [
  { id: "PDH-001", name: "Gói vệ sinh tháng 3", client: "Công ty ABC", date: "16/03/2026", amount: "5.000.000đ", status: "pending", type: "VSLD" },
  { id: "PDH-002", name: "Bảo trì hệ thống Q1", client: "KTX Đại học X", date: "14/03/2026", amount: "8.500.000đ", status: "accepted", type: "SCBD" },
  { id: "PDH-003", name: "Tư vấn số hóa NVS", client: "Trường THPT Y", date: "12/03/2026", amount: "Miễn phí", status: "dispatching", type: "Tư vấn" },
  { id: "PDH-004", name: "Lắp đặt thiết bị mới", client: "Công ty Green", date: "10/03/2026", amount: "15.000.000đ", status: "done", type: "SCBD" },
  { id: "PDH-005", name: "VSLD Block C tháng 3", client: "KTX ĐH Z", date: "08/03/2026", amount: "3.200.000đ", status: "done", type: "VSLD" },
];

const statusLabel: Record<string, string> = { pending: "Chờ tiếp nhận", accepted: "Đã tiếp nhận", dispatching: "Đang điều phối", done: "Hoàn thành" };
const tabs = ["Tất cả", "Chờ tiếp nhận", "Đã tiếp nhận", "Đang điều phối", "Hoàn thành"];
const tabStatus = ["all", "pending", "accepted", "dispatching", "done"];

const PartnerOrders = () => {
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");
  const filtered = allOrders
    .filter((o) => tabStatus[tab] === "all" || o.status === tabStatus[tab])
    .filter((o) => o.name.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <MobileHeader title="QL Đơn hàng" />
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

        <div className="px-4 space-y-3">
          {filtered.map((o, i) => (
            <motion.div key={o.id} className="glass-card rounded-2xl p-4 card-hover" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div className="flex justify-between items-start mb-1">
                <div className="flex-1 mr-2">
                  <p className="font-bold text-sm text-foreground">{o.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-mono text-muted-foreground">#{o.id}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">{o.type}</span>
                  </div>
                </div>
                <StatusBadge status={o.status === "pending" ? "new" : o.status === "dispatching" ? "processing" : o.status} label={statusLabel[o.status]} />
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2"><Building2 size={12} />{o.client}</p>
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-border/50">
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar size={12} />{o.date}</span>
                <span className="font-extrabold text-sm text-primary">{o.amount}</span>
              </div>

              {o.status === "pending" && (
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline" className="flex-1 rounded-xl font-semibold gap-1 border-destructive/30 text-destructive hover:bg-destructive/10">
                    <XCircle size={14} /> Từ chối
                  </Button>
                  <Button size="sm" className="flex-1 rounded-xl font-bold gap-1 gradient-primary border-0 shadow-glow">
                    <CheckCircle size={14} /> Tiếp nhận
                  </Button>
                </div>
              )}
              {o.status === "accepted" && (
                <Button size="sm" className="w-full mt-3 rounded-xl font-bold gap-1 gradient-primary border-0 shadow-glow">
                  <Users size={14} /> Điều phối nhân sự
                </Button>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PartnerOrders;
