import { useRole } from "@/contexts/RoleContext";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const RoleSwitcherButton = () => {
  const { currentRole, openSheet } = useRole();

  return (
    <motion.button
      onClick={openSheet}
      className="flex items-center gap-2.5 px-2 py-1.5 rounded-xl hover:bg-muted/50 active:bg-muted/80 transition-colors -ml-1"
      whileTap={{ scale: 0.96 }}
    >
      <div className={`w-8 h-8 rounded-full ${currentRole.gradient} flex items-center justify-center text-primary-foreground text-[11px] font-bold shadow-sm`}>
        {currentRole.initials}
      </div>
      <div className="text-left hidden min-[360px]:block">
        <p className="text-[13px] font-bold text-foreground leading-tight truncate max-w-[120px]">
          {currentRole.label}
        </p>
      </div>
      <ChevronDown size={14} className="text-muted-foreground shrink-0" />
    </motion.button>
  );
};

export default RoleSwitcherButton;
