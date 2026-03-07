import { motion } from 'framer-motion';

const courses = [
    {
        category: 'School Classes',
        icon: '🏫',
        color: 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800/30',
        items: [
            'Primary Classes (Class 1 – 5) – All Subjects',
            'Middle School (Class 6 – 8) – All Subjects',
            'Secondary Classes (Class 9 – 10) – All Subjects',
            'Senior Secondary (Class 11 – 12) – Science Stream',
            'Senior Secondary (Class 11 – 12) – Commerce Stream',
            'Senior Secondary (Class 11 – 12) – Arts / Humanities',
        ],
    },
    {
        category: 'Entrance & Competitive Exams',
        icon: '🏆',
        color: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-100 dark:border-yellow-800/30',
        items: [
            'Sainik School Entrance Exam',
            'Rashtriya Military School (RMS)',
            'Navodaya Vidyalaya Samiti (NVS)',
            'SSC CHSL',
            'SSC CGL',
            'SSC MTS',
            'SSC GD Constable',
            'Railway Exams (RRB NTPC)',
            'Railway Group D',
            'Indian Army (GD / Clerk / Tradesman)',
            'Agniveer Army Recruitment',
            'CUET Entrance Exam',
            'Punjab TET (PSTET)',
            'And Many More...'
        ],
    },
    {
        category: 'Language & Communication',
        icon: '🗣️',
        color: 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800/30',
        items: [
            'Spoken English & Communication Skills',
            'English Grammar (Beginner to Advanced)',
            'Public Speaking & Group Discussion Skills',
            'Interview Preparation & Professional Communication',
            'Personality Development & Confidence Building'
        ],
    },
    {
        category: 'Computer & Technology',
        icon: '💻',
        color: 'bg-purple-50 dark:bg-purple-900/20 border-purple-100 dark:border-purple-800/30',
        items: [
            'Computer Fundamentals & Digital Literacy (Windows, Typing, Internet)',
            'MS Office & Productivity Tools (Word, Excel, PowerPoint)',
            'Programming Fundamentals & Logic Building',
            'Web Development (HTML, CSS, JavaScript, MongoDB)',
            'Creative Design & Editing Tools (Photoshop, DaVinci Resolve, Canva)',
            'Accounting Software (Tally & GST Basics)'
        ],
    },
];

export default function Courses() {
    return (
        <main className="pt-24 min-h-screen px-5 pb-16">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16 pt-10">
                    <p className="text-xs text-gold font-semibold tracking-widest uppercase mb-3">What We Offer</p>
                    <h1 className="font-display text-5xl font-black dark:text-white">
                        Our <span className="text-royal dark:text-gold">Courses</span>
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-xl mx-auto text-sm">
                        From Class 1 to competitive exams — we have a course for every
                        student at every stage, across all 3 branches.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {courses.map((cat, i) => (
                        <motion.div key={cat.category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`p-7 rounded-2xl border ${cat.color} hover:shadow-lg transition-all`}>
                            <div className="flex items-center gap-3 mb-5">
                                <span className="text-4xl">{cat.icon}</span>
                                <h2 className="font-display font-black text-xl dark:text-white">
                                    {cat.category}
                                </h2>
                            </div>
                            <ul className="space-y-2.5">
                                {cat.items.map(item => (
                                    <li key={item}
                                        className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                        <span className="w-1.5 h-1.5 rounded-full bg-royal dark:bg-gold flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}