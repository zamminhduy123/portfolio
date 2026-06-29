import LearningsClient from '@/components/learnings/LearningsClient';

export default function LearningsPage() {
  return (
    <div className="flex-1 w-full h-[calc(100vh-64px)] relative overflow-hidden bg-[#08080f] text-slate-100">
      <LearningsClient />
    </div>
  );
}
