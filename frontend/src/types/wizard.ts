export interface Question {
  id: string;
  type: 'text' | 'options';
  text: string;
  options?: string[];
  isRequired?: boolean;
}

export interface Answer {
  sessionId: string;
  questionId: string;
  answer: string | string[];
}

export interface WizardResponse {
  sessionId: string;
  question?: Question | null;
  isComplete: boolean;
  answers?: Record<string, any>;
}
