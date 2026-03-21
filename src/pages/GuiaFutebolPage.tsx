import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Check,
  Clock,
  Copy,
  Download,
  FileImage,
  Filter,
  Layers,
  Search,
  Smartphone,
  Sparkles,
  Star,
  Trophy,
  Tv,
  Users,
  Wand2,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { toast } from "@/hooks/use-toast";

// ── Mock Data ──────────────────────────────────────────────

const guideTypes = [
  { id: "agenda-dia", name: "Agenda do Dia", description: "Todos os jogos do dia organizados por horário", icon: Calendar },
  { id: "jogos-importantes", name: "Jogos Importantes", description: "Destaques e jogos de maior audiência", icon: Star },
  { id: "guia-liga", name: "Guia por Liga", description: "Jogos organizados por campeonato", icon: Trophy },
  { id: "guia-stats", name: "Guia com Estatísticas", description: "Inclui dados e estatísticas dos times", icon: Layers },
  { id: "jogadores-destaque", name: "Jogadores em Destaque", description: "Foco em jogadores com imagens de destaque", icon: Users },
];

const leagues = [
  { id: "todas", name: "Todas as Ligas" },
  { id: "brasileirao-a", name: "Brasileirão Série A" },
  { id: "premier", name: "Premier League" },
  { id: "laliga", name: "La Liga" },
  { id: "serie-a", name: "Serie A (Itália)" },
  { id: "bundesliga", name: "Bundesliga" },
  { id: "ligue1", name: "Ligue 1" },
  { id: "libertadores", name: "Libertadores" },
];

const teamsList = [
  "Flamengo", "Palmeiras", "Santos", "Corinthians", "São Paulo",
  "Grêmio", "Inter", "Vasco", "Fluminense", "Botafogo",
  "Barcelona", "Real Madrid", "Liverpool", "Man City", "Bayern",
];

type Game = {
  id: string;
  home: string;
  away: string;
  homeLogo: string;
  awayLogo: string;
  time: string;
  channel: string;
  league: string;
  transmission: "aberta" | "fechada";
};

const mockGames: Game[] = [
  { id: "g1", home: "Santos", away: "Corinthians", homeLogo: "⚪", awayLogo: "⚫", time: "16:00", channel: "Globo", league: "brasileirao-a", transmission: "aberta" },
  { id: "g2", home: "Palmeiras", away: "São Paulo", homeLogo: "🟢", awayLogo: "🔴", time: "18:30", channel: "Globo", league: "brasileirao-a", transmission: "aberta" },
  { id: "g3", home: "Flamengo", away: "Vasco", homeLogo: "🔴", awayLogo: "⬛", time: "21:00", channel: "Premiere", league: "brasileirao-a", transmission: "fechada" },
  { id: "g4", home: "Inter", away: "Bahia", homeLogo: "🔴", awayLogo: "🔵", time: "16:00", channel: "Premiere", league: "brasileirao-a", transmission: "fechada" },
  { id: "g5", home: "Grêmio", away: "Cruzeiro", homeLogo: "🔵", awayLogo: "🔵", time: "19:00", channel: "SporTV", league: "brasileirao-a", transmission: "fechada" },
  { id: "g6", home: "Barcelona", away: "Real Madrid", homeLogo: "🔵", awayLogo: "⚪", time: "17:00", channel: "ESPN", league: "laliga", transmission: "fechada" },
  { id: "g7", home: "Atlético Madrid", away: "Sevilla", homeLogo: "🔴", awayLogo: "⚪", time: "14:00", channel: "ESPN 2", league: "laliga", transmission: "fechada" },
  { id: "g8", home: "Liverpool", away: "Man City", homeLogo: "🔴", awayLogo: "🔵", time: "13:30", channel: "ESPN", league: "premier", transmission: "fechada" },
  { id: "g9", home: "Arsenal", away: "Chelsea", homeLogo: "🔴", awayLogo: "🔵", time: "16:00", channel: "ESPN 2", league: "premier", transmission: "fechada" },
  { id: "g10", home: "Bayern", away: "Dortmund", homeLogo: "🔴", awayLogo: "🟡", time: "13:30", channel: "ESPN 4", league: "bundesliga", transmission: "fechada" },
  { id: "g11", home: "Lazio", away: "Milan", homeLogo: "🔵", awayLogo: "🔴", time: "16:45", channel: "ESPN", league: "serie-a", transmission: "fechada" },
  { id: "g12", home: "Roma", away: "Napoli", homeLogo: "🟡", awayLogo: "🔵", time: "14:00", channel: "ESPN 3", league: "serie-a", transmission: "fechada" },
];

type Player = { id: string; name: string; team: string; position: string };

const mockPlayers: Player[] = [
  { id: "p1", name: "Marcos Leonardo", team: "Santos", position: "Atacante" },
  { id: "p2", name: "João Paulo", team: "Santos", position: "Goleiro" },
  { id: "p3", name: "Yuri Alberto", team: "Corinthians", position: "Atacante" },
  { id: "p4", name: "Endrick", team: "Palmeiras", position: "Atacante" },
  { id: "p5", name: "Raphael Veiga", team: "Palmeiras", position: "Meia" },
  { id: "p6", name: "Luciano", team: "São Paulo", position: "Atacante" },
  { id: "p7", name: "Pedro", team: "Flamengo", position: "Atacante" },
  { id: "p8", name: "Gerson", team: "Flamengo", position: "Meia" },
  { id: "p9", name: "Vegetti", team: "Vasco", position: "Atacante" },
  { id: "p10", name: "Suárez", team: "Grêmio", position: "Atacante" },
  { id: "p11", name: "Lamine Yamal", team: "Barcelona", position: "Atacante" },
  { id: "p12", name: "Vinícius Jr.", team: "Real Madrid", position: "Atacante" },
  { id: "p13", name: "Salah", team: "Liverpool", position: "Atacante" },
  { id: "p14", name: "Haaland", team: "Man City", position: "Atacante" },
  { id: "p15", name: "Harry Kane", team: "Bayern", position: "Atacante" },
];

// ── Page ──────────────────────────────────────────────────

const GuiaFutebolPage = () => {
  // Guide type
  const [selectedGuide, setSelectedGuide] = useState<string | null>(null);

  // Filters
  const [selectedLeague, setSelectedLeague] = useState("todas");
  const [favoriteTeams, setFavoriteTeams] = useState<string[]>([]);
  const [teamSearch, setTeamSearch] = useState("");
  const [timeRange, setTimeRange] = useState([0, 24]);
  const [transmissionType, setTransmissionType] = useState<"todas" | "aberta" | "fechada">("todas");

  // Games
  const [selectedGames, setSelectedGames] = useState<string[]>([]);

  // Players
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [playerSearch, setPlayerSearch] = useState("");

  // Generation
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const needsPlayers = selectedGuide === "jogadores-destaque";

  // Filter games
  const filteredGames = useMemo(() => {
    return mockGames.filter((game) => {
      if (selectedLeague !== "todas" && game.league !== selectedLeague) return false;
      if (transmissionType !== "todas" && game.transmission !== transmissionType) return false;
      const hour = parseInt(game.time.split(":")[0]);
      if (hour < timeRange[0] || hour > timeRange[1]) return false;
      if (favoriteTeams.length > 0) {
        if (!favoriteTeams.includes(game.home) && !favoriteTeams.includes(game.away)) return false;
      }
      return true;
    });
  }, [selectedLeague, transmissionType, timeRange, favoriteTeams]);

  const availableTeams = useMemo(() => {
    const teams = new Set<string>();
    selectedGames.forEach((gid) => {
      const game = mockGames.find((g) => g.id === gid);
      if (game) { teams.add(game.home); teams.add(game.away); }
    });
    return Array.from(teams);
  }, [selectedGames]);

  const filteredPlayers = useMemo(() => {
    let players = mockPlayers.filter((p) => availableTeams.includes(p.team));
    if (playerSearch) {
      players = players.filter((p) => p.name.toLowerCase().includes(playerSearch.toLowerCase()));
    }
    return players;
  }, [availableTeams, playerSearch]);

  const toggleGame = (id: string) => {
    setSelectedGames((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const togglePlayer = (id: string) => {
    setSelectedPlayers((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : prev.length < 2 ? [...prev, id] : prev
    );
  };

  const toggleFavoriteTeam = (team: string) => {
    setFavoriteTeams((prev) =>
      prev.includes(team) ? prev.filter((t) => t !== team) : [...prev, team]
    );
  };

  const filteredTeamsList = teamsList.filter((t) =>
    t.toLowerCase().includes(teamSearch.toLowerCase())
  );

  const handleGenerate = (type: string) => {
    if (selectedGames.length === 0) {
      toast({ title: "Selecione pelo menos 1 jogo", variant: "destructive" });
      return;
    }
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGenerated(true);
      toast({ title: `${type} gerado!`, description: "Sua arte está pronta." });
    }, 2000);
  };

  const chosenGames = mockGames.filter((g) => selectedGames.includes(g.id));
  const chosenPlayers = mockPlayers.filter((p) => selectedPlayers.includes(p.id));

  const copyGameList = () => {
    const text = chosenGames
      .map((g) => `${g.home} x ${g.away} — ${g.time} (${g.channel})`)
      .join("\n");
    navigator.clipboard.writeText(text);
    toast({ title: "Lista copiada!" });
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Back */}
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Link>

        {/* ── Seção 1: Cabeçalho ── */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground">
                <Zap className="inline h-7 w-7 text-primary mr-2 -mt-1" />
                Guia Futebol
              </h1>
              <p className="text-sm text-muted-foreground mt-1">
                Gere automaticamente conteúdo esportivo do dia
              </p>
            </div>
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-[hsl(var(--glow-sport))] text-primary-foreground font-bold shadow-lg hover:shadow-xl transition-shadow"
              onClick={() => handleGenerate("Guia do Dia")}
              disabled={isGenerating}
            >
              <Zap className="h-5 w-5 mr-2" />
              {isGenerating ? "Gerando..." : "Gerar Guia do Dia"}
            </Button>
          </div>
        </section>

        {/* ── Seção 2: Tipos de Guia ── */}
        <section>
          <h2 className="text-lg font-display font-bold text-foreground mb-4">Tipos de Guia</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
            {guideTypes.map((guide) => {
              const active = selectedGuide === guide.id;
              const Icon = guide.icon;
              return (
                <motion.button
                  key={guide.id}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedGuide(active ? null : guide.id)}
                  className={`card-gradient border rounded-xl p-4 text-left transition-all ${
                    active ? "border-primary glow-sport" : "border-border hover:border-primary/40"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                    active ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                  }`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-display font-bold text-foreground">{guide.name}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{guide.description}</p>
                </motion.button>
              );
            })}
          </div>
        </section>

        {/* ── Seção 3: Filtros ── */}
        <section className="card-gradient border border-border rounded-xl p-5 space-y-5">
          <div className="flex items-center gap-2 mb-1">
            <Filter className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-display font-bold text-foreground">Filtros</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Liga */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                Liga
              </label>
              <select
                value={selectedLeague}
                onChange={(e) => setSelectedLeague(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {leagues.map((l) => (
                  <option key={l.id} value={l.id}>{l.name}</option>
                ))}
              </select>
            </div>

            {/* Transmissão */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                Tipo de Transmissão
              </label>
              <div className="grid grid-cols-3 gap-2">
                {([
                  { key: "todas" as const, label: "Todas" },
                  { key: "aberta" as const, label: "TV Aberta" },
                  { key: "fechada" as const, label: "TV Fechada" },
                ]).map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setTransmissionType(key)}
                    className={`py-2 rounded-lg text-xs font-bold transition-all ${
                      transmissionType === key
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Horário */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                <Clock className="inline h-3.5 w-3.5 mr-1 -mt-0.5" />
                Intervalo de Horário: {timeRange[0]}h — {timeRange[1]}h
              </label>
              <Slider
                value={timeRange}
                onValueChange={setTimeRange}
                min={0}
                max={24}
                step={1}
                className="mt-3"
              />
            </div>

            {/* Times favoritos */}
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block">
                Times Favoritos
              </label>
              <div className="relative mb-2">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar time..."
                  value={teamSearch}
                  onChange={(e) => setTeamSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-lg bg-secondary border border-border text-foreground text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
                {filteredTeamsList.map((team) => {
                  const active = favoriteTeams.includes(team);
                  return (
                    <button
                      key={team}
                      onClick={() => toggleFavoriteTeam(team)}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all ${
                        active
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                      }`}
                    >
                      {team}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── Seção 4: Lista de Jogos ── */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-bold text-foreground">
              <Calendar className="inline h-5 w-5 text-primary mr-2 -mt-0.5" />
              Jogos do Dia
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                ({selectedGames.length} selecionados)
              </span>
            </h2>
            {selectedGames.length > 0 && (
              <button
                onClick={copyGameList}
                className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors"
              >
                <Copy className="h-3.5 w-3.5" />
                Copiar lista
              </button>
            )}
          </div>

          {filteredGames.length === 0 ? (
            <div className="text-center py-12 card-gradient border border-border rounded-xl">
              <Calendar className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">Nenhum jogo encontrado com os filtros atuais.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredGames.map((game) => {
                const active = selectedGames.includes(game.id);
                return (
                  <motion.button
                    key={game.id}
                    whileTap={{ scale: 0.99 }}
                    onClick={() => toggleGame(game.id)}
                    className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl border text-sm transition-all ${
                      active
                        ? "border-primary bg-primary/10 glow-sport"
                        : "border-border card-gradient hover:border-primary/40"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 ${
                        active ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"
                      }`}>
                        {active && <Check className="h-3 w-3" />}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{game.homeLogo}</span>
                        <span className="font-semibold text-foreground">{game.home}</span>
                        <span className="text-xs text-muted-foreground font-bold">VS</span>
                        <span className="font-semibold text-foreground">{game.away}</span>
                        <span className="text-lg">{game.awayLogo}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-mono text-xs text-foreground">{game.time}</span>
                      <span className="flex items-center gap-1 text-xs bg-secondary text-muted-foreground px-2 py-0.5 rounded">
                        <Tv className="h-3 w-3" />
                        {game.channel}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          )}
        </section>

        {/* ── Seção 5: Jogadores ── */}
        {needsPlayers && selectedGames.length > 0 && (
          <section>
            <h2 className="text-lg font-display font-bold text-foreground mb-1">
              <Users className="inline h-5 w-5 text-primary mr-2 -mt-0.5" />
              Seleção de Jogadores
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Selecione até <span className="text-primary font-semibold">2</span> jogadores ({selectedPlayers.length}/2)
            </p>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar jogador..."
                value={playerSearch}
                onChange={(e) => setPlayerSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>

            {filteredPlayers.length === 0 ? (
              <div className="text-center py-8 card-gradient border border-border rounded-xl">
                <Users className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Nenhum jogador encontrado.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {filteredPlayers.map((player) => {
                  const active = selectedPlayers.includes(player.id);
                  const disabled = !active && selectedPlayers.length >= 2;
                  return (
                    <motion.button
                      key={player.id}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => togglePlayer(player.id)}
                      disabled={disabled}
                      className={`card-gradient border rounded-xl p-4 text-center transition-all ${
                        active
                          ? "border-primary glow-sport"
                          : disabled
                            ? "border-border opacity-40 cursor-not-allowed"
                            : "border-border hover:border-primary/40"
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-lg font-bold ${
                        active ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                      }`}>
                        {player.name.charAt(0)}
                      </div>
                      <p className="text-sm font-semibold text-foreground">{player.name}</p>
                      <p className="text-xs text-muted-foreground">{player.team}</p>
                      <p className="text-[10px] text-primary mt-0.5">{player.position}</p>
                    </motion.button>
                  );
                })}
              </div>
            )}
          </section>
        )}

        {/* ── Seção 6: Preview em Tempo Real ── */}
        {selectedGames.length > 0 && (
          <section>
            <h2 className="text-lg font-display font-bold text-foreground mb-4">
              <Sparkles className="inline h-5 w-5 text-primary mr-2 -mt-0.5" />
              Preview em Tempo Real
            </h2>
            <div className="border border-primary/30 rounded-xl overflow-hidden glow-sport">
              <div className="bg-gradient-to-br from-[hsl(210,90%,12%)] to-[hsl(230,15%,6%)] p-6 sm:p-8 min-h-[320px]">
                {/* Preview header */}
                <div className="text-center mb-6">
                  <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-1">
                    {selectedGuide ? guideTypes.find((g) => g.id === selectedGuide)?.name : "AGENDA DE HOJE"}
                  </p>
                  <h3 className="text-xl font-display font-bold text-foreground">
                    FUTEBOL AO VIVO
                  </h3>
                  <div className="w-16 h-0.5 bg-primary mx-auto mt-2" />
                </div>

                {/* Players row */}
                {chosenPlayers.length > 0 && (
                  <div className="flex justify-center gap-6 mb-6">
                    {chosenPlayers.map((p) => (
                      <div key={p.id} className="text-center">
                        <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary mx-auto mb-1 flex items-center justify-center text-xl font-bold text-primary">
                          {p.name.charAt(0)}
                        </div>
                        <p className="text-xs font-semibold text-foreground">{p.name}</p>
                        <p className="text-[10px] text-muted-foreground">{p.team}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Games list */}
                <div className="space-y-2 max-w-md mx-auto">
                  {chosenGames.map((game) => (
                    <div
                      key={game.id}
                      className="flex items-center justify-between py-2 px-3 rounded-lg bg-[hsl(230,15%,10%)] border border-border/30"
                    >
                      <div className="flex items-center gap-2 text-sm">
                        <span>{game.homeLogo}</span>
                        <span className="text-foreground font-medium">{game.home}</span>
                        <span className="text-xs text-primary font-bold">x</span>
                        <span className="text-foreground font-medium">{game.away}</span>
                        <span>{game.awayLogo}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs text-foreground">{game.time}</span>
                        <span className="text-[10px] text-muted-foreground bg-secondary px-1.5 py-0.5 rounded">
                          {game.channel}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <p className="text-[10px] text-muted-foreground text-center mt-4">
                  Preview simplificado — a arte final será renderizada pelo motor de templates
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ── Seção 7: Ações Finais ── */}
        <section className="card-gradient border border-border rounded-xl p-6">
          <h2 className="text-lg font-display font-bold text-foreground mb-4 text-center">Ações</h2>

          <AnimatePresence mode="wait">
            {!generated ? (
              <motion.div
                key="actions"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-wrap items-center justify-center gap-3"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-[hsl(var(--glow-sport))] text-primary-foreground font-bold"
                  onClick={() => handleGenerate("Banner")}
                  disabled={isGenerating || selectedGames.length === 0}
                >
                  <FileImage className="h-5 w-5 mr-2" />
                  {isGenerating ? "Gerando..." : "Gerar Banner"}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => handleGenerate("Carrossel")}
                  disabled={isGenerating || selectedGames.length === 0}
                >
                  <Layers className="h-5 w-5 mr-2" />
                  Gerar Carrossel
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => handleGenerate("Story")}
                  disabled={isGenerating || selectedGames.length === 0}
                >
                  <Smartphone className="h-5 w-5 mr-2" />
                  Gerar Story
                </Button>
              </motion.div>
            ) : (
              <motion.div
                key="download"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-wrap items-center justify-center gap-3"
              >
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-[hsl(var(--glow-sport))] text-primary-foreground font-bold"
                  onClick={() => toast({ title: "Download iniciado!" })}
                >
                  <Download className="h-5 w-5 mr-2" />
                  Baixar Arte
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setGenerated(false)}
                >
                  <Wand2 className="h-5 w-5 mr-2" />
                  Gerar Novamente
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={copyGameList}
                >
                  <Copy className="h-5 w-5 mr-2" />
                  Copiar Lista
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default GuiaFutebolPage;
