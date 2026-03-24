import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
  eventName: string;
  slogan: string;
  time: string;
  channel: string;
  onChange: (field: string, value: string) => void;
}

const BannerTextConfig = ({ eventName, slogan, time, channel, onChange }: Props) => (
  <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
      ✍️ Texto do Banner
    </h2>
    <Card className="bg-card">
      <CardContent className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Nome do Evento</Label>
          <Input value={eventName} onChange={(e) => onChange("eventName", e.target.value)} className="bg-secondary" />
        </div>
        <div className="space-y-2">
          <Label>Slogan</Label>
          <Input value={slogan} onChange={(e) => onChange("slogan", e.target.value)} placeholder="Hoje tem guerra!" className="bg-secondary" />
        </div>
        <div className="space-y-2">
          <Label>Horário</Label>
          <Input value={time} onChange={(e) => onChange("time", e.target.value)} placeholder="23:00" className="bg-secondary" />
        </div>
        <div className="space-y-2">
          <Label>Canal de Transmissão</Label>
          <Input value={channel} onChange={(e) => onChange("channel", e.target.value)} placeholder="ESPN / Combate" className="bg-secondary" />
        </div>
      </CardContent>
    </Card>
  </motion.section>
);

export default BannerTextConfig;
