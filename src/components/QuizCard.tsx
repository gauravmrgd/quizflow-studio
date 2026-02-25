import React from "react";
import { useNavigate } from "react-router-dom";
import { Quiz } from "@/types/quiz";
import { Clock, HelpCircle, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface QuizCardProps {
  quiz: Quiz;
  index: number;
}

const difficultyColor: Record<string, string> = {
  Easy: "bg-success/10 text-success",
  Medium: "bg-warning/10 text-warning",
  Hard: "bg-destructive/10 text-destructive",
};

const QuizCard = ({ quiz, index }: QuizCardProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
          {quiz.category}
        </span>
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${difficultyColor[quiz.difficulty]}`}>
          {quiz.difficulty}
        </span>
      </div>
      <h3 className="mb-2 font-heading text-lg font-semibold text-card-foreground">{quiz.title}</h3>
      <p className="mb-4 text-sm text-muted-foreground line-clamp-2">{quiz.description}</p>
      <div className="mb-4 flex items-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-1">
          <HelpCircle className="h-4 w-4" /> {quiz.questionCount} Qs
        </span>
        <span className="flex items-center gap-1">
          <Clock className="h-4 w-4" /> {Math.floor(quiz.timeLimit / 60)} min
        </span>
        <span className="flex items-center gap-1">
          <BarChart3 className="h-4 w-4" /> {quiz.difficulty}
        </span>
      </div>
      <Button
        className="w-full gradient-primary text-primary-foreground"
        onClick={() => navigate(`/quiz/${quiz.id}`)}
      >
        Start Quiz
      </Button>
    </motion.div>
  );
};

export default QuizCard;
