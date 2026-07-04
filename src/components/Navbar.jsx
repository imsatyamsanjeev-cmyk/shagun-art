import React, { useState, useEffect } from 'react';
import { Menu, X, Feather } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e, targetId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar-wrapper ${isScrolled ? 'scrolled glass-effect' : ''}`}>
      <div className="navbar-container">
        <a href="#" className="navbar-logo" onClick={(e) => handleLinkClick(e, 'hero')}>
          <Feather className="logo-icon" size={20} />
          <span className="logo-text">SHAGUN ART</span>
        </a>

        {/* Desktop Navigation */}
        <div className="nav-links">
          <a href="#about" className="nav-link" onClick={(e) => handleLinkClick(e, 'about')}>About</a>
          <a href="#services" className="nav-link" onClick={(e) => handleLinkClick(e, 'services')}>Services</a>
          <a href="#gallery" className="nav-link" onClick={(e) => handleLinkClick(e, 'gallery')}>Gallery</a>
          <a href="#why-choose" className="nav-link" onClick={(e) => handleLinkClick(e, 'why-choose')}>Why Us</a>
          <a href="#testimonials" className="nav-link" onClick={(e) => handleLinkClick(e, 'testimonials')}>Reviews</a>
          <a href="#contact" className="nav-link" onClick={(e) => handleLinkClick(e, 'contact')}>Contact</a>
        </div>

        <div className="nav-cta">
          <a href="#booking" className="btn btn-primary btn-nav" onClick={(e) => handleLinkClick(e, 'booking')}>
            Book Appointment
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn" 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Dropdown */}
      <div className={`mobile-dropdown ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-links">
          <a href="#about" className="mobile-nav-link" onClick={(e) => handleLinkClick(e, 'about')}>About</a>
          <a href="#services" className="mobile-nav-link" onClick={(e) => handleLinkClick(e, 'services')}>Services</a>
          <a href="#gallery" className="mobile-nav-link" onClick={(e) => handleLinkClick(e, 'gallery')}>Gallery</a>
          <a href="#why-choose" className="mobile-nav-link" onClick={(e) => handleLinkClick(e, 'why-choose')}>Why Us</a>
          <a href="#testimonials" className="mobile-nav-link" onClick={(e) => handleLinkClick(e, 'testimonials')}>Reviews</a>
          <a href="#contact" className="mobile-nav-link" onClick={(e) => handleLinkClick(e, 'contact')}>Contact</a>
          <a href="#booking" className="btn btn-primary mobile-cta" onClick={(e) => handleLinkClick(e, 'booking')}>
            Book Appointment
          </a>
        </div>
      </div>

      <style>{`
        .navbar-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 90px;
          display: flex;
          align-items: center;
          z-index: 1000;
          border-bottom: 1px solid transparent;
          transition: height 0.4s cubic-bezier(0.16, 1, 0.3, 1), 
                      background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .navbar-wrapper.scrolled {
          height: 70px;
          border-color: var(--border-color);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.02);
        }

        .navbar-container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--text-primary);
          font-weight: 600;
          letter-spacing: 0.15em;
          font-size: 1.1rem;
          transition: var(--transition-fast);
        }

        .logo-icon {
          color: var(--accent-gold);
          transition: var(--transition-smooth);
        }

        .navbar-logo:hover .logo-icon {
          transform: rotate(-15deg) scale(1.1);
        }

        .logo-text {
          font-family: var(--font-heading);
          font-weight: 700;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        @media (max-width: 900px) {
          .nav-links, .nav-cta {
            display: none;
          }
        }

        .nav-link {
          font-size: 0.8rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-secondary);
          position: relative;
          padding: 8px 0;
          transition: var(--transition-fast);
        }

        .nav-link:hover {
          color: var(--text-primary);
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: var(--accent-gold);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .nav-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        .btn-nav {
          padding: 10px 20px;
          font-size: 0.75rem;
          letter-spacing: 0.1em;
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-primary);
          padding: 4px;
          transition: var(--transition-fast);
        }

        .mobile-menu-btn:hover {
          color: var(--accent-gold);
        }

        @media (max-width: 900px) {
          .mobile-menu-btn {
            display: block;
          }
        }

        .mobile-dropdown {
          position: fixed;
          top: 90px;
          left: 0;
          width: 100%;
          height: 0;
          overflow-y: auto;
          overflow-x: hidden;
          background-color: var(--bg-primary);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          border-bottom: 0px solid var(--border-color);
          z-index: 999;
        }

        .scrolled ~ .mobile-dropdown {
          top: 70px;
        }

        .mobile-dropdown.open {
          height: calc(100vh - 90px);
          border-bottom: 1px solid var(--border-color);
        }

        .scrolled ~ .mobile-dropdown.open {
          height: calc(100vh - 70px);
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 28px;
          min-height: 100%;
          padding: 40px 24px;
        }

        .mobile-nav-link {
          font-size: 1.1rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-secondary);
          transition: var(--transition-fast);
        }

        .mobile-nav-link:hover {
          color: var(--text-primary);
          transform: translateY(-2px);
        }

        .mobile-cta {
          margin-top: 20px;
          width: 100%;
          max-width: 280px;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
