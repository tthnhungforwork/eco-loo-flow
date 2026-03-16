import MobileHeader from "@/components/MobileHeader";
import { MapPin, QrCode, ScanLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const toilets = [
  { id: 1, name: "NVS Tầng 3 - Tòa A", address: "123 Nguyễn Huệ, Q.1, TP.HCM", qr: "NVS-A3-001", status: "active" },
  { id: 2, name: "NVS Sảnh B - KTX", address: "456 Lê Lợi, Q.3, TP.HCM", qr: "NVS-B1-002", status: "maintenance" },
  { id: 3, name: "NVS Tầng 1 - Tòa C", address: "789 Trần Hưng Đạo, Q.5, TP.HCM", qr: "NVS-C1-003", status: "active" },
  { id: 4, name: "NVS Công viên Eco Park", address: "Eco Park, Long Biên, Hà Nội", qr: "NVS-EP-004", status: "active" },
];

const statusMap: Record<string, { label: string; dot: string }> = {
  active: { label: "Hoạt động", dot: "bg-primary" },
  maintenance: { label: "Bảo trì", dot: "bg-eco-orange animate-pulse-soft" },
};

const CustomerToilets = () => (
  <div>
    <MobileHeader title="Nhà vệ sinh" />
    <div className="px-4 py-5 space-y-3">
      {toilets.map((t, i) => (
        <motion.div
          key={t.id}
          className="glass-card rounded-2xl p-4 card-hover"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
        >
          <div className="flex gap-3">
            <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shrink-0 shadow-glow">
              <QrCode size={24} className="text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-bold text-sm text-foreground truncate">{t.name}</p>
                <span className="flex items-center gap-1 shrink-0">
                  <span className={`w-2 h-2 rounded-full ${statusMap[t.status].dot}`} />
                  <span className="text-[10px] font-medium text-muted-foreground">{statusMap[t.status].label}</span>
                </span>
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mb-0.5">
                <MapPin size={12} className="shrink-0" />{t.address}
              </p>
              <p className="text-[11px] text-muted-foreground font-mono">QR: {t.qr}</p>
            </div>
          </div>
          <Button size="sm" className="w-full mt-3 touch-target font-bold gap-2 rounded-xl gradient-primary border-0 shadow-glow">
            <ScanLine size={16} />
            Quét QR
          </Button>
        </motion.div>
      ))}
    </div>
  </div>
);

export default CustomerToilets;
