// import { Routes, Route } from 'react-router-dom';
// import AdminSidebar from './AdminSidebar';
// import Overview from './Overview';
// import ManageStudents from './ManageStudents';
// import ManageStaff from './ManageStaff';
// import ManageNotes from './ManageNotes';
// import ManageGallery from './ManageGallery';
// import ManageDoubts from './ManageDoubts';
// import ManageResults from './ManageResults';
// import ManageAttendance from './ManageAttendance';
// import ManageMarks from './ManageMarks';
// import ManageAnnouncements from './ManageAnnouncements';
// import ManageReviews from './ManageReviews';

// export default function AdminLayout() {
//     return (
//         <div className="flex min-h-screen bg-[#06091a]">
//             <AdminSidebar />
//             <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto pt-16 lg:pt-0">
//                 <Routes>
//                     <Route index element={<Overview />} />
//                     <Route path="students" element={<ManageStudents />} />
//                     <Route path="staff" element={<ManageStaff />} />
//                     <Route path="notes" element={<ManageNotes />} />
//                     <Route path="gallery" element={<ManageGallery />} />
//                     <Route path="doubts" element={<ManageDoubts />} />
//                     <Route path="results" element={<ManageResults />} />
//                     <Route path="attendance" element={<ManageAttendance />} />
//                     <Route path="marks" element={<ManageMarks />} />
//                     <Route path="announcements" element={<ManageAnnouncements />} />
//                     <Route path="reviews" element={<ManageReviews />} />
//                 </Routes>
//             </main>
//         </div>
//     );
// }

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