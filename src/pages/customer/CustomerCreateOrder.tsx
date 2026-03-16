import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import CustomerHeader from "./components/CustomerHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FileText, Sparkles, Wrench, HardHat, Hammer, Recycle,
  MapPin, User, Phone, Mail, Building2, Bath, ChevronRight,
  Send, Image as ImageIcon, CheckCircle2, ArrowLeft, Leaf
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

const serviceTypes: Record<string, { label: string; icon: any; gradient: string; description: string }> = {
  tuvan: { label: "Liên hệ tư vấn", icon: FileText, gradient: "gradient-blue", description: "Tư vấn giải pháp số hóa và quản lý NVS thông minh" },
  vsld: { label: "Vệ sinh lau dọn", icon: Sparkles, gradient: "gradient-primary", description: "Dịch vụ vệ sinh lau dọn định kỳ cho NVS" },
  scbd: { label: "Sửa chữa bảo dưỡng", icon: Wrench, gradient: "gradient-warm", description: "Sửa chữa, bảo dưỡng thiết bị vệ sinh" },
  xaymoi: { label: "Xây mới", icon: HardHat, gradient: "gradient-primary", description: "Xây dựng nhà vệ sinh mới theo tiêu chuẩn" },
  caitao: { label: "Cải tạo", icon: Hammer, gradient: "gradient-blue", description: "Cải tạo, nâng cấp nhà vệ sinh hiện hữu" },
  netzero: { label: "Netzero", icon: Recycle, gradient: "gradient-warm", description: "Đăng ký chứng nhận Sạch - Xanh - Tuần hoàn" },
};

const existingToilets = [
  { id: 1, name: "NVS Tầng 3 - Tòa A", address: "123 Nguyễn Huệ, Q.1" },
  { id: 2, name: "NVS Sảnh B - KTX", address: "456 Lê Lợi, Q.3" },
  { id: 3, name: "NVS Tầng 1 - Tòa C", address: "789 Trần Hưng Đạo, Q.5" },
];

const netzeroOptions = [
  { id: "sach", label: "Sạch", icon: Sparkles, desc: "Tiêu chuẩn vệ sinh cơ bản" },
  { id: "xanh", label: "Xanh", icon: Leaf, desc: "Tiêu chuẩn thân thiện môi trường" },
  { id: "tuanhoan", label: "Tuần hoàn", icon: Recycle, desc: "Tiêu chuẩn tuần hoàn bền vững" },
];

const CustomerCreateOrder = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "tuvan";
  const service = serviceTypes[type] || serviceTypes.tuvan;
  const ServiceIcon = service.icon;

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "Nguyễn Văn Khách",
    phone: "0901234567",
    email: "khach@email.com",
    address: "123 Nguyễn Huệ, Q.1, TP.HCM",
    content: "",
    selectedToilet: null as number | null,
    netzeroLevel: "",
    attachments: [] as string[],
  });

  const totalSteps = type === "netzero" ? 4 : 3;

  const handleSubmit = () => {
    toast.success("Đơn hàng đã được tạo thành công!", {
      description: `Đơn hàng ${service.label} đang chờ điều phối.`,
    });
    navigate("/customer/orders");
  };

  const updateForm = (key: string, value: any) => setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="gradient-surface min-h-screen">
      <CustomerHeader title={service.label} />

      <div className="px-4 py-5">
        {/* Service header */}
        <motion.div
          className="flex items-center gap-3 mb-5"
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
        >
          <div className={`w-12 h-12 rounded-xl ${service.gradient} flex items-center justify-center text-primary-foreground shadow-sm`}>
            <ServiceIcon size={22} />
          </div>
          <div className="flex-1">
            <h2 className="font-bold text-base text-foreground">{service.label}</h2>
            <p className="text-[11px] text-muted-foreground">{service.description}</p>
          </div>
        </motion.div>

        {/* Progress steps */}
        <div className="flex items-center gap-2 mb-6">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className="flex-1 flex items-center gap-1">
              <div className={`h-1.5 flex-1 rounded-full transition-colors ${i < step ? "bg-primary" : "bg-muted"}`} />
            </div>
          ))}
          <span className="text-[10px] text-muted-foreground font-medium ml-1">{step}/{totalSteps}</span>
        </div>

        <AnimatePresence mode="wait">
          {/* Step 1: Thông tin người dùng */}
          {step === 1 && (
            <motion.div key="step1" className="space-y-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <p className="text-[13px] font-bold text-foreground">Thông tin người đăng ký</p>
              <div>
                <label className="text-[12px] font-medium text-muted-foreground mb-1.5 block flex items-center gap-1.5">
                  <User size={12} /> Họ tên
                </label>
                <Input value={form.name} onChange={(e) => updateForm("name", e.target.value)} className="rounded-xl" />
              </div>
              <div>
                <label className="text-[12px] font-medium text-muted-foreground mb-1.5 block flex items-center gap-1.5">
                  <Phone size={12} /> Số điện thoại
                </label>
                <Input value={form.phone} onChange={(e) => updateForm("phone", e.target.value)} className="rounded-xl" />
              </div>
              <div>
                <label className="text-[12px] font-medium text-muted-foreground mb-1.5 block flex items-center gap-1.5">
                  <Mail size={12} /> Email
                </label>
                <Input value={form.email} onChange={(e) => updateForm("email", e.target.value)} className="rounded-xl" />
              </div>
              <div>
                <label className="text-[12px] font-medium text-muted-foreground mb-1.5 block flex items-center gap-1.5">
                  <MapPin size={12} /> Địa chỉ
                </label>
                <Input value={form.address} onChange={(e) => updateForm("address", e.target.value)} className="rounded-xl" />
              </div>
            </motion.div>
          )}

          {/* Step 2 for Netzero: Chọn cấp chứng nhận + NVS */}
          {step === 2 && type === "netzero" && (
            <motion.div key="step2-netzero" className="space-y-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <p className="text-[13px] font-bold text-foreground">Chọn cấp chứng nhận</p>
              <div className="space-y-2.5">
                {netzeroOptions.map((opt) => (
                  <motion.button
                    key={opt.id}
                    className={`w-full rounded-2xl p-4 flex items-center gap-3 text-left border transition-colors ${
                      form.netzeroLevel === opt.id
                        ? "bg-primary/5 border-primary/30"
                        : "bg-card border-border/30"
                    }`}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => updateForm("netzeroLevel", opt.id)}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${form.netzeroLevel === opt.id ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
                      <opt.icon size={18} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[13px] font-semibold text-foreground">{opt.label}</p>
                      <p className="text-[11px] text-muted-foreground">{opt.desc}</p>
                    </div>
                    {form.netzeroLevel === opt.id && <CheckCircle2 size={18} className="text-primary" />}
                  </motion.button>
                ))}
              </div>

              <p className="text-[13px] font-bold text-foreground pt-2">Chọn NVS đăng ký</p>
              <div className="space-y-2">
                {existingToilets.map((t) => (
                  <motion.button
                    key={t.id}
                    className={`w-full rounded-2xl p-3.5 flex items-center gap-3 text-left border transition-colors ${
                      form.selectedToilet === t.id
                        ? "bg-primary/5 border-primary/30"
                        : "bg-card border-border/30"
                    }`}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => updateForm("selectedToilet", t.id)}
                  >
                    <Bath size={16} className={form.selectedToilet === t.id ? "text-primary" : "text-muted-foreground"} />
                    <div className="flex-1">
                      <p className="text-[12px] font-semibold text-foreground">{t.name}</p>
                      <p className="text-[10px] text-muted-foreground">{t.address}</p>
                    </div>
                    {form.selectedToilet === t.id && <CheckCircle2 size={16} className="text-primary" />}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2 (non-netzero): Nội dung yêu cầu */}
          {step === 2 && type !== "netzero" && (
            <motion.div key="step2" className="space-y-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <p className="text-[13px] font-bold text-foreground">
                {type === "tuvan" ? "Nhu cầu tư vấn" : "Nội dung yêu cầu"}
              </p>
              <Textarea
                placeholder={type === "tuvan" ? "Mô tả nhu cầu tư vấn của bạn..." : "Mô tả chi tiết yêu cầu dịch vụ..."}
                className="rounded-xl min-h-[120px]"
                value={form.content}
                onChange={(e) => updateForm("content", e.target.value)}
              />
              <Button variant="outline" className="w-full rounded-xl gap-2 font-semibold border-dashed">
                <ImageIcon size={16} /> Đính kèm hình ảnh / tài liệu
              </Button>

              {(type === "vsld" || type === "scbd" || type === "xaymoi" || type === "caitao") && (
                <>
                  <p className="text-[13px] font-bold text-foreground pt-2">Chọn NVS liên quan (tùy chọn)</p>
                  <div className="space-y-2">
                    {existingToilets.map((t) => (
                      <motion.button
                        key={t.id}
                        className={`w-full rounded-2xl p-3.5 flex items-center gap-3 text-left border transition-colors ${
                          form.selectedToilet === t.id
                            ? "bg-primary/5 border-primary/30"
                            : "bg-card border-border/30"
                        }`}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => updateForm("selectedToilet", form.selectedToilet === t.id ? null : t.id)}
                      >
                        <Bath size={16} className={form.selectedToilet === t.id ? "text-primary" : "text-muted-foreground"} />
                        <div className="flex-1">
                          <p className="text-[12px] font-semibold text-foreground">{t.name}</p>
                          <p className="text-[10px] text-muted-foreground">{t.address}</p>
                        </div>
                        {form.selectedToilet === t.id && <CheckCircle2 size={16} className="text-primary" />}
                      </motion.button>
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}

          {/* Step 3 (or 4 for netzero): Địa điểm + Xác nhận */}
          {step === 3 && type !== "netzero" && (
            <motion.div key="step3" className="space-y-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <p className="text-[13px] font-bold text-foreground">Xác nhận địa điểm thực hiện</p>
              <div>
                <label className="text-[12px] font-medium text-muted-foreground mb-1.5 block flex items-center gap-1.5">
                  <MapPin size={12} /> Địa điểm
                </label>
                <Input value={form.address} onChange={(e) => updateForm("address", e.target.value)} className="rounded-xl" />
                <p className="text-[10px] text-muted-foreground mt-1.5">Tự động lấy từ thông tin cá nhân, bạn có thể chỉnh sửa.</p>
              </div>

              {/* Summary */}
              <div className="bg-muted/40 rounded-2xl p-4 space-y-3 mt-4">
                <p className="text-[12px] font-bold text-foreground">Tóm tắt đơn hàng</p>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg ${service.gradient} flex items-center justify-center text-primary-foreground`}>
                    <ServiceIcon size={14} />
                  </div>
                  <span className="text-[13px] font-semibold text-foreground">{service.label}</span>
                </div>
                <div className="text-[11px] text-muted-foreground space-y-1.5 pt-2 border-t border-border/30">
                  <p>👤 {form.name} · {form.phone}</p>
                  <p>📍 {form.address}</p>
                  {form.content && <p>📝 {form.content.substring(0, 80)}...</p>}
                  {form.selectedToilet && (
                    <p>🚻 {existingToilets.find(t => t.id === form.selectedToilet)?.name}</p>
                  )}
                </div>
              </div>
            </motion.div>
          )}

          {/* Netzero step 3: content */}
          {step === 3 && type === "netzero" && (
            <motion.div key="step3-netzero" className="space-y-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <p className="text-[13px] font-bold text-foreground">Thông tin bổ sung</p>
              <Textarea
                placeholder="Ghi chú thêm về yêu cầu đăng ký Netzero..."
                className="rounded-xl min-h-[100px]"
                value={form.content}
                onChange={(e) => updateForm("content", e.target.value)}
              />
              <div>
                <label className="text-[12px] font-medium text-muted-foreground mb-1.5 block flex items-center gap-1.5">
                  <MapPin size={12} /> Địa điểm thực hiện
                </label>
                <Input value={form.address} onChange={(e) => updateForm("address", e.target.value)} className="rounded-xl" />
              </div>
            </motion.div>
          )}

          {/* Netzero step 4: Confirm */}
          {step === 4 && type === "netzero" && (
            <motion.div key="step4-netzero" className="space-y-4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
              <div className="bg-muted/40 rounded-2xl p-4 space-y-3">
                <p className="text-[12px] font-bold text-foreground">Tóm tắt đơn hàng Netzero</p>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg ${service.gradient} flex items-center justify-center text-primary-foreground`}>
                    <ServiceIcon size={14} />
                  </div>
                  <span className="text-[13px] font-semibold text-foreground">{service.label}</span>
                </div>
                <div className="text-[11px] text-muted-foreground space-y-1.5 pt-2 border-t border-border/30">
                  <p>👤 {form.name} · {form.phone}</p>
                  <p>📍 {form.address}</p>
                  <p>🏅 Cấp đăng ký: {netzeroOptions.find(o => o.id === form.netzeroLevel)?.label || "Chưa chọn"}</p>
                  {form.selectedToilet && (
                    <p>🚻 {existingToilets.find(t => t.id === form.selectedToilet)?.name}</p>
                  )}
                  {form.content && <p>📝 {form.content.substring(0, 80)}...</p>}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex gap-3 mt-8">
          {step > 1 && (
            <Button
              variant="outline"
              className="flex-1 rounded-2xl h-14 font-semibold gap-2"
              onClick={() => setStep((s) => s - 1)}
            >
              <ArrowLeft size={16} /> Quay lại
            </Button>
          )}
          {step < totalSteps ? (
            <Button
              className="flex-1 touch-target font-bold rounded-2xl gradient-primary border-0 shadow-glow h-14 text-primary-foreground gap-2"
              onClick={() => setStep((s) => s + 1)}
            >
              Tiếp theo <ChevronRight size={16} />
            </Button>
          ) : (
            <Button
              className="flex-1 touch-target font-bold rounded-2xl gradient-primary border-0 shadow-glow h-14 text-primary-foreground gap-2"
              onClick={handleSubmit}
            >
              <Send size={18} /> Gửi đơn hàng
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerCreateOrder;
