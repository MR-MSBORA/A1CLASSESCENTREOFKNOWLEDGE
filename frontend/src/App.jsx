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
// import ForgotPassword from './pages/auth/Login';

// // Auth pages
// import Login from './pages/auth/Login';
// import Register from './pages/auth/Register';

// // Dashboards
// import StudentDashboard from './pages/student/Dashboard';
// import AdminLayout from './pages/admin/AdminLayout';
// import TeacherLayout from './pages/teacher/TeacherLayout';
// import Teachers from './pages/public/Teachers';
// import ForgotPassword from './pages/auth/ForgotPassword';

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
//       {/* Public */}
//       <Route path="/" element={<PL><Home /></PL>} />
//       <Route path="/about" element={<PL><About /></PL>} />
//       <Route path="/courses" element={<PL><Courses /></PL>} />
//       <Route path="/notes" element={<PL><NotesStore /></PL>} />
//       <Route path="/results" element={<PL><Results /></PL>} />
//       <Route path="/contact" element={<PL><Contact /></PL>} />
//       <Route path="/gallery" element={<PL><Gallery /></PL>} />
//       <Route path="/teachers" element={<PL><Teachers /></PL>} />
//       <Route path="/forgot-password" element={<ForgotPassword />} />

//       {/* Auth */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/forgot-password" element={<ForgotPassword onLoginClick={() => navigate('/login')} />} />

//       {/* Student Portal */}
//       <Route path="/dashboard/*" element={
//         <ProtectedRoute role="student">
//           <StudentDashboard />
//         </ProtectedRoute>
//       } />
//       {/* Teachers Portal */}
//       <Route path="/teacher/*" element={
//         <ProtectedRoute role="teacher">
//           <TeacherLayout />
//         </ProtectedRoute>
//       } />
//       console.log(import.meta.env.VITE_API_URL);
//       {/* Admin Panel */}
//       <Route path="/admin/*" element={
//         <ProtectedRoute role="admin">
//           <AdminLayout />
//         </ProtectedRoute>
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
import Teachers from './pages/public/Teachers';

// Auth pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// Dashboards
import StudentDashboard from './pages/student/Dashboard';
import AdminLayout from './pages/admin/AdminLayout';
import TeacherLayout from './pages/teacher/TeacherLayout';

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

      {/* Auth Pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Student Portal */}
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute role="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

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