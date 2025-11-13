import React, { useState } from 'react';
import type { Testimonial } from '../types';

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

const Arrow = ({ direction, onClick }: { direction: 'left' | 'right'; onClick: () => void }) => (
  <button
    onClick={onClick}
    className={`absolute top-1/2 -translate-y-1/2 ${
      direction === 'left' ? 'left-2' : 'right-2'
    } z-10 bg-slate-800/50 hover:bg-slate-700/80 rounded-full p-2 text-white transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-amber-400/50`}
    aria-label={direction === 'left' ? 'Depoimento anterior' : 'Próximo depoimento'}
  >
    {direction === 'left' ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    )}
  </button>
);

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? testimonials.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === testimonials.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="mt-8 max-w-lg mx-auto w-full relative">
      <div className="relative aspect-square overflow-hidden rounded-xl shadow-2xl shadow-amber-500/10 bg-slate-900 border border-slate-700">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="absolute top-0 left-0 w-full h-full transition-opacity duration-700 ease-in-out"
            style={{ opacity: index === currentIndex ? 1 : 0, zIndex: index === currentIndex ? 1 : 0 }}
          >
            {testimonial.image ? (
              <img
                src={testimonial.image}
                alt="Depoimento de aluno"
                className="w-full h-full object-contain"
                loading={index === 0 ? "eager" : "lazy"}
                fetchpriority={index === 0 ? "high" : "auto"}
                decoding="async"
              />
            ) : (
              <div className="p-8 h-full flex flex-col items-center justify-center text-center">
                <blockquote className="bg-slate-800/50 border-l-4 border-amber-400 p-6 rounded-r-lg italic text-slate-300 text-left">
                  "{testimonial.text}"
                  <cite className="block not-italic mt-4 font-semibold text-white">&mdash; {testimonial.author}</cite>
                </blockquote>
              </div>
            )}
          </div>
        ))}
        {testimonials.length > 1 && (
            <>
                <Arrow direction="left" onClick={goToPrevious} />
                <Arrow direction="right" onClick={goToNext} />
            </>
        )}
      </div>

      {testimonials.length > 1 && (
        <div className="flex justify-center mt-6 space-x-3">
            {testimonials.map((_, slideIndex) => (
            <button
                key={slideIndex}
                onClick={() => goToSlide(slideIndex)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === slideIndex ? 'bg-amber-400 scale-125' : 'bg-slate-600 hover:bg-slate-500'
                }`}
                aria-label={`Ir para o depoimento ${slideIndex + 1}`}
            ></button>
            ))}
        </div>
      )}
    </div>
  );
};

export default TestimonialCarousel;