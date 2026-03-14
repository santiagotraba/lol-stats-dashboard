import { cn } from '@/lib/utils';

interface SkeletonCardProps {
  className?: string;
}

export const SkeletonBlock = ({ className }: { className?: string }) => (
  <div className={cn("relative overflow-hidden rounded-md bg-muted", className)}>
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/5 to-transparent animate-shimmer" />
  </div>
);

export const SkeletonMatchCard = () => (
  <div className="glass-surface rounded-hex p-4 flex gap-4 items-center">
    <SkeletonBlock className="w-1 h-12 rounded-full" />
    <SkeletonBlock className="w-12 h-12 rounded-full" />
    <div className="flex-1 space-y-2">
      <SkeletonBlock className="h-4 w-24" />
      <SkeletonBlock className="h-3 w-16" />
    </div>
    <div className="flex gap-1">
      {Array.from({ length: 6 }).map((_, i) => (
        <SkeletonBlock key={i} className="w-8 h-8 rounded-sm" />
      ))}
    </div>
  </div>
);

export const SkeletonProfile = () => (
  <div className="glass-surface rounded-hex p-6 flex gap-6 items-center">
    <SkeletonBlock className="w-24 h-24 rounded-full" />
    <div className="space-y-3 flex-1">
      <SkeletonBlock className="h-6 w-48" />
      <SkeletonBlock className="h-4 w-32" />
      <SkeletonBlock className="h-4 w-24" />
    </div>
  </div>
);

export const SkeletonChampionRow = () => (
  <div className="flex gap-4 items-center py-3 px-4">
    <SkeletonBlock className="w-10 h-10 rounded-full" />
    <SkeletonBlock className="h-4 w-20 flex-1" />
    <SkeletonBlock className="h-4 w-12" />
    <SkeletonBlock className="h-4 w-16" />
    <SkeletonBlock className="h-4 w-12" />
  </div>
);
