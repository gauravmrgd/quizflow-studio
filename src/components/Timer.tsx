import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface TimerProps {
  totalSeconds: number;
  onTimeUp: () => void;
  isRunning: boolean;
}

const Timer = ({ totalSeconds, onTimeUp, isRunning }: TimerProps) => {
  const [seconds, setSeconds] = useState(totalSeconds);

  useEffect(() => {
    if (!isRunning) return;
    if (seconds <= 0) { onTimeUp(); return; }
    const interval = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(interval);
  }, [seconds, isRunning, onTimeUp]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const pct = seconds / totalSeconds;
  const isLow = seconds < 30;
  const isCritical = seconds < 10;

  // Circular progress
  const size = 80;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - pct);

  return (
    <motion.div
      className="flex items-center gap-4"
      animate={isCritical ? { scale: [1, 1.06, 1] } : {}}
      transition={isCritical ? { duration: 0.8, repeat: Infinity, ease: "easeInOut" } : {}}
    >
      <div className="relative flex h-20 w-20 items-center justify-center">
        <svg width={size} height={size} className="circular-progress">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={isLow ? "hsl(var(--destructive))" : "url(#timerGradient)"}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(var(--primary))" />
              <stop offset="100%" stopColor="hsl(var(--accent))" />
            </linearGradient>
          </defs>
        </svg>
        {/* Glow ring when low */}
        {isLow && (
          <div className="absolute inset-0 rounded-full animate-pulse-glow" style={{
            boxShadow: '0 0 20px hsl(var(--destructive) / 0.3)',
          }} />
        )}
        <span className={`absolute font-heading text-lg font-bold tabular-nums transition-colors duration-300 ${isLow ? "text-destructive" : "text-foreground"}`}>
          {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
        </span>
      </div>
    </motion.div>
  );
};

export default Timer;
