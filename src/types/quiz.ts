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
  // options is optional now because some questions are free-text / inputs
  options?: QuizOption[];
  // types include input-style types for text/number/email/phone
  type?: 'default' | 'gender' | 'age' | 'visual' | 'text' | 'number' | 'email' | 'phone' | 'select';
}

export interface QuizAnswer {
  questionId: number;
  optionId: string;
  // value can be numeric score OR free-text answer
  value: number | string;
  questonText?: string;
  optionText?: string;
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
