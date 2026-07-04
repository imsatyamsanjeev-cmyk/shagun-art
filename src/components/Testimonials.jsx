import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const testimonials = [
    {
      id: 1,
      name: 'Harjit Singh',
      role: 'Art Student & Client',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop',
      comment: 'I took my deaf sister to Shagun Art Studio to start learning painting and tattoo art, and our experience was truly amazing. Shagun was extremely kind, patient, supportive, and understanding from the very beginning. She went beyond limits to help us connect and create beautiful art.'
    },
    {
      id: 2,
      name: 'Jinal Chauhan',
      role: 'Tattoo Client (Lotus Design)',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop',
      comment: "I just wanted to say a huge thank you for the amazing tattoo you created for me. It's perfect, and I couldn't be happier with how it turned out. Your talent and attention to detail truly shine through in your work. Thanks again for making my tattoo experience unforgettable!"
    },
    {
      id: 3,
      name: 'Gurpreet Singh',
      role: 'Realism Sleeve Client',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop',
      comment: "Shagun Art is by far the most professional, clean, and luxurious tattoo studio in Fatehgarh Sahib. Shagun's background in fine oil painting translates directly into her hyper-realistic tattoo shading. The detailing is absolutely incredible."
    }
  ];

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 150 : -150,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 200, damping: 22 },
        opacity: { duration: 0.4 },
      },
    },
    exit: (dir) => ({
      x: dir < 0 ? 150 : -150,
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 200, damping: 22 },
        opacity: { duration: 0.4 },
      },
    }),
  };

  return (
    <section id="testimonials" className="testimonials-section">
      <div className="section-container">
        <div className="section-title-wrapper">
          <p className="tagline">TESTIMONIALS</p>
          <h2>Voices of the Canvas</h2>
          <p>Read about the premium experiences shared by our clients who carry Shagun Art pieces.</p>
        </div>

        <div className="slider-wrapper">
          <Quote className="quote-icon" size={80} />
          
          <div className="slider-container">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="testimonial-card glass-card"
              >
                <div className="stars-wrapper">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} size={16} fill="var(--accent-gold)" color="var(--accent-gold)" />
                  ))}
                </div>
                <p className="testimonial-text">"{testimonials[activeIndex].comment}"</p>
                
                <div className="testimonial-author">
                  <div>
                    <h4>{testimonials[activeIndex].name}</h4>
                    <p>{testimonials[activeIndex].role}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Slider Controls */}
          <div className="slider-controls">
            <button className="slider-btn prev-btn" onClick={handlePrev} aria-label="Previous testimonial">
              <ChevronLeft size={20} />
            </button>
            <div className="slider-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`dot-btn ${activeIndex === index ? 'active' : ''}`}
                  onClick={() => {
                    setDirection(index > activeIndex ? 1 : -1);
                    setActiveIndex(index);
                  }}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <button className="slider-btn next-btn" onClick={handleNext} aria-label="Next testimonial">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .testimonials-section {
          background-color: var(--bg-primary);
          position: relative;
          overflow: hidden;
        }

        .slider-wrapper {
          max-width: 780px;
          margin: 0 auto;
          position: relative;
          padding: 40px 0;
        }

        .quote-icon {
          position: absolute;
          top: -20px;
          left: -40px;
          color: rgba(212, 175, 55, 0.05);
          pointer-events: none;
          z-index: 1;
        }

        @media (max-width: 768px) {
          .quote-icon {
            left: 10px;
            top: -30px;
            size: 50px;
          }
        }

        .slider-container {
          min-height: 280px;
          display: flex;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        .testimonial-card {
          padding: 48px;
          border: 1px solid var(--border-color);
          background-color: var(--bg-primary);
          border-radius: 0px;
          text-align: left;
          width: 100%;
          box-shadow: var(--card-shadow);
        }

        @media (max-width: 560px) {
          .testimonial-card {
            padding: 32px 20px;
          }
        }

        .stars-wrapper {
          display: flex;
          gap: 4px;
          margin-bottom: 24px;
        }

        .testimonial-text {
          font-size: 1.15rem;
          line-height: 1.8;
          color: var(--text-primary);
          font-weight: 300;
          font-style: italic;
          margin-bottom: 32px;
        }

        @media (max-width: 560px) {
          .testimonial-text {
            font-size: 1rem;
            line-height: 1.6;
          }
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .author-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
          border: 1px solid var(--border-color);
        }

        .testimonial-author h4 {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-primary);
        }

        .testimonial-author p {
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-secondary);
        }

        /* Controls */
        .slider-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          margin-top: 40px;
        }

        .slider-btn {
          width: 40px;
          height: 40px;
          border: 1px solid var(--border-color);
          background-color: var(--bg-primary);
          color: var(--text-primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .slider-btn:hover {
          color: var(--accent-gold);
          border-color: var(--accent-gold);
          box-shadow: 0 4px 10px rgba(0,0,0,0.02);
        }

        .slider-dots {
          display: flex;
          gap: 8px;
        }

        .dot-btn {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          border: none;
          background-color: var(--border-color);
          cursor: pointer;
          padding: 0;
          transition: var(--transition-fast);
        }

        .dot-btn:hover {
          background-color: var(--text-secondary);
        }

        .dot-btn.active {
          width: 18px;
          border-radius: 4px;
          background-color: var(--accent-gold);
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
