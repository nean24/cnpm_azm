import Link from 'next/link';
import { Facebook, Mail, Phone, MapPin } from 'lucide-react'; // Using MessageSquare for Zalo placeholder

// Zalo Icon SVG (simple placeholder - ideally use an actual Zalo icon SVG if available)
const ZaloIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);


export function Footer() {
  return (
    <footer className="bg-footer text-footer-foreground py-12 md:py-16">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 md:grid-cols-3 md:px-6">
        <div>
          <h3 className="mb-4 text-lg font-semibold text-primary">Amazing Cinema</h3>
          <p className="text-sm">
            Trải nghiệm điện ảnh đỉnh cao với những bộ phim bom tấn và dịch vụ chất lượng.
          </p>
          <div className="mt-4 flex space-x-3">
            <Link href="#" aria-label="Facebook" className="text-footer-foreground hover:text-accent transition-colors">
              <Facebook className="h-6 w-6" />
            </Link>
            <Link href="#" aria-label="Zalo" className="text-footer-foreground hover:text-accent transition-colors">
              <ZaloIcon />
            </Link>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Thông Tin Liên Hệ</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-accent" />
              <span>Hotline: 0898 305 765</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-accent" />
              <span>Email: DH52200848@student.stu.edu.vn</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent" />
              <span>Địa chỉ: 18 Cao Lỗ, Phường 4, Quận 8, TP. HCM</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold">Chính Sách</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/policy/refund" className="hover:text-accent transition-colors">
                Chính sách hoàn vé
              </Link>
            </li>
            <li>
              <Link href="/policy/privacy" className="hover:text-accent transition-colors">
                Chính sách bảo mật
              </Link>
            </li>
             <li>
              <Link href="/contact" className="hover:text-accent transition-colors">
                Liên hệ & Góp ý
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto mt-8 border-t border-gray-700 px-4 pt-8 text-center text-sm md:px-6">
        <p>&copy; EXPRESS 2025. All rights reserved by Amazing Cinema.</p>
      </div>
    </footer>
  );
}
