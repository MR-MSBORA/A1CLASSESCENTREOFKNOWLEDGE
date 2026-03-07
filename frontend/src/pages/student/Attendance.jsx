import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function Attendance() {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/student/attendance')
      .then(r => setData(r.data.data))
      .finally(() => setLoading(false));
  }, []);

  const pct = data?.percentage || 0;
  const color = pct >= 75 ? 'text-green-400' : pct >= 50 ? 'text-yellow-400' : 'text-red-400';

  return (
    <div>
      <h1 className="font-display text-3xl font-black text-white mb-8">Attendance</h1>

      {/* Summary Card */}
      <div className="p-8 rounded-2xl bg-royal mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-blue-200 text-sm mb-1">Overall Attendance</p>
          <p className={`font-mono font-black text-6xl ${color}`}>{pct}%</p>
          <p className="text-blue-200 text-xs mt-2">
            {pct >= 75 ? '✅ Good standing' : '⚠️ Attendance low — please attend more classes'}
          </p>
        </div>
        <div className="text-right">
          <p className="text-blue-200 text-sm">Total Records</p>
          <p className="font-mono font-black text-4xl text-white">
            {data?.records?.length || 0}
          </p>
        </div>
      </div>

      {/* Records */}
      <div className="space-y-2">
        {loading ? (
          <p className="text-gray-400 text-center py-10">Loading...</p>
        ) : data?.records?.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-4xl mb-3">📅</p>
            <p className="text-gray-400">No attendance records yet</p>
          </div>
        ) : (
          data?.records?.map(r => (
            <div key={r._id}
              className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/10">
              <div>
                <p className="text-sm font-semibold text-white">
                  {new Date(r.date).toLocaleDateString('en-IN', {
                    weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
                  })}
                </p>
                <p className="text-xs text-gray-400">{r.subject || 'General'}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                r.status === 'present'
                  ? 'bg-green-900/40 text-green-400'
                  : r.status === 'late'
                  ? 'bg-yellow-900/40 text-yellow-400'
                  : 'bg-red-900/40 text-red-400'
              }`}>
                {r.status.toUpperCase()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}