import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin', 'vietnamese'],
  variable: '--font-roboto',
});

export const metadata: Metadata = {
  title: 'Amazing Cinema',
  description: 'Your Ultimate Movie Experience',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.variable} font-sans antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
