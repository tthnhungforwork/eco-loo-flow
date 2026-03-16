import { motion } from "framer-motion";

const variants: Record<string, { bg: string; text: string; dot: string }> = {
  new: { bg: "bg-secondary/10", text: "text-secondary", dot: "bg-secondary" },
  processing: { bg: "bg-primary/10", text: "text-primary", dot: "bg-primary animate-pulse-soft" },
  done: { bg: "bg-eco-green-light", text: "text-primary", dot: "bg-primary" },
  cancelled: { bg: "bg-destructive/10", text: "text-destructive", dot: "bg-destructive" },
  pending: { bg: "bg-muted", text: "text-muted-foreground", dot: "bg-muted-foreground" },
};

const StatusBadge = ({ status, label }: { status: string; label: string }) => {
  const v = variants[status] || variants.pending;
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${v.bg} ${v.text}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${v.dot}`} />
      {label}
    </motion.span>
  );
};

export default StatusBadge;
