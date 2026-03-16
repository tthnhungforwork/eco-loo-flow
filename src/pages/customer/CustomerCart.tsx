import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerHeader from "./components/CustomerHeader";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart, Trash2, Plus, Minus, Leaf, MapPin, Send
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface CartItem {
  id: number;
  name: string;
  price: number;
  priceLabel: string;
  qty: number;
}

const CustomerCart = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<CartItem[]>([
    { id: 1, name: "Nước rửa tay hữu cơ", price: 85000, priceLabel: "85.000đ", qty: 2 },
    { id: 2, name: "Giấy tái chế Eco", price: 45000, priceLabel: "45.000đ", qty: 5 },
    { id: 3, name: "Bình xịt khử mùi sinh học", price: 120000, priceLabel: "120.000đ", qty: 1 },
  ]);

  const updateQty = (id: number, delta: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleOrder = () => {
    toast.success("Đặt hàng thành công!", {
      description: "Đơn hàng của bạn đang được xử lý.",
    });
    navigate("/customer/orders");
  };

  return (
    <div className="gradient-surface min-h-screen">
      <CustomerHeader title="Giỏ hàng" />

      <div className="px-4 py-5 pb-40">
        {items.length === 0 ? (
          <motion.div className="text-center py-20" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted/60 flex items-center justify-center">
              <ShoppingCart size={28} className="text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm font-medium">Giỏ hàng trống</p>
            <p className="text-[11px] text-muted-foreground/60 mt-1">Khám phá Sản phẩm Xanh trên trang chủ</p>
            <Button
              variant="outline"
              className="mt-4 rounded-xl font-semibold text-primary"
              onClick={() => navigate("/customer")}
            >
              Quay lại trang chủ
            </Button>
          </motion.div>
        ) : (
          <div className="space-y-3">
            <AnimatePresence mode="popLayout">
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  className="glass-card rounded-2xl p-4"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ delay: i * 0.04 }}
                  layout
                >
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl gradient-mesh flex items-center justify-center noise-overlay relative shrink-0">
                      <Leaf size={20} className="text-primary relative z-10" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-foreground leading-tight line-clamp-1">{item.name}</p>
                      <p className="text-[13px] font-extrabold text-primary mt-1">{item.priceLabel}</p>
                    </div>
                    <motion.button whileTap={{ scale: 0.8 }} onClick={() => removeItem(item.id)}>
                      <Trash2 size={16} className="text-destructive" />
                    </motion.button>
                  </div>
                  <div className="flex items-center justify-end gap-3 mt-3 pt-3 border-t border-border/30">
                    <motion.button
                      className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center"
                      whileTap={{ scale: 0.85 }}
                      onClick={() => updateQty(item.id, -1)}
                    >
                      <Minus size={14} className="text-foreground" />
                    </motion.button>
                    <span className="text-sm font-bold text-foreground w-8 text-center">{item.qty}</span>
                    <motion.button
                      className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center"
                      whileTap={{ scale: 0.85 }}
                      onClick={() => updateQty(item.id, 1)}
                    >
                      <Plus size={14} className="text-primary-foreground" />
                    </motion.button>
                    <span className="text-sm font-extrabold text-foreground ml-2">
                      {(item.price * item.qty).toLocaleString("vi-VN")}đ
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Bottom checkout */}
      {items.length > 0 && (
        <div className="fixed bottom-20 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border/30 px-4 py-4 z-30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-muted-foreground">Tổng cộng ({items.reduce((s, i) => s + i.qty, 0)} sản phẩm)</span>
            <span className="text-lg font-black text-primary">{total.toLocaleString("vi-VN")}đ</span>
          </div>
          <Button
            className="w-full touch-target font-bold rounded-2xl gradient-primary border-0 shadow-glow h-14 text-primary-foreground gap-2"
            onClick={handleOrder}
          >
            <Send size={18} /> Đặt hàng
          </Button>
        </div>
      )}
    </div>
  );
};

export default CustomerCart;
