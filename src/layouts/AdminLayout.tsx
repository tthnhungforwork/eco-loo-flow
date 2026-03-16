import { Outlet } from "react-router-dom";
import BottomNav, { NavItem } from "@/components/BottomNav";
import { Home, ShoppingBag, Bath, MessageSquareWarning, User } from "lucide-react";

const adminNav: NavItem[] = [
  { label: "Trang chủ", icon: Home, path: "/admin" },
  { label: "Đơn hàng", icon: ShoppingBag, path: "/admin/orders" },
  // QR scan button is in the center
  { label: "NVS", icon: Bath, path: "/admin/toilets" },
  { label: "Ticket", icon: MessageSquareWarning, path: "/admin/tickets" },
  { label: "Cá nhân", icon: User, path: "/admin/profile" },
];

const AdminLayout = () => (
  <div className="min-h-screen bg-background pb-24 max-w-lg mx-auto">
    <Outlet />
    <BottomNav items={adminNav} />
  </div>
);

export default AdminLayout;
