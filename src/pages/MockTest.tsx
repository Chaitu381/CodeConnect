import { useState, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Timer } from '@/components/Timer';
import { QuestionPanel } from '@/components/QuestionPanel';
import { QuestionNavGrid } from '@/components/QuestionNavGrid';
import { Button } from '@/components/ui/button';
import { getMockTestQuestions, type Question, type Section, sectionInfo } from '@/data/questions';
import { useTestStore, type TestAttempt } from '@/store/testStore';
import { ArrowLeft, ArrowRight, Send, Zap } from 'lucide-react';

const TOTAL_TIME = 90 * 60; // 90 minutes

export default function MockTest() {
  const navigate = useNavigate();
  const { addAttempt } = useTestStore();
  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [startTime] = useState(Date.now());

  const allQuestions = useMemo(() => {
    const { aptitude, reasoning, verbal } = getMockTestQuestions();
    return [...aptitude, ...reasoning, ...verbal];
  }, []);

  const currentQuestion = allQuestions[currentIndex];

  const handleSubmit = useCallback(() => {
    const timeTaken = Math.round((Date.now() - startTime) / 1000);
    const correct = allQuestions.filter((q) => answers[q.id] === q.correctAnswer).length;
    const attempt: TestAttempt = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      type: 'mock',
      totalQuestions: allQuestions.length,
      correctAnswers: correct,
      timeTaken,
      answers,
      questions: allQuestions,
    };
    addAttempt(attempt);
    setSubmitted(true);
  }, [answers, allQuestions, startTime, addAttempt]);

  const handleTimeUp = useCallback(() => {
    if (!submitted) handleSubmit();
  }, [submitted, handleSubmit]);

  if (!started) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-lg w-full text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-6">
            <Zap className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold font-heading mb-4 text-foreground">Full Mock Test</h1>
          <p className="text-muted-foreground mb-6">
            {allQuestions.length} questions • 90 minutes • Auto-submit when time ends
          </p>
          <div className="grid grid-cols-3 gap-3 mb-8">
            {(['aptitude', 'reasoning', 'verbal'] as Section[]).map((s) => (
              <div key={s} className="p-3 rounded-xl bg-card border border-border text-center">
                <div className="text-sm font-semibold text-foreground">{sectionInfo[s].label}</div>
                <div className="text-xs text-muted-foreground">{sectionInfo[s].time} min</div>
              </div>
            ))}
          </div>
          <Button size="lg" onClick={() => setStarted(true)} className="px-8">
            Begin Test <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  if (submitted) {
    const correct = allQuestions.filter((q) => answers[q.id] === q.correctAnswer).length;
    const accuracy = Math.round((correct / allQuestions.length) * 100);
    return (
      <div className="min-h-screen bg-background p-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 pt-8">
            <h1 className="text-3xl font-bold font-heading mb-2 text-foreground">Test Complete!</h1>
            <div className="text-6xl font-bold text-foreground my-6">{accuracy}%</div>
            <p className="text-muted-foreground">{correct}/{allQuestions.length} correct</p>
          </div>
          <div className="flex gap-4 justify-center mb-8">
            <Button onClick={() => navigate('/dashboard')}>View Dashboard</Button>
            <Button variant="outline" onClick={() => navigate('/')}>Home</Button>
          </div>
          <h2 className="text-xl font-bold mb-4 text-foreground">Review Answers</h2>
          <div className="flex flex-col gap-6">
            {allQuestions.map((q, i) => (
              <QuestionPanel
                key={q.id}
                question={q}
                questionNumber={i + 1}
                totalQuestions={allQuestions.length}
                selectedAnswer={answers[q.id]}
                onSelectAnswer={() => {}}
                showResult
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Zap className="w-5 h-5 text-primary" />
          <span className="font-bold text-foreground">Mock Test</span>
        </div>
        <Timer totalSeconds={TOTAL_TIME} onTimeUp={handleTimeUp} />
        <Button size="sm" variant="destructive" onClick={handleSubmit}>
          <Send className="w-4 h-4 mr-1" /> Submit
        </Button>
      </div>

      <div className="container mx-auto px-4 py-6 flex flex-col lg:flex-row gap-6">
        {/* Question */}
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

        {/* Nav Grid */}
        <div className="lg:w-64 shrink-0">
          <div className="sticky top-24 bg-card rounded-2xl border border-border p-4">
            <h3 className="font-semibold text-foreground mb-3 text-sm">Question Navigator</h3>
            <QuestionNavGrid
              total={allQuestions.length}
              currentIndex={currentIndex}
              answers={answers}
              questionIds={allQuestions.map((q) => q.id)}
              onNavigate={setCurrentIndex}
            />
            <div className="mt-4 text-xs text-muted-foreground space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-success/20 border border-success/30" /> Answered
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-primary" /> Current
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-muted" /> Not answered
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
