const CACHE_NAME = "ProfessorAi-v1";
const urlsToCache = [
    "/",
    "/index.html",
    "/assets/style.css",
    "/assets/script.js",
    "/assets/img/android-icon-36x36.png",
    "/assets/img/android-icon-48x48.png",
    "/assets/img/android-icon-72x72.png",
    "/assets/img/android-icon-96x96.png",
    "/assets/img/android-icon-144x144.png",
    "/assets/img/android-icon-192x192.png"
];

// Install Service Worker
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache);
        })
    );
});

// Fetch Resources
self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

// Activate Service Worker & Cleanup Old Cache
self.addEventListener("activate", event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});
