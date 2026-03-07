import { useEffect, useState } from 'react';
import api from '../../services/api';
import toast from 'react-hot-toast';

export default function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [submitting,  setSubmitting]  = useState(null);

  useEffect(() => {
    api.get('/student/assignments')
      .then(r => setAssignments(r.data.data))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (id, file) => {
    if (!file) { toast.error('Please select a file'); return; }
    setSubmitting(id);
    const fd = new FormData();
    fd.append('file', file);
    try {
      await api.post(`/student/assignments/${id}/submit`, fd);
      toast.success('Assignment submitted! ✅');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Submission failed');
    } finally {
      setSubmitting(null);
    }
  };

  const isOverdue = (date) => new Date(date) < new Date();

  return (
    <div>
      <h1 className="font-display text-3xl font-black text-white mb-8">Assignments</h1>

      {loading ? (
        <p className="text-gray-400 text-center py-10">Loading...</p>
      ) : assignments.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-4xl mb-3">📝</p>
          <p className="text-gray-400">No assignments yet</p>
        </div>
      ) : (
        <div className="space-y-5">
          {assignments.map(a => (
            <div key={a._id}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
              <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                <div>
                  <h3 className="font-bold text-white text-lg">{a.title}</h3>
                  <p className="text-sm text-gray-400">{a.subject} · Max Marks: {a.maxMarks}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  isOverdue(a.dueDate)
                    ? 'bg-red-900/40 text-red-400'
                    : 'bg-green-900/40 text-green-400'
                }`}>
                  {isOverdue(a.dueDate) ? 'Overdue' : 'Active'}
                </span>
              </div>

              {a.description && (
                <p className="text-sm text-gray-400 mb-4">{a.description}</p>
              )}

              {a.dueDate && (
                <p className="text-xs text-gray-500 mb-4">
                  📅 Due: {new Date(a.dueDate).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'short', year: 'numeric'
                  })}
                </p>
              )}

              {/* Submit */}
              {!isOverdue(a.dueDate) && (
                <div className="flex items-center gap-3 flex-wrap">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.png"
                    onChange={e => handleSubmit(a._id, e.target.files[0])}
                    className="text-xs text-gray-400 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-royal file:text-white file:text-xs file:font-semibold file:cursor-pointer"
                  />
                  {submitting === a._id && (
                    <span className="text-xs text-gold">Uploading...</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}