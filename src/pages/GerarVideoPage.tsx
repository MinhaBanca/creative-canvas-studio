import { useState, useMemo } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Video, CalendarDays, Trophy, UserCircle, Film, Tv, Swords,
  Smartphone, Square, RectangleVertical, Clock, Layers, Zap,
  Music, Upload, VolumeX, Play, Pause, Sparkles, Download, Save,
  Eye, Check
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// === TYPES ===
type VideoType = "agenda" | "importantes" | "jogador" | "filmes" | "series" | "ufc";
type VideoFormat = "reels" | "feed" | "story";
type AnimationStyle = "fade" | "zoom" | "slide";
type TransitionSpeed = "lento" | "medio" | "rapido";
type AudioOption = "none" | "default" | "upload";

// === MOCK DATA ===
const videoTypes = [
  { id: "agenda" as VideoType, icon: CalendarDays, title: "Agenda de Jogos", desc: "Jogos do dia com horários e canais" },
  { id: "importantes" as VideoType, icon: Trophy, title: "Jogos Importantes", desc: "Destaques e confrontos decisivos" },
  { id: "jogador" as VideoType, icon: UserCircle, title: "Jogador em Destaque", desc: "Stats e highlights de um jogador" },
  { id: "filmes" as VideoType, icon: Film, title: "Top Filmes", desc: "Ranking de filmes em alta" },
  { id: "series" as VideoType, icon: Tv, title: "Séries em Alta", desc: "Séries mais assistidas da semana" },
  { id: "ufc" as VideoType, icon: Swords, title: "UFC / Lutas", desc: "Card de lutas e confrontos" },
];

const formats = [
  { id: "reels" as VideoFormat, icon: Smartphone, label: "Reels / TikTok", size: "1080x1920" },
  { id: "feed" as VideoFormat, icon: Square, label: "Feed", size: "1080x1080" },
  { id: "story" as VideoFormat, icon: RectangleVertical, label: "Story", size: "1080x1920" },
];

const animationStyles: { id: AnimationStyle; label: string }[] = [
  { id: "fade", label: "Fade" },
  { id: "zoom", label: "Zoom" },
  { id: "slide", label: "Slide" },
];

const transitionSpeeds: { id: TransitionSpeed; label: string }[] = [
  { id: "lento", label: "Lento" },
  { id: "medio", label: "Médio" },
  { id: "rapido", label: "Rápido" },
];

const mockGames = [
  { id: 1, home: "Santos", away: "Corinthians", time: "16:00", channel: "Premiere" },
  { id: 2, home: "Flamengo", away: "Palmeiras", time: "18:30", channel: "Globo" },
  { id: 3, home: "Inter", away: "Grêmio", time: "19:00", channel: "SporTV" },
  { id: 4, home: "São Paulo", away: "Cruzeiro", time: "20:00", channel: "Premiere" },
  { id: 5, home: "Atlético-MG", away: "Botafogo", time: "21:00", channel: "SporTV" },
  { id: 6, home: "Bahia", away: "Fortaleza", time: "21:30", channel: "Premiere" },
];

const mockPlayers = [
  { id: 1, name: "Neymar Jr", team: "Santos", position: "Atacante" },
  { id: 2, name: "Gabigol", team: "Flamengo", position: "Atacante" },
  { id: 3, name: "Endrick", team: "Palmeiras", position: "Atacante" },
  { id: 4, name: "Yuri Alberto", team: "Corinthians", position: "Atacante" },
  { id: 5, name: "Luciano", team: "São Paulo", position: "Atacante" },
  { id: 6, name: "Hulk", team: "Atlético-MG", position: "Atacante" },
];

const mockMovies = [
  { id: 1, title: "Oppenheimer", year: "2023", rating: "8.9" },
  { id: 2, title: "Barbie", year: "2023", rating: "7.5" },
  { id: 3, title: "Dune: Part Two", year: "2024", rating: "8.8" },
  { id: 4, title: "Deadpool & Wolverine", year: "2024", rating: "8.2" },
];

const mockSeries = [
  { id: 1, title: "The Last of Us", season: "S2", rating: "9.0" },
  { id: 2, title: "House of the Dragon", season: "S2", rating: "8.5" },
  { id: 3, title: "Arcane", season: "S2", rating: "9.2" },
  { id: 4, title: "Wednesday", season: "S2", rating: "8.1" },
];

const videoTemplates = [
  { id: 1, name: "Esportivo", desc: "Dinâmico com cores vibrantes", color: "from-primary/20 to-primary/5" },
  { id: 2, name: "Moderno", desc: "Clean com transições suaves", color: "from-accent/20 to-accent/5" },
  { id: 3, name: "Minimalista", desc: "Simples e elegante", color: "from-muted/40 to-muted/10" },
  { id: 4, name: "Premium", desc: "Efeitos avançados e texturas", color: "from-purple-500/20 to-purple-500/5", badge: "PRO" },
];

const GerarVideoPage = () => {
  // State
  const [selectedType, setSelectedType] = useState<VideoType | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<VideoFormat>("reels");
  const [duration, setDuration] = useState([15]);
  const [slides, setSlides] = useState("5");
  const [speed, setSpeed] = useState<TransitionSpeed>("medio");
  const [animation, setAnimation] = useState<AnimationStyle>("fade");
  const [selectedGames, setSelectedGames] = useState<number[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<number[]>([]);
  const [selectedMovies, setSelectedMovies] = useState<number[]>([]);
  const [selectedSeries, setSelectedSeries] = useState<number[]>([]);
  const [audioOption, setAudioOption] = useState<AudioOption>("default");
  const [selectedTemplate, setSelectedTemplate] = useState<number>(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generateProgress, setGenerateProgress] = useState(0);
  const [searchPlayer, setSearchPlayer] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const isSportsType = selectedType === "agenda" || selectedType === "importantes" || selectedType === "jogador" || selectedType === "ufc";
  const isEntertainment = selectedType === "filmes" || selectedType === "series";

  const filteredPlayers = useMemo(() =>
    mockPlayers.filter(p => p.name.toLowerCase().includes(searchPlayer.toLowerCase())),
    [searchPlayer]
  );

  const toggleGame = (id: number) => setSelectedGames(prev => prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]);
  const togglePlayer = (id: number) => setSelectedPlayers(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  const toggleMovie = (id: number) => setSelectedMovies(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]);
  const toggleSerie = (id: number) => setSelectedSeries(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setGenerateProgress(0);
    const interval = setInterval(() => {
      setGenerateProgress(prev => {
        if (prev >= 100) { clearInterval(interval); setIsGenerating(false); return 100; }
        return prev + 2;
      });
    }, 100);
  };

  const handleAutoGenerate = () => {
    setSelectedType("agenda");
    setSelectedFormat("reels");
    setSelectedGames(mockGames.slice(0, 4).map(g => g.id));
    setSelectedTemplate(1);
    setAudioOption("default");
    setTimeout(handleGenerate, 500);
  };

  const previewAspect = selectedFormat === "feed" ? "aspect-square" : "aspect-[9/16]";

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto space-y-8">

        {/* SEÇÃO 1 – Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Video className="h-8 w-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Gerador de <span className="text-gradient-primary">Vídeos</span>
            </h1>
          </div>
          <p className="text-muted-foreground text-lg">Crie vídeos automáticos para redes sociais em segundos</p>
          <Button onClick={handleAutoGenerate} size="lg" className="bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold glow-primary">
            <Sparkles className="h-5 w-5 mr-2" /> Gerar Reel do Dia
          </Button>
        </motion.div>

        {/* SEÇÃO 2 – Tipo de vídeo */}
        <section className="space-y-4">
          <h2 className="text-xl font-display font-semibold text-foreground">Tipo de Vídeo</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {videoTypes.map(type => {
              const Icon = type.icon;
              const active = selectedType === type.id;
              return (
                <motion.div key={type.id} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Card
                    onClick={() => setSelectedType(type.id)}
                    className={`cursor-pointer border-2 transition-all ${active ? "border-primary glow-primary bg-primary/10" : "border-border hover:border-muted-foreground/30"}`}
                  >
                    <CardContent className="p-4 text-center space-y-2">
                      <Icon className={`h-8 w-8 mx-auto ${active ? "text-primary" : "text-muted-foreground"}`} />
                      <p className={`text-sm font-semibold ${active ? "text-foreground" : "text-muted-foreground"}`}>{type.title}</p>
                      <p className="text-xs text-muted-foreground leading-tight">{type.desc}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN – Settings */}
          <div className="lg:col-span-2 space-y-8">

            {/* SEÇÃO 3 – Formato */}
            <section className="space-y-4">
              <h2 className="text-xl font-display font-semibold text-foreground">Formato do Vídeo</h2>
              <div className="grid grid-cols-3 gap-3">
                {formats.map(f => {
                  const Icon = f.icon;
                  const active = selectedFormat === f.id;
                  return (
                    <Card
                      key={f.id}
                      onClick={() => setSelectedFormat(f.id)}
                      className={`cursor-pointer border-2 transition-all ${active ? "border-primary bg-primary/10" : "border-border hover:border-muted-foreground/30"}`}
                    >
                      <CardContent className="p-4 flex items-center gap-3">
                        <Icon className={`h-6 w-6 ${active ? "text-primary" : "text-muted-foreground"}`} />
                        <div>
                          <p className={`text-sm font-semibold ${active ? "text-foreground" : "text-muted-foreground"}`}>{f.label}</p>
                          <p className="text-xs text-muted-foreground">{f.size}</p>
                        </div>
                        {active && <Check className="h-4 w-4 text-primary ml-auto" />}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>

            {/* SEÇÃO 4 – Configurações */}
            <section className="space-y-4">
              <h2 className="text-xl font-display font-semibold text-foreground">Configurações</h2>
              <Card className="border-border">
                <CardContent className="p-6 space-y-6">
                  {/* Duration */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium text-foreground flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" /> Duração
                      </label>
                      <span className="text-sm font-bold text-primary">{duration[0]}s</span>
                    </div>
                    <Slider value={duration} onValueChange={setDuration} min={10} max={60} step={5} />
                  </div>

                  {/* Slides */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Layers className="h-4 w-4 text-muted-foreground" /> Quantidade de Slides
                    </label>
                    <Select value={slides} onValueChange={setSlides}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {[3, 4, 5, 6, 8, 10].map(n => (
                          <SelectItem key={n} value={String(n)}>{n} slides</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Transition Speed */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Zap className="h-4 w-4 text-muted-foreground" /> Velocidade da Transição
                    </label>
                    <div className="flex gap-2">
                      {transitionSpeeds.map(s => (
                        <Button
                          key={s.id}
                          variant={speed === s.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSpeed(s.id)}
                        >
                          {s.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Animation Style */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Estilo de Animação</label>
                    <div className="flex gap-2">
                      {animationStyles.map(a => (
                        <Button
                          key={a.id}
                          variant={animation === a.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setAnimation(a.id)}
                        >
                          {a.label}
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* SEÇÃO 5 – Conteúdo */}
            <AnimatePresence mode="wait">
              {selectedType && (
                <motion.section key={selectedType} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-4">
                  <h2 className="text-xl font-display font-semibold text-foreground">Seleção de Conteúdo</h2>

                  {isSportsType && (
                    <div className="space-y-4">
                      {/* Games */}
                      <div className="space-y-3">
                        <h3 className="text-sm font-medium text-muted-foreground">Jogos do Dia</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {mockGames.map(game => {
                            const sel = selectedGames.includes(game.id);
                            return (
                              <Card
                                key={game.id}
                                onClick={() => toggleGame(game.id)}
                                className={`cursor-pointer border transition-all ${sel ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/30"}`}
                              >
                                <CardContent className="p-3 flex items-center gap-3">
                                  <Checkbox checked={sel} className="pointer-events-none" />
                                  <div className="flex-1 flex items-center justify-between">
                                    <span className="text-sm font-medium text-foreground">{game.home} vs {game.away}</span>
                                    <div className="flex items-center gap-2">
                                      <Badge variant="outline" className="text-xs">{game.time}</Badge>
                                      <Badge variant="secondary" className="text-xs">{game.channel}</Badge>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            );
                          })}
                        </div>
                      </div>

                      {/* Players */}
                      {(selectedType === "jogador" || selectedType === "agenda") && (
                        <div className="space-y-3">
                          <h3 className="text-sm font-medium text-muted-foreground">Jogadores</h3>
                          <Input
                            placeholder="Buscar jogador..."
                            value={searchPlayer}
                            onChange={e => setSearchPlayer(e.target.value)}
                            className="max-w-xs"
                          />
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {filteredPlayers.map(player => {
                              const sel = selectedPlayers.includes(player.id);
                              return (
                                <Card
                                  key={player.id}
                                  onClick={() => togglePlayer(player.id)}
                                  className={`cursor-pointer border transition-all ${sel ? "border-primary bg-primary/5" : "border-border hover:border-muted-foreground/30"}`}
                                >
                                  <CardContent className="p-3 flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-foreground font-bold text-sm">
                                      {player.name.charAt(0)}
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-foreground">{player.name}</p>
                                      <p className="text-xs text-muted-foreground">{player.team} · {player.position}</p>
                                    </div>
                                  </CardContent>
                                </Card>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {selectedType === "filmes" && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {mockMovies.map(movie => {
                        const sel = selectedMovies.includes(movie.id);
                        return (
                          <Card
                            key={movie.id}
                            onClick={() => toggleMovie(movie.id)}
                            className={`cursor-pointer border transition-all ${sel ? "border-accent bg-accent/5" : "border-border hover:border-muted-foreground/30"}`}
                          >
                            <CardContent className="p-4 text-center space-y-2">
                              <div className="h-20 rounded-lg bg-secondary flex items-center justify-center">
                                <Film className={`h-8 w-8 ${sel ? "text-accent" : "text-muted-foreground"}`} />
                              </div>
                              <p className="text-sm font-semibold text-foreground">{movie.title}</p>
                              <div className="flex items-center justify-center gap-2">
                                <Badge variant="outline" className="text-xs">{movie.year}</Badge>
                                <Badge variant="secondary" className="text-xs">⭐ {movie.rating}</Badge>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  )}

                  {selectedType === "series" && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {mockSeries.map(serie => {
                        const sel = selectedSeries.includes(serie.id);
                        return (
                          <Card
                            key={serie.id}
                            onClick={() => toggleSerie(serie.id)}
                            className={`cursor-pointer border transition-all ${sel ? "border-accent bg-accent/5" : "border-border hover:border-muted-foreground/30"}`}
                          >
                            <CardContent className="p-4 text-center space-y-2">
                              <div className="h-20 rounded-lg bg-secondary flex items-center justify-center">
                                <Tv className={`h-8 w-8 ${sel ? "text-accent" : "text-muted-foreground"}`} />
                              </div>
                              <p className="text-sm font-semibold text-foreground">{serie.title}</p>
                              <div className="flex items-center justify-center gap-2">
                                <Badge variant="outline" className="text-xs">{serie.season}</Badge>
                                <Badge variant="secondary" className="text-xs">⭐ {serie.rating}</Badge>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  )}
                </motion.section>
              )}
            </AnimatePresence>

            {/* SEÇÃO 6 – Áudio */}
            <section className="space-y-4">
              <h2 className="text-xl font-display font-semibold text-foreground">Música / Áudio</h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "none" as AudioOption, icon: VolumeX, label: "Sem Música" },
                  { id: "default" as AudioOption, icon: Music, label: "Música Padrão" },
                  { id: "upload" as AudioOption, icon: Upload, label: "Upload Áudio" },
                ].map(opt => {
                  const Icon = opt.icon;
                  const active = audioOption === opt.id;
                  return (
                    <Card
                      key={opt.id}
                      onClick={() => setAudioOption(opt.id)}
                      className={`cursor-pointer border-2 transition-all ${active ? "border-primary bg-primary/10" : "border-border hover:border-muted-foreground/30"}`}
                    >
                      <CardContent className="p-4 flex items-center gap-3">
                        <Icon className={`h-5 w-5 ${active ? "text-primary" : "text-muted-foreground"}`} />
                        <span className={`text-sm font-medium ${active ? "text-foreground" : "text-muted-foreground"}`}>{opt.label}</span>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              {audioOption === "default" && (
                <Card className="border-border">
                  <CardContent className="p-4 flex items-center gap-4">
                    <Button variant="outline" size="icon" onClick={() => setIsPlaying(!isPlaying)}>
                      {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                    </Button>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">Energetic Sports Beat</p>
                      <div className="h-1 bg-secondary rounded-full mt-2">
                        <div className="h-full w-1/3 bg-primary rounded-full" />
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">0:15</span>
                  </CardContent>
                </Card>
              )}
              {audioOption === "upload" && (
                <Card className="border-dashed border-2 border-muted-foreground/30">
                  <CardContent className="p-8 text-center">
                    <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Arraste um arquivo de áudio ou clique para enviar</p>
                    <p className="text-xs text-muted-foreground mt-1">MP3, WAV · Máx 10MB</p>
                  </CardContent>
                </Card>
              )}
            </section>

            {/* SEÇÃO 8 – Templates */}
            <section className="space-y-4">
              <h2 className="text-xl font-display font-semibold text-foreground">Templates de Vídeo</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {videoTemplates.map(tmpl => {
                  const active = selectedTemplate === tmpl.id;
                  return (
                    <Card
                      key={tmpl.id}
                      onClick={() => setSelectedTemplate(tmpl.id)}
                      className={`cursor-pointer border-2 transition-all ${active ? "border-primary glow-primary" : "border-border hover:border-muted-foreground/30"}`}
                    >
                      <CardContent className="p-0">
                        <div className={`h-24 rounded-t-lg bg-gradient-to-br ${tmpl.color} flex items-center justify-center relative`}>
                          <Video className={`h-8 w-8 ${active ? "text-primary" : "text-muted-foreground"}`} />
                          {tmpl.badge && (
                            <Badge className="absolute top-2 right-2 bg-accent text-accent-foreground text-[10px]">{tmpl.badge}</Badge>
                          )}
                        </div>
                        <div className="p-3">
                          <p className={`text-sm font-semibold ${active ? "text-foreground" : "text-muted-foreground"}`}>{tmpl.name}</p>
                          <p className="text-xs text-muted-foreground">{tmpl.desc}</p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN – Preview + Actions */}
          <div className="space-y-6">
            {/* SEÇÃO 7 – Preview */}
            <div className="sticky top-4 space-y-6">
              <section className="space-y-4">
                <h2 className="text-xl font-display font-semibold text-foreground">Preview</h2>
                <Card className="border-border overflow-hidden">
                  <CardContent className="p-4">
                    <div className={`${previewAspect} max-h-[500px] bg-gradient-to-b from-secondary to-card rounded-lg flex flex-col items-center justify-center p-4 relative overflow-hidden`}>
                      {/* Simulated preview */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
                      <div className="relative z-10 text-center space-y-3 w-full">
                        <Badge variant="secondary" className="text-xs">
                          {formats.find(f => f.id === selectedFormat)?.size}
                        </Badge>

                        {selectedType ? (
                          <>
                            <p className="text-lg font-display font-bold text-foreground">
                              {videoTypes.find(v => v.id === selectedType)?.title}
                            </p>

                            {selectedGames.length > 0 && (
                              <div className="space-y-1 w-full">
                                {mockGames.filter(g => selectedGames.includes(g.id)).slice(0, 4).map(g => (
                                  <div key={g.id} className="flex items-center justify-between bg-card/60 rounded px-2 py-1 text-xs">
                                    <span className="text-foreground font-medium">{g.home} vs {g.away}</span>
                                    <span className="text-muted-foreground">{g.time}</span>
                                  </div>
                                ))}
                              </div>
                            )}

                            {selectedPlayers.length > 0 && (
                              <div className="flex gap-2 justify-center">
                                {mockPlayers.filter(p => selectedPlayers.includes(p.id)).map(p => (
                                  <div key={p.id} className="h-10 w-10 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-xs font-bold text-primary">
                                    {p.name.charAt(0)}
                                  </div>
                                ))}
                              </div>
                            )}
                          </>
                        ) : (
                          <div className="space-y-2">
                            <Video className="h-12 w-12 text-muted-foreground mx-auto" />
                            <p className="text-sm text-muted-foreground">Selecione um tipo de vídeo</p>
                          </div>
                        )}

                        <div className="flex items-center gap-1 justify-center pt-2">
                          <span className="text-xs text-muted-foreground">{duration[0]}s</span>
                          <span className="text-muted-foreground">·</span>
                          <span className="text-xs text-muted-foreground">{slides} slides</span>
                          <span className="text-muted-foreground">·</span>
                          <span className="text-xs text-muted-foreground capitalize">{animation}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </section>

              {/* SEÇÃO 9 – Ações */}
              <section className="space-y-3">
                {isGenerating && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Gerando vídeo...</span>
                      <span className="text-primary font-bold">{generateProgress}%</span>
                    </div>
                    <Progress value={generateProgress} />
                  </div>
                )}

                <Button onClick={handleGenerate} disabled={isGenerating} className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold h-12 text-base glow-primary">
                  <Download className="h-5 w-5 mr-2" /> Gerar Vídeo
                </Button>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="w-full" disabled={isGenerating}>
                    <Eye className="h-4 w-4 mr-2" /> Gerar Preview
                  </Button>
                  <Button variant="outline" className="w-full" disabled={isGenerating}>
                    <Save className="h-4 w-4 mr-2" /> Salvar Template
                  </Button>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GerarVideoPage;
