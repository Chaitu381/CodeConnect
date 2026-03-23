import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Question, Section } from '@/data/questions';

export interface TestAttempt {
  id: string;
  date: string;
  type: 'mock' | 'section';
  section?: Section;
  totalQuestions: number;
  correctAnswers: number;
  timeTaken: number; // seconds
  answers: Record<string, number>;
  questions: Question[];
}

interface TestStore {
  attempts: TestAttempt[];
  bookmarks: string[];
  addAttempt: (attempt: TestAttempt) => void;
  toggleBookmark: (questionId: string) => void;
  isBookmarked: (questionId: string) => boolean;
  getAccuracy: () => number;
  getWeakTopics: () => { topic: string; accuracy: number }[];
  getRecentAttempts: (count: number) => TestAttempt[];
}

export const useTestStore = create<TestStore>()(
  persist(
    (set, get) => ({
      attempts: [],
      bookmarks: [],
      addAttempt: (attempt) => set((s) => ({ attempts: [...s.attempts, attempt] })),
      toggleBookmark: (qId) => set((s) => ({
        bookmarks: s.bookmarks.includes(qId)
          ? s.bookmarks.filter((id) => id !== qId)
          : [...s.bookmarks, qId],
      })),
      isBookmarked: (qId) => get().bookmarks.includes(qId),
      getAccuracy: () => {
        const { attempts } = get();
        if (!attempts.length) return 0;
        const total = attempts.reduce((a, b) => a + b.totalQuestions, 0);
        const correct = attempts.reduce((a, b) => a + b.correctAnswers, 0);
        return total ? Math.round((correct / total) * 100) : 0;
      },
      getWeakTopics: () => {
        const { attempts } = get();
        const topicStats: Record<string, { correct: number; total: number }> = {};
        attempts.forEach((att) => {
          att.questions.forEach((q) => {
            if (!topicStats[q.topic]) topicStats[q.topic] = { correct: 0, total: 0 };
            topicStats[q.topic].total++;
            if (att.answers[q.id] === q.correctAnswer) topicStats[q.topic].correct++;
          });
        });
        return Object.entries(topicStats)
          .map(([topic, s]) => ({ topic, accuracy: Math.round((s.correct / s.total) * 100) }))
          .sort((a, b) => a.accuracy - b.accuracy);
      },
      getRecentAttempts: (count) => get().attempts.slice(-count).reverse(),
    }),
    { name: 'nqt-test-store' }
  )
);
