import React, { useEffect, useState } from "react";

interface TimerProps {
  totalSeconds: number;
  onTimeUp: () => void;
  isRunning: boolean;
}

const Timer = ({ totalSeconds, onTimeUp, isRunning }: TimerProps) => {
  const [seconds, setSeconds] = useState(totalSeconds);

  useEffect(() => {
    if (!isRunning) return;
    if (seconds <= 0) {
      onTimeUp();
      return;
    }
    const interval = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(interval);
  }, [seconds, isRunning, onTimeUp]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const pct = (seconds / totalSeconds) * 100;
  const isLow = seconds < 30;

  return (
    <div className="flex items-center gap-3">
      <div className="h-2 flex-1 rounded-full bg-muted overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${isLow ? "bg-destructive" : "gradient-primary"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className={`font-heading text-lg font-bold tabular-nums ${isLow ? "text-destructive" : "text-foreground"}`}>
        {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
      </span>
    </div>
  );
};

export default Timer;
