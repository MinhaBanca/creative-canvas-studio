import DashboardLayout from "@/components/layout/DashboardLayout";
import CategoryCard from "@/components/dashboard/CategoryCard";
import StatsCard from "@/components/dashboard/StatsCard";
import { motion } from "framer-motion";
import {
  Trophy,
  Swords,
  Dumbbell,
  Film,
  Tv,
  Image,
  Layers,
  Video,
} from "lucide-react";

const categories = [
  {
    icon: Trophy,
    title: "Futebol",
    description: "Banners de jogos, escalações e resultados",
    count: 12,
    href: "/sports/football",
    accentColor: "text-primary",
  },
  {
    icon: Dumbbell,
    title: "NBA",
    description: "Arte para jogos de basquete e stats",
    count: 8,
    href: "/sports/nba",
    accentColor: "text-sport",
  },
  {
    icon: Swords,
    title: "UFC / MMA",
    description: "Cards de luta, pesagem e resultados",
    count: 6,
    href: "/sports/ufc",
    accentColor: "text-destructive",
  },
  {
    icon: Film,
    title: "Filmes",
    description: "Banners de lançamentos e reviews",
    count: 10,
    href: "/entertainment/movies",
    accentColor: "text-entertainment",
  },
  {
    icon: Tv,
    title: "Séries",
    description: "Arte para episódios e temporadas",
    count: 9,
    href: "/entertainment/series",
    accentColor: "text-accent",
  },
  {
    icon: Layers,
    title: "Carrossel",
    description: "Posts multi-slide para Instagram",
    count: 15,
    href: "/carousel",
    accentColor: "text-primary",
  },
  {
    icon: Video,
    title: "Vídeos",
    description: "Reels e stories animados",
    count: 5,
    href: "/videos",
    accentColor: "text-sport",
  },
  {
    icon: Image,
    title: "Stories",
    description: "Conteúdo vertical para stories",
    count: 7,
    href: "/banners/stories",
    accentColor: "text-accent",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Index = () => {
  return (
    <DashboardLayout>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-display font-bold text-foreground mb-1">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Gere conteúdo profissional em segundos
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatsCard label="Banners Gerados" value="1,247" change="+12% esta semana" positive />
        <StatsCard label="Templates" value="72" />
        <StatsCard label="Jogos Hoje" value="14" change="Ao vivo" positive />
        <StatsCard label="Downloads" value="856" change="+8% este mês" positive />
      </div>

      {/* Categories */}
      <div className="mb-6">
        <h2 className="text-xl font-display font-semibold text-foreground mb-1">
          Categorias
        </h2>
        <p className="text-sm text-muted-foreground">
          Escolha uma categoria para começar
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {categories.map((cat) => (
          <motion.div key={cat.title} variants={item}>
            <CategoryCard {...cat} />
          </motion.div>
        ))}
      </motion.div>
    </DashboardLayout>
  );
};

export default Index;
