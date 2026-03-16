import { useNavigate, useLocation } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import { ScanLine } from "lucide-react";
import { motion } from "framer-motion";

export interface NavItem {
  label: string;
  icon: LucideIcon;
  path: string;
}

interface BottomNavProps {
  items: NavItem[];
  /** Path to navigate when center QR button is tapped */
  onScanQR?: () => void;
}

const BottomNav = ({ items, onScanQR }: BottomNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Split items: first half on left, second half on right, QR in center
  const leftItems = items.slice(0, Math.ceil(items.length / 2));
  const rightItems = items.slice(Math.ceil(items.length / 2));

  const renderItem = (item: NavItem) => {
    const active = location.pathname === item.path;
    return (
      <motion.button
        key={item.path}
        onClick={() => navigate(item.path)}
        className="flex flex-col items-center gap-0.5 py-1.5 min-w-0 flex-1 relative"
        whileTap={{ scale: 0.85 }}
        transition={{ type: "spring" as const, stiffness: 400, damping: 20 }}
      >
        <div className={`p-1 rounded-xl transition-all duration-200 ${active ? "" : ""}`}>
          <item.icon
            size={22}
            strokeWidth={active ? 2.5 : 1.5}
            className={`transition-colors duration-200 ${active ? "text-primary" : "text-muted-foreground"}`}
          />
        </div>
        <span className={`text-[10px] leading-tight truncate transition-all duration-200 ${
          active ? "font-bold text-primary" : "font-medium text-muted-foreground"
        }`}>
          {item.label}
        </span>
        {active && (
          <motion.span
            layoutId="nav-dot"
            className="absolute -top-0.5 w-5 h-[2.5px] rounded-full gradient-primary"
            transition={{ type: "spring" as const, stiffness: 400, damping: 30 }}
          />
        )}
      </motion.button>
    );
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-lg mx-auto relative">
        {/* Center QR Button - floating above nav */}
        <motion.button
          onClick={onScanQR}
          className="absolute left-1/2 -translate-x-1/2 -top-5 z-10 w-[56px] h-[56px] rounded-2xl gradient-primary shadow-glow flex items-center justify-center border-4 border-background"
          whileTap={{ scale: 0.9, rotate: -5 }}
          transition={{ type: "spring" as const, stiffness: 400, damping: 15 }}
        >
          <ScanLine size={24} className="text-primary-foreground" />
        </motion.button>

        {/* Nav bar */}
        <div className="bg-card/95 backdrop-blur-2xl border-t border-border/30 rounded-t-2xl shadow-elevated mx-1 safe-bottom">
          <div className="flex items-end px-1 pt-1">
            {/* Left items */}
            <div className="flex flex-1">
              {leftItems.map(renderItem)}
            </div>

            {/* Center spacer for QR button */}
            <div className="w-16 flex flex-col items-center pt-5 pb-1.5">
              <span className="text-[10px] font-medium text-muted-foreground">Quét QR</span>
            </div>

            {/* Right items */}
            <div className="flex flex-1">
              {rightItems.map(renderItem)}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
