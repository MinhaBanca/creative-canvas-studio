import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Zap,
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
  Image,
  Send,
  Star,
  Link2,
  Users,
} from "lucide-react";

const navItems: { icon: any; label: string; path: string; highlight?: boolean }[] = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: MessageCircle, label: "Configurar WhatsApp", path: "/whatsapp" },
  { icon: CreditCard, label: "Mercado Pago", path: "/pagamento" },
  { icon: Video, label: "Gerar Vídeo", path: "/gerar-video" },
  { icon: Megaphone, label: "Vídeo Divulgação", path: "/video-divulgacao" },
  { icon: Trophy, label: "Gerar Futebol", path: "/gerar-futebol" },
  { icon: BookOpen, label: "Guia Futebol", path: "/guia-futebol" },
  { icon: Dribbble, label: "Gerar NBA", path: "/gerar-nba" },
  { icon: Flame, label: "Gerar UFC", path: "/gerar-ufc" },
  { icon: Globe, label: "Todos Esportes", path: "/todos-esportes" },
  { icon: Film, label: "Gerar Banner Filme", path: "/gerar-banner-filme" },
  { icon: Tv, label: "Gerar Banner Séries", path: "/gerar-banner-series" },
  { icon: Image, label: "Logo", path: "/logo", highlight: true },
  { icon: Send, label: "Meu Telegram", path: "/telegram" },
  { icon: Star, label: "Comprar Créditos", path: "/comprar-creditos", highlight: true },
  { icon: Link2, label: "Link de Indicação", path: "/indicacao" },
  { icon: Users, label: "Revendas", path: "/revendas" },
];

export const MobileHeader = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="lg:hidden">
      <header className="flex items-center justify-between px-4 py-3 border-b border-border bg-sidebar">
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          <span className="text-lg font-display font-bold">
            <span className="text-primary">GERADOR</span>
            <span className="text-accent">PRO</span>
          </span>
        </div>
        <button onClick={() => setOpen(!open)} className="text-foreground p-1">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </header>

      {open && (
        <nav className="bg-sidebar border-b border-border px-3 py-2 space-y-0.5 max-h-[70vh] overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : item.highlight
                      ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:from-purple-500 hover:to-purple-400"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
          <Link
            to="/sair"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Link>
        </nav>
      )}
    </div>
  );
};