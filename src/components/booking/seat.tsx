"use client";
import { cn } from "@/lib/utils";
import { Armchair } from "lucide-react";

export type SeatStatus = "available" | "selected" | "occupied" | "unavailable";

interface SeatProps {
  id: string;
  status: SeatStatus;
  label: string; // e.g., "A1", "B5"
  onClick: (id: string, currentStatus: SeatStatus) => void;
  size?: "sm" | "md" | "lg";
}

export function Seat({ id, status, label, onClick, size = "md" }: SeatProps) {
  const handleClick = () => {
    if (status !== "occupied" && status !== "unavailable") {
      onClick(id, status);
    }
  };

  const seatSizeClasses = {
    sm: "w-6 h-6 text-xs",
    md: "w-8 h-8 text-sm",
    lg: "w-10 h-10 text-base",
  };

  const iconSizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }

  return (
    <button
      onClick={handleClick}
      disabled={status === "occupied" || status === "unavailable"}
      className={cn(
        "flex flex-col items-center justify-center rounded border transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-ring",
        seatSizeClasses[size],
        status === "available" && "bg-secondary hover:bg-muted border-gray-300 text-gray-500 cursor-pointer",
        status === "selected" && "bg-primary hover:bg-primary/90 border-primary text-primary-foreground cursor-pointer",
        status === "occupied" && "bg-destructive/70 border-destructive/50 text-destructive-foreground cursor-not-allowed",
        status === "unavailable" && "bg-gray-300 border-gray-400 text-gray-500 cursor-not-allowed opacity-50"
      )}
      aria-label={`Ghế ${label}, trạng thái: ${status}`}
    >
      <Armchair className={cn(iconSizeClasses[size])}/>
      <span className="mt-0.5 text-[0.6rem] leading-none">{label}</span>
    </button>
  );
}
