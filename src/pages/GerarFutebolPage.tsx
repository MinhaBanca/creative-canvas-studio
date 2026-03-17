import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Download, Wand2, Trophy, Users, Calendar, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import ModeSelection from "@/components/futebol/ModeSelection";
import AutoMode from "@/components/futebol/AutoMode";

// ── Mock Data ──────────────────────────────────────────────

const templates = [
  { id: "3-games", name: "Agenda 3 Jogos", slots: 3, players: 0, emoji: "📋" },
  { id: "5-games", name: "Agenda 5 Jogos", slots: 5, players: 0, emoji: "📅" },
  { id: "6-games", name: "Agenda 6 Jogos", slots: 6, players: 0, emoji: "🗓️" },
  { id: "6-games-1p", name: "6 Jogos + 1 Jogador", slots: 6, players: 1, emoji: "⚽" },
  { id: "6-games-2p", name: "6 Jogos + 2 Jogadores", slots: 6, players: 2, emoji: "🏟️" },
  { id: "8-games", name: "Agenda 8 Jogos", slots: 8, players: 0, emoji: "📰" },
];

const mockGames = [
  { id: "g1", home: "Santos", away: "Corinthians", homeLogo: "🟡", awayLogo: "⚫", time: "16:00", channel: "Premiere" },
  { id: "g2", home: "Inter", away: "Bahia", homeLogo: "🔴", awayLogo: "🔵", time: "16:00", channel: "Premiere" },
  { id: "g3", home: "Goiás", away: "Atlético-MG", homeLogo: "🟢", awayLogo: "⬛", time: "16:00", channel: "SporTV" },
  { id: "g4", home: "Lazio", away: "Milan", homeLogo: "🔵", awayLogo: "🔴", time: "16:45", channel: "ESPN" },
  { id: "g5", home: "Rennes", away: "Lille", homeLogo: "🔴", awayLogo: "🔴", time: "16:45", channel: "ESPN 2" },
  { id: "g6", home: "Real Sociedad", away: "Osasuna", homeLogo: "🔵", awayLogo: "🔴", time: "17:00", channel: "ESPN 3" },
  { id: "g7", home: "Palmeiras", away: "São Paulo", homeLogo: "🟢", awayLogo: "🔴", time: "18:30", channel: "Globo" },
  { id: "g8", home: "Flamengo", away: "Vasco", homeLogo: "🔴", awayLogo: "⬛", time: "21:00", channel: "Premiere" },
  { id: "g9", home: "Grêmio", away: "Cruzeiro", homeLogo: "🔵", awayLogo: "🔵", time: "19:00", channel: "SporTV" },
  { id: "g10", home: "Barcelona", away: "Real Madrid", homeLogo: "🔵", awayLogo: "⚪", time: "17:00", channel: "ESPN" },
];

type Player = { id: string; name: string; team: string };

const mockPlayers: Record<string, Player[]> = {
  Santos: [
    { id: "p1", name: "Marcos Leonardo", team: "Santos" },
    { id: "p2", name: "João Paulo", team: "Santos" },
  ],
  Corinthians: [
    { id: "p3", name: "Yuri Alberto", team: "Corinthians" },
    { id: "p4", name: "Romero", team: "Corinthians" },
  ],
  Palmeiras: [
    { id: "p5", name: "Endrick", team: "Palmeiras" },
    { id: "p6", name: "Raphael Veiga", team: "Palmeiras" },
  ],
  "São Paulo": [
    { id: "p7", name: "Luciano", team: "São Paulo" },
    { id: "p8", name: "James Rodríguez", team: "São Paulo" },
  ],
  Flamengo: [
    { id: "p9", name: "Pedro", team: "Flamengo" },
    { id: "p10", name: "Gerson", team: "Flamengo" },
  ],
  Vasco: [
    { id: "p11", name: "Vegetti", team: "Vasco" },
    { id: "p12", name: "Payet", team: "Vasco" },
  ],
  Inter: [
    { id: "p13", name: "Alan Patrick", team: "Inter" },
  ],
  Bahia: [
    { id: "p14", name: "Everaldo", team: "Bahia" },
  ],
  Grêmio: [
    { id: "p15", name: "Suárez", team: "Grêmio" },
  ],
  Barcelona: [
    { id: "p16", name: "Lamine Yamal", team: "Barcelona" },
  ],
  "Real Madrid": [
    { id: "p17", name: "Vinícius Jr.", team: "Real Madrid" },
  ],
};

// ── Steps ──────────────────────────────────────────────────

const steps = [
  { label: "Template", icon: Image },
  { label: "Jogos", icon: Calendar },
  { label: "Jogadores", icon: Users },
  { label: "Gerar", icon: Wand2 },
];

// ── Component ──────────────────────────────────────────────

const GerarFutebolPage = () => {
  const [mode, setMode] = useState<"select" | "manual" | "auto">("select");
  const [step, setStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState<typeof templates[0] | null>(null);
  const [selectedGames, setSelectedGames] = useState<string[]>([]);
  const [selectedPlayers, setSelectedPlayers] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const maxGames = selectedTemplate?.slots ?? 6;
  const maxPlayers = selectedTemplate?.players ?? 0;

  const toggleGame = (id: string) => {
    setSelectedGames((prev) =>
      prev.includes(id)
        ? prev.filter((g) => g !== id)
        : prev.length < maxGames
          ? [...prev, id]
          : prev
    );
  };

  const togglePlayer = (id: string) => {
    setSelectedPlayers((prev) =>
      prev.includes(id)
        ? prev.filter((p) => p !== id)
        : prev.length < maxPlayers
          ? [...prev, id]
          : prev
    );
  };

  const canAdvance = () => {
    if (step === 0) return !!selectedTemplate;
    if (step === 1) return selectedGames.length > 0;
    if (step === 2) return maxPlayers === 0 || selectedPlayers.length > 0;
    return true;
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGenerated(true);
      toast({ title: "Banner gerado!", description: "Sua arte está pronta para download." });
    }, 2000);
  };

  const handleNext = () => {
    if (step === 2 && maxPlayers === 0) {
      setStep(3);
    } else if (step < 3) {
      setStep(step + 1);
    }
  };

  const availableTeams = selectedGames.flatMap((gid) => {
    const game = mockGames.find((g) => g.id === gid);
    return game ? [game.home, game.away] : [];
  });

  const availablePlayers = availableTeams.flatMap((team) => mockPlayers[team] ?? []);

  // ── Render helpers ──

  const renderStepper = () => (
    <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
      {steps.map((s, i) => {
        const done = i < step;
        const active = i === step;
        // Skip player step indicator if no players needed
        if (i === 2 && maxPlayers === 0 && step !== 2) return null;
        return (
          <div key={s.label} className="flex items-center gap-2">
            {i > 0 && (
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

  const renderTemplateStep = () => (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {templates.map((tpl) => {
        const active = selectedTemplate?.id === tpl.id;
        return (
          <motion.button
            key={tpl.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              setSelectedTemplate(tpl);
              setSelectedGames([]);
              setSelectedPlayers([]);
              setGenerated(false);
            }}
            className={`card-gradient border rounded-xl p-5 text-center transition-colors ${
              active ? "border-primary glow-sport" : "border-border hover:border-primary/40"
            }`}
          >
            <div className="text-3xl mb-2">{tpl.emoji}</div>
            <p className="text-sm font-medium text-foreground">{tpl.name}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {tpl.slots} jogos{tpl.players > 0 && ` + ${tpl.players} jogador${tpl.players > 1 ? "es" : ""}`}
            </p>
          </motion.button>
        );
      })}
    </div>
  );

  const renderGamesStep = () => (
    <div>
      <p className="text-sm text-muted-foreground mb-4">
        Selecione até <span className="text-primary font-semibold">{maxGames}</span> jogos
        ({selectedGames.length}/{maxGames})
      </p>
      <div className="space-y-2">
        {mockGames.map((game) => {
          const active = selectedGames.includes(game.id);
          const disabled = !active && selectedGames.length >= maxGames;
          return (
            <motion.button
              key={game.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleGame(game.id)}
              disabled={disabled}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg border text-sm transition-all ${
                active
                  ? "border-primary bg-primary/10 text-foreground"
                  : disabled
                    ? "border-border bg-secondary/30 text-muted-foreground opacity-50 cursor-not-allowed"
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

  const renderPlayersStep = () => {
    if (maxPlayers === 0) {
      return (
        <div className="text-center py-12">
          <Users className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">Este template não inclui jogadores.</p>
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

  const renderGenerateStep = () => {
    const chosenGames = mockGames.filter((g) => selectedGames.includes(g.id));
    const chosenPlayers = availablePlayers.filter((p) => selectedPlayers.includes(p.id));

    return (
      <div className="space-y-6">
        {/* Summary */}
        <div className="card-gradient border border-border rounded-xl p-6 space-y-4">
          <h3 className="text-sm font-semibold text-foreground">Resumo</h3>
          <div className="text-sm space-y-1">
            <p className="text-muted-foreground">
              Template: <span className="text-foreground">{selectedTemplate?.name}</span>
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

          {/* Game list preview */}
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

        {/* Generate / Download */}
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

        {/* Generated preview placeholder */}
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

  const stepContent = [renderTemplateStep, renderGamesStep, renderPlayersStep, renderGenerateStep];

  return (
    <DashboardLayout>
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Link>
        <h1 className="text-2xl font-display font-bold text-foreground">
          <Trophy className="inline h-6 w-6 text-primary mr-2 -mt-1" />
          Gerador de Futebol
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Crie artes incríveis e profissionais em poucos cliques.
        </p>
      </div>

      {mode === "select" && (
        <ModeSelection onSelectMode={(m) => setMode(m)} />
      )}

      {mode === "auto" && (
        <AutoMode onBack={() => setMode("select")} />
      )}

      {mode === "manual" && (
        <>
          <button
            onClick={() => { setMode("select"); setStep(0); }}
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

          {step < 3 && (
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={() => setStep(step - 1)}
                disabled={step === 0}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Anterior
              </Button>
              <Button onClick={handleNext} disabled={!canAdvance()}>
                Próximo
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </>
      )}
    </DashboardLayout>
  );
};

export default GerarFutebolPage;
