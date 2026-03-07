import { motion } from 'framer-motion';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { MapPin } from 'lucide-react';

const branches = [
    { branch: 'Zirakpur', addr: 'Main Market, Zirakpur, Punjab' },
    { branch: 'Baltana', addr: 'Baltana Chowk, Baltana, Punjab' },
    { branch: 'Behlana', addr: 'Behlana, Chandigarh' },
];

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) {
            toast.error('Please fill all fields');
            return;
        }
        const text = `New Enquiry from A1 Classes Website%0A%0AName: ${form.name}%0AEmail: ${form.email}%0AMessage: ${form.message}`;
        window.open(`https://wa.me/918699531387?text=${text}`, '_blank');
        toast.success('Opening WhatsApp...');
        setForm({ name: '', email: '', message: '' });
    };

    return (
        <main className="pt-24 min-h-screen px-5 pb-16">
            <div className="max-w-3xl mx-auto py-10">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

                    <p className="text-xs text-gold font-semibold tracking-widest uppercase mb-3">Get In Touch</p>
                    <h1 className="font-display text-5xl font-black mb-10 dark:text-white">
                        Contact <span className="text-royal dark:text-gold">Us</span>
                    </h1>

                    {/* Branch Locations */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                        {branches.map(b => (
                            <div key={b.branch}
                                className="p-5 rounded-xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
                                <div className="flex items-center gap-2 mb-2">
                                    <MapPin size={16} className="text-royal dark:text-gold" />
                                    <p className="font-bold dark:text-white">{b.branch}</p>
                                </div>
                                <p className="text-sm text-gray-500">{b.addr}</p>
                            </div>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <div className="space-y-5 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl p-8">
                        <h2 className="font-bold text-xl dark:text-white mb-2">Send us a message</h2>

                        {[
                            { label: 'Your Name', key: 'name', type: 'text', ph: 'Rahul Sharma' },
                            { label: 'Your Email', key: 'email', type: 'email', ph: 'you@email.com' },
                        ].map(({ label, key, type, ph }) => (
                            <div key={key}>
                                <label className="text-sm font-medium mb-1.5 block dark:text-gray-300">{label}</label>
                                <input type={type} placeholder={ph} value={form[key]}
                                    onChange={e => setForm({ ...form, [key]: e.target.value })}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 dark:text-white focus:outline-none focus:border-royal dark:focus:border-gold transition-colors" />
                            </div>
                        ))}

                        <div>
                            <label className="text-sm font-medium mb-1.5 block dark:text-gray-300">Message</label>
                            <textarea rows={5} placeholder="How can we help you?"
                                value={form.message}
                                onChange={e => setForm({ ...form, message: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 dark:text-white focus:outline-none focus:border-royal dark:focus:border-gold transition-colors resize-none" />
                        </div>

                        <button onClick={handleSubmit}
                            className="w-full py-3.5 rounded-xl bg-royal text-white font-bold hover:bg-royal-light transition-colors">
                            Send Message
                        </button>
                    </div>

                </motion.div>
            </div>
        </main>
    );
}