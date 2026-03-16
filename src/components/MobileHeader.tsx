import { Bell, Search } from "lucide-react";
import logo from "@/assets/logo.png";

interface MobileHeaderProps {
  title?: string;
  showLogo?: boolean;
}

const MobileHeader = ({ title, showLogo = true }: MobileHeaderProps) => {
  return (
    <header className="sticky top-0 z-40 bg-card border-b border-border px-4 py-3 flex items-center gap-3">
      {showLogo && <img src={logo} alt="Logo" className="w-8 h-8" />}
      <h1 className="flex-1 font-bold text-lg text-foreground truncate">{title || "Số hóa NVS"}</h1>
      <button className="touch-target flex items-center justify-center text-muted-foreground">
        <Search size={20} />
      </button>
      <button className="touch-target flex items-center justify-center text-muted-foreground relative">
        <Bell size={20} />
        <span className="absolute top-1 right-1 w-2 h-2 bg-eco-red rounded-full" />
      </button>
    </header>
  );
};

export default MobileHeader;
