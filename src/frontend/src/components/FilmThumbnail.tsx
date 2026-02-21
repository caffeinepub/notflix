import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import type { Film } from '../backend';

interface FilmThumbnailProps {
  film: Film | null;
  isLoading?: boolean;
}

export default function FilmThumbnail({ film, isLoading }: FilmThumbnailProps) {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (film) {
      navigate({ to: '/player/$filmId', params: { filmId: film.id.toString() } });
    }
  };

  if (isLoading || !film) {
    return (
      <div className="shrink-0 w-[200px] md:w-[250px] lg:w-[300px] aspect-[2/3] rounded-sm overflow-hidden bg-muted animate-pulse">
        <img
          src="/assets/generated/placeholder-thumbnail.dim_300x450.png"
          alt="Loading..."
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  const thumbnailUrl = imageError 
    ? '/assets/generated/placeholder-thumbnail.dim_300x450.png'
    : film.thumbnail.getDirectURL();

  return (
    <div
      className="shrink-0 w-[200px] md:w-[250px] lg:w-[300px] aspect-[2/3] rounded-sm overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 hover:z-10 relative group"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={thumbnailUrl}
        alt={film.title}
        className="w-full h-full object-cover"
        onError={() => setImageError(true)}
      />
      <div className={`absolute inset-0 bg-gradient-to-t from-notflix-black via-notflix-black/60 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-1">
          <h3 className="text-foreground font-bold text-lg line-clamp-1">{film.title}</h3>
          <p className="text-muted-foreground text-sm line-clamp-2">{film.description}</p>
        </div>
      </div>
    </div>
  );
}
