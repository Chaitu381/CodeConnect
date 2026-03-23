import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, BarChart3, Target, Clock, TrendingDown, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTestStore } from '@/store/testStore';
import { formatTime } from '@/components/Timer';

export default function Dashboard() {
  const { attempts, getAccuracy, getWeakTopics, getRecentAttempts } = useTestStore();
  const accuracy = getAccuracy();
  const weakTopics = getWeakTopics();
  const recent = getRecentAttempts(10);

  const totalTime = attempts.reduce((a, b) => a + b.timeTaken, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Link to="/"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" /> Home</Button></Link>
            <h1 className="text-3xl font-bold font-heading text-foreground">Dashboard</h1>
          </div>
          <Link to="/test/mock"><Button size="sm"><Zap className="w-4 h-4 mr-1" /> New Test</Button></Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Overall Accuracy', value: `${accuracy}%`, icon: <Target className="w-5 h-5" />, color: 'text-primary' },
            { label: 'Tests Taken', value: String(attempts.length), icon: <BarChart3 className="w-5 h-5" />, color: 'text-secondary' },
            { label: 'Total Time', value: formatTime(totalTime), icon: <Clock className="w-5 h-5" />, color: 'text-accent' },
            { label: 'Weak Topics', value: String(weakTopics.filter((t) => t.accuracy < 50).length), icon: <TrendingDown className="w-5 h-5" />, color: 'text-destructive' },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className="bg-card rounded-2xl border border-border p-5"
            >
              <div className={`mb-2 ${s.color}`}>{s.icon}</div>
              <div className="text-2xl font-bold text-foreground">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Weak Topics */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Topic Performance</h2>
            {weakTopics.length === 0 ? (
              <p className="text-muted-foreground text-sm">Take a test to see your performance breakdown.</p>
            ) : (
              <div className="space-y-3">
                {weakTopics.map((t) => (
                  <div key={t.topic}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground font-medium">{t.topic}</span>
                      <span className={t.accuracy < 50 ? 'text-destructive' : 'text-success'}>{t.accuracy}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${t.accuracy < 50 ? 'bg-destructive' : t.accuracy < 75 ? 'bg-warning' : 'bg-success'}`}
                        style={{ width: `${t.accuracy}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Attempts */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Recent Attempts</h2>
            {recent.length === 0 ? (
              <p className="text-muted-foreground text-sm">No attempts yet. Start a test!</p>
            ) : (
              <div className="space-y-3">
                {recent.map((a) => (
                  <div key={a.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                    <div>
                      <div className="font-medium text-sm text-foreground">
                        {a.type === 'mock' ? 'Full Mock Test' : `${a.section ? a.section.charAt(0).toUpperCase() + a.section.slice(1) : ''} Practice`}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(a.date).toLocaleDateString()} • {formatTime(a.timeTaken)}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-foreground">{Math.round((a.correctAnswers / a.totalQuestions) * 100)}%</div>
                      <div className="text-xs text-muted-foreground">{a.correctAnswers}/{a.totalQuestions}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
