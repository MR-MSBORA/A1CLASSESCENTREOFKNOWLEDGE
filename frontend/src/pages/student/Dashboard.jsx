import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

export default function Dashboard() {
  const { user }               = useAuth();
  const [stats,   setStats]    = useState(null);
  const [notices, setNotices]  = useState([]);

  useEffect(() => {
    api.get('/student/announcements')
      .then(r => setNotices(r.data.data?.slice(0, 3) || []))
      .catch(() => {});
  }, []);

  const isEnrolled = user?.isEnrolled;

  const enrolledLinks = [
    { to: '/dashboard/attendance',  icon: '📅', label: 'Attendance'  },
    { to: '/dashboard/marks',       icon: '📊', label: 'My Marks'    },
    { to: '/dashboard/assignments', icon: '📝', label: 'Assignments' },
    { to: '/dashboard/doubts',      icon: '💬', label: 'Ask Doubt'   },
    { to: '/dashboard/notices',     icon: '📢', label: 'Notices'     },
    { to: '/dashboard/notes',       icon: '📚', label: 'Notes'       },
  ];

  const freeLinks = [
    { to: '/dashboard/notes',   icon: '📚', label: 'Browse Notes' },
    { to: '/dashboard/profile', icon: '👤', label: 'My Profile'   },
  ];

  return (
    <div className="pt-16 lg:pt-0">
      <div className="mb-8">
        <h1 className="font-display text-2xl sm:text-3xl font-black text-white">
          Welcome, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          {isEnrolled ? 'Student Portal — A1 Classes' : 'Guest Access — A1 Classes'}
        </p>
      </div>

      {/* Not Enrolled Banner */}
      {!isEnrolled && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 p-5 rounded-2xl bg-yellow-900/20 border border-yellow-700/30">
          <div className="flex items-start gap-4 flex-wrap">
            <div className="flex-1">
              <p className="text-yellow-400 font-bold text-base">
                ⚠️ You are not enrolled yet
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Contact A1 Classes to get enrolled and unlock attendance,
                marks, assignments, doubts and more.
              </p>
            </div>
            <a href="tel:+91XXXXXXXXXX"
              className="px-5 py-2.5 rounded-xl bg-gold text-[#06091a] font-bold text-sm flex-shrink-0 hover:bg-gold-light transition-colors">
              📞 Contact Us
            </a>
          </div>
        </motion.div>
      )}

      {/* Enrolled Badge */}
      {isEnrolled && (
        <div className="mb-6 flex items-center gap-3 p-4 rounded-xl bg-green-900/20 border border-green-700/30">
          <span className="text-2xl">✅</span>
          <div>
            <p className="text-green-400 font-bold text-sm">Enrolled Student</p>
            <p className="text-gray-400 text-xs">
              Class {user?.class} · Full access active
            </p>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <h2 className="font-bold text-white text-lg mb-4">
        {isEnrolled ? 'Quick Actions' : 'Available Features'}
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
        {(isEnrolled ? enrolledLinks : freeLinks).map(q => (
          <Link key={q.to} to={q.to}
            className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-gold/30 hover:bg-white/10 transition-all text-center group">
            <p className="text-3xl mb-2">{q.icon}</p>
            <p className="text-xs font-semibold text-gray-300 group-hover:text-gold transition-colors">
              {q.label}
            </p>
          </Link>
        ))}

        {/* Locked features for non-enrolled */}
        {!isEnrolled && (
          <>
            {[
              { icon: '📅', label: 'Attendance' },
              { icon: '📊', label: 'My Marks'   },
              { icon: '📝', label: 'Assignments' },
              { icon: '💬', label: 'Ask Doubt'  },
            ].map(q => (
              <div key={q.label}
                className="p-5 rounded-xl bg-white/5 border border-white/10 text-center opacity-40 cursor-not-allowed relative">
                <p className="text-3xl mb-2">{q.icon}</p>
                <p className="text-xs font-semibold text-gray-500">{q.label}</p>
                <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/40">
                  <span className="text-lg">🔒</span>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Notices — only for enrolled */}
      {isEnrolled && notices.length > 0 && (
        <div>
          <h2 className="font-bold text-white text-lg mb-4">Latest Notices</h2>
          <div className="space-y-3">
            {notices.map(n => (
              <div key={n._id}
                className={`p-4 rounded-xl border ${
                  n.isImportant
                    ? 'bg-red-900/20 border-red-700/30'
                    : 'bg-white/5 border-white/10'
                }`}>
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  {n.isImportant && (
                    <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-bold">
                      IMPORTANT
                    </span>
                  )}
                  <p className="font-semibold text-white text-sm">{n.title}</p>
                </div>
                <p className="text-xs text-gray-400">{n.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}