// 角色类型定义
export type CharacterType = 'hat' | 'glasses' | 'red' | 'book' | 'music';

// 规则类型
export type RuleType = 
  | 'not_next_to'      // 不能坐在 X 类型旁边
  | 'must_next_to'     // 必须坐在 X 类型旁边
  | 'not_edge'         // 不能坐在端位
  | 'must_edge'        // 必须坐在端位
  | 'not_same_row';    // 不能和 X 类型在同一排（用于圆形座位）

// 角色规则
export interface CharacterRule {
  type: RuleType;
  targetType?: CharacterType; // 规则针对的角色类型
}

// 角色定义
export interface Character {
  id: string;
  type: CharacterType;
  rules: CharacterRule[];
  emoji: string;
  name: string;
}

// 座位定义
export interface Seat {
  id: string;
  position: number;      // 座位位置索引
  isEdge: boolean;       // 是否是端位
  adjacentSeats: string[]; // 相邻座位ID
}

// 座位布局类型
export type LayoutType = 'line' | 'circle';

// 关卡定义
export interface Level {
  id: number;
  name: string;
  description: string;
  layout: LayoutType;
  seatCount: number;
  characters: Character[];
  difficulty: 'easy' | 'normal' | 'hard';
}

// 游戏状态
export interface GameState {
  currentLevel: number;
  seatAssignments: Record<string, string | null>; // seatId -> characterId
  selectedCharacterId: string | null;
  isValidating: boolean;
  conflicts: string[]; // 冲突的角色ID列表
  isComplete: boolean;
}

// 玩家进度
export interface PlayerProgress {
  completedLevels: number[];
  currentLevel: number;
  lastPlayedAt: string;
}

// 角色类型信息
export const CHARACTER_INFO: Record<CharacterType, { emoji: string; name: string; color: string }> = {
  hat: { emoji: '🎩', name: '戴帽子', color: 'type-hat' },
  glasses: { emoji: '👓', name: '戴眼镜', color: 'type-glasses' },
  red: { emoji: '❤️', name: '穿红衣', color: 'type-red' },
  book: { emoji: '📚', name: '拿书', color: 'type-book' },
  music: { emoji: '🎧', name: '听音乐', color: 'type-music' },
};

// 规则描述生成
export function getRuleDescription(rule: CharacterRule): string {
  const targetName = rule.targetType ? CHARACTER_INFO[rule.targetType].name : '';
  
  switch (rule.type) {
    case 'not_next_to':
      return `不能坐在${targetName}的人旁边`;
    case 'must_next_to':
      return `必须坐在${targetName}的人旁边`;
    case 'not_edge':
      return '不能坐在端位';
    case 'must_edge':
      return '必须坐在端位';
    case 'not_same_row':
      return `不能和${targetName}的人在一起`;
    default:
      return '未知规则';
  }
}
