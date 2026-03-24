const SiteFooter = () => (
  <footer className="seba-footer">
    <div className="footer-inner">
      <div className="footer-grid">
        <div className="footer-brand">
          <h3>🏛️ সেবা বাংলাদেশ</h3>
          <p>
            বাংলাদেশ সরকারের সকল সেবার তথ্য সহজ ভাষায় নাগরিকদের কাছে পৌঁছে দেওয়াই আমাদের
            লক্ষ্য। এটি কোনো সরকারি ওয়েবসাইট নয়, তবে সরকারি তথ্য অবলম্বনে তৈরি।
          </p>
        </div>
        <div className="footer-col">
          <h4>বিভাগসমূহ</h4>
          <ul>
            <li>নাগরিক সেবা</li>
            <li>ভূমি সেবা</li>
            <li>স্বাস্থ্য সেবা</li>
            <li>শিক্ষা সেবা</li>
            <li>ব্যবসায়িক সেবা</li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>দরকারি লিংক</h4>
          <ul>
            <li>জাতীয় তথ্য বাতায়ন</li>
            <li>a2i – এটুআই</li>
            <li>BRTA অনলাইন</li>
            <li>ভূমি মন্ত্রণালয়</li>
            <li>ই-পাসপোর্ট</li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© ২০২৫ সেবা বাংলাদেশ | তথ্য সূত্র: বাংলাদেশ সরকার</span>
        <div>
          <a href="#">গোপনীয়তা নীতি</a>
          <a href="#">শর্তাবলি</a>
          <a href="#">যোগাযোগ</a>
        </div>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
