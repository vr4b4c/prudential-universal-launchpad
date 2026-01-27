import { QuestionDto } from './question.dto';

export class WizardResponseDto {
  sessionId: string;
  question?: QuestionDto | null;
  isComplete: boolean;
  answers?: Record<string, any>;
}
