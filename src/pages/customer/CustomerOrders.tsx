import { useState } from "react";
import MobileHeader from "@/components/MobileHeader";
import SegmentedControl from "@/components/SegmentedControl";
import StatusBadge from "@/components/StatusBadge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar, Star, Heart, ShoppingCart, Package,
  Send, Image as ImageIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const serviceOrders = [
  { id: "DH-001", name: "Gói vệ sinh tháng 3", date: "16/03/2026", amount: "2.500.000đ", status: "processing", partner: "Eco Clean", type: "VSLD" },
  { id: "DH-002", name: "Tư vấn số hóa NVS", date: "14/03/2026", amount: "Miễn phí", status: "new", partner: "Chờ điều phối", type: "Tư vấn" },
  { id: "DH-003", name: "Bảo trì thiết bị Q1", date: "10/03/2026", amount: "5.000.000đ", status: "done", partner: "Green Tech", type: "SCBD" },
  { id: "DH-004", name: "Dịch vụ VSLD Block A", date: "05/03/2026", amount: "3.200.000đ", status: "cancelled", partner: "Eco Clean", type: "VSLD" },
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
  const [showRate, setShowRate] = useState<string | null>(null);
  const [rating, setRating] = useState(5);
  const [rateContent, setRateContent] = useState("");

  const statusFilters = ["Tất cả", "Mới", "Đang xử lý", "Hoàn thành", "Hủy/Hoàn"];
  const statusKeys = ["all", "new", "processing", "done", "cancelled"];

  const filteredService = statusKeys[statusFilter] === "all" ? serviceOrders : serviceOrders.filter((o) => o.status === statusKeys[statusFilter]);
  const filteredProduct = statusKeys[statusFilter] === "all" ? productOrders : productOrders.filter((o) => o.status === statusKeys[statusFilter]);

  const handleRate = () => {
    setShowRate(null);
    setRating(5);
    setRateContent("");
  };

  return (
    <div className="gradient-surface min-h-screen">
      <MobileHeader title="Đơn hàng" />
      <div className="py-4">
        <SegmentedControl tabs={mainTabs} active={mainTab} onChange={setMainTab} />

        {mainTab < 2 && (
          <div className="px-4 mb-4 flex gap-2 overflow-x-auto scrollbar-hide">
            {statusFilters.map((s, i) => (
              <motion.button
                key={s}
                onClick={() => setStatusFilter(i)}
                className={`chip ${statusFilter === i ? "chip-active" : "chip-inactive"}`}
                whileTap={{ scale: 0.93 }}
              >
                {s}
              </motion.button>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={`${mainTab}-${statusFilter}`}
            className="px-4 space-y-3 pb-24"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {mainTab === 0 && filteredService.map((o, i) => (
              <motion.div
                key={o.id}
                className="glass-card rounded-2xl p-4 card-hover"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1 mr-2">
                    <p className="font-bold text-sm text-foreground">{o.name}</p>
                    <p className="text-[11px] text-muted-foreground font-mono mt-0.5">#{o.id} · {o.partner}</p>
                  </div>
                  <StatusBadge status={o.status} label={statusLabel[o.status]} />
                </div>
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-border/30">
                  <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Calendar size={12} />{o.date}
                  </span>
                  <span className="font-extrabold text-sm text-primary">{o.amount}</span>
                </div>
                {o.status === "done" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full mt-3 rounded-xl font-semibold gap-1.5 border-primary/15 text-primary hover:bg-accent/50"
                    onClick={() => setShowRate(o.id)}
                  >
                    <Star size={14} /> Đánh giá dịch vụ
                  </Button>
                )}
              </motion.div>
            ))}

            {mainTab === 1 && filteredProduct.map((o, i) => (
              <motion.div
                key={o.id}
                className="glass-card rounded-2xl p-4 card-hover"
                initial={{ opacity: 0, y: 14 }}
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
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-border/30">
                  <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Calendar size={12} />{o.date}
                  </span>
                  <span className="font-extrabold text-sm text-primary">{o.amount}</span>
                </div>
              </motion.div>
            ))}

            {mainTab === 2 && favorites.map((f, i) => (
              <motion.div
                key={f.id}
                className="glass-card rounded-2xl p-4 card-hover"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-2xl gradient-mesh flex items-center justify-center relative noise-overlay">
                    <Package size={22} className="text-primary relative z-10" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm text-foreground">{f.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Star size={12} className="text-eco-orange fill-eco-orange" />
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



      <Sheet open={!!showRate} onOpenChange={() => setShowRate(null)}>
        <SheetContent side="bottom" className="rounded-t-3xl max-h-[85vh] overflow-y-auto px-5 pb-8">
          <SheetHeader className="pb-4">
            <SheetTitle className="text-base text-left">Đánh giá dịch vụ</SheetTitle>
          </SheetHeader>

          <div className="space-y-4">
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground mb-3">Bạn đánh giá chất lượng dịch vụ thế nào?</p>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <motion.button
                    key={s}
                    onClick={() => setRating(s)}
                    whileTap={{ scale: 0.8, rotate: -15 }}
                    className="p-1"
                  >
                    <Star
                      size={32}
                      className={s <= rating ? "text-eco-orange fill-eco-orange" : "text-muted-foreground/30"}
                    />
                  </motion.button>
                ))}
              </div>
              <p className="text-lg font-bold text-foreground mt-2">{rating}/5</p>
            </div>

            <div>
              <label className="text-[12px] font-bold text-foreground mb-1.5 block">Nhận xét</label>
              <Textarea
                placeholder="Chia sẻ trải nghiệm của bạn..."
                className="rounded-xl min-h-[80px]"
                value={rateContent}
                onChange={(e) => setRateContent(e.target.value)}
              />
            </div>

            <Button variant="outline" className="w-full rounded-xl gap-2 font-semibold border-dashed">
              <ImageIcon size={16} /> Đính kèm hình ảnh
            </Button>

            <Button
              className="w-full touch-target font-bold rounded-2xl gradient-primary border-0 shadow-glow h-14 text-primary-foreground gap-2"
              onClick={handleRate}
            >
              <Send size={18} /> Gửi đánh giá
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CustomerOrders;
