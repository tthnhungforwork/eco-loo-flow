import MobileHeader from "@/components/MobileHeader";
import { MapPin, User, QrCode } from "lucide-react";
import { motion } from "framer-motion";

const toilets = [
  { id: 1, name: "NVS Tầng 3 - Tòa A", address: "123 Nguyễn Huệ, Q.1", assignedTo: "Trần Văn A", qr: "NVS-A3-001" },
  { id: 2, name: "NVS Sảnh B - KTX", address: "456 Lê Lợi, Q.3", assignedTo: "Lê Thị B", qr: "NVS-B1-002" },
  { id: 3, name: "NVS Tầng 1 - Tòa C", address: "789 Trần Hưng Đạo", assignedTo: "Phạm Văn C", qr: "NVS-C1-003" },
];

const PartnerToilets = () => (
  <div>
    <MobileHeader title="QL Nhà vệ sinh" />
    <div className="px-4 py-5 space-y-3">
      {toilets.map((t, i) => (
        <motion.div key={t.id} className="glass-card rounded-2xl p-4 card-hover" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
          <div className="flex gap-3">
            <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shrink-0 shadow-glow">
              <QrCode size={24} className="text-primary-foreground" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm text-foreground mb-1">{t.name}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1"><MapPin size={12} />{t.address}</p>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5"><User size={12} />{t.assignedTo}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

export default PartnerToilets;
