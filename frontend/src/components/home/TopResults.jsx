import { motion } from 'framer-motion';

const placeholders = [
  { branch: 'Zirakpur', subject: 'Science'  },
  { branch: 'Baltana',  subject: 'Commerce' },
  { branch: 'Behlana',  subject: 'Arts'     },
];

export default function TopResults() {
  return (
    <section className="py-24 px-5 bg-gray-50 dark:bg-[#0c1229]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="text-xs text-gold font-semibold tracking-widest uppercase mb-3">Hall of Fame</p>
          <h2 className="font-display text-4xl md:text-5xl font-black dark:text-white">
            Our <span className="text-royal dark:text-gold">Top Results</span>
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-3 text-sm">
            Posted directly by admin after board results — 100% verified
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {placeholders.map((t, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-7 rounded-2xl text-center bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:shadow-xl transition-all group">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-royal to-royal-light flex items-center justify-center mx-auto mb-5 text-3xl shadow-lg group-hover:scale-105 transition-transform">
                🏆
              </div>
              <p className="font-mono font-black text-5xl text-gold mb-2">--</p>
              <h3 className="font-bold text-lg dark:text-white">Result Coming Soon</h3>
              <p className="text-sm text-gray-500 mt-1">{t.subject} · 2025</p>
              <p className="text-xs text-royal dark:text-gold font-semibold mt-2">📍 {t.branch}</p>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          🔒 Only verified admin can post results. No fake results ever.
        </p>
      </div>
    </section>
  );
}