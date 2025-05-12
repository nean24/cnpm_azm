"use client";

import { useState, useEffect, useMemo } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { PageTitle } from '@/components/shared/page-title';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import {
  getAvailableMoviesWithShowtimes,
  getCinemasShowingMovie,
  getDatesForMovieInCinema,
  getShowtimesForMovieInCinemaOnDate,
  type Movie,
  type Cinema,
  type Showtime,
  mockMovies, // For defaultMonth fallback
} from '@/data/mock-data';
import { format, parseISO, startOfToday, isBefore } from 'date-fns';
import { vi } from 'date-fns/locale';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Ticket, Film, Building, CalendarDays, Clock, AlertTriangle, ArrowLeft, ArrowRight } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

type Step = 'movie' | 'cinema' | 'date' | 'showtime' | 'summary';

export default function QuickBookPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>('movie');
  
  const [selectedMovie, setSelectedMovie] = useState<Movie | undefined>(undefined);
  const [selectedCinema, setSelectedCinema] = useState<Cinema | undefined>(undefined);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedShowtime, setSelectedShowtime] = useState<Showtime | undefined>(undefined);

  const today = startOfToday();

  const allAvailableMoviesForBooking = useMemo(() => getAvailableMoviesWithShowtimes(), []);
  
  const nowShowingMoviesForSelection = useMemo(() => {
    return allAvailableMoviesForBooking.filter(movie => movie.status === 'now_showing');
  }, [allAvailableMoviesForBooking]);

  const availableCinemas = useMemo(() => {
    if (!selectedMovie) return [];
    return getCinemasShowingMovie(selectedMovie.id);
  }, [selectedMovie]);

  const availableDates = useMemo(() => { // Returns 'YYYY-MM-DD' strings
    if (!selectedMovie || !selectedCinema) return [];
    return getDatesForMovieInCinema(selectedMovie.id, selectedCinema.id);
  }, [selectedMovie, selectedCinema]);

  const availableShowtimes = useMemo(() => {
    if (!selectedMovie || !selectedCinema || !selectedDate) return [];
    const dateStr = format(selectedDate, 'yyyy-MM-dd');
    return getShowtimesForMovieInCinemaOnDate(selectedMovie.id, selectedCinema.id, dateStr)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  }, [selectedMovie, selectedCinema, selectedDate]);


  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    setSelectedCinema(undefined);
    setSelectedDate(undefined);
    setSelectedShowtime(undefined);
    if (getCinemasShowingMovie(movie.id).length > 0) {
      setCurrentStep('cinema');
    } else {
      // Stay on movie step but it will show an error for the selected movie
      // Or, ideally, prevent selection of movies with no cinemas (though getAvailableMoviesWithShowtimes should handle this)
    }
  };
  
  const handleCinemaSelect = (cinema: Cinema) => {
    setSelectedCinema(cinema);
    setSelectedDate(undefined);
    setSelectedShowtime(undefined);
    if (selectedMovie && getDatesForMovieInCinema(selectedMovie.id, cinema.id).length > 0) {
       setCurrentStep('date');
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedShowtime(undefined);
    if (date && selectedMovie && selectedCinema) {
        const dateStr = format(date, 'yyyy-MM-dd');
        if(getShowtimesForMovieInCinemaOnDate(selectedMovie.id, selectedCinema.id, dateStr).length > 0) {
            setCurrentStep('showtime');
        }
    }
  };
  
  const handleShowtimeSelect = (showtime: Showtime) => {
    setSelectedShowtime(showtime);
    setCurrentStep('summary');
  };

  const handleBack = () => {
    if (currentStep === 'summary') {
      setSelectedShowtime(undefined);
      setCurrentStep('showtime');
    } else if (currentStep === 'showtime') {
      setSelectedDate(undefined);
      setCurrentStep('date');
    } else if (currentStep === 'date') {
      setSelectedCinema(undefined);
      setCurrentStep('cinema');
    } else if (currentStep === 'cinema') {
      setSelectedMovie(undefined);
      setCurrentStep('movie');
    }
  };

  const handleProceedToBooking = () => {
    if (selectedMovie && selectedShowtime) {
      router.push(`/booking/${selectedMovie.id}?showtime=${selectedShowtime.id}`);
    }
  };

  const steps = [
    { id: 'movie', title: 'Chọn Phim', Icon: Film },
    { id: 'cinema', title: 'Chọn Rạp', Icon: Building },
    { id: 'date', title: 'Chọn Ngày', Icon: CalendarDays },
    { id: 'showtime', title: 'Chọn Suất Chiếu', Icon: Clock },
    { id: 'summary', title: 'Tóm Tắt Đặt Vé', Icon: Ticket },
  ];

  const currentStepInfo = steps.find(s => s.id === currentStep);
  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  const renderStepContent = () => {
    switch (currentStep) {
      case 'movie':
        if (nowShowingMoviesForSelection.length === 0) {
          return <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Không có phim đang chiếu</AlertTitle>
            <AlertDescription>Hiện tại không có phim nào đang chiếu có lịch đặt vé. Vui lòng quay lại sau.</AlertDescription>
          </Alert>;
        }
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Film className="h-6 w-6 text-primary"/>Chọn phim đang chiếu</CardTitle>
              <CardDescription>Vui lòng chọn phim bạn muốn xem.</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[500px] pr-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {nowShowingMoviesForSelection.map(movie => (
                  <Card key={movie.id} className="overflow-hidden cursor-pointer hover:shadow-lg transition-transform hover:scale-105" onClick={() => handleMovieSelect(movie)}>
                    <div className="aspect-[2/3] relative w-full">
                       <Image src={movie.posterUrl} alt={movie.title} layout="fill" objectFit="cover" data-ai-hint={movie.aiHint}/>
                    </div>
                    <CardContent className="p-3">
                      <h3 className="font-semibold truncate text-base">{movie.title}</h3>
                      <p className="text-xs text-muted-foreground">{movie.genre.join(', ')}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              </ScrollArea>
            </CardContent>
          </Card>
        );
      case 'cinema':
        if (!selectedMovie) return null; // Should not happen if logic is correct
        if (availableCinemas.length === 0) {
          return <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Không có rạp chiếu</AlertTitle>
            <AlertDescription>Phim "{selectedMovie.title}" không có suất chiếu ở rạp nào. Vui lòng chọn phim khác.</AlertDescription>
          </Alert>;
        }
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Building className="h-6 w-6 text-primary"/>Chọn rạp chiếu phim</CardTitle>
              <CardDescription>Các rạp đang chiếu phim: {selectedMovie?.title}</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-3">
                <div className="space-y-3">
                  {availableCinemas.map(cinema => (
                    <Button
                      key={cinema.id}
                      variant={selectedCinema?.id === cinema.id ? "default" : "outline"}
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
      case 'date':
        if (!selectedMovie || !selectedCinema) return null;
         if (availableDates.length === 0) {
          return <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Không có ngày chiếu</AlertTitle>
            <AlertDescription>Rạp {selectedCinema.name} không có lịch chiếu cho phim "{selectedMovie.title}". Vui lòng chọn rạp hoặc phim khác.</AlertDescription>
          </Alert>;
        }
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><CalendarDays className="h-6 w-6 text-primary"/>Chọn ngày xem phim</CardTitle>
              <CardDescription>Phim: {selectedMovie?.title} tại rạp: {selectedCinema?.name}</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                disabled={(date) => 
                    isBefore(date, today) || 
                    !availableDates.includes(format(date, 'yyyy-MM-dd'))
                  }
                locale={vi}
                className="rounded-md border"
                defaultMonth={availableDates.length > 0 ? parseISO(availableDates[0]) : new Date()}
              />
            </CardContent>
          </Card>
        );
      case 'showtime':
        if (!selectedMovie || !selectedCinema || !selectedDate) return null;
        if (availableShowtimes.length === 0) {
          return <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Không có suất chiếu</AlertTitle>
            <AlertDescription>Không có suất chiếu cho phim "{selectedMovie.title}" tại {selectedCinema.name} vào ngày {format(selectedDate, 'dd/MM/yyyy', { locale: vi })}. Vui lòng chọn lại.</AlertDescription>
          </Alert>;
        }
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Clock className="h-6 w-6 text-primary"/>Chọn suất chiếu</CardTitle>
              <CardDescription>Cho phim {selectedMovie?.title} tại {selectedCinema?.name} vào {selectedDate ? format(selectedDate, 'dd/MM/yyyy', { locale: vi }) : ''}.</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[300px] pr-3">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                  {availableShowtimes.map(showtime => (
                    <Button
                      key={showtime.id}
                      variant={selectedShowtime?.id === showtime.id ? "default" : "outline"}
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
          // This case should ideally be prevented by disabling "next" if choices are invalid
           setCurrentStep('movie'); // Go back to start if data is missing
           return <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Lỗi Thông Tin</AlertTitle>
            <AlertDescription>Đã có lỗi xảy ra, vui lòng thử lại từ đầu.</AlertDescription>
          </Alert>;
        }
        const hall = selectedCinema.halls.find(h => h.id === selectedShowtime.hallId);
        return (
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-primary flex items-center gap-2"><Ticket className="h-7 w-7"/>Xác Nhận Đặt Vé</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
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
          {currentStep !== 'movie' && (
            <Button variant="outline" onClick={handleBack} className="mt-6">
              <ArrowLeft className="mr-2 h-4 w-4"/> Quay Lại
            </Button>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

