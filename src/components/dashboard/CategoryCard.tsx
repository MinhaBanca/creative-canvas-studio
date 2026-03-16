import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  count?: number;
  href: string;
  glowClass?: string;
  accentColor?: string;
}

const CategoryCard = ({
  icon: Icon,
  title,
  description,
  count,
  href,
  glowClass = "glow-primary",
  accentColor = "text-primary",
}: CategoryCardProps) => {
  return (
    <Link to={href}>
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        whileTap={{ scale: 0.98 }}
        className={`card-gradient border border-border rounded-xl p-6 cursor-pointer transition-shadow hover:${glowClass} group`}
      >
        <div
          className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-secondary mb-4`}
        >
          <Icon className={`h-6 w-6 ${accentColor}`} />
        </div>

        <h3 className="text-lg font-display font-semibold text-foreground mb-1">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground mb-3">{description}</p>

        {count !== undefined && (
          <div className="flex items-center gap-1.5">
            <div className={`w-2 h-2 rounded-full bg-primary animate-pulse-glow`} />
            <span className="text-xs text-muted-foreground">
              {count} templates disponíveis
            </span>
          </div>
        )}
      </motion.div>
    </Link>
  );
};

export default CategoryCard;
