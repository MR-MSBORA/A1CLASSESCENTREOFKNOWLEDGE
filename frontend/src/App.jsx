import { Routes, Route } from "react-router-dom";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ProtectedRoute from "./components/common/ProtectedRoute";

/* Public Pages */
import Home        from "./pages/public/Home";
import About       from "./pages/public/About";
import Courses     from "./pages/public/Courses";
import NotesStore  from "./pages/public/NotesStore";
import Results     from "./pages/public/Results";
import Contact     from "./pages/public/Contact";
import Gallery     from "./pages/public/Gallery";
import Teachers    from "./pages/public/Teachers";

/* Auth Pages */
import Login          from "./pages/auth/Login";
import Register       from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

/* Student Pages */
import Dashboard        from "./pages/student/Dashboard";
import StudentOverview  from "./pages/student/Overview";   // ✅ student overview
import Attendance       from "./pages/student/Attendance";
import Marks            from "./pages/student/Marks";
import Assignments      from "./pages/student/Assignments";
import Doubts           from "./pages/student/Doubts";
import Notices          from "./pages/student/Notices";
import MyNotes          from "./pages/student/MyNotes";
import Profile          from "./pages/student/Profile";

/* Admin Pages */
import AdminLayout         from "./pages/admin/AdminLayout";
import AdminOverview       from "./pages/admin/Overview";   // ✅ admin overview
import ManageStudents      from "./pages/admin/ManageStudents";
import ManageStaff         from "./pages/admin/ManageStaff";
import ManageNotes         from "./pages/admin/ManageNotes";
import ManageGallery       from "./pages/admin/ManageGallery";
import ManageDoubts        from "./pages/admin/ManageDoubts";
import ManageResults       from "./pages/admin/ManageResults";
import ManageAttendance    from "./pages/admin/ManageAttendance";
import ManageMarks         from "./pages/admin/ManageMarks";
import ManageAnnouncements from "./pages/admin/ManageAnnouncements";
import ManageReviews       from "./pages/admin/ManageReviews";

/* Teacher */
import TeacherLayout from "./pages/teacher/TeacherLayout";

/* Public Layout wrapper */
const PL = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

export default function App() {
  return (
    <Routes>

      {/* ── Public Pages ─────────────────────────── */}
      <Route path="/"         element={<PL><Home /></PL>} />
      <Route path="/about"    element={<PL><About /></PL>} />
      <Route path="/courses"  element={<PL><Courses /></PL>} />
      <Route path="/notes"    element={<PL><NotesStore /></PL>} />
      <Route path="/results"  element={<PL><Results /></PL>} />
      <Route path="/contact"  element={<PL><Contact /></PL>} />
      <Route path="/gallery"  element={<PL><Gallery /></PL>} />
      <Route path="/teachers" element={<PL><Teachers /></PL>} />

      {/* ── Auth ─────────────────────────────────── */}
      <Route path="/login"           element={<Login />} />
      <Route path="/register"        element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* ── Student Portal ───────────────────────── */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute role="student">
            <Dashboard />
          </ProtectedRoute>
        }
      >
        {/* ✅ Uses StudentOverview — NOT the admin one */}
        <Route index              element={<StudentOverview />} />
        <Route path="attendance"  element={<Attendance />} />
        <Route path="marks"       element={<Marks />} />
        <Route path="assignments" element={<Assignments />} />
        <Route path="doubts"      element={<Doubts />} />
        <Route path="notices"     element={<Notices />} />  {/* ✅ unlocked in sidebar too */}
        <Route path="notes"       element={<MyNotes />} />
        <Route path="profile"     element={<Profile />} />
      </Route>

      {/* ── Teacher Portal ───────────────────────── */}
      <Route
        path="/teacher/*"
        element={
          <ProtectedRoute role="teacher">
            <TeacherLayout />
          </ProtectedRoute>
        }
      />

      {/* ── Admin Panel ──────────────────────────── */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        {/* ✅ Uses AdminOverview — separate from student */}
        <Route index                element={<AdminOverview />} />
        <Route path="students"      element={<ManageStudents />} />
        <Route path="staff"         element={<ManageStaff />} />
        <Route path="notes"         element={<ManageNotes />} />
        <Route path="gallery"       element={<ManageGallery />} />
        <Route path="doubts"        element={<ManageDoubts />} />
        <Route path="results"       element={<ManageResults />} />
        <Route path="attendance"    element={<ManageAttendance />} />
        <Route path="marks"         element={<ManageMarks />} />
        <Route path="announcements" element={<ManageAnnouncements />} />
        <Route path="reviews"       element={<ManageReviews />} />
      </Route>

    </Routes>
  );
}