import { Routes, Route } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import Overview from './Overview';
import ManageStudents from './ManageStudents';
import ManageStaff from './ManageStaff';
import ManageNotes from './ManageNotes';
import ManageGallery from './ManageGallery';
import ManageDoubts from './ManageDoubts';
import ManageResults from './ManageResults';
import ManageAttendance from './ManageAttendance';
import ManageMarks from './ManageMarks';
import ManageAnnouncements from './ManageAnnouncements';
import ManageReviews from './ManageReviews';

export default function AdminLayout() {
    return (
        <div className="flex min-h-screen bg-[#06091a]">
            <AdminSidebar />
            <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto pt-16 lg:pt-0">
                <Routes>
                    <Route index element={<Overview />} />
                    <Route path="students" element={<ManageStudents />} />
                    <Route path="staff" element={<ManageStaff />} />
                    <Route path="notes" element={<ManageNotes />} />
                    <Route path="gallery" element={<ManageGallery />} />
                    <Route path="doubts" element={<ManageDoubts />} />
                    <Route path="results" element={<ManageResults />} />
                    <Route path="attendance" element={<ManageAttendance />} />
                    <Route path="marks" element={<ManageMarks />} />
                    <Route path="announcements" element={<ManageAnnouncements />} />
                    <Route path="reviews" element={<ManageReviews />} />
                </Routes>
            </main>
        </div>
    );
}