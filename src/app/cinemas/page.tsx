
"use client";

import { useState, useMemo, useEffect } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { PageTitle } from '@/components/shared/page-title';
import { mockCinemas, mockShowtimes, mockMovies, type Cinema, type Showtime, type Movie } from '@/data/mock-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MapPin, Clock, Video } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from '@/components/ui/separator';
import Image from 'next/image';
import { cn } from "@/lib/utils";

const getMovieTitle = (movieId: string): string => {
  const movie = mockMovies.find(m => m.id === movieId);
  return movie ? movie.title : "Phim không xác định";
};

const getMoviePoster = (movieId: string): string => {
  const movie = mockMovies.find(m => m.id === movieId);
  return movie ? movie.posterUrl : "https://picsum.photos/seed/unknown_movie/100/150";
}

export default function CinemasPage() {
  const [selectedCinemaType, setSelectedCinemaType] = useState<'Tất cả rạp' | 'Rạp VIP' | 'all'>('all');
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Set current date on client-side to avoid hydration mismatch
    setCurrentDate(new Date().toISOString().split('T')[0]);
  }, []);


  const filteredCinemas = useMemo(() => {
    if (selectedCinemaType === 'all') return mockCinemas;
    return mockCinemas.filter(cinema => cinema.type === selectedCinemaType);
  }, [selectedCinemaType]);
  
  // Group showtimes by movie for a specific cinema for the current date
  const getGroupedShowtimesForCinema = (cinemaId: string) => {
    if (!currentDate) return {}; // Don't filter if date not set yet
    
    const cinemaShowtimes = mockShowtimes.filter(st => st.cinemaId === cinemaId && st.date === currentDate);
    const grouped: Record<string, Showtime[]> = {};
    cinemaShowtimes.forEach(st => {
      if (!grouped[st.movieId]) {
        grouped[st.movieId] = [];
      }
      grouped[st.movieId].push(st);
    });
    return grouped;
  };


  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <PageTitle title="Hệ Thống Rạp AZM Cinema" subtitle="Chọn rạp và xem lịch chiếu chi tiết" />

        <Tabs defaultValue="all" onValueChange={(value) => setSelectedCinemaType(value as any)} className="mb-8 w-full">
          <TabsList className="grid w-full grid-cols-2 md:w-1/2 mx-auto">
            <TabsTrigger value="all">Tất cả rạp</TabsTrigger>
            <TabsTrigger value="Rạp VIP">Rạp VIP</TabsTrigger>
          </TabsList>
        </Tabs>

        {filteredCinemas.length > 0 ? (
          <div className="space-y-8">
            {filteredCinemas.map((cinema) => {
              const groupedShowtimes = getGroupedShowtimesForCinema(cinema.id);
              return (
              <Card key={cinema.id} className="overflow-hidden shadow-lg">
                <CardHeader className="bg-secondary">
                  <CardTitle className="flex items-center gap-2 text-2xl text-primary">
                    <MapPin className="h-6 w-6" /> {cinema.name}
                  </CardTitle>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>{cinema.address}</p>
                    <p>
                      <span className="font-semibold">Loại rạp: </span>
                      <span className={cn("font-medium", cinema.type === 'Rạp VIP' ? "text-accent" : "text-foreground")}>
                        {cinema.type}
                      </span>
                    </p>
                  </div>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                  <h3 className="mb-4 text-xl font-semibold">Lịch chiếu phim hôm nay ({currentDate ? new Date(currentDate).toLocaleDateString('vi-VN') : 'Đang tải...'}):</h3>
                  {Object.keys(groupedShowtimes).length > 0 ? (
                    <div className="space-y-6">
                      {Object.entries(groupedShowtimes).map(([movieId, times]) => (
                        <div key={movieId} className="flex flex-col gap-4 rounded-md border p-4 md:flex-row">
                          <div className="w-full md:w-1/4 lg:w-1/5 flex-shrink-0">
                            <Link href={`/movies/${movieId}`}>
                              <Image 
                                src={getMoviePoster(movieId)} 
                                alt={getMovieTitle(movieId)} 
                                width={150} 
                                height={225} 
                                className="w-full rounded-md object-cover aspect-[2/3]"
                                data-ai-hint="movie poster" // General hint for movie posters
                              />
                            </Link>
                          </div>
                          <div className="flex-grow">
                            <Link href={`/movies/${movieId}`}>
                              <h4 className="mb-2 text-lg font-semibold hover:text-primary">{getMovieTitle(movieId)}</h4>
                            </Link>
                            <div className="flex flex-wrap gap-2">
                              {times.sort((a,b) => a.startTime.localeCompare(b.startTime)).map(st => (
                                <Button key={st.id} variant="outline" size="sm" asChild className="hover:bg-accent hover:text-accent-foreground">
                                  <Link href={`/booking/${movieId}?showtime=${st.id}`}>
                                    <div className="flex items-center gap-1">
                                      <Clock className="h-4 w-4" />
                                      <span>{st.startTime}</span>
                                      <Separator orientation="vertical" className="h-4 mx-1" />
                                      <Video className="h-4 w-4" />
                                      <span>{st.format}</span>
                                      <Separator orientation="vertical" className="h-4 mx-1" />
                                      <span>{cinema.halls.find(h => h.id === st.hallId)?.name || ''}</span>
                                    </div>
                                  </Link>
                                </Button>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">Rạp này chưa có lịch chiếu hôm nay.</p>
                  )}
                </CardContent>
              </Card>
            )})}
          </div>
        ) : (
          <p className="text-center text-lg text-muted-foreground">Không có rạp nào phù hợp.</p>
        )}
      </div>
    </MainLayout>
  );
}

