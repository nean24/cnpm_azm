
"use client";

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Dot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Movie } from '@/data/mock-data';
import { cn } from '@/lib/utils';

interface HeroSliderProps {
  movies: Movie[];
}

export function HeroSlider({ movies }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const featuredMovies = movies.filter(m => m.status === 'now_showing').slice(0, 5); // Show up to 5 now_showing movies

  const goToPrevious = useCallback(() => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? featuredMovies.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, featuredMovies.length]);

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === featuredMovies.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, featuredMovies.length]);

  useEffect(() => {
    if (featuredMovies.length <= 1) return; // Don't auto-slide if only one or no items
    const timer = setTimeout(goToNext, 5000); // Auto slide every 5 seconds
    return () => clearTimeout(timer);
  }, [currentIndex, goToNext, featuredMovies.length]);

  if (featuredMovies.length === 0) {
    return (
      <div className="relative flex h-[calc(100vh-80px)] min-h-[400px] w-full items-center justify-center bg-gray-800 text-white md:h-[calc(100vh-80px)] md:min-h-[600px]">
        <p>Không có phim nổi bật.</p>
      </div>
    );
  }

  const currentMovie = featuredMovies[currentIndex];

  return (
    <div className="relative h-[calc(100vh-80px)] min-h-[400px] w-full overflow-hidden md:h-[calc(100vh-80px)] md:min-h-[600px]">
      {featuredMovies.map((movie, index) => (
        <div
          key={movie.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          )}
        >
          <Image
            src={movie.posterUrl}
            alt={`Poster phim ${movie.title}`}
            layout="fill"
            objectFit="cover"
            priority={index === 0}
            className="brightness-50"
            data-ai-hint="movie poster" // General hint for movie posters
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 p-8 text-center text-white">
            <h1 className="mb-4 text-4xl font-bold md:text-6xl animate-fade-in-down">
              {movie.title}
            </h1>
            <p className="mb-8 max-w-2xl text-lg md:text-xl animate-fade-in-up">
              {movie.description.length > 150 ? movie.description.substring(0, 150) + '...' : movie.description}
            </p>
            <Button size="lg" asChild className="bg-primary hover:bg-accent animate-fade-in-up animation-delay-200">
              <Link href={`/movies/${movie.id}`}>Xem Chi Tiết</Link>
            </Button>
          </div>
        </div>
      ))}

      {featuredMovies.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 text-white hover:bg-black/50 hover:text-white"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/30 text-white hover:bg-black/50 hover:text-white"
            aria-label="Next slide"
          >
            <ChevronRight className="h-8 w-8" />
          </Button>
          <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 space-x-2">
            {featuredMovies.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={cn(
                  "h-3 w-3 rounded-full transition-colors",
                  currentIndex === index ? "bg-primary" : "bg-white/50 hover:bg-white/80"
                )}
              />
            ))}
          </div>
        </>
      )}
       <style jsx>{`
        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

