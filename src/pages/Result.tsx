import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Trophy, RefreshCw, BarChart3, CheckCircle, XCircle } from "lucide-react";
import Header from "@/components/Header";

const Result = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { score = 0, total = 0, correct = 0, wrong = 0, timeTaken = 0, quizId = "" } = state || {};

  const mins = Math.floor(timeTaken / 60);
  const secs = timeTaken % 60;
  const isGreat = score >= 80;
  const isOk = score >= 50 && score < 80;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto flex max-w-lg flex-col items-center px-4 py-16">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className={`mb-6 flex h-28 w-28 items-center justify-center rounded-full ${
            isGreat ? "bg-success/10" : isOk ? "bg-warning/10" : "bg-destructive/10"
          }`}
        >
          <Trophy className={`h-14 w-14 ${isGreat ? "text-success" : isOk ? "text-warning" : "text-destructive"}`} />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center">
          <h1 className="mb-2 font-heading text-4xl font-bold text-foreground">{score}%</h1>
          <p className="mb-8 text-lg text-muted-foreground">
            {isGreat ? "Excellent work! 🎉" : isOk ? "Good effort! Keep going." : "Don't give up! Try again."}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8 grid w-full grid-cols-3 gap-4"
        >
          <div className="rounded-xl border border-border bg-card p-4 text-center shadow-card">
            <CheckCircle className="mx-auto mb-2 h-6 w-6 text-success" />
            <p className="font-heading text-2xl font-bold text-card-foreground">{correct}</p>
            <p className="text-xs text-muted-foreground">Correct</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-center shadow-card">
            <XCircle className="mx-auto mb-2 h-6 w-6 text-destructive" />
            <p className="font-heading text-2xl font-bold text-card-foreground">{wrong}</p>
            <p className="text-xs text-muted-foreground">Wrong</p>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 text-center shadow-card">
            <BarChart3 className="mx-auto mb-2 h-6 w-6 text-primary" />
            <p className="font-heading text-2xl font-bold text-card-foreground">{mins}:{String(secs).padStart(2, "0")}</p>
            <p className="text-xs text-muted-foreground">Time</p>
          </div>
        </motion.div>

        <div className="flex w-full gap-3">
          <Button variant="outline" className="flex-1" onClick={() => navigate(`/quiz/${quizId}`)}>
            <RefreshCw className="mr-2 h-4 w-4" /> Retry
          </Button>
          <Button className="flex-1 gradient-primary text-primary-foreground" onClick={() => navigate("/leaderboard")}>
            <Trophy className="mr-2 h-4 w-4" /> Leaderboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Result;
