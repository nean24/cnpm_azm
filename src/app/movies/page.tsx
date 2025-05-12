"use client"; // Required for useState and event handlers in filters
import { Suspense } from 'react';
import { useState, useMemo } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { MovieCard } from '@/components/shared/movie-card';
import { PageTitle } from '@/components/shared/page-title';
import { MovieFilters } from '@/components/shared/movie-filters';
import { mockMovies, type Movie } from '@/data/mock-data';
import { useSearchParams } from 'next/navigation';


function MoviesPageContent() {

  const searchParams = useSearchParams();
  const initialStatus = searchParams.get('status');

  const [filters, setFilters] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    if (initialStatus === 'now_showing' || initialStatus === 'coming_soon') {
      initial.status = initialStatus;
    }
    return initial;
  });

  const handleFilterChange = (newFilters: Record<string, string>) => {
    setFilters(prevFilters => ({ ...prevFilters, ...newFilters }));
  };

  const filteredMovies = useMemo(() => {
    return mockMovies.filter(movie => {
      if (filters.status && filters.status !== 'all' && movie.status !== filters.status) {
        return false;
      }
      if (filters.genre && filters.genre !== 'all' && !movie.genre.includes(filters.genre)) {
        return false;
      }
      if (filters.rating && filters.rating !== 'all' && movie.rating !== filters.rating) {
        return false;
      }
      if (filters.language && filters.language !== 'all' && movie.language !== filters.language) {
        return false;
      }
      return true;
    });
  }, [filters]);

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <PageTitle title="Danh Sách Phim" />
        <MovieFilters onFilterChange={handleFilterChange} />
        
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-muted-foreground">Không tìm thấy phim phù hợp với bộ lọc.</p>
        )}
      </div>
    </MainLayout>
  );
}

export default function MoviesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MoviesPageContent />
    </Suspense>
  );
}
