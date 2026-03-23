import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";
import type { Episode, SeriesItem } from "./seriesData";

interface EpisodeSelectorProps {
  episodes: Episode[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  seriesData?: SeriesItem;
}

const EpisodeSelector = ({ episodes, selectedId, onSelect, seriesData }: EpisodeSelectorProps) => {
  if (!episodes.length) return null;

  return (
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Calendar className="h-5 w-5 text-accent" />
        {seriesData?.type === "novela" ? "Capítulo" : "Episódio"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {episodes.map((ep) => (
          <Card
            key={ep.id}
            className={`cursor-pointer transition-all hover:scale-[1.02] ${
              selectedId === ep.id ? "ring-2 ring-accent bg-accent/10" : "bg-card hover:bg-secondary/50"
            }`}
            onClick={() => onSelect(ep.id)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-sm">{ep.title}</h3>
                <Badge
                  variant={ep.date === "Hoje" ? "default" : "secondary"}
                  className={ep.date === "Hoje" ? "bg-destructive text-destructive-foreground" : ""}
                >
                  {ep.date}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-2">{ep.summary}</p>
              {seriesData?.type === "novela" && seriesData.airTime && ep.date === "Hoje" && (
                <div className="flex items-center gap-1 mt-2 text-xs text-accent font-medium">
                  <Clock className="h-3 w-3" /> Hoje às {seriesData.airTime}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.section>
  );
};

export default EpisodeSelector;
