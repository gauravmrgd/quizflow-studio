import React, { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuiz } from "@/context/QuizContext";
import { questionsByQuiz, quizzes } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import Timer from "@/components/Timer";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Send, AlertTriangle, X, CheckCircle2 } from "lucide-react";
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
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-muted flex items-center justify-center">
            <AlertTriangle className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-muted-foreground text-lg">Quiz not found.</p>
        </motion.div>
      </div>
    );
  }

  const question = questions[currentIndex];
  const selectedAnswer = getAnswer(question.id);
  const answeredCount = questions.filter((q) => getAnswer(q.id) !== undefined).length;

  return (
    <div className="min-h-screen bg-background gradient-mesh">
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
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 shadow-xl-custom text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-warning/10"
              >
                <AlertTriangle className="h-8 w-8 text-warning" />
              </motion.div>
              <h3 className="mb-2 font-heading text-xl font-bold text-card-foreground">Submit Quiz?</h3>
              <p className="mb-2 text-sm text-muted-foreground">
                You've answered <span className="font-semibold text-foreground">{answeredCount}</span> of <span className="font-semibold text-foreground">{questions.length}</span> questions.
              </p>
              {answeredCount < questions.length && (
                <p className="mb-6 text-sm text-warning font-medium">{questions.length - answeredCount} question(s) unanswered!</p>
              )}
              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 rounded-xl" onClick={() => setShowConfirm(false)}>
                  Cancel
                </Button>
                <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button className="w-full gradient-primary text-primary-foreground rounded-xl" onClick={handleSubmitFinal}>
                    Submit
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto max-w-3xl px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex items-center justify-between rounded-2xl border border-border/50 bg-card/80 backdrop-blur-md p-5 shadow-card"
        >
          <div>
            <h2 className="font-heading text-lg font-semibold text-card-foreground">{quiz.title}</h2>
            <p className="text-sm text-muted-foreground flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-success" />
              {answeredCount}/{questions.length} answered
            </p>
          </div>
          <Timer totalSeconds={quiz.timeLimit} onTimeUp={handleSubmitFinal} isRunning={started} />
        </motion.div>

        {/* Progress dots */}
        <div className="mb-6 flex gap-1.5">
          {questions.map((q, i) => {
            const isAnswered = getAnswer(q.id) !== undefined;
            return (
              <motion.button
                key={i}
                whileHover={{ scaleY: 1.8 }}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 flex-1 rounded-full transition-all cursor-pointer ${i === currentIndex
                    ? "gradient-primary scale-y-150 shadow-glow"
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
            initial={{ opacity: 0, x: 40, scale: 0.98 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -40, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="rounded-2xl border border-border/50 bg-card p-6 shadow-card sm:p-8 relative overflow-hidden"
          >
            {/* Question number accent */}
            <div className="absolute top-0 left-0 w-1 h-full gradient-primary rounded-l-2xl" />
            <div className="ml-2">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                Question {currentIndex + 1} of {questions.length}
              </div>
              <h3 className="mb-8 font-heading text-xl font-semibold text-card-foreground sm:text-2xl leading-relaxed">{question.text}</h3>
              <div className="space-y-3">
                {question.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01, x: 4 }}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => answerQuestion(question.id, i)}
                    className={`w-full rounded-xl border-2 p-4 text-left text-sm font-medium transition-all duration-200 ${selectedAnswer === i
                        ? "border-primary bg-primary/10 text-primary shadow-glow"
                        : "border-border bg-card text-card-foreground hover:border-primary/30 hover:bg-muted"
                      }`}
                  >
                    <span className={`mr-3 inline-flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold transition-all ${selectedAnswer === i ? "gradient-primary text-primary-foreground shadow-md" : "bg-muted text-muted-foreground"
                      }`}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="outline"
              className="rounded-xl"
              onClick={() => setCurrentIndex((i) => i - 1)}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="mr-1 h-4 w-4" /> Previous
            </Button>
          </motion.div>
          {currentIndex === questions.length - 1 ? (
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button onClick={handleSubmitClick} className="gradient-primary text-primary-foreground rounded-xl shadow-glow">
                <Send className="mr-1 h-4 w-4" /> Submit Quiz
              </Button>
            </motion.div>
          ) : (
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button onClick={() => setCurrentIndex((i) => i + 1)} className="rounded-xl">
                Next <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizAttempt;
