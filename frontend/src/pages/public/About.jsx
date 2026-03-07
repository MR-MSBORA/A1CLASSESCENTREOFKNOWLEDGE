import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

const branches = [
  { area: 'Zirakpur', address: 'Main Market, Zirakpur, Punjab' },
  { area: 'Baltana',  address: 'Baltana Chowk, Baltana, Punjab' },
  { area: 'Behlana',  address: 'Behlana, Chandigarh' },
];

export default function About() {
  return (
    <main className="pt-24 min-h-screen px-5 pb-16">
      <div className="max-w-5xl mx-auto py-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

          <p className="text-xs text-gold font-semibold tracking-widest uppercase mb-3">About Us</p>
          <h1 className="font-display text-5xl font-black mb-6 dark:text-white">
            Centre of <span className="text-royal dark:text-gold">Knowledge</span>
          </h1>

          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-4">
            A1 Classes — Centre of Knowledge is one of the most trusted coaching
            institutes in the Chandigarh Tricity region, with branches in{' '}
            <strong>Zirakpur</strong>, <strong>Baltana</strong>, and{' '}
            <strong>Behlana, Chandigarh</strong>.
          </p>
          <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-10">
            We provide quality education from <strong>Class 1 to 12</strong> across
            all subjects, along with specialized coaching for competitive exams,
            language courses, and digital skills. Our mission is to make every
            student confident, capable, and career-ready.
          </p>

          {/* Branches */}
          <h2 className="font-display text-3xl font-black mb-6 dark:text-white">
            Our <span className="text-gold">Branches</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
            {branches.map((b, i) => (
              <motion.div key={b.area}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:shadow-lg transition-all">
                <div className="w-12 h-12 rounded-xl bg-royal/10 dark:bg-royal/20 flex items-center justify-center mb-4">
                  <MapPin size={22} className="text-royal dark:text-gold" />
                </div>
                <h3 className="font-bold text-xl mb-1 dark:text-white">{b.area}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{b.address}</p>
              </motion.div>
            ))}
          </div>

          {/* Why Us */}
          <h2 className="font-display text-3xl font-black mb-6 dark:text-white">
            Why <span className="text-gold">A1 Classes?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              'Small batch sizes for personal attention',
              'Experienced and dedicated faculty',
              'Regular tests and performance tracking',
              'Study material included in all courses',
              'Doubt clearing sessions every week',
              'Affordable fees with no hidden charges',
            ].map((point, i) => (
              <div key={i}
                className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                <span className="text-green-500 font-bold text-lg">✓</span>
                <span className="text-gray-700 dark:text-gray-300 text-sm">{point}</span>
              </div>
            ))}
          </div>

        </motion.div>
      </div>
    </main>
  );
}