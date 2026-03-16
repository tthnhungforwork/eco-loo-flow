interface SegmentedControlProps {
  tabs: string[];
  active: number;
  onChange: (index: number) => void;
}

const SegmentedControl = ({ tabs, active, onChange }: SegmentedControlProps) => (
  <div className="flex bg-muted/60 backdrop-blur-sm rounded-2xl p-1 mx-4 mb-4">
    {tabs.map((tab, i) => (
      <button
        key={tab}
        onClick={() => onChange(i)}
        className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-300 ${
          active === i
            ? "bg-card text-foreground shadow-card"
            : "text-muted-foreground active:scale-95"
        }`}
      >
        {tab}
      </button>
    ))}
  </div>
);

export default SegmentedControl;
