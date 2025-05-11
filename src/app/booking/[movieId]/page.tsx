
"use client";

import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { PageTitle } from '@/components/shared/page-title';
import { SeatMap } from '@/components/booking/seat-map';
import { BookingForm } from '@/components/booking/booking-form';
import { getMovieById, type Movie, type Showtime as ShowtimeType } from '@/data/mock-data'; 
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Ticket, Calendar, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';


interface BookingPageProps {
  params: { movieId: string };
}

interface SelectedSeat {
  id: string;
  label: string;
  status: string; 
}

export default function BookingPage({ params }: BookingPageProps) {
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const showtimeQuery = searchParams.get('showtime'); 

  const [movie, setMovie] = useState<Movie | undefined | null>(null);
  const [showtime, setShowtime] = useState<ShowtimeType | null>(null); // Placeholder for actual showtime data
  const [selectedSeats, setSelectedSeats] = useState<SelectedSeat[]>([]);

  useEffect(() => {
    const fetchedMovie = getMovieById(params.movieId);
    setMovie(fetchedMovie);

    // In a real app, you'd fetch showtime details using showtimeQuery
    // For this mock, we'll find it or use a placeholder
    if (fetchedMovie && showtimeQuery) {
      // This is a simplified mock. A real app would query its showtime data source.
      // Here, we assume a placeholder structure.
      const placeholderShowtime = { 
        id: showtimeQuery,
        time: "19:00", 
        date: new Date().toISOString().split('T')[0], // Today's date
        hall: "Hội trường A", 
        format: "2D" 
      };
      setShowtime(placeholderShowtime as any);
    } else if (fetchedMovie) {
      // Fallback if no showtime in query, perhaps default to first available or just movie info
       const fallbackShowtime = { 
        id: 'default',
        time: "N/A", 
        date: "N/A", 
        hall: "N/A", 
        format: "N/A" 
      };
      setShowtime(fallbackShowtime as any);
    }

  }, [params.movieId, showtimeQuery]);


  const handleSeatsSelected = (seats: SelectedSeat[]) => {
    setSelectedSeats(seats);
  };

  const handleSubmitBooking = async (formData: { fullName: string; phone: string; email: string }) => {
    if (selectedSeats.length === 0) {
      toast({
        variant: "destructive",
        title: "Chưa chọn ghế",
        description: "Vui lòng chọn ít nhất một ghế.",
      });
      return;
    }
    if (!movie || !showtime) {
        toast({
            variant: "destructive",
            title: "Lỗi thông tin",
            description: "Không thể đặt vé do thiếu thông tin phim hoặc suất chiếu.",
        });
        return;
    }

    console.log("Booking Submitted:", {
      movie: movie?.title,
      showtime: showtime,
      seats: selectedSeats.map(s => s.label),
      userInfo: formData,
    });

    // Simulate API call for booking
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Đặt vé thành công!",
      description: `Vé phim "${movie?.title}" đã được gửi đến email ${formData.email}.`,
      duration: 5000,
    });
    
    router.push(`/profile?booking_success=${params.movieId}`); 
  };

  if (movie === null) { // Still loading movie data
    return (
      <MainLayout>
        <div className="container mx-auto flex h-[60vh] items-center justify-center px-4 py-12">
          <p className="text-xl text-muted-foreground">Đang tải thông tin phim...</p>
        </div>
      </MainLayout>
    )
  }

  if (!movie) {
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

  // Placeholder pricing
  const ticketPrice = 100000; // 100,000 VND per ticket
  const totalAmount = selectedSeats.length * ticketPrice;

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <PageTitle title={`Đặt Vé: ${movie.title}`} />

        <div className="grid gap-8 lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2">
            {showtime && (
                <Card className="mb-6 bg-secondary/50">
                    <CardHeader>
                        <CardTitle className="text-xl">Thông tin suất chiếu</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-4 text-sm">
                        <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /> <span>{showtime.date !== "N/A" ? new Date(showtime.date).toLocaleDateString('vi-VN') : "N/A"}</span></div>
                        <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> <span>{showtime.time}</span></div>
                        <div className="flex items-center gap-2">Phòng: <span>{showtime.hall}</span></div>
                        <div className="flex items-center gap-2">Định dạng: <span>{showtime.format}</span></div>
                    </CardContent>
                </Card>
            )}
            <h2 className="mb-4 text-2xl font-semibold">Chọn Ghế</h2>
            <SeatMap onSeatsSelected={handleSeatsSelected} maxSeats={10} />
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-24 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Tóm Tắt Đơn Hàng</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                    <Image src={movie.posterUrl} alt={movie.title} width={80} height={120} className="rounded-md aspect-[2/3] object-cover" data-ai-hint="movie poster small" />
                    <div>
                        <h3 className="font-semibold">{movie.title}</h3>
                        {showtime && <p className="text-xs text-muted-foreground">{showtime.date !== "N/A" ? new Date(showtime.date).toLocaleDateString('vi-VN') : "N/A"} - {showtime.time} - {showtime.hall}</p>}
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
              </CardContent>
            </Card>
            
            <div className="mt-8">
             <BookingForm onSubmitBooking={handleSubmitBooking} />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

