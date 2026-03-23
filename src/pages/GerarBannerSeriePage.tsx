import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tv, Film, Sparkles, Search, Star, Check, Play, Download,
  Image, Layers, Zap, Clock, Users, Calendar, Eye, Heart,
  ChevronRight, Clapperboard, Drama
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Mock data
const mockSeries = [
  { id: 1, title: "Renascer", year: 2024, rating: 8.2, genre: "Novela", poster: "🌾", episodes: 180, channel: "Globo", type: "novela" },
  { id: 2, title: "Mania de Você", year: 2024, rating: 7.8, genre: "Novela", poster: "💃", episodes: 120, channel: "Globo", type: "novela" },
  { id: 3, title: "Terra e Paixão", year: 2024, rating: 7.5, genre: "Novela", poster: "🏜️", episodes: 150, channel: "Globo", type: "novela" },
  { id: 4, title: "The Last of Us", year: 2023, rating: 9.1, genre: "Drama", poster: "🍄", episodes: 9, channel: "HBO", type: "serie" },
  { id: 5, title: "House of the Dragon", year: 2024, rating: 8.8, genre: "Fantasia", poster: "🐉", episodes: 8, channel: "HBO", type: "serie" },
  { id: 6, title: "Stranger Things", year: 2022, rating: 8.7, genre: "Ficção", poster: "👾", episodes: 34, channel: "Netflix", type: "serie" },
  { id: 7, title: "The Bear", year: 2024, rating: 8.9, genre: "Drama", poster: "🐻", episodes: 28, channel: "Disney+", type: "serie" },
  { id: 8, title: "Família é Tudo", year: 2024, rating: 6.9, genre: "Novela", poster: "👨‍👩‍👧‍👦", episodes: 100, channel: "Globo", type: "novela" },
];

const mockCharacters: Record<number, { id: number; name: string; actor: string; avatar: string }[]> = {
  1: [
    { id: 1, name: "José Inocêncio", actor: "Marcos Palmeira", avatar: "👨" },
    { id: 2, name: "Mariana", actor: "Theresa Fonseca", avatar: "👩" },
    { id: 3, name: "Joana", actor: "Alice Carvalho", avatar: "👩‍🦰" },
    { id: 4, name: "Venâncio", actor: "Rodrigo Simas", avatar: "🧔" },
  ],
  2: [
    { id: 5, name: "Viola", actor: "Gabz", avatar: "💃" },
    { id: 6, name: "Luma", actor: "Agatha Moreira", avatar: "👱‍♀️" },
    { id: 7, name: "Mavi", actor: "Chay Suede", avatar: "🧑" },
  ],
  4: [
    { id: 8, name: "Joel", actor: "Pedro Pascal", avatar: "🧔" },
    { id: 9, name: "Ellie", actor: "Bella Ramsey", avatar: "👧" },
  ],
  5: [
    { id: 10, name: "Rhaenyra", actor: "Emma D'Arcy", avatar: "👸" },
    { id: 11, name: "Daemon", actor: "Matt Smith", avatar: "🤴" },
  ],
  6: [
    { id: 12, name: "Eleven", actor: "Millie Bobby Brown", avatar: "👧" },
    { id: 13, name: "Mike", actor: "Finn Wolfhard", avatar: "👦" },
  ],
  7: [
    { id: 14, name: "Carmy", actor: "Jeremy Allen White", avatar: "👨‍🍳" },
    { id: 15, name: "Sydney", actor: "Ayo Edebiri", avatar: "👩‍🍳" },
  ],
};

const mockEpisodes = [
  { id: 1, seriesId: 1, number: 178, title: "Capítulo 178", date: "Hoje", summary: "José Inocêncio descobre a verdade..." },
  { id: 2, seriesId: 1, number: 179, title: "Capítulo 179", date: "Amanhã", summary: "Mariana toma uma decisão difícil..." },
  { id: 3, seriesId: 2, number: 95, title: "Capítulo 95", date: "Hoje", summary: "Viola confronta Luma sobre o segredo..." },
  { id: 4, seriesId: 2, number: 96, title: "Capítulo 96", date: "Amanhã", summary: "Mavi faz uma proposta inesperada..." },
  { id: 5, seriesId: 4, number: 1, title: "S02E01 - Pilot", date: "2025", summary: "Joel e Ellie continuam a jornada..." },
  { id: 6, seriesId: 5, number: 1, title: "S02E01 - A Son for a Son", date: "2024", summary: "Rhaenyra busca vingança..." },
];

const bannerTypes = [
  { id: "simple", title: "Banner Simples", desc: "Poster + personagens", icon: Image, color: "from-primary to-primary/60" },
  { id: "episode", title: "Banner de Capítulo", desc: "Destaque do episódio do dia", icon: Clapperboard, color: "from-accent to-accent/60" },
  { id: "character", title: "Personagem Destaque", desc: "Foco em personagem específico", icon: Users, color: "from-[hsl(var(--glow-entertainment))] to-[hsl(var(--glow-entertainment)/0.6)]" },
  { id: "trailer", title: "Banner com Trailer", desc: "Capa + preview do trailer", icon: Play, color: "from-[hsl(var(--glow-sport))] to-[hsl(var(--glow-sport)/0.6)]" },
];

const visualStyles = [
  { id: "dramatic", name: "Dramático", desc: "Sombras fortes, tipografia impactante" },
  { id: "netflix", name: "Netflix Style", desc: "Visual clean e moderno" },
  { id: "neon", name: "Neon Moderno", desc: "Cores vibrantes e glow" },
  { id: "minimal", name: "Minimal", desc: "Limpo e elegante" },
];

const templates = [
  { id: "novela-hoje", name: "Novela de Hoje", icon: "📺" },
  { id: "serie-lancamento", name: "Lançamento", icon: "🎬" },
  { id: "personagem", name: "Personagem", icon: "🌟" },
  { id: "top-series", name: "Top Séries", icon: "🏆" },
];

const GerarBannerSeriePage = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedSeries, setSelectedSeries] = useState<number | null>(null);
  const [selectedCharacters, setSelectedCharacters] = useState<number[]>([]);
  const [selectedEpisode, setSelectedEpisode] = useState<number | null>(null);
  const [selectedStyle, setSelectedStyle] = useState("dramatic");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [showTitle, setShowTitle] = useState(true);
  const [showRating, setShowRating] = useState(true);
  const [showChannel, setShowChannel] = useState(true);
  const [showEpisodeInfo, setShowEpisodeInfo] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [filterType, setFilterType] = useState<"all" | "serie" | "novela">("all");

  const filteredSeries = useMemo(() => {
    return mockSeries.filter(s => {
      const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = filterType === "all" || s.type === filterType;
      return matchesSearch && matchesType;
    });
  }, [searchQuery, filterType]);

  const availableCharacters = selectedSeries ? (mockCharacters[selectedSeries] || []) : [];
  const availableEpisodes = selectedSeries ? mockEpisodes.filter(e => e.seriesId === selectedSeries) : [];
  const selectedSeriesData = mockSeries.find(s => s.id === selectedSeries);

  const toggleCharacter = (id: number) => {
    setSelectedCharacters(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : prev.length < 3 ? [...prev, id] : prev
    );
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          toast({ title: "✅ Banner gerado!", description: "Seu banner de série está pronto." });
          return 100;
        }
        return prev + 8;
      });
    }, 200);
  };

  const handleAutoGenerate = () => {
    setSelectedType("episode");
    setSelectedSeries(1);
    setSelectedEpisode(1);
    setSelectedCharacters([1, 2]);
    setSelectedStyle("dramatic");
    toast({ title: "🎬 Capítulo de Hoje!", description: "Configuração automática aplicada." });
    setTimeout(handleGenerate, 500);
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
              <h1 className="text-3xl font-bold">Gerar Banner de Séries</h1>
            </div>
            <p className="text-muted-foreground">Crie artes dramáticas com personagens e episódios em destaque</p>
          </div>
          <Button onClick={handleAutoGenerate} className="bg-gradient-to-r from-[hsl(var(--glow-entertainment))] to-primary text-primary-foreground font-bold gap-2 glow-entertainment">
            <Zap className="h-4 w-4" /> Gerar Capítulo de Hoje
          </Button>
        </motion.div>

        {/* Tipo de Banner */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Layers className="h-5 w-5 text-primary" /> Tipo de Banner</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bannerTypes.map(type => (
              <Card key={type.id} className={`cursor-pointer transition-all hover:scale-[1.03] ${selectedType === type.id ? "ring-2 ring-[hsl(var(--glow-entertainment))] bg-[hsl(var(--glow-entertainment))/0.1]" : "bg-card hover:bg-secondary/50"}`} onClick={() => setSelectedType(type.id)}>
                <CardContent className="p-4 text-center">
                  <div className={`w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center bg-gradient-to-br ${type.color}`}>
                    <type.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-semibold text-sm">{type.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{type.desc}</p>
                  {selectedType === type.id && <Check className="h-4 w-4 text-[hsl(var(--glow-entertainment))] mx-auto mt-2" />}
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Busca de Séries */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Search className="h-5 w-5 text-primary" /> Buscar Série / Novela</h2>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar série ou novela..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 bg-secondary/50 border-border" />
            </div>
            <div className="flex gap-2">
              {(["all", "serie", "novela"] as const).map(t => (
                <Button key={t} variant={filterType === t ? "default" : "outline"} size="sm" onClick={() => setFilterType(t)}>
                  {t === "all" ? "Todos" : t === "serie" ? "Séries" : "Novelas"}
                </Button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredSeries.map(series => (
              <Card key={series.id} className={`cursor-pointer transition-all hover:scale-[1.03] ${selectedSeries === series.id ? "ring-2 ring-[hsl(var(--glow-entertainment))] bg-[hsl(var(--glow-entertainment))/0.08]" : "bg-card hover:bg-secondary/50"}`} onClick={() => { setSelectedSeries(series.id); setSelectedCharacters([]); setSelectedEpisode(null); }}>
                <CardContent className="p-4">
                  <div className="text-4xl mb-3 text-center">{series.poster}</div>
                  <h3 className="font-semibold text-sm truncate">{series.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant="secondary" className="text-xs">{series.type === "novela" ? "Novela" : "Série"}</Badge>
                    <span className="text-xs text-muted-foreground">{series.year}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <Star className="h-3 w-3 text-accent fill-accent" />
                    <span className="text-xs font-medium">{series.rating}</span>
                    <span className="text-xs text-muted-foreground ml-auto">{series.channel}</span>
                  </div>
                  {selectedSeries === series.id && <Check className="h-4 w-4 text-[hsl(var(--glow-entertainment))] mx-auto mt-2" />}
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Seleção de Episódio */}
        {selectedSeries && availableEpisodes.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Calendar className="h-5 w-5 text-accent" /> Episódio</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {availableEpisodes.map(ep => (
                <Card key={ep.id} className={`cursor-pointer transition-all ${selectedEpisode === ep.id ? "ring-2 ring-accent bg-accent/10" : "bg-card hover:bg-secondary/50"}`} onClick={() => setSelectedEpisode(ep.id)}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-sm">{ep.title}</h3>
                      <Badge variant={ep.date === "Hoje" ? "default" : "secondary"} className="text-xs">{ep.date}</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{ep.summary}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>
        )}

        {/* Personagens */}
        {selectedSeries && availableCharacters.length > 0 && (
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Users className="h-5 w-5 text-[hsl(var(--glow-entertainment))]" /> Personagens <span className="text-sm text-muted-foreground">(máx. 3)</span></h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {availableCharacters.map(char => (
                <Card key={char.id} className={`cursor-pointer transition-all hover:scale-[1.03] ${selectedCharacters.includes(char.id) ? "ring-2 ring-[hsl(var(--glow-entertainment))] bg-[hsl(var(--glow-entertainment))/0.1]" : "bg-card hover:bg-secondary/50"}`} onClick={() => toggleCharacter(char.id)}>
                  <CardContent className="p-4 text-center">
                    <div className="text-4xl mb-2">{char.avatar}</div>
                    <h3 className="font-semibold text-sm">{char.name}</h3>
                    <p className="text-xs text-muted-foreground">{char.actor}</p>
                    {selectedCharacters.includes(char.id) && <Check className="h-4 w-4 text-[hsl(var(--glow-entertainment))] mx-auto mt-2" />}
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>
        )}

        {/* Configurações + Estilo */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Eye className="h-5 w-5 text-primary" /> Configurações</h2>
            <Card className="bg-card">
              <CardContent className="p-5 space-y-4">
                {[
                  { label: "Mostrar título", value: showTitle, setter: setShowTitle },
                  { label: "Mostrar nota", value: showRating, setter: setShowRating },
                  { label: "Mostrar canal", value: showChannel, setter: setShowChannel },
                  { label: "Info do episódio", value: showEpisodeInfo, setter: setShowEpisodeInfo },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between">
                    <span className="text-sm">{item.label}</span>
                    <Switch checked={item.value} onCheckedChange={item.setter} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.section>

          <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Sparkles className="h-5 w-5 text-accent" /> Estilo Visual</h2>
            <div className="grid grid-cols-2 gap-3">
              {visualStyles.map(style => (
                <Card key={style.id} className={`cursor-pointer transition-all ${selectedStyle === style.id ? "ring-2 ring-accent bg-accent/10" : "bg-card hover:bg-secondary/50"}`} onClick={() => setSelectedStyle(style.id)}>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-sm">{style.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{style.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Preview */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Film className="h-5 w-5 text-[hsl(var(--glow-entertainment))]" /> Preview em Tempo Real</h2>
          <Card className="bg-card overflow-hidden">
            <CardContent className="p-0">
              <div className={`aspect-video relative flex items-end ${selectedStyle === "dramatic" ? "bg-gradient-to-t from-background via-background/80 to-[hsl(var(--glow-entertainment))/0.2]" : selectedStyle === "netflix" ? "bg-gradient-to-t from-background to-secondary" : selectedStyle === "neon" ? "bg-gradient-to-br from-[hsl(var(--glow-entertainment))/0.3] via-background to-[hsl(var(--glow-sport))/0.2]" : "bg-card"}`}>
                {/* Characters */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-6">
                  {selectedCharacters.length > 0 ? (
                    selectedCharacters.map((charId, i) => {
                      const char = availableCharacters.find(c => c.id === charId);
                      return char ? (
                        <motion.div key={charId} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.15 }} className="text-center">
                          <div className="text-6xl md:text-8xl mb-2">{char.avatar}</div>
                          <span className="text-xs font-semibold bg-background/60 px-2 py-1 rounded">{char.name}</span>
                        </motion.div>
                      ) : null;
                    })
                  ) : (
                    <div className="text-center text-muted-foreground">
                      <Tv className="h-16 w-16 mx-auto mb-3 opacity-30" />
                      <p className="text-sm">Selecione uma série e personagens</p>
                    </div>
                  )}
                </div>

                {/* Info overlay */}
                <div className="relative z-10 p-6 w-full">
                  {selectedSeriesData && showTitle && (
                    <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-2xl md:text-4xl font-bold mb-1">
                      {selectedSeriesData.title}
                    </motion.h2>
                  )}
                  <div className="flex items-center gap-3 flex-wrap">
                    {selectedSeriesData && showRating && (
                      <Badge className="bg-accent/20 text-accent border-accent/30 gap-1"><Star className="h-3 w-3 fill-accent" /> {selectedSeriesData.rating}</Badge>
                    )}
                    {selectedSeriesData && showChannel && (
                      <Badge variant="secondary">{selectedSeriesData.channel}</Badge>
                    )}
                    {selectedEpisode && showEpisodeInfo && (
                      <Badge variant="outline" className="border-[hsl(var(--glow-entertainment))/0.5] text-[hsl(var(--glow-entertainment))]">
                        {mockEpisodes.find(e => e.id === selectedEpisode)?.title}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Templates */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><Layers className="h-5 w-5 text-primary" /> Templates</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {templates.map(tmpl => (
              <Card key={tmpl.id} className={`cursor-pointer transition-all hover:scale-[1.03] ${selectedTemplate === tmpl.id ? "ring-2 ring-primary bg-primary/10" : "bg-card hover:bg-secondary/50"}`} onClick={() => setSelectedTemplate(tmpl.id)}>
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

        {/* Ações */}
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
