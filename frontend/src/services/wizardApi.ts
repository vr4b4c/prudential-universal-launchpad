import { WizardResponse, Answer } from '../types/wizard';

const API_URL = 'http://localhost:3000';

export const wizardApi = {
  async startWizard(): Promise<WizardResponse> {
    const response = await fetch(`${API_URL}/wizard/start`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to start wizard');
    }

    return response.json();
  },

  async submitAnswer(answer: Answer): Promise<WizardResponse> {
    const response = await fetch(`${API_URL}/wizard/answer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(answer),
    });

    if (!response.ok) {
      throw new Error('Failed to submit answer');
    }

    return response.json();
  },

  async getSession(sessionId: string): Promise<WizardResponse> {
    const response = await fetch(`${API_URL}/wizard/session/${sessionId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to get session');
    }

    return response.json();
  },
};
