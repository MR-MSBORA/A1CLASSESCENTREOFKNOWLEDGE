// // import { useEffect, useState } from 'react';
// // import api from '../../services/api';
// // import toast from 'react-hot-toast';
// // import { useAuth } from '../../context/AuthContext';
// // import { Eye, EyeOff, Plus, Trash2 } from 'lucide-react';

// // export default function ManageStaff() {

// //   const { user } = useAuth();

// //   const [staff, setStaff] = useState([]);
// //   const [teachers, setTeachers] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const [showPass, setShowPass] = useState(false);
// //   const [creating, setCreating] = useState(false);

// //   const [teacherStats, setTeacherStats] = useState([]);

// //   const [tab, setTab] = useState('list');

// //   const [form, setForm] = useState({
// //     name: '',
// //     email: '',
// //     password: '',
// //     role: 'teacher',

// //     phone: '',
// //     gender: '',
// //     qualification: '',
// //     experience: '',
// //     bio: '',
// //     subjects: '',
// //     classes: '',
// //     branch: 'All',
// //     address: '',
// //   });

// //   if (user?.role !== 'superadmin') {
// //     return (
// //       <div className="text-center py-24">
// //         <p className="text-4xl mb-4">🔒</p>
// //         <p className="text-red-400 font-bold text-xl">Super Admin Only</p>
// //         <p className="text-gray-500 text-sm mt-2">
// //           You don't have access to this section
// //         </p>
// //       </div>
// //     )
// //   }

// //   // const load = async() => {
// //   //   try{

// //   //     const [usersRes,teachersRes] = await Promise.all([
// //   //       api.get('/admin/users'),
// //   //       api.get('/teachers'),
// //   //     ])

// //   //     const allUsers = Array.isArray(usersRes.data.data)
// //   //       ? usersRes.data.data
// //   //       : []

// //   //     setStaff(allUsers.filter(u =>
// //   //       ['admin','teacher'].includes(u.role)
// //   //     ))

// //   //     setTeachers(
// //   //       Array.isArray(teachersRes.data.data)
// //   //       ? teachersRes.data.data
// //   //       : []
// //   //     )

// //   //   } catch{
// //   //     toast.error('Failed to load')
// //   //   } finally{
// //   //     setLoading(false)
// //   //   }
// //   // }

// //   const load = async () => {
// //     try {
// //       const [usersRes, teachersRes] = await Promise.all([
// //         api.get('/admin/users'),
// //         api.get('/teachers/stats'),   // ← use stats endpoint
// //       ]);
// //       const allUsers = Array.isArray(usersRes.data.data) ? usersRes.data.data : [];
// //       setStaff(allUsers.filter(u => ['admin', 'teacher'].includes(u.role)));
// //       setTeacherStats(Array.isArray(teachersRes.data.data) ? teachersRes.data.data : []);
// //     } catch {
// //       toast.error('Failed to load');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     load()
// //   }, [])

// //   const handleCreate = async () => {

// //     if (!form.name || !form.email || !form.password) {
// //       toast.error('Name, email and password are required')
// //       return
// //     }

// //     setCreating(true)

// //     try {

// //       await api.post('/admin/staff', form)

// //       toast.success(`${form.role} account created ✅`)

// //       setForm({
// //         name: '',
// //         email: '',
// //         password: '',
// //         role: 'teacher',

// //         phone: '',
// //         gender: '',
// //         qualification: '',
// //         experience: '',
// //         bio: '',
// //         subjects: '',
// //         classes: '',
// //         branch: 'All',
// //         address: '',
// //       })

// //       setTab('list')

// //       load()

// //     } catch (err) {
// //       toast.error(err.response?.data?.message || 'Failed')
// //     } finally {
// //       setCreating(false)
// //     }

// //   }


// //   const handleRemove = async (id, name) => {
// //     if (!confirm(`Remove ${name} permanently?`)) return;

// //     try {
// //       await api.delete(`/admin/staff/${id}`);

// //       toast.success('Staff removed ✅');

// //       load();

// //     } catch (err) {
// //       toast.error(err.response?.data?.message || 'Failed');
// //     }
// //   };


// //   const inputClass =
// //     "w-full px-4 py-3 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-gold transition-colors"

// //   const labelClass =
// //     "text-xs text-gray-400 mb-1.5 block"


// //   return (
// //     <div>

// //       {/* HEADER */}

// //       <div className="flex items-center justify-between mb-8 flex-wrap gap-4">

// //         <div>
// //           <h1 className="font-display text-3xl font-black text-white">
// //             Manage Staff
// //           </h1>

// //           <p className="text-gold text-xs font-semibold uppercase tracking-widest mt-1">
// //             🔒 Super Admin Only
// //           </p>
// //         </div>

// //         <button
// //           onClick={() => setTab(tab === 'list' ? 'create' : 'list')}
// //           className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold text-[#06091a] font-bold text-sm hover:bg-gold-light transition-colors">

// //           <Plus size={16} />

// //           {tab === 'list' ? 'Add Staff' : 'View Staff'}

// //         </button>

// //       </div>


// //       {/* STAFF LIST */}

// //       {tab === 'list' && (

// //         <>

// //           {/* ADMINS */}

// //           <div className="mb-10">

// //             <h2 className="font-bold text-white text-lg mb-4">
// //               Admins ({staff.filter(s => s.role === 'admin').length})
// //             </h2>

// //             {staff.filter(s => s.role === 'admin').length === 0 ? (

// //               <p className="text-gray-500 text-sm">
// //                 No admins added yet
// //               </p>

// //             ) : (

// //               <div className="space-y-3">

// //                 {staff.filter(s => s.role === 'admin').map(s => (

// //                   <div
// //                     key={s._id}
// //                     className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 flex-wrap gap-3">

// //                     <div className="flex items-center gap-3">

// //                       <div className="w-10 h-10 rounded-full bg-royal/20 flex items-center justify-center font-bold text-gold">
// //                         {s.name?.charAt(0)}
// //                       </div>

// //                       <div>
// //                         <p className="font-semibold text-white text-sm">{s.name}</p>
// //                         <p className="text-xs text-gray-400">{s.email}</p>
// //                       </div>

// //                     </div>

// //                     <div className="flex items-center gap-3">

// //                       <span className="px-3 py-1 rounded-full text-xs font-bold bg-royal/30 text-blue-300 uppercase">
// //                         Admin
// //                       </span>

// //                       <button
// //                         onClick={() => handleRemove(s._id, s.name)}
// //                         className="p-2 rounded-lg bg-red-900/30 text-red-400 hover:bg-red-900/50 transition-colors">

// //                         <Trash2 size={14} />

// //                       </button>

// //                     </div>

// //                   </div>

// //                 ))}

// //               </div>

// //             )}

// //           </div>


// //           {/* TEACHERS */}

// //           {/* <div>

// //             <h2 className="font-bold text-white text-lg mb-4">
// //               Teachers ({teachers.length})
// //             </h2>

// //             {loading ? (

// //               <p className="text-gray-400 text-center py-10">
// //                 Loading...
// //               </p>

// //             ) : teachers.length === 0 ? (

// //               <div className="text-center py-10">

// //                 <p className="text-4xl mb-3">👨‍🏫</p>

// //                 <p className="text-gray-500">
// //                   No teachers added yet
// //                 </p>

// //               </div>

// //             ) : (

// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

// //                 {teachers.map(t => (

// //                   <div
// //                     key={t._id}
// //                     className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">

// //                     <div className="flex items-start justify-between mb-4">

// //                       <div className="flex items-center gap-3">

// //                         <div className="w-14 h-14 rounded-full bg-royal/20 flex items-center justify-center font-bold text-gold text-xl">
// //                           {t.name?.charAt(0)}
// //                         </div>

// //                         <div>
// //                           <p className="font-bold text-white">{t.name}</p>
// //                           <p className="text-xs text-gold">{t.qualification || 'N/A'}</p>
// //                           <p className="text-xs text-gray-400">{t.email}</p>
// //                         </div>

// //                       </div>

// //                       <button
// //                         onClick={() => handleRemove(t._id, t.name)}
// //                         className="p-2 rounded-lg bg-red-900/30 text-red-400 hover:bg-red-900/50 transition-colors flex-shrink-0">

// //                         <Trash2 size={14} />

// //                       </button>

// //                     </div>

// //                     <p className="text-xs text-gray-500">
// //                       Joined: {new Date(t.createdAt).toLocaleDateString('en-IN', {
// //                         day: 'numeric',
// //                         month: 'short',
// //                         year: 'numeric'
// //                       })}
// //                     </p>

// //                   </div>

// //                 ))}

// //               </div>

// //             )}

// //           </div> */}

// //           {/* Teacher List — Full Details with Stats */}
// // <div>
// //   <h2 className="font-bold text-white text-lg mb-4">
// //     Teachers ({teacherStats.length})
// //   </h2>
// //   {loading ? (
// //     <p className="text-gray-400 text-center py-10">Loading...</p>
// //   ) : teacherStats.length === 0 ? (
// //     <div className="text-center py-10">
// //       <p className="text-4xl mb-3">👨‍🏫</p>
// //       <p className="text-gray-500">No teachers added yet</p>
// //     </div>
// //   ) : (
// //     <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
// //       {teacherStats.map(t => (
// //         <div key={t._id}
// //           className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">

// //           {/* Top Row */}
// //           <div className="flex items-start justify-between mb-4">
// //             <div className="flex items-center gap-3">
// //               {t.photo ? (
// //                 <img src={t.photo} alt={t.name}
// //                   className="w-14 h-14 rounded-full object-cover border-2 border-royal/30" />
// //               ) : (
// //                 <div className="w-14 h-14 rounded-full bg-royal/20 flex items-center justify-center font-bold text-gold text-xl">
// //                   {t.name?.charAt(0)}
// //                 </div>
// //               )}
// //               <div>
// //                 <p className="font-bold text-white">{t.name}</p>
// //                 <p className="text-xs text-gold">{t.qualification || 'N/A'}</p>
// //                 <p className="text-xs text-gray-400">{t.email}</p>
// //                 <p className="text-xs text-gray-500">🔑 Login: {t.email}</p>
// //               </div>
// //             </div>
// //             <button
// //               onClick={() => handleRemove(t._id, t.name)}
// //               className="p-2 rounded-lg bg-red-900/30 text-red-400 hover:bg-red-900/50 transition-colors flex-shrink-0">
// //               <Trash2 size={14} />
// //             </button>
// //           </div>

// //           {/* Stats Row */}
// //           <div className="grid grid-cols-3 gap-2 mb-4">
// //             <div className="p-3 rounded-xl bg-royal/10 border border-royal/20 text-center">
// //               <p className="font-black text-white text-xl">{t.stats?.studentCount || 0}</p>
// //               <p className="text-[10px] text-gray-400 uppercase tracking-widest">Students</p>
// //             </div>
// //             <div className="p-3 rounded-xl bg-green-900/20 border border-green-700/20 text-center">
// //               <p className="font-black text-green-400 text-xl">{t.stats?.paidCount || 0}</p>
// //               <p className="text-[10px] text-gray-400 uppercase tracking-widest">Paid</p>
// //             </div>
// //             <div className="p-3 rounded-xl bg-red-900/20 border border-red-700/20 text-center">
// //               <p className="font-black text-red-400 text-xl">{t.stats?.unpaidCount || 0}</p>
// //               <p className="text-[10px] text-gray-400 uppercase tracking-widest">Unpaid</p>
// //             </div>
// //           </div>

// //           {/* Details Grid */}
// //           <div className="grid grid-cols-2 gap-3 text-xs mb-3">
// //             <div className="p-3 rounded-xl bg-white/5">
// //               <p className="text-gray-500 mb-1">Branch</p>
// //               <p className="text-white font-semibold">📍 {t.branch}</p>
// //             </div>
// //             <div className="p-3 rounded-xl bg-white/5">
// //               <p className="text-gray-500 mb-1">Experience</p>
// //               <p className="text-white font-semibold">{t.experience || 0} years</p>
// //             </div>
// //             <div className="p-3 rounded-xl bg-white/5">
// //               <p className="text-gray-500 mb-1">Phone</p>
// //               <p className="text-white font-semibold">{t.phone || '—'}</p>
// //             </div>
// //             <div className="p-3 rounded-xl bg-white/5">
// //               <p className="text-gray-500 mb-1">Gender</p>
// //               <p className="text-white font-semibold">{t.gender || '—'}</p>
// //             </div>
// //           </div>

// //           {/* Subjects */}
// //           {t.subjects?.length > 0 && (
// //             <div className="mb-3">
// //               <p className="text-xs text-gray-500 mb-2">Subjects</p>
// //               <div className="flex flex-wrap gap-2">
// //                 {t.subjects.map(s => (
// //                   <span key={s}
// //                     className="px-2 py-1 rounded-lg bg-royal/20 text-blue-300 text-xs font-semibold">
// //                     {s}
// //                   </span>
// //                 ))}
// //               </div>
// //             </div>
// //           )}

// //           {/* Classes */}
// //           {t.classes?.length > 0 && (
// //             <div className="mb-3">
// //               <p className="text-xs text-gray-500 mb-2">Handles Classes</p>
// //               <div className="flex flex-wrap gap-2">
// //                 {t.classes.map(c => (
// //                   <span key={c}
// //                     className="px-2 py-1 rounded-lg bg-gold/10 text-gold text-xs font-semibold">
// //                     Class {c}
// //                   </span>
// //                 ))}
// //               </div>
// //             </div>
// //           )}

// //           {/* Bio */}
// //           {t.bio && (
// //             <div className="p-3 rounded-xl bg-white/5 mb-3">
// //               <p className="text-xs text-gray-400 leading-relaxed">{t.bio}</p>
// //             </div>
// //           )}

// //           {/* Login Credentials Box */}
// //           <div className="p-3 rounded-xl bg-gold/5 border border-gold/20">
// //             <p className="text-xs text-gold font-semibold mb-1">🔑 Login Credentials</p>
// //             <p className="text-xs text-gray-300">Email: <span className="text-white font-mono">{t.email}</span></p>
// //             <p className="text-xs text-gray-300 mt-0.5">Password: <span className="text-white font-mono">Set by Super Admin</span></p>
// //           </div>

// //           <p className="text-xs text-gray-500 mt-3">
// //             Joined: {new Date(t.joiningDate || t.createdAt).toLocaleDateString('en-IN', {
// //               day: 'numeric', month: 'short', year: 'numeric'
// //             })}
// //           </p>
// //         </div>
// //       ))}
// //     </div>
// //   )}
// // </div>

// //         </>

// //       )}

// //     </div>

// //   )

// // }


// import { useEffect, useState } from 'react'
// import api from '../../services/api'
// import toast from 'react-hot-toast'
// import { useAuth } from '../../context/AuthContext'
// import { Eye, EyeOff, Plus, Trash2 } from 'lucide-react'

// export default function ManageStaff() {

//   const { user } = useAuth()

//   const [staff, setStaff] = useState([])
//   const [teacherStats, setTeacherStats] = useState([])
//   const [loading, setLoading] = useState(true)

//   const [showPass, setShowPass] = useState(false)
//   const [creating, setCreating] = useState(false)

//   const [tab, setTab] = useState('list')

//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     password: '',
//     role: 'teacher',

//     phone: '',
//     gender: '',
//     qualification: '',
//     experience: '',
//     bio: '',
//     subjects: '',
//     classes: '',
//     branch: 'All',
//     address: '',
//   })

//   if (user?.role !== 'superadmin') {
//     return (
//       <div className="text-center py-24">
//         <p className="text-4xl mb-4">🔒</p>
//         <p className="text-red-400 font-bold text-xl">Super Admin Only</p>
//         <p className="text-gray-500 text-sm mt-2">
//           You don't have access to this section
//         </p>
//       </div>
//     )
//   }

//   const load = async () => {
//     try {

//       const [usersRes, teachersRes] = await Promise.all([
//         api.get('/admin/users'),
//         api.get('/teachers/stats')
//       ])

//       const allUsers = Array.isArray(usersRes.data.data)
//         ? usersRes.data.data
//         : []

//       setStaff(allUsers.filter(u =>
//         ['admin', 'teacher'].includes(u.role)
//       ))

//       setTeacherStats(
//         Array.isArray(teachersRes.data.data)
//           ? teachersRes.data.data
//           : []
//       )

//     } catch {
//       toast.error('Failed to load')
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     load()
//   }, [])

//   const handleCreate = async () => {

//     if (!form.name || !form.email || !form.password) {
//       toast.error('Name, email and password are required')
//       return
//     }

//     setCreating(true)

//     try {

//       await api.post('/admin/staff', form)

//       toast.success(`${form.role} account created ✅`)

//       setForm({
//         name: '',
//         email: '',
//         password: '',
//         role: 'teacher',

//         phone: '',
//         gender: '',
//         qualification: '',
//         experience: '',
//         bio: '',
//         subjects: '',
//         classes: '',
//         branch: 'All',
//         address: '',
//       })

//       setTab('list')

//       load()

//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Failed')
//     } finally {
//       setCreating(false)
//     }

//   }

//   const handleRemove = async (id, name) => {

//     if (!confirm(`Remove ${name} permanently?`)) return

//     try {

//       await api.delete(`/admin/staff/${id}`)

//       toast.success('Staff removed ✅')

//       load()

//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Failed')
//     }

//   }

//   const admins = staff.filter(s => s.role === 'admin')

//   return (
//     <div>

//       {/* HEADER */}

//       <div className="flex items-center justify-between mb-8 flex-wrap gap-4">

//         <div>
//           <h1 className="font-display text-3xl font-black text-white">
//             Manage Staff
//           </h1>

//           <p className="text-gold text-xs font-semibold uppercase tracking-widest mt-1">
//             🔒 Super Admin Only
//           </p>
//         </div>

//         <button
//           onClick={() => setTab(tab === 'list' ? 'create' : 'list')}
//           className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold text-[#06091a] font-bold text-sm hover:bg-gold-light transition-colors">

//           <Plus size={16} />

//           {tab === 'list' ? 'Add Staff' : 'View Staff'}

//         </button>

//       </div>


//       {/* STAFF LIST */}

//       {tab === 'list' && (

//         <>

//           {/* ADMINS */}

//           <div className="mb-10">

//             <h2 className="font-bold text-white text-lg mb-4">
//               Admins ({admins.length})
//             </h2>

//             {admins.length === 0 ? (

//               <p className="text-gray-500 text-sm">
//                 No admins added yet
//               </p>

//             ) : (

//               <div className="space-y-3">

//                 {admins.map(s => (

//                   <div
//                     key={s._id}
//                     className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 flex-wrap gap-3">

//                     <div className="flex items-center gap-3">

//                       <div className="w-10 h-10 rounded-full bg-royal/20 flex items-center justify-center font-bold text-gold">
//                         {s.name?.charAt(0)}
//                       </div>

//                       <div>
//                         <p className="font-semibold text-white text-sm">{s.name}</p>
//                         <p className="text-xs text-gray-400">{s.email}</p>
//                       </div>

//                     </div>

//                     <div className="flex items-center gap-3">

//                       <span className="px-3 py-1 rounded-full text-xs font-bold bg-royal/30 text-blue-300 uppercase">
//                         Admin
//                       </span>

//                       <button
//                         onClick={() => handleRemove(s._id, s.name)}
//                         className="p-2 rounded-lg bg-red-900/30 text-red-400 hover:bg-red-900/50 transition-colors">

//                         <Trash2 size={14} />

//                       </button>

//                     </div>

//                   </div>

//                 ))}

//               </div>

//             )}

//           </div>


//           {/* TEACHERS */}

//           <div>

//             <h2 className="font-bold text-white text-lg mb-4">
//               Teachers ({teacherStats.length})
//             </h2>

//             {loading ? (

//               <p className="text-gray-400 text-center py-10">
//                 Loading...
//               </p>

//             ) : teacherStats.length === 0 ? (

//               <div className="text-center py-10">

//                 <p className="text-4xl mb-3">👨‍🏫</p>

//                 <p className="text-gray-500">
//                   No teachers added yet
//                 </p>

//               </div>

//             ) : (

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

//                 {teacherStats.map(t => (

//                   <div
//                     key={t._id}
//                     className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">

//                     {/* Top Row */}

//                     <div className="flex items-start justify-between mb-4">

//                       <div className="flex items-center gap-3">

//                         {t.photo ? (

//                           <img
//                             src={t.photo}
//                             alt={t.name}
//                             className="w-14 h-14 rounded-full object-cover border-2 border-royal/30"
//                           />

//                         ) : (

//                           <div className="w-14 h-14 rounded-full bg-royal/20 flex items-center justify-center font-bold text-gold text-xl">
//                             {t.name?.charAt(0)}
//                           </div>

//                         )}

//                         <div>
//                           <p className="font-bold text-white">{t.name}</p>
//                           <p className="text-xs text-gold">{t.qualification || 'N/A'}</p>
//                           <p className="text-xs text-gray-400">{t.email}</p>
//                         </div>

//                       </div>

//                       <button
//                         onClick={() => handleRemove(t._id, t.name)}
//                         className="p-2 rounded-lg bg-red-900/30 text-red-400 hover:bg-red-900/50 transition-colors">

//                         <Trash2 size={14} />

//                       </button>

//                     </div>

//                     {/* Stats */}

//                     <div className="grid grid-cols-3 gap-2 mb-4">

//                       <div className="p-3 rounded-xl bg-royal/10 border border-royal/20 text-center">
//                         <p className="font-black text-white text-xl">{t.stats?.studentCount || 0}</p>
//                         <p className="text-[10px] text-gray-400 uppercase">Students</p>
//                       </div>

//                       <div className="p-3 rounded-xl bg-green-900/20 border border-green-700/20 text-center">
//                         <p className="font-black text-green-400 text-xl">{t.stats?.paidCount || 0}</p>
//                         <p className="text-[10px] text-gray-400 uppercase">Paid</p>
//                       </div>

//                       <div className="p-3 rounded-xl bg-red-900/20 border border-red-700/20 text-center">
//                         <p className="font-black text-red-400 text-xl">{t.stats?.unpaidCount || 0}</p>
//                         <p className="text-[10px] text-gray-400 uppercase">Unpaid</p>
//                       </div>

//                     </div>

//                     <p className="text-xs text-gray-500">
//                       Joined: {new Date(t.joiningDate || t.createdAt).toLocaleDateString('en-IN')}
//                     </p>

//                   </div>

//                 ))}

//               </div>

//             )}

//           </div>

//         </>

//       )}

//     </div>
//   )

// }




import { useEffect, useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff, Plus, Trash2 } from 'lucide-react';

export default function ManageStaff() {
  const { user }       = useAuth();
  const [staff,        setStaff]        = useState([]);
  const [teacherStats, setTeacherStats] = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [showPass,     setShowPass]     = useState(false);
  const [creating,     setCreating]     = useState(false);
  const [tab,          setTab]          = useState('list');
  const [resetId,      setResetId]      = useState(null);
  const [newPass,      setNewPass]      = useState('');
  const [resetting,    setResetting]    = useState(false);

  const [form, setForm] = useState({
    name: '', email: '', password: '', role: 'teacher',
    phone: '', gender: '', qualification: '',
    experience: '', bio: '', subjects: '',
    classes: '', branch: 'All', address: '',
  });

  if (user?.role !== 'superadmin') {
    return (
      <div className="text-center py-24">
        <p className="text-4xl mb-4">🔒</p>
        <p className="text-red-400 font-bold text-xl">Super Admin Only</p>
        <p className="text-gray-500 text-sm mt-2">
          You don't have access to this section
        </p>
      </div>
    );
  }

  const load = async () => {
    setLoading(true);
    try {
      const [usersRes, teachersRes] = await Promise.all([
        api.get('/admin/users'),
        api.get('/teachers/stats'),
      ]);
      const allUsers = Array.isArray(usersRes.data.data)
        ? usersRes.data.data
        : [];
      setStaff(allUsers.filter(u => ['admin', 'teacher'].includes(u.role)));
      setTeacherStats(
        Array.isArray(teachersRes.data.data) ? teachersRes.data.data : []
      );
    } catch {
      toast.error('Failed to load staff');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const handleCreate = async () => {
    if (!form.name || !form.email || !form.password) {
      toast.error('Name, email and password are required');
      return;
    }
    setCreating(true);
    try {
      await api.post('/admin/staff', form);
      toast.success(`${form.role} account created ✅`);
      setForm({
        name: '', email: '', password: '', role: 'teacher',
        phone: '', gender: '', qualification: '',
        experience: '', bio: '', subjects: '',
        classes: '', branch: 'All', address: '',
      });
      setTab('list');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to create');
    } finally {
      setCreating(false);
    }
  };

  const handleRemove = async (id, name) => {
    if (!confirm(`Remove ${name} permanently?`)) return;
    try {
      await api.delete(`/admin/staff/${id}`);
      toast.success('Staff removed ✅');
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  const handleReset = async () => {
    if (!newPass || newPass.length < 6) {
      toast.error('Min 6 characters');
      return;
    }
    setResetting(true);
    try {
      await api.patch(`/admin/staff/${resetId}/reset-password`, {
        newPassword: newPass,
      });
      toast.success('Password reset ✅');
      setResetId(null);
      setNewPass('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    } finally {
      setResetting(false);
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-gold transition-colors';
  const labelClass = 'text-xs text-gray-400 mb-1.5 block';

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-display text-3xl font-black text-white">
            Manage Staff
          </h1>
          <p className="text-gold text-xs font-semibold uppercase tracking-widest mt-1">
            🔒 Super Admin Only
          </p>
        </div>
        <button
          onClick={() => setTab(tab === 'list' ? 'create' : 'list')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gold text-[#06091a] font-bold text-sm hover:bg-gold-light transition-colors">
          <Plus size={16} />
          {tab === 'list' ? 'Add Staff' : 'View Staff'}
        </button>
      </div>

      {/* ===================== CREATE FORM ===================== */}
      {tab === 'create' && (
        <div className="p-6 rounded-2xl bg-white/5 border border-gold/20 mb-10">
          <h2 className="font-bold text-white mb-2">Add New Staff Member</h2>
          <p className="text-gray-500 text-xs mb-6">
            Teachers are stored in a separate collection with full profile details
          </p>

          {/* Role Toggle */}
          <div className="mb-6">
            <label className={labelClass}>Role *</label>
            <div className="flex gap-3">
              {['teacher', 'admin'].map(r => (
                <button key={r}
                  onClick={() => setForm({ ...form, role: r })}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold capitalize transition-colors ${
                    form.role === r
                      ? 'bg-royal text-white'
                      : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                  }`}>
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Account Details */}
          <p className="text-xs text-gold font-semibold uppercase tracking-widest mb-4">
            Account Details
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className={labelClass}>Full Name *</label>
              <input type="text" placeholder="e.g. Rajesh Kumar"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Email *</label>
              <input type="email" placeholder="teacher@a1classes.com"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Password *</label>
              <div className="relative">
                <input
                  type={showPass ? 'text' : 'password'}
                  placeholder="Set strong password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  className={inputClass + ' pr-10'} />
                <button type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
          </div>

          {/* Teacher Extra Details */}
          {form.role === 'teacher' && (
            <>
              <p className="text-xs text-gold font-semibold uppercase tracking-widest mb-4">
                Teacher Profile Details
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className={labelClass}>Phone</label>
                  <input type="text" placeholder="10-digit number"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Gender</label>
                  <select value={form.gender}
                    onChange={e => setForm({ ...form, gender: e.target.value })}
                    className={inputClass}>
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Branch</label>
                  <select value={form.branch}
                    onChange={e => setForm({ ...form, branch: e.target.value })}
                    className={inputClass}>
                    <option value="All">All Branches</option>
                    <option value="Zirakpur">Zirakpur</option>
                    <option value="Baltana">Baltana</option>
                    <option value="Behlana">Behlana</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Qualification</label>
                  <input type="text" placeholder="e.g. M.Sc Physics, B.Ed"
                    value={form.qualification}
                    onChange={e => setForm({ ...form, qualification: e.target.value })}
                    className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Experience (years)</label>
                  <input type="number" placeholder="e.g. 5"
                    value={form.experience}
                    onChange={e => setForm({ ...form, experience: e.target.value })}
                    className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Subjects (comma separated)</label>
                  <input type="text" placeholder="e.g. Physics, Maths"
                    value={form.subjects}
                    onChange={e => setForm({ ...form, subjects: e.target.value })}
                    className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Classes (comma separated)</label>
                  <input type="text" placeholder="e.g. 11, 12"
                    value={form.classes}
                    onChange={e => setForm({ ...form, classes: e.target.value })}
                    className={inputClass} />
                </div>
                <div className="md:col-span-2">
                  <label className={labelClass}>Address</label>
                  <input type="text" placeholder="Home address"
                    value={form.address}
                    onChange={e => setForm({ ...form, address: e.target.value })}
                    className={inputClass} />
                </div>
                <div className="md:col-span-3">
                  <label className={labelClass}>Bio</label>
                  <textarea rows={3}
                    placeholder="Short bio about the teacher..."
                    value={form.bio}
                    onChange={e => setForm({ ...form, bio: e.target.value })}
                    className={inputClass + ' resize-none'} />
                </div>
              </div>
            </>
          )}

          <button onClick={handleCreate} disabled={creating}
            className="px-8 py-3 rounded-xl bg-gold text-[#06091a] font-bold text-sm hover:bg-gold-light disabled:opacity-60 transition-colors">
            {creating ? 'Creating...' : `+ Create ${form.role} Account`}
          </button>
        </div>
      )}

      {/* ===================== LIST TAB ===================== */}
      {tab === 'list' && (
        <>
          {/* Admins */}
          <div className="mb-10">
            <h2 className="font-bold text-white text-lg mb-4">
              Admins ({staff.filter(s => s.role === 'admin').length})
            </h2>
            {staff.filter(s => s.role === 'admin').length === 0 ? (
              <p className="text-gray-500 text-sm">No admins added yet</p>
            ) : (
              <div className="space-y-3">
                {staff.filter(s => s.role === 'admin').map(s => (
                  <div key={s._id}
                    className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 flex-wrap gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-royal/20 flex items-center justify-center font-bold text-gold text-lg">
                        {s.name?.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm">{s.name}</p>
                        <p className="text-xs text-gray-400">{s.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-royal/30 text-blue-300 uppercase">
                        Admin
                      </span>
                      <button
                        onClick={() => setResetId(s._id)}
                        className="p-2 rounded-lg bg-yellow-900/30 text-yellow-400 hover:bg-yellow-900/50 transition-colors"
                        title="Reset Password">
                        🔑
                      </button>
                      <button
                        onClick={() => handleRemove(s._id, s.name)}
                        className="p-2 rounded-lg bg-red-900/30 text-red-400 hover:bg-red-900/50 transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Teachers */}
          <div>
            <h2 className="font-bold text-white text-lg mb-4">
              Teachers ({teacherStats.length})
            </h2>
            {loading ? (
              <p className="text-gray-400 text-center py-10">Loading...</p>
            ) : teacherStats.length === 0 ? (
              <div className="text-center py-10">
                <p className="text-4xl mb-3">👨‍🏫</p>
                <p className="text-gray-500">No teachers added yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {teacherStats.map(t => (
                  <div key={t._id}
                    className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">

                    {/* Top Row */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {t.photo ? (
                          <img src={t.photo} alt={t.name}
                            className="w-14 h-14 rounded-full object-cover border-2 border-royal/30" />
                        ) : (
                          <div className="w-14 h-14 rounded-full bg-royal/20 flex items-center justify-center font-bold text-gold text-xl">
                            {t.name?.charAt(0)}
                          </div>
                        )}
                        <div>
                          <p className="font-bold text-white">{t.name}</p>
                          <p className="text-xs text-gold">{t.qualification || 'N/A'}</p>
                          <p className="text-xs text-gray-400">{t.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button
                          onClick={() => setResetId(t._id)}
                          className="p-2 rounded-lg bg-yellow-900/30 text-yellow-400 hover:bg-yellow-900/50 transition-colors"
                          title="Reset Password">
                          🔑
                        </button>
                        <button
                          onClick={() => handleRemove(t._id, t.name)}
                          className="p-2 rounded-lg bg-red-900/30 text-red-400 hover:bg-red-900/50 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="p-3 rounded-xl bg-royal/10 border border-royal/20 text-center">
                        <p className="font-black text-white text-xl">
                          {t.stats?.studentCount || 0}
                        </p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                          Students
                        </p>
                      </div>
                      <div className="p-3 rounded-xl bg-green-900/20 border border-green-700/20 text-center">
                        <p className="font-black text-green-400 text-xl">
                          {t.stats?.paidCount || 0}
                        </p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                          Paid
                        </p>
                      </div>
                      <div className="p-3 rounded-xl bg-red-900/20 border border-red-700/20 text-center">
                        <p className="font-black text-red-400 text-xl">
                          {t.stats?.unpaidCount || 0}
                        </p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                          Unpaid
                        </p>
                      </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                      <div className="p-3 rounded-xl bg-white/5">
                        <p className="text-gray-500 mb-1">Branch</p>
                        <p className="text-white font-semibold">📍 {t.branch}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5">
                        <p className="text-gray-500 mb-1">Experience</p>
                        <p className="text-white font-semibold">
                          {t.experience || 0} years
                        </p>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5">
                        <p className="text-gray-500 mb-1">Phone</p>
                        <p className="text-white font-semibold">{t.phone || '—'}</p>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5">
                        <p className="text-gray-500 mb-1">Gender</p>
                        <p className="text-white font-semibold">{t.gender || '—'}</p>
                      </div>
                    </div>

                    {/* Subjects */}
                    {t.subjects?.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs text-gray-500 mb-2">Subjects</p>
                        <div className="flex flex-wrap gap-2">
                          {t.subjects.map(s => (
                            <span key={s}
                              className="px-2 py-1 rounded-lg bg-royal/20 text-blue-300 text-xs font-semibold">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Classes */}
                    {t.classes?.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs text-gray-500 mb-2">Handles Classes</p>
                        <div className="flex flex-wrap gap-2">
                          {t.classes.map(c => (
                            <span key={c}
                              className="px-2 py-1 rounded-lg bg-gold/10 text-gold text-xs font-semibold">
                              Class {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Bio */}
                    {t.bio && (
                      <div className="p-3 rounded-xl bg-white/5 mb-3">
                        <p className="text-xs text-gray-400 leading-relaxed">
                          {t.bio}
                        </p>
                      </div>
                    )}

                    {/* Login Credentials */}
                    <div className="p-3 rounded-xl bg-gold/5 border border-gold/20 mb-3">
                      <p className="text-xs text-gold font-semibold mb-1">
                        🔑 Login Credentials
                      </p>
                      <p className="text-xs text-gray-300">
                        Email:{' '}
                        <span className="text-white font-mono">{t.email}</span>
                      </p>
                      <p className="text-xs text-gray-300 mt-0.5">
                        Password:{' '}
                        <span className="text-yellow-400 font-mono text-[10px]">
                          Use 🔑 button to reset if forgotten
                        </span>
                      </p>
                    </div>

                    <p className="text-xs text-gray-500">
                      Joined:{' '}
                      {new Date(t.joiningDate || t.createdAt).toLocaleDateString(
                        'en-IN',
                        { day: 'numeric', month: 'short', year: 'numeric' }
                      )}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* ===================== RESET PASSWORD MODAL ===================== */}
      {resetId && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-[#0c1229] border border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            <p className="text-2xl mb-3">🔑</p>
            <h3 className="font-bold text-white text-lg mb-1">Reset Password</h3>
            <p className="text-gray-400 text-xs mb-5">
              Set a new password for this staff member. Share it with them directly.
            </p>
            <input
              type="text"
              placeholder="New password (min 6 characters)"
              value={newPass}
              onChange={e => setNewPass(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white text-sm focus:outline-none focus:border-gold mb-4"
            />
            <div className="flex gap-3">
              <button
                onClick={handleReset}
                disabled={resetting}
                className="flex-1 py-2.5 rounded-xl bg-gold text-[#06091a] font-bold text-sm disabled:opacity-60 hover:bg-gold-light transition-colors">
                {resetting ? 'Resetting...' : 'Reset Password'}
              </button>
              <button
                onClick={() => { setResetId(null); setNewPass(''); }}
                className="flex-1 py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-sm hover:bg-white/10 transition-colors">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}