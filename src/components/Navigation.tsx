type GameState = "start" | "playing" | "result";

interface NavigationProps {
  currentState: GameState;
  onStateChange: (state: GameState) => void;
}

export default function Navigation({
  currentState,
  onStateChange,
}: NavigationProps) {
  return (
    <nav className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex space-x-2">
          <button
            onClick={() => onStateChange("start")}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              currentState === "start"
                ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg"
                : "text-slate-300 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            🎮 スタート
          </button>
          <button
            onClick={() => onStateChange("playing")}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              currentState === "playing"
                ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg"
                : "text-slate-300 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            ⌨️ タイピング
          </button>
          <button
            onClick={() => onStateChange("result")}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
              currentState === "result"
                ? "bg-gradient-to-r from-cyan-500 to-purple-500 text-white shadow-lg"
                : "text-slate-300 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            📊 結果
          </button>
        </div>
      </div>
    </nav>
  );
}
