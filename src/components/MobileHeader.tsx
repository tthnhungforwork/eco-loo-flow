import { Bell, ScanLine, ShoppingCart, Menu } from "lucide-react";
import logo from "@/assets/logo.png";
import { useRole } from "@/contexts/RoleContext";

interface MobileHeaderProps {
  title?: string;
  showLogo?: boolean;
  showSwitcher?: boolean;
}

const MobileHeader = ({ title, showLogo = true, showSwitcher = false }: MobileHeaderProps) => {
  const { currentAccount, openSheet } = useRole();

  return (
    <header className="sticky top-0 z-40 glass-header px-4 py-3 flex items-center gap-2">
      {showSwitcher ? (
        <button
          onClick={openSheet}
          className="flex items-center gap-2 px-1.5 py-1 rounded-xl hover:bg-muted/50 active:bg-muted/80 transition-colors -ml-1 min-w-0"
        >
          <div className="w-8 h-8 rounded-lg bg-muted/80 flex items-center justify-center shrink-0">
            <Menu size={18} className="text-foreground" />
          </div>
          <div className="text-left min-w-0 hidden min-[340px]:block">
            <p className="text-[13px] font-bold text-foreground leading-tight truncate max-w-[120px]">
              {currentAccount.label}
            </p>
            <p className="text-[10px] text-muted-foreground leading-tight truncate max-w-[120px]">
              {currentAccount.subtitle}
            </p>
          </div>
        </button>
      ) : showLogo ? (
        <div className="w-9 h-9 rounded-xl gradient-primary p-1.5 shadow-glow">
          <img src={logo} alt="Logo" className="w-full h-full object-contain brightness-0 invert" />
        </div>
      ) : null}
      <h1 className="flex-1 font-bold text-lg text-foreground tracking-tight truncate">
        {title || (showSwitcher ? "" : "Số hóa NVS")}
      </h1>
      <button className="flex items-center justify-center w-9 h-9 rounded-xl bg-muted/60 text-muted-foreground hover:bg-muted transition-colors shrink-0">
        <ScanLine size={17} />
      </button>
      <button className="flex items-center justify-center w-9 h-9 rounded-xl bg-muted/60 text-muted-foreground hover:bg-muted transition-colors relative shrink-0">
        <ShoppingCart size={17} />
        <span className="absolute top-1 right-1 min-w-[15px] h-[15px] px-0.5 bg-destructive rounded-full border-[1.5px] border-card text-[8px] font-bold text-destructive-foreground flex items-center justify-center">2</span>
      </button>
      <button className="flex items-center justify-center w-9 h-9 rounded-xl bg-muted/60 text-muted-foreground hover:bg-muted transition-colors relative shrink-0">
        <Bell size={17} />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full border-[1.5px] border-card animate-pulse-soft" />
      </button>
    </header>
  );
};

export default MobileHeader;
