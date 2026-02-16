import { Injectable } from '@angular/core';
import { Question, ExamSection } from '../models/question.model';
import anatomyData from '../data/anatomy-questions.json';
import terminologyData from '../data/terminology-questions.json';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private sections: ExamSection[] = [
    {
      id: 'anatomy',
      name: 'Anatomy',
      description: 'Human anatomy knowledge essential for CPC certification including organ systems, body planes, anatomical structures, and surgical anatomy relevant to medical coding',
      cptRange: 'CPC Domain',
      icon: 'anatomy',
      questionCount: 10,
      totalPoolSize: 200
    },
    {
      id: 'medical-terminology',
      name: 'Medical Terminology',
      description: 'Medical prefixes, suffixes, root words, abbreviations, and clinical terminology required for accurate code assignment on the CPC exam',
      cptRange: 'CPC Domain',
      icon: 'terminology',
      questionCount: 10,
      totalPoolSize: 200
    }
  ];

  private questions: Question[] = [
    ...(anatomyData as Question[]),
    ...(terminologyData as Question[])
  ];

  getSections(): ExamSection[] {
    return this.sections;
  }

  getSection(sectionId: string): ExamSection | undefined {
    return this.sections.find(s => s.id === sectionId);
  }

  getQuestionsBySection(sectionId: string): Question[] {
    return this.questions.filter(q => q.section === sectionId);
  }

  getRandomQuestions(sectionId: string, count: number = 10): Question[] {
    const pool = this.questions.filter(q => q.section === sectionId);
    return this.shuffleArray([...pool]).slice(0, count);
  }

  getRandomAllQuestions(countPerSection: number = 10): Question[] {
    let result: Question[] = [];
    for (const section of this.sections) {
      result = result.concat(this.getRandomQuestions(section.id, countPerSection));
    }
    return result;
  }

  getAllQuestions(): Question[] {
    return this.questions;
  }

  private shuffleArray<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
}
