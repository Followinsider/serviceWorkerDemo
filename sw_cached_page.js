const cacheName = 'v1';
const cacheAssets = [
    'a.html',
    'b.html',
    '/css/index.css',
    '/js/main.js',
]
// Call Install Event
self.addEventListener('install', e => {
    console.log('Service Worker: Installed');
    e.waitUntil(
        caches
            .open(cacheName)
            .then(cache => {
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    )
})
// Call Activate Event
self.addEventListener('activate', e => {
    console.log('Service Worker: Activate');
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('清楚旧的版本缓存', cache);
                        return caches.delete(cache);
                    }
                })
            )
        })
    )
})
self.addEventListener('fetch', e => {
    e.respondWith(fetch(e.request)).catch(() => caches.match(e.request));
})