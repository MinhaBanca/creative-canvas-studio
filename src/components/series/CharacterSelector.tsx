import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Check } from "lucide-react";
import type { Character } from "./seriesData";

interface CharacterSelectorProps {
  characters: Character[];
  selected: number[];
  onToggle: (id: number) => void;
  max?: number;
}

const CharacterSelector = ({ characters, selected, onToggle, max = 3 }: CharacterSelectorProps) => {
  if (!characters.length) return null;

  return (
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Users className="h-5 w-5 text-[hsl(var(--glow-entertainment))]" /> Personagens
        <span className="text-sm text-muted-foreground">(máx. {max})</span>
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {characters.map((char) => (
          <Card
            key={char.id}
            className={`cursor-pointer transition-all hover:scale-[1.03] ${
              selected.includes(char.id)
                ? "ring-2 ring-[hsl(var(--glow-entertainment))] bg-[hsl(var(--glow-entertainment))/0.1]"
                : "bg-card hover:bg-secondary/50"
            }`}
            onClick={() => onToggle(char.id)}
          >
            <CardContent className="p-4 text-center">
              <div className="text-5xl mb-2">{char.avatar}</div>
              <h3 className="font-semibold text-sm">{char.name}</h3>
              <p className="text-xs text-muted-foreground">{char.actor}</p>
              {char.role && (
                <Badge variant="secondary" className="mt-2 text-xs">{char.role}</Badge>
              )}
              {selected.includes(char.id) && (
                <Check className="h-4 w-4 text-[hsl(var(--glow-entertainment))] mx-auto mt-2" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.section>
  );
};

export default CharacterSelector;
