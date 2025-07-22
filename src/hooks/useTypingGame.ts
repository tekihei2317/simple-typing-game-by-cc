import { useState, useEffect, useCallback } from "react";
import { Word } from "higgsino";
import type { Word as WordData } from "../data/words";

interface TypingStats {
  startTime: number | null;
  endTime: number | null;
  totalKeystrokes: number;
  correctKeystrokes: number;
  errors: number;
}

interface GameState {
  currentWordIndex: number;
  isPlaying: boolean;
  isFinished: boolean;
  currentWord: Word | null;
  stats: TypingStats;
}

export function useTypingGame(words: WordData[]) {
  const [gameState, setGameState] = useState<GameState>({
    currentWordIndex: 0,
    isPlaying: false,
    isFinished: false,
    currentWord: null,
    stats: {
      startTime: null,
      endTime: null,
      totalKeystrokes: 0,
      correctKeystrokes: 0,
      errors: 0,
    },
  });

  // 現在の単語データ
  const currentWordData = words[gameState.currentWordIndex];

  // ゲーム開始
  const startGame = useCallback(() => {
    const firstWord = new Word(words[0].display, words[0].reading);
    setGameState({
      currentWordIndex: 0,
      isPlaying: true,
      isFinished: false,
      currentWord: firstWord,
      stats: {
        startTime: Date.now(),
        endTime: null,
        totalKeystrokes: 0,
        correctKeystrokes: 0,
        errors: 0,
      },
    });
  }, [words]);

  // ゲームリセット
  const resetGame = useCallback(() => {
    setGameState({
      currentWordIndex: 0,
      isPlaying: false,
      isFinished: false,
      currentWord: null,
      stats: {
        startTime: null,
        endTime: null,
        totalKeystrokes: 0,
        correctKeystrokes: 0,
        errors: 0,
      },
    });
  }, []);

  // 次の単語に進む
  const nextWord = useCallback(() => {
    const nextIndex = gameState.currentWordIndex + 1;

    if (nextIndex >= words.length) {
      // ゲーム終了
      setGameState((prev) => ({
        ...prev,
        isPlaying: false,
        isFinished: true,
        stats: {
          ...prev.stats,
          endTime: Date.now(),
        },
      }));
    } else {
      // 次の単語
      const nextWordData = words[nextIndex];
      const nextWord = new Word(nextWordData.display, nextWordData.reading);

      setGameState((prev) => ({
        ...prev,
        currentWordIndex: nextIndex,
        currentWord: nextWord,
      }));
    }
  }, [gameState.currentWordIndex, words]);

  // キー入力処理
  const handleKeyInput = useCallback(
    (key: string) => {
      if (!gameState.isPlaying || !gameState.currentWord) {
        return;
      }

      const result = gameState.currentWord.typed(key);

      setGameState((prev) => ({
        ...prev,
        stats: {
          ...prev.stats,
          totalKeystrokes: prev.stats.totalKeystrokes + 1,
          correctKeystrokes: result.isMiss
            ? prev.stats.correctKeystrokes
            : prev.stats.correctKeystrokes + 1,
          errors: result.isMiss ? prev.stats.errors + 1 : prev.stats.errors,
        },
      }));

      // 単語完了チェック
      if (result.isFinish) {
        nextWord();
      }

      return result;
    },
    [gameState.isPlaying, gameState.currentWord, nextWord]
  );

  // キーボードイベントリスナー
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Spaceキーでゲーム開始（スタート画面の場合）
      if (
        event.code === "Space" &&
        !gameState.isPlaying &&
        !gameState.isFinished
      ) {
        event.preventDefault();
        startGame();
        return;
      }

      // ゲーム中のみキー入力を処理
      if (gameState.isPlaying && gameState.currentWord) {
        // 特殊キーは無視
        if (event.key.length > 1) {
          return;
        }

        event.preventDefault();
        handleKeyInput(event.key);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    gameState.isPlaying,
    gameState.isFinished,
    gameState.currentWord,
    startGame,
    handleKeyInput,
  ]);

  // 現在の入力状態を取得
  const getCurrentState = useCallback(() => {
    if (!gameState.currentWord) {
      return {
        romanTyped: "",
        romanUntyped: "",
        kanaTyped: "",
        kanaUntyped: "",
        displayText: currentWordData?.display || "",
        readingText: currentWordData?.reading || "",
      };
    }

    return {
      romanTyped: gameState.currentWord.roman.typed,
      romanUntyped: gameState.currentWord.roman.untyped,
      kanaTyped: gameState.currentWord.kana.typed,
      kanaUntyped: gameState.currentWord.kana.untyped,
      displayText: gameState.currentWord.example,
      readingText: gameState.currentWord.kana.all,
    };
  }, [gameState.currentWord, currentWordData]);

  // 結果計算
  const getResults = useCallback(() => {
    const { stats } = gameState;

    if (!stats.startTime || !stats.endTime) {
      return {
        totalTime: 0,
        accuracy: 0,
        wpm: 0,
      };
    }

    const totalTime = (stats.endTime - stats.startTime) / 1000; // 秒
    const accuracy =
      stats.totalKeystrokes > 0
        ? (stats.correctKeystrokes / stats.totalKeystrokes) * 100
        : 0;

    // WPM計算
    const wpm =
      totalTime > 0
        ? Math.round((stats.correctKeystrokes / totalTime) * 60)
        : 0;

    return {
      totalTime,
      accuracy,
      wpm,
    };
  }, [gameState.stats, words]);

  return {
    // ゲーム状態
    isPlaying: gameState.isPlaying,
    isFinished: gameState.isFinished,
    currentWordIndex: gameState.currentWordIndex,
    totalWords: words.length,

    // 現在の状態
    currentState: getCurrentState(),

    // 結果
    results: getResults(),

    // アクション
    startGame,
    resetGame,
  };
}
