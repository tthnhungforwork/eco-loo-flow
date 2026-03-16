import { useNavigate } from "react-router-dom";
import { useRole, ACCOUNT_PROFILES, ACCOUNT_GROUPS } from "@/contexts/RoleContext";
import { Check, X, ArrowRightLeft, Plus, Building2, User, Handshake } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const groupIcons: Record<string, typeof User> = {
  personal: User,
  business: Building2,
  partner: Handshake,
};

const RoleSwitcherSheet = () => {
  const { currentAccount, setAccount, isSheetOpen, closeSheet } = useRole();
  const navigate = useNavigate();

  const handleSwitch = (id: string) => {
    const profile = ACCOUNT_PROFILES.find((r) => r.id === id);
    setAccount(id);
    if (profile) {
      navigate(profile.basePath);
    }
  };

  return (
    <AnimatePresence>
      {isSheetOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-[90]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSheet}
          />

          <motion.div
            className="fixed bottom-0 left-0 right-0 z-[100] max-w-lg mx-auto"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
          >
            <div className="bg-card rounded-t-3xl shadow-elevated border-t border-border/50 overflow-hidden max-h-[85vh] flex flex-col">
              {/* Handle */}
              <div className="flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
              </div>

              {/* Header */}
              <div className="px-5 pb-3 pt-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ArrowRightLeft size={18} className="text-primary" />
                  <h2 className="font-bold text-base text-foreground">Chuyển đổi tài khoản</h2>
                </div>
                <button
                  onClick={closeSheet}
                  className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground active:scale-90 transition-transform"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="h-px bg-border/50 mx-5" />

              {/* Scrollable grouped list */}
              <div className="overflow-y-auto flex-1 px-4 py-3 space-y-4">
                {ACCOUNT_GROUPS.map((group) => {
                  const profiles = ACCOUNT_PROFILES.filter((p) => group.types.includes(p.type));
                  if (profiles.length === 0) return null;
                  const GroupIcon = groupIcons[group.key] || User;

                  return (
                    <div key={group.key}>
                      <div className="flex items-center gap-1.5 px-2 mb-1.5">
                        <GroupIcon size={12} className="text-muted-foreground" />
                        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
                          {group.label}
                        </span>
                        <span className="text-[10px] text-muted-foreground/60 ml-1">({profiles.length})</span>
                      </div>
                      <div className="space-y-1">
                        {profiles.map((profile, i) => {
                          const isActive = currentAccount.id === profile.id;
                          return (
                            <motion.button
                              key={profile.id}
                              onClick={() => handleSwitch(profile.id)}
                              className={`w-full flex items-center gap-3.5 px-3 py-3.5 rounded-2xl transition-all touch-target text-left ${
                                isActive
                                  ? "bg-accent/80 border border-primary/20"
                                  : "hover:bg-muted/50 active:bg-muted/80 border border-transparent"
                              }`}
                              initial={{ opacity: 0, x: -16 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.04 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className={`w-12 h-12 rounded-full ${profile.gradient} flex items-center justify-center text-primary-foreground font-bold text-sm shadow-sm shrink-0 relative`}>
                                {profile.initials}
                                {profile.notifications && profile.notifications > 0 && !isActive && (
                                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-eco-red text-primary-foreground text-[10px] font-bold flex items-center justify-center border-2 border-card">
                                    {profile.notifications}
                                  </span>
                                )}
                              </div>

                              <div className="flex-1 min-w-0">
                                <p className={`text-sm font-semibold truncate ${isActive ? "text-primary" : "text-foreground"}`}>
                                  {profile.label}
                                </p>
                                <p className="text-[11px] text-muted-foreground mt-0.5 flex items-center gap-1">
                                  {profile.subtitle}
                                  {profile.notifications && profile.notifications > 0 && !isActive && (
                                    <span className="text-eco-red font-medium">· {profile.notifications} thông báo</span>
                                  )}
                                </p>
                              </div>

                              {isActive && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-7 h-7 rounded-full gradient-primary flex items-center justify-center shadow-glow shrink-0"
                                >
                                  <Check size={14} className="text-primary-foreground" strokeWidth={3} />
                                </motion.div>
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="h-px bg-border/50 mx-5" />

              {/* Add account */}
              <div className="px-4 py-3 safe-bottom">
                <button className="w-full flex items-center gap-3.5 px-3 py-3 rounded-2xl hover:bg-muted/50 active:bg-muted/80 transition-colors touch-target text-left">
                  <div className="w-12 h-12 rounded-full bg-muted border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                    <Plus size={20} className="text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Đăng ký vai trò mới</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Thêm doanh nghiệp hoặc trở thành Đối tác</p>
                  </div>
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default RoleSwitcherSheet;
