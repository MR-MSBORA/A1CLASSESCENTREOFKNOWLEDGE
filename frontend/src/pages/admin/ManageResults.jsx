import { useEffect, useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

export default function ManageResults() {
  const [results,  setResults]  = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [saving,   setSaving]   = useState(false);
  const [form, setForm] = useState({
    name: '', score: '', subject: '', branch: 'Zirakpur', year: new Date().getFullYear().toString()
  });

  const load = () => {
    api.get('/results').then(r => setResults(r.data.data)).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const handleAdd = async () => {
    if (!form.name || !form.score || !form.subject) {
      toast.error('Fill all fields'); return;
    }
    setSaving(true);
    try {
      await api.post('/results', form);
      toast.success('Result posted ✅');
      setForm({ name:'', score:'', subject:'', branch:'Zirakpur', year: new Date().getFullYear().toString() });
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this result?')) return;
    try {
      await api.delete(`/results/${id}`);
      toast.success('Deleted');
      load();
    } catch { toast.error('Failed'); }
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-gold";

  return (
    <div>
      <h1 className="font-display text-3xl font-black text-white mb-8">Post Results / Toppers</h1>

      {/* Form */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-10">
        <h2 className="font-bold text-white mb-5">Add Topper</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Student Name *</label>
            <input type="text" placeholder="e.g. Priya Sharma" value={form.name}
              onChange={e => setForm({...form, name: e.target.value})} className={inputClass} />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Score *</label>
            <input type="text" placeholder="e.g. 98% or 480/500" value={form.score}
              onChange={e => setForm({...form, score: e.target.value})} className={inputClass} />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Subject / Stream *</label>
            <input type="text" placeholder="e.g. Science / SSC CGL" value={form.subject}
              onChange={e => setForm({...form, subject: e.target.value})} className={inputClass} />
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Branch</label>
            <select value={form.branch} onChange={e => setForm({...form, branch: e.target.value})}
              className={inputClass}>
              <option value="Zirakpur">Zirakpur</option>
              <option value="Baltana">Baltana</option>
              <option value="Behlana">Behlana</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-400 mb-1.5 block">Year</label>
            <input type="text" placeholder="2025" value={form.year}
              onChange={e => setForm({...form, year: e.target.value})} className={inputClass} />
          </div>
        </div>
        <button onClick={handleAdd} disabled={saving}
          className="px-8 py-3 rounded-xl bg-gold text-[#06091a] font-bold text-sm hover:bg-gold-light disabled:opacity-60 transition-colors">
          {saving ? 'Posting...' : '🏆 Post Result'}
        </button>
      </div>

      {/* Results List */}
      <h2 className="font-bold text-white text-lg mb-4">All Results</h2>
      {loading ? (
        <p className="text-gray-400 text-center py-10">Loading...</p>
      ) : results.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No results posted yet</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {results.map(r => (
            <div key={r._id}
              className="p-5 rounded-xl bg-white/5 border border-white/10 text-center relative group">
              <p className="font-mono font-black text-3xl text-gold mb-1">{r.score}</p>
              <p className="font-bold text-white">{r.name}</p>
              <p className="text-xs text-gray-400 mt-1">{r.subject} · {r.year}</p>
              <p className="text-xs text-royal-light mt-1">📍 {r.branch}</p>
              <button onClick={() => handleDelete(r._id)}
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-red-900/40 text-red-400 text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}