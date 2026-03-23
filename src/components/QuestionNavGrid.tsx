interface QuestionNavGridProps {
  total: number;
  currentIndex: number;
  answers: Record<string, number>;
  questionIds: string[];
  onNavigate: (index: number) => void;
}

export function QuestionNavGrid({ total, currentIndex, answers, questionIds, onNavigate }: QuestionNavGridProps) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {Array.from({ length: total }, (_, i) => {
        const isAnswered = answers[questionIds[i]] !== undefined;
        const isCurrent = i === currentIndex;
        return (
          <button
            key={i}
            onClick={() => onNavigate(i)}
            className={`w-10 h-10 rounded-lg text-sm font-semibold transition-all ${
              isCurrent
                ? 'bg-primary text-primary-foreground ring-2 ring-primary/50'
                : isAnswered
                ? 'bg-success/20 text-success border border-success/30'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {i + 1}
          </button>
        );
      })}
    </div>
  );
}
