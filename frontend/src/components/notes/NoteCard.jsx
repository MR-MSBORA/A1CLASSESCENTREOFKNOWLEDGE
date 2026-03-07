export default function NoteCard({ note, onBuy }) {
  return (
    <div className="p-6 rounded-2xl bg-[#0c1229] border border-white/10 hover:border-gold/30 hover:shadow-xl transition-all group flex flex-col gap-4">
      
      {/* Top */}
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-xl bg-royal/20 flex items-center justify-center text-2xl">
          📄
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
          note.isFree
            ? 'bg-green-900/30 text-green-400'
            : 'bg-gold/10 text-gold'
        }`}>
          {note.isFree ? 'FREE' : `₹${note.price}`}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1">
        <h3 className="font-bold text-base text-white group-hover:text-gold transition-colors mb-1">
          {note.title}
        </h3>
        <p className="text-sm text-gray-400 mb-1">
          {note.subject} · Class {note.class}
        </p>
        <p className="text-xs text-gray-500 line-clamp-2">
          {note.description}
        </p>
      </div>

      {/* Button */}
      <button
        onClick={() => onBuy(note)}
        className="w-full py-2.5 rounded-xl bg-royal text-white text-sm font-semibold hover:bg-royal-light transition-colors">
        {note.isFree ? '📥 Download Free' : '🛒 Buy Now'}
      </button>
    </div>
  );
}