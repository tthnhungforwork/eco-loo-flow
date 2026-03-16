import MobileHeader from "@/components/MobileHeader";
import { MapPin, QrCode, Settings, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const toilets = [
  { id: 1, name: "NVS Tầng 3 - Tòa A", address: "123 Nguyễn Huệ, Q.1, TP.HCM", status: "active", qr: "NVS-A3-001" },
  { id: 2, name: "NVS Sảnh B - KTX", address: "456 Lê Lợi, Q.3, TP.HCM", status: "maintenance", qr: "NVS-B1-002" },
  { id: 3, name: "NVS Tầng 1 - Tòa C", address: "789 Trần Hưng Đạo, Q.5", status: "active", qr: "NVS-C1-003" },
  { id: 4, name: "NVS Eco Park", address: "Eco Park, Long Biên, HN", status: "active", qr: "NVS-EP-004" },
];

const statusMap: Record<string, { label: string; class: string }> = {
  active: { label: "Hoạt động", class: "bg-eco-green-light text-primary" },
  maintenance: { label: "Bảo trì", class: "bg-muted text-muted-foreground" },
};

const AdminToilets = () => (
  <div>
    <MobileHeader title="QL Nhà vệ sinh" />
    <div className="px-4 py-4 animate-fade-in">
      <Button className="w-full touch-target font-semibold gap-2 mb-4">
        <Plus size={18} />
        Thêm nhà vệ sinh
      </Button>
      <div className="space-y-3">
        {toilets.map((t) => (
          <div key={t.id} className="bg-card rounded-xl border border-border p-4">
            <div className="flex gap-3">
              <div className="w-14 h-14 bg-eco-green-light rounded-xl flex items-center justify-center shrink-0">
                <QrCode size={24} className="text-primary" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="font-semibold text-sm text-foreground">{t.name}</p>
                  <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${statusMap[t.status].class}`}>
                    {statusMap[t.status].label}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><MapPin size={12} />{t.address}</p>
                <p className="text-xs text-muted-foreground mt-0.5">QR: {t.qr}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <Button size="sm" variant="outline" className="flex-1 touch-target font-medium gap-1">
                <Settings size={14} />Cấu hình
              </Button>
              <Button size="sm" className="flex-1 touch-target font-medium gap-1">
                <QrCode size={14} />Quét QR
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default AdminToilets;
