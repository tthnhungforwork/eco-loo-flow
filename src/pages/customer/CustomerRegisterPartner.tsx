import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerHeader from "./components/CustomerHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Handshake, User, Phone, Mail, MapPin, Building2, Briefcase,
  FileText, CheckCircle2, ArrowLeft, ChevronRight,
  Sparkles, Wrench, HardHat, Hammer, Recycle, UserCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import OtpVerifySheet from "@/components/OtpVerifySheet";

type PartnerType = "individual" | "business" | null;

const availableServices = [
  { id: "vsld", label: "Vệ sinh lau dọn", icon: Sparkles },
  { id: "scbd", label: "Sửa chữa bảo dưỡng", icon: Wrench },
  { id: "xaymoi", label: "Xây mới", icon: HardHat },
  { id: "caitao", label: "Cải tạo", icon: Hammer },
  { id: "netzero", label: "Netzero", icon: Recycle },
];

const CustomerRegisterPartner = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [partnerType, setPartnerType] = useState<PartnerType>(null);
  const [showOtp, setShowOtp] = useState(false);
  const [form, setForm] = useState({
    name: "Nguyễn Văn Khách",
    phone: "0901234567",
    email: "khach@email.com",
    address: "123 Nguyễn Huệ, Q.1, TP.HCM",
    companyName: "",
    taxCode: "",
    field: "",
    companyPhone: "",
    companyAddress: "",
    selectedServices: [] as string[],
  });

  const updateForm = (key: string, value: any) => setForm((prev) => ({ ...prev, [key]: value }));

  const toggleService = (id: string) => {
    setForm((prev) => ({
      ...prev,
      selectedServices: prev.selectedServices.includes(id)
        ? prev.selectedServices.filter((s) => s !== id)
        : [...prev.selectedServices, id],
    }));
  };

  const totalSteps = partnerType === "business" ? 3 : 2;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep((s) => s + 1);
    } else {
      setShowOtp(true);
    }
  };

  const handleOtpVerified = () => {
    setShowOtp(false);
    toast.success("Đăng ký Đối tác thành công!", {
      description: "Yêu cầu của bạn đang chờ phê duyệt.",
    });
    navigate("/customer");
  };

  return (
    <div className="gradient-surface min-h-screen">
      <CustomerHeader title="Đăng ký Đối tác" />

      <div className="px-4 py-5">
        {/* Header */}
        <motion.div className="flex items-center gap-3 mb-5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-sm">
            <Handshake size={22} />
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-base text-foreground">Đăng ký trở thành Đối tác</h2>
            <p className="text-[11px] text-muted-foreground">Mở rộng cơ hội kinh doanh cùng chúng tôi</p>
          </div>
        </motion.div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-6">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((s) => (
            <div key={s} className={`h-1.5 flex-1 rounded-full transition-colors ${s <= step ? "bg-primary" : "bg-muted"}`} />
          ))}
          <span className="text-[10px] text-muted-foreground font-medium ml-1">{step}/{totalSteps}</span>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Chọn loại đối tác + Thông tin cá nhân */}
          {step === 1 && (
            <motion.div key="s1" className="space-y-5" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              {/* Partner type selection */}
              <div className="space-y-2.5">
                <p className="text-[13px] font-bold text-foreground">Loại đối tác</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { type: "individual" as PartnerType, label: "Cá nhân", desc: "Hoạt động độc lập", icon: UserCircle },
                    { type: "business" as PartnerType, label: "Doanh nghiệp", desc: "Có pháp nhân, đội ngũ", icon: Building2 },
                  ].map((opt) => (
                    <motion.button
                      key={opt.type}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setPartnerType(opt.type)}
                      className={`relative rounded-2xl p-4 border-2 text-left transition-all ${
                        partnerType === opt.type
                          ? "border-primary bg-primary/5 shadow-sm"
                          : "border-border/40 bg-card hover:border-border"
                      }`}
                    >
                      {partnerType === opt.type && (
                        <motion.div
                          layoutId="partnerTypeCheck"
                          className="absolute top-2.5 right-2.5"
                        >
                          <CheckCircle2 size={18} className="text-primary" />
                        </motion.div>
                      )}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-2.5 ${
                        partnerType === opt.type ? "bg-primary/10" : "bg-muted"
                      }`}>
                        <opt.icon size={20} className={partnerType === opt.type ? "text-primary" : "text-muted-foreground"} />
                      </div>
                      <p className="text-[13px] font-bold text-foreground">{opt.label}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{opt.desc}</p>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Personal info */}
              <div className="space-y-4">
                <p className="text-[13px] font-bold text-foreground">Thông tin người đăng ký</p>
                {[
                  { icon: User, label: "Họ tên", key: "name", placeholder: "Nhập họ tên" },
                  { icon: Phone, label: "Số điện thoại", key: "phone", placeholder: "Nhập SĐT" },
                  { icon: Mail, label: "Email", key: "email", placeholder: "Nhập email" },
                  { icon: MapPin, label: "Địa chỉ", key: "address", placeholder: "Nhập địa chỉ" },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="text-[12px] font-medium text-muted-foreground mb-1.5 flex items-center gap-1.5">
                      <f.icon size={12} /> {f.label}
                    </label>
                    <Input
                      value={(form as any)[f.key]}
                      onChange={(e) => updateForm(f.key, e.target.value)}
                      placeholder={f.placeholder}
                      className="rounded-xl"
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2 (Business only): Thông tin doanh nghiệp */}
          {step === 2 && partnerType === "business" && (
            <motion.div key="s2-biz" className="space-y-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <p className="text-[13px] font-bold text-foreground">Thông tin doanh nghiệp</p>
              {[
                { icon: Building2, label: "Tên doanh nghiệp", key: "companyName", placeholder: "Nhập tên DN" },
                { icon: FileText, label: "Mã số thuế", key: "taxCode", placeholder: "Nhập MST" },
                { icon: Briefcase, label: "Lĩnh vực", key: "field", placeholder: "VD: Dịch vụ vệ sinh" },
                { icon: Phone, label: "SĐT liên hệ DN", key: "companyPhone", placeholder: "Nhập SĐT" },
                { icon: MapPin, label: "Địa chỉ DN", key: "companyAddress", placeholder: "Nhập địa chỉ" },
              ].map((f) => (
                <div key={f.key}>
                  <label className="text-[12px] font-medium text-muted-foreground mb-1.5 flex items-center gap-1.5">
                    <f.icon size={12} /> {f.label}
                  </label>
                  <Input
                    value={(form as any)[f.key]}
                    onChange={(e) => updateForm(f.key, e.target.value)}
                    placeholder={f.placeholder}
                    className="rounded-xl"
                  />
                </div>
              ))}

              <p className="text-[13px] font-bold text-foreground pt-2">Đăng ký cung cấp dịch vụ</p>
              <div className="space-y-2">
                {availableServices.map((svc) => (
                  <motion.button
                    key={svc.id}
                    className={`w-full rounded-2xl p-3.5 flex items-center gap-3 text-left border transition-colors ${
                      form.selectedServices.includes(svc.id) ? "bg-primary/5 border-primary/30" : "bg-card border-border/30"
                    }`}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleService(svc.id)}
                  >
                    <svc.icon size={18} className={form.selectedServices.includes(svc.id) ? "text-primary" : "text-muted-foreground"} />
                    <span className="text-[12px] font-semibold text-foreground flex-1">{svc.label}</span>
                    {form.selectedServices.includes(svc.id) && <CheckCircle2 size={16} className="text-primary" />}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2 (Individual) or Step 3 (Business): Dịch vụ đăng ký */}
          {((step === 2 && partnerType === "individual") || (step === 3 && partnerType === "business")) && (
            <motion.div key="s-services" className="space-y-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <p className="text-[13px] font-bold text-foreground">Đăng ký cung cấp dịch vụ</p>
              <p className="text-[11px] text-muted-foreground -mt-2">Chọn các dịch vụ bạn muốn cung cấp</p>
              <div className="space-y-2">
                {availableServices.map((svc) => (
                  <motion.button
                    key={svc.id}
                    className={`w-full rounded-2xl p-3.5 flex items-center gap-3 text-left border transition-colors ${
                      form.selectedServices.includes(svc.id) ? "bg-primary/5 border-primary/30" : "bg-card border-border/30"
                    }`}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleService(svc.id)}
                  >
                    <svc.icon size={18} className={form.selectedServices.includes(svc.id) ? "text-primary" : "text-muted-foreground"} />
                    <span className="text-[12px] font-semibold text-foreground flex-1">{svc.label}</span>
                    {form.selectedServices.includes(svc.id) && <CheckCircle2 size={16} className="text-primary" />}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex gap-3 mt-8">
          {step > 1 && (
            <Button variant="outline" className="flex-1 rounded-2xl h-14 font-semibold gap-2" onClick={() => setStep((s) => s - 1)}>
              <ArrowLeft size={16} /> Quay lại
            </Button>
          )}
          <Button
            className="flex-1 touch-target font-bold rounded-2xl gradient-primary border-0 shadow-glow h-14 text-primary-foreground gap-2"
            onClick={handleNext}
            disabled={step === 1 && !partnerType}
          >
            {step < totalSteps ? (
              <>Tiếp theo <ChevronRight size={16} /></>
            ) : (
              <>Xác nhận & Gửi <ChevronRight size={16} /></>
            )}
          </Button>
        </div>
      </div>

      {/* OTP Sheet */}
      <OtpVerifySheet
        open={showOtp}
        phone={form.phone}
        onVerified={handleOtpVerified}
        onCancel={() => setShowOtp(false)}
      />
    </div>
  );
};

export default CustomerRegisterPartner;
