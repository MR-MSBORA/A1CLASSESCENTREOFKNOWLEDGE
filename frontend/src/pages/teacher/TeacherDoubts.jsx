 
import { useEffect, useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

export default function TeacherDoubts() {
  const [doubts,  setDoubts]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [reply,   setReply]   = useState({});
  const [filter,  setFilter]  = useState('open');

  const load = () => {
    api.get('/doubts')
      .then(r => setDoubts(r.data.data))
      .finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const handleReply = async (id) => {
    if (!reply[id]?.trim()) { toast.error('Type a reply'); return; }
    try {
      await api.post(`/doubts/${id}/reply`, { content: reply[id] });
      toast.success('Reply sent ✅');
      setReply({ ...reply, [id]: '' });
      load();
    } catch { toast.error('Failed'); }
  };

  const handleResolve = async (id) => {
    try {
      await api.patch(`/doubts/${id}/resolve`);
      toast.success('Marked resolved ✅');
      load();
    } catch { toast.error('Failed'); }
  };

  const filtered = filter === 'all' ? doubts : doubts.filter(d => d.status === filter);

  const statusColor = {
    open:        'bg-yellow-900/40 text-yellow-400',
    'in-review': 'bg-blue-900/40 text-blue-400',
    resolved:    'bg-green-900/40 text-green-400',
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-black text-white mb-8">Student Doubts</h1>

      {/* Filter Tabs */}
      <div className="flex gap-3 mb-8 flex-wrap">
        {[
          { key: 'open',     label: `Open (${doubts.filter(d => d.status === 'open').length})`     },
          { key: 'resolved', label: `Resolved (${doubts.filter(d => d.status === 'resolved').length})` },
          { key: 'all',      label: `All (${doubts.length})`                                       },
        ].map(t => (
          <button key={t.key} onClick={() => setFilter(t.key)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              filter === t.key
                ? 'bg-royal text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-gray-400 text-center py-10">Loading...</p>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">💬</p>
          <p className="text-gray-400">No doubts found</p>
        </div>
      ) : (
        <div className="space-y-5">
          {filtered.map(d => (
            <div key={d._id} className="p-6 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                <div>
                  <p className="text-xs text-gold font-semibold uppercase tracking-widest mb-1">
                    {d.subject} · Class {d.class}
                  </p>
                  <p className="text-white font-semibold">{d.question}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    By: {d.student?.name || 'Student'} · {new Date(d.createdAt).toLocaleDateString('en-IN')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColor[d.status]}`}>
                    {d.status.toUpperCase()}
                  </span>
                  {d.status !== 'resolved' && (
                    <button onClick={() => handleResolve(d._id)}
                      className="px-3 py-1 rounded-lg bg-green-900/30 text-green-400 text-xs font-semibold hover:bg-green-900/50 transition-colors">
                      Resolve
                    </button>
                  )}
                </div>
              </div>

              {/* Replies */}
              {d.replies?.length > 0 && (
                <div className="mt-3 space-y-2 border-t border-white/10 pt-3 mb-3">
                  {d.replies.map((r, i) => (
                    <div key={i} className="p-3 rounded-xl bg-royal/10 border border-royal/20">
                      <p className="text-xs text-gold font-semibold mb-1">{r.author?.name}</p>
                      <p className="text-sm text-gray-300">{r.content}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Reply Box */}
              {d.status !== 'resolved' && (
                <div className="flex gap-3 mt-3">
                  <input type="text"
                    placeholder="Type your reply..."
                    value={reply[d._id] || ''}
                    onChange={e => setReply({ ...reply, [d._id]: e.target.value })}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-gold" />
                  <button onClick={() => handleReply(d._id)}
                    className="px-5 py-2.5 rounded-xl bg-royal text-white text-sm font-semibold hover:bg-royal-light transition-colors">
                    Send
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}