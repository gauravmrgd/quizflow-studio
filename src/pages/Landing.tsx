import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap, Clock, Trophy, BarChart3, Shield, Users, Star, ArrowRight, ChevronRight } from "lucide-react";
import Header from "@/components/Header";

const features = [
  { icon: Clock, title: "Timed Quizzes", desc: "Race against the clock with configurable time limits for each quiz." },
  { icon: BarChart3, title: "Instant Results", desc: "Get detailed analytics and performance breakdown right after you finish." },
  { icon: Trophy, title: "Leaderboard", desc: "Compete with others and climb to the top of the global rankings." },
  { icon: Shield, title: "Anti-Cheat", desc: "Tab-switch detection and auto-submit ensure fair play for everyone." },
  { icon: Users, title: "Live Quizzes", desc: "Join real-time quiz sessions and compete head-to-head with others." },
  { icon: Zap, title: "Smart Learning", desc: "AI-powered question randomization adapts to your knowledge gaps." },
];

const testimonials = [
  { name: "Alex Chen", role: "Computer Science Student", text: "QuizMaster transformed how I study. The timed quizzes and instant feedback keep me engaged.", avatar: "AC", rating: 5 },
  { name: "Sarah Kim", role: "Medical Student", text: "The leaderboard feature motivates me to study harder. I've improved my scores by 40%!", avatar: "SK", rating: 5 },
  { name: "Jordan Lee", role: "Self-Learner", text: "Clean interface, great question variety. The best quiz platform I've used.", avatar: "JL", rating: 5 },
];

const stats = [
  { value: "50K+", label: "Active Learners" },
  { value: "10K+", label: "Quizzes Taken" },
  { value: "98%", label: "Satisfaction" },
  { value: "4.9★", label: "App Rating" },
];

const Landing = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="gradient-hero relative overflow-hidden py-28 sm:py-36 lg:py-44">
        {/* Animated floating orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl animate-float" />
          <div className="absolute top-1/2 -left-32 h-96 w-96 rounded-full bg-accent/15 blur-3xl animate-float-delayed" />
          <div className="absolute -bottom-20 right-1/3 h-64 w-64 rounded-full bg-primary/10 blur-3xl animate-float-slow" />
          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(hsl(0_0%_100%/0.03)_1px,transparent_1px),linear-gradient(90deg,hsl(0_0%_100%/0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="container relative mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full glass px-5 py-2.5 text-sm font-medium text-primary-foreground/80">
              <Zap className="h-4 w-4 text-accent" /> The smartest way to learn
              <ChevronRight className="h-3 w-3" />
            </div>
            <h1 className="mb-6 font-heading text-5xl font-bold leading-[1.1] tracking-tight text-primary-foreground sm:text-6xl lg:text-7xl xl:text-8xl">
              Challenge Your
              <br />
              <span className="bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent animate-gradient" style={{ WebkitTextFillColor: 'transparent', backgroundSize: '200% 200%' }}>
                Knowledge
              </span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-primary-foreground/60 sm:text-xl">
              Take interactive quizzes, track your progress in real-time, and compete on the global leaderboard. Learning has never been this engaging.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button
                size="lg"
                className="gradient-accent text-accent-foreground px-10 py-7 text-lg font-semibold shadow-glow rounded-2xl hover:scale-105 transition-transform"
                onClick={() => navigate(isAuthenticated ? "/dashboard" : "/signup")}
              >
                Start Learning <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 px-10 py-7 text-lg rounded-2xl"
                onClick={() => navigate("/leaderboard")}
              >
                View Leaderboard
              </Button>
            </div>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-20 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-8"
          >
            {stats.map((s) => (
              <div key={s.label} className="glass rounded-2xl px-6 py-5 text-center">
                <p className="font-heading text-2xl font-bold text-primary-foreground sm:text-3xl">{s.value}</p>
                <p className="text-sm text-primary-foreground/50">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">Features</span>
            <h2 className="mb-4 font-heading text-3xl font-bold text-foreground sm:text-4xl">Why QuizMaster?</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">Everything you need to master any subject with an engaging, gamified learning experience.</p>
          </motion.div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group rounded-2xl border border-border bg-card p-8 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl gradient-primary text-primary-foreground transition-transform group-hover:scale-110">
                  <f.icon className="h-7 w-7" />
                </div>
                <h3 className="mb-2 font-heading text-xl font-semibold text-card-foreground">{f.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-border bg-muted/30 py-24">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">Testimonials</span>
            <h2 className="mb-4 font-heading text-3xl font-bold text-foreground sm:text-4xl">Loved by learners</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">Join thousands of students who've transformed their learning with QuizMaster.</p>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-border bg-card p-8 shadow-card"
              >
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary text-xs font-bold text-primary-foreground">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-card-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="gradient-hero rounded-3xl p-12 text-center sm:p-16"
          >
            <h2 className="mb-4 font-heading text-3xl font-bold text-primary-foreground sm:text-4xl">Ready to start learning?</h2>
            <p className="mx-auto mb-8 max-w-xl text-primary-foreground/60">Join thousands of learners and start your journey today. It's free to get started.</p>
            <Button
              size="lg"
              className="gradient-accent text-accent-foreground px-10 py-7 text-lg font-semibold rounded-2xl hover:scale-105 transition-transform"
              onClick={() => navigate(isAuthenticated ? "/dashboard" : "/signup")}
            >
              Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto flex flex-col items-center gap-4 px-4 sm:flex-row sm:justify-between">
          <div className="flex items-center gap-2 font-heading text-lg font-bold text-foreground">
            <Zap className="h-5 w-5 text-primary" /> QuizMaster
          </div>
          <p className="text-sm text-muted-foreground">© 2026 QuizMaster. Built for learning.</p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <span className="cursor-pointer hover:text-foreground transition-colors">Privacy</span>
            <span className="cursor-pointer hover:text-foreground transition-colors">Terms</span>
            <span className="cursor-pointer hover:text-foreground transition-colors">Contact</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
