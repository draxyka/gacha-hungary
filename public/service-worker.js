// Setup
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('offline-cache').then((cache) => {
      console.log('Caching essential files');
      return cache.addAll(['/', '/offline.html', '/icons/icon-192x192.png', '/icons/icon-512x512.png']);
    }),
  );
});

// Fetch
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).catch(() => {
        return caches.match('/offline.html');
      });
    }),
  );
});
