import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Trophy, RefreshCw, BarChart3, CheckCircle, XCircle, Share2, Clock, Sparkles, PartyPopper } from "lucide-react";
import Header from "@/components/Header";
import confetti from "canvas-confetti";

const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { score = 0, total = 0, correct = 0, wrong = 0, timeTaken = 0, quizId = "" } = state || {};
  const confettiFired = useRef(false);

  const mins = Math.floor(timeTaken / 60);
  const secs = timeTaken % 60;
  const isGreat = score >= 80;
  const isGood = score >= 50;

  // Confetti on great scores
  useEffect(() => {
    if (isGreat && !confettiFired.current) {
      confettiFired.current = true;
      const fire = () => {
        confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: ['#6366f1', '#06b6d4', '#f59e0b', '#10b981'] });
        setTimeout(() => confetti({ particleCount: 60, spread: 110, origin: { y: 0.7 }, colors: ['#6366f1', '#06b6d4', '#f59e0b'] }), 400);
        setTimeout(() => confetti({ particleCount: 40, spread: 130, origin: { y: 0.5 }, colors: ['#ec4899', '#8b5cf6'] }), 700);
      };
      fire();
    }
  }, [isGreat]);

  // Percentage circle
  const size = 180;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - score / 100);

  const handleShare = async () => {
    const text = `I scored ${score}% on QuizMaster! 🎉 ${correct}/${total} correct.`;
    if (navigator.share) {
      try { await navigator.share({ title: "QuizMaster Result", text }); } catch { }
    } else {
      await navigator.clipboard.writeText(text);
    }
  };

  const statCards = [
    { icon: CheckCircle, label: "Correct", value: correct, iconColor: "text-success", bg: "bg-success/10", gradient: "from-emerald-500/20 to-teal-500/20" },
    { icon: XCircle, label: "Wrong", value: wrong, iconColor: "text-destructive", bg: "bg-destructive/10", gradient: "from-red-500/20 to-rose-500/20" },
    { icon: BarChart3, label: "Total", value: total, iconColor: "text-primary", bg: "bg-primary/10", gradient: "from-blue-500/20 to-cyan-500/20" },
    { icon: Clock, label: "Time", value: `${mins}:${String(secs).padStart(2, "0")}`, iconColor: "text-warning", bg: "bg-warning/10", gradient: "from-amber-500/20 to-orange-500/20" },
  ];

  return (
    <div className="min-h-screen bg-background gradient-mesh">
      <Header />
      <div className="container mx-auto flex max-w-lg flex-col items-center px-4 py-16">
        {/* Score circle */}
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.2 }}
          className="relative mb-8"
        >
          {/* Outer glow ring */}
          {isGreat && (
            <div
              className="absolute inset-0 rounded-full animate-pulse-glow"
              style={{
                margin: '-8px',
                boxShadow: '0 0 40px hsl(var(--success) / 0.25)',
                borderRadius: '50%',
              }}
            />
          )}
          <svg width={size} height={size} className="circular-progress">
            <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth={strokeWidth} />
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={isGreat ? "url(#scoreGradientSuccess)" : isGood ? "url(#scoreGradient)" : "hsl(var(--destructive))"}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: dashOffset }}
              transition={{ duration: 1.8, delay: 0.5, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--accent))" />
              </linearGradient>
              <linearGradient id="scoreGradientSuccess" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--success))" />
                <stop offset="100%" stopColor="hsl(var(--accent))" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, type: "spring" }}
              className="font-heading text-5xl font-bold text-foreground"
            >
              {score}%
            </motion.span>
            <span className="text-xs text-muted-foreground font-medium">Score</span>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="mb-8 text-center">
          <h1 className="mb-2 font-heading text-3xl font-bold text-foreground flex items-center justify-center gap-2">
            {isGreat ? (
              <><PartyPopper className="h-7 w-7 text-warning" /> Excellent!</>
            ) : isGood ? (
              <>Good Effort! 💪</>
            ) : (
              <>Keep Trying! 📚</>
            )}
          </h1>
          <p className="text-muted-foreground">
            {isGreat ? "Outstanding performance! You nailed it." : isGood ? "You're getting there. Keep practicing!" : "Don't give up! Practice makes perfect."}
          </p>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-8 grid w-full grid-cols-2 gap-4"
        >
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="rounded-2xl border border-border/50 bg-card p-5 text-center shadow-card transition-all hover:shadow-card-hover relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-40`} />
              <div className="relative">
                <div className={`mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg}`}>
                  <stat.icon className={`h-5 w-5 ${stat.iconColor}`} />
                </div>
                <p className="font-heading text-2xl font-bold text-card-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="flex w-full gap-3"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
            <Button variant="outline" className="w-full rounded-xl py-6" onClick={() => navigate(`/quiz/${quizId}`)}>
              <RefreshCw className="mr-2 h-4 w-4" /> Retry
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button variant="outline" className="rounded-xl py-6" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="flex-1">
            <Button className="w-full gradient-primary text-primary-foreground rounded-xl py-6 shadow-glow" onClick={() => navigate("/leaderboard")}>
              <Trophy className="mr-2 h-4 w-4" /> Leaderboard
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Result;
