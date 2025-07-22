import { useState } from "react";
import StartScreen from "./components/StartScreen";
import TypingScreen from "./components/TypingScreen";
import ResultScreen from "./components/ResultScreen";
import { words } from "./data/words";
import { useTypingGame } from "./hooks/useTypingGame";

type GameState = "start" | "playing" | "result";

function App() {
  const [viewState, setViewState] = useState<GameState>("start");
  const typingGame = useTypingGame(words.slice(0, 1));

  const handleStart = () => {
    typingGame.startGame();
    setViewState("playing");
  };

  const handleRetry = () => {
    typingGame.resetGame();
    setViewState("start");
  };

  // ゲーム状態と表示状態を同期
  const currentGameState = typingGame.isPlaying
    ? "playing"
    : typingGame.isFinished
      ? "result"
      : "start";

  const displayState =
    viewState === "start" && typingGame.isFinished
      ? "result"
      : currentGameState;

  return (
    <>
      {displayState === "start" && <StartScreen onStart={handleStart} />}

      {displayState === "playing" && (
        <TypingScreen
          currentWord={{
            display: typingGame.currentState.displayText,
            reading: typingGame.currentState.readingText,
          }}
          currentIndex={typingGame.currentWordIndex}
          totalWords={typingGame.totalWords}
          currentInput={typingGame.currentState.romanTyped}
        />
      )}

      {displayState === "result" && (
        <ResultScreen
          totalTime={typingGame.results.totalTime}
          accuracy={typingGame.results.accuracy}
          wpm={typingGame.results.wpm}
          onRetry={handleRetry}
        />
      )}
    </>
  );
}

export default App;
