import { MainLayout } from '@/components/layout/main-layout';
import { PageTitle } from '@/components/shared/page-title';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import { User, Ticket, Edit3, LogOut } from 'lucide-react';

// This page should be protected and only accessible by authenticated users.
// For now, it's a public placeholder.

export default function ProfilePage() {
  // Placeholder user data
  const user = {
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    phone: '0901234567',
  };

  // Placeholder booking history
  const bookingHistory = [
    { id: 'booking1', movieTitle: 'Siêu Anh Hùng Trở Lại', date: '2024-07-20', tickets: 2, total: '200,000 VND' },
    { id: 'booking2', movieTitle: 'Gia Đình Vui Nhộn', date: '2024-07-15', tickets: 4, total: '360,000 VND' },
  ];

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <PageTitle title="Thông Tin Tài Khoản" />

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-1">
            <Card className="shadow-lg">
              <CardHeader className="items-center text-center">
                <User className="mb-3 h-20 w-20 rounded-full bg-primary/10 p-3 text-primary" />
                <CardTitle className="text-2xl">{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p><span className="font-semibold">Số điện thoại:</span> {user.phone}</p>
                <Button variant="outline" className="w-full">
                  <Edit3 className="mr-2 h-4 w-4" /> Chỉnh sửa thông tin
                </Button>
                <Button variant="outline" className="w-full">
                  Đổi mật khẩu
                </Button>
                <Button variant="destructive" className="w-full">
                  <LogOut className="mr-2 h-4 w-4" /> Đăng xuất
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Lịch Sử Đặt Vé</CardTitle>
              </CardHeader>
              <CardContent>
                {bookingHistory.length > 0 ? (
                  <ul className="space-y-4">
                    {bookingHistory.map((booking) => (
                      <li key={booking.id} className="rounded-md border p-4">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-primary">{booking.movieTitle}</h4>
                          <span className="text-sm text-muted-foreground">{booking.date}</span>
                        </div>
                        <p className="text-sm">Số lượng vé: {booking.tickets}</p>
                        <p className="text-sm">Tổng cộng: {booking.total}</p>
                        <Button variant="link" size="sm" className="p-0 h-auto mt-1 text-primary">
                          Xem chi tiết vé
                        </Button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-center text-muted-foreground">Bạn chưa có lịch sử đặt vé nào.</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
