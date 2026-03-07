import { motion } from 'framer-motion';

const features = [
  { icon: '🎯', title: 'Expert Faculty',     desc: 'Experienced teachers with proven 11th & 12th results year after year.' },
  { icon: '📚', title: 'Premium Notes',      desc: 'Beautifully crafted notes available for instant download after purchase.' },
  { icon: '💬', title: 'Doubt Sessions',     desc: 'Submit doubts anytime. Get answers from teachers within 24 hours.' },
  { icon: '📊', title: 'Progress Tracking',  desc: 'Monitor attendance, marks, and syllabus completion from your portal.' },
  { icon: '🏆', title: 'Proven Results',     desc: '95%+ pass rate with multiple top rankers produced every year.' },
  { icon: '📱', title: 'Digital Portal',     desc: 'Modern student dashboard accessible on any device, anywhere.' },
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 px-5 bg-gray-50 dark:bg-[#0c1229]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs text-gold font-semibold tracking-widest uppercase mb-3">Why A1 Classes</p>
          <h2 className="font-display text-4xl md:text-5xl font-black dark:text-white">
            Built for Student{' '}
            <span className="text-royal dark:text-gold">Success</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <motion.div key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-7 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:border-royal/40 dark:hover:border-gold/30 hover:shadow-lg transition-all group">
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-lg mb-2 dark:text-white group-hover:text-royal dark:group-hover:text-gold transition-colors">
                {f.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}