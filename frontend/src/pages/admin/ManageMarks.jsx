// // import { useEffect, useState } from 'react';
// // import api from '../../services/api';
// // import toast from 'react-hot-toast';

// // export default function ManageMarks() {
// //   const [students, setStudents] = useState([]);
// //   const [saving,   setSaving]   = useState(false);
// //   const [form, setForm] = useState({
// //     student: '', exam: '', subject: '',
// //     marksObtained: '', maxMarks: '', grade: ''
// //   });

// //   useEffect(() => {
// //     api.get('/admin/users?role=student').then(r => setStudents(r.data.data));
// //   }, []);

// //   const handleSave = async () => {
// //     if (!form.student || !form.exam || !form.subject || !form.marksObtained || !form.maxMarks) {
// //       toast.error('Fill all required fields'); return;
// //     }
// //     setSaving(true);
// //     try {
// //       await api.post('/admin/marks', {
// //         ...form,
// //         marksObtained: Number(form.marksObtained),
// //         maxMarks:      Number(form.maxMarks),
// //       });
// //       toast.success('Marks added ✅');
// //       setForm({ student:'', exam:'', subject:'', marksObtained:'', maxMarks:'', grade:'' });
// //     } catch (err) {
// //       toast.error(err.response?.data?.message || 'Failed');
// //     } finally {
// //       setSaving(false);
// //     }
// //   };

// //   const inputClass = "w-full px-4 py-3 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-gold";

// //   return (
// //     <div>
// //       <h1 className="font-display text-3xl font-black text-white mb-8">Add Marks</h1>

// //       <div className="p-6 rounded-2xl bg-white/5 border border-white/10 max-w-2xl">
// //         <div className="space-y-4">
// //           <div>
// //             <label className="text-xs text-gray-400 mb-1.5 block">Student *</label>
// //             <select value={form.student}
// //               onChange={e => setForm({...form, student: e.target.value})}
// //               className={inputClass}>
// //               <option value="">Select Student</option>
// //               {students.map(s => (
// //                 <option key={s._id} value={s._id}>
// //                   {s.name} — Class {s.class}
// //                 </option>
// //               ))}
// //             </select>
// //           </div>

// //           <div className="grid grid-cols-2 gap-4">
// //             <div>
// //               <label className="text-xs text-gray-400 mb-1.5 block">Exam Name *</label>
// //               <input type="text" placeholder="e.g. Unit Test 1" value={form.exam}
// //                 onChange={e => setForm({...form, exam: e.target.value})} className={inputClass} />
// //             </div>
// //             <div>
// //               <label className="text-xs text-gray-400 mb-1.5 block">Subject *</label>
// //               <select value={form.subject}
// //                 onChange={e => setForm({...form, subject: e.target.value})}
// //                 className={inputClass}>
// //                 <option value="">Select</option>
// //                 {['Physics','Chemistry','Maths','Biology','English','Accounts','Economics','Computer','History','General'].map(s => (
// //                   <option key={s} value={s}>{s}</option>
// //                 ))}
// //               </select>
// //             </div>
// //             <div>
// //               <label className="text-xs text-gray-400 mb-1.5 block">Marks Obtained *</label>
// //               <input type="number" placeholder="e.g. 85" value={form.marksObtained}
// //                 onChange={e => setForm({...form, marksObtained: e.target.value})} className={inputClass} />
// //             </div>
// //             <div>
// //               <label className="text-xs text-gray-400 mb-1.5 block">Max Marks *</label>
// //               <input type="number" placeholder="e.g. 100" value={form.maxMarks}
// //                 onChange={e => setForm({...form, maxMarks: e.target.value})} className={inputClass} />
// //             </div>
// //             <div>
// //               <label className="text-xs text-gray-400 mb-1.5 block">Grade</label>
// //               <select value={form.grade}
// //                 onChange={e => setForm({...form, grade: e.target.value})}
// //                 className={inputClass}>
// //                 <option value="">Select Grade</option>
// //                 {['A+','A','B+','B','C','D','F'].map(g => (
// //                   <option key={g} value={g}>{g}</option>
// //                 ))}
// //               </select>
// //             </div>
// //           </div>

// //           <button onClick={handleSave} disabled={saving}
// //             className="w-full py-3 rounded-xl bg-royal text-white font-bold text-sm hover:bg-royal-light disabled:opacity-60 transition-colors">
// //             {saving ? 'Saving...' : '📊 Add Marks'}
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }





// import { useEffect, useState } from 'react';
// import api from '../../services/api';
// import toast from 'react-hot-toast';

// export default function ManageMarks() {
//   const [students, setStudents] = useState([]);
//   const [saving,   setSaving]   = useState(false);
//   const [form, setForm] = useState({
//     student: '', exam: '', subject: '',
//     marksObtained: '', maxMarks: '', grade: ''
//   });

//   useEffect(() => {
//     api.get('/admin/users?role=student')
//       .then(r => {
//         const list = Array.isArray(r.data.data)
//           ? r.data.data
//           : r.data.data?.users || r.data.data?.students || [];
//         setStudents(list);
//       })
//       .catch(() => toast.error('Failed to load students'));
//   }, []);

//   const handleSave = async () => {
//     if (!form.student || !form.exam || !form.subject || !form.marksObtained || !form.maxMarks) {
//       toast.error('Fill all required fields'); return;
//     }
//     setSaving(true);
//     try {
//       await api.post('/admin/marks', {
//         ...form,
//         marksObtained: Number(form.marksObtained),
//         maxMarks:      Number(form.maxMarks),
//       });
//       toast.success('Marks added ✅');
//       setForm({ student:'', exam:'', subject:'', marksObtained:'', maxMarks:'', grade:'' });
//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Failed');
//     } finally {
//       setSaving(false);
//     }
//   };

//   const inputClass = "w-full px-4 py-3 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-gold";

//   return (
//     <div>
//       <h1 className="font-display text-3xl font-black text-white mb-8">Add Marks</h1>

//       <div className="p-6 rounded-2xl bg-white/5 border border-white/10 max-w-2xl">
//         <div className="space-y-4">

//           <div>
//             <label className="text-xs text-gray-400 mb-1.5 block">Student *</label>
//             <select value={form.student}
//               onChange={e => setForm({...form, student: e.target.value})}
//               className={inputClass}>
//               <option value="">Select Student</option>
//               {students.map(s => (
//                 <option key={s._id} value={s._id}>
//                   {s.name} — Class {s.class}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="text-xs text-gray-400 mb-1.5 block">Exam Name *</label>
//               <input type="text" placeholder="e.g. Unit Test 1" value={form.exam}
//                 onChange={e => setForm({...form, exam: e.target.value})}
//                 className={inputClass} />
//             </div>
//             <div>
//               <label className="text-xs text-gray-400 mb-1.5 block">Subject *</label>
//               <select value={form.subject}
//                 onChange={e => setForm({...form, subject: e.target.value})}
//                 className={inputClass}>
//                 <option value="">Select</option>
//                 {['Physics','Chemistry','Maths','Biology','English','Accounts','Economics','Computer','History','General'].map(s => (
//                   <option key={s} value={s}>{s}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="text-xs text-gray-400 mb-1.5 block">Marks Obtained *</label>
//               <input type="number" placeholder="e.g. 85" value={form.marksObtained}
//                 onChange={e => setForm({...form, marksObtained: e.target.value})}
//                 className={inputClass} />
//             </div>
//             <div>
//               <label className="text-xs text-gray-400 mb-1.5 block">Max Marks *</label>
//               <input type="number" placeholder="e.g. 100" value={form.maxMarks}
//                 onChange={e => setForm({...form, maxMarks: e.target.value})}
//                 className={inputClass} />
//             </div>
//             <div>
//               <label className="text-xs text-gray-400 mb-1.5 block">Grade</label>
//               <select value={form.grade}
//                 onChange={e => setForm({...form, grade: e.target.value})}
//                 className={inputClass}>
//                 <option value="">Select Grade</option>
//                 {['A+','A','B+','B','C','D','F'].map(g => (
//                   <option key={g} value={g}>{g}</option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           <button onClick={handleSave} disabled={saving}
//             className="w-full py-3 rounded-xl bg-royal text-white font-bold text-sm hover:bg-royal-light disabled:opacity-60 transition-colors">
//             {saving ? 'Saving...' : '📊 Add Marks'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

export default function ManageMarks() {
  const [students, setStudents] = useState([]);
  const [saving,   setSaving]   = useState(false);
  const [tab,      setTab]      = useState('add');
  const [form, setForm] = useState({
    student: '', exam: '', subject: '',
    marksObtained: '', maxMarks: '', grade: ''
  });

  // View state
  const [viewRecords,      setViewRecords]      = useState([]);
  const [viewLoading,      setViewLoading]      = useState(false);
  const [viewFilterClass,  setViewFilterClass]  = useState('');
  const [viewFilterSubject,setViewFilterSubject]= useState('');
  const [viewFilterExam,   setViewFilterExam]   = useState('');

  useEffect(() => {
    api.get('/admin/users?role=student')
      .then(r => {
        const list = Array.isArray(r.data.data) ? r.data.data
          : r.data.data?.users || [];
        setStudents(list);
      });
  }, []);

  const loadMarks = async () => {
    setViewLoading(true);
    try {
      const params = new URLSearchParams();
      if (viewFilterClass)   params.append('class',   viewFilterClass);
      if (viewFilterSubject) params.append('subject', viewFilterSubject);
      if (viewFilterExam)    params.append('exam',    viewFilterExam);
      const r = await api.get(`/admin/marks?${params}`);
      setViewRecords(Array.isArray(r.data.data) ? r.data.data : []);
    } catch {
      toast.error('Failed to load marks');
    } finally {
      setViewLoading(false);
    }
  };

  useEffect(() => {
    if (tab === 'view') loadMarks();
  }, [tab]);

  const handleSave = async () => {
    if (!form.student || !form.exam || !form.subject || !form.marksObtained || !form.maxMarks) {
      toast.error('Fill all required fields'); return;
    }
    setSaving(true);
    try {
      await api.post('/admin/marks', {
        ...form,
        marksObtained: Number(form.marksObtained),
        maxMarks:      Number(form.maxMarks),
      });
      toast.success('Marks added ✅');
      setForm({ student:'', exam:'', subject:'', marksObtained:'', maxMarks:'', grade:'' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    } finally {
      setSaving(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-gold";

  const gradeColor = {
    'A+': 'text-green-400', 'A': 'text-green-400',
    'B+': 'text-blue-400',  'B': 'text-blue-400',
    'C':  'text-yellow-400', 'D': 'text-orange-400',
    'F':  'text-red-400',
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-black text-white mb-6">Marks</h1>

      {/* Tabs */}
      <div className="flex gap-3 mb-8">
        {[
          { key: 'add',  label: '➕ Add Marks'   },
          { key: 'view', label: '📊 View Marks'  },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              tab === t.key
                ? 'bg-royal text-white'
                : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10'
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* ADD TAB */}
      {tab === 'add' && (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 max-w-2xl">
          <div className="space-y-4">
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Student *</label>
              <select value={form.student}
                onChange={e => setForm({...form, student: e.target.value})}
                className={inputClass}>
                <option value="">Select Student</option>
                {students.map(s => (
                  <option key={s._id} value={s._id}>
                    {s.name} — Class {s.class}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block">Exam *</label>
                <input type="text" placeholder="e.g. Unit Test 1"
                  value={form.exam}
                  onChange={e => setForm({...form, exam: e.target.value})}
                  className={inputClass} />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block">Subject *</label>
                <select value={form.subject}
                  onChange={e => setForm({...form, subject: e.target.value})}
                  className={inputClass}>
                  <option value="">Select</option>
                  {['Physics','Chemistry','Maths','Biology','English','Accounts','Economics','Computer','History','General'].map(s => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block">Marks Obtained *</label>
                <input type="number" placeholder="e.g. 85"
                  value={form.marksObtained}
                  onChange={e => setForm({...form, marksObtained: e.target.value})}
                  className={inputClass} />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block">Max Marks *</label>
                <input type="number" placeholder="e.g. 100"
                  value={form.maxMarks}
                  onChange={e => setForm({...form, maxMarks: e.target.value})}
                  className={inputClass} />
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1.5 block">Grade</label>
                <select value={form.grade}
                  onChange={e => setForm({...form, grade: e.target.value})}
                  className={inputClass}>
                  <option value="">Select Grade</option>
                  {['A+','A','B+','B','C','D','F'].map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>
            </div>
            <button onClick={handleSave} disabled={saving}
              className="w-full py-3 rounded-xl bg-royal text-white font-bold text-sm hover:bg-royal-light disabled:opacity-60 transition-colors">
              {saving ? 'Saving...' : '📊 Add Marks'}
            </button>
          </div>
        </div>
      )}

      {/* VIEW TAB */}
      {tab === 'view' && (
        <>
          {/* Filters */}
          <div className="flex gap-4 flex-wrap mb-6">
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Filter by Class</label>
              <select value={viewFilterClass}
                onChange={e => setViewFilterClass(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-gold">
                <option value="">All Classes</option>
                {[1,2,3,4,5,6,7,8,9,10,11,12].map(c => (
                  <option key={c} value={String(c)}>Class {c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Filter by Subject</label>
              <select value={viewFilterSubject}
                onChange={e => setViewFilterSubject(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-gold">
                <option value="">All Subjects</option>
                {['Physics','Chemistry','Maths','Biology','English','Accounts','Economics','Computer','History','General'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs text-gray-400 mb-1.5 block">Filter by Exam</label>
              <input type="text" placeholder="e.g. Unit Test 1"
                value={viewFilterExam}
                onChange={e => setViewFilterExam(e.target.value)}
                className="px-4 py-2.5 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-gold" />
            </div>
            <div className="flex items-end">
              <button onClick={loadMarks}
                className="px-5 py-2.5 rounded-xl bg-royal text-white text-sm font-semibold hover:bg-royal-light transition-colors">
                🔍 Search
              </button>
            </div>
          </div>

          {viewLoading ? (
            <p className="text-gray-400 text-center py-10">Loading...</p>
          ) : viewRecords.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-4xl mb-3">📊</p>
              <p className="text-gray-400">No marks found</p>
              <p className="text-gray-500 text-xs mt-2">Try different filters</p>
            </div>
          ) : (
            <>
              <p className="text-gray-400 text-sm mb-4">
                Showing <span className="text-white font-bold">{viewRecords.length}</span> records
              </p>
              <div className="rounded-2xl border border-white/10 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-white/5">
                    <tr>
                      {['Student','Class','Exam','Subject','Marks','Grade'].map(h => (
                        <th key={h} className="px-5 py-3 text-left text-xs font-bold text-gray-400 uppercase">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {viewRecords.map(r => {
                      const pct = Math.round((r.marksObtained / r.maxMarks) * 100);
                      return (
                        <tr key={r._id} className="hover:bg-white/5">
                          <td className="px-5 py-3 text-white font-medium">
                            {r.student?.name || '—'}
                          </td>
                          <td className="px-5 py-3 text-gray-400">
                            Class {r.student?.class || '—'}
                          </td>
                          <td className="px-5 py-3 text-gray-400">{r.exam}</td>
                          <td className="px-5 py-3 text-gray-400">{r.subject}</td>
                          <td className="px-5 py-3">
                            <span className="text-white font-bold">
                              {r.marksObtained}/{r.maxMarks}
                            </span>
                            <span className="text-gray-500 text-xs ml-1">({pct}%)</span>
                          </td>
                          <td className="px-5 py-3">
                            <span className={`font-black text-sm ${gradeColor[r.grade] || 'text-gray-400'}`}>
                              {r.grade || '—'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}