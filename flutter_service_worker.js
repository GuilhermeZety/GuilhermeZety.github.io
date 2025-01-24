'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "555d7e982e8439f74d2a3128d5ead32c",
"version.json": "d429e91ab4cafe198b959c993cd48a9d",
"splash/img/light-2x.png": "40d4de69b85ea2c1cc136e26a9b34aa8",
"splash/img/dark-4x.png": "e6f6cdb43caba9cfc50945d8513737d7",
"splash/img/light-3x.png": "d898a33e7b57213ea859b6ed7662e89f",
"splash/img/dark-3x.png": "d898a33e7b57213ea859b6ed7662e89f",
"splash/img/light-4x.png": "e6f6cdb43caba9cfc50945d8513737d7",
"splash/img/dark-2x.png": "40d4de69b85ea2c1cc136e26a9b34aa8",
"splash/img/dark-1x.png": "181448da769589a46af531ce7c3ae9d5",
"splash/img/light-1x.png": "181448da769589a46af531ce7c3ae9d5",
"index.html": "75b10aa052783ac353df3edd473831a1",
"/": "75b10aa052783ac353df3edd473831a1",
"main.dart.js": "41bb9866bf9cfac7c50dec4afb1448a0",
"flutter.js": "4b2350e14c6650ba82871f60906437ea",
"favicon.png": "e74ba0fb3495bfc800d565d184b7f4d6",
"main.dart.mjs": "bfe3fb55befb8d0701000c527a786afb",
"icons/Icon-192.png": "e53f263060161022298a589f587e8867",
"icons/Icon-maskable-192.png": "e53f263060161022298a589f587e8867",
"icons/Icon-maskable-512.png": "76073ecbe96b3128911f861327268a91",
"icons/Icon-512.png": "76073ecbe96b3128911f861327268a91",
"manifest.json": "5ecd7fbf0a54962534985ed4ea774806",
"main.dart.wasm": "de558c15ce3603d23e3f247b8af143b5",
"assets/AssetManifest.json": "b736c333c0c4dc976d7787948a32dbe7",
"assets/NOTICES": "4ce1a6d6bca1af602d3d62abfaeea093",
"assets/FontManifest.json": "1787fbdf23de08fdbb3c70d72a7622d1",
"assets/AssetManifest.bin.json": "b3168d01ff3eac1d0ec7e3eee4724052",
"assets/packages/iconsax_flutter/fonts/FlutterIconsax.ttf": "83c878235f9c448928034fe5bcba1c8a",
"assets/packages/localization/test/assets/lang2/en_US.json": "b389499c34b7ee2ec98c62fe49e08fa0",
"assets/packages/localization/test/assets/lang2/pt_BR.json": "08e9b784a138126822761beec7614524",
"assets/packages/localization/test/assets/lang/en_US.json": "18804652fbce3b62aacb6cce6f572f3c",
"assets/packages/localization/test/assets/lang/pt_BR.json": "f999b93065fe17d355d1ac5dcc1ff830",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/AssetManifest.bin": "24bd7668fbf3d2df7eca61891dbbe710",
"assets/fonts/MaterialIcons-Regular.otf": "128c9e49c7788c843562869f8c561a39",
"assets/assets/images/me.png": "c1f663a76d8b0eb5c95c69dddd77e0c8",
"assets/assets/images/particle.png": "55bb4a2f299175763861e7190d9f4c0e",
"assets/assets/gifs/spinning_cat.gif": "51f5f3f37d7e69e4228803b08245e94c",
"assets/assets/svgs/brazil.svg": "ddfe292f1e89801f5d3a3b928bc6d9c8",
"assets/assets/svgs/github.svg": "326e390c9c9c9461b44230fd561ce6ae",
"assets/assets/svgs/pin.svg": "3d7c198a9c59b2bdcb4d27a48e9118f4",
"assets/assets/svgs/united-states.svg": "c0b17870873e248226a94a9b1e6f13e6",
"assets/assets/svgs/spain.svg": "0dd1315968e08bda5bc5021c4f6bcfa7",
"assets/assets/svgs/linkedin.svg": "2e7e4f01fa8d575e5456f782d1194062",
"assets/assets/svgs/discord.svg": "a9a4d29027ba40a2512b1307a50d732a",
"assets/assets/svgs/mouse.svg": "1a53a7b8f6b94b8aa2ecd814d0b078f6",
"assets/assets/lottie/circle_lottie_light.json": "858587ed29ae32157e92dbd75c63e71e",
"assets/assets/lottie/circle_lottie_dark.json": "29a8fbbf3ca32483e37dd8ce6564c8de",
"assets/assets/fonts/Segoe/SegoeUI-SemiBold.ttf": "a761b4729db027f2204334a55621157a",
"assets/assets/fonts/Segoe/SegoeUI-Light.ttf": "ec0d28685c3f824a6229676557cef8a5",
"assets/assets/fonts/Segoe/SegoeUI-Bold.ttf": "f799a572592ea726e4498b7f919f474a",
"assets/assets/fonts/Segoe/SegoeUI.ttf": "61bb848e77fd1ad14c8fbe4853a198fd",
"assets/assets/native_splash.png": "187d885052e2c9e79570641d2611deb1",
"assets/assets/translations/es_ES.json": "eec22ea519f2d90986ae2dc6a628c140",
"assets/assets/translations/en_US.json": "79a157f39e2165044b2276c78211a9b7",
"assets/assets/translations/pt_BR.json": "929ad20fc0526f76485fc6d8abc31b4b",
"canvaskit/skwasm.js": "ac0f73826b925320a1e9b0d3fd7da61c",
"canvaskit/skwasm.js.symbols": "96263e00e3c9bd9cd878ead867c04f3c",
"canvaskit/canvaskit.js.symbols": "efc2cd87d1ff6c586b7d4c7083063a40",
"canvaskit/skwasm.wasm": "828c26a0b1cc8eb1adacbdd0c5e8bcfa",
"canvaskit/chromium/canvaskit.js.symbols": "e115ddcfad5f5b98a90e389433606502",
"canvaskit/chromium/canvaskit.js": "b7ba6d908089f706772b2007c37e6da4",
"canvaskit/chromium/canvaskit.wasm": "ea5ab288728f7200f398f60089048b48",
"canvaskit/canvaskit.js": "26eef3024dbc64886b7f48e1b6fb05cf",
"canvaskit/canvaskit.wasm": "e7602c687313cfac5f495c5eac2fb324",
"canvaskit/skwasm.worker.js": "89990e8c92bcb123999aa81f7e203b1c"};
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
