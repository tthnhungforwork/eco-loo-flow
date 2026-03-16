import { Outlet } from "react-router-dom";
import BottomNav, { NavItem } from "@/components/BottomNav";
import { Home, ShoppingBag, MessageSquareWarning, Bath, ClipboardList, User } from "lucide-react";

const adminNav: NavItem[] = [
  { label: "Trang chủ", icon: Home, path: "/admin" },
  { label: "Đơn hàng", icon: ShoppingBag, path: "/admin/orders" },
  { label: "Ticket", icon: MessageSquareWarning, path: "/admin/tickets" },
  { label: "QL NVS", icon: Bath, path: "/admin/toilets" },
  { label: "Khảo sát", icon: ClipboardList, path: "/admin/surveys" },
  { label: "Chung", icon: User, path: "/admin/profile" },
];

const AdminLayout = () => (
  <div className="min-h-screen bg-background pb-20 max-w-lg mx-auto">
    <Outlet />
    <BottomNav items={adminNav} />
  </div>
);

export default AdminLayout;
