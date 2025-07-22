import type { Word } from "../data/words";

interface TypingScreenProps {
  currentWord: Word;
  currentIndex: number;
  totalWords: number;
  currentInput: string;
}

export default function TypingScreen({
  currentWord,
  currentIndex,
  totalWords,
  currentInput,
}: TypingScreenProps) {
  const progress = ((currentIndex + 1) / totalWords) * 100;

  return (
    <div className="min-h-[calc(100vh-60px)] bg-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
        {/* 進捗バー */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-3">
            <span className="text-cyan-400 font-semibold text-lg">
              問題 {currentIndex + 1}
            </span>
            <span className="text-purple-400 font-semibold text-lg">
              {totalWords} 問中
            </span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* 現在のワード表示（漢字） */}
        <div className="mb-6">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 shadow-2xl">
            <h2 className="text-5xl font-bold text-white mb-4 tracking-wide">
              {currentWord.display}
            </h2>
            <p className="text-2xl text-slate-300 font-light">
              {currentWord.reading}
            </p>
          </div>
        </div>

        {/* 入力エリア */}
        <div className="mb-8">
          <div className="bg-slate-800/70 backdrop-blur-sm border-2 border-cyan-500/30 rounded-xl p-6 text-left max-w-2xl mx-auto shadow-2xl">
            <div className="flex items-center">
              <span className="text-2xl font-mono text-cyan-400 mr-1">
                {currentInput}
              </span>
              <span className="text-2xl font-mono text-cyan-400 animate-pulse">
                |
              </span>
            </div>
            <div className="mt-2 text-sm text-slate-400">
              ローマ字で入力してください
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}