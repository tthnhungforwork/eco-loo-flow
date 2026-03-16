import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RoleProvider } from "@/contexts/RoleContext";
import RoleSwitcherSheet from "@/components/RoleSwitcherSheet";

import Login from "./pages/Login";
import Register from "./pages/Register";
import RoleSelect from "./pages/RoleSelect";
import NotFound from "./pages/NotFound";

import CustomerLayout from "./layouts/CustomerLayout";
import CustomerHome from "./pages/customer/CustomerHome";
import CustomerTasks from "./pages/customer/CustomerTasks";
import CustomerReports from "./pages/customer/CustomerReports";
import CustomerToilets from "./pages/customer/CustomerToilets";
import CustomerOrders from "./pages/customer/CustomerOrders";
import CustomerProfile from "./pages/customer/CustomerProfile";
import CustomerTickets from "./pages/customer/CustomerTickets";
import CustomerSurveys from "./pages/customer/CustomerSurveys";
import CustomerBusinessInfo from "./pages/customer/CustomerBusinessInfo";
import CustomerCreateOrder from "./pages/customer/CustomerCreateOrder";
import CustomerRegisterPartner from "./pages/customer/CustomerRegisterPartner";
import CustomerCart from "./pages/customer/CustomerCart";
import CustomerOrderDetail from "./pages/customer/CustomerOrderDetail";

import PartnerLayout from "./layouts/PartnerLayout";
import PartnerHome from "./pages/partner/PartnerHome";
import PartnerOrders from "./pages/partner/PartnerOrders";
import PartnerTasks from "./pages/partner/PartnerTasks";
import PartnerToilets from "./pages/partner/PartnerToilets";
import PartnerSurveys from "./pages/partner/PartnerSurveys";
import PartnerProfile from "./pages/partner/PartnerProfile";
import PartnerOrderDetail from "./pages/partner/PartnerOrderDetail";

import AdminLayout from "./layouts/AdminLayout";
import AdminHome from "./pages/admin/AdminHome";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminTickets from "./pages/admin/AdminTickets";
import AdminToilets from "./pages/admin/AdminToilets";
import AdminSurveys from "./pages/admin/AdminSurveys";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminOrderDetail from "./pages/admin/AdminOrderDetail";
import AdminPartners from "./pages/admin/AdminPartners";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RoleProvider>
          <RoleSwitcherSheet />
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/role-select" element={<RoleSelect />} />

            <Route path="/customer" element={<CustomerLayout />}>
              <Route index element={<CustomerHome />} />
              <Route path="tasks" element={<CustomerTasks />} />
              <Route path="reports" element={<CustomerReports />} />
              <Route path="toilets" element={<CustomerToilets />} />
              <Route path="orders" element={<CustomerOrders />} />
              <Route path="profile" element={<CustomerProfile />} />
              <Route path="tickets" element={<CustomerTickets />} />
              <Route path="surveys" element={<CustomerSurveys />} />
              <Route path="business" element={<CustomerBusinessInfo />} />
              <Route path="create-order" element={<CustomerCreateOrder />} />
              <Route path="register-partner" element={<CustomerRegisterPartner />} />
              <Route path="cart" element={<CustomerCart />} />
              <Route path="orders/:orderId" element={<CustomerOrderDetail />} />
            </Route>

            <Route path="/partner" element={<PartnerLayout />}>
              <Route index element={<PartnerHome />} />
              <Route path="orders" element={<PartnerOrders />} />
              <Route path="orders/:orderId" element={<PartnerOrderDetail />} />
              <Route path="tasks" element={<PartnerTasks />} />
              <Route path="toilets" element={<PartnerToilets />} />
              <Route path="surveys" element={<PartnerSurveys />} />
              <Route path="profile" element={<PartnerProfile />} />
            </Route>

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminHome />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="tickets" element={<AdminTickets />} />
              <Route path="toilets" element={<AdminToilets />} />
              <Route path="surveys" element={<AdminSurveys />} />
              <Route path="profile" element={<AdminProfile />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
        </RoleProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
