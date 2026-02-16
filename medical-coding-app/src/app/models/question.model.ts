export interface Answer {
  id: string;
  text: string;
}

export interface Question {
  id: number;
  section: string;
  subsection: string;
  scenario: string;
  questionText: string;
  answers: Answer[];
  correctAnswerId: string;
  explanation: string;
  cptCode?: string;
}

export interface ExamSection {
  id: string;
  name: string;
  description: string;
  cptRange: string;
  icon: string;
  questionCount: number;
  totalPoolSize: number;
}

export interface ExamResult {
  sectionId: string;
  sectionName: string;
  totalQuestions: number;
  correctAnswers: number;
  score: number;
  questionResults: QuestionResult[];
}

export interface QuestionResult {
  question: Question;
  selectedAnswerId: string | null;
  isCorrect: boolean;
}
