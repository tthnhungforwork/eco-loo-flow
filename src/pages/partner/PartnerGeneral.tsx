import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PartnerHeader from "./components/PartnerHeader";
import { useRole } from "@/contexts/RoleContext";
import {
  Building2, Users, Wrench, ChevronRight, Settings, LogOut, Shield, Plus,
  ShoppingBag, BarChart3, TrendingUp, Package, Star, FileText, Phone, Mail,
  MapPin, User, Crown, Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Mock partner team data
const teamMembers = [
  { id: 1, name: "Trần Văn A", role: "Nhân viên VSLD", phone: "0901111222", status: "active", tasks: 5 },
  { id: 2, name: "Lê Thị B", role: "Nhân viên SCBD", phone: "0902222333", status: "active", tasks: 3 },
  { id: 3, name: "Phạm Văn C", role: "Nhân viên VSLD", phone: "0903333444", status: "inactive", tasks: 0 },
  { id: 4, name: "Nguyễn Văn D", role: "Kỹ thuật viên", phone: "0904444555", status: "active", tasks: 8 },
];

const salesStats = [
  { label: "Doanh thu tháng", value: "15.2M", change: "+12%", icon: TrendingUp },
  { label: "Đơn hoàn thành", value: "23", change: "+5", icon: Package },
  { label: "Đánh giá TB", value: "4.8", change: "+0.2", icon: Star },
  { label: "Hoa hồng", value: "3.5M", change: "+8%", icon: Crown },
];

const recentTransactions = [
  { id: 1, name: "VSLD Block A - T3", amount: "2.500.000đ", date: "15/03", status: "paid" },
  { id: 2, name: "SCBD Tầng 3 - Q1", amount: "8.000.000đ", date: "12/03", status: "pending" },
  { id: 3, name: "Tư vấn số hóa NVS", amount: "5.000.000đ", date: "10/03", status: "paid" },
  { id: 4, name: "VSLD Sảnh B - T3", amount: "1.800.000đ", date: "08/03", status: "paid" },
];

const services = [
  { name: "Vệ sinh lau dọn (VSLD)", active: true },
  { name: "Sửa chữa bảo dưỡng (SCBD)", active: true },
  { name: "Xây dựng & Cải tạo", active: false },
  { name: "Dịch vụ Netzero", active: false },
];

const tabs = ["Quản lý đối tác", "Quản lý bán hàng"];

const PartnerGeneral = () => {
  const navigate = useNavigate();
  const { currentAccount, isBusinessOwner } = useRole();
  const [tab, setTab] = useState(0);

  return (
    <div>
      <PartnerHeader title="Chung" />
      <div className="py-4">
        {/* Tabs */}
        <div className="px-4 mb-4 flex gap-2">
          {tabs.map((t, i) => (
            <button
              key={t}
              onClick={() => setTab(i)}
              className={`flex-1 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                tab === i ? "gradient-primary text-primary-foreground shadow-glow" : "bg-muted text-muted-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === 0 ? (
          /* ===== Quản lý đối tác ===== */
          <div className="px-4 space-y-4 pb-24">
            {/* Profile card */}
            <motion.div className="glass-card rounded-2xl p-5 flex items-center gap-4" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
              <div className={`w-16 h-16 rounded-full ${currentAccount.gradient} flex items-center justify-center text-primary-foreground font-bold text-lg shadow-glow`}>
                {currentAccount.initials}
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="font-bold text-base text-foreground truncate">{currentAccount.label}</h2>
                <p className="text-xs text-muted-foreground mt-0.5">{currentAccount.subtitle}</p>
                {isBusinessOwner && (
                  <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    <Shield size={10} /> Quản trị
                  </span>
                )}
              </div>
            </motion.div>

            {/* Services */}
            <motion.div className="glass-card rounded-2xl p-5" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
              <h3 className="font-bold text-sm text-foreground mb-3 flex items-center gap-2">
                <Wrench size={16} className="text-primary" /> Dịch vụ cung cấp
              </h3>
              <div className="space-y-2">
                {services.map((s) => (
                  <div key={s.name} className="flex items-center justify-between p-2.5 rounded-xl bg-muted/40">
                    <span className="text-[13px] text-foreground">{s.name}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      s.active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                    }`}>
                      {s.active ? "Đang cung cấp" : "Chưa đăng ký"}
                    </span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 flex items-center justify-center gap-1 text-sm font-semibold text-primary py-2.5 rounded-xl border-2 border-dashed border-primary/30 hover:bg-primary/5 transition-colors">
                <Plus size={16} /> Đăng ký bổ sung dịch vụ
              </button>
            </motion.div>

            {/* Team (if business owner) */}
            {isBusinessOwner && (
              <motion.div className="glass-card rounded-2xl p-5" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-sm text-foreground flex items-center gap-2">
                    <Users size={16} className="text-primary" /> Nhân sự ({teamMembers.length})
                  </h3>
                  <Button size="sm" className="h-8 rounded-xl font-bold text-xs gradient-primary border-0 gap-1">
                    <Plus size={14} /> Thêm
                  </Button>
                </div>
                <div className="space-y-2">
                  {teamMembers.map((m) => (
                    <div key={m.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/40">
                      <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                        {m.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] font-semibold text-foreground truncate">{m.name}</p>
                        <p className="text-[10px] text-muted-foreground">{m.role} · {m.tasks} việc</p>
                      </div>
                      <span className={`w-2 h-2 rounded-full ${m.status === "active" ? "bg-primary" : "bg-muted-foreground"}`} />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Menu items */}
            <div className="space-y-2">
              {[
                ...(isBusinessOwner ? [
                  { icon: Building2, label: "Thông tin doanh nghiệp", desc: "Thông tin DN, mã số thuế" },
                ] : []),
                { icon: Settings, label: "Cài đặt tài khoản", desc: "Đổi mật khẩu, thông tin cá nhân" },
                { icon: Award, label: "Chứng chỉ & Đánh giá", desc: "Xem đánh giá từ khách hàng" },
              ].map((item, i) => (
                <motion.button
                  key={item.label}
                  className="w-full glass-card rounded-2xl p-4 flex items-center gap-3 text-left card-hover"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                    <item.icon size={18} className="text-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{item.label}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground/40 shrink-0" />
                </motion.button>
              ))}
            </div>

            <motion.button
              className="w-full glass-card rounded-2xl p-4 flex items-center gap-3 text-left border border-destructive/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              onClick={() => navigate("/login")}
            >
              <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                <LogOut size={18} className="text-destructive" />
              </div>
              <p className="text-sm font-semibold text-destructive">Đăng xuất</p>
            </motion.button>
          </div>
        ) : (
          /* ===== Quản lý bán hàng ===== */
          <div className="px-4 space-y-4 pb-24">
            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-3">
              {salesStats.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="glass-card rounded-2xl p-4"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center">
                      <s.icon size={16} className="text-primary" />
                    </div>
                    <span className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-0.5 rounded-full">{s.change}</span>
                  </div>
                  <p className="text-xl font-black text-foreground">{s.value}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{s.label}</p>
                </motion.div>
              ))}
            </div>

            {/* Recent transactions */}
            <motion.div
              className="glass-card rounded-2xl p-5"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <h3 className="font-bold text-sm text-foreground mb-3 flex items-center gap-2">
                <FileText size={16} className="text-primary" /> Giao dịch gần đây
              </h3>
              <div className="space-y-2.5">
                {recentTransactions.map((t) => (
                  <div key={t.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-muted/40">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                      t.status === "paid" ? "bg-primary/10" : "bg-amber-500/10"
                    }`}>
                      <ShoppingBag size={16} className={t.status === "paid" ? "text-primary" : "text-amber-500"} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-semibold text-foreground truncate">{t.name}</p>
                      <p className="text-[10px] text-muted-foreground">{t.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[13px] font-bold text-foreground">{t.amount}</p>
                      <span className={`text-[9px] font-bold ${
                        t.status === "paid" ? "text-primary" : "text-amber-500"
                      }`}>
                        {t.status === "paid" ? "Đã thanh toán" : "Chờ thanh toán"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick actions for sales */}
            <div className="space-y-2">
              {[
                { icon: BarChart3, label: "Báo cáo doanh thu", desc: "Xem chi tiết doanh thu theo tháng" },
                { icon: Package, label: "Quản lý sản phẩm", desc: "Sản phẩm xanh đã đặt mua" },
              ].map((item, i) => (
                <motion.button
                  key={item.label}
                  className="w-full glass-card rounded-2xl p-4 flex items-center gap-3 text-left card-hover"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.05 }}
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon size={18} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{item.label}</p>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                  <ChevronRight size={16} className="text-muted-foreground/40 shrink-0" />
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartnerGeneral;
