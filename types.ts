export interface QuizOption {
  text: string;
  isCorrect?: boolean;
}

export interface Quiz {
  question: string;
  options: QuizOption[];
}

export interface Pillar {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface FunnelStep {
  step: number;
  preheadline?: string;
  headline: string | React.ReactNode;
  subheadline?: string | React.ReactNode;
  ctaText: string;
  quiz?: Quiz;
  pillars?: Pillar[];
  testimonial?: {
    text: string;
    author: string;
  };
}