import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap, Clock, Trophy, BarChart3 } from "lucide-react";
import Header from "@/components/Header";

const features = [
  { icon: Clock, title: "Timed Quizzes", desc: "Race against the clock with configurable time limits." },
  { icon: BarChart3, title: "Instant Results", desc: "Get detailed scores and analysis right after you finish." },
  { icon: Trophy, title: "Leaderboard", desc: "Compete with others and climb to the top of the ranks." },
];

const Landing = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero */}
      <section className="gradient-hero relative overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/30 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-accent/30 blur-3xl" />
        </div>
        <div className="container relative mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/20 px-4 py-2 text-sm font-medium text-primary-foreground/80">
              <Zap className="h-4 w-4" /> The smartest way to learn
            </div>
            <h1 className="mb-6 font-heading text-5xl font-bold leading-tight tracking-tight text-primary-foreground sm:text-6xl lg:text-7xl">
              Challenge Your
              <br />
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent" style={{ WebkitTextFillColor: 'transparent' }}>
                Knowledge
              </span>
            </h1>
            <p className="mx-auto mb-8 max-w-xl text-lg text-primary-foreground/70">
              Take interactive quizzes, track your progress, and compete on the leaderboard. Learning has never been this fun.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="gradient-accent text-accent-foreground px-8 py-6 text-lg font-semibold shadow-glow"
                onClick={() => navigate(isAuthenticated ? "/dashboard" : "/signup")}
              >
                Start Quiz
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-6 text-lg"
                onClick={() => navigate("/leaderboard")}
              >
                View Leaderboard
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center font-heading text-3xl font-bold text-foreground">Why QuizMaster?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="rounded-xl border border-border bg-card p-8 text-center shadow-card transition-shadow hover:shadow-card-hover"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl gradient-primary text-primary-foreground">
                  <f.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-2 font-heading text-xl font-semibold text-card-foreground">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        © 2026 QuizMaster. Built for learning.
      </footer>
    </div>
  );
};

export default Landing;
