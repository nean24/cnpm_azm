"use client";

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

const bookingFormSchema = z.object({
  fullName: z.string().min(2, { message: "Họ tên là bắt buộc." }),
  phone: z.string().regex(/^(0\d{9})$/, { message: "Số điện thoại không hợp lệ (10 số, bắt đầu bằng 0)." }),
  email: z.string().email({ message: "Email không hợp lệ." }),
});

type BookingFormValues = z.infer<typeof bookingFormSchema>;

interface BookingFormProps {
  onSubmitBooking: (data: BookingFormValues) => void;
}

export function BookingForm({ onSubmitBooking }: BookingFormProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
  });

  const onSubmit: SubmitHandler<BookingFormValues> = (data) => {
    onSubmitBooking(data);
  };

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl text-primary">Thông Tin Thanh Toán</CardTitle>
        <CardDescription>Vui lòng điền thông tin để hoàn tất đặt vé.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} id="booking-info-form" className="space-y-6">
          <div>
            <Label htmlFor="fullName">Họ và Tên</Label>
            <Input id="fullName" {...register("fullName")} placeholder="Nguyễn Văn A" className="mt-1"/>
            {errors.fullName && <p className="mt-1 text-sm text-destructive">{errors.fullName.message}</p>}
          </div>
          <div>
            <Label htmlFor="phone">Số điện thoại</Label>
            <Input id="phone" {...register("phone")} placeholder="0901234567" className="mt-1"/>
            {errors.phone && <p className="mt-1 text-sm text-destructive">{errors.phone.message}</p>}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} placeholder="your.email@example.com" className="mt-1"/>
            {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>}
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col space-y-4">
        <div className="w-full">
            <p className="mb-2 text-sm font-semibold">Chọn phương thức thanh toán:</p>
            <div className="grid grid-cols-2 gap-4">
                 <Button variant="outline" className="h-auto py-2">
                    <Image src="https://picsum.photos/seed/vnpay/100/30" alt="VNPay" width={100} height={30} data-ai-hint="vnpay logo" />
                </Button>
                <Button variant="outline" className="h-auto py-2">
                    <Image src="https://picsum.photos/seed/momo/100/30" alt="Momo" width={100} height={30} data-ai-hint="momo logo" />
                </Button>
            </div>
        </div>
        <Button type="submit" form="booking-info-form" className="w-full bg-primary hover:bg-accent" disabled={isSubmitting}>
          {isSubmitting ? "Đang xử lý..." : "Xác Nhận và Thanh Toán"}
        </Button>
      </CardFooter>
    </Card>
  );
}
