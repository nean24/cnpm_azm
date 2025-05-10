"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, Search, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MobileNavSheet } from './mobile-nav-sheet';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export interface NavItem {
  href: string;
  label: string;
}

const mainNavItems: NavItem[] = [
  { href: '/movies', label: 'PHIM' },
  { href: '/cinemas', label: 'RẠP AZM' },
  { href: '/contact', label: 'LIÊN HỆ' },
];

const authNavItems: NavItem[] = [
  { href: '/login', label: 'ĐĂNG NHẬP' },
  { href: '/register', label: 'ĐĂNG KÝ' },
];

// Placeholder for actual auth status
const useAuth = () => ({ isAuthenticated: false, user: null });


export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated } = useAuth(); // Placeholder

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentAuthItems = isAuthenticated
    ? [{ href: '/profile', label: 'TÀI KHOẢN' }] // Add logout later
    : authNavItems;

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled ? "bg-background/95 shadow-md backdrop-blur-sm" : "bg-transparent",
      pathname === '/' && !isScrolled ? "text-white" : "text-foreground bg-primary" // Special handling for homepage hero
    )}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Film className={cn("h-8 w-8", pathname === '/' && !isScrolled ? "text-white" : "text-primary-foreground" )} />
          <div className="flex flex-col">
            <span className={cn("text-2xl font-bold", pathname === '/' && !isScrolled ? "text-white" : "text-primary-foreground" )}>Amazing Cinema</span>
            <span className={cn("text-xs", pathname === '/' && !isScrolled ? "text-gray-200" : "text-primary-foreground/80" )}>Your Ultimate Movie Experience</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          {mainNavItems.map((item) => (
            <Button key={item.href} variant="ghost" asChild className={cn("text-sm font-medium", pathname === '/' && !isScrolled ? "hover:bg-white/10 text-white" : "hover:bg-primary/80 text-primary-foreground" )}>
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative hidden sm:block">
            <Search className={cn("absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2", pathname === '/' && !isScrolled ? "text-gray-300" : "text-muted-foreground" )} />
            <Input
              type="search"
              placeholder="Tìm kiếm phim..."
              className={cn(
                "h-9 w-full rounded-md bg-transparent pl-9 pr-2 text-sm md:w-[200px] lg:w-[250px]",
                pathname === '/' && !isScrolled 
                ? "border-gray-400 placeholder-gray-300 text-white focus:bg-black/20 focus:border-primary" 
                : "border-input bg-background placeholder-muted-foreground focus:border-accent" 
              )}
            />
          </div>

          <div className="hidden items-center gap-2 md:flex">
            {currentAuthItems.map((item) => (
               <Button 
                key={item.href} 
                variant={item.href.includes('register') || item.href.includes('profile') ? "default" : "outline"} 
                asChild 
                className={cn("text-sm", 
                  item.href.includes('register') || item.href.includes('profile')
                  ? (pathname === '/' && !isScrolled ? "bg-accent hover:bg-accent/90 text-accent-foreground" : "bg-accent hover:bg-accent/90 text-accent-foreground")
                  : (pathname === '/' && !isScrolled ? "border-white/50 text-white hover:bg-white/10" : "border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10")
                )}
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className={cn("md:hidden", pathname === '/' && !isScrolled ? "text-white hover:bg-white/10" : "text-primary-foreground hover:bg-primary/80")}
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </div>
      </div>
      <MobileNavSheet 
        isOpen={isMobileMenuOpen} 
        onOpenChange={setIsMobileMenuOpen}
        navItems={mainNavItems}
        authItems={currentAuthItems}
      />
    </header>
  );
}
