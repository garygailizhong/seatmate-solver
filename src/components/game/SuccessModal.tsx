import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface SuccessModalProps {
  isOpen: boolean;
  levelName: string;
  onNextLevel: () => void;
  onBackToLevels: () => void;
  hasNextLevel: boolean;
}

export function SuccessModal({
  isOpen,
  levelName,
  onNextLevel,
  onBackToLevels,
  hasNextLevel,
}: SuccessModalProps) {
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; delay: number }>>([]);
  
  useEffect(() => {
    if (isOpen) {
      // 生成彩带
      const newConfetti = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
      }));
      setConfetti(newConfetti);
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/50 backdrop-blur-sm">
      {/* 彩带 */}
      {confetti.map((c) => (
        <div
          key={c.id}
          className="absolute top-0 text-2xl animate-confetti"
          style={{
            left: `${c.left}%`,
            animationDelay: `${c.delay}s`,
          }}
        >
          {['🎉', '✨', '🌟', '💫', '🎊'][c.id % 5]}
        </div>
      ))}
      
      {/* 模态框 */}
      <div className="bg-card rounded-3xl p-8 shadow-cute-lg animate-bounce-in max-w-sm w-full mx-4 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          太棒了！
        </h2>
        <p className="text-muted-foreground mb-6">
          成功完成「{levelName}」
        </p>
        
        <div className="space-y-3">
          {hasNextLevel && (
            <button
              onClick={onNextLevel}
              className={cn(
                "w-full py-3 px-6 rounded-xl font-bold text-lg transition-all duration-300",
                "bg-primary text-primary-foreground",
                "hover:scale-105 hover:shadow-cute-lg active:scale-95"
              )}
            >
              下一关 →
            </button>
          )}
          
          <button
            onClick={onBackToLevels}
            className={cn(
              "w-full py-3 px-6 rounded-xl font-bold transition-all duration-300",
              "bg-muted text-muted-foreground",
              "hover:bg-muted/80 active:scale-95"
            )}
          >
            返回关卡列表
          </button>
        </div>
      </div>
    </div>
  );
}
