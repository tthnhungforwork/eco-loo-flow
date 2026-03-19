import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X, Sparkles, Wrench } from "lucide-react";
import { toast } from "sonner";

const defaultNvsOptions = ["NVS Tầng 1", "NVS Tầng 3", "NVS Tầng 5", "NVS Sảnh B", "NVS Eco Park"];
const defaultEmployeeOptions = [
  { name: "Trần Văn A", role: "VSLD" },
  { name: "Lê Thị B", role: "VSLD" },
  { name: "Phạm Văn C", role: "SCBD" },
  { name: "Nguyễn Văn D", role: "SCBD" },
  { name: "Hoàng Thị E", role: "VSLD" },
];
const deviceOptions = ["Bồn cầu", "Vòi nước", "Lavabo", "Bình nước nóng", "Quạt hút", "Van xả", "Ống thoát nước", "Máy sấy tay"];

export interface CreateTaskData {
  type: "VSLD" | "SCBD";
  title: string;
  assignee: string;
  nvs: string;
  deadline: string;
  description: string;
  checklist: string[];
  devices: string[];
  recurring: string;
}

interface CreateTaskSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (data: CreateTaskData) => void;
  nvsOptions?: string[];
  employeeOptions?: { name: string; role: string }[];
  orderId?: string;
}

const CreateTaskSheet = ({
  open,
  onOpenChange,
  onSubmit,
  nvsOptions = defaultNvsOptions,
  employeeOptions = defaultEmployeeOptions,
  orderId,
}: CreateTaskSheetProps) => {
  const [createType, setCreateType] = useState<"VSLD" | "SCBD">("VSLD");
  const [createTitle, setCreateTitle] = useState("");
  const [createAssignee, setCreateAssignee] = useState("");
  const [createNvs, setCreateNvs] = useState("");
  const [createDeadline, setCreateDeadline] = useState("");
  const [createDescription, setCreateDescription] = useState("");
  const [createChecklist, setCreateChecklist] = useState<string[]>([""]);
  const [createDevices, setCreateDevices] = useState<string[]>([]);
  const [createRecurring, setCreateRecurring] = useState("");

  const filteredEmployees = employeeOptions.filter((e) =>
    createType === "VSLD" ? e.role === "VSLD" : e.role === "SCBD"
  );

  const resetForm = () => {
    setCreateTitle("");
    setCreateAssignee("");
    setCreateNvs("");
    setCreateDeadline("");
    setCreateDescription("");
    setCreateChecklist([""]);
    setCreateDevices([]);
    setCreateRecurring("");
  };

  const handleCreate = () => {
    if (!createTitle.trim()) {
      toast.error("Vui lòng nhập tiêu đề công việc");
      return;
    }
    onSubmit?.({
      type: createType,
      title: createTitle,
      assignee: createAssignee,
      nvs: createNvs,
      deadline: createDeadline,
      description: createDescription,
      checklist: createChecklist.filter(Boolean),
      devices: createDevices,
      recurring: createRecurring,
    });
    toast.success("Đã tạo công việc mới");
    resetForm();
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="rounded-t-3xl max-h-[90vh] overflow-y-auto px-5 pb-8">
        <SheetHeader className="pb-4">
          <SheetTitle className="text-base text-left">
            Tạo công việc mới
            {orderId && <span className="text-[11px] text-muted-foreground font-normal ml-2">({orderId})</span>}
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-4">
          {/* Task type */}
          <div>
            <label className="text-[12px] font-bold text-foreground mb-2 block">Loại công việc</label>
            <div className="flex gap-2">
              <button
                onClick={() => { setCreateType("VSLD"); setCreateAssignee(""); }}
                className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  createType === "VSLD" ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                <Sparkles size={14} /> Vệ sinh lau dọn
              </button>
              <button
                onClick={() => { setCreateType("SCBD"); setCreateAssignee(""); }}
                className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  createType === "SCBD" ? "gradient-warm text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                <Wrench size={14} /> Sửa chữa BD
              </button>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="text-[12px] font-bold text-foreground mb-1.5 block">Tiêu đề công việc</label>
            <Input
              placeholder="VD: Vệ sinh NVS Tầng 3..."
              className="rounded-xl h-11"
              value={createTitle}
              onChange={(e) => setCreateTitle(e.target.value)}
            />
          </div>

          {/* NVS */}
          <div>
            <label className="text-[12px] font-bold text-foreground mb-1.5 block">Nhà vệ sinh</label>
            <Select value={createNvs} onValueChange={setCreateNvs}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Chọn NVS" />
              </SelectTrigger>
              <SelectContent>
                {nvsOptions.map((n) => (
                  <SelectItem key={n} value={n}>{n}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Assignee */}
          <div>
            <label className="text-[12px] font-bold text-foreground mb-1.5 block">
              Người thực hiện
              <span className="text-[10px] text-muted-foreground font-normal ml-1">(vai trò {createType})</span>
            </label>
            <Select value={createAssignee} onValueChange={setCreateAssignee}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Chọn nhân viên" />
              </SelectTrigger>
              <SelectContent>
                {filteredEmployees.map((e) => (
                  <SelectItem key={e.name} value={e.name}>{e.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Deadline */}
          <div>
            <label className="text-[12px] font-bold text-foreground mb-1.5 block">Thời gian thực hiện</label>
            <Input
              type="datetime-local"
              className="rounded-xl h-11"
              value={createDeadline}
              onChange={(e) => setCreateDeadline(e.target.value)}
            />
          </div>

          {/* Recurring - only for VSLD */}
          {createType === "VSLD" && (
            <div>
              <label className="text-[12px] font-bold text-foreground mb-1.5 block">Định kỳ (tùy chọn)</label>
              <Select value={createRecurring} onValueChange={setCreateRecurring}>
                <SelectTrigger className="rounded-xl">
                  <SelectValue placeholder="Không định kỳ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Không định kỳ</SelectItem>
                  <SelectItem value="daily">Hàng ngày</SelectItem>
                  <SelectItem value="weekly">Hàng tuần</SelectItem>
                  <SelectItem value="monthly">Hàng tháng</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* VSLD: Checklist */}
          {createType === "VSLD" && (
            <div>
              <label className="text-[12px] font-bold text-foreground mb-2 block">Checklist thực hiện</label>
              <div className="space-y-2">
                {createChecklist.map((item, i) => (
                  <div key={i} className="flex gap-2">
                    <Input
                      placeholder={`Bước ${i + 1}...`}
                      className="rounded-xl h-10 flex-1"
                      value={item}
                      onChange={(e) => {
                        const updated = [...createChecklist];
                        updated[i] = e.target.value;
                        setCreateChecklist(updated);
                      }}
                    />
                    {createChecklist.length > 1 && (
                      <button
                        onClick={() => setCreateChecklist(createChecklist.filter((_, j) => j !== i))}
                        className="w-10 h-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center shrink-0"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => setCreateChecklist([...createChecklist, ""])}
                  className="w-full h-10 rounded-xl border border-dashed border-primary/30 text-primary text-xs font-semibold flex items-center justify-center gap-1"
                >
                  <Plus size={14} /> Thêm bước
                </button>
              </div>
            </div>
          )}

          {/* SCBD: Description + Devices */}
          {createType === "SCBD" && (
            <>
              <div>
                <label className="text-[12px] font-bold text-foreground mb-1.5 block">Mô tả nội dung công việc</label>
                <Textarea
                  placeholder="Mô tả chi tiết nội dung sửa chữa/bảo dưỡng..."
                  className="rounded-xl min-h-[80px]"
                  value={createDescription}
                  onChange={(e) => setCreateDescription(e.target.value)}
                />
              </div>
              <div>
                <label className="text-[12px] font-bold text-foreground mb-2 block">Chọn thiết bị liên quan</label>
                <div className="flex flex-wrap gap-2">
                  {deviceOptions.map((d) => (
                    <button
                      key={d}
                      onClick={() =>
                        setCreateDevices((prev) =>
                          prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d]
                        )
                      }
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all ${
                        createDevices.includes(d)
                          ? "gradient-warm text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          <Button
            className="w-full touch-target font-bold rounded-2xl gradient-primary border-0 shadow-glow h-14 text-primary-foreground gap-2"
            onClick={handleCreate}
          >
            <Plus size={18} /> Tạo công việc
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateTaskSheet;
