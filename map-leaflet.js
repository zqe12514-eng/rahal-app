const T=(ar,en)=>window.lang&&window.lang()==='en'?en:ar;
function initRahalLeafletMap(){
function offlineMap({status,initialLat,initialLng,hasInitial}){
       const el=document.getElementById("map");
       el.innerHTML=`<div class="offline-map-wrap"><div class="offline-map-toolbar"><button type="button" id="offZoomIn" class="btn">＋</button><button type="button" id="offZoomOut" class="btn">−</button><button type="button" id="offReset" class="btn">🌍 العالم</button></div><canvas id="offlineCanvas" aria-label="خريطة رحّال دون إنترنت"></canvas></div>`;
       const canvas=document.getElementById('offlineCanvas'),ctx=canvas.getContext('2d');
       let places=[];
       try{ places=(typeof allDestinations==='function'?allDestinations():[]).filter(d=>Number.isFinite(+d.lat)&&Number.isFinite(+d.lng)).map(d=>({...d,lat:+d.lat,lng:+d.lng})); }catch{}
       const fallbackPlaces=[
        {city:'صنعاء',en:'Sanaa',country:'اليمن',lat:15.3694,lng:44.1910,flag:'🇾🇪'},
        {city:'تعز',en:'Taiz',country:'اليمن',lat:13.5789,lng:44.0219,flag:'🇾🇪'},
        {city:'إب',en:'Ibb',country:'اليمن',lat:13.9667,lng:44.1833,flag:'🇾🇪'},
        {city:'عدن',en:'Aden',country:'اليمن',lat:12.7855,lng:45.0187,flag:'🇾🇪'},
        {city:'شبام حضرموت',en:'Shibam',country:'اليمن',lat:15.9267,lng:48.6275,flag:'🇾🇪'},
        {city:'سقطرى',en:'Socotra',country:'اليمن',lat:12.4634,lng:53.8237,flag:'🇾🇪'}
       ];
       if(!places.length)places=fallbackPlaces;
       try{const c=JSON.parse(localStorage.getItem('rahal-custom-destinations')||'[]'); c.forEach(d=>{if(Number.isFinite(+d.lat)&&Number.isFinite(+d.lng))places.push({...d,lat:+d.lat,lng:+d.lng})})}catch{}
       let zoom=1, center={lat:20,lng:20}, showRoute=false, routeFrom=null, routeTo=null;
       const saved=localStorage.getItem('rahal-last-location'); let user=null; try{if(saved)user=JSON.parse(saved)}catch{}
       if(hasInitial) center={lat:initialLat,lng:initialLng};
       function resize(){const r=el.getBoundingClientRect();canvas.width=Math.max(320,Math.floor(r.width*devicePixelRatio));canvas.height=Math.max(420,Math.floor(r.height*devicePixelRatio));draw()}
       function project(lat,lng){const w=canvas.width,h=canvas.height;const scale=Math.min(w/360,h/180)*zoom;return [w/2+(lng-center.lng)*scale,h/2-(lat-center.lat)*scale]}
       function poly(points,fill,stroke){ctx.beginPath();points.forEach((p,i)=>{const [x,y]=project(p[0],p[1]);i?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.closePath();ctx.fillStyle=fill;ctx.fill();if(stroke){ctx.strokeStyle=stroke;ctx.lineWidth=1.2*devicePixelRatio;ctx.stroke()}}
       function draw(){
         const w=canvas.width,h=canvas.height;ctx.clearRect(0,0,w,h);ctx.fillStyle='#eaf4f8';ctx.fillRect(0,0,w,h);
         ctx.strokeStyle='#c9dce4';ctx.lineWidth=1*devicePixelRatio;
         for(let lng=-180;lng<=180;lng+=30){const [x]=project(0,lng);ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,h);ctx.stroke()}
         for(let lat=-60;lat<=60;lat+=20){const [,y]=project(lat,0);ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke()}
         // Simplified world silhouettes used only as a visual offline fallback.
         poly([[-168,72],[-145,70],[-130,58],[-124,45],[-117,30],[-105,20],[-96,15],[-88,22],[-82,30],[-75,45],[-60,52],[-55,64],[-80,72],[-110,78],[-145,78]],'#dceee4','#a5c4b1');
         poly([[-82,12],[-72,8],[-60,-5],[-54,-18],[-58,-38],[-70,-55],[-78,-42],[-74,-20]],'#dceee4','#a5c4b1');
         poly([[-18,37],[5,36],[28,30],[42,10],[36,-10],[28,-34],[16,-35],[5,-10],[-5,5],[-15,18]],'#dceee4','#a5c4b1');
         poly([[28,70],[65,72],[105,68],[145,55],[170,45],[160,25],[135,15],[115,5],[90,10],[65,25],[45,35]],'#dceee4','#a5c4b1');
         poly([[110,-10],[155,-12],[160,-30],[145,-45],[120,-38]],'#dceee4','#a5c4b1');
         poly([[-50,78],[-20,80],[10,78],[35,70],[20,60],[-10,60]],'#dceee4','#a5c4b1');
         places.forEach(d=>{const [x,y]=project(+d.lat,+d.lng);if(x<-40||x>w+40||y<-45||y>h+45)return;const r=9*devicePixelRatio;ctx.save();ctx.translate(x,y);ctx.beginPath();ctx.moveTo(0,18*devicePixelRatio);ctx.bezierCurveTo(-3*devicePixelRatio,12*devicePixelRatio,-11*devicePixelRatio,5*devicePixelRatio,-11*devicePixelRatio,-3*devicePixelRatio);ctx.arc(0,-3*devicePixelRatio,11*devicePixelRatio,Math.PI,0);ctx.bezierCurveTo(11*devicePixelRatio,5*devicePixelRatio,3*devicePixelRatio,12*devicePixelRatio,0,18*devicePixelRatio);ctx.closePath();ctx.fillStyle='#1689e8';ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=2*devicePixelRatio;ctx.stroke();ctx.beginPath();ctx.arc(0,-3*devicePixelRatio,3*devicePixelRatio,0,Math.PI*2);ctx.fillStyle='#fff';ctx.fill();ctx.restore();ctx.font=`${11*devicePixelRatio}px sans-serif`;ctx.fillStyle='#17324a';ctx.fillText(d.city||d.name||T('موقع','Place'),x+13*devicePixelRatio,y-9*devicePixelRatio)});
         if(user&&Number.isFinite(+user.lat)&&Number.isFinite(+user.lng)){const [x,y]=project(+user.lat,+user.lng);ctx.beginPath();ctx.arc(x,y,7*devicePixelRatio,0,Math.PI*2);ctx.fillStyle='#1689e8';ctx.fill();ctx.strokeStyle='#fff';ctx.lineWidth=3*devicePixelRatio;ctx.stroke();ctx.beginPath();ctx.arc(x,y,15*devicePixelRatio,0,Math.PI*2);ctx.strokeStyle='rgba(22,137,232,.25)';ctx.lineWidth=2*devicePixelRatio;ctx.stroke();ctx.font=`bold ${12*devicePixelRatio}px sans-serif`;ctx.fillStyle='#17324a';ctx.fillText(T('موقعي','My location'),x+12*devicePixelRatio,y+5*devicePixelRatio)}
         if(showRoute&&routeFrom&&routeTo){const [x1,y1]=project(routeFrom.lat,routeFrom.lng),[x2,y2]=project(routeTo.lat,routeTo.lng);ctx.beginPath();ctx.moveTo(x1,y1);ctx.lineTo(x2,y2);ctx.strokeStyle='#1689e8';ctx.lineWidth=4*devicePixelRatio;ctx.setLineDash([10*devicePixelRatio,8*devicePixelRatio]);ctx.stroke();ctx.setLineDash([])}
       }
       let dragging=false,lastX=0,lastY=0;
       canvas.addEventListener('click',e=>{if(dragging)return;const r=canvas.getBoundingClientRect(),sx=canvas.width/r.width,sy=canvas.height/r.height,mx=(e.clientX-r.left)*sx,my=(e.clientY-r.top)*sy;let hit=null,best=Infinity;places.forEach(d=>{const [x,y]=project(+d.lat,+d.lng),dist=Math.hypot(x-mx,y-my);if(dist<35*devicePixelRatio&&dist<best){best=dist;hit=d}});if(hit){status.textContent=`📍 ${hit.city||hit.name} — ${hit.country||''}`;return;} const w=canvas.width,h=canvas.height,scale=Math.min(w/360,h/180)*zoom;const lng=center.lng+(mx-w/2)/scale,lat=center.lat-(my-h/2)/scale; if(Number.isFinite(lat)&&Number.isFinite(lng)){status.textContent=`📍 ${T('موقع محدد','Selected location')}: ${lat.toFixed(4)}, ${lng.toFixed(4)}`; canvas.dispatchEvent(new CustomEvent('rahal-offline-point',{detail:{lat,lng}}));}});
       canvas.addEventListener('wheel',e=>{e.preventDefault();zoom=Math.max(.65,Math.min(6,e.deltaY<0?zoom*1.18:zoom/1.18));draw()},{passive:false});
       canvas.addEventListener('pointerdown',e=>{dragging=false;lastX=e.clientX;lastY=e.clientY;canvas.setPointerCapture(e.pointerId)});
       canvas.addEventListener('pointermove',e=>{if(!(e.buttons&1))return;const dx=e.clientX-lastX,dy=e.clientY-lastY;if(Math.abs(dx)+Math.abs(dy)>2)dragging=true;const scale=Math.min(canvas.width,canvas.height)/8*zoom;center.lng-=dx/(scale/devicePixelRatio);center.lat+=dy/(scale/devicePixelRatio);lastX=e.clientX;lastY=e.clientY;draw()});
       canvas.addEventListener('pointerup',e=>{try{canvas.releasePointerCapture(e.pointerId)}catch{}});
       canvas.addEventListener('rahal-offline-point',e=>{
         const lat=Number(e.detail?.lat),lng=Number(e.detail?.lng); if(!Number.isFinite(lat)||!Number.isFinite(lng))return;
         let best=null,bestKm=Infinity; places.forEach(d=>{const dk=hav({lat,lng},{lat:+d.lat,lng:+d.lng});if(dk<bestKm){bestKm=dk;best=d}});
         const known=best&&bestKm<=80?best:null;
         const title=known?.city||'موقع محدد'; const country=known?.country||T('غير محدد','Unknown'); const image=known?.img||'';
         document.getElementById('mapPlaceCard')?.remove();
         const card=document.createElement('div'); card.id='mapPlaceCard'; card.className='map-place-card map-place-card-inline';
         card.innerHTML=`<button id="closeOfflinePlace" class="btn map-place-close">✕</button><div class="map-place-image-wrap">${image?`<img class="map-place-image" src="${esc(image)}" alt="${esc(title)}">`:'<div class="map-place-fallback">📍</div>'}</div><h2>${esc(title)}</h2><div class="place-country">${esc(country)}</div><p class="coords">📍 ${lat.toFixed(5)}, ${lng.toFixed(5)}</p><div class="map-place-actions"><button id="saveOfflinePlace" class="btn primary">❤️ حفظ كوجهة</button></div>`;
         const tools=document.querySelector('.map-float-panel'); if(tools){const anchor=document.getElementById('nearbyBtn');tools.insertBefore(card,anchor||null)}else el.appendChild(card);
         card.querySelector('#closeOfflinePlace').onclick=()=>card.remove();
         card.querySelector('#saveOfflinePlace').onclick=()=>{const arr=JSON.parse(localStorage.getItem('rahal-custom-destinations')||'[]');const d={id:'custom-map-'+Date.now(),city:title,en:title,country,flag:known?.flag||'📍',lat,lng,cat:'مخصص',rating:5,img:image||'images.png',desc:T('وجهة محفوظة من الخريطة.','Destination saved from the map.'),source:'map',savedAt:new Date().toISOString()};arr.push(d);localStorage.setItem('rahal-custom-destinations',JSON.stringify(arr));card.querySelector('#saveOfflinePlace').disabled=true;card.querySelector('#saveOfflinePlace').textContent='✅ تم الحفظ';status.textContent=`✅ تم حفظ ${title} ضمن وجهاتك.`};
       });
       canvas.addEventListener('rahal-clear-route',()=>{showRoute=false;routeFrom=null;routeTo=null;draw()});
       canvas.addEventListener('rahal-reset-offline',()=>{zoom=1;center={lat:20,lng:20};showRoute=false;routeFrom=null;routeTo=null;draw()});
       document.getElementById('offZoomIn').onclick=()=>{zoom=Math.min(6,zoom*1.4);draw()};document.getElementById('offZoomOut').onclick=()=>{zoom=Math.max(.65,zoom/1.4);draw()};document.getElementById('offReset').onclick=()=>{zoom=1;center={lat:20,lng:20};showRoute=false;routeFrom=null;routeTo=null;draw();status.textContent='🗺️ '+T('عرض العالم والوجهات المحفوظة دون إنترنت.','Showing the world and saved destinations offline.')};
       new ResizeObserver(resize).observe(el);resize();status.textContent='🗺️ '+((window.lang&&window.lang()==='en')?'Map ready — all destinations are visible.':'الخريطة جاهزة — جميع الوجهات ظاهرة.');
       return {showRouteTo:(from,to)=>{routeFrom=from;routeTo=to;showRoute=true;draw()},clearRoute:()=>{showRoute=false;routeFrom=null;routeTo=null;draw()}};
     }


 const params=new URLSearchParams(location.search); const initialLat=Number(params.get("lat")); const initialLng=Number(params.get("lng")); const hasInitial=Number.isFinite(initialLat)&&Number.isFinite(initialLng);
 const status=document.getElementById("locationStatus");
 let offlineController=null;
 // Offline fallback: the page still opens without Leaflet/Internet and shows saved/known destinations.
 if(typeof L === "undefined") {
   offlineController=offlineMap({status, initialLat, initialLng, hasInitial});
   return;
 }
 const m=L.map("map",{zoomControl:true,scrollWheelZoom:true,dragging:true,touchZoom:true,doubleClickZoom:true,boxZoom:true,keyboard:true,worldCopyJump:true,minZoom:2,maxZoom:19}).setView(hasInitial?[initialLat,initialLng]:[20,20],hasInitial?12:2);
 window.m=m;
 const tileSources=[
   {url:"https://tile.openstreetmap.org/{z}/{x}/{y}.png",attribution:"© OpenStreetMap contributors"},
   {url:"https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",attribution:"© OpenStreetMap contributors © CARTO",subdomains:"abcd"},
   {url:"https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",attribution:"© OpenStreetMap contributors · © OpenStreetMap France",subdomains:"abc"}
 ];
 let tileIndex=0,tilesLoaded=0,tileErrors=0,mapOnline=true,fallbackTimer=null,tiles;
 function installTiles(){
   if(tiles)try{m.removeLayer(tiles)}catch{}
   const src=tileSources[tileIndex];
   tilesLoaded=0; tileErrors=0;
   tiles=L.tileLayer(src.url,{attribution:src.attribution,subdomains:src.subdomains||'abc',maxZoom:19,maxNativeZoom:19,updateWhenZooming:false,updateWhenIdle:true,keepBuffer:2,crossOrigin:true}).addTo(m);
   tiles.on('loading',()=>{status.textContent='🗺️ '+((window.lang&&window.lang()==='en')?'Loading map...':'جارٍ تحميل الخريطة...');resetOnlineTimer()});
   tiles.on('tileload',()=>{tilesLoaded++;clearTimeout(fallbackTimer);if(tilesLoaded>2&&!pickMode)status.textContent='🗺️ '+((window.lang&&window.lang()==='en')?'Map ready — you can zoom in and out.':'الخريطة جاهزة — يمكنك التكبير والتصغير.')});
   tiles.on('tileerror',()=>{tileErrors++;if(tileErrors>=4){if(tileIndex<tileSources.length-1){tileIndex++;status.textContent='🔄 '+((window.lang&&window.lang()==='en')?'Trying an alternative map source...':'جارٍ تجربة مصدر خريطة بديل...');installTiles();}else{switchToOffline();}}});
   resetOnlineTimer();
 }
 let userMarker=null,userCircle=null,pickMode=false,pickMarker=null,routeLine=null,routeStart=null,selectedMarker=null;
 const destinationMarkers=[];
 function hideDestinationMarkers(){destinationMarkers.forEach(x=>{try{m.removeLayer(x)}catch{}})}
 function showDestinationMarkers(){destinationMarkers.forEach(x=>{try{x.addTo(m)}catch{}})}
 const userIcon=L.divIcon({className:'rahal-user-dot-icon',html:'<span class="rahal-user-dot"></span>',iconSize:[22,22],iconAnchor:[11,11]});
 const switchToOffline=()=>{
   clearTimeout(fallbackTimer);
   mapOnline=false;
   try{if(tiles)m.removeLayer(tiles)}catch{}
   status.textContent='📴 '+((window.lang&&window.lang()==='en')?'Offline backup map is active — the online map will return when internet is available.':'تم تشغيل الخريطة المحلية الاحتياطية — ستعود الخريطة الحقيقية تلقائيًا عند توفر الإنترنت.');
   try{offlineController=offlineMap({status, initialLat, initialLng, hasInitial});}catch{}
 };
 const resetOnlineTimer=()=>{clearTimeout(fallbackTimer);fallbackTimer=setTimeout(()=>{if(tilesLoaded===0){if(tileIndex<tileSources.length-1){tileIndex++;installTiles();}else switchToOffline();}},12000)};
 installTiles();
 const custom=()=>{try{return JSON.parse(localStorage.getItem("rahal-custom-destinations")||"[]")}catch{return[]}};
 const saveCustom=a=>localStorage.setItem("rahal-custom-destinations",JSON.stringify(a));
 const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const hav=(a,b)=>{const R=6371,p=Math.PI/180,dLat=(b.lat-a.lat)*p,dLon=(b.lng-a.lng)*p,x=Math.sin(dLat/2)**2+Math.cos(a.lat*p)*Math.cos(b.lat*p)*Math.sin(dLon/2)**2;return R*2*Math.atan2(Math.sqrt(x),Math.sqrt(1-x));};
 const destinationIcon=null;
 const pickIcon=L.divIcon({className:'rahal-pick-pin',html:'<span>📌</span>',iconSize:[34,34],iconAnchor:[17,34],popupAnchor:[0,-30]});
 const addMarker=d=>{
   const marker=destinationIcon?L.marker([d.lat,d.lng],{icon:destinationIcon}).addTo(m):L.marker([d.lat,d.lng]).addTo(m);
   marker.bindPopup(`<b>${esc(d.flag||'📍')} ${esc(d.city)}</b><br>${esc(d.country||'')}<br><a class="btn primary" href="details.html?id=${encodeURIComponent(d.id)}">📍 التفاصيل والصور</a><br><a href="map.html?lat=${d.lat}&lng=${d.lng}">🗺️ افتحها داخل خريطة رحّال</a>`);
   marker.on('popupopen',()=>{});
   return marker;
 };
 allDestinations().forEach(d=>{const marker=addMarker(d);destinationMarkers.push(marker)});
 if(!hasInitial && !params.get('route') && !params.get('locate')){
   const pts=allDestinations().filter(d=>Number.isFinite(Number(d.lat))&&Number.isFinite(Number(d.lng))).map(d=>[Number(d.lat),Number(d.lng)]);
   if(pts.length) m.fitBounds(L.latLngBounds(pts),{padding:[70,70],maxZoom:3,animate:false});
   else m.setView([20,20],2);
   status.textContent='🗺️ '+((window.lang&&window.lang()==='en')?'Map ready — all destinations are visible.':'الخريطة جاهزة — جميع الوجهات ظاهرة.');
 }
 if(params.get('locate')==='1'&&Number.isFinite(initialLat)&&Number.isFinite(initialLng)){
   userMarker=L.marker([initialLat,initialLng],{icon:userIcon}).addTo(m).bindPopup('<b>📍 موقعك الحالي</b>').openPopup();
   userCircle=L.circle([initialLat,initialLng],{radius:150}).addTo(m);
   status.textContent='📍 '+((window.lang&&window.lang()==='en')?'This is your current location on the map.':'هذا موقعك الحالي على الخريطة.');
 }
 async function reverseGeocode(lat,lng){
   const r=await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,{headers:{'Accept':'application/json','Accept-Language':(window.lang&&window.lang()==='en'?'en':'ar')}});
   if(!r.ok)throw new Error('geocode'); const j=await r.json(),a=j.address||{};
   return {city:a.city||a.town||a.village||a.municipality||a.county||'',country:a.country||'',countryCode:(a.country_code||'').toUpperCase(),name:j.name||a.amenity||a.tourism||''};
 }
 async function findImage(place,country){
   const clean=v=>String(v||'').trim();
   const known={
     'صنعاء':'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6f/Old_City_of_Sana%27a-111108.jpg/1280px-Old_City_of_Sana%27a-111108.jpg','Sanaa':'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6f/Old_City_of_Sana%27a-111108.jpg/1280px-Old_City_of_Sana%27a-111108.jpg',
     'تعز':'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/52/City_of_Taiz%2C_Yemen.jpg/960px-City_of_Taiz%2C_Yemen.jpg','Taiz':'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/52/City_of_Taiz%2C_Yemen.jpg/960px-City_of_Taiz%2C_Yemen.jpg',
     'إب':'https://upload.wikimedia.org/wikipedia/commons/d/d3/Ibb%2CYemen.jpg','Ibb':'https://upload.wikimedia.org/wikipedia/commons/d/d3/Ibb%2CYemen.jpg',
     'عدن':'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fd/Street_Scene_Aden_Yemen.jpg/1280px-Street_Scene_Aden_Yemen.jpg','Aden':'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fd/Street_Scene_Aden_Yemen.jpg/1280px-Street_Scene_Aden_Yemen.jpg',
     'سقطرى':'https://upload.wikimedia.org/wikipedia/commons/8/83/Socotra_dragon_tree.JPG','Socotra':'https://upload.wikimedia.org/wikipedia/commons/8/83/Socotra_dragon_tree.JPG',
     'شبام حضرموت':'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/Shibam_Hadramaut.jpg/1280px-Shibam_Hadramaut.jpg','Shibam':'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/Shibam_Hadramaut.jpg/1280px-Shibam_Hadramaut.jpg'
   };
   const direct=known[clean(place)]||known[clean(country)];
   if(direct)return direct;
   const queries=[place&&country?`${place}, ${country}`:place,country].filter(Boolean);
   for(const q of queries){
     try{
       const url='https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrnamespace=6&gsrlimit=3&gsrsearch='+encodeURIComponent(q)+'&prop=imageinfo&iiprop=url&iiurlwidth=900&format=json&origin=*';
       const r=await fetch(url); if(!r.ok)continue; const j=await r.json();
       const pages=Object.values(j.query?.pages||{});
       const page=pages.find(x=>x.imageinfo?.[0]?.thumburl||x.imageinfo?.[0]?.url);
       if(page)return page.imageinfo[0].thumburl||page.imageinfo[0].url;
     }catch{}
   }
   for(const q of queries.slice(0,1)){
     try{
       const url='https://'+((window.lang&&window.lang()==='en')?'en':'en')+'.wikipedia.org/w/api.php?action=query&generator=search&gsrlimit=3&gsrsearch='+encodeURIComponent(q)+'&prop=pageimages&piprop=thumbnail&pithumbsize=900&format=json&origin=*';
       const r=await fetch(url); if(!r.ok)continue; const j=await r.json();
       const pages=Object.values(j.query?.pages||{}); const page=pages.find(x=>x.thumbnail?.source);
       if(page)return page.thumbnail.source;
     }catch{}
   }
   return '';
 }
 async function routeInfo(origin,dest){
   const fallback={km:hav(origin,dest),min:hav(origin,dest)/55*60,geometry:null};
   const ctl=new AbortController(); const timer=setTimeout(()=>ctl.abort(),6000);
   try{const r=await fetch(`https://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${dest.lng},${dest.lat}?overview=full&geometries=geojson&steps=false`,{signal:ctl.signal});if(!r.ok)throw 0;const j=await r.json(),x=j.routes?.[0];if(x)return {km:x.distance/1000,min:x.duration/60,geometry:x.geometry};}catch{}finally{clearTimeout(timer)} return fallback;
 }
 async function drawRouteTo(dest){
   let o=null;
   const fromLat=Number(params.get('fromLat')), fromLng=Number(params.get('fromLng'));
   if(Number.isFinite(fromLat)&&Number.isFinite(fromLng)) o={lat:fromLat,lng:fromLng};
   if(!o){
     const raw=localStorage.getItem('rahal-last-location');
     if(raw){try{o=JSON.parse(raw)}catch{o=null}}
   }
   if(!o){status.textContent='📍 '+T('حدد موقعك أولًا ثم اضغط حساب المسافة.','Set your location first, then calculate the distance.'); return;}
   if(!Number.isFinite(Number(o.lat))||!Number.isFinite(Number(o.lng))){status.textContent='📍 '+T('تعذر قراءة موقعك، أعد تحديد موقعك.','Could not read your location. Please locate yourself again.');return;}
   o={lat:Number(o.lat),lng:Number(o.lng)};
   status.textContent='🛣️ '+T('جارٍ حساب مسار الطريق...','Calculating road route...');
   const r=await routeInfo({lat:Number(o.lat),lng:Number(o.lng)},{lat:Number(dest.lat),lng:Number(dest.lng)});
   if(routeLine)m.removeLayer(routeLine);
   if(r.geometry?.coordinates?.length){
     const latlngs=r.geometry.coordinates.map(([lng,lat])=>[lat,lng]);
     routeLine=L.polyline(latlngs,{color:'#1689e8',weight:6,opacity:.9}).addTo(m);
     m.fitBounds(routeLine.getBounds(),{padding:[50,50]});
   }else{
     routeLine=L.polyline([[o.lat,o.lng],[dest.lat,dest.lng]],{color:'#1689e8',weight:5,dashArray:'10 8',opacity:.85}).addTo(m);
     m.fitBounds(routeLine.getBounds(),{padding:[50,50]});
   }
   routeStart={lat:Number(o.lat),lng:Number(o.lng)};
   if(selectedMarker)m.removeLayer(selectedMarker);
   selectedMarker=L.circleMarker([Number(dest.lat),Number(dest.lng)],{
     radius:10,color:'#fff',weight:3,fillColor:'#1689e8',fillOpacity:1
   }).addTo(m).bindTooltip(`📍 ${esc(dest.city||'الوجهة')}`,{permanent:true,direction:'top',offset:[0,-8],className:'rahal-selected-label'}).openTooltip();
   status.textContent=`📏 ${T('المسافة إلى','Distance to')} ${dest.city||T('الوجهة','destination')}: ${r.km.toFixed(1)} ${T('كم','km')} · ⏱️ ${T('وقت القيادة التقريبي:','Estimated driving time:')} ${Math.round(r.min)} ${T('دقيقة','min')}`;
   const popup=L.popup().setLatLng([dest.lat,dest.lng]).setContent(`<b>${esc(dest.flag||'📍')} ${esc(dest.city||'الوجهة')}</b><br>📏 ${r.km.toFixed(1)} كم من موقعك<br>⏱️ وقت القيادة التقريبي: ${Math.round(r.min)} دقيقة<br><a target="_blank" rel="noopener" href="https://www.google.com/maps/dir/?api=1&origin=${o.lat},${o.lng}&destination=${dest.lat},${dest.lng}">🗺️ افتح المسار في Google Maps</a>`).openOn(m);
 }
 function showCard(info,lat,lng,route){
   const old=document.getElementById('mapPlaceCard');old?.remove();
   const card=document.createElement('div');card.id='mapPlaceCard';card.className='map-place-card';
   const image=info.image||''; const title=info.city||info.country||info.name||(window.lang&&window.lang()==='en'?'Selected location':'موقع محدد'); const en=window.lang&&window.lang()==='en'; const T=(ar,enText)=>en?enText:ar;
   const imageHtml=image?`<img class="map-place-image" src="${esc(image)}" alt="${esc(title)}" onerror="this.closest('.map-place-image-wrap').innerHTML='<div class=\"map-place-fallback\">📍</div>'">`:'<div class="map-place-fallback">📍</div>';
   const routeHtml=route?`<p class="route-summary">🚗 ${T('من موقعك:','From your location:')} <b>${route.km.toFixed(1)} ${T('كم','km')}</b> · ⏱️ ${T('وقت القيادة التقريبي:','Estimated driving time:')} ${Math.round(route.min)} ${T('دقيقة','min')}</p>`:`<p class="route-summary muted">${T('اضغط تحديد موقعي أولًا لعرض المسافة والمسار.','Set your location first to see distance and route.')}</p>`;
   card.innerHTML=`<button id="closePlace" class="btn map-place-close">✕</button><div class="map-place-image-wrap">${imageHtml}</div><h2>${esc(title)}</h2><div class="place-country">${esc(info.country||'')} ${info.countryCode?' · '+esc(info.countryCode):''}</div><p class="coords">📍 ${lat.toFixed(5)}, ${lng.toFixed(5)}</p>${routeHtml}<div class="map-place-actions"><button id="saveMapPlace" class="btn primary">❤️ ${T('حفظ كوجهة','Save destination')}</button><a class="btn" href="details.html?id=${encodeURIComponent(info.id||'')}">📍 ${T('الصور والمعلومات','Photos & info')}</a></div>`;
   const tools=document.querySelector('.map-float-panel'); if(tools){card.classList.add('map-place-card-inline'); const anchor=document.getElementById('nearbyBtn'); tools.insertBefore(card,anchor||null);} else document.getElementById('map').appendChild(card);
   card.querySelector('#closePlace').onclick=()=>card.remove();
   card.querySelector('#saveMapPlace').onclick=()=>{const name=info.city||info.country||info.name||(en?'Selected location':'موقع محدد');const id='custom-map-'+Date.now();const d={id,city:name,en:name,country:info.country||'موقع مخصص',flag:info.countryCode==='YE'?'🇾🇪':(info.countryCode?String.fromCodePoint(...[...info.countryCode].map(c=>127397+c.charCodeAt())):'📍'),lat,lng,cat:'مخصص',rating:5,img:image||'images.png',desc:`وجهة محفوظة من الخريطة${info.country?` في ${info.country}`:''}.`,distanceKm:route?.km||null,travelMinutes:route?.min||null,source:'map',savedAt:new Date().toISOString(),label:`${name}${info.country?`، ${info.country}`:''}`};saveCustom([...custom(),d]);addMarker(d).bindPopup(`<b>${esc(d.flag)} ${esc(d.city)}</b><br>${esc(d.country)}<br>❤️ تم حفظ الوجهة`).openPopup();status.textContent=`✅ تم حفظ ${name} ضمن وجهاتك.`;card.querySelector('#saveMapPlace').disabled=true;card.querySelector('#saveMapPlace').textContent='✅ تم الحفظ';};
 }
 async function inspectPoint(lat,lng){
   // Selecting a point is for destination details only. Routes are reserved for «الأقرب لموقعي».
   const origin=null,route=null;
   if(selectedMarker)m.removeLayer(selectedMarker);
   selectedMarker=L.circleMarker([lat,lng],{radius:10,color:'#fff',weight:3,fillColor:'#1689e8',fillOpacity:1}).addTo(m);

   // Show the card immediately. For offline/unknown points, use the closest known Rahal destination
   // so the selected-place card keeps the same destination photography used throughout the app.
   const known=allDestinations().filter(d=>Number.isFinite(+d.lat)&&Number.isFinite(+d.lng));
   let nearest=null,nearestKm=Infinity;
   known.forEach(d=>{const km=hav({lat,lng},{lat:+d.lat,lng:+d.lng});if(km<nearestKm){nearestKm=km;nearest=d;}});
   const seed=nearest && nearestKm<=350 ? nearest : null;
   showCard({
     id:seed?.id||'',city:seed?.city||'',country:seed?.country||'',countryCode:seed?.countryCode||'',
     name:seed?.name||'',image:seed?.img||seed?.image||''
   },lat,lng,route);
   status.textContent='🔎 '+T('جارٍ التعرف على الموقع...','Identifying location...');

   // Online reverse geocoding refines the city/country. It never removes the known Rahal image
   // when a matching destination exists, so the selected card uses the same photos as the cards/pages.
   const geo=reverseGeocode(lat,lng).catch(()=>({city:'',country:'',countryCode:'',name:''}));
   const [info]=await Promise.all([geo]);
   const rr=null;
   let matched=known.find(d=>String(d.city||'').trim()===String(info.city||'').trim() || String(d.en||'').toLowerCase()===String(info.city||'').toLowerCase());
   if(!matched && seed)matched=seed;
   info.image=matched?.img||matched?.image||'';
   if(!info.city && matched)info.city=matched.city;
   if(!info.country && matched)info.country=matched.country;
   if(!info.countryCode && matched)info.countryCode=matched.countryCode||'';
   showCard(info,lat,lng,rr);
   if(rr?.geometry?.coordinates?.length){
     if(routeLine)m.removeLayer(routeLine);
     routeLine=L.polyline(rr.geometry.coordinates.map(([lng,lat])=>[lat,lng]),{color:'#1689e8',weight:6,opacity:.9}).addTo(m);
     m.fitBounds(routeLine.getBounds(),{padding:[55,55],maxZoom:16});
   }
   status.textContent=`📍 ${info.city||info.country||((window.lang&&window.lang()==='en')?'Selected location':'موقع محدد')}${info.country?' — '+info.country:''}`;
 }
 async function searchMapPlace(query){
   const q=String(query||'').trim();
   if(!q){status.textContent=T('اكتب اسم مدينة أو وجهة للبحث.','Enter a city or destination to search.');return;}
   status.textContent='🔎 '+T('جارٍ البحث عن ','Searching for ')+q+'...';

   const local=allDestinations().filter(d=>{
     const hay=[d.city,d.en,d.country,d.name,d.desc].filter(Boolean).join(' ').toLowerCase();
     return hay.includes(q.toLowerCase());
   });
   if(local.length){
     const d=local[0];
     const lat=Number(d.lat),lng=Number(d.lng);
     m.setView([lat,lng],10,{animate:true});
     if(selectedMarker)m.removeLayer(selectedMarker);
     selectedMarker=L.circleMarker([lat,lng],{radius:10,color:'#fff',weight:3,fillColor:'#1689e8',fillOpacity:1})
       .addTo(m).bindTooltip(`📍 ${esc(d.city||d.name||q)}`,{permanent:true,direction:'top',offset:[0,-8],className:'rahal-selected-label'}).openTooltip();
     const image=d.img||d.image||'';
     showCard({id:d.id||'',city:d.city||d.name||q,country:d.country||'',countryCode:d.countryCode||'',name:d.name||d.city||q,image},lat,lng,null);
     status.textContent=`📍 ${d.city||d.name||q}${d.country?' — '+d.country:''}`;
     return;
   }

   try{
     const url='https://nominatim.openstreetmap.org/search?format=jsonv2&limit=6&addressdetails=1&accept-language='+
       encodeURIComponent((window.lang&&window.lang()==='en')?'en':'ar')+
       '&q='+encodeURIComponent(q);
     const r=await fetch(url,{headers:{'Accept':'application/json'}});
     if(!r.ok) throw new Error('search');
     const results=await r.json();
     if(!results.length){status.textContent='❌ '+T('لم يتم العثور على نتيجة لهذا البحث.','No result was found for this search.');return;}

     const x=results[0],lat=Number(x.lat),lng=Number(x.lon);
     const a=x.address||{};
     const info={
       city:a.city||a.town||a.village||a.municipality||a.county||'',
       country:a.country||'',
       countryCode:(a.country_code||'').toUpperCase(),
       name:x.name||x.display_name||q,
       image:''
     };
     info.image=await findImage(info.city||info.name,info.country);
     m.setView([lat,lng],14,{animate:true});
     if(selectedMarker)m.removeLayer(selectedMarker);
     selectedMarker=L.circleMarker([lat,lng],{radius:10,color:'#fff',weight:3,fillColor:'#1689e8',fillOpacity:1})
       .addTo(m)
       .bindTooltip(`📍 ${esc(info.city||info.name||q)}`,{permanent:true,direction:'top',offset:[0,-8],className:'rahal-selected-label'})
       .openTooltip();
     showCard(info,lat,lng,null);
     status.textContent=`📍 ${info.city||info.name||q}${info.country?' — '+info.country:''}`;
   }catch(e){
     status.textContent='⚠️ '+T('تعذر تنفيذ البحث. تحقق من اتصال الإنترنت وحاول مرة أخرى.','Search failed. Check your internet connection and try again.');
   }
 }

 const searchInput=document.getElementById('rahalMapSearchFallback');
 const searchBtn=document.getElementById('rahalMapSearchBtn');
 if(searchBtn) searchBtn.onclick=()=>searchMapPlace(searchInput?.value||'');
 if(searchInput) searchInput.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();searchMapPlace(searchInput.value)}});

 document.querySelectorAll('.map-zoom-badge button').forEach((btn,i)=>btn.onclick=()=>{if(!mapOnline)return;const z=m.getZoom();m.setZoom(i===0?Math.min(19,z+1):Math.max(2,z-1),{animate:true});});
 document.getElementById('myLocationBtn').onclick=()=>{if(!navigator.geolocation){status.textContent=T('المتصفح لا يدعم تحديد الموقع.','Your browser does not support location.');return}const cached=localStorage.getItem('rahal-last-location');if(cached){try{const o=JSON.parse(cached);if(Number.isFinite(o.lat)&&Number.isFinite(o.lng)){if(userMarker)m.removeLayer(userMarker);if(userCircle)m.removeLayer(userCircle);userMarker=L.marker([o.lat,o.lng],{icon:userIcon}).addTo(m).bindPopup('<b>📍 موقعك الأخير</b>').openPopup();userCircle=L.circle([o.lat,o.lng],{radius:Math.min(Number(o.accuracy)||150,1000)}).addTo(m);m.setView([o.lat,o.lng],17);status.textContent='📍 '+T('تم عرض موقعك فورًا، جارٍ تحديثه...','Your last location is shown; updating it now...');}}catch{}}else status.textContent='📍 '+T('جارٍ تحديد موقعك...','Locating you...');navigator.geolocation.getCurrentPosition(p=>{const {latitude:lat,longitude:lng,accuracy}=p.coords;if(userMarker)m.removeLayer(userMarker);if(userCircle)m.removeLayer(userCircle);userMarker=L.marker([lat,lng],{icon:userIcon}).addTo(m).bindPopup('<b>📍 موقعك الحالي</b>').openPopup();userCircle=L.circle([lat,lng],{radius:Math.min(accuracy,1000)}).addTo(m);m.setView([lat,lng],17);localStorage.setItem('rahal-last-location',JSON.stringify({lat,lng,accuracy,at:new Date().toISOString()}));status.textContent=`📍 ${T('تم تحديث موقعك — الدقة','Location updated — accuracy')} ${Math.round(accuracy)} ${T('متر تقريبًا','m approximately')}`},e=>{if(!cached)status.textContent='⚠️ '+(e.code===1?T('اسمح للموقع من إعدادات المتصفح ثم حاول مرة أخرى.','Allow location access in your browser settings and try again.'):e.code===2?T('تعذر الحصول على موقعك.','Could not get your location.'):T('انتهت مهلة تحديد الموقع.','Location request timed out.'))},{enableHighAccuracy:true,timeout:8000,maximumAge:60000})};
 document.getElementById('resetMapBtn').onclick=()=>{document.getElementById('mapPlaceCard')?.remove();showDestinationMarkers();if(!mapOnline){const c=document.getElementById('offlineCanvas');if(c)c.dispatchEvent(new Event('rahal-reset-offline'));status.textContent='🗺️ '+((window.lang&&window.lang()==='en')?'Showing all destinations — old route cleared.':'عرض جميع الوجهات — تم مسح المسار القديم.');return}if(routeLine)m.removeLayer(routeLine);if(selectedMarker)m.removeLayer(selectedMarker);if(pickMarker)m.removeLayer(pickMarker);routeLine=null;selectedMarker=null;pickMarker=null;routeStart=null;if(offlineController?.clearRoute)offlineController.clearRoute();const pts=allDestinations().filter(d=>Number.isFinite(Number(d.lat))&&Number.isFinite(Number(d.lng))).map(d=>[Number(d.lat),Number(d.lng)]);
 if(pts.length)m.fitBounds(L.latLngBounds(pts),{padding:[60,60],maxZoom:7,animate:true});else m.setView([20,20],3);
 status.textContent='🗺️ '+((window.lang&&window.lang()==='en')?'Showing all destinations — old route cleared.':'عرض جميع الوجهات — تم مسح المسار القديم.')};
 const pickBtn=document.getElementById('pickBtn');
 const pickHint=document.getElementById('pickHint');
 function setPickMode(on){pickMode=!!on;pickBtn?.classList.toggle('primary',pickMode);if(pickHint)pickHint.hidden=!pickMode;status.textContent=pickMode ? ('📌 '+((window.lang&&window.lang()==='en')?'Now click once anywhere on the map.':'الآن اضغط مرة واحدة على أي مكان في الخريطة.')) : ((window.lang&&window.lang()==='en')?'Ready — choose a place or locate yourself':'جاهز — اختر موقعًا أو حدد موقعك');if(mapOnline&&document.getElementById('map'))document.getElementById('map').style.cursor=pickMode?'crosshair':'';}
 pickBtn.onclick=()=>setPickMode(!pickMode);
 m.on('click',e=>{if(!pickMode)return; if(pickMarker)m.removeLayer(pickMarker);pickMarker=L.marker(e.latlng,{icon:pickIcon}).addTo(m);setPickMode(false);inspectPoint(e.latlng.lat,e.latlng.lng);});
 document.getElementById('nearbyBtn').onclick=async()=>{
   let u=null;
   const raw=localStorage.getItem('rahal-last-location');
   if(raw){try{const x=JSON.parse(raw);if(Number.isFinite(+x.lat)&&Number.isFinite(+x.lng))u={lat:+x.lat,lng:+x.lng}}catch{}}
   if(!u){
     if(!navigator.geolocation){status.textContent=T('المتصفح لا يدعم تحديد الموقع.','Your browser does not support location.');return;}
     status.textContent='📍 '+T('جارٍ تحديد موقعك للعثور على الأقرب...','Locating you to find the nearest place...');
     try{
       const p=await new Promise((resolve,reject)=>navigator.geolocation.getCurrentPosition(resolve,reject,{enableHighAccuracy:true,timeout:10000,maximumAge:60000}));
       u={lat:p.coords.latitude,lng:p.coords.longitude};
       localStorage.setItem('rahal-last-location',JSON.stringify({lat:u.lat,lng:u.lng,accuracy:p.coords.accuracy,at:new Date().toISOString()}));
     }catch(e){status.textContent=e.code===1?'⚠️ '+T('اسمح للموقع ثم حاول مرة أخرى.','Allow location access and try again.'):'⚠️ '+T('تعذر تحديد موقعك.','Could not determine your location.');return;}
   }
   let best=null;allDestinations().forEach(d=>{const km=hav(u,d);if(!best||km<best.km)best={d,km}});
   if(best){
     if(userMarker)m.removeLayer(userMarker);
     userMarker=L.marker([u.lat,u.lng],{icon:userIcon}).addTo(m).bindPopup('<b>📍 موقعك</b>').openPopup();
     if(userCircle)m.removeLayer(userCircle);
     userCircle=L.circle([u.lat,u.lng],{radius:150}).addTo(m);
     // وضع «الأقرب لموقعي»: نُبقي الوجهة الأقرب فقط، ولا نرسم الخط الأزرق.
     if(routeLine){try{m.removeLayer(routeLine)}catch{}}
     routeLine=null; routeStart=null;
     hideDestinationMarkers();
     if(selectedMarker)m.removeLayer(selectedMarker);
     selectedMarker=L.circleMarker([best.d.lat,best.d.lng],{radius:12,color:'#fff',weight:3,fillColor:'#1689e8',fillOpacity:1}).addTo(m).bindTooltip(`📍 ${esc(best.d.city||best.d.name||T('الوجهة الأقرب','Nearest destination'))}`,{permanent:true,direction:'top',offset:[0,-8],className:'rahal-selected-label'}).openTooltip();
     m.fitBounds(L.latLngBounds([[u.lat,u.lng],[best.d.lat,best.d.lng]]),{padding:[70,70],maxZoom:13,animate:true});
     const r=await routeInfo(u,{lat:Number(best.d.lat),lng:Number(best.d.lng)});
     showCard({id:best.d.id||'',city:best.d.city||best.d.name||T('الوجهة الأقرب','Nearest destination'),country:best.d.country||'',countryCode:best.d.countryCode||'',name:best.d.name||best.d.city||'',image:best.d.img||best.d.image||''},Number(best.d.lat),Number(best.d.lng),r);
     status.textContent=`📍 ${T('أقرب وجهة إليك:','Nearest destination:')} ${best.d.city||best.d.name||T('وجهة','destination')} · ${r.km.toFixed(1)} ${T('كم','km')}`;
   }
 }
 if(params.get('route')==='1')status.textContent='🗺️ '+T('تم فتح الوجهة. لا يظهر المسار إلا عند اختيار «الأقرب لموقعي».','Destination opened. The route appears only when you choose “Nearest to me”.');
}
