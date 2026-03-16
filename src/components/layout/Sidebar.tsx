import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Image,
  Film,
  Trophy,
  Layers,
  Video,
  Settings,
  Zap,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Trophy, label: "Esportes", path: "/sports" },
  { icon: Film, label: "Filmes & Séries", path: "/entertainment" },
  { icon: Image, label: "Banners", path: "/banners" },
  { icon: Layers, label: "Carrossel", path: "/carousel" },
  { icon: Video, label: "Vídeos", path: "/videos" },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-sidebar">
      <div className="flex items-center gap-2 px-6 py-5 border-b border-border">
        <Zap className="h-7 w-7 text-primary" />
        <span className="text-xl font-display font-bold text-foreground">
          ContentGen
        </span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-primary/10 text-primary glow-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Link
          to="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
        >
          <Settings className="h-5 w-5" />
          Configurações
        </Link>
      </div>
    </aside>
  );
};
