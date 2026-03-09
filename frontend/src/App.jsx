// import { Routes, Route } from 'react-router-dom';
// import Navbar from './components/common/Navbar';
// import Footer from './components/common/Footer';
// import ProtectedRoute from './components/common/ProtectedRoute';

// // Public pages
// import Home from './pages/public/Home';
// import About from './pages/public/About';
// import Courses from './pages/public/Courses';
// import NotesStore from './pages/public/NotesStore';
// import Results from './pages/public/Results';
// import Contact from './pages/public/Contact';
// import Gallery from './pages/public/Gallery';
// import Teachers from './pages/public/Teachers';

// // Auth pages
// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';
// import ForgotPassword from './pages/auth/ForgotPassword';

// // Dashboards
// import StudentDashboard from './pages/student/Dashboard';
// import AdminLayout from './pages/admin/AdminLayout';
// import TeacherLayout from './pages/teacher/TeacherLayout';

// const PL = ({ children }) => (
//   <>
//     <Navbar />
//     {children}
//     <Footer />
//   </>
// );

// export default function App() {
//   return (
//     <Routes>

//       {/* Public Pages */}
//       <Route path="/" element={<PL><Home /></PL>} />
//       <Route path="/about" element={<PL><About /></PL>} />
//       <Route path="/courses" element={<PL><Courses /></PL>} />
//       <Route path="/notes" element={<PL><NotesStore /></PL>} />
//       <Route path="/results" element={<PL><Results /></PL>} />
//       <Route path="/contact" element={<PL><Contact /></PL>} />
//       <Route path="/gallery" element={<PL><Gallery /></PL>} />
//       <Route path="/teachers" element={<PL><Teachers /></PL>} />

//       {/* Auth Pages */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/forgot-password" element={<ForgotPassword />} />

//       {/* Student Portal */}
//       <Route
//         path="/dashboard/*"
//         element={
//           <ProtectedRoute role="student">
//             <StudentDashboard />
//           </ProtectedRoute>
//         }
//       />

//       {/* Teacher Portal */}
//       <Route
//         path="/teacher/*"
//         element={
//           <ProtectedRoute role="teacher">
//             <TeacherLayout />
//           </ProtectedRoute>
//         }
//       />

//       {/* Admin Panel */}
//       <Route
//         path="/admin/*"
//         element={
//           <ProtectedRoute role="admin">
//             <AdminLayout />
//           </ProtectedRoute>
//         }
//       />

//     </Routes>
//   );
// }



import { Routes, Route } from "react-router-dom";

import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import ProtectedRoute from "./components/common/ProtectedRoute";

/* Public Pages */
import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Courses from "./pages/public/Courses";
import NotesStore from "./pages/public/NotesStore";
import Results from "./pages/public/Results";
import Contact from "./pages/public/Contact";
import Gallery from "./pages/public/Gallery";
import Teachers from "./pages/public/Teachers";

/* Auth Pages */
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

/* Student Pages */
import Dashboard from "./pages/student/Dashboard";
import Attendance from "./pages/student/Attendance";
import Marks from "./pages/student/Marks";
import Assignments from "./pages/student/Assignments";
import Doubts from "./pages/student/Doubts";
import Notices from "./pages/student/Notices";
import MyNotes from "./pages/student/MyNotes";
import Profile from "./pages/student/Profile";

/* Admin + Teacher */
import AdminLayout from "./pages/admin/AdminLayout";
import TeacherLayout from "./pages/teacher/TeacherLayout";

/* Public Layout */
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

      {/* Public Pages */}
      <Route path="/" element={<PL><Home /></PL>} />
      <Route path="/about" element={<PL><About /></PL>} />
      <Route path="/courses" element={<PL><Courses /></PL>} />
      <Route path="/notes" element={<PL><NotesStore /></PL>} />
      <Route path="/results" element={<PL><Results /></PL>} />
      <Route path="/contact" element={<PL><Contact /></PL>} />
      <Route path="/gallery" element={<PL><Gallery /></PL>} />
      <Route path="/teachers" element={<PL><Teachers /></PL>} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Student Portal */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute role="student">
            <Dashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="marks" element={<Marks />} />
        <Route path="assignments" element={<Assignments />} />
        <Route path="doubts" element={<Doubts />} />
        <Route path="notices" element={<Notices />} />
        <Route path="notes" element={<MyNotes />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Teacher Portal */}
      <Route
        path="/teacher/*"
        element={
          <ProtectedRoute role="teacher">
            <TeacherLayout />
          </ProtectedRoute>
        }
      />

      {/* Admin Panel */}
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}
