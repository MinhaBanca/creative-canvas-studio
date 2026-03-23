import { useMemo } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Star, Check, Clock } from "lucide-react";
import type { SeriesItem } from "./seriesData";

interface SeriesSearchProps {
  series: SeriesItem[];
  searchQuery: string;
  onSearchChange: (q: string) => void;
  contentType: "serie" | "novela" | null;
  selectedId: number | null;
  onSelect: (id: number) => void;
}

const SeriesSearch = ({ series, searchQuery, onSearchChange, contentType, selectedId, onSelect }: SeriesSearchProps) => {
  const filtered = useMemo(() => {
    return series.filter((s) => {
      const matchSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchType = !contentType || s.type === contentType;
      return matchSearch && matchType;
    });
  }, [series, searchQuery, contentType]);

  return (
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Search className="h-5 w-5 text-primary" /> Buscar Série / Novela
      </h2>
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar série ou novela..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-secondary/50 border-border"
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filtered.map((s) => (
          <Card
            key={s.id}
            className={`cursor-pointer transition-all hover:scale-[1.03] ${
              selectedId === s.id
                ? "ring-2 ring-[hsl(var(--glow-entertainment))] bg-[hsl(var(--glow-entertainment))/0.08]"
                : "bg-card hover:bg-secondary/50"
            }`}
            onClick={() => onSelect(s.id)}
          >
            <CardContent className="p-4">
              <div className="text-4xl mb-3 text-center">{s.poster}</div>
              <h3 className="font-semibold text-sm truncate">{s.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {s.type === "novela" ? "Novela" : "Série"}
                </Badge>
                <span className="text-xs text-muted-foreground">{s.year}</span>
              </div>
              <div className="flex items-center gap-1 mt-2">
                <Star className="h-3 w-3 text-accent fill-accent" />
                <span className="text-xs font-medium">{s.rating}</span>
                <span className="text-xs text-muted-foreground ml-auto">{s.channel}</span>
              </div>
              {s.type === "novela" && s.airTime && (
                <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" /> {s.airTime}
                </div>
              )}
              {s.type === "serie" && s.seasons && (
                <p className="text-xs text-muted-foreground mt-1">{s.seasons} temporadas</p>
              )}
              {selectedId === s.id && (
                <Check className="h-4 w-4 text-[hsl(var(--glow-entertainment))] mx-auto mt-2" />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.section>
  );
};

export default SeriesSearch;
