import { useNavigate } from 'react-router-dom';
import { LEVELS } from '@/data/levels';
import { loadProgress, isLevelUnlocked, isLevelCompleted } from '@/lib/storage';
import { cn } from '@/lib/utils';
import { ArrowLeft, Lock, Check, Star } from 'lucide-react';

export default function LevelSelect() {
  const navigate = useNavigate();
  const progress = loadProgress();
  
  const difficultyLabels = {
    easy: { text: '入门', color: 'bg-success text-success-foreground' },
    normal: { text: '普通', color: 'bg-accent text-accent-foreground' },
    hard: { text: '挑战', color: 'bg-destructive text-destructive-foreground' },
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* 顶部导航 */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border z-10">
        <div className="flex items-center gap-4 p-4 max-w-lg mx-auto">
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-xl hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">选择关卡</h1>
          <div className="ml-auto text-sm text-muted-foreground">
            {progress.completedLevels.length}/{LEVELS.length} 完成
          </div>
        </div>
      </div>
      
      {/* 关卡网格 */}
      <div className="p-4 max-w-lg mx-auto">
        <div className="grid grid-cols-3 gap-3">
          {LEVELS.map((level) => {
            const unlocked = isLevelUnlocked(level.id, progress);
            const completed = isLevelCompleted(level.id, progress);
            const difficulty = difficultyLabels[level.difficulty];
            
            return (
              <button
                key={level.id}
                onClick={() => unlocked && navigate(`/game/${level.id}`)}
                disabled={!unlocked}
                className={cn(
                  "relative flex flex-col items-center justify-center p-4 rounded-2xl transition-all duration-300",
                  "border-2 min-h-[100px]",
                  unlocked && !completed && "bg-card border-border hover:border-primary hover:scale-105 shadow-sm",
                  unlocked && completed && "bg-success/10 border-success hover:scale-105",
                  !unlocked && "bg-muted/50 border-muted cursor-not-allowed opacity-60"
                )}
              >
                {/* 完成标记 */}
                {completed && (
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-success flex items-center justify-center">
                    <Check className="w-4 h-4 text-success-foreground" />
                  </div>
                )}
                
                {/* 锁定标记 */}
                {!unlocked && (
                  <Lock className="w-6 h-6 text-muted-foreground mb-1" />
                )}
                
                {/* 关卡号 */}
                {unlocked && (
                  <span className="text-2xl font-bold text-foreground mb-1">
                    {level.id}
                  </span>
                )}
                
                {/* 关卡名 */}
                <span className={cn(
                  "text-xs text-center",
                  unlocked ? "text-muted-foreground" : "text-muted-foreground/50"
                )}>
                  {level.name}
                </span>
                
                {/* 难度标签 */}
                {unlocked && (
                  <span className={cn(
                    "text-[10px] px-2 py-0.5 rounded-full mt-2",
                    difficulty.color
                  )}>
                    {difficulty.text}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
