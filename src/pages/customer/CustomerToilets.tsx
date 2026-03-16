import MobileHeader from "@/components/MobileHeader";
import { MapPin, QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";

const toilets = [
  { id: 1, name: "NVS Tầng 3 - Tòa A", address: "123 Nguyễn Huệ, Q.1, TP.HCM", qr: "NVS-A3-001" },
  { id: 2, name: "NVS Sảnh B - KTX", address: "456 Lê Lợi, Q.3, TP.HCM", qr: "NVS-B1-002" },
  { id: 3, name: "NVS Tầng 1 - Tòa C", address: "789 Trần Hưng Đạo, Q.5, TP.HCM", qr: "NVS-C1-003" },
  { id: 4, name: "NVS Công viên Eco Park", address: "Eco Park, Long Biên, Hà Nội", qr: "NVS-EP-004" },
];

const CustomerToilets = () => (
  <div>
    <MobileHeader title="Nhà vệ sinh" />
    <div className="px-4 py-4 space-y-3 animate-fade-in">
      {toilets.map((t) => (
        <div key={t.id} className="bg-card rounded-xl border border-border p-4">
          <div className="flex gap-3">
            <div className="w-14 h-14 bg-eco-green-light rounded-xl flex items-center justify-center shrink-0">
              <QrCode size={24} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-foreground mb-1">{t.name}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                <MapPin size={12} className="shrink-0" />{t.address}
              </p>
              <p className="text-xs text-muted-foreground">Mã QR: {t.qr}</p>
            </div>
          </div>
          <Button size="sm" className="w-full mt-3 touch-target font-medium gap-2">
            <QrCode size={16} />
            Quét QR
          </Button>
        </div>
      ))}
    </div>
  </div>
);

export default CustomerToilets;
