import { Link } from "react-router-dom";
import { Zap, Menu } from "lucide-react";
import { useState } from "react";

const navItems = [
  { label: "Dashboard", path: "/" },
  { label: "Esportes", path: "/sports" },
  { label: "Filmes", path: "/entertainment" },
  { label: "Banners", path: "/banners" },
];

export const MobileHeader = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden border-b border-border bg-sidebar">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2">
          <Zap className="h-6 w-6 text-primary" />
          <span className="text-lg font-display font-bold text-foreground">ContentGen</span>
        </div>
        <button onClick={() => setOpen(!open)} className="p-2 text-muted-foreground">
          <Menu className="h-5 w-5" />
        </button>
      </div>
      {open && (
        <nav className="px-4 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
};
