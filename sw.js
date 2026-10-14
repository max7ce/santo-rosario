/* Santo Rosario · UCB — Service worker
   Al publicar cambios, sube el número de VERSION para que todos reciban la actualización. */
const VERSION = 'rosario-ucb-v1.0.0';
const ARCHIVOS = [
  './',
  'index.html',
  'manifest.webmanifest',
  'css/app.css',
  'js/contenido.js',
  'js/app.js',
  'img/escudo.png',
  'img/logotipo-blanco.png',
  'img/logotipo-azul.png',
  'img/isologo-vertical.png',
  'icons/icon.svg',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-192.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png',
  'icons/favicon-32.png',
  'fonts/source-serif-4-latin-400-normal.woff2',
  'fonts/source-serif-4-latin-400-italic.woff2',
  'fonts/source-serif-4-latin-600-normal.woff2',
  'fonts/fira-sans-latin-400-normal.woff2',
  'fonts/fira-sans-latin-500-normal.woff2',
  'fonts/fira-sans-latin-600-normal.woff2'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(ARCHIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((claves) => Promise.all(claves.filter((k) => k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Primero la caché (funciona sin conexión); en segundo plano se actualiza desde la red.
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    caches.open(VERSION).then(async (cache) => {
      const enCache = await cache.match(req, { ignoreSearch: true });
      const red = fetch(req).then((res) => {
        if (res && res.ok) cache.put(req, res.clone());
        return res;
      }).catch(() => null);
      if (enCache) { e.waitUntil(red); return enCache; }
      const res = await red;
      if (res) return res;
      if (req.mode === 'navigate') return cache.match('index.html');
      return Response.error();
    })
  );
});
