import { motion } from "framer-motion";

interface SegmentedControlProps {
  tabs: string[];
  active: number;
  onChange: (index: number) => void;
}

const SegmentedControl = ({ tabs, active, onChange }: SegmentedControlProps) => (
  <div className="flex bg-muted/50 backdrop-blur-xl rounded-2xl p-1 mx-4 mb-4 relative">
    {tabs.map((tab, i) => (
      <button
        key={tab}
        onClick={() => onChange(i)}
        className={`relative flex-1 py-2.5 text-sm font-semibold rounded-xl transition-colors duration-200 z-10 ${
          active === i
            ? "text-foreground"
            : "text-muted-foreground active:scale-95"
        }`}
      >
        {active === i && (
          <motion.div
            layoutId="segment-active"
            className="absolute inset-0 bg-card rounded-xl shadow-card"
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          />
        )}
        <span className="relative z-10">{tab}</span>
      </button>
    ))}
  </div>
);

export default SegmentedControl;
