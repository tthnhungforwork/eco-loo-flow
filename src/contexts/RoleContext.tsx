import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type AccountType = "personal" | "business_owner" | "business_employee" | "partner_personal" | "partner_business_owner" | "partner_business_employee";

export interface AccountProfile {
  id: string; // unique id per entry (e.g. "personal", "biz_abc123", "emp_xyz")
  type: AccountType;
  label: string;
  subtitle: string;
  initials: string;
  gradient: string;
  basePath: string;
  notifications?: number;
  /** For business accounts: the business entity id */
  businessId?: string;
}

// Demo data reflecting one user who:
// - has a personal account
// - owns 2 businesses
// - is employee at 1 business
// - is a personal partner
// - is partner via a business they own
export const ACCOUNT_PROFILES: AccountProfile[] = [
  {
    id: "personal",
    type: "personal",
    label: "Nguyễn Văn Khách",
    subtitle: "Tài khoản cá nhân",
    initials: "NK",
    gradient: "gradient-primary",
    basePath: "/customer",
  },
  {
    id: "biz_owner_abc",
    type: "business_owner",
    label: "Công ty TNHH ABC",
    subtitle: "Chủ doanh nghiệp",
    initials: "AB",
    gradient: "gradient-blue",
    basePath: "/customer",
    notifications: 3,
    businessId: "abc",
  },
  {
    id: "biz_owner_green",
    type: "business_owner",
    label: "Công ty Green Tech",
    subtitle: "Chủ doanh nghiệp",
    initials: "GT",
    gradient: "gradient-hero",
    basePath: "/customer",
    businessId: "green",
  },
  {
    id: "biz_emp_xyz",
    type: "business_employee",
    label: "Tập đoàn XYZ Corp",
    subtitle: "Nhân viên",
    initials: "XY",
    gradient: "gradient-warm",
    basePath: "/customer",
    notifications: 1,
    businessId: "xyz",
  },
  {
    id: "partner_personal",
    type: "partner_personal",
    label: "Nguyễn Văn Khách",
    subtitle: "Đối tác cá nhân",
    initials: "ĐT",
    gradient: "gradient-warm",
    basePath: "/partner",
    notifications: 5,
  },
  {
    id: "partner_biz_eco",
    type: "partner_business_owner",
    label: "Công ty Eco Clean",
    subtitle: "Đối tác · Chủ doanh nghiệp",
    initials: "EC",
    gradient: "gradient-hero",
    basePath: "/partner",
    businessId: "eco",
  },
];

/** Group labels for display */
export const ACCOUNT_GROUPS = [
  { key: "personal", label: "Cá nhân", types: ["personal"] as AccountType[] },
  { key: "business", label: "Doanh nghiệp", types: ["business_owner", "business_employee"] as AccountType[] },
  { key: "partner", label: "Đối tác", types: ["partner_personal", "partner_business_owner", "partner_business_employee"] as AccountType[] },
];

interface RoleContextType {
  currentAccount: AccountProfile;
  setAccount: (id: string) => void;
  isSheetOpen: boolean;
  openSheet: () => void;
  closeSheet: () => void;
  /** Check if current account is a business owner type */
  isBusinessOwner: boolean;
  /** Check if current account is an employee type */
  isEmployee: boolean;
}

const RoleContext = createContext<RoleContextType | null>(null);

export const useRole = () => {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used within RoleProvider");
  return ctx;
};

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [currentId, setCurrentId] = useState<string>("personal");

  const currentAccount = ACCOUNT_PROFILES.find((r) => r.id === currentId) || ACCOUNT_PROFILES[0];

  const setAccount = useCallback((id: string) => {
    setCurrentId(id);
  }, []);

  const isBusinessOwner = currentAccount.type === "business_owner" || currentAccount.type === "partner_business_owner";
  const isEmployee = currentAccount.type === "business_employee" || currentAccount.type === "partner_business_employee";

  return (
    <RoleContext.Provider
      value={{
        currentAccount,
        setAccount,
        isSheetOpen: false,
        openSheet: () => {},
        closeSheet: () => {},
        isBusinessOwner,
        isEmployee,
      }}
    >
      <RoleContextInner currentId={currentId} setCurrentId={setCurrentId} currentAccount={currentAccount} setAccount={setAccount} isBusinessOwner={isBusinessOwner} isEmployee={isEmployee}>
        {children}
      </RoleContextInner>
    </RoleContext.Provider>
  );
};

/** Inner component to manage sheet state separately */
const RoleContextInner = ({ children, currentId, setCurrentId, currentAccount, setAccount, isBusinessOwner, isEmployee }: {
  children: ReactNode;
  currentId: string;
  setCurrentId: (id: string) => void;
  currentAccount: AccountProfile;
  setAccount: (id: string) => void;
  isBusinessOwner: boolean;
  isEmployee: boolean;
}) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <RoleContext.Provider
      value={{
        currentAccount,
        setAccount: (id: string) => {
          setAccount(id);
          setIsSheetOpen(false);
        },
        isSheetOpen,
        openSheet: () => setIsSheetOpen(true),
        closeSheet: () => setIsSheetOpen(false),
        isBusinessOwner,
        isEmployee,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};
