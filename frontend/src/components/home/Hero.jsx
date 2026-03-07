// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';

// export default function Hero() {
//     return (
//         <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">

//             {/* Background */}
//             <div className="absolute inset-0 bg-gradient-to-br from-royal/20 via-transparent to-gold/10 dark:from-royal/30" />
//             <div className="absolute inset-0"
//                 style={{
//                     backgroundImage: 'linear-gradient(rgba(26,60,143,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(26,60,143,0.07) 1px, transparent 1px)',
//                     backgroundSize: '60px 60px'
//                 }} />

//             {/* Glowing Orbs */}
//             <div className="absolute top-20 left-10 w-72 h-72 bg-royal/20 rounded-full blur-3xl animate-pulse" />
//             <div className="absolute bottom-20 right-10 w-48 h-48 bg-gold/15 rounded-full blur-3xl animate-pulse delay-1000" />
//             <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-royal/10 rounded-full blur-2xl animate-pulse delay-500" />

//             {/* Content */}
//             <div className="relative z-10 text-center max-w-4xl mx-auto px-5">

//                 {/* Badge */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.6 }}
//                     className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 dark:bg-white/5 border border-white/20 backdrop-blur-sm mb-8">
//                     <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
//                     <span className="text-xs text-gold font-semibold tracking-widest uppercase">
//                         Zirakpur · Baltana · Chandigarh
//                     </span>
//                 </motion.div>

//                 {/* Heading */}
//                 <motion.h1
//                     initial={{ opacity: 0, y: 30 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ duration: 0.7, delay: 0.1 }}
//                     className="font-display text-5xl md:text-7xl font-black leading-tight mb-6 dark:text-white">
//                     Unlock Your{' '}
//                     <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
//                         Potential
//                     </span>
//                     <br />with A1 Classes
//                 </motion.h1>

//                 {/* Subheading */}
//                 <motion.p
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 0.3 }}
//                     className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-10">
//                     Quality coaching for Classes 1–12, government exam preparation, and entrance tests.
//                     Our English communication courses focus on speaking, grammar, and confidence, while computer classes cover digital skills, MS Office, internet basics, and programming fundamentals.
//                 </motion.p>

//                 {/* Buttons */}
//                 <motion.div
//                     initial={{ opacity: 0, y: 10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.4 }}
//                     className="flex gap-4 justify-center flex-wrap">
//                     <Link to="/register"
//                         className="px-8 py-4 rounded-xl bg-gradient-to-r from-gold to-gold-light text-[#0d1433] font-bold text-base hover:shadow-2xl hover:shadow-gold/30 transition-all hover:-translate-y-0.5">
//                         Enroll Now →
//                     </Link>
//                     <Link to="/notes"
//                         className="px-8 py-4 rounded-xl border border-gray-300 dark:border-white/20 font-semibold text-base backdrop-blur-sm hover:border-gold dark:text-white transition-all">
//                         Browse Notes
//                     </Link>
//                 </motion.div>
//             </div>
//         </section>
//     );
// }


import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-royal/20 via-transparent to-gold/10" />
      <div className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(rgba(26,60,143,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(26,60,143,0.07) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />

      {/* Orbs */}
      <div className="absolute top-20 left-4 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 bg-royal/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-4 sm:right-10 w-32 sm:w-48 h-32 sm:h-48 bg-gold/15 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm mb-6 sm:mb-8">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse flex-shrink-0" />
          <span className="text-[10px] sm:text-xs text-gold font-semibold tracking-widest uppercase">
            Zirakpur · Baltana · Behlana, Chandigarh
          </span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight mb-4 sm:mb-6 text-white">
          Unlock Your{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-gold-light">
            Potential
          </span>
          <br />with A1 Classes
        </motion.h1>

        {/* Sub */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm sm:text-base md:text-lg text-gray-400 max-w-2xl mx-auto mb-8 sm:mb-10 px-2">
          Expert coaching from Class 1 to 12, Sainik School, RMS, Navodaya,
          SSC, Patwari, English Communication & Computer courses.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-3 justify-center flex-wrap px-4">
          <Link to="/register"
            className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-gradient-to-r from-gold to-gold-light text-[#0d1433] font-bold text-sm sm:text-base hover:shadow-2xl hover:shadow-gold/30 transition-all hover:-translate-y-0.5">
            Enroll Now →
          </Link>
          <Link to="/notes"
            className="px-6 sm:px-8 py-3 sm:py-4 rounded-xl border border-white/20 font-semibold text-sm sm:text-base text-white backdrop-blur-sm hover:border-gold transition-all">
            Browse Notes
          </Link>
        </motion.div>
      </div>
    </section>
  );
}