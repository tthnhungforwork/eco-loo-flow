import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const Register = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"personal" | "business">("personal");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="flex items-center px-4 py-3 border-b border-border">
        <button onClick={() => navigate("/login")} className="touch-target flex items-center justify-center">
          <ArrowLeft size={22} />
        </button>
        <h1 className="flex-1 text-center font-semibold text-lg">Đăng ký tài khoản</h1>
        <div className="w-11" />
      </div>

      <div className="flex-1 px-6 py-6 overflow-auto">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" className="w-14 h-14" />
        </div>

        {/* Tabs */}
        <div className="flex bg-muted rounded-lg p-1 mb-6">
          {(["personal", "business"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-all ${
                tab === t ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
              }`}
            >
              {t === "personal" ? "Cá nhân" : "Doanh nghiệp"}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Họ và tên</Label>
            <Input placeholder="Nhập họ và tên" className="touch-target" />
          </div>
          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" placeholder="Nhập email" className="touch-target" />
          </div>
          <div className="space-y-2">
            <Label>Số điện thoại</Label>
            <Input type="tel" placeholder="Nhập số điện thoại" className="touch-target" />
          </div>
          <div className="space-y-2">
            <Label>Địa chỉ</Label>
            <button className="w-full flex items-center gap-2 px-3 py-3 border border-input rounded-lg text-sm text-muted-foreground bg-card">
              <MapPin size={18} className="text-primary shrink-0" />
              Chọn vị trí trên bản đồ
            </button>
          </div>

          {tab === "business" && (
            <>
              <div className="h-px bg-border my-2" />
              <div className="space-y-2">
                <Label>Tên doanh nghiệp</Label>
                <Input placeholder="Nhập tên doanh nghiệp" className="touch-target" />
              </div>
              <div className="space-y-2">
                <Label>Mã số thuế</Label>
                <Input placeholder="Nhập mã số thuế" className="touch-target" />
              </div>
              <div className="space-y-2">
                <Label>Lĩnh vực</Label>
                <Input placeholder="Chọn lĩnh vực hoạt động" className="touch-target" />
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label>Mật khẩu</Label>
            <Input type="password" placeholder="Tạo mật khẩu" className="touch-target" />
          </div>
          <div className="space-y-2">
            <Label>Xác nhận mật khẩu</Label>
            <Input type="password" placeholder="Nhập lại mật khẩu" className="touch-target" />
          </div>
        </div>

        <Button className="w-full touch-target text-base font-semibold mt-6" onClick={() => navigate("/login")}>
          Đăng ký
        </Button>

        <p className="text-center text-sm text-muted-foreground mt-4">
          Đã có tài khoản?{" "}
          <button onClick={() => navigate("/login")} className="text-primary font-semibold">
            Đăng nhập
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
