import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function Overview() {
  const { user }                          = useAuth();
  const [attendance,    setAttendance]    = useState(null);
  const [announcements, setAnnouncements] = useState([]);
  const [marks,         setMarks]         = useState([]);

  useEffect(() => {
    api.get('/student/attendance')
      .then(r => setAttendance(r.data.data))
      .catch(() => {});
    api.get('/student/announcements')
      .then(r => setAnnouncements(r.data.data))
      .catch(() => {});
    api.get('/student/marks')
      .then(r => setMarks(r.data.data))
      .catch(() => {});
  }, []);

  const stats = [
    { label: 'Attendance', value: (attendance?.percentage || 0) + '%', color: 'bg-royal',      icon: '📅' },
    { label: 'Class',      value: user?.class > 0 ? `Class ${user.class}` : 'N/A', color: 'bg-gold/20 border border-gold/30', icon: '🏫', text: 'text-gold' },
    { label: 'Exams Done', value: marks.length,     color: 'bg-green-900/40 border border-green-700/30', icon: '📝', text: 'text-green-400' },
    { label: 'Notices',    value: announcements.length, color: 'bg-purple-900/40 border border-purple-700/30', icon: '📢', text: 'text-purple-400' },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl font-black text-white">
          Welcome back, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          Here's your academic overview
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {stats.map(s => (
          <div key={s.label} className={`${s.color} p-6 rounded-2xl`}>
            <p className="text-2xl mb-3">{s.icon}</p>
            <p className={`font-mono font-black text-3xl ${s.text || 'text-white'}`}>
              {s.value}
            </p>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { to: '/dashboard/attendance',  label: 'View Attendance', icon: '📅' },
          { to: '/dashboard/marks',       label: 'View Marks',      icon: '📊' },
          { to: '/dashboard/doubts',      label: 'Ask a Doubt',     icon: '💬' },
          { to: '/notes',                 label: 'Buy Notes',       icon: '📚' },
        ].map(q => (
          <Link key={q.to} to={q.to}
            className="p-4 rounded-xl bg-white/5 border border-white/10 hover:border-gold/30 hover:bg-white/10 transition-all text-center group">
            <p className="text-2xl mb-2">{q.icon}</p>
            <p className="text-xs font-semibold text-gray-300 group-hover:text-gold transition-colors">
              {q.label}
            </p>
          </Link>
        ))}
      </div>

      {/* Announcements */}
      <div>
        <h2 className="font-bold text-lg text-white mb-4">📢 Latest Notices</h2>
        {announcements.length === 0 ? (
          <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center">
            <p className="text-gray-500 text-sm">No announcements yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {announcements.map(a => (
              <div key={a._id}
                className={`p-4 rounded-xl border transition-all ${
                  a.isImportant
                    ? 'bg-red-900/20 border-red-700/30'
                    : 'bg-white/5 border-white/10'
                }`}>
                <div className="flex items-center gap-2 mb-1">
                  {a.isImportant && (
                    <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-bold">
                      IMPORTANT
                    </span>
                  )}
                  <p className="font-semibold text-sm text-white">{a.title}</p>
                </div>
                <p className="text-gray-400 text-xs">{a.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}