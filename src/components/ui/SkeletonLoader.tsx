import React from 'react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => (
  <div
    className={`relative overflow-hidden rounded-md bg-ivory-800/60 dark:bg-emerald-950/60 before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-gold-500/15 before:to-transparent ${className}`}
  />
);

export const CardSkeleton: React.FC = () => (
  <div className="overflow-hidden rounded-3xl border border-hairline/80 bg-surface-raised p-6 shadow-xs space-y-4 animate-pulse">
    <Skeleton className="aspect-[16/10] w-full rounded-2xl" />
    <div className="space-y-2">
      <Skeleton className="h-3.5 w-24 rounded-full" />
      <Skeleton className="h-6 w-3/4 rounded-lg" />
      <Skeleton className="h-4 w-full rounded-md" />
      <Skeleton className="h-4 w-5/6 rounded-md" />
    </div>
    <div className="pt-3 border-t border-hairline/60 flex items-center justify-between">
      <Skeleton className="h-4 w-28 rounded-md" />
      <Skeleton className="h-7 w-7 rounded-full" />
    </div>
  </div>
);

export const PageSkeleton: React.FC = () => (
  <div className="min-h-screen bg-surface text-ink font-sans pb-24">
    {/* Masthead Banner Skeleton */}
    <div className="relative overflow-hidden border-b border-hairline/80 bg-surface/90 pt-28 sm:pt-36 pb-16 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <Skeleton className="h-6 w-36 rounded-full" />
            <Skeleton className="h-12 sm:h-16 w-4/5 rounded-xl" />
            <Skeleton className="h-1.5 w-16 rounded-full" />
            <Skeleton className="h-5 w-full rounded-md" />
            <Skeleton className="h-5 w-5/6 rounded-md" />

            <div className="flex gap-3 pt-3">
              <Skeleton className="h-11 w-36 rounded-full" />
              <Skeleton className="h-11 w-44 rounded-full" />
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-gold-600/20 pt-5 max-w-md">
              <div className="space-y-1.5">
                <Skeleton className="h-7 w-20 rounded" />
                <Skeleton className="h-3 w-16 rounded" />
              </div>
              <div className="space-y-1.5">
                <Skeleton className="h-7 w-20 rounded" />
                <Skeleton className="h-3 w-16 rounded" />
              </div>
              <div className="space-y-1.5">
                <Skeleton className="h-7 w-20 rounded" />
                <Skeleton className="h-3 w-16 rounded" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <Skeleton className="aspect-[4/3] w-full rounded-3xl" />
          </div>
        </div>
      </div>
    </div>

    {/* Cards Section Skeleton */}
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16">
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <Skeleton className="h-4 w-28 mx-auto rounded-full" />
        <Skeleton className="h-8 w-3/4 mx-auto rounded-lg" />
        <Skeleton className="h-4 w-2/3 mx-auto rounded-md" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <CardSkeleton />
        <CardSkeleton />
        <CardSkeleton />
      </div>
    </div>
  </div>
);
