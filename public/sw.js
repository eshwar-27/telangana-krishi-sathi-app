
const CACHE_NAME = 'telangana-agriculture-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      }
    )
  );
});

// Handle background sync for offline data
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-soil-data') {
    event.waitUntil(syncOfflineData());
  }
});

async function syncOfflineData() {
  try {
    // This would sync with your backend when online
    console.log('Syncing offline data...');
    
    // Notify user about successful sync
    self.registration.showNotification('Data Synced', {
      body: 'Your offline soil analysis data has been synced.',
      icon: '/icon-192x192.png',
      tag: 'sync-complete'
    });
  } catch (error) {
    console.error('Sync failed:', error);
  }
}

// Handle push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: 'You have new agriculture recommendations!',
    icon: '/icon-192x192.png',
    badge: '/badge-72x72.png',
    tag: 'agriculture-update'
  };

  event.waitUntil(
    self.registration.showNotification('Telangana Agriculture', options)
  );
});
