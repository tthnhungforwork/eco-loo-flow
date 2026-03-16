import MobileHeader from "@/components/MobileHeader";
import StatusBadge from "@/components/StatusBadge";
import { ArrowRight, CheckCircle2, Leaf, ShoppingCart, Star, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";

const orders = [
  { id: "PDH-001", name: "Đơn vệ sinh NVS Tầng 5", client: "Công ty ABC", status: "new" },
  { id: "PDH-002", name: "Đơn bảo trì hệ thống", client: "KTX Đại học X", status: "processing" },
];

const tasks = [
  { id: 1, title: "Lắp đặt thiết bị NVS mới", status: "new", date: "18/03/2026" },
  { id: 2, title: "Vệ sinh định kỳ Block C", status: "processing", date: "16/03/2026" },
  { id: 3, title: "Kiểm tra chất lượng nước", status: "done", date: "15/03/2026" },
];

const statusLabel: Record<string, string> = { new: "Mới", processing: "Đang xử lý", done: "Hoàn thành" };

const PartnerHome = () => (
  <div>
    <MobileHeader />
    <div className="px-4 py-4 space-y-6 animate-fade-in">
      {/* Orders */}
      <section>
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-semibold text-base">Đơn hàng mới</h2>
          <button className="text-xs text-primary font-medium flex items-center gap-1">Xem tất cả <ArrowRight size={14} /></button>
        </div>
        {orders.map((o) => (
          <div key={o.id} className="bg-card rounded-xl border border-border p-4 mb-3">
            <div className="flex justify-between items-start mb-1">
              <p className="font-medium text-sm text-foreground">{o.name}</p>
              <StatusBadge status={o.status} label={statusLabel[o.status]} />
            </div>
            <p className="text-xs text-muted-foreground">{o.client} · #{o.id}</p>
            <Button size="sm" className="w-full mt-3 touch-target font-medium">Điều phối</Button>
          </div>
        ))}
      </section>

      {/* Tasks Horizontal */}
      <section>
        <h2 className="font-semibold text-base mb-3">Công việc NVS</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
          {tasks.map((t) => (
            <div key={t.id} className="min-w-[240px] bg-card rounded-xl border border-border p-4 shrink-0">
              <div className="flex justify-between items-start mb-2">
                <p className="font-medium text-sm text-foreground flex-1 mr-2">{t.title}</p>
                <StatusBadge status={t.status} label={statusLabel[t.status]} />
              </div>
              <p className="text-xs text-muted-foreground">{t.date}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Completed */}
      <section className="bg-card rounded-xl border border-border p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-eco-green-light rounded-xl flex items-center justify-center">
            <CheckCircle2 size={24} className="text-primary" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">256</p>
            <p className="text-xs text-muted-foreground">Dịch vụ đã thực hiện</p>
          </div>
        </div>
      </section>

      {/* Agent Banner */}
      <section className="bg-gradient-to-r from-secondary to-eco-blue rounded-xl p-5 text-secondary-foreground">
        <div className="flex items-center gap-2 mb-1">
          <Megaphone size={20} />
          <h3 className="font-bold text-base">Trở thành Đại lý</h3>
        </div>
        <p className="text-sm opacity-90 mb-3">Bán hàng dropshipping, nhận hoa hồng hấp dẫn</p>
        <Button variant="secondary" size="sm" className="font-semibold bg-card text-foreground">
          Đăng ký
        </Button>
      </section>

      {/* Service Plans */}
      <section>
        <h2 className="font-semibold text-base mb-3">Gói dịch vụ</h2>
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="grid grid-cols-3 text-xs font-medium text-center border-b border-border">
            <div className="p-2.5 bg-muted text-left">Quyền lợi</div>
            <div className="p-2.5 text-primary font-bold bg-eco-green-light">Đối tác</div>
            <div className="p-2.5 text-muted-foreground">Đại lý</div>
          </div>
          {["Nhận đơn hàng", "Quản lý nhân viên", "Bán hàng", "Hoa hồng cao"].map((item, i) => (
            <div key={item} className="grid grid-cols-3 text-xs text-center border-b border-border last:border-0">
              <div className="p-2.5 text-left text-foreground font-medium">{item}</div>
              <div className="p-2.5 bg-eco-green-light">{i < 3 ? "✓" : "—"}</div>
              <div className="p-2.5">✓</div>
            </div>
          ))}
        </div>
      </section>

      {/* Products */}
      <section>
        <h2 className="font-semibold text-base mb-3">Sản phẩm Xanh</h2>
        <div className="grid grid-cols-2 gap-3">
          {[
            { name: "Bộ vệ sinh Eco Pro", price: "350.000đ", rating: 4.9 },
            { name: "Bình khử mùi sinh học", price: "120.000đ", rating: 4.7 },
          ].map((p) => (
            <div key={p.name} className="bg-card rounded-xl border border-border overflow-hidden">
              <div className="h-24 bg-eco-green-light flex items-center justify-center">
                <Leaf size={28} className="text-primary" />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-foreground mb-1">{p.name}</p>
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
      </section>
    </div>
  </div>
);

export default PartnerHome;
