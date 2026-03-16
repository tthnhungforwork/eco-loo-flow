import { useNavigate, useLocation } from "react-router-dom";
import type { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  icon: LucideIcon;
  path: string;
}

interface BottomNavProps {
  items: NavItem[];
}

const BottomNav = ({ items }: BottomNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 glass-header safe-bottom z-50">
      <div className="flex justify-around items-center max-w-lg mx-auto px-1">
        {items.map((item) => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-0.5 py-2 px-1 min-w-0 flex-1 touch-target transition-all duration-200 relative group"
            >
              {active && (
                <span className="absolute -top-0.5 left-1/2 -translate-x-1/2 w-6 h-1 rounded-full gradient-primary" />
              )}
              <div className={`p-1.5 rounded-xl transition-all duration-200 ${
                active ? "bg-accent shadow-sm scale-110" : "group-active:scale-90"
              }`}>
                <item.icon size={20} strokeWidth={active ? 2.5 : 1.8} className={active ? "text-primary" : "text-muted-foreground"} />
              </div>
              <span className={`text-[10px] leading-tight truncate transition-colors ${
                active ? "font-bold text-primary" : "font-medium text-muted-foreground"
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
