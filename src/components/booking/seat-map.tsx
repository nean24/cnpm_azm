"use client";
import { useState } from 'react';
import { Seat, type SeatStatus } from './seat';

interface SeatData {
  id: string;
  label: string;
  status: SeatStatus;
}

// Simplified seat layout generator
const generateSeats = (rows: number, cols: number): SeatData[][] => {
  const layout: SeatData[][] = [];
  const rowChars = "ABCDEFGHIJKLMN".split('');
  for (let i = 0; i < rows; i++) {
    const row: SeatData[] = [];
    for (let j = 0; j < cols; j++) {
      const seatId = `${rowChars[i]}${j + 1}`;
      // Randomly make some seats occupied or unavailable for demo
      let initialStatus: SeatStatus = "available";
      if (Math.random() < 0.2) initialStatus = "occupied";
      else if (i === 0 && j < 2) initialStatus = "unavailable"; // Example of unavailable seats

      row.push({ id: seatId, label: seatId, status: initialStatus });
    }
    layout.push(row);
  }
  return layout;
};


interface SeatMapProps {
  onSeatsSelected: (selectedSeats: SeatData[]) => void;
  maxSeats?: number; // Optional: limit number of seats that can be selected
}

export function SeatMap({ onSeatsSelected, maxSeats = 5 }: SeatMapProps) {
  const [seats, setSeats] = useState<SeatData[][]>(() => generateSeats(8, 10)); // 8 rows, 10 cols

  const handleSeatClick = (seatId: string, currentStatus: SeatStatus) => {
    const newSeats = seats.map(row =>
      row.map(seat => {
        if (seat.id === seatId) {
          // Count currently selected seats
          const currentlySelectedCount = seats.flat().filter(s => s.status === "selected").length;

          if (currentStatus === "available") {
            if (currentlySelectedCount < maxSeats) {
              return { ...seat, status: "selected" as SeatStatus };
            } else {
              // Optionally show a toast or message here: "Max seats selected"
              console.warn(`Maximum ${maxSeats} seats can be selected.`);
              return seat;
            }
          } else if (currentStatus === "selected") {
            return { ...seat, status: "available" as SeatStatus };
          }
        }
        return seat;
      })
    );
    setSeats(newSeats);
    onSeatsSelected(newSeats.flat().filter(seat => seat.status === 'selected'));
  };

  return (
    <div className="flex flex-col items-center rounded-lg border bg-card p-4 shadow-sm md:p-6">
      <div className="mb-4 w-full bg-foreground py-2 text-center text-sm font-semibold text-background">
        MÀN HÌNH
      </div>
      <div className="grid gap-1.5 md:gap-2">
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-1.5 md:gap-2">
            {row.map(seat => (
              <Seat
                key={seat.id}
                id={seat.id}
                label={seat.label}
                status={seat.status}
                onClick={handleSeatClick}
                size="md"
              />
            ))}
          </div>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
        <div className="flex items-center gap-2"><Seat id="legend-available" label="" status="available" onClick={() => {}} size="sm" /> Trống</div>
        <div className="flex items-center gap-2"><Seat id="legend-selected" label="" status="selected" onClick={() => {}} size="sm" /> Đang chọn</div>
        <div className="flex items-center gap-2"><Seat id="legend-occupied" label="" status="occupied" onClick={() => {}} size="sm" /> Đã bán</div>
        <div className="flex items-center gap-2"><Seat id="legend-unavailable" label="" status="unavailable" onClick={() => {}} size="sm" /> Không thể chọn</div>
      </div>
    </div>
  );
}
