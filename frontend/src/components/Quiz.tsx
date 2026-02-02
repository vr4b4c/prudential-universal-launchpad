import { useState, useEffect } from 'react';
import { quizApi } from '../services/quizApi';
import { Question, QuizUpdateRequest } from '../types/quiz';
import { QuestionText } from './QuestionText';
import { QuestionOptions } from './QuestionOptions';

export function Quiz() {
  const [quizId, setQuizId] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [completedAt, setCompletedAt] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isComplete = !!completedAt;
  const currentQuestion: Question | null =
    questions.length > 0 ? questions[questions.length - 1] : null;

  useEffect(() => {
    startQuiz();
  }, []);

  const startQuiz = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await quizApi.startQuiz();
      setQuizId(response.id);
      setQuestions(response.questions ?? []);
      setCompletedAt(response.completedAt ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start quiz');
    } finally {
      setIsLoading(false);
    }
  };

  const buildUpdateRequest = (questionsWithNewAnswer: Question[]): QuizUpdateRequest => ({
    questions: questionsWithNewAnswer.map((q) => ({
      type: q.type,
      text: q.text,
      options: q.options,
      answer: q.answer ?? '',
    })),
  });

  const handleAnswerSubmit = async (answer: string) => {
    if (!quizId || questions.length === 0) return;

    setIsLoading(true);
    setError(null);
    try {
      const currentIndex = questions.length - 1;
      const questionsWithAnswer: Question[] = questions.map((q, i) =>
        i === currentIndex ? { ...q, answer } : q,
      );
      const response = await quizApi.updateQuiz(
        quizId,
        buildUpdateRequest(questionsWithAnswer),
      );
      setQuestions(response.questions ?? []);
      setCompletedAt(response.completedAt ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit answer');
    } finally {
      setIsLoading(false);
    }
  };

  const answersSummary = questions.filter((q) => q.answer != null && q.answer !== '');

  if (isLoading && questions.length === 0 && !isComplete) {
    return (
      <div className="quiz-container">
        <div className="quiz-loading">Starting quiz...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="quiz-container">
        <div className="quiz-error">
          <p>Error: {error}</p>
          <button onClick={startQuiz} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (isComplete) {
    return (
      <div className="quiz-container">
        <div className="quiz-complete">
          <h2>Quiz Complete!</h2>
          <p>Thank you for completing the quiz.</p>
          <div className="answers-summary">
            <h3>Your Answers:</h3>
            <ul>
              {answersSummary.map((q, i) => (
                <li key={i}>
                  <strong>Q{i + 1}:</strong> {q.text} → {q.answer}
                </li>
              ))}
            </ul>
          </div>
          <button onClick={startQuiz} className="restart-button">
            Start New Quiz
          </button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="quiz-container">
        <div className="quiz-loading">Loading question...</div>
      </div>
    );
  }

  console.log(currentQuestion);
  return (
    <div className="quiz-container">
      <div className="quiz-content">
        <h2>Quiz</h2>
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
