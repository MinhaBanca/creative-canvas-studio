import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Check } from "lucide-react";
import { trailerPositions, trailerEffects } from "./seriesData";

interface TrailerConfigProps {
  position: string;
  onPositionChange: (p: string) => void;
  effect: string;
  onEffectChange: (e: string) => void;
}

const TrailerConfig = ({ position, onPositionChange, effect, onEffectChange }: TrailerConfigProps) => (
  <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
      <Play className="h-5 w-5 text-accent" /> Configuração do Trailer
    </h2>
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h3 className="text-sm font-medium mb-3 text-muted-foreground">Posição do trailer</h3>
        <div className="space-y-2">
          {trailerPositions.map((p) => (
            <Card
              key={p.id}
              className={`cursor-pointer transition-all ${
                position === p.id ? "ring-2 ring-accent bg-accent/10" : "bg-card hover:bg-secondary/50"
              }`}
              onClick={() => onPositionChange(p.id)}
            >
              <CardContent className="p-3 flex items-center justify-between">
                <span className="text-sm">{p.label}</span>
                {position === p.id && <Check className="h-4 w-4 text-accent" />}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium mb-3 text-muted-foreground">Efeito</h3>
        <div className="space-y-2">
          {trailerEffects.map((e) => (
            <Card
              key={e.id}
              className={`cursor-pointer transition-all ${
                effect === e.id ? "ring-2 ring-accent bg-accent/10" : "bg-card hover:bg-secondary/50"
              }`}
              onClick={() => onEffectChange(e.id)}
            >
              <CardContent className="p-3 flex items-center justify-between">
                <span className="text-sm">{e.label}</span>
                {effect === e.id && <Check className="h-4 w-4 text-accent" />}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  </motion.section>
);

export default TrailerConfig;
