// // import { useState } from 'react';
// // import { Link, useNavigate } from 'react-router-dom';
// // import { motion } from 'framer-motion';
// // import toast from 'react-hot-toast';
// // import api, { setToken } from '../../services/api';
// // import { useAuth } from '../../context/AuthContext';
// // import { useTheme } from '../../context/ThemeContext';
// // import { Moon, Sun } from 'lucide-react';

// // export default function Register() {
// //     const [form, setForm] = useState({ name: '', email: '', password: '', class: '', phone: '' });
// //     const [loading, setLoading] = useState(false);
// //     const { isDark, toggle } = useTheme();
// //     const { login } = useAuth();
// //     const navigate = useNavigate();

// //     //   const handleSubmit = async (e) => {
// //     //     e.preventDefault();
// //     //     setLoading(true);
// //     //     try {
// //     //       await login(form.email, form.password).catch(async () => {
// //     //         await api.post('/auth/register', { ...form, role: 'student' });
// //     //         await login(form.email, form.password);
// //     //       });
// //     //       toast.success('Account created successfully!');
// //     //       navigate('/dashboard');
// //     //     } catch (err) {
// //     //       toast.error(err.response?.data?.message || 'Registration failed');
// //     //     } finally {
// //     //       setLoading(false);
// //     //     }
// //     //   };

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();

// //         if (!form.name || !form.email || !form.password || !form.class) {
// //             toast.error('Please fill all fields');
// //             return;
// //         }

// //         setLoading(true);
// //         try {
// //             // Step 1 — Register
// //             await api.post('/auth/register', {
// //                 name: form.name,
// //                 email: form.email,
// //                 password: form.password,
// //                 class: Number(form.class),
// //                 phone: form.phone,
// //                 role: 'student',
// //             });

// //             // Step 2 — Auto login after register
// //             await login(form.email, form.password);

// //             toast.success('Welcome to A1 Classes! 🎉');
// //             navigate('/dashboard');
// //         } catch (err) {
// //             toast.error(err.response?.data?.message || 'Registration failed');
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     return (
// //         <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#06091a] px-5 py-10">
// //             <button onClick={toggle} className="fixed top-5 right-5 p-2 rounded-lg bg-gray-200 dark:bg-white/10">
// //                 {isDark ? <Sun size={16} className="text-gold" /> : <Moon size={16} className="text-royal" />}
// //             </button>

// //             <motion.div
// //                 initial={{ opacity: 0, y: 20 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 className="w-full max-w-md p-8 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-xl">

// //                 <Link to="/" className="flex items-center gap-2 mb-8">
// //                     <div className="w-9 h-9 rounded-xl bg-royal flex items-center justify-center font-mono font-bold text-gold text-xs">A1</div>
// //                     <span className="font-display font-black dark:text-white">A1 Classes</span>
// //                 </Link>

// //                 <h1 className="font-display text-3xl font-black mb-1 dark:text-white">Create account</h1>
// //                 <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">Join A1 Classes student portal</p>

// //                 <div className="space-y-4">
// //                     {[
// //                         { label: 'Full Name', key: 'name', type: 'text', ph: 'Rahul Sharma' },
// //                         { label: 'Email', key: 'email', type: 'email', ph: 'you@email.com' },
// //                         { label: 'Password', key: 'password', type: 'password', ph: '••••••••' },
// //                         { label: 'Phone Number', key: 'phone', type: 'text', ph: '10-digit number' },
// //                     ].map(({ label, key, type, ph }) => (
// //                         <div key={key}>
// //                             <label className="text-sm font-medium mb-1.5 block dark:text-gray-300">{label}</label>
// //                             <input type={type} placeholder={ph} value={form[key]}
// //                                 onChange={e => setForm({ ...form, [key]: e.target.value })}
// //                                 className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 dark:text-white focus:outline-none focus:border-royal dark:focus:border-gold transition-colors" />
// //                         </div>
// //                     ))}
// //                     <div>
// //                         <label className="text-sm font-medium mb-1.5 block dark:text-gray-300">Class</label>
// //                         <select value={form.class} onChange={e => setForm({ ...form, class: e.target.value })}
// //                             className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 dark:text-white focus:outline-none focus:border-royal dark:focus:border-gold transition-colors">
// //                             <option value="">Select Class</option>
// //                             <option value="11">Class 11</option>
// //                             <option value="12">Class 12</option>
// //                         </select>
// //                     </div>
// //                     <button onClick={handleSubmit} disabled={loading}
// //                         className="w-full py-3.5 rounded-xl bg-royal text-white font-bold hover:bg-royal-light transition-colors disabled:opacity-60">
// //                         {loading ? 'Creating account...' : 'Create Account'}
// //                     </button>
// //                 </div>

// //                 <p className="text-center text-sm text-gray-500 mt-6">
// //                     Already have an account?{' '}
// //                     <Link to="/login" className="text-gold font-semibold hover:underline">Login</Link>
// //                 </p>
// //             </motion.div>
// //         </div>
// //     );
// // }

// import { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import toast from 'react-hot-toast';
// import api from '../../services/api';
// import { useAuth } from '../../context/AuthContext';
// import { useTheme } from '../../context/ThemeContext';
// import { Moon, Sun } from 'lucide-react';

// export default function Register() {
//   const [form, setForm] = useState({
//     name: '',
//     email: '',
//     password: '',
//     class: '',
//     phone: ''
//   });

//   const [loading, setLoading] = useState(false);

//   const { isDark, toggle } = useTheme();
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   // Handle input change
//   const handleChange = (key, value) => {
//     setForm(prev => ({
//       ...prev,
//       [key]: value.trimStart()
//     }));
//   };

//   // Submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.name || !form.email || !form.password || !form.class) {
//       toast.error('Please fill all required fields');
//       return;
//     }

//     if (form.phone && form.phone.length !== 10) {
//       toast.error('Enter valid 10 digit phone number');
//       return;
//     }

//     setLoading(true);

//     try {
//       // Register student
//       await api.post('/auth/register', {
//         name: form.name,
//         email: form.email.toLowerCase(),
//         password: form.password,
//         class: Number(form.class),
//         phone: form.phone,
//         role: 'student',
//       });

//       // Auto login after register
//       await login(form.email, form.password);

//       toast.success('Welcome to A1 Classes! 🎉');

//       navigate('/dashboard');

//     } catch (err) {
//       toast.error(err.response?.data?.message || 'Registration failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-[#06091a] px-5 py-10">

//       {/* Theme toggle */}
//       <button
//         onClick={toggle}
//         className="fixed top-5 right-5 p-2 rounded-lg bg-gray-200 dark:bg-white/10"
//       >
//         {isDark ? (
//           <Sun size={16} className="text-gold" />
//         ) : (
//           <Moon size={16} className="text-royal" />
//         )}
//       </button>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="w-full max-w-md p-8 rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-xl"
//       >

//         {/* Logo */}
//         <Link to="/" className="flex items-center gap-2 mb-8">
//           <div className="w-9 h-9 rounded-xl bg-royal flex items-center justify-center font-mono font-bold text-gold text-xs">
//             A1
//           </div>
//           <span className="font-display font-black dark:text-white">
//             A1 Classes
//           </span>
//         </Link>

//         {/* Heading */}
//         <h1 className="font-display text-3xl font-black mb-1 dark:text-white">
//           Create account
//         </h1>

//         <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
//           Join A1 Classes student portal
//         </p>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="space-y-4">

//           {/* Full Name */}
//           <div>
//             <label className="text-sm font-medium mb-1.5 block dark:text-gray-300">
//               Full Name
//             </label>
//             <input
//               type="text"
//               placeholder="Rahul Sharma"
//               value={form.name}
//               onChange={e => handleChange('name', e.target.value)}
//               className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 dark:text-white focus:outline-none focus:border-royal dark:focus:border-gold transition-colors"
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label className="text-sm font-medium mb-1.5 block dark:text-gray-300">
//               Email
//             </label>
//             <input
//               type="email"
//               placeholder="you@email.com"
//               value={form.email}
//               onChange={e => handleChange('email', e.target.value)}
//               className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 dark:text-white focus:outline-none focus:border-royal dark:focus:border-gold transition-colors"
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label className="text-sm font-medium mb-1.5 block dark:text-gray-300">
//               Password
//             </label>
//             <input
//               type="password"
//               placeholder="••••••••"
//               value={form.password}
//               onChange={e => handleChange('password', e.target.value)}
//               className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 dark:text-white focus:outline-none focus:border-royal dark:focus:border-gold transition-colors"
//             />
//           </div>

//           {/* Phone */}
//           <div>
//             <label className="text-sm font-medium mb-1.5 block dark:text-gray-300">
//               Phone Number
//             </label>
//             <input
//               type="text"
//               placeholder="10-digit number"
//               value={form.phone}
//               onChange={e => handleChange('phone', e.target.value)}
//               className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 dark:text-white focus:outline-none focus:border-royal dark:focus:border-gold transition-colors"
//             />
//           </div>

//           {/* Class */}
//           <div>
//             <label className="text-sm font-medium mb-1.5 block dark:text-gray-300">
//               Class
//             </label>
//             <select
//               value={form.class}
//               onChange={e => handleChange('class', e.target.value)}
//               className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 dark:text-white focus:outline-none focus:border-royal dark:focus:border-gold transition-colors"
//             >
//               <option value="">Select Class</option>
//               <option value="11">Class 11</option>
//               <option value="12">Class 12</option>
//             </select>
//           </div>

//           {/* Submit */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3.5 rounded-xl bg-royal text-white font-bold hover:bg-royal-light transition-colors disabled:opacity-60"
//           >
//             {loading ? 'Creating account...' : 'Create Account'}
//           </button>

//         </form>

//         {/* Login link */}
//         <p className="text-center text-sm text-gray-500 mt-6">
//           Already have an account?{' '}
//           <Link
//             to="/login"
//             className="text-gold font-semibold hover:underline"
//           >
//             Login
//           </Link>
//         </p>

//       </motion.div>
//     </div>
//   );
// }



import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { useAuth }  from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import {  Eye, EyeOff } from 'lucide-react';

export default function Register() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', confirmPassword: '', class: '', phone: ''
  });
  const [showPass,    setShowPass]    = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading,     setLoading]     = useState(false);

  const { login }          = useAuth();
  const navigate           = useNavigate();

  const classes = [
    { value: '1',  label: 'Class 1'  },
    { value: '2',  label: 'Class 2'  },
    { value: '3',  label: 'Class 3'  },
    { value: '4',  label: 'Class 4'  },
    { value: '5',  label: 'Class 5'  },
    { value: '6',  label: 'Class 6'  },
    { value: '7',  label: 'Class 7'  },
    { value: '8',  label: 'Class 8'  },
    { value: '9',  label: 'Class 9'  },
    { value: '10', label: 'Class 10' },
    { value: '11', label: 'Class 11' },
    { value: '12', label: 'Class 12' },
    { value: '0',  label: 'Competitive Exam / Other' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password || !form.confirmPassword || !form.class) {
      toast.error('Please fill all required fields');
      return;
    }
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      await api.post('/auth/register', {
        name:     form.name,
        email:    form.email,
        password: form.password,
        class:    Number(form.class),
        phone:    form.phone,
        role:     'student',
      });
      await login(form.email, form.password);
      toast.success('Welcome to A1 Classes! 🎉');
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `
    w-full px-4 py-3 rounded-xl border
    border-gray-300 dark:border-white/20
    bg-white dark:bg-white/10
    text-gray-900 dark:text-white
    placeholder-gray-400 dark:placeholder-gray-500
    focus:outline-none focus:border-royal dark:focus:border-gold
    transition-colors text-sm
  `;

  const labelClass = "text-sm font-semibold mb-1.5 block text-gray-700 dark:text-gray-200";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#06091a] px-5 py-10">


      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white dark:bg-[#0c1229] border border-gray-200 dark:border-white/10 rounded-2xl shadow-2xl p-8">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-xl bg-royal flex items-center justify-center font-mono font-bold text-gold text-xs shadow">
            A1
          </div>
          <div>
            <p className="font-display font-black text-sm leading-none text-gray-900 dark:text-white">A1 Classes</p>
            <p className="text-[10px] text-gold tracking-widest uppercase">Centre of Knowledge</p>
          </div>
        </Link>

        <h1 className="font-display text-3xl font-black mb-1 text-gray-900 dark:text-white">
          Create account
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
          Join the A1 Classes student portal
        </p>

        <div className="space-y-4">

          {/* Full Name */}
          <div>
            <label className={labelClass}>Full Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="e.g. Rahul Sharma"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div>
            <label className={labelClass}>Email <span className="text-red-500">*</span></label>
            <input
              type="email"
              placeholder="you@email.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className={inputClass}
            />
          </div>

          {/* Phone */}
          <div>
            <label className={labelClass}>Phone Number</label>
            <input
              type="text"
              placeholder="10-digit mobile number"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              className={inputClass}
            />
          </div>

          {/* Class */}
          <div>
            <label className={labelClass}>Class / Course <span className="text-red-500">*</span></label>
            <select
              value={form.class}
              onChange={e => setForm({ ...form, class: e.target.value })}
              className={inputClass}
              style={{ appearance: 'auto' }}>
              <option value="" disabled>-- Select your class --</option>
              {classes.map(c => (
                <option
                  key={c.value}
                  value={c.value}
                  style={{ background: '#1a1a2e', color: '#fff' }}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Password */}
          <div>
            <label className={labelClass}>Password <span className="text-red-500">*</span></label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Minimum 6 characters"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                className={inputClass + ' pr-12'}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className={labelClass}>Confirm Password <span className="text-red-500">*</span></label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                placeholder="Re-enter your password"
                value={form.confirmPassword}
                onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                className={inputClass + ' pr-12'}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {/* Live match indicator */}
            {form.confirmPassword.length > 0 && (
              <p className={`text-xs mt-1.5 font-medium ${
                form.password === form.confirmPassword
                  ? 'text-green-500'
                  : 'text-red-500'
              }`}>
                {form.password === form.confirmPassword
                  ? '✓ Passwords match'
                  : '✗ Passwords do not match'}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-royal text-white font-bold text-sm hover:bg-royal-light transition-colors disabled:opacity-60 mt-2 shadow-lg shadow-royal/30">
            {loading ? 'Creating account...' : 'Create Account →'}
          </button>

        </div>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-gold font-semibold hover:underline">
            Login here
          </Link>
        </p>

      </motion.div>
    </div>
  );
}