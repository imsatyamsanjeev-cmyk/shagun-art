import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare } from 'lucide-react';

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

const Contact = () => {
  const contactDetails = [
    {
      icon: <Phone size={18} />,
      label: 'Call Studio',
      value: '+91 98765 43210',
      link: 'tel:+919876543210',
    },
    {
      icon: <MessageSquare size={18} />,
      label: 'WhatsApp Chat',
      value: '+91 98765 43210',
      link: 'https://wa.me/919876543210',
    },
    {
      icon: <Mail size={18} />,
      label: 'Email Inquiries',
      value: 'hello@shagunart.com',
      link: 'mailto:hello@shagunart.com',
    },
    {
      icon: <InstaIcon size={18} />,
      label: 'Instagram DM',
      value: '@shagun_artt',
      link: 'https://instagram.com/shagun_artt',
    },
  ];

  return (
    <section id="contact" className="contact-section">
      <div className="section-container contact-grid">
        {/* Left Side: Contact Information */}
        <div className="contact-info">
          <p className="tagline">CONNECT</p>
          <h2>Visit The Studio</h2>
          <p className="contact-desc">
            We are located in a private luxury workspace. To arrange a visit or talk about your tattoo idea, get in touch with us via phone, WhatsApp, or email.
          </p>

          <div className="contact-list">
            {contactDetails.map((detail, index) => (
              <a 
                key={index}
                href={detail.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="contact-card glass-card"
              >
                <div className="contact-icon">{detail.icon}</div>
                <div>
                  <span className="contact-label">{detail.label}</span>
                  <span className="contact-value">{detail.value}</span>
                </div>
              </a>
            ))}
          </div>

          {/* Location & Hours Info Grid */}
          <div className="info-sub-grid">
            <div className="info-item">
              <MapPin size={20} className="gold-icon" />
              <div>
                <h4>Studio Address</h4>
                <p>1st Floor, Luxury Complex, Near Town Square, Tinsukia, Assam - 786125</p>
              </div>
            </div>

            <div className="info-item">
              <Clock size={20} className="gold-icon" />
              <div>
                <h4>Opening Hours</h4>
                <p>Tuesday - Sunday: 11:00 AM - 08:00 PM <br />(Closed on Mondays)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Map Embed */}
        <div className="contact-map">
          <div className="map-wrapper border-accent-box">
            <iframe
              title="Google Maps Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3539.0622956277085!2d95.3582453!3d27.498424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x374092b7ef5d8985%3A0xe10839e9a4f61f74!2sTinsukia%2C%20Assam!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="map-iframe"
            ></iframe>
          </div>
        </div>
      </div>

      <style>{`
        .contact-section {
          background-color: var(--bg-primary);
          position: relative;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 80px;
          align-items: center;
        }

        @media (max-width: 1024px) {
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 60px;
          }
        }

        .contact-info {
          text-align: left;
        }

        .contact-info h2 {
          font-size: clamp(2rem, 3.5vw, 3rem);
          line-height: 1.1;
          margin-bottom: 24px;
        }

        .contact-desc {
          font-size: 1.05rem;
          margin-bottom: 40px;
          font-weight: 300;
        }

        /* Contact details list */
        .contact-list {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          margin-bottom: 48px;
        }

        @media (max-width: 560px) {
          .contact-list {
            grid-template-columns: 1fr;
          }
        }

        .contact-card {
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 16px;
          border: 1px solid var(--border-color);
          background-color: var(--bg-primary);
          border-radius: 0px;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .contact-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--card-shadow-hover);
          border-color: var(--accent-gold);
        }

        .contact-icon {
          color: var(--accent-gold);
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .contact-card:hover .contact-icon {
          transform: scale(1.1) rotate(10deg);
        }

        .contact-label {
          display: block;
          font-size: 0.65rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--text-secondary);
          margin-bottom: 2px;
        }

        .contact-value {
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--text-primary);
          display: block;
        }

        /* Location and hours grid */
        .info-sub-grid {
          display: flex;
          flex-direction: column;
          gap: 28px;
          border-top: 1px solid var(--border-color);
          padding-top: 32px;
        }

        .info-item {
          display: flex;
          gap: 16px;
        }

        .info-item h4 {
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 6px;
        }

        .info-item p {
          font-size: 0.85rem;
          line-height: 1.6;
          color: var(--text-secondary);
        }

        /* Map Embed styling */
        .contact-map {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
        }

        .map-wrapper {
          position: relative;
          width: 100%;
          height: 480px;
          box-shadow: var(--card-shadow);
        }

        @media (max-width: 560px) {
          .map-wrapper {
            height: 320px;
          }
        }

        .map-iframe {
          /* Apply custom luxury grayscale filter to standard Google Maps */
          filter: grayscale(1) invert(0.05) contrast(1.05);
          transition: filter 0.5s ease;
          width: 100%;
          height: 100%;
        }

        .map-iframe:hover {
          filter: grayscale(0.2) contrast(1);
        }

        /* Accent border behind map */
        .border-accent-box {
          position: relative;
        }

        .border-accent-box::after {
          content: '';
          position: absolute;
          top: 20px;
          right: -20px;
          width: 100%;
          height: 100%;
          border: 1px solid var(--accent-gold);
          z-index: -1;
          pointer-events: none;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @media (max-width: 768px) {
          .border-accent-box::after {
            display: none;
          }
        }

        .map-wrapper:hover::after {
          transform: translate(10px, -10px);
        }
      `}</style>
    </section>
  );
};

export default Contact;
