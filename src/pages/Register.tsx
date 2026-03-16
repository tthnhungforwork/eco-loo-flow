import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, MapPin, User, Building2, ChevronRight, CheckCircle2, Phone, Mail, FileText, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";
import { toast } from "sonner";

type RegType = "personal" | "business" | null;
type Step = "choose" | "personal-form" | "biz-step1" | "biz-step2" | "success";

const Register = () => {
  const navigate = useNavigate();
  const [regType, setRegType] = useState<RegType>(null);
  const [step, setStep] = useState<Step>("choose");

  const totalSteps = regType === "business" ? 2 : 1;
  const currentStep = step === "biz-step1" || step === "personal-form" ? 1 : step === "biz-step2" ? 2 : 0;

  const handleSubmit = () => {
    setStep("success");
    toast.success("Đăng ký thành công!");
  };

  const goBack = () => {
    if (step === "success") {
      navigate("/login");
    } else if (step === "biz-step2") {
      setStep("biz-step1");
    } else if (step === "biz-step1" || step === "personal-form") {
      setStep("choose");
      setRegType(null);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-center px-4 py-3 glass-header">
        <button onClick={goBack} className="touch-target flex items-center justify-center w-10 h-10 rounded-xl bg-muted/60">
          <ArrowLeft size={20} />
        </button>
        <h1 className="flex-1 text-center font-bold text-lg">
          {step === "success" ? "Hoàn tất" : "Đăng ký tài khoản"}
        </h1>
        <div className="w-10" />
      </div>

      <motion.div
        className="flex-1 px-6 py-6 overflow-auto relative z-10"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-5">
          <div className="w-14 h-14 rounded-2xl gradient-primary p-2.5 shadow-glow">
            <img src={logo} alt="Logo" className="w-full h-full object-contain brightness-0 invert" />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {/* === STEP: Choose Type === */}
          {step === "choose" && (
            <motion.div key="choose" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-foreground">Chọn loại tài khoản</h2>
                <p className="text-sm text-muted-foreground mt-1">Bạn muốn đăng ký với tư cách nào?</p>
              </div>

              {[
                {
                  type: "personal" as RegType,
                  icon: User,
                  title: "Cá nhân",
                  desc: "Đăng ký tài khoản cá nhân để sử dụng dịch vụ",
                  color: "from-primary to-primary/80",
                },
                {
                  type: "business" as RegType,
                  icon: Building2,
                  title: "Doanh nghiệp",
                  desc: "Đăng ký tài khoản doanh nghiệp với đầy đủ thông tin pháp nhân",
                  color: "from-secondary to-secondary/80",
                },
              ].map((item) => (
                <motion.button
                  key={item.type}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setRegType(item.type);
                    setStep(item.type === "personal" ? "personal-form" : "biz-step1");
                  }}
                  className="w-full bg-card rounded-2xl border border-border/50 p-5 flex items-center gap-4 text-left shadow-card hover:shadow-elevated transition-shadow"
                >
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-primary-foreground shadow-sm shrink-0`}>
                    <item.icon size={22} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                  <ChevronRight size={18} className="text-muted-foreground shrink-0" />
                </motion.button>
              ))}

              <p className="text-center text-sm text-muted-foreground mt-6">
                Đã có tài khoản?{" "}
                <button onClick={() => navigate("/login")} className="text-primary font-bold">Đăng nhập</button>
              </p>
            </motion.div>
          )}

          {/* === STEP: Personal Form (cá nhân only) === */}
          {step === "personal-form" && (
            <motion.div key="personal-form" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <StepIndicator current={1} total={1} />
              <p className="text-sm font-bold text-foreground mb-4">Thông tin cá nhân</p>
              <PersonalInfoFields />
              <PasswordFields />
              <Button className="w-full touch-target text-base font-bold mt-6 rounded-2xl gradient-primary border-0 shadow-glow btn-glow h-14" onClick={handleSubmit}>
                Đăng ký
              </Button>
              <p className="text-center text-sm text-muted-foreground mt-4 pb-4">
                Đã có tài khoản?{" "}
                <button onClick={() => navigate("/login")} className="text-primary font-bold">Đăng nhập</button>
              </p>
            </motion.div>
          )}

          {/* === STEP: Business Step 1 - Personal Info === */}
          {step === "biz-step1" && (
            <motion.div key="biz-step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <StepIndicator current={1} total={2} />
              <p className="text-sm font-bold text-foreground mb-4">Thông tin người đăng ký</p>
              <PersonalInfoFields />
              <Button
                className="w-full touch-target text-base font-bold mt-6 rounded-2xl gradient-primary border-0 shadow-glow btn-glow h-14 gap-2"
                onClick={() => setStep("biz-step2")}
              >
                Tiếp theo <ChevronRight size={16} />
              </Button>
            </motion.div>
          )}

          {/* === STEP: Business Step 2 - Business Info === */}
          {step === "biz-step2" && (
            <motion.div key="biz-step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <StepIndicator current={2} total={2} />
              <p className="text-sm font-bold text-foreground mb-4">Thông tin doanh nghiệp</p>
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
                    <Input type={field.type} placeholder={field.placeholder} className="touch-target rounded-xl bg-card/80 backdrop-blur-sm border-border/50" />
                  </div>
                ))}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold flex items-center gap-1.5">
                    <MapPin size={14} className="text-muted-foreground" /> Địa chỉ doanh nghiệp
                  </Label>
                  <Input placeholder="Nhập mô tả địa chỉ" className="touch-target rounded-xl bg-card/80 backdrop-blur-sm border-border/50" />
                  <button className="w-full flex items-center gap-2 px-4 py-3.5 border border-border/50 rounded-xl text-sm text-muted-foreground bg-card/80 backdrop-blur-sm touch-target">
                    <MapPin size={18} className="text-primary shrink-0" />
                    Chọn vị trí trên bản đồ
                  </button>
                </div>
              </div>
              <PasswordFields />
              <Button className="w-full touch-target text-base font-bold mt-6 rounded-2xl gradient-primary border-0 shadow-glow btn-glow h-14" onClick={handleSubmit}>
                Đăng ký
              </Button>
            </motion.div>
          )}

          {/* === SUCCESS === */}
          {step === "success" && (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-12 text-center">
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
                Tài khoản {regType === "business" ? "doanh nghiệp" : "cá nhân"} của bạn đã được tạo. Hãy đăng nhập để bắt đầu sử dụng.
              </p>
              <Button className="w-full touch-target text-base font-bold rounded-2xl gradient-primary border-0 shadow-glow btn-glow h-14" onClick={() => navigate("/login")}>
                Đăng nhập ngay
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

/* ── Sub-components ── */

const StepIndicator = ({ current, total }: { current: number; total: number }) => (
  <div className="flex items-center gap-2 mb-5">
    {Array.from({ length: total }, (_, i) => (
      <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i < current ? "bg-primary" : "bg-muted"}`} />
    ))}
    <span className="text-xs text-muted-foreground font-medium ml-1">{current}/{total}</span>
  </div>
);

const PersonalInfoFields = () => (
  <div className="space-y-4">
    {[
      { icon: User, label: "Họ và tên", placeholder: "Nhập họ và tên", type: "text" },
      { icon: Phone, label: "Số điện thoại", placeholder: "Nhập số điện thoại", type: "tel" },
      { icon: Mail, label: "Email", placeholder: "Nhập email", type: "email" },
    ].map((field) => (
      <div key={field.label} className="space-y-2">
        <Label className="text-sm font-semibold flex items-center gap-1.5">
          <field.icon size={14} className="text-muted-foreground" /> {field.label}
        </Label>
        <Input type={field.type} placeholder={field.placeholder} className="touch-target rounded-xl bg-card/80 backdrop-blur-sm border-border/50" />
      </div>
    ))}
    <div className="space-y-2">
      <Label className="text-sm font-semibold flex items-center gap-1.5">
        <MapPin size={14} className="text-muted-foreground" /> Địa chỉ
      </Label>
      <Input placeholder="Nhập mô tả địa chỉ" className="touch-target rounded-xl bg-card/80 backdrop-blur-sm border-border/50" />
      <button className="w-full flex items-center gap-2 px-4 py-3.5 border border-border/50 rounded-xl text-sm text-muted-foreground bg-card/80 backdrop-blur-sm touch-target">
        <MapPin size={18} className="text-primary shrink-0" />
        Chọn vị trí trên bản đồ
      </button>
    </div>
  </div>
);

const PasswordFields = () => (
  <div className="space-y-4 mt-4">
    <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    {[
      { label: "Mật khẩu", placeholder: "Tạo mật khẩu" },
      { label: "Xác nhận mật khẩu", placeholder: "Nhập lại mật khẩu" },
    ].map((field) => (
      <div key={field.label} className="space-y-2">
        <Label className="text-sm font-semibold">{field.label}</Label>
        <Input type="password" placeholder={field.placeholder} className="touch-target rounded-xl bg-card/80 backdrop-blur-sm border-border/50" />
      </div>
    ))}
  </div>
);

export default Register;
