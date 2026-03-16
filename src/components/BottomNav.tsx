import { useNavigate, useLocation } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

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
    <nav className="fixed bottom-0 left-0 right-0 glass-bottom safe-bottom z-50">
      <div className="flex justify-around items-center max-w-lg mx-auto px-2">
        {items.map((item) => {
          const active = location.pathname === item.path;
          return (
            <motion.button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="flex flex-col items-center gap-0.5 py-2.5 px-1 min-w-0 flex-1 touch-target relative group"
              whileTap={{ scale: 0.88 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              {active && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-8 h-[3px] rounded-full gradient-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <motion.div
                className={`p-1.5 rounded-xl transition-colors duration-300 ${
                  active ? "bg-accent/80" : ""
                }`}
                animate={active ? { scale: 1.1 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <item.icon
                  size={20}
                  strokeWidth={active ? 2.5 : 1.8}
                  className={`transition-colors duration-200 ${active ? "text-primary" : "text-muted-foreground"}`}
                />
              </motion.div>
              <span className={`text-[10px] leading-tight truncate transition-all duration-200 ${
                active ? "font-bold text-primary" : "font-medium text-muted-foreground"
              }`}>
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
