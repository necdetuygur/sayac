var GHPATH = "https://necdetuygur.github.io/sayac/";
var APP_PREFIX = "sayac_";
var VERSION = "version_00";
var URLS = [
  `${GHPATH}/`,
  `${GHPATH}/app.js`,
  `${GHPATH}/favicon.ico`,
  `${GHPATH}/index.html`,
  `${GHPATH}/jquery.min.js`,
  `${GHPATH}/manifest.webmanifest`,
  `${GHPATH}/matrixrain-app.js`,
  `${GHPATH}/matrixrain.js`,
  `${GHPATH}/soz.js`,
  `${GHPATH}/style.css`,
  `${GHPATH}/sw.js`,
];

//////////////////////////////////////

var CACHE_NAME = APP_PREFIX + VERSION;
self.addEventListener("fetch", function (e) {
  console.log("Fetch request : " + e.request.url);
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) {
        console.log("Responding with cache : " + e.request.url);
        return request;
      } else {
        console.log("File is not cached, fetching : " + e.request.url);
        return fetch(e.request);
      }
    })
  );
});

self.addEventListener("install", function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Installing cache : " + CACHE_NAME);
      return cache.addAll(URLS);
    })
  );
});

self.addEventListener("activate", function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX);
      });
      cacheWhitelist.push(CACHE_NAME);
      return Promise.all(
        keyList.map(function (key, i) {
          if (cacheWhitelist.indexOf(key) === -1) {
            console.log("Deleting cache : " + keyList[i]);
            return caches.delete(keyList[i]);
          }
        })
      );
    })
  );
});
