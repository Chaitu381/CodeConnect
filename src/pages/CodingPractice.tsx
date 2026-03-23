import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Play, Send, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { codingQuestions, type CodingQuestion } from '@/data/questions';
import Editor from '@monaco-editor/react';

const LANGUAGES = ['python', 'java', 'cpp', 'c'] as const;
type Lang = typeof LANGUAGES[number];

const langLabels: Record<Lang, string> = { python: 'Python', java: 'Java', cpp: 'C++', c: 'C' };

export default function CodingPractice() {
  const [selectedQ, setSelectedQ] = useState<CodingQuestion>(codingQuestions[0]);
  const [language, setLanguage] = useState<Lang>('python');
  const [code, setCode] = useState(selectedQ.starterCode.python);
  const [output, setOutput] = useState<string>('');

  const handleLanguageChange = (lang: Lang) => {
    setLanguage(lang);
    setCode(selectedQ.starterCode[lang] || '');
  };

  const handleQuestionChange = (q: CodingQuestion) => {
    setSelectedQ(q);
    setCode(q.starterCode[language] || '');
    setOutput('');
  };

  const handleRun = () => {
    setOutput('⚠️ Code execution requires a backend. This is a UI preview.\n\nYour code:\n' + code.slice(0, 200) + '...');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/practice"><Button variant="ghost" size="sm"><ArrowLeft className="w-4 h-4 mr-1" /> Back</Button></Link>
          <span className="font-bold text-foreground">Coding Practice</span>
        </div>
        <div className="flex gap-2">
          {LANGUAGES.map((l) => (
            <button
              key={l}
              onClick={() => handleLanguageChange(l)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                language === l ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {langLabels[l]}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Problem */}
        <div className="lg:w-[45%] border-r border-border overflow-auto p-6">
          {/* Question selector */}
          <div className="flex gap-2 mb-6">
            {codingQuestions.map((q) => (
              <button
                key={q.id}
                onClick={() => handleQuestionChange(q)}
                className={`px-3 py-1.5 text-xs rounded-lg font-medium transition-colors ${
                  selectedQ.id === q.id ? 'bg-coding text-primary-foreground' : 'bg-muted text-muted-foreground'
                }`}
              >
                {q.question.slice(0, 25)}...
              </button>
            ))}
          </div>

          <div className={`inline-block text-xs font-medium px-2 py-1 rounded-full mb-3 ${
            selectedQ.difficulty === 'easy' ? 'bg-success/10 text-success' :
            selectedQ.difficulty === 'medium' ? 'bg-warning/10 text-warning' : 'bg-destructive/10 text-destructive'
          }`}>
            {selectedQ.difficulty}
          </div>
          <h2 className="text-xl font-bold text-foreground mb-3">{selectedQ.question}</h2>
          <p className="text-muted-foreground mb-4">{selectedQ.description}</p>
          <h3 className="font-semibold text-foreground mb-2 text-sm">Examples:</h3>
          {selectedQ.examples.map((ex, i) => (
            <div key={i} className="bg-muted rounded-xl p-3 mb-3 font-mono text-sm">
              <div><span className="text-muted-foreground">Input: </span><span className="text-foreground">{ex.input}</span></div>
              <div><span className="text-muted-foreground">Output: </span><span className="text-foreground">{ex.output}</span></div>
            </div>
          ))}
        </div>

        {/* Editor */}
        <div className="lg:w-[55%] flex flex-col">
          <div className="flex-1 min-h-[300px]">
            <Editor
              height="100%"
              language={language === 'cpp' ? 'cpp' : language === 'c' ? 'c' : language}
              value={code}
              onChange={(val) => setCode(val || '')}
              theme="vs-dark"
              options={{ fontSize: 14, minimap: { enabled: false }, scrollBeyondLastLine: false, padding: { top: 16 } }}
            />
          </div>

          {/* Actions + Output */}
          <div className="border-t border-border">
            <div className="flex gap-2 p-3">
              <Button variant="outline" size="sm" onClick={handleRun}>
                <Play className="w-4 h-4 mr-1" /> Run
              </Button>
              <Button size="sm" onClick={handleRun}>
                <Send className="w-4 h-4 mr-1" /> Submit
              </Button>
            </div>
            {output && (
              <div className="bg-muted p-4 font-mono text-sm text-muted-foreground max-h-48 overflow-auto whitespace-pre-wrap">
                {output}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
