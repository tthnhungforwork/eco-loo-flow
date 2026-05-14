import { useRef, useState } from "react";
import { Plus, Pencil, Trash2, Wrench, FlaskConical, Copy, X, Check, PackageOpen, ImagePlus, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

const EquipmentBioSection = ({ equipments, bios, onChangeEquipments, onChangeBios }: Props) => {
  const [tab, setTab] = useState<"equipment" | "bio">("equipment");

  // Equipment form
  const [eqEditingId, setEqEditingId] = useState<string | null>(null);
  const [eqOpen, setEqOpen] = useState(false);
  const [eqForm, setEqForm] = useState<Omit<EquipmentItem, "id">>({ name: "", quantity: 1, unit: "cái", condition: "Mới", image: "" });
  const [eqErrors, setEqErrors] = useState<Record<string, string>>({});
  const eqFileRef = useRef<HTMLInputElement>(null);

  // Bio form
  const [bioEditingId, setBioEditingId] = useState<string | null>(null);
  const [bioOpen, setBioOpen] = useState(false);
  const [bioForm, setBioForm] = useState<Omit<BioItem, "id">>({ name: "", quantity: 1, unit: "chai", cycle: "Hằng tuần", image: "" });
  const [bioErrors, setBioErrors] = useState<Record<string, string>>({});
  const bioFileRef = useRef<HTMLInputElement>(null);

  const readFile = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const r = new FileReader();
      r.onload = () => resolve(String(r.result));
      r.onerror = reject;
      r.readAsDataURL(file);
    });

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
    if (!eqForm.unit) e.unit = "Chọn đơn vị";
    setEqErrors(e);
    return Object.keys(e).length === 0;
  };
  const validateBio = () => {
    const e: Record<string, string> = {};
    if (!bioForm.name.trim()) e.name = "Vui lòng chọn tên chế phẩm";
    if (!bioForm.quantity || bioForm.quantity <= 0) e.quantity = "Số lượng phải lớn hơn 0";
    if (!bioForm.unit) e.unit = "Chọn đơn vị";
    if (!bioForm.cycle.trim()) e.cycle = "Nhập chu kỳ sử dụng";
    setBioErrors(e);
    return Object.keys(e).length === 0;
  };

  const submitEq = () => {
    if (!validateEq()) return;
    if (eqEditingId) {
      onChangeEquipments(equipments.map((it) => (it.id === eqEditingId ? { ...eqForm, id: eqEditingId } : it)));
      toast.success("Cập nhật thiết bị thành công");
    } else {
      onChangeEquipments([...equipments, { ...eqForm, id: crypto.randomUUID() }]);
      toast.success("Đã thêm thiết bị");
    }
    resetEqForm();
  };
  const submitBio = () => {
    if (!validateBio()) return;
    if (bioEditingId) {
      onChangeBios(bios.map((it) => (it.id === bioEditingId ? { ...bioForm, id: bioEditingId } : it)));
      toast.success("Cập nhật chế phẩm thành công");
    } else {
      onChangeBios([...bios, { ...bioForm, id: crypto.randomUUID() }]);
      toast.success("Đã thêm chế phẩm");
    }
    resetBioForm();
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
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-foreground">Thiết bị & Chế phẩm sinh học</p>
          <p className="text-[11px] text-muted-foreground mt-0.5">Quản lý thiết bị và chế phẩm sử dụng tại NVS</p>
        </div>
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
              className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-bold transition-all ${
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
        <div className="space-y-3">
          {equipments.length === 0 && !eqOpen ? (
            <EmptyState
              icon={<Wrench size={20} className="text-primary" />}
              title="Chưa có thiết bị nào"
              description="Thêm các thiết bị có tại nhà vệ sinh để quản lý vận hành"
            />
          ) : (
            <div className="rounded-xl border border-border/50 overflow-hidden">
              <div className="grid grid-cols-12 gap-1 px-3 py-2 bg-muted/50 text-[10px] font-bold text-muted-foreground uppercase">
                <div className="col-span-4">Tên</div>
                <div className="col-span-2 text-center">SL</div>
                <div className="col-span-2 text-center">Đơn vị</div>
                <div className="col-span-2 text-center">Tình trạng</div>
                <div className="col-span-2 text-right">Thao tác</div>
              </div>
              <AnimatePresence initial={false}>
                {equipments.map((it) => (
                  <motion.div
                    key={it.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid grid-cols-12 gap-1 px-3 py-2.5 border-t border-border/40 items-center text-xs"
                  >
                    <div className="col-span-4 flex items-center gap-2 min-w-0">
                      {it.image ? (
                        <img src={it.image} alt={it.name} className="w-7 h-7 rounded-md object-cover border border-border/40 shrink-0" />
                      ) : (
                        <div className="w-7 h-7 rounded-md bg-muted/60 flex items-center justify-center shrink-0"><ImageIcon size={12} className="text-muted-foreground" /></div>
                      )}
                      <span className="font-semibold text-foreground truncate">{it.name}</span>
                    </div>
                    <div className="col-span-2 text-center font-mono">{it.quantity}</div>
                    <div className="col-span-2 text-center text-muted-foreground">{it.unit}</div>
                    <div className="col-span-2 text-center">
                      <span className={`inline-block px-1.5 py-0.5 rounded-full text-[9px] font-bold border ${conditionStyle[it.condition] || ""}`}>
                        {it.condition}
                      </span>
                    </div>
                    <div className="col-span-2 flex justify-end gap-0.5">
                      <button type="button" onClick={() => dupEq(it)} className="p-1 text-muted-foreground hover:text-primary rounded" title="Nhân bản"><Copy size={12} /></button>
                      <button type="button" onClick={() => editEq(it)} className="p-1 text-muted-foreground hover:text-primary rounded" title="Sửa"><Pencil size={12} /></button>
                      <button type="button" onClick={() => delEq(it.id)} className="p-1 text-muted-foreground hover:text-destructive rounded" title="Xóa"><Trash2 size={12} /></button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          <AnimatePresence>
            {eqOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="rounded-xl border border-primary/30 bg-primary/5 p-3 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-foreground">{eqEditingId ? "Sửa thiết bị" : "Thêm thiết bị"}</p>
                  <button type="button" onClick={() => { setEqOpen(false); resetEqForm(); }} className="text-muted-foreground hover:text-foreground"><X size={14} /></button>
                </div>
                <div>
                  <Label className="text-[11px] text-muted-foreground mb-1 block">Tên thiết bị <span className="text-destructive">*</span></Label>
                  <Select value={eqForm.name} onValueChange={(v) => setEqForm((s) => ({ ...s, name: v }))}>
                    <SelectTrigger className="h-9 text-xs rounded-lg"><SelectValue placeholder="Chọn thiết bị" /></SelectTrigger>
                    <SelectContent>{EQUIPMENT_MASTER.map((n) => (<SelectItem key={n} value={n}>{n}</SelectItem>))}</SelectContent>
                  </Select>
                  {eqErrors.name && <p className="text-[10px] text-destructive mt-1">{eqErrors.name}</p>}
                </div>
                <div>
                  <Label className="text-[11px] text-muted-foreground mb-1 block">Hình ảnh</Label>
                  <input ref={eqFileRef} type="file" accept="image/*" className="hidden" onChange={async (e) => {
                    const f = e.target.files?.[0]; if (!f) return;
                    const url = await readFile(f); setEqForm((s) => ({ ...s, image: url })); e.target.value = "";
                  }} />
                  {eqForm.image ? (
                    <div className="relative inline-block">
                      <img src={eqForm.image} alt="thiết bị" className="w-20 h-20 rounded-lg object-cover border border-border/50" />
                      <button type="button" onClick={() => setEqForm((s) => ({ ...s, image: "" }))} className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center shadow"><X size={10} /></button>
                    </div>
                  ) : (
                    <button type="button" onClick={() => eqFileRef.current?.click()} className="flex flex-col items-center justify-center w-20 h-20 rounded-lg border border-dashed border-primary/40 bg-background hover:bg-primary/5 text-primary gap-1">
                      <ImagePlus size={16} /><span className="text-[10px] font-medium">Tải ảnh</span>
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Label className="text-[11px] text-muted-foreground mb-1 block">Số lượng <span className="text-destructive">*</span></Label>
                    <Input type="number" min={1} className="h-9 text-xs rounded-lg" value={eqForm.quantity} onChange={(e) => setEqForm((s) => ({ ...s, quantity: Number(e.target.value) }))} />
                    {eqErrors.quantity && <p className="text-[10px] text-destructive mt-1">{eqErrors.quantity}</p>}
                  </div>
                  <div>
                    <Label className="text-[11px] text-muted-foreground mb-1 block">Đơn vị</Label>
                    <Select value={eqForm.unit} onValueChange={(v) => setEqForm((s) => ({ ...s, unit: v }))}>
                      <SelectTrigger className="h-9 text-xs rounded-lg"><SelectValue /></SelectTrigger>
                      <SelectContent>{EQUIPMENT_UNITS.map((u) => (<SelectItem key={u} value={u}>{u}</SelectItem>))}</SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-[11px] text-muted-foreground mb-1 block">Tình trạng</Label>
                    <Select value={eqForm.condition} onValueChange={(v) => setEqForm((s) => ({ ...s, condition: v }))}>
                      <SelectTrigger className="h-9 text-xs rounded-lg"><SelectValue /></SelectTrigger>
                      <SelectContent>{EQUIPMENT_CONDITIONS.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}</SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-2 pt-1">
                  <Button type="button" variant="outline" size="sm" className="flex-1 rounded-lg h-9 text-xs" onClick={() => { setEqOpen(false); resetEqForm(); }}>Hủy</Button>
                  <Button type="button" size="sm" className="flex-1 rounded-lg h-9 text-xs gradient-primary border-0 text-primary-foreground gap-1" onClick={submitEq}>
                    <Check size={12} />{eqEditingId ? "Cập nhật" : "Lưu & Thêm tiếp"}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!eqOpen && (
            <Button type="button" variant="outline" className="w-full rounded-xl h-10 text-xs font-bold border-dashed border-primary/40 text-primary hover:bg-primary/5 gap-1" onClick={() => { resetEqForm(); setEqOpen(true); }}>
              <Plus size={14} /> Thêm thiết bị
            </Button>
          )}
        </div>
      )}

      {/* Bio tab */}
      {tab === "bio" && (
        <div className="space-y-3">
          {bios.length === 0 && !bioOpen ? (
            <EmptyState
              icon={<FlaskConical size={20} className="text-eco-teal" />}
              title="Chưa có chế phẩm nào"
              description="Thêm các chế phẩm sinh học sử dụng tại nhà vệ sinh"
            />
          ) : (
            <div className="rounded-xl border border-border/50 overflow-hidden">
              <div className="grid grid-cols-12 gap-1 px-3 py-2 bg-muted/50 text-[10px] font-bold text-muted-foreground uppercase">
                <div className="col-span-4">Tên</div>
                <div className="col-span-2 text-center">SL</div>
                <div className="col-span-2 text-center">Đơn vị</div>
                <div className="col-span-2 text-center">Chu kỳ</div>
                <div className="col-span-2 text-right">Thao tác</div>
              </div>
              <AnimatePresence initial={false}>
                {bios.map((it) => (
                  <motion.div
                    key={it.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="grid grid-cols-12 gap-1 px-3 py-2.5 border-t border-border/40 items-center text-xs"
                  >
                    <div className="col-span-4 flex items-center gap-2 min-w-0">
                      {it.image ? (
                        <img src={it.image} alt={it.name} className="w-7 h-7 rounded-md object-cover border border-border/40 shrink-0" />
                      ) : (
                        <div className="w-7 h-7 rounded-md bg-muted/60 flex items-center justify-center shrink-0"><ImageIcon size={12} className="text-muted-foreground" /></div>
                      )}
                      <span className="font-semibold text-foreground truncate">{it.name}</span>
                    </div>
                    <div className="col-span-2 text-center font-mono">{it.quantity}</div>
                    <div className="col-span-2 text-center text-muted-foreground">{it.unit}</div>
                    <div className="col-span-2 text-center text-[10px] text-foreground truncate">{it.cycle}</div>
                    <div className="col-span-2 flex justify-end gap-0.5">
                      <button type="button" onClick={() => dupBio(it)} className="p-1 text-muted-foreground hover:text-primary rounded" title="Nhân bản"><Copy size={12} /></button>
                      <button type="button" onClick={() => editBio(it)} className="p-1 text-muted-foreground hover:text-primary rounded" title="Sửa"><Pencil size={12} /></button>
                      <button type="button" onClick={() => delBio(it.id)} className="p-1 text-muted-foreground hover:text-destructive rounded" title="Xóa"><Trash2 size={12} /></button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}

          <AnimatePresence>
            {bioOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="rounded-xl border border-eco-teal/30 bg-eco-teal/5 p-3 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-foreground">{bioEditingId ? "Sửa chế phẩm" : "Thêm chế phẩm"}</p>
                  <button type="button" onClick={() => { setBioOpen(false); resetBioForm(); }} className="text-muted-foreground hover:text-foreground"><X size={14} /></button>
                </div>
                <div>
                  <Label className="text-[11px] text-muted-foreground mb-1 block">Tên chế phẩm <span className="text-destructive">*</span></Label>
                  <Select value={bioForm.name} onValueChange={(v) => setBioForm((s) => ({ ...s, name: v }))}>
                    <SelectTrigger className="h-9 text-xs rounded-lg"><SelectValue placeholder="Chọn chế phẩm" /></SelectTrigger>
                    <SelectContent>{BIO_MASTER.map((n) => (<SelectItem key={n} value={n}>{n}</SelectItem>))}</SelectContent>
                  </Select>
                  {bioErrors.name && <p className="text-[10px] text-destructive mt-1">{bioErrors.name}</p>}
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Label className="text-[11px] text-muted-foreground mb-1 block">Số lượng <span className="text-destructive">*</span></Label>
                    <Input type="number" min={1} className="h-9 text-xs rounded-lg" value={bioForm.quantity} onChange={(e) => setBioForm((s) => ({ ...s, quantity: Number(e.target.value) }))} />
                    {bioErrors.quantity && <p className="text-[10px] text-destructive mt-1">{bioErrors.quantity}</p>}
                  </div>
                  <div>
                    <Label className="text-[11px] text-muted-foreground mb-1 block">Đơn vị</Label>
                    <Select value={bioForm.unit} onValueChange={(v) => setBioForm((s) => ({ ...s, unit: v }))}>
                      <SelectTrigger className="h-9 text-xs rounded-lg"><SelectValue /></SelectTrigger>
                      <SelectContent>{BIO_UNITS.map((u) => (<SelectItem key={u} value={u}>{u}</SelectItem>))}</SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-[11px] text-muted-foreground mb-1 block">Chu kỳ</Label>
                    <Select value={bioForm.cycle} onValueChange={(v) => setBioForm((s) => ({ ...s, cycle: v }))}>
                      <SelectTrigger className="h-9 text-xs rounded-lg"><SelectValue /></SelectTrigger>
                      <SelectContent>{BIO_CYCLES.map((c) => (<SelectItem key={c} value={c}>{c}</SelectItem>))}</SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="flex gap-2 pt-1">
                  <Button type="button" variant="outline" size="sm" className="flex-1 rounded-lg h-9 text-xs" onClick={() => { setBioOpen(false); resetBioForm(); }}>Hủy</Button>
                  <Button type="button" size="sm" className="flex-1 rounded-lg h-9 text-xs gradient-primary border-0 text-primary-foreground gap-1" onClick={submitBio}>
                    <Check size={12} />{bioEditingId ? "Cập nhật" : "Lưu & Thêm tiếp"}
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!bioOpen && (
            <Button type="button" variant="outline" className="w-full rounded-xl h-10 text-xs font-bold border-dashed border-eco-teal/40 text-eco-teal hover:bg-eco-teal/5 gap-1" onClick={() => { resetBioForm(); setBioOpen(true); }}>
              <Plus size={14} /> Thêm chế phẩm
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

const EmptyState = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="flex flex-col items-center justify-center py-6 px-4 rounded-xl border border-dashed border-border/60 bg-muted/20 text-center">
    <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center mb-2 shadow-sm">
      {icon}
    </div>
    <p className="text-xs font-bold text-foreground">{title}</p>
    <p className="text-[10px] text-muted-foreground mt-0.5 max-w-[220px]">{description}</p>
  </div>
);

export default EquipmentBioSection;
