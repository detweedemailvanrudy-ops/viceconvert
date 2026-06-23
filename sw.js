const CACHE_NAME = 'vice-convert-v2';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg'
];

// Installeren en bestanden cachen
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting()) // Dwing de nieuwe SW om direct actief te worden
  );
});

// Activeren en oude caches opruimen
self.addEventListener('activate', (e) => {
  e.waitUntil(self.clients.claim());
});

// Offline requests afhandelen
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});