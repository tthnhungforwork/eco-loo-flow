import { Bell, ScanLine, ShoppingCart, Menu } from "lucide-react";
import logo from "@/assets/logo.png";
import { useRole } from "@/contexts/RoleContext";

interface MobileHeaderProps {
  title?: string;
  showLogo?: boolean;
  showSwitcher?: boolean;
}

const MobileHeader = ({ title, showLogo = true, showSwitcher = false }: MobileHeaderProps) => {
  const { openSheet } = useRole();

  return (
    <header className="sticky top-0 z-40 glass-header px-4 py-3 flex items-center gap-2">
      {showSwitcher ? (
        <button
          onClick={openSheet}
          className="flex items-center justify-center w-9 h-9 rounded-xl bg-muted/60 text-muted-foreground hover:bg-muted transition-colors shrink-0"
        >
          <Menu size={20} />
        </button>
      ) : showLogo ? (
        <div className="w-9 h-9 rounded-xl gradient-primary p-1.5 shadow-glow">
          <img src={logo} alt="Logo" className="w-full h-full object-contain brightness-0 invert" />
        </div>
      ) : null}
      <h1 className="flex-1 font-bold text-lg text-foreground tracking-tight truncate">
        {title || (showSwitcher ? "" : "Số hóa NVS")}
      </h1>
      <button className="flex items-center justify-center w-10 h-10 rounded-xl bg-muted/60 text-muted-foreground hover:bg-muted transition-colors shrink-0">
        <ScanLine size={18} />
      </button>
      <button className="flex items-center justify-center w-10 h-10 rounded-xl bg-muted/60 text-muted-foreground hover:bg-muted transition-colors relative shrink-0">
        <ShoppingCart size={18} />
        <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 bg-destructive rounded-full border-2 border-card text-[9px] font-bold text-destructive-foreground flex items-center justify-center">2</span>
      </button>
      <button className="flex items-center justify-center w-10 h-10 rounded-xl bg-muted/60 text-muted-foreground hover:bg-muted transition-colors relative shrink-0">
        <Bell size={18} />
        <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-destructive rounded-full border-2 border-card animate-pulse-soft" />
      </button>
    </header>
  );
};

export default MobileHeader;
