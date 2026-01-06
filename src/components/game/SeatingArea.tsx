import { Seat as SeatType, Character, LayoutType } from '@/types/game';
import { Seat } from './Seat';
import { cn } from '@/lib/utils';

interface SeatingAreaProps {
  seats: SeatType[];
  characters: Character[];
  seatAssignments: Record<string, string | null>;
  layout: LayoutType;
  highlightedSeatId: string | null;
  conflicts: string[];
  onSeatClick: (seatId: string) => void;
}

export function SeatingArea({
  seats,
  characters,
  seatAssignments,
  layout,
  highlightedSeatId,
  conflicts,
  onSeatClick,
}: SeatingAreaProps) {
  const getCharacterBySeatId = (seatId: string): Character | null => {
    const characterId = seatAssignments[seatId];
    if (!characterId) return null;
    return characters.find(c => c.id === characterId) || null;
  };
  
  if (layout === 'circle') {
    // 圆形布局
    const radius = seats.length <= 4 ? 80 : seats.length <= 5 ? 90 : 100;
    const centerX = 150;
    const centerY = 120;
    
    return (
      <div className="relative w-[300px] h-[280px] mx-auto">
        {/* 圆桌背景 */}
        <div 
          className="absolute rounded-full bg-gradient-to-br from-accent/30 to-secondary/30 border-4 border-accent/50"
          style={{
            width: radius * 1.4,
            height: radius * 1.4,
            left: centerX - radius * 0.7,
            top: centerY - radius * 0.7,
          }}
        />
        
        {/* 座位 */}
        {seats.map((seat, index) => {
          const angle = (index / seats.length) * 2 * Math.PI - Math.PI / 2;
          const x = centerX + radius * Math.cos(angle) - 40;
          const y = centerY + radius * Math.sin(angle) - 48;
          
          const character = getCharacterBySeatId(seat.id);
          const hasConflict = character ? conflicts.includes(character.id) : false;
          
          return (
            <div
              key={seat.id}
              className="absolute transition-all duration-300"
              style={{ left: x, top: y }}
            >
              <Seat
                seat={seat}
                character={character}
                isHighlighted={highlightedSeatId === seat.id}
                hasConflict={hasConflict}
                onClick={() => onSeatClick(seat.id)}
              />
            </div>
          );
        })}
      </div>
    );
  }
  
  // 直线布局
  return (
    <div className="flex justify-center items-end gap-2 py-8 overflow-x-auto">
      {seats.map((seat) => {
        const character = getCharacterBySeatId(seat.id);
        const hasConflict = character ? conflicts.includes(character.id) : false;
        
        return (
          <Seat
            key={seat.id}
            seat={seat}
            character={character}
            isHighlighted={highlightedSeatId === seat.id}
            hasConflict={hasConflict}
            onClick={() => onSeatClick(seat.id)}
          />
        );
      })}
    </div>
  );
}
