"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", path: "/admin-dashboard" },
    { name: "Add Job", path: "/admin-dashboard/add-job" },
    { name: "All Jobs", path: "/admin-dashboard/all-jobs" },
  ];

  return (
    <div className="h-screen overflow-y-auto w-64 bg-gray-800 text-white flex flex-col">
      <h1 className="text-2xl font-bold text-center py-6 border-b border-gray-700">
        Admin Panel
      </h1>
      <nav className="flex-1 mt-4">
        {navItems.map((item) => (
          <Link key={item.path} href={item.path}>
            <span
              className={`block px-6 py-3 mb-2 rounded cursor-pointer ${
                pathname === item.path
                  ? "bg-blue-500 text-white"
                  : "hover:bg-gray-700"
              }`}
            >
              {item.name}
            </span>
          </Link>
        ))}
      </nav>
      <div className="p-6 border-t border-gray-700 text-sm text-gray-400">
        © 2026 Admin
      </div>
    </div>
  );
};

export default Sidebar;
