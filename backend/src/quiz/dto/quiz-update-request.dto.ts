import { QuestionType } from '../entities/question.value';

export class QuizQuestionUpdateReequestDto {
  type: QuestionType;
  text: string;
  options?: string[];
  answers: string;
}

export class QuizUpdateRequestDto {
  questions: QuizQuestionUpdateReequestDto[];
}
