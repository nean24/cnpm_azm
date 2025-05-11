
"use client";

import { useState, useEffect, useMemo } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { PageTitle } from '@/components/shared/page-title';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import {
  mockMovies,
  mockCinemas,
  mockShowtimes,
  type Movie,
  type Cinema,
  type Showtime,
} from '@/data/mock-data';
import { format, parseISO, startOfToday } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Ticket, Film, Building, CalendarDays, Clock, AlertTriangle, ArrowLeft, ArrowRight } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

type Step = 'date' | 'cinema' | 'movie' | 'showtime' | 'summary';

export default function QuickBookPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>('date');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedCinema, setSelectedCinema] = useState<Cinema | undefined>(undefined);
  const [selectedMovie, setSelectedMovie] = useState<Movie | undefined>(undefined);
  const [selectedShowtime, setSelectedShowtime] = useState<Showtime | undefined>(undefined);

  const today = startOfToday();

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setSelectedCinema(undefined);
      setSelectedMovie(undefined);
      setSelectedShowtime(undefined);
      setCurrentStep('cinema');
    }
  };

  const handleCinemaSelect = (cinema: Cinema) => {
    setSelectedCinema(cinema);
    setSelectedMovie(undefined);
    setSelectedShowtime(undefined);
    setCurrentStep('movie');
  };

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    setSelectedShowtime(undefined);
    setCurrentStep('showtime');
  };

  const handleShowtimeSelect = (showtime: Showtime) => {
    setSelectedShowtime(showtime);
    setCurrentStep('summary');
  };

  const handleBack = () => {
    if (currentStep === 'summary') setCurrentStep('showtime');
    else if (currentStep === 'showtime') {
      setSelectedShowtime(undefined);
      setCurrentStep('movie');
    } else if (currentStep === 'movie') {
      setSelectedMovie(undefined);
      setSelectedShowtime(undefined);
      setCurrentStep('cinema');
    } else if (currentStep === 'cinema') {
      setSelectedCinema(undefined);
      setSelectedMovie(undefined);
      setSelectedShowtime(undefined);
      setCurrentStep('date');
    }
  };

  const handleProceedToBooking = () => {
    if (selectedMovie && selectedShowtime) {
      router.push(`/booking/${selectedMovie.id}?showtime=${selectedShowtime.id}`);
    }
  };

  const availableCinemas = useMemo(() => {
    if (!selectedDate) return [];
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    const cinemaIdsWithShowtimes = new Set(
      mockShowtimes
        .filter(st => st.date === dateStr)
        .map(st => st.cinemaId)
    );
    return mockCinemas.filter(cinema => cinemaIdsWithShowtimes.has(cinema.id));
  }, [selectedDate]);

  const availableMovies = useMemo(() => {
    if (!selectedDate || !selectedCinema) return [];
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    const movieIdsInCinemaOnDate = new Set(
      mockShowtimes
        .filter(st => st.date === dateStr && st.cinemaId === selectedCinema.id)
        .map(st => st.movieId)
    );
    return mockMovies.filter(movie => movieIdsInCinemaOnDate.has(movie.id));
  }, [selectedDate, selectedCinema]);

  const availableShowtimes = useMemo(() => {
    if (!selectedDate || !selectedCinema || !selectedMovie) return [];
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    return mockShowtimes
      .filter(
        st =>
          st.date === dateStr &&
          st.cinemaId === selectedCinema.id &&
          st.movieId === selectedMovie.id
      )
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [selectedDate, selectedCinema, selectedMovie]);

  const steps = [
    { id: 'date', title: 'Chọn Ngày', Icon: CalendarDays },
    { id: 'cinema', title: 'Chọn Rạp', Icon: Building },
    { id: 'movie', title: 'Chọn Phim', Icon: Film },
    { id: 'showtime', title: 'Chọn Suất Chiếu', Icon: Clock },
    { id: 'summary', title: 'Tóm Tắt Đặt Vé', Icon: Ticket },
  ];

  const currentStepInfo = steps.find(s => s.id === currentStep);
  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  const renderStepContent = () => {
    switch (currentStep) {
      case 'date':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><CalendarDays className="h-6 w-6 text-primary"/> Chọn ngày xem phim</CardTitle>
              <CardDescription>Vui lòng chọn ngày bạn muốn xem phim.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={(date) => date < today}
                locale={vi}
                className="rounded-md border"
                defaultMonth={parseISO(mockMovies.sort((a,b) => new Date(a.releaseDate).getTime() - new Date(b.releaseDate).getTime())[0]?.releaseDate) || new Date()}
              />
            </CardContent>
          </Card>
        );
      case 'cinema':
        if (availableCinemas.length === 0) {
          return <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Không có rạp chiếu</AlertTitle>
            <AlertDescription>Không có rạp nào có suất chiếu vào ngày đã chọn. Vui lòng chọn ngày khác.</AlertDescription>
          </Alert>;
        }
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Building className="h-6 w-6 text-primary"/>Chọn rạp chiếu phim</CardTitle>
              <CardDescription>Hiển thị các rạp có suất chiếu vào ngày {selectedDate ? format(selectedDate, 'dd/MM/yyyy', { locale: vi }) : ''}.</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-3">
                  {availableCinemas.map(cinema => (
                    <Button
                      key={cinema.id}
                      variant="outline"
                      className="w-full justify-start h-auto py-3 text-left"
                      onClick={() => handleCinemaSelect(cinema)}
                    >
                      <div>
                        <p className="font-semibold">{cinema.name}</p>
                        <p className="text-xs text-muted-foreground">{cinema.address}</p>
                      </div>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        );
      case 'movie':
        if (availableMovies.length === 0) {
           return <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Không có phim</AlertTitle>
            <AlertDescription>Không có phim nào được chiếu tại rạp đã chọn vào ngày này. Vui lòng chọn lại.</AlertDescription>
          </Alert>;
        }
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Film className="h-6 w-6 text-primary"/>Chọn phim</CardTitle>
              <CardDescription>Các phim đang chiếu tại {selectedCinema?.name} vào ngày {selectedDate ? format(selectedDate, 'dd/MM/yyyy', { locale: vi }) : ''}.</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {availableMovies.map(movie => (
                  <Card key={movie.id} className="overflow-hidden cursor-pointer hover:shadow-lg" onClick={() => handleMovieSelect(movie)}>
                    <div className="aspect-[2/3] relative w-full">
                       <Image src={movie.posterUrl} alt={movie.title} layout="fill" objectFit="cover" data-ai-hint={movie.aiHint}/>
                    </div>
                    <CardContent className="p-3">
                      <h3 className="font-semibold truncate text-sm">{movie.title}</h3>
                      <p className="text-xs text-muted-foreground">{movie.genre.join(', ')}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              </ScrollArea>
            </CardContent>
          </Card>
        );
      case 'showtime':
        if (availableShowtimes.length === 0) {
          return <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Không có suất chiếu</AlertTitle>
            <AlertDescription>Phim này không có suất chiếu tại rạp và ngày đã chọn. Vui lòng chọn lại.</AlertDescription>
          </Alert>;
        }
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Clock className="h-6 w-6 text-primary"/>Chọn suất chiếu</CardTitle>
              <CardDescription>Cho phim {selectedMovie?.title} tại {selectedCinema?.name} vào {selectedDate ? format(selectedDate, 'dd/MM/yyyy', { locale: vi }) : ''}.</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px]">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {availableShowtimes.map(showtime => (
                    <Button
                      key={showtime.id}
                      variant="outline"
                      className="flex flex-col h-auto py-2 items-center text-center"
                      onClick={() => handleShowtimeSelect(showtime)}
                    >
                      <span className="font-bold text-lg">{showtime.startTime}</span>
                      <span className="text-xs">{showtime.format} - {selectedCinema?.halls.find(h => h.id === showtime.hallId)?.name}</span>
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        );
      case 'summary':
        if (!selectedDate || !selectedCinema || !selectedMovie || !selectedShowtime) {
          return <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Lỗi Thông Tin</AlertTitle>
            <AlertDescription>Vui lòng quay lại và hoàn tất các bước chọn vé.</AlertDescription>
          </Alert>;
        }
        const hall = selectedCinema.halls.find(h => h.id === selectedShowtime.hallId);
        return (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center gap-2"><Ticket className="h-7 w-7"/>Xác Nhận Đặt Vé</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                 <Image src={selectedMovie.posterUrl} alt={selectedMovie.title} width={100} height={150} className="rounded-md aspect-[2/3] object-cover" data-ai-hint={selectedMovie.aiHint} />
                <div>
                  <h3 className="text-xl font-semibold">{selectedMovie.title}</h3>
                  <p className="text-sm text-muted-foreground">{selectedMovie.genre.join(', ')}</p>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <div><strong>Rạp:</strong> {selectedCinema.name}</div>
                <div><strong>Địa chỉ:</strong> {selectedCinema.address}</div>
                <div><strong>Ngày:</strong> {format(selectedDate, 'dd/MM/yyyy', { locale: vi })}</div>
                <div><strong>Giờ:</strong> {selectedShowtime.startTime}</div>
                <div><strong>Phòng chiếu:</strong> {hall?.name || 'N/A'}</div>
                <div><strong>Định dạng:</strong> {selectedShowtime.format}</div>
              </div>
              <Button className="w-full mt-6 bg-primary hover:bg-accent" size="lg" onClick={handleProceedToBooking}>
                Tiếp tục chọn ghế <ArrowRight className="ml-2 h-5 w-5"/>
              </Button>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <PageTitle title="Đặt Vé Nhanh" subtitle={currentStepInfo?.title} />

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-1">
            {steps.map((step, index) => (
              <div key={step.id} className={cn(
                "flex-1 text-center text-xs font-medium py-2 border-b-4",
                index < currentStepIndex ? "border-primary text-primary" :
                index === currentStepIndex ? "border-primary text-primary" :
                "border-muted text-muted-foreground"
              )}>
                <step.Icon className={cn("mx-auto mb-1 h-5 w-5", index <= currentStepIndex ? "text-primary" : "text-muted-foreground")} />
                {step.title}
              </div>
            ))}
          </div>
        </div>


        <div className="max-w-4xl mx-auto">
          {renderStepContent()}
          {currentStep !== 'date' && (
            <Button variant="outline" onClick={handleBack} className="mt-6">
              <ArrowLeft className="mr-2 h-4 w-4"/> Quay Lại
            </Button>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
