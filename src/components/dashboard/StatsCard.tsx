import { motion } from "framer-motion";

interface StatsCardProps {
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
}

const StatsCard = ({ label, value, change, positive }: StatsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="card-gradient border border-border rounded-xl p-5"
    >
      <p className="text-sm text-muted-foreground mb-1">{label}</p>
      <p className="text-2xl font-display font-bold text-foreground">{value}</p>
      {change && (
        <p
          className={`text-xs mt-1 ${
            positive ? "text-primary" : "text-destructive"
          }`}
        >
          {change}
        </p>
      )}
    </motion.div>
  );
};

export default StatsCard;
