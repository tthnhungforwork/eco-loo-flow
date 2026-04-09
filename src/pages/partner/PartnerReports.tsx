import PartnerHeader from "./components/PartnerHeader";
import { useState, lazy, Suspense } from "react";
import { BarChart3, ShoppingBag, DollarSign, ClipboardCheck, AlertTriangle } from "lucide-react";

const ReportOverview = lazy(() => import("./reports/PartnerReportOverview"));
const ReportOrders = lazy(() => import("./reports/PartnerReportOrders"));
const ReportRevenue = lazy(() => import("./reports/PartnerReportRevenue"));
const ReportTasks = lazy(() => import("./reports/PartnerReportTasks"));
const ReportTickets = lazy(() => import("./reports/PartnerReportTickets"));

const tabs = [
  { label: "Tổng quan", icon: BarChart3 },
  { label: "Đơn hàng", icon: ShoppingBag },
  { label: "Doanh thu", icon: DollarSign },
  { label: "Công việc", icon: ClipboardCheck },
  { label: "Ticket", icon: AlertTriangle },
];

const PartnerReports = () => {
  const [tab, setTab] = useState(0);

  return (
    <div>
      <PartnerHeader title="Báo cáo" />
      <div className="py-4">
        <div className="px-4 mb-4 flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          {tabs.map((t, i) => (
            <button
              key={t.label}
              onClick={() => setTab(i)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                tab === i ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              <t.icon size={12} />
              {t.label}
            </button>
          ))}
        </div>
        <div className="px-4 pb-24">
          <Suspense fallback={<div className="flex justify-center py-12"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
            {tab === 0 && <ReportOverview />}
            {tab === 1 && <ReportOrders />}
            {tab === 2 && <ReportRevenue />}
            {tab === 3 && <ReportTasks />}
            {tab === 4 && <ReportTickets />}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default PartnerReports;
