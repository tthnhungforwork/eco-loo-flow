const variants: Record<string, string> = {
  new: "bg-eco-blue-light text-secondary border border-secondary/20",
  processing: "bg-accent text-accent-foreground border border-primary/20",
  done: "bg-eco-green-light text-primary border border-primary/20",
  pending: "bg-muted text-muted-foreground border border-border",
};

const StatusBadge = ({ status, label }: { status: string; label: string }) => (
  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide ${variants[status] || variants.pending}`}>
    <span className={`w-1.5 h-1.5 rounded-full ${
      status === "new" ? "bg-secondary" : status === "processing" ? "bg-primary animate-pulse-soft" : status === "done" ? "bg-primary" : "bg-muted-foreground"
    }`} />
    {label}
  </span>
);

export default StatusBadge;
