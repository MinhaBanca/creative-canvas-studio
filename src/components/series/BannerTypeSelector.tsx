import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Image, Play, Users, Calendar, Check, Layers } from "lucide-react";

const iconMap = { Image, Play, Users, Calendar };

interface BannerTypeSelectorProps {
  value: string | null;
  onChange: (type: string) => void;
  bannerTypes: { id: string; title: string; desc: string; icon: string; premium?: boolean }[];
}

const BannerTypeSelector = ({ value, onChange, bannerTypes }: BannerTypeSelectorProps) => (
  <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
      <Layers className="h-5 w-5 text-primary" /> Tipo de Banner
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {bannerTypes.map((type) => {
        const Icon = iconMap[type.icon as keyof typeof iconMap] || Image;
        return (
          <Card
            key={type.id}
            className={`cursor-pointer transition-all hover:scale-[1.03] ${
              value === type.id
                ? "ring-2 ring-[hsl(var(--glow-entertainment))] bg-[hsl(var(--glow-entertainment))/0.1]"
                : "bg-card hover:bg-secondary/50"
            }`}
            onClick={() => onChange(type.id)}
          >
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center bg-gradient-to-br from-[hsl(var(--glow-entertainment))] to-[hsl(var(--glow-entertainment)/0.5)]">
                <Icon className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="font-semibold text-sm">{type.title}</h3>
              <p className="text-xs text-muted-foreground mt-1">{type.desc}</p>
              {type.premium && (
                <Badge className="mt-2 bg-accent/20 text-accent border-accent/30 text-xs">Premium</Badge>
              )}
              {value === type.id && (
                <Check className="h-4 w-4 text-[hsl(var(--glow-entertainment))] mx-auto mt-2" />
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  </motion.section>
);

export default BannerTypeSelector;
