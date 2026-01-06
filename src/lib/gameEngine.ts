import { Character, Seat, LayoutType, CharacterRule } from '@/types/game';

// 生成座位布局
export function generateSeats(count: number, layout: LayoutType): Seat[] {
  const seats: Seat[] = [];
  
  for (let i = 0; i < count; i++) {
    const id = `seat-${i}`;
    const adjacentSeats: string[] = [];
    
    if (layout === 'line') {
      // 直线布局：只有左右相邻
      if (i > 0) adjacentSeats.push(`seat-${i - 1}`);
      if (i < count - 1) adjacentSeats.push(`seat-${i + 1}`);
    } else {
      // 圆形布局：首尾相连
      adjacentSeats.push(`seat-${(i - 1 + count) % count}`);
      adjacentSeats.push(`seat-${(i + 1) % count}`);
    }
    
    seats.push({
      id,
      position: i,
      isEdge: layout === 'line' && (i === 0 || i === count - 1),
      adjacentSeats,
    });
  }
  
  return seats;
}

// 验证单个规则
function validateRule(
  rule: CharacterRule,
  character: Character,
  seat: Seat,
  seatAssignments: Record<string, string | null>,
  characters: Character[],
  seats: Seat[]
): boolean {
  switch (rule.type) {
    case 'not_next_to': {
      // 不能坐在 X 类型旁边
      const adjacentCharacterIds = seat.adjacentSeats
        .map(seatId => seatAssignments[seatId])
        .filter(Boolean) as string[];
      
      const adjacentCharacters = adjacentCharacterIds
        .map(id => characters.find(c => c.id === id))
        .filter(Boolean) as Character[];
      
      return !adjacentCharacters.some(c => c.type === rule.targetType);
    }
    
    case 'must_next_to': {
      // 必须坐在 X 类型旁边
      const adjacentCharacterIds = seat.adjacentSeats
        .map(seatId => seatAssignments[seatId])
        .filter(Boolean) as string[];
      
      const adjacentCharacters = adjacentCharacterIds
        .map(id => characters.find(c => c.id === id))
        .filter(Boolean) as Character[];
      
      return adjacentCharacters.some(c => c.type === rule.targetType);
    }
    
    case 'not_edge': {
      // 不能坐在端位
      return !seat.isEdge;
    }
    
    case 'must_edge': {
      // 必须坐在端位
      return seat.isEdge;
    }
    
    case 'not_same_row': {
      // 不能和 X 类型在同一排（简化为不能一起出现）
      const allAssignedIds = Object.values(seatAssignments).filter(Boolean) as string[];
      const allAssignedCharacters = allAssignedIds
        .map(id => characters.find(c => c.id === id))
        .filter(Boolean) as Character[];
      
      // 如果有目标类型的角色也被分配了，则违规
      return !allAssignedCharacters.some(c => c.type === rule.targetType && c.id !== character.id);
    }
    
    default:
      return true;
  }
}

// 验证所有角色的规则
export function validateAllRules(
  seatAssignments: Record<string, string | null>,
  characters: Character[],
  seats: Seat[]
): { isValid: boolean; conflicts: string[] } {
  const conflicts: string[] = [];
  
  // 检查每个已就座的角色
  for (const [seatId, characterId] of Object.entries(seatAssignments)) {
    if (!characterId) continue;
    
    const character = characters.find(c => c.id === characterId);
    const seat = seats.find(s => s.id === seatId);
    
    if (!character || !seat) continue;
    
    // 验证该角色的所有规则
    for (const rule of character.rules) {
      if (!validateRule(rule, character, seat, seatAssignments, characters, seats)) {
        if (!conflicts.includes(characterId)) {
          conflicts.push(characterId);
        }
        break;
      }
    }
  }
  
  return {
    isValid: conflicts.length === 0,
    conflicts,
  };
}

// 检查是否所有角色都已就座
export function areAllSeated(
  seatAssignments: Record<string, string | null>,
  characters: Character[]
): boolean {
  const seatedCharacterIds = Object.values(seatAssignments).filter(Boolean) as string[];
  return seatedCharacterIds.length === characters.length;
}

// 初始化座位分配
export function initializeSeatAssignments(seats: Seat[]): Record<string, string | null> {
  const assignments: Record<string, string | null> = {};
  seats.forEach(seat => {
    assignments[seat.id] = null;
  });
  return assignments;
}

// 获取角色所在座位
export function getCharacterSeat(
  characterId: string,
  seatAssignments: Record<string, string | null>
): string | null {
  for (const [seatId, charId] of Object.entries(seatAssignments)) {
    if (charId === characterId) {
      return seatId;
    }
  }
  return null;
}
