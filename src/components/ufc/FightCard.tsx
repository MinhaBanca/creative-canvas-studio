import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Fight, Fighter } from "./ufcData";

interface Props {
  fights: Fight[];
  fighters: Fighter[];
  selectedFights: number[];
  onToggle: (id: number) => void;
}

const FightCard = ({ fights, fighters, selectedFights, onToggle }: Props) => {
  const getFighter = (id: number) => fighters.find((f) => f.id === id);

  return (
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        ⚔️ Lista de Lutas
      </h2>
      <div className="space-y-3">
        {fights.map((fight) => {
          const a = getFighter(fight.fighterA);
          const b = getFighter(fight.fighterB);
          if (!a || !b) return null;
          const selected = selectedFights.includes(fight.id);

          return (
            <Card
              key={fight.id}
              className={`cursor-pointer transition-all ${
                selected
                  ? "ring-2 ring-destructive bg-destructive/10"
                  : "bg-card hover:bg-secondary/50"
              }`}
              onClick={() => onToggle(fight.id)}
            >
              <CardContent className="p-4 flex items-center gap-3">
                <Checkbox checked={selected} className="pointer-events-none" />

                <div className="flex-1 flex items-center justify-between">
                  {/* Fighter A */}
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{a.avatar}</span>
                    <div>
                      <p className="font-bold text-sm">{a.name}</p>
                      <p className="text-xs text-muted-foreground">{a.flag} {a.record}</p>
                    </div>
                  </div>

                  {/* VS */}
                  <div className="text-center px-4">
                    <span className="text-lg font-black text-destructive">VS</span>
                    <p className="text-xs text-muted-foreground">{fight.weight}</p>
                    {fight.isMainEvent && (
                      <span className="text-[10px] bg-destructive text-destructive-foreground px-2 py-0.5 rounded-full font-bold">
                        MAIN EVENT
                      </span>
                    )}
                  </div>

                  {/* Fighter B */}
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="font-bold text-sm">{b.name}</p>
                      <p className="text-xs text-muted-foreground">{b.flag} {b.record}</p>
                    </div>
                    <span className="text-2xl">{b.avatar}</span>
                  </div>
                </div>

                {fight.time && (
                  <span className="text-xs text-muted-foreground ml-2">{fight.time}</span>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </motion.section>
  );
};

export default FightCard;
