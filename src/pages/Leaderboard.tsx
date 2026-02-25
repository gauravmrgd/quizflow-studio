import React, { useState } from "react";
import Header from "@/components/Header";
import { leaderboardData } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import { Trophy, Medal, Award, ChevronLeft, ChevronRight, Sparkles, Crown } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const ITEMS_PER_PAGE = 5;

const rankBadge = (rank: number) => {
  if (rank === 1) return (
    <motion.div whileHover={{ rotate: 12, scale: 1.1 }} className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-yellow-500 shadow-md">
      <Crown className="h-5 w-5 text-white" />
    </motion.div>
  );
  if (rank === 2) return (
    <motion.div whileHover={{ scale: 1.1 }} className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-gray-300 to-gray-400">
      <Medal className="h-5 w-5 text-white" />
    </motion.div>
  );
  if (rank === 3) return (
    <motion.div whileHover={{ scale: 1.1 }} className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-600 to-amber-700">
      <Award className="h-5 w-5 text-white" />
    </motion.div>
  );
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
      <span className="text-sm font-bold text-muted-foreground">{rank}</span>
    </div>
  );
};

const Leaderboard = () => {
  const { user } = useAuth();
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(leaderboardData.length / ITEMS_PER_PAGE);
  const paginated = leaderboardData.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-background gradient-mesh">
      <Header />
      <div className="container mx-auto max-w-3xl px-4 py-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="mb-2 font-heading text-3xl font-bold text-foreground flex items-center gap-2">
            <Trophy className="h-7 w-7 text-warning" /> Leaderboard
          </h1>
          <p className="mb-8 text-muted-foreground flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-accent" /> Top quiz performers across all categories
          </p>
        </motion.div>

        {/* Top 3 podium */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8 grid grid-cols-3 gap-3">
          {leaderboardData.slice(0, 3).map((entry, i) => {
            const order = [1, 0, 2]; // 2nd, 1st, 3rd
            const e = leaderboardData[order[i]];
            const isFirst = order[i] === 0;
            return (
              <motion.div
                key={e.userId}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.12 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`flex flex-col items-center rounded-2xl border p-5 shadow-card transition-all duration-300 hover:shadow-card-hover relative overflow-hidden ${isFirst
                    ? "-mt-4 gradient-primary text-primary-foreground border-transparent"
                    : "border-border bg-card"
                  }`}
              >
                {/* Crown for first place */}
                {isFirst && (
                  <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, type: "spring" }}>
                    <Crown className="absolute top-2 right-2 h-5 w-5 text-warning animate-pulse" />
                  </motion.div>
                )}
                <div className={`mb-2 flex h-14 w-14 items-center justify-center rounded-full ${isFirst ? "bg-primary-foreground/20 ring-2 ring-primary-foreground/30" : "bg-muted"} text-lg font-bold ${isFirst ? "" : "text-muted-foreground"}`}>
                  {e.name[0]}
                </div>
                <p className={`text-sm font-semibold ${isFirst ? "" : "text-card-foreground"}`}>{e.name.split(" ")[0]}</p>
                <p className={`font-heading text-2xl font-bold ${isFirst ? "" : "text-card-foreground"}`}>{e.score}%</p>
                <p className={`text-xs ${isFirst ? "text-primary-foreground/60" : "text-muted-foreground"}`}>#{e.rank}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="rounded-2xl border border-border/50 bg-card shadow-card overflow-hidden"
        >
          <Table>
            <TableHeader>
              <TableRow className="border-border/50">
                <TableHead className="w-16 text-center">Rank</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Score</TableHead>
                <TableHead className="text-right">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((entry, i) => {
                const isCurrentUser = user && entry.name === user.name;
                const mins = Math.floor(entry.timeTaken / 60);
                const secs = entry.timeTaken % 60;
                return (
                  <motion.tr
                    key={entry.userId}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                    className={`border-border/50 transition-colors hover:bg-muted/50 ${isCurrentUser ? "bg-primary/5" : ""}`}
                  >
                    <TableCell className="text-center">{rankBadge(entry.rank)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full gradient-primary text-xs font-bold text-primary-foreground ring-2 ring-primary/20">
                          {entry.name[0]}
                        </div>
                        <div>
                          <span className="font-medium text-card-foreground">{entry.name}</span>
                          {isCurrentUser && (
                            <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">You</span>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-heading font-semibold text-card-foreground">{entry.score}%</TableCell>
                    <TableCell className="text-right text-sm text-muted-foreground tabular-nums">
                      {mins}:{String(secs).padStart(2, "0")}
                    </TableCell>
                  </motion.tr>
                );
              })}
            </TableBody>
          </Table>
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-6 flex items-center justify-center gap-3">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="sm" className="rounded-xl" disabled={page === 0} onClick={() => setPage(page - 1)}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
            </motion.div>
            <span className="text-sm text-muted-foreground font-medium">
              Page {page + 1} of {totalPages}
            </span>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="outline" size="sm" className="rounded-xl" disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
