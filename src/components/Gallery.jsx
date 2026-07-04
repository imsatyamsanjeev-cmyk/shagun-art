import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categories = [
    'All',
    'Realism',
    'Portrait',
    'Japanese',
    'Colour',
    'Black & Grey',
    'Floral',
    'Sleeve',
    'Minimal',
  ];

  const galleryItems = [
    {
      id: 1,
      title: 'Lighthouse Realism',
      image: '/Assets/Tattoo Designs/1000138539.jpg',
      categories: ['Realism', 'Black & Grey', 'Sleeve'],
      size: 'tall',
    },
    {
      id: 2,
      title: 'Punjab Sleeve & Portrait',
      image: '/Assets/Tattoo Designs/1000138542.jpg',
      categories: ['Portrait', 'Black & Grey', 'Sleeve'],
      size: 'wide',
    },
    {
      id: 3,
      title: 'Lotus Fine-Line Back Tattoo',
      image: '/Assets/Tattoo Designs/1000138537.jpg',
      categories: ['Floral', 'Black & Grey', 'Minimal'],
      size: 'tall',
    },
    {
      id: 4,
      title: 'Fine Art Portraiture',
      image: '/Assets/Tattoo Designs/art.jpeg',
      categories: ['Portrait', 'Colour'],
      size: 'square',
    },
    {
      id: 5,
      title: 'Delicate Couple Matching Lines',
      image: '/Assets/Tattoo Designs/couples_tattoo.jpg',
      categories: ['Minimal', 'Black & Grey'],
      size: 'square',
    },
    {
      id: 6,
      title: 'Luxurious Minimalist Nails',
      image: '/Assets/Tattoo Designs/nailart.jpeg',
      categories: ['Minimal', 'Colour'],
      size: 'tall',
    },
    {
      id: 7,
      title: 'Sikh Guru Oil Painting',
      image: '/Assets/Tattoo Designs/1000138540.jpg',
      categories: ['Portrait', 'Colour'],
      size: 'wide',
    },
    {
      id: 8,
      title: 'Sleeve Cover-up Realism',
      image: '/Assets/Tattoo Designs/coverup.jpeg',
      categories: ['Realism', 'Black & Grey', 'Sleeve'],
      size: 'square',
    },
    {
      id: 9,
      title: 'Elegant Geometric Fine-Line',
      image: '/Assets/Tattoo Designs/minimal tatttoo.jpeg',
      categories: ['Minimal', 'Black & Grey'],
      size: 'tall',
    },
    {
      id: 10,
      title: 'Custom Colored realism',
      image: '/Assets/Tattoo Designs/WhatsApp Image 2026-07-04 at 7.32.01 PM.jpeg',
      categories: ['Realism', 'Colour'],
      size: 'wide',
    },
  ];

  const filteredItems = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.categories.includes(selectedCategory));

  const openLightbox = (index) => {
    // Find absolute index of filtered item in filteredItems array
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const navigateLightbox = (direction, e) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    
    let newIndex = lightboxIndex + direction;
    if (newIndex < 0) {
      newIndex = filteredItems.length - 1;
    } else if (newIndex >= filteredItems.length) {
      newIndex = 0;
    }
    setLightboxIndex(newIndex);
  };

  return (
    <section id="gallery" className="gallery-section">
      <div className="section-container">
        <div className="section-title-wrapper">
          <p className="tagline">OUR GALLERY</p>
          <h2>Crafted Masterpieces</h2>
          <p>Explore our premium portfolio across various styles. Every piece is unique and tailored to the individual.</p>
        </div>

        {/* Filter Categories Nav */}
        <div className="gallery-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Grid Masonry with Framer Motion Layout animations */}
        <motion.div layout className="gallery-grid">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                key={item.id}
                className={`gallery-item ${item.size}`}
                onClick={() => openLightbox(index)}
              >
                <div className="gallery-img-container">
                  <img src={item.image} alt={item.title} className="gallery-img" />
                  <div className="gallery-item-overlay">
                    <div className="overlay-info">
                      <span className="item-cats">{item.categories.join(' / ')}</span>
                      <h3>{item.title}</h3>
                    </div>
                    <div className="zoom-btn">
                      <ZoomIn size={18} />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay"
            onClick={closeLightbox}
          >
            <button className="lightbox-close" onClick={closeLightbox} aria-label="Close Lightbox">
              <X size={28} />
            </button>

            <button className="lightbox-nav prev" onClick={(e) => navigateLightbox(-1, e)} aria-label="Previous Image">
              <ChevronLeft size={36} />
            </button>

            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lightbox-content-wrapper"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={filteredItems[lightboxIndex].image} 
                alt={filteredItems[lightboxIndex].title} 
                className="lightbox-image" 
              />
              <div className="lightbox-details">
                <span className="lightbox-cats">{filteredItems[lightboxIndex].categories.join(' / ')}</span>
                <h2>{filteredItems[lightboxIndex].title}</h2>
              </div>
            </motion.div>

            <button className="lightbox-nav next" onClick={(e) => navigateLightbox(1, e)} aria-label="Next Image">
              <ChevronRight size={36} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .gallery-section {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }

        .gallery-filters {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 48px;
        }

        .filter-btn {
          background: none;
          border: 1px solid var(--border-color);
          padding: 8px 18px;
          font-size: 0.72rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--text-secondary);
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .filter-btn:hover {
          color: var(--text-primary);
          border-color: var(--text-primary);
        }

        .filter-btn.active {
          background-color: var(--accent-black);
          color: var(--bg-primary);
          border-color: var(--accent-black);
        }

        /* Columns-based Masonry Layout to prevent any image cropping */
        .gallery-grid {
          column-count: 3;
          column-gap: 24px;
          width: 100%;
        }

        @media (max-width: 900px) {
          .gallery-grid {
            column-count: 2;
            column-gap: 20px;
          }
        }

        @media (max-width: 560px) {
          .gallery-grid {
            column-count: 1;
            column-gap: 0;
            display: flex;
            flex-direction: column;
            gap: 16px;
          }
        }

        .gallery-item {
          cursor: pointer;
          overflow: hidden;
          position: relative;
          box-shadow: var(--card-shadow);
          display: inline-block;
          width: 100%;
          break-inside: avoid;
          margin-bottom: 24px;
          border: 1px solid var(--border-color);
          background-color: var(--bg-primary);
        }

        @media (max-width: 560px) {
          .gallery-item {
            margin-bottom: 0;
          }
        }

        .gallery-img-container {
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        .gallery-img {
          width: 100%;
          height: auto;
          display: block;
          filter: grayscale(15%) contrast(1.02);
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), 
                      filter 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .gallery-item-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.8) 100%);
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding: 24px;
          opacity: 0;
          transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .overlay-info {
          text-align: left;
          color: #ffffff;
          transform: translateY(15px);
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .item-cats {
          font-size: 0.65rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--accent-gold);
          display: block;
          margin-bottom: 4px;
        }

        .overlay-info h3 {
          font-size: 1.15rem;
          color: #ffffff;
          font-weight: 500;
        }

        .zoom-btn {
          width: 36px;
          height: 36px;
          background-color: rgba(255, 255, 255, 0.9);
          border-radius: 50%;
          color: var(--accent-black);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: translateY(15px);
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease;
        }

        .zoom-btn:hover {
          background-color: #ffffff;
          color: var(--accent-gold);
        }

        /* Hover actions */
        .gallery-item:hover .gallery-img {
          transform: scale(1.06);
          filter: grayscale(0%) contrast(1.05);
        }

        .gallery-item:hover .gallery-item-overlay {
          opacity: 1;
        }

        .gallery-item:hover .overlay-info,
        .gallery-item:hover .zoom-btn {
          transform: translateY(0);
        }

        /* Lightbox overlays */
        .lightbox-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(10, 10, 10, 0.98);
          z-index: 2000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }

        @media (max-width: 768px) {
          .lightbox-overlay {
            padding: 20px;
          }
        }

        .lightbox-close {
          position: absolute;
          top: 30px;
          right: 30px;
          background: none;
          border: none;
          color: #ffffff;
          cursor: pointer;
          opacity: 0.6;
          transition: opacity 0.3s ease, transform 0.3s ease;
          z-index: 2100;
        }

        .lightbox-close:hover {
          opacity: 1;
          transform: rotate(90deg);
        }

        .lightbox-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #ffffff;
          cursor: pointer;
          opacity: 0.5;
          transition: opacity 0.3s ease, transform 0.3s ease;
          z-index: 2100;
          padding: 10px;
        }

        .lightbox-nav:hover {
          opacity: 1;
          transform: translateY(-50%) scale(1.1);
        }

        .lightbox-nav.prev {
          left: 30px;
        }

        .lightbox-nav.next {
          right: 30px;
        }

        @media (max-width: 768px) {
          .lightbox-nav {
            display: none;
          }
        }

        .lightbox-content-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 900px;
          width: 100%;
        }

        .lightbox-image {
          max-height: 75vh;
          max-width: 100%;
          object-fit: contain;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
        }

        .lightbox-details {
          margin-top: 24px;
          text-align: center;
          color: #ffffff;
        }

        .lightbox-cats {
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent-gold);
          display: block;
          margin-bottom: 6px;
        }

        .lightbox-details h2 {
          font-size: 1.8rem;
          color: #ffffff;
          font-weight: 500;
        }
      `}</style>
    </section>
  );
};

export default Gallery;
