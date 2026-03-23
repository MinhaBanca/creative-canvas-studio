import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import {
  Tv, Sparkles, Check, Download, Image, Layers, Zap, Eye, Film,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import ContentTypeSelector from "@/components/series/ContentTypeSelector";
import BannerTypeSelector from "@/components/series/BannerTypeSelector";
import SeriesSearch from "@/components/series/SeriesSearch";
import EpisodeSelector from "@/components/series/EpisodeSelector";
import CharacterSelector from "@/components/series/CharacterSelector";
import TrailerConfig from "@/components/series/TrailerConfig";
import BannerPreview from "@/components/series/BannerPreview";
import {
  mockSeries, mockCharacters, mockEpisodes,
  bannerTypes, visualStyles, templates,
} from "@/components/series/seriesData";

const GerarBannerSeriePage = () => {
  const { toast } = useToast();

  // State
  const [contentType, setContentType] = useState<"serie" | "novela" | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSeries, setSelectedSeries] = useState<number | null>(null);
  const [selectedCharacters, setSelectedCharacters] = useState<number[]>([]);
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);
  const [selectedStyle, setSelectedStyle] = useState("netflix");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [trailerPosition, setTrailerPosition] = useState("background");
  const [trailerEffect, setTrailerEffect] = useState("gradient");
  const [showTitle, setShowTitle] = useState(true);
  const [showRating, setShowRating] = useState(true);
  const [showChannel, setShowChannel] = useState(true);
  const [showEpisodeInfo, setShowEpisodeInfo] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  // Derived
  const seriesData = mockSeries.find((s) => s.id === selectedSeries);
  const availableCharacters = selectedSeries ? (mockCharacters[selectedSeries] || []) : [];
  const availableEpisodes = selectedSeries ? mockEpisodes.filter((e) => e.seriesId === selectedSeries) : [];
  const selectedCharsData = availableCharacters.filter((c) => selectedCharacters.includes(c.id));
  const selectedEpData = mockEpisodes.find((e) => e.id === selectedEpisode);

  const toggleCharacter = (id: number) => {
    setSelectedCharacters((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          toast({ title: "✅ Banner gerado!", description: "Seu banner de série está pronto para download." });
          return 100;
        }
        return prev + 8;
      });
    }, 200);
  };

  const handleAutoGenerate = () => {
    // Find first novela with a "Hoje" episode
    const novelaWithToday = mockSeries.find((s) => s.type === "novela" && mockEpisodes.some((e) => e.seriesId === s.id && e.date === "Hoje"));
    if (novelaWithToday) {
      setContentType("novela");
      setSelectedType("episode");
      setSelectedSeries(novelaWithToday.id);
      const todayEp = mockEpisodes.find((e) => e.seriesId === novelaWithToday.id && e.date === "Hoje");
      if (todayEp) setSelectedEpisode(todayEp.id);
      const chars = mockCharacters[novelaWithToday.id];
      if (chars) setSelectedCharacters(chars.slice(0, 2).map((c) => c.id));
      setSelectedStyle("drama");
      toast({ title: "📺 Capítulo de Hoje!", description: `${novelaWithToday.title} — configuração automática aplicada.` });
      setTimeout(handleGenerate, 500);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 pb-12">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-xl bg-[hsl(var(--glow-entertainment))/0.15]">
                <Tv className="h-6 w-6 text-[hsl(var(--glow-entertainment))]" />
              </div>
              <h1 className="text-3xl font-bold">Gerar Banner de Séries e Novelas</h1>
            </div>
            <p className="text-muted-foreground">Crie artes com episódios, personagens e trailers automaticamente</p>
          </div>
          <Button onClick={handleAutoGenerate} className="bg-gradient-to-r from-[hsl(var(--glow-entertainment))] to-primary text-primary-foreground font-bold gap-2 glow-entertainment">
            <Zap className="h-4 w-4" /> Gerar Capítulo de Hoje
          </Button>
        </motion.div>

        {/* Section 2 — Content Type */}
        <ContentTypeSelector value={contentType} onChange={(type) => { setContentType(type); setSelectedSeries(null); setSelectedCharacters([]); setSelectedEpisode(null); }} />

        {/* Section 3 — Banner Type */}
        <BannerTypeSelector value={selectedType} onChange={setSelectedType} bannerTypes={bannerTypes} />

        {/* Section 4 — Search */}
        <SeriesSearch
          series={mockSeries}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          contentType={contentType}
          selectedId={selectedSeries}
          onSelect={(id) => { setSelectedSeries(id); setSelectedCharacters([]); setSelectedEpisode(null); }}
        />

        {/* Section 5 — Episode */}
        {selectedSeries && (
          <EpisodeSelector
            episodes={availableEpisodes}
            selectedId={selectedEpisode}
            onSelect={setSelectedEpisode}
            seriesData={seriesData}
          />
        )}

        {/* Section 6 — Characters */}
        {selectedSeries && (
          <CharacterSelector
            characters={availableCharacters}
            selected={selectedCharacters}
            onToggle={toggleCharacter}
          />
        )}

        {/* Section 7 — Trailer Config (only when trailer type) */}
        {selectedType === "trailer" && (
          <TrailerConfig
            position={trailerPosition}
            onPositionChange={setTrailerPosition}
            effect={trailerEffect}
            onEffectChange={setTrailerEffect}
          />
        )}

        {/* Section 8 — Settings + Style */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" /> Configurações
            </h2>
            <Card className="bg-card">
              <CardContent className="p-5 space-y-4">
                {[
                  { label: "Mostrar título", value: showTitle, setter: setShowTitle },
                  { label: "Mostrar nota", value: showRating, setter: setShowRating },
                  { label: "Mostrar canal / horário", value: showChannel, setter: setShowChannel },
                  { label: "Info do episódio / capítulo", value: showEpisodeInfo, setter: setShowEpisodeInfo },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-sm">{item.label}</span>
                    <Switch checked={item.value} onCheckedChange={item.setter} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-accent" /> Estilo Visual
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {visualStyles.map((style) => (
                <Card
                  key={style.id}
                  className={`cursor-pointer transition-all ${
                    selectedStyle === style.id ? "ring-2 ring-accent bg-accent/10" : "bg-card hover:bg-secondary/50"
                  }`}
                  onClick={() => setSelectedStyle(style.id)}
                >
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm">{style.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{style.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Section 9 — Preview */}
        <BannerPreview
          seriesData={seriesData}
          selectedCharacters={selectedCharsData}
          selectedEpisode={selectedEpData}
          style={selectedStyle}
          bannerType={selectedType}
          showTitle={showTitle}
          showRating={showRating}
          showChannel={showChannel}
          showEpisodeInfo={showEpisodeInfo}
        />

        {/* Section 10 — Templates */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" /> Templates
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {templates.map((tmpl) => (
              <Card
                key={tmpl.id}
                className={`cursor-pointer transition-all hover:scale-[1.03] ${
                  selectedTemplate === tmpl.id ? "ring-2 ring-primary bg-primary/10" : "bg-card hover:bg-secondary/50"
                }`}
                onClick={() => setSelectedTemplate(tmpl.id)}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">{tmpl.icon}</div>
                  <h3 className="font-semibold text-sm">{tmpl.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Progress */}
        {isGenerating && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card className="bg-card">
              <CardContent className="p-6">
                <p className="text-sm font-medium mb-3">Gerando banner...</p>
                <Progress value={progress} className="h-3" />
                <p className="text-xs text-muted-foreground mt-2">{Math.round(progress)}%</p>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Section 11 — Actions */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <div className="flex flex-wrap gap-4">
            <Button onClick={handleGenerate} disabled={isGenerating || !selectedSeries} size="lg" className="bg-gradient-to-r from-[hsl(var(--glow-entertainment))] to-primary text-primary-foreground font-bold gap-2 glow-entertainment">
              <Download className="h-5 w-5" /> Gerar Banner
            </Button>
            <Button onClick={handleGenerate} disabled={isGenerating || !selectedSeries} size="lg" variant="outline" className="gap-2">
              <Layers className="h-5 w-5" /> Gerar Story
            </Button>
            <Button onClick={handleGenerate} disabled={isGenerating || !selectedSeries} size="lg" variant="outline" className="gap-2">
              <Image className="h-5 w-5" /> Gerar Carrossel
            </Button>
          </div>
        </motion.section>
      </div>
    </DashboardLayout>
  );
};

export default GerarBannerSeriePage;
