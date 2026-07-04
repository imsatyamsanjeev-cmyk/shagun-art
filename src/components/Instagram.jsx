import React from 'react';
import { Heart, MessageCircle } from 'lucide-react';

const InstaIcon = ({ size = 24, className }) => (
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

const Instagram = () => {
  const posts = [
    {
      id: 1,
      image: '/Assets/oil_painting.png',
      likes: '2.4K',
      comments: '186',
      type: 'Painting Commission',
    },
    {
      id: 2,
      image: '/Assets/Tattoo Designs/1000138539.jpg',
      likes: '4.8K',
      comments: '342',
      type: 'Lighthouse Realism',
    },
    {
      id: 3,
      image: '/Assets/Tattoo Designs/1000138540.jpg',
      likes: '1.9K',
      comments: '98',
      type: 'Diploma Art Course',
    },
    {
      id: 4,
      image: '/Assets/Tattoo Designs/1000138537.jpg',
      likes: '3.2K',
      comments: '215',
      type: 'Peacock Linework',
    },
    {
      id: 5,
      image: '/Assets/Tattoo Designs/1000138542.jpg',
      likes: '5.1K',
      comments: '409',
      type: 'Mythology Sleeve',
    },
    {
      id: 6,
      image: '/Assets/couple_tattoo.png',
      likes: '2.8K',
      comments: '172',
      type: 'Matching Linework',
    },
  ];

  return (
    <section className="instagram-section">
      <div className="section-container">
        <div className="section-title-wrapper">
          <p className="tagline">SOCIAL FEED</p>
          <h2>On Instagram</h2>
          <p>Join our community of over 16K+ art lovers. We post work updates, design process drafts, and daily studio life.</p>
        </div>

        <div className="instagram-grid">
          {posts.map((post) => (
            <a 
              key={post.id}
              href="https://www.instagram.com/shagun_artt" 
              target="_blank" 
              rel="noopener noreferrer"
              className="instagram-item"
            >
              <img src={post.image} alt={post.type} className="instagram-img" />
              <div className="instagram-overlay">
                <InstaIcon size={24} className="insta-icon-hover" />
                <div className="insta-stats">
                  <div className="stat-label">
                    <Heart size={16} fill="#fff" />
                    <span>{post.likes}</span>
                  </div>
                  <div className="stat-label">
                    <MessageCircle size={16} fill="#fff" />
                    <span>{post.comments}</span>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="instagram-action">
          <a 
            href="https://www.instagram.com/shagun_artt" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-gold btn-instagram"
          >
            <InstaIcon size={16} className="btn-insta-icon" /> Follow @shagun_artt
          </a>
        </div>
      </div>

      <style>{`
        .instagram-section {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }

        .instagram-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 12px;
          margin-bottom: 48px;
        }

        @media (max-width: 1024px) {
          .instagram-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
          }
        }

        @media (max-width: 560px) {
          .instagram-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 8px;
          }
        }

        .instagram-item {
          display: block;
          position: relative;
          aspect-ratio: 1 / 1;
          overflow: hidden;
          box-shadow: var(--card-shadow);
        }

        .instagram-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(15%);
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), 
                      filter 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .instagram-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(17, 17, 17, 0.7);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          opacity: 0;
          transition: opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          color: #ffffff;
        }

        .insta-icon-hover {
          color: #ffffff;
          transform: scale(0.8) translateY(-10px);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .insta-stats {
          display: flex;
          gap: 16px;
          transform: translateY(10px);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .stat-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 500;
        }

        /* Hover actions */
        .instagram-item:hover .instagram-img {
          transform: scale(1.08);
          filter: grayscale(0%);
        }

        .instagram-item:hover .instagram-overlay {
          opacity: 1;
        }

        .instagram-item:hover .insta-icon-hover {
          transform: scale(1) translateY(0);
        }

        .instagram-item:hover .insta-stats {
          transform: translateY(0);
        }

        /* Follow Button styling */
        .instagram-action {
          display: flex;
          justify-content: center;
        }

        .btn-instagram {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 32px;
        }

        .btn-insta-icon {
          transition: transform 0.3s ease;
        }

        .btn-instagram:hover .btn-insta-icon {
          transform: scale(1.1) rotate(15deg);
        }
      `}</style>
    </section>
  );
};

export default Instagram;
