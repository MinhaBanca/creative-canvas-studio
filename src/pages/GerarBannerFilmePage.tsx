import { useState, useMemo } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { motion, AnimatePresence } from "framer-motion";
import {
  Film, Clapperboard, Search, Star, Eye, EyeOff, Type, AlignLeft,
  Sparkles, Wand2, Download, Image, Layers, Play, Pause,
  ChevronRight, Check, Zap, Crown, Monitor, Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";

// Mock movies
const mockMovies = [
  { id: 1, title: "Duna: Parte Dois", year: 2024, rating: 8.6, poster: "🏜️", genre: "Ficção Científica", overview: "Paul Atreides se une aos Fremen enquanto busca vingança contra aqueles que destruíram sua família." },
  { id: 2, title: "Oppenheimer", year: 2023, rating: 8.5, poster: "💣", genre: "Drama", overview: "A história do físico J. Robert Oppenheimer e seu papel no desenvolvimento da bomba atômica." },
  { id: 3, title: "Pobres Criaturas", year: 2024, rating: 8.3, poster: "🧪", genre: "Fantasia", overview: "A incrível história de Bella Baxter, uma jovem mulher trazida de volta à vida." },
  { id: 4, title: "Gladiador II", year: 2024, rating: 7.8, poster: "⚔️", genre: "Ação", overview: "Lucius é forçado a entrar no Coliseu após sua terra ser conquistada." },
  { id: 5, title: "Coringa: Delírio a Dois", year: 2024, rating: 5.2, poster: "🃏", genre: "Drama", overview: "Arthur Fleck está institucionalizado em Arkham aguardando julgamento." },
  { id: 6, title: "Deadpool & Wolverine", year: 2024, rating: 7.9, poster: "🦸", genre: "Ação", overview: "Deadpool e Wolverine unem forças para enfrentar um inimigo comum." },
  { id: 7, title: "Divertida Mente 2", year: 2024, rating: 7.6, poster: "😊", genre: "Animação", overview: "Riley entra na puberdade e novas emoções surgem." },
  { id: 8, title: "O Brutalista", year: 2024, rating: 8.1, poster: "🏗️", genre: "Drama", overview: "Um arquiteto húngaro fugindo da Europa pós-guerra recomeça nos EUA." },
];

const bannerTypes = [
  {
    id: "simple",
    icon: Film,
    title: "Banner Simples",
    description: "Apenas capa do filme — rápido e direto",
    tag: null,
  },
  {
    id: "trailer",
    icon: Clapperboard,
    title: "Banner com Trailer",
    description: "Capa + preview do trailer — visual cinematográfico",
    tag: "PREMIUM",
  },
];

const visualStyles = [
  { id: "netflix", label: "Netflix Style", color: "from-red-600 to-red-900" },
  { id: "dark-cinema", label: "Dark Cinema", color: "from-gray-900 to-gray-700" },
  { id: "neon", label: "Neon Moderno", color: "from-purple-600 to-blue-600" },
  { id: "minimal", label: "Minimal Clean", color: "from-slate-800 to-slate-600" },
];

const bannerStyles = [
  { id: "minimalista", label: "Minimalista" },
  { id: "cinema", label: "Cinema" },
  { id: "destaque", label: "Destaque" },
];

const trailerPositions = [
  { id: "background", label: "Fundo (animado)" },
  { id: "lateral", label: "Lateral" },
  { id: "mini", label: "Mini Player" },
];

const overlayOptions = [
  { id: "escuro", label: "Escuro" },
  { id: "gradiente", label: "Gradiente" },
  { id: "blur", label: "Blur" },
];

const templates = [
  { id: "lancamento", label: "Lançamento", emoji: "🎬", desc: "Destaque para filmes novos" },
  { id: "em-cartaz", label: "Em Cartaz", emoji: "🍿", desc: "Filmes em exibição" },
  { id: "top-filmes", label: "Top Filmes", emoji: "🏆", desc: "Melhores avaliados" },
  { id: "recomendado", label: "Recomendado", emoji: "⭐", desc: "Curadoria especial" },
];

const GerarBannerFilmePage = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<typeof mockMovies[0] | null>(null);
  const [selectedStyle, setSelectedStyle] = useState("netflix");
  const [selectedBannerStyle, setSelectedBannerStyle] = useState("cinema");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [trailerPosition, setTrailerPosition] = useState("background");
  const [overlay, setOverlay] = useState("gradiente");
  const [showTitle, setShowTitle] = useState(true);
  const [showRating, setShowRating] = useState(true);
  const [showDescription, setShowDescription] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateProgress, setGenerateProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const filteredMovies = useMemo(() => {
    if (!searchQuery) return mockMovies;
    return mockMovies.filter(
      (m) =>
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.genre.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const handleGenerate = (type: string) => {
    setIsGenerating(true);
    setGenerateProgress(0);
    const interval = setInterval(() => {
      setGenerateProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const handleAutoGenerate = () => {
    const trending = mockMovies[0];
    setSelectedType("trailer");
    setSelectedMovie(trending);
    setSelectedStyle("netflix");
    setSelectedTemplate("lancamento");
    setShowTitle(true);
    setShowRating(true);
    setShowDescription(true);
    handleGenerate("auto");
  };

  const currentVisualStyle = visualStyles.find((s) => s.id === selectedStyle);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* SEÇÃO 1 – Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="h-10 w-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Film className="h-5 w-5 text-purple-400" />
                </div>
                <h1 className="text-3xl font-display font-bold text-foreground">
                  Gerar Banner de Filmes
                </h1>
              </div>
              <p className="text-muted-foreground">
                Crie artes incríveis com capas e trailers automaticamente
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleAutoGenerate}
                className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white gap-2"
              >
                <Zap className="h-4 w-4" />
                Gerar Banner Viral
              </Button>
              <Button
                variant="outline"
                className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 gap-2"
              >
                <Sparkles className="h-4 w-4" />
                Gerar Banner Automático
              </Button>
            </div>
          </div>
        </motion.div>

        {/* SEÇÃO 2 – Tipo de Banner */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <h2 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="h-6 w-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold">1</span>
            Tipo de Banner
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {bannerTypes.map((type) => (
              <motion.div
                key={type.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedType(type.id)}
                className={`relative card-gradient border rounded-xl p-6 cursor-pointer transition-all ${
                  selectedType === type.id
                    ? "border-purple-500 glow-entertainment"
                    : "border-border hover:border-purple-500/40"
                }`}
              >
                {type.tag && (
                  <Badge className="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 text-[10px]">
                    <Crown className="h-3 w-3 mr-1" />
                    {type.tag}
                  </Badge>
                )}
                {selectedType === type.id && (
                  <div className="absolute top-3 left-3 h-5 w-5 rounded-full bg-purple-500 flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
                <type.icon className="h-10 w-10 text-purple-400 mb-3" />
                <h3 className="text-lg font-display font-semibold text-foreground mb-1">{type.title}</h3>
                <p className="text-sm text-muted-foreground">{type.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* SEÇÃO 3 – Seleção de Filme */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <h2 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="h-6 w-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold">2</span>
            Selecionar Filme
          </h2>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar filme por nome ou gênero..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-secondary border-border"
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredMovies.map((movie) => (
              <motion.div
                key={movie.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedMovie(movie)}
                className={`card-gradient border rounded-xl p-4 cursor-pointer transition-all text-center ${
                  selectedMovie?.id === movie.id
                    ? "border-purple-500 glow-entertainment"
                    : "border-border hover:border-purple-500/30"
                }`}
              >
                <div className="text-5xl mb-3">{movie.poster}</div>
                <h4 className="text-sm font-semibold text-foreground truncate">{movie.title}</h4>
                <div className="flex items-center justify-center gap-2 mt-1.5">
                  <span className="text-xs text-muted-foreground">{movie.year}</span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
                    <span className="text-xs text-amber-400 font-medium">{movie.rating}</span>
                  </div>
                </div>
                <Badge variant="secondary" className="mt-2 text-[10px]">
                  {movie.genre}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* SEÇÃO 4 – Configuração do Banner */}
        <AnimatePresence>
          {selectedMovie && (
            <motion.section
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <h2 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="h-6 w-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold">3</span>
                Configuração do Banner
              </h2>
              <div className="card-gradient border border-border rounded-xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Opções comuns */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-semibold text-foreground mb-2">Elementos visíveis</h3>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Type className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">Mostrar título</span>
                      </div>
                      <Switch checked={showTitle} onCheckedChange={setShowTitle} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">Mostrar nota</span>
                      </div>
                      <Switch checked={showRating} onCheckedChange={setShowRating} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AlignLeft className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-foreground">Mostrar descrição</span>
                      </div>
                      <Switch checked={showDescription} onCheckedChange={setShowDescription} />
                    </div>

                    {selectedType !== "trailer" && (
                      <div className="pt-2">
                        <h3 className="text-sm font-semibold text-foreground mb-3">Estilo do Banner</h3>
                        <div className="flex gap-2 flex-wrap">
                          {bannerStyles.map((s) => (
                            <button
                              key={s.id}
                              onClick={() => setSelectedBannerStyle(s.id)}
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                selectedBannerStyle === s.id
                                  ? "bg-purple-500 text-white"
                                  : "bg-secondary text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              {s.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Opções de Trailer */}
                  {selectedType === "trailer" && (
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold text-foreground mb-2">Posição do Trailer</h3>
                      <div className="flex gap-2 flex-wrap">
                        {trailerPositions.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => setTrailerPosition(p.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                              trailerPosition === p.id
                                ? "bg-purple-500 text-white"
                                : "bg-secondary text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {p.label}
                          </button>
                        ))}
                      </div>
                      <h3 className="text-sm font-semibold text-foreground mb-2 pt-2">Overlay</h3>
                      <div className="flex gap-2 flex-wrap">
                        {overlayOptions.map((o) => (
                          <button
                            key={o.id}
                            onClick={() => setOverlay(o.id)}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                              overlay === o.id
                                ? "bg-purple-500 text-white"
                                : "bg-secondary text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            {o.label}
                          </button>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-sm text-foreground">Autoplay Preview</span>
                        <Switch checked={isPlaying} onCheckedChange={setIsPlaying} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* SEÇÃO 5 – Estilo Visual */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <h2 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="h-6 w-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold">4</span>
            Estilo Visual
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {visualStyles.map((style) => (
              <motion.div
                key={style.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedStyle(style.id)}
                className={`relative overflow-hidden rounded-xl cursor-pointer transition-all border-2 ${
                  selectedStyle === style.id ? "border-purple-500" : "border-transparent"
                }`}
              >
                <div className={`bg-gradient-to-br ${style.color} h-24 flex items-end p-3`}>
                  <span className="text-white text-sm font-semibold">{style.label}</span>
                </div>
                {selectedStyle === style.id && (
                  <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-purple-500 flex items-center justify-center">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* SEÇÃO 6 – Preview em tempo real */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <h2 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="h-6 w-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold">5</span>
            Preview em Tempo Real
          </h2>
          <div className="card-gradient border border-border rounded-xl p-6">
            <div
              className={`relative bg-gradient-to-br ${currentVisualStyle?.color || "from-gray-900 to-gray-700"} rounded-xl overflow-hidden aspect-video max-w-2xl mx-auto`}
            >
              {/* Overlay */}
              {selectedType === "trailer" && (
                <div
                  className={`absolute inset-0 ${
                    overlay === "escuro"
                      ? "bg-black/60"
                      : overlay === "blur"
                        ? "backdrop-blur-sm bg-black/30"
                        : "bg-gradient-to-t from-black/80 via-black/30 to-transparent"
                  }`}
                />
              )}

              {/* Play button for trailer */}
              {selectedType === "trailer" && (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="h-7 w-7 text-white" />
                    ) : (
                      <Play className="h-7 w-7 text-white ml-1" />
                    )}
                  </button>
                </div>
              )}

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                {selectedMovie ? (
                  <>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-6xl">{selectedMovie.poster}</span>
                      <div>
                        {showTitle && (
                          <h3 className="text-2xl font-display font-bold text-white">
                            {selectedMovie.title}
                          </h3>
                        )}
                        {showRating && (
                          <div className="flex items-center gap-2 mt-1">
                            <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                            <span className="text-amber-400 font-semibold">{selectedMovie.rating}</span>
                            <span className="text-white/60 text-sm">• {selectedMovie.year}</span>
                            <Badge className="bg-white/10 text-white border-0 text-xs">{selectedMovie.genre}</Badge>
                          </div>
                        )}
                      </div>
                    </div>
                    {showDescription && (
                      <p className="text-white/70 text-sm max-w-lg">{selectedMovie.overview}</p>
                    )}
                  </>
                ) : (
                  <div className="text-center py-10">
                    <Film className="h-12 w-12 text-white/30 mx-auto mb-3" />
                    <p className="text-white/50 text-sm">Selecione um filme para ver o preview</p>
                  </div>
                )}
              </div>

              {/* Glow effect */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />
            </div>

            <div className="flex items-center justify-center gap-4 mt-4">
              <button className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                <Monitor className="h-4 w-4" />
                Feed
              </button>
              <button className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors">
                <Smartphone className="h-4 w-4" />
                Story
              </button>
            </div>
          </div>
        </motion.section>

        {/* SEÇÃO 7 – Templates */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h2 className="text-lg font-display font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="h-6 w-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center text-xs font-bold">6</span>
            Templates
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {templates.map((tpl) => (
              <motion.div
                key={tpl.id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setSelectedTemplate(tpl.id)}
                className={`card-gradient border rounded-xl p-5 cursor-pointer transition-all text-center ${
                  selectedTemplate === tpl.id
                    ? "border-purple-500 glow-entertainment"
                    : "border-border hover:border-purple-500/30"
                }`}
              >
                <div className="text-3xl mb-2">{tpl.emoji}</div>
                <h4 className="text-sm font-semibold text-foreground">{tpl.label}</h4>
                <p className="text-xs text-muted-foreground mt-1">{tpl.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* SEÇÃO 8 – Ações finais */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
          <div className="card-gradient border border-border rounded-xl p-6">
            {isGenerating ? (
              <div className="text-center">
                <Sparkles className="h-8 w-8 text-purple-400 mx-auto mb-3 animate-pulse" />
                <p className="text-sm text-foreground font-medium mb-3">Gerando seu banner...</p>
                <Progress value={generateProgress} className="max-w-md mx-auto h-2" />
                <p className="text-xs text-muted-foreground mt-2">{generateProgress}%</p>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Button
                  size="lg"
                  onClick={() => handleGenerate("banner")}
                  className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400 text-white gap-2 w-full sm:w-auto"
                >
                  <Wand2 className="h-4 w-4" />
                  Gerar Banner
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleGenerate("story")}
                  className="border-purple-500/30 text-purple-400 hover:bg-purple-500/10 gap-2 w-full sm:w-auto"
                >
                  <Smartphone className="h-4 w-4" />
                  Gerar Story
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleGenerate("carrossel")}
                  className="border-border gap-2 w-full sm:w-auto"
                >
                  <Layers className="h-4 w-4" />
                  Gerar Carrossel
                </Button>
              </div>
            )}
          </div>
        </motion.section>
      </div>
    </DashboardLayout>
  );
};

export default GerarBannerFilmePage;
