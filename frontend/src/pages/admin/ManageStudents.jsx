// import { useEffect, useState } from 'react';
// import api from '../../services/api';
// import toast from 'react-hot-toast';

// export default function ManageStudents() {
//   const [students, setStudents] = useState([]);
//   const [search,   setSearch]   = useState('');
//   const [loading,  setLoading]  = useState(true);

//   const load = () => {
//     api.get('/admin/users?role=student')
//       .then(r => setStudents(r.data.data))
//       .finally(() => setLoading(false));
//   };

//   useEffect(() => { load(); }, []);

//   const handleDelete = async (id) => {
//     if (!confirm('Delete this student?')) return;
//     try {
//       await api.delete(`/admin/users/${id}`);
//       toast.success('Student deleted');
//       load();
//     } catch { toast.error('Failed'); }
//   };

//   const filtered = students.filter(s =>
//     s.name.toLowerCase().includes(search.toLowerCase()) ||
//     s.email.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div>
//       <h1 className="font-display text-3xl font-black text-white mb-8">Manage Students</h1>

//       <input
//         type="text"
//         placeholder="Search by name or email..."
//         value={search}
//         onChange={e => setSearch(e.target.value)}
//         className="w-full max-w-sm px-4 py-2.5 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-gold mb-6"
//       />

//       {loading ? (
//         <p className="text-gray-400 text-center py-10">Loading...</p>
//       ) : (
//         <div className="overflow-x-auto rounded-2xl border border-white/10">
//           <table className="w-full text-sm">
//             <thead className="bg-white/5">
//               <tr>
//                 {['Name','Email','Class','Phone','Joined','Action'].map(h => (
//                   <th key={h} className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">
//                     {h}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-white/5">
//               {filtered.map(s => (
//                 <tr key={s._id} className="hover:bg-white/5 transition-colors">
//                   <td className="px-5 py-4 text-white font-medium">{s.name}</td>
//                   <td className="px-5 py-4 text-gray-400">{s.email}</td>
//                   <td className="px-5 py-4 text-gray-400">{s.class > 0 ? `Class ${s.class}` : 'Other'}</td>
//                   <td className="px-5 py-4 text-gray-400">{s.phone || '—'}</td>
//                   <td className="px-5 py-4 text-gray-400">
//                     {new Date(s.createdAt).toLocaleDateString('en-IN')}
//                   </td>
//                   <td className="px-5 py-4">
//                     <button onClick={() => handleDelete(s._id)}
//                       className="px-3 py-1 rounded-lg bg-red-900/30 text-red-400 text-xs font-semibold hover:bg-red-900/50 transition-colors">
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           {filtered.length === 0 && (
//             <p className="text-center text-gray-500 py-10">No students found</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

export default function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [search,   setSearch]   = useState('');
  const [loading,  setLoading]  = useState(true);

  const load = async () => {
    try {
      const r = await api.get('/admin/users?role=student');
      setStudents(r.data.data || []);
    } catch {
      toast.error('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this student?')) return;
    try {
      await api.delete(`/admin/users/${id}`);
      toast.success('Student deleted');
      load();
    } catch {
      toast.error('Failed to delete');
    }
  };

  const filtered = students.filter(s =>
    s.name?.toLowerCase().includes(search.toLowerCase()) ||
    s.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="font-display text-3xl font-black text-white mb-8">
        Manage Students
      </h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name or email..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="w-full max-w-sm px-4 py-2.5 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-gold mb-6"
      />

      {/* Count */}
      <p className="text-gray-400 text-sm mb-4">
        Total: <span className="text-white font-bold">{filtered.length}</span> students
      </p>

      {loading ? (
        <p className="text-gray-400 text-center py-10">Loading...</p>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">👨‍🎓</p>
          <p className="text-gray-400">No students found</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-white/5">
              <tr>
                {['Name', 'Email', 'Class', 'Phone', 'Joined', 'Action'].map(h => (
                  <th key={h}
                    className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map(s => (
                <tr key={s._id} className="hover:bg-white/5 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-royal/20 flex items-center justify-center text-gold font-bold text-xs flex-shrink-0">
                        {s.name?.charAt(0)}
                      </div>
                      <span className="text-white font-medium">{s.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-400">{s.email}</td>
                  <td className="px-5 py-4 text-gray-400">
                    {s.class > 0 ? `Class ${s.class}` : 'Other'}
                  </td>
                  <td className="px-5 py-4 text-gray-400">{s.phone || '—'}</td>
                  <td className="px-5 py-4 text-gray-400">
                    {new Date(s.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    })}
                  </td>
                  <td className="px-5 py-4">
                    <button
                      onClick={() => handleDelete(s._id)}
                      className="px-3 py-1 rounded-lg bg-red-900/30 text-red-400 text-xs font-semibold hover:bg-red-900/50 transition-colors">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}