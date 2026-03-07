import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/courses', label: 'Courses' },
  { to: '/notes', label: 'Notes' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/results', label: 'Results' },
  { to: '/contact', label: 'Contact' },
  { to: '/teachers', label: 'Teachers' },
];

export default function Navbar() {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);

  const portalLink = user
    ? user.role === 'superadmin' || user.role === 'admin'
      ? '/admin'
      : user.role === 'teacher'
        ? '/teacher'
        : '/dashboard'
    : '/login';

  const portalLabel = user ? 'My Portal' : 'Student Login';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#06091a]/90 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <div className="w-9 h-9 rounded-xl bg-royal flex items-center justify-center font-mono font-bold text-gold text-xs shadow-lg flex-shrink-0">
            A1
          </div>
          <div>
            <p className="font-display font-black text-sm leading-none text-white">A1 Classes</p>
            <p className="text-[9px] text-gold tracking-widest uppercase hidden sm:block">
              Centre of Knowledge
            </p>
          </div>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-6">
          {links.map(l => (
            <li key={l.to}>
              <NavLink to={l.to}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${isActive
                    ? 'text-gold'
                    : 'text-gray-400 hover:text-white'
                  }`
                }>
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Right */}
        <div className="flex items-center gap-2">
          <Link to={portalLink}
            className="hidden sm:block px-4 py-2 rounded-lg bg-royal text-white text-xs font-bold hover:bg-royal-light transition-colors shadow-md">
            {portalLabel}
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-white">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-[#0a0f20] border-t border-white/10 overflow-hidden">
            <div className="px-4 py-4 space-y-1">
              {links.map(l => (
                <NavLink key={l.to} to={l.to}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive
                      ? 'bg-royal text-white'
                      : 'text-gray-400 hover:bg-white/5 hover:text-white'
                    }`
                  }>
                  {l.label}
                </NavLink>
              ))}
              <Link to={portalLink}
                onClick={() => setOpen(false)}
                className="block mt-3 px-4 py-3 rounded-xl bg-royal text-white text-sm font-bold text-center hover:bg-royal-light transition-colors">
                {portalLabel} →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}