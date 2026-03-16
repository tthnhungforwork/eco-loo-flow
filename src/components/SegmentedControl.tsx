interface SegmentedControlProps {
  tabs: string[];
  active: number;
  onChange: (index: number) => void;
}

const SegmentedControl = ({ tabs, active, onChange }: SegmentedControlProps) => (
  <div className="flex bg-muted rounded-lg p-1 mx-4 mb-4">
    {tabs.map((tab, i) => (
      <button
        key={tab}
        onClick={() => onChange(i)}
        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
          active === i ? "bg-card text-foreground shadow-sm" : "text-muted-foreground"
        }`}
      >
        {tab}
      </button>
    ))}
  </div>
);

export default SegmentedControl;
