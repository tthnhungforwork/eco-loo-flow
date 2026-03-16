import { Bell, Search } from "lucide-react";
import logo from "@/assets/logo.png";

interface MobileHeaderProps {
  title?: string;
  showLogo?: boolean;
}

const MobileHeader = ({ title, showLogo = true }: MobileHeaderProps) => {
  return (
    <header className="sticky top-0 z-40 glass-header px-4 py-3 flex items-center gap-3">
      {showLogo && (
        <div className="w-9 h-9 rounded-xl gradient-primary p-1.5 shadow-glow">
          <img src={logo} alt="Logo" className="w-full h-full object-contain brightness-0 invert" />
        </div>
      )}
      <h1 className="flex-1 font-bold text-lg text-foreground tracking-tight">{title || "Số hóa NVS"}</h1>
      <button className="touch-target flex items-center justify-center w-10 h-10 rounded-xl bg-muted/60 text-muted-foreground hover:bg-muted transition-colors">
        <Search size={18} />
      </button>
      <button className="touch-target flex items-center justify-center w-10 h-10 rounded-xl bg-muted/60 text-muted-foreground hover:bg-muted transition-colors relative">
        <Bell size={18} />
        <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-eco-red rounded-full border-2 border-card animate-pulse-soft" />
      </button>
    </header>
  );
};

export default MobileHeader;
