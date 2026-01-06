import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLevelById, getNextLevel } from '@/data/levels';
import { generateSeats, validateAllRules, areAllSeated, initializeSeatAssignments, getCharacterSeat } from '@/lib/gameEngine';
import { markLevelComplete } from '@/lib/storage';
import { SeatingArea } from '@/components/game/SeatingArea';
import { CharacterPool } from '@/components/game/CharacterPool';
import { SuccessModal } from '@/components/game/SuccessModal';
import { cn } from '@/lib/utils';
import { ArrowLeft, RotateCcw, Check } from 'lucide-react';
import { toast } from 'sonner';

export default function GamePage() {
  const { levelId } = useParams<{ levelId: string }>();
  const navigate = useNavigate();
  
  const level = getLevelById(Number(levelId));
  const [seats, setSeats] = useState(level ? generateSeats(level.seatCount, level.layout) : []);
  const [seatAssignments, setSeatAssignments] = useState<Record<string, string | null>>({});
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);
  const [conflicts, setConflicts] = useState<string[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  
  // 初始化关卡
  useEffect(() => {
    if (level) {
      const newSeats = generateSeats(level.seatCount, level.layout);
      setSeats(newSeats);
      setSeatAssignments(initializeSeatAssignments(newSeats));
      setSelectedCharacterId(null);
      setConflicts([]);
      setShowSuccess(false);
    }
  }, [levelId, level]);
  
  // 处理角色点击
  const handleCharacterClick = useCallback((characterId: string) => {
    // 检查角色是否已就座
    const currentSeat = getCharacterSeat(characterId, seatAssignments);
    
    if (currentSeat) {
      // 如果角色已就座，将其从座位移除
      setSeatAssignments(prev => ({
        ...prev,
        [currentSeat]: null,
      }));
      setSelectedCharacterId(null);
      setConflicts([]);
      toast.info('已将角色移回等候区');
    } else {
      // 选中角色
      setSelectedCharacterId(prevId => prevId === characterId ? null : characterId);
      setConflicts([]);
    }
  }, [seatAssignments]);
  
  // 处理座位点击
  const handleSeatClick = useCallback((seatId: string) => {
    if (!selectedCharacterId) {
      // 如果没有选中角色，检查座位上是否有人
      const characterId = seatAssignments[seatId];
      if (characterId) {
        // 将座位上的角色移回等候区
        setSeatAssignments(prev => ({
          ...prev,
          [seatId]: null,
        }));
        setConflicts([]);
        toast.info('已将角色移回等候区');
      }
      return;
    }
    
    // 检查座位是否已被占用
    if (seatAssignments[seatId]) {
      toast.error('这个座位已经有人了！');
      return;
    }
    
    // 安排角色入座
    setSeatAssignments(prev => ({
      ...prev,
      [seatId]: selectedCharacterId,
    }));
    setSelectedCharacterId(null);
    setConflicts([]);
  }, [selectedCharacterId, seatAssignments]);
  
  // 验证座位安排
  const handleValidate = useCallback(() => {
    if (!level) return;
    
    // 检查是否所有人都已就座
    if (!areAllSeated(seatAssignments, level.characters)) {
      toast.error('还有人没有入座呢！');
      return;
    }
    
    // 验证规则
    const result = validateAllRules(seatAssignments, level.characters, seats);
    
    if (result.isValid) {
      // 成功！
      markLevelComplete(level.id);
      setShowSuccess(true);
    } else {
      // 失败，显示冲突
      setConflicts(result.conflicts);
      toast.error('有人不满意座位安排！');
    }
  }, [level, seatAssignments, seats]);
  
  // 重置关卡
  const handleReset = useCallback(() => {
    if (level) {
      setSeatAssignments(initializeSeatAssignments(seats));
      setSelectedCharacterId(null);
      setConflicts([]);
    }
  }, [level, seats]);
  
  // 下一关
  const handleNextLevel = useCallback(() => {
    if (!level) return;
    const next = getNextLevel(level.id);
    if (next) {
      navigate(`/game/${next.id}`);
      setShowSuccess(false);
    }
  }, [level, navigate]);
  
  if (!level) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-muted-foreground">关卡不存在</p>
          <button
            onClick={() => navigate('/levels')}
            className="mt-4 px-6 py-2 rounded-xl bg-primary text-primary-foreground"
          >
            返回关卡列表
          </button>
        </div>
      </div>
    );
  }
  
  const nextLevel = getNextLevel(level.id);
  const allSeated = areAllSeated(seatAssignments, level.characters);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 flex flex-col">
      {/* 顶部导航 */}
      <div className="bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="flex items-center gap-4 p-4 max-w-lg mx-auto">
          <button
            onClick={() => navigate('/levels')}
            className="p-2 rounded-xl hover:bg-muted transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="font-bold">第 {level.id} 关</h1>
            <p className="text-sm text-muted-foreground">{level.name}</p>
          </div>
          <button
            onClick={handleReset}
            className="p-2 rounded-xl hover:bg-muted transition-colors"
            title="重置"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* 游戏区域 */}
      <div className="flex-1 flex flex-col p-4 max-w-lg mx-auto w-full">
        {/* 关卡描述 */}
        <div className="text-center mb-4">
          <p className="text-sm text-muted-foreground">{level.description}</p>
        </div>
        
        {/* 座位区域 */}
        <div className="flex-shrink-0 mb-6">
          <SeatingArea
            seats={seats}
            characters={level.characters}
            seatAssignments={seatAssignments}
            layout={level.layout}
            highlightedSeatId={selectedCharacterId ? seats.find(s => !seatAssignments[s.id])?.id || null : null}
            conflicts={conflicts}
            onSeatClick={handleSeatClick}
          />
        </div>
        
        {/* 角色池 */}
        <div className="flex-1 overflow-y-auto">
          <CharacterPool
            characters={level.characters}
            seatAssignments={seatAssignments}
            selectedCharacterId={selectedCharacterId}
            conflicts={conflicts}
            onCharacterClick={handleCharacterClick}
          />
        </div>
        
        {/* 验证按钮 */}
        <div className="mt-4 pt-4 border-t border-border">
          <button
            onClick={handleValidate}
            disabled={!allSeated}
            className={cn(
              "w-full py-4 rounded-2xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2",
              allSeated
                ? "bg-primary text-primary-foreground shadow-cute hover:scale-102 active:scale-95"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            )}
          >
            <Check className="w-5 h-5" />
            确认座位
          </button>
        </div>
      </div>
      
      {/* 成功模态框 */}
      <SuccessModal
        isOpen={showSuccess}
        levelName={level.name}
        onNextLevel={handleNextLevel}
        onBackToLevels={() => navigate('/levels')}
        hasNextLevel={!!nextLevel}
      />
    </div>
  );
}
