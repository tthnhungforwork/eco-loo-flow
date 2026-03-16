import { Outlet } from "react-router-dom";
import CustomerBottomNav from "@/pages/customer/components/CustomerBottomNav";

const CustomerLayout = () => (
  <div className="min-h-screen bg-background pb-20 max-w-lg mx-auto">
    <Outlet />
    <CustomerBottomNav />
  </div>
);

export default CustomerLayout;
