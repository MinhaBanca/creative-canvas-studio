import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Fighter } from "./ufcData";

interface Props {
  style: string;
  fighterA?: Fighter;
  fighterB?: Fighter;
  eventName: string;
  slogan: string;
  time: string;
  channel: string;
  activeEffects: string[];
}

const styleMap: Record<string, { bg: string; accent: string; glow: string }> = {
  "dark-fight": { bg: "from-black via-zinc-900 to-black", accent: "text-red-500", glow: "shadow-red-500/30" },
  "neon-fight": { bg: "from-black via-purple-950 to-black", accent: "text-cyan-400", glow: "shadow-cyan-400/30" },
  "blood": { bg: "from-red-950 via-black to-red-950", accent: "text-red-400", glow: "shadow-red-600/40" },
  "gold": { bg: "from-yellow-950 via-black to-yellow-950", accent: "text-yellow-400", glow: "shadow-yellow-500/30" },
};

const UFCBannerPreview = ({ style, fighterA, fighterB, eventName, slogan, time, channel, activeEffects }: Props) => {
  const s = styleMap[style] || styleMap["dark-fight"];

  return (
    <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        👁️ Preview em Tempo Real
      </h2>
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className={`relative bg-gradient-to-br ${s.bg} min-h-[320px] flex flex-col items-center justify-center p-8`}>
            {/* Effects layer */}
            {activeEffects.includes("glow") && (
              <div className={`absolute inset-0 shadow-inner ${s.glow}`} />
            )}
            {activeEffects.includes("smoke") && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
            )}
            {activeEffects.includes("particles") && (
              <div className="absolute inset-0">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white/30 rounded-full"
                    style={{ left: `${10 + i * 7}%`, top: `${20 + (i % 4) * 18}%` }}
                    animate={{ opacity: [0.2, 0.8, 0.2], y: [-5, 5, -5] }}
                    transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
                  />
                ))}
              </div>
            )}

            {/* Content */}
            <div className="relative z-10 text-center w-full">
              {/* Event name */}
              <motion.p className={`text-xs font-bold uppercase tracking-[0.3em] ${s.accent} mb-2`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {eventName}
              </motion.p>

              {/* Fighters VS */}
              <div className="flex items-center justify-center gap-6 md:gap-12 my-6">
                {/* Fighter A */}
                <motion.div className="text-center" initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                  <div className={`text-6xl mb-2 ${activeEffects.includes("sidelight") ? "drop-shadow-[4px_0_8px_rgba(255,0,0,0.5)]" : ""}`}>
                    {fighterA?.avatar || "🥊"}
                  </div>
                  <p className="font-black text-white text-lg">{fighterA?.name || "Lutador A"}</p>
                  <p className="text-xs text-white/60">{fighterA ? `${fighterA.flag} ${fighterA.record}` : ""}</p>
                </motion.div>

                {/* VS */}
                <motion.div
                  className="relative"
                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                >
                  <span className={`text-4xl md:text-5xl font-black ${s.accent} drop-shadow-lg`}>VS</span>
                  {activeEffects.includes("shadow") && (
                    <div className={`absolute -inset-4 ${s.glow} blur-xl opacity-40 rounded-full`} />
                  )}
                </motion.div>

                {/* Fighter B */}
                <motion.div className="text-center" initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
                  <div className={`text-6xl mb-2 ${activeEffects.includes("sidelight") ? "drop-shadow-[-4px_0_8px_rgba(0,100,255,0.5)]" : ""}`}>
                    {fighterB?.avatar || "🥊"}
                  </div>
                  <p className="font-black text-white text-lg">{fighterB?.name || "Lutador B"}</p>
                  <p className="text-xs text-white/60">{fighterB ? `${fighterB.flag} ${fighterB.record}` : ""}</p>
                </motion.div>
              </div>

              {/* Slogan */}
              {slogan && (
                <motion.p className="text-white/90 text-lg font-bold italic mt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                  "{slogan}"
                </motion.p>
              )}

              {/* Time & Channel */}
              <div className="flex items-center justify-center gap-4 mt-4 text-white/60 text-sm">
                {time && <span>🕐 {time}</span>}
                {channel && <span>📺 {channel}</span>}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.section>
  );
};

export default UFCBannerPreview;
