export type QuestionType = 'text' | 'options';

export interface Question {
  type: QuestionType;
  text: string;
  options?: string[];
  answer?: string;
}

export interface QuizResponse {
  id: string;
  questions: Question[];
  completedAt?: string;
}

export interface QuizQuestionUpdate {
  type: QuestionType;
  text: string;
  options?: string[];
  answer: string;
}

export interface QuizUpdateRequest {
  questions: QuizQuestionUpdate[];
}
