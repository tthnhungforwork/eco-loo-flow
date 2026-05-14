import { useRef, useState } from "react";
import { Plus, Pencil, Trash2, Wrench, FlaskConical, Copy, X, Check, ImagePlus, ImageIcon, Minus, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

export interface EquipmentItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  condition: string;
  image?: string;
}

export interface BioItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  cycle: string;
  image?: string;
}

const EQUIPMENT_MASTER = ["Bồn cầu", "Lavabo", "Vòi nước", "Gương soi", "Máy sấy tay", "Bình xịt", "Quạt thông gió"];
const EQUIPMENT_UNITS = ["cái", "bộ", "chiếc"];
const EQUIPMENT_CONDITIONS = ["Mới", "Đang sử dụng", "Hỏng"];

const BIO_MASTER = ["Enzyme khử mùi", "Vi sinh phân hủy", "Dung dịch tẩy rửa sinh học", "Chế phẩm khử khuẩn"];
const BIO_UNITS = ["chai", "gói", "lít", "kg"];
const BIO_CYCLES = ["Hằng ngày", "Hằng tuần", "2 tuần/lần", "Hằng tháng", "Quý"];

const conditionStyle: Record<string, string> = {
  "Mới": "bg-primary/10 text-primary border-primary/30",
  "Đang sử dụng": "bg-eco-teal/10 text-eco-teal border-eco-teal/30",
  "Hỏng": "bg-destructive/10 text-destructive border-destructive/30",
};

interface Props {
  equipments: EquipmentItem[];
  bios: BioItem[];
  onChangeEquipments: (items: EquipmentItem[]) => void;
  onChangeBios: (items: BioItem[]) => void;
}

const readFile = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = reject;
    r.readAsDataURL(file);
  });

const EquipmentBioSection = ({ equipments, bios, onChangeEquipments, onChangeBios }: Props) => {
  const [tab, setTab] = useState<"equipment" | "bio">("equipment");

  // Equipment form
  const [eqEditingId, setEqEditingId] = useState<string | null>(null);
  const [eqOpen, setEqOpen] = useState(false);
  const [eqForm, setEqForm] = useState<Omit<EquipmentItem, "id">>({ name: "", quantity: 1, unit: "cái", condition: "Mới", image: "" });
  const [eqErrors, setEqErrors] = useState<Record<string, string>>({});

  // Bio form
  const [bioEditingId, setBioEditingId] = useState<string | null>(null);
  const [bioOpen, setBioOpen] = useState(false);
  const [bioForm, setBioForm] = useState<Omit<BioItem, "id">>({ name: "", quantity: 1, unit: "chai", cycle: "Hằng tuần", image: "" });
  const [bioErrors, setBioErrors] = useState<Record<string, string>>({});

  const resetEqForm = () => {
    setEqForm({ name: "", quantity: 1, unit: "cái", condition: "Mới", image: "" });
    setEqErrors({});
    setEqEditingId(null);
  };
  const resetBioForm = () => {
    setBioForm({ name: "", quantity: 1, unit: "chai", cycle: "Hằng tuần", image: "" });
    setBioErrors({});
    setBioEditingId(null);
  };

  const validateEq = () => {
    const e: Record<string, string> = {};
    if (!eqForm.name.trim()) e.name = "Vui lòng chọn tên thiết bị";
    if (!eqForm.quantity || eqForm.quantity <= 0) e.quantity = "Số lượng phải lớn hơn 0";
    setEqErrors(e);
    return Object.keys(e).length === 0;
  };
  const validateBio = () => {
    const e: Record<string, string> = {};
    if (!bioForm.name.trim()) e.name = "Vui lòng chọn tên chế phẩm";
    if (!bioForm.quantity || bioForm.quantity <= 0) e.quantity = "Số lượng phải lớn hơn 0";
    setBioErrors(e);
    return Object.keys(e).length === 0;
  };

  const submitEq = (continueAdd = false) => {
    if (!validateEq()) return;
    if (eqEditingId) {
      onChangeEquipments(equipments.map((it) => (it.id === eqEditingId ? { ...eqForm, id: eqEditingId } : it)));
      toast.success("Cập nhật thiết bị thành công");
      setEqOpen(false);
      resetEqForm();
    } else {
      onChangeEquipments([...equipments, { ...eqForm, id: crypto.randomUUID() }]);
      toast.success("Đã thêm thiết bị");
      if (continueAdd) {
        resetEqForm();
      } else {
        setEqOpen(false);
        resetEqForm();
      }
    }
  };
  const submitBio = (continueAdd = false) => {
    if (!validateBio()) return;
    if (bioEditingId) {
      onChangeBios(bios.map((it) => (it.id === bioEditingId ? { ...bioForm, id: bioEditingId } : it)));
      toast.success("Cập nhật chế phẩm thành công");
      setBioOpen(false);
      resetBioForm();
    } else {
      onChangeBios([...bios, { ...bioForm, id: crypto.randomUUID() }]);
      toast.success("Đã thêm chế phẩm");
      if (continueAdd) {
        resetBioForm();
      } else {
        setBioOpen(false);
        resetBioForm();
      }
    }
  };

  const editEq = (it: EquipmentItem) => {
    setEqEditingId(it.id);
    setEqForm({ name: it.name, quantity: it.quantity, unit: it.unit, condition: it.condition, image: it.image || "" });
    setEqOpen(true);
  };
  const dupEq = (it: EquipmentItem) => {
    onChangeEquipments([...equipments, { ...it, id: crypto.randomUUID() }]);
    toast.success("Đã nhân bản dòng");
  };
  const delEq = (id: string) => {
    onChangeEquipments(equipments.filter((i) => i.id !== id));
    toast.success("Xóa thành công");
  };

  const editBio = (it: BioItem) => {
    setBioEditingId(it.id);
    setBioForm({ name: it.name, quantity: it.quantity, unit: it.unit, cycle: it.cycle, image: it.image || "" });
    setBioOpen(true);
  };
  const dupBio = (it: BioItem) => {
    onChangeBios([...bios, { ...it, id: crypto.randomUUID() }]);
    toast.success("Đã nhân bản dòng");
  };
  const delBio = (id: string) => {
    onChangeBios(bios.filter((i) => i.id !== id));
    toast.success("Xóa thành công");
  };

  return (
    <div className="rounded-2xl border border-border/60 bg-card/60 p-4 space-y-3">
      <div>
        <p className="text-sm font-bold text-foreground">Thiết bị & Chế phẩm sinh học</p>
        <p className="text-[11px] text-muted-foreground mt-0.5">Quản lý thiết bị và chế phẩm sử dụng tại NVS</p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 gap-1 p-1 bg-muted/60 rounded-xl">
        {([
          { key: "equipment", label: "Thiết bị", icon: Wrench, count: equipments.length },
          { key: "bio", label: "Chế phẩm", icon: FlaskConical, count: bios.length },
        ] as const).map((t) => {
          const active = tab === t.key;
          const Icon = t.icon;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-bold transition-all ${
                active ? "bg-background text-primary shadow-sm" : "text-muted-foreground"
              }`}
            >
              <Icon size={14} />
              {t.label}
              <span className={`ml-0.5 text-[10px] px-1.5 py-0.5 rounded-full ${active ? "bg-primary/10 text-primary" : "bg-muted-foreground/10"}`}>
                {t.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Equipment tab */}
      {tab === "equipment" && (
        <div className="space-y-2.5">
          {equipments.length === 0 ? (
            <EmptyState
              icon={<Wrench size={20} className="text-primary" />}
              title="Chưa có thiết bị nào"
              description="Thêm các thiết bị có tại nhà vệ sinh để quản lý vận hành"
            />
          ) : (
            <div className="space-y-2">
              <AnimatePresence initial={false}>
                {equipments.map((it) => (
                  <ItemCard
                    key={it.id}
                    image={it.image}
                    name={it.name}
                    badge={{ label: it.condition, className: conditionStyle[it.condition] || "" }}
                    meta={`${it.quantity} ${it.unit}`}
                    onEdit={() => editEq(it)}
                    onDup={() => dupEq(it)}
                    onDel={() => delEq(it.id)}
                    fallbackIcon={<Wrench size={16} className="text-muted-foreground" />}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}

          <Button
            type="button"
            variant="outline"
            className="w-full rounded-xl h-12 text-sm font-bold border-dashed border-primary/40 text-primary hover:bg-primary/5 gap-1.5"
            onClick={() => { resetEqForm(); setEqOpen(true); }}
          >
            <Plus size={16} /> Thêm thiết bị
          </Button>
        </div>
      )}

      {/* Bio tab */}
      {tab === "bio" && (
        <div className="space-y-2.5">
          {bios.length === 0 ? (
            <EmptyState
              icon={<FlaskConical size={20} className="text-eco-teal" />}
              title="Chưa có chế phẩm nào"
              description="Thêm các chế phẩm sinh học sử dụng tại nhà vệ sinh"
            />
          ) : (
            <div className="space-y-2">
              <AnimatePresence initial={false}>
                {bios.map((it) => (
                  <ItemCard
                    key={it.id}
                    image={it.image}
                    name={it.name}
                    badge={{ label: it.cycle, className: "bg-eco-teal/10 text-eco-teal border-eco-teal/30" }}
                    meta={`${it.quantity} ${it.unit}`}
                    onEdit={() => editBio(it)}
                    onDup={() => dupBio(it)}
                    onDel={() => delBio(it.id)}
                    fallbackIcon={<FlaskConical size={16} className="text-muted-foreground" />}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}

          <Button
            type="button"
            variant="outline"
            className="w-full rounded-xl h-12 text-sm font-bold border-dashed border-eco-teal/40 text-eco-teal hover:bg-eco-teal/5 gap-1.5"
            onClick={() => { resetBioForm(); setBioOpen(true); }}
          >
            <Plus size={16} /> Thêm chế phẩm
          </Button>
        </div>
      )}

      {/* Equipment Drawer */}
      <Drawer open={eqOpen} onOpenChange={(o) => { setEqOpen(o); if (!o) resetEqForm(); }}>
        <DrawerContent className="max-h-[92vh]">
          <DrawerHeader className="pb-2">
            <DrawerTitle className="text-base flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-primary/10 text-primary flex items-center justify-center"><Wrench size={14} /></span>
              {eqEditingId ? "Sửa thiết bị" : "Thêm thiết bị"}
            </DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-2 overflow-y-auto space-y-4">
            <ImagePicker
              value={eqForm.image}
              onChange={(v) => setEqForm((s) => ({ ...s, image: v }))}
              accent="primary"
            />
            <Field label="Tên thiết bị" required error={eqErrors.name}>
              <Select value={eqForm.name} onValueChange={(v) => setEqForm((s) => ({ ...s, name: v }))}>
                <SelectTrigger className="h-12 text-sm rounded-xl"><SelectValue placeholder="Chọn thiết bị" /></SelectTrigger>
                <SelectContent>{EQUIPMENT_MASTER.map((n) => (<SelectItem key={n} value={n}>{n}</SelectItem>))}</SelectContent>
              </Select>
            </Field>
            <Field label="Số lượng" required error={eqErrors.quantity}>
              <QuantityStepper
                value={eqForm.quantity}
                onChange={(v) => setEqForm((s) => ({ ...s, quantity: v }))}
              />
            </Field>
            <Field label="Đơn vị">
              <PillGroup
                value={eqForm.unit}
                options={EQUIPMENT_UNITS}
                onChange={(v) => setEqForm((s) => ({ ...s, unit: v }))}
              />
            </Field>
            <Field label="Tình trạng">
              <PillGroup
                value={eqForm.condition}
                options={EQUIPMENT_CONDITIONS}
                onChange={(v) => setEqForm((s) => ({ ...s, condition: v }))}
              />
            </Field>
          </div>
          <div className="p-4 pt-3 border-t border-border/40 bg-background/95 backdrop-blur space-y-2">
            {!eqEditingId && (
              <Button type="button" variant="outline" className="w-full rounded-xl h-11 text-sm gap-1.5" onClick={() => submitEq(true)}>
                <Plus size={14} /> Lưu & thêm tiếp
              </Button>
            )}
            <Button type="button" className="w-full rounded-xl h-12 text-sm gradient-primary border-0 text-primary-foreground gap-1.5" onClick={() => submitEq(false)}>
              <Check size={16} /> {eqEditingId ? "Cập nhật" : "Lưu thiết bị"}
            </Button>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Bio Drawer */}
      <Drawer open={bioOpen} onOpenChange={(o) => { setBioOpen(o); if (!o) resetBioForm(); }}>
        <DrawerContent className="max-h-[92vh]">
          <DrawerHeader className="pb-2">
            <DrawerTitle className="text-base flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-eco-teal/10 text-eco-teal flex items-center justify-center"><FlaskConical size={14} /></span>
              {bioEditingId ? "Sửa chế phẩm" : "Thêm chế phẩm"}
            </DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-2 overflow-y-auto space-y-4">
            <ImagePicker
              value={bioForm.image}
              onChange={(v) => setBioForm((s) => ({ ...s, image: v }))}
              accent="teal"
            />
            <Field label="Tên chế phẩm" required error={bioErrors.name}>
              <Select value={bioForm.name} onValueChange={(v) => setBioForm((s) => ({ ...s, name: v }))}>
                <SelectTrigger className="h-12 text-sm rounded-xl"><SelectValue placeholder="Chọn chế phẩm" /></SelectTrigger>
                <SelectContent>{BIO_MASTER.map((n) => (<SelectItem key={n} value={n}>{n}</SelectItem>))}</SelectContent>
              </Select>
            </Field>
            <Field label="Số lượng" required error={bioErrors.quantity}>
              <QuantityStepper
                value={bioForm.quantity}
                onChange={(v) => setBioForm((s) => ({ ...s, quantity: v }))}
              />
            </Field>
            <Field label="Đơn vị">
              <PillGroup
                value={bioForm.unit}
                options={BIO_UNITS}
                onChange={(v) => setBioForm((s) => ({ ...s, unit: v }))}
              />
            </Field>
            <Field label="Chu kỳ sử dụng">
              <PillGroup
                value={bioForm.cycle}
                options={BIO_CYCLES}
                onChange={(v) => setBioForm((s) => ({ ...s, cycle: v }))}
              />
            </Field>
          </div>
          <div className="p-4 pt-3 border-t border-border/40 bg-background/95 backdrop-blur space-y-2">
            {!bioEditingId && (
              <Button type="button" variant="outline" className="w-full rounded-xl h-11 text-sm gap-1.5" onClick={() => submitBio(true)}>
                <Plus size={14} /> Lưu & thêm tiếp
              </Button>
            )}
            <Button type="button" className="w-full rounded-xl h-12 text-sm gradient-primary border-0 text-primary-foreground gap-1.5" onClick={() => submitBio(false)}>
              <Check size={16} /> {bioEditingId ? "Cập nhật" : "Lưu chế phẩm"}
            </Button>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

/* ---------- Sub components ---------- */

const ItemCard = ({
  image, name, badge, meta, onEdit, onDup, onDel, fallbackIcon,
}: {
  image?: string; name: string; badge: { label: string; className: string }; meta: string;
  onEdit: () => void; onDup: () => void; onDel: () => void; fallbackIcon: React.ReactNode;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, height: 0, marginBottom: 0 }}
    className="flex items-center gap-3 p-2.5 rounded-xl border border-border/50 bg-background"
    onClick={onEdit}
    role="button"
  >
    <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted/60 flex items-center justify-center shrink-0 border border-border/40">
      {image ? (
        <img src={image} alt={name} className="w-full h-full object-cover" />
      ) : (
        fallbackIcon
      )}
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-bold text-foreground truncate">{name}</p>
      <div className="flex items-center gap-1.5 mt-1">
        <span className="text-[11px] font-semibold text-muted-foreground">{meta}</span>
        <span className="text-muted-foreground/40">•</span>
        <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold border ${badge.className}`}>
          {badge.label}
        </span>
      </div>
    </div>
    <div onClick={(e) => e.stopPropagation()}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button type="button" className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted/60">
            <MoreVertical size={16} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem onClick={onEdit}><Pencil size={14} className="mr-2" /> Sửa</DropdownMenuItem>
          <DropdownMenuItem onClick={onDup}><Copy size={14} className="mr-2" /> Nhân bản</DropdownMenuItem>
          <DropdownMenuItem onClick={onDel} className="text-destructive focus:text-destructive"><Trash2 size={14} className="mr-2" /> Xóa</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </motion.div>
);

const Field = ({ label, required, error, children }: { label: string; required?: boolean; error?: string; children: React.ReactNode }) => (
  <div>
    <Label className="text-xs font-semibold text-foreground mb-1.5 block">
      {label} {required && <span className="text-destructive">*</span>}
    </Label>
    {children}
    {error && <p className="text-[11px] text-destructive mt-1">{error}</p>}
  </div>
);

const QuantityStepper = ({ value, onChange }: { value: number; onChange: (v: number) => void }) => (
  <div className="flex items-center gap-2">
    <button
      type="button"
      onClick={() => onChange(Math.max(1, value - 1))}
      className="w-12 h-12 rounded-xl border border-border bg-background flex items-center justify-center text-foreground active:scale-95 transition"
    >
      <Minus size={16} />
    </button>
    <Input
      type="number"
      min={1}
      className="h-12 text-base text-center font-bold rounded-xl flex-1"
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
    />
    <button
      type="button"
      onClick={() => onChange(value + 1)}
      className="w-12 h-12 rounded-xl border border-border bg-background flex items-center justify-center text-foreground active:scale-95 transition"
    >
      <Plus size={16} />
    </button>
  </div>
);

const PillGroup = ({ value, options, onChange }: { value: string; options: string[]; onChange: (v: string) => void }) => (
  <div className="flex flex-wrap gap-1.5">
    {options.map((o) => {
      const active = value === o;
      return (
        <button
          key={o}
          type="button"
          onClick={() => onChange(o)}
          className={`px-3 h-9 rounded-full text-xs font-semibold border transition ${
            active
              ? "bg-primary text-primary-foreground border-primary shadow-sm"
              : "bg-background text-muted-foreground border-border hover:border-primary/40"
          }`}
        >
          {o}
        </button>
      );
    })}
  </div>
);

const ImagePicker = ({ value, onChange, accent }: { value?: string; onChange: (v: string) => void; accent: "primary" | "teal" }) => {
  const ref = useRef<HTMLInputElement>(null);
  const accentCls = accent === "primary"
    ? "border-primary/40 text-primary bg-primary/5"
    : "border-eco-teal/40 text-eco-teal bg-eco-teal/5";
  return (
    <div>
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={async (e) => {
        const f = e.target.files?.[0]; if (!f) return;
        const url = await readFile(f); onChange(url); e.target.value = "";
      }} />
      {value ? (
        <div className="relative w-full h-32 rounded-2xl overflow-hidden border border-border/50 bg-muted/30">
          <img src={value} alt="preview" className="w-full h-full object-cover" />
          <button
            type="button"
            onClick={() => onChange("")}
            className="absolute top-2 right-2 w-8 h-8 rounded-full bg-background/90 backdrop-blur text-destructive flex items-center justify-center shadow"
          >
            <X size={14} />
          </button>
          <button
            type="button"
            onClick={() => ref.current?.click()}
            className="absolute bottom-2 right-2 px-3 h-8 rounded-full bg-background/90 backdrop-blur text-foreground text-xs font-semibold flex items-center gap-1 shadow"
          >
            <ImagePlus size={12} /> Đổi ảnh
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => ref.current?.click()}
          className={`w-full h-28 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-1 ${accentCls}`}
        >
          <ImagePlus size={20} />
          <span className="text-xs font-semibold">Tải ảnh lên</span>
          <span className="text-[10px] opacity-70">JPG, PNG · tối đa 5MB</span>
        </button>
      )}
    </div>
  );
};

const EmptyState = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="flex flex-col items-center justify-center py-8 px-4 rounded-xl border border-dashed border-border/60 bg-muted/20 text-center">
    <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mb-2 shadow-sm">
      {icon}
    </div>
    <p className="text-sm font-bold text-foreground">{title}</p>
    <p className="text-[11px] text-muted-foreground mt-1 max-w-[240px]">{description}</p>
  </div>
);

// Unused import guard
void ImageIcon;

export default EquipmentBioSection;
