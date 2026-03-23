import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Target, Brain, BookOpen, Code2, Clock } from 'lucide-react';
import { sectionInfo, type Section } from '@/data/questions';
import { Button } from '@/components/ui/button';

const sectionIcons: Record<Section, React.ReactNode> = {
  aptitude: <Target className="w-10 h-10" />,
  reasoning: <Brain className="w-10 h-10" />,
  verbal: <BookOpen className="w-10 h-10" />,
  coding: <Code2 className="w-10 h-10" />,
};

const sectionBg: Record<Section, string> = {
  aptitude: 'bg-aptitude/10 border-aptitude/20 hover:border-aptitude/40',
  reasoning: 'bg-reasoning/10 border-reasoning/20 hover:border-reasoning/40',
  verbal: 'bg-verbal/10 border-verbal/20 hover:border-verbal/40',
  coding: 'bg-coding/10 border-coding/20 hover:border-coding/40',
};

const sectionText: Record<Section, string> = {
  aptitude: 'text-aptitude',
  reasoning: 'text-reasoning',
  verbal: 'text-verbal',
  coding: 'text-coding',
};

export default function Practice() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back
          </Button>
        </Link>
        <h1 className="text-3xl font-bold font-heading mb-8 text-foreground">Section-wise Practice</h1>
        <div className="grid md:grid-cols-2 gap-6">
          {(Object.keys(sectionInfo) as Section[]).map((key, i) => {
            const info = sectionInfo[key];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
              >
                <Link to={`/practice/${key}`}>
                  <div className={`p-8 rounded-2xl border-2 transition-all card-hover ${sectionBg[key]}`}>
                    <div className={`mb-4 ${sectionText[key]}`}>{sectionIcons[key]}</div>
                    <h2 className={`text-2xl font-bold mb-2 ${sectionText[key]}`}>{info.label}</h2>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {info.time} min</span>
                      <span>{info.questionCount} questions</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {info.topics.map((t) => (
                        <span key={t} className="text-xs px-3 py-1 rounded-full bg-background/60 text-foreground/70">{t}</span>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
