interface ResultScreenProps {
  totalTime: number;
  accuracy: number;
  wpm: number;
  onRetry: () => void;
}

export default function ResultScreen({
  totalTime,
  accuracy,
  wpm,
  onRetry,
}: ResultScreenProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const getScoreColor = (accuracy: number) => {
    if (accuracy >= 95) return "from-green-400 to-emerald-500";
    if (accuracy >= 85) return "from-blue-400 to-cyan-500";
    if (accuracy >= 75) return "from-yellow-400 to-orange-500";
    return "from-red-400 to-pink-500";
  };

  const getScoreMessage = (accuracy: number) => {
    if (accuracy >= 95) return "素晴らしい！";
    if (accuracy >= 85) return "よくできました！";
    if (accuracy >= 75) return "がんばりました！";
    return "練習あるのみ！";
  };

  return (
    <div className="min-h-[calc(100vh-60px)] bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"></div>
      </div>

      <div className="max-w-lg mx-auto text-center px-6 relative z-10">
        {/* Title with animation */}
        <div className="mb-12">
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 mb-4 animate-pulse">
            RESULT
          </h1>
          <p className={`text-2xl font-bold bg-gradient-to-r ${getScoreColor(accuracy)} bg-clip-text text-transparent`}>
            {getScoreMessage(accuracy)}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="space-y-6 mb-12">
          <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-slate-300 text-lg">タイピング時間</p>
                <p className="text-3xl font-bold text-white">
                  {formatTime(totalTime)}
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                <span className="text-2xl">⏱️</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-slate-300 text-lg">正解率</p>
                <p className={`text-3xl font-bold bg-gradient-to-r ${getScoreColor(accuracy)} bg-clip-text text-transparent`}>
                  {accuracy.toFixed(1)}%
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-sm rounded-2xl p-6 border border-slate-600/30 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-slate-300 text-lg">タイピング速度</p>
                <p className="text-3xl font-bold text-purple-400">
                  {wpm} <span className="text-lg">WPM</span>
                </p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
            </div>
          </div>
        </div>

        {/* Retry Button */}
        <button
          onClick={onRetry}
          className="group relative bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white font-bold py-4 px-12 rounded-xl text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25 w-full"
        >
          <span className="relative z-10 flex items-center justify-center">
            <span className="mr-2">🔄</span>
            もう一度プレイ
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
        </button>
      </div>
    </div>
  );
}