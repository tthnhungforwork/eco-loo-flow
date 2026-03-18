import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import {
  type OrderData, type OrderStatus, type StaffMember,
  MOCK_CUSTOMER_ORDERS, MOCK_PARTNER_ORDERS, MOCK_ADMIN_ORDERS,
  MOCK_PARTNER_STAFF, SERVICE_STEPS
} from "@/data/orderData";

// The test order ID shared across all roles
export const TEST_ORDER_ID = "DH-TEST";
export const TEST_ORDER_PARTNER_ID = "PDH-TEST";

const TEST_ORDER_BASE: OrderData = {
  id: TEST_ORDER_ID,
  type: "vsld",
  typeLabel: "Vệ sinh lau dọn",
  name: "VSLD Tòa nhà Sunrise - Tháng 3",
  customerName: "Nguyễn Văn Khách",
  customerPhone: "0901234567",
  customerEmail: "khach@email.com",
  address: "100 Nguyễn Thị Minh Khai, Q.3, TP.HCM",
  content: "Vệ sinh lau dọn định kỳ 2 lần/tuần cho 3 NVS tầng 1-3 tòa nhà Sunrise. Yêu cầu sử dụng chế phẩm sinh học.",
  toilets: ["NVS Tầng 1 - Sunrise", "NVS Tầng 2 - Sunrise", "NVS Tầng 3 - Sunrise"],
  createdAt: "18/03/2026",
  status: "cho_dieu_phoi",
  timeline: [
    { status: "cho_dieu_phoi", label: "Đơn hàng được tạo", date: "18/03/2026 09:00", actor: "Nguyễn Văn Khách" },
  ],
};

interface OrderContextType {
  /** Get an order by ID (searches all roles) */
  getOrder: (id: string) => OrderData | undefined;
  /** Get all orders for a specific role view */
  getCustomerOrders: () => OrderData[];
  getPartnerOrders: () => OrderData[];
  getAdminOrders: () => OrderData[];
  /** Transition order to next status with timeline entry */
  advanceOrder: (id: string, newStatus: OrderStatus, timelineLabel: string, actor: string, extra?: Partial<OrderData>) => void;
  /** Assign partner to order */
  dispatchToPartner: (id: string, partnerName: string, partnerPhone?: string, note?: string) => void;
  /** Assign staff to order */
  assignStaff: (id: string, staff: StaffMember[]) => void;
  /** Update order fields */
  updateOrder: (id: string, updates: Partial<OrderData>) => void;
}

const OrderContext = createContext<OrderContextType | null>(null);

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrders must be used within OrderProvider");
  return ctx;
};

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  // Master order store - all orders indexed by ID
  const [orders, setOrders] = useState<Record<string, OrderData>>(() => {
    const map: Record<string, OrderData> = {};
    // Seed from mock data
    MOCK_CUSTOMER_ORDERS.forEach(o => { map[o.id] = { ...o }; });
    MOCK_PARTNER_ORDERS.forEach(o => { map[o.id] = { ...o }; });
    MOCK_ADMIN_ORDERS.forEach(o => { map[o.id] = { ...o }; });
    // Add test order
    map[TEST_ORDER_ID] = { ...TEST_ORDER_BASE };
    // Partner view of test order
    map[TEST_ORDER_PARTNER_ID] = { ...TEST_ORDER_BASE, id: TEST_ORDER_PARTNER_ID };
    return map;
  });

  const getOrder = useCallback((id: string) => orders[id], [orders]);

  const getCustomerOrders = useCallback(() => {
    return [...MOCK_CUSTOMER_ORDERS.map(o => orders[o.id] || o), orders[TEST_ORDER_ID]].filter(Boolean) as OrderData[];
  }, [orders]);

  const getPartnerOrders = useCallback(() => {
    // Partner sees test order only after it's dispatched
    const partnerOrders = MOCK_PARTNER_ORDERS.map(o => orders[o.id] || o);
    const testOrder = orders[TEST_ORDER_PARTNER_ID];
    if (testOrder && testOrder.status !== "cho_dieu_phoi") {
      partnerOrders.push(testOrder);
    }
    return partnerOrders;
  }, [orders]);

  const getAdminOrders = useCallback(() => {
    return [...MOCK_ADMIN_ORDERS.map(o => orders[o.id] || o), orders[TEST_ORDER_ID]].filter(Boolean) as OrderData[];
  }, [orders]);

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

      // Sync test order across customer/partner views
      if (id === TEST_ORDER_ID && prev[TEST_ORDER_PARTNER_ID]) {
        result[TEST_ORDER_PARTNER_ID] = { ...updated, id: TEST_ORDER_PARTNER_ID };
      } else if (id === TEST_ORDER_PARTNER_ID && prev[TEST_ORDER_ID]) {
        result[TEST_ORDER_ID] = { ...updated, id: TEST_ORDER_ID };
      }

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
      if (id === TEST_ORDER_ID && prev[TEST_ORDER_PARTNER_ID]) {
        result[TEST_ORDER_PARTNER_ID] = { ...updated, id: TEST_ORDER_PARTNER_ID };
      } else if (id === TEST_ORDER_PARTNER_ID && prev[TEST_ORDER_ID]) {
        result[TEST_ORDER_ID] = { ...updated, id: TEST_ORDER_ID };
      }
      return result;
    });
  }, []);

  const updateOrder = useCallback((id: string, updates: Partial<OrderData>) => {
    setOrders(prev => {
      const order = prev[id];
      if (!order) return prev;
      const updated = { ...order, ...updates };
      const result = { ...prev, [id]: updated };
      if (id === TEST_ORDER_ID && prev[TEST_ORDER_PARTNER_ID]) {
        result[TEST_ORDER_PARTNER_ID] = { ...updated, id: TEST_ORDER_PARTNER_ID };
      } else if (id === TEST_ORDER_PARTNER_ID && prev[TEST_ORDER_ID]) {
        result[TEST_ORDER_ID] = { ...updated, id: TEST_ORDER_ID };
      }
      return result;
    });
  }, []);

  return (
    <OrderContext.Provider value={{ getOrder, getCustomerOrders, getPartnerOrders, getAdminOrders, advanceOrder, dispatchToPartner, assignStaff, updateOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
