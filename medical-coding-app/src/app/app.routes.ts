import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Exam } from './components/exam/exam';
import { Results } from './components/results/results';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'exam/:sectionId', component: Exam },
  { path: 'results', component: Results },
  { path: '**', redirectTo: '' }
];
