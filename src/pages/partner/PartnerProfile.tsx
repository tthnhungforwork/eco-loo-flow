import MobileHeader from "@/components/MobileHeader";
import { Handshake, ShoppingBag, ChevronRight, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PartnerProfile = () => {
  const navigate = useNavigate();
  return (
    <div>
      <MobileHeader title="Chung" />
      <div className="px-4 py-4 space-y-4 animate-fade-in">
        <div className="bg-card rounded-xl border border-border p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-bold text-xl">
            ĐT
          </div>
          <div>
            <p className="font-bold text-foreground">Công ty Eco Clean</p>
            <p className="text-xs text-muted-foreground">partner@ecoclean.vn</p>
          </div>
        </div>

        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-1">Quản trị</h3>
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          {[
            { icon: Handshake, label: "Quản lý đối tác" },
            { icon: ShoppingBag, label: "Quản lý bán hàng" },
          ].map((item, i) => (
            <button key={i} className="w-full flex items-center gap-3 px-4 py-3.5 touch-target border-b border-border last:border-0 text-left">
              <item.icon size={20} className="text-primary shrink-0" />
              <span className="flex-1 text-sm font-medium text-foreground">{item.label}</span>
              <ChevronRight size={18} className="text-muted-foreground" />
            </button>
          ))}
        </div>

        <button onClick={() => navigate("/login")} className="w-full flex items-center gap-3 px-4 py-3.5 bg-card rounded-xl border border-destructive/20 touch-target">
          <LogOut size={20} className="text-destructive" />
          <span className="text-sm font-medium text-destructive">Đăng xuất</span>
        </button>
      </div>
    </div>
  );
};

export default PartnerProfile;
