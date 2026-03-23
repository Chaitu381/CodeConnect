import { Bookmark, BookmarkCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Question } from '@/data/questions';
import { useTestStore } from '@/store/testStore';

interface QuestionPanelProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer: number | undefined;
  onSelectAnswer: (index: number) => void;
  showResult?: boolean;
}

export function QuestionPanel({ question, questionNumber, totalQuestions, selectedAnswer, onSelectAnswer, showResult }: QuestionPanelProps) {
  const { toggleBookmark, isBookmarked } = useTestStore();
  const bookmarked = isBookmarked(question.id);

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col gap-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground">
              Q{questionNumber}/{totalQuestions}
            </span>
            <span className={`text-xs font-medium px-2 py-1 rounded-full ${
              question.difficulty === 'easy' ? 'bg-success/10 text-success' :
              question.difficulty === 'medium' ? 'bg-warning/10 text-warning' :
              'bg-destructive/10 text-destructive'
            }`}>
              {question.difficulty}
            </span>
            <span className="text-xs text-muted-foreground">{question.topic}</span>
          </div>
          <h3 className="text-lg font-semibold text-foreground">{question.question}</h3>
        </div>
        <button onClick={() => toggleBookmark(question.id)} className="p-2 hover:bg-muted rounded-lg transition-colors">
          {bookmarked ? <BookmarkCheck className="w-5 h-5 text-accent" /> : <Bookmark className="w-5 h-5 text-muted-foreground" />}
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {question.options.map((option, idx) => {
          const isSelected = selectedAnswer === idx;
          const isCorrect = showResult && idx === question.correctAnswer;
          const isWrong = showResult && isSelected && idx !== question.correctAnswer;

          return (
            <button
              key={idx}
              onClick={() => !showResult && onSelectAnswer(idx)}
              disabled={showResult}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all font-medium ${
                isCorrect ? 'border-success bg-success/10 text-foreground' :
                isWrong ? 'border-destructive bg-destructive/10 text-foreground' :
                isSelected ? 'border-primary bg-primary/10 text-foreground' :
                'border-border hover:border-primary/50 hover:bg-muted text-foreground'
              }`}
            >
              <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-muted text-sm font-semibold mr-3">
                {String.fromCharCode(65 + idx)}
              </span>
              {option}
            </button>
          );
        })}
      </div>

      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-xl bg-muted border border-border"
        >
          <p className="text-sm font-semibold text-foreground mb-1">Explanation:</p>
          <p className="text-sm text-muted-foreground">{question.explanation}</p>
        </motion.div>
      )}
    </motion.div>
  );
}
