self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('tiu-campus-shell-v2').then((cache) =>
      cache.addAll(['/manifest.webmanifest', '/icons/tiu-icon.svg', '/icons/tiu-icon-192.png', '/icons/tiu-icon-512.png']),
    ),
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== 'tiu-campus-shell-v2').map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request).catch(() => caches.match('/index.html')),
    );
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const responseClone = response.clone();
        caches.open('tiu-campus-shell-v2').then((cache) => cache.put(event.request, responseClone));
        return response;
      })
      .catch(() => caches.match(event.request)),
  );
});
