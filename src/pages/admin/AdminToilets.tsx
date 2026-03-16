import MobileHeader from "@/components/MobileHeader";
import { MapPin, QrCode, Settings, Plus, ScanLine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const toilets = [
  { id: 1, name: "NVS Tầng 3 - Tòa A", address: "123 Nguyễn Huệ, Q.1, TP.HCM", status: "active", qr: "NVS-A3-001" },
  { id: 2, name: "NVS Sảnh B - KTX", address: "456 Lê Lợi, Q.3, TP.HCM", status: "maintenance", qr: "NVS-B1-002" },
  { id: 3, name: "NVS Tầng 1 - Tòa C", address: "789 Trần Hưng Đạo, Q.5", status: "active", qr: "NVS-C1-003" },
  { id: 4, name: "NVS Eco Park", address: "Eco Park, Long Biên, HN", status: "active", qr: "NVS-EP-004" },
];

const statusMap: Record<string, { label: string; dot: string }> = {
  active: { label: "Hoạt động", dot: "bg-primary" },
  maintenance: { label: "Bảo trì", dot: "bg-eco-orange animate-pulse-soft" },
};

const AdminToilets = () => (
  <div>
    <MobileHeader title="QL Nhà vệ sinh" />
    <div className="px-4 py-5">
      <Button className="w-full touch-target font-bold gap-2 mb-5 rounded-2xl gradient-primary border-0 shadow-glow btn-glow h-14">
        <Plus size={20} />
        Thêm nhà vệ sinh
      </Button>
      <div className="space-y-3">
        {toilets.map((t, i) => (
          <motion.div key={t.id} className="glass-card rounded-2xl p-4 card-hover" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <div className="flex gap-3">
              <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shrink-0 shadow-glow">
                <QrCode size={24} className="text-primary-foreground" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-sm text-foreground">{t.name}</p>
                  <span className="flex items-center gap-1 shrink-0">
                    <span className={`w-2 h-2 rounded-full ${statusMap[t.status].dot}`} />
                    <span className="text-[10px] font-medium text-muted-foreground">{statusMap[t.status].label}</span>
                  </span>
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1"><MapPin size={12} />{t.address}</p>
                <p className="text-[11px] text-muted-foreground font-mono mt-0.5">QR: {t.qr}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              <Button size="sm" variant="outline" className="flex-1 touch-target font-semibold gap-1 rounded-xl border-border/50">
                <Settings size={14} />Cấu hình
              </Button>
              <Button size="sm" className="flex-1 touch-target font-bold gap-1 rounded-xl gradient-primary border-0 shadow-glow">
                <ScanLine size={14} />Quét QR
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

export default AdminToilets;
