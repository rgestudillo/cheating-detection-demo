export interface MultipleChoice {
  question: string;
  choices: [string, string, string, string];
  answer: 'a' | 'b' | 'c' | 'd';
}

