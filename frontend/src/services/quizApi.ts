import { QuizResponse, QuizUpdateRequest } from '../types/quiz';

const API_URL = 'http://localhost:3000';

export const quizApi = {
  async startQuiz(): Promise<QuizResponse> {
    const response = await fetch(`${API_URL}/quiz`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to start quiz');
    }

    return response.json();
  },

  async getQuiz(quizId: string): Promise<QuizResponse> {
    const response = await fetch(`${API_URL}/quiz/${quizId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get quiz');
    }

    return response.json();
  },

  async updateQuiz(
    quizId: string,
    updateRequest: QuizUpdateRequest,
  ): Promise<QuizResponse> {
    const response = await fetch(`${API_URL}/quiz/${quizId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateRequest),
    });

    if (!response.ok) {
      throw new Error('Failed to update quiz');
    }

    return response.json();
  },
};
