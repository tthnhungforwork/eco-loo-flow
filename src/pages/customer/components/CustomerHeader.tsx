import { Bell, ShoppingCart, Menu, ScanLine } from "lucide-react";
import { useRole } from "@/contexts/RoleContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface CustomerHeaderProps {
  title?: string;
  showSwitcher?: boolean;
}

const CustomerHeader = ({ title, showSwitcher = false }: CustomerHeaderProps) => {
  const { currentAccount, openSheet } = useRole();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-primary">
      <div className="flex items-center justify-between px-4 h-14">
        {/* Left: Menu + Info */}
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <motion.button
            onClick={openSheet}
            whileTap={{ scale: 0.9 }}
            className="w-9 h-9 rounded-xl bg-primary-foreground/15 backdrop-blur-sm flex items-center justify-center shrink-0"
          >
            <Menu className="w-[18px] h-[18px] text-primary-foreground" />
          </motion.button>

          {showSwitcher ? (
            <motion.button
              onClick={openSheet}
              className="min-w-0 text-left"
              whileTap={{ scale: 0.97 }}
            >
              <p className="text-[13px] font-bold text-primary-foreground leading-tight truncate max-w-[140px]">
                {currentAccount.label}
              </p>
              <p className="text-[10px] text-primary-foreground/60 leading-tight truncate max-w-[140px]">
                {currentAccount.subtitle}
              </p>
            </motion.button>
          ) : title ? (
            <h1 className="font-bold text-[15px] text-primary-foreground tracking-tight truncate">
              {title}
            </h1>
          ) : null}
        </div>

        {/* Right: Action icons */}
        <div className="flex items-center gap-1.5 shrink-0">
          {[
            { icon: ScanLine, onClick: () => {}, badge: false },
            { icon: ShoppingCart, onClick: () => navigate("/customer/cart"), badge: false },
            { icon: Bell, onClick: () => {}, badge: true },
          ].map(({ icon: Icon, onClick, badge }, i) => (
            <motion.button
              key={i}
              whileTap={{ scale: 0.85 }}
              onClick={onClick}
              className="w-9 h-9 rounded-xl bg-primary-foreground/10 flex items-center justify-center relative transition-colors hover:bg-primary-foreground/18"
            >
              <Icon size={17} className="text-primary-foreground/90" />
              {badge && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full ring-2 ring-primary animate-pulse-soft" />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default CustomerHeader;
