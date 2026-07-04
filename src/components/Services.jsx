import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Eye, 
  User, 
  Compass, 
  Heart, 
  Sparkles, 
  Layers, 
  Scissors, 
  Brush, 
  Palette, 
  HandMetal 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.service-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 85%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const servicesData = [
    {
      id: 1,
      title: 'Realism Tattoos',
      icon: <Eye size={20} />,
      image: '/Assets/Tattoo Designs/1000138539.jpg',
      description: 'Stunning three-dimensional body art replicating real-world lighting, shading, and life-like accuracy.',
    },
    {
      id: 2,
      title: 'Portrait Tattoos',
      icon: <User size={20} />,
      image: '/Assets/Tattoo Designs/WhatsApp Image 2026-07-04 at 8.43.40 PM.jpeg',
      description: 'Highly detailed portraiture capturing the likeness and expressions of your loved ones or iconic figures.',
    },
    {
      id: 3,
      title: 'Japanese Tattoos',
      icon: <Compass size={20} />,
      image: '/Assets/Tattoo Designs/WhatsApp Image 2026-07-04 at 8.43.39 PM (1).jpeg',
      description: 'Traditional Irezumi-inspired sleeves, dragons, and folklore motifs rendered with dynamic energy.',
    },
    {
      id: 4,
      title: 'Traditional Tattoos',
      icon: <HandMetal size={20} />,
      image: '/Assets/Tattoo Designs/WhatsApp Image 2026-07-04 at 8.43.39 PM.jpeg',
      description: 'Bold black outlines and clean shading, paying homage to the heritage of classic tattoo art.',
    },
    {
      id: 5,
      title: 'Minimal Tattoos',
      icon: <Sparkles size={20} />,
      image: '/Assets/Tattoo Designs/minimal tatttoo.jpeg',
      description: 'Elegant, fine-line, and geometric tattoos that speak volumes through delicate understatement.',
    },
    {
      id: 6,
      title: 'Couple Tattoos',
      icon: <Heart size={20} />,
      image: '/Assets/Tattoo Designs/couples_tattoo.jpg',
      description: 'Meaningful, complementary, and matching designs crafted to symbolize your shared bond.',
    },
    {
      id: 7,
      title: 'Cover-up Tattoos',
      icon: <Layers size={20} />,
      image: '/Assets/Tattoo Designs/coverup.jpeg',
      description: 'Cleverly designed new concepts that seamlessly conceal and transform older, unwanted tattoos.',
    },
    {
      id: 8,
      title: 'Sleeve Tattoos',
      icon: <Scissors size={20} />,
      image: '/Assets/Tattoo Designs/1000138542.jpg',
      description: 'Immersive, large-scale compositions flowing harmoniously across your entire arm or leg.',
    },
    {
      id: 9,
      title: 'Painting & Canvas Art',
      icon: <Palette size={20} />,
      image: '/Assets/Tattoo Designs/potrat.jpeg',
      description: 'Bespoke fine art oil paintings and portrait commissions created by our world-record artist.',
    },
    {
      id: 10,
      title: 'Luxury Nail Art',
      icon: <Brush size={20} />,
      image: '/Assets/Tattoo Designs/nailart.jpeg',
      description: 'Avant-garde, minimalist, and luxury nail styling using premium materials and hand-painted details.',
    },
  ];

  return (
    <section id="services" className="services-section" ref={containerRef}>
      <div className="section-container">
        <div className="section-title-wrapper">
          <p className="tagline">OUR SERVICES</p>
          <h2>The Craft of Living Art</h2>
          <p>We combine modern hygiene practices with visual arts disciplines to provide premium bespoke services.</p>
        </div>

        <div className="services-grid">
          {servicesData.map((service) => (
            <div key={service.id} className="service-card glass-card">
              <div className="service-img-wrapper">
                <img src={service.image} alt={service.title} className="service-img" />
                <div className="service-overlay">
                  <div className="service-icon-floating">{service.icon}</div>
                </div>
              </div>
              <div className="service-body">
                <div className="service-header">
                  <div className="service-icon">{service.icon}</div>
                  <h3>{service.title}</h3>
                </div>
                <p className="service-description">{service.description}</p>
                <div className="gold-underline"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .services-section {
          background-color: var(--bg-primary);
          position: relative;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 30px;
        }

        @media (max-width: 480px) {
          .services-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }

        .service-card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: var(--card-shadow);
          border: 1px solid var(--border-color);
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), 
                      box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          background-color: var(--bg-primary);
          border-radius: 0px; /* Modern square Apple aesthetic */
        }

        .service-img-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          background-color: var(--bg-secondary);
          overflow: hidden;
        }

        .service-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          filter: grayscale(20%);
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), 
                      filter 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .service-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.3) 100%);
          opacity: 0;
          transition: opacity 0.5s ease;
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          padding: 16px;
        }

        .service-icon-floating {
          width: 40px;
          height: 40px;
          background-color: rgba(255, 255, 255, 0.95);
          color: var(--accent-black);
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          transform: translateY(10px);
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .service-body {
          padding: 24px;
          text-align: left;
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .service-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
        }

        .service-icon {
          color: var(--accent-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .service-header h3 {
          font-size: 1.25rem;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--text-primary);
        }

        .service-description {
          font-size: 0.88rem;
          line-height: 1.6;
          color: var(--text-secondary);
          flex-grow: 1;
        }

        .gold-underline {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background-color: var(--accent-gold);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Hover states */
        .service-card:hover {
          transform: translateY(-8px);
          box-shadow: var(--card-shadow-hover);
          border-color: var(--accent-gold);
        }

        .service-card:hover .service-img {
          transform: scale(1.08);
          filter: grayscale(0%);
        }

        .service-card:hover .service-overlay {
          opacity: 1;
        }

        .service-card:hover .service-icon-floating {
          transform: translateY(0);
        }

        .service-card:hover .service-icon {
          transform: scale(1.1) rotate(10deg);
        }

        .service-card:hover .gold-underline {
          transform: scaleX(1);
        }
      `}</style>
    </section>
  );
};

export default Services;
