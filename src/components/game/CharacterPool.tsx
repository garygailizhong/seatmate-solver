import { Character } from '@/types/game';
import { CharacterCard } from './CharacterCard';
import { cn } from '@/lib/utils';

interface CharacterPoolProps {
  characters: Character[];
  seatAssignments: Record<string, string | null>;
  selectedCharacterId: string | null;
  conflicts: string[];
  onCharacterClick: (characterId: string) => void;
}

export function CharacterPool({
  characters,
  seatAssignments,
  selectedCharacterId,
  conflicts,
  onCharacterClick,
}: CharacterPoolProps) {
  // 获取已就座的角色ID列表
  const seatedCharacterIds = Object.values(seatAssignments).filter(Boolean) as string[];
  
  // 分离已就座和未就座的角色
  const unseatedCharacters = characters.filter(c => !seatedCharacterIds.includes(c.id));
  const seatedCharacters = characters.filter(c => seatedCharacterIds.includes(c.id));
  
  return (
    <div className="w-full">
      {/* 等候区标题 */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <div className="h-px flex-1 bg-border" />
        <span className="text-sm font-semibold text-muted-foreground px-2">
          👥 等候区 ({unseatedCharacters.length}人)
        </span>
        <div className="h-px flex-1 bg-border" />
      </div>
      
      {/* 角色列表 */}
      <div className="flex flex-wrap justify-center gap-3">
        {unseatedCharacters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            isSelected={selectedCharacterId === character.id}
            isSeated={false}
            hasConflict={conflicts.includes(character.id)}
            onClick={() => onCharacterClick(character.id)}
          />
        ))}
        
        {unseatedCharacters.length === 0 && (
          <div className="text-center py-6 text-muted-foreground">
            <span className="text-2xl mb-2 block">🎉</span>
            <span className="text-sm">所有人都已入座</span>
          </div>
        )}
      </div>
    </div>
  );
}
