export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questionCount: number;
  timeLimit: number; // in seconds
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
}

export interface QuizAttempt {
  quizId: string;
  answers: Record<string, number>;
  startTime: number;
  endTime?: number;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  timeTaken: number; // in seconds
  userId: string;
}
