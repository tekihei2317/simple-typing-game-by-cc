import { useState } from "react";
import StartScreen from "./components/StartScreen";
import TypingScreen from "./components/TypingScreen";
import ResultScreen from "./components/ResultScreen";
import Navigation from "./components/Navigation";
import { words } from "./data/words";

type GameState = "start" | "playing" | "result";

function App() {
  const [gameState, setGameState] = useState<GameState>("start");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentInput, setCurrentInput] = useState("");

  const handleStart = () => {
    setGameState("playing");
    setCurrentWordIndex(0);
    setCurrentInput("");
  };

  const handleRetry = () => {
    setGameState("start");
    setCurrentWordIndex(0);
    setCurrentInput("");
  };

  const handleStateChange = (state: GameState) => {
    setGameState(state);
    if (state === "start") {
      setCurrentWordIndex(0);
      setCurrentInput("");
    }
  };

  const currentWord = words[currentWordIndex];

  return (
    <>
      <Navigation currentState={gameState} onStateChange={handleStateChange} />
      
      {gameState === "start" && <StartScreen onStart={handleStart} />}
      
      {gameState === "playing" && (
        <TypingScreen
          currentWord={currentWord}
          currentIndex={currentWordIndex}
          totalWords={words.length}
          currentInput={currentInput}
        />
      )}
      
      {gameState === "result" && (
        <ResultScreen
          totalTime={120}
          accuracy={95.5}
          wpm={45}
          onRetry={handleRetry}
        />
      )}
    </>
  );
}

export default App;
