// Fix: Import React to use React.ReactNode type.
import React from 'react';

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
  preheadline?: string | React.ReactNode;
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