import DashboardLayout from "@/components/layout/DashboardLayout";
import ActionCard from "@/components/dashboard/ActionCard";
import { motion } from "framer-motion";
import {
  MessageCircle,
  Trophy,
  Video,
  Film,
  Tv,
  Image,
  Send,
  Settings,
  LogOut,
  CalendarDays,
} from "lucide-react";

const mainActions = [
  {
    icon: MessageCircle,
    label: "Suporte Revendedor",
    action: "Chamar no WhatsApp",
    href: "/whatsapp",
    iconBg: "bg-green-500/20",
    iconColor: "text-green-400",
  },
  {
    icon: Trophy,
    label: "Banner Futebol",
    action: "Criar Arte",
    href: "/gerar-futebol",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: Video,
    label: "Gerador de Vídeo",
    action: "Criar Vídeo",
    href: "/gerar-video",
    iconBg: "bg-red-500/20",
    iconColor: "text-red-400",
  },
  {
    icon: Film,
    label: "Banner Filmes",
    action: "Montar Banner",
    href: "/gerar-banner-filme",
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-400",
  },
  {
    icon: Tv,
    label: "Banner Séries/Novelas",
    action: "Criar Divulgação",
    href: "/gerar-banner-series",
    iconBg: "bg-orange-500/20",
    iconColor: "text-orange-400",
  },
];

const secondaryActions = [
  {
    icon: Image,
    label: "Logo",
    action: "Configurar",
    href: "/logo",
    iconBg: "bg-sky-500/20",
    iconColor: "text-sky-400",
  },
  {
    icon: Send,
    label: "Canal Telegram",
    action: "Entrar",
    href: "/telegram",
    iconBg: "bg-blue-400/20",
    iconColor: "text-blue-300",
  },
  {
    icon: Settings,
    label: "Trocar Senha",
    action: "Configurar",
    href: "/settings",
    iconBg: "bg-yellow-500/20",
    iconColor: "text-yellow-400",
  },
  {
    icon: LogOut,
    label: "Sair",
    action: "Deslogar",
    href: "/sair",
    iconBg: "bg-red-500/20",
    iconColor: "text-red-400",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const Index = () => {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-foreground mb-1">
            Bem-vindo, Usuário!
          </h1>
          <p className="text-muted-foreground text-sm">
            O que você gostaria de fazer hoje?
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-primary/15 border border-primary/30 text-primary px-4 py-2 rounded-lg text-sm font-medium">
          <CalendarDays className="h-4 w-4" />
          Vence em: 17/01/2026
        </div>
      </div>

      {/* Main Actions */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6"
      >
        {mainActions.map((card) => (
          <motion.div key={card.label} variants={item}>
            <ActionCard {...card} />
          </motion.div>
        ))}
      </motion.div>

      {/* Secondary Actions */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {secondaryActions.map((card) => (
          <motion.div key={card.label} variants={item}>
            <ActionCard {...card} />
          </motion.div>
        ))}
      </motion.div>
    </DashboardLayout>
  );
};

export default Index;
