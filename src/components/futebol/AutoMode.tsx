import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, Download, Wand2, Zap, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const autoTemplates = [
  { id: "agenda-dia", name: "Agenda do Dia", description: "Todos os jogos do dia em uma arte", emoji: "📋" },
  { id: "agenda-premium", name: "Agenda Premium", description: "Layout premium com destaques", emoji: "✨" },
  { id: "jogos-populares", name: "Jogos Populares", description: "Top 6 jogos mais relevantes", emoji: "🔥" },
  { id: "agenda-compacta", name: "Agenda Compacta", description: "Layout compacto para stories", emoji: "📱" },
];

interface AutoModeProps {
  onBack: () => void;
}

const AutoMode = ({ onBack }: AutoModeProps) => {
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const toggleTemplate = (id: string) => {
    setSelectedTemplates((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGenerated(true);
      toast({
        title: "Artes geradas!",
        description: `${selectedTemplates.length} banner(s) gerado(s) automaticamente.`,
      });
    }, 2500);
  };

  return (
    <div>
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar aos modos
      </button>

      <div className="flex items-center gap-2 mb-2">
        <Zap className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-display font-bold text-foreground">Modo Automático</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-6">
        Selecione os temas e gere todas as artes do dia com um clique.
      </p>

      {/* Template selection */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {autoTemplates.map((tpl) => {
          const active = selectedTemplates.includes(tpl.id);
          return (
            <motion.button
              key={tpl.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => toggleTemplate(tpl.id)}
              className={`card-gradient border rounded-xl p-5 text-center transition-colors ${
                active ? "border-primary glow-sport" : "border-border hover:border-primary/40"
              }`}
            >
              <div className="flex justify-end mb-1">
                <span className={`w-5 h-5 rounded border-2 flex items-center justify-center text-xs ${
                  active ? "border-primary bg-primary text-primary-foreground" : "border-muted-foreground"
                }`}>
                  {active && <Check className="h-3 w-3" />}
                </span>
              </div>
              <div className="text-3xl mb-2">{tpl.emoji}</div>
              <p className="text-sm font-medium text-foreground">{tpl.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{tpl.description}</p>
            </motion.button>
          );
        })}
      </div>

      {/* Generate */}
      <div className="flex gap-3 justify-center mb-8">
        {!generated ? (
          <Button
            size="lg"
            onClick={handleGenerate}
            disabled={isGenerating || selectedTemplates.length === 0}
          >
            <Zap className="h-4 w-4 mr-2" />
            {isGenerating ? "Gerando artes..." : `Gerar ${selectedTemplates.length > 0 ? selectedTemplates.length : ""} Arte${selectedTemplates.length !== 1 ? "s" : ""}`}
          </Button>
        ) : (
          <>
            <Button size="lg" variant="outline" onClick={() => toast({ title: "Download iniciado!" })}>
              <Download className="h-4 w-4 mr-2" />
              Baixar Todas
            </Button>
            <Button size="lg" onClick={() => { setGenerated(false); handleGenerate(); }}>
              <Wand2 className="h-4 w-4 mr-2" />
              Gerar Novamente
            </Button>
          </>
        )}
      </div>

      {/* Generated preview */}
      <AnimatePresence>
        {generated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {selectedTemplates.map((tplId) => {
              const tpl = autoTemplates.find((t) => t.id === tplId)!;
              return (
                <div
                  key={tplId}
                  className="border border-primary/30 rounded-xl overflow-hidden glow-sport"
                >
                  <div className="bg-gradient-to-br from-[hsl(210,90%,15%)] to-[hsl(230,15%,8%)] p-6 text-center min-h-[200px] flex flex-col items-center justify-center">
                    <Trophy className="h-8 w-8 text-primary mb-3" />
                    <h4 className="text-sm font-display font-bold text-foreground mb-1">{tpl.name}</h4>
                    <p className="text-xs text-muted-foreground">Preview — arte gerada automaticamente</p>
                    <Button size="sm" variant="outline" className="mt-4" onClick={() => toast({ title: `Download ${tpl.name}` })}>
                      <Download className="h-3 w-3 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AutoMode;
