import DashboardLayout from "@/components/layout/DashboardLayout";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Download, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockTemplates = [
  { id: "1", name: "Clássico", preview: "⚽" },
  { id: "2", name: "Moderno", preview: "🏀" },
  { id: "3", name: "Minimalista", preview: "🎬" },
  { id: "4", name: "Neon", preview: "✨" },
  { id: "5", name: "Bold", preview: "🔥" },
  { id: "6", name: "Elegante", preview: "💎" },
];

const GeneratePage = () => {
  const { category, type } = useParams();

  return (
    <DashboardLayout>
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Link>
        <h1 className="text-2xl font-display font-bold text-foreground capitalize">
          {type || category} — Escolha um template
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Selecione o estilo e personalize seu conteúdo
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {mockTemplates.map((tpl) => (
          <motion.div
            key={tpl.id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="card-gradient border border-border rounded-xl p-6 cursor-pointer hover:border-primary/40 transition-colors text-center group"
          >
            <div className="text-4xl mb-3">{tpl.preview}</div>
            <p className="text-sm font-medium text-foreground">{tpl.name}</p>
          </motion.div>
        ))}
      </div>

      <div className="card-gradient border border-border rounded-xl p-8 text-center">
        <Wand2 className="h-10 w-10 text-primary mx-auto mb-3" />
        <h3 className="text-lg font-display font-semibold text-foreground mb-2">
          Pronto para gerar?
        </h3>
        <p className="text-sm text-muted-foreground mb-5 max-w-md mx-auto">
          Selecione um template acima, escolha os dados e gere seu conteúdo em segundos.
        </p>
        <div className="flex gap-3 justify-center">
          <Button size="lg">
            <Wand2 className="h-4 w-4 mr-2" />
            Gerar Banner
          </Button>
          <Button variant="outline" size="lg">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default GeneratePage;
