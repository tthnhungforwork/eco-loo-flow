import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const Register = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"personal" | "business">("personal");

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 flex items-center px-4 py-3 glass-header">
        <button onClick={() => navigate("/login")} className="touch-target flex items-center justify-center w-10 h-10 rounded-xl bg-muted/60">
          <ArrowLeft size={20} />
        </button>
        <h1 className="flex-1 text-center font-bold text-lg">Đăng ký tài khoản</h1>
        <div className="w-10" />
      </div>

      <motion.div
        className="flex-1 px-6 py-6 overflow-auto relative z-10"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex justify-center mb-5">
          <div className="w-14 h-14 rounded-2xl gradient-primary p-2.5 shadow-glow">
            <img src={logo} alt="Logo" className="w-full h-full object-contain brightness-0 invert" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex bg-muted/60 backdrop-blur-sm rounded-2xl p-1 mb-6">
          {(["personal", "business"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${
                tab === t ? "bg-card text-foreground shadow-card" : "text-muted-foreground"
              }`}
            >
              {t === "personal" ? "Cá nhân" : "Doanh nghiệp"}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {[
            { label: "Họ và tên", placeholder: "Nhập họ và tên", type: "text" },
            { label: "Email", placeholder: "Nhập email", type: "email" },
            { label: "Số điện thoại", placeholder: "Nhập số điện thoại", type: "tel" },
          ].map((field) => (
            <div key={field.label} className="space-y-2">
              <Label className="text-sm font-semibold">{field.label}</Label>
              <Input type={field.type} placeholder={field.placeholder} className="touch-target rounded-xl bg-card/80 backdrop-blur-sm border-border/50" />
            </div>
          ))}

          <div className="space-y-2">
            <Label className="text-sm font-semibold">Địa chỉ</Label>
            <button className="w-full flex items-center gap-2 px-4 py-3.5 border border-border/50 rounded-xl text-sm text-muted-foreground bg-card/80 backdrop-blur-sm touch-target">
              <MapPin size={18} className="text-primary shrink-0" />
              Chọn vị trí trên bản đồ
            </button>
          </div>

          {tab === "business" && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-4">
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent my-2" />
              {[
                { label: "Tên doanh nghiệp", placeholder: "Nhập tên doanh nghiệp" },
                { label: "Mã số thuế", placeholder: "Nhập mã số thuế" },
                { label: "Lĩnh vực", placeholder: "Chọn lĩnh vực hoạt động" },
              ].map((field) => (
                <div key={field.label} className="space-y-2">
                  <Label className="text-sm font-semibold">{field.label}</Label>
                  <Input placeholder={field.placeholder} className="touch-target rounded-xl bg-card/80 backdrop-blur-sm border-border/50" />
                </div>
              ))}
            </motion.div>
          )}

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

        <Button className="w-full touch-target text-base font-bold mt-6 rounded-2xl gradient-primary border-0 shadow-glow btn-glow h-14" onClick={() => navigate("/login")}>
          Đăng ký
        </Button>

        <p className="text-center text-sm text-muted-foreground mt-4 pb-4">
          Đã có tài khoản?{" "}
          <button onClick={() => navigate("/login")} className="text-primary font-bold">Đăng nhập</button>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
