import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { visualStyles } from "./ufcData";

interface Props {
  value: string;
  onChange: (id: string) => void;
}

const StyleSelector = ({ value, onChange }: Props) => (
  <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
      🎨 Estilo Visual
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {visualStyles.map((s) => (
        <Card
          key={s.id}
          className={`cursor-pointer transition-all hover:scale-[1.03] ${
            value === s.id
              ? "ring-2 ring-destructive bg-destructive/10"
              : "bg-card hover:bg-secondary/50"
          }`}
          onClick={() => onChange(s.id)}
        >
          <CardContent className="p-4 text-center">
            <div className="text-3xl mb-2">{s.emoji}</div>
            <h3 className="font-bold text-sm">{s.name}</h3>
            <p className="text-xs text-muted-foreground mt-1">{s.desc}</p>
            {value === s.id && <Check className="h-4 w-4 text-destructive mx-auto mt-2" />}
          </CardContent>
        </Card>
      ))}
    </div>
  </motion.section>
);

export default StyleSelector;
