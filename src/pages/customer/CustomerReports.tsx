import CustomerHeader from "./components/CustomerHeader";
import { useState, lazy, Suspense } from "react";
import { BarChart3, Building2, Wrench, AlertTriangle, DollarSign, ClipboardCheck } from "lucide-react";

const ReportOverview = lazy(() => import("./reports/ReportOverview"));
const ReportToiletOps = lazy(() => import("./reports/ReportToiletOps"));
const ReportServices = lazy(() => import("./reports/ReportServices"));
const ReportTickets = lazy(() => import("./reports/ReportTickets"));
const ReportCosts = lazy(() => import("./reports/ReportCosts"));
const ReportQuality = lazy(() => import("./reports/ReportQuality"));

const tabs = [
  { label: "Tổng quan", icon: BarChart3 },
  { label: "Vận hành NVS", icon: Building2 },
  { label: "Dịch vụ", icon: Wrench },
  { label: "Ticket", icon: AlertTriangle },
  { label: "Chi phí", icon: DollarSign },
  { label: "Chất lượng", icon: ClipboardCheck },
];

const CustomerReports = () => {
  const [tab, setTab] = useState(0);

  return (
    <div>
      <CustomerHeader title="Báo cáo" />
      <div className="py-4">
        {/* Tabs */}
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
            {tab === 1 && <ReportToiletOps />}
            {tab === 2 && <ReportServices />}
            {tab === 3 && <ReportTickets />}
            {tab === 4 && <ReportCosts />}
            {tab === 5 && <ReportQuality />}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default CustomerReports;
