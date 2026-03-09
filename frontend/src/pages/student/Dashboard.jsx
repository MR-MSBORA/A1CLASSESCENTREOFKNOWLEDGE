// import { useEffect, useState } from "react";
// import { Link, Outlet } from "react-router-dom";
// import api from "../../services/api";
// import { useAuth } from "../../context/AuthContext";
// import { motion, AnimatePresence } from "framer-motion";

// /* animation helper */
// const stagger = (i) => ({
//   initial: { opacity: 0, y: 24 },
//   animate: { opacity: 1, y: 0 },
//   transition: { duration: 0.45, delay: i * 0.07 },
// });

// /* radial attendance circle */
// function RadialProgress({ pct = 0, size = 96, stroke = 8, color = "#f5c842" }) {
//   const r = (size - stroke) / 2;
//   const circ = 2 * Math.PI * r;

//   return (
//     <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
//       <circle
//         cx={size / 2}
//         cy={size / 2}
//         r={r}
//         fill="none"
//         stroke="rgba(255,255,255,0.07)"
//         strokeWidth={stroke}
//       />

//       <circle
//         cx={size / 2}
//         cy={size / 2}
//         r={r}
//         fill="none"
//         stroke={color}
//         strokeWidth={stroke}
//         strokeDasharray={circ}
//         strokeDashoffset={circ - (Math.min(pct, 100) / 100) * circ}
//         strokeLinecap="round"
//       />
//     </svg>
//   );
// }

// /* marks progress bar */
// function Bar({ pct = 0, color = "#f5c842" }) {
//   return (
//     <div className="h-1.5 w-full rounded-full bg-white/10 overflow-hidden">
//       <motion.div
//         className="h-full"
//         style={{ background: color }}
//         initial={{ width: 0 }}
//         animate={{ width: `${pct}%` }}
//         transition={{ duration: 1 }}
//       />
//     </div>
//   );
// }

// export default function Dashboard() {
//   const { user, refreshUser } = useAuth();

//   const [attendance, setAttendance] = useState(null);
//   const [marks, setMarks] = useState([]);
//   const [notices, setNotices] = useState([]);
//   const [tipIdx, setTipIdx] = useState(0);

//   const isEnrolled = user?.isEnrolled;

//   const TIPS = [
//     "🔥 Consistency beats talent. Show up every day.",
//     "📖 Review notes within 24 hrs to retain 80% more.",
//     "🎯 Top students study their mistakes, not just wins.",
//     "⏰ Study in 25-min focused bursts.",
//     "💡 Teaching a concept strengthens learning.",
//   ];

//   useEffect(() => {
//     refreshUser();

//     api
//       .get("/student/announcements")
//       .then((r) => setNotices(r.data.data?.slice(0, 3) || []));

//     if (isEnrolled) {
//       api.get("/student/attendance").then((r) => setAttendance(r.data.data));
//       api.get("/student/marks").then((r) => setMarks(r.data.data || []));
//     }

//     const iv = setInterval(
//       () => setTipIdx((p) => (p + 1) % TIPS.length),
//       5000
//     );

//     return () => clearInterval(iv);
//   }, [isEnrolled]);

//   const pct = Number(attendance?.percentage || 0);

//   const attColor =
//     pct >= 75 ? "#4ade80" : pct >= 50 ? "#facc15" : "#f87171";

//   const greet = () => {
//     const h = new Date().getHours();
//     return h < 12
//       ? "Good Morning"
//       : h < 17
//       ? "Good Afternoon"
//       : "Good Evening";
//   };

//   const ACTIONS = [
//     {
//       to: "/dashboard/attendance",
//       icon: "📅",
//       label: "Attendance",
//       desc: "Track presence",
//       locked: !isEnrolled,
//     },
//     {
//       to: "/dashboard/marks",
//       icon: "📊",
//       label: "My Marks",
//       desc: "Exam results",
//       locked: !isEnrolled,
//     },
//     {
//       to: "/dashboard/assignments",
//       icon: "📝",
//       label: "Assignments",
//       desc: "Pending tasks",
//       locked: !isEnrolled,
//     },
//     {
//       to: "/dashboard/doubts",
//       icon: "💬",
//       label: "Ask Doubt",
//       desc: "Get help",
//       locked: !isEnrolled,
//     },
//     {
//       to: "/dashboard/notices",
//       icon: "📢",
//       label: "Notices",
//       desc: "Updates",
//       locked: !isEnrolled,
//     },
//     {
//       to: "/dashboard/notes",
//       icon: "📚",
//       label: "Notes",
//       desc: "Study material",
//       locked: false,
//     },
//     {
//       to: "/dashboard/profile",
//       icon: "👤",
//       label: "My Profile",
//       desc: "Edit profile",
//       locked: false,
//     },
//   ];

//   return (
//     <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 space-y-8">

//       {/* HERO */}
//       <motion.div
//         {...stagger(0)}
//         className="relative rounded-3xl px-8 py-8 lg:px-10 lg:py-10"
//         style={{
//           background:
//             "linear-gradient(135deg,#0f1a3e,#06091a,#0d1f12)",
//         }}
//       >
//         <h1 className="text-3xl lg:text-4xl font-black text-white">
//           {greet()}, {user?.name?.split(" ")[0]} 👋
//         </h1>

//         <p className="text-gray-400 mt-2 text-sm">
//           {isEnrolled
//             ? `Class ${user?.class} · Student Portal`
//             : "Student Portal"}
//         </p>
//       </motion.div>

//       {/* STATS */}
//       {isEnrolled && (
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">

//           <motion.div
//             {...stagger(1)}
//             className="rounded-2xl border p-6 flex flex-col items-center"
//           >
//             <p className="text-xs text-gray-400 mb-3 uppercase">
//               Attendance
//             </p>

//             <RadialProgress pct={pct} color={attColor} />

//             <p className="text-white mt-3 font-bold">
//               {pct}%
//             </p>
//           </motion.div>

//           <motion.div
//             {...stagger(2)}
//             className="rounded-2xl border p-6"
//           >
//             <p className="text-xs text-gray-400 uppercase">
//               My Class
//             </p>

//             <p className="text-3xl font-black text-white mt-3">
//               {user?.class || "-"}
//             </p>
//           </motion.div>

//           <motion.div
//             {...stagger(3)}
//             className="rounded-2xl border p-6"
//           >
//             <p className="text-xs text-gray-400 uppercase">
//               Exams
//             </p>

//             <p className="text-3xl font-black text-white mt-3">
//               {marks.length}
//             </p>
//           </motion.div>

//           <motion.div
//             {...stagger(4)}
//             className="rounded-2xl border p-6"
//           >
//             <p className="text-xs text-gray-400 uppercase">
//               Fee Status
//             </p>

//             <p className="text-xl font-bold text-yellow-400 mt-3">
//               {user?.feeStatus || "Unpaid"}
//             </p>
//           </motion.div>
//         </div>
//       )}

//       {/* MOTIVATION */}
//       <motion.div
//         {...stagger(5)}
//         className="flex items-center gap-3 px-5 py-3 rounded-xl border bg-yellow-400/5"
//       >
//         <span className="text-xs font-bold text-yellow-400">
//           PRO TIP
//         </span>

//         <AnimatePresence mode="wait">
//           <motion.p
//             key={tipIdx}
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="text-xs text-gray-300"
//           >
//             {TIPS[tipIdx]}
//           </motion.p>
//         </AnimatePresence>
//       </motion.div>

//       {/* QUICK ACTIONS */}
//       <div>

//         <h2 className="text-white font-bold mb-4 text-lg">
//           Quick Actions
//         </h2>

//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">

//           {ACTIONS.map((a, i) => (
//             <motion.div key={a.to} {...stagger(i + 6)}>

//               {!a.locked ? (
//                 <Link
//                   to={a.to}
//                   className="p-6 rounded-2xl border flex flex-col hover:scale-[1.03] transition"
//                 >
//                   <span className="text-3xl mb-3">
//                     {a.icon}
//                   </span>

//                   <span className="text-white font-semibold text-sm">
//                     {a.label}
//                   </span>

//                   <span className="text-gray-500 text-xs">
//                     {a.desc}
//                   </span>
//                 </Link>
//               ) : (
//                 <div className="p-6 rounded-2xl border opacity-50">
//                   🔒 {a.label}
//                 </div>
//               )}

//             </motion.div>
//           ))}

//         </div>
//       </div>

//       {/* BOTTOM */}
//       {isEnrolled && (
//         <div className="grid lg:grid-cols-5 gap-6">

//           {/* Notices */}
//           <div className="lg:col-span-3 border rounded-2xl p-6">

//             <div className="flex justify-between mb-4">
//               <h3 className="text-white font-bold">
//                 Latest Notices
//               </h3>

//               <Link
//                 to="/dashboard/notices"
//                 className="text-yellow-400 text-sm"
//               >
//                 View all →
//               </Link>
//             </div>

//             {notices.length === 0 ? (
//               <p className="text-gray-500 text-sm">
//                 No notices yet
//               </p>
//             ) : (
//               notices.map((n) => (
//                 <div key={n._id} className="mb-3">
//                   <p className="text-white text-sm font-semibold">
//                     {n.title}
//                   </p>
//                   <p className="text-gray-400 text-xs">
//                     {n.content}
//                   </p>
//                 </div>
//               ))
//             )}
//           </div>

//           {/* Results */}
//           <div className="lg:col-span-2 border rounded-2xl p-6">

//             <div className="flex justify-between mb-4">
//               <h3 className="text-white font-bold">
//                 Recent Results
//               </h3>

//               <Link
//                 to="/dashboard/marks"
//                 className="text-yellow-400 text-sm"
//               >
//                 View all →
//               </Link>
//             </div>

//             {marks.length === 0 ? (
//               <p className="text-gray-500 text-sm">
//                 No results yet
//               </p>
//             ) : (
//               marks.slice(0, 3).map((m) => {
//                 const p =
//                   (m.marksObtained / m.totalMarks) * 100;

//                 return (
//                   <div key={m._id} className="mb-4">
//                     <p className="text-white text-sm">
//                       {m.subject}
//                     </p>

//                     <Bar pct={p} color="#4ade80" />
//                   </div>
//                 );
//               })
//             )}
//           </div>

//         </div>
//       )}

//       {/* NESTED ROUTES */}
//       <Outlet />

//     </div>
//   );
// }



import React from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: "Attendance",
      desc: "Track presence",
      icon: "📅",
      color: "from-red-500/20 to-red-700/20",
      border: "border-red-500/30",
      path: "/dashboard/attendance",
    },
    {
      title: "My Marks",
      desc: "Exam results",
      icon: "📊",
      color: "from-blue-500/20 to-indigo-700/20",
      border: "border-blue-500/30",
      path: "/dashboard/marks",
    },
    {
      title: "Assignments",
      desc: "Pending tasks",
      icon: "📝",
      color: "from-purple-500/20 to-purple-700/20",
      border: "border-purple-500/30",
      path: "/dashboard/assignments",
    },
    {
      title: "Ask Doubt",
      desc: "Get help",
      icon: "💬",
      color: "from-green-500/20 to-green-700/20",
      border: "border-green-500/30",
      path: "/dashboard/doubt",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617] text-white p-8">

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 p-8 rounded-2xl shadow-xl mb-10">
        <h1 className="text-3xl font-bold">Good Morning, Student 👋</h1>
        <p className="opacity-80 mt-1">Class 10 · Student Portal</p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <div className="bg-gradient-to-br from-blue-500/20 to-blue-700/20 p-6 rounded-xl border border-blue-500/30 hover:scale-105 transition">
          <h3 className="text-sm text-blue-300">Attendance</h3>
          <p className="text-3xl font-bold mt-2">0%</p>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-green-700/20 p-6 rounded-xl border border-green-500/30 hover:scale-105 transition">
          <h3 className="text-sm text-green-300">My Class</h3>
          <p className="text-3xl font-bold mt-2">10</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-purple-700/20 p-6 rounded-xl border border-purple-500/30 hover:scale-105 transition">
          <h3 className="text-sm text-purple-300">Exams</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/20 to-orange-600/20 p-6 rounded-xl border border-yellow-500/30 hover:scale-105 transition">
          <h3 className="text-sm text-yellow-300">Fee Status</h3>
          <p className="text-2xl font-bold mt-2 text-yellow-400">Unpaid</p>
        </div>

      </div>

      {/* Tip Banner */}
      <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-lg p-4 mb-10">
        <span className="font-semibold text-yellow-400">PRO TIP</span>
        <span className="ml-3 text-gray-300">
          Study in 25-minute focused bursts (Pomodoro technique).
        </span>
      </div>

      {/* Quick Actions */}
      <h2 className="text-xl font-semibold mb-5">Quick Actions</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action, index) => (
          <div
            key={index}
            onClick={() => navigate(action.path)}
            className={`bg-gradient-to-br ${action.color} p-6 rounded-xl border ${action.border}
            hover:scale-105 hover:shadow-lg cursor-pointer transition`}
          >
            <div className="text-3xl mb-2">{action.icon}</div>
            <h3 className="font-semibold">{action.title}</h3>
            <p className="text-sm text-gray-400">{action.desc}</p>
          </div>
        ))}
      </div>

    </div>
  );
}