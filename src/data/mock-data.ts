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
    title: 'Dune: Hành Tinh Cát - Phần Hai',
    posterUrl: 'https://picsum.photos/400/600?random=1',
    trailerUrl: 'https://www.youtube.com/embed/U2Qp5pL3ovA', // Actual trailer example
    description: 'Paul Atreides hợp nhất với Chani và người Fremen để trả thù những kẻ đã hủy diệt gia đình anh.',
    director: 'Denis Villeneuve',
    actors: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson'],
    genre: ['Khoa học viễn tưởng', 'Hành động', 'Phiêu lưu'],
    rating: 'T16',
    language: 'Phụ đề',
    durationMinutes: 166,
    releaseDate: '2024-03-01',
    status: 'now_showing',
  },
  {
    id: '2',
    title: 'Godzilla x Kong: Đế Chế Mới',
    posterUrl: 'https://picsum.photos/400/600?random=2',
    trailerUrl: 'https://www.youtube.com/embed/qY4xNIsLh7M', // Actual trailer example
    description: 'Hai quái vật huyền thoại Godzilla và Kong hợp lực chống lại một mối đe dọa khổng lồ chưa từng được khám phá ẩn sâu trong Trái Đất.',
    director: 'Adam Wingard',
    actors: ['Rebecca Hall', 'Brian Tyree Henry', 'Dan Stevens'],
    genre: ['Hành động', 'Quái vật', 'Khoa học viễn tưởng'],
    rating: 'T13',
    language: 'Lồng tiếng',
    durationMinutes: 115,
    releaseDate: '2024-03-29',
    status: 'now_showing',
  },
  {
    id: '3',
    title: 'Kung Fu Panda 4',
    posterUrl: 'https://picsum.photos/400/600?random=3',
    trailerUrl: 'https://www.youtube.com/embed/K74-3M7d3yA', // Actual trailer example
    description: 'Gấu Po chuẩn bị trở thành Thủ lĩnh tinh thần của Thung lũng Bình Yên, nhưng cậu cần tìm và huấn luyện một Chiến binh Rồng mới trước khi đảm nhận vị trí mới.',
    director: 'Mike Mitchell',
    actors: ['Jack Black', 'Awkwafina', 'Viola Davis'],
    genre: ['Hoạt hình', 'Hài', 'Phiêu lưu', 'Gia đình'],
    rating: 'P',
    language: 'Lồng tiếng',
    durationMinutes: 94,
    releaseDate: '2024-03-08',
    status: 'now_showing',
  },
  {
    id: '4',
    title: 'Furiosa: Câu Chuyện Từ Max Điên',
    posterUrl: 'https://picsum.photos/400/600?random=4',
    description: 'Câu chuyện gốc về nữ chiến binh Furiosa trước khi cô gặp Max Rockatansky.',
    director: 'George Miller',
    actors: ['Anya Taylor-Joy', 'Chris Hemsworth', 'Tom Burke'],
    genre: ['Hành động', 'Phiêu lưu', 'Khoa học viễn tưởng'],
    rating: 'T18',
    language: 'Phụ đề',
    durationMinutes: 148,
    releaseDate: '2024-05-24',
    status: 'now_showing',
  },
  {
    id: '5',
    title: 'Hành Tinh Khỉ: Vương Quốc Mới',
    posterUrl: 'https://picsum.photos/400/600?random=5',
    description: 'Nhiều thế hệ sau triều đại của Caesar, loài khỉ là loài thống trị và con người sống trong bóng tối.',
    director: 'Wes Ball',
    actors: ['Owen Teague', 'Freya Allan', 'Kevin Durand'],
    genre: ['Hành động', 'Khoa học viễn tưởng', 'Phiêu lưu'],
    rating: 'T16',
    language: 'Lồng tiếng',
    durationMinutes: 145,
    releaseDate: '2024-05-10',
    status: 'now_showing',
  },
  {
    id: '6',
    title: 'Những Mảnh Ghép Cảm Xúc 2',
    posterUrl: 'https://picsum.photos/400/600?random=6',
    description: 'Riley bước vào tuổi thiếu niên và những cảm xúc mới xuất hiện trong Trung樞 Thần kinh của cô bé.',
    director: 'Kelsey Mann',
    actors: ['Amy Poehler', 'Maya Hawke', 'Lewis Black'],
    genre: ['Hoạt hình', 'Gia đình', 'Hài'],
    rating: 'P',
    language: 'Lồng tiếng',
    durationMinutes: 100,
    releaseDate: '2024-06-14',
    status: 'now_showing',
  },
  {
    id: '7',
    title: 'Kẻ Trộm Mặt Trăng 4',
    posterUrl: 'https://picsum.photos/400/600?random=7',
    description: 'Gru và gia đình phải đối mặt với một kẻ thù mới, Maxime Le Mal, và cậu con trai sơ sinh của Gru, Gru Jr., người quyết tâm gây rối cho cha mình.',
    director: 'Chris Renaud',
    actors: ['Steve Carell', 'Kristen Wiig', 'Will Ferrell'],
    genre: ['Hoạt hình', 'Hài', 'Gia đình'],
    rating: 'P',
    language: 'Lồng tiếng',
    durationMinutes: 95,
    releaseDate: '2024-07-03',
    status: 'now_showing',
  },
  {
    id: '8',
    title: 'Oppenheimer',
    posterUrl: 'https://picsum.photos/400/600?random=8',
    description: 'Câu chuyện về nhà vật lý lý thuyết J. Robert Oppenheimer, người đứng đầu Phòng thí nghiệm Los Alamos trong Thế chiến II và vai trò của ông trong Dự án Manhattan.',
    director: 'Christopher Nolan',
    actors: ['Cillian Murphy', 'Emily Blunt', 'Matt Damon'],
    genre: ['Tiểu sử', 'Chính kịch', 'Lịch sử'],
    rating: 'T18',
    language: 'Phụ đề',
    durationMinutes: 180,
    releaseDate: '2023-07-21', // Older, but for variety
    status: 'now_showing',
  },
  {
    id: '9',
    title: 'Vùng Đất Câm Lặng: Ngày Một',
    posterUrl: 'https://picsum.photos/400/600?random=9',
    description: 'Trải nghiệm ngày thế giới trở nên im lặng.',
    director: 'Michael Sarnoski',
    actors: ['Lupita Nyong\'o', 'Joseph Quinn', 'Alex Wolff'],
    genre: ['Kinh dị', 'Khoa học viễn tưởng', 'Giật gân'],
    rating: 'T16',
    language: 'Phụ đề',
    durationMinutes: 100,
    releaseDate: '2024-06-28',
    status: 'coming_soon',
  },
  {
    id: '10',
    title: 'Deadpool & Wolverine',
    posterUrl: 'https://picsum.photos/400/600?random=10',
    description: 'Wolverine đang hồi phục sau chấn thương thì chạm trán với Deadpool lắm lời. Họ hợp tác để đánh bại một kẻ thù chung.',
    director: 'Shawn Levy',
    actors: ['Ryan Reynolds', 'Hugh Jackman', 'Emma Corrin'],
    genre: ['Hành động', 'Hài', 'Siêu anh hùng'],
    rating: 'T18',
    language: 'Phụ đề',
    durationMinutes: 127,
    releaseDate: '2024-07-26',
    status: 'coming_soon',
  },
  {
    id: '11',
    title: 'Kẻ Quấy Rối',
    posterUrl: 'https://picsum.photos/400/600?random=11',
    description: 'Một bộ phim kinh dị tâm lý về một người phụ nữ bị theo dõi bởi một kẻ lạ mặt.',
    director: 'Đạo Diễn E',
    actors: ['Diễn Viên U', 'Diễn Viên V'],
    genre: ['Kinh dị', 'Giật gân'],
    rating: 'T18',
    language: 'Lồng tiếng',
    durationMinutes: 90,
    releaseDate: '2024-08-09',
    status: 'coming_soon',
  },
  {
    id: '12',
    title: 'Cuộc Phiêu Lưu Mùa Hè',
    posterUrl: 'https://picsum.photos/400/600?random=12',
    description: 'Một nhóm bạn thân có một mùa hè đáng nhớ với những chuyến phiêu lưu và khám phá bản thân.',
    director: 'Đạo Diễn F',
    actors: ['Diễn Viên A1', 'Diễn Viên B1'],
    genre: ['Phiêu lưu', 'Hài', 'Tuổi teen'],
    rating: 'T13',
    language: 'Phụ đề',
    durationMinutes: 105,
    releaseDate: '2024-08-23',
    status: 'coming_soon',
  }
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

// Generate more dynamic showtimes based on the new movies
export const mockShowtimes: Showtime[] = [
  // Dune
  { id: 'st1', movieId: '1', cinemaId: 'cinema1', hallId: 'hallA', date: '2024-07-28', startTime: '18:00', format: '2D' },
  { id: 'st2', movieId: '1', cinemaId: 'cinema1', hallId: 'hallA', date: '2024-07-28', startTime: '21:30', format: '3D' },
  { id: 'st3', movieId: '1', cinemaId: 'cinema2', hallId: 'hallVIP1', date: '2024-07-28', startTime: '20:00', format: '3D' },
  // Godzilla x Kong
  { id: 'st4', movieId: '2', cinemaId: 'cinema1', hallId: 'hallB', date: '2024-07-28', startTime: '19:00', format: '2D' },
  { id: 'st5', movieId: '2', cinemaId: 'cinema2', hallId: 'hallVIP1', date: '2024-07-29', startTime: '17:00', format: '2D' },
  // Kung Fu Panda 4
  { id: 'st6', movieId: '3', cinemaId: 'cinema1', hallId: 'hallA', date: '2024-07-28', startTime: '16:00', format: '2D' },
  { id: 'st7', movieId: '3', cinemaId: 'cinema1', hallId: 'hallB', date: '2024-07-29', startTime: '14:00', format: '2D' },
  // Furiosa
  { id: 'st8', movieId: '4', cinemaId: 'cinema1', hallId: 'hallA', date: '2024-07-29', startTime: '19:30', format: '2D' },
  // Hành Tinh Khỉ
  { id: 'st9', movieId: '5', cinemaId: 'cinema2', hallId: 'hallVIP1', date: '2024-07-30', startTime: '18:30', format: '3D' },
  // Những Mảnh Ghép Cảm Xúc 2
  { id: 'st10', movieId: '6', cinemaId: 'cinema1', hallId: 'hallB', date: '2024-07-30', startTime: '15:00', format: '2D' },
  // Kẻ Trộm Mặt Trăng 4
  { id: 'st11', movieId: '7', cinemaId: 'cinema1', hallId: 'hallA', date: '2024-07-30', startTime: '17:30', format: '2D' },
  // Oppenheimer
  { id: 'st12', movieId: '8', cinemaId: 'cinema2', hallId: 'hallVIP1', date: '2024-07-31', startTime: '20:15', format: '2D' },
];


export const genres = [
    'Hành động', 'Phiêu lưu', 'Khoa học viễn tưởng', 'Gia đình', 'Hài', 
    'Kinh dị', 'Bí ẩn', 'Thể thao', 'Hoạt hình', 'Chính kịch', 'Lịch sử', 'Siêu anh hùng', 'Giật gân', 'Tuổi teen'
].filter((value, index, self) => self.indexOf(value) === index); // Remove duplicates

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
