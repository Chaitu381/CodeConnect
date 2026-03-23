import { useState, useCallback, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Timer } from '@/components/Timer';
import { QuestionPanel } from '@/components/QuestionPanel';
import { QuestionNavGrid } from '@/components/QuestionNavGrid';
import { Button } from '@/components/ui/button';
import { getRandomQuestions, sectionInfo, type Section, type Question } from '@/data/questions';
import { useTestStore, type TestAttempt } from '@/store/testStore';
import { ArrowLeft, ArrowRight, Send, Zap } from 'lucide-react';

export default function SectionPractice() {
  const { section } = useParams<{ section: string }>();
  const navigate = useNavigate();
  const { addAttempt } = useTestStore();
  const sec = section as Section;
  const info = sectionInfo[sec];

  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [startTime] = useState(Date.now());

  const allQuestions: Question[] = useMemo(() => {
    if (!info) return [];
    return getRandomQuestions(sec, info.questionCount);
  }, [sec, info]);

  if (!info || !allQuestions.length) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">No questions available for this section yet.</p>
          <Link to="/practice"><Button>Back to Practice</Button></Link>
        </div>
      </div>
    );
  }

  const currentQuestion = allQuestions[currentIndex];
  const totalTime = info.time * 60;

  const handleSubmit = () => {
    const timeTaken = Math.round((Date.now() - startTime) / 1000);
    const correct = allQuestions.filter((q) => answers[q.id] === q.correctAnswer).length;
    const attempt: TestAttempt = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      type: 'section',
      section: sec,
      totalQuestions: allQuestions.length,
      correctAnswers: correct,
      timeTaken,
      answers,
      questions: allQuestions,
    };
    addAttempt(attempt);
    setSubmitted(true);
  };

  const handleTimeUp = () => { if (!submitted) handleSubmit(); };

  if (!started) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-lg w-full text-center">
          <h1 className="text-3xl font-bold font-heading mb-2 text-foreground">{info.label} Practice</h1>
          <p className="text-muted-foreground mb-6">{allQuestions.length} questions • {info.time} minutes</p>
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {info.topics.map((t) => (
              <span key={t} className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground">{t}</span>
            ))}
          </div>
          <div className="flex gap-3 justify-center">
            <Button variant="outline" onClick={() => navigate('/practice')}>
              <ArrowLeft className="w-4 h-4 mr-1" /> Back
            </Button>
            <Button size="lg" onClick={() => setStarted(true)}>
              Start Practice <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (submitted) {
    const correct = allQuestions.filter((q) => answers[q.id] === q.correctAnswer).length;
    const accuracy = Math.round((correct / allQuestions.length) * 100);
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-3xl mx-auto pt-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold font-heading mb-2 text-foreground">{info.label} — Complete!</h1>
            <div className="text-6xl font-bold text-foreground my-6">{accuracy}%</div>
            <p className="text-muted-foreground">{correct}/{allQuestions.length} correct</p>
          </div>
          <div className="flex gap-4 justify-center mb-8">
            <Button onClick={() => navigate('/dashboard')}>Dashboard</Button>
            <Button variant="outline" onClick={() => navigate('/practice')}>More Practice</Button>
          </div>
          <h2 className="text-xl font-bold mb-4 text-foreground">Review</h2>
          <div className="flex flex-col gap-6">
            {allQuestions.map((q, i) => (
              <QuestionPanel key={q.id} question={q} questionNumber={i + 1} totalQuestions={allQuestions.length} selectedAnswer={answers[q.id]} onSelectAnswer={() => {}} showResult />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <span className="font-bold text-foreground">{info.label}</span>
        <Timer totalSeconds={totalTime} onTimeUp={handleTimeUp} />
        <Button size="sm" variant="destructive" onClick={handleSubmit}>
          <Send className="w-4 h-4 mr-1" /> Submit
        </Button>
      </div>
      <div className="container mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <QuestionPanel
            question={currentQuestion}
            questionNumber={currentIndex + 1}
            totalQuestions={allQuestions.length}
            selectedAnswer={answers[currentQuestion.id]}
            onSelectAnswer={(idx) => setAnswers((prev) => ({ ...prev, [currentQuestion.id]: idx }))}
          />
          <div className="flex justify-between mt-6">
            <Button variant="outline" disabled={currentIndex === 0} onClick={() => setCurrentIndex((i) => i - 1)}>
              <ArrowLeft className="w-4 h-4 mr-1" /> Previous
            </Button>
            <Button disabled={currentIndex === allQuestions.length - 1} onClick={() => setCurrentIndex((i) => i + 1)}>
              Next <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </div>
        <div className="lg:w-64 shrink-0">
          <div className="sticky top-24 bg-card rounded-2xl border border-border p-4">
            <h3 className="font-semibold text-foreground mb-3 text-sm">Questions</h3>
            <QuestionNavGrid total={allQuestions.length} currentIndex={currentIndex} answers={answers} questionIds={allQuestions.map((q) => q.id)} onNavigate={setCurrentIndex} />
          </div>
        </div>
      </div>
    </div>
  );
}
