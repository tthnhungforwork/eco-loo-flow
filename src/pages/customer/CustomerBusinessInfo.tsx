import { useState } from "react";
import CustomerHeader from "./components/CustomerHeader";
import SegmentedControl from "@/components/SegmentedControl";
import { useRole } from "@/contexts/RoleContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Building2, Phone, Mail, MapPin, FileText, Users, Shield, Pencil,
  Plus, ChevronRight, User, Briefcase, Trash2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Employee {
  id: string;
  name: string;
  phone: string;
  email: string;
  role: string;
  status: string;
}

const businessInfo = {
  name: "Công ty TNHH ABC",
  taxCode: "0123456789",
  field: "Dịch vụ vệ sinh",
  phone: "028-1234-5678",
  email: "contact@abc.vn",
  address: "123 Nguyễn Huệ, Q.1, TP.HCM",
};

const employees: Employee[] = [
  { id: "1", name: "Trần Thị B", phone: "0912345678", email: "b@abc.vn", role: "Quản lý", status: "active" },
  { id: "2", name: "Lê Văn C", phone: "0923456789", email: "c@abc.vn", role: "Nhân viên", status: "active" },
  { id: "3", name: "Phạm Minh D", phone: "0934567890", email: "d@abc.vn", role: "Nhân viên", status: "active" },
];

const CustomerBusinessInfo = () => {
  const { isBusinessOwner } = useRole();
  const [tab, setTab] = useState(0);
  const [selectedEmp, setSelectedEmp] = useState<Employee | null>(null);
  const [showAddEmp, setShowAddEmp] = useState(false);

  return (
    <div className="gradient-surface min-h-screen">
      <MobileHeader title="Quản lý doanh nghiệp" />
      <div className="py-4">
        <SegmentedControl tabs={["Thông tin DN", "Nhân sự"]} active={tab} onChange={setTab} />

        <AnimatePresence mode="wait">
          {tab === 0 ? (
            <motion.div
              key="info"
              className="px-4 space-y-4"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              <div className="glass-card rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-14 h-14 rounded-2xl gradient-blue flex items-center justify-center text-primary-foreground shadow-sm">
                    <Building2 size={24} />
                  </div>
                  <div>
                    <h2 className="font-bold text-base text-foreground">{businessInfo.name}</h2>
                    <p className="text-xs text-muted-foreground">MST: {businessInfo.taxCode}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  {[
                    { icon: Briefcase, label: "Lĩnh vực", value: businessInfo.field },
                    { icon: Phone, label: "Điện thoại", value: businessInfo.phone },
                    { icon: Mail, label: "Email", value: businessInfo.email },
                    { icon: MapPin, label: "Địa chỉ", value: businessInfo.address },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3 bg-muted/40 rounded-xl p-3">
                      <item.icon size={16} className="text-primary shrink-0" />
                      <div>
                        <p className="text-[10px] text-muted-foreground">{item.label}</p>
                        <p className="text-[13px] font-semibold text-foreground">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {isBusinessOwner && (
                  <Button variant="outline" className="w-full mt-4 rounded-xl font-semibold gap-2 border-primary/15 text-primary">
                    <Pencil size={14} /> Chỉnh sửa thông tin
                  </Button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="staff"
              className="px-4 space-y-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
            >
              {employees.map((emp, i) => (
                <motion.div
                  key={emp.id}
                  className="glass-card rounded-2xl p-4 card-hover cursor-pointer"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setSelectedEmp(emp)}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-muted flex items-center justify-center text-foreground font-bold text-sm">
                      {emp.name.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground">{emp.name}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${emp.role === "Quản lý" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                          {emp.role}
                        </span>
                        <span className="text-[11px] text-muted-foreground">{emp.phone}</span>
                      </div>
                    </div>
                    <ChevronRight size={16} className="text-muted-foreground/40 shrink-0" />
                  </div>
                </motion.div>
              ))}

              {isBusinessOwner && (
                <Button
                  variant="outline"
                  className="w-full rounded-xl font-semibold gap-2 border-dashed border-primary/20 text-primary h-12"
                  onClick={() => setShowAddEmp(true)}
                >
                  <Plus size={16} /> Thêm nhân sự
                </Button>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Employee Detail Sheet */}
      <Sheet open={!!selectedEmp} onOpenChange={() => setSelectedEmp(null)}>
        <SheetContent side="bottom" className="rounded-t-3xl max-h-[85vh] overflow-y-auto px-5 pb-8">
          {selectedEmp && (
            <>
              <SheetHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center text-foreground font-bold text-lg">
                    {selectedEmp.name.charAt(0)}
                  </div>
                  <div>
                    <SheetTitle className="text-base text-left">{selectedEmp.name}</SheetTitle>
                    <span className={`inline-flex items-center gap-1 mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${selectedEmp.role === "Quản lý" ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                      <Shield size={10} /> {selectedEmp.role}
                    </span>
                  </div>
                </div>
              </SheetHeader>

              <div className="space-y-3 mb-5">
                {[
                  { icon: Phone, label: "Điện thoại", value: selectedEmp.phone },
                  { icon: Mail, label: "Email", value: selectedEmp.email },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 bg-muted/40 rounded-xl p-3">
                    <item.icon size={16} className="text-primary shrink-0" />
                    <div>
                      <p className="text-[10px] text-muted-foreground">{item.label}</p>
                      <p className="text-[13px] font-semibold text-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {isBusinessOwner && (
                <div className="space-y-2">
                  <Button variant="outline" className="w-full rounded-xl font-semibold gap-2 border-primary/15 text-primary">
                    <Pencil size={14} /> Chỉnh sửa quyền
                  </Button>
                  <Button variant="outline" className="w-full rounded-xl font-semibold gap-2 border-destructive/20 text-destructive">
                    <Trash2 size={14} /> Xóa nhân sự
                  </Button>
                </div>
              )}
            </>
          )}
        </SheetContent>
      </Sheet>

      {/* Add Employee Sheet */}
      <Sheet open={showAddEmp} onOpenChange={setShowAddEmp}>
        <SheetContent side="bottom" className="rounded-t-3xl max-h-[90vh] overflow-y-auto px-5 pb-8">
          <SheetHeader className="pb-4">
            <SheetTitle className="text-base text-left">Thêm nhân sự</SheetTitle>
          </SheetHeader>
          <div className="space-y-4">
            <div>
              <label className="text-[12px] font-bold text-foreground mb-1.5 block">Họ tên</label>
              <Input placeholder="Nhập họ tên..." className="rounded-xl" />
            </div>
            <div>
              <label className="text-[12px] font-bold text-foreground mb-1.5 block">Số điện thoại</label>
              <Input placeholder="Nhập SĐT..." className="rounded-xl" />
            </div>
            <div>
              <label className="text-[12px] font-bold text-foreground mb-1.5 block">Email</label>
              <Input placeholder="Nhập email..." className="rounded-xl" />
            </div>
            <div>
              <label className="text-[12px] font-bold text-foreground mb-1.5 block">Vai trò</label>
              <div className="flex gap-2">
                {["Nhân viên", "Quản lý"].map((r) => (
                  <motion.button key={r} className="chip chip-inactive" whileTap={{ scale: 0.93 }}>
                    {r}
                  </motion.button>
                ))}
              </div>
            </div>
            <Button className="w-full touch-target font-bold rounded-2xl gradient-primary border-0 shadow-glow h-14 text-primary-foreground gap-2">
              <Plus size={18} /> Thêm nhân sự
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default CustomerBusinessInfo;
