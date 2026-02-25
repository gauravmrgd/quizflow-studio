import React from "react";
import { useNavigate } from "react-router-dom";
import { Quiz } from "@/types/quiz";
import { Clock, HelpCircle, ArrowRight } from "lucide-react";
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
      transition={{ delay: index * 0.08 }}
      whileHover={{ y: -4 }}
      className="group rounded-2xl border border-border bg-card p-6 shadow-card transition-shadow duration-300 hover:shadow-card-hover"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-xl bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
          {quiz.category}
        </span>
        <span className={`rounded-xl px-3 py-1.5 text-xs font-medium ${difficultyColor[quiz.difficulty]}`}>
          {quiz.difficulty}
        </span>
      </div>
      <h3 className="mb-2 font-heading text-lg font-semibold text-card-foreground">{quiz.title}</h3>
      <p className="mb-5 text-sm text-muted-foreground line-clamp-2 leading-relaxed">{quiz.description}</p>
      <div className="mb-5 flex items-center gap-5 text-sm text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <HelpCircle className="h-4 w-4" /> {quiz.questionCount} Questions
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" /> {Math.floor(quiz.timeLimit / 60)} min
        </span>
      </div>
      <Button
        className="w-full gradient-primary text-primary-foreground rounded-xl group-hover:shadow-glow transition-shadow"
        onClick={() => navigate(`/quiz/${quiz.id}`)}
      >
        Start Quiz <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </motion.div>
  );
};

export default QuizCard;
