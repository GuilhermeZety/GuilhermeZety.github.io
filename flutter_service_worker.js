'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "b1ef8c2d6b16f18dd59088dda6601e5a",
"assets/AssetManifest.bin.json": "451dd7e93938e2e7780735cb08edc05e",
"assets/AssetManifest.json": "49e4fec9ef8c43fdf45f629a4e53046e",
"assets/assets/fonts/Segoe/SegoeUI-Bold.ttf": "f799a572592ea726e4498b7f919f474a",
"assets/assets/fonts/Segoe/SegoeUI-Light.ttf": "ec0d28685c3f824a6229676557cef8a5",
"assets/assets/fonts/Segoe/SegoeUI-SemiBold.ttf": "a761b4729db027f2204334a55621157a",
"assets/assets/fonts/Segoe/SegoeUI.ttf": "61bb848e77fd1ad14c8fbe4853a198fd",
"assets/assets/native_splash.png": "187d885052e2c9e79570641d2611deb1",
"assets/assets/spinning_cat.gif": "51f5f3f37d7e69e4228803b08245e94c",
"assets/assets/svgs/brazil.svg": "209b99855e3427cde11f39e26201160b",
"assets/assets/svgs/mouse.svg": "1a53a7b8f6b94b8aa2ecd814d0b078f6",
"assets/assets/svgs/spain.svg": "16facb99b9cbd368b3402644d68f6160",
"assets/assets/svgs/united-states.svg": "1d5b7689bdc3566d3eacd613de6a6c0f",
"assets/assets/translations/en_US.json": "a76a9b550ab07116378a2cba8d74cd5b",
"assets/assets/translations/es_ES.json": "7d71c0f0eb647ce5ef9a67d8423dfa1a",
"assets/assets/translations/pt_BR.json": "c569a6107e811a0fdcd820a735be08eb",
"assets/FontManifest.json": "1787fbdf23de08fdbb3c70d72a7622d1",
"assets/fonts/MaterialIcons-Regular.otf": "b4b3ef5f2e02ff710f5903b17b31aa6d",
"assets/NOTICES": "903185c3d88d105ade117259349f6ed3",
"assets/packages/iconsax_flutter/fonts/FlutterIconsax.ttf": "83c878235f9c448928034fe5bcba1c8a",
"assets/packages/localization/test/assets/lang/en_US.json": "18804652fbce3b62aacb6cce6f572f3c",
"assets/packages/localization/test/assets/lang/pt_BR.json": "f999b93065fe17d355d1ac5dcc1ff830",
"assets/packages/localization/test/assets/lang2/en_US.json": "b389499c34b7ee2ec98c62fe49e08fa0",
"assets/packages/localization/test/assets/lang2/pt_BR.json": "08e9b784a138126822761beec7614524",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "5fda3f1af7d6433d53b24083e2219fa0",
"canvaskit/canvaskit.js.symbols": "48c83a2ce573d9692e8d970e288d75f7",
"canvaskit/canvaskit.wasm": "1f237a213d7370cf95f443d896176460",
"canvaskit/chromium/canvaskit.js": "87325e67bf77a9b483250e1fb1b54677",
"canvaskit/chromium/canvaskit.js.symbols": "a012ed99ccba193cf96bb2643003f6fc",
"canvaskit/chromium/canvaskit.wasm": "b1ac05b29c127d86df4bcfbf50dd902a",
"canvaskit/skwasm.js": "9fa2ffe90a40d062dd2343c7b84caf01",
"canvaskit/skwasm.js.symbols": "262f4827a1317abb59d71d6c587a93e2",
"canvaskit/skwasm.wasm": "9f0c0c02b82a910d12ce0543ec130e60",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"favicon.png": "e74ba0fb3495bfc800d565d184b7f4d6",
"flutter.js": "f31737fb005cd3a3c6bd9355efd33061",
"flutter_bootstrap.js": "dbf5fb9867c88067ce2ddadfc9718407",
"icons/Icon-192.png": "e53f263060161022298a589f587e8867",
"icons/Icon-512.png": "76073ecbe96b3128911f861327268a91",
"icons/Icon-maskable-192.png": "e53f263060161022298a589f587e8867",
"icons/Icon-maskable-512.png": "76073ecbe96b3128911f861327268a91",
"index.html": "75b10aa052783ac353df3edd473831a1",
"/": "75b10aa052783ac353df3edd473831a1",
"main.dart.js": "8c883e8d77f81c20e921722e78ad202b",
"main.dart.mjs": "e0b7a773e287b50849e29b13dcd019b2",
"main.dart.wasm": "886f26f1c1092b591367453ddb7a148d",
"manifest.json": "0fd5ea8ae64e18c51a7bb1f438aaad22",
"splash/img/dark-1x.png": "181448da769589a46af531ce7c3ae9d5",
"splash/img/dark-2x.png": "40d4de69b85ea2c1cc136e26a9b34aa8",
"splash/img/dark-3x.png": "d898a33e7b57213ea859b6ed7662e89f",
"splash/img/dark-4x.png": "e6f6cdb43caba9cfc50945d8513737d7",
"splash/img/light-1x.png": "181448da769589a46af531ce7c3ae9d5",
"splash/img/light-2x.png": "40d4de69b85ea2c1cc136e26a9b34aa8",
"splash/img/light-3x.png": "d898a33e7b57213ea859b6ed7662e89f",
"splash/img/light-4x.png": "e6f6cdb43caba9cfc50945d8513737d7",
"version.json": "832e17c492ae8f14bbe8467ba8fc85c6"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"main.dart.wasm",
"main.dart.mjs",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
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
        // Claim client to enable caching on first launch
        self.clients.claim();
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
      // Claim client to enable caching on first launch
      self.clients.claim();
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
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
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
