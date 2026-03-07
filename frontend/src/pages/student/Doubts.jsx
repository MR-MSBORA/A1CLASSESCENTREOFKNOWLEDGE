import { useEffect, useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

export default function Doubts() {
  const [doubts,      setDoubts]      = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [submitting,  setSubmitting]  = useState(false);
  const [showForm,    setShowForm]    = useState(false);
  const [form, setForm] = useState({ subject: '', question: '' });
  const { user } = useAuth();

  const load = () => {
    api.get('/doubts/my')
      .then(r => setDoubts(r.data.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const handleSubmit = async () => {
    if (!form.subject || !form.question) {
      toast.error('Fill all fields'); return;
    }
    setSubmitting(true);
    try {
      await api.post('/doubts', { ...form, class: user?.class || 0 });
      toast.success('Doubt submitted! ✅');
      setForm({ subject: '', question: '' });
      setShowForm(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    } finally {
      setSubmitting(false);
    }
  };

  const statusColor = {
    open:        'bg-yellow-900/40 text-yellow-400',
    'in-review': 'bg-blue-900/40 text-blue-400',
    resolved:    'bg-green-900/40 text-green-400',
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <h1 className="font-display text-3xl font-black text-white">My Doubts</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-5 py-2.5 rounded-xl bg-royal text-white text-sm font-semibold hover:bg-royal-light transition-colors">
          + Ask a Doubt
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 mb-8 space-y-4">
          <h2 className="font-bold text-white">New Doubt</h2>
          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">Subject</label>
            <select
              value={form.subject}
              onChange={e => setForm({ ...form, subject: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-gold">
              <option value="">Select Subject</option>
              {['Physics','Chemistry','Maths','Biology','English','Accounts','Computer','General'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1.5 block">Your Question</label>
            <textarea
              rows={4}
              placeholder="Describe your doubt clearly..."
              value={form.question}
              onChange={e => setForm({ ...form, question: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-gold resize-none"
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-6 py-2.5 rounded-xl bg-royal text-white text-sm font-semibold hover:bg-royal-light disabled:opacity-60 transition-colors">
              {submitting ? 'Submitting...' : 'Submit Doubt'}
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-6 py-2.5 rounded-xl border border-white/10 text-gray-400 text-sm hover:bg-white/5 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Doubts List */}
      {loading ? (
        <p className="text-gray-400 text-center py-10">Loading...</p>
      ) : doubts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">💬</p>
          <p className="text-gray-400">No doubts submitted yet</p>
          <p className="text-gray-500 text-sm mt-1">Click "Ask a Doubt" to get help</p>
        </div>
      ) : (
        <div className="space-y-5">
          {doubts.map(d => (
            <div key={d._id}
              className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                <div>
                  <p className="text-xs text-gold font-semibold uppercase tracking-widest mb-1">
                    {d.subject}
                  </p>
                  <p className="text-white font-semibold">{d.question}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColor[d.status]}`}>
                  {d.status.toUpperCase()}
                </span>
              </div>

              {/* Replies */}
              {d.replies?.length > 0 && (
                <div className="mt-4 space-y-2 border-t border-white/10 pt-4">
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Teacher Replies</p>
                  {d.replies.map((r, i) => (
                    <div key={i} className="p-3 rounded-xl bg-royal/10 border border-royal/20">
                      <p className="text-xs text-gold font-semibold mb-1">
                        {r.author?.name || 'Teacher'}
                      </p>
                      <p className="text-sm text-gray-300">{r.content}</p>
                    </div>
                  ))}
                </div>
              )}

              <p className="text-xs text-gray-500 mt-3">
                {new Date(d.createdAt).toLocaleDateString('en-IN')}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}