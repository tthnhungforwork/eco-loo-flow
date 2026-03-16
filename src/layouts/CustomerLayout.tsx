import { Outlet } from "react-router-dom";
import BottomNav, { NavItem } from "@/components/BottomNav";
import { Home, Briefcase, BarChart3, Bath, ShoppingBag, User } from "lucide-react";

const customerNav: NavItem[] = [
  { label: "Trang chủ", icon: Home, path: "/customer" },
  { label: "Công việc", icon: Briefcase, path: "/customer/tasks" },
  { label: "Báo cáo", icon: BarChart3, path: "/customer/reports" },
  { label: "Nhà vệ sinh", icon: Bath, path: "/customer/toilets" },
  { label: "Đơn hàng", icon: ShoppingBag, path: "/customer/orders" },
  { label: "Chung", icon: User, path: "/customer/profile" },
];

const CustomerLayout = () => (
  <div className="min-h-screen bg-background pb-20 max-w-lg mx-auto">
    <Outlet />
    <BottomNav items={customerNav} />
  </div>
);

export default CustomerLayout;
