# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed
- Increased exam test size from 5 questions to 10 questions per section
- Full exam now contains 20 questions (10 per section) instead of 10
- Updated default parameters in getRandomQuestions and getRandomAllQuestions to 10
- Expanded question pool from 100 to 200 questions per section (400 total across both sections)
- Updated QuestionService totalPoolSize from 100 to 200 for both Anatomy and Medical Terminology sections
- Increased Angular production build budget from 500kB to 750kB to accommodate larger question data

### Added
- 100 additional Anatomy questions (IDs 101-200) covering Cardiovascular, Musculoskeletal, Respiratory, Digestive, Nervous System, Integumentary, Urinary, Reproductive, Endocrine, Lymphatic, and Sensory Organs subsections
- 100 additional Medical Terminology questions (IDs 101-200) covering Prefixes, Suffixes, Root Words, Combining Forms, Abbreviations, Directional Terms, Body Systems Terminology, Medical Coding Terms, Surgical Terms, Pathology Terms, and Pharmacology Terms subsections

---

## [0.3.0] - 2026-02-14

### Changed
- Replaced all 5 musculoskeletal CPT coding sections with 2 new CPC exam-focused sections: Anatomy and Medical Terminology
- Updated Home component hero text and section descriptions for new content areas
- Updated ExamSection model to include totalPoolSize property for question pool transparency
- Made cptCode optional on Question model to support non-CPT questions (e.g., Medical Terminology)
- Exam component now loads randomized questions from the pool instead of fixed question sets
- Results component now conditionally displays CPT badge only when cptCode is present
- Results component now displays subsection badge for each question in the review
- Expanded question pool from 15 to 100 questions per section (200 total)
- Moved question data from inline TypeScript arrays to external JSON files for maintainability
- QuestionService now imports from `anatomy-questions.json` and `terminology-questions.json`
- Updated totalPoolSize to 100 for both sections

### Added
- `src/app/data/anatomy-questions.json` with 100 anatomy questions across 12 subsections: Cardiovascular, Musculoskeletal, Respiratory, Digestive, Nervous System, Integumentary, Urinary, Reproductive, Endocrine, Lymphatic, Sensory Organs
- `src/app/data/terminology-questions.json` with 100 medical terminology questions across 10 subsections: Prefixes, Suffixes, Root Words, Combining Forms, Abbreviations, Directional Terms, Body Systems Terminology, Medical Coding Terms, Surgical Terms, Pathology Terms, Pharmacology Terms
- "New Test" button on the Exam page header that loads a fresh random set of 5 questions from the pool
- Confirmation dialog when clicking "New Test" with in-progress answers to prevent accidental data loss
- "New Test" button on the Results page (both header and footer) for quick access to a new random question set
- Question randomization service methods: getRandomQuestions() and getRandomAllQuestions()
- Fisher-Yates shuffle algorithm in QuestionService for fair randomization
- Pool size indicator on Home page section cards (e.g., "5 Questions per Test (100 in pool)")
- Enabled `resolveJsonModule` in `tsconfig.app.json` for JSON imports
- Added `src/**/*.json` to TypeScript include paths

### Removed
- General Musculoskeletal section (CPT 20005-20999) and all 5 associated questions
- Spine / Vertebral Column section (CPT 22010-22899) and all 5 associated questions
- Shoulder section (CPT 23000-23929) and all 5 associated questions
- Knee and Lower Extremity section (CPT 27300-27899) and all 5 associated questions
- Hand and Wrist section (CPT 25000-26989) and all 5 associated questions

## [0.1.0] - 2026-02-14

### Added
- Initial Angular 21 application scaffolding with SCSS styling and routing
- Question data model with interfaces for Question, Answer, ExamSection, ExamResult, and QuestionResult
- QuestionService with 25 scenario-based CPT coding questions across 5 musculoskeletal subsections
- Home component with section selection grid and full exam option
- Exam component with question navigation, answer selection, progress tracking, and submit confirmation dialog
- Results component with score display, pass/fail determination, answer review with correct/incorrect highlighting, and expandable explanations
- Responsive design with mobile-friendly layout
- Font Awesome icon integration for UI elements
- Inter font family for professional typography
- Application routing with Home, Exam, and Results routes
