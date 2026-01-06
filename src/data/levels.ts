import { Level, Character, CharacterType, RuleType } from '@/types/game';

// 生成唯一ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// 创建角色辅助函数
function createCharacter(
  type: CharacterType,
  rules: Array<{ type: RuleType; targetType?: CharacterType }>
): Character {
  const typeInfo: Record<CharacterType, { emoji: string; name: string }> = {
    hat: { emoji: '🎩', name: '帽子先生' },
    glasses: { emoji: '👓', name: '眼镜小姐' },
    red: { emoji: '❤️', name: '红衣女孩' },
    book: { emoji: '📚', name: '书虫' },
    music: { emoji: '🎧', name: '音乐达人' },
  };

  return {
    id: generateId(),
    type,
    rules,
    emoji: typeInfo[type].emoji,
    name: typeInfo[type].name,
  };
}

// 关卡数据
export const LEVELS: Level[] = [
  // ========== 入门关卡 ==========
  {
    id: 1,
    name: '初次见面',
    description: '学习基本规则',
    layout: 'line',
    seatCount: 3,
    difficulty: 'easy',
    characters: [
      createCharacter('hat', [{ type: 'not_next_to', targetType: 'glasses' }]),
      createCharacter('glasses', []),
      createCharacter('red', []),
    ],
  },
  {
    id: 2,
    name: '端位之选',
    description: '有人喜欢边边座位',
    layout: 'line',
    seatCount: 3,
    difficulty: 'easy',
    characters: [
      createCharacter('book', [{ type: 'must_edge' }]),
      createCharacter('music', []),
      createCharacter('hat', []),
    ],
  },
  {
    id: 3,
    name: '友谊万岁',
    description: '有些人必须坐在一起',
    layout: 'line',
    seatCount: 3,
    difficulty: 'easy',
    characters: [
      createCharacter('red', [{ type: 'must_next_to', targetType: 'book' }]),
      createCharacter('book', []),
      createCharacter('glasses', []),
    ],
  },
  {
    id: 4,
    name: '不要边边',
    description: '有人不喜欢端位',
    layout: 'line',
    seatCount: 4,
    difficulty: 'easy',
    characters: [
      createCharacter('music', [{ type: 'not_edge' }]),
      createCharacter('hat', []),
      createCharacter('glasses', []),
      createCharacter('red', []),
    ],
  },
  
  // ========== 普通关卡 ==========
  {
    id: 5,
    name: '双重限制',
    description: '两条规则的挑战',
    layout: 'line',
    seatCount: 4,
    difficulty: 'normal',
    characters: [
      createCharacter('hat', [{ type: 'not_next_to', targetType: 'music' }]),
      createCharacter('music', [{ type: 'must_edge' }]),
      createCharacter('book', []),
      createCharacter('glasses', []),
    ],
  },
  {
    id: 6,
    name: '连锁反应',
    description: '每个人都有要求',
    layout: 'line',
    seatCount: 4,
    difficulty: 'normal',
    characters: [
      createCharacter('red', [{ type: 'must_next_to', targetType: 'book' }]),
      createCharacter('book', [{ type: 'not_edge' }]),
      createCharacter('hat', [{ type: 'must_edge' }]),
      createCharacter('glasses', []),
    ],
  },
  {
    id: 7,
    name: '圆桌会议',
    description: '圆形座位登场',
    layout: 'circle',
    seatCount: 4,
    difficulty: 'normal',
    characters: [
      createCharacter('hat', [{ type: 'not_next_to', targetType: 'glasses' }]),
      createCharacter('glasses', [{ type: 'not_next_to', targetType: 'hat' }]),
      createCharacter('music', []),
      createCharacter('red', []),
    ],
  },
  {
    id: 8,
    name: '对立面',
    description: '有些人真的合不来',
    layout: 'circle',
    seatCount: 4,
    difficulty: 'normal',
    characters: [
      createCharacter('book', [{ type: 'not_next_to', targetType: 'music' }]),
      createCharacter('music', [{ type: 'not_next_to', targetType: 'book' }]),
      createCharacter('hat', [{ type: 'must_next_to', targetType: 'glasses' }]),
      createCharacter('glasses', []),
    ],
  },
  {
    id: 9,
    name: '五人行',
    description: '人多了，规则也多了',
    layout: 'line',
    seatCount: 5,
    difficulty: 'normal',
    characters: [
      createCharacter('hat', [{ type: 'must_edge' }]),
      createCharacter('glasses', [{ type: 'not_next_to', targetType: 'red' }]),
      createCharacter('red', [{ type: 'not_edge' }]),
      createCharacter('book', []),
      createCharacter('music', [{ type: 'must_next_to', targetType: 'book' }]),
    ],
  },
  {
    id: 10,
    name: '社交难题',
    description: '每个人都有小心思',
    layout: 'circle',
    seatCount: 5,
    difficulty: 'normal',
    characters: [
      createCharacter('red', [{ type: 'must_next_to', targetType: 'hat' }]),
      createCharacter('hat', [{ type: 'not_next_to', targetType: 'glasses' }]),
      createCharacter('glasses', [{ type: 'not_next_to', targetType: 'music' }]),
      createCharacter('music', []),
      createCharacter('book', []),
    ],
  },
  
  // ========== 挑战关卡 ==========
  {
    id: 11,
    name: '复杂局面',
    description: '六人大挑战',
    layout: 'line',
    seatCount: 6,
    difficulty: 'hard',
    characters: [
      createCharacter('hat', [{ type: 'must_edge' }]),
      createCharacter('glasses', [{ type: 'not_next_to', targetType: 'hat' }, { type: 'not_edge' }]),
      createCharacter('red', [{ type: 'must_next_to', targetType: 'book' }]),
      createCharacter('book', [{ type: 'not_next_to', targetType: 'music' }]),
      createCharacter('music', [{ type: 'not_edge' }]),
      createCharacter('glasses', [{ type: 'must_next_to', targetType: 'music' }]),
    ],
  },
  {
    id: 12,
    name: '圆桌风云',
    description: '圆形座位的终极挑战',
    layout: 'circle',
    seatCount: 6,
    difficulty: 'hard',
    characters: [
      createCharacter('hat', [{ type: 'not_next_to', targetType: 'red' }]),
      createCharacter('glasses', [{ type: 'must_next_to', targetType: 'book' }]),
      createCharacter('red', [{ type: 'not_next_to', targetType: 'music' }]),
      createCharacter('book', [{ type: 'not_next_to', targetType: 'hat' }]),
      createCharacter('music', [{ type: 'must_next_to', targetType: 'glasses' }]),
      createCharacter('hat', [{ type: 'not_next_to', targetType: 'glasses' }]),
    ],
  },
  {
    id: 13,
    name: '众口难调',
    description: '规则越来越多',
    layout: 'line',
    seatCount: 5,
    difficulty: 'hard',
    characters: [
      createCharacter('hat', [{ type: 'must_edge' }, { type: 'not_next_to', targetType: 'music' }]),
      createCharacter('glasses', [{ type: 'must_next_to', targetType: 'red' }]),
      createCharacter('red', [{ type: 'not_edge' }]),
      createCharacter('book', [{ type: 'not_next_to', targetType: 'glasses' }]),
      createCharacter('music', [{ type: 'must_next_to', targetType: 'book' }]),
    ],
  },
  {
    id: 14,
    name: '完美安排',
    description: '一切都要刚刚好',
    layout: 'circle',
    seatCount: 5,
    difficulty: 'hard',
    characters: [
      createCharacter('red', [{ type: 'must_next_to', targetType: 'hat' }, { type: 'not_next_to', targetType: 'glasses' }]),
      createCharacter('hat', [{ type: 'not_next_to', targetType: 'book' }]),
      createCharacter('glasses', [{ type: 'must_next_to', targetType: 'music' }]),
      createCharacter('book', [{ type: 'not_next_to', targetType: 'music' }]),
      createCharacter('music', []),
    ],
  },
  {
    id: 15,
    name: '最终挑战',
    description: '你能解决这道难题吗？',
    layout: 'circle',
    seatCount: 6,
    difficulty: 'hard',
    characters: [
      createCharacter('hat', [{ type: 'not_next_to', targetType: 'glasses' }, { type: 'not_next_to', targetType: 'music' }]),
      createCharacter('glasses', [{ type: 'must_next_to', targetType: 'book' }]),
      createCharacter('red', [{ type: 'not_next_to', targetType: 'hat' }]),
      createCharacter('book', [{ type: 'not_next_to', targetType: 'red' }]),
      createCharacter('music', [{ type: 'must_next_to', targetType: 'red' }]),
      createCharacter('glasses', [{ type: 'not_next_to', targetType: 'music' }]),
    ],
  },
];

export function getLevelById(id: number): Level | undefined {
  return LEVELS.find(level => level.id === id);
}

export function getNextLevel(currentId: number): Level | undefined {
  const currentIndex = LEVELS.findIndex(level => level.id === currentId);
  if (currentIndex >= 0 && currentIndex < LEVELS.length - 1) {
    return LEVELS[currentIndex + 1];
  }
  return undefined;
}
