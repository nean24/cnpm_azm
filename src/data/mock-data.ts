
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
  aiHint: string;
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
    posterUrl: 'https://image.tmdb.org/t/p/w500/p30A4MDt5J2hWQ6WkWsX20iT3xT.jpg',
    trailerUrl: 'https://www.youtube.com/embed/U2Qp5pL3ovA',
    description: 'Paul Atreides hợp nhất với Chani và người Fremen để trả thù những kẻ đã hủy diệt gia đình anh. Phần tiếp theo khám phá hành trình thần thoại của Paul khi anh đối mặt với những lựa chọn giữa tình yêu và số phận vũ trụ.',
    director: 'Denis Villeneuve',
    actors: ['Timothée Chalamet', 'Zendaya', 'Rebecca Ferguson'],
    genre: ['Khoa học viễn tưởng', 'Hành động', 'Phiêu lưu'],
    rating: 'T16',
    language: 'Phụ đề',
    durationMinutes: 166,
    releaseDate: '2025-03-01',
    status: 'now_showing',
    aiHint: 'SciFi Desert',
  },
  {
    id: '2',
    title: 'Godzilla x Kong: Đế Chế Mới',
    posterUrl: 'https://image.tmdb.org/t/p/w500/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg',
    trailerUrl: 'https://www.youtube.com/embed/qY4xNIsLh7M',
    description: 'Hai quái vật huyền thoại Godzilla và Kong hợp lực chống lại một mối đe dọa khổng lồ chưa từng được khám phá ẩn sâu trong Trái Đất, thách thức sự tồn tại của chính chúng và của loài người.',
    director: 'Adam Wingard',
    actors: ['Rebecca Hall', 'Brian Tyree Henry', 'Dan Stevens'],
    genre: ['Hành động', 'Quái vật', 'Khoa học viễn tưởng'],
    rating: 'T13',
    language: 'Lồng tiếng',
    durationMinutes: 115,
    releaseDate: '2025-03-29',
    status: 'now_showing',
    aiHint: 'Monster Battle',
  },
  {
    id: '3',
    title: 'Kung Fu Panda 4',
    posterUrl: 'https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg',
    trailerUrl: 'https://www.youtube.com/embed/K74-3M7d3yA',
    description: 'Gấu Po chuẩn bị trở thành Thủ lĩnh tinh thần của Thung lũng Bình Yên, nhưng cậu cần tìm và huấn luyện một Chiến binh Rồng mới trước khi đảm nhận vị trí mới. Một phù thủy độc ác mới xuất hiện, đe dọa mọi thứ Po yêu quý.',
    director: 'Mike Mitchell',
    actors: ['Jack Black', 'Awkwafina', 'Viola Davis'],
    genre: ['Hoạt hình', 'Hài', 'Phiêu lưu', 'Gia đình'],
    rating: 'P',
    language: 'Lồng tiếng',
    durationMinutes: 94,
    releaseDate: '2025-03-08',
    status: 'now_showing',
    aiHint: 'Animation MartialArts',
  },
  {
    id: '4',
    title: 'Furiosa: Câu Chuyện Từ Max Điên',
    posterUrl: 'https://image.tmdb.org/t/p/w500/iADOJ8Zymht2JPMoy3R7xceZprc.jpg',
    trailerUrl: 'https://www.youtube.com/embed/XJMuhwVlca4',
    description: 'Câu chuyện gốc về nữ chiến binh Furiosa, bị bắt cóc khỏi Vùng Xanh Nhiều Mẹ và rơi vào tay một Biker Horde vĩ đại do Warlord Dementus lãnh đạo. Họ quét qua Wasteland và chạm trán Citadel do Immortan Joe cai trị.',
    director: 'George Miller',
    actors: ['Anya Taylor-Joy', 'Chris Hemsworth', 'Tom Burke'],
    genre: ['Hành động', 'Phiêu lưu', 'Khoa học viễn tưởng'],
    rating: 'T18',
    language: 'Phụ đề',
    durationMinutes: 148,
    releaseDate: '2025-02-24', 
    status: 'now_showing',
    aiHint: 'Action Dystopian',
  },
  {
    id: '5',
    title: 'Hành Tinh Khỉ: Vương Quốc Mới',
    posterUrl: 'https://image.tmdb.org/t/p/w500/gKkl37BQuKTanygYQG1pyYg5Gkf.jpg',
    trailerUrl: 'https://www.youtube.com/embed/Kdr5oedn7q8',
    description: 'Nhiều thế hệ sau triều đại của Caesar, loài khỉ là loài thống trị và con người sống trong bóng tối. Khi một thủ lĩnh khỉ độc tài xây dựng đế chế của mình, một con khỉ trẻ bắt đầu một hành trình gian khổ sẽ khiến cậu đặt câu hỏi về mọi thứ cậu biết về quá khứ.',
    director: 'Wes Ball',
    actors: ['Owen Teague', 'Freya Allan', 'Kevin Durand'],
    genre: ['Hành động', 'Khoa học viễn tưởng', 'Phiêu lưu'],
    rating: 'T16',
    language: 'Lồng tiếng',
    durationMinutes: 145,
    releaseDate: '2025-02-10', 
    status: 'now_showing',
    aiHint: 'Apes Future',
  },
  {
    id: '6',
    title: 'Những Mảnh Ghép Cảm Xúc 2',
    posterUrl: 'https://image.tmdb.org/t/p/w500/cfKkCaD8SWALeXt2Wb3pP4oA92.jpg',
    trailerUrl: 'https://www.youtube.com/embed/LEjhY15eCx0',
    description: 'Riley bước vào tuổi thiếu niên và những cảm xúc mới bất ngờ xuất hiện trong Trung枢 Thần kinh của cô bé: Lo Âu, Ghen Tị, Chán Nản và Xấu Hổ. Các cảm xúc cũ phải học cách chung sống với những nhân tố mới này.',
    director: 'Kelsey Mann',
    actors: ['Amy Poehler', 'Maya Hawke', 'Lewis Black'],
    genre: ['Hoạt hình', 'Gia đình', 'Hài'],
    rating: 'P',
    language: 'Lồng tiếng',
    durationMinutes: 100,
    releaseDate: '2025-02-14', 
    status: 'now_showing',
    aiHint: 'Animation Emotions',
  },
  {
    id: '7',
    title: 'Kẻ Trộm Mặt Trăng 4',
    posterUrl: 'https://image.tmdb.org/t/p/w500/3w84DDXsB4y6reqfDkN564b2mS0.jpg',
    trailerUrl: 'https://www.youtube.com/embed/qQ4bK9fPz_s',
    description: 'Gru và gia đình phải đối mặt với một kẻ thù mới, Maxime Le Mal, và cậu con trai sơ sinh của Gru, Gru Jr., người quyết tâm gây rối cho cha mình. Trong khi đó, các Minion lại vướng vào những tình huống dở khóc dở cười.',
    director: 'Chris Renaud',
    actors: ['Steve Carell', 'Kristen Wiig', 'Will Ferrell'],
    genre: ['Hoạt hình', 'Hài', 'Gia đình'],
    rating: 'P',
    language: 'Lồng tiếng',
    durationMinutes: 95,
    releaseDate: '2025-03-03', 
    status: 'now_showing',
    aiHint: 'Animation Minions',
  },
  {
    id: '8',
    title: 'The Garfield Movie',
    posterUrl: 'https://image.tmdb.org/t/p/w500/p6AbOJvYMgWhA3PAUfGGsJGepAG.jpg',
    trailerUrl: 'https://www.youtube.com/embed/IeFWNtMo1Fs',
    description: 'Sau cuộc hội ngộ bất ngờ với người cha đã mất từ ​​lâu của mình - chú mèo đường phố Vic - Garfield và người bạn chó Odie buộc phải từ bỏ cuộc sống được nuông chiều một cách hoàn hảo để tham gia cùng Vic trong một vụ cướp vui nhộn, đầy rủi ro.',
    director: 'Mark Dindal',
    actors: ['Chris Pratt', 'Samuel L. Jackson', 'Hannah Waddingham'],
    genre: ['Hoạt hình', 'Hài', 'Gia đình', 'Phiêu lưu'],
    rating: 'P',
    language: 'Lồng tiếng',
    durationMinutes: 101,
    releaseDate: '2025-02-28', 
    status: 'now_showing',
    aiHint: 'Cat Adventure',
  },
  {
    id: '9',
    title: 'Vùng Đất Câm Lặng: Ngày Một',
    posterUrl: 'https://image.tmdb.org/t/p/w500/qDayjo2jcEE2mF53s2xX3HSPMQ.jpg',
    trailerUrl: 'https://www.youtube.com/embed/YJa4jH3XN9M',
    description: 'Trải nghiệm ngày thế giới trở nên im lặng. Khi những sinh vật săn mồi bằng âm thanh đến Trái Đất, một người phụ nữ tên Sam phải chiến đấu để sống sót ở New York.',
    director: 'Michael Sarnoski',
    actors: ["Lupita Nyong'o", 'Joseph Quinn', 'Alex Wolff'],
    genre: ['Kinh dị', 'Khoa học viễn tưởng', 'Giật gân'],
    rating: 'T16',
    language: 'Phụ đề',
    durationMinutes: 100,
    releaseDate: '2025-03-28', 
    status: 'coming_soon',
    aiHint: 'Horror Aliens',
  },
  {
    id: '10',
    title: 'Deadpool & Wolverine',
    posterUrl: 'https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
    trailerUrl: 'https://www.youtube.com/embed/73_1biulkYk',
    description: 'Wolverine đang hồi phục sau chấn thương thì chạm trán với Deadpool lắm lời. Họ hợp tác để đánh bại một kẻ thù chung, nhưng liệu sự khác biệt của họ có phá hỏng tất cả?',
    director: 'Shawn Levy',
    actors: ['Ryan Reynolds', 'Hugh Jackman', 'Emma Corrin'],
    genre: ['Hành động', 'Hài', 'Siêu anh hùng'],
    rating: 'T18',
    language: 'Phụ đề',
    durationMinutes: 127,
    releaseDate: '2025-03-20', 
    status: 'coming_soon',
    aiHint: 'Superhero Comedy',
  },
  {
    id: '11',
    title: 'Wicked: Phần Một',
    posterUrl: 'https://image.tmdb.org/t/p/w500/nSzcXDQoZGJxJc2gK1t1Tz9MYvP.jpg',
    trailerUrl: 'https://www.youtube.com/embed/F124_2sv12w',
    description: 'Câu chuyện chưa kể về các phù thủy xứ Oz, Elphaba và Glinda, trước khi Dorothy đến. Mối quan hệ phức tạp của họ sẽ định hình số phận của Oz.',
    director: 'Jon M. Chu',
    actors: ['Cynthia Erivo', 'Ariana Grande', 'Jonathan Bailey'],
    genre: ['Nhạc kịch', 'Phiêu lưu', 'Kỳ ảo'],
    rating: 'P',
    language: 'Phụ đề',
    durationMinutes: 150, 
    releaseDate: '2025-03-27', 
    status: 'coming_soon',
    aiHint: 'Fantasy Musical',
  },
  {
    id: '12',
    title: 'Moana 2',
    posterUrl: 'https://image.tmdb.org/t/p/w500/ua4S2v5qKn210gYYz9P2xQWc2s9.jpg',
    trailerUrl: 'https://www.youtube.com/embed/CP6p_Gk2BvI',
    description: 'Moana và Maui tái hợp trong một cuộc phiêu lưu mới trên đại dương bao la, đối mặt với những thử thách và khám phá những vùng đất mới.',
    director: 'Dave Derrick Jr.',
    actors: ["Auli'i Cravalho", 'Dwayne Johnson'],
    genre: ['Hoạt hình', 'Phiêu lưu', 'Gia đình', 'Nhạc kịch'],
    rating: 'P',
    language: 'Lồng tiếng',
    durationMinutes: 100, 
    releaseDate: '2025-03-27', 
    status: 'coming_soon',
    aiHint: 'Ocean Adventure',
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
      { id: 'hallC', name: 'Hội trường C' },
    ],
  },
  {
    id: 'cinema2',
    name: 'AZM Cinema VIP Gò Vấp',
    address: '123 Phan Văn Trị, Gò Vấp, TP. HCM',
    type: 'Rạp VIP',
    halls: [
      { id: 'hallVIP1', name: 'Phòng VIP 1' },
      { id: 'hallVIP2', name: 'Phòng VIP 2' },
    ],
  },
  {
    id: 'cinema3',
    name: 'AZM Cinema Thủ Đức',
    address: '23 Võ Văn Ngân, Linh Chiểu, Thủ Đức, TP. HCM',
    type: 'Tất cả rạp',
    halls: [
        {id: 'hallX', name: 'Phòng chiếu X'},
        {id: 'hallY', name: 'Phòng chiếu Y'},
    ]
  }
];

let initialShowtimes: Showtime[] = [
  // Original fixed showtimes for specific dates
  { id: 'st1', movieId: '1', cinemaId: 'cinema1', hallId: 'hallA', date: '2025-03-01', startTime: '18:00', format: '3D' },
  { id: 'st2', movieId: '1', cinemaId: 'cinema1', hallId: 'hallA', date: '2025-03-01', startTime: '21:30', format: '2D' },
  { id: 'st3', movieId: '1', cinemaId: 'cinema2', hallId: 'hallVIP1', date: '2025-03-02', startTime: '20:00', format: '3D' },
  { id: 'st1_alt1', movieId: '1', cinemaId: 'cinema1', hallId: 'hallB', date: '2025-03-02', startTime: '19:00', format: '2D' },
  { id: 'st4', movieId: '2', cinemaId: 'cinema1', hallId: 'hallB', date: '2025-03-29', startTime: '19:00', format: '2D' },
  { id: 'st5', movieId: '2', cinemaId: 'cinema2', hallId: 'hallVIP1', date: '2025-03-30', startTime: '17:00', format: '2D' },
  { id: 'st2_alt1', movieId: '2', cinemaId: 'cinema1', hallId: 'hallA', date: '2025-03-30', startTime: '20:30', format: '3D' },
  { id: 'st6', movieId: '3', cinemaId: 'cinema1', hallId: 'hallA', date: '2025-03-08', startTime: '16:00', format: '2D' },
  { id: 'st7', movieId: '3', cinemaId: 'cinema1', hallId: 'hallB', date: '2025-03-09', startTime: '14:00', format: '3D' },
  { id: 'st3_alt1', movieId: '3', cinemaId: 'cinema2', hallId: 'hallVIP1', date: '2025-03-08', startTime: '18:00', format: '2D' },
  { id: 'st8', movieId: '4', cinemaId: 'cinema1', hallId: 'hallA', date: '2025-02-24', startTime: '19:30', format: '2D' },
  { id: 'st9', movieId: '4', cinemaId: 'cinema2', hallId: 'hallVIP1', date: '2025-02-25', startTime: '18:30', format: '3D' },
  { id: 'st4_alt1', movieId: '4', cinemaId: 'cinema1', hallId: 'hallB', date: '2025-02-26', startTime: '21:00', format: '2D' },
  { id: 'st10', movieId: '5', cinemaId: 'cinema1', hallId: 'hallB', date: '2025-02-10', startTime: '15:00', format: '3D' },
  { id: 'st11', movieId: '5', cinemaId: 'cinema1', hallId: 'hallA', date: '2025-02-11', startTime: '17:30', format: '2D' },
  { id: 'st5_alt1', movieId: '5', cinemaId: 'cinema2', hallId: 'hallVIP1', date: '2025-02-12', startTime: '19:00', format: '3D' },
  { id: 'st12', movieId: '6', cinemaId: 'cinema2', hallId: 'hallVIP1', date: '2025-02-15', startTime: '20:15', format: '2D' },
  { id: 'st13', movieId: '6', cinemaId: 'cinema1', hallId: 'hallA', date: '2025-02-16', startTime: '19:00', format: '3D' },
  { id: 'st6_alt1', movieId: '6', cinemaId: 'cinema1', hallId: 'hallB', date: '2025-02-17', startTime: '16:30', format: '2D' },
  { id: 'st14', movieId: '7', cinemaId: 'cinema1', hallId: 'hallB', date: '2025-03-03', startTime: '22:00', format: '2D' },
  { id: 'st15', movieId: '7', cinemaId: 'cinema2', hallId: 'hallVIP1', date: '2025-03-04', startTime: '21:00', format: '2D' },
  { id: 'st7_alt1', movieId: '7', cinemaId: 'cinema1', hallId: 'hallA', date: '2025-03-05', startTime: '17:00', format: '3D' },
  { id: 'st16', movieId: '8', cinemaId: 'cinema1', hallId: 'hallA', date: '2025-02-28', startTime: '14:30', format: '2D' },
  { id: 'st17', movieId: '8', cinemaId: 'cinema2', hallId: 'hallVIP1', date: '2025-03-01', startTime: '16:30', format: '2D' },
  { id: 'st8_alt1', movieId: '8', cinemaId: 'cinema1', hallId: 'hallB', date: '2025-03-02', startTime: '11:00', format: '2D' },
  { id: 'st18', movieId: '9', cinemaId: 'cinema1', hallId: 'hallB', date: '2025-03-28', startTime: '18:00', format: '2D' },
  { id: 'st22', movieId: '9', cinemaId: 'cinema1', hallId: 'hallA', date: '2025-03-29', startTime: '20:45', format: '2D' },
  { id: 'st9_alt1', movieId: '9', cinemaId: 'cinema2', hallId: 'hallVIP1', date: '2025-03-28', startTime: '22:00', format: '2D' },
  { id: 'st19', movieId: '10', cinemaId: 'cinema2', hallId: 'hallVIP1', date: '2025-03-20', startTime: '19:45', format: '3D' },
  { id: 'st23', movieId: '10', cinemaId: 'cinema1', hallId: 'hallB', date: '2025-03-21', startTime: '22:15', format: '2D' },
  { id: 'st10_alt1', movieId: '10', cinemaId: 'cinema1', hallId: 'hallA', date: '2025-03-22', startTime: '17:00', format: '3D' },
  { id: 'st20', movieId: '11', cinemaId: 'cinema1', hallId: 'hallA', date: '2025-03-27', startTime: '13:00', format: '2D' }, 
  { id: 'st24', movieId: '11', cinemaId: 'cinema2', hallId: 'hallVIP1', date: '2025-03-28', startTime: '15:30', format: '2D' },
  { id: 'st11_alt1', movieId: '11', cinemaId: 'cinema1', hallId: 'hallB', date: '2025-03-29', startTime: '10:00', format: '2D' },
  { id: 'st21', movieId: '12', cinemaId: 'cinema2', hallId: 'hallVIP1', date: '2025-03-27', startTime: '17:00', format: '3D' }, 
  { id: 'st25', movieId: '12', cinemaId: 'cinema1', hallId: 'hallA', date: '2025-03-28', startTime: '10:00', format: '2D' },
  { id: 'st12_alt1', movieId: '12', cinemaId: 'cinema1', hallId: 'hallB', date: '2025-03-29', startTime: '12:30', format: '3D' },
  { id: 'st_feb1', movieId: '4', cinemaId: 'cinema1', hallId: 'hallA', date: '2025-02-25', startTime: '10:00', format: '2D' },
  { id: 'st_feb2', movieId: '4', cinemaId: 'cinema1', hallId: 'hallB', date: '2025-02-25', startTime: '13:00', format: '3D' },
  { id: 'st_feb3', movieId: '5', cinemaId: 'cinema2', hallId: 'hallVIP1', date: '2025-02-15', startTime: '14:00', format: '2D' },
  { id: 'st_feb4', movieId: '5', cinemaId: 'cinema1', hallId: 'hallA', date: '2025-02-15', startTime: '16:00', format: '3D' },
  { id: 'st_feb5', movieId: '6', cinemaId: 'cinema1', hallId: 'hallB', date: '2025-02-20', startTime: '10:30', format: '2D' },
  { id: 'st_feb6', movieId: '6', cinemaId: 'cinema2', hallId: 'hallVIP1', date: '2025-02-20', startTime: '13:30', format: '2D' },
  { id: 'st_feb7', movieId: '8', cinemaId: 'cinema1', hallId: 'hallA', date: '2025-02-28', startTime: '17:45', format: '3D' },
];

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const generateRandomShowtimes = (): Showtime[] => {
  const newShowtimes: Showtime[] = [];
  const today = new Date();
  const twoWeeksLater = new Date(today);
  twoWeeksLater.setDate(today.getDate() + 14);

  let showtimeIdCounter = initialShowtimes.length + 1000; // Start with a high number to avoid collision

  const possibleTimes = ['09:00', '10:30', '11:15', '13:00', '14:45', '15:30', '17:15', '18:00', '19:00', '19:45', '20:30', '21:15', '22:00'];
  const formats: ('2D' | '3D')[] = ['2D', '3D'];

  for (let d = new Date(today); d <= twoWeeksLater; d.setDate(d.getDate() + 1)) {
    const dateStr = formatDate(d);

    for (const movie of mockMovies) {
      // Only schedule movies that are 'now_showing' or 'coming_soon' and their release date is in the past or today
      const releaseDate = new Date(movie.releaseDate);
      if ( (movie.status === 'now_showing' || movie.status === 'coming_soon') && releaseDate <= d) {
        for (const cinema of mockCinemas) {
          for (const hall of cinema.halls) {
            // Add 2-4 random showtimes per hall per day
            const numShowtimesPerDay = Math.floor(Math.random() * 3) + 2; // 2 to 4
            for (let i = 0; i < numShowtimesPerDay; i++) {
              const randomTime = possibleTimes[Math.floor(Math.random() * possibleTimes.length)];
              const randomFormat = formats[Math.floor(Math.random() * formats.length)];
              
              // Ensure no duplicate showtime for the same movie, cinema, hall, date, and time
              const exists = newShowtimes.some(st => 
                st.movieId === movie.id &&
                st.cinemaId === cinema.id &&
                st.hallId === hall.id &&
                st.date === dateStr &&
                st.startTime === randomTime
              ) || initialShowtimes.some(st => 
                st.movieId === movie.id &&
                st.cinemaId === cinema.id &&
                st.hallId === hall.id &&
                st.date === dateStr &&
                st.startTime === randomTime
              );

              if (!exists) {
                newShowtimes.push({
                  id: `st_gen_${showtimeIdCounter++}`,
                  movieId: movie.id,
                  cinemaId: cinema.id,
                  hallId: hall.id,
                  date: dateStr,
                  startTime: randomTime,
                  format: randomFormat,
                });
              }
            }
          }
        }
      }
    }
  }
  return newShowtimes;
};


export const mockShowtimes: Showtime[] = [...initialShowtimes, ...generateRandomShowtimes()];


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

// New helper functions for the enhanced booking flow

export const getCinemasShowingMovie = (movieId: string): Cinema[] => {
  const cinemaIds = new Set(
    mockShowtimes.filter(st => st.movieId === movieId).map(st => st.cinemaId)
  );
  return mockCinemas.filter(cinema => cinemaIds.has(cinema.id));
};

export const getDatesForMovieInCinema = (movieId: string, cinemaId: string): string[] => {
  const dates = new Set(
    mockShowtimes
      .filter(st => st.movieId === movieId && st.cinemaId === cinemaId)
      .map(st => st.date) // these are 'YYYY-MM-DD'
  );
  return Array.from(dates).sort((a,b) => new Date(a).getTime() - new Date(b).getTime());
};

export const getShowtimesForMovieInCinemaOnDate = (movieId: string, cinemaId: string, date: string): Showtime[] => {
  // date is 'YYYY-MM-DD'
  return mockShowtimes
    .filter(st => st.movieId === movieId && st.cinemaId === cinemaId && st.date === date)
    .sort((a, b) => {
      const timeA = parseInt(a.startTime.replace(':', ''), 10);
      const timeB = parseInt(b.startTime.replace(':', ''), 10);
      return timeA - timeB;
    });
};

// Helper to get all movies that are now showing or coming soon and have showtimes
export const getAvailableMoviesWithShowtimes = (): Movie[] => {
  const today = new Date();
  const movieIdsWithShowtimes = new Set(mockShowtimes.map(st => st.movieId));
  return mockMovies.filter(movie =>
    movieIdsWithShowtimes.has(movie.id) &&
    (movie.status === 'now_showing' || 
     (movie.status === 'coming_soon' && new Date(movie.releaseDate) >= today) || // Allow coming soon if release date is today or future
     (movie.status === 'coming_soon' && new Date(movie.releaseDate) < today && mockShowtimes.some(st => st.movieId === movie.id && new Date(st.date) >= today)) // Allow past 'coming_soon' if they have future showtimes
    )
  );
};
