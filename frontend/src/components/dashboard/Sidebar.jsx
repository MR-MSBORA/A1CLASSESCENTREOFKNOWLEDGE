//  import { NavLink, useNavigate } from 'react-router-dom';
// import {
//   LayoutDashboard, BookOpen, BarChart2,
//   ClipboardList, HelpCircle, Bell,
//   User, LogOut, ChevronRight
// } from 'lucide-react';
// import { useAuth } from '../../context/AuthContext';
// import toast from 'react-hot-toast';

// const links = [
//   { to: '/dashboard',             icon: LayoutDashboard, label: 'Dashboard'   },
//   { to: '/dashboard/notes',       icon: BookOpen,        label: 'My Notes'    },
//   { to: '/dashboard/marks',       icon: BarChart2,       label: 'My Marks'    },
//   { to: '/dashboard/attendance',  icon: ClipboardList,   label: 'Attendance'  },
//   { to: '/dashboard/assignments', icon: ClipboardList,   label: 'Assignments' },
//   { to: '/dashboard/doubts',      icon: HelpCircle,      label: 'Doubts'      },
//   { to: '/dashboard/notices',     icon: Bell,            label: 'Notices'     },
//   { to: '/dashboard/profile',     icon: User,            label: 'Profile'     },
// ];

// export default function Sidebar() {
//   const { user, logout } = useAuth();
//   const navigate         = useNavigate();

//   const handleLogout = async () => {
//     await logout();
//     toast.success('Logged out successfully');
//     navigate('/');
//   };

//   return (
//     <aside className="w-64 min-h-screen bg-[#0a0f20] border-r border-white/10 flex flex-col flex-shrink-0">

//       {/* Logo */}
//       <div className="p-6 border-b border-white/10">
//         <div className="flex items-center gap-3">
//           <div className="w-9 h-9 rounded-xl bg-royal flex items-center justify-center font-mono font-bold text-gold text-xs">
//             A1
//           </div>
//           <div>
//             <p className="font-display font-black text-sm text-white leading-none">A1 Portal</p>
//             <p className="text-[10px] text-gray-500 mt-0.5 truncate max-w-[120px]">{user?.name}</p>
//           </div>
//         </div>
//       </div>

//       {/* Class Badge */}
//       {user?.class > 0 && (
//         <div className="mx-4 mt-4 px-4 py-2 rounded-xl bg-royal/10 border border-royal/20">
//           <p className="text-xs text-gray-400">Enrolled in</p>
//           <p className="text-sm font-bold text-gold">Class {user?.class}</p>
//         </div>
//       )}

//       {/* Nav */}
//       <nav className="flex-1 p-4 space-y-1 mt-2">
//         {links.map(({ to, icon: Icon, label }) => (
//           <NavLink key={to} to={to} end={to === '/dashboard'}
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
//                 isActive
//                   ? 'bg-royal text-white shadow-lg shadow-royal/30'
//                   : 'text-gray-400 hover:bg-white/5 hover:text-white'
//               }`
//             }>
//             <Icon size={16} />
//             <span className="flex-1">{label}</span>
//             <ChevronRight size={14} className="opacity-30" />
//           </NavLink>
//         ))}
//       </nav>

//       {/* Logout */}
//       <div className="p-4 border-t border-white/10">
//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-900/20 w-full transition-colors">
//           <LogOut size={16} />
//           Logout
//         </button>
//       </div>
//     </aside>
//   );
// }



import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, BookOpen, BarChart2,
  ClipboardList, HelpCircle, Bell,
  User, LogOut, ChevronRight, Menu, X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const links = [
  { to: '/dashboard',             icon: LayoutDashboard, label: 'Dashboard',   end: true },
  { to: '/dashboard/notes',       icon: BookOpen,        label: 'My Notes'              },
  { to: '/dashboard/marks',       icon: BarChart2,       label: 'My Marks'              },
  { to: '/dashboard/attendance',  icon: ClipboardList,   label: 'Attendance'            },
  { to: '/dashboard/assignments', icon: ClipboardList,   label: 'Assignments'           },
  { to: '/dashboard/doubts',      icon: HelpCircle,      label: 'Doubts'                },
  { to: '/dashboard/notices',     icon: Bell,            label: 'Notices'               },
  { to: '/dashboard/profile',     icon: User,            label: 'Profile'               },
];

function SidebarContent({ onClose }) {
  const { user, logout } = useAuth();
  const navigate         = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success('Logged out');
    navigate('/');
  };

  return (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-5 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-royal flex items-center justify-center font-mono font-bold text-gold text-xs">
            A1
          </div>
          <div>
            <p className="font-display font-black text-sm text-white leading-none">A1 Portal</p>
            <p className="text-[10px] text-gray-500 mt-0.5 truncate max-w-[100px]">{user?.name}</p>
          </div>
        </div>
        {onClose && (
          <button onClick={onClose} className="lg:hidden p-1 text-gray-400">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Class Badge */}
      {user?.class > 0 && (
        <div className="mx-4 mt-4 px-4 py-2 rounded-xl bg-royal/10 border border-royal/20">
          <p className="text-xs text-gray-400">Enrolled in</p>
          <p className="text-sm font-bold text-gold">Class {user?.class}</p>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 p-4 space-y-1 mt-2 overflow-y-auto">
        {links.map(({ to, icon: Icon, label, end }) => (
          <NavLink key={to} to={to} end={end}
            onClick={onClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-royal text-white shadow-lg shadow-royal/30'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`
            }>
            <Icon size={16} />
            <span className="flex-1">{label}</span>
            <ChevronRight size={14} className="opacity-30" />
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/10">
        <button onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-900/20 w-full transition-colors">
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
}

export default function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-[#0a0f20] border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-royal flex items-center justify-center font-mono font-bold text-gold text-xs">
            A1
          </div>
          <span className="font-display font-black text-sm text-white">Student Portal</span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg bg-white/5 border border-white/10 text-white">
          <Menu size={18} />
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-[#0a0f20] z-50 shadow-2xl">
              <SidebarContent onClose={() => setMobileOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 min-h-screen bg-[#0a0f20] border-r border-white/10 flex-col flex-shrink-0">
        <SidebarContent />
      </aside>
    </>
  );
}