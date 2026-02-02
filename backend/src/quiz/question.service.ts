import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import { Quiz } from './entities/quiz.entity';
import { Question, QuestionType } from './entities/question.value';
import Handlebars from 'handlebars';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const ENCODING = 'utf-8';
const GEN_AI_MODEL = 'gemini-3-flash-preview';

function stripJsonCodeFence(str: string): string {
  return str
    .replace(/^```json\s*\n?/i, '')
    .replace(/\n?```\s*$/, '')
    .trim();
}

@Injectable()
export class QuestionService {
  private readonly ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({});
  }

  async getNextQuestion(quiz: Quiz): Promise<Question> {
    const contents = this.renderNextQuestionPrompt(quiz);

    console.log(`Gen AI input: ${contents}`);
    const response = await this.ai.models.generateContent({
      model: GEN_AI_MODEL,
      contents,
    });

    if (!response.text) {
      throw new Error("Model didn't generate any content");
    }

    console.log(`Gen AI response: ${response.text}`);
    return this.convertResponseToQuestion(response.text);
  }

  private renderNextQuestionPrompt(quiz: Quiz): string {
    const templateRaw = readFileSync(
      join(__dirname, 'prompts/next-question.hbs'),
      ENCODING,
    );
    const template = Handlebars.compile(templateRaw);

    return template({ quiz });
  }

  private convertResponseToQuestion(text: string) {
    const data = JSON.parse(stripJsonCodeFence(text));

    const type =
      data.type === QuestionType.TEXT
        ? QuestionType.TEXT
        : data.type === QuestionType.OPTIONS
          ? QuestionType.OPTIONS
          : QuestionType.TEXT;

    console.log(`${data.type} -> ${type}`);
    return new Question(type, data.text);
  }
}
