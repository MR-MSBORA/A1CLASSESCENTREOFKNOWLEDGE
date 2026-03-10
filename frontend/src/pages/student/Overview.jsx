import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const fade = (i = 0) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.4, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
});

function RadialProgress({ pct = 0, size = 88, stroke = 8, color = '#f5c842' }) {
  const r    = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth={stroke} />
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={circ}
        strokeDashoffset={circ - (Math.min(pct, 100) / 100) * circ}
        strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset 1s ease' }} />
    </svg>
  );
}

function Bar({ pct = 0, color = '#f5c842' }) {
  return (
    <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.08)' }}>
      <motion.div className="h-full rounded-full" style={{ background: color }}
        initial={{ width: 0 }} animate={{ width: `${Math.min(pct, 100)}%` }}
        transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }} />
    </div>
  );
}

const TIPS = [
  '🔥 Consistency beats talent. Show up every day.',
  '📖 Review notes within 24 hrs to retain 80% more.',
  '🎯 Top students study their mistakes, not just their wins.',
  '⏰ Study in 25-min focused bursts for peak efficiency.',
  '💡 Teaching a concept to someone else cements it for you.',
];

const ACTIONS = [
  { to: 'attendance',  icon: '📅', label: 'Attendance',  desc: 'Track your presence',  locked: true,  grad: 'rgba(59,130,246,0.15)',  border: 'rgba(59,130,246,0.25)'  },
  { to: 'marks',       icon: '📊', label: 'My Marks',    desc: 'View exam results',    locked: true,  grad: 'rgba(139,92,246,0.15)', border: 'rgba(139,92,246,0.25)' },
  { to: 'assignments', icon: '📝', label: 'Assignments', desc: 'Pending tasks',        locked: true,  grad: 'rgba(249,115,22,0.15)', border: 'rgba(249,115,22,0.25)' },
  { to: 'doubts',      icon: '💬', label: 'Ask Doubt',   desc: 'Get instant help',     locked: true,  grad: 'rgba(20,184,166,0.15)', border: 'rgba(20,184,166,0.25)' },
  { to: 'notices',     icon: '📢', label: 'Notices',     desc: 'Latest updates',       locked: true,  grad: 'rgba(239,68,68,0.15)',  border: 'rgba(239,68,68,0.25)'  },
  { to: 'notes',       icon: '📚', label: 'Notes',       desc: 'Study materials',      locked: false, grad: 'rgba(34,197,94,0.15)',  border: 'rgba(34,197,94,0.25)'  },
  { to: 'profile',     icon: '👤', label: 'My Profile',  desc: 'Edit your details',    locked: false, grad: 'rgba(148,163,184,0.1)', border: 'rgba(148,163,184,0.2)' },
];

export default function Overview() {
  const { user, refreshUser } = useAuth();
  const [attendance, setAttendance] = useState(null);
  const [marks,      setMarks]      = useState([]);
  const [notices,    setNotices]    = useState([]);
  const [tipIdx,     setTipIdx]     = useState(0);

  const isEnrolled = user?.isEnrolled;

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
  const attColor  = pct >= 75 ? '#4ade80' : pct >= 50 ? '#facc15' : '#f87171';
  const attLabel  = pct >= 75 ? 'Excellent' : pct >= 50 ? 'Average' : pct > 0 ? 'Low' : 'No data';

  const greet = () => {
    const h = new Date().getHours();
    return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
  };

  const feeInfo = {
    paid:    { label: 'All Clear ✅', color: '#4ade80' },
    partial: { label: 'Partial ⚠️',  color: '#facc15' },
    unpaid:  { label: 'Due ❌',       color: '#f87171' },
  }[user?.feeStatus] || { label: 'Unpaid ❌', color: '#f87171' };

  return (
    <div className="pb-10 space-y-7">

      {/* ── Hero header ─────────────────────────── */}
      <motion.div {...fade(0)}
        className="relative rounded-3xl overflow-hidden p-7"
        style={{ background: 'linear-gradient(135deg,#0f1a3e 0%,#06091a 55%,#0d1f12 100%)' }}>
        <div className="absolute -top-16 -right-16 w-72 h-72 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle,rgba(245,200,66,0.18) 0%,transparent 65%)' }} />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle,rgba(59,107,255,0.15) 0%,transparent 65%)' }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
          style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)', backgroundSize: '36px 36px' }} />

        <div className="relative flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-black tracking-[0.2em] uppercase mb-1" style={{ color: '#f5c842' }}>{greet()}</p>
            <h1 className="font-display text-3xl font-black text-white">Welcome, {user?.name?.split(' ')[0]} 👋</h1>
            <p className="text-gray-400 text-sm mt-1">
              {isEnrolled
                ? <><strong className="text-white">Class {user?.class}</strong> · {user?.enrolledBatch || 'A1 Classes'}</>
                : 'Student Portal — A1 Classes'}
            </p>
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border"
              style={isEnrolled
                ? { background: 'rgba(74,222,128,0.1)', borderColor: 'rgba(74,222,128,0.3)', color: '#4ade80' }
                : { background: 'rgba(250,204,21,0.1)', borderColor: 'rgba(250,204,21,0.3)', color: '#facc15' }}>
              <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isEnrolled ? 'bg-green-400' : 'bg-yellow-400'}`} />
              {isEnrolled ? 'Enrolled · Full Access' : 'Not Enrolled · Limited Access'}
            </div>
          </div>
          <div className="relative flex-shrink-0">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center font-black text-2xl border-2"
              style={{ background: 'linear-gradient(135deg,#1a2f6e,#0d1a40)', borderColor: 'rgba(245,200,66,0.4)', color: '#f5c842' }}>
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
            {isEnrolled && (
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-green-400 border-2 border-[#06091a] flex items-center justify-center text-[9px] font-black text-[#06091a]">✓</div>
            )}
          </div>
        </div>
      </motion.div>

      {/* ── Not enrolled CTA ────────────────────── */}
      {!isEnrolled && (
        <motion.div {...fade(1)}
          className="relative rounded-2xl p-6 border overflow-hidden"
          style={{ background: 'rgba(245,200,66,0.06)', borderColor: 'rgba(245,200,66,0.22)' }}>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-8xl opacity-[0.05] select-none">🎓</div>
          <div className="relative flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div>
              <p className="font-black text-lg mb-1" style={{ color: '#f5c842' }}>Unlock your full potential</p>
              <p className="text-gray-400 text-sm">Enroll at A1 Classes to access attendance, marks, assignments, doubts and more.</p>
            </div>
            <a href="tel:+911234567890"
              className="flex-shrink-0 px-6 py-3 rounded-xl font-bold text-sm hover:scale-105 transition-transform"
              style={{ background: 'linear-gradient(135deg,#f5c842,#e0a800)', color: '#06091a', boxShadow: '0 8px 20px rgba(245,200,66,0.25)' }}>
              📞 Contact &amp; Enroll
            </a>
          </div>
        </motion.div>
      )}

      {/* ── Stat cards (enrolled only) ──────────── */}
      {isEnrolled && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

          <motion.div {...fade(1)} className="col-span-1 rounded-2xl border p-5 flex flex-col items-center gap-2"
            style={{ background: 'linear-gradient(135deg,rgba(59,130,246,0.12),rgba(6,9,26,0.8))', borderColor: 'rgba(59,130,246,0.2)' }}>
            <p className="text-xs font-black tracking-widest uppercase text-gray-400 self-start">Attendance</p>
            <div className="relative">
              <RadialProgress pct={pct} color={attColor} />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-black text-lg text-white">{pct}%</span>
              </div>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full"
              style={{ background: `${attColor}20`, color: attColor }}>{attLabel}</span>
          </motion.div>

          <motion.div {...fade(2)} className="relative rounded-2xl border p-5 overflow-hidden"
            style={{ background: 'linear-gradient(135deg,rgba(245,200,66,0.12),rgba(6,9,26,0.8))', borderColor: 'rgba(245,200,66,0.2)' }}>
            <div className="absolute right-3 top-3 text-4xl opacity-10 select-none">🏫</div>
            <p className="text-xs font-black tracking-widest uppercase text-gray-400 mb-2">My Class</p>
            <p className="font-black text-4xl text-white">{user?.class || '—'}<span className="text-xl text-gray-400">th</span></p>
            <p className="text-xs text-gray-500 mt-1">{user?.branch || 'A1 Classes'}</p>
          </motion.div>

          <motion.div {...fade(3)} className="relative rounded-2xl border p-5 overflow-hidden"
            style={{ background: 'linear-gradient(135deg,rgba(74,222,128,0.1),rgba(6,9,26,0.8))', borderColor: 'rgba(74,222,128,0.2)' }}>
            <div className="absolute right-3 top-3 text-4xl opacity-10 select-none">📝</div>
            <p className="text-xs font-black tracking-widest uppercase text-gray-400 mb-2">Exams Done</p>
            <p className="font-black text-4xl text-white">{marks.length}</p>
            <p className="text-xs text-gray-500 mt-1">{marks.length > 0 ? `Last: ${marks[0]?.subject}` : 'No results yet'}</p>
          </motion.div>

          <motion.div {...fade(4)} className="relative rounded-2xl border p-5 overflow-hidden"
            style={{ background: 'linear-gradient(135deg,rgba(168,85,247,0.1),rgba(6,9,26,0.8))', borderColor: 'rgba(168,85,247,0.2)' }}>
            <div className="absolute right-3 top-3 text-4xl opacity-10 select-none">💳</div>
            <p className="text-xs font-black tracking-widest uppercase text-gray-400 mb-2">Batch</p>
            <p className="font-black text-lg text-white">{user?.enrolledBatch || '—'}</p>
            <p className="text-xs mt-1" style={{ color: feeInfo.color }}>{feeInfo.label}</p>
          </motion.div>

        </div>
      )}

      {/* ── Tip ticker ──────────────────────────── */}
      <motion.div {...fade(isEnrolled ? 5 : 2)}
        className="flex items-center gap-3 px-5 py-3 rounded-xl border"
        style={{ background: 'rgba(245,200,66,0.05)', borderColor: 'rgba(245,200,66,0.14)' }}>
        <span className="text-[10px] font-black tracking-[0.15em] uppercase flex-shrink-0" style={{ color: '#f5c842' }}>Pro Tip</span>
        <div className="w-px h-4 flex-shrink-0 bg-white/10" />
        <AnimatePresence mode="wait">
          <motion.p key={tipIdx}
            initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
            className="text-gray-300 text-xs font-medium">{TIPS[tipIdx]}</motion.p>
        </AnimatePresence>
      </motion.div>

      {/* ── Quick actions ────────────────────────── */}
      <motion.div {...fade(isEnrolled ? 6 : 3)}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-black text-white text-lg flex items-center gap-2">
            <span className="w-1 h-6 rounded-full inline-block" style={{ background: '#f5c842' }} />
            {isEnrolled ? 'Quick Actions' : 'Student Features'}
          </h2>
          {!isEnrolled && <span className="text-xs text-gray-500">2 / {ACTIONS.length} accessible</span>}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {ACTIONS.map((a, i) => {
            const accessible = !a.locked || isEnrolled;
            return (
              <motion.div key={a.to}
                initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.055 }}>
                {accessible ? (
                  <Link to={a.to}
                    className="group flex flex-col p-5 rounded-2xl border hover:scale-[1.03] hover:brightness-125 transition-all duration-200"
                    style={{ background: a.grad, borderColor: a.border }}>
                    <span className="text-3xl mb-3 group-hover:scale-110 transition-transform inline-block">{a.icon}</span>
                    <span className="font-bold text-white text-sm">{a.label}</span>
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
            );
          })}
        </div>
      </motion.div>

      {/* ── Notices + Results (enrolled only) ───── */}
      {isEnrolled && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          <motion.div {...fade(7)} className="lg:col-span-3 rounded-2xl border p-5"
            style={{ background: 'rgba(255,255,255,0.025)', borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-white text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" /> Latest Notices
              </h3>
              <Link to="notices" className="text-xs font-semibold hover:underline" style={{ color: '#f5c842' }}>View all →</Link>
            </div>
            {notices.length === 0 ? (
              <div className="flex flex-col items-center py-8 gap-2">
                <span className="text-3xl">📭</span>
                <p className="text-gray-500 text-sm">No notices yet</p>
              </div>
            ) : notices.map((n, i) => (
              <motion.div key={n._id}
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.07 }}
                className="mb-3 p-4 rounded-xl border"
                style={{ background: n.isImportant ? 'rgba(239,68,68,0.07)' : 'rgba(255,255,255,0.03)', borderColor: n.isImportant ? 'rgba(239,68,68,0.3)' : 'rgba(255,255,255,0.07)' }}>
                <div className="flex items-start gap-3">
                  <span className="text-lg">{n.isImportant ? '🚨' : '📌'}</span>
                  <div>
                    {n.isImportant && <span className="inline-block text-[10px] font-black bg-red-500 text-white px-2 py-0.5 rounded-full mb-1">IMPORTANT</span>}
                    <p className="font-bold text-white text-xs">{n.title}</p>
                    <p className="text-gray-400 text-xs mt-1 line-clamp-2">{n.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div {...fade(8)} className="lg:col-span-2 rounded-2xl border p-5"
            style={{ background: 'rgba(255,255,255,0.025)', borderColor: 'rgba(255,255,255,0.08)' }}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-black text-white text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-violet-400" /> Recent Results
              </h3>
              <Link to="marks" className="text-xs font-semibold hover:underline" style={{ color: '#f5c842' }}>View all →</Link>
            </div>
            {marks.length === 0 ? (
              <div className="flex flex-col items-center py-8 gap-2">
                <span className="text-3xl">📋</span>
                <p className="text-gray-500 text-sm">No results yet</p>
              </div>
            ) : marks.slice(0, 4).map((m, i) => {
              const p   = m.totalMarks ? Math.round((m.marksObtained / m.totalMarks) * 100) : 0;
              const col = p >= 75 ? '#4ade80' : p >= 50 ? '#facc15' : '#f87171';
              return (
                <motion.div key={m._id}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 + i * 0.07 }} className="mb-4">
                  <div className="flex justify-between items-baseline mb-1.5">
                    <p className="text-white text-xs font-bold truncate max-w-[60%]">{m.subject}</p>
                    <p className="text-xs font-black" style={{ color: col }}>{m.marksObtained}/{m.totalMarks}</p>
                  </div>
                  <Bar pct={p} color={col} />
                  <p className="text-[10px] mt-1 font-semibold" style={{ color: col }}>{p}% · {m.exam || 'Exam'}</p>
                </motion.div>
              );
            })}
          </motion.div>

        </div>
      )}

    </div>
  );
}