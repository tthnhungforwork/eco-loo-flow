import MobileHeader from "@/components/MobileHeader";
import { MapPin, User, QrCode } from "lucide-react";

const toilets = [
  { id: 1, name: "NVS Tầng 3 - Tòa A", address: "123 Nguyễn Huệ, Q.1", assignedTo: "Trần Văn A", qr: "NVS-A3-001" },
  { id: 2, name: "NVS Sảnh B - KTX", address: "456 Lê Lợi, Q.3", assignedTo: "Lê Thị B", qr: "NVS-B1-002" },
  { id: 3, name: "NVS Tầng 1 - Tòa C", address: "789 Trần Hưng Đạo", assignedTo: "Phạm Văn C", qr: "NVS-C1-003" },
];

const PartnerToilets = () => (
  <div>
    <MobileHeader title="QL Nhà vệ sinh" />
    <div className="px-4 py-4 space-y-3 animate-fade-in">
      {toilets.map((t) => (
        <div key={t.id} className="bg-card rounded-xl border border-border p-4">
          <div className="flex gap-3">
            <div className="w-14 h-14 bg-eco-green-light rounded-xl flex items-center justify-center shrink-0">
              <QrCode size={24} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm text-foreground mb-1">{t.name}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin size={12} />{t.address}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><User size={12} />{t.assignedTo}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default PartnerToilets;
