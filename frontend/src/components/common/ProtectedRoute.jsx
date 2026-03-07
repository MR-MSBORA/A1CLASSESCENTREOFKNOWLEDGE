// import { Navigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// export default function ProtectedRoute({ children, role }) {
//   const { user, loading } = useAuth();

//   if (loading) return (
//     <div className="min-h-screen flex items-center justify-center bg-[#06091a]">
//       <div className="w-10 h-10 border-4 border-royal rounded-full border-t-transparent animate-spin" />
//     </div>
//   );

//   if (!user) return <Navigate to="/login" replace />;

//   // superadmin can access everything
//   if (user.role === 'superadmin') return children;

//   // admin can access admin panel
//   if (role === 'admin' && user.role === 'admin') return children;

//   // student can access student portal
//   if (role === 'student' && user.role === 'student') return children;

//   // wrong role — redirect accordingly
//   if (user.role === 'admin' || user.role === 'superadmin') {
//     return <Navigate to="/admin" replace />;
//   }
//   return <Navigate to="/dashboard" replace />;
// }



import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#06091a]">
      <div className="w-10 h-10 border-4 border-royal rounded-full border-t-transparent animate-spin" />
    </div>
  );

  if (!user) return <Navigate to="/login" replace />;

  // superadmin can go anywhere
  if (user.role === 'superadmin') return children;

  // admin can access admin panel
  if (role === 'admin' && user.role === 'admin') return children;

  // teacher can access teacher panel
  if (role === 'teacher' && user.role === 'teacher') return children;

  // student can access student portal
  if (role === 'student' && user.role === 'student') return children;

  // wrong role — redirect to correct place
  if (user.role === 'admin')   return <Navigate to="/admin"     replace />;
  if (user.role === 'teacher') return <Navigate to="/teacher"   replace />;
  return                              <Navigate to="/dashboard"  replace />;
}