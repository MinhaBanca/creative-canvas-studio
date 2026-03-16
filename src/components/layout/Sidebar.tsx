import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  MessageCircle,
  CreditCard,
  Video,
  Megaphone,
  Trophy,
  BookOpen,
  Dribbble,
  Flame,
  Globe,
  Film,
  Tv,
  LogOut,
  Zap,
  Image,
  Send,
  Star,
  Link2,
  Users,
} from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: MessageCircle, label: "Configurar WhatsApp", path: "/whatsapp" },
  { icon: CreditCard, label: "Mercado Pago", path: "/pagamento", badge: "EM BREVE" },
  { icon: Video, label: "Gerar Vídeo", path: "/gerar-video" },
  { icon: Megaphone, label: "Vídeo Divulgação", path: "/video-divulgacao" },
  { icon: Trophy, label: "Gerar Futebol", path: "/gerar-futebol" },
  { icon: BookOpen, label: "Guia Futebol", path: "/guia-futebol" },
  { icon: Dribbble, label: "Gerar NBA", path: "/gerar-nba" },
  { icon: Flame, label: "Gerar UFC", path: "/gerar-ufc" },
  { icon: Globe, label: "Todos Esportes", path: "/todos-esportes" },
  { icon: Film, label: "Gerar Banner Filme", path: "/gerar-banner-filme" },
  { icon: Tv, label: "Gerar Banner Séries/Novelas", path: "/gerar-banner-series" },
  { icon: Image, label: "Logo", path: "/logo", highlight: true },
  { icon: Send, label: "Meu Telegram", path: "/telegram" },
  { icon: Star, label: "Comprar Créditos", path: "/comprar-creditos", highlight: true },
  { icon: Link2, label: "Link de Indicação", path: "/indicacao" },
  { icon: Users, label: "Revendas", path: "/revendas" },
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-sidebar flex-shrink-0">
      <div className="flex items-center gap-2 px-6 py-5 border-b border-border">
        <Zap className="h-7 w-7 text-primary" />
        <span className="text-xl font-display font-bold">
          <span className="text-primary">GERADOR</span>
          <span className="text-accent">PRO</span>
        </span>
      </div>
      <p className="px-6 pt-2 pb-3 text-xs text-muted-foreground">Painel Administrativo</p>

      <nav className="flex-1 px-3 py-1 space-y-0.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              <span className="truncate">{item.label}</span>
              {item.badge && (
                <span className="ml-auto text-[10px] font-bold bg-destructive text-destructive-foreground px-1.5 py-0.5 rounded">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-border">
        <Link
          to="/sair"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
        >
          <LogOut className="h-4 w-4" />
          Sair
        </Link>
      </div>
    </aside>
  );
};
