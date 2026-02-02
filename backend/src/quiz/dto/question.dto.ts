import { QuestionType } from '../entities/question.value';

export class QuestionDto {
  type: QuestionType;
  text: string;
  options?: string[];
  answer?: string;
}
