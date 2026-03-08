
// import { useEffect, useState } from 'react';
// import api from '../../services/api';
// import toast from 'react-hot-toast';

// export default function TeacherAttendance() {
//   const [students,    setStudents]    = useState([]);
//   const [records,     setRecords]     = useState({});
//   const [date,        setDate]        = useState(new Date().toISOString().split('T')[0]);
//   const [subject,     setSubject]     = useState('General');
//   const [filterClass, setFilterClass] = useState('');
//   const [saving,      setSaving]      = useState(false);

//   useEffect(() => {
//     api.get('/admin/users?role=student')
//       .then(r => {
//         setStudents(r.data.data);
//         const init = {};
//         r.data.data.forEach(s => { init[s._id] = 'present'; });
//         setRecords(init);
//       });
//   }, []);

//   const filtered = filterClass
//     ? students.filter(s => String(s.class) === filterClass)
//     : students;

//   const handleSave = async () => {
//     if (filtered.length === 0) { toast.error('No students to mark'); return; }
//     setSaving(true);
//     try {
//       const recs = filtered.map(s => ({
//         student: s._id,
//         date,
//         status:  records[s._id] || 'present',
//         subject,
//         class:   s.class,
//       }));
//       await api.post('/admin/attendance', { records: recs });
//       toast.success(`Attendance saved for ${recs.length} students ✅`);
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Failed');
//     } finally {
//       setSaving(false);
//     }
//   };

//   return (
//     <div>
//       <h1 className="font-display text-3xl font-black text-white mb-8">Mark Attendance</h1>

//       {/* Controls */}
//       <div className="flex gap-4 flex-wrap mb-6">
//         <div>
//           <label className="text-xs text-gray-400 mb-1.5 block">Date</label>
//           <input type="date" value={date}
//             onChange={e => setDate(e.target.value)}
//             className="px-4 py-2.5 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-gold" />
//         </div>
//         <div>
//           <label className="text-xs text-gray-400 mb-1.5 block">Subject</label>
//           <select value={subject} onChange={e => setSubject(e.target.value)}
//             className="px-4 py-2.5 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-gold">
//             {['General','Physics','Chemistry','Maths','Biology','English','Accounts','Computer'].map(s => (
//               <option key={s} value={s}>{s}</option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label className="text-xs text-gray-400 mb-1.5 block">Filter Class</label>
//           <select value={filterClass} onChange={e => setFilterClass(e.target.value)}
//             className="px-4 py-2.5 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-gold">
//             <option value="">All Classes</option>
//             {[1,2,3,4,5,6,7,8,9,10,11,12].map(c => (
//               <option key={c} value={String(c)}>Class {c}</option>
//             ))}
//           </select>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="rounded-2xl border border-white/10 overflow-hidden mb-6">
//         <table className="w-full text-sm">
//           <thead className="bg-white/5">
//             <tr>
//               {['Student','Class','Status'].map(h => (
//                 <th key={h} className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase">
//                   {h}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-white/5">
//             {filtered.map(s => (
//               <tr key={s._id} className="hover:bg-white/5">
//                 <td className="px-5 py-3 text-white font-medium">{s.name}</td>
//                 <td className="px-5 py-3 text-gray-400">Class {s.class}</td>
//                 <td className="px-5 py-3">
//                   <div className="flex gap-2">
//                     {['present','absent','late'].map(status => (
//                       <button key={status}
//                         onClick={() => setRecords({ ...records, [s._id]: status })}
//                         className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-colors ${
//                           records[s._id] === status
//                             ? status === 'present'
//                               ? 'bg-green-500 text-white'
//                               : status === 'absent'
//                               ? 'bg-red-500 text-white'
//                               : 'bg-yellow-500 text-white'
//                             : 'bg-white/10 text-gray-400 hover:bg-white/20'
//                         }`}>
//                         {status}
//                       </button>
//                     ))}
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         {filtered.length === 0 && (
//           <p className="text-center text-gray-500 py-10">No students found</p>
//         )}
//       </div>

//       <button onClick={handleSave} disabled={saving}
//         className="px-8 py-3 rounded-xl bg-royal text-white font-bold text-sm hover:bg-royal-light disabled:opacity-60 transition-colors">
//         {saving ? 'Saving...' : `✅ Save Attendance (${filtered.length} students)`}
//       </button>
//     </div>
//   );
// }



import { useEffect, useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

export default function TeacherAttendance() {
  const { user } = useAuth();
  const [students, setStudents] = useState([]);
  const [records, setRecords] = useState({});
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [subject, setSubject] = useState('General');
  const [filterClass, setFilterClass] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // Teacher's assigned classes and branch
  const teacherClasses = user?.classes || [];
  const teacherBranch = user?.branch || 'All';

  useEffect(() => {
    const teacherClasses = user?.classes || [];

    // Build query — filter by teacher's classes directly from backend
    const classParam = teacherClasses.length > 0
      ? `&class=${teacherClasses[0]}`  // start with first class
      : '';

    api.get(`/admin/users?role=student${classParam}`)
      .then(r => {
        let list = Array.isArray(r.data.data) ? r.data.data : [];

        // Filter all assigned classes
        if (teacherClasses.length > 0) {
          list = list.filter(s => teacherClasses.includes(Number(s.class)));
        }

        setStudents(list);
        const init = {};
        list.forEach(s => { init[s._id] = 'present'; });
        setRecords(init);
      })
      .catch(() => toast.error('Failed to load students'))
      .finally(() => setLoading(false));
  }, []);

  // Only show classes this teacher teaches
  const allowedClasses = teacherClasses.length > 0
    ? teacherClasses
    : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const filtered = filterClass
    ? students.filter(s => String(s.class) === filterClass)
    : students;

  const handleSave = async () => {
    if (filtered.length === 0) { toast.error('No students to mark'); return; }
    setSaving(true);
    try {
      const recs = filtered.map(s => ({
        student: s._id,
        date,
        status: records[s._id] || 'present',
        subject,
        class: s.class,
      }));
      const res = await api.post('/admin/attendance', { records: recs });
      toast.success(`Attendance saved for ${res.data.data.saved} students ✅`);
      if (res.data.data.skipped > 0) {
        toast.error(`${res.data.data.skipped} students skipped (not your class)`);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-black text-white mb-2">
        Mark Attendance
      </h1>

      {/* Teacher Info Banner */}
      <div className="mb-6 p-4 rounded-xl bg-royal/10 border border-royal/20">
        <p className="text-xs text-gray-400">
          You can mark attendance for:
          <span className="text-gold font-bold ml-2">
            {teacherClasses.length > 0
              ? teacherClasses.map(c => `Class ${c}`).join(', ')
              : 'All Classes'}
          </span>
          <span className="text-gray-500 mx-2">·</span>
          <span className="text-blue-400 font-semibold">
            📍 {teacherBranch}
          </span>
        </p>
      </div>

      {/* Controls */}
      <div className="flex gap-4 flex-wrap mb-6">
        <div>
          <label className="text-xs text-gray-400 mb-1.5 block">Date</label>
          <input type="date" value={date}
            onChange={e => setDate(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-gold" />
        </div>
        <div>
          <label className="text-xs text-gray-400 mb-1.5 block">Subject</label>
          <select value={subject} onChange={e => setSubject(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-gold">
            {['General', 'Physics', 'Chemistry', 'Maths', 'Biology', 'English', 'Accounts', 'Computer'].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs text-gray-400 mb-1.5 block">Filter Class</label>
          <select value={filterClass} onChange={e => setFilterClass(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-gold">
            <option value="">All My Classes</option>
            {allowedClasses.map(c => (
              <option key={c} value={String(c)}>Class {c}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <p className="text-gray-400 text-center py-10">Loading students...</p>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">👨‍🎓</p>
          <p className="text-gray-400">No students found for your assigned classes</p>
          <p className="text-gray-500 text-xs mt-2">
            Your classes: {teacherClasses.length > 0
              ? teacherClasses.map(c => `Class ${c}`).join(', ')
              : 'None assigned yet'}
          </p>
        </div>
      ) : (
        <>
          <div className="rounded-2xl border border-white/10 overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead className="bg-white/5">
                <tr>
                  {['Student', 'Class', 'Status'].map(h => (
                    <th key={h}
                      className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.map(s => (
                  <tr key={s._id} className="hover:bg-white/5">
                    <td className="px-5 py-3 text-white font-medium">{s.name}</td>
                    <td className="px-5 py-3 text-gray-400">Class {s.class}</td>
                    <td className="px-5 py-3">
                      <div className="flex gap-2">
                        {['present', 'absent', 'late'].map(status => (
                          <button key={status}
                            onClick={() => setRecords({ ...records, [s._id]: status })}
                            className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-colors ${records[s._id] === status
                                ? status === 'present'
                                  ? 'bg-green-500 text-white'
                                  : status === 'absent'
                                    ? 'bg-red-500 text-white'
                                    : 'bg-yellow-500 text-white'
                                : 'bg-white/10 text-gray-400 hover:bg-white/20'
                              }`}>
                            {status}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button onClick={handleSave} disabled={saving}
            className="px-8 py-3 rounded-xl bg-royal text-white font-bold text-sm hover:bg-royal-light disabled:opacity-60 transition-colors">
            {saving ? 'Saving...' : `✅ Save Attendance (${filtered.length} students)`}
          </button>
        </>
      )}
    </div>
  );
}