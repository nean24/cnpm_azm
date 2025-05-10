"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { genres, ratings, languages } from '@/data/mock-data';
import { SlidersHorizontal } from 'lucide-react';

interface MovieFiltersProps {
  onFilterChange: (filters: Record<string, string>) => void;
  // Add more props for current filter values if needed for controlled component
}

export function MovieFilters({ onFilterChange }: MovieFiltersProps) {
  // In a real app, you'd manage filter state here or in the parent
  // For now, this is a stateless presentational component triggering changes

  const handleGenreChange = (value: string) => {
    onFilterChange({ genre: value });
  };

  const handleRatingChange = (value: string) => {
    onFilterChange({ rating: value });
  };

  const handleLanguageChange = (value: string) => {
    onFilterChange({ language: value });
  };

  return (
    <div className="mb-8 flex flex-col gap-4 rounded-lg border bg-card p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 text-lg font-semibold">
        <SlidersHorizontal className="h-5 w-5 text-primary" />
        <span>Bộ Lọc Phim</span>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Select onValueChange={handleGenreChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Thể loại" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả thể loại</SelectItem>
            {genres.map((genre) => (
              <SelectItem key={genre} value={genre}>{genre}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={handleRatingChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Rated" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả rated</SelectItem>
            {ratings.map((rating) => (
              <SelectItem key={rating} value={rating}>{rating}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={handleLanguageChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Ngôn ngữ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả ngôn ngữ</SelectItem>
            {languages.map((lang) => (
              <SelectItem key={lang} value={lang}>{lang}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {/* <Button className="w-full sm:w-auto">Áp dụng</Button> */}
    </div>
  );
}
