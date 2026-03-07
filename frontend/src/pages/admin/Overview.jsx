// import { useEffect, useState } from 'react';
// import api from '../../services/api';

// export default function Overview() {
//   const [stats, setStats] = useState(null);

//   useEffect(() => {
//     api.get('/admin/stats').then(r => setStats(r.data.data)).catch(() => {});
//   }, []);

//   const cards = [
//     { label: 'Total Students', value: stats?.totalStudents  || 0, icon: '👨‍🎓', color: 'bg-royal'              },
//     { label: 'Total Notes',    value: stats?.totalNotes     || 0, icon: '📚', color: 'bg-purple-900/50 border border-purple-700/30' },
//     { label: 'Total Revenue',  value: `₹${stats?.totalRevenue || 0}`, icon: '💰', color: 'bg-green-900/50 border border-green-700/30'  },
//     { label: 'Total Payments', value: stats?.totalPayments  || 0, icon: '🧾', color: 'bg-gold/10 border border-gold/30'              },
//   ];

//   return (
//     <div>
//       <div className="mb-8">
//         <h1 className="font-display text-3xl font-black text-white">Admin Dashboard</h1>
//         <p className="text-gray-400 text-sm mt-1">A1 Classes — Centre of Knowledge</p>
//       </div>

//       <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
//         {cards.map(c => (
//           <div key={c.label} className={`${c.color} p-6 rounded-2xl`}>
//             <p className="text-3xl mb-3">{c.icon}</p>
//             <p className="font-mono font-black text-3xl text-white">{c.value}</p>
//             <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">{c.label}</p>
//           </div>
//         ))}
//       </div>

//       {/* Quick Actions */}
//       <h2 className="font-bold text-white text-lg mb-4">Quick Actions</h2>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         {[
//           { label: 'Upload Note',       icon: '📤', to: '/admin/notes'         },
//           { label: 'Post Result',       icon: '🏆', to: '/admin/results'       },
//           { label: 'Add Announcement',  icon: '📢', to: '/admin/announcements' },
//           { label: 'View Doubts',       icon: '💬', to: '/admin/doubts'        },
//         ].map(q => (
//           <a key={q.label} href={q.to}
//             className="p-5 rounded-xl bg-white/5 border border-white/10 hover:border-gold/30 hover:bg-white/10 transition-all text-center group">
//             <p className="text-3xl mb-2">{q.icon}</p>
//             <p className="text-xs font-semibold text-gray-300 group-hover:text-gold transition-colors">
//               {q.label}
//             </p>
//           </a>
//         ))}
//       </div>
//     </div>
//   );
// }




import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function Overview() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/admin/stats')
      .then(r => setStats(r.data.data))
      .catch(() => {});
  }, []);

  const cards = [
    { label: 'Total Students', value: stats?.totalStudents  || 0,      icon: '👨‍🎓', color: 'bg-royal'                                        },
    { label: 'Total Notes',    value: stats?.totalNotes     || 0,      icon: '📚',  color: 'bg-purple-900/50 border border-purple-700/30'     },
    { label: 'Total Revenue',  value: `₹${stats?.totalRevenue || 0}`,  icon: '💰',  color: 'bg-green-900/50 border border-green-700/30'       },
    { label: 'Total Payments', value: stats?.totalPayments  || 0,      icon: '🧾',  color: 'bg-yellow-900/40 border border-yellow-700/30'     },
  ];

  const quickLinks = [
    { to: '/admin/notes',         icon: '📤', label: 'Upload Note'       },
    { to: '/admin/results',       icon: '🏆', label: 'Post Result'       },
    { to: '/admin/announcements', icon: '📢', label: 'Add Announcement'  },
    { to: '/admin/doubts',        icon: '💬', label: 'View Doubts'       },
    { to: '/admin/attendance',    icon: '📅', label: 'Mark Attendance'   },
    { to: '/admin/gallery',       icon: '🖼️', label: 'Upload Gallery'    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-black text-white">Admin Dashboard</h1>
        <p className="text-gray-400 text-sm mt-1">A1 Classes — Centre of Knowledge</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {cards.map(c => (
          <div key={c.label} className={`${c.color} p-6 rounded-2xl`}>
            <p className="text-3xl mb-3">{c.icon}</p>
            <p className="font-mono font-black text-3xl text-white">{c.value}</p>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">{c.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
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
    </div>
  );
}