import React, { useState } from "react";
import Header from "@/components/Header";
import { leaderboardData } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import { Trophy, Medal, Award, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const ITEMS_PER_PAGE = 5;

const rankBadge = (rank: number) => {
  if (rank === 1) return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-warning/10">
      <Trophy className="h-5 w-5 text-warning" />
    </div>
  );
  if (rank === 2) return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
      <Medal className="h-5 w-5 text-muted-foreground" />
    </div>
  );
  if (rank === 3) return (
    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-warning/5">
      <Award className="h-5 w-5 text-warning/70" />
    </div>
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
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto max-w-3xl px-4 py-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="mb-2 font-heading text-3xl font-bold text-foreground">Leaderboard</h1>
          <p className="mb-8 text-muted-foreground">Top quiz performers across all categories</p>
        </motion.div>

        {/* Top 3 podium */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8 grid grid-cols-3 gap-3">
          {leaderboardData.slice(0, 3).map((entry, i) => {
            const order = [1, 0, 2]; // 2nd, 1st, 3rd
            const e = leaderboardData[order[i]];
            const isFirst = order[i] === 0;
            return (
              <div key={e.userId} className={`flex flex-col items-center rounded-2xl border border-border bg-card p-5 shadow-card ${isFirst ? "-mt-4 gradient-primary text-primary-foreground" : ""}`}>
                <div className={`mb-2 flex h-12 w-12 items-center justify-center rounded-full ${isFirst ? "bg-primary-foreground/20" : "bg-muted"} text-lg font-bold ${isFirst ? "" : "text-muted-foreground"}`}>
                  {e.name[0]}
                </div>
                <p className={`text-sm font-semibold ${isFirst ? "" : "text-card-foreground"}`}>{e.name.split(" ")[0]}</p>
                <p className={`font-heading text-2xl font-bold ${isFirst ? "" : "text-card-foreground"}`}>{e.score}%</p>
                <p className={`text-xs ${isFirst ? "text-primary-foreground/60" : "text-muted-foreground"}`}>#{e.rank}</p>
              </div>
            );
          })}
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl border border-border bg-card shadow-card overflow-hidden"
        >
          <Table>
            <TableHeader>
              <TableRow className="border-border">
                <TableHead className="w-16 text-center">Rank</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Score</TableHead>
                <TableHead className="text-right">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginated.map((entry) => {
                const isCurrentUser = user && entry.name === user.name;
                const mins = Math.floor(entry.timeTaken / 60);
                const secs = entry.timeTaken % 60;
                return (
                  <TableRow
                    key={entry.userId}
                    className={`border-border transition-colors ${isCurrentUser ? "bg-primary/5" : ""}`}
                  >
                    <TableCell className="text-center">{rankBadge(entry.rank)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full gradient-primary text-xs font-bold text-primary-foreground">
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
                    <TableCell className="text-right text-sm text-muted-foreground">
                      {mins}:{String(secs).padStart(2, "0")}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </motion.div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-3">
            <Button variant="outline" size="sm" className="rounded-xl" disabled={page === 0} onClick={() => setPage(page - 1)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {page + 1} of {totalPages}
            </span>
            <Button variant="outline" size="sm" className="rounded-xl" disabled={page >= totalPages - 1} onClick={() => setPage(page + 1)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
