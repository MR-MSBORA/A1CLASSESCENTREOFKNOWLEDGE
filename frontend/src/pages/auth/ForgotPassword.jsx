import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { Eye, EyeOff, Mail, KeyRound, LockKeyhole, CheckCircle2 } from 'lucide-react';
import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'https://a1classescentreofknowledge-api.onrender.com/api/v1';

// ── Step Bar ─────────────────────────────────────────────────
const steps = ['Email', 'OTP', 'Password'];

const StepBar = ({ current }) => (
    <div className="flex items-center justify-center gap-2 mb-8">
        {steps.map((label, i) => (
            <div key={i} className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300
            ${i < current ? 'bg-green-500 text-white' :
                            i === current ? 'bg-gold text-[#06091a] ring-4 ring-gold/20' :
                                'bg-white/10 text-gray-500'}`}>
                        {i < current ? '✓' : i + 1}
                    </div>
                    <span className={`text-[10px] mt-1 font-medium tracking-wide ${i === current ? 'text-gold' : 'text-gray-600'}`}>
                        {label}
                    </span>
                </div>
                {i < steps.length - 1 && (
                    <div className={`w-10 h-px mb-4 transition-all duration-500 ${i < current ? 'bg-green-500' : 'bg-white/10'}`} />
                )}
            </div>
        ))}
    </div>
);

// ── Step 1: Email ────────────────────────────────────────────
const EmailStep = ({ onNext }) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email) return toast.error('Enter your email');
        setLoading(true);
        try {
            await axios.post(`${API}/auth/forgot-password`, { email });
            toast.success('OTP sent to your email!');
            onNext(email);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="text-sm font-medium mb-1.5 block text-gray-300">Email Address</label>
                <div className="relative">
                    <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="you@email.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-colors text-sm"
                    />
                </div>
            </div>
            <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-royal text-white font-bold hover:bg-royal-light transition-colors disabled:opacity-60 shadow-lg shadow-royal/30">
                {loading ? 'Sending OTP...' : 'Send OTP →'}
            </button>
        </form>
    );
};

// ── Step 2: OTP ──────────────────────────────────────────────
const OtpStep = ({ email, onNext, onBack }) => {
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (otp.length < 6) return toast.error('Enter the 6-digit OTP');
        setLoading(true);
        try {
            await axios.post(`${API}/auth/verify-otp`, { email, otp });
            toast.success('OTP verified!');
            onNext(otp);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Incorrect OTP');
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        setResending(true);
        try {
            await axios.post(`${API}/auth/forgot-password`, { email });
            toast.success('OTP resent!');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Could not resend OTP');
        } finally {
            setResending(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-400">
                OTP sent to <span className="text-gold font-medium">{email}</span>. Check your inbox.
            </div>
            <div>
                <label className="text-sm font-medium mb-1.5 block text-gray-300">6-Digit OTP</label>
                <div className="relative">
                    <KeyRound size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                        type="text"
                        required
                        maxLength={6}
                        value={otp}
                        onChange={e => setOtp(e.target.value.replace(/\D/, ''))}
                        placeholder="_ _ _ _ _ _"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-colors text-center text-xl tracking-[0.5em] font-bold"
                    />
                </div>
            </div>
            <button
                type="submit"
                disabled={loading || otp.length < 6}
                className="w-full py-3.5 rounded-xl bg-royal text-white font-bold hover:bg-royal-light transition-colors disabled:opacity-60 shadow-lg shadow-royal/30">
                {loading ? 'Verifying...' : 'Verify OTP →'}
            </button>
            <div className="flex justify-between text-sm">
                <button type="button" onClick={onBack} className="text-gray-500 hover:text-gray-300 transition">
                    ← Back
                </button>
                <button
                    type="button"
                    onClick={handleResend}
                    disabled={resending}
                    className="text-gold hover:underline font-medium disabled:opacity-50 transition">
                    {resending ? 'Resending...' : 'Resend OTP'}
                </button>
            </div>
        </form>
    );
};

// ── Step 3: New Password ─────────────────────────────────────
const ResetStep = ({ email, otp, onSuccess }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) return toast.error('Passwords do not match');
        if (newPassword.length < 6) return toast.error('Min. 6 characters required');
        setLoading(true);
        try {
            await axios.post(`${API}/auth/reset-password`, { email, otp, newPassword, confirmPassword });
            toast.success('Password reset successfully!');
            onSuccess();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <div className="flex items-center justify-between mb-1.5">
                    <label className="text-sm font-medium text-gray-300">New Password</label>
                    <button type="button" onClick={() => setShowPass(!showPass)}
                        className="text-xs text-gray-500 hover:text-gray-300 flex items-center gap-1 transition">
                        {showPass ? <><EyeOff size={12} /> Hide</> : <><Eye size={12} /> Show</>}
                    </button>
                </div>
                <div className="relative">
                    <LockKeyhole size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                        type={showPass ? 'text' : 'password'}
                        required
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        placeholder="Min. 6 characters"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-colors text-sm"
                    />
                </div>
            </div>
            <div>
                <label className="text-sm font-medium mb-1.5 block text-gray-300">Confirm Password</label>
                <div className="relative">
                    <LockKeyhole size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                        type={showPass ? 'text' : 'password'}
                        required
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter password"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-white/10 bg-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-gold transition-colors text-sm"
                    />
                </div>
            </div>
            <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-royal text-white font-bold hover:bg-royal-light transition-colors disabled:opacity-60 shadow-lg shadow-royal/30">
                {loading ? 'Resetting...' : 'Reset Password →'}
            </button>
        </form>
    );
};

// ── Success Screen ───────────────────────────────────────────
const SuccessScreen = ({ onLoginClick }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center space-y-4 py-4">
        <div className="w-16 h-16 bg-green-500/10 border border-green-500/20 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 size={32} className="text-green-400" />
        </div>
        <h3 className="text-xl font-bold text-white">Password Reset!</h3>
        <p className="text-gray-500 text-sm">Your password has been updated. You can now sign in with your new password.</p>
        <button
            onClick={onLoginClick}
            className="w-full py-3.5 rounded-xl bg-royal text-white font-bold hover:bg-royal-light transition-colors shadow-lg shadow-royal/30">
            Go to Login →
        </button>
    </motion.div>
);

// ── Main Component ───────────────────────────────────────────
export default function ForgotPassword() {
    const [step, setStep] = useState(0);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [done, setDone] = useState(false);
    const navigate = useNavigate();

    const titles = ['Forgot Password?', 'Check Your Email', 'Set New Password'];
    const subtitles = [
        "Enter your registered email and we'll send you an OTP.",
        'Enter the 6-digit code sent to your email.',
        'Choose a strong new password for your account.',
    ];

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

                {!done ? (
                    <>
                        <StepBar current={step} />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.2 }}>

                                <h1 className="font-display text-2xl font-black mb-1 text-white">{titles[step]}</h1>
                                <p className="text-gray-500 text-sm mb-6">{subtitles[step]}</p>

                                {step === 0 && (
                                    <EmailStep onNext={(e) => { setEmail(e); setStep(1); }} />
                                )}
                                {step === 1 && (
                                    <OtpStep
                                        email={email}
                                        onNext={(o) => { setOtp(o); setStep(2); }}
                                        onBack={() => setStep(0)}
                                    />
                                )}
                                {step === 2 && (
                                    <ResetStep
                                        email={email}
                                        otp={otp}
                                        onSuccess={() => setDone(true)}
                                    />
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </>
                ) : (
                    <SuccessScreen onLoginClick={() => navigate('/login')} />
                )}

                {!done && (
                    <p className="text-center text-sm text-gray-600 mt-6">
                        Remember your password?{' '}
                        <Link to="/login" className="text-gold font-semibold hover:underline">
                            Sign In
                        </Link>
                    </p>
                )}

            </motion.div>
        </div>
    );
}