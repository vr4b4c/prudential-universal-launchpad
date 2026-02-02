import { QuestionDto } from './question.dto';

export class QuizDto {
  id: string;
  questions: QuestionDto[];
  completedAt?: Date;
}
