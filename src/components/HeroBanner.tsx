import ministries, { getAllServices, getFreeServicesCount } from "@/data/ministries";

const HeroBanner = () => {
  const totalServices = getAllServices().length;
  const totalMinistries = ministries.length;
  const freeCount = getFreeServicesCount();

  return (
    <section className="hero">
      <div className="hero-inner">
        <h2>বাংলাদেশের সকল সরকারি সেবার তথ্য এক জায়গায়</h2>
        <p>
          কোন মন্ত্রণালয়, কী কী কাগজপত্র লাগবে, কত টাকা খরচ হবে, কতদিন লাগবে — সব তথ্য
          এখানেই পাবেন।
        </p>
        <div className="hero-stats">
          <div className="stat-box">
            <div className="num">{totalServices}+</div>
            <div className="lbl">সরকারি সেবা</div>
          </div>
          <div className="stat-box">
            <div className="num">{totalMinistries}+</div>
            <div className="lbl">মন্ত্রণালয়</div>
          </div>
          <div className="stat-box">
            <div className="num">{freeCount}+</div>
            <div className="lbl">বিনামূল্যে সেবা</div>
          </div>
          <div className="stat-box">
            <div className="num">৮</div>
            <div className="lbl">বিভাগ</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
