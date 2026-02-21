import React, { useRef } from 'react';
import FilmThumbnail from './FilmThumbnail';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import type { Film } from '../backend';

interface FilmRowProps {
  title: string;
  films: (Film | null)[];
  isLoading?: boolean;
}

export default function FilmRow({ title, films, isLoading }: FilmRowProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const displayFilms = isLoading 
    ? Array(5).fill(null)
    : films.length > 0 
    ? films 
    : [];

  if (!isLoading && films.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2 md:space-y-4 px-4 md:px-12 py-4">
      <h2 className="text-xl md:text-2xl font-bold text-foreground">{title}</h2>
      <div className="relative group">
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-notflix-black/80 hover:bg-notflix-black/90 opacity-0 group-hover:opacity-100 transition-opacity h-full rounded-none"
          onClick={() => scroll('left')}
        >
          <ChevronLeft className="w-8 h-8" />
        </Button>
        
        <div
          ref={scrollContainerRef}
          className="flex gap-2 md:gap-3 overflow-x-auto scrollbar-hide scroll-smooth"
        >
          {displayFilms.map((film, index) => (
            <FilmThumbnail key={film?.id.toString() || index} film={film} isLoading={isLoading} />
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-notflix-black/80 hover:bg-notflix-black/90 opacity-0 group-hover:opacity-100 transition-opacity h-full rounded-none"
          onClick={() => scroll('right')}
        >
          <ChevronRight className="w-8 h-8" />
        </Button>
      </div>
    </div>
  );
}
