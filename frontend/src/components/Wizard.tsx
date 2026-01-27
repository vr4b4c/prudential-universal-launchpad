import { useState, useEffect } from 'react';
import { wizardApi } from '../services/wizardApi';
import { Question, WizardResponse } from '../types/wizard';
import { QuestionText } from './QuestionText';
import { QuestionOptions } from './QuestionOptions';

export function Wizard() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [allAnswers, setAllAnswers] = useState<Record<string, any>>({});

  useEffect(() => {
    startWizard();
  }, []);

  const startWizard = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await wizardApi.startWizard();
      setSessionId(response.sessionId);
      setCurrentQuestion(response.question || null);
      setIsComplete(response.isComplete);
      if (response.answers) {
        setAllAnswers(response.answers);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start wizard');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSubmit = async (answer: string) => {
    if (!sessionId || !currentQuestion) return;

    setIsLoading(true);
    setError(null);
    try {
      const response = await wizardApi.submitAnswer({
        sessionId,
        questionId: currentQuestion.id,
        answer,
      });

      setCurrentQuestion(response.question || null);
      setIsComplete(response.isComplete);
      if (response.answers) {
        setAllAnswers(response.answers);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit answer');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !currentQuestion && !isComplete) {
    return (
      <div className="wizard-container">
        <div className="wizard-loading">Starting wizard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="wizard-container">
        <div className="wizard-error">
          <p>Error: {error}</p>
          <button onClick={startWizard} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="wizard-container">
        <div className="wizard-complete">
          <h2>Wizard Complete!</h2>
          <p>Thank you for completing the wizard.</p>
          <div className="answers-summary">
            <h3>Your Answers:</h3>
            <ul>
              {Object.entries(allAnswers).map(([questionId, answer]) => (
                <li key={questionId}>
                  <strong>{questionId}:</strong> {Array.isArray(answer) ? answer.join(', ') : answer}
                </li>
              ))}
            </ul>
          </div>
          <button onClick={startWizard} className="restart-button">
            Start New Wizard
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="wizard-container">
        <div className="wizard-loading">Loading question...</div>
      </div>
    );
  }

  return (
    <div className="wizard-container">
      <div className="wizard-content">
        <h2>Wizard</h2>
        {currentQuestion.type === 'text' && (
          <QuestionText
            question={currentQuestion}
            onSubmit={handleAnswerSubmit}
            isLoading={isLoading}
          />
        )}
        {currentQuestion.type === 'options' && (
          <QuestionOptions
            question={currentQuestion}
            onSubmit={handleAnswerSubmit}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}
