
import { Routes, Route } from 'react-router-dom';
import TeacherSidebar from './TeacherSidebar';
import TeacherOverview from './TeacherOverview';
import TeacherAttendance from './TeacherAttendance';
import TeacherMarks from './TeacherMarks';
import TeacherAssignments from './TeacherAssignments';
import TeacherDoubts from './TeacherDoubts';
import TeacherAnnouncements from './TeacherAnnouncements';
import TeacherNotes from './TeacherNotes';

export default function TeacherLayout() {
    return (
        <div className="flex min-h-screen bg-[#06091a]">
            <TeacherSidebar />
            <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto pt-16 lg:pt-0">
                <Routes>
                    <Route index element={<TeacherOverview />} />
                    <Route path="attendance" element={<TeacherAttendance />} />
                    <Route path="marks" element={<TeacherMarks />} />
                    <Route path="assignments" element={<TeacherAssignments />} />
                    <Route path="doubts" element={<TeacherDoubts />} />
                    <Route path="announcements" element={<TeacherAnnouncements />} />
                    <Route path="notes" element={<TeacherNotes />} />
                </Routes>
            </main>
        </div>
    );
}