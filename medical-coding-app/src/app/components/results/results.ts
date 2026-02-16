import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ExamResult, QuestionResult } from '../../models/question.model';

@Component({
  selector: 'app-results',
  imports: [CommonModule],
  templateUrl: './results.html',
  styleUrl: './results.scss'
})
export class Results implements OnInit {
  private router = inject(Router);

  result = signal<ExamResult | null>(null);
  showExplanations = signal<Set<number>>(new Set());

  ngOnInit(): void {
    const state = history.state as { result?: ExamResult };

    if (state?.result) {
      this.result.set(state.result);
    } else {
      this.router.navigate(['/']);
    }
  }

  getScoreClass(): string {
    const score = this.result()?.score || 0;
    if (score >= 70) return 'passing';
    if (score >= 50) return 'borderline';
    return 'failing';
  }

  getScoreMessage(): string {
    const score = this.result()?.score || 0;
    if (score >= 70) return 'Congratulations! You passed!';
    if (score >= 50) return 'Almost there! Keep studying.';
    return 'Keep practicing. Review the explanations below.';
  }

  getScoreIcon(): string {
    const score = this.result()?.score || 0;
    if (score >= 70) return 'fa-circle-check';
    if (score >= 50) return 'fa-circle-minus';
    return 'fa-circle-xmark';
  }

  toggleExplanation(questionId: number): void {
    const current = new Set(this.showExplanations());
    if (current.has(questionId)) {
      current.delete(questionId);
    } else {
      current.add(questionId);
    }
    this.showExplanations.set(current);
  }

  isExplanationVisible(questionId: number): boolean {
    return this.showExplanations().has(questionId);
  }

  showAllExplanations(): void {
    if (!this.result()) return;
    const allIds = new Set(this.result()!.questionResults.map(qr => qr.question.id));
    this.showExplanations.set(allIds);
  }

  hideAllExplanations(): void {
    this.showExplanations.set(new Set());
  }

  getAnswerText(qr: QuestionResult, answerId: string): string {
    const answer = qr.question.answers.find(a => a.id === answerId);
    return answer ? answer.text : 'Not answered';
  }

  newTest(): void {
    const sectionId = this.result()?.sectionId;
    if (sectionId) {
      this.router.navigate(['/exam', sectionId]);
    } else {
      this.router.navigate(['/']);
    }
  }

  retakeExam(): void {
    const sectionId = this.result()?.sectionId;
    if (sectionId) {
      this.router.navigate(['/exam', sectionId]);
    } else {
      this.router.navigate(['/']);
    }
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
