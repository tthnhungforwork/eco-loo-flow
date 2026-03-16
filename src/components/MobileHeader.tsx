import { Bell, ShoppingCart, Menu, ScanLine } from "lucide-react";
import logo from "@/assets/logo.png";
import { useRole } from "@/contexts/RoleContext";
import { motion } from "framer-motion";

interface MobileHeaderProps {
  title?: string;
  showLogo?: boolean;
  showSwitcher?: boolean;
}

const MobileHeader = ({ title, showLogo = true, showSwitcher = false }: MobileHeaderProps) => {
  const { currentAccount, openSheet } = useRole();

  return (
    <header className="sticky top-0 z-40 px-4 py-2.5 flex items-center gap-2 bg-primary">
      {/* Logo or Menu */}
      {showSwitcher ? (
        <motion.button
          onClick={openSheet}
          className="flex items-center gap-2 min-w-0"
          whileTap={{ scale: 0.96 }}
        >
          <div className="w-9 h-9 rounded-xl bg-primary-foreground/15 backdrop-blur-sm flex items-center justify-center shrink-0">
            <Menu className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="text-left min-w-0 hidden min-[340px]:block">
            <p className="text-[13px] font-bold text-primary-foreground leading-tight truncate max-w-[110px]">
              {currentAccount.label}
            </p>
            <p className="text-[10px] text-primary-foreground/65 leading-tight truncate max-w-[110px]">
              {currentAccount.subtitle}
            </p>
          </div>
        </motion.button>
      ) : (
        <motion.button
          whileTap={{ scale: 0.96 }}
          className="w-9 h-9 rounded-xl bg-primary-foreground/15 flex items-center justify-center shrink-0"
        >
          <Menu className="w-5 h-5 text-primary-foreground" />
        </motion.button>
      )}

      {title && (
        <h1 className="flex-1 font-bold text-base text-primary-foreground tracking-tight truncate">
          {title}
        </h1>
      )}
      {!title && <div className="flex-1" />}

      {/* Right actions */}
      <div className="flex items-center gap-1">
        <motion.button
          whileTap={{ scale: 0.85 }}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-primary-foreground/12 text-primary-foreground/85 hover:bg-primary-foreground/20 transition-colors shrink-0"
        >
          <ScanLine size={18} />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.85 }}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-primary-foreground/12 text-primary-foreground/85 hover:bg-primary-foreground/20 transition-colors shrink-0"
        >
          <ShoppingCart size={18} />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.85 }}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-primary-foreground/12 text-primary-foreground/85 hover:bg-primary-foreground/20 transition-colors relative shrink-0"
        >
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full border-[1.5px] border-primary animate-pulse-soft" />
        </motion.button>
      </div>
    </header>
  );
};

export default MobileHeader;
