import MobileHeader from "@/components/MobileHeader";
import { User, Ticket, ClipboardList, ChevronRight, LogOut, Settings, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const menuSections = [
  {
    items: [
      { icon: User, label: "Thông tin cá nhân", desc: "Cập nhật hồ sơ của bạn" },
      { icon: Ticket, label: "Ticket", desc: "Xem lịch sử ticket hỗ trợ" },
    ],
  },
  {
    title: "Khảo sát",
    items: [
      { icon: ClipboardList, label: "Tư vấn số hóa NVS", desc: "Đánh giá và tư vấn giải pháp" },
      { icon: Shield, label: "Sạch - Xanh - Tuần hoàn", desc: "Khảo sát tiêu chí bền vững" },
    ],
  },
];

const CustomerProfile = () => {
  const navigate = useNavigate();

  return (
    <div>
      <MobileHeader title="Chung" />
      <div className="px-4 py-5 space-y-5">
        {/* Avatar Section */}
        <motion.div
          className="glass-card rounded-2xl p-5 flex items-center gap-4"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center text-primary-foreground font-extrabold text-xl shadow-glow">
            KH
          </div>
          <div className="flex-1">
            <p className="font-bold text-foreground text-lg">Nguyễn Văn Khách</p>
            <p className="text-xs text-muted-foreground">khach@email.com</p>
            <span className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full bg-accent text-accent-foreground text-[10px] font-bold">Khách hàng</span>
          </div>
          <button className="w-10 h-10 rounded-xl bg-muted/60 flex items-center justify-center">
            <Settings size={18} className="text-muted-foreground" />
          </button>
        </motion.div>

        {menuSections.map((section, si) => (
          <motion.div
            key={si}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + si * 0.08 }}
          >
            {section.title && (
              <h3 className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mb-2 px-1">{section.title}</h3>
            )}
            <div className="glass-card rounded-2xl overflow-hidden">
              {section.items.map((item, i) => (
                <button
                  key={i}
                  className="w-full flex items-center gap-3 px-4 py-4 touch-target border-b border-border/30 last:border-0 text-left active:bg-muted/50 transition-colors"
                >
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
        ))}

        <motion.button
          onClick={() => navigate("/login")}
          className="w-full flex items-center gap-3 px-4 py-4 glass-card rounded-2xl border-destructive/20 touch-target"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
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

export default CustomerProfile;
