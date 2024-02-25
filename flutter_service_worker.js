'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "a8829007d05ab70a2571ff303d471e8a",
"assets/AssetManifest.bin.json": "c3a4aaffda0fd504bfebe316dc4a4b20",
"assets/AssetManifest.json": "471b92e382aee8ba0bb400624d1a1cb8",
"assets/assets/decoration_1.svg": "0a2ce1dbd818b539fedb8b9eb022e809",
"assets/assets/decoration_2.svg": "598fbcfa877cae8107ae4d197cd7f92d",
"assets/assets/decoration_4.svg": "537d1ff6a0670097de86dd856bf2ea5f",
"assets/assets/decoration_5.svg": "f1b86944152726fa059b171419709115",
"assets/assets/decoration_6.svg": "9604179f9f1d9907691e92658ae67739",
"assets/assets/fonts/SegoeUI-Bold.ttf": "f799a572592ea726e4498b7f919f474a",
"assets/assets/fonts/SegoeUI-Light.ttf": "ec0d28685c3f824a6229676557cef8a5",
"assets/assets/fonts/SegoeUI-SemiBold.ttf": "a761b4729db027f2204334a55621157a",
"assets/assets/fonts/SegoeUI.ttf": "61bb848e77fd1ad14c8fbe4853a198fd",
"assets/assets/github.svg": "f01d8dc4e3a3caa2e66fa264801ce081",
"assets/assets/images/long_logo.png": "e7db2667db13c7fc8ceddcc312c86268",
"assets/assets/images/mac_frame.png": "47ab9e4d97c8876e7ff92b77d8d86d43",
"assets/assets/instagram.svg": "77be7fa33a2c0a809cc46a40bd3516a0",
"assets/assets/line_l.svg": "c7319600d3784e1b88e7fe12e95a85c2",
"assets/assets/line_r.svg": "04f90d7e843584bf478ce195ad122ffc",
"assets/assets/linkedin.svg": "9a02af0b897a6a0400144940bd67e13e",
"assets/assets/team.svg": "538b124076298d7e031512f35f60e781",
"assets/assets/water_layer_1.svg": "78e62b80bf40128577552d9ffa60bcee",
"assets/assets/water_layer_2.svg": "66d7f15d0e12bd43f80502b35f7750b9",
"assets/assets/water_layer_3.svg": "f4361b2a02c445633c0f707374eba8ec",
"assets/assets/whatsapp.svg": "243819bf2affd2499b5d656325faa88a",
"assets/FontManifest.json": "7e0f289e5cb90e7031759cc0545332a1",
"assets/fonts/MaterialIcons-Regular.otf": "a6cdbf71bf5d0b610cdfab63b96ea081",
"assets/NOTICES": "a2f92212dd42f5c2cd7d0cd72ec79bcb",
"assets/packages/iconsax_flutter/fonts/FlutterIconsax.ttf": "83c878235f9c448928034fe5bcba1c8a",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "7737f5fc722b6a040ac15271ea8d92fb",
"canvaskit/canvaskit.js.symbols": "7b6f9bef1e12dd2fd0b45d229968d8d2",
"canvaskit/canvaskit.wasm": "19b252fc7617e35cd3bb97e8caa31552",
"canvaskit/chromium/canvaskit.js": "2f82009588e8a72043db753d360d488f",
"canvaskit/chromium/canvaskit.js.symbols": "d3f439c4a645a9be8133d5e9c50b164e",
"canvaskit/chromium/canvaskit.wasm": "bfd73169ba873e270e0d8447db5324bd",
"canvaskit/skwasm.js": "445e9e400085faead4493be2224d95aa",
"canvaskit/skwasm.js.symbols": "9dd6b6e2967f6a40534b84b5fd269d9d",
"canvaskit/skwasm.wasm": "7dacc679739fa1ae8d7bd91ba33f68b3",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"favicon.png": "364b5da9ebee6969359531fea9177ac9",
"flutter.js": "4af2b91eb221b73845365e1302528f07",
"icons/Icon-192.png": "3691284d57697921f8ee477643ba68f4",
"icons/Icon-512.png": "67dbad9c476fde53dd6c95b2d5281624",
"icons/Icon-maskable-192.png": "3691284d57697921f8ee477643ba68f4",
"icons/Icon-maskable-512.png": "67dbad9c476fde53dd6c95b2d5281624",
"index.html": "f134aa3fde743d82c8920d435f6aa19c",
"/": "f134aa3fde743d82c8920d435f6aa19c",
"main.dart.js": "2ce5d2483515ffc66caa3a3bafb7fe91",
"main.dart.mjs": "e706b0d31d9902c35033ebe604a381a4",
"main.dart.wasm": "8913dcd6fc271830547ea28f3eab6e60",
"manifest.json": "e3b62fc27f4547c0530392aaf054cee3",
"version.json": "d54300e12820f3e9db537130a07d15b0"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"main.dart.wasm",
"main.dart.mjs",
"index.html",
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
