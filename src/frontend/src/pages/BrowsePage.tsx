import React, { useMemo } from 'react';
import Navbar from '../components/Navbar';
import HeroBanner from '../components/HeroBanner';
import FilmRow from '../components/FilmRow';
import Footer from '../components/Footer';
import { useFilmsList, useGetFilm } from '../hooks/useQueries';
import { Principal } from '@icp-sdk/core/principal';
import type { Film } from '../backend';

function useFilms(filmIdStrings: string[]) {
  const principals = useMemo(() => {
    return filmIdStrings.map((id: string) => {
      try {
        return Principal.fromText(id);
      } catch {
        return null;
      }
    }).filter((p): p is Principal => p !== null);
  }, [filmIdStrings]);

  // Call hooks at the top level for each principal
  const film0 = useGetFilm(principals[0] || null);
  const film1 = useGetFilm(principals[1] || null);
  const film2 = useGetFilm(principals[2] || null);
  const film3 = useGetFilm(principals[3] || null);
  const film4 = useGetFilm(principals[4] || null);
  const film5 = useGetFilm(principals[5] || null);
  const film6 = useGetFilm(principals[6] || null);
  const film7 = useGetFilm(principals[7] || null);
  const film8 = useGetFilm(principals[8] || null);
  const film9 = useGetFilm(principals[9] || null);

  const queries = [film0, film1, film2, film3, film4, film5, film6, film7, film8, film9];
  
  const films = queries
    .slice(0, principals.length)
    .map(q => q.data)
    .filter((f): f is Film => f !== null);
  
  const isLoading = queries.slice(0, principals.length).some(q => q.isLoading);

  return { films, isLoading };
}

export default function BrowsePage() {
  const { data: filmIds, isLoading: isLoadingList } = useFilmsList();
  const { films, isLoading: isLoadingFilms } = useFilms(filmIds || []);

  return (
    <div className="min-h-screen bg-notflix-black">
      <Navbar />
      
      <main>
        <HeroBanner />
        
        <div className="relative -mt-32 z-10 space-y-8 pb-12">
          <FilmRow 
            title="Your Films" 
            films={films} 
            isLoading={isLoadingList || isLoadingFilms}
          />
          
          {films.length > 3 && (
            <FilmRow 
              title="Recently Added" 
              films={films.slice(0, 5)} 
              isLoading={false}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
