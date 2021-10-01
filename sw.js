var cacheName = "hello-pwa";
var filesToCache = [
  "./",
  "./index.html",
  "./css/style.css",
  "./css/font.css",
  "./css/all.min.css",
  "./css/webfonts/fa-solid-900.woff2",
  "./js/main.js",
  "./fonts/Roboto-Black-webfont.woff",
  "./images/back2.jpg",
];

/* Start the service worker and cache all of the app's content */
self.addEventListener("install", (e) => {
  e.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(cacheName);
        return cache.addAll(filesToCache);
      } catch (error) {
        console.log(error.message);
      }
    })()
  );
});

/* Serve cached content when offline */
self.addEventListener("fetch", (e) => {
  e.respondWith(
    (async () => {
      try {
        const response = await caches.match(e.request);
        return response || fetch(e.request);
      } catch (error) {
        console.log(error.message);
      }
    })()
  );
});
