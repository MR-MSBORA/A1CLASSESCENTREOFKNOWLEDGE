import { Routes, Route } from 'react-router-dom';
import Sidebar from '../../components/dashboard/Sidebar';
import Overview from './Overview';
import MyNotes from './MyNotes';
import Marks from './Marks';
import Attendance from './Attendance';
import Assignments from './Assignments';
import Doubts from './Doubts';
import Notices from './Notices';
import Profile from './Profile';

export default function StudentDashboard() {
    return (
        <div className="flex min-h-screen bg-[#06091a]">
            <Sidebar />
            <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto pt-16 lg:pt-0">
                <Routes>
                    <Route index element={<Overview />} />
                    <Route path="notes" element={<MyNotes />} />
                    <Route path="marks" element={<Marks />} />
                    <Route path="attendance" element={<Attendance />} />
                    <Route path="assignments" element={<Assignments />} />
                    <Route path="doubts" element={<Doubts />} />
                    <Route path="notices" element={<Notices />} />
                    <Route path="profile" element={<Profile />} />
                </Routes>
            </main>
        </div>
    );
}