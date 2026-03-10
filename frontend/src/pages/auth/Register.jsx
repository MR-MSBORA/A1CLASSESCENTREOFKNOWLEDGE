import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

export default function Register() {
  const [form, setForm] = useState({
    name: '', email: '', password: '', confirmPassword: '', class: '', phone: ''
  });
  const [showPass,    setShowPass]    = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading,     setLoading]     = useState(false);

  const { login }  = useAuth();
  const navigate   = useNavigate();

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

    // ── Validation ────────────────────────────────
    if (!form.name || !form.email || !form.password || !form.confirmPassword || !form.class) {
      return toast.error('Please fill all required fields');
    }
    if (form.password.length < 6) {
      return toast.error('Password must be at least 6 characters');
    }
    if (form.password !== form.confirmPassword) {
      return toast.error('Passwords do not match');
    }
    if (form.phone && !/^\d{10}$/.test(form.phone)) {
      return toast.error('Enter a valid 10-digit phone number');
    }

    setLoading(true);
    try {
      // Step 1 — Register (creates user)
      await api.post('/auth/register', {
        name:     form.name.trim(),
        email:    form.email.trim().toLowerCase(),
        password: form.password,
        class:    Number(form.class),
        phone:    form.phone.trim(),
        role:     'student',
      });

      // Step 2 — Auto login right after (uses the same password)
      await login(form.email.trim().toLowerCase(), form.password);

      toast.success('Welcome to A1 Classes! 🎉');
      navigate('/dashboard');

    } catch (err) {
      // ✅ Show exact backend error (e.g. "Email already registered")
      toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-colors text-sm";
  const labelCls = "text-sm font-semibold mb-1.5 block text-gray-300";

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#06091a] px-5 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#0c1229] border border-white/10 rounded-2xl shadow-2xl p-8">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 mb-8">
          <div className="w-9 h-9 rounded-xl bg-royal flex items-center justify-center font-mono font-bold text-gold text-xs shadow">
            A1
          </div>
          <div>
            <p className="font-display font-black text-sm leading-none text-white">A1 Classes</p>
            <p className="text-[10px] text-gold tracking-widest uppercase">Centre of Knowledge</p>
          </div>
        </Link>

        <h1 className="font-display text-3xl font-black mb-1 text-white">Create account</h1>
        <p className="text-gray-500 text-sm mb-8">Join the A1 Classes student portal</p>

        <div className="space-y-4">

          {/* Full Name */}
          <div>
            <label className={labelCls}>Full Name <span className="text-red-400">*</span></label>
            <input type="text" placeholder="e.g. Rahul Sharma"
              value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              className={inputCls} />
          </div>

          {/* Email */}
          <div>
            <label className={labelCls}>Email <span className="text-red-400">*</span></label>
            <input type="email" placeholder="you@email.com"
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
              className={inputCls} />
          </div>

          {/* Phone */}
          <div>
            <label className={labelCls}>Phone Number <span className="text-gray-500 font-normal">(optional)</span></label>
            <input type="text" placeholder="10-digit mobile number"
              value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
              className={inputCls} />
          </div>

          {/* Class */}
          <div>
            <label className={labelCls}>Class / Course <span className="text-red-400">*</span></label>
            <select value={form.class} onChange={e => setForm({ ...form, class: e.target.value })}
              className={inputCls} style={{ appearance: 'auto' }}>
              <option value="" disabled>-- Select your class --</option>
              {classes.map(c => (
                <option key={c.value} value={c.value} style={{ background: '#0c1229', color: '#fff' }}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>

          {/* Password */}
          <div>
            <label className={labelCls}>Password <span className="text-red-400">*</span></label>
            <div className="relative">
              <input type={showPass ? 'text' : 'password'} placeholder="Minimum 6 characters"
                value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                className={inputCls + ' pr-12'} />
              <button type="button" onClick={() => setShowPass(!showPass)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className={labelCls}>Confirm Password <span className="text-red-400">*</span></label>
            <div className="relative">
              <input type={showConfirm ? 'text' : 'password'} placeholder="Re-enter your password"
                value={form.confirmPassword} onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                className={inputCls + ' pr-12'} />
              <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {form.confirmPassword.length > 0 && (
              <p className={`text-xs mt-1.5 font-medium ${form.password === form.confirmPassword ? 'text-green-400' : 'text-red-400'}`}>
                {form.password === form.confirmPassword ? '✓ Passwords match' : '✗ Passwords do not match'}
              </p>
            )}
          </div>

          {/* Submit */}
          <button onClick={handleSubmit} disabled={loading}
            className="w-full py-3.5 rounded-xl bg-royal text-white font-bold text-sm hover:bg-royal-light transition-colors disabled:opacity-60 mt-2 shadow-lg shadow-royal/30">
            {loading ? 'Creating account...' : 'Create Account →'}
          </button>

        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-gold font-semibold hover:underline">Login here</Link>
        </p>

      </motion.div>
    </div>
  );
}