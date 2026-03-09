// import React from "react";
// import { useNavigate } from "react-router-dom";

// export default function Dashboard() {
//   const navigate = useNavigate();

//   const quickActions = [
//     {
//       title: "Attendance",
//       desc: "Track presence",
//       icon: "📅",
//       color: "from-red-500/20 to-red-700/20",
//       border: "border-red-500/30",
//       path: "/dashboard/attendance",
//     },
//     {
//       title: "My Marks",
//       desc: "Exam results",
//       icon: "📊",
//       color: "from-blue-500/20 to-indigo-700/20",
//       border: "border-blue-500/30",
//       path: "/dashboard/marks",
//     },
//     {
//       title: "Assignments",
//       desc: "Pending tasks",
//       icon: "📝",
//       color: "from-purple-500/20 to-purple-700/20",
//       border: "border-purple-500/30",
//       path: "/dashboard/assignments",
//     },
//     {
//       title: "Ask Doubt",
//       desc: "Get help",
//       icon: "💬",
//       color: "from-green-500/20 to-green-700/20",
//       border: "border-green-500/30",
//       path: "/dashboard/doubt",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617] text-white p-8">

//       {/* Header */}
//       <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 p-8 rounded-2xl shadow-xl mb-10">
//         <h1 className="text-3xl font-bold">Good Morning, Student 👋</h1>
//         <p className="opacity-80 mt-1">Class 10 · Student Portal</p>
//       </div>

//       {/* Stats Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

//         <div className="bg-gradient-to-br from-blue-500/20 to-blue-700/20 p-6 rounded-xl border border-blue-500/30 hover:scale-105 transition">
//           <h3 className="text-sm text-blue-300">Attendance</h3>
//           <p className="text-3xl font-bold mt-2">0%</p>
//         </div>

//         <div className="bg-gradient-to-br from-green-500/20 to-green-700/20 p-6 rounded-xl border border-green-500/30 hover:scale-105 transition">
//           <h3 className="text-sm text-green-300">My Class</h3>
//           <p className="text-3xl font-bold mt-2">10</p>
//         </div>

//         <div className="bg-gradient-to-br from-purple-500/20 to-purple-700/20 p-6 rounded-xl border border-purple-500/30 hover:scale-105 transition">
//           <h3 className="text-sm text-purple-300">Exams</h3>
//           <p className="text-3xl font-bold mt-2">0</p>
//         </div>

//         <div className="bg-gradient-to-br from-yellow-500/20 to-orange-600/20 p-6 rounded-xl border border-yellow-500/30 hover:scale-105 transition">
//           <h3 className="text-sm text-yellow-300">Fee Status</h3>
//           <p className="text-2xl font-bold mt-2 text-yellow-400">Unpaid</p>
//         </div>

//       </div>

//       {/* Tip Banner */}
//       <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-lg p-4 mb-10">
//         <span className="font-semibold text-yellow-400">PRO TIP</span>
//         <span className="ml-3 text-gray-300">
//           Study in 25-minute focused bursts (Pomodoro technique).
//         </span>
//       </div>

//       {/* Quick Actions */}
//       <h2 className="text-xl font-semibold mb-5">Quick Actions</h2>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {quickActions.map((action, index) => (
//           <div
//             key={index}
//             onClick={() => navigate(action.path)}
//             className={`bg-gradient-to-br ${action.color} p-6 rounded-xl border ${action.border}
//             hover:scale-105 hover:shadow-lg cursor-pointer transition`}
//           >
//             <div className="text-3xl mb-2">{action.icon}</div>
//             <h3 className="font-semibold">{action.title}</h3>
//             <p className="text-sm text-gray-400">{action.desc}</p>
//           </div>
//         ))}
//       </div>

//     </div>
//   );
// }




import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const greet = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good Morning";
    if (h < 17) return "Good Afternoon";
    return "Good Evening";
  };

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
      path: "/dashboard/doubts",
    },
    {
      title: "Notices",
      desc: "Latest updates",
      icon: "📢",
      color: "from-yellow-500/20 to-orange-600/20",
      border: "border-yellow-500/30",
      path: "/dashboard/notices",
    },
    {
      title: "Study Notes",
      desc: "Download material",
      icon: "📚",
      color: "from-cyan-500/20 to-blue-600/20",
      border: "border-cyan-500/30",
      path: "/dashboard/notes",
    },
    {
      title: "My Profile",
      desc: "Edit profile",
      icon: "👤",
      color: "from-pink-500/20 to-rose-600/20",
      border: "border-pink-500/30",
      path: "/dashboard/profile",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617] text-white p-8">

      {/* HEADER */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 p-8 rounded-2xl shadow-xl mb-10">
        <h1 className="text-3xl font-bold">
          {greet()}, {user?.name || "Student"} 👋
        </h1>

        <p className="opacity-80 mt-1">
          Class {user?.class || "-"} · Student Portal
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">

        <div className="bg-gradient-to-br from-blue-500/20 to-blue-700/20 p-6 rounded-xl border border-blue-500/30 hover:scale-105 transition">
          <h3 className="text-sm text-blue-300">Attendance</h3>
          <p className="text-3xl font-bold mt-2">--%</p>
        </div>

        <div className="bg-gradient-to-br from-green-500/20 to-green-700/20 p-6 rounded-xl border border-green-500/30 hover:scale-105 transition">
          <h3 className="text-sm text-green-300">My Class</h3>
          <p className="text-3xl font-bold mt-2">{user?.class || "-"}</p>
        </div>

        <div className="bg-gradient-to-br from-purple-500/20 to-purple-700/20 p-6 rounded-xl border border-purple-500/30 hover:scale-105 transition">
          <h3 className="text-sm text-purple-300">Exams</h3>
          <p className="text-3xl font-bold mt-2">0</p>
        </div>

        <div className="bg-gradient-to-br from-yellow-500/20 to-orange-600/20 p-6 rounded-xl border border-yellow-500/30 hover:scale-105 transition">
          <h3 className="text-sm text-yellow-300">Fee Status</h3>
          <p className="text-2xl font-bold mt-2 text-yellow-400">
            {user?.feeStatus || "Unpaid"}
          </p>
        </div>

      </div>

      {/* TIP */}
      <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-lg p-4 mb-10">
        <span className="font-semibold text-yellow-400">PRO TIP</span>
        <span className="ml-3 text-gray-300">
          Study in 25-minute focused bursts (Pomodoro technique).
        </span>
      </div>

      {/* QUICK ACTIONS */}
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

      {/* NESTED ROUTES RENDER HERE */}
      <div className="mt-10">
        <Outlet />
      </div>

    </div>
  );
}