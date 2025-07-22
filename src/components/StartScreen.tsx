interface StartScreenProps {
  onStart: () => void;
}

export default function StartScreen({ onStart }: StartScreenProps) {
  return (
    <div className="min-h-[calc(100vh-60px)] bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-800 flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-12">
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 mb-4 tracking-tight">
            タイピング
          </h1>
          <h2 className="text-4xl font-bold text-white opacity-90">ゲーム</h2>
          <div className="absolute -top-2 -right-4 w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="absolute top-8 -left-6 w-3 h-3 bg-pink-400 rounded-full animate-bounce delay-300"></div>
        </div>

        <div className="space-y-6">
          <button
            onClick={onStart}
            className="group relative bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-bold py-4 px-12 rounded-xl text-xl transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-cyan-500/25"
          >
            <span className="relative z-10">START GAME</span>
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
          </button>

          <p className="text-gray-300 text-sm">
            Press{" "}
            <kbd className="px-2 py-1 bg-gray-700 rounded font-mono text-xs">
              SPACE
            </kbd>{" "}
            to begin
          </p>
        </div>
      </div>
    </div>
  );
}
