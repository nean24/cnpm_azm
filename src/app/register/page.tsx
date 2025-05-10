"use client";

import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const registerFormSchema = z.object({
  name: z.string().min(2, { message: "Tên phải có ít nhất 2 ký tự." }),
  phone: z.string().regex(/^(0\d{9})$/, { message: "Số điện thoại không hợp lệ (10 số, bắt đầu bằng 0)." }),
  email: z.string().email({ message: "Email không hợp lệ." }),
  password: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự." }),
  confirmPassword: z.string().min(6, { message: "Xác nhận mật khẩu là bắt buộc." }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Mật khẩu và xác nhận mật khẩu không khớp.",
  path: ["confirmPassword"], // path of error
});

type RegisterFormValues = z.infer<typeof registerFormSchema>;

export default function RegisterPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerFormSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    // Simulate API call for registration
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Registration data:", data);
    
    toast({
      title: "Đăng ký thành công!",
      description: "Chào mừng bạn đến với Amazing Cinema. Vui lòng đăng nhập.",
    });
    router.push('/login'); // Redirect to login page after successful registration
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto flex min-h-[calc(100vh-16rem)] items-center justify-center px-4 py-8 md:px-6 md:py-12">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl text-primary">Tạo Tài Khoản</CardTitle>
            <CardDescription>Tham gia Amazing Cinema để nhận nhiều ưu đãi hấp dẫn.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="name">Họ và Tên</Label>
                <Input id="name" {...register("name")} placeholder="Nguyễn Văn A" className="mt-1"/>
                {errors.name && <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>}
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
              <div>
                <Label htmlFor="password">Mật khẩu</Label>
                <Input id="password" type="password" {...register("password")} placeholder="••••••••" className="mt-1"/>
                {errors.password && <p className="mt-1 text-sm text-destructive">{errors.password.message}</p>}
              </div>
              <div>
                <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                <Input id="confirmPassword" type="password" {...register("confirmPassword")} placeholder="••••••••" className="mt-1"/>
                {errors.confirmPassword && <p className="mt-1 text-sm text-destructive">{errors.confirmPassword.message}</p>}
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-accent" disabled={isSubmitting}>
                {isSubmitting ? "Đang xử lý..." : "Đăng Ký"}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-sm text-muted-foreground">
              Đã có tài khoản?{' '}
              <Link href="/login" className="font-semibold text-primary hover:underline">
                Đăng nhập
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
}
