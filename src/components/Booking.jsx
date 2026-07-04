import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Compass, User, DollarSign, Mail, Phone, HelpCircle, CheckCircle } from 'lucide-react';
import { saveBooking } from '../firebaseService';

const Booking = () => {
  const todayStr = new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceRequired: '',
    placement: '',
    preferredDate: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newBooking = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      serviceRequired: formData.serviceRequired,
      placement: formData.placement,
      preferredDate: formData.preferredDate,
      status: 'Pending',
    };

    try {
      await saveBooking(newBooking);
      setLoading(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        serviceRequired: '',
        placement: '',
        preferredDate: '',
      });
    } catch (error) {
      console.error("Booking submit failed:", error);
      setLoading(false);
    }
  };

  return (
    <section id="booking" className="booking-section">
      <div className="section-container booking-grid">
        {/* Left Side: Info */}
        <div className="booking-info reveal-on-scroll">
          <p className="tagline">RESERVATIONS</p>
          <h2>Begin Your <br />Artistic Journey</h2>
          <p className="booking-desc">
            To ensure the absolute highest quality and custom precision, we take appointments through private consultations. Fill out the reservation query and we will get back to you within 24-48 hours.
          </p>

          <div className="process-steps">
            <div className="step-item">
              <span className="step-number">01</span>
              <div>
                <h4>Concept Request</h4>
                <p>Submit your details, sizing preferences, and tattoo idea concepts.</p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-number">02</span>
              <div>
                <h4>Free Consultation</h4>
                <p>Meet with the artist either virtually or at the studio to refine placement, details, and finalize pricing.</p>
              </div>
            </div>
            <div className="step-item">
              <span className="step-number">03</span>
              <div>
                <h4>Ink Session</h4>
                <p>Sit back and watch your custom artwork come to life in our sterile, comfortable studio environment.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="booking-form-wrapper glass-card">
          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form 
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit} 
                className="booking-form"
              >
                {/* Name */}
                <div className="form-group">
                  <label htmlFor="name">Full Name *</label>
                  <div className="input-with-icon">
                    <User size={16} className="input-icon" />
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>

                {/* Email & Phone Grid */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <div className="input-with-icon">
                      <Mail size={16} className="input-icon" />
                      <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number *</label>
                    <div className="input-with-icon">
                      <Phone size={16} className="input-icon" />
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        required
                        placeholder="e.g. 9876543210"
                        pattern="[0-9]{10}"
                        title="Please enter a valid 10-digit Indian phone number"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>

                {/* Placement & Date Grid (Budget Removed) */}
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="placement">Placement (Location on Body)</label>
                    <div className="input-with-icon">
                      <Compass size={16} className="input-icon" />
                      <input 
                        type="text" 
                        id="placement" 
                        name="placement" 
                        placeholder="e.g. Forearm, Back, Shoulder"
                        value={formData.placement}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="preferredDate">Preferred Session Date</label>
                    <div className="input-with-icon">
                      <Calendar size={16} className="input-icon" />
                      <input 
                        type="date" 
                        id="preferredDate" 
                        name="preferredDate" 
                        min={todayStr}
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>

                {/* Service Required Dropdown (TattooIdea Textarea Removed) */}
                <div className="form-group">
                  <label htmlFor="serviceRequired">Required Service *</label>
                  <div className="input-with-icon">
                    <HelpCircle size={16} className="input-icon" />
                    <select 
                      id="serviceRequired" 
                      name="serviceRequired" 
                      required
                      value={formData.serviceRequired}
                      onChange={handleChange}
                      className="form-control"
                      style={{ appearance: 'none', WebkitAppearance: 'none' }}
                    >
                      <option value="">-- Select a Service --</option>
                      <option value="Custom Tattoo">Custom Tattoo & Body Art</option>
                      <option value="Minimalist Tattoo">Fine-Line & Minimalist Tattoo</option>
                      <option value="Portrait Tattoo">Hyper-Realism & Portrait Tattoo</option>
                      <option value="Japanese & Sleeve">Traditional Japanese & Sleeve Art</option>
                      <option value="Painting & Canvas">Fine Art Painting & Canvas Commission</option>
                      <option value="Luxury Nail Art">Luxury & Hand-Painted Nail Art</option>
                      <option value="Cover-Up / Correction">Tattoo Cover-Up & Restoration</option>
                      <option value="Other">Other Creative Commission</option>
                    </select>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn btn-primary btn-submit"
                >
                  {loading ? 'Submitting Reservation...' : 'Book Your Appointment'}
                </button>
              </motion.form>
            ) : (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="booking-success"
              >
                <CheckCircle size={60} className="success-icon" />
                <h3>Reservation Inquiry Sent!</h3>
                <p>Thank you for choosing Shagun Art. Our studio representative will contact you via email or phone within 24 hours to schedule your consultation session.</p>
                <button 
                  onClick={() => setIsSubmitted(false)}
                  className="btn btn-secondary btn-success-back"
                >
                  Submit Another Inquiry
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        .booking-section {
          background-color: var(--bg-secondary);
          border-top: 1px solid var(--border-color);
          border-bottom: 1px solid var(--border-color);
        }

        .booking-grid {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          gap: 80px;
          align-items: center;
        }

        @media (max-width: 1024px) {
          .booking-grid {
            grid-template-columns: 1fr;
            gap: 60px;
          }
        }

        .booking-info {
          text-align: left;
        }

        .booking-info h2 {
          font-size: clamp(2rem, 3.5vw, 3rem);
          line-height: 1.1;
          margin-bottom: 24px;
        }

        .booking-desc {
          font-size: 1.05rem;
          margin-bottom: 48px;
          font-weight: 300;
        }

        /* Steps */
        .process-steps {
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        .step-item {
          display: flex;
          gap: 24px;
        }

        .step-number {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          font-weight: 600;
          color: var(--accent-gold);
          line-height: 1;
        }

        .step-item h4 {
          font-size: 0.9rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 6px;
        }

        .step-item p {
          font-size: 0.82rem;
          color: var(--text-secondary);
        }

        /* Form Wrapper */
        .booking-form-wrapper {
          padding: 48px;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 0px;
          border: 1px solid var(--border-color);
          box-shadow: var(--card-shadow);
        }

        @media (max-width: 560px) {
          .booking-form-wrapper {
            padding: 32px 20px;
          }
        }

        .booking-form {
          width: 100%;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        @media (max-width: 560px) {
          .form-row {
            grid-template-columns: 1fr;
            gap: 0;
          }
        }

        .input-with-icon {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 16px;
          color: #999999;
          pointer-events: none;
          transition: var(--transition-fast);
        }

        .form-control {
          padding-left: 48px;
        }

        .form-control:focus + .input-icon {
          color: var(--accent-gold);
        }

        .textarea-icon-wrapper {
          align-items: flex-start;
        }

        .textarea-icon {
          top: 18px;
        }

        .btn-submit {
          width: 100%;
          padding: 16px;
          font-size: 0.85rem;
          margin-top: 12px;
        }

        /* Success screen styling */
        .booking-success {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 40px 0;
        }

        .success-icon {
          color: var(--accent-gold);
          margin-bottom: 24px;
        }

        .booking-success h3 {
          font-size: 1.6rem;
          margin-bottom: 12px;
        }

        .booking-success p {
          max-width: 380px;
          margin-bottom: 32px;
          font-size: 0.9rem;
          line-height: 1.6;
        }

        .btn-success-back {
          padding: 12px 24px;
          font-size: 0.78rem;
        }
      `}</style>
    </section>
  );
};

export default Booking;
