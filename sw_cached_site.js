const cacheName = 'v2';
// Call Install Event
self.addEventListener('install', e => {
    console.log('Service Worker: Installed');
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
    e.respondWith(
        fetch(e.request)
            .then(res => {
                // 克隆资源
                const resClone = res.clone();

                // 放入缓存
                caches
                    .open(cacheName)
                    .then(cache => {
                        cache.put(e.request, resClone);
                    })
                return res;
            })
            .catch(err => {
                return caches.match(e.request).then(res => res);
            })
    )
})