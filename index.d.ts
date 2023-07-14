declare type GenerateOptions = {
  min?: number;
  max?: number;
  exactly?: number;
  minLength?: number;
  maxLength?: number;
  wordsPerString?: number;
  separator?: string;
  formatter?: (word: string, index: number) => string;
  seed?: string;
};

declare type JoinedWordsOptions = GenerateOptions & { join: string };

declare function generate(count?: number): string[];
declare function generate(options: GenerateOptions): string[];
declare function generate(options: JoinedWordsOptions): string;

declare const wordsList: string[];

declare type CountOptions = {
  minLength?: number;
  maxLength?: number;
};

declare function count(options?: CountOptions): number;

declare function generateRandomWordStartingWith(
	startingLetter: string | null
): string | null;

export { generate, count, wordsList, generateRandomWordStartingWith };
