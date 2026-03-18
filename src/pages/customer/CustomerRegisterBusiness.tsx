import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerHeader from "./components/CustomerHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Building2, Phone, MapPin, FileText, Briefcase, CheckCircle2, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

type Step = "form" | "success";

const CustomerRegisterBusiness = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("form");

  const handleSubmit = () => {
    setStep("success");
    toast.success("Đăng ký doanh nghiệp thành công!");
  };

  return (
    <div className="gradient-surface min-h-screen">
      <CustomerHeader title="Đăng ký doanh nghiệp" />

      <div className="px-5 py-5">
        <AnimatePresence mode="wait">
          {step === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              className="space-y-5"
            >
              {/* Info banner */}
              <div className="glass-card rounded-2xl p-4 flex items-start gap-3 border-primary/20 border">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                  <Building2 size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">Thêm doanh nghiệp</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Đăng ký doanh nghiệp để sử dụng dịch vụ với tư cách tổ chức. Bạn sẽ trở thành chủ doanh nghiệp.
                  </p>
                </div>
              </div>

              {/* Business form */}
              <div className="space-y-4">
                {[
                  { icon: Building2, label: "Tên doanh nghiệp", placeholder: "Nhập tên doanh nghiệp", type: "text" },
                  { icon: FileText, label: "Mã số thuế", placeholder: "Nhập mã số thuế", type: "text" },
                  { icon: Briefcase, label: "Lĩnh vực", placeholder: "Chọn lĩnh vực hoạt động", type: "text" },
                  { icon: Phone, label: "SĐT liên hệ", placeholder: "Nhập số điện thoại DN", type: "tel" },
                ].map((field) => (
                  <div key={field.label} className="space-y-2">
                    <Label className="text-sm font-semibold flex items-center gap-1.5">
                      <field.icon size={14} className="text-muted-foreground" /> {field.label}
                    </Label>
                    <Input
                      type={field.type}
                      placeholder={field.placeholder}
                      className="touch-target rounded-xl bg-card/80 backdrop-blur-sm border-border/50"
                    />
                  </div>
                ))}

                <div className="space-y-2">
                  <Label className="text-sm font-semibold flex items-center gap-1.5">
                    <MapPin size={14} className="text-muted-foreground" /> Địa chỉ doanh nghiệp
                  </Label>
                  <Input
                    placeholder="Nhập mô tả địa chỉ"
                    className="touch-target rounded-xl bg-card/80 backdrop-blur-sm border-border/50"
                  />
                  <button className="w-full flex items-center gap-2 px-4 py-3.5 border border-border/50 rounded-xl text-sm text-muted-foreground bg-card/80 backdrop-blur-sm touch-target">
                    <MapPin size={18} className="text-primary shrink-0" />
                    Chọn vị trí trên bản đồ
                  </button>
                </div>
              </div>

              <Button
                className="w-full touch-target text-base font-bold mt-2 rounded-2xl gradient-primary border-0 shadow-glow btn-glow h-14 gap-2"
                onClick={handleSubmit}
              >
                Đăng ký doanh nghiệp <ChevronRight size={16} />
              </Button>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-16 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6"
              >
                <CheckCircle2 size={40} className="text-primary" />
              </motion.div>
              <h2 className="text-xl font-bold text-foreground mb-2">Đăng ký thành công!</h2>
              <p className="text-sm text-muted-foreground mb-8 max-w-[260px]">
                Doanh nghiệp của bạn đã được tạo. Bạn có thể chuyển sang tài khoản doanh nghiệp từ menu chuyển đổi tài khoản.
              </p>
              <div className="w-full space-y-3">
                <Button
                  className="w-full touch-target text-base font-bold rounded-2xl gradient-primary border-0 shadow-glow btn-glow h-14"
                  onClick={() => navigate("/customer/business")}
                >
                  Quản lý doanh nghiệp
                </Button>
                <Button
                  variant="outline"
                  className="w-full touch-target text-base font-semibold rounded-2xl h-14"
                  onClick={() => navigate("/customer/profile")}
                >
                  Quay lại hồ sơ
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CustomerRegisterBusiness;
