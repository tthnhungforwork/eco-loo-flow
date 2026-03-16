import { useState, useRef, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ShieldCheck, RotateCcw } from "lucide-react";

interface OtpVerifySheetProps {
  open: boolean;
  phone: string;
  onVerified: () => void;
  onCancel: () => void;
}

const MOCK_OTP = "123456";
const OTP_LENGTH = 6;

const OtpVerifySheet = ({ open, phone, onVerified, onCancel }: OtpVerifySheetProps) => {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [verifying, setVerifying] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Countdown timer
  useEffect(() => {
    if (!open) return;
    setOtp(Array(OTP_LENGTH).fill(""));
    setError("");
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [open]);

  // Focus first input on open
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRefs.current[0]?.focus(), 200);
    }
  }, [open]);

  const maskedPhone = phone
    ? phone.slice(0, 4) + "***" + phone.slice(-3)
    : "****";

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError("");

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto verify when all digits filled
    if (newOtp.every((d) => d !== "") && newOtp.join("").length === OTP_LENGTH) {
      verifyOtp(newOtp.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (pasted.length === OTP_LENGTH) {
      const newOtp = pasted.split("");
      setOtp(newOtp);
      verifyOtp(pasted);
    }
  };

  const verifyOtp = (code: string) => {
    setVerifying(true);
    // Mock verification with delay
    setTimeout(() => {
      if (code === MOCK_OTP) {
        onVerified();
      } else {
        setError("Mã OTP không đúng. Vui lòng thử lại.");
        setOtp(Array(OTP_LENGTH).fill(""));
        inputRefs.current[0]?.focus();
      }
      setVerifying(false);
    }, 800);
  };

  const handleResend = () => {
    setCountdown(60);
    setOtp(Array(OTP_LENGTH).fill(""));
    setError("");
    inputRefs.current[0]?.focus();
  };

  return (
    <Sheet open={open} onOpenChange={() => onCancel()}>
      <SheetContent side="bottom" className="rounded-t-3xl px-6 pb-8">
        <SheetHeader className="pb-2">
          <SheetTitle className="text-base text-left">Xác thực OTP</SheetTitle>
        </SheetHeader>

        <div className="space-y-5">
          {/* Icon */}
          <motion.div
            className="w-16 h-16 mx-auto rounded-2xl gradient-primary flex items-center justify-center shadow-glow"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <ShieldCheck size={28} className="text-primary-foreground" />
          </motion.div>

          {/* Description */}
          <div className="text-center">
            <p className="text-[13px] text-foreground font-medium">
              Mã xác thực đã được gửi đến
            </p>
            <p className="text-[15px] font-bold text-primary mt-1">{maskedPhone}</p>
            <p className="text-[11px] text-muted-foreground mt-1">
              Nhập mã 6 số để xác nhận đăng ký dịch vụ
            </p>
            <p className="text-[10px] text-muted-foreground mt-0.5 italic">
              (Demo: mã OTP là <span className="font-mono font-bold text-primary">123456</span>)
            </p>
          </div>

          {/* OTP Input */}
          <div className="flex justify-center gap-2.5" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <motion.input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className={`w-11 h-13 text-center text-lg font-bold rounded-xl border-2 transition-all outline-none ${
                  digit
                    ? "border-primary bg-primary/5 text-foreground"
                    : "border-border bg-card text-foreground"
                } ${error ? "border-destructive bg-destructive/5" : ""} focus:border-primary focus:ring-2 focus:ring-primary/20`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + index * 0.04 }}
              />
            ))}
          </div>

          {/* Error */}
          {error && (
            <motion.p
              className="text-center text-[12px] text-destructive font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}

          {/* Verifying state */}
          {verifying && (
            <div className="text-center">
              <motion.div
                className="w-6 h-6 mx-auto border-2 border-primary border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              />
              <p className="text-[11px] text-muted-foreground mt-2">Đang xác thực...</p>
            </div>
          )}

          {/* Resend */}
          <div className="text-center">
            {countdown > 0 ? (
              <p className="text-[12px] text-muted-foreground">
                Gửi lại mã sau <span className="font-bold text-foreground">{countdown}s</span>
              </p>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="text-primary font-semibold gap-1.5"
                onClick={handleResend}
              >
                <RotateCcw size={14} /> Gửi lại mã OTP
              </Button>
            )}
          </div>

          {/* Cancel */}
          <Button
            variant="outline"
            className="w-full h-11 rounded-2xl font-semibold"
            onClick={onCancel}
          >
            Hủy bỏ
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default OtpVerifySheet;
