import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { WizardResponseDto } from './dto/wizard-response.dto';
import { QuizUpdateRequestDto } from './dto/quiz-update-request.dto';
import { QuizService } from './quiz.service';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  async startQuiz(): Promise<WizardResponseDto> {
    return await this.quizService.startQuiz();
  }

  @Get(':id')
  async getQuiz(@Param() params: any): Promise<WizardResponseDto> {
    return await this.quizService.getQuiz(params.id);
  }

  @Put(':id')
  async updateQuiz(
    @Param() params: any,
    @Body() updateRequest: QuizUpdateRequestDto,
  ): Promise<WizardResponseDto> {
    const quiz = await this.quizService.getQuiz(params.id);
    if (!quiz) {
      throw new Error('Invalid quiz id');
    }

    await this.quizService.updateQuiz(quiz, updateRequest);
    return await this.quizService.addQuestion(quiz);
  }
}
