import { useEffect, useState } from 'react';

interface TimerProps {
  totalSeconds: number;
  onTimeUp: () => void;
  isPaused?: boolean;
}

export function Timer({ totalSeconds, onTimeUp, isPaused = false }: TimerProps) {
  const [remaining, setRemaining] = useState(totalSeconds);

  useEffect(() => {
    if (isPaused || remaining <= 0) return;
    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isPaused, remaining, onTimeUp]);

  const mins = Math.floor(remaining / 60);
  const secs = remaining % 60;
  const percentage = (remaining / totalSeconds) * 100;
  const isLow = remaining < 60;

  return (
    <div className={`flex items-center gap-2 font-mono text-lg font-semibold ${isLow ? 'text-destructive animate-pulse' : 'text-foreground'}`}>
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" className="text-muted" />
        <circle
          cx="12" cy="12" r="10"
          strokeDasharray={`${percentage * 0.628} 62.8`}
          strokeLinecap="round"
          className="text-primary transition-all"
          transform="rotate(-90 12 12)"
        />
      </svg>
      <span>{String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}</span>
    </div>
  );
}

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}m ${secs}s`;
}
