/* Sobe e Desce — service worker
   Muda VERSAO sempre que alterares o index.html, senão os telemóveis ficam
   com a versão antiga em cache. */
const VERSAO = 'sobe-e-desce-v8';
const ESSENCIAIS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png',
  './icon-maskable-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSAO).then(c => c.addAll(ESSENCIAIS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== VERSAO).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request).then(hit => {
      if (hit) return hit;
      return fetch(e.request).then(res => {
        // guarda também os tipos de letra do Google para funcionar offline
        if (res.ok && (e.request.url.startsWith(self.location.origin) || e.request.url.includes('fonts.g'))) {
          const copia = res.clone();
          caches.open(VERSAO).then(c => c.put(e.request, copia));
        }
        return res;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
