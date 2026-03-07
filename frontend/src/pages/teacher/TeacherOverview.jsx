 
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';

export default function TeacherOverview() {
  const { user }             = useAuth();
  const [students, setStudents] = useState([]);
  const [doubts,   setDoubts]   = useState([]);

  useEffect(() => {
    api.get('/admin/users?role=student')
      .then(r => setStudents(r.data.data))
      .catch(() => {});
    api.get('/doubts')
      .then(r => setDoubts(r.data.data))
      .catch(() => {});
  }, []);

  const openDoubts = doubts.filter(d => d.status === 'open').length;

  const stats = [
    { label: 'Total Students', value: students.length, icon: '👨‍🎓', color: 'bg-royal'                                    },
    { label: 'Open Doubts',    value: openDoubts,       icon: '💬', color: 'bg-yellow-900/40 border border-yellow-700/30' },
    { label: 'My Role',        value: 'Teacher',        icon: '👨‍🏫', color: 'bg-green-900/40 border border-green-700/30'  },
  ];

  const quickLinks = [
    { to: '/teacher/attendance',    icon: '📅', label: 'Mark Attendance'  },
    { to: '/teacher/marks',         icon: '📊', label: 'Add Marks'        },
    { to: '/teacher/assignments',   icon: '📝', label: 'Add Assignment'   },
    { to: '/teacher/doubts',        icon: '💬', label: 'Answer Doubts'    },
    { to: '/teacher/announcements', icon: '📢', label: 'Post Notice'      },
    { to: '/teacher/notes',         icon: '📤', label: 'Upload Notes'     },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-black text-white">
          Welcome, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-gray-400 text-sm mt-1">Teacher Dashboard — A1 Classes</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
        {stats.map(s => (
          <div key={s.label} className={`${s.color} p-6 rounded-2xl`}>
            <p className="text-3xl mb-3">{s.icon}</p>
            <p className="font-mono font-black text-3xl text-white">{s.value}</p>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <h2 className="font-bold text-white text-lg mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {quickLinks.map(q => (
          <Link key={q.to} to={q.to}
            className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-gold/30 hover:bg-white/10 transition-all text-center group">
            <p className="text-3xl mb-2">{q.icon}</p>
            <p className="text-xs font-semibold text-gray-300 group-hover:text-gold transition-colors">
              {q.label}
            </p>
          </Link>
        ))}
      </div>

      {/* Open Doubts Alert */}
      {openDoubts > 0 && (
        <div className="mt-8 p-5 rounded-2xl bg-yellow-900/20 border border-yellow-700/30">
          <p className="text-yellow-400 font-semibold text-sm">
            ⚠️ You have <strong>{openDoubts}</strong> unanswered doubt{openDoubts > 1 ? 's' : ''} waiting
          </p>
          <Link to="/teacher/doubts"
            className="text-xs text-gold hover:underline mt-1 block">
            Answer them now →
          </Link>
        </div>
      )}
    </div>
  );
}