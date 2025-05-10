"use client";

import { useState } from 'react';
import { MainLayout } from '@/components/layout/main-layout';
import { PageTitle } from '@/components/shared/page-title';
import { SeatMap } from '@/components/booking/seat-map';
import { BookingForm } from '@/components/booking/booking-form';
import { getMovieById, type Movie, type Showtime as ShowtimeType } from '@/data/mock-data'; // Assuming Showtime type is exported
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Ticket, Calendar, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BookingPageProps {
  params: { movieId: string };
}

interface SelectedSeat {
  id: string;
  label: string;
  status: string; // Assuming SeatStatus is a string union
}

export default function BookingPage({ params }: BookingPageProps) {
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const showtimeId = searchParams.get('showtime'); // Example: ?showtime=st1

  const movie = getMovieById(params.movieId);
  // In a real app, you'd fetch showtime details using showtimeId
  // For now, let's assume a placeholder showtime if movie exists
  const placeholderShowtime = movie ? { time: "19:00", date: "2024-07-28", hall: "Hội trường A", format: "2D" } : null;

  const [selectedSeats, setSelectedSeats] = useState<SelectedSeat[]>([]);

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

    console.log("Booking Submitted:", {
      movie: movie?.title,
      showtime: placeholderShowtime,
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
    
    // Redirect to a confirmation page or profile/history
    router.push(`/profile?booking_success=${params.movieId}`); 
  };

  if (!movie) {
    return (
      <MainLayout>
        <div className="container mx-auto flex h-[60vh] items-center justify-center px-4 py-12 text-center md:px-6">
          <Alert variant="destructive">
            <AlertTitle>Phim không hợp lệ</AlertTitle>
            <AlertDescription>
              Không thể tiến hành đặt vé vì thông tin phim không tìm thấy.
              <Button variant="link" asChild className="mt-2 block"><Link href="/">Trở về trang chủ</Link></Button>
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
            {placeholderShowtime && (
                <Card className="mb-6 bg-secondary/50">
                    <CardHeader>
                        <CardTitle className="text-xl">Thông tin suất chiếu</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-4 text-sm">
                        <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" /> <span>{placeholderShowtime.date}</span></div>
                        <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" /> <span>{placeholderShowtime.time}</span></div>
                        <div className="flex items-center gap-2">Phòng: <span>{placeholderShowtime.hall}</span></div>
                        <div className="flex items-center gap-2">Định dạng: <span>{placeholderShowtime.format}</span></div>
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
                        {placeholderShowtime && <p className="text-xs text-muted-foreground">{placeholderShowtime.date} - {placeholderShowtime.time} - {placeholderShowtime.hall}</p>}
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
