// // import Hero        from '../../components/home/Hero';
// // import StatsBar    from '../../components/home/StatsBar';
// // import WhyChooseUs from '../../components/home/WhyChooseUs';
// // import TopResults  from '../../components/home/TopResults';
// // import Reviews     from '../../components/home/Reviews';

// // export default function Home() {
// //   return (
// //     <main>
// //       <Hero />
// //       <StatsBar />
// //       <WhyChooseUs />
// //       <TopResults />
// //       <Reviews />
// //     </main>
// //   );
// // }



// import { useEffect, useState } from 'react';
// import Hero        from '../../components/home/Hero';
// import StatsBar    from '../../components/home/StatsBar';
// import WhyChooseUs from '../../components/home/WhyChooseUs';
// import Reviews     from '../../components/home/Reviews';
// import api         from '../../services/api';

// export default function Home() {
//   const [results, setResults] = useState([]);

//   useEffect(() => {
//     api.get('/results').then(r => setResults(r.data.data)).catch(() => {});
//   }, []);

//   return (
//     <main>
//       <Hero />
//       <StatsBar />
//       <WhyChooseUs />

//       {/* Top Results — Real from DB */}
//       {results.length > 0 && (
//         <section className="py-24 px-5 bg-[#0c1229]">
//           <div className="max-w-6xl mx-auto">
//             <div className="text-center mb-14">
//               <p className="text-xs text-gold font-semibold tracking-widest uppercase mb-3">Hall of Fame</p>
//               <h2 className="font-display text-4xl font-black text-white">
//                 Our <span className="text-gold">Top Results</span>
//               </h2>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {results.slice(0, 6).map((r, i) => (
//                 <div key={r._id}
//                   className="p-7 rounded-2xl text-center bg-white/5 border border-white/10 hover:shadow-xl transition-all">
//                   <div className="w-16 h-16 rounded-full bg-gradient-to-br from-royal to-royal-light flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg">
//                     🏆
//                   </div>
//                   <p className="font-mono font-black text-4xl text-gold mb-2">{r.score}</p>
//                   <h3 className="font-bold text-lg text-white">{r.name}</h3>
//                   <p className="text-sm text-gray-400 mt-1">{r.subject} · {r.year}</p>
//                   <p className="text-xs text-royal-light font-semibold mt-2">📍 {r.branch}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>
//       )}

//       <Reviews />
//     </main>
//   );
// }



import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Hero        from '../../components/home/Hero';
import StatsBar    from '../../components/home/StatsBar';
import WhyChooseUs from '../../components/home/WhyChooseUs';
import Reviews     from '../../components/home/Reviews';
import api         from '../../services/api';

export default function Home() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    api.get('/results')
      .then(r => setResults(r.data.data))
      .catch(() => {});
  }, []);

  return (
    <main>
      <Hero />
      <StatsBar />
      <WhyChooseUs />

      {/* Top Results — only shows when admin has posted real results */}
      {results.length > 0 && (
        <section className="py-24 px-5 bg-[#0c1229]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-xs text-gold font-semibold tracking-widest uppercase mb-3">
                Hall of Fame
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-black text-white">
                Our <span className="text-gold">Top Results</span>
              </h2>
              <p className="text-gray-500 mt-3 text-sm">
                Posted by admin after board results — 100% verified
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {results.slice(0, 6).map((r, i) => (
                <motion.div key={r._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-7 rounded-2xl text-center bg-white/5 border border-white/10 hover:shadow-xl hover:border-gold/30 transition-all group">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-royal to-royal-light flex items-center justify-center mx-auto mb-4 text-2xl shadow-lg group-hover:scale-105 transition-transform">
                    🏆
                  </div>
                  <p className="font-mono font-black text-4xl text-gold mb-2">{r.score}</p>
                  <h3 className="font-bold text-lg text-white">{r.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{r.subject} · {r.year}</p>
                  <p className="text-xs text-royal-light font-semibold mt-2">📍 {r.branch}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Reviews />
    </main>
  );
}