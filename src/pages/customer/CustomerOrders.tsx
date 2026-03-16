import { useState } from "react";
import MobileHeader from "@/components/MobileHeader";
import SegmentedControl from "@/components/SegmentedControl";
import StatusBadge from "@/components/StatusBadge";
import { Calendar, Building2, Star, Heart, ShoppingCart, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const serviceOrders = [
  { id: "DH-001", name: "Gói vệ sinh tháng 3", date: "16/03/2026", amount: "2.500.000đ", status: "processing", partner: "Eco Clean" },
  { id: "DH-002", name: "Tư vấn số hóa NVS", date: "14/03/2026", amount: "Miễn phí", status: "new", partner: "Chờ điều phối" },
  { id: "DH-003", name: "Bảo trì thiết bị Q1", date: "10/03/2026", amount: "5.000.000đ", status: "done", partner: "Green Tech" },
  { id: "DH-004", name: "Dịch vụ VSLD Block A", date: "05/03/2026", amount: "3.200.000đ", status: "cancelled", partner: "Eco Clean" },
];

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

const CustomerOrders = () => {
  const [mainTab, setMainTab] = useState(0);
  const [statusFilter, setStatusFilter] = useState(0);
  const statusFilters = ["Tất cả", "Mới", "Đang xử lý", "Hoàn thành", "Hủy/Hoàn"];
  const statusKeys = ["all", "new", "processing", "done", "cancelled"];

  const filteredService = statusKeys[statusFilter] === "all" ? serviceOrders : serviceOrders.filter((o) => o.status === statusKeys[statusFilter]);
  const filteredProduct = statusKeys[statusFilter] === "all" ? productOrders : productOrders.filter((o) => o.status === statusKeys[statusFilter]);

  return (
    <div>
      <MobileHeader title="Đơn hàng" />
      <div className="py-4">
        <SegmentedControl tabs={mainTabs} active={mainTab} onChange={setMainTab} />

        {mainTab < 2 && (
          <div className="px-4 mb-4 flex gap-2 overflow-x-auto scrollbar-hide">
            {statusFilters.map((s, i) => (
              <button key={s} onClick={() => setStatusFilter(i)} className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${statusFilter === i ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>{s}</button>
            ))}
          </div>
        )}

        <div className="px-4 space-y-3">
          {mainTab === 0 && filteredService.map((o, i) => (
            <motion.div key={o.id} className="glass-card rounded-2xl p-4 card-hover" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1 mr-2">
                  <p className="font-bold text-sm text-foreground">{o.name}</p>
                  <p className="text-[11px] text-muted-foreground font-mono mt-0.5">#{o.id} · {o.partner}</p>
                </div>
                <StatusBadge status={o.status} label={statusLabel[o.status]} />
              </div>
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-border/50">
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar size={12} />{o.date}</span>
                <span className="font-extrabold text-sm text-primary">{o.amount}</span>
              </div>
              {o.status === "done" && (
                <Button size="sm" variant="outline" className="w-full mt-3 rounded-xl font-semibold gap-1 border-primary/20 text-primary">
                  <Star size={14} /> Đánh giá dịch vụ
                </Button>
              )}
            </motion.div>
          ))}

          {mainTab === 1 && filteredProduct.map((o, i) => (
            <motion.div key={o.id} className="glass-card rounded-2xl p-4 card-hover" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1 mr-2">
                  <p className="font-bold text-sm text-foreground">{o.name}</p>
                  <p className="text-[11px] text-muted-foreground font-mono mt-0.5">#{o.id}</p>
                </div>
                <StatusBadge status={o.status} label={statusLabel[o.status]} />
              </div>
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-border/50">
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar size={12} />{o.date}</span>
                <span className="font-extrabold text-sm text-primary">{o.amount}</span>
              </div>
            </motion.div>
          ))}

          {mainTab === 2 && favorites.map((f, i) => (
            <motion.div key={f.id} className="glass-card rounded-2xl p-4 card-hover" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl gradient-mesh flex items-center justify-center">
                  <Package size={20} className="text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-sm text-foreground">{f.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Star size={12} className="text-eco-orange fill-eco-orange" />
                    <span className="text-xs text-foreground font-bold">{f.rating}</span>
                    <span className="text-sm font-extrabold text-primary ml-auto">{f.price}</span>
                  </div>
                </div>
                <Heart size={18} className="text-destructive fill-destructive shrink-0" />
              </div>
            </motion.div>
          ))}

          {((mainTab === 0 && filteredService.length === 0) || (mainTab === 1 && filteredProduct.length === 0)) && (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-muted flex items-center justify-center"><ShoppingCart size={28} className="text-muted-foreground" /></div>
              <p className="text-muted-foreground text-sm font-medium">Không có đơn hàng nào</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerOrders;
