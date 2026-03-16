import { useState } from "react";
import MobileHeader from "@/components/MobileHeader";
import { MapPin, QrCode, ScanLine, ChevronRight, Phone, User, FileText, Award, Briefcase, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

interface Toilet {
  id: number;
  name: string;
  address: string;
  area: string;
  category: string;
  qr: string;
  status: string;
  owner: string;
  phone: string;
  description: string;
  createdAt: string;
  certificates: string[];
  taskCount: number;
}

const toilets: Toilet[] = [
  { id: 1, name: "NVS Tầng 3 - Tòa A", address: "123 Nguyễn Huệ, Q.1, TP.HCM", area: "Quận 1", category: "Công cộng", qr: "NVS-A3-001", status: "active", owner: "Nguyễn Văn Khách", phone: "0901234567", description: "Nhà vệ sinh công cộng tầng 3 tòa nhà A, phục vụ 200 người/ngày", createdAt: "01/01/2026", certificates: ["Sạch", "Xanh"], taskCount: 5 },
  { id: 2, name: "NVS Sảnh B - KTX", address: "456 Lê Lợi, Q.3, TP.HCM", area: "Quận 3", category: "Ký túc xá", qr: "NVS-B1-002", status: "maintenance", owner: "Công ty TNHH ABC", phone: "0912345678", description: "NVS khu ký túc xá Block B, đang bảo trì hệ thống nước", createdAt: "15/02/2026", certificates: ["Sạch"], taskCount: 3 },
  { id: 3, name: "NVS Tầng 1 - Tòa C", address: "789 Trần Hưng Đạo, Q.5, TP.HCM", area: "Quận 5", category: "Văn phòng", qr: "NVS-C1-003", status: "active", owner: "Nguyễn Văn Khách", phone: "0901234567", description: "NVS văn phòng tầng 1, tiêu chuẩn Xanh", createdAt: "10/01/2026", certificates: ["Sạch", "Xanh", "Tuần hoàn"], taskCount: 8 },
  { id: 4, name: "NVS Công viên Eco Park", address: "Eco Park, Long Biên, Hà Nội", area: "Long Biên", category: "Công viên", qr: "NVS-EP-004", status: "active", owner: "Nguyễn Văn Khách", phone: "0901234567", description: "NVS khu công viên sinh thái Eco Park", createdAt: "20/12/2025", certificates: ["Sạch", "Xanh"], taskCount: 2 },
];

const statusMap: Record<string, { label: string; dot: string }> = {
  active: { label: "Hoạt động", dot: "bg-primary" },
  maintenance: { label: "Bảo trì", dot: "bg-eco-orange animate-pulse-soft" },
};

const certColor: Record<string, string> = {
  "Sạch": "bg-primary/10 text-primary",
  "Xanh": "bg-emerald-500/10 text-emerald-600",
  "Tuần hoàn": "bg-blue-500/10 text-blue-600",
};

const CustomerToilets = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const selected = toilets.find((t) => t.id === selectedId);
  const filtered = toilets.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()) || t.address.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <MobileHeader title="Nhà vệ sinh" />

      <AnimatePresence mode="wait">
        {selectedId && selected ? (
          <motion.div key="detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="px-4 py-5 space-y-4">
            <button onClick={() => setSelectedId(null)} className="text-sm text-primary font-semibold flex items-center gap-1 mb-2">← Quay lại danh sách</button>

            {/* Header card */}
            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
                  <QrCode size={24} className="text-primary-foreground" />
                </div>
                <div className="flex-1">
                  <h2 className="font-bold text-base text-foreground">{selected.name}</h2>
                  <span className="flex items-center gap-1 mt-0.5">
                    <span className={`w-2 h-2 rounded-full ${statusMap[selected.status].dot}`} />
                    <span className="text-xs text-muted-foreground">{statusMap[selected.status].label}</span>
                  </span>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2"><MapPin size={14} className="text-muted-foreground mt-0.5 shrink-0" /><span className="text-foreground">{selected.address}</span></div>
                <div className="flex items-center gap-2"><User size={14} className="text-muted-foreground shrink-0" /><span className="text-foreground">{selected.owner}</span></div>
                <div className="flex items-center gap-2"><Phone size={14} className="text-muted-foreground shrink-0" /><span className="text-foreground">{selected.phone}</span></div>
                <div className="flex items-start gap-2"><FileText size={14} className="text-muted-foreground mt-0.5 shrink-0" /><span className="text-muted-foreground">{selected.description}</span></div>
              </div>
            </div>

            {/* Info grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="glass-card rounded-2xl p-4">
                <p className="text-xs text-muted-foreground mb-1">Phân loại</p>
                <p className="font-bold text-sm text-foreground">{selected.category}</p>
              </div>
              <div className="glass-card rounded-2xl p-4">
                <p className="text-xs text-muted-foreground mb-1">Ngày tạo</p>
                <p className="font-bold text-sm text-foreground">{selected.createdAt}</p>
              </div>
              <div className="glass-card rounded-2xl p-4">
                <p className="text-xs text-muted-foreground mb-1">Khu vực</p>
                <p className="font-bold text-sm text-foreground">{selected.area}</p>
              </div>
              <div className="glass-card rounded-2xl p-4">
                <p className="text-xs text-muted-foreground mb-1">Mã QR</p>
                <p className="font-bold text-sm text-foreground font-mono">{selected.qr}</p>
              </div>
            </div>

            {/* Certificates */}
            {selected.certificates.length > 0 && (
              <div className="glass-card rounded-2xl p-4">
                <p className="text-xs text-muted-foreground mb-2 flex items-center gap-1"><Award size={14} /> Chứng chỉ</p>
                <div className="flex gap-2">
                  {selected.certificates.map((c) => (
                    <span key={c} className={`px-3 py-1 rounded-full text-xs font-bold ${certColor[c] || "bg-muted text-muted-foreground"}`}>{c}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Tasks */}
            <div className="glass-card rounded-2xl p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground flex items-center gap-1"><Briefcase size={14} /> Công việc</p>
                <span className="text-sm font-bold text-primary">{selected.taskCount} công việc</span>
              </div>
            </div>

            <Button className="w-full touch-target font-bold gap-2 rounded-2xl gradient-primary border-0 shadow-glow h-14">
              <ScanLine size={18} /> Quét QR
            </Button>
          </motion.div>
        ) : (
          <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="px-4 pt-5 pb-2">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Tìm nhà vệ sinh..." className="pl-9 rounded-xl bg-card/80 border-border/50" value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
            </div>
            <div className="px-4 py-3 space-y-3">
              {filtered.map((t, i) => (
                <motion.div
                  key={t.id}
                  className="glass-card rounded-2xl p-4 card-hover cursor-pointer"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setSelectedId(t.id)}
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
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mb-1">
                        <MapPin size={12} className="shrink-0" />{t.address}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] text-muted-foreground">{t.category}</span>
                        <span className="text-[10px] text-muted-foreground">·</span>
                        <span className="text-[10px] text-muted-foreground font-mono">QR: {t.qr}</span>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-muted-foreground/40 self-center shrink-0" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomerToilets;
