import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { WizardService } from './wizard.service';
import { AnswerDto } from './dto/answer.dto';
import { WizardResponseDto } from './dto/wizard-response.dto';

@Controller('wizard')
export class WizardController {
  constructor(private readonly wizardService: WizardService) {}

  @Post('start')
  startWizard(): WizardResponseDto {
    return this.wizardService.startWizard();
  }

  @Post('answer')
  submitAnswer(@Body() answerDto: AnswerDto): WizardResponseDto {
    return this.wizardService.submitAnswer(
      answerDto.sessionId,
      answerDto.questionId,
      answerDto.answer,
    );
  }

  @Get('session/:sessionId')
  getSession(@Param('sessionId') sessionId: string): WizardResponseDto {
    return this.wizardService.getCurrentQuestion(sessionId);
  }
}
