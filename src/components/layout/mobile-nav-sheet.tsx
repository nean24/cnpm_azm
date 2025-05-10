import Link from 'next/link';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import type { NavItem } from './header'; // Assuming NavItem type is exported from header

interface MobileNavSheetProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  navItems: NavItem[];
  authItems: NavItem[];
}

export function MobileNavSheet({ isOpen, onOpenChange, navItems, authItems }: MobileNavSheetProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="p-0 pt-8 bg-background w-[280px] sm:w-[320px]">
        <SheetHeader className="px-6 pb-4">
          <SheetTitle className="text-2xl font-bold text-primary">Amazing Cinema</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-120px)]">
          <nav className="flex flex-col space-y-2 px-6 py-4">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                className="justify-start text-lg"
                asChild
              >
                <Link href={item.href} onClick={() => onOpenChange(false)}>{item.label}</Link>
              </Button>
            ))}
          </nav>
          <Separator className="my-4" />
          <nav className="flex flex-col space-y-2 px-6 py-4">
            {authItems.map((item) => (
              <Button
                key={item.href}
                variant={item.href.includes('register') ? "default" : "outline"}
                className="justify-start text-lg"
                asChild
              >
                <Link href={item.href} onClick={() => onOpenChange(false)}>{item.label}</Link>
              </Button>
            ))}
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
