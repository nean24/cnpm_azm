export interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  trailerUrl?: string;
  description: string;
  director: string;
  actors: string[];
  genre: string[];
  rating: 'P' | 'T13' | 'T16' | 'T18'; // P: General, T: Age-restricted
  language: 'Lồng tiếng' | 'Phụ đề';
  durationMinutes: number;
  releaseDate: string; // YYYY-MM-DD
  status: 'now_showing' | 'coming_soon';
}

export interface Cinema {
  id: string;
  name: string;
  address: string;
  type: 'Tất cả rạp' | 'Rạp VIP'; // Simplified
  halls: Hall[];
}

export interface Hall {
  id: string;
  name: string; // e.g., "Hội trường A", "Phòng chiếu 1"
}

export interface Showtime {
  id: string;
  movieId: string;
  cinemaId: string;
  hallId: string;
  startTime: string; // HH:mm
  date: string; // YYYY-MM-DD
  format: '2D' | '3D';
}

export const mockMovies: Movie[] = [
  {
    id: '1',
    title: 'Siêu Anh Hùng Trở Lại',
    posterUrl: 'https://picsum.photos/400/600?random=1',
    trailerUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder trailer
    description: 'Một siêu anh hùng đã nghỉ hưu phải trở lại để đối mặt với một mối đe dọa mới.',
    director: 'Đạo Diễn A',
    actors: ['Diễn Viên X', 'Diễn Viên Y', 'Diễn Viên Z'],
    genre: ['Hành động', 'Phiêu lưu'],
    rating: 'T16',
    language: 'Phụ đề',
    durationMinutes: 120,
    releaseDate: '2024-07-15',
    status: 'now_showing',
  },
  {
    id: '2',
    title: 'Gia Đình Vui Nhộn',
    posterUrl: 'https://picsum.photos/400/600?random=2',
    description: 'Cuộc phiêu lưu hài hước của một gia đình trong kỳ nghỉ hè.',
    director: 'Đạo Diễn B',
    actors: ['Diễn Viên M', 'Diễn Viên N'],
    genre: ['Gia đình', 'Hài'],
    rating: 'P',
    language: 'Lồng tiếng',
    durationMinutes: 95,
    releaseDate: '2024-07-20',
    status: 'now_showing',
  },
  {
    id: '3',
    title: 'Bí Mật Ngàn Năm',
    posterUrl: 'https://picsum.photos/400/600?random=3',
    description: 'Khám phá bí ẩn cổ xưa đe dọa thế giới hiện đại.',
    director: 'Đạo Diễn C',
    actors: ['Diễn Viên P', 'Diễn Viên Q'],
    genre: ['Kinh dị', 'Bí ẩn'],
    rating: 'T18',
    language: 'Phụ đề',
    durationMinutes: 110,
    releaseDate: '2024-08-01',
    status: 'coming_soon',
  },
  {
    id: '4',
    title: 'Cuộc Đua Tử Thần',
    posterUrl: 'https://picsum.photos/400/600?random=4',
    description: 'Những tay đua cự phách đối đầu trong cuộc đua nguy hiểm nhất hành tinh.',
    director: 'Đạo Diễn D',
    actors: ['Diễn Viên R', 'Diễn Viên S'],
    genre: ['Hành động', 'Thể thao'],
    rating: 'T16',
    language: 'Lồng tiếng',
    durationMinutes: 130,
    releaseDate: '2024-08-15',
    status: 'coming_soon',
  },
];

export const mockCinemas: Cinema[] = [
  {
    id: 'cinema1',
    name: 'AZM Cinema Quận 8',
    address: '18 Cao Lỗ, Phường 4, Quận 8, TP. HCM',
    type: 'Tất cả rạp',
    halls: [
      { id: 'hallA', name: 'Hội trường A' },
      { id: 'hallB', name: 'Hội trường B' },
    ],
  },
  {
    id: 'cinema2',
    name: 'AZM Cinema VIP Gò Vấp',
    address: '123 Phan Văn Trị, Gò Vấp, TP. HCM',
    type: 'Rạp VIP',
    halls: [{ id: 'hallVIP1', name: 'Phòng VIP 1' }],
  },
];

export const mockShowtimes: Showtime[] = [
  { id: 'st1', movieId: '1', cinemaId: 'cinema1', hallId: 'hallA', date: '2024-07-28', startTime: '18:00', format: '2D' },
  { id: 'st2', movieId: '1', cinemaId: 'cinema1', hallId: 'hallA', date: '2024-07-28', startTime: '20:30', format: '3D' },
  { id: 'st3', movieId: '2', cinemaId: 'cinema1', hallId: 'hallB', date: '2024-07-28', startTime: '19:00', format: '2D' },
  { id: 'st4', movieId: '1', cinemaId: 'cinema2', hallId: 'hallVIP1', date: '2024-07-28', startTime: '20:00', format: '3D' },
  { id: 'st5', movieId: '2', cinemaId: 'cinema2', hallId: 'hallVIP1', date: '2024-07-29', startTime: '17:00', format: '2D' },
];

export const genres = ['Hành động', 'Gia đình', 'Hài', 'Kinh dị', 'Bí ẩn', 'Phiêu lưu', 'Thể thao'];
export const ratings = ['P', 'T13', 'T16', 'T18'];
export const languages = ['Lồng tiếng', 'Phụ đề'];

// Helper function to get movie by ID
export const getMovieById = (id: string): Movie | undefined => mockMovies.find(movie => movie.id === id);

// Helper function to get cinema by ID
export const getCinemaById = (id: string): Cinema | undefined => mockCinemas.find(cinema => cinema.id === id);

// Helper function to get showtimes for a movie
export const getShowtimesByMovieId = (movieId: string): Showtime[] => mockShowtimes.filter(st => st.movieId === movieId);

// Helper function to get showtimes for a cinema
export const getShowtimesByCinemaId = (cinemaId: string): Showtime[] => mockShowtimes.filter(st => st.cinemaId === cinemaId);

