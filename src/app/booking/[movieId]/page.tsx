"use client";

import { useState, useEffect, useMemo, use } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { PageTitle } from '@/components/shared/page-title';
import { SeatMap } from '@/components/booking/seat-map';
import { BookingForm } from '@/components/booking/booking-form';
import { 
  getMovieById, 
  type Movie, 
  type Showtime as ShowtimeType,
  type Cinema,
  mockCinemas, 
  mockShowtimes, 
  getCinemasShowingMovie,
  getDatesForMovieInCinema,
  getShowtimesForMovieInCinemaOnDate,
  Hall,
  getAvailableMoviesWithShowtimes
} from '@/data/mock-data'; 
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Ticket, CalendarDays, Clock, Film, Building, CheckCircle, ChevronRight, ChevronLeft, Edit3 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import { format, parseISO, startOfToday, isBefore } from 'date-fns';
import { vi } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


interface BookingPageProps {
  params: { movieId: string };
}

interface SelectedSeat {
  id: string;
  label: string;
  status: string; 
}

type BookingStep = 'select_movie' | 'select_cinema' | 'select_date' | 'select_showtime' | 'select_seats' | 'error';


export default function BookingPage({ params: paramsProp }: BookingPageProps) {
  const router = useRouter();
  const { toast } = useToast();
  const searchParamsHook = useSearchParams(); 
  
  const resolvedPageParams = use(paramsProp as any);
  const initialMovieIdFromRoute = resolvedPageParams?.movieId;

  const [currentStep, setCurrentStep] = useState<BookingStep>('select_movie');
  
  const [availableMovies, setAvailableMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null | undefined>(undefined); // undefined for loading, null for not found

  const [availableCinemas, setAvailableCinemas] = useState<Cinema[]>([]);
  const [selectedCinema, setSelectedCinema] = useState<Cinema | undefined>(undefined);

  const [availableDates, setAvailableDates] = useState<string[]>([]); // 'YYYY-MM-DD'
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined); // Date object for Calendar

  const [availableShowtimes, setAvailableShowtimes] = useState<ShowtimeType[]>([]);
  const [selectedShowtime, setSelectedShowtime] = useState<ShowtimeType | undefined>(undefined);
  
  const [selectedSeats, setSelectedSeats] = useState<SelectedSeat[]>([]);

  const today = startOfToday();

  // Initial data loading and deep link handling
  useEffect(() => {
    const moviesForBooking = getAvailableMoviesWithShowtimes();
    setAvailableMovies(moviesForBooking);

    if (initialMovieIdFromRoute) {
      const fetchedMovie = getMovieById(initialMovieIdFromRoute);
      if (fetchedMovie && moviesForBooking.some(m => m.id === fetchedMovie.id)) {
        setSelectedMovie(fetchedMovie);
        setCurrentStep('select_cinema'); // Default next step if movie is pre-selected

        const showtimeQuery = searchParamsHook.get('showtime');
        if (showtimeQuery) {
          const deepLinkedShowtime = mockShowtimes.find(st => st.id === showtimeQuery && st.movieId === fetchedMovie.id);
          if (deepLinkedShowtime) {
            const cinema = mockCinemas.find(c => c.id === deepLinkedShowtime.cinemaId);
            if (cinema) {
              setSelectedCinema(cinema);
              setSelectedDate(parseISO(deepLinkedShowtime.date));
              setSelectedShowtime(deepLinkedShowtime);
              
              // Populate available states for consistency if user goes back
              setAvailableCinemas(getCinemasShowingMovie(fetchedMovie.id));
              setAvailableDates(getDatesForMovieInCinema(fetchedMovie.id, cinema.id));
              setAvailableShowtimes(getShowtimesForMovieInCinemaOnDate(fetchedMovie.id, cinema.id, deepLinkedShowtime.date));
              setCurrentStep('select_seats');
              return; 
            }
          }
        }
      } else {
        // initialMovieIdFromRoute is invalid or not available for booking
        setSelectedMovie(null); // Mark as not found
        setCurrentStep('error');
      }
    } else {
      // No movie ID from route, start with movie selection
      setCurrentStep('select_movie');
    }
  }, [initialMovieIdFromRoute, searchParamsHook]);


  // Update available cinemas when movie changes
  useEffect(() => {
    if (selectedMovie && currentStep !== 'select_seats') {
      const cinemas = getCinemasShowingMovie(selectedMovie.id);
      setAvailableCinemas(cinemas);
      setSelectedCinema(undefined); // Reset
      setAvailableDates([]);
      setSelectedDate(undefined);
      setAvailableShowtimes([]);
      setSelectedShowtime(undefined);
      if (cinemas.length > 0 && currentStep === 'select_movie') { // Only auto-advance if coming from movie selection
         setCurrentStep('select_cinema');
      }
    }
  }, [selectedMovie]);

  // Update available dates when cinema changes
  useEffect(() => {
    if (selectedMovie && selectedCinema && currentStep !== 'select_seats') { 
      const dates = getDatesForMovieInCinema(selectedMovie.id, selectedCinema.id);
      setAvailableDates(dates);
      setSelectedDate(undefined); 
      setAvailableShowtimes([]);
      setSelectedShowtime(undefined);
      if (dates.length > 0 && (currentStep === 'select_cinema' || currentStep === 'select_movie')) {
        setCurrentStep('select_date');
      }
    }
  }, [selectedCinema]); 

  // Update available showtimes when date changes
  useEffect(() => {
    if (selectedMovie && selectedCinema && selectedDate && currentStep !== 'select_seats') {
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      const showtimes = getShowtimesForMovieInCinemaOnDate(selectedMovie.id, selectedCinema.id, dateStr);
      setAvailableShowtimes(showtimes);
      setSelectedShowtime(undefined); 
      if (showtimes.length > 0 && (currentStep === 'select_date' || currentStep === 'select_cinema' || currentStep === 'select_movie')) {
        setCurrentStep('select_showtime');
      }
    }
  }, [selectedDate]); 

  const handleMovieSelect = (movieId: string) => {
    const movie = availableMovies.find(m => m.id === movieId);
    setSelectedMovie(movie);
    setCurrentStep('select_cinema'); // Move to cinema selection
  };
  
  const handleCinemaSelect = (cinema: Cinema) => {
    setSelectedCinema(cinema);
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleShowtimeSelect = (showtime: ShowtimeType) => {
    setSelectedShowtime(showtime);
    setCurrentStep('select_seats');
  };

  const handleSeatsSelected = (seats: SelectedSeat[]) => {
    setSelectedSeats(seats);
  };

  const handleSubmitBooking = async (formData: { fullName: string; phone: string; email: string }) => {
    if (selectedSeats.length === 0) {
      toast({ variant: "destructive", title: "Chưa chọn ghế", description: "Vui lòng chọn ít nhất một ghế." });
      return;
    }
    if (!selectedMovie || !selectedShowtime || !selectedCinema || !selectedDate) {
      toast({ variant: "destructive", title: "Lỗi thông tin", description: "Không thể đặt vé do thiếu thông tin." });
      return;
    }

    console.log("Booking Submitted:", {
      movie: selectedMovie.title,
      cinema: selectedCinema.name,
      date: format(selectedDate, 'yyyy-MM-dd'),
      showtime: selectedShowtime,
      seats: selectedSeats.map(s => s.label),
      userInfo: formData,
    });

    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({ title: "Đặt vé thành công!", description: `Vé phim "${selectedMovie.title}" đã được gửi đến email ${formData.email}.`, duration: 5000 });
    
    router.push(`/profile?booking_success=${selectedMovie.id}`); 
  };

  const handleBack = () => {
    if (currentStep === 'select_seats') setCurrentStep('select_showtime');
    else if (currentStep === 'select_showtime') {
      setSelectedShowtime(undefined);
      setCurrentStep('select_date');
    }
    else if (currentStep === 'select_date') {
      setSelectedDate(undefined);
      setCurrentStep('select_cinema');
    }
    else if (currentStep === 'select_cinema') {
      setSelectedCinema(undefined);
       if(initialMovieIdFromRoute) { // If a movie was passed in URL, can't go back further than cinema for that movie
          // Or allow going back to movie selection:
          // setSelectedMovie(undefined); setCurrentStep('select_movie');
       } else {
         setSelectedMovie(undefined); // Allow selecting a different movie
         setCurrentStep('select_movie');
       }
    }
    else if (currentStep === 'select_movie'){
        // Cannot go back further
    }
  };

  const getHallName = (cinema: Cinema, hallId: string): string => {
    const hall = cinema.halls.find(h => h.id === hallId);
    return hall ? hall.name : 'Không rõ';
  };

  if (selectedMovie === undefined && (initialMovieIdFromRoute || availableMovies.length > 0) && currentStep !== 'error') { 
    return (
      <MainLayout>
        <div className="container mx-auto flex h-[60vh] items-center justify-center px-4 py-12">
          <p className="text-xl text-muted-foreground">Đang tải thông tin...</p>
        </div>
      </MainLayout>
    );
  }
  
  if (currentStep === 'error' || (initialMovieIdFromRoute && selectedMovie === null)) {
     return (
      <MainLayout>
        <div className="container mx-auto flex h-[calc(100vh-theme(spacing.40))] items-center justify-center px-4 py-12 text-center md:px-6">
           <Alert variant="destructive" className="max-w-md">
            <AlertTitle className="text-2xl">Không thể đặt vé</AlertTitle>
            <AlertDescription className="text-lg">
              {initialMovieIdFromRoute && selectedMovie === null 
                ? "Phim bạn chọn không tìm thấy hoặc không có suất chiếu." 
                : "Đã có lỗi xảy ra. Vui lòng thử lại."}
              <Button variant="link" asChild className="mt-4 block text-lg"><Link href="/">Trở về trang chủ</Link></Button>
            </AlertDescription>
          </Alert>
        </div>
      </MainLayout>
    );
  }


  const ticketPrice = 100000; 
  const totalAmount = selectedSeats.length * ticketPrice;

  const renderStepContent = () => {
    switch (currentStep) {
      case 'select_movie':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Film className="h-6 w-6 text-primary"/>Chọn phim</CardTitle>
              <CardDescription>Chọn phim bạn muốn xem từ danh sách các phim đang chiếu.</CardDescription>
            </CardHeader>
            <CardContent>
              {availableMovies.length > 0 ? (
                 <Select onValueChange={handleMovieSelect} defaultValue={selectedMovie?.id}>
                  <SelectTrigger className="w-full text-base md:text-lg py-6">
                    <SelectValue placeholder="-- Chọn phim --" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableMovies.map(movie => (
                      <SelectItem key={movie.id} value={movie.id} className="text-base md:text-lg py-2">
                        {movie.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : <p className="text-muted-foreground">Không có phim nào hiện đang có suất chiếu.</p>}
            </CardContent>
          </Card>
        );
      case 'select_cinema':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Building className="h-6 w-6 text-primary"/>Chọn rạp chiếu phim</CardTitle>
              <CardDescription>Các rạp đang chiếu phim: {selectedMovie?.title}</CardDescription>
            </CardHeader>
            <CardContent>
              {availableCinemas.length > 0 ? (
                <ScrollArea className="h-[300px] pr-3">
                  <div className="space-y-2">
                    {availableCinemas.map(cinema => (
                      <Button key={cinema.id} variant={selectedCinema?.id === cinema.id ? "default" : "outline"} className="w-full justify-start h-auto py-3 text-left" onClick={() => handleCinemaSelect(cinema)}>
                        <div>
                            <p className="font-semibold">{cinema.name}</p>
                            <p className="text-xs text-muted-foreground">{cinema.address}</p>
                        </div>
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              ) : <p className="text-muted-foreground">Phim này hiện không có suất chiếu ở rạp nào.</p>}
            </CardContent>
          </Card>
        );
      case 'select_date':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><CalendarDays className="h-6 w-6 text-primary"/>Chọn ngày xem phim</CardTitle>
              <CardDescription>Phim: {selectedMovie?.title} tại rạp: {selectedCinema?.name}</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
             {availableDates.length > 0 ? (
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={(date) => 
                    isBefore(date, today) || 
                    !availableDates.includes(format(date, 'yyyy-MM-dd'))
                  }
                  initialFocus
                  locale={vi}
                  className="rounded-md border"
                />
              ) : <p className="text-muted-foreground">Rạp này không có lịch chiếu cho phim "{selectedMovie?.title}".</p>}
            </CardContent>
          </Card>
        );
      case 'select_showtime':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Clock className="h-6 w-6 text-primary"/>Chọn suất chiếu</CardTitle>
              <CardDescription>
                Phim: {selectedMovie?.title} tại {selectedCinema?.name} vào {selectedDate ? format(selectedDate, 'dd/MM/yyyy', {locale: vi}) : ''}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {availableShowtimes.length > 0 ? (
                <ScrollArea className="h-[300px] pr-3">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {availableShowtimes.map(st => (
                      <Button 
                        key={st.id} 
                        variant={selectedShowtime?.id === st.id ? "default" : "outline"} 
                        className="flex flex-col h-auto py-2 items-center text-center hover:bg-accent hover:text-accent-foreground" 
                        onClick={() => handleShowtimeSelect(st)}>
                        <span className="font-bold text-lg">{st.startTime}</span>
                        <span className="text-xs">{st.format} - {selectedCinema ? getHallName(selectedCinema, st.hallId): ''}</span>
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              ) : <p className="text-muted-foreground">Không có suất chiếu nào cho ngày này.</p>}
            </CardContent>
          </Card>
        );
      case 'select_seats':
        return (
          <>
            <h2 className="mb-4 text-2xl font-semibold">Chọn Ghế</h2>
            <SeatMap onSeatsSelected={handleSeatsSelected} maxSeats={10} />
          </>
        );
      default: return null;
    }
  };
  
  const stepTitles = {
    select_movie: "Chọn Phim",
    select_cinema: "Chọn Rạp",
    select_date: "Chọn Ngày",
    select_showtime: "Chọn Suất Chiếu",
    select_seats: "Chọn Ghế & Thanh Toán",
    error: "Lỗi"
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <PageTitle title={`Đặt Vé Phim`} subtitle={selectedMovie ? `${selectedMovie.title} - ${stepTitles[currentStep]}` : stepTitles[currentStep]} />

        <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2">
            {selectedMovie && currentStep !== 'select_movie' && (
              <Card className="mb-6 bg-secondary/10">
                  <CardContent className="p-4 flex gap-4 items-start">
                      <div className="flex-shrink-0">
                          <Image 
                              src={selectedMovie.posterUrl} 
                              alt={selectedMovie.title} 
                              width={120} 
                              height={180} 
                              className="rounded-md aspect-[2/3] object-cover" 
                              data-ai-hint={selectedMovie.aiHint} />
                      </div>
                      <div className="flex-grow space-y-1">
                          <h3 className="text-xl font-semibold">{selectedMovie.title}</h3>
                          <p className="text-sm text-muted-foreground">{selectedMovie.genre.join(', ')}</p>
                          <p className="text-sm text-muted-foreground">{selectedMovie.durationMinutes} phút - {selectedMovie.rating}</p>
                          {selectedCinema && (
                              <div className="mt-2 pt-2 border-t border-border/50">
                                  <p className="text-sm font-medium flex items-center gap-1"><Building className="h-4 w-4 text-primary" /> {selectedCinema.name}</p>
                                  {selectedDate && <p className="text-sm flex items-center gap-1"><CalendarDays className="h-4 w-4 text-primary" /> {format(selectedDate, 'dd/MM/yyyy', {locale: vi})}</p>}
                                  {selectedShowtime && <p className="text-sm flex items-center gap-1"><Clock className="h-4 w-4 text-primary" /> {selectedShowtime.startTime} - {selectedShowtime.format} ({selectedCinema ? getHallName(selectedCinema, selectedShowtime.hallId) : ''})</p>}
                              </div>
                          )}
                      </div>
                  </CardContent>
              </Card>
            )}

            {renderStepContent()}

            {currentStep !== 'select_movie' && currentStep !== 'select_seats' && currentStep !== 'error' && (
              <Button variant="outline" onClick={handleBack} className="mt-6">
                <ChevronLeft className="mr-2 h-4 w-4" /> Quay lại
              </Button>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Tóm Tắt Đơn Hàng</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {!selectedShowtime && currentStep !== 'select_seats' && (
                       <p className="text-sm text-muted-foreground">Vui lòng hoàn tất các bước chọn suất chiếu để xem tóm tắt.</p>
                  )}
                  {(selectedShowtime || currentStep === 'select_seats') && selectedMovie && (
                  <>
                      <div className="flex items-center gap-3">
                          <Image 
                              src={selectedMovie.posterUrl} 
                              alt={selectedMovie.title} 
                              width={80} 
                              height={120} 
                              className="rounded-md aspect-[2/3] object-cover" 
                              data-ai-hint={selectedMovie.aiHint} />
                          <div>
                              <h3 className="font-semibold">{selectedMovie.title}</h3>
                              {selectedCinema && selectedDate && selectedShowtime && (
                                  <p className="text-xs text-muted-foreground">
                                      {selectedCinema.name} <br/>
                                      {format(selectedDate, 'dd/MM/yyyy', {locale: vi})} - {selectedShowtime.startTime} - {getHallName(selectedCinema, selectedShowtime.hallId)}
                                  </p>
                              )}
                          </div>
                      </div>
                      <Separator />
                      <div>
                      <p className="font-semibold">Ghế đã chọn:</p>
                      {selectedSeats.length > 0 ? (
                          <p className="text-primary font-bold">{selectedSeats.map(s => s.label).join(', ')}</p>
                      ) : (
                          <p className="text-sm text-muted-foreground">Vui lòng chọn ghế.</p>
                      )}
                      </div>
                      <div className="flex justify-between font-semibold">
                      <span>Số lượng vé:</span>
                      <span>{selectedSeats.length}</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold text-primary">
                      <span>Tổng cộng:</span>
                      <span>{totalAmount.toLocaleString('vi-VN')} VNĐ</span>
                      </div>
                  </>
                  )}
                </CardContent>
              </Card>
              
              {currentStep === 'select_seats' && (
                <div className="mt-8">
                  <BookingForm onSubmitBooking={handleSubmitBooking} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

