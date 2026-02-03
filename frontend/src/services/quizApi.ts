import { API_BASE_URL, apiFetch } from '../config/api';
import { QuizResponse, QuizUpdateRequest } from '../types/quiz';

export const quizApi = {
  async startQuiz(): Promise<QuizResponse> {
    const response = await apiFetch(`${API_BASE_URL}/quiz`, {
      method: 'POST',
    });

    if (!response.ok) {
      throw new Error('Failed to start quiz');
    }

    return response.json();
  },

  async getQuiz(quizId: string): Promise<QuizResponse> {
    const response = await apiFetch(`${API_BASE_URL}/quiz/${quizId}`, {
      method: 'GET',
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
    const response = await apiFetch(`${API_BASE_URL}/quiz/${quizId}`, {
      method: 'PUT',
      body: JSON.stringify(updateRequest),
    });

    if (!response.ok) {
      throw new Error('Failed to update quiz');
    }

    return response.json();
  },
};
