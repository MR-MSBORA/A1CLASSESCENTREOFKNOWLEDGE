import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';

export default function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [filter,   setFilter]   = useState('All');

  useEffect(() => {
    api.get('/teachers')
      .then(r => setTeachers(r.data.data || []))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'All'
    ? teachers
    : teachers.filter(t => t.branch === filter);

  return (
    <main className="pt-24 min-h-screen px-5 pb-16 bg-[#06091a]">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-14 pt-10">
          <p className="text-xs text-gold font-semibold tracking-widest uppercase mb-3">
            Our Team
          </p>
          <h1 className="font-display text-5xl font-black text-white">
            Meet Our <span className="text-gold">Teachers</span>
          </h1>
          <p className="text-gray-500 mt-4 text-sm">
            Dedicated educators across Zirakpur, Baltana & Behlana
          </p>
        </div>

        {/* Branch Filter */}
        <div className="flex gap-3 justify-center mb-10 flex-wrap">
          {['All','Zirakpur','Baltana','Behlana'].map(b => (
            <button key={b} onClick={() => setFilter(b)}
              className={`px-5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                filter === b
                  ? 'bg-royal text-white'
                  : 'bg-white/5 border border-white/10 text-gray-400 hover:text-white'
              }`}>
              {b}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-center text-gray-400 py-20">Loading...</p>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-3">👨‍🏫</p>
            <p className="text-gray-400">No teachers found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((t, i) => (
              <motion.div key={t._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-gold/30 hover:shadow-xl transition-all group">

                {/* Photo */}
                <div className="flex items-center gap-4 mb-5">
                  {t.photo ? (
                    <img src={t.photo} alt={t.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-royal/40 group-hover:border-gold/50 transition-colors" />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-royal to-royal-light flex items-center justify-center font-black text-gold text-2xl">
                      {t.name?.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-white text-base">{t.name}</h3>
                    <p className="text-xs text-gold">{t.qualification}</p>
                    <p className="text-xs text-gray-500">
                      {t.experience > 0 ? `${t.experience} yrs experience` : 'New Faculty'}
                    </p>
                  </div>
                </div>

                {/* Subjects */}
                {t.subjects?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {t.subjects.map(s => (
                      <span key={s}
                        className="px-2 py-1 rounded-lg bg-royal/20 text-blue-300 text-xs font-semibold">
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                {/* Bio */}
                {t.bio && (
                  <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-3">
                    {t.bio}
                  </p>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-xs text-gray-500">📍 {t.branch}</span>
                  {t.classes?.length > 0 && (
                    <span className="text-xs text-gold font-semibold">
                      Class {t.classes.join(', ')}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}