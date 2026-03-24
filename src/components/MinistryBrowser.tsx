import ministries from "@/data/ministries";

interface MinistryBrowserProps {
  activeMinistry: string;
  onMinistryClick: (id: string) => void;
}

const MinistryBrowser = ({ activeMinistry, onMinistryClick }: MinistryBrowserProps) => (
  <div className="ministry-browser">
    <div className="section-header">
      <h2 className="section-title">মন্ত্রণালয় ভিত্তিক ব্রাউজ</h2>
    </div>
    <div className="ministry-grid">
      {ministries.map((m) => (
        <div
          key={m.id}
          className={`ministry-card ${activeMinistry === m.id ? "active" : ""}`}
          onClick={() => onMinistryClick(activeMinistry === m.id ? "all" : m.id)}
        >
          <span className="m-icon">{m.icon}</span>
          <div className="m-info">
            <h4>{m.short}</h4>
            <p className="m-count">{m.services.length}টি সেবা</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default MinistryBrowser;
