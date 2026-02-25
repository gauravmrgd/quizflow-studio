import React, { createContext, useContext, useState, ReactNode } from "react";
import { QuizAttempt } from "@/types/quiz";
import { questionsByQuiz } from "@/data/mockData";

interface QuizContextType {
  currentAttempt: QuizAttempt | null;
  startQuiz: (quizId: string) => void;
  answerQuestion: (questionId: string, answerIndex: number) => void;
  submitQuiz: () => { score: number; total: number; correct: number; wrong: number; timeTaken: number };
  getAnswer: (questionId: string) => number | undefined;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export const QuizProvider = ({ children }: { children: ReactNode }) => {
  const [currentAttempt, setCurrentAttempt] = useState<QuizAttempt | null>(null);

  const startQuiz = (quizId: string) => {
    setCurrentAttempt({ quizId, answers: {}, startTime: Date.now() });
  };

  const answerQuestion = (questionId: string, answerIndex: number) => {
    setCurrentAttempt((prev) =>
      prev ? { ...prev, answers: { ...prev.answers, [questionId]: answerIndex } } : null
    );
  };

  const getAnswer = (questionId: string) => currentAttempt?.answers[questionId];

  const submitQuiz = () => {
    if (!currentAttempt) return { score: 0, total: 0, correct: 0, wrong: 0, timeTaken: 0 };
    const questions = questionsByQuiz[currentAttempt.quizId] || [];
    const total = questions.length;
    let correct = 0;
    questions.forEach((q) => {
      if (currentAttempt.answers[q.id] === q.correctAnswer) correct++;
    });
    const wrong = total - correct;
    const score = Math.round((correct / total) * 100);
    const timeTaken = Math.round((Date.now() - currentAttempt.startTime) / 1000);
    setCurrentAttempt((prev) => (prev ? { ...prev, endTime: Date.now() } : null));
    return { score, total, correct, wrong, timeTaken };
  };

  return (
    <QuizContext.Provider value={{ currentAttempt, startQuiz, answerQuestion, submitQuiz, getAnswer }}>
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) throw new Error("useQuiz must be used within QuizProvider");
  return context;
};
