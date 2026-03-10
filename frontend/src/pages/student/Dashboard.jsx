import { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

// locked: true  → only enrolled students can access
// locked: false → all students (enrolled or not) can access
const NAV_ITEMS = [
  { to: '',            icon: '🏠', label: 'Overview',    locked: false },
  { to: 'attendance',  icon: '📅', label: 'Attendance',  locked: true  },
  { to: 'marks',       icon: '📊', label: 'My Marks',    locked: true  },
  { to: 'assignments', icon: '📝', label: 'Assignments', locked: true  },
  { to: 'doubts',      icon: '💬', label: 'Ask Doubt',   locked: true  },
  { to: 'notices',     icon: '📢', label: 'Notices',     locked: false }, // ✅ unlocked for all students
  { to: 'notes',       icon: '📚', label: 'Notes',       locked: false },
  { to: 'profile',     icon: '👤', label: 'My Profile',  locked: false },
];

function Sidebar({ onClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isEnrolled = user?.isEnrolled;

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div className="flex flex-col h-full bg-[#080c1e] border-r border-white/8">

      {/* Brand */}
      <div className="p-5 border-b border-white/8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm border-2 flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg,#1a2f6e,#0d1a40)',
                borderColor: 'rgba(245,200,66,0.5)',
                color: '#f5c842',
              }}>
              A1
            </div>
            <div>
              <p className="font-black text-white text-sm leading-tight">Student Panel</p>
              <p className="text-gray-500 text-[10px] truncate max-w-[110px]">
                {user?.name || 'Student'}
              </p>
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-white lg:hidden text-lg">
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Enrollment badge */}
      <div className="px-4 pt-4 pb-2">
        <div className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-black tracking-wider uppercase border ${
          isEnrolled
            ? 'bg-green-900/20 border-green-700/30 text-green-400'
            : 'bg-yellow-900/20 border-yellow-700/30 text-yellow-400'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse ${
            isEnrolled ? 'bg-green-400' : 'bg-yellow-400'
          }`} />
          {isEnrolled ? `Enrolled · Class ${user?.class}` : 'Not Enrolled'}
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
        {NAV_ITEMS.map(item => {
          const isLocked = item.locked && !isEnrolled;
          const fullPath = `/dashboard${item.to ? `/${item.to}` : ''}`;

          if (isLocked) {
            return (
              <div
                key={item.to}
                className="flex items-center justify-between px-4 py-2.5 rounded-xl text-gray-600 cursor-not-allowed select-none">
                <div className="flex items-center gap-3">
                  <span className="text-base opacity-40">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </div>
                <span className="text-xs opacity-60">🔒</span>
              </div>
            );
          }

          return (
            <NavLink
              key={item.to}
              to={fullPath}
              end={item.to === ''}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-royal text-white font-bold shadow-lg shadow-royal/20'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`
              }>
              <div className="flex items-center gap-3">
                <span className="text-base">{item.icon}</span>
                <span>{item.label}</span>
              </div>
              <span className="text-gray-600 text-xs">›</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-white/8">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-red-400 hover:bg-red-900/20 transition-colors text-sm font-medium">
          <span className="text-base">↩</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#06091a]">

      {/* ── Desktop sidebar ─────────────────────── */}
      <aside className="hidden lg:flex w-60 flex-col fixed top-0 left-0 h-screen z-30">
        <Sidebar />
      </aside>

      {/* ── Mobile top bar ──────────────────────── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 h-14 bg-[#080c1e] border-b border-white/8 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs border"
            style={{
              background: '#0d1a40',
              borderColor: 'rgba(245,200,66,0.4)',
              color: '#f5c842',
            }}>
            A1
          </div>
          <span className="font-black text-white text-sm">Student Panel</span>
        </div>
        <button
          onClick={() => setMobileOpen(true)}
          className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white">
          ☰
        </button>
      </div>

      {/* ── Mobile drawer ───────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/60 z-40"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -260 }}
              animate={{ x: 0 }}
              exit={{ x: -260 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="lg:hidden fixed top-0 left-0 h-screen w-60 z-50">
              <Sidebar onClose={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main content ────────────────────────── */}
      <main className="flex-1 lg:ml-60 min-h-screen">
        <div className="pt-14 lg:pt-0 p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>

    </div>
  );
}