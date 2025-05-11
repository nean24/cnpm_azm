
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
  mockCinemas, // for deep link showtime lookup
  mockShowtimes, // for deep link showtime lookup
  getCinemasShowingMovie,
  getDatesForMovieInCinema,
  getShowtimesForMovieInCinemaOnDate,
  Hall
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


interface BookingPageProps {
  params: { movieId: string };
}

interface SelectedSeat {
  id: string;
  label: string;
  status: string; 
}

type BookingStep = 'select_cinema' | 'select_date' | 'select_showtime' | 'select_seats' | 'error';


export default function BookingPage({ params: paramsProp }: BookingPageProps) {
  const router = useRouter();
  const { toast } = useToast();
  const searchParamsHook = useSearchParams(); // Renamed to avoid conflict with local 'searchParams'
  
  // Correctly use the `use` hook for route parameters
  const resolvedPageParams = use(paramsProp as any);
  const movieId = resolvedPageParams?.movieId;

  const [movie, setMovie] = useState<Movie | null | undefined>(undefined); // undefined for loading, null for not found

  const [currentStep, setCurrentStep] = useState<BookingStep>('select_cinema');

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
    if (!movieId) {
      setMovie(null);
      setCurrentStep('error');
      return;
    }

    const fetchedMovie = getMovieById(movieId);
    setMovie(fetchedMovie);

    if (!fetchedMovie) {
      setCurrentStep('error');
      return;
    }

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
    
    // Default flow: start by selecting cinema
    const cinemas = getCinemasShowingMovie(fetchedMovie.id);
    setAvailableCinemas(cinemas);
    setCurrentStep('select_cinema');
    // Reset selections for the new flow if not deep-linked
    setSelectedCinema(undefined);
    setSelectedDate(undefined);
    setSelectedShowtime(undefined);
    setAvailableDates([]);
    setAvailableShowtimes([]);

  }, [movieId, searchParamsHook]);


  // Update available dates when cinema changes
  useEffect(() => {
    if (movie && selectedCinema && currentStep !== 'select_seats') { // Avoid re-fetching if jumping to seats
      const dates = getDatesForMovieInCinema(movie.id, selectedCinema.id);
      setAvailableDates(dates);
      setSelectedDate(undefined); // Reset date
      setAvailableShowtimes([]);
      setSelectedShowtime(undefined);
      if (dates.length > 0) {
        setCurrentStep('select_date');
      } else {
        // No dates available for this cinema, might need user to pick another cinema
        // Or show a message
      }
    }
  }, [movie, selectedCinema]); // Removed currentStep from deps to avoid loops

  // Update available showtimes when date changes
  useEffect(() => {
    if (movie && selectedCinema && selectedDate && currentStep !== 'select_seats') {
      const dateStr = format(selectedDate, 'yyyy-MM-dd');
      const showtimes = getShowtimesForMovieInCinemaOnDate(movie.id, selectedCinema.id, dateStr);
      setAvailableShowtimes(showtimes);
      setSelectedShowtime(undefined); // Reset showtime
      if (showtimes.length > 0) {
        setCurrentStep('select_showtime');
      } else {
        // No showtimes for this date
      }
    }
  }, [movie, selectedCinema, selectedDate]); // Removed currentStep

  const handleCinemaSelect = (cinema: Cinema) => {
    setSelectedCinema(cinema);
    // useEffect for selectedCinema will trigger date fetching
  };

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    // useEffect for selectedDate will trigger showtime fetching
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
    if (!movie || !selectedShowtime || !selectedCinema || !selectedDate) {
      toast({ variant: "destructive", title: "Lỗi thông tin", description: "Không thể đặt vé do thiếu thông tin." });
      return;
    }

    console.log("Booking Submitted:", {
      movie: movie.title,
      cinema: selectedCinema.name,
      date: format(selectedDate, 'yyyy-MM-dd'),
      showtime: selectedShowtime,
      seats: selectedSeats.map(s => s.label),
      userInfo: formData,
    });

    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({ title: "Đặt vé thành công!", description: `Vé phim "${movie.title}" đã được gửi đến email ${formData.email}.`, duration: 5000 });
    
    router.push(`/profile?booking_success=${movieId}`); 
  };

  const handleBack = () => {
    if (currentStep === 'select_seats') setCurrentStep('select_showtime');
    else if (currentStep === 'select_showtime') {
      setSelectedShowtime(undefined);
      setAvailableShowtimes([]); // May need to re-evaluate available dates logic
      setCurrentStep('select_date');
    }
    else if (currentStep === 'select_date') {
      setSelectedDate(undefined);
      setAvailableDates([]);
      setCurrentStep('select_cinema');
    }
    else if (currentStep === 'select_cinema') {
      // Can't go further back from cinema selection for a specific movie booking.
      // Or, could redirect to movie detail page: router.push(`/movies/${movieId}`);
    }
  };

  const getHallName = (cinema: Cinema, hallId: string): string => {
    const hall = cinema.halls.find(h => h.id === hallId);
    return hall ? hall.name : 'Không rõ';
  };


  if (movie === undefined) { 
    return (
      <MainLayout>
        <div className="container mx-auto flex h-[60vh] items-center justify-center px-4 py-12">
          <p className="text-xl text-muted-foreground">Đang tải thông tin phim...</p>
        </div>
      </MainLayout>
    );
  }

  if (!movie || currentStep === 'error') {
    return (
      <MainLayout>
        <div className="container mx-auto flex h-[calc(100vh-theme(spacing.40))] items-center justify-center px-4 py-12 text-center md:px-6">
           <Alert variant="destructive" className="max-w-md">
            <AlertTitle className="text-2xl">Phim không hợp lệ</AlertTitle>
            <AlertDescription className="text-lg">
              Không thể tiến hành đặt vé vì thông tin phim không tìm thấy.
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
      case 'select_cinema':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Building className="h-6 w-6 text-primary"/>Chọn rạp chiếu phim</CardTitle>
              <CardDescription>Các rạp đang chiếu phim: {movie.title}</CardDescription>
            </CardHeader>
            <CardContent>
              {availableCinemas.length > 0 ? (
                <ScrollArea className="h-[300px] pr-3">
                  <div className="space-y-2">
                    {availableCinemas.map(cinema => (
                      <Button key={cinema.id} variant="outline" className="w-full justify-start h-auto py-3 text-left" onClick={() => handleCinemaSelect(cinema)}>
                        <div>
                            <p className="font-semibold">{cinema.name}</p>
                            <p className="text-xs text-muted-foreground">{cinema.address}</p>
                        </div>
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              ) : <p className="text-muted-foreground">Không có rạp nào chiếu phim này.</p>}
            </CardContent>
          </Card>
        );
      case 'select_date':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><CalendarDays className="h-6 w-6 text-primary"/>Chọn ngày xem phim</CardTitle>
              <CardDescription>Tại rạp: {selectedCinema?.name}</CardDescription>
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
              ) : <p className="text-muted-foreground">Rạp này không có lịch chiếu cho phim "{movie.title}".</p>}
            </CardContent>
          </Card>
        );
      case 'select_showtime':
        return (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Clock className="h-6 w-6 text-primary"/>Chọn suất chiếu</CardTitle>
              <CardDescription>
                Phim: {movie.title} tại {selectedCinema?.name} vào {selectedDate ? format(selectedDate, 'dd/MM/yyyy', {locale: vi}) : ''}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {availableShowtimes.length > 0 ? (
                <ScrollArea className="h-[300px] pr-3">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {availableShowtimes.map(st => (
                      <Button key={st.id} variant="outline" className="flex flex-col h-auto py-2 items-center text-center hover:bg-accent hover:text-accent-foreground" onClick={() => handleShowtimeSelect(st)}>
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
    select_cinema: "Chọn Rạp",
    select_date: "Chọn Ngày",
    select_showtime: "Chọn Suất Chiếu",
    select_seats: "Chọn Ghế & Thanh Toán",
    error: "Lỗi"
  };


  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <PageTitle title={`Đặt Vé: ${movie.title}`} subtitle={stepTitles[currentStep]} />

        <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2">
            {/* Movie Info Card - always visible once movie is loaded */}
            <Card className="mb-6 bg-secondary/10">
                <CardContent className="p-4 flex gap-4 items-start">
                    <div className="flex-shrink-0">
                        <Image 
                            src={movie.posterUrl} 
                            alt={movie.title} 
                            width={120} 
                            height={180} 
                            className="rounded-md aspect-[2/3] object-cover" 
                            data-ai-hint={movie.aiHint} />
                    </div>
                    <div className="flex-grow space-y-1">
                        <h3 className="text-xl font-semibold">{movie.title}</h3>
                        <p className="text-sm text-muted-foreground">{movie.genre.join(', ')}</p>
                        <p className="text-sm text-muted-foreground">{movie.durationMinutes} phút - {movie.rating}</p>
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

            {renderStepContent()}

            {currentStep !== 'select_cinema' && currentStep !== 'select_seats' && currentStep !== 'error' && (
              <Button variant="outline" onClick={handleBack} className="mt-6">
                <ChevronLeft className="mr-2 h-4 w-4" /> Quay lại
              </Button>
            )}
          </div>

          <div className="lg:col-span-1">
             {/* Summary Card always on right, but content depends on selectedShowtime */}
            <Card className="shadow-lg sticky top-24">
              <CardHeader>
                <CardTitle className="text-xl">Tóm Tắt Đơn Hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {!selectedShowtime && currentStep !== 'select_seats' && (
                     <p className="text-sm text-muted-foreground">Vui lòng hoàn tất các bước chọn suất chiếu để xem tóm tắt.</p>
                )}
                {(selectedShowtime || currentStep === 'select_seats') && movie && (
                <>
                    <div className="flex items-center gap-3">
                        <Image 
                            src={movie.posterUrl} 
                            alt={movie.title} 
                            width={80} 
                            height={120} 
                            className="rounded-md aspect-[2/3] object-cover" 
                            data-ai-hint={movie.aiHint} />
                        <div>
                            <h3 className="font-semibold">{movie.title}</h3>
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
    </MainLayout>
  );
}
