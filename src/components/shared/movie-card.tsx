
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Movie } from '@/data/mock-data';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface MovieCardProps {
  movie: Movie;
  className?: string;
}

export function MovieCard({ movie, className }: MovieCardProps) {
  return (
    <Card className={cn("overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl flex flex-col", className)}>
      <CardHeader className="p-0 relative">
        <Link href={`/movies/${movie.id}`} className="block aspect-[2/3] w-full">
          <Image
            src={movie.posterUrl}
            alt={`Poster phim ${movie.title}`}
            width={400}
            height={600}
            className="h-full w-full object-cover"
            data-ai-hint="movie poster" // General hint for movie posters
          />
        </Link>
        <Badge variant={movie.status === 'now_showing' ? "destructive" : "secondary"} className="absolute top-2 right-2 bg-primary text-primary-foreground">
          {movie.status === 'now_showing' ? 'Đang chiếu' : 'Sắp chiếu'}
        </Badge>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="mb-2 h-16 overflow-hidden text-xl leading-tight">
          <Link href={`/movies/${movie.id}`} className="hover:text-primary transition-colors">
            {movie.title}
          </Link>
        </CardTitle>
        <div className="flex flex-wrap gap-2 text-xs">
          {movie.genre.slice(0, 2).map((g) => ( // Show max 2 genres
            <Badge key={g} variant="outline">{g}</Badge>
          ))}
          <Badge variant="outline">{movie.rating}</Badge>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full bg-primary hover:bg-accent">
          <Link href={`/movies/${movie.id}`}>Chi Tiết</Link>
        </Button>
        <Button asChild variant="outline" className="w-full ml-2">
          <Link href={`/booking/${movie.id}`}>Đặt Vé</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

