"use client";

import { MainLayout } from '@/components/layout/main-layout';
import { PageTitle } from '@/components/shared/page-title';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Phone, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Tên phải có ít nhất 2 ký tự." }),
  email: z.string().email({ message: "Email không hợp lệ." }),
  message: z.string().min(10, { message: "Nội dung phải có ít nhất 10 ký tự." }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log(data);
    toast({
      title: "Gửi phản hồi thành công!",
      description: "Cảm ơn bạn đã liên hệ. Chúng tôi sẽ sớm phản hồi.",
    });
    reset();
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        <PageTitle title="Liên Hệ Với Chúng Tôi" subtitle="Chúng tôi luôn sẵn lòng lắng nghe ý kiến của bạn." />

        <div className="grid gap-8 md:grid-cols-2 lg:gap-12">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Thông Tin Liên Hệ</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <h4 className="font-semibold">Địa chỉ</h4>
                  <p className="text-muted-foreground">18 Cao Lỗ, Phường 4, Quận 8, TP. HCM</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <h4 className="font-semibold">Hotline</h4>
                  <p className="text-muted-foreground">0898 305 765</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <h4 className="font-semibold">Email</h4>
                  <p className="text-muted-foreground">DH52200848@student.stu.edu.vn</p>
                </div>
              </div>
              <div className="mt-6 aspect-video w-full overflow-hidden rounded-lg border">
                {/* Placeholder for Google Maps iframe */}
                <div className="flex h-full w-full items-center justify-center bg-secondary text-muted-foreground" data-ai-hint="map location">
                  Google Maps (18 Cao Lỗ, P4, Q8)
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Gửi Phản Hồi</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="name">Họ và Tên</Label>
                  <Input id="name" {...register("name")} placeholder="Nguyễn Văn A" className="mt-1"/>
                  {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" {...register("email")} placeholder="your.email@example.com" className="mt-1"/>
                  {errors.email && <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>}
                </div>
                <div>
                  <Label htmlFor="message">Nội dung</Label>
                  <Textarea id="message" {...register("message")} placeholder="Nội dung phản hồi của bạn..." rows={5} className="mt-1"/>
                  {errors.message && <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>}
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-accent">Gửi Phản Hồi</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
}
