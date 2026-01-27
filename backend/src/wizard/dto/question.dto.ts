export class QuestionDto {
  id: string;
  type: 'text' | 'options';
  text: string;
  options?: string[];
  isRequired?: boolean;
}
