import React, { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuiz } from "@/context/QuizContext";
import { questionsByQuiz, quizzes } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import Timer from "@/components/Timer";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Send, AlertTriangle, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const QuizAttempt = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { startQuiz, answerQuestion, getAnswer, submitQuiz } = useQuiz();
  const { toast } = useToast();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [tabSwitchCount, setTabSwitchCount] = useState(0);

  const quiz = quizzes.find((q) => q.id === id);
  const questions = id ? questionsByQuiz[id] || [] : [];

  useEffect(() => {
    if (id && !started) {
      startQuiz(id);
      setStarted(true);
    }
  }, [id, started, startQuiz]);

  // Anti-cheat: tab switch detection
  useEffect(() => {
    const handleVisibility = () => {
      if (document.hidden && started) {
        setTabSwitchCount((prev) => {
          const next = prev + 1;
          toast({
            title: "⚠️ Tab Switch Detected",
            description: `Warning ${next}/3: Switching tabs is not allowed during the quiz.`,
            variant: "destructive",
          });
          if (next >= 3) {
            handleSubmitFinal();
          }
          return next;
        });
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [started]);

  const handleSubmitFinal = useCallback(() => {
    const result = submitQuiz();
    navigate("/result", { state: { ...result, quizId: id } });
  }, [submitQuiz, navigate, id]);

  const handleSubmitClick = () => setShowConfirm(true);

  if (!quiz || questions.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-muted-foreground">Quiz not found.</p>
      </div>
    );
  }

  const question = questions[currentIndex];
  const selectedAnswer = getAnswer(question.id);
  const answeredCount = questions.filter((q) => getAnswer(q.id) !== undefined).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Submit confirmation modal */}
      <AnimatePresence>
        {showConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-lg text-center"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-warning/10">
                <AlertTriangle className="h-7 w-7 text-warning" />
              </div>
              <h3 className="mb-2 font-heading text-xl font-bold text-card-foreground">Submit Quiz?</h3>
              <p className="mb-2 text-sm text-muted-foreground">
                You've answered {answeredCount} of {questions.length} questions.
              </p>
              {answeredCount < questions.length && (
                <p className="mb-6 text-sm text-warning">{questions.length - answeredCount} question(s) unanswered!</p>
              )}
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setShowConfirm(false)}>
                  Cancel
                </Button>
                <Button className="flex-1 gradient-primary text-primary-foreground rounded-xl" onClick={handleSubmitFinal}>
                  Submit
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto max-w-3xl px-4 py-8">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between rounded-2xl border border-border bg-card p-5 shadow-card">
          <div>
            <h2 className="font-heading text-lg font-semibold text-card-foreground">{quiz.title}</h2>
            <p className="text-sm text-muted-foreground">{answeredCount}/{questions.length} answered</p>
          </div>
          <Timer totalSeconds={quiz.timeLimit} onTimeUp={handleSubmitFinal} isRunning={started} />
        </div>

        {/* Progress dots */}
        <div className="mb-6 flex gap-1.5">
          {questions.map((q, i) => {
            const isAnswered = getAnswer(q.id) !== undefined;
            return (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 flex-1 rounded-full transition-all cursor-pointer ${
                  i === currentIndex
                    ? "gradient-primary scale-y-150"
                    : isAnswered
                    ? "bg-success/60"
                    : "bg-muted hover:bg-muted-foreground/20"
                }`}
              />
            );
          })}
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="rounded-2xl border border-border bg-card p-6 shadow-card sm:p-8"
          >
            <div className="mb-2 text-sm font-medium text-primary">Question {currentIndex + 1} of {questions.length}</div>
            <h3 className="mb-8 font-heading text-xl font-semibold text-card-foreground sm:text-2xl">{question.text}</h3>
            <div className="space-y-3">
              {question.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => answerQuestion(question.id, i)}
                  className={`w-full rounded-xl border-2 p-4 text-left text-sm font-medium transition-all ${
                    selectedAnswer === i
                      ? "border-primary bg-primary/10 text-primary shadow-glow"
                      : "border-border bg-card text-card-foreground hover:border-primary/30 hover:bg-muted"
                  }`}
                >
                  <span className={`mr-3 inline-flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${
                    selectedAnswer === i ? "gradient-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <Button
            variant="outline"
            className="rounded-xl"
            onClick={() => setCurrentIndex((i) => i - 1)}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="mr-1 h-4 w-4" /> Previous
          </Button>
          {currentIndex === questions.length - 1 ? (
            <Button onClick={handleSubmitClick} className="gradient-primary text-primary-foreground rounded-xl">
              <Send className="mr-1 h-4 w-4" /> Submit Quiz
            </Button>
          ) : (
            <Button onClick={() => setCurrentIndex((i) => i + 1)} className="rounded-xl">
              Next <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizAttempt;
