import { Outlet } from "react-router-dom";
import BottomNav, { NavItem } from "@/components/BottomNav";
import { Home, Briefcase, Bath, ShoppingBag, User } from "lucide-react";

const customerNav: NavItem[] = [
  { label: "Trang chủ", icon: Home, path: "/customer" },
  { label: "Công việc", icon: Briefcase, path: "/customer/tasks" },
  // QR scan button is in the center (built into BottomNav)
  { label: "NVS", icon: Bath, path: "/customer/toilets" },
  { label: "Đơn hàng", icon: ShoppingBag, path: "/customer/orders" },
  { label: "Cá nhân", icon: User, path: "/customer/profile" },
];

const CustomerLayout = () => (
  <div className="min-h-screen bg-background pb-24 max-w-lg mx-auto">
    <Outlet />
    <BottomNav items={customerNav} />
  </div>
);

export default CustomerLayout;
