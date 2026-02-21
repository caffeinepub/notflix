import React from 'react';
import { useParams } from '@tanstack/react-router';
import { useGetFilm } from '../hooks/useQueries';
import VideoPlayer from '../components/VideoPlayer';
import { Principal } from '@icp-sdk/core/principal';
import { Loader2 } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';
import { Button } from '../components/ui/button';

export default function PlayerPage() {
  const { filmId } = useParams({ strict: false });
  const navigate = useNavigate();
  
  let principal: Principal | null = null;
  try {
    principal = filmId ? Principal.fromText(filmId) : null;
  } catch (error) {
    console.error('Invalid film ID:', error);
  }

  const { data: film, isLoading, error } = useGetFilm(principal);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-notflix-black flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !film) {
    return (
      <div className="min-h-screen bg-notflix-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold text-foreground">Film Not Found</h1>
          <p className="text-muted-foreground">
            The film you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => navigate({ to: '/' })} className="bg-primary hover:bg-primary/90">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return <VideoPlayer film={film} />;
}
