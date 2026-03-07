import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function Notices() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/student/announcements')
      .then(r => setNotices(r.data.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1 className="font-display text-3xl font-black text-white mb-8">Notices</h1>

      {loading ? (
        <p className="text-gray-400 text-center py-10">Loading...</p>
      ) : notices.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">📢</p>
          <p className="text-gray-400">No notices yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {notices.map(n => (
            <div key={n._id}
              className={`p-5 rounded-2xl border transition-all ${
                n.isImportant
                  ? 'bg-red-900/20 border-red-700/30'
                  : 'bg-white/5 border-white/10'
              }`}>
              <div className="flex items-start gap-3 flex-wrap">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    {n.isImportant && (
                      <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-bold">
                        IMPORTANT
                      </span>
                    )}
                    <h3 className="font-bold text-white">{n.title}</h3>
                  </div>
                  <p className="text-sm text-gray-400">{n.content}</p>
                  <p className="text-xs text-gray-500 mt-3">
                    {new Date(n.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}