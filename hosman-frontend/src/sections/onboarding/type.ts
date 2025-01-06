export interface QuestionTypes {
  key: string;
  inputType: string;
  label: string;
  required: boolean;
  options?: string[];
  isAnswered?: boolean;
}

export interface AnsweredQuestion {
  key: string;
  label: string;
  answer: string;
}

export interface Document {
  key?: string;
  name?: string;
  isThere?: boolean;
  docId?: string;
  label?: string;
  id?: string;
  createdAt?: string;
}

export interface InputFile {
  type: string;
  name: string;
  size: number;
}
