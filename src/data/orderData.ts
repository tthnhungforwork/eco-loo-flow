import { FileText, Sparkles, Wrench, HardHat, Hammer, Recycle } from "lucide-react";

// Order status flow based on function document
export type OrderStatus =
  | "cho_dieu_phoi"    // Chờ điều phối (after customer creates)
  | "cho_tiep_nhan"    // Chờ tiếp nhận (after dispatch to partner)
  | "da_tiep_nhan"     // Đã tiếp nhận (partner accepted)
  | "dang_khao_sat"    // Đang khảo sát
  | "da_bao_gia"       // Đã báo giá
  | "da_ky_hop_dong"   // Đã ký hợp đồng
  | "dang_thuc_hien"   // Đang thực hiện
  | "cho_nghiem_thu"   // Chờ nghiệm thu
  | "hoan_thanh"       // Hoàn thành
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
  surveyNote?: string;
  quoteFile?: string;
  contractFile?: string;
  netzeroLevel?: string;
  rating?: number;
  ratingContent?: string;
}

export const ORDER_STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; badgeStatus: string }> = {
  cho_dieu_phoi: { label: "Chờ điều phối", color: "text-amber-600", badgeStatus: "new" },
  cho_tiep_nhan: { label: "Chờ tiếp nhận", color: "text-secondary", badgeStatus: "new" },
  da_tiep_nhan: { label: "Đã tiếp nhận", color: "text-blue-600", badgeStatus: "processing" },
  dang_khao_sat: { label: "Đang khảo sát", color: "text-blue-600", badgeStatus: "processing" },
  da_bao_gia: { label: "Đã báo giá", color: "text-blue-600", badgeStatus: "processing" },
  da_ky_hop_dong: { label: "Đã ký hợp đồng", color: "text-primary", badgeStatus: "processing" },
  dang_thuc_hien: { label: "Đang thực hiện", color: "text-primary", badgeStatus: "processing" },
  cho_nghiem_thu: { label: "Chờ nghiệm thu", color: "text-amber-600", badgeStatus: "processing" },
  hoan_thanh: { label: "Hoàn thành", color: "text-primary", badgeStatus: "done" },
  da_danh_gia: { label: "Đã đánh giá", color: "text-primary", badgeStatus: "done" },
  da_huy: { label: "Đã hủy", color: "text-destructive", badgeStatus: "cancelled" },
};

// Steps that apply per service type
export const SERVICE_STEPS: Record<ServiceType, OrderStatus[]> = {
  tuvan: ["cho_dieu_phoi", "cho_tiep_nhan", "da_tiep_nhan", "dang_thuc_hien", "hoan_thanh", "da_danh_gia"],
  vsld: ["cho_dieu_phoi", "cho_tiep_nhan", "da_tiep_nhan", "dang_khao_sat", "da_bao_gia", "da_ky_hop_dong", "dang_thuc_hien", "cho_nghiem_thu", "hoan_thanh", "da_danh_gia"],
  scbd: ["cho_dieu_phoi", "cho_tiep_nhan", "da_tiep_nhan", "dang_khao_sat", "da_bao_gia", "da_ky_hop_dong", "dang_thuc_hien", "cho_nghiem_thu", "hoan_thanh", "da_danh_gia"],
  xaymoi: ["cho_dieu_phoi", "cho_tiep_nhan", "da_tiep_nhan", "da_bao_gia", "da_ky_hop_dong", "dang_thuc_hien", "cho_nghiem_thu", "hoan_thanh", "da_danh_gia"],
  caitao: ["cho_dieu_phoi", "cho_tiep_nhan", "da_tiep_nhan", "da_bao_gia", "da_ky_hop_dong", "dang_thuc_hien", "cho_nghiem_thu", "hoan_thanh", "da_danh_gia"],
  netzero: ["cho_dieu_phoi", "cho_tiep_nhan", "da_tiep_nhan", "dang_khao_sat", "dang_thuc_hien", "cho_nghiem_thu", "hoan_thanh", "da_danh_gia"],
};

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
  {
    id: "PDH-003",
    type: "tuvan",
    typeLabel: "Tư vấn",
    name: "Tư vấn số hóa NVS",
    customerName: "Trường THPT Y",
    customerPhone: "0287654321",
    customerEmail: "thpt@email.com",
    address: "789 Nguyễn Trãi, Q.5",
    content: "Tư vấn giải pháp số hóa NVS cho trường học",
    toilets: [],
    createdAt: "12/03/2026",
    status: "cho_tiep_nhan",
    timeline: [
      { status: "cho_dieu_phoi", label: "Đơn hàng được tạo", date: "12/03/2026 08:00", actor: "Trường THPT Y" },
      { status: "cho_tiep_nhan", label: "Điều phối đến Eco Clean Co.", date: "12/03/2026 10:00", actor: "KTX" },
    ],
  },
  {
    id: "PDH-004",
    type: "scbd",
    typeLabel: "Sửa chữa bảo dưỡng",
    name: "Lắp đặt thiết bị mới",
    customerName: "Công ty Green",
    customerPhone: "0281112233",
    customerEmail: "green@email.com",
    address: "321 Võ Văn Tần, Q.3",
    content: "Lắp đặt hệ thống thiết bị vệ sinh mới cho tòa nhà",
    toilets: ["NVS Tầng 1 - Green Tower"],
    partnerName: "Eco Clean Co.",
    amount: "15.000.000đ",
    createdAt: "01/03/2026",
    status: "hoan_thanh",
    timeline: [
      { status: "cho_dieu_phoi", label: "Đơn hàng được tạo", date: "01/03/2026 08:00", actor: "Công ty Green" },
      { status: "cho_tiep_nhan", label: "Điều phối", date: "01/03/2026 09:00", actor: "Hệ thống" },
      { status: "da_tiep_nhan", label: "Tiếp nhận", date: "01/03/2026 10:00", actor: "Eco Clean Co." },
      { status: "dang_khao_sat", label: "Khảo sát", date: "02/03/2026 08:00", actor: "Nguyễn Hoàng Nam" },
      { status: "da_bao_gia", label: "Báo giá: 15.000.000đ", date: "03/03/2026 10:00", actor: "Eco Clean Co." },
      { status: "da_ky_hop_dong", label: "Ký hợp đồng", date: "04/03/2026 09:00", actor: "Eco Clean Co." },
      { status: "dang_thuc_hien", label: "Thực hiện", date: "05/03/2026 07:00", actor: "Nguyễn Hoàng Nam" },
      { status: "cho_nghiem_thu", label: "Chờ nghiệm thu", date: "08/03/2026 16:00", actor: "Eco Clean Co." },
      { status: "hoan_thanh", label: "Hoàn thành", date: "10/03/2026 10:00", actor: "Công ty Green" },
    ],
    assignedStaff: [MOCK_PARTNER_STAFF[2]],
  },
];
