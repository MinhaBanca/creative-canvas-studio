import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { ArrowLeft, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import ModeSelection from "@/components/futebol/ModeSelection";
import AutoMode from "@/components/futebol/AutoMode";
import ManualMode from "@/components/futebol/ManualMode";

const GerarFutebolPage = () => {
  const [mode, setMode] = useState<"select" | "manual" | "auto">("select");

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
        <h1 className="text-2xl font-display font-bold text-foreground">
          <Trophy className="inline h-6 w-6 text-primary mr-2 -mt-1" />
          Gerador de Futebol
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Crie artes incríveis e profissionais em poucos cliques.
        </p>
      </div>

      {mode === "select" && <ModeSelection onSelectMode={(m) => setMode(m)} />}
      {mode === "auto" && <AutoMode onBack={() => setMode("select")} />}
      {mode === "manual" && <ManualMode onBack={() => setMode("select")} />}
    </DashboardLayout>
  );
};

export default GerarFutebolPage;
