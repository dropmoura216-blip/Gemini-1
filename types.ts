// Fix: Import React to use React.ReactNode type.
import React from 'react';

export interface QuizOption {
  text: string;
  isCorrect?: boolean;
  icon?: React.ReactNode;
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

// Analytics Types
export interface TrackingEvent {
  timestamp: string;
  // Fix: Add 'EXIT_INTENT_TRIGGERED' to the type union to allow it as a valid event type.
  type: 'APP_INIT' | 'STEP_VIEW' | 'CTA_CLICK' | 'QUIZ_ANSWER' | 'CHOICE_MADE' | 'CHECKOUT_CLICK' | 'EXIT_INTENT_TRIGGERED';
  details: Record<string, any>;
}

export interface SessionData {
  sessionId: string;
  startTime: string;
  deviceInfo: {
    userAgent: string;
    platform: string;
    screenWidth: number;
    screenHeight: number;
  };
  events: TrackingEvent[];
}