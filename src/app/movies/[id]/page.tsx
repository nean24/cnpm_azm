
import { MainLayout } from '@/components/layout/main-layout';
import { getMovieById, getShowtimesByMovieId, mockCinemas, type Showtime, type Cinema, type Hall } from '@/data/mock-data';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Clock, CalendarDays, Users, Video, Tag, Languages, Star, MapPin } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface MovieDetailPageProps {
  params: { id: string };
}

// Helper function to find hall name
const getHallName = (cinema: Cinema, hallId: string): string => {
  const hall = cinema.halls.find(h => h.id === hallId);
  return hall ? hall.name : 'Không rõ';
};


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

  const showtimes = getShowtimesByMovieId(movie.id);
  // Group showtimes by cinema and date
  const groupedShowtimes: Record<string, Record<string, Showtime[]>> = {};
  showtimes.forEach(st => {
    const cinema = mockCinemas.find(c => c.id === st.cinemaId);
    if (cinema) {
      if (!groupedShowtimes[cinema.name]) {
        groupedShowtimes[cinema.name] = {};
      }
      if (!groupedShowtimes[cinema.name][st.date]) {
        groupedShowtimes[cinema.name][st.date] = [];
      }
      groupedShowtimes[cinema.name][st.date].push(st);
    }
  });


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
              data-ai-hint="movie poster" // General hint for movie posters
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

            {movie.trailerUrl && movie.trailerUrl !== 'https://www.youtube.com/embed/dQw4w9WgXcQ' && ( // Check for placeholder
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
              <Link href={`/booking/${movie.id}`}>Mua Vé Ngay</Link>
            </Button>
          </div>
        </div>

        <Separator className="my-8 md:my-12" />

        <div>
          <h2 className="mb-6 text-3xl font-bold">Lịch Chiếu</h2>
          {Object.keys(groupedShowtimes).length > 0 ? (
            Object.entries(groupedShowtimes).map(([cinemaName, dates]) => {
              const cinemaDetails = mockCinemas.find(c => c.name === cinemaName);
              return (
                <Card key={cinemaName} className="mb-6 shadow-md">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl text-primary">
                      <MapPin className="h-6 w-6" /> {cinemaName}
                    </CardTitle>
                    {cinemaDetails && <p className="text-sm text-muted-foreground">{cinemaDetails.address}</p>}
                  </CardHeader>
                  <CardContent>
                    {Object.entries(dates).sort((a,b) => new Date(a[0]).getTime() - new Date(b[0]).getTime()).map(([date, times]) => (
                      <div key={date} className="mb-4">
                        <h4 className="mb-2 flex items-center gap-2 text-lg font-semibold">
                          <CalendarDays className="h-5 w-5"/> {new Date(date).toLocaleDateString('vi-VN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {times.sort((a,b) => a.startTime.localeCompare(b.startTime)).map(st => {
                            const hallName = cinemaDetails ? getHallName(cinemaDetails, st.hallId) : 'N/A';
                            return (
                            <Button key={st.id} variant="outline" asChild className="hover:bg-accent hover:text-accent-foreground">
                              <Link href={`/booking/${movie.id}?showtime=${st.id}`}>
                                <div className="flex flex-col items-center p-1 text-center">
                                  <span className="font-bold">{st.startTime}</span>
                                  <span className="text-xs">{hallName} - {st.format}</span>
                                </div>
                              </Link>
                            </Button>
                          )})}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )
            })
          ) : (
            <p className="text-center text-lg text-muted-foreground">Hiện chưa có lịch chiếu cho phim này.</p>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

