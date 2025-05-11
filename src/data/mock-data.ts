
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
    trailerUrl: 'https://www.youtube.com/embed/U2Qp5pL3ovA',
    description: 'Paul Atreides hợp nhất với Chani và người Fremen để trả thù những kẻ đã hủy diệt gia đình anh. Phần tiếp theo khám phá hành trình thần thoại của Paul khi anh đối mặt với những lựa chọn giữa tình yêu và số phận vũ trụ.',
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
    trailerUrl: 'https://www.youtube.com/embed/qY4xNIsLh7M',
    description: 'Hai quái vật huyền thoại Godzilla và Kong hợp lực chống lại một mối đe dọa khổng lồ chưa từng được khám phá ẩn sâu trong Trái Đất, thách thức sự tồn tại của chính chúng và của loài người.',
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
    trailerUrl: 'https://www.youtube.com/embed/K74-3M7d3yA',
    description: 'Gấu Po chuẩn bị trở thành Thủ lĩnh tinh thần của Thung lũng Bình Yên, nhưng cậu cần tìm và huấn luyện một Chiến binh Rồng mới trước khi đảm nhận vị trí mới. Một phù thủy độc ác mới xuất hiện, đe dọa mọi thứ Po yêu quý.',
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
    trailerUrl: 'https://www.youtube.com/embed/XJMuhwVlca4',
    description: 'Câu chuyện gốc về nữ chiến binh Furiosa, bị bắt cóc khỏi Vùng Xanh Nhiều Mẹ và rơi vào tay một Biker Horde vĩ đại do Warlord Dementus lãnh đạo. Họ quét qua Wasteland và chạm trán Citadel do Immortan Joe cai trị.',
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
    trailerUrl: 'https://www.youtube.com/embed/Kdr5oedn7q8',
    description: 'Nhiều thế hệ sau triều đại của Caesar, loài khỉ là loài thống trị và con người sống trong bóng tối. Khi một thủ lĩnh khỉ độc tài xây dựng đế chế của mình, một con khỉ trẻ bắt đầu một hành trình gian khổ sẽ khiến cậu đặt câu hỏi về mọi thứ cậu biết về quá khứ.',
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
    trailerUrl: 'https://www.youtube.com/embed/LEjhY15eCx0',
    description: 'Riley bước vào tuổi thiếu niên và những cảm xúc mới bất ngờ xuất hiện trong Trung枢 Thần kinh của cô bé: Lo Âu, Ghen Tị, Chán Nản và Xấu Hổ. Các cảm xúc cũ phải học cách chung sống với những nhân tố mới này.',
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
    trailerUrl: 'https://www.youtube.com/embed/qQ4bK9fPz_s',
    description: 'Gru và gia đình phải đối mặt với một kẻ thù mới, Maxime Le Mal, và cậu con trai sơ sinh của Gru, Gru Jr., người quyết tâm gây rối cho cha mình. Trong khi đó, các Minion lại vướng vào những tình huống dở khóc dở cười.',
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
    title: 'The Garfield Movie',
    posterUrl: 'https://picsum.photos/400/600?random=8',
    trailerUrl: 'https://www.youtube.com/embed/IeFWNtMo1Fs',
    description: 'Sau cuộc hội ngộ bất ngờ với người cha đã mất từ ​​lâu của mình - chú mèo đường phố Vic - Garfield và người bạn chó Odie buộc phải từ bỏ cuộc sống được nuông chiều một cách hoàn hảo để tham gia cùng Vic trong một vụ cướp vui nhộn, đầy rủi ro.',
    director: 'Mark Dindal',
    actors: ['Chris Pratt', 'Samuel L. Jackson', 'Hannah Waddingham'],
    genre: ['Hoạt hình', 'Hài', 'Gia đình', 'Phiêu lưu'],
    rating: 'P',
    language: 'Lồng tiếng',
    durationMinutes: 101,
    releaseDate: '2024-05-24',
    status: 'now_showing',
  },
  {
    id: '9',
    title: 'Vùng Đất Câm Lặng: Ngày Một',
    posterUrl: 'https://picsum.photos/400/600?random=9',
    trailerUrl: 'https://www.youtube.com/embed/YJa4jH3XN9M',
    description: 'Trải nghiệm ngày thế giới trở nên im lặng. Khi những sinh vật săn mồi bằng âm thanh đến Trái Đất, một người phụ nữ tên Sam phải chiến đấu để sống sót ở New York.',
    director: 'Michael Sarnoski',
    actors: ["Lupita Nyong'o", 'Joseph Quinn', 'Alex Wolff'],
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
    trailerUrl: 'https://www.youtube.com/embed/73_1biulkYk',
    description: 'Wolverine đang hồi phục sau chấn thương thì chạm trán với Deadpool lắm lời. Họ hợp tác để đánh bại một kẻ thù chung, nhưng liệu sự khác biệt của họ có phá hỏng tất cả?',
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
    title: 'Wicked: Phần Một',
    posterUrl: 'https://picsum.photos/400/600?random=11',
    trailerUrl: 'https://www.youtube.com/embed/F124_2sv12w',
    description: 'Câu chuyện chưa kể về các phù thủy xứ Oz, Elphaba và Glinda, trước khi Dorothy đến. Mối quan hệ phức tạp của họ sẽ định hình số phận của Oz.',
    director: 'Jon M. Chu',
    actors: ['Cynthia Erivo', 'Ariana Grande', 'Jonathan Bailey'],
    genre: ['Nhạc kịch', 'Phiêu lưu', 'Kỳ ảo'],
    rating: 'P',
    language: 'Phụ đề',
    durationMinutes: 150,
    releaseDate: '2024-11-27',
    status: 'coming_soon',
  },
  {
    id: '12',
    title: 'Moana 2',
    posterUrl: 'https://picsum.photos/400/600?random=12',
    trailerUrl: 'https://www.youtube.com/embed/CP6p_Gk2BvI',
    description: 'Moana và Maui tái hợp trong một cuộc phiêu lưu mới trên đại dương bao la, đối mặt với những thử thách và khám phá những vùng đất mới.',
    director: 'Dave Derrick Jr.',
    actors: ["Auli'i Cravalho", 'Dwayne Johnson'],
    genre: ['Hoạt hình', 'Phiêu lưu', 'Gia đình', 'Nhạc kịch'],
    rating: 'P',
    language: 'Lồng tiếng',
    durationMinutes: 100,
    releaseDate: '2024-11-27',
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
  // The Garfield Movie (was Oppenheimer)
  { id: 'st12', movieId: '8', cinemaId: 'cinema2', hallId: 'hallVIP1', date: '2024-07-31', startTime: '20:15', format: '2D' },
];


export const genres = [
    'Hành động', 'Phiêu lưu', 'Khoa học viễn tưởng', 'Gia đình', 'Hài', 
    'Kinh dị', 'Bí ẩn', 'Thể thao', 'Hoạt hình', 'Chính kịch', 'Lịch sử', 
    'Siêu anh hùng', 'Giật gân', 'Tuổi teen', 'Quái vật', 'Nhạc kịch', 'Kỳ ảo'
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
