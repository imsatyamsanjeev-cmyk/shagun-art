import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, ShieldCheck, Paintbrush, Award, Feather } from 'lucide-react';

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

const Hero = () => {
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const collageRef = useRef(null);

  useEffect(() => {
    // Reveal animation on load
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.reveal-text',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power4.out', stagger: 0.15 }
      );

      gsap.fromTo(
        '.reveal-btn',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.5)', delay: 0.6, stagger: 0.1 }
      );

      gsap.fromTo(
        '.parallax-container',
        { opacity: 0, scale: 0.8, y: 60 },
        { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: 'power3.out', delay: 0.3, stagger: 0.2 }
      );

      gsap.fromTo(
        '.stat-item',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.8, stagger: 0.15 }
      );
    }, containerRef);

    // Mouse movement parallax effect on the collage
    const handleMouseMove = (e) => {
      if (!collageRef.current) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPercent = (clientX / innerWidth - 0.5) * 2; // -1 to 1
      const yPercent = (clientY / innerHeight - 0.5) * 2; // -1 to 1

      gsap.to('.pc-1', { x: xPercent * 15, y: yPercent * 15, duration: 0.6, ease: 'power2.out' });
      gsap.to('.pc-2', { x: xPercent * -20, y: yPercent * -20, duration: 0.6, ease: 'power2.out' });
      gsap.to('.pc-3', { x: xPercent * 25, y: yPercent * -10, duration: 0.6, ease: 'power2.out' });
      gsap.to('.pc-4', { x: xPercent * -10, y: yPercent * 30, duration: 0.6, ease: 'power2.out' });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      ctx.revert();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero-section" ref={containerRef}>
      <div className="hero-container">
        {/* Left Side Info */}
        <div className="hero-content" ref={leftRef}>
          <div className="tagline reveal-text">
            <span>STUDIO PORTFOLIO</span>
          </div>
          <h1 className="hero-heading reveal-text">
            Turning <br />
            <span className="accent-text text-playfair">Imagination</span> <br />
            Into Ink
          </h1>
          <p className="hero-description reveal-text">
            Premium custom tattoos crafted with creativity, precision, and world-class artistry. Experience luxury tattoo culture at Shagun Art.
          </p>
          
          <div className="hero-actions">
            <a 
              href="#booking" 
              className="btn btn-primary reveal-btn"
              onClick={(e) => scrollToSection(e, 'booking')}
            >
              Book Appointment
            </a>
            <a 
              href="#gallery" 
              className="btn btn-secondary reveal-btn"
              onClick={(e) => scrollToSection(e, 'gallery')}
            >
              View Gallery <ArrowRight size={16} className="btn-arrow" />
            </a>
          </div>

          {/* Quick Counters */}
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Tattoos Done</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">16K+</span>
              <span className="stat-label">Instagram</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Hygiene Safe</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">Custom</span>
              <span className="stat-label">Fine Designs</span>
            </div>
          </div>
        </div>

        {/* Right Side Collage */}
        <div className="hero-visual" ref={rightRef}>
          <div className="collage-wrapper" ref={collageRef}>
            <div className="collage-bg-circle"></div>
            
            {/* Collage Cards */}
            <div className="parallax-container pc-1">
              <div className="floating-card card-1">
                <img src="/Assets/Tattoo Designs/1000138539.jpg" alt="Samurai Skull Tattoo" />
                <div className="card-label">
                  <Award size={14} className="gold-icon" />
                  <span>Realism Art</span>
                </div>
              </div>
            </div>

            <div className="parallax-container pc-2">
              <div className="floating-card card-2">
                <img src="/Assets/Tattoo Designs/1000138542.jpg" alt="Punjab Map Tattoo" />
                <div className="card-label">
                  <Feather size={14} className="gold-icon" />
                  <span>Punjab Sleeve</span>
                </div>
              </div>
            </div>

            <div className="parallax-container pc-3">
              <div className="floating-card card-3">
                <img src="/Assets/Tattoo Designs/1000138537.jpg" alt="Medusa and Flower Tattoos" />
                <div className="card-label">
                  <Paintbrush size={14} className="gold-icon" />
                  <span>Custom Composition</span>
                </div>
              </div>
            </div>

            <div className="parallax-container pc-4">
              <div className="floating-card card-4">
                <div className="safety-badge">
                  <ShieldCheck size={20} className="gold-icon" />
                  <div>
                    <h4>Certified Hygiene</h4>
                    <p>100% Sterile & Disposable</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          background-color: var(--bg-primary);
          padding-top: 100px;
          position: relative;
          overflow: hidden;
        }

        .hero-container {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding: 40px 24px;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 60px;
          align-items: center;
        }

        @media (max-width: 1024px) {
          .hero-container {
            grid-template-columns: 1fr;
            text-align: center;
            gap: 80px;
            padding-top: 20px;
          }
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        @media (max-width: 1024px) {
          .hero-content {
            align-items: center;
          }
        }

        .tagline {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.25em;
          color: var(--accent-gold);
          margin-bottom: 20px;
          position: relative;
        }

        .hero-heading {
          font-size: clamp(3rem, 5vw, 4.5rem);
          line-height: 1.1;
          margin-bottom: 24px;
          font-weight: 500;
          letter-spacing: -0.02em;
        }

        .accent-text {
          color: var(--text-primary);
          font-style: italic;
          position: relative;
        }

        .hero-description {
          font-size: 1.05rem;
          color: var(--text-secondary);
          margin-bottom: 40px;
          max-width: 520px;
          font-weight: 300;
        }

        .hero-actions {
          display: flex;
          gap: 16px;
          margin-bottom: 60px;
          width: 100%;
        }

        @media (max-width: 1024px) {
          .hero-actions {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .hero-actions {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }
        }

        .btn-arrow {
          margin-left: 8px;
          transition: transform 0.3s ease;
        }

        .btn:hover .btn-arrow {
          transform: translateX(4px);
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          width: 100%;
          border-top: 1px solid var(--border-color);
          padding-top: 32px;
        }

        @media (max-width: 480px) {
          .hero-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .stat-number {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .stat-label {
          font-size: 0.7rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-secondary);
        }

        /* Hero Visual Right Side Collage */
        .hero-visual {
          position: relative;
          height: 520px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        @media (max-width: 1024px) {
          .hero-visual {
            height: 480px;
            max-width: 500px;
            margin: 0 auto;
            width: 100%;
          }
        }

        .collage-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .collage-bg-circle {
          position: absolute;
          width: 320px;
          height: 320px;
          background: radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, rgba(255, 255, 255, 0) 70%);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 1;
          pointer-events: none;
        }

        .parallax-container {
          position: absolute;
          z-index: 2;
          transition: z-index 0.3s;
        }

        .parallax-container:hover {
          z-index: 10;
        }

        .floating-card {
          width: 100%;
          height: 100%;
          padding: 8px 8px 0px;
          background-color: #ffffff;
          border: 1px solid var(--border-color);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.06);
          border-radius: 4px;
          overflow: hidden;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), 
                      box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .floating-card:hover {
          transform: scale(1.03) translateY(-4px);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.12);
        }

        .floating-card img {
          width: 100%;
          object-fit: cover;
          height: calc(100% - 28px);
          filter: grayscale(10%);
          transition: filter 0.5s ease;
        }

        .floating-card:hover img {
          filter: grayscale(0%);
        }

        .card-label {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 4px;
          font-size: 0.65rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-primary);
        }

        .gold-icon {
          color: var(--accent-gold);
        }

        /* Specific positions for parallax containers and cards */
        .pc-1 {
          width: 270px;
          height: 350px;
          left: 5%;
          top: 0%;
        }

        .card-1 {
          transform: rotate(-3deg);
        }

        .pc-2 {
          width: 250px;
          height: 325px;
          right: 5%;
          top: 10%;
        }

        .card-2 {
          transform: rotate(3deg);
        }

        .pc-3 {
          width: 240px;
          height: 310px;
          left: 18%;
          bottom: 2%;
        }

        .card-3 {
          transform: rotate(-2deg);
        }

        .pc-4 {
          width: 260px;
          right: 10%;
          bottom: 8%;
        }

        .card-4 {
          padding: 20px;
          background-color: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border-radius: 8px;
          transform: rotate(1deg);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
        }

        .safety-badge {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .safety-badge h4 {
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 2px;
        }

        .safety-badge p {
          font-size: 0.65rem;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--text-secondary);
        }

        @media (max-width: 560px) {
          .pc-1 {
            width: 175px;
            height: 225px;
            left: 2%;
            top: 2%;
          }

          .pc-2 {
            width: 155px;
            height: 200px;
            right: 2%;
            top: 12%;
          }

          .pc-3 {
            width: 150px;
            height: 190px;
            left: 10%;
            bottom: 5%;
          }

          .pc-4 {
            width: 210px;
            right: 5%;
            bottom: 12%;
          }

          .card-4 {
            padding: 12px;
          }

          .safety-badge {
            gap: 8px;
          }

          .safety-badge h4 {
            font-size: 0.72rem;
          }

          .safety-badge p {
            font-size: 0.58rem;
          }
        }

        @media (max-width: 380px) {
          .collage-wrapper {
            transform: scale(0.85);
            transform-origin: center center;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
