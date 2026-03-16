import MobileHeader from "@/components/MobileHeader";
import StatusBadge from "@/components/StatusBadge";
import { ShoppingBag, Wrench, BarChart3, TrendingUp, Users, Bath } from "lucide-react";
import { Button } from "@/components/ui/button";

const serviceOrders = [
  { id: "DV-101", name: "Vệ sinh NVS KTX Block A", client: "KTX Đại học X", status: "new" },
  { id: "DV-102", name: "Bảo trì thiết bị Tầng 3", client: "Công ty ABC", status: "new" },
];

const salesOrders = [
  { id: "BH-201", name: "Nước rửa tay Eco x100", client: "Đại lý Miền Nam", status: "new" },
];

const dashStats = [
  { label: "Tổng NVS", value: "1,245", icon: Bath, color: "bg-eco-green-light text-primary" },
  { label: "Đối tác", value: "89", icon: Users, color: "bg-eco-blue-light text-secondary" },
  { label: "Đơn tháng này", value: "342", icon: ShoppingBag, color: "bg-accent text-accent-foreground" },
  { label: "Doanh thu", value: "1.2 tỷ", icon: TrendingUp, color: "bg-eco-green-light text-primary" },
];

const monthlyData = [
  { month: "T1", value: 45 }, { month: "T2", value: 62 }, { month: "T3", value: 78 },
  { month: "T4", value: 55 }, { month: "T5", value: 85 }, { month: "T6", value: 92 },
];

const AdminHome = () => (
  <div>
    <MobileHeader title="Dashboard" />
    <div className="px-4 py-4 space-y-6 animate-fade-in">
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        {dashStats.map((s) => (
          <div key={s.label} className="bg-card rounded-xl border border-border p-4">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 ${s.color}`}>
              <s.icon size={20} />
            </div>
            <p className="text-xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Service Orders to dispatch */}
      <section>
        <h2 className="font-semibold text-base mb-3 flex items-center gap-2">
          <Wrench size={18} className="text-primary" />
          Đơn dịch vụ cần điều phối
        </h2>
        {serviceOrders.map((o) => (
          <div key={o.id} className="bg-card rounded-xl border border-border p-4 mb-3">
            <div className="flex justify-between items-start mb-1">
              <p className="font-medium text-sm text-foreground">{o.name}</p>
              <StatusBadge status={o.status} label="Mới" />
            </div>
            <p className="text-xs text-muted-foreground mb-3">{o.client} · #{o.id}</p>
            <Button size="sm" className="w-full touch-target font-medium">Điều phối</Button>
          </div>
        ))}
      </section>

      {/* Sales Orders */}
      <section>
        <h2 className="font-semibold text-base mb-3 flex items-center gap-2">
          <ShoppingBag size={18} className="text-secondary" />
          Đơn bán hàng cần điều phối
        </h2>
        {salesOrders.map((o) => (
          <div key={o.id} className="bg-card rounded-xl border border-border p-4 mb-3">
            <div className="flex justify-between items-start mb-1">
              <p className="font-medium text-sm text-foreground">{o.name}</p>
              <StatusBadge status={o.status} label="Mới" />
            </div>
            <p className="text-xs text-muted-foreground mb-3">{o.client} · #{o.id}</p>
            <Button size="sm" className="w-full touch-target font-medium">Điều phối</Button>
          </div>
        ))}
      </section>

      {/* Chart */}
      <section className="bg-card rounded-xl border border-border p-4">
        <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
          <BarChart3 size={16} className="text-primary" />
          Báo cáo tổng quan
        </h3>
        <div className="flex items-end justify-between gap-2 h-28">
          {monthlyData.map((d) => (
            <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
              <span className="text-[10px] font-medium text-muted-foreground">{d.value}</span>
              <div className="w-full bg-primary rounded-t-md" style={{ height: `${d.value}%` }} />
              <span className="text-[10px] text-muted-foreground">{d.month}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  </div>
);

export default AdminHome;
