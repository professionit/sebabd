import { useState, useRef, useEffect } from "react";
import ministries from "@/data/ministries";
import { CATEGORY_TABS } from "@/data/ministries";

interface SiteHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  activeMinistry: string;
  onMinistryChange: (id: string) => void;
}

const SiteHeader = ({
  searchQuery,
  onSearchChange,
  activeCategory,
  onCategoryChange,
  activeMinistry,
  onMinistryChange,
}: SiteHeaderProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const activeMinistryLabel =
    activeMinistry === "all"
      ? "সব মন্ত্রণালয়"
      : ministries.find((m) => m.id === activeMinistry)?.short || "সব মন্ত্রণালয়";

  return (
    <header className="seba-header">
      <div className="header-main">
        <div className="logo-wrap">
          <div className="logo-icon">🏛️</div>
          <div className="logo-text">
            <h1>সেবা বাংলাদেশ</h1>
            <p>সরকারি সেবার তথ্যভান্ডার — Seba Bangladesh</p>
          </div>
        </div>

        {/* Ministry Dropdown */}
        <div className="ministry-dropdown" ref={dropdownRef}>
          <button
            className="ministry-dropdown-btn"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            🏛️ {activeMinistryLabel} ▾
          </button>
          {dropdownOpen && (
            <div className="ministry-dropdown-menu">
              <button
                className={activeMinistry === "all" ? "active" : ""}
                onClick={() => {
                  onMinistryChange("all");
                  setDropdownOpen(false);
                }}
              >
                🏠 সব মন্ত্রণালয়
              </button>
              {ministries.map((m) => (
                <button
                  key={m.id}
                  className={activeMinistry === m.id ? "active" : ""}
                  onClick={() => {
                    onMinistryChange(m.id);
                    setDropdownOpen(false);
                  }}
                >
                  {m.icon} {m.short}
                  <span className="ministry-count">{m.services.length}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search */}
        <div className="header-search">
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="সেবার নাম লিখুন... যেমন: পাসপোর্ট, জন্ম নিবন্ধন"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            <button type="button">🔍</button>
          </form>
        </div>
      </div>

      {/* Category Nav Tabs */}
      <nav className="nav-tabs">
        <div className="nav-inner">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.id}
              className={`nav-tab ${activeCategory === tab.id ? "active" : ""}`}
              onClick={() => onCategoryChange(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span> {tab.label}
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default SiteHeader;
