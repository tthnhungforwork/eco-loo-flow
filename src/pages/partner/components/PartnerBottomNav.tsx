import { useNavigate, useLocation } from "react-router-dom";
import { Home, ShoppingBag, Briefcase, Bath, ClipboardList, User } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { label: "Trang chủ", icon: Home, path: "/partner" },
  { label: "Đơn hàng", icon: ShoppingBag, path: "/partner/orders" },
  { label: "Công việc", icon: Briefcase, path: "/partner/tasks" },
  { label: "NVS", icon: Bath, path: "/partner/toilets" },
  { label: "Khảo sát", icon: ClipboardList, path: "/partner/surveys" },
  { label: "Cá nhân", icon: User, path: "/partner/profile" },
];

const PartnerBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-lg mx-auto">
        <div className="bg-card/95 backdrop-blur-2xl border-t border-border/30 rounded-t-2xl shadow-elevated mx-1 safe-bottom">
          <div className="flex items-end justify-around px-1 pt-1">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <motion.button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="flex flex-col items-center gap-0.5 py-2 px-1 min-w-0 flex-1 relative"
                  whileTap={{ scale: 0.85 }}
                  transition={{ type: "spring" as const, stiffness: 400, damping: 20 }}
                >
                  {active && (
                    <motion.span
                      layoutId="partner-nav-indicator"
                      className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-full gradient-primary"
                      transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
                    />
                  )}
                  <div className={`p-1 rounded-xl transition-all duration-200 ${active ? "bg-accent/80" : ""}`}>
                    <item.icon
                      size={21}
                      strokeWidth={active ? 2.5 : 1.5}
                      className={`transition-colors duration-200 ${active ? "text-primary" : "text-muted-foreground"}`}
                    />
                  </div>
                  <span className={`text-[10px] leading-tight truncate transition-all duration-200 ${
                    active ? "font-bold text-primary" : "font-medium text-muted-foreground"
                  }`}>
                    {item.label}
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default PartnerBottomNav;
