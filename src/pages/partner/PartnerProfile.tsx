import PartnerHeader from "./components/PartnerHeader";
import { useRole } from "@/contexts/RoleContext";
import { Building2, Users, Wrench, ChevronRight, Settings, LogOut, Shield, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const PartnerProfile = () => {
  const { currentAccount, isBusinessOwner } = useRole();
  const navigate = useNavigate();

  const services = [
    { name: "Vệ sinh lau dọn (VSLD)", active: true },
    { name: "Sửa chữa bảo dưỡng (SCBD)", active: true },
    { name: "Xây dựng & Cải tạo", active: false },
    { name: "Dịch vụ Netzero", active: false },
  ];

  const menuItems = [
    ...(isBusinessOwner ? [
      { icon: Building2, label: "Quản lý thông tin doanh nghiệp", desc: "Thông tin DN, mã số thuế" },
      { icon: Users, label: "Quản lý nhân sự", desc: "Thêm, sửa, gán quyền nhân viên" },
    ] : []),
    { icon: Settings, label: "Cài đặt tài khoản", desc: "Đổi mật khẩu, thông tin cá nhân" },
  ];

  return (
    <div>
      <MobileHeader title="Chung" />
      <div className="px-4 py-5 space-y-5">
        <motion.div className="glass-card rounded-2xl p-5 flex items-center gap-4" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className={`w-16 h-16 rounded-full ${currentAccount.gradient} flex items-center justify-center text-primary-foreground font-bold text-lg shadow-glow`}>
            {currentAccount.initials}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-base text-foreground truncate">{currentAccount.label}</h2>
            <p className="text-xs text-muted-foreground mt-0.5">{currentAccount.subtitle}</p>
            {isBusinessOwner && (
              <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full"><Shield size={10} /> Quản trị</span>
            )}
          </div>
        </motion.div>

        <motion.div className="glass-card rounded-2xl p-5" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h3 className="font-bold text-sm text-foreground mb-3 flex items-center gap-2"><Wrench size={16} className="text-primary" /> Dịch vụ cung cấp</h3>
          <div className="space-y-2">
            {services.map((s) => (
              <div key={s.name} className="flex items-center justify-between p-2 rounded-xl bg-muted/40">
                <span className="text-sm text-foreground">{s.name}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${s.active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                  {s.active ? "Đang cung cấp" : "Chưa đăng ký"}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full mt-3 flex items-center justify-center gap-1 text-sm font-semibold text-primary py-2 rounded-xl border-2 border-dashed border-primary/30 hover:bg-primary/5 transition-colors">
            <Plus size={16} /> Đăng ký bổ sung dịch vụ
          </button>
        </motion.div>

        <div className="space-y-2">
          {menuItems.map((item, i) => (
            <motion.button key={item.label} className="w-full glass-card rounded-2xl p-4 flex items-center gap-3 text-left card-hover" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05 }}>
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0"><item.icon size={18} className="text-foreground" /></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{item.label}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{item.desc}</p>
              </div>
              <ChevronRight size={16} className="text-muted-foreground/40 shrink-0" />
            </motion.button>
          ))}
        </div>

        <motion.button className="w-full glass-card rounded-2xl p-4 flex items-center gap-3 text-left border border-destructive/20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} onClick={() => navigate("/login")}>
          <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center"><LogOut size={18} className="text-destructive" /></div>
          <p className="text-sm font-semibold text-destructive">Đăng xuất</p>
        </motion.button>
      </div>
    </div>
  );
};

export default PartnerProfile;
