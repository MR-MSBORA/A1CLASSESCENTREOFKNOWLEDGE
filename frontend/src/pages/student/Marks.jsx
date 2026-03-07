import { useEffect, useState } from 'react';
import api from '../../services/api';

export default function Marks() {
  const [marks,   setMarks]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/student/marks')
      .then(r => setMarks(r.data.data))
      .finally(() => setLoading(false));
  }, []);

  const getGradeColor = (pct) => {
    if (pct >= 90) return 'text-green-400';
    if (pct >= 75) return 'text-blue-400';
    if (pct >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div>
      <h1 className="font-display text-3xl font-black text-white mb-8">My Marks</h1>

      {loading ? (
        <p className="text-gray-400 text-center py-10">Loading...</p>
      ) : marks.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">📊</p>
          <p className="text-gray-400">No marks added yet</p>
          <p className="text-gray-500 text-sm mt-1">Your teacher will add marks after exams</p>
        </div>
      ) : (
        <div className="space-y-4">
          {marks.map(m => {
            const pct = ((m.marksObtained / m.maxMarks) * 100).toFixed(1);
            return (
              <div key={m._id}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-white">{m.subject}</h3>
                    <p className="text-xs text-gray-400">{m.exam}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-mono font-black text-2xl ${getGradeColor(pct)}`}>
                      {m.marksObtained}/{m.maxMarks}
                    </p>
                    <p className={`text-xs font-bold ${getGradeColor(pct)}`}>
                      {pct}% {m.grade ? `· Grade ${m.grade}` : ''}
                    </p>
                  </div>
                </div>
                {/* Progress Bar */}
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="h-2 rounded-full bg-gradient-to-r from-royal to-gold transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}