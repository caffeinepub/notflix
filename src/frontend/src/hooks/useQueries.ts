import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Film, FilmId } from '../backend';
import { ExternalBlob } from '../backend';

export function useGetFilm(filmId: FilmId | null) {
  const { actor, isFetching } = useActor();

  return useQuery<Film | null>({
    queryKey: ['film', filmId?.toString()],
    queryFn: async () => {
      if (!actor || !filmId) return null;
      try {
        return await actor.getFilm(filmId);
      } catch (error) {
        console.error('Error fetching film:', error);
        return null;
      }
    },
    enabled: !!actor && !isFetching && !!filmId
  });
}

export function useUploadFilm() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      title,
      description,
      thumbnail,
      video
    }: {
      title: string;
      description: string;
      thumbnail: ExternalBlob;
      video: ExternalBlob;
    }) => {
      if (!actor) throw new Error('Actor not initialized');
      await actor.uploadFilm(title, description, thumbnail, video);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['films'] });
      queryClient.invalidateQueries({ queryKey: ['filmsList'] });
    }
  });
}

// Client-side film storage for browsing (workaround for missing getAllFilms backend method)
export function useFilmsList() {
  return useQuery<string[]>({
    queryKey: ['filmsList'],
    queryFn: () => {
      const stored = localStorage.getItem('notflix-films');
      return stored ? JSON.parse(stored) : [];
    }
  });
}

export function addFilmToList(filmId: FilmId) {
  const stored = localStorage.getItem('notflix-films');
  const films: string[] = stored ? JSON.parse(stored) : [];
  const filmIdStr = filmId.toString();
  if (!films.includes(filmIdStr)) {
    films.push(filmIdStr);
    localStorage.setItem('notflix-films', JSON.stringify(films));
  }
}
