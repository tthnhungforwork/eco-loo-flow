import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";

export type RoleType = "personal" | "business" | "partner_personal" | "partner_business";

export interface RoleProfile {
  id: RoleType;
  label: string;
  subtitle: string;
  initials: string;
  gradient: string;
  basePath: string;
  notifications?: number;
}

export const ROLE_PROFILES: RoleProfile[] = [
  {
    id: "personal",
    label: "Nguyễn Văn Khách",
    subtitle: "Tài khoản cá nhân",
    initials: "NK",
    gradient: "gradient-primary",
    basePath: "/customer",
  },
  {
    id: "business",
    label: "Công ty TNHH ABC",
    subtitle: "Tài khoản doanh nghiệp",
    initials: "AB",
    gradient: "gradient-blue",
    basePath: "/customer",
    notifications: 3,
  },
  {
    id: "partner_personal",
    label: "Nguyễn Văn Khách",
    subtitle: "Đối tác cá nhân",
    initials: "ĐT",
    gradient: "gradient-warm",
    basePath: "/partner",
    notifications: 5,
  },
  {
    id: "partner_business",
    label: "Công ty Eco Clean",
    subtitle: "Đối tác doanh nghiệp",
    initials: "EC",
    gradient: "gradient-hero",
    basePath: "/partner",
  },
];

interface RoleContextType {
  currentRole: RoleProfile;
  setRole: (role: RoleType) => void;
  isSheetOpen: boolean;
  openSheet: () => void;
  closeSheet: () => void;
}

const RoleContext = createContext<RoleContextType | null>(null);

export const useRole = () => {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole must be used within RoleProvider");
  return ctx;
};

export const RoleProvider = ({ children }: { children: ReactNode }) => {
  const [currentRoleId, setCurrentRoleId] = useState<RoleType>("personal");
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const currentRole = ROLE_PROFILES.find((r) => r.id === currentRoleId) || ROLE_PROFILES[0];

  const setRole = useCallback((id: RoleType) => {
    setCurrentRoleId(id);
    setIsSheetOpen(false);
  }, []);

  return (
    <RoleContext.Provider
      value={{
        currentRole,
        setRole,
        isSheetOpen,
        openSheet: () => setIsSheetOpen(true),
        closeSheet: () => setIsSheetOpen(false),
      }}
    >
      {children}
    </RoleContext.Provider>
  );
};
