import { Injectable, NotFoundException } from '@nestjs/common';
import { QuestionDto } from './dto/question.dto';
import { WizardResponseDto } from './dto/wizard-response.dto';

interface WizardSession {
  sessionId: string;
  currentStep: number;
  answers: Record<string, any>;
  isComplete: boolean;
}

@Injectable()
export class WizardService {
  private sessions: Map<string, WizardSession> = new Map();

  // Define question flow - can be made configurable later
  private readonly questions: QuestionDto[] = [
    {
      id: 'q1',
      type: 'text',
      text: 'What is your name?',
      isRequired: true,
    },
    {
      id: 'q2',
      type: 'options',
      text: 'What is your favorite color?',
      options: ['Red', 'Blue', 'Green', 'Yellow', 'Other'],
      isRequired: true,
    },
    {
      id: 'q3',
      type: 'text',
      text: 'Tell us about yourself',
      isRequired: false,
    },
  ];

  startWizard(): WizardResponseDto {
    const sessionId = this.generateSessionId();
    const session: WizardSession = {
      sessionId,
      currentStep: 0,
      answers: {},
      isComplete: false,
    };

    this.sessions.set(sessionId, session);

    return {
      sessionId,
      question: this.questions[0],
      isComplete: false,
    };
  }

  submitAnswer(
    sessionId: string,
    questionId: string,
    answer: string | string[],
  ): WizardResponseDto {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new NotFoundException('Session not found');
    }

    if (session.isComplete) {
      return {
        sessionId,
        question: null,
        isComplete: true,
        answers: session.answers,
      };
    }

    // Validate question ID matches current step
    const currentQuestion = this.questions[session.currentStep];
    if (currentQuestion.id !== questionId) {
      throw new Error('Invalid question ID for current step');
    }

    // Store answer
    session.answers[questionId] = answer;

    // Move to next step
    session.currentStep += 1;

    // Check if wizard is complete
    if (session.currentStep >= this.questions.length) {
      session.isComplete = true;
      return {
        sessionId,
        question: null,
        isComplete: true,
        answers: session.answers,
      };
    }

    // Return next question
    const nextQuestion = this.questions[session.currentStep];
    return {
      sessionId,
      question: nextQuestion,
      isComplete: false,
      answers: session.answers,
    };
  }

  getCurrentQuestion(sessionId: string): WizardResponseDto {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new NotFoundException('Session not found');
    }

    if (session.isComplete) {
      return {
        sessionId,
        question: null,
        isComplete: true,
        answers: session.answers,
      };
    }

    const currentQuestion = this.questions[session.currentStep];
    return {
      sessionId,
      question: currentQuestion,
      isComplete: false,
      answers: session.answers,
    };
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}
