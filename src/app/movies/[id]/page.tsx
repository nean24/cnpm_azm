
import { MainLayout } from '@/components/layout/main-layout';
import { getMovieById, type Movie } from '@/data/mock-data';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface MovieDetailPageProps {
  params: { id: string };
}

export default function MovieDetailPage({ params }: MovieDetailPageProps) {
  const movie = getMovieById(params.id);
  
  if (!movie) {
    return (
      <MainLayout>
        <div className="container mx-auto flex h-[calc(100vh-theme(spacing.40))] items-center justify-center px-4 py-12 text-center md:px-6">
          <Alert variant="destructive" className="max-w-md">
            <AlertTitle className="text-2xl">Không tìm thấy phim</AlertTitle>
            <AlertDescription className="text-lg">
              Phim bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
              <Button variant="link" asChild className="mt-4 block text-lg">
                <Link href="/">Trở về trang chủ</Link>
              </Button>
            </AlertDescription>
          </Alert>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
          <div className="md:col-span-1">
            <Image
              src={movie.posterUrl}
              alt={`Poster phim ${movie.title}`}
              width={600}
              height={900}
              className="w-full rounded-lg object-cover shadow-xl aspect-[2/3]"
              data-ai-hint={movie.aiHint}
            />
          </div>

          <div className="md:col-span-2">
            <h1 className="mb-2 text-4xl font-bold text-primary md:text-5xl">{movie.title}</h1>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {movie.genre.map(g => <Badge key={g} variant="secondary">{g}</Badge>)}
              <Badge variant="outline">{movie.rating}</Badge>
              <Badge variant="outline">{movie.language}</Badge>
              <Badge variant="outline">{movie.durationMinutes} phút</Badge>
            </div>
            
            <p className="mb-6 text-lg text-muted-foreground">{movie.description}</p>

            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div><strong className="font-semibold">Đạo diễn:</strong> {movie.director}</div>
              <div><strong className="font-semibold">Diễn viên:</strong> {movie.actors.join(', ')}</div>
              <div><strong className="font-semibold">Ngày phát hành:</strong> {new Date(movie.releaseDate).toLocaleDateString('vi-VN')}</div>
            </div>

            {movie.trailerUrl && movie.trailerUrl !== 'https://www.youtube.com/embed/dQw4w9WgXcQ' && (
              <div className="mb-8">
                <h2 className="mb-3 text-2xl font-semibold">Trailer</h2>
                <div className="aspect-video overflow-hidden rounded-lg border">
                  <iframe
                    width="100%"
                    height="100%"
                    src={movie.trailerUrl}
                    title={`Trailer phim ${movie.title}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}
            
            <Button size="lg" className="w-full bg-primary hover:bg-accent md:w-auto" asChild>
              {/* This link correctly directs to the booking page for the current movie */}
              <Link href={`/booking/${movie.id}`}>Mua Vé Ngay</Link>
            </Button>
          </div>
        </div>

        {/* Lịch Chiếu section removed as per request */}
        {/* <Separator className="my-8 md:my-12" /> */}
        {/* Removed showtime display section */}

      </div>
    </MainLayout>
  );
}
