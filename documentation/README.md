# AAPC CPC Medical Coding Exam Practice Application

## Overview

This Angular application provides practice questions for the AAPC Certified Professional Coder (CPC) exam, focused on the Musculoskeletal System CPT coding section. The application presents scenario-based multiple choice questions organized by anatomical subsection.

## Technology Stack

- **Framework**: Angular 21
- **Language**: TypeScript
- **Styling**: SCSS
- **Icons**: Font Awesome 6.5
- **Font**: Inter (Google Fonts)

## Features

- **Section-based practice**: Five musculoskeletal subsections with 5 questions each (25 total)
- **Clinical scenarios**: Each question includes a realistic clinical scenario followed by a CPT coding question
- **Question navigation**: Side panel navigator with answered/unanswered status indicators
- **Progress tracking**: Real-time progress bar and answer count
- **Submit confirmation**: Dialog warns about unanswered questions before submission
- **Score display**: Percentage score with pass/fail determination (70% passing threshold)
- **Answer review**: Detailed review of each question with correct answer highlighting
- **Explanations**: Expandable explanations for each question with CPT coding rationale
- **Full exam mode**: Option to take all 25 questions across all sections
- **Responsive design**: Mobile-friendly layout

## Exam Sections

| Section | CPT Range | Questions |
|---------|-----------|-----------|
| General Musculoskeletal | 20005-20999 | 5 |
| Spine (Vertebral Column) | 22010-22899 | 5 |
| Shoulder | 23000-23929 | 5 |
| Knee and Lower Extremity | 27300-27899 | 5 |
| Hand and Wrist | 25000-26989 | 5 |

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm 9 or later

### Installation

```bash
cd medical-coding-app
npm install
```

### Development Server

```bash
npx ng serve
```

Navigate to `http://localhost:4200/` in your browser.

### Production Build

```bash
npx ng build
```

Build artifacts are stored in the `dist/` directory.

## Project Structure

```
medical-coding-app/
  src/
    app/
      components/
        home/          # Section selection landing page
        exam/          # Exam taking interface
        results/       # Score display and answer review
      models/
        question.model.ts   # TypeScript interfaces
      services/
        question.ts         # Question data and retrieval service
      app.routes.ts         # Application routing configuration
      app.config.ts         # Application configuration
      app.ts                # Root component
    styles.scss             # Global styles
    index.html              # HTML entry point
```

## Application Flow

1. **Home Page**: User selects a musculoskeletal subsection or full exam
2. **Exam Page**: User answers multiple choice questions with navigation controls
3. **Submit**: Confirmation dialog with unanswered question warning
4. **Results Page**: Score display, answer review, and explanations
5. **Navigation**: Retake exam or choose another section
