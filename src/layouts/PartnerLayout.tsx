import { Outlet } from "react-router-dom";
import BottomNav, { NavItem } from "@/components/BottomNav";
import { Home, ShoppingBag, Briefcase, Bath, User } from "lucide-react";

const partnerNav: NavItem[] = [
  { label: "Trang chủ", icon: Home, path: "/partner" },
  { label: "Đơn hàng", icon: ShoppingBag, path: "/partner/orders" },
  // QR scan button is in the center
  { label: "NVS", icon: Bath, path: "/partner/toilets" },
  { label: "Công việc", icon: Briefcase, path: "/partner/tasks" },
  { label: "Cá nhân", icon: User, path: "/partner/profile" },
];

const PartnerLayout = () => (
  <div className="min-h-screen bg-background pb-24 max-w-lg mx-auto">
    <Outlet />
    <BottomNav items={partnerNav} />
  </div>
);

export default PartnerLayout;
