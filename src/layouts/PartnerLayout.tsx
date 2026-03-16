import { Outlet } from "react-router-dom";
import PartnerBottomNav from "@/pages/partner/components/PartnerBottomNav";

const PartnerLayout = () => (
  <div className="min-h-screen bg-background pb-20 max-w-lg mx-auto">
    <Outlet />
    <PartnerBottomNav />
  </div>
);

export default PartnerLayout;
