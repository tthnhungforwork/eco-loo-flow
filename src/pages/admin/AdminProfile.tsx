import AdminHeader from "./components/AdminHeader";
import { Users, Handshake, ChevronRight, Settings, LogOut, Shield, UserPlus, ClipboardList } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AdminProfile = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: Handshake, label: "Quản lý đối tác", desc: "Đơn đăng ký, danh sách đối tác đã duyệt" },
    { icon: UserPlus, label: "Đơn đăng ký đối tác", desc: "Duyệt/từ chối đơn đăng ký mới", badge: 3 },
    { icon: Users, label: "Quản lý nhân viên", desc: "Danh sách nhân viên hệ thống" },
    { icon: ClipboardList, label: "Quản lý dịch vụ", desc: "Cấu hình các loại dịch vụ" },
    { icon: Settings, label: "Cài đặt hệ thống", desc: "Cấu hình chung, bán kính điều phối" },
  ];

  return (
    <div>
      <MobileHeader title="Chung" />
      <div className="px-4 py-5 space-y-5">
        <motion.div className="glass-card rounded-2xl p-5 flex items-center gap-4" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-16 h-16 rounded-full gradient-hero flex items-center justify-center text-primary-foreground font-bold text-lg shadow-glow">AD</div>
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-base text-foreground truncate">Admin KTX</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Quản trị viên hệ thống</p>
            <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full"><Shield size={10} /> Admin</span>
          </div>
        </motion.div>

        <div className="space-y-2">
          {menuItems.map((item, i) => (
            <motion.button key={item.label} className="w-full glass-card rounded-2xl p-4 flex items-center gap-3 text-left card-hover" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0"><item.icon size={18} className="text-foreground" /></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{item.label}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{item.desc}</p>
              </div>
              {"badge" in item && item.badge && (
                <span className="w-6 h-6 rounded-full bg-destructive text-destructive-foreground text-[11px] font-bold flex items-center justify-center">{item.badge}</span>
              )}
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

export default AdminProfile;
