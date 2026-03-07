// // import { motion } from 'framer-motion';
// // import { useState } from 'react';
// // import api from '../../services/api';
// // import { useEffect, useState } from 'react';

// // const reviews = [
// //   {
// //     name: 'Arjun Sharma',
// //     class: 'Class 12 Science',
// //     rating: 5,
// //     review: 'The teachers here are extremely dedicated. I scored 94% in boards and it would not have been possible without A1 Classes. The notes are top quality.',
// //     branch: 'Zirakpur',
// //     date: 'March 2024',
// //   },
// //   {
// //     name: 'Simran Kaur',
// //     class: 'Class 11 Commerce',
// //     rating: 5,
// //     review: 'Best coaching in the tricity. Doubt sessions are very helpful and teachers always make sure every student understands properly before moving on.',
// //     branch: 'Baltana',
// //     date: 'February 2024',
// //   },
// //   {
// //     name: 'Rahul Verma',
// //     class: 'Sainik School Prep',
// //     rating: 5,
// //     review: 'Got selected in Sainik School after preparing here for 6 months. The study material and mock tests were exactly what I needed. Forever grateful.',
// //     branch: 'Behlana',
// //     date: 'January 2024',
// //   },
// //   {
// //     name: 'Priya Negi',
// //     class: 'English Communication',
// //     rating: 5,
// //     review: 'My spoken English improved drastically. The teacher is very patient and batch size is small so everyone gets personal attention. Highly recommend.',
// //     branch: 'Zirakpur',
// //     date: 'March 2024',
// //   },
// //   {
// //     name: 'Harpreet Singh',
// //     class: 'Class 10 All Subjects',
// //     rating: 5,
// //     review: 'My result improved from 67% to 88% in one year. Regular tests and feedback helped me find my weak areas and fix them on time.',
// //     branch: 'Baltana',
// //     date: 'April 2024',
// //   },
// //   {
// //     name: 'Deepika Rani',
// //     class: 'SSC CGL Coaching',
// //     rating: 5,
// //     review: 'Faculty for competitive exams is excellent. They cover each topic in detail with practice sets. I cleared SSC CHSL in my very first attempt.',
// //     branch: 'Behlana',
// //     date: 'February 2024',
// //   },
// // ];

// // function Stars({ count }) {
// //   return (
// //     <div className="flex gap-0.5">
// //       {[1,2,3,4,5].map(s => (
// //         <span key={s} className={s <= count ? 'text-gold text-sm' : 'text-gray-300 text-sm'}>★</span>
// //       ))}
// //     </div>
// //   );
// // }

// // export default function Reviews() {
// //   const [showAll, setShowAll] = useState(false);
// //   const visible = showAll ? reviews : reviews.slice(0, 3);

// //   return (
// //     <section className="py-24 px-5 bg-white dark:bg-[#06091a]">
// //       <div className="max-w-6xl mx-auto">

// //         <div className="text-center mb-16">
// //           <p className="text-xs text-gold font-semibold tracking-widest uppercase mb-3">Student Reviews</p>
// //           <h2 className="font-display text-4xl md:text-5xl font-black dark:text-white">
// //             What Our Students{' '}
// //             <span className="text-royal dark:text-gold">Say</span>
// //           </h2>
// //           <p className="text-gray-500 dark:text-gray-400 mt-4 text-sm">
// //             Real reviews from students across Zirakpur, Baltana & Behlana
// //           </p>
// //         </div>

// //         {/* Rating Summary */}
// //         <div className="flex flex-wrap items-center justify-center gap-8 mb-12 p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10">
// //           <div className="text-center">
// //             <p className="font-mono font-black text-6xl text-gold">5.0</p>
// //             <Stars count={5} />
// //             <p className="text-xs text-gray-500 mt-1">Overall Rating</p>
// //           </div>
// //           <div className="w-px h-14 bg-gray-200 dark:bg-white/10 hidden md:block" />
// //           <div className="text-center">
// //             <p className="font-mono font-black text-4xl dark:text-white">100+</p>
// //             <p className="text-xs text-gray-500 mt-1">Happy Students</p>
// //           </div>
// //           <div className="w-px h-14 bg-gray-200 dark:bg-white/10 hidden md:block" />
// //           <div className="text-center">
// //             <p className="font-mono font-black text-4xl dark:text-white">3</p>
// //             <p className="text-xs text-gray-500 mt-1">Branches</p>
// //           </div>
// //           <div className="w-px h-14 bg-gray-200 dark:bg-white/10 hidden md:block" />
// //           <a href="https://www.justdial.com/Chandigarh/A1-Classes-Center-Of-Knowledge-Behlana/0172PX172-X172-230501134853-W8I7_BZDET"
// //             target="_blank" rel="noreferrer"
// //             className="px-5 py-2.5 rounded-xl bg-royal text-white text-sm font-semibold hover:bg-royal-light transition-colors">
// //             See Reviews on JustDial →
// //           </a>
// //         </div>

// //         {/* Review Cards */}
// //         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {visible.map((r, i) => (
// //             <motion.div key={r.name}
// //               initial={{ opacity: 0, y: 20 }}
// //               whileInView={{ opacity: 1, y: 0 }}
// //               viewport={{ once: true }}
// //               transition={{ delay: i * 0.1 }}
// //               className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 hover:shadow-lg transition-all flex flex-col gap-4">

// //               <div className="flex items-start justify-between">
// //                 <div className="flex items-center gap-3">
// //                   <div className="w-10 h-10 rounded-full bg-royal/10 dark:bg-royal/20 flex items-center justify-center font-bold text-royal dark:text-gold">
// //                     {r.name.charAt(0)}
// //                   </div>
// //                   <div>
// //                     <p className="font-bold text-sm dark:text-white">{r.name}</p>
// //                     <p className="text-xs text-gray-500">{r.class}</p>
// //                   </div>
// //                 </div>
// //                 <Stars count={r.rating} />
// //               </div>

// //               <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-1">
// //                 "{r.review}"
// //               </p>

// //               <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-white/10">
// //                 <span className="text-xs text-royal dark:text-gold font-semibold">📍 {r.branch}</span>
// //                 <span className="text-xs text-gray-400">{r.date}</span>
// //               </div>
// //             </motion.div>
// //           ))}
// //         </div>

// //         {!showAll && (
// //           <div className="text-center mt-10">
// //             <button onClick={() => setShowAll(true)}
// //               className="px-8 py-3 rounded-xl border border-gray-200 dark:border-white/20 text-sm font-semibold dark:text-white hover:border-gold transition-all">
// //               Show All Reviews →
// //             </button>
// //           </div>
// //         )}

// //         <p className="text-center text-xs text-gray-400 mt-8">
// //           ⭐ Reviews are written by verified students through their login portal and are displayed exactly as submitted to maintain transparency and trust.
// //         </p>
// //       </div>
// //     </section>
// //   );
// // }




// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import api from '../../services/api';

// function Stars({ count }) {
//   return (
//     <div className="flex gap-0.5">
//       {[1,2,3,4,5].map(s => (
//         <span key={s} className={s <= count ? 'text-gold text-sm' : 'text-gray-600 text-sm'}>★</span>
//       ))}
//     </div>
//   );
// }

// export default function Reviews() {
//   const [reviews, setReviews] = useState([]);
//   const [showAll, setShowAll] = useState(false);

//   useEffect(() => {
//     api.get('/reviews/approved')
//       .then(r => setReviews(r.data.data))
//       .catch(() => {});
//   }, []);

//   const visible = showAll ? reviews : reviews.slice(0, 3);

//   if (reviews.length === 0) return null;

//   return (
//     <section className="py-24 px-5 bg-[#06091a]">
//       <div className="max-w-6xl mx-auto">

//         <div className="text-center mb-16">
//           <p className="text-xs text-gold font-semibold tracking-widest uppercase mb-3">Student Reviews</p>
//           <h2 className="font-display text-4xl md:text-5xl font-black text-white">
//             What Our Students{' '}
//             <span className="text-gold">Say</span>
//           </h2>
//           <p className="text-gray-500 mt-4 text-sm">
//             Real reviews from students across Zirakpur, Baltana & Behlana
//           </p>
//         </div>

//         {/* Rating Summary */}
//         <div className="flex flex-wrap items-center justify-center gap-8 mb-12 p-6 rounded-2xl bg-white/5 border border-white/10">
//           <div className="text-center">
//             <p className="font-mono font-black text-6xl text-gold">5.0</p>
//             <Stars count={5} />
//             <p className="text-xs text-gray-500 mt-1">Overall Rating</p>
//           </div>
//           <div className="w-px h-14 bg-white/10 hidden md:block" />
//           <div className="text-center">
//             <p className="font-mono font-black text-4xl text-white">{reviews.length}+</p>
//             <p className="text-xs text-gray-500 mt-1">Happy Students</p>
//           </div>
//           <div className="w-px h-14 bg-white/10 hidden md:block" />
//           <div className="text-center">
//             <p className="font-mono font-black text-4xl text-white">3</p>
//             <p className="text-xs text-gray-500 mt-1">Branches</p>
//           </div>
//           <div className="w-px h-14 bg-white/10 hidden md:block" />
          
//             href="https://www.justdial.com/Chandigarh/A1-Classes-Center-Of-Knowledge-Behlana/0172PX172-X172-230501134853-W8I7_BZDET"
//             target="_blank"
//             rel="noreferrer"
//             className="px-5 py-2.5 rounded-xl bg-royal text-white text-sm font-semibold hover:bg-royal-light transition-colors">
//             See Reviews on JustDial →
//           </a>
//         </div>

//         {/* Review Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {visible.map((r, i) => (
//             <motion.div key={r._id || i}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: i * 0.1 }}
//               className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:shadow-lg transition-all flex flex-col gap-4">

//               <div className="flex items-start justify-between">
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-full bg-royal/20 flex items-center justify-center font-bold text-gold">
//                     {r.name?.charAt(0)}
//                   </div>
//                   <div>
//                     <p className="font-bold text-sm text-white">{r.name}</p>
//                     <p className="text-xs text-gray-500">{r.class}</p>
//                   </div>
//                 </div>
//                 <Stars count={r.rating} />
//               </div>

//               <p className="text-sm text-gray-400 leading-relaxed flex-1">
//                 "{r.review}"
//               </p>

//               <div className="flex items-center justify-between pt-3 border-t border-white/10">
//                 <span className="text-xs text-gold font-semibold">📍 {r.branch}</span>
//                 <span className="text-xs text-gray-500">
//                   {new Date(r.createdAt).toLocaleDateString('en-IN', {
//                     month: 'short', year: 'numeric'
//                   })}
//                 </span>
//               </div>
//             </motion.div>
//           ))}
//         </div>

//         {/* Show More */}
//         {!showAll && reviews.length > 3 && (
//           <div className="text-center mt-10">
//             <button
//               onClick={() => setShowAll(true)}
//               className="px-8 py-3 rounded-xl border border-white/20 text-sm font-semibold text-white hover:border-gold transition-all">
//               Show All Reviews →
//             </button>
//           </div>
//         )}

//         <p className="text-center text-xs text-gray-500 mt-8">
//           ⭐ Students submit reviews from their portal. All reviews are approved by admin before going live.
//         </p>
//       </div>
//     </section>
//   );
// }

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../../services/api';

function Stars({ count }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <span key={s} className={s <= count ? 'text-gold text-sm' : 'text-gray-600 text-sm'}>
          ★
        </span>
      ))}
    </div>
  );
}

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    api.get('/reviews/approved')
      .then(r => setReviews(r.data.data))
      .catch(() => {});
  }, []);

  const visible = showAll ? reviews : reviews.slice(0, 3);

  if (reviews.length === 0) return null;

  return (
    <section className="py-24 px-5 bg-[#06091a]">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs text-gold font-semibold tracking-widest uppercase mb-3">
            Student Reviews
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white">
            What Our Students <span className="text-gold">Say</span>
          </h2>
          <p className="text-gray-500 mt-4 text-sm">
            Real reviews from students across Zirakpur, Baltana &amp; Behlana
          </p>
        </div>

        {/* Rating Summary */}
        <div className="flex flex-wrap items-center justify-center gap-8 mb-12 p-6 rounded-2xl bg-white/5 border border-white/10">
          <div className="text-center">
            <p className="font-mono font-black text-6xl text-gold">5.0</p>
            <Stars count={5} />
            <p className="text-xs text-gray-500 mt-1">Overall Rating</p>
          </div>
          <div className="w-px h-14 bg-white/10 hidden md:block" />
          <div className="text-center">
            <p className="font-mono font-black text-4xl text-white">{reviews.length}+</p>
            <p className="text-xs text-gray-500 mt-1">Happy Students</p>
          </div>
          <div className="w-px h-14 bg-white/10 hidden md:block" />
          <div className="text-center">
            <p className="font-mono font-black text-4xl text-white">3</p>
            <p className="text-xs text-gray-500 mt-1">Branches</p>
          </div>
          <div className="w-px h-14 bg-white/10 hidden md:block" />
          <a
            href="https://www.justdial.com/Chandigarh/A1-Classes-Center-Of-Knowledge-Behlana/0172PX172-X172-230501134853-W8I7_BZDET"
            target="_blank"
            rel="noreferrer"
            className="px-5 py-2.5 rounded-xl bg-royal text-white text-sm font-semibold hover:bg-royal-light transition-colors"
          >
            See Reviews on JustDial →
          </a>
        </div>

        {/* Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((r, i) => (
            <motion.div
              key={r._id || i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:shadow-lg transition-all flex flex-col gap-4"
            >
              {/* Top Row */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-royal/20 flex items-center justify-center font-bold text-gold">
                    {r.name?.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-sm text-white">{r.name}</p>
                    <p className="text-xs text-gray-500">{r.class}</p>
                  </div>
                </div>
                <Stars count={r.rating} />
              </div>

              {/* Review Text */}
              <p className="text-sm text-gray-400 leading-relaxed flex-1">
                "{r.review}"
              </p>

              {/* Bottom Row */}
              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <span className="text-xs text-gold font-semibold">📍 {r.branch}</span>
                <span className="text-xs text-gray-500">
                  {new Date(r.createdAt).toLocaleDateString('en-IN', {
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Show More Button */}
        {!showAll && reviews.length > 3 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowAll(true)}
              className="px-8 py-3 rounded-xl border border-white/20 text-sm font-semibold text-white hover:border-gold transition-all"
            >
              Show All Reviews →
            </button>
          </div>
        )}

        <p className="text-center text-xs text-gray-500 mt-8">
          ⭐ Students submit reviews from their portal. All reviews are approved by admin before going live.
        </p>

      </div>
    </section>
  );
}