import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Film, Tv, Star, Clock, Play } from "lucide-react";
import type { SeriesItem, Character, Episode } from "./seriesData";

interface BannerPreviewProps {
  seriesData?: SeriesItem;
  selectedCharacters: Character[];
  selectedEpisode?: Episode;
  style: string;
  bannerType: string | null;
  showTitle: boolean;
  showRating: boolean;
  showChannel: boolean;
  showEpisodeInfo: boolean;
}

const styleBackgrounds: Record<string, string> = {
  netflix: "bg-gradient-to-t from-background to-secondary",
  drama: "bg-gradient-to-t from-background via-[hsl(var(--destructive)/0.15)] to-[hsl(var(--glow-entertainment))/0.2]",
  suspense: "bg-gradient-to-br from-background via-background to-[hsl(var(--muted))]",
  minimal: "bg-card",
};

const BannerPreview = ({
  seriesData, selectedCharacters, selectedEpisode, style, bannerType,
  showTitle, showRating, showChannel, showEpisodeInfo,
}: BannerPreviewProps) => (
  <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
      <Film className="h-5 w-5 text-[hsl(var(--glow-entertainment))]" /> Preview em Tempo Real
    </h2>
    <Card className="bg-card overflow-hidden">
      <CardContent className="p-0">
        <div className={`aspect-video relative flex items-end ${styleBackgrounds[style] || styleBackgrounds.netflix}`}>
          {/* Trailer mock */}
          {bannerType === "trailer" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-16 h-16 rounded-full bg-[hsl(var(--glow-entertainment))/0.3] flex items-center justify-center backdrop-blur-sm"
              >
                <Play className="h-8 w-8 text-foreground fill-foreground" />
              </motion.div>
            </div>
          )}

          {/* Characters */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-6">
            {selectedCharacters.length > 0 ? (
              selectedCharacters.map((char, i) => (
                <motion.div
                  key={char.id}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="text-center"
                >
                  <div className="text-6xl md:text-8xl mb-2">{char.avatar}</div>
                  <span className="text-xs font-bold bg-background/70 px-2 py-1 rounded backdrop-blur-sm">
                    {char.name}
                  </span>
                  {char.role && (
                    <p className="text-[10px] text-muted-foreground mt-1">{char.role}</p>
                  )}
                </motion.div>
              ))
            ) : (
              <div className="text-center text-muted-foreground">
                <Tv className="h-16 w-16 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Selecione uma série e personagens</p>
              </div>
            )}
          </div>

          {/* Info overlay */}
          <div className="relative z-10 p-6 w-full bg-gradient-to-t from-background/90 to-transparent">
            {seriesData && showTitle && (
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`font-bold mb-1 ${style === "drama" ? "text-3xl md:text-5xl italic" : "text-2xl md:text-4xl"}`}
              >
                {seriesData.title}
              </motion.h2>
            )}
            <div className="flex items-center gap-3 flex-wrap">
              {seriesData && showRating && (
                <Badge className="bg-accent/20 text-accent border-accent/30 gap-1">
                  <Star className="h-3 w-3 fill-accent" /> {seriesData.rating}
                </Badge>
              )}
              {seriesData && showChannel && (
                <Badge variant="secondary">{seriesData.channel}</Badge>
              )}
              {seriesData?.type === "novela" && seriesData.airTime && showEpisodeInfo && (
                <Badge variant="outline" className="border-accent/40 text-accent gap-1">
                  <Clock className="h-3 w-3" /> {seriesData.airTime}
                </Badge>
              )}
              {selectedEpisode && showEpisodeInfo && (
                <Badge variant="outline" className="border-[hsl(var(--glow-entertainment))/0.5] text-[hsl(var(--glow-entertainment))]">
                  {selectedEpisode.title}
                </Badge>
              )}
            </div>
            {selectedEpisode && showEpisodeInfo && (
              <p className="text-xs text-muted-foreground mt-2 max-w-md line-clamp-2">
                {selectedEpisode.summary}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.section>
);

export default BannerPreview;
