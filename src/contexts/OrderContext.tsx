import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import {
  type OrderData, type OrderStatus, type StaffMember,
  type QuotationItem, type ContractInfo, type AcceptanceReport, type SettlementInfo,
  type SurveyToiletItem, type SurveyEquipment,
  MOCK_CUSTOMER_ORDERS, MOCK_PARTNER_ORDERS, MOCK_ADMIN_ORDERS,
  MOCK_PARTNER_STAFF, SERVICE_STEPS
} from "@/data/orderData";

// Test order IDs for each service type
export const TEST_ORDERS = {
  VSLD: { customer: "DH-TEST-VSLD", partner: "PDH-TEST-VSLD" },
  SCBD: { customer: "DH-TEST-SCBD", partner: "PDH-TEST-SCBD" },
  XM: { customer: "DH-TEST-XM", partner: "PDH-TEST-XM" },
  CT: { customer: "DH-TEST-CT", partner: "PDH-TEST-CT" },
};

// Keep backward compat
export const TEST_ORDER_ID = "DH-TEST-VSLD";
export const TEST_ORDER_PARTNER_ID = "PDH-TEST-VSLD";

const createTestOrder = (
  id: string,
  type: "vsld" | "scbd" | "xaymoi" | "caitao",
  typeLabel: string,
  name: string,
  toilets: string[],
  content: string,
): OrderData => ({
  id,
  type,
  typeLabel,
  name,
  customerName: "Nguyễn Văn Khách",
  customerPhone: "0901234567",
  customerEmail: "khach@email.com",
  address: "100 Nguyễn Thị Minh Khai, Q.3, TP.HCM",
  content,
  toilets,
  createdAt: "18/03/2026",
  status: "cho_dieu_phoi",
  timeline: [
    { status: "cho_dieu_phoi" as OrderStatus, label: "Đơn hàng được tạo", date: "18/03/2026 09:00", actor: "Nguyễn Văn Khách" },
  ],
});

const TEST_ORDER_DEFS: OrderData[] = [
  createTestOrder(
    TEST_ORDERS.VSLD.customer, "vsld", "Vệ sinh lau dọn",
    "VSLD Tòa nhà Sunrise - Tháng 3",
    ["NVS Tầng 1 - Sunrise", "NVS Tầng 2 - Sunrise", "NVS Tầng 3 - Sunrise"],
    "Vệ sinh lau dọn định kỳ 2 lần/tuần cho 3 NVS tầng 1-3 tòa nhà Sunrise. Yêu cầu sử dụng chế phẩm sinh học."
  ),
  createTestOrder(
    TEST_ORDERS.SCBD.customer, "scbd", "Sửa chữa bảo dưỡng",
    "SCBD Hệ thống nước Tòa B",
    ["NVS Tầng 1 - Tòa B", "NVS Tầng 2 - Tòa B"],
    "Sửa chữa hệ thống ống nước, thay van xả, bảo dưỡng bồn cầu và lavabo tầng 1-2 Tòa B."
  ),
  createTestOrder(
    TEST_ORDERS.XM.customer, "xaymoi", "Xây mới",
    "Xây mới NVS Khu C - Nhà máy",
    [],
    "Xây dựng mới 2 nhà vệ sinh công cộng khu C nhà máy, tiêu chuẩn công nghiệp, phục vụ 200 công nhân."
  ),
  createTestOrder(
    TEST_ORDERS.CT.customer, "caitao", "Cải tạo",
    "Cải tạo NVS Tầng 5 - VP Sunrise",
    ["NVS Tầng 5 - VP Sunrise"],
    "Cải tạo toàn bộ NVS tầng 5 văn phòng Sunrise, thay mới thiết bị và ốp lát."
  ),
];

interface OrderContextType {
  getOrder: (id: string) => OrderData | undefined;
  getCustomerOrders: () => OrderData[];
  getPartnerOrders: () => OrderData[];
  getAdminOrders: () => OrderData[];
  advanceOrder: (id: string, newStatus: OrderStatus, timelineLabel: string, actor: string, extra?: Partial<OrderData>) => void;
  dispatchToPartner: (id: string, partnerName: string, partnerPhone?: string, note?: string) => void;
  assignStaff: (id: string, staff: StaffMember[]) => void;
  updateOrder: (id: string, updates: Partial<OrderData>) => void;
}

const OrderContext = createContext<OrderContextType | null>(null);

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
};

// Get partner ID from customer ID and vice versa
const getCounterpartId = (id: string): string | null => {
  for (const key of Object.values(TEST_ORDERS)) {
    if (id === key.customer) return key.partner;
    if (id === key.partner) return key.customer;
  }
  return null;
};

const isTestOrderId = (id: string): boolean => {
  return Object.values(TEST_ORDERS).some(k => k.customer === id || k.partner === id);
};

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orders, setOrders] = useState<Record<string, OrderData>>(() => {
    const map: Record<string, OrderData> = {};
    MOCK_CUSTOMER_ORDERS.forEach(o => { map[o.id] = { ...o }; });
    MOCK_PARTNER_ORDERS.forEach(o => { map[o.id] = { ...o }; });
    MOCK_ADMIN_ORDERS.forEach(o => { map[o.id] = { ...o }; });
    // Add test orders (customer + partner views)
    TEST_ORDER_DEFS.forEach(o => {
      map[o.id] = { ...o };
      const testKey = Object.values(TEST_ORDERS).find(k => k.customer === o.id);
      if (testKey) {
        map[testKey.partner] = { ...o, id: testKey.partner };
      }
    });
    return map;
  });

  const getOrder = useCallback((id: string) => orders[id], [orders]);

  const getCustomerOrders = useCallback(() => {
    const customerIds = [...MOCK_CUSTOMER_ORDERS.map(o => o.id), ...Object.values(TEST_ORDERS).map(k => k.customer)];
    return customerIds.map(id => orders[id]).filter(Boolean) as OrderData[];
  }, [orders]);

  const getPartnerOrders = useCallback(() => {
    const partnerOrders = MOCK_PARTNER_ORDERS.map(o => orders[o.id] || o);
    // Partner sees test orders only after dispatch
    Object.values(TEST_ORDERS).forEach(k => {
      const testOrder = orders[k.partner];
      if (testOrder && testOrder.status !== "cho_dieu_phoi") {
        partnerOrders.push(testOrder);
      }
    });
    return partnerOrders;
  }, [orders]);

  const getAdminOrders = useCallback(() => {
    const adminIds = [...MOCK_ADMIN_ORDERS.map(o => o.id), ...Object.values(TEST_ORDERS).map(k => k.customer)];
    return adminIds.map(id => orders[id]).filter(Boolean) as OrderData[];
  }, [orders]);

  const syncCounterpart = (result: Record<string, OrderData>, id: string, updated: OrderData) => {
    const counterpartId = getCounterpartId(id);
    if (counterpartId && result[counterpartId]) {
      result[counterpartId] = { ...updated, id: counterpartId };
    }
  };

  const advanceOrder = useCallback((id: string, newStatus: OrderStatus, timelineLabel: string, actor: string, extra?: Partial<OrderData>) => {
    setOrders(prev => {
      const order = prev[id];
      if (!order) return prev;
      const now = new Date();
      const dateStr = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
      const updated: OrderData = {
        ...order,
        ...extra,
        status: newStatus,
        timeline: [...order.timeline, { status: newStatus, label: timelineLabel, date: dateStr, actor }],
      };
      const result = { ...prev, [id]: updated };
      syncCounterpart(result, id, updated);
      return result;
    });
  }, []);

  const dispatchToPartner = useCallback((id: string, partnerName: string, partnerPhone?: string, note?: string) => {
    advanceOrder(id, "cho_tiep_nhan", `Điều phối đến ${partnerName}${note ? ` - ${note}` : ''}`, "Admin (KTX)", {
      partnerName,
      partnerPhone,
    });
  }, [advanceOrder]);

  const assignStaff = useCallback((id: string, staff: StaffMember[]) => {
    setOrders(prev => {
      const order = prev[id];
      if (!order) return prev;
      const updated = { ...order, assignedStaff: [...(order.assignedStaff || []), ...staff] };
      const result = { ...prev, [id]: updated };
      syncCounterpart(result, id, updated);
      return result;
    });
  }, []);

  const updateOrder = useCallback((id: string, updates: Partial<OrderData>) => {
    setOrders(prev => {
      const order = prev[id];
      if (!order) return prev;
      const updated = { ...order, ...updates };
      const result = { ...prev, [id]: updated };
      syncCounterpart(result, id, updated);
      return result;
    });
  }, []);

  return (
    <OrderContext.Provider value={{ getOrder, getCustomerOrders, getPartnerOrders, getAdminOrders, advanceOrder, dispatchToPartner, assignStaff, updateOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
