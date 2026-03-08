// // import { useEffect, useState } from 'react';
// // import api from '../../services/api';
// // import toast from 'react-hot-toast';

// // export default function ManageStudents() {
// //   const [students, setStudents] = useState([]);
// //   const [search,   setSearch]   = useState('');
// //   const [loading,  setLoading]  = useState(true);

// //   const load = () => {
// //     api.get('/admin/users?role=student')
// //       .then(r => setStudents(r.data.data))
// //       .finally(() => setLoading(false));
// //   };

// //   useEffect(() => { load(); }, []);

// //   const handleDelete = async (id) => {
// //     if (!confirm('Delete this student?')) return;
// //     try {
// //       await api.delete(`/admin/users/${id}`);
// //       toast.success('Student deleted');
// //       load();
// //     } catch { toast.error('Failed'); }
// //   };

// //   const filtered = students.filter(s =>
// //     s.name.toLowerCase().includes(search.toLowerCase()) ||
// //     s.email.toLowerCase().includes(search.toLowerCase())
// //   );

// //   return (
// //     <div>
// //       <h1 className="font-display text-3xl font-black text-white mb-8">Manage Students</h1>

// //       <input
// //         type="text"
// //         placeholder="Search by name or email..."
// //         value={search}
// //         onChange={e => setSearch(e.target.value)}
// //         className="w-full max-w-sm px-4 py-2.5 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-gold mb-6"
// //       />

// //       {loading ? (
// //         <p className="text-gray-400 text-center py-10">Loading...</p>
// //       ) : (
// //         <div className="overflow-x-auto rounded-2xl border border-white/10">
// //           <table className="w-full text-sm">
// //             <thead className="bg-white/5">
// //               <tr>
// //                 {['Name','Email','Class','Phone','Joined','Action'].map(h => (
// //                   <th key={h} className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">
// //                     {h}
// //                   </th>
// //                 ))}
// //               </tr>
// //             </thead>
// //             <tbody className="divide-y divide-white/5">
// //               {filtered.map(s => (
// //                 <tr key={s._id} className="hover:bg-white/5 transition-colors">
// //                   <td className="px-5 py-4 text-white font-medium">{s.name}</td>
// //                   <td className="px-5 py-4 text-gray-400">{s.email}</td>
// //                   <td className="px-5 py-4 text-gray-400">{s.class > 0 ? `Class ${s.class}` : 'Other'}</td>
// //                   <td className="px-5 py-4 text-gray-400">{s.phone || '—'}</td>
// //                   <td className="px-5 py-4 text-gray-400">
// //                     {new Date(s.createdAt).toLocaleDateString('en-IN')}
// //                   </td>
// //                   <td className="px-5 py-4">
// //                     <button onClick={() => handleDelete(s._id)}
// //                       className="px-3 py-1 rounded-lg bg-red-900/30 text-red-400 text-xs font-semibold hover:bg-red-900/50 transition-colors">
// //                       Delete
// //                     </button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //           {filtered.length === 0 && (
// //             <p className="text-center text-gray-500 py-10">No students found</p>
// //           )}
// //         </div>
// //       )}
// //     </div>
// //   );
// // }


// import { useEffect, useState } from 'react';
// import api from '../../services/api';
// import toast from 'react-hot-toast';

// export default function ManageStudents() {
//   const [students, setStudents] = useState([]);
//   const [search,   setSearch]   = useState('');
//   const [loading,  setLoading]  = useState(true);

//   const load = async () => {
//     try {
//       const r = await api.get('/admin/users?role=student');
//       setStudents(r.data.data || []);
//     } catch {
//       toast.error('Failed to load students');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm('Delete this student?')) return;
//     try {
//       await api.delete(`/admin/users/${id}`);
//       toast.success('Student deleted');
//       load();
//     } catch {
//       toast.error('Failed to delete');
//     }
//   };

//   const filtered = students.filter(s =>
//     s.name?.toLowerCase().includes(search.toLowerCase()) ||
//     s.email?.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <div>
//       <h1 className="font-display text-3xl font-black text-white mb-8">
//         Manage Students
//       </h1>

//       {/* Search */}
//       <input
//         type="text"
//         placeholder="Search by name or email..."
//         value={search}
//         onChange={e => setSearch(e.target.value)}
//         className="w-full max-w-sm px-4 py-2.5 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-gold mb-6"
//       />

//       {/* Count */}
//       <p className="text-gray-400 text-sm mb-4">
//         Total: <span className="text-white font-bold">{filtered.length}</span> students
//       </p>

//       {loading ? (
//         <p className="text-gray-400 text-center py-10">Loading...</p>
//       ) : filtered.length === 0 ? (
//         <div className="text-center py-16">
//           <p className="text-4xl mb-3">👨‍🎓</p>
//           <p className="text-gray-400">No students found</p>
//         </div>
//       ) : (
//         <div className="overflow-x-auto rounded-2xl border border-white/10">
//           <table className="w-full text-sm">
//             <thead className="bg-white/5">
//               <tr>
//                 {['Name', 'Email', 'Class', 'Phone', 'Joined', 'Action'].map(h => (
//                   <th key={h}
//                     className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-widest">
//                     {h}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-white/5">
//               {filtered.map(s => (
//                 <tr key={s._id} className="hover:bg-white/5 transition-colors">
//                   <td className="px-5 py-4">
//                     <div className="flex items-center gap-3">
//                       <div className="w-8 h-8 rounded-full bg-royal/20 flex items-center justify-center text-gold font-bold text-xs flex-shrink-0">
//                         {s.name?.charAt(0)}
//                       </div>
//                       <span className="text-white font-medium">{s.name}</span>
//                     </div>
//                   </td>
//                   <td className="px-5 py-4 text-gray-400">{s.email}</td>
//                   <td className="px-5 py-4 text-gray-400">
//                     {s.class > 0 ? `Class ${s.class}` : 'Other'}
//                   </td>
//                   <td className="px-5 py-4 text-gray-400">{s.phone || '—'}</td>
//                   <td className="px-5 py-4 text-gray-400">
//                     {new Date(s.createdAt).toLocaleDateString('en-IN', {
//                       day: 'numeric', month: 'short', year: 'numeric'
//                     })}
//                   </td>
//                   <td className="px-5 py-4">
//                     <button
//                       onClick={() => handleDelete(s._id)}
//                       className="px-3 py-1 rounded-lg bg-red-900/30 text-red-400 text-xs font-semibold hover:bg-red-900/50 transition-colors">
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }






import { useEffect, useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

export default function ManageStudents() {
  const [students,  setStudents]  = useState([]);
  const [search,    setSearch]    = useState('');
  const [loading,   setLoading]   = useState(true);
  const [filterCls, setFilterCls] = useState('');
  const [filterEnr, setFilterEnr] = useState('');

  // Enroll modal state
  const [enrollModal, setEnrollModal] = useState(null); // student object
  const [batch,       setBatch]       = useState('');
  const [feeStatus,   setFeeStatus]   = useState('paid');
  const [enrolling,   setEnrolling]   = useState(false);

  const load = async () => {
    try {
      const r = await api.get('/admin/users?role=student');
      setStudents(Array.isArray(r.data.data) ? r.data.data : r.data.data?.users || []);
    } catch {
      toast.error('Failed to load students');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this student? This cannot be undone.')) return;
    try {
      await api.delete(`/admin/users/${id}`);
      toast.success('Student deleted');
      load();
    } catch {
      toast.error('Failed to delete');
    }
  };

  const openEnrollModal = (s) => {
    setEnrollModal(s);
    setBatch(s.enrolledBatch || `Class ${s.class} - ${new Date().getFullYear()}`);
    setFeeStatus(s.feeStatus || 'paid');
  };

  const handleEnroll = async (enroll) => {
    setEnrolling(true);
    try {
      await api.patch(`/admin/users/${enrollModal._id}/enroll`, {
        isEnrolled:    enroll,
        enrolledBatch: enroll ? batch : '',
        feeStatus:     enroll ? feeStatus : 'unpaid',
      });
      toast.success(enroll ? 'Student enrolled ✅' : 'Enrollment removed');
      setEnrollModal(null);
      load();
    } catch {
      toast.error('Failed');
    } finally {
      setEnrolling(false);
    }
  };

  const handleFeeStatus = async (id, status) => {
    try {
      await api.patch(`/admin/users/${id}/enroll`, { feeStatus: status, isEnrolled: true });
      toast.success('Fee status updated');
      load();
    } catch {
      toast.error('Failed');
    }
  };

  const filtered = students.filter(s => {
    const matchSearch = (
      s.name?.toLowerCase().includes(search.toLowerCase()) ||
      s.email?.toLowerCase().includes(search.toLowerCase()) ||
      s.phone?.includes(search)
    );
    const matchCls = filterCls ? String(s.class) === filterCls : true;
    const matchEnr = filterEnr === ''
      ? true
      : filterEnr === 'enrolled'
      ? s.isEnrolled
      : !s.isEnrolled;
    return matchSearch && matchCls && matchEnr;
  });

  const stats = {
    total:    students.length,
    enrolled: students.filter(s => s.isEnrolled).length,
    unpaid:   students.filter(s => s.isEnrolled && s.feeStatus !== 'paid').length,
  };

  const feeColor = (status) => {
    if (status === 'paid')    return 'bg-green-900/30 text-green-400';
    if (status === 'partial') return 'bg-yellow-900/30 text-yellow-400';
    return 'bg-red-900/30 text-red-400';
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-black text-white mb-2">
        Manage Students
      </h1>
      <p className="text-gray-400 text-sm mb-8">
        Enroll students and manage fee status
      </p>

      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total',    value: stats.total,    color: 'text-white'       },
          { label: 'Enrolled', value: stats.enrolled, color: 'text-green-400'   },
          { label: 'Fee Due',  value: stats.unpaid,   color: 'text-yellow-400'  },
        ].map(s => (
          <div key={s.label}
            className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
            <p className={`font-black text-2xl ${s.color}`}>{s.value}</p>
            <p className="text-gray-400 text-xs mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="Search name, email, phone..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 min-w-[200px] max-w-sm px-4 py-2.5 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-gold"
        />
        <select
          value={filterCls}
          onChange={e => setFilterCls(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-gold">
          <option value="">All Classes</option>
          {[9,10,11,12].map(c => (
            <option key={c} value={c}>Class {c}</option>
          ))}
        </select>
        <select
          value={filterEnr}
          onChange={e => setFilterEnr(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-gold">
          <option value="">All Students</option>
          <option value="enrolled">Enrolled Only</option>
          <option value="not">Not Enrolled</option>
        </select>
      </div>

      <p className="text-gray-400 text-xs mb-4">
        Showing <span className="text-white font-bold">{filtered.length}</span> of {students.length} students
      </p>

      {loading ? (
        <p className="text-gray-400 text-center py-16">Loading...</p>
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
                {['Student', 'Class', 'Phone', 'Status', 'Fee', 'Batch', 'Joined', 'Actions'].map(h => (
                  <th key={h}
                    className="px-4 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-widest whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map(s => (
                <tr key={s._id} className="hover:bg-white/5 transition-colors">

                  {/* Student */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-royal/20 flex items-center justify-center text-gold font-bold text-xs flex-shrink-0">
                        {s.name?.charAt(0)?.toUpperCase()}
                      </div>
                      <div>
                        <p className="text-white font-medium leading-tight">{s.name}</p>
                        <p className="text-gray-500 text-xs">{s.email}</p>
                      </div>
                    </div>
                  </td>

                  {/* Class */}
                  <td className="px-4 py-4 text-gray-400 whitespace-nowrap">
                    {s.class ? `Class ${s.class}` : '—'}
                  </td>

                  {/* Phone */}
                  <td className="px-4 py-4 text-gray-400 whitespace-nowrap">
                    {s.phone || '—'}
                  </td>

                  {/* Enrollment Status */}
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                      s.isEnrolled
                        ? 'bg-green-900/30 text-green-400'
                        : 'bg-white/10 text-gray-400'
                    }`}>
                      {s.isEnrolled ? '✅ Enrolled' : 'Not Enrolled'}
                    </span>
                  </td>

                  {/* Fee Status */}
                  <td className="px-4 py-4 whitespace-nowrap">
                    {s.isEnrolled ? (
                      <select
                        value={s.feeStatus || 'unpaid'}
                        onChange={e => handleFeeStatus(s._id, e.target.value)}
                        className={`px-2 py-1 rounded-lg text-xs font-bold border-0 cursor-pointer ${feeColor(s.feeStatus)}`}
                        style={{ background: 'transparent' }}>
                        <option value="paid"    className="bg-[#0c1229] text-green-400">Paid</option>
                        <option value="partial" className="bg-[#0c1229] text-yellow-400">Partial</option>
                        <option value="unpaid"  className="bg-[#0c1229] text-red-400">Unpaid</option>
                      </select>
                    ) : (
                      <span className="text-gray-600 text-xs">—</span>
                    )}
                  </td>

                  {/* Batch */}
                  <td className="px-4 py-4 text-gray-400 text-xs whitespace-nowrap">
                    {s.enrolledBatch || '—'}
                  </td>

                  {/* Joined */}
                  <td className="px-4 py-4 text-gray-400 text-xs whitespace-nowrap">
                    {new Date(s.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    })}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openEnrollModal(s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                          s.isEnrolled
                            ? 'bg-yellow-900/30 text-yellow-400 hover:bg-yellow-900/50'
                            : 'bg-green-900/30 text-green-400 hover:bg-green-900/50'
                        }`}>
                        {s.isEnrolled ? 'Manage' : '+ Enroll'}
                      </button>
                      <button
                        onClick={() => handleDelete(s._id)}
                        className="px-3 py-1.5 rounded-lg bg-red-900/30 text-red-400 text-xs font-semibold hover:bg-red-900/50 transition-colors">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Enroll / Manage Modal */}
      <AnimatePresence>
        {enrollModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setEnrollModal(null)}>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1,    opacity: 1 }}
              exit={{ scale: 0.95,    opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-[#0c1229] border border-white/10 rounded-2xl p-6 w-full max-w-md">

              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-royal/20 flex items-center justify-center text-gold font-black">
                  {enrollModal.name?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-white">{enrollModal.name}</p>
                  <p className="text-xs text-gray-400">{enrollModal.email}</p>
                </div>
              </div>

              {/* Current Status */}
              <div className={`mb-6 px-4 py-3 rounded-xl text-sm font-semibold ${
                enrollModal.isEnrolled
                  ? 'bg-green-900/20 text-green-400 border border-green-700/20'
                  : 'bg-white/5 text-gray-400 border border-white/10'
              }`}>
                {enrollModal.isEnrolled
                  ? `✅ Currently Enrolled · ${enrollModal.enrolledBatch || ''}`
                  : '⚠️ Not enrolled yet'}
              </div>

              {/* Batch */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-widest">
                  Batch / Session
                </label>
                <input
                  type="text"
                  value={batch}
                  onChange={e => setBatch(e.target.value)}
                  placeholder="e.g. Class 11 - Science 2024-25"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#06091a] text-white text-sm focus:outline-none focus:border-gold"
                />
              </div>

              {/* Fee Status */}
              <div className="mb-6">
                <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-widest">
                  Fee Status
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { v: 'paid',    label: 'Paid',    color: 'border-green-500 text-green-400 bg-green-900/20'   },
                    { v: 'partial', label: 'Partial', color: 'border-yellow-500 text-yellow-400 bg-yellow-900/20' },
                    { v: 'unpaid',  label: 'Unpaid',  color: 'border-red-500 text-red-400 bg-red-900/20'         },
                  ].map(f => (
                    <button key={f.v}
                      onClick={() => setFeeStatus(f.v)}
                      className={`py-2 rounded-xl border text-xs font-bold transition-all ${
                        feeStatus === f.v
                          ? f.color
                          : 'border-white/10 text-gray-500 bg-transparent hover:bg-white/5'
                      }`}>
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                {/* Enroll / Re-enroll */}
                <button
                  onClick={() => handleEnroll(true)}
                  disabled={enrolling}
                  className="flex-1 py-2.5 rounded-xl bg-green-900/40 text-green-400 font-bold text-sm hover:bg-green-900/60 transition-colors disabled:opacity-50">
                  {enrolling ? 'Saving...' : enrollModal.isEnrolled ? '🔄 Update' : '✅ Enroll'}
                </button>

                {/* Unenroll — only show if already enrolled */}
                {enrollModal.isEnrolled && (
                  <button
                    onClick={() => handleEnroll(false)}
                    disabled={enrolling}
                    className="flex-1 py-2.5 rounded-xl bg-red-900/30 text-red-400 font-bold text-sm hover:bg-red-900/50 transition-colors disabled:opacity-50">
                    ❌ Unenroll
                  </button>
                )}

                <button
                  onClick={() => setEnrollModal(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 text-gray-400 font-semibold text-sm hover:bg-white/10 transition-colors">
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}