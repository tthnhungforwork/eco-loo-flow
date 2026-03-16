import { useNavigate } from "react-router-dom";
import PartnerHeader from "./components/PartnerHeader";
import {
  ArrowRight, Leaf, ShoppingCart, Star, Newspaper, Crown,
  ChevronRight, ChevronDown, Bath, Calendar, Clock,
  CheckCircle2, Package, ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import StatusBadge from "@/components/StatusBadge";
import { MOCK_PARTNER_ORDERS, ORDER_STATUS_CONFIG } from "@/data/orderData";

// Mock tasks for NVS carousel
const nvsTasksMock = [
  { id: 1, nvs: "NVS Tầng 3 - Tòa A", task: "Vệ sinh tổng hợp", time: "08:00", status: "processing", assignee: "Trần Văn A" },
  { id: 2, nvs: "NVS Sảnh B - KTX", task: "Kiểm tra vật tư", time: "10:30", status: "new", assignee: "Lê Thị B" },
  { id: 3, nvs: "NVS Tầng 1 - Tòa C", task: "Thay bộ lọc", time: "14:00", status: "done", assignee: "Phạm Văn C" },
  { id: 4, nvs: "NVS Eco Park", task: "Khử mùi", time: "16:00", status: "new", assignee: "Tôi" },
];

const taskStatusLabel: Record<string, string> = { new: "Mới", processing: "Đang làm", done: "Xong" };
const taskStatusColor: Record<string, string> = { new: "new", processing: "processing", done: "done" };

// Services already performed
const performedServices = [
  { label: "Vệ sinh lau dọn", count: 45, icon: "🧹" },
  { label: "Sửa chữa bảo dưỡng", count: 23, icon: "🔧" },
  { label: "Tư vấn số hóa", count: 8, icon: "💡" },
  { label: "Netzero", count: 3, icon: "♻️" },
];

const servicePlans = [
  {
    name: "Cơ bản", price: "Miễn phí", features: ["Tiếp nhận đơn hàng", "Quản lý 5 NVS", "Báo cáo cơ bản"],
    limits: ["Không ưu tiên điều phối", "Không có đào tạo"], popular: false, current: false,
  },
  {
    name: "Nâng cao", price: "1.5M/tháng", features: ["Không giới hạn đơn", "Quản lý 20 NVS", "Báo cáo chi tiết", "Ưu tiên điều phối"],
    limits: ["Không hỗ trợ 24/7"], popular: true, current: true,
  },
  {
    name: "VIP", price: "3M/tháng", features: ["Toàn bộ quyền lợi", "Ưu tiên điều phối cao nhất", "Hỗ trợ 24/7", "Đào tạo miễn phí", "Branding trên app"],
    limits: [], popular: false, current: false,
  },
];

const newsList = [
  { id: 1, title: "Tuyển đối tác vệ sinh khu vực Q.7", emoji: "📢", tag: "Tuyển dụng", date: "15/03" },
  { id: 2, title: "Xu hướng NVS xanh 2026", emoji: "🌿", tag: "Tin tức", date: "14/03" },
  { id: 3, title: "Hoa hồng mới T4/2026", emoji: "💰", tag: "Thông báo", date: "12/03" },
];

const greenProducts = [
  { id: 1, name: "Bộ vệ sinh Eco Pro", price: "350.000đ", rating: 4.9, sold: 456, img: "🧴" },
  { id: 2, name: "Bình khử mùi sinh học", price: "120.000đ", rating: 4.7, sold: 234, img: "🌸" },
  { id: 3, name: "Nước rửa tay hữu cơ", price: "85.000đ", rating: 4.8, sold: 789, img: "🫧" },
  { id: 4, name: "Giấy tái chế Eco", price: "45.000đ", rating: 4.5, sold: 1200, img: "📃" },
  { id: 5, name: "Túi rác phân hủy sinh học", price: "65.000đ", rating: 4.6, sold: 890, img: "♻️" },
  { id: 6, name: "Chế phẩm vi sinh", price: "250.000đ", rating: 4.9, sold: 345, img: "🧪" },
];

const stagger = {
  container: { hidden: {}, show: { transition: { staggerChildren: 0.06 } } },
  item: { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.35 } } },
};

const PartnerHome = () => {
  const navigate = useNavigate();
  const [showMoreProducts, setShowMoreProducts] = useState(false);
  const displayProducts = showMoreProducts ? greenProducts : greenProducts.slice(0, 4);

  const recentOrders = MOCK_PARTNER_ORDERS.slice(0, 3);

  return (
    <div className="min-h-screen">
      <PartnerHeader showSwitcher />

      {/* Hero */}
      <div className="bg-primary px-4 pb-8 pt-3 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="orb w-32 h-32 bg-primary-foreground/20 -top-10 -right-10" />
          <div className="orb w-24 h-24 bg-primary-foreground/10 bottom-0 left-10" style={{ animationDelay: "2s" }} />
        </div>
        <motion.div
          className="relative z-10 bg-primary-foreground/12 backdrop-blur-lg rounded-2xl p-4 border border-primary-foreground/10"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-primary-foreground/70 text-xs font-medium">Tổng quan đối tác</p>
            <ChevronRight size={14} className="text-primary-foreground/50" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center">
              <p className="text-xl font-black text-primary-foreground">12</p>
              <p className="text-[10px] text-primary-foreground/60 font-medium">Đơn tiếp nhận</p>
            </div>
            <div className="text-center border-x border-primary-foreground/10">
              <p className="text-xl font-black text-primary-foreground">8</p>
              <p className="text-[10px] text-primary-foreground/60 font-medium">NVS quản lý</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-black text-primary-foreground">15M</p>
              <p className="text-[10px] text-primary-foreground/60 font-medium">Doanh thu</p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div className="px-4 -mt-4 relative z-10 space-y-5 pb-28" variants={stagger.container} initial="hidden" animate="show">
        {/* 1. Danh sách đơn hàng */}
        <motion.section variants={stagger.item}>
          <div className="bg-card rounded-2xl shadow-elevated overflow-hidden">
            <div className="flex items-center justify-between px-4 pt-4 pb-2">
              <h2 className="font-bold text-sm text-foreground flex items-center gap-2">
                <Package size={16} className="text-primary" /> Đơn hàng gần đây
              </h2>
              <button onClick={() => navigate("/partner/orders")} className="text-xs text-primary font-semibold flex items-center gap-0.5">
                Tất cả <ArrowRight size={14} />
              </button>
            </div>
            <div className="px-4 pb-4 space-y-2">
              {recentOrders.map((o) => {
                const config = ORDER_STATUS_CONFIG[o.status];
                return (
                  <motion.button
                    key={o.id}
                    className="w-full text-left rounded-xl bg-muted/40 p-3 flex items-center gap-3"
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(`/partner/orders/${o.id}`)}
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-foreground truncate">{o.name}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">#{o.id} · {o.customerName}</p>
                    </div>
                    <StatusBadge status={config.badgeStatus} label={config.label} />
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.section>

        {/* 2. Công việc NVS (lướt ngang) */}
        <motion.section variants={stagger.item}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-sm text-foreground flex items-center gap-2">
              <Bath size={16} className="text-primary" /> Công việc NVS hôm nay
            </h2>
            <button onClick={() => navigate("/partner/tasks")} className="text-xs text-primary font-semibold flex items-center gap-0.5">
              Tất cả <ArrowRight size={14} />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto -mx-4 px-4 snap-x snap-mandatory scrollbar-hide pb-1">
            {nvsTasksMock.map((t) => (
              <motion.div
                key={t.id}
                className="min-w-[240px] bg-card rounded-2xl p-4 shrink-0 snap-start shadow-card border border-border/30"
                whileTap={{ scale: 0.97 }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-[12px] font-bold text-foreground truncate">{t.nvs}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{t.task}</p>
                  </div>
                  <StatusBadge status={taskStatusColor[t.status]} label={taskStatusLabel[t.status]} />
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/30">
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Clock size={10} /> {t.time}
                  </span>
                  <span className="text-[10px] font-semibold text-foreground">{t.assignee}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 3. Dịch vụ đã thực hiện */}
        <motion.section variants={stagger.item}>
          <h2 className="font-bold text-sm text-foreground flex items-center gap-2 mb-3">
            <CheckCircle2 size={16} className="text-primary" /> Dịch vụ đã thực hiện
          </h2>
          <div className="grid grid-cols-2 gap-2.5">
            {performedServices.map((s) => (
              <div key={s.label} className="bg-card rounded-2xl p-3.5 shadow-card border border-border/30 flex items-center gap-3">
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <p className="text-lg font-black text-primary">{s.count}</p>
                  <p className="text-[10px] text-muted-foreground leading-tight">{s.label}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>


        {/* 5. Tin tức (lướt ngang) */}
        <motion.section variants={stagger.item}>
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-sm text-foreground flex items-center gap-2">
              <Newspaper size={16} className="text-primary" /> Tin tức
            </h2>
            <button className="text-xs text-primary font-semibold flex items-center gap-0.5">Tất cả <ArrowRight size={14} /></button>
          </div>
          <div className="flex gap-3 overflow-x-auto -mx-4 px-4 snap-x scrollbar-hide pb-1">
            {newsList.map((n) => (
              <motion.div key={n.id} className="min-w-[160px] bg-card rounded-2xl overflow-hidden shrink-0 snap-start shadow-card border border-border/30 card-hover" whileTap={{ scale: 0.97 }}>
                <div className="h-20 gradient-mesh-hero flex items-center justify-center text-2xl noise-overlay relative">
                  <span className="relative z-10">{n.emoji}</span>
                </div>
                <div className="p-2.5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[8px] font-bold uppercase tracking-widest text-primary">{n.tag}</span>
                    <span className="text-[9px] text-muted-foreground flex items-center gap-0.5"><Calendar size={8} />{n.date}</span>
                  </div>
                  <p className="text-[12px] font-semibold text-foreground leading-tight">{n.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* 6. Sản phẩm Xanh (load more) */}
        <motion.section variants={stagger.item}>
          <div className="flex justify-between items-center mb-3">
            <h2 className="font-bold text-sm text-foreground flex items-center gap-1.5">
              <Leaf size={16} className="text-primary" /> Sản phẩm Xanh
            </h2>
            <button className="text-xs text-primary font-semibold flex items-center gap-0.5">Tất cả <ArrowRight size={14} /></button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {displayProducts.map((p, i) => (
              <motion.div
                key={p.id}
                className="bg-card rounded-2xl overflow-hidden shadow-card border border-border/30 card-hover"
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + i * 0.04 }}
              >
                <div className="h-20 bg-muted/50 flex items-center justify-center">
                  <span className="text-3xl">{p.img}</span>
                </div>
                <div className="p-2.5">
                  <p className="text-[12px] font-semibold text-foreground mb-1 leading-tight">{p.name}</p>
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Star size={10} className="text-amber-500 fill-amber-500" />
                    <span className="text-[10px] font-bold text-foreground">{p.rating}</span>
                    <span className="text-[9px] text-muted-foreground">· Đã bán {p.sold}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-extrabold text-primary">{p.price}</span>
                    <motion.button
                      whileTap={{ scale: 0.8 }}
                      className="w-7 h-7 rounded-lg gradient-primary text-primary-foreground flex items-center justify-center"
                    >
                      <ShoppingCart size={13} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {!showMoreProducts && greenProducts.length > 4 && (
            <Button
              variant="outline"
              onClick={() => setShowMoreProducts(true)}
              className="w-full mt-4 h-11 font-semibold rounded-2xl border border-border/40 text-primary"
            >
              Xem thêm sản phẩm
            </Button>
          )}
        </motion.section>
      </motion.div>
    </div>
  );
};

export default PartnerHome;
