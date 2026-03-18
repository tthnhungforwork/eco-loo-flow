import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerHeader from "./components/CustomerHeader";
import SegmentedControl from "@/components/SegmentedControl";
import StatusBadge from "@/components/StatusBadge";
import { Calendar, Star, Heart, ShoppingCart, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useOrders } from "@/contexts/OrderContext";
import { ORDER_STATUS_CONFIG } from "@/data/orderData";

const productOrders = [
  { id: "SP-001", name: "Nước rửa tay hữu cơ x10", date: "15/03/2026", amount: "850.000đ", status: "processing" },
  { id: "SP-002", name: "Giấy tái chế Eco x50", date: "08/03/2026", amount: "2.250.000đ", status: "done" },
];

const favorites = [
  { id: 1, name: "Bộ vệ sinh Eco Pro", price: "350.000đ", rating: 4.9 },
  { id: 2, name: "Bình khử mùi sinh học", price: "120.000đ", rating: 4.7 },
];

const statusLabel: Record<string, string> = { new: "Mới", processing: "Đang xử lý", done: "Hoàn thành", cancelled: "Đã hủy" };
const mainTabs = ["Đơn dịch vụ", "Đơn mua hàng", "Yêu thích"];

// Map order statuses to filter groups
const statusToFilter = (status: string) => {
  if (["cho_dieu_phoi", "cho_tiep_nhan"].includes(status)) return "new";
  if (["da_tiep_nhan", "dang_khao_sat", "da_bao_gia", "da_ky_hop_dong", "dang_thuc_hien", "cho_nghiem_thu"].includes(status)) return "processing";
  if (["hoan_thanh", "da_danh_gia"].includes(status)) return "done";
  if (status === "da_huy") return "cancelled";
  return "all";
};

const CustomerOrders = () => {
  const navigate = useNavigate();
  const [mainTab, setMainTab] = useState(0);
  const [statusFilter, setStatusFilter] = useState(0);

  const statusFilters = ["Tất cả", "Mới", "Đang xử lý", "Hoàn thành", "Hủy/Hoàn"];
  const statusKeys = ["all", "new", "processing", "done", "cancelled"];

  const filteredService = statusKeys[statusFilter] === "all"
    ? MOCK_CUSTOMER_ORDERS
    : MOCK_CUSTOMER_ORDERS.filter((o) => statusToFilter(o.status) === statusKeys[statusFilter]);

  const filteredProduct = statusKeys[statusFilter] === "all"
    ? productOrders
    : productOrders.filter((o) => o.status === statusKeys[statusFilter]);

  return (
    <div className="gradient-surface min-h-screen">
      <CustomerHeader title="Đơn hàng" />
      <div className="py-4">
        <SegmentedControl tabs={mainTabs} active={mainTab} onChange={setMainTab} />

        {mainTab < 2 && (
          <div className="px-4 mb-4 flex gap-2 overflow-x-auto scrollbar-hide">
            {statusFilters.map((s, i) => (
              <motion.button key={s} onClick={() => setStatusFilter(i)} className={`chip ${statusFilter === i ? "chip-active" : "chip-inactive"}`} whileTap={{ scale: 0.93 }}>
                {s}
              </motion.button>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div key={`${mainTab}-${statusFilter}`} className="px-4 space-y-3 pb-24" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>
            {mainTab === 0 && filteredService.map((o, i) => {
              const config = ORDER_STATUS_CONFIG[o.status];
              return (
                <motion.button
                  key={o.id}
                  className="w-full text-left glass-card rounded-2xl p-4 card-hover"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => navigate(`/customer/orders/${o.id}`)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1 mr-2">
                      <p className="font-bold text-sm text-foreground">{o.name}</p>
                      <p className="text-[11px] text-muted-foreground font-mono mt-0.5">#{o.id} · {o.partnerName || "Chờ điều phối"}</p>
                    </div>
                    <StatusBadge status={config.badgeStatus} label={config.label} />
                  </div>
                  <div className="flex justify-between items-center mt-3 pt-3 border-t border-border/30">
                    <span className="text-xs text-muted-foreground flex items-center gap-1.5"><Calendar size={12} />{o.createdAt}</span>
                    <span className="font-extrabold text-sm text-primary">{o.amount || "Chờ báo giá"}</span>
                  </div>
                </motion.button>
              );
            })}

            {mainTab === 1 && filteredProduct.map((o, i) => (
              <motion.div key={o.id} className="glass-card rounded-2xl p-4 card-hover" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1 mr-2">
                    <p className="font-bold text-sm text-foreground">{o.name}</p>
                    <p className="text-[11px] text-muted-foreground font-mono mt-0.5">#{o.id}</p>
                  </div>
                  <StatusBadge status={o.status} label={statusLabel[o.status]} />
                </div>
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-border/30">
                  <span className="text-xs text-muted-foreground flex items-center gap-1.5"><Calendar size={12} />{o.date}</span>
                  <span className="font-extrabold text-sm text-primary">{o.amount}</span>
                </div>
              </motion.div>
            ))}

            {mainTab === 2 && favorites.map((f, i) => (
              <motion.div key={f.id} className="glass-card rounded-2xl p-4 card-hover" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl gradient-mesh flex items-center justify-center relative noise-overlay">
                    <Package size={22} className="text-primary relative z-10" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-foreground">{f.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Star size={12} className="text-amber-500 fill-amber-500" />
                      <span className="text-xs text-foreground font-bold">{f.rating}</span>
                      <span className="text-sm font-extrabold text-primary ml-auto">{f.price}</span>
                    </div>
                  </div>
                  <motion.button whileTap={{ scale: 0.8 }}>
                    <Heart size={20} className="text-destructive fill-destructive shrink-0" />
                  </motion.button>
                </div>
              </motion.div>
            ))}

            {((mainTab === 0 && filteredService.length === 0) || (mainTab === 1 && filteredProduct.length === 0)) && (
              <motion.div className="text-center py-20" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted/60 flex items-center justify-center">
                  <ShoppingCart size={28} className="text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-sm font-medium">Không có đơn hàng nào</p>
                <p className="text-[11px] text-muted-foreground/60 mt-1">Thử thay đổi bộ lọc</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CustomerOrders;
