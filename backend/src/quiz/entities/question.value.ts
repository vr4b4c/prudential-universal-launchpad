export enum QuestionType {
  TEXT = 'text',
  OPTIONS = 'options',
}

export class Question {
  constructor(
    readonly type: QuestionType,
    readonly text: string,
    readonly options?: string[],
    readonly answer?: string,
  ) {
    this.type = type;
    this.text = text;
    this.options = options;
    this.answer = answer;
  }
}
