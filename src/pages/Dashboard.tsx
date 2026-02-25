import React, { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { quizzes } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import QuizCard from "@/components/QuizCard";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap, LayoutDashboard, Trophy, Settings, LogOut, Moon, Sun,
  Search, BookOpen, Target, TrendingUp, Menu, X, Sparkles
} from "lucide-react";

const categories = ["All", ...Array.from(new Set(quizzes.map((q) => q.category)))];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { isDark, toggle } = useTheme();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = useMemo(() => {
    return quizzes.filter((q) => {
      const matchCat = category === "All" || q.category === category;
      const matchSearch = q.title.toLowerCase().includes(search.toLowerCase()) || q.description.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [search, category]);

  const handleLogout = () => { logout(); navigate("/"); };

  const sidebarLinks = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: Trophy, label: "Leaderboard", onClick: () => navigate("/leaderboard") },
    { icon: Settings, label: "Settings" },
  ];

  const statCards = [
    { icon: BookOpen, label: "Total Quizzes", value: quizzes.length, color: "text-primary", bg: "bg-primary/10", gradient: "from-blue-500/20 to-cyan-500/20" },
    { icon: Target, label: "Best Score", value: "95%", color: "text-success", bg: "bg-success/10", gradient: "from-emerald-500/20 to-teal-500/20" },
    { icon: TrendingUp, label: "Your Rank", value: "#3", color: "text-warning", bg: "bg-warning/10", gradient: "from-amber-500/20 to-orange-500/20" },
  ];

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-border/50 bg-card/95 backdrop-blur-xl transition-transform duration-300 lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between border-b border-border/50 px-5">
            <Link to="/" className="flex items-center gap-2.5 font-heading text-xl font-bold text-foreground">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary shadow-glow">
                <Zap className="h-4 w-4 text-primary-foreground" />
              </div>
              Quiz<span className="text-gradient">Master</span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-muted-foreground hover:text-foreground transition-colors"><X className="h-5 w-5" /></button>
          </div>

          <nav className="flex-1 space-y-1 p-4">
            {sidebarLinks.map((link) => (
              <motion.button
                key={link.label}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                onClick={link.onClick}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${link.active ? "gradient-primary text-primary-foreground shadow-glow" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
              >
                <link.icon className="h-5 w-5" /> {link.label}
              </motion.button>
            ))}
          </nav>

          <div className="border-t border-border/50 p-4 space-y-2">
            <Button variant="ghost" onClick={toggle} className="w-full justify-start gap-3 rounded-xl">
              {isDark ? <Sun className="h-5 w-5 text-warning" /> : <Moon className="h-5 w-5" />}
              {isDark ? "Light Mode" : "Dark Mode"}
            </Button>
            <Button variant="ghost" onClick={handleLogout} className="w-full justify-start gap-3 rounded-xl text-destructive hover:text-destructive hover:bg-destructive/10">
              <LogOut className="h-5 w-5" /> Logout
            </Button>
          </div>

          {/* User info */}
          <div className="border-t border-border/50 p-4">
            <div className="flex items-center gap-3 rounded-xl bg-muted/50 p-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-primary text-sm font-bold text-primary-foreground ring-2 ring-primary/20">
                {user?.name?.[0]?.toUpperCase() || "U"}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">{user?.name || "User"}</p>
                <p className="truncate text-xs text-muted-foreground">{user?.email || ""}</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {/* Top bar */}
        <div className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/50 bg-background/80 backdrop-blur-xl px-6">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-muted-foreground hover:text-foreground"><Menu className="h-5 w-5" /></button>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search quizzes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 rounded-xl bg-muted/50 border-border/50 focus:bg-card transition-colors"
            />
          </div>
        </div>

        <div className="p-6 sm:p-8">
          {/* Welcome */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="mb-1 font-heading text-3xl font-bold text-foreground">
              Welcome back, {user?.name || "User"} <motion.span initial={{ rotate: 0 }} animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }} transition={{ duration: 2, delay: 0.5 }}>👋</motion.span>
            </h1>
            <p className="text-muted-foreground flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-accent" /> Pick a quiz and test your knowledge
            </p>
          </motion.div>

          {/* Stats */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            {statCards.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                className={`rounded-2xl border border-border/50 bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover relative overflow-hidden`}
              >
                {/* Gradient background accent */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-50`} />
                <div className="relative flex items-center gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.bg} ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="font-heading text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Category filters */}
          <div className="mb-6 flex flex-wrap gap-2">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCategory(cat)}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition-all ${category === cat
                    ? "gradient-primary text-primary-foreground shadow-glow"
                    : "bg-muted text-muted-foreground hover:bg-secondary"
                  }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>

          {/* Quiz grid */}
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((quiz, i) => (
                <QuizCard key={quiz.id} quiz={quiz} index={i} />
              ))}
            </AnimatePresence>
          </div>
          {filtered.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center"
            >
              <Search className="mx-auto mb-4 h-12 w-12 text-muted-foreground/30" />
              <p className="text-muted-foreground text-lg">No quizzes found matching your search.</p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
