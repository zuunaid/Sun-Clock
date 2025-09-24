const CACHE = "sunclock-v1";
const ASSETS = [
  "./",
  "./index.html",   // rename your file if needed
  "./manifest.json",
  "./sw.js",
  "https://unpkg.com/suncalc@1.9.0/suncalc.js"
  // add any images/fonts you reference (e.g., ./icons/icon-192.png, ./icons/icon-512.png)
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
