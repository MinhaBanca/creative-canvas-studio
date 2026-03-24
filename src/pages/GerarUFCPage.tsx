import { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Download, Layers, Video, Zap, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import BannerTypeSelector from "@/components/ufc/BannerTypeSelector";
import EventSelector from "@/components/ufc/EventSelector";
import FightCard from "@/components/ufc/FightCard";
import FighterSelector from "@/components/ufc/FighterSelector";
import StyleSelector from "@/components/ufc/StyleSelector";
import EffectsConfig from "@/components/ufc/EffectsConfig";
import BannerTextConfig from "@/components/ufc/BannerTextConfig";
import UFCBannerPreview from "@/components/ufc/UFCBannerPreview";
import {
  mockEvents, mockFighters, mockFights, templates,
} from "@/components/ufc/ufcData";

const GerarUFCPage = () => {
  const { toast } = useToast();

  const [bannerType, setBannerType] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);
  const [selectedFights, setSelectedFights] = useState<number[]>([]);
  const [selectedFighters, setSelectedFighters] = useState<number[]>([]);
  const [style, setStyle] = useState("dark-fight");
  const [activeEffects, setActiveEffects] = useState<string[]>(["glow", "shadow"]);
  const [eventName, setEventName] = useState("");
  const [slogan, setSlogan] = useState("");
  const [time, setTime] = useState("");
  const [channel, setChannel] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  // Derived
  const eventFights = selectedEvent ? mockFights.filter((f) => f.eventId === selectedEvent) : [];
  const fighterA = selectedFighters[0] ? mockFighters.find((f) => f.id === selectedFighters[0]) : undefined;
  const fighterB = selectedFighters[1] ? mockFighters.find((f) => f.id === selectedFighters[1]) : undefined;

  // Fighters from selected fights
  const fightFighterIds = new Set<number>();
  selectedFights.forEach((fId) => {
    const fight = mockFights.find((f) => f.id === fId);
    if (fight) { fightFighterIds.add(fight.fighterA); fightFighterIds.add(fight.fighterB); }
  });
  const availableFighters = selectedFights.length > 0
    ? mockFighters.filter((f) => fightFighterIds.has(f.id))
    : mockFighters;

  const toggleFight = (id: number) => {
    setSelectedFights((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const toggleFighter = (id: number) => {
    setSelectedFighters((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : prev.length < 2 ? [...prev, id] : prev
    );
  };

  const toggleEffect = (id: string) => {
    setActiveEffects((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
  };

  const handleTextChange = (field: string, value: string) => {
    if (field === "eventName") setEventName(value);
    if (field === "slogan") setSlogan(value);
    if (field === "time") setTime(value);
    if (field === "channel") setChannel(value);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          toast({ title: "✅ Banner gerado!", description: "Seu banner UFC está pronto para download." });
          return 100;
        }
        return prev + 10;
      });
    }, 180);
  };

  const handleAutoGenerate = () => {
    const todayEvent = mockEvents.find((e) => e.date === "Hoje");
    if (todayEvent) {
      setSelectedEvent(todayEvent.id);
      setEventName(todayEvent.name);
      setBannerType("fightcard");
      const fights = mockFights.filter((f) => f.eventId === todayEvent.id);
      setSelectedFights(fights.map((f) => f.id));
      const mainEvent = fights.find((f) => f.isMainEvent);
      if (mainEvent) {
        setSelectedFighters([mainEvent.fighterA, mainEvent.fighterB]);
        setTime(mainEvent.time || "23:00");
      }
      setSlogan("Hoje tem guerra!");
      setChannel("Combate / ESPN");
      setStyle("dark-fight");
      toast({ title: "🥊 Card do Evento de Hoje!", description: `${todayEvent.name} — configuração automática aplicada.` });
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
              <div className="p-2 rounded-xl bg-destructive/15">
                <span className="text-2xl">🥊</span>
              </div>
              <h1 className="text-3xl font-bold">Gerar Banner UFC / MMA</h1>
            </div>
            <p className="text-muted-foreground">Crie artes explosivas de lutas e eventos automaticamente</p>
          </div>
          <Button onClick={handleAutoGenerate} className="bg-gradient-to-r from-destructive to-red-700 text-destructive-foreground font-bold gap-2 shadow-lg shadow-destructive/25">
            <Zap className="h-4 w-4" /> Gerar Card do Evento de Hoje
          </Button>
        </motion.div>

        {/* Seção 2 — Tipo de Banner */}
        <BannerTypeSelector value={bannerType} onChange={setBannerType} />

        {/* Seção 3 — Evento */}
        <EventSelector events={mockEvents} selectedId={selectedEvent} onSelect={(id) => {
          setSelectedEvent(id);
          setSelectedFights([]);
          setSelectedFighters([]);
          const ev = mockEvents.find((e) => e.id === id);
          if (ev) setEventName(ev.name);
        }} />

        {/* Seção 4 — Lutas */}
        {selectedEvent && (
          <FightCard
            fights={eventFights}
            fighters={mockFighters}
            selectedFights={selectedFights}
            onToggle={toggleFight}
          />
        )}

        {/* Seção 5 — Lutadores */}
        <FighterSelector
          fighters={availableFighters}
          selected={selectedFighters}
          onToggle={toggleFighter}
        />

        {/* Seção 6 + 7 — Estilo e Efeitos */}
        <div className="grid md:grid-cols-2 gap-6">
          <StyleSelector value={style} onChange={setStyle} />
          <EffectsConfig active={activeEffects} onToggle={toggleEffect} />
        </div>

        {/* Seção 8 — Texto */}
        <BannerTextConfig
          eventName={eventName}
          slogan={slogan}
          time={time}
          channel={channel}
          onChange={handleTextChange}
        />

        {/* Seção 9 — Preview */}
        <UFCBannerPreview
          style={style}
          fighterA={fighterA}
          fighterB={fighterB}
          eventName={eventName || "UFC"}
          slogan={slogan}
          time={time}
          channel={channel}
          activeEffects={activeEffects}
        />

        {/* Seção 10 — Templates */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            📋 Templates
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {templates.map((t) => (
              <Card
                key={t.id}
                className={`cursor-pointer transition-all hover:scale-[1.03] ${
                  selectedTemplate === t.id ? "ring-2 ring-destructive bg-destructive/10" : "bg-card hover:bg-secondary/50"
                }`}
                onClick={() => setSelectedTemplate(t.id)}
              >
                <CardContent className="p-4 text-center">
                  <div className="text-3xl mb-2">{t.icon}</div>
                  <h3 className="font-semibold text-sm">{t.name}</h3>
                  {selectedTemplate === t.id && <Check className="h-4 w-4 text-destructive mx-auto mt-1" />}
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

        {/* Seção 11 — Ações */}
        <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
          <div className="flex flex-wrap gap-4">
            <Button onClick={handleGenerate} disabled={isGenerating} size="lg" className="bg-gradient-to-r from-destructive to-red-700 text-destructive-foreground font-bold gap-2 shadow-lg shadow-destructive/25">
              <Download className="h-5 w-5" /> Gerar Banner
            </Button>
            <Button onClick={handleGenerate} disabled={isGenerating} size="lg" variant="outline" className="gap-2">
              <Layers className="h-5 w-5" /> Gerar Story
            </Button>
            <Button onClick={handleGenerate} disabled={isGenerating} size="lg" variant="outline" className="gap-2">
              <Video className="h-5 w-5" /> Gerar Vídeo
            </Button>
          </div>
        </motion.section>
      </div>
    </DashboardLayout>
  );
};

export default GerarUFCPage;
