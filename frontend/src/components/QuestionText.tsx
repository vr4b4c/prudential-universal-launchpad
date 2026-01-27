import { useState } from 'react';
import { Question } from '../types/wizard';

interface QuestionTextProps {
  question: Question;
  onSubmit: (answer: string) => void;
  isLoading?: boolean;
}

export function QuestionText({ question, onSubmit, isLoading }: QuestionTextProps) {
  const [answer, setAnswer] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim() || !question.isRequired) {
      onSubmit(answer);
    }
  };

  const canSubmit = !question.isRequired || answer.trim().length > 0;

  return (
    <form onSubmit={handleSubmit} className="question-form">
      <label htmlFor="text-answer" className="question-label">
        {question.text}
        {question.isRequired && <span className="required">*</span>}
      </label>
      <textarea
        id="text-answer"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your answer here..."
        rows={5}
        className="question-textarea"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={!canSubmit || isLoading}
        className="question-submit"
      >
        {isLoading ? 'Submitting...' : 'Next'}
      </button>
    </form>
  );
}
