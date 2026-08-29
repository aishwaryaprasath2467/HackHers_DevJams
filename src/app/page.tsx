'use client';

import React, { useState } from 'react';
import { 
  BookOpen, 
  BrainCircuit, 
  CheckCircle2, 
  Flame, 
  LayoutDashboard, 
  MessageSquare, 
  Send, 
  Sparkles, 
  Target, 
  Trophy, 
  UploadCloud, 
  AlertCircle 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'study' | 'chat' | 'roadmap'>('dashboard');

  // 1. Adaptive Tasks State
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Revise Binary Search Trees', duration: '15 mins', reason: 'Weak area detected in Quiz #1', done: false, type: 'Revision' },
    { id: 2, title: 'Practice 3 Dynamic Programming problems', duration: '30 mins', reason: 'Decay alert: Not practiced in 5 days', done: false, type: 'Practice' },
    { id: 3, title: 'Read Chapter 4: Virtual Memory', duration: '20 mins', reason: 'Required for tomorrow’s OS lecture', done: true, type: 'Reading' },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.8 } });
  };

  // 2. Interactive Quiz State
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizFinished, setQuizFinished] = useState(false);

  const quizQuestions = [
    {
      question: 'What is the time complexity of searching in a Balanced Binary Search Tree?',
      options: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
      correct: 2,
      explanation: 'In a balanced BST, each comparison cuts the search space in half, giving O(log n) time complexity.',
    },
    {
      question: 'Which CPU scheduling algorithm gives the minimum average waiting time?',
      options: ['First-Come, First-Served (FCFS)', 'Shortest Job First (SJF)', 'Round Robin (RR)', 'Priority Scheduling'],
      correct: 1,
      explanation: 'SJF is proven to be optimal in giving the lowest average waiting time for a given set of processes.',
    },
    {
      question: 'What is the primary role of an Activation Function in Neural Networks?',
      options: ['Speed up training', 'Introduce non-linearity', 'Normalize the inputs', 'Prevent overfitting'],
      correct: 1,
      explanation: 'Without non-linear activation functions, a multi-layer neural network collapses into a simple linear model.',
    }
  ];

  const handleAnswer = (optionIdx: number) => {
    setSelectedOption(optionIdx);
    if (optionIdx === quizQuestions[currentQ].correct) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ < quizQuestions.length - 1) {
      setCurrentQ(currentQ + 1);
      setSelectedOption(null);
    } else {
      setQuizFinished(true);
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } });
    }
  };

  // 3. AI Doubt Chat State
  const [messages, setMessages] = useState([
    { sender: 'ai', text: '👋 Hi Alex! I am your AI study companion. Ask me any doubt or upload a picture of a problem!' }
  ]);
  const [chatInput, setChatInput] = useState('');

  const sendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setMessages(prev => [...prev, { sender: 'user', text: userText }]);
    setChatInput('');

    // Simulated Smart AI Response
    setTimeout(() => {
      setMessages(prev => [
        ...prev, 
        { 
          sender: 'ai', 
          text: `Great question! Here is the concept broken down: When dealing with "${userText}", think of it step-by-step. I have also added a quick 5-minute practice task to your Adaptive Plan to solidify this!` 
        }
      ]);
    }, 800);
  };

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans overflow-hidden">
      
      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/60 backdrop-blur-md p-5 flex flex-col justify-between">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/30">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">CogniFlow</h1>
              <p className="text-xs text-slate-400">Autonomous Learning OS</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab('dashboard')} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${activeTab === 'dashboard' ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'}`}>
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </button>

            <button 
              onClick={() => setActiveTab('study')} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${activeTab === 'study' ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'}`}>
              <BookOpen className="w-4 h-4" /> Notes & AI Quizzes
            </button>

            <button 
              onClick={() => setActiveTab('chat')} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${activeTab === 'chat' ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'}`}>
              <MessageSquare className="w-4 h-4" /> AI Doubt Solver
            </button>

            <button 
              onClick={() => setActiveTab('roadmap')} 
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${activeTab === 'roadmap' ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'}`}>
              <Target className="w-4 h-4" /> Career Roadmap
            </button>
          </nav>
        </div>

        {/* User Card */}
        <div className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/50 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white">
            A
          </div>
          <div className="text-xs">
            <p className="font-semibold text-slate-200">Alex Chen</p>
            <p className="text-indigo-400 flex items-center gap-1"><Flame className="w-3 h-3 text-orange-400" /> 7 Day Streak</p>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto p-8">

        {/* 1. DASHBOARD VIEW */}
        {activeTab === 'dashboard' && (
          <div className="max-w-5xl mx-auto space-y-6">
            
            {/* Header Banner */}
            <div className="bg-gradient-to-r from-indigo-900/50 via-purple-900/30 to-slate-900 border border-indigo-500/20 rounded-2xl p-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-white">Welcome back, Alex! 👋</h2>
                <p className="text-sm text-slate-400 mt-1">Your AI engine adapted today’s study plan based on your recent quiz scores.</p>
              </div>
              <div className="flex gap-4">
                <div className="bg-slate-800/80 border border-slate-700 px-4 py-2 rounded-xl text-center">
                  <p className="text-xs text-slate-400">Target Career</p>
                  <p className="font-bold text-sm text-indigo-300">AI / ML Engineer</p>
                </div>
                <div className="bg-slate-800/80 border border-slate-700 px-4 py-2 rounded-xl text-center">
                  <p className="text-xs text-slate-400">Readiness</p>
                  <p className="font-bold text-sm text-emerald-400">68% Match</p>
                </div>
              </div>
            </div>

            {/* Grid Layout: Adaptive Tasks & Weak Areas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Adaptive Tasks List */}
              <div className="md:col-span-2 bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-slate-100 flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-indigo-400" /> Today’s Adaptive Tasks
                    </h3>
                    <p className="text-xs text-slate-400">Dynamically generated to target memory decay & weak spots</p>
                  </div>
                  <span className="text-xs bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-3 py-1 rounded-full font-medium">
                    {tasks.filter(t => t.done).length} / {tasks.length} Completed
                  </span>
                </div>

                <div className="space-y-3">
                  {tasks.map(task => (
                    <div 
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      className={`cursor-pointer p-4 rounded-xl border transition flex items-center justify-between ${
                        task.done 
                          ? 'bg-slate-900/30 border-slate-800/50 opacity-60' 
                          : 'bg-slate-800/40 border-slate-700/60 hover:border-indigo-500/50 hover:bg-slate-800/70'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className={`w-5 h-5 ${task.done ? 'text-emerald-400' : 'text-slate-600'}`} />
                        <div>
                          <p className={`text-sm font-medium ${task.done ? 'line-through text-slate-400' : 'text-slate-200'}`}>
                            {task.title}
                          </p>
                          <p className="text-xs text-indigo-400/80 flex items-center gap-1 mt-0.5">
                            <AlertCircle className="w-3 h-3" /> {task.reason}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded-md border border-slate-700">
                        {task.duration}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weak Area Detection Card */}
              <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 space-y-4">
                <h3 className="font-bold text-lg text-slate-100 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-400" /> Weak Area Radar
                </h3>
                <p className="text-xs text-slate-400">Based on recent performance analytics:</p>

                <div className="space-y-3 pt-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">Binary Search Trees</span>
                      <span className="text-red-400 font-bold">42% (Needs Revision)</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-red-500 h-full rounded-full" style={{ width: '42%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">OS - Virtual Memory</span>
                      <span className="text-amber-400 font-bold">58% (Moderate)</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: '58%' }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300">Linear Algebra</span>
                      <span className="text-emerald-400 font-bold">89% (Mastered)</span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full rounded-full" style={{ width: '89%' }} />
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setActiveTab('study')}
                  className="w-full mt-4 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs py-2.5 rounded-xl font-medium transition"
                >
                  Generate Practice Quiz for Weak Areas →
                </button>
              </div>

            </div>
          </div>
        )}

        {/* 2. STUDY & QUIZ VIEW */}
        {activeTab === 'study' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Smart Notes & AI Quizzes</h2>
              <p className="text-sm text-slate-400">Upload lecture PDFs or notes. AI will extract core concepts and test your retention.</p>
            </div>

            {!quizStarted ? (
              <div className="space-y-6">
                {/* Upload Dropzone */}
                <div className="border-2 border-dashed border-slate-700 hover:border-indigo-500/60 bg-slate-900/40 rounded-2xl p-10 text-center transition cursor-pointer">
                  <div className="w-14 h-14 bg-indigo-600/20 text-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-indigo-500/30">
                    <UploadCloud className="w-7 h-7" />
                  </div>
                  <h3 className="font-semibold text-slate-200">Drag and drop your PDF or Lecture Slides</h3>
                  <p className="text-xs text-slate-400 mt-1">Supports PDF, DOCX, TXT (Up to 25MB)</p>
                  <button 
                    onClick={() => setQuizStarted(true)} 
                    className="mt-6 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-6 py-2.5 rounded-xl shadow-lg shadow-indigo-600/30 transition"
                  >
                    Use Sample "Data Structures & OS" Notes
                  </button>
                </div>
              </div>
            ) : !quizFinished ? (
              /* Active Quiz Screen */
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-8 space-y-6">
                <div className="flex justify-between items-center border-b border-slate-800 pb-4">
                  <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">
                    Question {currentQ + 1} of {quizQuestions.length}
                  </span>
                  <span className="text-xs bg-slate-800 px-3 py-1 rounded-full text-slate-300">
                    Current Score: {score}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-100">
                  {quizQuestions[currentQ].question}
                </h3>

                {/* Options */}
                <div className="space-y-3">
                  {quizQuestions[currentQ].options.map((opt, idx) => {
                    const isSelected = selectedOption === idx;
                    const isCorrect = idx === quizQuestions[currentQ].correct;
                    let optionStyle = 'bg-slate-800/40 border-slate-700/60 text-slate-300 hover:bg-slate-800';

                    if (selectedOption !== null) {
                      if (isCorrect) optionStyle = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300';
                      else if (isSelected) optionStyle = 'bg-red-500/20 border-red-500/50 text-red-300';
                    }

                    return (
                      <button
                        key={idx}
                        disabled={selectedOption !== null}
                        onClick={() => handleAnswer(idx)}
                        className={`w-full text-left p-4 rounded-xl border font-medium text-sm transition ${optionStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                {selectedOption !== null && (
                  <div className="bg-slate-800/60 border border-slate-700 p-4 rounded-xl text-xs text-slate-300 space-y-1">
                    <p className="font-bold text-indigo-400">💡 Explanation:</p>
                    <p>{quizQuestions[currentQ].explanation}</p>
                  </div>
                )}

                {/* Next Button */}
                {selectedOption !== null && (
                  <button
                    onClick={nextQuestion}
                    className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl transition"
                  >
                    {currentQ < quizQuestions.length - 1 ? 'Next Question →' : 'See Results 🏆'}
                  </button>
                )}
              </div>
            ) : (
              /* Quiz Finished Screen */
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-10 text-center space-y-4">
                <div className="w-16 h-16 bg-amber-500/20 text-amber-400 rounded-full flex items-center justify-center mx-auto border border-amber-500/30">
                  <Trophy className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Quiz Completed!</h3>
                <p className="text-slate-400 text-sm">
                  You scored <span className="text-emerald-400 font-bold text-lg">{score}</span> out of {quizQuestions.length}
                </p>
                <div className="pt-4 flex justify-center gap-4">
                  <button
                    onClick={() => { setQuizStarted(false); setQuizFinished(false); setCurrentQ(0); setScore(0); setSelectedOption(null); }}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-6 py-2.5 rounded-xl text-sm font-medium transition"
                  >
                    Try Another PDF
                  </button>
                  <button
                    onClick={() => setActiveTab('dashboard')}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition"
                  >
                    Update My Adaptive Plan
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 3. AI DOUBT SOLVER CHAT */}
        {activeTab === 'chat' && (
          <div className="max-w-3xl mx-auto h-[600px] flex flex-col bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="font-bold text-sm text-slate-200">AI Instant Doubt Solver</h3>
              </div>
              <span className="text-xs text-slate-400">Powered by Gemini 2.5</span>
            </div>

            {/* Chat message history */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4">
              {messages.map((m, idx) => (
                <div key={idx} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-md p-4 rounded-2xl text-sm leading-relaxed ${
                    m.sender === 'user' 
                      ? 'bg-indigo-600 text-white rounded-br-none' 
                      : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700/60'
                  }`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <form onSubmit={sendChatMessage} className="p-4 border-t border-slate-800 bg-slate-900/80 flex gap-3">
              <input
                type="text"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                placeholder="Ask any question (e.g. Explain how Dijkstra algorithm works)..."
                className="flex-1 bg-slate-800/80 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
              <button 
                type="submit" 
                className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 rounded-xl flex items-center justify-center transition shadow-lg shadow-indigo-600/30"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* 4. CAREER ROADMAP VIEW */}
        {activeTab === 'roadmap' && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex justify-between items-end">
              <div>
                <h2 className="text-2xl font-bold text-white">Career GPS & Skill Gap</h2>
                <p className="text-sm text-slate-400">Your personalized roadmap to become a full-time <b>AI / ML Engineer</b>.</p>
              </div>
              <span className="text-xs bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-3 py-1.5 rounded-xl font-medium">
                4 / 6 Milestones Completed
              </span>
            </div>

            <div className="space-y-4 relative before:absolute before:inset-0 before:left-6 before:w-0.5 before:bg-slate-800">
              
              {[
                { title: '1. Python & Linear Algebra Foundations', status: 'Completed', color: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/30' },
                { title: '2. Data Structures & Algorithm Mastery', status: 'In Progress (80%)', color: 'text-indigo-400 bg-indigo-500/20 border-indigo-500/30' },
                { title: '3. Machine Learning Core (Scikit-Learn, Regression, Trees)', status: 'In Progress (45%)', color: 'text-amber-400 bg-amber-500/20 border-amber-500/30' },
                { title: '4. Deep Learning & PyTorch Essentials', status: 'Locked (Requires Milestone 3)', color: 'text-slate-500 bg-slate-800 border-slate-700' },
                { title: '5. LLMs, Prompt Engineering & RAG Systems', status: 'Locked', color: 'text-slate-500 bg-slate-800 border-slate-700' },
              ].map((step, idx) => (
                <div key={idx} className="relative flex items-start gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800 ml-12">
                  <div className="absolute -left-12 top-4 w-6 h-6 rounded-full bg-slate-900 border-2 border-indigo-500 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-200 text-sm">{step.title}</h4>
                    <span className={`inline-block text-xs mt-1 px-2.5 py-0.5 rounded-md border font-medium ${step.color}`}>
                      {step.status}
                    </span>
                  </div>
                </div>
              ))}

            </div>
          </div>
        )}

      </main>

    </div>
  );
}