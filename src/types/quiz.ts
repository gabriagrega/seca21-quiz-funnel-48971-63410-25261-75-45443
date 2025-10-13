export interface QuizOption {
  id: string;
  text: string;
  value: number;
  icon?: string;
  image?: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  subtitle?: string;
  options: QuizOption[];
  type?: 'default' | 'gender' | 'age' | 'visual';
}

export interface QuizAnswer {
  questionId: number;
  optionId: string;
  value: number;
}

export interface QuizResult {
  score: number;
  answers: QuizAnswer[];
  gender?: 'male' | 'female';
}

export interface MotivationalMessage {
  id: number;
  title: string;
  message: string;
  author?: string;
  showAfterQuestion: number;
}
