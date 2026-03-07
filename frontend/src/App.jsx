// import { Routes, Route } from 'react-router-dom';
// import Navbar          from './components/common/Navbar';
// import Footer          from './components/common/Footer';
// import ProtectedRoute  from './components/common/ProtectedRoute';
// import Home            from './pages/public/Home';
// import About           from './pages/public/About';
// import Courses         from './pages/public/Courses';
// import NotesStore      from './pages/public/NotesStore';
// import Results         from './pages/public/Results';
// import Contact         from './pages/public/Contact';
// import Login           from './pages/auth/Login';
// import Register        from './pages/auth/Register';
// import Gallery from './pages/public/Gallery';

// // Placeholder pages — built on Day 4 & 5
// import StudentDashboard from './pages/student/Dashboard';
// const AdminDashboard   = () => <div className="pt-24 text-center dark:text-white p-10">Admin Dashboard — Coming Day 5</div>;
// const NotesStorePage   = () => <div className="pt-24 text-center dark:text-white p-10">Notes Store — Coming Day 4</div>;

// const PL = ({ children }) => <><Navbar />{children}<Footer /></>;

// export default function App() {
//   return (
//     <Routes>
//       <Route path="/"        element={<PL><Home /></PL>} />
//       <Route path="/about"   element={<PL><About /></PL>} />
//       <Route path="/courses" element={<PL><Courses /></PL>} />
//       <Route path="/notes"   element={<PL><NotesStore /></PL>} />
//       <Route path="/results" element={<PL><Results /></PL>} />
//       <Route path="/contact" element={<PL><Contact /></PL>} />
//       <Route path="/login"    element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/gallery" element={<PL><Gallery /></PL>} />
//       <Route path="/dashboard/*" element={
//         <ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>
//       } />
//       <Route path="/admin/*" element={
//         <ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>
//       } />
//     </Routes>
//   );
// }

import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';

// Public pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Courses from './pages/public/Courses';
import NotesStore from './pages/public/NotesStore';
import Results from './pages/public/Results';
import Contact from './pages/public/Contact';
import Gallery from './pages/public/Gallery';

// Auth pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

// Dashboards
import StudentDashboard from './pages/student/Dashboard';
import AdminLayout from './pages/admin/AdminLayout';
import TeacherLayout from './pages/teacher/TeacherLayout';
import Teachers from './pages/public/Teachers';

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
      {/* Public */}
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

      {/* Student Portal */}
      <Route path="/dashboard/*" element={
        <ProtectedRoute role="student">
          <StudentDashboard />
        </ProtectedRoute>
      } />
      {/* Teachers Portal */}
      <Route path="/teacher/*" element={
        <ProtectedRoute role="teacher">
          <TeacherLayout />
        </ProtectedRoute>
      } />

      {/* Admin Panel */}
      <Route path="/admin/*" element={
        <ProtectedRoute role="admin">
          <AdminLayout />
        </ProtectedRoute>
      } />
    </Routes>
  );
}