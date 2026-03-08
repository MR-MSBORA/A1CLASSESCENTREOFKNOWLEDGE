import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.4, delay },
});

export default function Dashboard() {
  const { user, refreshUser } = useAuth();
  const [notices,    setNotices]    = useState([]);
  const [attendance, setAttendance] = useState(null);
  const [marks,      setMarks]      = useState([]);
  const [loading,    setLoading]    = useState(true);

  const isEnrolled = user?.isEnrolled;

  useEffect(() => {
    refreshUser();
    const fetchData = async () => {
      try {
        const [n, a, m] = await Promise.allSettled([
          api.get('/student/announcements'),
          api.get('/student/attendance'),
          api.get('/student/marks'),
        ]);
        if (n.status === 'fulfilled') setNotices(n.value.data.data?.slice(0, 4) || []);
        if (a.status === 'fulfilled') setAttendance(a.value.data.data);
        if (m.status === 'fulfilled') setMarks(m.value.data.data || []);
      } catch {}
      setLoading(false);
    };
    fetchData();
  }, []);

  const attendancePct = attendance?.percentage || 0;
  const attendanceColor =
    attendancePct >= 75 ? 'text-green-400' :
    attendancePct >= 50 ? 'text-yellow-400' : 'text-red-400';

  const attendanceBg =
    attendancePct >= 75 ? 'bg-green-500' :
    attendancePct >= 50 ? 'bg-yellow-500' : 'bg-red-500';

  const allLinks = [
    { to: '/dashboard/attendance',  icon: '📅', label: 'Attendance',  color: 'from-blue-900/40 to-blue-800/20',   border: 'border-blue-700/30',   free: false },
    { to: '/dashboard/marks',       icon: '📊', label: 'My Marks',    color: 'from-purple-900/40 to-purple-800/20', border: 'border-purple-700/30', free: false },
    { to: '/dashboard/assignments', icon: '📝', label: 'Assignments', color: 'from-orange-900/40 to-orange-800/20', border: 'border-orange-700/30', free: false },
    { to: '/dashboard/doubts',      icon: '💬', label: 'Ask Doubt',   color: 'from-teal-900/40 to-teal-800/20',   border: 'border-teal-700/30',   free: false },
    { to: '/dashboard/notices',     icon: '📢', label: 'Notices',     color: 'from-red-900/40 to-red-800/20',     border: 'border-red-700/30',    free: false },
    { to: '/dashboard/notes',       icon: '📚', label: 'Notes',       color: 'from-green-900/40 to-green-800/20', border: 'border-green-700/30',  free: true  },
    { to: '/dashboard/profile',     icon: '👤', label: 'My Profile',  color: 'from-gray-900/40 to-gray-800/20',   border: 'border-gray-700/30',   free: true  },
  ];

  const greetingTime = () => {
    const h = new Date().getHours();
    if (h < 12) return 'Good morning';
    if (h < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="pt-16 lg:pt-0 pb-10">

      {/* ── Hero Header ───────────────────────────── */}
      <motion.div {...fadeUp(0)} className="relative mb-8 p-6 rounded-2xl overflow-hidden bg-gradient-to-r from-royal/30 via-[#0c1229] to-[#06091a] border border-white/10">
        {/* decorative circles */}
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-gold/5 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-royal/20 blur-2xl pointer-events-none" />

        <div className="relative flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-gold text-xs font-bold tracking-widest uppercase mb-1">{greetingTime()}</p>
            <h1 className="font-display text-2xl sm:text-3xl font-black text-white">
              {user?.name?.split(' ')[0]} 👋
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              {isEnrolled
                ? `Class ${user?.class} · ${user?.enrolledBatch || 'A1 Classes'}`
                : 'Guest Access — A1 Classes'}
            </p>
          </div>

          {/* Avatar */}
          <div className="w-16 h-16 rounded-2xl bg-royal flex items-center justify-center font-black text-2xl text-gold border-2 border-gold/30 shadow-lg shadow-royal/30 flex-shrink-0">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>
        </div>
      </motion.div>

      {/* ── Not Enrolled Banner ───────────────────── */}
      {!isEnrolled && (
        <motion.div {...fadeUp(0.1)}
          className="mb-8 p-5 rounded-2xl bg-yellow-900/20 border border-yellow-700/30">
          <div className="flex items-start gap-4 flex-wrap">
            <div className="flex-1">
              <p className="text-yellow-400 font-bold text-base">⚠️ You are not enrolled yet</p>
              <p className="text-gray-400 text-sm mt-1">
                Contact A1 Classes to get enrolled and unlock attendance, marks, assignments and more.
              </p>
            </div>
            <a href="tel:+911234567890"
              className="px-5 py-2.5 rounded-xl bg-gold text-[#06091a] font-bold text-sm flex-shrink-0 hover:opacity-90 transition-opacity">
              📞 Contact Us
            </a>
          </div>
        </motion.div>
      )}

      {/* ── Stats Row (enrolled only) ─────────────── */}
      {isEnrolled && (
        <motion.div {...fadeUp(0.1)} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

          {/* Attendance */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-transparent pointer-events-none" />
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Attendance</p>
            <p className={`font-black text-3xl ${attendanceColor}`}>{attendancePct}%</p>
            <div className="mt-3 h-1.5 rounded-full bg-white/10">
              <div className={`h-full rounded-full ${attendanceBg} transition-all duration-700`}
                style={{ width: `${Math.min(attendancePct, 100)}%` }} />
            </div>
          </div>

          {/* Class */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent pointer-events-none" />
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Class</p>
            <p className="font-black text-3xl text-gold">{user?.class ? `${user.class}th` : 'N/A'}</p>
            <p className="text-xs text-gray-500 mt-3">{user?.branch || 'A1 Classes'}</p>
          </div>

          {/* Exams */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-transparent pointer-events-none" />
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Exams Done</p>
            <p className="font-black text-3xl text-green-400">{marks.length}</p>
            <p className="text-xs text-gray-500 mt-3">Results recorded</p>
          </div>

          {/* Fee */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-br ${
              user?.feeStatus === 'paid' ? 'from-green-900/20' :
              user?.feeStatus === 'partial' ? 'from-yellow-900/20' :
              'from-red-900/20'} to-transparent pointer-events-none`} />
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Fee Status</p>
            <p className={`font-black text-2xl capitalize ${
              user?.feeStatus === 'paid'    ? 'text-green-400' :
              user?.feeStatus === 'partial' ? 'text-yellow-400' : 'text-red-400'
            }`}>
              {user?.feeStatus || 'Unpaid'}
            </p>
            <p className="text-xs text-gray-500 mt-3">{user?.enrolledBatch || '—'}</p>
          </div>

        </motion.div>
      )}

      {/* ── Quick Actions Grid ────────────────────── */}
      <motion.div {...fadeUp(0.2)} className="mb-8">
        <h2 className="font-bold text-white text-base mb-4 flex items-center gap-2">
          <span className="w-1 h-5 rounded-full bg-gold inline-block" />
          {isEnrolled ? 'Quick Actions' : 'Available Features'}
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {allLinks.map((q, i) => {
            const accessible = isEnrolled || q.free;
            return (
              <motion.div key={q.to}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.05 }}>
                {accessible ? (
                  <Link to={q.to}
                    className={`flex flex-col items-center gap-3 p-5 rounded-2xl bg-gradient-to-br ${q.color} border ${q.border} hover:scale-[1.03] hover:brightness-110 transition-all text-center group`}>
                    <span className="text-3xl group-hover:scale-110 transition-transform">{q.icon}</span>
                    <span className="text-xs font-bold text-gray-300 group-hover:text-white transition-colors">{q.label}</span>
                  </Link>
                ) : (
                  <div className={`flex flex-col items-center gap-3 p-5 rounded-2xl bg-gradient-to-br ${q.color} border ${q.border} text-center relative overflow-hidden opacity-60`}>
                    <span className="text-3xl">{q.icon}</span>
                    <span className="text-xs font-bold text-gray-500">{q.label}</span>
                    <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-black/60 backdrop-blur-[2px]">
                      <span className="text-lg">🔒</span>
                      <span className="text-[10px] text-gray-400 font-semibold mt-1">Enroll to unlock</span>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* ── Bottom Row: Notices + Recent Marks ───── */}
      {isEnrolled && (
        <motion.div {...fadeUp(0.35)} className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Notices */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-white text-sm flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-red-400 inline-block" />
                Latest Notices
              </h2>
              <Link to="/dashboard/notices" className="text-xs text-gold hover:underline">View all →</Link>
            </div>
            {notices.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-3xl mb-2">📭</p>
                <p className="text-gray-500 text-sm">No notices yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {notices.map(n => (
                  <div key={n._id}
                    className={`p-3 rounded-xl border text-sm ${
                      n.isImportant
                        ? 'bg-red-900/20 border-red-700/30'
                        : 'bg-white/5 border-white/10'
                    }`}>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      {n.isImportant && (
                        <span className="text-[10px] bg-red-500 text-white px-2 py-0.5 rounded-full font-bold">
                          IMPORTANT
                        </span>
                      )}
                      <p className="font-semibold text-white text-xs">{n.title}</p>
                    </div>
                    <p className="text-gray-400 text-xs line-clamp-2">{n.content}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Marks */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-white text-sm flex items-center gap-2">
                <span className="w-1 h-4 rounded-full bg-purple-400 inline-block" />
                Recent Results
              </h2>
              <Link to="/dashboard/marks" className="text-xs text-gold hover:underline">View all →</Link>
            </div>
            {marks.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-3xl mb-2">📝</p>
                <p className="text-gray-500 text-sm">No results yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {marks.slice(0, 4).map(m => {
                  const pct = m.totalMarks ? Math.round((m.marksObtained / m.totalMarks) * 100) : 0;
                  const color = pct >= 75 ? 'text-green-400' : pct >= 50 ? 'text-yellow-400' : 'text-red-400';
                  return (
                    <div key={m._id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10">
                      <div>
                        <p className="text-white text-xs font-semibold">{m.subject}</p>
                        <p className="text-gray-500 text-[10px]">{m.exam || 'Exam'}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-black text-sm ${color}`}>{m.marksObtained}/{m.totalMarks}</p>
                        <p className={`text-[10px] ${color}`}>{pct}%</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </motion.div>
      )}

    </div>
  );
}