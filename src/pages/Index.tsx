import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, BookOpen, Code2, BarChart3, Target, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { sectionInfo, type Section } from '@/data/questions';

const sectionIcons: Record<Section, React.ReactNode> = {
  aptitude: <Target className="w-8 h-8" />,
  reasoning: <Brain className="w-8 h-8" />,
  verbal: <BookOpen className="w-8 h-8" />,
  coding: <Code2 className="w-8 h-8" />,
};

const sectionColors: Record<Section, string> = {
  aptitude: 'bg-aptitude/10 text-aptitude border-aptitude/20',
  reasoning: 'bg-reasoning/10 text-reasoning border-reasoning/20',
  verbal: 'bg-verbal/10 text-verbal border-verbal/20',
  coding: 'bg-coding/10 text-coding border-coding/20',
};

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground font-heading">NQT Cracker Pro</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <BarChart3 className="w-4 h-4 mr-1" /> Dashboard
              </Button>
            </Link>
            <Link to="/test/mock">
              <Button size="sm">Start Mock Test</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-5xl md:text-7xl font-bold font-heading mb-6 text-foreground leading-tight">
            Crack <span className="text-gradient">TCS NQT</span> Prime
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Realistic mock tests, section-wise practice, and performance analytics to ace your TCS NQT exam.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/test/mock">
              <Button size="lg" className="text-lg px-8 py-6">
                Start Full Mock Test <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/practice">
              <Button variant="outline" size="lg" className="text-lg px-8 py-6">
                Section-wise Practice
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="grid grid-cols-3 gap-6 max-w-lg mx-auto mt-16"
        >
          {[
            { label: 'Questions', value: '50+' },
            { label: 'Mock Tests', value: 'Unlimited' },
            { label: 'Sections', value: '4' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-3xl font-bold text-foreground">{s.value}</div>
              <div className="text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Sections */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 font-heading text-foreground">Exam Sections</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(Object.keys(sectionInfo) as Section[]).map((key, i) => {
            const info = sectionInfo[key];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
              >
                <Link to={`/practice/${key}`}>
                  <div className={`p-6 rounded-2xl border-2 card-hover cursor-pointer ${sectionColors[key]}`}>
                    <div className="mb-4">{sectionIcons[key]}</div>
                    <h3 className="text-xl font-bold mb-2">{info.label}</h3>
                    <div className="flex items-center gap-3 text-sm opacity-80 mb-3">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{info.time} min</span>
                      <span>{info.questionCount} Qs</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {info.topics.slice(0, 4).map((t) => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-background/50">{t}</span>
                      ))}
                      {info.topics.length > 4 && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-background/50">+{info.topics.length - 4}</span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        NQT Cracker Pro — Your path to TCS NQT success
      </footer>
    </div>
  );
}
