import { useEffect, useState } from 'react';
import api from '../../services/api';
import NoteCard from '../../components/notes/NoteCard';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { SkeletonCard } from '../../components/common/Loader';

export default function NotesStore() {
  const [notes,   setNotes]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ class: '', subject: '' });
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true);
    api.get('/notes', { params: filters })
      .then(r => setNotes(r.data.data.notes))
      .catch(() => toast.error('Failed to load notes'))
      .finally(() => setLoading(false));
  }, [filters]);

  const handleBuy = async (note) => {
    if (!user) {
      toast.error('Please login first');
      return;
    }

    // Free note
    if (note.isFree) {
      window.open(note.fileUrl, '_blank');
      return;
    }

    // Paid note — Razorpay
    try {
      const res = await api.post('/payments/create-order', { noteId: note._id });
      const { orderId, amount, key } = res.data.data;

      const rzp = new window.Razorpay({
        key,
        amount,
        currency:    'INR',
        name:        'A1 Classes',
        description: note.title,
        order_id:    orderId,
        handler: async (response) => {
          try {
            const verify = await api.post('/payments/verify', response);
            toast.success('Payment successful! 🎉');
            const dl = await api.get(`/notes/download/${verify.data.data.downloadToken}`);
            window.open(dl.data.data.fileUrl, '_blank');
          } catch {
            toast.error('Payment verification failed');
          }
        },
        prefill: { name: user.name, email: user.email },
        theme:   { color: '#1a3c8f' },
      });
      rzp.open();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Payment failed');
    }
  };

  return (
    <main className="pt-24 min-h-screen px-5 pb-16 bg-[#06091a]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10 pt-6">
          <p className="text-xs text-gold font-semibold tracking-widest uppercase mb-2">Study Material</p>
          <h1 className="font-display text-4xl font-black text-white">
            Notes <span className="text-gold">Store</span>
          </h1>
          <p className="text-gray-400 text-sm mt-2">
            Premium notes for all classes and subjects
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-8 flex-wrap">
          <select
            value={filters.class}
            onChange={e => setFilters({ ...filters, class: e.target.value })}
            className="px-4 py-2.5 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-gold">
            <option value="">All Classes</option>
            {[1,2,3,4,5,6,7,8,9,10,11,12].map(c => (
              <option key={c} value={c}>Class {c}</option>
            ))}
          </select>

          <select
            value={filters.subject}
            onChange={e => setFilters({ ...filters, subject: e.target.value })}
            className="px-4 py-2.5 rounded-xl border border-white/10 bg-[#0c1229] text-white text-sm focus:outline-none focus:border-gold">
            <option value="">All Subjects</option>
            {['Physics','Chemistry','Maths','Biology','English','Accounts','Economics','History','Computer'].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : notes.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-6xl mb-4">📭</p>
            <p className="text-gray-400 text-lg">No notes found</p>
            <p className="text-gray-500 text-sm mt-1">
              Try changing filters or check back later
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {notes.map(n => (
              <NoteCard key={n._id} note={n} onBuy={handleBuy} />
            ))}
          </div>
        )}

      </div>
    </main>
  );
}