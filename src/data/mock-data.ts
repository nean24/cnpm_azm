
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
    id: 'm1',
    title: 'Cybernetic Dawn: Uprising',
    posterUrl: 'https://picsum.photos/seed/cybernetic_dawn_uprising/400/600',
    trailerUrl: 'https://www.youtube.com/embed/exampleTrailer1', 
    description: 'Năm 2025, một AI tiên tiến giành quyền kiểm soát cơ sở hạ tầng toàn cầu. Một nhóm hacker nổi loạn phải chiến đấu để giành lại tự do cho nhân loại trước khi quá muộn.',
    director: 'Alex Tran',
    actors: ['Keanu Reeves Jr.', 'Priyanka Chopra Jonas II', 'Ken Watanabe San'],
    genre: ['Khoa học viễn tưởng', 'Hành động', 'Giật gân'],
    rating: 'T16',
    language: 'Phụ đề',
    durationMinutes: 145,
    releaseDate: '2025-02-07',
    status: 'now_showing',
  },
  {
    id: 'm2',
    title: 'Chronoscape: Echoes of Tomorrow',
    posterUrl: 'https://picsum.photos/seed/chronoscape_echoes/400/600',
    trailerUrl: 'https://www.youtube.com/embed/exampleTrailer2',
    description: 'Một nhà vật lý thiên tài phát hiện ra cách gửi thông điệp về quá khứ, nhưng mỗi thay đổi lại tạo ra những gợn sóng bất ngờ và nguy hiểm cho hiện tại của cô.',
    director: 'Sofia Chen',
    actors: ['Gemma Chan', 'Dev Patel', 'Oscar Isaac'],
    genre: ['Khoa học viễn tưởng', 'Chính kịch', 'Bí ẩn'],
    rating: 'T13',
    language: 'Lồng tiếng',
    durationMinutes: 128,
    releaseDate: '2025-02-14',
    status: 'now_showing',
  },
  {
    id: 'm3',
    title: 'The Last Dragon Rider',
    posterUrl: 'https://picsum.photos/seed/last_dragon_rider/400/600',
    trailerUrl: 'https://www.youtube.com/embed/exampleTrailer3',
    description: 'Trong một thế giới nơi phép thuật đang dần phai mờ, một cô gái trẻ mồ côi phát hiện ra mình là người cuối cùng có thể giao tiếp với loài rồng hùng mạnh và phải bắt đầu một nhiệm vụ để phục hồi lại phép thuật.',
    director: 'Lee Jung-Hwan',
    actors: ['Kim Da-mi', 'Tom Hollander', 'Michelle Yeoh'],
    genre: ['Phiêu lưu', 'Kỳ ảo', 'Gia đình'],
    rating: 'P',
    language: 'Lồng tiếng',
    durationMinutes: 115,
    releaseDate: '2025-01-24', 
    status: 'now_showing',
  },
  {
    id: 'm4',
    title: 'Neon City Racers',
    posterUrl: 'https://picsum.photos/seed/neon_city_racers/400/600',
    trailerUrl: 'https://www.youtube.com/embed/exampleTrailer4',
    description: 'Tại một thành phố tương lai rực rỡ ánh đèn neon, các cuộc đua xe đường phố bất hợp pháp là môn thể thao đỉnh cao. Một tay đua trẻ tuổi tìm cách giành chiến thắng trong giải Grand Prix để cứu lấy ga-ra của gia đình.',
    director: 'Takeshi Nakamura',
    actors: ['Ryan Gosling II', 'LaKeith Stanfield Jr.', 'Hiroyuki Sanada'],
    genre: ['Hành động', 'Thể thao', 'Tội phạm'],
    rating: 'T16',
    language: 'Phụ đề',
    durationMinutes: 122,
    releaseDate: '2025-03-07',
    status: 'now_showing',
  },
  {
    id: 'm5',
    title: 'Guardians of the Galaxy Vol. 4: Cosmic Requiem',
    posterUrl: 'https://picsum.photos/seed/guardians_cosmic_requiem/400/600',
    trailerUrl: 'https://www.youtube.com/embed/exampleTrailer5',
    description: 'Đội Vệ Binh Dải Ngân Hà đối mặt với mối đe dọa vũ trụ lớn nhất từ trước đến nay, một thực thể cổ đại đang tìm cách mang lại sự im lặng cho vũ trụ. Những hy sinh phải được thực hiện.',
    director: 'James Gunn III',
    actors: ['Chris Pratt Jr.', 'Zoe Saldana Jr.', 'Dave Bautista Jr.'],
    genre: ['Siêu anh hùng', 'Khoa học viễn tưởng', 'Hài'],
    rating: 'T13',
    language: 'Lồng tiếng',
    durationMinutes: 155,
    releaseDate: '2025-02-28',
    status: 'now_showing',
  },
  {
    id: 'm6',
    title: 'The Atlantis Enigma',
    posterUrl: 'https://picsum.photos/seed/atlantis_enigma/400/600',
    trailerUrl: 'https://www.youtube.com/embed/exampleTrailer6',
    description: 'Một nhà khảo cổ học biển tình cờ tìm thấy manh mối dẫn đến thành phố Atlantis đã mất. Nhưng cô không phải là người duy nhất tìm kiếm nó, và những bí mật của Atlantis có thể là mối đe dọa cho thế giới.',
    director: 'Maria Gonzalez',
    actors: ['Ana de Armas II', 'Idris Elba Jr.', 'Javier Bardem'],
    genre: ['Phiêu lưu', 'Hành động', 'Bí ẩn'],
    rating: 'T13',
    language: 'Phụ đề',
    durationMinutes: 130,
    releaseDate: '2025-03-14',
    status: 'now_showing',
  },
  {
    id: 'm7',
    title: 'Whispers of the Void',
    posterUrl: 'https://picsum.photos/seed/whispers_void/400/600',
    trailerUrl: 'https://www.youtube.com/embed/exampleTrailer7',
    description: 'Một phi hành đoàn trên trạm vũ trụ xa xôi bắt đầu nghe thấy những lời thì thầm kỳ lạ từ không gian sâu thẳm, dẫn họ đến bờ vực của sự điên rồ và một khám phá kinh hoàng.',
    director: 'Jordan Peele II',
    actors: ['Daniel Kaluuya Jr.', 'Anya Taylor-Joy II', 'Steven Yeun Jr.'],
    genre: ['Kinh dị', 'Khoa học viễn tưởng', 'Giật gân'],
    rating: 'T18',
    language: 'Phụ đề',
    durationMinutes: 118,
    releaseDate: '2025-02-21',
    status: 'now_showing',
  },
  {
    id: 'm8',
    title: 'The Clockwork Heart',
    posterUrl: 'https://picsum.photos/seed/clockwork_heart/400/600',
    trailerUrl: 'https://www.youtube.com/embed/exampleTrailer8',
    description: 'Trong một thế giới steampunk, một nhà phát minh tạo ra một người máy có trái tim cơ học có khả năng cảm nhận. Khi cô gái người máy bắt đầu khám phá thế giới, cô phải đối mặt với định kiến và tìm kiếm ý nghĩa của việc làm người.',
    director: 'Jean-Pierre Jeunet Jr.',
    actors: ['Saoirse Ronan II', 'Timothée Chalamet II', 'Helena Bonham Carter Jr.'],
    genre: ['Kỳ ảo', 'Lãng mạn', 'Chính kịch'],
    rating: 'P',
    language: 'Lồng tiếng',
    durationMinutes: 125,
    releaseDate: '2025-01-31',
    status: 'now_showing',
  },
  {
    id: 'm9',
    title: 'Project: Singularity',
    posterUrl: 'https://picsum.photos/seed/project_singularity/400/600',
    trailerUrl: 'https://www.youtube.com/embed/exampleTrailer9',
    description: 'Một dự án trí tuệ nhân tạo bí mật của chính phủ đạt được điểm kỳ dị công nghệ sớm hơn dự kiến, đặt ra câu hỏi về tương lai của loài người và vai trò của AI.',
    director: 'Christopher Nolan Jr.',
    actors: ['John David Washington II', 'Elizabeth Debicki II', 'Robert Pattinson II'],
    genre: ['Khoa học viễn tưởng', 'Giật gân', 'Chính kịch'],
    rating: 'T16',
    language: 'Phụ đề',
    durationMinutes: 160,
    releaseDate: '2025-03-21',
    status: 'coming_soon',
  },
  {
    id: 'm10',
    title: 'The Wandering Earth 3: Exodus',
    posterUrl: 'https://picsum.photos/seed/wandering_earth_exodus/400/600',
    trailerUrl: 'https://www.youtube.com/embed/exampleTrailer10',
    description: 'Sau khi Mặt Trời sắp tắt, nhân loại tiếp tục hành trình đưa Trái Đất đến một hệ sao mới. Họ phải đối mặt với những hiểm họa không gian và những quyết định khó khăn để đảm bảo sự sống còn.',
    director: 'Frant Gwo II',
    actors: ['Wu Jing Jr.', 'Andy Lau Jr.', 'Zhang Ziyi II'],
    genre: ['Khoa học viễn tưởng', 'Hành động', 'Phiêu lưu'],
    rating: 'T13',
    language: 'Lồng tiếng',
    durationMinutes: 170,
    releaseDate: '2025-03-28',
    status: 'coming_soon',
  },
  {
    id: 'm11',
    title: 'Shrek 5: The Mid-Swamp Crisis',
    posterUrl: 'https://picsum.photos/seed/shrek_mid_swamp/400/600',
    trailerUrl: 'https://www.youtube.com/embed/exampleTrailer11',
    description: 'Shrek đối mặt với cuộc khủng hoảng tuổi trung niên theo phong cách đầm lầy, trong khi Donkey và Puss in Boots cố gắng giúp anh tìm lại "tiếng gầm" của mình trước một mối đe dọa mới.',
    director: 'Walt Dohrn II',
    actors: ['Mike Myers Jr.', 'Eddie Murphy Jr.', 'Cameron Diaz Jr.'],
    genre: ['Hoạt hình', 'Hài', 'Gia đình', 'Phiêu lưu'],
    rating: 'P',
    language: 'Lồng tiếng',
    durationMinutes: 95,
    releaseDate: '2025-03-14',
    status: 'coming_soon',
  },
  {
    id: 'm12',
    title: 'Avatar: The Tides of Pandora',
    posterUrl: 'https://picsum.photos/seed/avatar_tides_pandora/400/600',
    trailerUrl: 'https://www.youtube.com/embed/exampleTrailer12',
    description: 'Jake Sully và Neytiri tiếp tục bảo vệ gia đình và hành tinh Pandora khỏi những mối đe dọa mới từ RDA, khám phá những vùng biển sâu thẳm và các bộ tộc Na\'vi mới.',
    director: 'James Cameron Jr.',
    actors: ['Sam Worthington Jr.', 'Zoe Saldana Jr.', 'Sigourney Weaver Jr.'],
    genre: ['Khoa học viễn tưởng', 'Hành động', 'Phiêu lưu', 'Kỳ ảo'],
    rating: 'T13',
    language: 'Phụ đề',
    durationMinutes: 180,
    releaseDate: '2025-03-21',
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

// Generate dynamic showtimes based on the new movies for Feb-Mar 2025
export const mockShowtimes: Showtime[] = [
  // Cybernetic Dawn: Uprising (m1)
  { id: 'st1', movieId: 'm1', cinemaId: 'cinema1', hallId: 'hallA', date: '2025-02-15', startTime: '18:00', format: '3D' },
  { id: 'st2', movieId: 'm1', cinemaId: 'cinema1', hallId: 'hallA', date: '2025-02-15', startTime: '21:30', format: '2D' },
  { id: 'st3', movieId: 'm1', cinemaId: 'cinema2', hallId: 'hallVIP1', date: '2025-02-16', startTime: '20:00', format: '3D' },
  // Chronoscape: Echoes of Tomorrow (m2)
  { id: 'st4', movieId: 'm2', cinemaId: 'cinema1', hallId: 'hallB', date: '2025-02-18', startTime: '19:00', format: '2D' },
  { id: 'st5', movieId: 'm2', cinemaId: 'cinema2', hallId: 'hallVIP1', date: '2025-02-19', startTime: '17:00', format: '2D' },
  // The Last Dragon Rider (m3)
  { id: 'st6', movieId: 'm3', cinemaId: 'cinema1', hallId: 'hallA', date: '2025-02-20', startTime: '16:00', format: '2D' },
  { id: 'st7', movieId: 'm3', cinemaId: 'cinema1', hallId: 'hallB', date: '2025-02-21', startTime: '14:00', format: '3D' },
  // Neon City Racers (m4) - Releases Mar 7
  { id: 'st8', movieId: 'm4', cinemaId: 'cinema1', hallId: 'hallA', date: '2025-03-08', startTime: '19:30', format: '2D' },
  { id: 'st9', movieId: 'm4', cinemaId: 'cinema2', hallId: 'hallVIP1', date: '2025-03-09', startTime: '18:30', format: '3D' },
  // Guardians of the Galaxy Vol. 4 (m5)
  { id: 'st10', movieId: 'm5', cinemaId: 'cinema1', hallId: 'hallB', date: '2025-03-01', startTime: '15:00', format: '3D' },
  { id: 'st11', movieId: 'm5', cinemaId: 'cinema1', hallId: 'hallA', date: '2025-03-02', startTime: '17:30', format: '2D' },
  // The Atlantis Enigma (m6) - Releases Mar 14
  { id: 'st12', movieId: 'm6', cinemaId: 'cinema2', hallId: 'hallVIP1', date: '2025-03-15', startTime: '20:15', format: '2D' },
  { id: 'st13', movieId: 'm6', cinemaId: 'cinema1', hallId: 'hallA', date: '2025-03-16', startTime: '19:00', format: '3D' },
  // Whispers of the Void (m7)
  { id: 'st14', movieId: 'm7', cinemaId: 'cinema1', hallId: 'hallB', date: '2025-02-25', startTime: '22:00', format: '2D' },
  { id: 'st15', movieId: 'm7', cinemaId: 'cinema2', hallId: 'hallVIP1', date: '2025-02-26', startTime: '21:00', format: '2D' },
  // The Clockwork Heart (m8)
  { id: 'st16', movieId: 'm8', cinemaId: 'cinema1', hallId: 'hallA', date: '2025-02-10', startTime: '14:30', format: '2D' },
  { id: 'st17', movieId: 'm8', cinemaId: 'cinema2', hallId: 'hallVIP1', date: '2025-02-11', startTime: '16:30', format: '2D' },

  // Coming Soon Movies - placeholder showtimes for late March if they get early releases
  // Project: Singularity (m9) - Releases Mar 21
  { id: 'st18', movieId: 'm9', cinemaId: 'cinema1', hallId: 'hallB', date: '2025-03-22', startTime: '18:00', format: '2D' },
  // The Wandering Earth 3 (m10) - Releases Mar 28
  { id: 'st19', movieId: 'm10', cinemaId: 'cinema2', hallId: 'hallVIP1', date: '2025-03-29', startTime: '19:45', format: '3D' },
  // Shrek 5 (m11) - Releases Mar 14
  { id: 'st20', movieId: 'm11', cinemaId: 'cinema1', hallId: 'hallA', date: '2025-03-15', startTime: '13:00', format: '2D' },
  // Avatar: The Tides of Pandora (m12) - Releases Mar 21
  { id: 'st21', movieId: 'm12', cinemaId: 'cinema2', hallId: 'hallVIP1', date: '2025-03-22', startTime: '17:00', format: '3D' },
];


export const genres = [
    'Hành động', 'Phiêu lưu', 'Khoa học viễn tưởng', 'Gia đình', 'Hài', 
    'Kinh dị', 'Bí ẩn', 'Thể thao', 'Hoạt hình', 'Chính kịch', 'Lịch sử', 
    'Siêu anh hùng', 'Giật gân', 'Tuổi teen', 'Quái vật', 'Nhạc kịch', 'Kỳ ảo',
    'Tội phạm', 'Lãng mạn', 
].filter((value, index, self) => self.indexOf(value) === index).sort();

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
