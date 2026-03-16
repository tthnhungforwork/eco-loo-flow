import { Outlet } from "react-router-dom";
import BottomNav, { NavItem } from "@/components/BottomNav";
import { Home, ShoppingBag, Briefcase, Bath, ClipboardList, User } from "lucide-react";

const partnerNav: NavItem[] = [
  { label: "Trang chủ", icon: Home, path: "/partner" },
  { label: "Đơn hàng", icon: ShoppingBag, path: "/partner/orders" },
  { label: "Công việc", icon: Briefcase, path: "/partner/tasks" },
  { label: "NVS", icon: Bath, path: "/partner/toilets" },
  { label: "Khảo sát", icon: ClipboardList, path: "/partner/surveys" },
  { label: "Cá nhân", icon: User, path: "/partner/profile" },
];

const PartnerLayout = () => (
  <div className="min-h-screen bg-background pb-20 max-w-lg mx-auto">
    <Outlet />
    <BottomNav items={partnerNav} />
  </div>
);

export default PartnerLayout;
