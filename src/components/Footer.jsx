import React from 'react';
import { Feather, ArrowUp } from 'lucide-react';

const Instagram = ({ size = 24, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const Facebook = ({ size = 24, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Footer = () => {
  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer-section">
      <div className="section-container footer-container">
        {/* Upper Footer */}
        <div className="footer-upper">
          <div className="footer-brand">
            <a href="#" className="footer-logo" onClick={handleScrollToTop}>
              <Feather className="logo-icon" size={20} />
              <span className="logo-text">SHAGUN ART</span>
            </a>
            <p className="footer-tagline">
              Premium custom tattoos crafted with creativity, precision, and world-class artistry.
            </p>
          </div>

          <div className="footer-links-grid">
            <div className="links-col">
              <h4>Navigation</h4>
              <a href="#about" onClick={(e) => handleLinkClick(e, 'about')}>About Studio</a>
              <a href="#services" onClick={(e) => handleLinkClick(e, 'services')}>Our Services</a>
              <a href="#gallery" onClick={(e) => handleLinkClick(e, 'gallery')}>Artwork Gallery</a>
            </div>

            <div className="links-col">
              <h4>Experience</h4>
              <a href="#why-choose" onClick={(e) => handleLinkClick(e, 'why-choose')}>Why Shagun Art</a>
              <a href="#testimonials" onClick={(e) => handleLinkClick(e, 'testimonials')}>Client Reviews</a>
              <a href="#booking" onClick={(e) => handleLinkClick(e, 'booking')}>Book Session</a>
            </div>
          </div>

          <div className="footer-socials-col">
            <h4>Social Links</h4>
            <div className="footer-socials">
              <a href="https://instagram.com/shagun_artt" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook size={18} />
              </a>
            </div>
            <button className="back-to-top-btn" onClick={handleScrollToTop} aria-label="Back to top">
              Back to Top <ArrowUp size={14} className="up-arrow" />
            </button>
          </div>
        </div>

        {/* Lower Footer */}
        <div className="footer-lower">
          <p className="copyright-text">
            &copy; {new Date().getFullYear()} SHAGUN ART. All Rights Reserved.
          </p>
          <p className="dev-text">
            Designed & Developed by <a href="#" className="dev-link">DevXnex</a>
          </p>
        </div>
      </div>

      <style>{`
        .footer-section {
          background-color: var(--bg-primary);
          border-top: 1px solid var(--border-color);
          padding-bottom: 40px;
        }

        .footer-container {
          padding-top: 80px;
          padding-bottom: 0px;
        }

        .footer-upper {
          display: grid;
          grid-template-columns: 1.2fr 1.5fr 1fr;
          gap: 60px;
          padding-bottom: 60px;
          border-bottom: 1px solid var(--border-color);
          text-align: left;
        }

        @media (max-width: 900px) {
          .footer-upper {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text-primary);
          font-weight: 600;
          letter-spacing: 0.15em;
          font-size: 1.1rem;
        }

        .logo-icon {
          color: var(--accent-gold);
        }

        .logo-text {
          font-family: var(--font-heading);
          font-weight: 700;
        }

        .footer-tagline {
          font-size: 0.85rem;
          line-height: 1.7;
          max-width: 280px;
          color: var(--text-secondary);
        }

        /* Navigation Links Col */
        .footer-links-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }

        .links-col {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .links-col h4,
        .footer-socials-col h4 {
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin-bottom: 12px;
          color: var(--text-primary);
        }

        .links-col a {
          font-size: 0.85rem;
          color: var(--text-secondary);
          transition: var(--transition-fast);
        }

        .links-col a:hover {
          color: var(--accent-gold);
          transform: translateX(4px);
        }

        /* Socials & Back to Top */
        .footer-socials-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 16px;
        }

        .footer-socials {
          display: flex;
          gap: 12px;
        }

        .footer-socials a {
          width: 38px;
          height: 38px;
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          color: var(--text-secondary);
          transition: var(--transition-fast);
        }

        .footer-socials a:hover {
          color: var(--accent-gold);
          border-color: var(--accent-gold);
          box-shadow: 0 4px 10px rgba(0,0,0,0.02);
        }

        .back-to-top-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 12px;
          padding: 8px 0;
          transition: var(--transition-fast);
        }

        .back-to-top-btn:hover {
          color: var(--text-primary);
        }

        .up-arrow {
          transition: transform 0.3s ease;
        }

        .back-to-top-btn:hover .up-arrow {
          transform: translateY(-4px);
        }

        /* Lower Footer */
        .footer-lower {
          display: flex;
          justify-content: space-between;
          padding-top: 32px;
          font-size: 0.78rem;
          color: var(--text-secondary);
        }

        @media (max-width: 560px) {
          .footer-lower {
            flex-direction: column;
            gap: 12px;
            align-items: center;
          }
        }

        .dev-link {
          color: var(--text-primary);
          font-weight: 500;
          transition: var(--transition-fast);
        }

        .dev-link:hover {
          color: var(--accent-gold);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
