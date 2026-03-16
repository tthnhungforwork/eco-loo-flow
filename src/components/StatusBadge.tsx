const variants: Record<string, string> = {
  new: "bg-eco-blue-light text-secondary",
  processing: "bg-accent text-accent-foreground",
  done: "bg-eco-green-light text-primary",
  pending: "bg-muted text-muted-foreground",
};

const StatusBadge = ({ status, label }: { status: string; label: string }) => (
  <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[status] || variants.pending}`}>
    {label}
  </span>
);

export default StatusBadge;
