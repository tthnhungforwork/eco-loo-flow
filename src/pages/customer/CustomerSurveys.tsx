import { useState } from "react";
import MobileHeader from "@/components/MobileHeader";
import SegmentedControl from "@/components/SegmentedControl";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import StatusBadge from "@/components/StatusBadge";
import {
  FileText, Bath, Calendar, ChevronRight, ClipboardCheck,
  Leaf, Droplets, Recycle, Award, MapPin
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Survey {
  id: string;
  title: string;
  nvs: string;
  type: "digitize" | "netzero";
  status: string;
  createdAt: string;
  completedAt?: string;
  details: Record<string, string>;
}

const surveys: Survey[] = [
  {
    id: "KS-001", title: "Khảo sát số hóa NVS Tầng 3", nvs: "NVS Tầng 3 - Tòa A",
    type: "digitize", status: "done", createdAt: "01/02/2026", completedAt: "10/02/2026",
    details: {
      "Diện tích": "45 m²", "Số thiết bị": "12 thiết bị",
      "Tần suất sử dụng": "200 người/ngày", "Đề xuất": "Lắp đặt sensor IoT + dashboard",
    },
  },
  {
    id: "KS-002", title: "Khảo sát số hóa NVS Eco Park", nvs: "NVS Công viên Eco Park",
    type: "digitize", status: "processing", createdAt: "10/03/2026",
    details: {
      "Diện tích": "60 m²", "Số thiết bị": "18 thiết bị",
      "Tần suất sử dụng": "500 người/ngày", "Đề xuất": "Đang khảo sát",
    },
  },
  {
    id: "KS-003", title: "Chứng nhận Sạch - NVS Tầng 1", nvs: "NVS Tầng 1 - Tòa C",
    type: "netzero", status: "done", createdAt: "15/01/2026", completedAt: "28/01/2026",
    details: {
      "Cấp chứng nhận": "Sạch", "Điện năng": "120 kWh/tháng",
      "Nước sử dụng": "15 m³/tháng", "Chế phẩm sinh học": "Có sử dụng",
    },
  },
  {
    id: "KS-004", title: "Nâng cấp Xanh - NVS Tầng 3", nvs: "NVS Tầng 3 - Tòa A",
    type: "netzero", status: "processing", createdAt: "05/03/2026",
    details: {
      "Cấp hiện tại": "Sạch", "Mục tiêu": "Xanh",
      "Yêu cầu bổ sung": "Hệ thống tái chế nước xám", "Tiến độ": "Đang thực hiện vận hành 12 tháng",
    },
  },
];

const statusLabel: Record<string, string> = {
  processing: "Đang thực hiện", done: "Hoàn thành",
};

const typeIcon = { digitize: FileText, netzero: Leaf };
const typeGradient = { digitize: "gradient-blue", netzero: "gradient-primary" };

const CustomerSurveys = () => {
  const [tab, setTab] = useState(0);
  const [selected, setSelected] = useState<Survey | null>(null);

  const typeKey = tab === 0 ? "digitize" : "netzero";
  const filtered = surveys.filter((s) => s.type === typeKey);

  return (
    <div className="gradient-surface min-h-screen">
      <MobileHeader title="Khảo sát" />
      <div className="py-4">
        <SegmentedControl
          tabs={["Tư vấn Số hóa NVS", "Sạch - Xanh - Tuần hoàn"]}
          active={tab}
          onChange={setTab}
        />

        <div className="px-4 space-y-3 pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-3"
            >
              {filtered.map((s, i) => {
                const Icon = typeIcon[s.type];
                return (
                  <motion.div
                    key={s.id}
                    className="glass-card rounded-2xl p-4 card-hover cursor-pointer"
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setSelected(s)}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex gap-3">
                      <div className={`w-12 h-12 rounded-xl ${typeGradient[s.type]} flex items-center justify-center text-primary-foreground shadow-sm shrink-0`}>
                        <Icon size={20} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <p className="font-semibold text-sm text-foreground leading-snug">{s.title}</p>
                          <StatusBadge status={s.status} label={statusLabel[s.status]} />
                        </div>
                        <div className="flex items-center gap-3 text-[11px] text-muted-foreground mt-2">
                          <span className="flex items-center gap-1"><Bath size={11} />{s.nvs}</span>
                          <span className="flex items-center gap-1 ml-auto"><Calendar size={11} />{s.createdAt}</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {filtered.length === 0 && (
                <motion.div className="text-center py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted/60 flex items-center justify-center">
                    <ClipboardCheck size={28} className="text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-sm font-medium">Chưa có khảo sát nào</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Detail Sheet */}
      <Sheet open={!!selected} onOpenChange={() => setSelected(null)}>
        <SheetContent side="bottom" className="rounded-t-3xl max-h-[85vh] overflow-y-auto px-5 pb-8">
          {selected && (() => {
            const Icon = typeIcon[selected.type];
            return (
              <>
                <SheetHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-xl ${typeGradient[selected.type]} flex items-center justify-center text-primary-foreground shadow-sm`}>
                      <Icon size={22} />
                    </div>
                    <div>
                      <SheetTitle className="text-base text-left">{selected.title}</SheetTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-[10px] font-mono text-muted-foreground">#{selected.id}</span>
                        <StatusBadge status={selected.status} label={statusLabel[selected.status]} />
                      </div>
                    </div>
                  </div>
                </SheetHeader>

                <div className="space-y-3 mb-5">
                  <div className="flex items-center gap-3 bg-muted/40 rounded-xl p-3">
                    <Bath size={16} className="text-primary shrink-0" />
                    <div>
                      <p className="text-[10px] text-muted-foreground">Nhà vệ sinh</p>
                      <p className="text-[13px] font-semibold text-foreground">{selected.nvs}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-muted/40 rounded-xl p-3">
                    <Calendar size={16} className="text-primary shrink-0" />
                    <div>
                      <p className="text-[10px] text-muted-foreground">
                        {selected.completedAt ? "Ngày khảo sát → Hoàn thành" : "Ngày bắt đầu"}
                      </p>
                      <p className="text-[13px] font-semibold text-foreground">
                        {selected.createdAt}{selected.completedAt && ` → ${selected.completedAt}`}
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[12px] font-bold text-foreground mb-2">Kết quả khảo sát</p>
                  <div className="space-y-2">
                    {Object.entries(selected.details).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-2.5 bg-card border border-border/30 rounded-xl p-3">
                        <div className="flex-1">
                          <p className="text-[10px] text-muted-foreground">{key}</p>
                          <p className="text-[13px] font-semibold text-foreground">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {selected.type === "netzero" && selected.status === "done" && (
                  <div className="mt-5 p-4 bg-primary/5 border border-primary/10 rounded-xl flex items-center gap-3">
                    <Award size={24} className="text-primary shrink-0" />
                    <div>
                      <p className="text-[12px] font-bold text-foreground">Chứng nhận đạt được</p>
                      <p className="text-[13px] text-primary font-bold">{selected.details["Cấp chứng nhận"]}</p>
                    </div>
                  </div>
                )}
              </>
            );
          })()}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CustomerSurveys;
