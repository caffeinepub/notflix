import React from 'react';
import { Button } from './ui/button';
import { Play, Info } from 'lucide-react';

interface HeroBannerProps {
  title?: string;
  description?: string;
  onPlay?: () => void;
}

export default function HeroBanner({ 
  title = "Welcome to Notflix", 
  description = "Upload your own films and create your personal streaming collection. Start by uploading your first film!",
  onPlay
}: HeroBannerProps) {
  return (
    <div className="relative h-[70vh] md:h-[80vh] w-full">
      <div className="absolute inset-0">
        <img
          src="/assets/generated/hero-banner.dim_1920x800.png"
          alt="Hero Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-notflix-black via-notflix-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-notflix-black via-transparent to-transparent" />
      </div>
      
      <div className="relative h-full flex items-center px-4 md:px-12">
        <div className="max-w-2xl space-y-4 md:space-y-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground">
            {title}
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-xl">
            {description}
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            {onPlay && (
              <Button
                onClick={onPlay}
                size="lg"
                className="bg-foreground text-background hover:bg-foreground/90 font-semibold"
              >
                <Play className="w-5 h-5 mr-2 fill-current" />
                Play
              </Button>
            )}
            <Button
              size="lg"
              variant="secondary"
              className="bg-muted/50 text-foreground hover:bg-muted/70 font-semibold"
            >
              <Info className="w-5 h-5 mr-2" />
              More Info
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
