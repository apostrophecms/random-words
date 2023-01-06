declare type WordsOptions = {
  min?: number;
  max?: number;
  exactly?: number;
  maxLength?: number;
  wordsPerString?: number;
  separator?: string;
  formatter?: (word: string, index: number) => string;
  seed?: string;
};

declare type JoinedWordsOptions = WordsOptions & { join: string; };

declare function words(count: number): string[];
declare function words(options: WordsOptions): string[];
declare function words(options: JoinedWordsOptions): string;

export const wordsList: string[];
export default words;
