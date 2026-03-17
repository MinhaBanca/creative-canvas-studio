import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Download,
  Wand2,
  Trophy,
  Users,
  Calendar,
  Palette,
  Search,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

// ── Mock Data ──────────────────────────────────────────────

const themes = [
  { id: "destaque-pro", name: "Destaque Pro", tag: "NOVO", colors: 8, emoji: "🏆" },
  { id: "estilo-pilulas", name: "Estilo Pílulas", tag: "NOVO", colors: 6, emoji: "⚽" },
  { id: "neon-gold", name: "Neon & Gold HD", tag: "HD", colors: 5, emoji: "✨" },
  { id: "hero-dark", name: "Hero Dark", tag: "MAIS USADO", colors: 8, emoji: "🔥" },
  { id: "pro-series", name: "Pro Series", tag: "NOVO", colors: 7, emoji: "🎯" },
  { id: "classic-blue", name: "Classic Blue", tag: "", colors: 4, emoji: "💎" },
  { id: "minimal-white", name: "Minimal White", tag: "", colors: 3, emoji: "⚪" },
  { id: "gradient-fire", name: "Gradient Fire", tag: "", colors: 6, emoji: "🔴" },
];

type Championship = {
  id: string;
  name: string;
  country: string;
  gamesCount: number;
  hasGames: boolean;
};

const mockChampionships: Championship[] = [
  { id: "global", name: "Futebol Global", country: "🌍", gamesCount: 10, hasGames: true },
  { id: "brasileirao-a", name: "Brasileirão Série A", country: "BR", gamesCount: 5, hasGames: true },
  { id: "laliga", name: "LALIGA (Espanha)", country: "ES", gamesCount: 3, hasGames: true },
  { id: "premier", name: "Premier League (Inglaterra)", country: "🏴", gamesCount: 4, hasGames: true },
  { id: "serie-a", name: "Serie A (Itália)", country: "IT", gamesCount: 2, hasGames: true },
  { id: "amistosos", name: "Amistosos de Clubes", country: "🤝", gamesCount: 0, hasGames: false },
  { id: "brasileirao-sub20", name: "Brasileiro - S20", country: "BR", gamesCount: 0, hasGames: false },
  { id: "brasileirao-b", name: "Brasileirão Série B", country: "BR", gamesCount: 0, hasGames: false },
  { id: "brasileirao-c", name: "Brasileirão Série C", country: "BR", gamesCount: 0, hasGames: false },
  { id: "bundesliga", name: "Bundesliga (Alemanha)", country: "DE", gamesCount: 3, hasGames: true },
  { id: "libertadores", name: "CONMEBOL Libertadores", country: "🏆", gamesCount: 0, hasGames: false },
  { id: "sudamericana", name: "CONMEBOL Sudamericana", country: "🏆", gamesCount: 0, hasGames: false },
];

type Game = {
  id: string;
  home: string;
  away: string;
  homeLogo: string;
  awayLogo: string;
  time: string;
  channel: string;
  championship: string;
};

const mockGames: Game[] = [
  { id: "g1", home: "Santos", away: "Corinthians", homeLogo: "🟡", awayLogo: "⚫", time: "16:00", channel: "Premiere", championship: "brasileirao-a" },
  { id: "g2", home: "Inter", away: "Bahia", homeLogo: "🔴", awayLogo: "🔵", time: "16:00", channel: "Premiere", championship: "brasileirao-a" },
  { id: "g3", home: "Palmeiras", away: "São Paulo", homeLogo: "🟢", awayLogo: "🔴", time: "18:30", channel: "Globo", championship: "brasileirao-a" },
  { id: "g4", home: "Flamengo", away: "Vasco", homeLogo: "🔴", awayLogo: "⬛", time: "21:00", channel: "Premiere", championship: "brasileirao-a" },
  { id: "g5", home: "Grêmio", away: "Cruzeiro", homeLogo: "🔵", awayLogo: "🔵", time: "19:00", channel: "SporTV", championship: "brasileirao-a" },
  { id: "g6", home: "Lazio", away: "Milan", homeLogo: "🔵", awayLogo: "🔴", time: "16:45", channel: "ESPN", championship: "serie-a" },
  { id: "g7", home: "Roma", away: "Napoli", homeLogo: "🟡", awayLogo: "🔵", time: "14:00", channel: "ESPN 2", championship: "serie-a" },
  { id: "g8", home: "Real Sociedad", away: "Osasuna", homeLogo: "🔵", awayLogo: "🔴", time: "17:00", channel: "ESPN 3", championship: "laliga" },
  { id: "g9", home: "Barcelona", away: "Real Madrid", homeLogo: "🔵", awayLogo: "⚪", time: "17:00", channel: "ESPN", championship: "laliga" },
  { id: "g10", home: "Atlético Madrid", away: "Sevilla", homeLogo: "🔴", awayLogo: "⚪", time: "14:00", channel: "ESPN 4", championship: "laliga" },
  { id: "g11", home: "Liverpool", away: "Man City", homeLogo: "🔴", awayLogo: "🔵", time: "13:30", channel: "ESPN", championship: "premier" },
  { id: "g12", home: "Arsenal", away: "Chelsea", homeLogo: "🔴", awayLogo: "🔵", time: "16:00", channel: "ESPN 2", championship: "premier" },
  { id: "g13", home: "Tottenham", away: "Man United", homeLogo: "⚪", awayLogo: "🔴", time: "11:00", channel: "ESPN 3", championship: "premier" },
  { id: "g14", home: "Newcastle", away: "Aston Villa", homeLogo: "⬛", awayLogo: "🟣", time: "13:30", channel: "Star+", championship: "premier" },
  { id: "g15", home: "Bayern", away: "Dortmund", homeLogo: "🔴", awayLogo: "🟡", time: "13:30", channel: "ESPN 4", championship: "bundesliga" },
  { id: "g16", home: "Leverkusen", away: "Leipzig", homeLogo: "🔴", awayLogo: "⚪", time: "11:30", channel: "ESPN+", championship: "bundesliga" },
  { id: "g17", home: "Rennes", away: "Lille", homeLogo: "🔴", awayLogo: "🔴", time: "16:45", channel: "ESPN 2", championship: "global" },
  { id: "g18", home: "Goiás", away: "Atlético-MG", homeLogo: "🟢", awayLogo: "⬛", time: "16:00", channel: "SporTV", championship: "global" },
];

type Player = { id: string; name: string; team: string };

const mockPlayers: Record<string, Player[]> = {
  Santos: [{ id: "p1", name: "Marcos Leonardo", team: "Santos" }, { id: "p2", name: "João Paulo", team: "Santos" }],
  Corinthians: [{ id: "p3", name: "Yuri Alberto", team: "Corinthians" }, { id: "p4", name: "Romero", team: "Corinthians" }],
  Palmeiras: [{ id: "p5", name: "Endrick", team: "Palmeiras" }, { id: "p6", name: "Raphael Veiga", team: "Palmeiras" }],
  "São Paulo": [{ id: "p7", name: "Luciano", team: "São Paulo" }, { id: "p8", name: "James Rodríguez", team: "São Paulo" }],
  Flamengo: [{ id: "p9", name: "Pedro", team: "Flamengo" }, { id: "p10", name: "Gerson", team: "Flamengo" }],
  Vasco: [{ id: "p11", name: "Vegetti", team: "Vasco" }, { id: "p12", name: "Payet", team: "Vasco" }],
  Inter: [{ id: "p13", name: "Alan Patrick", team: "Inter" }],
  Bahia: [{ id: "p14", name: "Everaldo", team: "Bahia" }],
  Grêmio: [{ id: "p15", name: "Suárez", team: "Grêmio" }],
  Barcelona: [{ id: "p16", name: "Lamine Yamal", team: "Barcelona" }],
  "Real Madrid": [{ id: "p17", name: "Vinícius Jr.", team: "Real Madrid" }],
  Liverpool: [{ id: "p18", name: "Salah", team: "Liverpool" }],
  "Man City": [{ id: "p19", name: "Haaland", team: "Man City" }],
  Bayern: [{ id: "p20", name: "Harry Kane", team: "Bayern" }],
};

// Theme determines if players are needed
const themesWithPlayers = ["destaque-pro", "hero-dark", "pro-series"];
const maxPlayersForTheme = (themeId: string) => themesWithPlayers.includes(themeId) ? 2 : 0;

// ── Steps ──────────────────────────────────────────────────

const steps = [
  { label: "Tema", icon: Palette },
  { label: "Campeonato", icon: Trophy },
  { label: "Jogos", icon: Calendar },
  { label: "Jogadores", icon: Users },
  { label: "Gerar", icon: Wand2 },
];

// ── Component ──────────────────────────────────────────────

interface ManualModeProps {
  onBack: () => void;
}

const ManualMode = ({ onBack }: ManualModeProps) => {
  const [step, setStep] = useState(0);
  const [selectedTheme, setSelectedTheme] = useState<typeof themes[0] | null>(null);
  const [selectedChampionship, setSelectedChampionship] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState<"hoje" | "amanha" | "semana">("hoje");
  const [searchChampionship, setSearchChampionship] = useState("");
  const [selectedGames, setSelectedGames] = useState<string[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const maxPlayers = selectedTheme ? maxPlayersForTheme(selectedTheme.id) : 0;
  const needsPlayers = maxPlayers > 0;

  const filteredGames = mockGames.filter((g) =>
    selectedChampionship === "global" ? true : g.championship === selectedChampionship
  );

  const toggleGame = (id: string) => {
    setSelectedGames((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id]
    );
  };

  const togglePlayer = (id: string) => {
    setSelectedPlayers((prev) =>
      prev.includes(id)
        ? prev.filter((p) => p !== id)
        : prev.length < maxPlayers ? [...prev, id] : prev
    );
  };

  const canAdvance = () => {
    if (step === 0) return !!selectedTheme;
    if (step === 1) return !!selectedChampionship;
    if (step === 2) return selectedGames.length > 0;
    if (step === 3) return !needsPlayers || selectedPlayers.length > 0;
    return true;
  };

  const handleNext = () => {
    if (step === 2 && !needsPlayers) {
      setStep(4); // skip players
    } else if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step === 4 && !needsPlayers) {
      setStep(2); // skip players going back
    } else if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGenerated(true);
      toast({ title: "Banner gerado!", description: "Sua arte está pronta para download." });
    }, 2000);
  };

  const availableTeams = selectedGames.flatMap((gid) => {
    const game = mockGames.find((g) => g.id === gid);
    return game ? [game.home, game.away] : [];
  });

  const availablePlayers = availableTeams.flatMap((team) => mockPlayers[team] ?? []);

  const filteredChampionships = mockChampionships.filter((c) =>
    c.name.toLowerCase().includes(searchChampionship.toLowerCase())
  );

  // ── Stepper ──
  const renderStepper = () => (
    <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
      {steps.map((s, i) => {
        // Skip player step if theme doesn't need players
        if (i === 3 && !needsPlayers && step !== 3) return null;

        const done = i < step;
        const active = i === step;
        return (
          <div key={s.label} className="flex items-center gap-2">
            {i > 0 && !(i === 3 && !needsPlayers) && (
              <div className={`h-px w-6 sm:w-10 ${done ? "bg-primary" : "bg-border"}`} />
            )}
            <button
              onClick={() => i < step && setStep(i)}
              disabled={i > step}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                active
                  ? "bg-primary text-primary-foreground"
                  : done
                    ? "bg-primary/20 text-primary cursor-pointer"
                    : "bg-secondary text-muted-foreground"
              }`}
            >
              {done ? <Check className="h-4 w-4" /> : <s.icon className="h-4 w-4" />}
              <span className="hidden sm:inline">{s.label}</span>
            </button>
          </div>
        );
      })}
    </div>
  );

  // ── Step 0: Theme ──
  const renderThemeStep = () => (
    <div>
      <h3 className="text-lg font-display font-bold text-foreground mb-1">Escolha o Tema</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Selecione o estilo da sua arte e escolha a cor desejada.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {themes.map((theme) => {
          const active = selectedTheme?.id === theme.id;
          return (
            <motion.button
              key={theme.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setSelectedTheme(theme);
                setSelectedGames([]);
                setSelectedPlayers([]);
                setGenerated(false);
              }}
              className={`card-gradient border rounded-xl p-5 text-center transition-colors relative overflow-hidden ${
                active ? "border-primary glow-sport" : "border-border hover:border-primary/40"
              }`}
            >
              {theme.tag && (
                <span className="absolute top-2 right-2 text-[10px] font-bold bg-primary text-primary-foreground px-2 py-0.5 rounded">
                  {theme.tag}
                </span>
              )}
              <div className="text-4xl mb-3">{theme.emoji}</div>
              <p className="text-sm font-display font-bold text-foreground">{theme.name}</p>
              <p className="text-xs text-muted-foreground mt-1.5">
                Ver cores ▾
              </p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );

  // ── Step 1: Championship ──
  const renderChampionshipStep = () => (
    <div>
      <h3 className="text-lg font-display font-bold text-foreground mb-1 flex items-center gap-2">
        <Trophy className="h-5 w-5 text-primary" />
        Escolha o Campeonato
      </h3>
      <p className="text-sm text-muted-foreground mb-5">
        Selecione o campeonato para ver os jogos disponíveis.
      </p>

      {/* Search */}
      <div className="relative mb-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar campeonato..."
          value={searchChampionship}
          onChange={(e) => setSearchChampionship(e.target.value)}
          className="w-full pl-10 pr-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
        />
      </div>

      {/* Date filter tabs */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {([
          { key: "hoje" as const, label: "HOJE", icon: Calendar },
          { key: "amanha" as const, label: "AMANHÃ", icon: Calendar },
          { key: "semana" as const, label: "SEMANA", icon: Calendar },
        ]).map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setDateFilter(key)}
            className={`flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold transition-all ${
              dateFilter === key
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </button>
        ))}
      </div>

      {/* Championship grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {filteredChampionships.map((champ) => {
          const active = selectedChampionship === champ.id;
          return (
            <motion.button
              key={champ.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setSelectedChampionship(champ.id);
                setSelectedGames([]);
              }}
              className={`card-gradient border rounded-xl p-4 text-center transition-colors relative ${
                active
                  ? "border-primary glow-sport"
                  : champ.hasGames
                    ? "border-border hover:border-primary/40"
                    : "border-border opacity-50"
              }`}
            >
              {champ.hasGames && (
                <span className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-primary" />
              )}
              <div className="text-2xl mb-2">
                {champ.country.length <= 2 ? (
                  <span className="text-lg font-display font-bold text-muted-foreground">{champ.country}</span>
                ) : (
                  <span>{champ.country}</span>
                )}
              </div>
              <p className="text-xs font-semibold text-foreground">{champ.name}</p>
              <p className={`text-[10px] mt-1 font-mono ${champ.hasGames ? "text-primary" : "text-muted-foreground"}`}>
                {champ.gamesCount} JOGOS
              </p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );

  // ── Step 2: Games ──
  const renderGamesStep = () => {
    const championship = mockChampionships.find((c) => c.id === selectedChampionship);
    return (
      <div>
        <h3 className="text-lg font-display font-bold text-foreground mb-1">
          Jogos — {championship?.name || ""}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">
          Selecione os jogos para o banner ({selectedGames.length} selecionados)
        </p>
        <div className="space-y-2">
          {filteredGames.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
              <p className="text-muted-foreground">Nenhum jogo disponível para este campeonato.</p>
            </div>
          )}
          {filteredGames.map((game) => {
            const active = selectedGames.includes(game.id);
            return (
              <motion.button
                key={game.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleGame(game.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border text-sm transition-all ${
                  active
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-secondary/50 text-foreground hover:border-primary/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-5 h-5 rounded border-2 flex items-center justify-center text-xs ${
                    active ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"
                  }`}>
                    {active && <Check className="h-3 w-3" />}
                  </span>
                  <span>{game.homeLogo} {game.home}</span>
                  <span className="text-muted-foreground">vs</span>
                  <span>{game.awayLogo} {game.away}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <span className="font-mono">{game.time}</span>
                  <span className="text-xs bg-secondary px-2 py-0.5 rounded">{game.channel}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  };

  // ── Step 3: Players ──
  const renderPlayersStep = () => {
    if (!needsPlayers) {
      return (
        <div className="text-center py-12">
          <Users className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">Este tema não inclui jogadores.</p>
        </div>
      );
    }

    const groupedByTeam = availableTeams.reduce<Record<string, Player[]>>((acc, team) => {
      const players = mockPlayers[team];
      if (players && !acc[team]) acc[team] = players;
      return acc;
    }, {});

    return (
      <div>
        <h3 className="text-lg font-display font-bold text-foreground mb-1">Escolha os Jogadores</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Selecione até <span className="text-primary font-semibold">{maxPlayers}</span> jogador{maxPlayers > 1 ? "es" : ""}
          ({selectedPlayers.length}/{maxPlayers})
        </p>
        <div className="space-y-6">
          {Object.entries(groupedByTeam).map(([team, players]) => (
            <div key={team}>
              <h4 className="text-sm font-semibold text-foreground mb-2">{team}</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {players.map((player) => {
                  const active = selectedPlayers.includes(player.id);
                  const disabled = !active && selectedPlayers.length >= maxPlayers;
                  return (
                    <motion.button
                      key={player.id}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => togglePlayer(player.id)}
                      disabled={disabled}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm transition-all ${
                        active
                          ? "border-primary bg-primary/10 text-foreground"
                          : disabled
                            ? "border-border opacity-50 cursor-not-allowed"
                            : "border-border hover:border-primary/40 text-foreground"
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        active ? "border-primary bg-primary" : "border-muted-foreground"
                      }`}>
                        {active && <Check className="h-2.5 w-2.5 text-primary-foreground" />}
                      </span>
                      {player.name}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── Step 4: Generate ──
  const renderGenerateStep = () => {
    const chosenGames = mockGames.filter((g) => selectedGames.includes(g.id));
    const chosenPlayers = availablePlayers.filter((p) => selectedPlayers.includes(p.id));
    const championship = mockChampionships.find((c) => c.id === selectedChampionship);

    return (
      <div className="space-y-6">
        <div className="card-gradient border border-border rounded-xl p-6 space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Resumo</h3>
          <div className="text-sm space-y-1">
            <p className="text-muted-foreground">
              Tema: <span className="text-foreground">{selectedTheme?.name}</span>
            </p>
            <p className="text-muted-foreground">
              Campeonato: <span className="text-foreground">{championship?.name}</span>
            </p>
            <p className="text-muted-foreground">
              Jogos: <span className="text-foreground">{chosenGames.length}</span>
            </p>
            {chosenPlayers.length > 0 && (
              <p className="text-muted-foreground">
                Jogadores: <span className="text-foreground">{chosenPlayers.map((p) => p.name).join(", ")}</span>
              </p>
            )}
          </div>

          <div className="bg-background/50 rounded-lg p-4 space-y-2">
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-3">Agenda de Hoje</p>
            {chosenGames.map((game) => (
              <div key={game.id} className="flex items-center justify-between text-sm py-1.5 border-b border-border/50 last:border-0">
                <span className="text-foreground">
                  {game.homeLogo} {game.home} x {game.away} {game.awayLogo}
                </span>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <span className="font-mono text-xs">{game.time}</span>
                  <span className="text-xs bg-secondary px-1.5 py-0.5 rounded">{game.channel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3 justify-center">
          {!generated ? (
            <Button size="lg" onClick={handleGenerate} disabled={isGenerating}>
              <Wand2 className="h-4 w-4 mr-2" />
              {isGenerating ? "Gerando..." : "Gerar Banner"}
            </Button>
          ) : (
            <>
              <Button size="lg" variant="outline" onClick={() => toast({ title: "Download iniciado!" })}>
                <Download className="h-4 w-4 mr-2" />
                Download PNG
              </Button>
              <Button size="lg" onClick={() => { setGenerated(false); handleGenerate(); }}>
                <Wand2 className="h-4 w-4 mr-2" />
                Gerar Novamente
              </Button>
            </>
          )}
        </div>

        {generated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-primary/30 rounded-xl overflow-hidden glow-sport"
          >
            <div className="bg-gradient-to-br from-[hsl(210,90%,15%)] to-[hsl(230,15%,8%)] p-8 text-center min-h-[300px] flex flex-col items-center justify-center">
              <Trophy className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-display font-bold text-foreground mb-2">AGENDA DE HOJE</h3>
              <div className="space-y-1.5 text-sm">
                {chosenGames.map((game) => (
                  <p key={game.id} className="text-foreground/80">
                    {game.home} x {game.away} — {game.time}
                  </p>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-4">Preview simplificado — a arte final será gerada pelo motor de templates</p>
            </div>
          </motion.div>
        )}
      </div>
    );
  };

  const stepContent = [renderThemeStep, renderChampionshipStep, renderGamesStep, renderPlayersStep, renderGenerateStep];

  return (
    <div>
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar aos modos
      </button>

      {renderStepper()}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {stepContent[step]()}
        </motion.div>
      </AnimatePresence>

      {step < 4 && (
        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={handleBack} disabled={step === 0}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Anterior
          </Button>
          <Button onClick={handleNext} disabled={!canAdvance()}>
            Próximo
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ManualMode;
