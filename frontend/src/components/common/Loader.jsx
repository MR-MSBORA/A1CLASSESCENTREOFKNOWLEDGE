export function SkeletonCard() {
  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 animate-pulse">
      <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-white/10 mb-4" />
      <div className="h-4 bg-gray-200 dark:bg-white/10 rounded mb-2 w-3/4" />
      <div className="h-3 bg-gray-100 dark:bg-white/5 rounded mb-4 w-1/2" />
      <div className="h-10 bg-gray-200 dark:bg-white/10 rounded-xl" />
    </div>
  );
}

export default function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center dark:bg-[#06091a]">
      <div className="w-10 h-10 border-4 border-royal rounded-full border-t-transparent animate-spin" />
    </div>
  );
}