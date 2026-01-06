import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';

export default function HowToPlay() {
  const navigate = useNavigate();
  
  const rules = [
    {
      emoji: '👆',
      title: '选择角色',
      description: '点击下方等候区的小人，选中要安排的角色',
    },
    {
      emoji: '🪑',
      title: '安排座位',
      description: '点击空座位，将选中的角色安排入座',
    },
    {
      emoji: '📋',
      title: '遵守规则',
      description: '每个角色都有自己的规则偏好，仔细阅读',
    },
    {
      emoji: '✅',
      title: '完成验证',
      description: '所有人入座后，点击确认按钮检查是否正确',
    },
  ];
  
  const ruleTypes = [
    {
      type: '不能坐在 X 旁边',
      example: '🎩 不能坐在 👓 旁边',
      explanation: '两个角色不能相邻而坐',
    },
    {
      type: '必须坐在 X 旁边',
      example: '❤️ 必须坐在 📚 旁边',
      explanation: '必须和特定角色相邻',
    },
    {
      type: '必须坐端位',
      example: '🎧 必须坐端位',
      explanation: '只能坐在最左或最右的位置',
    },
    {
      type: '不能坐端位',
      example: '📚 不能坐端位',
      explanation: '不能坐在最边上的位置',
    },
  ];
  
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
          <h1 className="text-xl font-bold">游戏说明</h1>
        </div>
      </div>
      
      <div className="p-4 max-w-lg mx-auto space-y-6">
        {/* 游戏目标 */}
        <section className="bg-card rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
            🎯 游戏目标
          </h2>
          <p className="text-muted-foreground">
            在有限的座位上安排所有小人入座，让每个人都感到满意！
            每位小人都有自己的偏好或禁忌，你需要找到让所有人都满足的座位安排。
          </p>
        </section>
        
        {/* 操作步骤 */}
        <section className="bg-card rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            📖 如何操作
          </h2>
          <div className="space-y-4">
            {rules.map((rule, index) => (
              <div key={index} className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-xl flex-shrink-0">
                  {rule.emoji}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{rule.title}</h3>
                  <p className="text-sm text-muted-foreground">{rule.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* 规则类型 */}
        <section className="bg-card rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            📜 规则类型
          </h2>
          <div className="space-y-4">
            {ruleTypes.map((rule, index) => (
              <div key={index} className="p-3 bg-muted/50 rounded-xl">
                <div className="font-semibold text-foreground mb-1">{rule.type}</div>
                <div className="text-lg mb-1">{rule.example}</div>
                <div className="text-sm text-muted-foreground">{rule.explanation}</div>
              </div>
            ))}
          </div>
        </section>
        
        {/* 开始游戏按钮 */}
        <button
          onClick={() => navigate('/levels')}
          className={cn(
            "w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300",
            "bg-primary text-primary-foreground shadow-cute",
            "hover:scale-102 active:scale-95"
          )}
        >
          开始游戏 🎮
        </button>
      </div>
    </div>
  );
}
