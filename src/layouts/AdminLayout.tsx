import { Outlet } from "react-router-dom";
import AdminBottomNav from "@/pages/admin/components/AdminBottomNav";

const AdminLayout = () => (
  <div className="min-h-screen bg-background pb-20 max-w-lg mx-auto">
    <Outlet />
    <AdminBottomNav />
  </div>
);

export default AdminLayout;
