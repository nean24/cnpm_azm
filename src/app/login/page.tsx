"use client";

import { MainLayout } from '@/components/layout/main-layout';
import { PageTitle } from '@/components/shared/page-title';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation'; // For redirection after login

const loginFormSchema = z.object({
  emailOrPhone: z.string().min(1, { message: "Email hoặc Số điện thoại là bắt buộc." }),
  password: z.string().min(6, { message: "Mật khẩu phải có ít nhất 6 ký tự." }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    // Simulate API call for login
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Login data:", data);
    
    // Simulate successful login
    toast({
      title: "Đăng nhập thành công!",
      description: "Chào mừng bạn trở lại Amazing Cinema.",
    });
    router.push('/'); // Redirect to home page or profile page
  };

  return (
    <MainLayout>
      <div className="container mx-auto flex min-h-[calc(100vh-16rem)] items-center justify-center px-4 py-8 md:px-6 md:py-12">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl text-primary">Đăng Nhập</CardTitle>
            <CardDescription>Chào mừng trở lại! Vui lòng nhập thông tin của bạn.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <Label htmlFor="emailOrPhone">Email hoặc Số điện thoại</Label>
                <Input id="emailOrPhone" {...register("emailOrPhone")} placeholder="email@example.com hoặc 090xxxxxxx" className="mt-1"/>
                {errors.emailOrPhone && <p className="mt-1 text-sm text-destructive">{errors.emailOrPhone.message}</p>}
              </div>
              <div>
                <Label htmlFor="password">Mật khẩu</Label>
                <Input id="password" type="password" {...register("password")} placeholder="••••••••" className="mt-1"/>
                {errors.password && <p className="mt-1 text-sm text-destructive">{errors.password.message}</p>}
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-accent" disabled={isSubmitting}>
                {isSubmitting ? "Đang xử lý..." : "Đăng Nhập"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex-col items-start space-y-2">
            <Link href="#" className="text-sm text-primary hover:underline">
              Quên mật khẩu?
            </Link>
            <p className="text-sm text-muted-foreground">
              Chưa có tài khoản?{' '}
              <Link href="/register" className="font-semibold text-primary hover:underline">
                Đăng ký ngay
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  );
}
