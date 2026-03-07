 
import { useEffect, useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

export default function TeacherNotes() {
  const [notes,     setNotes]     = useState([]);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({
    title: '', subject: '', class: '',
    price: '0', isFree: true, description: ''
  });
  const [file, setFile] = useState(null);

  const load = () => {
    api.get('/notes').then(r => setNotes(r.data.data.notes || []));
  };
  useEffect(() => { load(); }, []);

  const handleUpload = async () => {
    if (!file || !form.title || !form.subject || !form.class) {
      toast.error('Fill all fields and select PDF'); return;
    }
    setUploading(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    fd.append('pdf', file);
    try {
      await api.post('/notes', fd);
      toast.success('Note uploaded ✅');
      setForm({ title:'', subject:'', class:'', price:'0', isFree: true, description:'' });
      setFile(null);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-gold";

  return (
    <div>
      <h1 className="font-display text-3xl font-black text-white mb-8">Upload Notes</h1>

      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-10">
        <h2 className="font-bold text-white mb-5">Upload New Note</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Title *</label>
            <input type="text" placeholder="e.g. Physics Chapter 1" value={form.title}
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
              <option value="0">Competitive / Other</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Price (₹)</label>
            <input type="number" placeholder="0 if free" value={form.price}
              disabled={form.isFree}
              onChange={e => setForm({...form, price: e.target.value})} className={inputClass} />
          </div>
          <div className="md:col-span-2">
            <label className="text-xs text-gray-400 mb-1.5 block">Description</label>
            <input type="text" placeholder="Brief description" value={form.description}
              onChange={e => setForm({...form, description: e.target.value})} className={inputClass} />
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="free" checked={form.isFree}
              onChange={e => setForm({...form, isFree: e.target.checked, price: e.target.checked ? '0' : form.price})}
              className="w-4 h-4 accent-gold" />
            <label htmlFor="free" className="text-sm text-gray-300">Mark as Free</label>
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">PDF File *</label>
            <input type="file" accept=".pdf"
              onChange={e => setFile(e.target.files[0])}
              className="text-xs text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-royal file:text-white file:text-xs file:font-semibold file:cursor-pointer" />
          </div>
        </div>
        <button onClick={handleUpload} disabled={uploading}
          className="px-8 py-3 rounded-xl bg-royal text-white font-bold text-sm hover:bg-royal-light disabled:opacity-60 transition-colors">
          {uploading ? 'Uploading...' : '📤 Upload Note'}
        </button>
      </div>

      {/* Notes List */}
      <h2 className="font-bold text-white text-lg mb-4">All Notes ({notes.length})</h2>
      {notes.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No notes uploaded yet</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {notes.map(n => (
            <div key={n._id}
              className="p-5 rounded-xl bg-white/5 border border-white/10">
              <p className="font-bold text-white text-sm mb-1">{n.title}</p>
              <p className="text-xs text-gray-400">{n.subject} · Class {n.class}</p>
              <p className="text-xs text-gold font-semibold mt-1">
                {n.isFree ? 'FREE' : `₹${n.price}`}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}