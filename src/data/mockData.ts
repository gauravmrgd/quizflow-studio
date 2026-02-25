import { Quiz, Question, LeaderboardEntry } from "@/types/quiz";

export const quizzes: Quiz[] = [
  {
    id: "1",
    title: "JavaScript Fundamentals",
    description: "Test your knowledge of core JavaScript concepts including closures, hoisting, and prototypes.",
    questionCount: 5,
    timeLimit: 300,
    category: "Programming",
    difficulty: "Medium",
  },
  {
    id: "2",
    title: "World Geography",
    description: "How well do you know the world's capitals, landmarks, and geographical features?",
    questionCount: 5,
    timeLimit: 240,
    category: "Geography",
    difficulty: "Easy",
  },
  {
    id: "3",
    title: "Space & Astronomy",
    description: "Explore the cosmos with questions about planets, stars, and space exploration.",
    questionCount: 5,
    timeLimit: 300,
    category: "Science",
    difficulty: "Hard",
  },
  {
    id: "4",
    title: "Modern History",
    description: "Test your knowledge of key events that shaped the 20th and 21st centuries.",
    questionCount: 5,
    timeLimit: 360,
    category: "History",
    difficulty: "Medium",
  },
];

export const questionsByQuiz: Record<string, Question[]> = {
  "1": [
    { id: "q1", text: "What is the output of typeof null in JavaScript?", options: ["null", "undefined", "object", "string"], correctAnswer: 2 },
    { id: "q2", text: "Which method is used to convert JSON to a JavaScript object?", options: ["JSON.stringify()", "JSON.parse()", "JSON.convert()", "JSON.toObject()"], correctAnswer: 1 },
    { id: "q3", text: "What does the '===' operator check?", options: ["Value only", "Type only", "Value and type", "Reference"], correctAnswer: 2 },
    { id: "q4", text: "Which keyword declares a block-scoped variable?", options: ["var", "let", "both var and let", "function"], correctAnswer: 1 },
    { id: "q5", text: "What is a closure in JavaScript?", options: ["A function inside a loop", "A function with access to its outer scope", "A function that closes the browser", "A self-invoking function"], correctAnswer: 1 },
  ],
  "2": [
    { id: "q1", text: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], correctAnswer: 2 },
    { id: "q2", text: "Which is the longest river in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], correctAnswer: 1 },
    { id: "q3", text: "Which country has the most time zones?", options: ["Russia", "USA", "France", "China"], correctAnswer: 2 },
    { id: "q4", text: "What is the smallest country in the world?", options: ["Monaco", "Vatican City", "San Marino", "Liechtenstein"], correctAnswer: 1 },
    { id: "q5", text: "On which continent is the Sahara Desert?", options: ["Asia", "Africa", "South America", "Australia"], correctAnswer: 1 },
  ],
  "3": [
    { id: "q1", text: "What planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Saturn"], correctAnswer: 1 },
    { id: "q2", text: "How many planets are in our solar system?", options: ["7", "8", "9", "10"], correctAnswer: 1 },
    { id: "q3", text: "What is the closest star to Earth?", options: ["Alpha Centauri", "Betelgeuse", "The Sun", "Sirius"], correctAnswer: 2 },
    { id: "q4", text: "Which planet has the most moons?", options: ["Jupiter", "Saturn", "Uranus", "Neptune"], correctAnswer: 1 },
    { id: "q5", text: "What year did humans first land on the Moon?", options: ["1965", "1967", "1969", "1971"], correctAnswer: 2 },
  ],
  "4": [
    { id: "q1", text: "In which year did World War II end?", options: ["1943", "1944", "1945", "1946"], correctAnswer: 2 },
    { id: "q2", text: "Who was the first person to walk on the Moon?", options: ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "John Glenn"], correctAnswer: 1 },
    { id: "q3", text: "When did the Berlin Wall fall?", options: ["1987", "1988", "1989", "1990"], correctAnswer: 2 },
    { id: "q4", text: "Which country hosted the first modern Olympics?", options: ["France", "Greece", "USA", "UK"], correctAnswer: 1 },
    { id: "q5", text: "What event started World War I?", options: ["Invasion of Poland", "Assassination of Archduke Franz Ferdinand", "Bombing of Pearl Harbor", "Treaty of Versailles"], correctAnswer: 1 },
  ],
};

export const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, name: "Alex Chen", score: 100, timeTaken: 120, userId: "u1" },
  { rank: 2, name: "Sarah Kim", score: 95, timeTaken: 145, userId: "u2" },
  { rank: 3, name: "Jordan Lee", score: 90, timeTaken: 130, userId: "u3" },
  { rank: 4, name: "Taylor Swift", score: 85, timeTaken: 160, userId: "u4" },
  { rank: 5, name: "Morgan Davis", score: 80, timeTaken: 155, userId: "u5" },
  { rank: 6, name: "Casey Brown", score: 75, timeTaken: 170, userId: "u6" },
  { rank: 7, name: "Riley White", score: 70, timeTaken: 180, userId: "u7" },
  { rank: 8, name: "Jamie Green", score: 65, timeTaken: 190, userId: "u8" },
];
