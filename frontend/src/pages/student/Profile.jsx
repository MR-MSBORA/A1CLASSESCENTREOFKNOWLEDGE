import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import toast from 'react-hot-toast';

export default function Profile() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name:  user?.name  || '',
    phone: user?.phone || '',
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await api.patch('/student/profile', form);
      toast.success('Profile updated ✅');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-black text-white mb-8">My Profile</h1>

      <div className="max-w-lg">
        {/* Avatar */}
        <div className="flex items-center gap-5 mb-8 p-6 rounded-2xl bg-white/5 border border-white/10">
          <div className="w-20 h-20 rounded-full bg-royal flex items-center justify-center font-black text-3xl text-gold">
            {user?.name?.charAt(0)}
          </div>
          <div>
            <h2 className="font-bold text-xl text-white">{user?.name}</h2>
            <p className="text-gray-400 text-sm">{user?.email}</p>
            <p className="text-xs text-gold font-semibold mt-1 uppercase tracking-widest">
              {user?.role} · {user?.class > 0 ? `Class ${user.class}` : 'Competitive'}
            </p>
          </div>
        </div>

        {/* Edit Form */}
        <div className="space-y-4 p-6 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="font-bold text-white mb-2">Edit Details</h3>

          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-gold transition-colors"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">Phone Number</label>
            <input
              type="text"
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-gold transition-colors"
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">Email</label>
            <input
              type="text"
              value={user?.email}
              disabled
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-white/5 text-gray-500 text-sm cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full py-3 rounded-xl bg-royal text-white font-bold text-sm hover:bg-royal-light disabled:opacity-60 transition-colors">
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}