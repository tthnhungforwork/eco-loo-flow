import { Outlet } from "react-router-dom";
import BottomNav, { NavItem } from "@/components/BottomNav";
import { Home, ShoppingBag, Briefcase, Bath, ClipboardList, User } from "lucide-react";

const partnerNav: NavItem[] = [
  { label: "Trang chủ", icon: Home, path: "/partner" },
  { label: "QL Đơn hàng", icon: ShoppingBag, path: "/partner/orders" },
  { label: "QL Công việc", icon: Briefcase, path: "/partner/tasks" },
  { label: "QL NVS", icon: Bath, path: "/partner/toilets" },
  { label: "Khảo sát", icon: ClipboardList, path: "/partner/surveys" },
  { label: "Chung", icon: User, path: "/partner/profile" },
];

const PartnerLayout = () => (
  <div className="min-h-screen bg-background pb-20 max-w-lg mx-auto">
    <Outlet />
    <BottomNav items={partnerNav} />
  </div>
);

export default PartnerLayout;
