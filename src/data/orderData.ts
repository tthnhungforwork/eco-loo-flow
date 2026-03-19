import { FileText, Sparkles, Wrench, HardHat, Hammer, Recycle } from "lucide-react";

// Order status flow based on function document
export type OrderStatus =
  | "cho_dieu_phoi"    // Chờ điều phối (after customer creates)
  | "cho_tiep_nhan"    // Chờ tiếp nhận (after dispatch to partner)
  | "da_tiep_nhan"     // Đã tiếp nhận (partner accepted)
  | "dang_khao_sat"    // Đang khảo sát
  | "da_bao_gia"       // Đã báo giá (chờ KH duyệt)
  | "da_duyet_bao_gia" // KH đã duyệt báo giá
  | "da_ky_hop_dong"   // Đã ký hợp đồng
  | "dang_thuc_hien"   // Đang thực hiện
  | "cho_nghiem_thu"   // Chờ nghiệm thu (BBNT sent)
  | "hoan_thanh"       // Hoàn thành (KH nghiệm thu OK)
  | "cho_thanh_ly"     // Chờ thanh lý HĐ
  | "da_thanh_ly"      // Đã thanh lý HĐ
  | "da_danh_gia"      // Đã đánh giá
  | "da_huy";          // Đã hủy

export type ServiceType = "tuvan" | "vsld" | "scbd" | "xaymoi" | "caitao" | "netzero";

export interface OrderTimeline {
  status: OrderStatus;
  label: string;
  date?: string;
  note?: string;
  actor?: string;
}

export interface StaffMember {
  id: number;
  name: string;
  role: string;
  phone: string;
  avatar?: string;
}

export interface SurveyToiletItem {
  toiletName: string;
  area: string;
  toiletType: string;
  usageFrequency: string;
  condition: string;
  equipmentCondition: string;
  notes: string;
}

export interface SurveyEquipment {
  id: string;
  name: string;
  quantity: number;
  condition: string;
  description: string;
}

export interface QuotationItem {
  id: string;
  category: "thiet_bi" | "che_pham" | "vat_tu" | "nhan_cong" | "khac";
  categoryLabel: string;
  name: string;
  unit: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface ContractInfo {
  contractNo: string;
  partyA: string;
  partyB: string;
  value: string;
  terms: string;
  duration: string;
  signedDate?: string;
}

export interface AcceptanceReport {
  completedItems: string[];
  notes: string;
  sentDate?: string;
}

export interface SettlementInfo {
  finalAmount: string;
  deductions: string;
  notes: string;
  signedDate?: string;
}
export type TaskStatus = "pending" | "in_progress" | "completed";

export interface OrderTask {
  id: string;
  title: string;
  toiletName?: string;
  assignee?: string;
  status: TaskStatus;
  scheduledDate?: string;
  completedDate?: string;
  notes?: string;
}

export interface OrderData {
  id: string;
  type: ServiceType;
  typeLabel: string;
  name: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  address: string;
  content: string;
  toilets: string[];
  partnerName?: string;
  partnerPhone?: string;
  amount?: string;
  createdAt: string;
  status: OrderStatus;
  timeline: OrderTimeline[];
  assignedStaff?: StaffMember[];
  // Survey
  surveyNote?: string;
  surveyItems?: SurveyToiletItem[];
  surveyEquipment?: SurveyEquipment[];
  surveyBioProducts?: string[];
  surveyCompleted?: boolean;
  // Quotation
  quotationItems?: QuotationItem[];
  quotationTotal?: number;
  quotationPaymentTerms?: string;
  quotationBankInfo?: string;
  quotationApproved?: boolean;
  quotationRejectedReason?: string;
  // Contract
  contract?: ContractInfo;
  // Design (for xaymoi/caitao)
  designFile?: string;
  designNote?: string;
  // Acceptance report
  acceptanceReport?: AcceptanceReport;
  // Settlement
  settlement?: SettlementInfo;
  // Tasks
  orderTasks?: OrderTask[];
  // Rating
  rating?: number;
  ratingContent?: string;
  // Legacy
  quoteFile?: string;
  contractFile?: string;
  netzeroLevel?: string;
}

export const ORDER_STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; badgeStatus: string }> = {
  cho_dieu_phoi: { label: "Chờ điều phối", color: "text-amber-600", badgeStatus: "new" },
  cho_tiep_nhan: { label: "Chờ tiếp nhận", color: "text-secondary", badgeStatus: "new" },
  da_tiep_nhan: { label: "Đã tiếp nhận", color: "text-blue-600", badgeStatus: "processing" },
  dang_khao_sat: { label: "Đang khảo sát", color: "text-blue-600", badgeStatus: "processing" },
  da_bao_gia: { label: "Chờ duyệt báo giá", color: "text-amber-600", badgeStatus: "processing" },
  da_duyet_bao_gia: { label: "Đã duyệt báo giá", color: "text-blue-600", badgeStatus: "processing" },
  da_ky_hop_dong: { label: "Đã ký hợp đồng", color: "text-primary", badgeStatus: "processing" },
  dang_thuc_hien: { label: "Đang thực hiện", color: "text-primary", badgeStatus: "processing" },
  cho_nghiem_thu: { label: "Chờ nghiệm thu", color: "text-amber-600", badgeStatus: "processing" },
  hoan_thanh: { label: "Đã nghiệm thu", color: "text-primary", badgeStatus: "done" },
  cho_thanh_ly: { label: "Chờ thanh lý HĐ", color: "text-amber-600", badgeStatus: "processing" },
  da_thanh_ly: { label: "Đã thanh lý HĐ", color: "text-primary", badgeStatus: "done" },
  da_danh_gia: { label: "Đã đánh giá", color: "text-primary", badgeStatus: "done" },
  da_huy: { label: "Đã hủy", color: "text-destructive", badgeStatus: "cancelled" },
};

export const SERVICE_STEPS: Record<ServiceType, OrderStatus[]> = {
  tuvan: ["cho_dieu_phoi", "cho_tiep_nhan", "da_tiep_nhan", "dang_thuc_hien", "hoan_thanh", "da_danh_gia"],
  vsld: ["cho_dieu_phoi", "cho_tiep_nhan", "da_tiep_nhan", "dang_khao_sat", "da_bao_gia", "da_duyet_bao_gia", "da_ky_hop_dong", "dang_thuc_hien", "cho_nghiem_thu", "hoan_thanh", "cho_thanh_ly", "da_thanh_ly", "da_danh_gia"],
  scbd: ["cho_dieu_phoi", "cho_tiep_nhan", "da_tiep_nhan", "dang_khao_sat", "da_bao_gia", "da_duyet_bao_gia", "da_ky_hop_dong", "dang_thuc_hien", "cho_nghiem_thu", "hoan_thanh", "cho_thanh_ly", "da_thanh_ly", "da_danh_gia"],
  xaymoi: ["cho_dieu_phoi", "cho_tiep_nhan", "da_tiep_nhan", "da_bao_gia", "da_duyet_bao_gia", "da_ky_hop_dong", "dang_thuc_hien", "cho_nghiem_thu", "hoan_thanh", "cho_thanh_ly", "da_thanh_ly", "da_danh_gia"],
  caitao: ["cho_dieu_phoi", "cho_tiep_nhan", "da_tiep_nhan", "dang_khao_sat", "da_bao_gia", "da_duyet_bao_gia", "da_ky_hop_dong", "dang_thuc_hien", "cho_nghiem_thu", "hoan_thanh", "cho_thanh_ly", "da_thanh_ly", "da_danh_gia"],
  netzero: ["cho_dieu_phoi", "cho_tiep_nhan", "da_tiep_nhan", "dang_khao_sat", "dang_thuc_hien", "cho_nghiem_thu", "hoan_thanh", "da_danh_gia"],
};

export const QUOTATION_CATEGORIES = [
  { key: "thiet_bi", label: "Thiết bị" },
  { key: "che_pham", label: "Chế phẩm sinh học" },
  { key: "vat_tu", label: "Vật tư" },
  { key: "nhan_cong", label: "Nhân công" },
  { key: "khac", label: "Hệ thống phụ trợ" },
] as const;

export const SERVICE_TYPE_CONFIG: Record<ServiceType, { label: string; icon: any; gradient: string }> = {
  tuvan: { label: "Tư vấn", icon: FileText, gradient: "gradient-blue" },
  vsld: { label: "Vệ sinh lau dọn", icon: Sparkles, gradient: "gradient-primary" },
  scbd: { label: "Sửa chữa bảo dưỡng", icon: Wrench, gradient: "gradient-warm" },
  xaymoi: { label: "Xây mới", icon: HardHat, gradient: "gradient-primary" },
  caitao: { label: "Cải tạo", icon: Hammer, gradient: "gradient-blue" },
  netzero: { label: "Netzero", icon: Recycle, gradient: "gradient-warm" },
};

// Mock data
export const MOCK_PARTNER_STAFF: StaffMember[] = [
  { id: 1, name: "Trần Văn Minh", role: "VSLD", phone: "0912345678" },
  { id: 2, name: "Lê Thị Hương", role: "VSLD", phone: "0923456789" },
  { id: 3, name: "Nguyễn Hoàng Nam", role: "SCBD", phone: "0934567890" },
  { id: 4, name: "Phạm Thị Lan", role: "VSLD", phone: "0945678901" },
  { id: 5, name: "Võ Minh Tuấn", role: "Xây dựng", phone: "0956789012" },
  { id: 6, name: "Đặng Văn Hùng", role: "Cải tạo", phone: "0967890123" },
];

export const MOCK_CUSTOMER_ORDERS: OrderData[] = [
  {
    id: "DH-001",
    type: "vsld",
    typeLabel: "Vệ sinh lau dọn",
    name: "Gói vệ sinh tháng 3",
    customerName: "Nguyễn Văn Khách",
    customerPhone: "0901234567",
    customerEmail: "khach@email.com",
    address: "123 Nguyễn Huệ, Q.1, TP.HCM",
    content: "Vệ sinh lau dọn định kỳ cho 3 NVS tầng 1-3",
    toilets: ["NVS Tầng 1 - Tòa A", "NVS Tầng 2 - Tòa A", "NVS Tầng 3 - Tòa A"],
    partnerName: "Eco Clean Co.",
    partnerPhone: "0281234567",
    amount: "2.500.000đ",
    createdAt: "10/03/2026",
    status: "dang_thuc_hien",
    timeline: [
      { status: "cho_dieu_phoi", label: "Đơn hàng được tạo", date: "10/03/2026 08:30", actor: "Nguyễn Văn Khách" },
      { status: "cho_tiep_nhan", label: "Điều phối đến Eco Clean Co.", date: "10/03/2026 09:15", actor: "Hệ thống" },
      { status: "da_tiep_nhan", label: "Đối tác đã tiếp nhận", date: "10/03/2026 10:00", actor: "Eco Clean Co." },
      { status: "dang_khao_sat", label: "Bắt đầu khảo sát NVS", date: "11/03/2026 08:00", actor: "Trần Văn Minh" },
      { status: "da_bao_gia", label: "Đã gửi báo giá: 2.500.000đ", date: "11/03/2026 16:00", actor: "Eco Clean Co." },
      { status: "da_duyet_bao_gia", label: "KH duyệt báo giá", date: "12/03/2026 08:00", actor: "Nguyễn Văn Khách" },
      { status: "da_ky_hop_dong", label: "Hợp đồng đã được ký", date: "12/03/2026 09:00", actor: "Eco Clean Co." },
      { status: "dang_thuc_hien", label: "Đang thực hiện dịch vụ", date: "13/03/2026 07:30", actor: "Trần Văn Minh, Lê Thị Hương" },
    ],
    assignedStaff: [MOCK_PARTNER_STAFF[0], MOCK_PARTNER_STAFF[1]],
  },
  {
    id: "DH-002",
    type: "tuvan",
    typeLabel: "Tư vấn",
    name: "Tư vấn số hóa NVS",
    customerName: "Nguyễn Văn Khách",
    customerPhone: "0901234567",
    customerEmail: "khach@email.com",
    address: "123 Nguyễn Huệ, Q.1, TP.HCM",
    content: "Tư vấn giải pháp số hóa quản lý nhà vệ sinh cho tòa nhà văn phòng",
    toilets: [],
    createdAt: "14/03/2026",
    status: "cho_dieu_phoi",
    timeline: [
      { status: "cho_dieu_phoi", label: "Đơn hàng được tạo", date: "14/03/2026 10:00", actor: "Nguyễn Văn Khách" },
    ],
  },
  {
    id: "DH-003",
    type: "scbd",
    typeLabel: "Sửa chữa bảo dưỡng",
    name: "Bảo trì thiết bị Q1",
    customerName: "Nguyễn Văn Khách",
    customerPhone: "0901234567",
    customerEmail: "khach@email.com",
    address: "456 Lê Lợi, Q.3, TP.HCM",
    content: "Bảo trì hệ thống nước và thiết bị vệ sinh tầng 1-5",
    toilets: ["NVS Sảnh B - KTX"],
    partnerName: "Green Tech",
    amount: "5.000.000đ",
    createdAt: "01/03/2026",
    status: "hoan_thanh",
    timeline: [
      { status: "cho_dieu_phoi", label: "Đơn hàng được tạo", date: "01/03/2026 08:00", actor: "Nguyễn Văn Khách" },
      { status: "cho_tiep_nhan", label: "Điều phối đến Green Tech", date: "01/03/2026 09:00", actor: "Hệ thống" },
      { status: "da_tiep_nhan", label: "Đối tác đã tiếp nhận", date: "01/03/2026 10:30", actor: "Green Tech" },
      { status: "dang_khao_sat", label: "Khảo sát NVS", date: "02/03/2026 08:00", actor: "Nguyễn Hoàng Nam" },
      { status: "da_bao_gia", label: "Báo giá: 5.000.000đ", date: "02/03/2026 17:00", actor: "Green Tech" },
      { status: "da_duyet_bao_gia", label: "KH duyệt báo giá", date: "03/03/2026 08:00", actor: "Nguyễn Văn Khách" },
      { status: "da_ky_hop_dong", label: "Ký hợp đồng", date: "03/03/2026 09:00", actor: "Green Tech" },
      { status: "dang_thuc_hien", label: "Thực hiện sửa chữa", date: "04/03/2026 07:00", actor: "Nguyễn Hoàng Nam" },
      { status: "cho_nghiem_thu", label: "Chờ nghiệm thu", date: "08/03/2026 16:00", actor: "Green Tech" },
      { status: "hoan_thanh", label: "Hoàn thành", date: "10/03/2026 10:00", actor: "Nguyễn Văn Khách" },
    ],
  },
  {
    id: "DH-004",
    type: "vsld",
    typeLabel: "Vệ sinh lau dọn",
    name: "VSLD Block A tháng 2",
    customerName: "Nguyễn Văn Khách",
    customerPhone: "0901234567",
    customerEmail: "khach@email.com",
    address: "789 Trần Hưng Đạo, Q.5",
    content: "Dịch vụ vệ sinh Block A",
    toilets: ["NVS Tầng 1 - Tòa C"],
    partnerName: "Eco Clean Co.",
    amount: "3.200.000đ",
    createdAt: "01/02/2026",
    status: "da_huy",
    timeline: [
      { status: "cho_dieu_phoi", label: "Đơn hàng được tạo", date: "01/02/2026 08:00", actor: "Nguyễn Văn Khách" },
      { status: "da_huy", label: "Khách hàng hủy đơn", date: "02/02/2026 10:00", actor: "Nguyễn Văn Khách" },
    ],
  },
];

// Partner sees same orders but from their perspective
export const MOCK_PARTNER_ORDERS: OrderData[] = [
  {
    ...MOCK_CUSTOMER_ORDERS[0],
    id: "PDH-001",
  },
  {
    id: "PDH-002",
    type: "scbd",
    typeLabel: "Sửa chữa bảo dưỡng",
    name: "Bảo trì hệ thống Q1",
    customerName: "KTX Đại học X",
    customerPhone: "0289876543",
    customerEmail: "ktx@email.com",
    address: "456 Lê Lợi, Q.3, TP.HCM",
    content: "Bảo trì toàn bộ hệ thống nước và thiết bị vệ sinh",
    toilets: ["NVS Tầng 1 - KTX", "NVS Tầng 2 - KTX"],
    partnerName: "Eco Clean Co.",
    amount: "8.500.000đ",
    createdAt: "14/03/2026",
    status: "da_tiep_nhan",
    timeline: [
      { status: "cho_dieu_phoi", label: "Đơn hàng được tạo", date: "14/03/2026 08:00", actor: "KTX Đại học X" },
      { status: "cho_tiep_nhan", label: "Điều phối đến Eco Clean Co.", date: "14/03/2026 09:00", actor: "Hệ thống" },
      { status: "da_tiep_nhan", label: "Đã tiếp nhận", date: "14/03/2026 11:00", actor: "Eco Clean Co." },
    ],
    assignedStaff: [],
  },
];

// Mock tasks for completed orders
export const MOCK_ORDER_TASKS_DH003: OrderTask[] = [
  {
    id: "T-001",
    title: "Kiểm tra hệ thống xả nước tầng 1",
    toiletName: "NVS Sảnh B - KTX",
    assignee: "Nguyễn Hoàng Nam",
    status: "completed",
    scheduledDate: "04/03/2026",
    completedDate: "04/03/2026",
    notes: "Đã thay van xả nước bị hỏng, hệ thống hoạt động bình thường",
  },
  {
    id: "T-002",
    title: "Thay thế bộ phận vòi nước lavabo",
    toiletName: "NVS Sảnh B - KTX",
    assignee: "Nguyễn Hoàng Nam",
    status: "completed",
    scheduledDate: "05/03/2026",
    completedDate: "05/03/2026",
    notes: "Thay 3 vòi nước lavabo, kiểm tra áp suất nước OK",
  },
  {
    id: "T-003",
    title: "Sửa chữa bồn cầu bị rò rỉ",
    toiletName: "NVS Sảnh B - KTX",
    assignee: "Nguyễn Hoàng Nam",
    status: "completed",
    scheduledDate: "06/03/2026",
    completedDate: "06/03/2026",
    notes: "Thay gioăng cao su, bồn cầu không còn rò rỉ",
  },
  {
    id: "T-004",
    title: "Bảo trì hệ thống thoát nước sàn",
    toiletName: "NVS Sảnh B - KTX",
    assignee: "Nguyễn Hoàng Nam",
    status: "completed",
    scheduledDate: "07/03/2026",
    completedDate: "07/03/2026",
    notes: "Thông tắc và vệ sinh đường ống thoát nước sàn",
  },
  {
    id: "T-005",
    title: "Kiểm tra và vệ sinh tổng thể",
    toiletName: "NVS Sảnh B - KTX",
    assignee: "Nguyễn Hoàng Nam",
    status: "completed",
    scheduledDate: "08/03/2026",
    completedDate: "08/03/2026",
    notes: "Kiểm tra tổng thể sau sửa chữa, tất cả thiết bị hoạt động tốt",
  },
];

// Partner directory for admin dispatch
export interface PartnerInfo {
  id: string;
  name: string;
  type: "individual" | "business";
  services: ServiceType[];
  phone: string;
  email: string;
  address: string;
  rating: number;
  completedOrders: number;
  status: "active" | "pending" | "rejected" | "suspended";
  registeredAt: string;
  taxCode?: string;
  staffCount?: number;
}

export const MOCK_PARTNERS: PartnerInfo[] = [
  { id: "DT-001", name: "Eco Clean Co.", type: "business", services: ["vsld", "scbd", "caitao"], phone: "0281234567", email: "info@ecoclean.vn", address: "100 Nguyễn Thị Minh Khai, Q.3", rating: 4.8, completedOrders: 156, status: "active", registeredAt: "15/01/2025", taxCode: "0123456789", staffCount: 25 },
  { id: "DT-002", name: "Green Tech Solutions", type: "business", services: ["scbd", "xaymoi", "caitao"], phone: "0287654321", email: "contact@greentech.vn", address: "200 Lê Văn Sỹ, Q.Tân Bình", rating: 4.6, completedOrders: 89, status: "active", registeredAt: "20/03/2025", taxCode: "9876543210", staffCount: 18 },
  { id: "DT-003", name: "Nguyễn Văn Tùng", type: "individual", services: ["vsld"], phone: "0934567890", email: "tung@email.com", address: "50 Trần Quốc Thảo, Q.3", rating: 4.5, completedOrders: 34, status: "active", registeredAt: "01/06/2025" },
  { id: "DT-004", name: "Smart Toilet JSC", type: "business", services: ["tuvan", "netzero", "vsld", "scbd", "xaymoi"], phone: "0289998877", email: "info@smarttoilet.vn", address: "300 Điện Biên Phủ, Q.Bình Thạnh", rating: 4.9, completedOrders: 210, status: "active", registeredAt: "10/11/2024", taxCode: "1122334455", staffCount: 42 },
  { id: "DT-005", name: "Phạm Minh Tuấn", type: "individual", services: ["scbd"], phone: "0945678901", email: "tuan.pham@email.com", address: "15 Nguyễn Đình Chiểu, Q.1", rating: 0, completedOrders: 0, status: "pending", registeredAt: "14/03/2026" },
];

// Admin sees ALL orders across the system
export const MOCK_ADMIN_ORDERS: OrderData[] = [
  ...MOCK_CUSTOMER_ORDERS,
  {
    id: "DH-005",
    type: "vsld",
    typeLabel: "Vệ sinh lau dọn",
    name: "Vệ sinh NVS KTX Block A",
    customerName: "KTX Đại học X",
    customerPhone: "0289876543",
    customerEmail: "ktx@email.com",
    address: "456 Lê Lợi, Q.3, TP.HCM",
    content: "Vệ sinh lau dọn định kỳ tất cả NVS trong KTX",
    toilets: ["NVS Tầng 1 - KTX", "NVS Tầng 2 - KTX", "NVS Tầng 3 - KTX"],
    createdAt: "16/03/2026",
    status: "cho_dieu_phoi",
    timeline: [
      { status: "cho_dieu_phoi", label: "Đơn hàng được tạo", date: "16/03/2026 08:00", actor: "KTX Đại học X" },
    ],
  },
  {
    id: "DH-006",
    type: "scbd",
    typeLabel: "Sửa chữa bảo dưỡng",
    name: "Bảo trì thiết bị Tầng 3",
    customerName: "Công ty ABC",
    customerPhone: "0281112233",
    customerEmail: "abc@company.vn",
    address: "789 Điện Biên Phủ, Q.Bình Thạnh",
    content: "Sửa chữa hệ thống xả nước tầng 3, thay thế van nước bị hỏng",
    toilets: ["NVS Tầng 3 - ABC Tower"],
    createdAt: "15/03/2026",
    status: "cho_dieu_phoi",
    timeline: [
      { status: "cho_dieu_phoi", label: "Đơn hàng được tạo", date: "15/03/2026 14:00", actor: "Công ty ABC" },
    ],
  },
];
