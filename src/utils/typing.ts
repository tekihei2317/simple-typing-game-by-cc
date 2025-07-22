import { Word } from "higgsino";

export class TypingWord {
  private word: Word;

  constructor(kanji: string, hiragana: string) {
    this.word = new Word(kanji, hiragana);
  }

  // キー入力を処理
  handleKeyInput(key: string): { isMiss: boolean; isFinish: boolean } {
    return this.word.typed(key);
  }

  // 現在の状態を取得
  getState() {
    return {
      example: this.word.example,
      kana: {
        all: this.word.kana.all,
        typed: this.word.kana.typed,
        untyped: this.word.kana.untyped,
      },
      roman: {
        all: this.word.roman.all,
        typed: this.word.roman.typed,
        untyped: this.word.roman.untyped,
      },
    };
  }

  // リセット
  reset() {
    // higgsinoのWordオブジェクトを再作成してリセット
    const state = this.getState();
    this.word = new Word(state.example, state.kana.all);
  }
}