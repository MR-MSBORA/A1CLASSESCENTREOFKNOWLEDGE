import { motion } from 'framer-motion';

const placeholders = [
  { caption: 'Classroom Session — Zirakpur',       emoji: '📚' },
  { caption: 'Result Celebration 2024',            emoji: '🏆' },
  { caption: 'Science Activity',                   emoji: '🔬' },
  { caption: 'Annual Prize Distribution',          emoji: '🎖️' },
  { caption: 'Student of the Month',               emoji: '⭐' },
  { caption: 'Computer Lab — Baltana',             emoji: '💻' },
  { caption: 'Parent Teacher Meet',                emoji: '🤝' },
  { caption: 'Sainik School Selection Ceremony',   emoji: '🎖️' },
  { caption: 'Batch 2023–24 — Behlana',           emoji: '👩‍🎓' },
];

export default function Gallery() {
  return (
    <main className="pt-24 min-h-screen px-5 pb-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 pt-10">
          <p className="text-xs text-gold font-semibold tracking-widest uppercase mb-3">Our Moments</p>
          <h1 className="font-display text-5xl font-black dark:text-white">
            Photo <span className="text-royal dark:text-gold">Gallery</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-4 text-sm">
            Glimpses of life at A1 Classes — Zirakpur, Baltana & Behlana
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {placeholders.map((p, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="aspect-square rounded-2xl bg-gradient-to-br from-royal/10 to-gold/10 dark:from-royal/20 dark:to-gold/20 border border-gray-100 dark:border-white/10 flex flex-col items-center justify-center gap-3 hover:shadow-xl transition-all group cursor-pointer">
              <span className="text-6xl group-hover:scale-110 transition-transform">
                {p.emoji}
              </span>
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 text-center px-4">
                {p.caption}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Instagram + Note */}
        <div className="mt-10 p-6 rounded-2xl bg-royal/5 dark:bg-royal/10 border border-royal/20 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            📸 Real photos are uploaded by admin from the admin dashboard.{' '}
            Follow us on Instagram{' '}
            <a href="https://www.instagram.com/a1cla_sses/"
              target="_blank" rel="noreferrer"
              className="text-gold font-semibold hover:underline">
              @a1cla_sses
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}