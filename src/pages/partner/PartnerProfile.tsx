import MobileHeader from "@/components/MobileHeader";
import { Handshake, ShoppingBag, ChevronRight, LogOut, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const PartnerProfile = () => {
  const navigate = useNavigate();
  return (
    <div>
      <MobileHeader title="Chung" />
      <div className="px-4 py-5 space-y-5">
        <motion.div className="glass-card rounded-2xl p-5 flex items-center gap-4" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-16 h-16 rounded-2xl gradient-blue flex items-center justify-center text-secondary-foreground font-extrabold text-xl shadow-glow-blue">
            ĐT
          </div>
          <div className="flex-1">
            <p className="font-bold text-foreground text-lg">Công ty Eco Clean</p>
            <p className="text-xs text-muted-foreground">partner@ecoclean.vn</p>
            <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full bg-eco-blue-light text-secondary text-[10px] font-bold">Đối tác</span>
          </div>
          <button className="w-10 h-10 rounded-xl bg-muted/60 flex items-center justify-center">
            <Settings size={18} className="text-muted-foreground" />
          </button>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2 px-1">Quản trị</h3>
          <div className="glass-card rounded-2xl overflow-hidden">
            {[
              { icon: Handshake, label: "Quản lý đối tác", desc: "Xem danh sách đối tác" },
              { icon: ShoppingBag, label: "Quản lý bán hàng", desc: "Theo dõi doanh số" },
            ].map((item, i) => (
              <button key={i} className="w-full flex items-center gap-3 px-4 py-4 touch-target border-b border-border/30 last:border-0 text-left active:bg-muted/50 transition-colors">
                <div className="icon-container-sm bg-accent">
                  <item.icon size={18} className="text-accent-foreground" />
                </div>
                <div className="flex-1">
                  <span className="text-sm font-semibold text-foreground">{item.label}</span>
                  <p className="text-[11px] text-muted-foreground">{item.desc}</p>
                </div>
                <ChevronRight size={18} className="text-muted-foreground" />
              </button>
            ))}
          </div>
        </motion.div>

        <motion.button
          onClick={() => navigate("/login")}
          className="w-full flex items-center gap-3 px-4 py-4 glass-card rounded-2xl border-destructive/20 touch-target"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          whileTap={{ scale: 0.97 }}
        >
          <div className="icon-container-sm bg-destructive/10">
            <LogOut size={18} className="text-destructive" />
          </div>
          <span className="text-sm font-semibold text-destructive">Đăng xuất</span>
        </motion.button>
      </div>
    </div>
  );
};

export default PartnerProfile;
