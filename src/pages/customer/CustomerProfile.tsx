import MobileHeader from "@/components/MobileHeader";
import { User, Ticket, ClipboardList, ChevronRight, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const menuSections = [
  {
    items: [
      { icon: User, label: "Thông tin cá nhân", path: "#" },
      { icon: Ticket, label: "Ticket", path: "#" },
    ],
  },
  {
    title: "Khảo sát",
    items: [
      { icon: ClipboardList, label: "Tư vấn số hóa NVS", path: "#" },
      { icon: ClipboardList, label: "Khảo sát Sạch - Xanh - Tuần hoàn", path: "#" },
    ],
  },
];

const CustomerProfile = () => {
  const navigate = useNavigate();

  return (
    <div>
      <MobileHeader title="Chung" />
      <div className="px-4 py-4 space-y-4 animate-fade-in">
        {/* Avatar Section */}
        <div className="bg-card rounded-xl border border-border p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
            KH
          </div>
          <div>
            <p className="font-bold text-foreground">Nguyễn Văn Khách</p>
            <p className="text-xs text-muted-foreground">khach@email.com</p>
          </div>
        </div>

        {menuSections.map((section, si) => (
          <div key={si}>
            {section.title && <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">{section.title}</h3>}
            <div className="bg-card rounded-xl border border-border overflow-hidden">
              {section.items.map((item, i) => (
                <button
                  key={i}
                  className="w-full flex items-center gap-3 px-4 py-3.5 touch-target border-b border-border last:border-0 text-left"
                >
                  <item.icon size={20} className="text-primary shrink-0" />
                  <span className="flex-1 text-sm font-medium text-foreground">{item.label}</span>
                  <ChevronRight size={18} className="text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        ))}

        <button
          onClick={() => navigate("/login")}
          className="w-full flex items-center gap-3 px-4 py-3.5 bg-card rounded-xl border border-destructive/20 touch-target"
        >
          <LogOut size={20} className="text-destructive" />
          <span className="text-sm font-medium text-destructive">Đăng xuất</span>
        </button>
      </div>
    </div>
  );
};

export default CustomerProfile;
