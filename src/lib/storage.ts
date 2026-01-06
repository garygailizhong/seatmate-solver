import { PlayerProgress } from '@/types/game';

const STORAGE_KEY = 'seat-puzzle-progress';

export function loadProgress(): PlayerProgress {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load progress:', e);
  }
  
  return {
    completedLevels: [],
    currentLevel: 1,
    lastPlayedAt: new Date().toISOString(),
  };
}

export function saveProgress(progress: PlayerProgress): void {
  try {
    progress.lastPlayedAt = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress:', e);
  }
}

export function markLevelComplete(levelId: number): PlayerProgress {
  const progress = loadProgress();
  
  if (!progress.completedLevels.includes(levelId)) {
    progress.completedLevels.push(levelId);
  }
  
  // 更新当前关卡到下一关
  if (levelId >= progress.currentLevel) {
    progress.currentLevel = levelId + 1;
  }
  
  saveProgress(progress);
  return progress;
}

export function isLevelUnlocked(levelId: number, progress: PlayerProgress): boolean {
  // 第一关总是解锁的
  if (levelId === 1) return true;
  
  // 如果前一关已完成，则解锁
  return progress.completedLevels.includes(levelId - 1);
}

export function isLevelCompleted(levelId: number, progress: PlayerProgress): boolean {
  return progress.completedLevels.includes(levelId);
}

export function resetProgress(): void {
  localStorage.removeItem(STORAGE_KEY);
}
