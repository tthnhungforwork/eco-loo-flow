import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Smartphone } from "lucide-react";
import logo from "@/assets/logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState<"password" | "otp">("password");
  const [phone, setPhone] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-8">
        <div className="w-20 h-20 mb-4">
          <img src={logo} alt="Số hóa NVS" className="w-full h-full object-contain" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-1">Số hóa NVS</h1>
        <p className="text-sm text-muted-foreground mb-8">Sạch - Xanh - Tuần hoàn</p>

        <div className="w-full max-w-sm space-y-5">
          {loginMethod === "password" ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="username">Tên đăng nhập</Label>
                <Input id="username" placeholder="Nhập username hoặc email" className="touch-target" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mật khẩu</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Nhập mật khẩu"
                    className="touch-target pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <div className="flex justify-end">
                <button className="text-sm text-primary font-medium">Quên mật khẩu?</button>
              </div>
              <Button className="w-full touch-target text-base font-semibold" onClick={() => navigate("/role-select")}>
                Đăng nhập
              </Button>
              <button
                onClick={() => setLoginMethod("otp")}
                className="w-full flex items-center justify-center gap-2 text-sm text-primary font-medium touch-target"
              >
                <Smartphone size={18} />
                Đăng nhập bằng OTP
              </button>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Nhập số điện thoại"
                  className="touch-target"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <Button className="w-full touch-target text-base font-semibold">
                Gửi mã OTP
              </Button>
              <button
                onClick={() => setLoginMethod("password")}
                className="w-full text-sm text-primary font-medium touch-target"
              >
                Đăng nhập bằng mật khẩu
              </button>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-8 text-center">
        <p className="text-sm text-muted-foreground">
          Chưa có tài khoản?{" "}
          <button onClick={() => navigate("/register")} className="text-primary font-semibold">
            Đăng ký ngay
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
