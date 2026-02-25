import React from "react";
import { useNavigate } from "react-router-dom";
import { Quiz } from "@/types/quiz";
import { Clock, HelpCircle, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface QuizCardProps {
  quiz: Quiz;
  index: number;
}

const difficultyConfig: Record<string, { bg: string; text: string; glow: string }> = {
  Easy: { bg: "bg-success/10", text: "text-success", glow: "group-hover:shadow-[0_0_20px_hsl(152_60%_42%/0.15)]" },
  Medium: { bg: "bg-warning/10", text: "text-warning", glow: "group-hover:shadow-[0_0_20px_hsl(38_92%_55%/0.15)]" },
  Hard: { bg: "bg-destructive/10", text: "text-destructive", glow: "group-hover:shadow-[0_0_20px_hsl(0_72%_55%/0.15)]" },
};

const QuizCard = ({ quiz, index }: QuizCardProps) => {
  const navigate = useNavigate();
  const difficulty = difficultyConfig[quiz.difficulty] || difficultyConfig.Medium;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className={`group relative rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:shadow-card-hover overflow-hidden ${difficulty.glow}`}
    >
      {/* Subtle mesh gradient overlay on hover */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 gradient-mesh rounded-2xl" />

      {/* Content */}
      <div className="relative">
        <div className="mb-4 flex items-center justify-between">
          <span className="flex items-center gap-1.5 rounded-xl bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
            <Sparkles className="h-3 w-3" />
            {quiz.category}
          </span>
          <span className={`rounded-xl px-3 py-1.5 text-xs font-semibold ${difficulty.bg} ${difficulty.text}`}>
            {quiz.difficulty}
          </span>
        </div>
        <h3 className="mb-2 font-heading text-lg font-semibold text-card-foreground group-hover:text-gradient transition-colors duration-300">
          {quiz.title}
        </h3>
        <p className="mb-5 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {quiz.description}
        </p>
        <div className="mb-5 flex items-center gap-5 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <HelpCircle className="h-4 w-4" /> {quiz.questionCount} Questions
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" /> {Math.floor(quiz.timeLimit / 60)} min
          </span>
        </div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Button
            className="w-full gradient-primary text-primary-foreground rounded-xl group-hover:shadow-glow transition-all duration-300"
            onClick={() => navigate(`/quiz/${quiz.id}`)}
          >
            Start Quiz <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default QuizCard;
