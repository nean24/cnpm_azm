import { MainLayout } from '@/components/layout/main-layout';
import { HeroSlider } from '@/components/home/hero-slider';
import { MovieCard } from '@/components/shared/movie-card';
import { PageTitle } from '@/components/shared/page-title';
import { mockMovies } from '@/data/mock-data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function HomePage() {
  const nowShowingMovies = mockMovies.filter(movie => movie.status === 'now_showing').slice(0, 8);
  const comingSoonMovies = mockMovies.filter(movie => movie.status === 'coming_soon').slice(0, 4);

  return (
    <MainLayout>
      <HeroSlider movies={mockMovies} />
      
      <section className="container mx-auto px-4 py-12 md:px-6 md:py-16">
        <PageTitle title="Phim Đang Chiếu" className="my-0 mb-8 text-left md:mb-12" />
        {nowShowingMovies.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {nowShowingMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">Hiện chưa có phim đang chiếu.</p>
        )}
        {mockMovies.filter(movie => movie.status === 'now_showing').length > 8 && (
          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link href="/movies?status=now_showing">Xem Tất Cả Phim Đang Chiếu</Link>
            </Button>
          </div>
        )}
      </section>

      <section className="bg-secondary py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <PageTitle title="Phim Sắp Chiếu" className="my-0 mb-8 text-left md:mb-12" />
          {comingSoonMovies.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {comingSoonMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">Hiện chưa có phim sắp chiếu.</p>
          )}
           {mockMovies.filter(movie => movie.status === 'coming_soon').length > 4 && (
            <div className="mt-8 text-center">
              <Button asChild variant="outline" className="bg-background hover:bg-accent hover:text-accent-foreground">
                <Link href="/movies?status=coming_soon">Xem Tất Cả Phim Sắp Chiếu</Link>
              </Button>
            </div>
          )}
        </div>
      </section>
    </MainLayout>
  );
}
