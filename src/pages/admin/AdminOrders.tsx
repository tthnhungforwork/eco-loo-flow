import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "./components/AdminHeader";
import StatusBadge from "@/components/StatusBadge";
import { Calendar, Building2, Search, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useOrders } from "@/contexts/OrderContext";
import { ORDER_STATUS_CONFIG, SERVICE_TYPE_CONFIG } from "@/data/orderData";

const statusToFilter = (status: string) => {
  if (["cho_dieu_phoi"].includes(status)) return "dispatch";
  if (["cho_tiep_nhan", "da_tiep_nhan", "dang_khao_sat", "da_bao_gia", "da_duyet_bao_gia", "da_ky_hop_dong", "dang_thuc_hien", "cho_nghiem_thu"].includes(status)) return "processing";
  if (["hoan_thanh", "cho_thanh_ly", "da_thanh_ly", "da_danh_gia"].includes(status)) return "done";
  if (status === "da_huy") return "cancelled";
  return "all";
};

const tabs = ["Tất cả", "Cần điều phối", "Đang xử lý", "Hoàn thành"];
const tabStatus = ["all", "dispatch", "processing", "done"];

const AdminOrders = () => {
  const navigate = useNavigate();
  const { getAdminOrders } = useOrders();
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");

  const adminOrders = getAdminOrders();
  const filtered = adminOrders
    .filter((o) => tabStatus[tab] === "all" || statusToFilter(o.status) === tabStatus[tab])
    .filter((o) => o.name.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase()));

  const dispatchCount = adminOrders.filter((o) => o.status === "cho_dieu_phoi").length;

  return (
    <div>
      <AdminHeader title="Đơn hàng" />
      <div className="py-4">
        <div className="px-4 mb-4 relative">
          <Search size={16} className="absolute left-7 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Tìm đơn hàng..." className="pl-9 rounded-xl bg-card/80 border-border/50" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className="px-4 mb-4 flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {tabs.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all relative ${
                tab === i ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {t}
              {i === 1 && dispatchCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-[9px] text-primary-foreground font-bold flex items-center justify-center">
                  {dispatchCount}
                </span>
              )}
            </button>
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
                onClick={() => navigate(`/admin/orders/${o.id}`)}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="flex-1 mr-2">
                    <p className="font-bold text-sm text-foreground">{o.name}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] text-muted-foreground font-mono">#{o.id}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        {o.typeLabel}
                      </span>
                    </div>
                  </div>
                  <StatusBadge status={config.badgeStatus} label={config.label} />
                </div>
                <div className="flex justify-between items-center mt-2 pt-2 border-t border-border/50">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Building2 size={12} />{o.customerName}</span>
                    <span className="flex items-center gap-1"><Calendar size={12} />{o.createdAt}</span>
                  </div>
                </div>
                {o.partnerName && (
                  <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
                    <Users size={12} /> Đối tác: <span className="font-semibold text-foreground">{o.partnerName}</span>
                  </p>
                )}
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

export default AdminOrders;
