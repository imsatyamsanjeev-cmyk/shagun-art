import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Image, Phone, Mail, DollarSign, Upload, Trash2, Check, Inbox, LogOut, Key } from 'lucide-react';
import {
  fetchBookings,
  updateBookingStatus as updateBookingStatusDb,
  removeBooking,
  saveGalleryItem,
  fetchGalleryItems,
  removeGalleryItem
} from '../firebaseService';

const OwnerPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('bookings');
  
  // Data States
  const [bookings, setBookings] = useState([]);
  const [customGallery, setCustomGallery] = useState([]);

  // New Image Form State
  const [newImage, setNewImage] = useState({
    title: '',
    imageSrc: '',
    categories: [],
  });
  const [imagePreview, setImagePreview] = useState(null);

  const categoriesList = ['Realism', 'Portrait', 'Japanese', 'Colour', 'Black & Grey', 'Floral', 'Sleeve', 'Minimal'];

  useEffect(() => {
    // Load Bookings & Gallery from cloud/local on mount/open
    if (isOpen && isAuthenticated) {
      loadData();
    }
  }, [isOpen, isAuthenticated]);

  const loadData = async () => {
    try {
      const dbBookings = await fetchBookings();
      const dbGallery = await fetchGalleryItems();
      setBookings(dbBookings);
      setCustomGallery(dbGallery);
    } catch (err) {
      console.error("Dashboard failed to fetch cloud data:", err);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (passcode === 'shagunart2026') {
      setIsAuthenticated(true);
      setError('');
      setPasscode('');
    } else {
      setError('Invalid Passcode. Please try again.');
    }
  };

  // Booking Actions
  const updateBookingStatus = async (id, newStatus) => {
    try {
      await updateBookingStatusDb(id, newStatus);
      const updated = bookings.map((b) => (b.id === id ? { ...b, status: newStatus } : b));
      setBookings(updated);
    } catch (err) {
      console.error("Failed to update booking status:", err);
    }
  };

  const deleteBooking = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking request?')) {
      try {
        await removeBooking(id);
        const updated = bookings.filter((b) => b.id !== id);
        setBookings(updated);
      } catch (err) {
        console.error("Failed to delete booking request:", err);
      }
    }
  };

  // Image Upload Handling
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setNewImage((prev) => ({ ...prev, imageSrc: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryToggle = (cat) => {
    setNewImage((prev) => {
      const exists = prev.categories.includes(cat);
      if (exists) {
        return { ...prev, categories: prev.categories.filter((c) => c !== cat) };
      } else {
        return { ...prev, categories: [...prev.categories, cat] };
      }
    });
  };

  const handleAddImage = async (e) => {
    e.preventDefault();
    if (!newImage.imageSrc || !newImage.title || newImage.categories.length === 0) {
      alert('Please fill out all fields and select a photo.');
      return;
    }

    const newItem = {
      title: newImage.title,
      image: newImage.imageSrc,
      categories: newImage.categories,
      size: 'square', // Default aspect ratio for custom uploads
    };

    try {
      const saved = await saveGalleryItem(newItem);
      setCustomGallery([saved, ...customGallery]);

      // Reset Form
      setNewImage({ title: '', imageSrc: '', categories: [] });
      setImagePreview(null);

      // Fire Custom Event to trigger Gallery Component refresh instantly
      window.dispatchEvent(new Event('shagun_art_gallery_updated'));
      alert('Portfolio image successfully added to active gallery!');
    } catch (err) {
      console.error("Failed to save custom image:", err);
    }
  };

  const handleDeleteCustomImage = async (id) => {
    if (window.confirm('Are you sure you want to remove this image from the gallery?')) {
      try {
        await removeGalleryItem(id);
        const updated = customGallery.filter((item) => item.id !== id);
        setCustomGallery(updated);
        window.dispatchEvent(new Event('shagun_art_gallery_updated'));
      } catch (err) {
        console.error("Failed to delete custom image:", err);
      }
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsOpen(false);
  };

  return (
    <>
      {/* Subtle Admin Panel Trigger Button in Footer */}
      <button 
        onClick={() => setIsOpen(true)} 
        className="admin-trigger-btn"
        title="Owner Login Panel"
      >
        <Key size={14} />
        <span>Owner Portal</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="panel-overlay"
          >
            {/* 1. LOGIN MODAL */}
            {!isAuthenticated ? (
              <motion.div 
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="login-modal glass-card"
              >
                <button className="close-btn" onClick={() => setIsOpen(false)}>
                  <X size={20} />
                </button>
                <div className="login-header">
                  <Key size={28} className="gold-icon" />
                  <h3>Owner Authentication</h3>
                  <p>Enter your studio passcode to access bookings and manage portfolio.</p>
                </div>
                <form onSubmit={handleLoginSubmit}>
                  <input 
                    type="password"
                    placeholder="Enter passcode"
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    className="form-control admin-input"
                    autoFocus
                  />
                  {error && <p className="error-text">{error}</p>}
                  <button type="submit" className="btn btn-primary w-full mt-4">
                    Authenticate
                  </button>
                </form>
              </motion.div>
            ) : (
              // 2. MAIN ADMIN PORTAL DASHBOARD
              <motion.div 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 30, opacity: 0 }}
                className="dashboard-container"
              >
                <div className="dashboard-header">
                  <div className="header-info">
                    <h2>SHAGUN ART</h2>
                    <p>Studio Owner Dashboard</p>
                  </div>
                  <div className="header-actions">
                    <button className="tab-select-btn" onClick={handleLogout}>
                      <LogOut size={16} />
                      <span>Exit Portal</span>
                    </button>
                    <button className="close-dashboard-btn" onClick={() => setIsOpen(false)}>
                      <X size={24} />
                    </button>
                  </div>
                </div>

                <div className="dashboard-body">
                  {/* Sidebar Navigation */}
                  <div className="dashboard-sidebar">
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }} className="sidebar-links-wrapper">
                      <button 
                        className={`sidebar-link ${activeTab === 'bookings' ? 'active' : ''}`}
                        onClick={() => setActiveTab('bookings')}
                      >
                        <Calendar size={18} />
                        <span>Reservations ({bookings.length})</span>
                      </button>
                      <button 
                        className={`sidebar-link ${activeTab === 'gallery' ? 'active' : ''}`}
                        onClick={() => setActiveTab('gallery')}
                      >
                        <Image size={18} />
                        <span>Portfolio Manager</span>
                      </button>
                    </div>

                    <div className="sidebar-credit">
                      <p>Designed & Developed by <a href="https://devxnex.in" target="_blank" rel="noopener noreferrer" className="credit-link">DevXnex</a></p>
                    </div>
                  </div>

                  {/* Dashboard Content */}
                  <div className="dashboard-content">
                    {/* A. BOOKINGS TAB */}
                    {activeTab === 'bookings' && (
                      <div className="content-inner animate-fade-in">
                        <div className="tab-title-row">
                          <h3>Client Reservations</h3>
                          <p>Manage incoming requests and appointment queries submitted online.</p>
                        </div>

                        {bookings.length === 0 ? (
                          <div className="empty-state">
                            <Inbox size={48} className="muted-icon" />
                            <h4>No Bookings Found</h4>
                            <p>Submitted reservation forms will show up here automatically.</p>
                          </div>
                        ) : (
                          <div className="bookings-list-grid">
                            {bookings.map((booking) => (
                              <div key={booking.id} className="booking-card glass-card">
                                <div className="booking-card-header">
                                  <div>
                                    <h4>{booking.name}</h4>
                                    <span className={`status-badge ${booking.status.toLowerCase()}`}>
                                      {booking.status}
                                    </span>
                                  </div>
                                  <span className="booking-date">
                                    {new Date(booking.createdAt).toLocaleDateString(undefined, {
                                      month: 'short',
                                      day: 'numeric',
                                      hour: '2-digit',
                                      minute: '2-digit',
                                    })}
                                  </span>
                                </div>
                                <div className="booking-card-details">
                                  <p><strong><Mail size={12} /> Email:</strong> {booking.email}</p>
                                  <p><strong><Phone size={12} /> Phone:</strong> {booking.phone}</p>
                                  <p><strong><Calendar size={12} /> Preferred Date:</strong> {booking.preferredDate}</p>
                                  <p className="idea-box"><strong>Service Required:</strong> {booking.serviceRequired || booking.tattooIdea || 'Custom Tattoo'}</p>
                                  {booking.placement && <p><strong>Placement:</strong> {booking.placement}</p>}
                                </div>
                                <div className="booking-card-actions">
                                  {booking.status === 'Pending' && (
                                    <button 
                                      onClick={() => updateBookingStatus(booking.id, 'Confirmed')}
                                      className="action-btn confirm"
                                      title="Confirm Booking"
                                    >
                                      <Check size={14} /> Confirm
                                    </button>
                                  )}
                                  <button 
                                    onClick={() => deleteBooking(booking.id)}
                                    className="action-btn delete"
                                    title="Delete Request"
                                  >
                                    <Trash2 size={14} /> Remove
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* B. GALLERY MANAGER TAB */}
                    {activeTab === 'gallery' && (
                      <div className="content-inner animate-fade-in">
                        <div className="tab-title-row">
                          <h3>Portfolio Manager</h3>
                          <p>Add new artwork images directly from your device into the Masterpiece section without editing code.</p>
                        </div>

                        <div className="gallery-manager-grid">
                          {/* Upload Form */}
                          <form onSubmit={handleAddImage} className="upload-form-wrapper glass-card">
                            <h4>Upload New Artwork</h4>
                            
                            <div className="form-group">
                              <label>Artwork Title</label>
                              <input 
                                type="text"
                                placeholder="e.g. Dragon Sleeve, Minimal Portrait"
                                value={newImage.title}
                                onChange={(e) => setNewImage(prev => ({ ...prev, title: e.target.value }))}
                                className="form-control"
                              />
                            </div>

                            <div className="form-group">
                              <label>Style Categories (Select all that apply)</label>
                              <div className="category-chips-grid">
                                {categoriesList.map((cat) => (
                                  <button
                                    type="button"
                                    key={cat}
                                    className={`category-chip ${newImage.categories.includes(cat) ? 'selected' : ''}`}
                                    onClick={() => handleCategoryToggle(cat)}
                                  >
                                    {cat}
                                  </button>
                                ))}
                              </div>
                            </div>

                            <div className="form-group">
                              <label>Tattoo Photo File</label>
                              <div className="file-upload-dropzone">
                                <input 
                                  type="file"
                                  accept="image/*"
                                  id="portfolio-file"
                                  onChange={handleFileChange}
                                  className="hidden-file-input"
                                />
                                <label htmlFor="portfolio-file" className="dropzone-label">
                                  {imagePreview ? (
                                    <img src={imagePreview} alt="Preview" className="preview-thumbnail" />
                                  ) : (
                                    <>
                                      <Upload size={24} className="gold-icon" />
                                      <span>Click to browse images</span>
                                    </>
                                  )}
                                </label>
                              </div>
                            </div>

                            <button type="submit" className="btn btn-primary w-full mt-4">
                              Publish to Live Gallery
                            </button>
                          </form>

                          {/* Existing Custom Images List */}
                          <div className="custom-gallery-list-wrapper">
                            <h4>Active Custom Uploads ({customGallery.length})</h4>
                            {customGallery.length === 0 ? (
                              <p className="no-custom-text">No custom uploaded images yet. Use the upload panel to publish portfolio items.</p>
                            ) : (
                              <div className="custom-images-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '14px' }}>
                                {customGallery.map((item) => (
                                  <div 
                                    key={item.id} 
                                    style={{
                                      border: '1px solid #EAEAEA',
                                      borderRadius: '6px',
                                      overflow: 'hidden',
                                      backgroundColor: '#ffffff',
                                      display: 'flex',
                                      flexDirection: 'column',
                                      boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                                    }}
                                  >
                                    <div style={{ aspectRatio: '1/1', width: '100%', overflow: 'hidden', position: 'relative' }}>
                                      <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                                    </div>
                                    <div style={{
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'space-between',
                                      padding: '8px 10px',
                                      backgroundColor: '#fafafa',
                                      borderTop: '1px solid #EAEAEA'
                                    }}>
                                      <h5 style={{
                                        fontSize: '0.72rem',
                                        color: '#111111',
                                        fontWeight: '600',
                                        margin: '0',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        maxWidth: 'calc(100% - 24px)'
                                      }}>{item.title}</h5>
                                      <button 
                                        onClick={() => handleDeleteCustomImage(item.id)}
                                        style={{
                                          background: 'none',
                                          border: 'none',
                                          color: '#ef5350',
                                          cursor: 'pointer',
                                          display: 'flex',
                                          alignItems: 'center',
                                          padding: '4px',
                                          transition: 'transform 0.2s'
                                        }}
                                        title="Delete from site"
                                      >
                                        <Trash2 size={15} />
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mobile-dashboard-credit">
                      <p>Designed & Developed by <a href="https://devxnex.in" target="_blank" rel="noopener noreferrer" className="credit-link">DevXnex</a></p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        /* Trigger button style in footer */
        .admin-trigger-btn {
          background: none;
          border: none;
          color: var(--text-secondary);
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          display: flex;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          padding: 8px 12px;
          margin-top: 10px;
          transition: var(--transition-fast);
          opacity: 0.7;
        }

        .admin-trigger-btn:hover {
          color: var(--accent-gold);
          opacity: 1;
        }

        /* Overlay modal covering entire screen */
        .panel-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background-color: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          z-index: 10005;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-primary);
          font-family: var(--font-body);
        }

        /* Login dialog box */
        .login-modal {
          width: 90%;
          max-width: 420px;
          padding: 40px;
          position: relative;
          text-align: center;
          box-shadow: 0 20px 50px rgba(0,0,0,0.08);
          border: 1px solid var(--border-color);
          background-color: #ffffff;
        }

        .login-modal .close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          cursor: pointer;
          color: var(--text-secondary);
        }

        .login-header {
          margin-bottom: 24px;
        }

        .login-header h3 {
          font-size: 1.3rem;
          margin-top: 12px;
          margin-bottom: 8px;
        }

        .login-header p {
          font-size: 0.75rem;
          line-height: 1.5;
        }

        .admin-input {
          text-align: center;
          letter-spacing: 0.25em;
          font-size: 1.2rem !important;
          font-weight: 600 !important;
        }

        .error-text {
          color: #d32f2f;
          font-size: 0.72rem;
          margin-top: 8px;
        }

        /* Main Fullscreen Dashboard Layout */
        .dashboard-container {
          width: 100vw;
          height: 100vh;
          display: flex;
          flex-direction: column;
          background-color: #fcfcfc;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 18px 32px;
          border-bottom: 1px solid var(--border-color);
          background-color: #ffffff;
        }

        .header-info h2 {
          font-size: 1.3rem;
          letter-spacing: 0.1em;
          font-weight: 700;
        }

        .header-info p {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .tab-select-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: 1px solid var(--border-color);
          padding: 8px 16px;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .tab-select-btn:hover {
          border-color: var(--text-primary);
        }

        .close-dashboard-btn {
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          color: var(--text-secondary);
        }

        .dashboard-body {
          flex: 1;
          display: flex;
          overflow: hidden;
        }

        @media (max-width: 768px) {
          .dashboard-body {
            flex-direction: column;
          }
        }

        /* Sidebar navigation link buttons */
        .dashboard-sidebar {
          width: 250px;
          border-right: 1px solid var(--border-color);
          background-color: #ffffff;
          padding: 24px 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .sidebar-credit {
          font-size: 0.65rem;
          color: var(--text-secondary);
          text-align: center;
          padding-top: 16px;
          border-top: 1px solid var(--border-color);
          margin-top: 24px;
        }

        .mobile-dashboard-credit {
          display: none;
          font-size: 0.68rem;
          color: var(--text-secondary);
          text-align: center;
          padding-top: 24px;
          border-top: 1px solid var(--border-color);
          margin-top: 40px;
        }

        .credit-link {
          color: var(--text-primary);
          font-weight: 600;
          text-decoration: underline;
          transition: var(--transition-fast);
        }

        .credit-link:hover {
          color: var(--accent-gold);
        }

        @media (max-width: 768px) {
          .dashboard-sidebar {
            width: 100%;
            border-right: none;
            border-bottom: 1px solid var(--border-color);
            flex-direction: row;
            padding: 12px;
            overflow-x: auto;
          }

          .sidebar-credit {
            display: none !important;
          }

          .mobile-dashboard-credit {
            display: block !important;
          }
        }

        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 20px;
          border: none;
          background: none;
          width: 100%;
          text-align: left;
          font-size: 0.8rem;
          font-weight: 500;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-secondary);
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .sidebar-link.active {
          color: var(--text-primary);
          background-color: var(--bg-secondary);
          border-left: 3px solid var(--accent-gold);
        }

        @media (max-width: 768px) {
          .sidebar-link.active {
            border-left: none;
            border-bottom: 2px solid var(--accent-gold);
            background-color: transparent;
          }
        }

        /* Dashboard content layout */
        .dashboard-content {
          flex: 1;
          padding: 40px;
          overflow-y: auto;
        }

        @media (max-width: 560px) {
          .dashboard-content {
            padding: 20px 12px;
          }
        }

        .tab-title-row {
          margin-bottom: 32px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 16px;
        }

        .tab-title-row h3 {
          font-size: 1.5rem;
          margin-bottom: 6px;
        }

        /* Bookings List Layout styling */
        .bookings-list-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 24px;
        }

        .booking-card {
          padding: 24px;
          border: 1px solid var(--border-color);
          background-color: #ffffff;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .booking-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 16px;
          border-bottom: 1px solid var(--bg-secondary);
          padding-bottom: 12px;
        }

        .booking-card-header h4 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .booking-date {
          font-size: 0.65rem;
          color: var(--text-secondary);
          text-transform: uppercase;
        }

        .status-badge {
          display: inline-block;
          font-size: 0.58rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 2px 8px;
          background-color: #f0f0f0;
          border-radius: 4px;
        }

        .status-badge.pending {
          background-color: #fff8e1;
          color: #f57f17;
        }

        .status-badge.confirmed {
          background-color: #e8f5e9;
          color: #2e7d32;
        }

        .booking-card-details {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 0.78rem;
          margin-bottom: 20px;
        }

        .booking-card-details p {
          font-size: 0.78rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .idea-box {
          background-color: var(--bg-secondary);
          padding: 10px;
          border-radius: 4px;
          font-style: italic;
          display: block !important;
          line-height: 1.4;
        }

        .booking-card-actions {
          display: flex;
          gap: 12px;
        }

        .action-btn {
          flex: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 12px;
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border: 1px solid var(--border-color);
          background-color: transparent;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .action-btn.confirm {
          border-color: #2e7d32;
          color: #2e7d32;
        }

        .action-btn.confirm:hover {
          background-color: #2e7d32;
          color: #ffffff;
        }

        .action-btn.delete {
          border-color: #d32f2f;
          color: #d32f2f;
        }

        .action-btn.delete:hover {
          background-color: #d32f2f;
          color: #ffffff;
        }

        /* Empty state styling */
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 60px 20px;
          color: var(--text-secondary);
        }

        .muted-icon {
          color: var(--border-color);
          margin-bottom: 16px;
        }

        .empty-state h4 {
          font-size: 1.1rem;
          font-weight: 500;
          margin-bottom: 6px;
          color: var(--text-primary);
        }

        /* Gallery Manager Tab layout styling */
        .gallery-manager-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: start;
        }

        @media (max-width: 900px) {
          .gallery-manager-grid {
            grid-template-columns: 1fr;
          }
        }

        .upload-form-wrapper {
          padding: 30px;
          background-color: #ffffff;
          border: 1px solid var(--border-color);
        }

        .upload-form-wrapper h4, .custom-gallery-list-wrapper h4 {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 24px;
          border-bottom: 1px solid var(--bg-secondary);
          padding-bottom: 10px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 8px;
        }

        .category-chips-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .category-chip {
          background: none;
          border: 1px solid var(--border-color);
          padding: 6px 12px;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .category-chip.selected {
          background-color: var(--accent-black);
          color: #ffffff;
          border-color: var(--accent-black);
        }

        /* File dropzone styling */
        .file-upload-dropzone {
          border: 2px dashed var(--border-color);
          padding: 30px;
          text-align: center;
          cursor: pointer;
          border-radius: 4px;
          transition: border-color 0.25s;
        }

        .file-upload-dropzone:hover {
          border-color: var(--accent-gold);
        }

        .hidden-file-input {
          display: none;
        }

        .dropzone-label {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          font-size: 0.75rem;
          color: var(--text-secondary);
          width: 100%;
          height: 100%;
        }

        .preview-thumbnail {
          max-width: 100%;
          max-height: 180px;
          object-fit: contain;
          border: 1px solid var(--border-color);
        }

        /* Custom gallery active images list */
        .custom-gallery-list-wrapper {
          display: flex;
          flex-direction: column;
        }

        .no-custom-text {
          font-size: 0.8rem;
          color: var(--text-secondary);
          font-style: italic;
        }

        .custom-images-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
          gap: 14px;
        }

        .custom-image-card-container {
          border: 1px solid var(--border-color);
          border-radius: 6px;
          overflow: hidden;
          background: #ffffff;
          display: flex;
          flex-direction: column;
        }

        .custom-image-card {
          aspect-ratio: 1;
          width: 100%;
          overflow: hidden;
          position: relative;
        }

        .custom-image-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .custom-image-card-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 10px;
          background-color: #fafafa;
          border-top: 1px solid var(--border-color);
        }

        .custom-image-title {
          font-size: 0.72rem;
          color: var(--text-primary);
          font-weight: 500;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          max-width: calc(100% - 24px);
          margin-bottom: 0;
        }

        .delete-custom-btn-visible {
          background: none;
          border: none;
          color: #ef5350;
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 4px;
          transition: transform 0.2s;
        }

        .delete-custom-btn-visible:hover {
          transform: scale(1.1);
          color: #d32f2f;
        }

        .w-full {
          width: 100%;
        }

        .mt-4 {
          margin-top: 16px;
        }
      `}</style>
    </>
  );
};

export default OwnerPanel;
