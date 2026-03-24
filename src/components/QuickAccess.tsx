import { POPULAR_SERVICE_IDS, findServiceById } from "@/data/ministries";

interface QuickAccessProps {
  onServiceClick: (id: string) => void;
}

const QuickAccess = ({ onServiceClick }: QuickAccessProps) => {
  const popularServices = POPULAR_SERVICE_IDS
    .map(findServiceById)
    .filter(Boolean);

  return (
    <div className="quick-access">
      <div className="quick-inner">
        <p className="quick-title">⚡ জনপ্রিয় সেবা</p>
        <div className="quick-grid">
          {popularServices.map((s) =>
            s ? (
              <div
                key={s.id}
                className="quick-chip"
                onClick={() => onServiceClick(s.id)}
              >
                <span className="ci">{s.icon}</span> {s.title}
              </div>
            ) : null
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickAccess;
