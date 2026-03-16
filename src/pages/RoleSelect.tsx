import { useNavigate } from "react-router-dom";
import { Users, Handshake, ShieldCheck } from "lucide-react";
import logo from "@/assets/logo.png";

const roles = [
  { id: "customer", label: "Khách hàng", desc: "Cá nhân & Doanh nghiệp", icon: Users, path: "/customer" },
  { id: "partner", label: "Đối tác", desc: "Cá nhân & Doanh nghiệp", icon: Handshake, path: "/partner" },
  { id: "admin", label: "Admin", desc: "Hệ thống KTX", icon: ShieldCheck, path: "/admin" },
];

const RoleSelect = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-6">
      <img src={logo} alt="Logo" className="w-16 h-16 mb-4" />
      <h1 className="text-xl font-bold mb-1">Chọn vai trò</h1>
      <p className="text-sm text-muted-foreground mb-8">Chọn vai trò để tiếp tục sử dụng ứng dụng</p>

      <div className="w-full max-w-sm space-y-3">
        {roles.map((role) => (
          <button
            key={role.id}
            onClick={() => navigate(role.path)}
            className="w-full flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary hover:bg-accent transition-all touch-target"
          >
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
              <role.icon size={22} className="text-accent-foreground" />
            </div>
            <div className="text-left">
              <p className="font-semibold text-foreground">{role.label}</p>
              <p className="text-xs text-muted-foreground">{role.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default RoleSelect;
