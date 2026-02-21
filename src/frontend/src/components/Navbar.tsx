import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import Logo from './Logo';
import { Button } from './ui/button';
import { Upload } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-notflix-black to-transparent">
      <nav className="flex items-center justify-between px-4 md:px-12 py-4">
        <div className="flex items-center gap-8">
          <button onClick={() => navigate({ to: '/' })} className="focus:outline-none">
            <Logo size="md" />
          </button>
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => navigate({ to: '/' })}
              className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => navigate({ to: '/upload' })}
              className="text-sm font-medium text-foreground hover:text-muted-foreground transition-colors"
            >
              Upload
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Button
            onClick={() => navigate({ to: '/upload' })}
            variant="default"
            size="sm"
            className="bg-primary hover:bg-primary/90"
          >
            <Upload className="w-4 h-4 mr-2" />
            Upload Film
          </Button>
        </div>
      </nav>
    </header>
  );
}
