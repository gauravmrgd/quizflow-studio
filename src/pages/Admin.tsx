import React, { useState } from "react";
import Header from "@/components/Header";
import { quizzes, leaderboardData } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Trash2, Edit, Users, BookOpen, TrendingUp, Award, X, Sparkles, Shield
} from "lucide-react";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const Admin = () => {
  const [showCreate, setShowCreate] = useState(false);
  const [activeTab, setActiveTab] = useState<"quizzes" | "users" | "analytics">("quizzes");

  const stats = [
    { icon: BookOpen, label: "Total Quizzes", value: quizzes.length, color: "text-primary", bg: "bg-primary/10", gradient: "from-blue-500/20 to-cyan-500/20" },
    { icon: Users, label: "Total Users", value: leaderboardData.length, color: "text-accent", bg: "bg-accent/10", gradient: "from-teal-500/20 to-cyan-500/20" },
    { icon: TrendingUp, label: "Avg Score", value: "82%", color: "text-success", bg: "bg-success/10", gradient: "from-emerald-500/20 to-green-500/20" },
    { icon: Award, label: "Completion Rate", value: "94%", color: "text-warning", bg: "bg-warning/10", gradient: "from-amber-500/20 to-orange-500/20" },
  ];

  const tabs = [
    { key: "quizzes" as const, label: "Quizzes", icon: BookOpen },
    { key: "users" as const, label: "Users", icon: Users },
    { key: "analytics" as const, label: "Analytics", icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen bg-background gradient-mesh">
      <Header />
      <div className="container mx-auto px-4 py-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="mb-2 font-heading text-3xl font-bold text-foreground flex items-center gap-2">
            <Shield className="h-7 w-7 text-primary" /> Admin Dashboard
          </h1>
          <p className="mb-8 text-muted-foreground flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-accent" /> Manage quizzes, users, and view analytics
          </p>
        </motion.div>

        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="rounded-2xl border border-border/50 bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover relative overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-40`} />
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

        {/* Tabs */}
        <div className="mb-6 flex gap-2">
          {tabs.map((tab) => (
            <motion.button
              key={tab.key}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-all ${activeTab === tab.key ? "gradient-primary text-primary-foreground shadow-glow" : "bg-muted text-muted-foreground hover:bg-secondary"
                }`}
            >
              <tab.icon className="h-4 w-4" /> {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Quizzes Tab */}
        {activeTab === "quizzes" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-heading text-xl font-semibold text-foreground">All Quizzes</h2>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button onClick={() => setShowCreate(true)} className="gradient-primary text-primary-foreground rounded-xl shadow-glow">
                  <Plus className="mr-2 h-4 w-4" /> Create Quiz
                </Button>
              </motion.div>
            </div>

            <div className="rounded-2xl border border-border/50 bg-card shadow-card overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50">
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead className="text-center">Questions</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quizzes.map((quiz, i) => (
                    <motion.tr
                      key={quiz.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-border/50 hover:bg-muted/50 transition-colors"
                    >
                      <TableCell className="font-medium text-card-foreground">{quiz.title}</TableCell>
                      <TableCell><span className="rounded-lg bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">{quiz.category}</span></TableCell>
                      <TableCell><span className={`rounded-lg px-2.5 py-1 text-xs font-semibold ${quiz.difficulty === "Easy" ? "bg-success/10 text-success" : quiz.difficulty === "Medium" ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"}`}>{quiz.difficulty}</span></TableCell>
                      <TableCell className="text-center font-medium">{quiz.questionCount}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1.5">
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-primary/10 hover:text-primary"><Edit className="h-4 w-4" /></Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></Button>
                          </motion.div>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>
        )}

        {/* Users Tab */}
        {activeTab === "users" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 className="mb-4 font-heading text-xl font-semibold text-foreground">Users</h2>
            <div className="rounded-2xl border border-border/50 bg-card shadow-card overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50">
                    <TableHead>Name</TableHead>
                    <TableHead className="text-right">Best Score</TableHead>
                    <TableHead className="text-right">Rank</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaderboardData.map((entry, i) => (
                    <motion.tr
                      key={entry.userId}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                      className="border-border/50 hover:bg-muted/50 transition-colors"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full gradient-primary text-xs font-bold text-primary-foreground ring-2 ring-primary/20">{entry.name[0]}</div>
                          <span className="font-medium text-card-foreground">{entry.name}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-heading font-semibold text-card-foreground">{entry.score}%</TableCell>
                      <TableCell className="text-right text-sm text-muted-foreground">#{entry.rank}</TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </div>
          </motion.div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <h2 className="font-heading text-xl font-semibold text-foreground">Analytics Overview</h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Score distribution */}
              <motion.div whileHover={{ y: -3, transition: { duration: 0.2 } }} className="rounded-2xl border border-border/50 bg-card p-6 shadow-card transition-all hover:shadow-card-hover">
                <h3 className="mb-4 font-heading text-lg font-semibold text-card-foreground">Score Distribution</h3>
                <div className="space-y-3">
                  {[
                    { label: "90-100%", pct: 25, color: "bg-success" },
                    { label: "70-89%", pct: 40, color: "gradient-primary" },
                    { label: "50-69%", pct: 25, color: "bg-warning" },
                    { label: "Below 50%", pct: 10, color: "bg-destructive" },
                  ].map((bar) => (
                    <div key={bar.label}>
                      <div className="mb-1 flex justify-between text-sm">
                        <span className="text-muted-foreground">{bar.label}</span>
                        <span className="font-medium text-card-foreground">{bar.pct}%</span>
                      </div>
                      <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${bar.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 }}
                          className={`h-full rounded-full ${bar.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Quiz popularity */}
              <motion.div whileHover={{ y: -3, transition: { duration: 0.2 } }} className="rounded-2xl border border-border/50 bg-card p-6 shadow-card transition-all hover:shadow-card-hover">
                <h3 className="mb-4 font-heading text-lg font-semibold text-card-foreground">Quiz Popularity</h3>
                <div className="space-y-4">
                  {quizzes.map((quiz, i) => (
                    <motion.div
                      key={quiz.id}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3 group"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary group-hover:gradient-primary group-hover:text-primary-foreground transition-all">#{i + 1}</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-card-foreground">{quiz.title}</p>
                        <p className="text-xs text-muted-foreground">{Math.floor(Math.random() * 500 + 100)} attempts</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Create Quiz Modal */}
        <AnimatePresence>
          {showCreate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-xl-custom"
              >
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="font-heading text-xl font-bold text-card-foreground flex items-center gap-2">
                    <Plus className="h-5 w-5 text-primary" /> Create New Quiz
                  </h3>
                  <motion.button whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }} onClick={() => setShowCreate(false)} className="text-muted-foreground hover:text-foreground">
                    <X className="h-5 w-5" />
                  </motion.button>
                </div>
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setShowCreate(false); }}>
                  <div>
                    <Label>Quiz Title</Label>
                    <Input placeholder="Enter quiz title" className="mt-1 rounded-xl bg-muted/50 border-border/50 focus:bg-card transition-colors" />
                  </div>
                  <div>
                    <Label>Description</Label>
                    <Input placeholder="Brief description" className="mt-1 rounded-xl bg-muted/50 border-border/50 focus:bg-card transition-colors" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Category</Label>
                      <Input placeholder="e.g. Science" className="mt-1 rounded-xl bg-muted/50 border-border/50 focus:bg-card transition-colors" />
                    </div>
                    <div>
                      <Label>Time Limit (min)</Label>
                      <Input type="number" placeholder="5" className="mt-1 rounded-xl bg-muted/50 border-border/50 focus:bg-card transition-colors" />
                    </div>
                  </div>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button type="submit" className="w-full gradient-primary text-primary-foreground rounded-xl py-6 shadow-glow">Create Quiz</Button>
                  </motion.div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Admin;
