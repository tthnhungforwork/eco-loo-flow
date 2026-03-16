import MobileHeader from "@/components/MobileHeader";
import StatusBadge from "@/components/StatusBadge";
import { Recycle, Send, QrCode, Newspaper, ShoppingCart, Leaf, ArrowRight, Star, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  { icon: Recycle, label: "Vệ sinh", color: "bg-eco-green-light text-primary" },
  { icon: Leaf, label: "Khử mùi", color: "bg-accent text-accent-foreground" },
  { icon: QrCode, label: "Quét QR", color: "bg-eco-blue-light text-secondary" },
  { icon: CheckCircle2, label: "Bảo trì", color: "bg-muted text-muted-foreground" },
];

const tasks = [
  { id: 1, title: "Vệ sinh NVS Tầng 3 - Tòa A", status: "processing", date: "16/03/2026" },
  { id: 2, title: "Kiểm tra hệ thống nước NVS B2", status: "new", date: "17/03/2026" },
  { id: 3, title: "Bảo trì thiết bị NVS Sảnh C", status: "done", date: "15/03/2026" },
];

const statusLabel: Record<string, string> = { new: "Mới", processing: "Đang xử lý", done: "Hoàn thành" };

const news = [
  { id: 1, title: "Xu hướng nhà vệ sinh xanh 2026", img: "🌿" },
  { id: 2, title: "Công nghệ khử mùi mới nhất", img: "🔬" },
  { id: 3, title: "Tiêu chuẩn vệ sinh quốc tế", img: "🏆" },
];

const products = [
  { id: 1, name: "Nước rửa tay hữu cơ", price: "85.000đ", rating: 4.8 },
  { id: 2, name: "Giấy tái chế Eco", price: "45.000đ", rating: 4.5 },
  { id: 3, name: "Bình xịt khử mùi sinh học", price: "120.000đ", rating: 4.9 },
  { id: 4, name: "Túi rác tự phân hủy", price: "35.000đ", rating: 4.3 },
];

const CustomerHome = () => (
  <div>
    <MobileHeader />
    <div className="px-4 py-4 space-y-6 animate-fade-in">
      {/* Services Grid */}
      <section>
        <h2 className="font-semibold text-base mb-3">Dịch vụ</h2>
        <div className="grid grid-cols-4 gap-3">
          {services.map((s) => (
            <button key={s.label} className="flex flex-col items-center gap-1.5 touch-target">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.color}`}>
                <s.icon size={22} />
              </div>
              <span className="text-xs font-medium text-foreground">{s.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Send Ticket */}
      <Button className="w-full touch-target text-base font-semibold gap-2">
        <Send size={18} />
        Gửi Ticket hỗ trợ
      </Button>

      {/* Task Cards - Horizontal Scroll */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-base">Công việc NVS</h2>
          <button className="text-xs text-primary font-medium flex items-center gap-1">
            Xem tất cả <ArrowRight size={14} />
          </button>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {tasks.map((task) => (
            <div key={task.id} className="min-w-[260px] bg-card rounded-xl border border-border p-4 shrink-0">
              <div className="flex justify-between items-start mb-2">
                <p className="font-medium text-sm text-foreground leading-tight flex-1 mr-2">{task.title}</p>
                <StatusBadge status={task.status} label={statusLabel[task.status]} />
              </div>
              <p className="text-xs text-muted-foreground">{task.date}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Completed Services */}
      <section className="bg-card rounded-xl border border-border p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-eco-green-light rounded-xl flex items-center justify-center">
            <CheckCircle2 size={24} className="text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">128</p>
            <p className="text-xs text-muted-foreground">Dịch vụ đã thực hiện</p>
          </div>
        </div>
      </section>

      {/* Partner Banner */}
      <section className="bg-gradient-to-r from-primary to-eco-green-dark rounded-xl p-5 text-primary-foreground">
        <h3 className="font-bold text-base mb-1">Trở thành Đối tác</h3>
        <p className="text-sm opacity-90 mb-3">Đăng ký ngay để nhận nhiều ưu đãi hấp dẫn</p>
        <Button variant="secondary" size="sm" className="font-semibold">
          Đăng ký ngay
        </Button>
      </section>

      {/* Service Plans */}
      <section>
        <h2 className="font-semibold text-base mb-3">Gói dịch vụ</h2>
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="grid grid-cols-4 text-xs font-medium text-center border-b border-border">
            <div className="p-2.5 bg-muted">Quyền lợi</div>
            <div className="p-2.5 text-muted-foreground">Cơ bản</div>
            <div className="p-2.5 text-primary font-bold bg-eco-green-light">Nâng cao</div>
            <div className="p-2.5 text-muted-foreground">VIP</div>
          </div>
          {["Vệ sinh định kỳ", "Khử mùi", "Bảo trì thiết bị", "Báo cáo chi tiết"].map((item, i) => (
            <div key={item} className="grid grid-cols-4 text-xs text-center border-b border-border last:border-0">
              <div className="p-2.5 text-left text-foreground font-medium">{item}</div>
              <div className="p-2.5">{i < 2 ? "✓" : "—"}</div>
              <div className="p-2.5 bg-eco-green-light font-bold">✓</div>
              <div className="p-2.5">✓</div>
            </div>
          ))}
        </div>
      </section>

      {/* News - Horizontal */}
      <section>
        <h2 className="font-semibold text-base mb-3">Tin tức</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
          {news.map((n) => (
            <div key={n.id} className="min-w-[200px] bg-card rounded-xl border border-border overflow-hidden shrink-0">
              <div className="h-24 bg-eco-green-light flex items-center justify-center text-3xl">{n.img}</div>
              <p className="p-3 text-sm font-medium text-foreground leading-tight">{n.title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Green Products */}
      <section>
        <h2 className="font-semibold text-base mb-3">Sản phẩm Xanh</h2>
        <div className="grid grid-cols-2 gap-3">
          {products.map((p) => (
            <div key={p.id} className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="h-28 bg-eco-green-light flex items-center justify-center">
                <Leaf size={32} className="text-primary" />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-foreground mb-1 leading-tight">{p.name}</p>
                <div className="flex items-center gap-1 mb-2">
                  <Star size={12} className="text-eco-orange fill-eco-orange" />
                  <span className="text-xs text-muted-foreground">{p.rating}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-primary">{p.price}</span>
                  <button className="w-8 h-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
                    <ShoppingCart size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-3 touch-target font-medium">
          Xem thêm sản phẩm
        </Button>
      </section>
    </div>
  </div>
);

export default CustomerHome;
