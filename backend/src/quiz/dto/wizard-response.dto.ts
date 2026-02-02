import { QuestionDto } from './question.dto';

export class WizardResponseDto {
  id: string;
  questions: QuestionDto[];
  completedAt?: Date;
}
