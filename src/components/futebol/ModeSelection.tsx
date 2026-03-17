import { motion } from "framer-motion";
import { Hand, Zap } from "lucide-react";

interface ModeSelectionProps {
  onSelectMode: (mode: "manual" | "auto") => void;
}

const ModeSelection = ({ onSelectMode }: ModeSelectionProps) => {
  return (
    <div className="flex flex-col items-center pt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl w-full">
        {/* Modo Manual */}
        <motion.button
          whileHover={{ scale: 1.03, y: -4 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelectMode("manual")}
          className="card-gradient border border-border rounded-xl p-8 text-center hover:border-primary/50 transition-all group focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <div className="flex items-center justify-center gap-2 mb-5">
            <div className="w-12 h-12 rounded-lg bg-sport/20 flex items-center justify-center">
              <Hand className="h-6 w-6 text-sport" />
            </div>
          </div>
          <h3 className="text-lg font-display font-bold text-foreground mb-2">
            Modo Manual
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Escolha o campeonato, o jogo, selecione a foto do jogador e personalize sua arte nos mínimos detalhes.
          </p>
        </motion.button>

        {/* Modo Automático */}
        <motion.button
          whileHover={{ scale: 1.03, y: -4 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => onSelectMode("auto")}
          className="card-gradient border border-border rounded-xl p-8 text-center hover:border-primary/50 transition-all group focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <div className="flex items-center justify-center gap-2 mb-5">
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
              <Zap className="h-6 w-6 text-primary" />
            </div>
          </div>
          <h3 className="text-lg font-display font-bold text-foreground mb-2">
            Modo Automático
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Selecione um ou mais temas e o sistema criará as artes de todos os jogos do dia automaticamente para você.
          </p>
        </motion.button>
      </div>
    </div>
  );
};

export default ModeSelection;
