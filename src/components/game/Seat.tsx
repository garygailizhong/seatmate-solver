import { Seat as SeatType, Character, CHARACTER_INFO } from '@/types/game';
import { cn } from '@/lib/utils';

interface SeatProps {
  seat: SeatType;
  character: Character | null;
  isHighlighted: boolean;
  hasConflict: boolean;
  onClick: () => void;
}

export function Seat({
  seat,
  character,
  isHighlighted,
  hasConflict,
  onClick,
}: SeatProps) {
  const isEmpty = !character;
  
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center justify-center cursor-pointer transition-all duration-300",
        "w-20 h-24"
      )}
    >
      {/* 座位底座 */}
      <div
        className={cn(
          "absolute bottom-0 w-16 h-4 rounded-full",
          "bg-foreground/10"
        )}
      />
      
      {/* 座位主体 */}
      <div
        className={cn(
          "relative w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-300",
          "border-3 shadow-lg",
          isEmpty && "bg-seat border-seat-hover",
          isEmpty && isHighlighted && "bg-seat-hover border-primary scale-110 animate-pulse-glow",
          !isEmpty && "bg-seat-occupied border-secondary",
          hasConflict && "bg-destructive/20 border-destructive animate-shake"
        )}
      >
        {/* 椅背装饰 */}
        <div
          className={cn(
            "absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-3 rounded-t-xl",
            isEmpty ? "bg-seat-hover" : "bg-secondary",
            hasConflict && "bg-destructive/30"
          )}
        />
        
        {isEmpty ? (
          // 空座位显示座位号
          <span className="text-muted-foreground text-sm font-bold">
            {seat.position + 1}
          </span>
        ) : (
          // 显示坐着的角色
          <div className="flex flex-col items-center animate-bounce-in">
            <span className="text-2xl">{character.emoji}</span>
          </div>
        )}
      </div>
      
      {/* 端位标记 */}
      {seat.isEdge && (
        <div className="absolute -top-6 left-1/2 -translate-x-1/2">
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent text-accent-foreground font-semibold">
            端位
          </span>
        </div>
      )}
      
      {/* 角色名称 */}
      {character && (
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span className={cn(
            "text-[10px] font-semibold",
            hasConflict ? "text-destructive" : "text-muted-foreground"
          )}>
            {character.name}
          </span>
        </div>
      )}
    </div>
  );
}
