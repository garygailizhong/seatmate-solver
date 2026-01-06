import { Character, CHARACTER_INFO, getRuleDescription } from '@/types/game';
import { cn } from '@/lib/utils';

interface CharacterCardProps {
  character: Character;
  isSelected: boolean;
  isSeated: boolean;
  hasConflict: boolean;
  onClick: () => void;
}

export function CharacterCard({
  character,
  isSelected,
  isSeated,
  hasConflict,
  onClick,
}: CharacterCardProps) {
  const typeInfo = CHARACTER_INFO[character.type];
  
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center p-3 rounded-2xl cursor-pointer transition-all duration-300",
        "bg-card shadow-cute border-2",
        isSelected && "border-primary ring-2 ring-primary/30 scale-105 animate-pulse-glow",
        isSeated && "opacity-50 cursor-not-allowed",
        hasConflict && "border-destructive bg-destructive/10 animate-shake",
        !isSelected && !isSeated && !hasConflict && "border-transparent hover:border-primary/50 hover:scale-102"
      )}
    >
      {/* 角色头像 */}
      <div
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center text-3xl mb-2",
          "bg-gradient-to-br from-muted to-muted/50",
          hasConflict && "bg-gradient-to-br from-destructive/20 to-destructive/10"
        )}
        style={{
          backgroundColor: hasConflict ? undefined : `hsl(var(--${typeInfo.color}) / 0.3)`,
        }}
      >
        {character.emoji}
      </div>
      
      {/* 角色名字 */}
      <span className="text-xs font-semibold text-foreground mb-1">
        {character.name}
      </span>
      
      {/* 规则列表 */}
      <div className="space-y-1 w-full">
        {character.rules.map((rule, index) => (
          <div
            key={index}
            className={cn(
              "text-[10px] px-2 py-1 rounded-lg text-center",
              "bg-muted text-muted-foreground",
              hasConflict && "bg-destructive/20 text-destructive"
            )}
          >
            {getRuleDescription(rule)}
          </div>
        ))}
        {character.rules.length === 0 && (
          <div className="text-[10px] px-2 py-1 rounded-lg text-center bg-success/20 text-success-foreground">
            没有特殊要求 ✓
          </div>
        )}
      </div>
    </div>
  );
}
