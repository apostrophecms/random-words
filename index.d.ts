declare module 'random-words' {
    export interface IRandomWordsOptions {
      min?: number;
      max?: number;
      exactly?: number;
      join?: string;
      wordsPerString?: number;
      separator?: string;
      formatter?: (string) => string;
    }
    export default function words(options: IRandomWordsOptions): string | Array<string>;
  }
  