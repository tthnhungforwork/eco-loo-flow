import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, CheckCircle2, Circle, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const mockToilets = [
  { id: "NVS1", name: "NVS Tầng 1" },
  { id: "NVS2", name: "NVS Tầng 2" },
  { id: "NVS3", name: "NVS Tầng 3" },
  { id: "NVS4", name: "NVS Sảnh B" },
  { id: "NVS5", name: "NVS KTX Block A" },
];

interface Criteria {
  id: string;
  label: string;
  desc: string;
  checked: boolean;
}

const sachCriteria: Criteria[] = [
  { id: "s1", label: "Sạch sẽ toàn diện", desc: "Không có bụi bẩn, rác, vết ố trên mọi bề mặt", checked: false },
  { id: "s2", label: "Khô ráo", desc: "Không đọng nước, sàn luôn khô thoáng", checked: false },
  { id: "s3", label: "Không mùi hôi", desc: "Mùi tự nhiên hoặc có hương thơm nhẹ", checked: false },
  { id: "s4", label: "Đầy đủ trang thiết bị", desc: "Giấy vệ sinh, xà phòng, nước sạch, khăn tay", checked: false },
  { id: "s5", label: "Vệ sinh định kỳ", desc: "Có kế hoạch vệ sinh rõ ràng, tuân thủ quy trình", checked: false },
  { id: "s6", label: "Bồn cầu/lavabo sạch", desc: "Không vết bẩn, không cặn ố, nắp đậy kín", checked: false },
  { id: "s7", label: "Trang thiết bị sạch", desc: "Bồn cầu, lavabo, gương, kệ luôn sạch và gọn gàng", checked: false },
  { id: "s8", label: "Thoát nước tốt", desc: "Không tắc nghẽn, nước thoát nhanh", checked: false },
  { id: "s9", label: "Không côn trùng", desc: "Không xuất hiện ruồi, muỗi...", checked: false },
  { id: "s10", label: "Ánh sáng đầy đủ", desc: "Luôn đủ sáng vào mọi thời điểm", checked: false },
  { id: "s11", label: "Thẩm mỹ hài hòa", desc: "Thiết kế đẹp, thân thiện, dễ chịu cho người dùng", checked: false },
  { id: "s12", label: "Thiết kế tiện ích", desc: "Lối đi, cửa, thiết bị, điện nước bố trí khoa học", checked: false },
];

const xanhCriteria: Criteria[] = [
  { id: "x1", label: 'Đạt chuẩn "Sạch"', desc: "Tuân thủ đầy đủ 12 tiêu chí của nhà vệ sinh Sạch", checked: false },
  { id: "x2", label: "Không dùng hóa chất", desc: "Không sử dụng hóa chất tẩy rửa hoặc rửa tay", checked: false },
  { id: "x3", label: "Tiết kiệm nước", desc: "Sử dụng thiết bị và phương pháp giúp giảm lượng nước tiêu thụ", checked: false },
  { id: "x4", label: "Tiết kiệm điện", desc: "Tối ưu ánh sáng, thông gió tự nhiên và thiết bị tiết kiệm điện", checked: false },
  { id: "x5", label: "Xử lý rác & nước thải đúng cách", desc: "Thu gom và xử lý chất thải theo quy định", checked: false },
  { id: "x6", label: "Thân thiện môi trường", desc: "Thiết kế, xây dựng, vận hành hướng tới bảo vệ môi trường", checked: false },
];

const tuanHoanCriteria: Criteria[] = [
  { id: "t1", label: 'Đạt chuẩn "Xanh"', desc: "Tuân thủ đầy đủ 12 tiêu chí Sạch + 6 tiêu chí Xanh", checked: false },
  { id: "t2", label: "Sử dụng năng lượng tái tạo", desc: "Ưu tiên điện mặt trời, điện gió...", checked: false },
  { id: "t3", label: "Dùng nước tái tạo", desc: "Tái sử dụng nước tại chỗ hoặc từ nguồn tái tạo", checked: false },
  { id: "t4", label: "Tái chế chất thải", desc: "Chuyển rác thải thành phân vi sinh hoặc nguyên liệu mới", checked: false },
  { id: "t5", label: "Vật liệu thân thiện", desc: "Dùng vật liệu tự nhiên, tái chế, có thể tái sinh", checked: false },
  { id: "t6", label: "Giảm phát thải", desc: "Hướng đến giảm thiểu khí thải, tiến tới Net Zero", checked: false },
];

interface Props {
  onClose: () => void;
}

const SurveyGreenSheet = ({ onClose }: Props) => {
  const [step, setStep] = useState<"select" | "survey">("select");
  const [selectedNvs, setSelectedNvs] = useState<string>("all");
  const [sach, setSach] = useState(sachCriteria);
  const [xanh, setXanh] = useState(xanhCriteria);
  const [tuanHoan, setTuanHoan] = useState(tuanHoanCriteria);

  const toggleItem = (
    list: Criteria[],
    setter: React.Dispatch<React.SetStateAction<Criteria[]>>,
    id: string
  ) => {
    setter(list.map((c) => (c.id === id ? { ...c, checked: !c.checked } : c)));
  };

  const sachCount = sach.filter((c) => c.checked).length;
  const xanhCount = xanh.filter((c) => c.checked).length;
  const tuanHoanCount = tuanHoan.filter((c) => c.checked).length;
  const totalChecked = sachCount + xanhCount + tuanHoanCount;
  const totalItems = sach.length + xanh.length + tuanHoan.length;

  const handleComplete = () => {
    toast.success("Đã hoàn thành khảo sát Sạch - Xanh - Tuần hoàn!");
    onClose();
  };

  const handleSaveDraft = () => {
    toast.info("Đã lưu nháp khảo sát");
    onClose();
  };

  const renderCriteriaSection = (
    title: string,
    items: Criteria[],
    setter: React.Dispatch<React.SetStateAction<Criteria[]>>,
    checkedCount: number
  ) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-primary">{title}</h3>
        <span className="text-xs font-semibold text-muted-foreground">
          {checkedCount}/{items.length}
        </span>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => toggleItem(items, setter, item.id)}
            className="w-full flex items-start gap-3 p-3 rounded-xl bg-card border border-border/50 hover:border-primary/30 transition-all text-left"
          >
            {item.checked ? (
              <CheckCircle2 size={20} className="text-primary shrink-0 mt-0.5" />
            ) : (
              <Circle size={20} className="text-muted-foreground/40 shrink-0 mt-0.5" />
            )}
            <div className="flex-1 min-w-0">
              <p className={`text-sm font-semibold ${item.checked ? "text-foreground" : "text-foreground/80"}`}>
                {item.label}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-50 bg-background flex flex-col max-w-lg mx-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 h-14 border-b border-border/50 bg-background/95 backdrop-blur-xl shrink-0">
        <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-muted">
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h1 className="text-sm font-bold text-foreground flex-1">
          Đánh giá tiêu chuẩn Sạch - Xanh - Tuần hoàn
        </h1>
      </div>

      {/* Progress bar */}
      <div className="flex gap-1.5 px-4 pt-3">
        <div className={`h-1 flex-1 rounded-full ${step === "select" || step === "survey" ? "bg-primary" : "bg-muted"}`} />
        <div className={`h-1 flex-1 rounded-full ${step === "survey" ? "bg-primary" : "bg-muted"}`} />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {step === "select" && (
            <motion.div
              key="select"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="px-4 py-5 space-y-5"
            >
              <div>
                <h2 className="text-lg font-bold text-foreground">
                  Bảng đánh giá tiêu chuẩn Sạch - Xanh - Tuần hoàn
                </h2>
                <p className="text-xs text-muted-foreground mt-1">
                  Lưu ý: Ấn Lưu ở mỗi lần khảo sát ở từng nhà vệ sinh
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="rounded-full border-primary text-primary font-semibold text-xs h-9 px-4"
                  onClick={() => setStep("survey")}
                >
                  <PlusCircle size={14} className="mr-1" />
                  Chọn NVS có sẵn
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full border-primary text-primary font-semibold text-xs h-9 px-4"
                >
                  <PlusCircle size={14} className="mr-1" />
                  Thêm mới NVS
                </Button>
              </div>

              {/* NVS List */}
              {mockToilets.length > 0 ? (
                <div className="space-y-2">
                  {mockToilets.map((nvs) => (
                    <button
                      key={nvs.id}
                      onClick={() => {
                        setSelectedNvs(nvs.id);
                        setStep("survey");
                      }}
                      className="w-full glass-card rounded-xl p-4 flex items-center gap-3 text-left hover:border-primary/30 transition-all"
                    >
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                        <span className="text-xs font-bold text-primary">{nvs.id.replace("NVS", "")}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground">{nvs.name}</p>
                        <p className="text-[11px] text-muted-foreground">Chưa khảo sát</p>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-muted text-muted-foreground">
                        Chọn
                      </span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center py-12 text-center">
                  <p className="text-sm text-muted-foreground mt-4">
                    Không tìm thấy nhà vệ sinh nào. Vui lòng thêm mới!
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {step === "survey" && (
            <motion.div
              key="survey"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="px-4 py-5 space-y-6"
            >
              {/* NVS tabs */}
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                <button
                  onClick={() => setSelectedNvs("all")}
                  className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedNvs === "all"
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  Tất cả
                </button>
                {mockToilets.map((nvs) => (
                  <button
                    key={nvs.id}
                    onClick={() => setSelectedNvs(nvs.id)}
                    className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                      selectedNvs === nvs.id
                        ? "bg-foreground text-background"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {nvs.id}
                  </button>
                ))}
              </div>

              {/* Progress summary */}
              <div className="glass-card rounded-xl p-3 flex items-center justify-between">
                <span className="text-xs font-semibold text-foreground">Tiến độ khảo sát</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${(totalChecked / totalItems) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-primary">
                    {totalChecked}/{totalItems}
                  </span>
                </div>
              </div>

              {renderCriteriaSection("Khảo sát Tiêu chí Sạch", sach, setSach, sachCount)}
              {renderCriteriaSection("Khảo sát Tiêu chí Xanh", xanh, setXanh, xanhCount)}
              {renderCriteriaSection("Khảo sát Tiêu chí Tuần hoàn", tuanHoan, setTuanHoan, tuanHoanCount)}

              <div className="h-24" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom buttons */}
      <div className="shrink-0 border-t border-border/50 bg-background p-4 flex gap-3">
        {step === "select" ? (
          <Button variant="outline" className="flex-1 rounded-xl h-11 font-bold" onClick={onClose}>
            Đóng
          </Button>
        ) : (
          <>
            <Button variant="outline" className="flex-1 rounded-xl h-11 font-bold" onClick={handleSaveDraft}>
              Lưu nháp
            </Button>
            <Button className="flex-1 rounded-xl h-11 font-bold gradient-primary border-0 shadow-glow" onClick={handleComplete}>
              Hoàn thành
            </Button>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default SurveyGreenSheet;
