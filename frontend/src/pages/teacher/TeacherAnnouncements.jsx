 
import { useEffect, useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

export default function TeacherAnnouncements() {
  const [notices, setNotices] = useState([]);
  const [saving,  setSaving]  = useState(false);
  const [form, setForm] = useState({
    title: '', content: '', targetRole: 'student', isImportant: false
  });

  const load = () => {
    api.get('/student/announcements')
      .then(r => setNotices(r.data.data))
      .catch(() => {});
  };
  useEffect(() => { load(); }, []);

  const handleCreate = async () => {
    if (!form.title || !form.content) { toast.error('Fill title and content'); return; }
    setSaving(true);
    try {
      await api.post('/admin/announcements', form);
      toast.success('Announcement posted ✅');
      setForm({ title:'', content:'', targetRole:'student', isImportant: false });
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete?')) return;
    try {
      await api.delete(`/admin/announcements/${id}`);
      toast.success('Deleted');
      setNotices(n => n.filter(x => x._id !== id));
    } catch { toast.error('Failed'); }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-gold";

  return (
    <div>
      <h1 className="font-display text-3xl font-black text-white mb-8">Announcements</h1>

      {/* Form */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-10">
        <h2 className="font-bold text-white mb-5">Post Announcement</h2>
        <div className="space-y-4">
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Title *</label>
            <input type="text" placeholder="Announcement title" value={form.title}
              onChange={e => setForm({...form, title: e.target.value})} className={inputClass} />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Content *</label>
            <textarea rows={3} placeholder="Details..." value={form.content}
              onChange={e => setForm({...form, content: e.target.value})}
              className={inputClass + ' resize-none'} />
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="imp" checked={form.isImportant}
              onChange={e => setForm({...form, isImportant: e.target.checked})}
              className="w-4 h-4 accent-red-500" />
            <label htmlFor="imp" className="text-sm text-gray-300">Mark as Important</label>
          </div>
          <button onClick={handleCreate} disabled={saving}
            className="px-8 py-3 rounded-xl bg-royal text-white font-bold text-sm hover:bg-royal-light disabled:opacity-60 transition-colors">
            {saving ? 'Posting...' : '📢 Post Announcement'}
          </button>
        </div>
      </div>

      {/* List */}
      <h2 className="font-bold text-white text-lg mb-4">Posted Announcements</h2>
      {notices.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No announcements yet</p>
      ) : (
        <div className="space-y-3">
          {notices.map(n => (
            <div key={n._id}
              className={`p-4 rounded-xl border flex items-start justify-between gap-4 ${
                n.isImportant ? 'bg-red-900/20 border-red-700/30' : 'bg-white/5 border-white/10'
              }`}>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  {n.isImportant && (
                    <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-bold">
                      IMPORTANT
                    </span>
                  )}
                  <p className="font-semibold text-white text-sm">{n.title}</p>
                </div>
                <p className="text-xs text-gray-400">{n.content}</p>
              </div>
              <button onClick={() => handleDelete(n._id)}
                className="px-3 py-1 rounded-lg bg-red-900/30 text-red-400 text-xs font-semibold hover:bg-red-900/50 flex-shrink-0 transition-colors">
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}