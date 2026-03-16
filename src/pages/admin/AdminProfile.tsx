import { useState } from "react";
import MobileHeader from "@/components/MobileHeader";
import SegmentedControl from "@/components/SegmentedControl";
import StatusBadge from "@/components/StatusBadge";
import { Handshake, Users, ChevronRight, LogOut, CheckCircle2, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const approvedPartners = [
  { id: 1, name: "Công ty Eco Clean", contact: "0901234567", status: "done" },
  { id: 2, name: "Đại lý Xanh Miền Nam", contact: "0912345678", status: "done" },
];

const pendingPartners = [
  { id: 3, name: "Công ty Vệ sinh ABC", contact: "0923456789", status: "new" },
  { id: 4, name: "Cá nhân Trần Văn D", contact: "0934567890", status: "new" },
];

const staff = [
  { id: 1, name: "Nguyễn Thị A", role: "Điều phối viên", status: "active" },
  { id: 2, name: "Trần Văn B", role: "Quản lý NVS", status: "active" },
  { id: 3, name: "Lê Thị C", role: "Nhân viên kỹ thuật", status: "active" },
];

const AdminProfile = () => {
  const navigate = useNavigate();
  const [partnerTab, setPartnerTab] = useState(0);
  const partners = partnerTab === 0 ? approvedPartners : pendingPartners;

  return (
    <div>
      <MobileHeader title="Chung" />
      <div className="px-4 py-4 space-y-5 animate-fade-in">
        {/* Avatar */}
        <div className="bg-card rounded-xl border border-border p-5 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
            AD
          </div>
          <div>
            <p className="font-bold text-foreground">Admin KTX</p>
            <p className="text-xs text-muted-foreground">admin@ktx.vn</p>
          </div>
        </div>

        {/* Partner Management */}
        <section>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1 flex items-center gap-2">
            <Handshake size={14} />Quản lý đối tác
          </h3>
          <SegmentedControl tabs={["Đã duyệt", "Chưa duyệt"]} active={partnerTab} onChange={setPartnerTab} />
          <div className="space-y-2">
            {partners.map((p) => (
              <div key={p.id} className="bg-card rounded-xl border border-border p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${p.status === "done" ? "bg-eco-green-light" : "bg-muted"}`}>
                  {p.status === "done" ? <CheckCircle2 size={18} className="text-primary" /> : <Clock size={18} className="text-muted-foreground" />}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.contact}</p>
                </div>
                <ChevronRight size={18} className="text-muted-foreground" />
              </div>
            ))}
          </div>
        </section>

        {/* Staff Management */}
        <section>
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3 px-1 flex items-center gap-2">
            <Users size={14} />Quản lý nhân viên KTX
          </h3>
          <div className="bg-card rounded-xl border border-border overflow-hidden">
            {staff.map((s, i) => (
              <button key={s.id} className="w-full flex items-center gap-3 px-4 py-3.5 touch-target border-b border-border last:border-0 text-left">
                <div className="w-9 h-9 rounded-full bg-eco-blue-light flex items-center justify-center text-secondary font-semibold text-xs">
                  {s.name.charAt(s.name.lastIndexOf(" ") + 1)}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{s.name}</p>
                  <p className="text-xs text-muted-foreground">{s.role}</p>
                </div>
                <ChevronRight size={18} className="text-muted-foreground" />
              </button>
            ))}
          </div>
        </section>

        <button onClick={() => navigate("/login")} className="w-full flex items-center gap-3 px-4 py-3.5 bg-card rounded-xl border border-destructive/20 touch-target">
          <LogOut size={20} className="text-destructive" />
          <span className="text-sm font-medium text-destructive">Đăng xuất</span>
        </button>
      </div>
    </div>
  );
};

export default AdminProfile;
