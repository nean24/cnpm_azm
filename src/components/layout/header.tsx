
"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, Search, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MobileNavSheet } from './mobile-nav-sheet';
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
  const { isAuthenticated } = useAuth(); // Placeholder

  const currentAuthItems = isAuthenticated
    ? [{ href: '/profile', label: 'TÀI KHOẢN' }] // Add logout later
    : authNavItems;

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      "bg-primary text-primary-foreground shadow-md"
    )}>
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Film className={cn("h-8 w-8", "text-primary-foreground" )} />
          <span className={cn("text-xl font-bold", "text-primary-foreground" )}>Amazing Cinema</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium text-primary-foreground hover:text-accent transition-colors duration-200",
                "relative group block px-3 py-2 rounded-md",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-background"
              )}
            >
              {item.label}
              <span
                className={cn(
                  "absolute bottom-1 left-0 right-0 h-[2px]",
                  "bg-accent", 
                  "origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
                )}
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="relative hidden sm:block">
            <Search className={cn("absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2", "text-primary-foreground/80" )} />
            <Input
              type="search"
              placeholder="Tìm kiếm phim..."
              className={cn(
                "h-9 w-full rounded-md pl-9 pr-2 text-sm md:w-[200px] lg:w-[250px]",
                "border-primary-foreground/50 bg-transparent placeholder-primary-foreground text-primary-foreground focus:border-primary-foreground"
              )}
            />
          </div>

          <div className="hidden items-center gap-2 md:flex">
            {currentAuthItems.map((item) => (
               <Button
                key={item.href}
                variant={(item.href.includes('register')) ? "default" : "outline"}
                asChild
                className={cn("text-sm",
                  (item.href.includes('register') || item.href.includes('login'))
                  ? "bg-accent hover:bg-accent/90 text-accent-foreground" 
                  : "border-primary-foreground/30 hover:bg-primary/80 hover:text-primary-foreground text-primary-foreground"
                )}
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className={cn("md:hidden", "text-primary-foreground hover:bg-primary/80")}
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

