 
import { useEffect, useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

export default function TeacherAssignments() {
  const [assignments, setAssignments] = useState([]);
  const [saving,      setSaving]      = useState(false);
  const [form, setForm] = useState({
    title: '', subject: '', class: '',
    description: '', dueDate: '', maxMarks: '100'
  });

  const load = () => {
    api.get('/student/assignments/all')
      .then(r => setAssignments(r.data.data))
      .catch(() => {});
  };
  useEffect(() => { load(); }, []);

  const handleCreate = async () => {
    if (!form.title || !form.subject || !form.class || !form.dueDate) {
      toast.error('Fill all required fields'); return;
    }
    setSaving(true);
    try {
      await api.post('/student/assignments', form);
      toast.success('Assignment created ✅');
      setForm({ title:'', subject:'', class:'', description:'', dueDate:'', maxMarks:'100' });
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete assignment?')) return;
    try {
      await api.delete(`/student/assignments/${id}`);
      toast.success('Deleted');
      load();
    } catch { toast.error('Failed'); }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-gold";

  return (
    <div>
      <h1 className="font-display text-3xl font-black text-white mb-8">Assignments</h1>

      {/* Create Form */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-10">
        <h2 className="font-bold text-white mb-5">Create New Assignment</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Title *</label>
            <input type="text" placeholder="e.g. Chapter 3 Exercise" value={form.title}
              onChange={e => setForm({...form, title: e.target.value})} className={inputClass} />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Subject *</label>
            <select value={form.subject} onChange={e => setForm({...form, subject: e.target.value})}
              className={inputClass}>
              <option value="">Select Subject</option>
              {['Physics','Chemistry','Maths','Biology','English','Accounts','Economics','Computer','History','General'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Class *</label>
            <select value={form.class} onChange={e => setForm({...form, class: e.target.value})}
              className={inputClass}>
              <option value="">Select Class</option>
              {[1,2,3,4,5,6,7,8,9,10,11,12].map(c => (
                <option key={c} value={c}>Class {c}</option>
              ))}
              <option value="0">All / Competitive</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Due Date *</label>
            <input type="date" value={form.dueDate}
              onChange={e => setForm({...form, dueDate: e.target.value})}
              className={inputClass} />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Max Marks</label>
            <input type="number" placeholder="100" value={form.maxMarks}
              onChange={e => setForm({...form, maxMarks: e.target.value})} className={inputClass} />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Description</label>
            <input type="text" placeholder="Optional instructions" value={form.description}
              onChange={e => setForm({...form, description: e.target.value})} className={inputClass} />
          </div>
        </div>
        <button onClick={handleCreate} disabled={saving}
          className="px-8 py-3 rounded-xl bg-royal text-white font-bold text-sm hover:bg-royal-light disabled:opacity-60 transition-colors">
          {saving ? 'Creating...' : '📝 Create Assignment'}
        </button>
      </div>

      {/* List */}
      <h2 className="font-bold text-white text-lg mb-4">All Assignments ({assignments.length})</h2>
      {assignments.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No assignments created yet</p>
      ) : (
        <div className="space-y-3">
          {assignments.map(a => (
            <div key={a._id}
              className="p-5 rounded-xl bg-white/5 border border-white/10 flex items-start justify-between gap-4">
              <div className="flex-1">
                <p className="font-bold text-white text-sm">{a.title}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {a.subject} · Class {a.class} · Due: {new Date(a.dueDate).toLocaleDateString('en-IN')}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  By: {a.uploadedBy?.name || 'You'} · {a.submissions?.length || 0} submissions
                </p>
              </div>
              <button onClick={() => handleDelete(a._id)}
                className="px-3 py-1.5 rounded-lg bg-red-900/30 text-red-400 text-xs font-semibold hover:bg-red-900/50 transition-colors flex-shrink-0">
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}