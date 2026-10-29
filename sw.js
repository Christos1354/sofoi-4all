/* 7 ημέρες με τους Σοφούς — service worker — Christos S Magides — 26-10-2026
   Πρώτα δοκιμάζει το δίκτυο (για να έρχονται πάντα οι νέες εκδόσεις)·
   αν δεν υπάρχει ίντερνετ, δίνει το αποθηκευμένο αντίγραφο. */
var CACHE='sofoi-26-10-2026';
var FILES=['./','index.html','manifest.webmanifest','sofoi-icon-180.png','sofoi-icon-192.png','sofoi-icon-512.png'];
self.addEventListener('install',function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(FILES)}).then(function(){return self.skipWaiting()}))});
self.addEventListener('activate',function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==CACHE}).map(function(k){return caches.delete(k)}))}).then(function(){return self.clients.claim()}))});
self.addEventListener('fetch',function(e){
  var r=e.request;if(r.method!=='GET'||new URL(r.url).origin!==location.origin)return;
  e.respondWith(fetch(r).then(function(res){var cp=res.clone();caches.open(CACHE).then(function(c){c.put(r,cp)});return res})
    .catch(function(){return caches.match(r).then(function(m){return m||caches.match('./')})}));
});
