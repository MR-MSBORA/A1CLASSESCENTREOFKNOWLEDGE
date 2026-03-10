import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-[#06091a] text-white">

      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">

        {/* Top Bar */}
        <header className="h-16 flex items-center justify-between px-6 border-b border-gray-800 bg-[#0c1228]">
          <h1 className="text-lg font-semibold tracking-wide">
            Super Admin Dashboard
          </h1>

          <div className="text-sm text-gray-300">
            Welcome Admin 👋
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          
          {/* Nested routes render here */}
          <Outlet />

        </main>

      </div>
    </div>
  );
}