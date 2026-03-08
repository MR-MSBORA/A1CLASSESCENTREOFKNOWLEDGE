import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function StudentNotes() {
  const { user }              = useAuth();
  const [notes,    setNotes]  = useState([]);
  const [loading,  setLoading]= useState(true);
  const [viewing,  setViewing]= useState(null);
  const [filter,   setFilter] = useState('all');

  const isEnrolled = user?.isEnrolled;

  useEffect(() => {
    api.get('/notes')
      .then(r => setNotes(r.data.data?.notes || r.data.data || []))
      .finally(() => setLoading(false));
  }, []);

  const handleView = async (note) => {
    // Free note — anyone can view
    if (note.isFree) {
      setViewing(note);
      return;
    }

    // Enrolled student — can view all
    if (isEnrolled) {
      setViewing(note);
      return;
    }

    // Check if purchased
    try {
      const r = await api.get(`/notes/${note._id}/view`);
      if (r.data.success) {
        setViewing({ ...note, url: r.data.data.url });
      }
    } catch (err) {
      if (err.response?.status === 403) {
        toast.error('Purchase this note to access it');
      } else {
        toast.error('Failed to open note');
      }
    }
  };

  const filtered = filter === 'all'
    ? notes
    : filter === 'free'
    ? notes.filter(n => n.isFree)
    : notes.filter(n => !n.isFree);

  return (
    <div className="pt-16 lg:pt-0">
      <div className="mb-8">
        <h1 className="font-display text-2xl sm:text-3xl font-black text-white">
          My Notes
        </h1>
        <p className="text-gray-400 text-sm mt-1">
          {isEnrolled
            ? '✅ Enrolled — access all notes'
            : 'Free notes available · Purchase to unlock paid notes'}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {[
          { key: 'all',  label: `All (${notes.length})`                          },
          { key: 'free', label: `Free (${notes.filter(n => n.isFree).length})`   },
          { key: 'paid', label: `Paid (${notes.filter(n => !n.isFree).length})`  },
        ].map(f => (
          <button key={f.key} onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
              filter === f.key
                ? 'bg-royal text-white'
                : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
            }`}>
            {f.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-gray-400 text-center py-20">Loading notes...</p>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-4xl mb-3">📚</p>
          <p className="text-gray-400">No notes found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((note, i) => {
            const canAccess = note.isFree || isEnrolled;
            return (
              <motion.div key={note._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">

                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-royal/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">📄</span>
                  </div>
                  <span className={`px-2 py-1 rounded-lg text-xs font-bold ${
                    note.isFree
                      ? 'bg-green-900/40 text-green-400'
                      : isEnrolled
                      ? 'bg-royal/30 text-blue-300'
                      : 'bg-gold/10 text-gold'
                  }`}>
                    {note.isFree ? 'FREE' : isEnrolled ? 'ENROLLED' : `₹${note.price}`}
                  </span>
                </div>

                <h3 className="font-bold text-white text-sm mb-1 line-clamp-2">
                  {note.title}
                </h3>
                <p className="text-xs text-gray-400 mb-1">
                  {note.subject} · Class {note.class}
                </p>
                {note.description && (
                  <p className="text-xs text-gray-500 mb-4 line-clamp-2">
                    {note.description}
                  </p>
                )}

                {/* Action Button */}
                {canAccess ? (
                  <button onClick={() => handleView(note)}
                    className="w-full py-2.5 rounded-xl bg-royal text-white text-xs font-bold hover:bg-royal-light transition-colors">
                    📖 View Note
                  </button>
                ) : (
                  <button
                    onClick={() => toast.error('Purchase this note or get enrolled')}
                    className="w-full py-2.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 text-xs font-semibold hover:bg-white/10 transition-colors">
                    🔒 Purchase to Access
                  </button>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* PDF Viewer with Watermark */}
      {viewing && (
        <div className="fixed inset-0 bg-black/95 z-50 flex flex-col">

          {/* Top Bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[#0a0f20] border-b border-white/10 flex-shrink-0">
            <div>
              <p className="font-bold text-white text-sm">{viewing.title}</p>
              <p className="text-xs text-gray-400">{viewing.subject} · Class {viewing.class}</p>
            </div>
            <button onClick={() => setViewing(null)}
              className="px-4 py-2 rounded-xl bg-red-900/30 text-red-400 text-sm font-semibold hover:bg-red-900/50 transition-colors">
              ✕ Close
            </button>
          </div>

          {/* PDF with Watermark */}
          <div className="flex-1 relative overflow-hidden">

            {/* Watermark Layer */}
            <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
              {/* Repeated watermark pattern */}
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i}
                  className="absolute text-white/5 font-black text-2xl select-none whitespace-nowrap"
                  style={{
                    top:       `${(i % 4) * 28}%`,
                    left:      `${Math.floor(i / 4) * 35 - 10}%`,
                    transform: 'rotate(-30deg)',
                    fontSize:  '22px',
                  }}>
                  {user?.name} · {user?.email}
                </div>
              ))}
            </div>

            {/* PDF iframe */}
            <iframe
              src={viewing.url || viewing.fileUrl}
              className="w-full h-full border-0"
              title={viewing.title}
            />
          </div>

          {/* Bottom Bar */}
          <div className="px-4 py-2 bg-[#0a0f20] border-t border-white/10 flex-shrink-0">
            <p className="text-xs text-gray-500 text-center">
              🔒 This document is protected · Shared by A1 Classes
            </p>
          </div>
        </div>
      )}
    </div>
  );
}