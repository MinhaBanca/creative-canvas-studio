import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { effects } from "./ufcData";

interface Props {
  active: string[];
  onToggle: (id: string) => void;
}

const EffectsConfig = ({ active, onToggle }: Props) => (
  <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
      ✨ Efeitos Visuais
    </h2>
    <Card className="bg-card">
      <CardContent className="p-5 space-y-4">
        {effects.map((e) => (
          <div key={e.id} className="flex items-center justify-between">
            <span className="text-sm">{e.label}</span>
            <Switch
              checked={active.includes(e.id)}
              onCheckedChange={() => onToggle(e.id)}
            />
          </div>
        ))}
      </CardContent>
    </Card>
  </motion.section>
);

export default EffectsConfig;
