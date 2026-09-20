const CACHE='rahal-v65-3';
const ASSETS=['./','./index.html','./places.html','./trips.html','./favorites.html','./statistics.html','./settings.html','./admin.html','./map.html','./details.html','./photos.html','./v3.html','./login.html','./signup.html','./forgot.html','./profile.html','./auth.js','./auth-ui.js','./drawer-nav.js','./style.css','./app.js','./features-v3.js','./services.js','./map-leaflet.js','./map-loader.js','./map-google.js','./google-maps-config.js','./manifest.json','./rahal-icon-192.png','./rahal-icon-512.png','./images.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('rahal-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 const url=new URL(e.request.url);
 if(url.origin!==location.origin)return;
 e.respondWith((async()=>{
   const cached=await caches.match(e.request);
   const network=fetch(e.request).then(r=>{if(r.ok)caches.open(CACHE).then(c=>c.put(e.request,r.clone()));return r;}).catch(()=>null);
   // Serve cached shell immediately, then refresh it in the background.
   if(cached){network.catch(()=>{});return cached;}
   const fresh=await network;
   return fresh||caches.match('./index.html');
 })());
});
self.addEventListener('sync',e=>{if(e.tag==='rahal-sync')e.waitUntil(self.clients.matchAll().then(cs=>cs.forEach(c=>c.postMessage({type:'rahal-sync'}))))});
