import React from "react";
import Header from "@/components/Header";
import QuizCard from "@/components/QuizCard";
import { quizzes } from "@/data/mockData";
import { motion } from "framer-motion";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="mb-2 font-heading text-3xl font-bold text-foreground">Available Quizzes</h1>
          <p className="mb-8 text-muted-foreground">Pick a quiz and test your knowledge</p>
        </motion.div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {quizzes.map((quiz, i) => (
            <QuizCard key={quiz.id} quiz={quiz} index={i} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
