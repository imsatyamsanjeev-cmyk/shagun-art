import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Target, Compass, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const [activeTab, setActiveTab] = useState('story');
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Fade up content on scroll
      gsap.fromTo(
        '.about-fade-in',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          stagger: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Image reveal parallax
      gsap.fromTo(
        '.about-image-wrapper',
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const tabContents = {
    story: {
      title: 'Our Story',
      icon: <Sparkles className="tab-icon" size={18} />,
      content:
        'Founded by Shagun, a world-record-holding visual artist, Shagun Art Studio emerged from a desire to blend high fine art disciplines with professional tattoo culture. Combining years of experience in oil painting and canvas texture with master-level skin tattooing and precision nail aesthetics, we treat every client’s body as a museum-worthy canvas.',
    },
    mission: {
      title: 'Our Mission & Vision',
      icon: <Target className="tab-icon" size={18} />,
      content:
        'Our mission is to translate your imagination, beliefs, and memories into breathtaking custom inks. We seek to challenge the standard conventions of tattooing by delivering an upscale, comfortable, and personalized studio experience. We aim to inspire confidence, personal expression, and artistic connection.',
    },
    quality: {
      title: 'Quality & Safety',
      icon: <Shield className="tab-icon" size={18} />,
      content:
        'We stand behind an uncompromising commitment to medical-grade hygiene. Every single instrument is sterilized, needles are 100% disposable, and we source only premium, vegan-certified inks from world-renowned brands. Our studio environment is designed for maximum safety, comfort, and peaceful creation.',
    },
  };

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="section-container about-grid">
        {/* Left Column: Image Collage */}
        <div className="about-visual about-fade-in" ref={imageContainerRef}>
          <div className="about-image-wrapper">
            <img 
              src="/Assets/studio_interior.png" 
              alt="Shagun Art Premium Studio Interior" 
              className="about-img"
            />
            <div className="about-badge glass-card">
              <span className="badge-title">EST. 2018</span>
              <span className="badge-subtitle">World Record Artistry</span>
            </div>
            <div className="border-accent-box"></div>
          </div>
        </div>

        {/* Right Column: Narrative */}
        <div className="about-content">
          <div className="tagline about-fade-in">ABOUT SHAGUN ART</div>
          <h2 className="about-heading about-fade-in">
            Where High Fine Art Meets Premium Custom Tattooing
          </h2>
          
          {/* Custom Tabs */}
          <div className="about-tabs-nav about-fade-in">
            {Object.keys(tabContents).map((key) => (
              <button
                key={key}
                className={`tab-btn ${activeTab === key ? 'active' : ''}`}
                onClick={() => setActiveTab(key)}
              >
                {tabContents[key].icon}
                <span>{tabContents[key].title}</span>
              </button>
            ))}
          </div>

          {/* Active Tab Panel */}
          <div className="about-tab-panel about-fade-in">
            <div className="panel-inner">
              <p>{tabContents[activeTab].content}</p>
            </div>
          </div>

          {/* Core Highlights */}
          <div className="about-highlights about-fade-in">
            <div className="highlight-item">
              <div className="highlight-num">01</div>
              <div>
                <h4>World Record Holder</h4>
                <p>Award-winning detail orientation and flawless custom designs.</p>
              </div>
            </div>
            <div className="highlight-item">
              <div className="highlight-num">02</div>
              <div>
                <h4>Multidisciplinary Studio</h4>
                <p>Excellence extending from hyper-realism tattoos to fine art paintings and nail art.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .about-section {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
          position: relative;
          overflow: hidden;
        }

        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        @media (max-width: 1024px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 60px;
          }
        }

        /* Image Wrapper with accents */
        .about-visual {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .about-image-wrapper {
          position: relative;
          width: 100%;
          max-width: 480px;
          aspect-ratio: 4 / 5;
          box-shadow: var(--card-shadow);
        }

        .about-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          position: relative;
          z-index: 2;
          filter: grayscale(10%) contrast(1.05);
        }

        .border-accent-box {
          position: absolute;
          top: 20px;
          left: -20px;
          width: 100%;
          height: 100%;
          border: 1px solid var(--accent-gold);
          z-index: 1;
          pointer-events: none;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @media (max-width: 768px) {
          .border-accent-box {
            display: none;
          }
        }

        .about-image-wrapper:hover .border-accent-box {
          transform: translate(-10px, 10px);
        }

        .about-badge {
          position: absolute;
          bottom: 30px;
          right: -30px;
          z-index: 3;
          padding: 16px 24px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          box-shadow: var(--card-shadow-hover);
        }

        @media (max-width: 1200px) {
          .about-badge {
            right: 10px;
            bottom: 10px;
          }
        }

        .badge-title {
          font-family: var(--font-heading);
          font-size: 1.2rem;
          font-weight: 700;
          color: var(--accent-gold);
        }

        .badge-subtitle {
          font-size: 0.65rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-primary);
        }

        /* Narrative styling */
        .about-content {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .about-heading {
          font-size: clamp(2rem, 3.5vw, 2.8rem);
          line-height: 1.2;
          margin-top: 12px;
          margin-bottom: 36px;
        }

        /* Tabs Nav */
        .about-tabs-nav {
          display: flex;
          border-bottom: 1px solid var(--border-color);
          margin-bottom: 24px;
          gap: 8px;
        }

        @media (max-width: 480px) {
          .about-tabs-nav {
            flex-direction: column;
            border-bottom: none;
          }
        }

        .tab-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          padding: 14px 20px;
          cursor: pointer;
          font-size: 0.78rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-secondary);
          border-bottom: 2px solid transparent;
          transition: var(--transition-fast);
        }

        @media (max-width: 480px) {
          .tab-btn {
            border-bottom: none;
            border-left: 2px solid transparent;
            padding: 8px 12px;
          }
        }

        .tab-btn:hover {
          color: var(--text-primary);
        }

        .tab-btn.active {
          color: var(--accent-gold);
          border-bottom-color: var(--accent-gold);
        }

        @media (max-width: 480px) {
          .tab-btn.active {
            border-left-color: var(--accent-gold);
          }
        }

        .tab-icon {
          transition: transform 0.3s ease;
        }

        .tab-btn:hover .tab-icon {
          transform: rotate(15deg) scale(1.1);
        }

        /* Active Tab Panel */
        .about-tab-panel {
          min-height: 120px;
          margin-bottom: 40px;
        }

        .panel-inner p {
          font-size: 0.98rem;
          line-height: 1.8;
          color: var(--text-secondary);
        }

        /* Highlights */
        .about-highlights {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
          border-top: 1px solid var(--border-color);
          padding-top: 32px;
        }

        @media (max-width: 560px) {
          .about-highlights {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }

        .highlight-item {
          display: flex;
          gap: 16px;
        }

        .highlight-num {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--accent-gold);
          line-height: 1;
        }

        .highlight-item h4 {
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 6px;
        }

        .highlight-item p {
          font-size: 0.8rem;
        }
      `}</style>
    </section>
  );
};

export default About;
