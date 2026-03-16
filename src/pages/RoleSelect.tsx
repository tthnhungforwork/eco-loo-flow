import { useNavigate } from "react-router-dom";
import { Users, Handshake, ShieldCheck, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const roles = [
  { id: "customer", label: "Khách hàng", desc: "Cá nhân & Doanh nghiệp sử dụng dịch vụ", icon: Users, path: "/customer", gradient: "gradient-primary" },
  { id: "partner", label: "Đối tác", desc: "Cung cấp dịch vụ & quản lý nhân viên", icon: Handshake, path: "/partner", gradient: "gradient-blue" },
  { id: "admin", label: "Admin", desc: "Quản trị hệ thống KTX", icon: ShieldCheck, path: "/admin", gradient: "gradient-warm" },
];

const RoleSelect = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6 relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />

      <motion.div
        className="relative z-10 w-full max-w-sm"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl gradient-primary p-3 shadow-glow mx-auto mb-4">
            <img src={logo} alt="Logo" className="w-full h-full object-contain brightness-0 invert" />
          </div>
          <h1 className="text-xl font-extrabold tracking-tight">Chọn vai trò</h1>
          <p className="text-sm text-muted-foreground mt-1">Chọn vai trò để tiếp tục sử dụng</p>
        </div>

        <div className="space-y-3">
          {roles.map((role, i) => (
            <motion.button
              key={role.id}
              onClick={() => navigate(role.path)}
              className="w-full flex items-center gap-4 p-4 glass-card rounded-2xl card-hover text-left"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.1 }}
              whileTap={{ scale: 0.97 }}
            >
              <div className={`icon-container ${role.gradient} text-primary-foreground shadow-glow`}>
                <role.icon size={22} />
              </div>
              <div className="flex-1">
                <p className="font-bold text-foreground">{role.label}</p>
                <p className="text-xs text-muted-foreground">{role.desc}</p>
              </div>
              <ArrowRight size={18} className="text-muted-foreground" />
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default RoleSelect;
