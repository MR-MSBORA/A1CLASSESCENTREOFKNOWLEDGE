// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import api from '../../services/api';
// import { useAuth } from '../../context/AuthContext';
// import { motion } from 'framer-motion';

// const fadeUp = (delay = 0) => ({
//   initial:    { opacity: 0, y: 20 },
//   animate:    { opacity: 1, y: 0  },
//   transition: { duration: 0.4, delay },
// });

// export default function Dashboard() {
//   const { user, refreshUser } = useAuth();
//   const [attendance, setAttendance] = useState(null);
//   const [marks,      setMarks]      = useState([]);
//   const [notices,    setNotices]    = useState([]);

//   const isEnrolled = user?.isEnrolled;

//   useEffect(() => {
//     refreshUser();
//     api.get('/student/announcements')
//       .then(r => setNotices(r.data.data?.slice(0, 3) || []))
//       .catch(() => {});
//     if (isEnrolled) {
//       api.get('/student/attendance').then(r => setAttendance(r.data.data)).catch(() => {});
//       api.get('/student/marks').then(r => setMarks(r.data.data || [])).catch(() => {});
//     }
//   }, [isEnrolled]);

//   const attendancePct = Number(attendance?.percentage || 0);
//   const attendanceColor =
//     attendancePct >= 75 ? 'text-green-400' :
//     attendancePct >= 50 ? 'text-yellow-400' : 'text-red-400';

//   const greet = () => {
//     const h = new Date().getHours();
//     if (h < 12) return 'Good morning';
//     if (h < 17) return 'Good afternoon';
//     return 'Good evening';
//   };

//   // ── Stat cards (enrolled only) ──────────────────────────────
//   const cards = [
//     {
//       label: 'Attendance',
//       value: `${attendancePct}%`,
//       icon:  '📅',
//       color: 'bg-royal',
//       sub:   attendancePct >= 75 ? '✅ Good standing' : attendancePct > 0 ? '⚠️ Needs improvement' : 'No data yet',
//     },
//     {
//       label: 'My Class',
//       value: user?.class ? `Class ${user.class}` : 'N/A',
//       icon:  '🏫',
//       color: 'bg-yellow-900/50 border border-yellow-700/30',
//       sub:   user?.branch || 'A1 Classes',
//     },
//     {
//       label: 'Exams Done',
//       value: marks.length,
//       icon:  '📝',
//       color: 'bg-green-900/50 border border-green-700/30',
//       sub:   marks.length > 0 ? `Last: ${marks[0]?.subject || '—'}` : 'No exams yet',
//     },
//     {
//       label: 'Fee Status',
//       value: user?.feeStatus ? user.feeStatus.charAt(0).toUpperCase() + user.feeStatus.slice(1) : 'Unpaid',
//       icon:  user?.feeStatus === 'paid' ? '✅' : user?.feeStatus === 'partial' ? '⚠️' : '❌',
//       color: user?.feeStatus === 'paid'
//         ? 'bg-green-900/50 border border-green-700/30'
//         : user?.feeStatus === 'partial'
//         ? 'bg-yellow-900/50 border border-yellow-700/30'
//         : 'bg-red-900/50 border border-red-700/30',
//       sub: user?.enrolledBatch || '—',
//     },
//   ];

//   // ── Quick action links ───────────────────────────────────────
//   const quickLinks = [
//     { to: '/dashboard/attendance',  icon: '📅', label: 'My Attendance', locked: !isEnrolled },
//     { to: '/dashboard/marks',       icon: '📊', label: 'My Marks',      locked: !isEnrolled },
//     { to: '/dashboard/assignments', icon: '📝', label: 'Assignments',   locked: !isEnrolled },
//     { to: '/dashboard/doubts',      icon: '💬', label: 'Ask a Doubt',   locked: !isEnrolled },
//     { to: '/dashboard/notices',     icon: '📢', label: 'Notices',       locked: !isEnrolled },
//     { to: '/dashboard/notes',       icon: '📚', label: 'Browse Notes',  locked: false       },
//     { to: '/dashboard/profile',     icon: '👤', label: 'My Profile',    locked: false       },
//   ];

//   return (
//     <div>

//       {/* ── Header ──────────────────────────────────── */}
//       <motion.div {...fadeUp(0)} className="mb-8">
//         <p className="text-gold text-xs font-bold tracking-widest uppercase mb-1">{greet()}</p>
//         <h1 className="font-display text-3xl font-black text-white">
//           Welcome, {user?.name?.split(' ')[0]} 👋
//         </h1>
//         <p className="text-gray-400 text-sm mt-1">
//           {isEnrolled
//             ? `Student Dashboard — A1 Classes`
//             : 'Guest Access — A1 Classes'}
//         </p>
//       </motion.div>

//       {/* ── Not Enrolled Banner ──────────────────────── */}
//       {!isEnrolled && (
//         <motion.div {...fadeUp(0.05)}
//           className="mb-8 p-5 rounded-2xl bg-yellow-900/20 border border-yellow-700/30 flex items-start gap-4 flex-wrap">
//           <div className="flex-1">
//             <p className="text-yellow-400 font-bold">⚠️ You are not enrolled yet</p>
//             <p className="text-gray-400 text-sm mt-1">
//               Contact A1 Classes to get enrolled and unlock attendance, marks, assignments and more.
//             </p>
//           </div>
//           <a href="tel:+911234567890"
//             className="px-5 py-2.5 rounded-xl bg-gold text-[#06091a] font-bold text-sm hover:opacity-90 transition-opacity flex-shrink-0">
//             📞 Contact Us
//           </a>
//         </motion.div>
//       )}

//       {/* ── Stat Cards (enrolled only) ──────────────── */}
//       {isEnrolled && (
//         <motion.div {...fadeUp(0.1)}
//           className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
//           {cards.map(c => (
//             <div key={c.label} className={`${c.color} p-6 rounded-2xl`}>
//               <p className="text-3xl mb-3">{c.icon}</p>
//               <p className="font-mono font-black text-3xl text-white">{c.value}</p>
//               <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">{c.label}</p>
//               <p className="text-xs text-gray-500 mt-1">{c.sub}</p>
//             </div>
//           ))}
//         </motion.div>
//       )}

//       {/* ── Quick Actions ────────────────────────────── */}
//       <motion.div {...fadeUp(isEnrolled ? 0.2 : 0.1)}>
//         <h2 className="font-bold text-white text-lg mb-4">
//           {isEnrolled ? 'Quick Actions' : 'Available Features'}
//         </h2>
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
//           {quickLinks.map((q, i) => (
//             <motion.div key={q.to}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.15 + i * 0.05 }}
//               className="relative">
//               {!q.locked ? (
//                 <Link to={q.to}
//                   className="flex flex-col items-center p-5 rounded-xl bg-white/5 border border-white/10 hover:border-gold/30 hover:bg-white/10 transition-all text-center group">
//                   <p className="text-3xl mb-2 group-hover:scale-110 transition-transform">{q.icon}</p>
//                   <p className="text-xs font-semibold text-gray-300 group-hover:text-gold transition-colors">
//                     {q.label}
//                   </p>
//                 </Link>
//               ) : (
//                 <div className="flex flex-col items-center p-5 rounded-xl bg-white/5 border border-white/10 text-center relative overflow-hidden">
//                   <p className="text-3xl mb-2 opacity-40">{q.icon}</p>
//                   <p className="text-xs font-semibold text-gray-600">{q.label}</p>
//                   <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl bg-black/60 backdrop-blur-[2px]">
//                     <p className="text-xl">🔒</p>
//                     <p className="text-[10px] text-gray-400 font-semibold mt-1">Enroll to unlock</p>
//                   </div>
//                 </div>
//               )}
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>

//       {/* ── Bottom: Notices + Recent Marks (enrolled) ── */}
//       {isEnrolled && (
//         <motion.div {...fadeUp(0.3)}
//           className="grid grid-cols-1 lg:grid-cols-2 gap-6">

//           {/* Notices */}
//           <div>
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="font-bold text-white text-lg">📢 Latest Notices</h2>
//               <Link to="/dashboard/notices" className="text-xs text-gold hover:underline">View all →</Link>
//             </div>
//             {notices.length === 0 ? (
//               <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center">
//                 <p className="text-gray-500 text-sm">No notices yet</p>
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 {notices.map(n => (
//                   <div key={n._id}
//                     className={`p-4 rounded-xl border ${
//                       n.isImportant
//                         ? 'bg-red-900/20 border-red-700/30'
//                         : 'bg-white/5 border-white/10'
//                     }`}>
//                     <div className="flex items-center gap-2 mb-1 flex-wrap">
//                       {n.isImportant && (
//                         <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-bold">
//                           IMPORTANT
//                         </span>
//                       )}
//                       <p className="font-semibold text-white text-sm">{n.title}</p>
//                     </div>
//                     <p className="text-gray-400 text-xs line-clamp-2">{n.content}</p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Recent Marks */}
//           <div>
//             <div className="flex items-center justify-between mb-4">
//               <h2 className="font-bold text-white text-lg">📊 Recent Results</h2>
//               <Link to="/dashboard/marks" className="text-xs text-gold hover:underline">View all →</Link>
//             </div>
//             {marks.length === 0 ? (
//               <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center">
//                 <p className="text-gray-500 text-sm">No results yet</p>
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 {marks.slice(0, 3).map(m => {
//                   const pct = m.totalMarks ? Math.round((m.marksObtained / m.totalMarks) * 100) : 0;
//                   const col = pct >= 75 ? 'text-green-400' : pct >= 50 ? 'text-yellow-400' : 'text-red-400';
//                   const bar = pct >= 75 ? 'bg-green-500' : pct >= 50 ? 'bg-yellow-500' : 'bg-red-500';
//                   return (
//                     <div key={m._id}
//                       className="p-4 rounded-xl bg-white/5 border border-white/10">
//                       <div className="flex items-center justify-between mb-2">
//                         <div>
//                           <p className="text-white text-sm font-semibold">{m.subject}</p>
//                           <p className="text-gray-500 text-xs">{m.exam || 'Exam'}</p>
//                         </div>
//                         <div className="text-right">
//                           <p className={`font-black text-lg ${col}`}>{m.marksObtained}/{m.totalMarks}</p>
//                           <p className={`text-xs ${col}`}>{pct}%</p>
//                         </div>
//                       </div>
//                       <div className="h-1.5 rounded-full bg-white/10">
//                         <div className={`h-full rounded-full ${bar}`} style={{ width: `${pct}%` }} />
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>

//         </motion.div>
//       )}

//     </div>
//   );
// }




import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

/* ─── helpers ───────────────────────────────────────────────── */
const stagger = (i) => ({
  initial:    { opacity: 0, y: 24 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
});

function RadialProgress({ pct = 0, size = 96, stroke = 8, color = '#f5c842' }) {
  const r    = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ}
        strokeDashoffset={circ - (Math.min(pct,100) / 100) * circ}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.22,1,0.36,1)' }} />
    </svg>
  );
}

function Bar({ pct = 0, color = '#f5c842' }) {
  return (
    <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
      <motion.div className="h-full rounded-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(pct, 100)}%` }}
        transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }} />
    </div>
  );
}

/* ─── main ──────────────────────────────────────────────────── */
export default function Dashboard() {
  const { user, refreshUser } = useAuth();
  const [attendance, setAttendance] = useState(null);
  const [marks,      setMarks]      = useState([]);
  const [notices,    setNotices]    = useState([]);
  const [tipIdx,     setTipIdx]     = useState(0);

  const isEnrolled = user?.isEnrolled;

  const TIPS = [
    '🔥 Consistency beats talent. Show up every day.',
    '📖 Review notes within 24 hrs to retain 80% more.',
    '🎯 Top students study their mistakes, not just their wins.',
    '⏰ Study in 25-min focused bursts for peak efficiency.',
    '💡 Teaching a concept to someone else cements it for you.',
  ];

  useEffect(() => {
    refreshUser();
    api.get('/student/announcements').then(r => setNotices(r.data.data?.slice(0, 3) || [])).catch(() => {});
    if (isEnrolled) {
      api.get('/student/attendance').then(r => setAttendance(r.data.data)).catch(() => {});
      api.get('/student/marks').then(r => setMarks(r.data.data || [])).catch(() => {});
    }
    const iv = setInterval(() => setTipIdx(p => (p + 1) % TIPS.length), 5000);
    return () => clearInterval(iv);
  }, [isEnrolled]);

  const pct = Number(attendance?.percentage || 0);
  const attColor = pct >= 75 ? '#4ade80' : pct >= 50 ? '#facc15' : '#f87171';
  const attLabel = pct >= 75 ? 'Excellent' : pct >= 50 ? 'Average' : pct > 0 ? 'Low' : 'No data';

  const greet = () => {
    const h = new Date().getHours();
    return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  };

  const feeInfo = {
    paid:    { label: 'All Clear ✅', color: '#4ade80' },
    partial: { label: 'Partial ⚠️',  color: '#facc15' },
    unpaid:  { label: 'Due ❌',       color: '#f87171' },
  }[user?.feeStatus] || { label: 'Unpaid ❌', color: '#f87171' };

  const ACTIONS = [
    { to: '/dashboard/attendance',  icon: '📅', label: 'Attendance',  desc: 'Track your presence',  locked: !isEnrolled, grad: 'rgba(59,130,246,0.15)',  border: 'rgba(59,130,246,0.25)'  },
    { to: '/dashboard/marks',       icon: '📊', label: 'My Marks',    desc: 'View exam results',    locked: !isEnrolled, grad: 'rgba(139,92,246,0.15)', border: 'rgba(139,92,246,0.25)' },
    { to: '/dashboard/assignments', icon: '📝', label: 'Assignments', desc: 'Pending tasks',        locked: !isEnrolled, grad: 'rgba(249,115,22,0.15)', border: 'rgba(249,115,22,0.25)' },
    { to: '/dashboard/doubts',      icon: '💬', label: 'Ask Doubt',   desc: 'Get instant help',     locked: !isEnrolled, grad: 'rgba(20,184,166,0.15)', border: 'rgba(20,184,166,0.25)' },
    { to: '/dashboard/notices',     icon: '📢', label: 'Notices',     desc: 'Latest updates',       locked: !isEnrolled, grad: 'rgba(239,68,68,0.15)',  border: 'rgba(239,68,68,0.25)'  },
    { to: '/dashboard/notes',       icon: '📚', label: 'Notes',       desc: 'Study materials',      locked: false,       grad: 'rgba(34,197,94,0.15)',  border: 'rgba(34,197,94,0.25)'  },
    { to: '/dashboard/profile',     icon: '👤', label: 'My Profile',  desc: 'Edit your details',    locked: false,       grad: 'rgba(148,163,184,0.1)', border: 'rgba(148,163,184,0.2)' },
  ];

  return (
    <div className="pb-12 space-y-7">

      {/* ══ HERO ══════════════════════════════════════════════ */}
      <motion.div {...stagger(0)}
        className="relative rounded-3xl overflow-hidden p-7"
        style={{ background: 'linear-gradient(135deg, #0f1a3e 0%, #06091a 55%, #0d1f12 100%)' }}>

        {/* blobs */}
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(245,200,66,0.18) 0%, transparent 65%)' }} />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(59,107,255,0.15) 0%, transparent 65%)' }} />
        {/* grid texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '36px 36px' }} />

        <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-black tracking-[0.2em] uppercase mb-2" style={{ color: '#f5c842' }}>
              {greet()}
            </p>
            <h1 className="font-display text-4xl font-black text-white leading-tight">
              Welcome, {user?.name?.split(' ')[0]} 👋
            </h1>
            <p className="text-gray-400 text-sm mt-2">
              {isEnrolled
                ? <><strong className="text-white">Class {user?.class}</strong> · {user?.enrolledBatch || 'A1 Classes'} · Student Portal</>
                : 'Student Portal — A1 Classes Centre of Knowledge'}
            </p>
            {/* status pill */}
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold border"
              style={isEnrolled
                ? { background: 'rgba(74,222,128,0.1)', borderColor: 'rgba(74,222,128,0.3)', color: '#4ade80' }
                : { background: 'rgba(250,204,21,0.1)', borderColor: 'rgba(250,204,21,0.3)', color: '#facc15' }}>
              <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isEnrolled ? 'bg-green-400' : 'bg-yellow-400'}`} />
              {isEnrolled ? 'Enrolled · Full Access' : 'Not Enrolled · Limited Access'}
            </div>
          </div>

          {/* avatar */}
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center font-black text-3xl border-2"
              style={{ background: 'linear-gradient(135deg,#1a2f6e,#0d1a40)', borderColor: 'rgba(245,200,66,0.4)', boxShadow: '0 0 40px rgba(245,200,66,0.12)', color: '#f5c842' }}>
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
            {isEnrolled && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-green-400 border-2 border-[#06091a] flex items-center justify-center text-[10px] font-black text-[#06091a]">✓</div>
            )}
          </div>
        </div>
      </motion.div>

      {/* ══ NOT-ENROLLED CTA ══════════════════════════════════ */}
      {!isEnrolled && (
        <motion.div {...stagger(1)}
          className="relative rounded-2xl p-6 border overflow-hidden"
          style={{ background: 'linear-gradient(135deg,rgba(245,200,66,0.07),rgba(245,200,66,0.02))', borderColor: 'rgba(245,200,66,0.22)' }}>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[90px] opacity-[0.06] select-none pointer-events-none">🎓</div>
          <div className="relative flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between">
            <div>
              <p className="font-black text-lg mb-1" style={{ color: '#f5c842' }}>Unlock your full potential</p>
              <p className="text-gray-400 text-sm max-w-md">
                Enroll at A1 Classes to access attendance, marks, assignments, doubt sessions and personalised study materials.
              </p>
            </div>
            <a href="tel:+911234567890"
              className="flex-shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 active:scale-95"
              style={{ background: 'linear-gradient(135deg,#f5c842,#e0a800)', color: '#06091a', boxShadow: '0 8px 24px rgba(245,200,66,0.25)' }}>
              📞 Contact &amp; Enroll Now
            </a>
          </div>
        </motion.div>
      )}

      {/* ══ STAT CARDS (enrolled) ═════════════════════════════ */}
      {isEnrolled && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

          {/* Attendance */}
          <motion.div {...stagger(1)}
            className="col-span-2 sm:col-span-1 rounded-2xl border p-5 flex flex-col items-center gap-3"
            style={{ background: 'linear-gradient(135deg,rgba(59,130,246,0.12),rgba(6,9,26,0.8))', borderColor: 'rgba(59,130,246,0.2)' }}>
            <p className="text-xs font-black tracking-widest uppercase text-gray-400 self-start">Attendance</p>
            <div className="relative">
              <RadialProgress pct={pct} color={attColor} />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-black text-xl text-white">{pct}%</span>
              </div>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full"
              style={{ background: `${attColor}20`, color: attColor }}>{attLabel}</span>
          </motion.div>

          {/* Class */}
          <motion.div {...stagger(2)}
            className="relative rounded-2xl border p-5 overflow-hidden"
            style={{ background: 'linear-gradient(135deg,rgba(245,200,66,0.12),rgba(6,9,26,0.8))', borderColor: 'rgba(245,200,66,0.2)' }}>
            <div className="absolute right-3 top-3 text-4xl opacity-10 select-none">🏫</div>
            <p className="text-xs font-black tracking-widest uppercase text-gray-400 mb-3">My Class</p>
            <p className="font-black text-4xl text-white">{user?.class || '—'}<span className="text-xl text-gray-400">th</span></p>
            <p className="text-xs text-gray-500 mt-2">{user?.branch || 'A1 Classes'}</p>
          </motion.div>

          {/* Exams */}
          <motion.div {...stagger(3)}
            className="relative rounded-2xl border p-5 overflow-hidden"
            style={{ background: 'linear-gradient(135deg,rgba(74,222,128,0.1),rgba(6,9,26,0.8))', borderColor: 'rgba(74,222,128,0.2)' }}>
            <div className="absolute right-3 top-3 text-4xl opacity-10 select-none">📝</div>
            <p className="text-xs font-black tracking-widest uppercase text-gray-400 mb-3">Exams Done</p>
            <p className="font-black text-4xl text-white">{marks.length}</p>
            <p className="text-xs text-gray-500 mt-2">{marks.length > 0 ? `Last: ${marks[0]?.subject}` : 'No results yet'}</p>
          </motion.div>

          {/* Fee */}
          <motion.div {...stagger(4)}
            className="relative rounded-2xl border p-5 overflow-hidden"
            style={{ background: 'linear-gradient(135deg,rgba(168,85,247,0.1),rgba(6,9,26,0.8))', borderColor: 'rgba(168,85,247,0.2)' }}>
            <div className="absolute right-3 top-3 text-4xl opacity-10 select-none">💳</div>
            <p className="text-xs font-black tracking-widest uppercase text-gray-400 mb-3">Fee Status</p>
            <p className="font-black text-2xl" style={{ color: feeInfo.color }}>{feeInfo.label}</p>
            <p className="text-xs text-gray-500 mt-2">{user?.enrolledBatch || '—'}</p>
          </motion.div>

        </div>
      )}

      {/* ══ MOTIVATIONAL TICKER ═══════════════════════════════ */}
      <motion.div {...stagger(isEnrolled ? 5 : 2)}
        className="flex items-center gap-3 px-5 py-3 rounded-xl border"
        style={{ background: 'rgba(245,200,66,0.05)', borderColor: 'rgba(245,200,66,0.14)' }}>
        <span className="text-[10px] font-black tracking-[0.18em] uppercase flex-shrink-0" style={{ color: '#f5c842' }}>Pro Tip</span>
        <div className="w-px h-4 flex-shrink-0" style={{ background: 'rgba(255,255,255,0.1)' }} />
        <AnimatePresence mode="wait">
          <motion.p key={tipIdx}
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="text-gray-300 text-xs font-medium">
            {TIPS[tipIdx]}
          </motion.p>
        </AnimatePresence>
      </motion.div>

      {/* ══ QUICK ACTIONS ═════════════════════════════════════ */}
      <motion.div {...stagger(isEnrolled ? 6 : 3)}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-black text-white text-lg flex items-center gap-2">
            <span className="w-1 h-6 rounded-full inline-block" style={{ background: '#f5c842' }} />
            {isEnrolled ? 'Quick Actions' : 'Student Features'}
          </h2>
          {!isEnrolled && (
            <span className="text-xs text-gray-500">{ACTIONS.filter(a => !a.locked).length} / {ACTIONS.length} accessible</span>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {ACTIONS.map((a, i) => (
            <motion.div key={a.to}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + i * 0.055, ease: [0.22, 1, 0.36, 1] }}>
              {!a.locked ? (
                <Link to={a.to}
                  className="group flex flex-col p-5 rounded-2xl border hover:scale-[1.03] hover:brightness-125 transition-all duration-200"
                  style={{ background: a.grad, borderColor: a.border }}>
                  <span className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-200 inline-block">{a.icon}</span>
                  <span className="font-bold text-white text-sm leading-tight">{a.label}</span>
                  <span className="text-xs mt-0.5 text-gray-500">{a.desc}</span>
                </Link>
              ) : (
                <div className="relative flex flex-col p-5 rounded-2xl border overflow-hidden"
                  style={{ background: a.grad, borderColor: a.border }}>
                  <span className="text-3xl mb-3 opacity-25">{a.icon}</span>
                  <span className="font-bold text-gray-600 text-sm">{a.label}</span>
                  <span className="text-xs mt-0.5 text-gray-700">{a.desc}</span>
                  <div className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-1"
                    style={{ backdropFilter: 'blur(3px)', background: 'rgba(6,9,26,0.58)' }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl border"
                      style={{ background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)' }}>🔒</div>
                    <span className="text-[10px] text-gray-400 font-semibold">Enroll to unlock</span>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ══ BOTTOM ROW (enrolled only) ════════════════════════ */}
      {isEnrolled && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* Notices — 3 cols */}
          <motion.div {...stagger(7)} className="lg:col-span-3 rounded-2xl border p-5"
            style={{ background: 'rgba(255,255,255,0.025)', borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-black text-white text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                Latest Notices
              </h3>
              <Link to="/dashboard/notices" className="text-xs font-semibold hover:underline" style={{ color: '#f5c842' }}>View all →</Link>
            </div>
            {notices.length === 0 ? (
              <div className="flex flex-col items-center py-10 gap-2">
                <span className="text-4xl">📭</span>
                <p className="text-gray-500 text-sm">No notices yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {notices.map((n, i) => (
                  <motion.div key={n._id}
                    initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + i * 0.07 }}
                    className="p-4 rounded-xl border"
                    style={{ background: n.isImportant ? 'rgba(239,68,68,0.07)' : 'rgba(255,255,255,0.03)', borderColor: n.isImportant ? 'rgba(239,68,68,0.3)' : 'rgba(255,255,255,0.07)' }}>
                    <div className="flex items-start gap-3">
                      <span className="text-xl flex-shrink-0">{n.isImportant ? '🚨' : '📌'}</span>
                      <div>
                        {n.isImportant && (
                          <span className="inline-block text-[10px] font-black bg-red-500 text-white px-2 py-0.5 rounded-full mb-1 tracking-wider">IMPORTANT</span>
                        )}
                        <p className="font-bold text-white text-xs">{n.title}</p>
                        <p className="text-gray-400 text-xs mt-1 line-clamp-2">{n.content}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Results — 2 cols */}
          <motion.div {...stagger(8)} className="lg:col-span-2 rounded-2xl border p-5"
            style={{ background: 'rgba(255,255,255,0.025)', borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-black text-white text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-400" />
                Recent Results
              </h3>
              <Link to="/dashboard/marks" className="text-xs font-semibold hover:underline" style={{ color: '#f5c842' }}>View all →</Link>
            </div>
            {marks.length === 0 ? (
              <div className="flex flex-col items-center py-10 gap-2">
                <span className="text-4xl">📋</span>
                <p className="text-gray-500 text-sm">No results yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {marks.slice(0, 4).map((m, i) => {
                  const p   = m.totalMarks ? Math.round((m.marksObtained / m.totalMarks) * 100) : 0;
                  const col = p >= 75 ? '#4ade80' : p >= 50 ? '#facc15' : '#f87171';
                  return (
                    <motion.div key={m._id}
                      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                      transition={{ delay: 0.55 + i * 0.07 }}>
                      <div className="flex justify-between items-baseline mb-1.5">
                        <p className="text-white text-xs font-bold truncate max-w-[60%]">{m.subject}</p>
                        <p className="text-xs font-black" style={{ color: col }}>{m.marksObtained}/{m.totalMarks}</p>
                      </div>
                      <Bar pct={p} color={col} />
                      <p className="text-[10px] mt-1 font-semibold" style={{ color: col }}>{p}% · {m.exam || 'Exam'}</p>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </div>
      )}

    </div>
  );
}