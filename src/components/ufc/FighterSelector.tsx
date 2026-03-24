import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Check, Search } from "lucide-react";
import { useState } from "react";
import { Fighter } from "./ufcData";

interface Props {
  fighters: Fighter[];
  selected: number[];
  onToggle: (id: number) => void;
}

const FighterSelector = ({ fighters, selected, onToggle }: Props) => {
  const [search, setSearch] = useState("");

  const filtered = fighters.filter((f) =>
    f.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        🏆 Seleção de Lutadores <span className="text-sm text-muted-foreground font-normal">(máx. 2)</span>
      </h2>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar lutador..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-card"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {filtered.map((f) => {
          const isSelected = selected.includes(f.id);
          return (
            <Card
              key={f.id}
              className={`cursor-pointer transition-all hover:scale-[1.03] ${
                isSelected
                  ? "ring-2 ring-destructive bg-destructive/10"
                  : "bg-card hover:bg-secondary/50"
              }`}
              onClick={() => onToggle(f.id)}
            >
              <CardContent className="p-4 text-center">
                <div className="text-4xl mb-2">{f.avatar}</div>
                <h3 className="font-bold text-sm">{f.name}</h3>
                <p className="text-xs text-muted-foreground">{f.flag} {f.country}</p>
                <p className="text-xs text-muted-foreground mt-1">{f.weight} • {f.record}</p>
                {isSelected && <Check className="h-4 w-4 text-destructive mx-auto mt-2" />}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </motion.section>
  );
};

export default FighterSelector;
