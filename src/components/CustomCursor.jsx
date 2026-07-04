import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Only enable on desktop / pointer devices
    const isMobile = window.matchMedia('(max-width: 1024px)').matches || !('ontouchstart' in window || navigator.maxTouchPoints > 0);
    if (!isMobile) {
      setIsVisible(true);
    } else {
      return;
    }

    const onMouseMove = (e) => {
      const { clientX, clientY } = e;
      
      // Animate dot immediately
      gsap.to(dotRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.1,
        ease: 'power2.out',
      });

      // Animate outer ring with a tiny delay (lag)
      gsap.to(ringRef.current, {
        x: clientX,
        y: clientY,
        duration: 0.3,
        ease: 'power3.out',
      });
    };

    const onMouseEnterWindow = () => setIsVisible(true);
    const onMouseLeaveWindow = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseenter', onMouseEnterWindow);
    document.addEventListener('mouseleave', onMouseLeaveWindow);

    // Hover listeners for links and interactive items
    const handleMouseEnter = () => setIsHovered(true);
    const handleMouseLeave = () => setIsHovered(false);

    const interactiveSelectors = 'a, button, [role="button"], input, textarea, select, .gallery-slider-card, .floating-card, .service-card, .nav-btn, .tab-btn';
    const addListeners = () => {
      document.querySelectorAll(interactiveSelectors).forEach((el) => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    addListeners();

    // Re-bind when DOM changes (e.g. gallery filter tab changes)
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseenter', onMouseEnterWindow);
      document.removeEventListener('mouseleave', onMouseLeaveWindow);
      observer.disconnect();
      document.querySelectorAll(interactiveSelectors).forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div 
        ref={dotRef} 
        className={`custom-cursor-dot ${isHovered ? 'hovered' : ''}`} 
      />
      <div 
        ref={ringRef} 
        className={`custom-cursor-ring ${isHovered ? 'hovered' : ''}`} 
      />

      <style>{`
        .custom-cursor-dot {
          width: 8px;
          height: 8px;
          background-color: var(--accent-gold);
          border-radius: 50%;
          position: fixed;
          top: 0;
          left: 0;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 9999;
          transition: width 0.2s, height 0.2s, background-color 0.2s;
        }

        .custom-cursor-ring {
          width: 36px;
          height: 36px;
          border: 1px solid var(--text-primary);
          border-radius: 50%;
          position: fixed;
          top: 0;
          left: 0;
          transform: translate(-50%, -50%);
          pointer-events: none;
          z-index: 9998;
          transition: width 0.3s cubic-bezier(0.16, 1, 0.3, 1), 
                      height 0.3s cubic-bezier(0.16, 1, 0.3, 1), 
                      border-color 0.3s, background-color 0.3s;
        }

        /* Hover states */
        .custom-cursor-dot.hovered {
          width: 0px;
          height: 0px;
        }

        .custom-cursor-ring.hovered {
          width: 56px;
          height: 56px;
          border-color: var(--accent-gold);
          background-color: rgba(212, 175, 55, 0.05);
        }

        @media (max-width: 1024px) {
          .custom-cursor-dot, .custom-cursor-ring {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default CustomCursor;
