'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "version.json": "2004fe180f53904ac8c10ebba32cb1b5",
"index.html": "f9de7876c1dac68edea7da03e98216bc",
"/": "f9de7876c1dac68edea7da03e98216bc",
"main.dart.js": "e48be77f08f4c44ff9c0fe30df74ea43",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "9cd4125f63ae4af603539d5ac817b634",
"assets/AssetManifest.json": "646d29d9761a7d1f9aa452817e144163",
"assets/NOTICES": "86fbfc0c63b2fc7750113d75c65512e5",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/fonts/MaterialIcons-Regular.otf": "1288c9e28052e028aba623321f7826ac",
"assets/assets/images/slow.svg": "27c9fbfab334949b08e87e7e6429fa4b",
"assets/assets/images/keyboard.svg": "67096b47737ba40cc5aa7c195065a105",
"assets/assets/images/multi.svg": "b354269230d8c4c796bac145fd9edcde",
"assets/assets/images/shield.svg": "1c11e277ecb7607b6693438c9b224b64",
"assets/assets/images/plus.svg": "6ef34216ccbeea9752ce8cb47e533587",
"assets/assets/images/hide.svg": "cb2c9612fbfabb12522f30154ffc0f03",
"assets/assets/images/start.svg": "28244601094f8b1a6adc96d7e4203e05",
"assets/assets/images/fast.svg": "d3496b63879be27c715e12f328d13d11",
"assets/assets/images/single.svg": "969c017960e46c16fc61f34d8ae3b390",
"assets/assets/images/remove.svg": "0805d4e4f75bf9f0d045f2f8048be143",
"assets/assets/images/mirror.svg": "cd9f467243dd5ed2e3a22fb9de868c5d",
"assets/assets/images/minus.svg": "265d3bb7b814f2f1c6eedbd532d33b2a",
"assets/assets/images/swap.svg": "5f4d9d2a4735355de8a476c90c054e4d",
"assets/assets/images/heart.svg": "0b177aa3173d352df93383a0ed2ee482",
"assets/assets/audio/item_mirror_create.mp3": "ffcef9fe46763e10a985d123bc4ba5a2",
"assets/assets/audio/bgm4.mp3": "5b144a4978e6c946b08c9e4d90dae056",
"assets/assets/audio/rotate.wav": "080767074fb7406b5487b406daefa787",
"assets/assets/audio/item_mirror_trigger.mp3": "7e1ac565e2480f0ba4c93be30e1db68f",
"assets/assets/audio/item_heart.wav": "f81e84857ae560a85ee951340aebc4ce",
"assets/assets/audio/item_minus.wav": "270156f96985c21548d281fd7b44f92c",
"assets/assets/audio/item_swap.wav": "96f003f51b717f9056ccc710ebadf653",
"assets/assets/audio/item_shield_trigger.wav": "6f8e0c0b6c4dee5d6d47634c1b544146",
"assets/assets/audio/winner.wav": "2d2ea6f5f1eaf65d07ca718ba92c7972",
"assets/assets/audio/item_keyboard.wav": "0611dc8743b89acab353283a6dfdd981",
"assets/assets/audio/item_shield_create.wav": "bddb49dd47565f5b3b6723b8d257a4e3",
"assets/assets/audio/game_over.wav": "1fa147825d7e6f2604026b0edcd3919e",
"assets/assets/audio/bgm3.wav": "2ab3981762ef52ba2dc3b7a99c737cf5",
"assets/assets/audio/item_slow.wav": "f44234b9583e81a0ee06f34992fa9801",
"assets/assets/audio/item_remove.wav": "3131d28af5412accb3833de5efb5363e",
"assets/assets/audio/item_hide.mp3": "06efc54f7c4808c438c59d4ddb7b00e2",
"assets/assets/audio/bgm2.wav": "ff4aeecccf0fd586f2a8fe43bd0c7e9b",
"assets/assets/audio/item_fast.mp3": "0d0a43053ee44620c6705d04634a0166",
"assets/assets/audio/bgm1.wav": "3ca7cb27ed42bc43015d0fd8e5ececd1",
"assets/assets/audio/drop.wav": "7c5016936402219960b41b73653c3286",
"assets/assets/audio/item_plus.wav": "968d180d8350d98e8f57d092f3e1a020",
"assets/assets/audio/remove.wav": "bf82469ec0b41ff181118297a6741c24"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "/",
"main.dart.js",
"index.html",
"assets/NOTICES",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value + '?revision=' + RESOURCES[value], {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache.
        return response || fetch(event.request).then((response) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
