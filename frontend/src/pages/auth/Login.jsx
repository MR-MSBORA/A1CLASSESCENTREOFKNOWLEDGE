// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import toast from 'react-hot-toast';
// import { useAuth } from '../../context/AuthContext';
// import { useTheme } from '../../context/ThemeContext';

// export default function Login() {
//     const [form, setForm] = useState({ email: '', password: '' });
//     const [loading, setLoading] = useState(false);
//     const { login } = useAuth();
//     const navigate = useNavigate();

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const user = await login(form.email, form.password);
//             toast.success(`Welcome back, ${user.name}!`);
//             navigate(user.role === 'admin' ? '/admin' : '/dashboard');
//         } catch (err) {
//             toast.error(err.response?.data?.message || 'Login failed');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#06091a] px-5">

//             <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="w-full max-w-md p-8 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-xl">

//                 <Link to="/" className="flex items-center gap-2 mb-8">
//                     <div className="w-9 h-9 rounded-xl bg-royal flex items-center justify-center font-mono font-bold text-gold text-xs">A1</div>
//                     <span className="font-display font-black dark:text-white">A1 Classes</span>
//                 </Link>

//                 <h1 className="font-display text-3xl font-black mb-1 dark:text-white">Welcome back</h1>
//                 <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">Sign in to your student portal</p>

//                 <div className="space-y-4">
//                     <div>
//                         <label className="text-sm font-medium mb-1.5 block dark:text-gray-300">Email</label>
//                         <input type="email" value={form.email}
//                             onChange={e => setForm({ ...form, email: e.target.value })}
//                             placeholder="you@email.com"
//                             className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 dark:text-white focus:outline-none focus:border-royal dark:focus:border-gold transition-colors" />
//                     </div>
//                     <div>
//                         <label className="text-sm font-medium mb-1.5 block dark:text-gray-300">Password</label>
//                         <input type="password" value={form.password}
//                             onChange={e => setForm({ ...form, password: e.target.value })}
//                             placeholder="••••••••"
//                             className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 dark:text-white focus:outline-none focus:border-royal dark:focus:border-gold transition-colors" />
//                     </div>
//                     <button onClick={handleSubmit} disabled={loading}
//                         className="w-full py-3.5 rounded-xl bg-royal text-white font-bold hover:bg-royal-light transition-colors disabled:opacity-60">
//                         {loading ? 'Signing in...' : 'Sign In'}
//                     </button>
//                 </div>

//                 <p className="text-center text-sm text-gray-500 mt-6">
//                     No account?{' '}
//                     <Link to="/register" className="text-gold font-semibold hover:underline">Register</Link>
//                 </p>
//             </motion.div>
//         </div>
//     );
// }


import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [form,     setForm]     = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading,  setLoading]  = useState(false);
  const { login } = useAuth();
  const navigate  = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error('Fill all fields');
      return;
    }
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      toast.success(`Welcome back, ${user.name}!`);
      if (user.role === 'superadmin' || user.role === 'admin') {
        navigate('/admin');
      } else if (user.role === 'teacher') {
        navigate('/teacher');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#06091a] px-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-8 rounded-2xl bg-[#0c1229] border border-white/10 shadow-2xl">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-xl bg-royal flex items-center justify-center font-mono font-bold text-gold text-xs">
            A1
          </div>
          <div>
            <p className="font-display font-black text-sm leading-none text-white">A1 Classes</p>
            <p className="text-[10px] text-gold tracking-widest uppercase">Centre of Knowledge</p>
          </div>
        </Link>

        <h1 className="font-display text-3xl font-black mb-1 text-white">Welcome back</h1>
        <p className="text-gray-500 text-sm mb-8">Sign in to your portal</p>

        <div className="space-y-4">

          {/* Email */}
          <div>
            <label className="text-sm font-medium mb-1.5 block text-gray-300">Email</label>
            <input
              type="email"
              placeholder="you@email.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-colors text-sm"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium mb-1.5 block text-gray-300">Password</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-colors text-sm pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-royal text-white font-bold hover:bg-royal-light transition-colors disabled:opacity-60 shadow-lg shadow-royal/30">
            {loading ? 'Signing in...' : 'Sign In →'}
          </button>

        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          No account?{' '}
          <Link to="/register" className="text-gold font-semibold hover:underline">
            Register here
          </Link>
        </p>
      </motion.div>
    </div>
  );
}