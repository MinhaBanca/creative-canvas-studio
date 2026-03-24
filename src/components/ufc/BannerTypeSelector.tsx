import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";
import { bannerTypes } from "./ufcData";

interface Props {
  value: string | null;
  onChange: (id: string) => void;
}

const BannerTypeSelector = ({ value, onChange }: Props) => (
  <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
      🥊 Tipo de Banner
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {bannerTypes.map((t) => (
        <Card
          key={t.id}
          className={`cursor-pointer transition-all hover:scale-[1.03] ${
            value === t.id
              ? "ring-2 ring-destructive bg-destructive/10"
              : "bg-card hover:bg-secondary/50"
          }`}
          onClick={() => onChange(t.id)}
        >
          <CardContent className="p-5 text-center">
            <div className="text-4xl mb-3">{t.icon}</div>
            <h3 className="font-bold text-sm">{t.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{t.desc}</p>
            {value === t.id && <Check className="h-4 w-4 text-destructive mx-auto mt-2" />}
          </CardContent>
        </Card>
      ))}
    </div>
  </motion.section>
);

export default BannerTypeSelector;
