import { useEffect, useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

export default function ManageReviews() {
  const [pending,  setPending]  = useState([]);
  const [approved, setApproved] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [tab,      setTab]      = useState('pending');

  const load = () => {
    Promise.all([
      api.get('/reviews/pending'),
      api.get('/reviews/approved'),
    ]).then(([p, a]) => {
      setPending(p.data.data);
      setApproved(a.data.data);
    }).finally(() => setLoading(false));
  };
  useEffect(() => { load(); }, []);

  const handleApprove = async (id) => {
    try {
      await api.patch(`/reviews/${id}/approve`);
      toast.success('Review approved ✅');
      load();
    } catch { toast.error('Failed'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete review?')) return;
    try {
      await api.delete(`/reviews/${id}`);
      toast.success('Deleted');
      load();
    } catch { toast.error('Failed'); }
  };

  const list = tab === 'pending' ? pending : approved;

  return (
    <div>
      <h1 className="font-display text-3xl font-black text-white mb-8">Manage Reviews</h1>

      {/* Tabs */}
      <div className="flex gap-3 mb-8">
        {[
          { key: 'pending',  label: `Pending (${pending.length})`  },
          { key: 'approved', label: `Approved (${approved.length})` },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
              tab === t.key
                ? 'bg-royal text-white'
                : 'bg-white/5 text-gray-400 hover:bg-white/10'
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-gray-400 text-center py-10">Loading...</p>
      ) : list.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">⭐</p>
          <p className="text-gray-400">No {tab} reviews</p>
        </div>
      ) : (
        <div className="space-y-4">
          {list.map(r => (
            <div key={r._id}
              className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-start justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-royal/20 flex items-center justify-center font-bold text-gold">
                    {r.name?.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{r.name}</p>
                    <p className="text-xs text-gray-400">{r.class} · {r.branch}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {tab === 'pending' && (
                    <button onClick={() => handleApprove(r._id)}
                      className="px-3 py-1.5 rounded-lg bg-green-900/30 text-green-400 text-xs font-semibold hover:bg-green-900/50 transition-colors">
                      ✓ Approve
                    </button>
                  )}
                  <button onClick={() => handleDelete(r._id)}
                    className="px-3 py-1.5 rounded-lg bg-red-900/30 text-red-400 text-xs font-semibold hover:bg-red-900/50 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-sm text-gray-300 mt-3 leading-relaxed">"{r.review}"</p>
              <div className="flex gap-0.5 mt-2">
                {[1,2,3,4,5].map(s => (
                  <span key={s} className={s <= r.rating ? 'text-gold text-sm' : 'text-gray-600 text-sm'}>★</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}