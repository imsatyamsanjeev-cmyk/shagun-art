import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Award, 
  Droplet, 
  ShieldCheck, 
  Edit3, 
  Sparkles, 
  MessageCircle, 
  HeartHandshake, 
  Coffee 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const WhyChoose = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.why-card',
        { opacity: 0, scale: 0.95, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.08,
          scrollTrigger: {
            trigger: '.why-grid',
            start: 'top 85%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      icon: <Award size={24} />,
      title: 'Certified Professional Artist',
      description: 'Led by a world-record-holding artist with extensive training in fine arts and anatomical placement.'
    },
    {
      icon: <Droplet size={24} />,
      title: 'Premium Tattoo Ink',
      description: 'We source only top-tier, vegan-friendly, non-toxic, and long-lasting professional inks.'
    },
    {
      icon: <ShieldCheck size={24} />,
      title: 'Hygienic Environment',
      description: 'Hospital-grade sanitation, autoclave sterilization, and 100% single-use disposable needles.'
    },
    {
      icon: <Edit3 size={24} />,
      title: 'Customized Designs',
      description: 'No template tattoos. Every design is custom sketched and sized perfectly for your unique anatomy.'
    },
    {
      icon: <Sparkles size={24} />,
      title: 'Comfortable Studio',
      description: 'A cozy, high-end private environment designed with client relaxation, music, and peace in mind.'
    },
    {
      icon: <MessageCircle size={24} />,
      title: 'Free Consultation',
      description: 'One-on-one session to discuss concepts, custom adjustments, placement, sizing, and pricing.'
    },
    {
      icon: <HeartHandshake size={24} />,
      title: 'Aftercare Support',
      description: 'Step-by-step guidance and premium protective patches to ensure flawless healing and vivid results.'
    },
    {
      icon: <Coffee size={24} />,
      title: 'Affordable Pricing',
      description: 'Fair, transparent hourly rates or flat-pricing with zero hidden charges. High-end luxury pricing made accessible.'
    }
  ];

  return (
    <section id="why-choose" className="why-section" ref={containerRef}>
      <div className="section-container">
        <div className="section-title-wrapper reveal-on-scroll">
          <p className="tagline">WHY CHOOSE US</p>
          <h2>The Shagun Art Standard</h2>
          <p>We pride ourselves on offering a luxury tattoo experience focused on quality, client care, and hygiene.</p>
        </div>

        <div className="why-grid">
          {features.map((feature, index) => (
            <div key={index} className="why-card glass-card">
              <div className="why-icon-wrapper">
                {feature.icon}
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .why-section {
          background-color: var(--bg-primary);
          position: relative;
        }

        .why-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 24px;
        }

        @media (max-width: 480px) {
          .why-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        .why-card {
          padding: 32px 24px;
          text-align: left;
          border: 1px solid var(--border-color);
          background-color: var(--bg-primary);
          border-radius: 0px; /* Modern square Apple aesthetic */
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .why-icon-wrapper {
          width: 50px;
          height: 50px;
          background-color: var(--bg-secondary);
          color: var(--accent-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
          transition: var(--transition-smooth);
        }

        .why-card h3 {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 12px;
          letter-spacing: -0.01em;
          color: var(--text-primary);
        }

        .why-card p {
          font-size: 0.85rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        /* Hover States */
        .why-card:hover {
          transform: translateY(-6px);
          box-shadow: var(--card-shadow-hover);
          border-color: var(--accent-gold);
        }

        .why-card:hover .why-icon-wrapper {
          background-color: var(--accent-black);
          color: var(--bg-primary);
          transform: rotateY(180deg);
        }
      `}</style>
    </section>
  );
};

export default WhyChoose;
