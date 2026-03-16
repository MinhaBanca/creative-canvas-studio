import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface ActionCardProps {
  icon: LucideIcon;
  label: string;
  action: string;
  href: string;
  iconBg: string;
  iconColor: string;
}

const ActionCard = ({ icon: Icon, label, action, href, iconBg, iconColor }: ActionCardProps) => {
  return (
    <Link to={href}>
      <motion.div
        whileHover={{ scale: 1.02, y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="card-gradient border border-border rounded-xl p-5 cursor-pointer hover:border-primary/30 transition-colors flex items-start justify-between gap-3 h-full"
      >
        <div className="flex flex-col gap-2">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-base font-display font-bold text-foreground">{action}</p>
        </div>
        <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${iconBg}`}>
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>
      </motion.div>
    </Link>
  );
};

export default ActionCard;
