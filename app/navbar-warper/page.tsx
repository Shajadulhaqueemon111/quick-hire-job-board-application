"use client";

import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();
  const isAdminDashboard = pathname?.startsWith("/admin-dashboard");

  if (isAdminDashboard) return null;

  return <Navbar />;
}
