'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/asset/blog1.png": "9a1cb8da6476e6568fed79e2fda9e7f0",
"assets/asset/blog2.png": "3f73f066293bb87bc19ea2aa961f0143",
"assets/asset/contact.png": "5f485e36b1e2619c0d51c4ab8d05b357",
"assets/asset/dart.png": "53c3808ec086fff900e7e6e7fb5ac422",
"assets/asset/dflow.png": "bca09b870eec3f4a70a04b2b9f26c77c",
"assets/asset/firebase.png": "93e5c30149613c76d7a597abbcf35c17",
"assets/asset/flu.png": "ec266054a4c091b01a0f8e5968deec3e",
"assets/asset/flutter.jpeg": "e133e625e233464efc722e3f58217179",
"assets/asset/github.png": "224d937f8415041bf2715b4aaa40453e",
"assets/asset/heart.png": "a0b753c7572429c812e9ba0ca61986ed",
"assets/asset/linkedin.png": "f30d56c5212cae985f0277269ce45a51",
"assets/asset/logo.png": "5e48ea88deda241beb6f48fd59ee1759",
"assets/asset/pic.png": "6e8c8d00d697d9d576cbc0d02c7e74e0",
"assets/asset/potrait.png": "90219424022cb06bd0aa2bc21650620d",
"assets/asset/profile_pic.png": "2dc5267bccb0313fda715fdd14ab5d1b",
"assets/asset/project1.jpeg": "d75e44289bfebde64d538ef617b78616",
"assets/asset/project2.png": "127169b4c8429cdc3c2e014e4fb33673",
"assets/asset/project3.jpeg": "1690fad837ed3ca1c9b299b1da64a158",
"assets/asset/project4.jpeg": "e7db6a34bbb5a4de23c11a2707e6a253",
"assets/asset/project5.jpeg": "a52a6c8af93bc1c4600f82b6a63ba68e",
"assets/asset/project6.jpeg": "01f6e90bb7730140bd401caf2628c3a0",
"assets/asset/project7.jpeg": "caceacfb6093bb9082c51c057511b6af",
"assets/asset/project8.jpeg": "e4d8a1d80f64b93477c3f5d4f7aba945",
"assets/asset/sqlite.png": "ff2bf8a4023992b18cde7a6b3c6d777b",
"assets/asset/wave.json": "89e5d30c7ae431a2c33fd3c8e5879bb4",
"assets/AssetManifest.json": "6a673b1da5779d08a116065e60e85a9a",
"assets/FontManifest.json": "b14b92e8afccd7b8fac6a9328dfb2775",
"assets/fonts/Futura%2520Bold%2520font.ttf": "4c62644b159530ff6214336f8cfb1d32",
"assets/fonts/Futura%2520Book%2520font.ttf": "f9f02ed05aa86534c3842d44cb20d6c4",
"assets/fonts/futura%2520medium%2520bt.ttf": "ee64fb9d3f1ba2333e1b489283925bce",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/fonts/Podkova-Regular.ttf": "8e0977e46424a99b717a675439fee2d9",
"assets/NOTICES": "7060e25cb37f8088af3bfa17b52865ac",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"canvaskit/canvaskit.js": "97937cb4c2c2073c968525a3e08c86a3",
"canvaskit/canvaskit.wasm": "3de12d898ec208a5f31362cc00f09b9e",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "a85fcf6324d3c4d3ae3be1ae4931e9c5",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "148dba765ec16756b1ed3e64e9258976",
"/": "148dba765ec16756b1ed3e64e9258976",
"main.dart.js": "e81af25000fff59c2a4cc13708be6609",
"manifest.json": "f4eaeeeabe842ae198d702553def1a2c",
"version.json": "19d57a8c3bc70c69f0d9f966afd2c94b"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
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
