'use client';
import { useEffect } from 'react';

export default function SWRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (!registration) {
          navigator.serviceWorker
            .register('/service-worker.js')
            .then(() => console.log('✅ Service Worker registered'))
            .catch((err) => console.error('❌ SW registration failed:', err));
        } else {
          console.log('✅ Service Worker already registered');
        }
      });
    }
  }, []);

  return null;
}
