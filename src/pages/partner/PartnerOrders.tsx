import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PartnerHeader from "./components/PartnerHeader";
import StatusBadge from "@/components/StatusBadge";
import { Calendar, Building2, Search, CheckCircle, XCircle, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useOrders } from "@/contexts/OrderContext";
import { ORDER_STATUS_CONFIG } from "@/data/orderData";

const statusToFilter = (status: string) => {
  if (["cho_tiep_nhan"].includes(status)) return "pending";
  if (["da_tiep_nhan", "dang_khao_sat", "da_bao_gia"].includes(status)) return "accepted";
  if (["da_ky_hop_dong", "dang_thuc_hien", "cho_nghiem_thu"].includes(status)) return "dispatching";
  if (["hoan_thanh", "da_danh_gia"].includes(status)) return "done";
  return "all";
};

const tabs = ["Tất cả", "Chờ tiếp nhận", "Đã tiếp nhận", "Đang thực hiện", "Hoàn thành"];
const tabStatus = ["all", "pending", "accepted", "dispatching", "done"];

const PartnerOrders = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");

  const filtered = MOCK_PARTNER_ORDERS
    .filter((o) => tabStatus[tab] === "all" || statusToFilter(o.status) === tabStatus[tab])
    .filter((o) => o.name.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <PartnerHeader title="QL Đơn hàng" />
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

        <div className="px-4 space-y-3 pb-24">
          {filtered.map((o, i) => {
            const config = ORDER_STATUS_CONFIG[o.status];
            return (
              <motion.button
                key={o.id}
                className="w-full text-left glass-card rounded-2xl p-4 card-hover"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => navigate(`/partner/orders/${o.id}`)}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="flex-1 mr-2">
                    <p className="font-bold text-sm text-foreground">{o.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-mono text-muted-foreground">#{o.id}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">{o.typeLabel}</span>
                    </div>
                  </div>
                  <StatusBadge status={config.badgeStatus} label={config.label} />
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2"><Building2 size={12} />{o.customerName}</p>
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-border/50">
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar size={12} />{o.createdAt}</span>
                  <span className="font-extrabold text-sm text-primary">{o.amount || "Chờ báo giá"}</span>
                </div>
              </motion.button>
            );
          })}

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-sm">Không có đơn hàng nào</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PartnerOrders;
