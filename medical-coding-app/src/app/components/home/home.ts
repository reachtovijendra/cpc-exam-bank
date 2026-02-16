import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '../../services/question';
import { ExamSection } from '../../models/question.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  private router = inject(Router);
  private questionService = inject(QuestionService);

  sections: ExamSection[] = this.questionService.getSections();

  startExam(sectionId: string): void {
    this.router.navigate(['/exam', sectionId]);
  }

  startFullExam(): void {
    this.router.navigate(['/exam', 'all']);
  }

  getSectionIcon(icon: string): string {
    const icons: Record<string, string> = {
      'anatomy': 'fa-lungs',
      'terminology': 'fa-spell-check'
    };
    return icons[icon] || 'fa-stethoscope';
  }
}
