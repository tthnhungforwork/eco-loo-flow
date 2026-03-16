import MobileHeader from "@/components/MobileHeader";
import { ClipboardList, ChevronRight } from "lucide-react";

const AdminSurveys = () => (
  <div>
    <MobileHeader title="Khảo sát" />
    <div className="px-4 py-4 space-y-3 animate-fade-in">
      {[
        { title: "Tư vấn số hóa NVS", desc: "Quản lý các phiếu tư vấn số hóa nhà vệ sinh", color: "bg-eco-green-light text-primary", count: 24 },
        { title: "Khảo sát Sạch - Xanh - Tuần hoàn", desc: "Dữ liệu khảo sát 12 tháng từ đối tác", color: "bg-eco-blue-light text-secondary", count: 156 },
      ].map((s) => (
        <button key={s.title} className="w-full bg-card rounded-xl border border-border p-4 flex items-center gap-4 text-left touch-target">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${s.color}`}>
            <ClipboardList size={22} />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm text-foreground">{s.title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p>
            <p className="text-xs text-primary font-medium mt-1">{s.count} phiếu khảo sát</p>
          </div>
          <ChevronRight size={18} className="text-muted-foreground shrink-0" />
        </button>
      ))}
    </div>
  </div>
);

export default AdminSurveys;
