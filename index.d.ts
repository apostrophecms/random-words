export interface IRandomWordsOptions {
  min?: number;
  max?: number;
  exactly?: number;
  join?: string;
  wordsPerString?: number;
  separator?: string;
  formatter?: (string) => string;
}

declare function words(options: IRandomWordsOptions): string | Array<string>;
export = words;
