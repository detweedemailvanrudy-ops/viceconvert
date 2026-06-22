const CACHE_NAME = 'vice-convert-v1';
const ASSETS = [
  'index.html',
  'manifest.json'
];

// Installeren en bestanden cachen
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Offline requests afhandelen
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});