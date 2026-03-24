import { useState, useMemo, useCallback } from "react";
import TopBar from "@/components/TopBar";
import SiteHeader from "@/components/SiteHeader";
import HeroBanner from "@/components/HeroBanner";
import QuickAccess from "@/components/QuickAccess";
import MinistryBrowser from "@/components/MinistryBrowser";
import ServiceCard from "@/components/ServiceCard";
import ServiceModal from "@/components/ServiceModal";
import SiteFooter from "@/components/SiteFooter";
import { getAllServices, findServiceById } from "@/data/ministries";
import type { Service } from "@/data/ministries";

const BATCH_SIZE = 20;

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeMinistry, setActiveMinistry] = useState("all");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

  const allServices = useMemo(() => getAllServices(), []);

  // Filter services by ministry, category, and search
  const filteredServices = useMemo(() => {
    let list = allServices;

    if (activeMinistry !== "all") {
      list = list.filter((s) => s.ministryId === activeMinistry);
    }
    if (activeCategory !== "all") {
      list = list.filter((s) => s.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (s) =>
          s.title.toLowerCase().includes(q) ||
          (s.ministryName || "").toLowerCase().includes(q) ||
          (s.ministryShort || "").toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [allServices, activeMinistry, activeCategory, searchQuery]);

  // Lazy rendering: only show visibleCount items
  const visibleServices = useMemo(
    () => filteredServices.slice(0, visibleCount),
    [filteredServices, visibleCount]
  );

  const handleCategoryChange = useCallback((cat: string) => {
    setActiveCategory(cat);
    setSearchQuery("");
    setVisibleCount(BATCH_SIZE);
  }, []);

  const handleMinistryChange = useCallback((id: string) => {
    setActiveMinistry(id);
    setVisibleCount(BATCH_SIZE);
  }, []);

  const handleServiceClick = useCallback((id: string) => {
    const s = findServiceById(id);
    if (s) setSelectedService(s);
  }, []);

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => prev + BATCH_SIZE);
  }, []);

  // Active filter tags
  const hasActiveFilters = activeMinistry !== "all" || activeCategory !== "all";

  return (
    <div>
      <TopBar />
      <SiteHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        activeMinistry={activeMinistry}
        onMinistryChange={handleMinistryChange}
      />
      <HeroBanner />
      <QuickAccess onServiceClick={handleServiceClick} />

      {/* Ministry Browser Section */}
      <MinistryBrowser
        activeMinistry={activeMinistry}
        onMinistryClick={handleMinistryChange}
      />

      {/* Service List */}
      <main className="seba-main">
        <div className="section-header">
          <h2 className="section-title">সকল সরকারি সেবা</h2>
          <span style={{ fontSize: "13px", color: "hsl(var(--seba-text-3))" }}>
            {filteredServices.length}টি সেবা দেখানো হচ্ছে
          </span>
        </div>

        {/* Active filter tags */}
        {hasActiveFilters && (
          <div className="active-filters">
            {activeMinistry !== "all" && (
              <span className="filter-tag">
                🏛️ {allServices.find((s) => s.ministryId === activeMinistry)?.ministryShort}
                <button onClick={() => setActiveMinistry("all")}>✕</button>
              </span>
            )}
            {activeCategory !== "all" && (
              <span className="filter-tag">
                📁 {activeCategory}
                <button onClick={() => setActiveCategory("all")}>✕</button>
              </span>
            )}
          </div>
        )}

        {filteredServices.length === 0 ? (
          <div className="no-results">
            <div className="nr-icon">🔍</div>
            <h3>কোনো সেবা পাওয়া যায়নি</h3>
            <p>অনুগ্রহ করে অন্য কিছু খুঁজুন বা ফিল্টার পরিবর্তন করুন।</p>
          </div>
        ) : (
          <>
            <div className="service-grid">
              {visibleServices.map((s) => (
                <ServiceCard
                  key={s.id}
                  service={s}
                  onClick={() => handleServiceClick(s.id)}
                />
              ))}
            </div>

            {/* Load more button for lazy rendering */}
            {visibleCount < filteredServices.length && (
              <div style={{ textAlign: "center", marginTop: "28px" }}>
                <button
                  className="apply-btn"
                  style={{ maxWidth: "300px", margin: "0 auto" }}
                  onClick={handleLoadMore}
                >
                  আরও সেবা দেখুন ({filteredServices.length - visibleCount}টি বাকি)
                </button>
              </div>
            )}
          </>
        )}
      </main>

      <SiteFooter />

      {/* Service Detail Modal */}
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
      />
    </div>
  );
};

export default Index;
