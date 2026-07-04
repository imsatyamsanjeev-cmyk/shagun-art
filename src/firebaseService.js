import { db, isFirebaseConfigured } from './firebase';
import { 
  collection, 
  addDoc, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy 
} from 'firebase/firestore';

// ----------------------------------------------------
// 1. BOOKINGS DATA SERVICES
// ----------------------------------------------------

export const saveBooking = async (bookingData) => {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = await addDoc(collection(db, 'bookings'), {
        ...bookingData,
        createdAt: new Date().toISOString()
      });
      return { id: docRef.id, ...bookingData };
    } catch (error) {
      console.error("Firestore saveBooking error, falling back to local:", error);
    }
  }
  
  // Local fallback
  const localList = JSON.parse(localStorage.getItem('shagun_art_bookings') || '[]');
  const localItem = { id: Date.now().toString(), ...bookingData, createdAt: new Date().toISOString() };
  localList.unshift(localItem);
  localStorage.setItem('shagun_art_bookings', JSON.stringify(localList));
  return localItem;
};

export const fetchBookings = async () => {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      return items;
    } catch (error) {
      console.error("Firestore fetchBookings error, falling back to local:", error);
    }
  }

  // Local fallback
  return JSON.parse(localStorage.getItem('shagun_art_bookings') || '[]');
};

export const updateBookingStatus = async (id, newStatus) => {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'bookings', id);
      await updateDoc(docRef, { status: newStatus });
      return true;
    } catch (error) {
      console.error("Firestore updateBookingStatus error, falling back to local:", error);
    }
  }

  // Local fallback
  const localList = JSON.parse(localStorage.getItem('shagun_art_bookings') || '[]');
  const updated = localList.map(b => b.id.toString() === id.toString() ? { ...b, status: newStatus } : b);
  localStorage.setItem('shagun_art_bookings', JSON.stringify(updated));
  return true;
};

export const removeBooking = async (id) => {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'bookings', id));
      return true;
    } catch (error) {
      console.error("Firestore removeBooking error, falling back to local:", error);
    }
  }

  // Local fallback
  const localList = JSON.parse(localStorage.getItem('shagun_art_bookings') || '[]');
  const updated = localList.filter(b => b.id.toString() !== id.toString());
  localStorage.setItem('shagun_art_bookings', JSON.stringify(updated));
  return true;
};


// ----------------------------------------------------
// 2. CUSTOM GALLERY IMAGES SERVICES
// ----------------------------------------------------

export const saveGalleryItem = async (itemData) => {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = await addDoc(collection(db, 'gallery'), {
        ...itemData,
        createdAt: new Date().toISOString()
      });
      return { id: docRef.id, ...itemData };
    } catch (error) {
      console.error("Firestore saveGalleryItem error, falling back to local:", error);
    }
  }

  // Local fallback
  const localList = JSON.parse(localStorage.getItem('shagun_art_custom_gallery') || '[]');
  const localItem = { id: Date.now().toString(), ...itemData, createdAt: new Date().toISOString() };
  localList.unshift(localItem);
  localStorage.setItem('shagun_art_custom_gallery', JSON.stringify(localList));
  return localItem;
};

export const fetchGalleryItems = async () => {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      return items;
    } catch (error) {
      console.error("Firestore fetchGalleryItems error, falling back to local:", error);
    }
  }

  // Local fallback
  return JSON.parse(localStorage.getItem('shagun_art_custom_gallery') || '[]');
};

export const removeGalleryItem = async (id) => {
  if (isFirebaseConfigured && db) {
    try {
      await deleteDoc(doc(db, 'gallery', id));
      return true;
    } catch (error) {
      console.error("Firestore removeGalleryItem error, falling back to local:", error);
    }
  }

  // Local fallback
  const localList = JSON.parse(localStorage.getItem('shagun_art_custom_gallery') || '[]');
  const updated = localList.filter(item => item.id.toString() !== id.toString());
  localStorage.setItem('shagun_art_custom_gallery', JSON.stringify(updated));
  return true;
};
