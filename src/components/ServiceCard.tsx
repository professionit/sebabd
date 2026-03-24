import { memo } from "react";
import type { Service } from "@/data/ministries";

interface ServiceCardProps {
  service: Service;
  onClick: () => void;
}

/**
 * Memoized service card for performance with large lists.
 */
const ServiceCard = memo(({ service: s, onClick }: ServiceCardProps) => {
  const onlineClass = s.online.includes("অনলাইন") && s.online.includes("অফলাইন")
    ? "pill-both"
    : s.online.includes("অনলাইন")
    ? "pill-online"
    : "pill-offline";

  return (
    <div className="service-card" onClick={onClick}>
      {s.free && <div className="free-ribbon">বিনামূল্যে</div>}
      <div className="card-top">
        <div className="card-icon" style={{ background: s.iconBg }}>
          {s.icon}
        </div>
        <div className="card-info">
          <h3>{s.title}</h3>
          <p className="ministry">🏛️ {s.ministryName || ""}</p>
          {s.ministryShort && (
            <span className="ministry-badge">
              {s.ministryIcon} {s.ministryShort}
            </span>
          )}
        </div>
      </div>
      <div className="card-body">
        <div className="meta-row">
          <span className="meta-badge badge-time">⏱️ {s.time}</span>
          <span className={`meta-badge ${s.free ? "badge-free" : "badge-cost"}`}>
            💰 {s.cost}
          </span>
        </div>
      </div>
      <div className="card-footer">
        <span className={`status-pill ${onlineClass}`}>{s.online}</span>
        <span className="details-btn">বিস্তারিত →</span>
      </div>
    </div>
  );
});

ServiceCard.displayName = "ServiceCard";

export default ServiceCard;
