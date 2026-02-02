import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WizardResponseDto } from './dto/wizard-response.dto';
import { Quiz } from './entities/quiz.entity';
import { QuizUpdateRequestDto } from './dto/quiz-update-request.dto';
import { QuestionService } from './question.service';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
    private readonly questionService: QuestionService,
  ) {}

  async startQuiz(): Promise<WizardResponseDto> {
    const quiz = this.quizRepository.create({ questions: [] });

    return this.addQuestion(quiz);
  }

  async getQuiz(id: string): Promise<Quiz> {
    return await this.quizRepository.findOne({ where: { id } });
  }

  async updateQuiz(
    quiz: Quiz,
    updateRequest: QuizUpdateRequestDto,
  ): Promise<Quiz> {
    quiz.questions = updateRequest.questions;
    this.quizRepository.save(quiz);

    return quiz;
  }

  async addQuestion(quiz: Quiz): Promise<Quiz> {
    quiz.questions.push(await this.questionService.getNextQuestion(quiz));

    return await this.quizRepository.save(quiz);
  }
}
