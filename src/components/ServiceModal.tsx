import { useEffect } from "react";
import type { Service } from "@/data/ministries";

interface ServiceModalProps {
  service: Service | null;
  onClose: () => void;
}

const ServiceModal = ({ service, onClose }: ServiceModalProps) => {
  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (service) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [service]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!service) return null;
  const s = service;

  return (
    <div
      className={`modal-overlay ${s ? "open" : ""}`}
      onClick={handleOverlayClick}
    >
      <div className="modal">
        <div className="modal-header-section">
          <h2>{s.icon} {s.title}</h2>
          <p className="m-ministry">🏛️ {s.ministryName || ""}</p>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="info-grid">
            <div className="info-box">
              <div className="ib-val">{s.time}</div>
              <div className="ib-lbl">⏱️ প্রক্রিয়াকাল</div>
            </div>
            <div className="info-box">
              <div className="ib-val">{s.cost}</div>
              <div className="ib-lbl">💰 খরচ</div>
            </div>
          </div>

          <div className="section-block">
            <h4>📝 প্রয়োজনীয় কাগজপত্র</h4>
            <ul className="doc-list">
              {s.documents.map((d, i) => <li key={i}>{d}</li>)}
            </ul>
          </div>

          <div className="section-block">
            <h4>🔢 আবেদন প্রক্রিয়া</h4>
            <ol className="step-list">
              {s.steps.map((st, i) => <li key={i}>{st}</li>)}
            </ol>
          </div>

          <div className="section-block">
            <h4>💵 ফি তালিকা</h4>
            <table className="fee-table">
              <thead>
                <tr><th>সেবার ধরন</th><th>ফি</th></tr>
              </thead>
              <tbody>
                {s.fees.map((f, i) => (
                  <tr key={i}>
                    <td>{f.item}</td>
                    <td><strong>{f.cost}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="note-box">
            💡 <div><strong>গুরুত্বপূর্ণ নোট:</strong> {s.note}</div>
          </div>

          <a href={s.link} target="_blank" rel="noopener noreferrer">
            <button className="apply-btn">🌐 অফিসিয়াল ওয়েবসাইটে যান →</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ServiceModal;
