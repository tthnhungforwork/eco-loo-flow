import MobileHeader from "@/components/MobileHeader";
import { useRole } from "@/contexts/RoleContext";
import { Building2, Users, ShoppingBag, Heart, MessageSquareWarning, FileText, ChevronRight, Settings, LogOut, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CustomerProfile = () => {
  const { currentAccount, isBusinessOwner } = useRole();
  const navigate = useNavigate();

  const menuItems = [
    ...(isBusinessOwner ? [
      { icon: Building2, label: "Quản lý thông tin doanh nghiệp", desc: "Thông tin DN, mã số thuế", path: "#" },
      { icon: Users, label: "Quản lý nhân sự", desc: "Thêm, sửa, gán quyền nhân viên", path: "#" },
    ] : []),
    { icon: ShoppingBag, label: "Quản lý đơn mua", desc: "Giỏ hàng, đơn hàng sản phẩm", path: "/customer/orders" },
    { icon: Heart, label: "Sản phẩm yêu thích", desc: "Danh sách sản phẩm đã lưu", path: "/customer/orders" },
    { icon: MessageSquareWarning, label: "Ticket hỗ trợ", desc: "Ticket đã gửi và trạng thái", path: "#" },
    { icon: FileText, label: "Khảo sát", desc: "Tư vấn Số hóa NVS, Sạch-Xanh-Tuần hoàn", path: "#" },
    { icon: Settings, label: "Cài đặt tài khoản", desc: "Đổi mật khẩu, thông tin cá nhân", path: "#" },
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
            {currentAccount.type === "business_owner" && (
              <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                <Shield size={10} /> Quản trị
              </span>
            )}
          </div>
        </motion.div>

        <div className="space-y-2">
          {menuItems.map((item, i) => (
            <motion.button key={item.label} className="w-full glass-card rounded-2xl p-4 flex items-center gap-3 text-left card-hover" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} onClick={() => item.path !== "#" && navigate(item.path)}>
              <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0"><item.icon size={18} className="text-foreground" /></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{item.label}</p>
                <p className="text-[11px] text-muted-foreground mt-0.5">{item.desc}</p>
              </div>
              <ChevronRight size={16} className="text-muted-foreground/40 shrink-0" />
            </motion.button>
          ))}
        </div>

        <motion.button className="w-full glass-card rounded-2xl p-4 flex items-center gap-3 text-left border border-destructive/20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} onClick={() => navigate("/login")}>
          <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center"><LogOut size={18} className="text-destructive" /></div>
          <p className="text-sm font-semibold text-destructive">Đăng xuất</p>
        </motion.button>
      </div>
    </div>
  );
};

export default CustomerProfile;
