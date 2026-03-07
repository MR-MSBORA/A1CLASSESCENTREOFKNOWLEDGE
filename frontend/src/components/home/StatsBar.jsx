import { useEffect, useRef, useState } from 'react';

const stats = [
  { num: 500, suffix: '+', label: 'Students'  },
  { num: 95,  suffix: '%', label: 'Pass Rate' },
  { num: 50,  suffix: '+', label: 'Notes'     },
  { num: 5,   suffix: '+', label: 'Years'     },
];

function Counter({ target, suffix }) {
  const [val, setVal] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let s = 0;
        const t = setInterval(() => {
          s += target / 60;
          if (s >= target) { setVal(target); clearInterval(t); }
          else setVal(Math.floor(s));
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

export default function StatsBar() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200 dark:bg-white/10 border-y border-gray-200 dark:border-white/10">
      {stats.map(s => (
        <div key={s.label} className="text-center py-10 bg-white dark:bg-[#0c1229]">
          <p className="font-mono font-bold text-4xl text-royal dark:text-gold">
            <Counter target={s.num} suffix={s.suffix} />
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 uppercase tracking-widest">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}