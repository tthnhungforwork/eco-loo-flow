import { useState } from "react";
import MobileHeader from "@/components/MobileHeader";
import SegmentedControl from "@/components/SegmentedControl";
import { Handshake, Users, ChevronRight, LogOut, CheckCircle2, Clock, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const approvedPartners = [
  { id: 1, name: "Công ty Eco Clean", contact: "0901234567", status: "done" },
  { id: 2, name: "Đại lý Xanh Miền Nam", contact: "0912345678", status: "done" },
];

const pendingPartners = [
  { id: 3, name: "Công ty Vệ sinh ABC", contact: "0923456789", status: "new" },
  { id: 4, name: "Cá nhân Trần Văn D", contact: "0934567890", status: "new" },
];

const staff = [
  { id: 1, name: "Nguyễn Thị A", role: "Điều phối viên", initial: "A" },
  { id: 2, name: "Trần Văn B", role: "Quản lý NVS", initial: "B" },
  { id: 3, name: "Lê Thị C", role: "Nhân viên kỹ thuật", initial: "C" },
];

const AdminProfile = () => {
  const navigate = useNavigate();
  const [partnerTab, setPartnerTab] = useState(0);
  const partners = partnerTab === 0 ? approvedPartners : pendingPartners;

  return (
    <div>
      <MobileHeader title="Chung" />
      <div className="px-4 py-5 space-y-5">
        {/* Avatar */}
        <motion.div className="glass-card rounded-2xl p-5 flex items-center gap-4" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-16 h-16 rounded-2xl gradient-hero flex items-center justify-center text-primary-foreground font-extrabold text-xl shadow-glow">
            AD
          </div>
          <div className="flex-1">
            <p className="font-bold text-foreground text-lg">Admin KTX</p>
            <p className="text-xs text-muted-foreground">admin@ktx.vn</p>
            <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full gradient-warm text-primary-foreground text-[10px] font-bold">Admin</span>
          </div>
          <button className="w-10 h-10 rounded-xl bg-muted/60 flex items-center justify-center">
            <Settings size={18} className="text-muted-foreground" />
          </button>
        </motion.div>

        {/* Partner Management */}
        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3 px-1 flex items-center gap-2">
            <Handshake size={12} /> Quản lý đối tác
          </h3>
          <SegmentedControl tabs={["Đã duyệt", "Chưa duyệt"]} active={partnerTab} onChange={setPartnerTab} />
          <div className="space-y-2">
            {partners.map((p, i) => (
              <motion.div key={p.id} className="glass-card rounded-2xl p-4 flex items-center gap-3 card-hover" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                <div className={`icon-container-sm ${p.status === "done" ? "gradient-primary" : "bg-muted"} ${p.status === "done" ? "text-primary-foreground" : "text-muted-foreground"}`}>
                  {p.status === "done" ? <CheckCircle2 size={18} /> : <Clock size={18} />}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-sm text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.contact}</p>
                </div>
                <ChevronRight size={18} className="text-muted-foreground" />
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Staff */}
        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-3 px-1 flex items-center gap-2">
            <Users size={12} /> Quản lý nhân viên KTX
          </h3>
          <div className="glass-card rounded-2xl overflow-hidden">
            {staff.map((s) => (
              <button key={s.id} className="w-full flex items-center gap-3 px-4 py-4 touch-target border-b border-border/30 last:border-0 text-left active:bg-muted/50 transition-colors">
                <div className="w-10 h-10 rounded-xl gradient-blue flex items-center justify-center text-secondary-foreground font-bold text-sm">
                  {s.initial}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{s.name}</p>
                  <p className="text-[11px] text-muted-foreground">{s.role}</p>
                </div>
                <ChevronRight size={18} className="text-muted-foreground" />
              </button>
            ))}
          </div>
        </motion.section>

        <motion.button
          onClick={() => navigate("/login")}
          className="w-full flex items-center gap-3 px-4 py-4 glass-card rounded-2xl border-destructive/20 touch-target"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          whileTap={{ scale: 0.97 }}
        >
          <div className="icon-container-sm bg-destructive/10">
            <LogOut size={18} className="text-destructive" />
          </div>
          <span className="text-sm font-semibold text-destructive">Đăng xuất</span>
        </motion.button>
      </div>
    </div>
  );
};

export default AdminProfile;
