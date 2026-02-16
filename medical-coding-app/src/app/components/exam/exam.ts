import { Component, inject, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { QuestionService } from '../../services/question';
import { Question, ExamResult, QuestionResult } from '../../models/question.model';

@Component({
  selector: 'app-exam',
  imports: [CommonModule],
  templateUrl: './exam.html',
  styleUrl: './exam.scss'
})
export class Exam implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private questionService = inject(QuestionService);

  sectionId = signal<string>('');
  sectionName = signal<string>('');
  questions = signal<Question[]>([]);
  currentQuestionIndex = signal<number>(0);
  selectedAnswers = signal<Map<number, string>>(new Map());
  isSubmitted = signal<boolean>(false);
  showConfirmDialog = signal<boolean>(false);
  showNewTestDialog = signal<boolean>(false);

  currentQuestion = computed(() => this.questions()[this.currentQuestionIndex()]);
  totalQuestions = computed(() => this.questions().length);
  progress = computed(() =>
    this.totalQuestions() > 0
      ? ((this.currentQuestionIndex() + 1) / this.totalQuestions()) * 100
      : 0
  );
  answeredCount = computed(() => this.selectedAnswers().size);
  allAnswered = computed(() => this.answeredCount() === this.totalQuestions());

  ngOnInit(): void {
    this.loadQuestions();
  }

  private loadQuestions(): void {
    const sectionId = this.route.snapshot.paramMap.get('sectionId') || '';
    this.sectionId.set(sectionId);

    if (sectionId === 'all') {
      this.sectionName.set('Full Exam - All Sections');
      this.questions.set(this.questionService.getRandomAllQuestions(5));
    } else {
      const section = this.questionService.getSection(sectionId);
      if (section) {
        this.sectionName.set(section.name);
        this.questions.set(this.questionService.getRandomQuestions(sectionId, 5));
      } else {
        this.router.navigate(['/']);
      }
    }
  }

  newTest(): void {
    if (this.answeredCount() > 0) {
      this.showNewTestDialog.set(true);
    } else {
      this.resetAndLoad();
    }
  }

  confirmNewTest(): void {
    this.showNewTestDialog.set(false);
    this.resetAndLoad();
  }

  cancelNewTest(): void {
    this.showNewTestDialog.set(false);
  }

  private resetAndLoad(): void {
    this.currentQuestionIndex.set(0);
    this.selectedAnswers.set(new Map());
    this.isSubmitted.set(false);
    this.showConfirmDialog.set(false);
    this.loadQuestions();
  }

  selectAnswer(questionId: number, answerId: string): void {
    if (this.isSubmitted()) return;
    const answers = new Map(this.selectedAnswers());
    answers.set(questionId, answerId);
    this.selectedAnswers.set(answers);
  }

  getSelectedAnswer(questionId: number): string | null {
    return this.selectedAnswers().get(questionId) || null;
  }

  isAnswerSelected(questionId: number, answerId: string): boolean {
    return this.selectedAnswers().get(questionId) === answerId;
  }

  goToQuestion(index: number): void {
    if (index >= 0 && index < this.totalQuestions()) {
      this.currentQuestionIndex.set(index);
    }
  }

  nextQuestion(): void {
    if (this.currentQuestionIndex() < this.totalQuestions() - 1) {
      this.currentQuestionIndex.update(i => i + 1);
    }
  }

  previousQuestion(): void {
    if (this.currentQuestionIndex() > 0) {
      this.currentQuestionIndex.update(i => i - 1);
    }
  }

  isQuestionAnswered(index: number): boolean {
    const question = this.questions()[index];
    return question ? this.selectedAnswers().has(question.id) : false;
  }

  confirmSubmit(): void {
    this.showConfirmDialog.set(true);
  }

  cancelSubmit(): void {
    this.showConfirmDialog.set(false);
  }

  submitExam(): void {
    this.showConfirmDialog.set(false);

    const questionResults: QuestionResult[] = this.questions().map(q => {
      const selectedId = this.selectedAnswers().get(q.id) || null;
      return {
        question: q,
        selectedAnswerId: selectedId,
        isCorrect: selectedId === q.correctAnswerId
      };
    });

    const correctCount = questionResults.filter(r => r.isCorrect).length;

    const result: ExamResult = {
      sectionId: this.sectionId(),
      sectionName: this.sectionName(),
      totalQuestions: this.totalQuestions(),
      correctAnswers: correctCount,
      score: Math.round((correctCount / this.totalQuestions()) * 100),
      questionResults
    };

    this.router.navigate(['/results'], { state: { result } });
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
