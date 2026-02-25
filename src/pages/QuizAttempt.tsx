import React, { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuiz } from "@/context/QuizContext";
import { questionsByQuiz, quizzes } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import Timer from "@/components/Timer";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";

const QuizAttempt = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { startQuiz, answerQuestion, getAnswer, submitQuiz } = useQuiz();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);

  const quiz = quizzes.find((q) => q.id === id);
  const questions = id ? questionsByQuiz[id] || [] : [];

  useEffect(() => {
    if (id && !started) {
      startQuiz(id);
      setStarted(true);
    }
  }, [id, started, startQuiz]);

  const handleSubmit = useCallback(() => {
    const result = submitQuiz();
    navigate("/result", { state: { ...result, quizId: id } });
  }, [submitQuiz, navigate, id]);

  if (!quiz || questions.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Quiz not found.</p>
      </div>
    );
  }

  const question = questions[currentIndex];
  const selectedAnswer = getAnswer(question.id);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto max-w-3xl px-4 py-8">
        {/* Header */}
        <div className="mb-6 rounded-xl border border-border bg-card p-4 shadow-card">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-heading text-lg font-semibold text-card-foreground">{quiz.title}</h2>
            <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              {currentIndex + 1} / {questions.length}
            </span>
          </div>
          <Timer totalSeconds={quiz.timeLimit} onTimeUp={handleSubmit} isRunning={started} />
        </div>

        {/* Progress dots */}
        <div className="mb-6 flex gap-1.5">
          {questions.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full transition-colors ${
                i === currentIndex ? "gradient-primary" : i < currentIndex ? "bg-primary/40" : "bg-muted"
              }`}
            />
          ))}
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="rounded-xl border border-border bg-card p-6 shadow-card sm:p-8"
          >
            <h3 className="mb-6 font-heading text-xl font-semibold text-card-foreground">{question.text}</h3>
            <div className="space-y-3">
              {question.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => answerQuestion(question.id, i)}
                  className={`w-full rounded-lg border-2 p-4 text-left text-sm font-medium transition-all ${
                    selectedAnswer === i
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border bg-card text-card-foreground hover:border-primary/30 hover:bg-muted"
                  }`}
                >
                  <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-muted text-xs font-bold text-muted-foreground">
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentIndex((i) => i - 1)}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="mr-1 h-4 w-4" /> Previous
          </Button>
          {currentIndex === questions.length - 1 ? (
            <Button onClick={handleSubmit} className="gradient-primary text-primary-foreground">
              <Send className="mr-1 h-4 w-4" /> Submit
            </Button>
          ) : (
            <Button onClick={() => setCurrentIndex((i) => i + 1)}>
              Next <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizAttempt;
