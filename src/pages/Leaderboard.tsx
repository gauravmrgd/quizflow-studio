import React from "react";
import Header from "@/components/Header";
import { leaderboardData } from "@/data/mockData";
import { useAuth } from "@/context/AuthContext";
import { Trophy, Medal } from "lucide-react";
import { motion } from "framer-motion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const rankIcon = (rank: number) => {
  if (rank === 1) return <Trophy className="h-5 w-5 text-warning" />;
  if (rank === 2) return <Medal className="h-5 w-5 text-muted-foreground" />;
  if (rank === 3) return <Medal className="h-5 w-5 text-warning/60" />;
  return <span className="text-sm text-muted-foreground">{rank}</span>;
};

const Leaderboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto max-w-3xl px-4 py-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="mb-2 font-heading text-3xl font-bold text-foreground">Leaderboard</h1>
          <p className="mb-8 text-muted-foreground">Top quiz performers across all categories</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-border bg-card shadow-card overflow-hidden"
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
              {leaderboardData.map((entry, i) => {
                const isCurrentUser = user && entry.name === user.name;
                const mins = Math.floor(entry.timeTaken / 60);
                const secs = entry.timeTaken % 60;
                return (
                  <TableRow
                    key={entry.userId}
                    className={`border-border transition-colors ${isCurrentUser ? "bg-primary/5" : ""}`}
                  >
                    <TableCell className="text-center">{rankIcon(entry.rank)}</TableCell>
                    <TableCell className="font-medium text-card-foreground">
                      {entry.name}
                      {isCurrentUser && (
                        <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">You</span>
                      )}
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
      </div>
    </div>
  );
};

export default Leaderboard;
