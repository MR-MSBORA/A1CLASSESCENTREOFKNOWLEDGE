import { useEffect, useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

export default function MyNotes() {
  const [payments, setPayments] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    api.get('/payments/my')
      .then(r => setPayments(r.data.data))
      .finally(() => setLoading(false));
  }, []);

  const handleDownload = async (token) => {
    try {
      const res = await api.get(`/notes/download/${token}`);
      window.open(res.data.data.fileUrl, '_blank');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Download failed');
    }
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-black text-white mb-8">My Notes</h1>

      {loading ? (
        <p className="text-gray-400 text-center py-10">Loading...</p>
      ) : payments.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">📚</p>
          <p className="text-gray-400">No purchased notes yet</p>
          <a href="/notes"
            className="inline-block mt-4 px-6 py-2.5 rounded-xl bg-royal text-white text-sm font-semibold hover:bg-royal-light transition-colors">
            Browse Notes Store →
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {payments.map(p => (
            <div key={p._id}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-gold/30 transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-royal/20 flex items-center justify-center text-xl">
                  📄
                </div>
                <span className="text-xs text-green-400 font-semibold bg-green-900/30 px-2 py-1 rounded-full">
                  Purchased
                </span>
              </div>
              <h3 className="font-bold text-white mb-1">
                {p.note?.title || 'Note'}
              </h3>
              <p className="text-sm text-gray-400 mb-4">
                {p.note?.subject} · Class {p.note?.class}
              </p>
              <div className="flex items-center justify-between">
                <p className="text-xs text-gray-500">
                  Downloads: {p.downloadCount}/{p.maxDownloads}
                </p>
                <button
                  onClick={() => handleDownload(p.downloadToken)}
                  disabled={p.downloadCount >= p.maxDownloads}
                  className="px-4 py-2 rounded-lg bg-royal text-white text-xs font-semibold hover:bg-royal-light disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                  {p.downloadCount >= p.maxDownloads ? 'Limit Reached' : '📥 Download'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}