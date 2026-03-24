import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Check, MapPin, Calendar } from "lucide-react";
import { UFCEvent } from "./ufcData";

interface Props {
  events: UFCEvent[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}

const typeBadge: Record<string, string> = {
  ppv: "PPV",
  "fight-night": "Fight Night",
  apex: "Apex",
};

const EventSelector = ({ events, selectedId, onSelect }: Props) => (
  <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
      📅 Seleção de Evento
    </h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {events.map((ev) => (
        <Card
          key={ev.id}
          className={`cursor-pointer transition-all hover:scale-[1.02] ${
            selectedId === ev.id
              ? "ring-2 ring-destructive bg-destructive/10"
              : "bg-card hover:bg-secondary/50"
          }`}
          onClick={() => onSelect(ev.id)}
        >
          <CardContent className="p-5 flex items-center gap-4">
            <div className="text-4xl">🥊</div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-bold">{ev.name}</h3>
                <span className="text-xs bg-destructive/20 text-destructive px-2 py-0.5 rounded-full font-medium">
                  {typeBadge[ev.type]}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{ev.date}</span>
                <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{ev.location}</span>
              </div>
            </div>
            {selectedId === ev.id && <Check className="h-5 w-5 text-destructive" />}
          </CardContent>
        </Card>
      ))}
    </div>
  </motion.section>
);

export default EventSelector;
