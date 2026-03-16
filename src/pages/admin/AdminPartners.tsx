import { useState } from "react";
import AdminHeader from "./components/AdminHeader";
import StatusBadge from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  Search, Building2, User, Phone, Mail, MapPin, Star,
  CheckCircle2, XCircle, ChevronRight, Calendar, Briefcase, ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { MOCK_PARTNERS, SERVICE_TYPE_CONFIG, type PartnerInfo } from "@/data/orderData";

const tabs = ["Đã duyệt", "Chờ duyệt", "Tạm ngưng"];
const tabStatus = ["active", "pending", "suspended"];

const AdminPartners = () => {
  const [tab, setTab] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedPartner, setSelectedPartner] = useState<PartnerInfo | null>(null);
  const [showApprove, setShowApprove] = useState(false);

  const filtered = MOCK_PARTNERS
    .filter((p) => p.status === tabStatus[tab])
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase()));

  const pendingCount = MOCK_PARTNERS.filter((p) => p.status === "pending").length;

  const handleApprove = (partner: PartnerInfo) => {
    toast.success(`Đã phê duyệt đối tác ${partner.name}`);
    setSelectedPartner(null);
  };

  const handleReject = (partner: PartnerInfo) => {
    toast.info(`Đã từ chối đối tác ${partner.name}`);
    setSelectedPartner(null);
  };

  const handleSuspend = (partner: PartnerInfo) => {
    toast.info(`Đã tạm ngưng đối tác ${partner.name}`);
    setSelectedPartner(null);
  };

  const handleReactivate = (partner: PartnerInfo) => {
    toast.success(`Đã kích hoạt lại đối tác ${partner.name}`);
    setSelectedPartner(null);
  };

  return (
    <div className="min-h-screen">
      <AdminHeader title="Quản lý đối tác" />

      <div className="py-4">
        <div className="px-4 mb-4 relative">
          <Search size={16} className="absolute left-7 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Tìm đối tác..." className="pl-9 rounded-xl bg-card/80 border-border/50" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>

        <div className="px-4 mb-4 flex gap-2">
          {tabs.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all relative ${
                tab === i ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {t}
              {i === 1 && pendingCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-destructive text-[9px] text-primary-foreground font-bold flex items-center justify-center">
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="px-4 space-y-3 pb-24">
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              {filtered.map((p, i) => (
                <motion.button
                  key={p.id}
                  className="w-full text-left glass-card rounded-2xl p-4 card-hover mb-3"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedPartner(p)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                      p.type === "business" ? "gradient-primary" : "gradient-blue"
                    } text-primary-foreground`}>
                      {p.type === "business" ? <Building2 size={18} /> : <User size={18} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="font-bold text-[13px] text-foreground truncate">{p.name}</p>
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground shrink-0">
                          {p.type === "business" ? "DN" : "CN"}
                        </span>
                      </div>
                      <p className="text-[10px] text-muted-foreground font-mono mt-0.5">#{p.id}</p>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {p.services.map((s) => (
                          <span key={s} className="text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-primary/10 text-primary">
                            {SERVICE_TYPE_CONFIG[s].label}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      {p.status === "active" && (
                        <>
                          <div className="flex items-center gap-0.5 justify-end">
                            <Star size={11} className="text-amber-500 fill-amber-500" />
                            <span className="text-[12px] font-bold text-foreground">{p.rating}</span>
                          </div>
                          <p className="text-[10px] text-muted-foreground">{p.completedOrders} đơn</p>
                        </>
                      )}
                      {p.status === "pending" && (
                        <StatusBadge status="new" label="Chờ duyệt" />
                      )}
                      {p.status === "suspended" && (
                        <StatusBadge status="cancelled" label="Tạm ngưng" />
                      )}
                    </div>
                  </div>
                </motion.button>
              ))}

              {filtered.length === 0 && (
                <div className="text-center py-20">
                  <p className="text-muted-foreground text-sm">Không có đối tác nào</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Partner detail sheet */}
      <Sheet open={!!selectedPartner} onOpenChange={() => setSelectedPartner(null)}>
        <SheetContent side="bottom" className="rounded-t-3xl max-h-[90vh] overflow-y-auto px-5 pb-8">
          {selectedPartner && (
            <>
              <SheetHeader className="pb-4">
                <SheetTitle className="text-base text-left">Thông tin đối tác</SheetTitle>
              </SheetHeader>

              <div className="space-y-4">
                {/* Partner header */}
                <div className="flex items-center gap-3">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                    selectedPartner.type === "business" ? "gradient-primary" : "gradient-blue"
                  } text-primary-foreground`}>
                    {selectedPartner.type === "business" ? <Building2 size={24} /> : <User size={24} />}
                  </div>
                  <div>
                    <p className="font-bold text-[16px] text-foreground">{selectedPartner.name}</p>
                    <p className="text-[11px] text-muted-foreground font-mono">#{selectedPartner.id} · {selectedPartner.type === "business" ? "Doanh nghiệp" : "Cá nhân"}</p>
                  </div>
                </div>

                {/* Info */}
                <div className="bg-muted/40 rounded-2xl p-4 space-y-2.5 text-[12px]">
                  <div className="flex items-center gap-2"><Phone size={13} className="text-muted-foreground" /><span>{selectedPartner.phone}</span></div>
                  <div className="flex items-center gap-2"><Mail size={13} className="text-muted-foreground" /><span>{selectedPartner.email}</span></div>
                  <div className="flex items-start gap-2"><MapPin size={13} className="text-muted-foreground shrink-0 mt-0.5" /><span>{selectedPartner.address}</span></div>
                  <div className="flex items-center gap-2"><Calendar size={13} className="text-muted-foreground" /><span>Đăng ký: {selectedPartner.registeredAt}</span></div>
                  {selectedPartner.taxCode && (
                    <div className="flex items-center gap-2"><Briefcase size={13} className="text-muted-foreground" /><span>MST: {selectedPartner.taxCode}</span></div>
                  )}
                  {selectedPartner.staffCount && (
                    <div className="flex items-center gap-2"><User size={13} className="text-muted-foreground" /><span>{selectedPartner.staffCount} nhân viên</span></div>
                  )}
                </div>

                {/* Services */}
                <div>
                  <p className="text-[12px] font-bold text-foreground mb-2">Dịch vụ cung cấp</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedPartner.services.map((s) => (
                      <span key={s} className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                        {SERVICE_TYPE_CONFIG[s].label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats for active partners */}
                {selectedPartner.status === "active" && (
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-primary/5 rounded-xl p-3 text-center">
                      <p className="text-xl font-black text-primary">{selectedPartner.rating}</p>
                      <p className="text-[10px] text-muted-foreground">Đánh giá</p>
                    </div>
                    <div className="bg-primary/5 rounded-xl p-3 text-center">
                      <p className="text-xl font-black text-primary">{selectedPartner.completedOrders}</p>
                      <p className="text-[10px] text-muted-foreground">Đơn hoàn thành</p>
                    </div>
                  </div>
                )}

                {/* Actions */}
                {selectedPartner.status === "pending" && (
                  <div className="flex gap-2.5">
                    <Button
                      variant="outline"
                      className="flex-1 h-12 rounded-2xl font-semibold gap-1.5 border-destructive/30 text-destructive hover:bg-destructive/10"
                      onClick={() => handleReject(selectedPartner)}
                    >
                      <XCircle size={16} /> Từ chối
                    </Button>
                    <Button
                      className="flex-1 h-12 rounded-2xl font-bold gap-1.5 gradient-primary border-0 shadow-glow text-primary-foreground"
                      onClick={() => handleApprove(selectedPartner)}
                    >
                      <CheckCircle2 size={16} /> Phê duyệt
                    </Button>
                  </div>
                )}

                {selectedPartner.status === "active" && (
                  <Button
                    variant="outline"
                    className="w-full h-12 rounded-2xl font-semibold gap-1.5 border-destructive/30 text-destructive hover:bg-destructive/10"
                    onClick={() => handleSuspend(selectedPartner)}
                  >
                    <XCircle size={16} /> Tạm ngưng đối tác
                  </Button>
                )}

                {selectedPartner.status === "suspended" && (
                  <Button
                    className="w-full h-12 rounded-2xl font-bold gap-1.5 gradient-primary border-0 shadow-glow text-primary-foreground"
                    onClick={() => handleReactivate(selectedPartner)}
                  >
                    <ShieldCheck size={16} /> Kích hoạt lại
                  </Button>
                )}
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default AdminPartners;
