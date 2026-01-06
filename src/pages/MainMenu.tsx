import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';

export default function MainMenu() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-accent/10 to-secondary/20 flex flex-col items-center justify-center p-6">
      {/* 装饰性背景元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-4xl animate-float opacity-30">🪑</div>
        <div className="absolute top-20 right-16 text-3xl animate-float opacity-30" style={{ animationDelay: '0.5s' }}>👓</div>
        <div className="absolute bottom-32 left-20 text-3xl animate-float opacity-30" style={{ animationDelay: '1s' }}>🎩</div>
        <div className="absolute bottom-20 right-10 text-4xl animate-float opacity-30" style={{ animationDelay: '1.5s' }}>📚</div>
        <div className="absolute top-1/3 right-1/4 text-3xl animate-float opacity-30" style={{ animationDelay: '0.7s' }}>🎧</div>
      </div>
      
      {/* Logo 和标题 */}
      <div className="text-center mb-12 animate-slide-up">
        <div className="text-7xl mb-6">🪑</div>
        <h1 className="text-3xl font-extrabold text-foreground mb-3 leading-tight">
          这个座位<br />有人坐吗？
        </h1>
        <p className="text-muted-foreground text-lg">
          逻辑匹配型益智游戏
        </p>
      </div>
      
      {/* 主菜单按钮 */}
      <div className="space-y-4 w-full max-w-xs animate-slide-up" style={{ animationDelay: '0.1s' }}>
        <button
          onClick={() => navigate('/levels')}
          className={cn(
            "w-full py-4 px-8 rounded-2xl font-bold text-xl transition-all duration-300",
            "bg-primary text-primary-foreground shadow-cute",
            "hover:scale-105 hover:shadow-cute-lg active:scale-95"
          )}
        >
          开始游戏
        </button>
        
        <button
          onClick={() => navigate('/how-to-play')}
          className={cn(
            "w-full py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300",
            "bg-card text-foreground border-2 border-border shadow-sm",
            "hover:border-primary/50 hover:scale-102 active:scale-95"
          )}
        >
          游戏说明
        </button>
      </div>
      
      {/* 版本信息 */}
      <div className="absolute bottom-6 text-sm text-muted-foreground">
        v1.0.0
      </div>
    </div>
  );
}
