import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Smartphone, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"password" | "otp">("password");
  const [phone, setPhone] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 gradient-mesh pointer-events-none" />
      <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-secondary/10 blur-3xl" />

      <motion.div
        className="flex-1 flex flex-col items-center justify-center px-6 py-8 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <motion.div
          className="w-20 h-20 rounded-3xl gradient-primary p-3 shadow-glow mb-5"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
        >
          <img src={logo} alt="Số hóa NVS" className="w-full h-full object-contain brightness-0 invert" />
        </motion.div>
        <h1 className="text-2xl font-extrabold text-foreground mb-1 tracking-tight">Số hóa NVS</h1>
        <p className="text-sm text-muted-foreground font-medium mb-8">Sạch - Xanh - Tuần hoàn ♻️</p>

        <div className="w-full max-w-sm space-y-5">
          {loginMethod === "password" ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-semibold">Tên đăng nhập</Label>
                <Input id="username" placeholder="Nhập username hoặc email" className="touch-target rounded-xl bg-card/80 backdrop-blur-sm border-border/50 focus:border-primary" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-semibold">Mật khẩu</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
                    className="touch-target pr-12 rounded-xl bg-card/80 backdrop-blur-sm border-border/50 focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground p-1"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="text-sm text-primary font-semibold">Quên mật khẩu?</button>
              </div>
              <Button
                className="w-full touch-target text-base font-bold rounded-2xl gradient-primary border-0 shadow-glow btn-glow h-14 gap-2"
                onClick={() => navigate("/role-select")}
              >
                Đăng nhập <ArrowRight size={18} />
              </Button>
              <button
                onClick={() => setLoginMethod("otp")}
                className="w-full flex items-center justify-center gap-2 text-sm text-primary font-semibold touch-target rounded-2xl border-2 border-primary/20 hover:bg-accent transition-colors h-12"
              >
                <Smartphone size={18} />
                Đăng nhập bằng OTP
              </button>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm font-semibold">Số điện thoại</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Nhập số điện thoại"
                  className="touch-target rounded-xl bg-card/80 backdrop-blur-sm"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <Button className="w-full touch-target text-base font-bold rounded-2xl gradient-primary border-0 shadow-glow btn-glow h-14">
                Gửi mã OTP
              </Button>
              <button
                onClick={() => setLoginMethod("password")}
                className="w-full text-sm text-primary font-semibold touch-target"
              >
                Đăng nhập bằng mật khẩu
              </button>
            </>
          )}
        </div>
      </motion.div>

      <div className="px-6 pb-8 text-center relative z-10">
        <p className="text-sm text-muted-foreground">
          Chưa có tài khoản?{" "}
          <button onClick={() => navigate("/register")} className="text-primary font-bold">
            Đăng ký ngay
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
