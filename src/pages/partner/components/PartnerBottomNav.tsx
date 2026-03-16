import { useNavigate, useLocation } from "react-router-dom";
import { Home, ShoppingBag, Briefcase, Bath, ClipboardList, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { label: "Trang chủ", icon: Home, path: "/partner" },
  { label: "Đơn hàng", icon: ShoppingBag, path: "/partner/orders" },
  { label: "Công việc", icon: Briefcase, path: "/partner/tasks" },
  { label: "NVS", icon: Bath, path: "/partner/toilets" },
  { label: "Khảo sát", icon: ClipboardList, path: "/partner/surveys" },
  { label: "Chung", icon: MoreHorizontal, path: "/partner/general" },
];

const PartnerBottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-lg mx-auto px-2">
        <div className="bg-card/98 backdrop-blur-xl border-t border-border/20 rounded-t-2xl shadow-elevated safe-bottom">
          <div className="grid grid-cols-6 h-[60px]">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <motion.button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="flex flex-col items-center justify-center gap-[3px] relative"
                  whileTap={{ scale: 0.88 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                >
                  {active && (
                    <motion.span
                      layoutId="partner-nav-pill"
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 500, damping: 32 }}
                    />
                  )}
                  <item.icon
                    size={20}
                    strokeWidth={active ? 2.4 : 1.6}
                    className={`transition-colors duration-150 ${
                      active ? "text-primary" : "text-muted-foreground/70"
                    }`}
                  />
                  <span
                    className={`text-[10px] leading-none transition-all duration-150 ${
                      active ? "font-bold text-primary" : "font-medium text-muted-foreground/70"
                    }`}
                  >
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
