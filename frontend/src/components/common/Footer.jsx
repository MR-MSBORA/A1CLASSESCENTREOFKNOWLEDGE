import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-[#0c1229] border-t border-gray-200 dark:border-white/10 py-12 px-5">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row flex-wrap justify-between items-center gap-6 text-center sm:text-left">
        <div>
          <p className="font-display font-black text-xl dark:text-white">
            A1 <span className="text-gold">Classes</span>
          </p>
          <p className="text-sm text-gray-500 mt-1">Centre of Knowledge · CHANDIGARH | BALTANA | ZIRAKPUR</p>
        </div>
        <div className="flex gap-6 text-sm">
          {['/about', '/courses', '/notes', '/contact'].map(p => (
            <Link key={p} to={p}
              className="text-gray-500 hover:text-gold transition-colors capitalize">
              {p.slice(1)}
            </Link>
          ))}
        </div>
        <p className="text-xs text-gray-400">© 2026 A1 Classes. All rights reserved.</p>
      </div>

      {/* WhatsApp Float Button */}
      <a href="https://wa.me/918699531387"
        target="_blank" rel="noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-[#25d366] flex items-center justify-center text-2xl shadow-xl hover:scale-110 transition-transform z-50"
        title="Chat on WhatsApp">
        💬
      </a>
    </footer>
  );
}