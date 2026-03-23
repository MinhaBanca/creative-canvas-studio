import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tv, Drama, Check } from "lucide-react";

interface ContentTypeSelectorProps {
  value: "serie" | "novela" | null;
  onChange: (type: "serie" | "novela") => void;
}

const options = [
  {
    id: "serie" as const,
    title: "Série",
    desc: "Netflix, streaming, temporadas",
    icon: Tv,
    emoji: "📺",
  },
  {
    id: "novela" as const,
    title: "Novela",
    desc: "Episódios diários, conteúdo popular",
    icon: Drama,
    emoji: "🎭",
  },
];

const ContentTypeSelector = ({ value, onChange }: ContentTypeSelectorProps) => (
  <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
      <Tv className="h-5 w-5 text-[hsl(var(--glow-entertainment))]" /> Tipo de Conteúdo
    </h2>
    <div className="grid grid-cols-2 gap-4">
      {options.map((opt) => (
        <Card
          key={opt.id}
          className={`cursor-pointer transition-all hover:scale-[1.03] ${
            value === opt.id
              ? "ring-2 ring-[hsl(var(--glow-entertainment))] bg-[hsl(var(--glow-entertainment))/0.1]"
              : "bg-card hover:bg-secondary/50"
          }`}
          onClick={() => onChange(opt.id)}
        >
          <CardContent className="p-6 text-center">
            <div className="text-5xl mb-3">{opt.emoji}</div>
            <h3 className="font-bold text-lg">{opt.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{opt.desc}</p>
            {value === opt.id && (
              <Check className="h-5 w-5 text-[hsl(var(--glow-entertainment))] mx-auto mt-3" />
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  </motion.section>
);

export default ContentTypeSelector;
