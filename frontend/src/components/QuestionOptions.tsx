import { useState } from 'react';
import { Question } from '../types/quiz';

interface QuestionOptionsProps {
  question: Question;
  onSubmit: (answer: string) => void;
  isLoading?: boolean;
}

export function QuestionOptions({ question, onSubmit, isLoading }: QuestionOptionsProps) {
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedOption) {
      onSubmit(selectedOption);
    }
  };

  const canSubmit = selectedOption.length > 0;

  return (
    <form onSubmit={handleSubmit} className="question-form">
      <label className="question-label">
        {question.text}
      </label>
      <div className="options-list">
        {question.options?.map((option) => (
          <label key={option} className="option-item">
            <input
              type="radio"
              name="option"
              value={option}
              checked={selectedOption === option}
              onChange={(e) => setSelectedOption(e.target.value)}
              disabled={isLoading}
              className="option-radio"
            />
            <span className="option-text">{option}</span>
          </label>
        ))}
      </div>
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
