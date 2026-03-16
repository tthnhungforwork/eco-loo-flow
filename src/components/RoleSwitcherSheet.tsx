import { useNavigate } from "react-router-dom";
import { useRole, ACCOUNT_PROFILES, ACCOUNT_GROUPS } from "@/contexts/RoleContext";
import { Check, X, ArrowRightLeft, Plus, Building2, User, Handshake, ChevronRight } from "lucide-react";
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
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-[90]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeSheet}
          />

          {/* Sidebar from left */}
          <motion.div
            className="fixed top-0 left-0 bottom-0 z-[100] w-[85vw] max-w-[340px]"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
          >
            <div className="h-full bg-card shadow-elevated flex flex-col overflow-hidden">
              {/* Current account header */}
              <div className="px-5 pt-[max(env(safe-area-inset-top),12px)] pb-4 bg-gradient-to-br from-primary/10 to-primary/5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <ArrowRightLeft size={18} className="text-primary" />
                    <h2 className="font-bold text-base text-foreground">Chuyển đổi</h2>
                  </div>
                  <button
                    onClick={closeSheet}
                    className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground active:scale-90 transition-transform"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Active account card */}
                <div className="flex items-center gap-3 p-3 rounded-2xl glass-card">
                  <div className={`w-12 h-12 rounded-full ${currentAccount.gradient} flex items-center justify-center text-primary-foreground font-bold text-sm shadow-sm shrink-0`}>
                    {currentAccount.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground truncate">{currentAccount.label}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{currentAccount.subtitle}</p>
                  </div>
                  <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center shadow-glow shrink-0">
                    <Check size={12} className="text-primary-foreground" strokeWidth={3} />
                  </div>
                </div>
              </div>

              <div className="h-px bg-border/50" />

              {/* Scrollable grouped list */}
              <div className="overflow-y-auto flex-1 py-3 space-y-1">
                {ACCOUNT_GROUPS.map((group) => {
                  const profiles = ACCOUNT_PROFILES.filter((p) => group.types.includes(p.type));
                  if (profiles.length === 0) return null;
                  const GroupIcon = groupIcons[group.key] || User;

                  return (
                    <div key={group.key} className="px-3">
                      <div className="flex items-center gap-1.5 px-2 py-2">
                        <GroupIcon size={12} className="text-muted-foreground" />
                        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">
                          {group.label}
                        </span>
                        <span className="text-[10px] text-muted-foreground/60 ml-1">({profiles.length})</span>
                      </div>
                      <div className="space-y-0.5">
                        {profiles.map((profile, i) => {
                          const isActive = currentAccount.id === profile.id;
                          return (
                            <motion.button
                              key={profile.id}
                              onClick={() => handleSwitch(profile.id)}
                              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left ${
                                isActive
                                  ? "bg-primary/10 border border-primary/20"
                                  : "hover:bg-muted/50 active:bg-muted/80 border border-transparent"
                              }`}
                              initial={{ opacity: 0, x: -16 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.03 }}
                              whileTap={{ scale: 0.98 }}
                            >
                              <div className={`w-10 h-10 rounded-full ${profile.gradient} flex items-center justify-center text-primary-foreground font-bold text-xs shadow-sm shrink-0 relative`}>
                                {profile.initials}
                                {profile.notifications && profile.notifications > 0 && !isActive && (
                                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-destructive text-destructive-foreground text-[9px] font-bold flex items-center justify-center border-2 border-card">
                                    {profile.notifications}
                                  </span>
                                )}
                              </div>

                              <div className="flex-1 min-w-0">
                                <p className={`text-[13px] font-semibold truncate ${isActive ? "text-primary" : "text-foreground"}`}>
                                  {profile.label}
                                </p>
                                <p className="text-[10px] text-muted-foreground mt-0.5 flex items-center gap-1">
                                  {profile.subtitle}
                                  {profile.notifications && profile.notifications > 0 && !isActive && (
                                    <span className="text-destructive font-medium">· {profile.notifications}</span>
                                  )}
                                </p>
                              </div>

                              {isActive && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-5 h-5 rounded-full gradient-primary flex items-center justify-center shrink-0"
                                >
                                  <Check size={10} className="text-primary-foreground" strokeWidth={3} />
                                </motion.div>
                              )}

                              {!isActive && (
                                <ChevronRight size={14} className="text-muted-foreground/40 shrink-0" />
                              )}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="h-px bg-border/50" />

              {/* Add account */}
              <div className="px-3 py-3 safe-bottom">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted/50 active:bg-muted/80 transition-colors text-left">
                  <div className="w-10 h-10 rounded-full bg-muted border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                    <Plus size={18} className="text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-foreground">Đăng ký vai trò mới</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Thêm doanh nghiệp hoặc trở thành Đối tác</p>
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
