(function(){
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const hav=(a,b)=>{const R=6371,p=Math.PI/180,dLat=(b.lat-a.lat)*p,dLon=(b.lng-a.lng)*p,x=Math.sin(dLat/2)**2+Math.cos(a.lat*p)*Math.cos(b.lat*p)*Math.sin(dLon/2)**2;return R*2*Math.atan2(Math.sqrt(x),Math.sqrt(1-x));};
  const custom=()=>{try{return JSON.parse(localStorage.getItem('rahal-custom-destinations')||'[]')}catch{return[]}};
  const saveCustom=a=>localStorage.setItem('rahal-custom-destinations',JSON.stringify(a));
  const T=(ar,en)=>window.lang&&window.lang()==='en'?en:ar;
  const all=()=>typeof allDestinations==='function'?allDestinations():[];
  let map,placesLib,placesSearch,infoWindow,userMarker,userCircle,routeLine,selectedMarker,searchMarker;

  function findImage(place,country){
    const known={
      'صنعاء':'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6f/Old_City_of_Sana%27a-111108.jpg/1280px-Old_City_of_Sana%27a-111108.jpg','Sanaa':'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6f/Old_City_of_Sana%27a-111108.jpg/1280px-Old_City_of_Sana%27a-111108.jpg',
      'تعز':'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/52/City_of_Taiz%2C_Yemen.jpg/960px-City_of_Taiz%2C_Yemen.jpg','Taiz':'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/52/City_of_Taiz%2C_Yemen.jpg/960px-City_of_Taiz%2C_Yemen.jpg',
      'إب':'https://upload.wikimedia.org/wikipedia/commons/d/d3/Ibb%2CYemen.jpg','Ibb':'https://upload.wikimedia.org/wikipedia/commons/d/d3/Ibb%2CYemen.jpg',
      'عدن':'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fd/Street_Scene_Aden_Yemen.jpg/1280px-Street_Scene_Aden_Yemen.jpg','Aden':'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fd/Street_Scene_Aden_Yemen.jpg/1280px-Street_Scene_Aden_Yemen.jpg',
      'سقطرى':'https://upload.wikimedia.org/wikipedia/commons/8/83/Socotra_dragon_tree.JPG','Socotra':'https://upload.wikimedia.org/wikipedia/commons/8/83/Socotra_dragon_tree.JPG',
      'شبام حضرموت':'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/Shibam_Hadramaut.jpg/1280px-Shibam_Hadramaut.jpg','Shibam':'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/Shibam_Hadramaut.jpg/1280px-Shibam_Hadramaut.jpg'
    }; return known[String(place||'').trim()]||known[String(country||'').trim()]||'';
  }
  function status(t){const e=document.getElementById('locationStatus');if(e)e.textContent=t;}
  function clearRoute(){if(routeLine){routeLine.setMap(null);routeLine=null;}if(selectedMarker){selectedMarker.setMap(null);selectedMarker=null;}}
  function userFromStorage(){try{const x=JSON.parse(localStorage.getItem('rahal-last-location')||'null');return x&&Number.isFinite(+x.lat)&&Number.isFinite(+x.lng)?{lat:+x.lat,lng:+x.lng}:null}catch{return null}}
  function placeName(d){return d.city||d.name||d.label||T('موقع محدد','Selected location');}
  function addDestinationMarker(d){
    const marker=new google.maps.Marker({map,position:{lat:+d.lat,lng:+d.lng},title:placeName(d),label:{text:'📍',fontSize:'18px'}});
    marker.addListener('click',()=>showDestination(d,marker)); return marker;
  }
  function showDestination(d,marker){
    const u=userFromStorage();
    const km=u?hav(u,d):null;
    const img=findImage(d.city,d.country)||d.img||'';
    const html=`<div class="rahal-google-popup"><h3>${esc(d.flag||'📍')} ${esc(placeName(d))}</h3><p>${esc(d.country||'')}</p>${km!=null?`<p>📏 ${km.toFixed(1)} كم ${T('من موقعك','from your location')}</p>`:''}<div class="rahal-popup-actions"><button id="gSave" class="btn primary">❤️ ${T('حفظ','Save')}</button><a class="btn" href="details.html?id=${encodeURIComponent(d.id||'')}">📍 ${T('الصور والمعلومات','Photos & info')}</a></div>${img?`<img src="${esc(img)}" alt="" style="width:100%;height:100px;object-fit:cover;border-radius:10px;margin-top:8px">`:''}</div>`;
    infoWindow.setContent(html); infoWindow.open({map,anchor:marker});
    google.maps.event.addListenerOnce(infoWindow,'domready',()=>{
      document.getElementById('gSave')?.addEventListener('click',()=>saveDestination(d));
    });
  }
  function saveDestination(d){
    const a=custom();
    if(a.some(x=>Math.abs(+x.lat-+d.lat)<.0001&&Math.abs(+x.lng-+d.lng)<.0001)){status(`ℹ️ ${placeName(d)} ${T('محفوظة بالفعل.','is already saved.')}`);return;}
    const id='custom-map-'+Date.now();
    const cc=String(d.countryCode||'').toUpperCase();
    const flag=cc==='YE'?'🇾🇪':(cc.length===2?String.fromCodePoint(...[...cc].map(c=>127397+c.charCodeAt())):'📍');
    const item={id,city:placeName(d),en:placeName(d),country:d.country||'موقع مخصص',countryCode:cc,flag,lat:+d.lat,lng:+d.lng,cat:'مخصص',rating:5,img:d.img||findImage(d.city,d.country)||'images.png',desc:`${T('وجهة محفوظة من خريطة Google','Destination saved from Google Maps')}${d.country?' في '+d.country:''}.`,distanceKm:null,travelMinutes:null,source:'google-map',placeId:d.placeId||'',savedAt:new Date().toISOString(),label:`${placeName(d)}${d.country?'، '+d.country:''}`};
    saveCustom([...a,item]); addDestinationMarker(item); status=`✅ تم حفظ ${placeName(d)} ضمن وجهاتك.`;
  }
  async function drawRoute(d){
    const u=userFromStorage(); if(!u){status(T('حدد موقعك أولًا ثم حاول عرض المسار.','Set your location first, then show the route.'));return;}
    status(T('🛣️ جارٍ رسم المسار...','🛣️ Drawing route...'));
    const coords=[{lat:u.lat,lng:u.lng},{lat:+d.lat,lng:+d.lng}];
    // OSRM supplies the road geometry while Google Maps supplies the basemap/search UI.
    try{
      const r=await fetch(`https://router.project-osrm.org/route/v1/driving/${u.lng},${u.lat};${d.lng},${d.lat}?overview=full&geometries=geojson&steps=false`);
      const j=await r.json(); const rt=j.routes?.[0];
      const path=rt?.geometry?.coordinates?.map(([lng,lat])=>({lat,lng}))||coords;
      clearRoute();
      routeLine=new google.maps.Polyline({map,path,geodesic:true,strokeColor:'#1689e8',strokeOpacity:.95,strokeWeight:6});
      selectedMarker=new google.maps.Marker({map,position:{lat:+d.lat,lng:+d.lng},title:placeName(d),label:{text:'📍',fontSize:'18px'}});
      const b=new google.maps.LatLngBounds();path.forEach(p=>b.extend(p));map.fitBounds(b,{top:100,bottom:180,left:40,right:40});
      const km=rt?rt.distance/1000:hav(u,d), min=rt?rt.duration/60:km/55*60;
      status(`📏 ${T('المسافة إلى','Distance to')} ${placeName(d)}: ${km.toFixed(1)} كم · ⏱️ ${T('وقت القيادة التقريبي:','Estimated driving time:')} ${Math.round(min)} ${T('دقيقة','min')}`);
      d.distanceKm=km; d.travelMinutes=min;
    }catch{
      clearRoute(); routeLine=new google.maps.Polyline({map,path:coords,geodesic:true,strokeColor:'#1689e8',strokeOpacity:.9,strokeWeight:6});
      status(`📏 ${T('المسافة التقريبية:','Approx. distance:')} ${hav(u,d).toFixed(1)} كم`);
    }
  }
  function setUser(lat,lng,accuracy,label){
    const pos={lat,lng}; if(userMarker)userMarker.setMap(null); if(userCircle)userCircle.setMap(null);
    userMarker=new google.maps.Marker({map,position:pos,title:'موقعك',label:{text:'📍',fontSize:'20px'}});
    userCircle=new google.maps.Circle({map,center:pos,radius:Math.min(accuracy||150,1000),fillColor:'#1689e8',fillOpacity:.12,strokeColor:'#1689e8',strokeOpacity:.45,strokeWeight:1});
    map.setCenter(pos);map.setZoom(17);localStorage.setItem('rahal-last-location',JSON.stringify({lat,lng,accuracy:accuracy||150,at:new Date().toISOString()}));status(label||'📍 تم تحديد موقعك.');
  }
  function locate(){
    if(!navigator.geolocation){status(T('المتصفح لا يدعم تحديد الموقع.','Geolocation is not supported.'));return;}
    const old=userFromStorage();if(old)setUser(old.lat,old.lng,150,'📍 تم عرض موقعك الأخير، جارٍ تحديثه...');else status('📍 جارٍ تحديد موقعك...');
    navigator.geolocation.getCurrentPosition(p=>setUser(p.coords.latitude,p.coords.longitude,p.coords.accuracy,`📍 تم تحديث موقعك — الدقة ${Math.round(p.coords.accuracy)} متر تقريبًا`),e=>status('⚠️ '+(e.code===1?'اسمح للموقع من إعدادات المتصفح ثم حاول مرة أخرى.':e.code===2?'تعذر الحصول على موقعك.':'انتهت مهلة تحديد الموقع.')),{enableHighAccuracy:true,timeout:10000,maximumAge:60000});
  }
  function reset(){clearRoute();const markers=window.__rahalGoogleDestinationMarkers||[];markers.forEach(x=>x.setMap(null));window.__rahalGoogleDestinationMarkers=[];all().forEach(d=>window.__rahalGoogleDestinationMarkers.push(addDestinationMarker(d)));map.setCenter({lat:20,lng:45});map.setZoom(3);status('🌍 عرض جميع الوجهات — ابحث عن أي مدينة أو وجهة.');}
  function nearby(){const u=userFromStorage();if(!u){status('حدد موقعك أولًا ثم اضغط الأقرب لموقعي.');return;}let best=null;all().forEach(d=>{const km=hav(u,d);if(!best||km<best.km)best={d,km};});if(best){map.setCenter({lat:+best.d.lat,lng:+best.d.lng});map.setZoom(10);drawRoute(best.d);status(`📌 الأقرب لموقعك: ${placeName(best.d)} — ${best.km.toFixed(1)} كم`);}}
  function pickMode(){status('📌 اضغط على أي مكان في الخريطة لاختياره وحفظه كوجهة.');map.setOptions({draggableCursor:'crosshair'});}
  async function selectLatLng(lat,lng){
    status('🔎 جارٍ التعرف على الموقع...');
    let title='موقع محدد',country='',countryCode='',address='';
    try{const geocoder=new google.maps.Geocoder();const r=await geocoder.geocode({location:{lat,lng}});const x=r.results?.[0];if(x){address=x.formatted_address||'';const comp=x.address_components||[];const city=comp.find(c=>c.types.includes('locality'))||comp.find(c=>c.types.includes('administrative_area_level_2'));const co=comp.find(c=>c.types.includes('country'));title=city?.long_name||x.name||title;country=co?.long_name||'';countryCode=co?.short_name||'';}}catch{}
    const d={city:title,country,countryCode,lat,lng,name:title,img:findImage(title,country),address};
    if(searchMarker)searchMarker.setMap(null);searchMarker=new google.maps.Marker({map,position:{lat,lng},title});
    showDestination(d,searchMarker); status(`📍 ${title}${country?' — '+country:''}`);
  }
  async function setupSearch(){
    try{
      const places=await google.maps.importLibrary('places'); placesLib=places;
      const host=document.getElementById('googleMapSearch'); const fallback=document.getElementById('rahalMapSearchFallback');
      if(host){
        const el=new places.PlaceAutocompleteElement({placeholder:'ابحث عن مدينة أو وجهة أو معلم...'});
        el.setAttribute('dir','rtl'); el.style.width='100%'; host.appendChild(el);
        el.addEventListener('gmp-select',async ev=>{
          try{const pred=ev.placePrediction;const place=pred.toPlace();await place.fetchFields({fields:['displayName','formattedAddress','location','id']});const loc=place.location;if(!loc)return;const lat=typeof loc.lat==='function'?loc.lat():loc.lat;const lng=typeof loc.lng==='function'?loc.lng():loc.lng;map.setCenter({lat,lng});map.setZoom(15);const d={city:place.displayName?.text||place.displayName||'موقع',country:'',countryCode:'',lat,lng,name:place.displayName?.text||place.displayName||'موقع',placeId:place.id,address:place.formattedAddress||'',img:findImage(place.displayName?.text||place.displayName,'')};if(searchMarker)searchMarker.setMap(null);searchMarker=new google.maps.Marker({map,position:{lat,lng},title:d.city});showDestination(d,searchMarker);const u=userFromStorage();if(u)drawRoute(d);status(`📍 تم العثور على ${d.city}`);}catch(e){status('⚠️ تعذر قراءة نتيجة البحث.');}}
        );
        if(fallback)fallback.style.display='none';
      }
    }catch(e){/* keep fallback text input */}
    const fallback=document.getElementById('rahalMapSearchFallback');const btn=document.getElementById('rahalMapSearchBtn');
    async function fallbackSearch(){const q=(fallback?.value||'').trim();if(!q)return;status('🔎 جارٍ البحث...');try{const geocoder=new google.maps.Geocoder();const r=await geocoder.geocode({address:q});const x=r.results?.[0];if(!x)throw 0;const loc=x.geometry.location;selectLatLng(loc.lat(),loc.lng());}catch{status('⚠️ لم يتم العثور على المكان. حاول كتابة اسم المدينة مع الدولة.');}}
    btn?.addEventListener('click',fallbackSearch);fallback?.addEventListener('keydown',e=>{if(e.key==='Enter')fallbackSearch()});
  }
  window.initRahalGoogleMap=async function(){
    const statusEl=document.getElementById('locationStatus');
    try{
      await google.maps.importLibrary('maps');
      const center={lat:20,lng:45};
      map=new google.maps.Map(document.getElementById('map'),{center,zoom:3,mapTypeId:'roadmap',streetViewControl:false,fullscreenControl:true,mapTypeControl:true,gestureHandling:'greedy',mapId:'DEMO_MAP_ID'});
      infoWindow=new google.maps.InfoWindow();
      window.__rahalGoogleDestinationMarkers=[];
      all().forEach(d=>window.__rahalGoogleDestinationMarkers.push(addDestinationMarker(d)));
      await setupSearch();
      document.getElementById('myLocationBtn').onclick=locate;
      document.getElementById('resetMapBtn').onclick=reset;
      document.getElementById('nearbyBtn').onclick=nearby;
      document.getElementById('pickBtn').onclick=pickMode;
      map.addListener('click',e=>selectLatLng(e.latLng.lat(),e.latLng.lng()));
      const old=userFromStorage(); if(old){userMarker=new google.maps.Marker({map,position:old,title:'موقعك الأخير',label:{text:'📍',fontSize:'20px'}});}
      const params=new URLSearchParams(location.search);const lat=Number(params.get('lat')),lng=Number(params.get('lng'));if(Number.isFinite(lat)&&Number.isFinite(lng)){map.setCenter({lat,lng});map.setZoom(15);selectLatLng(lat,lng);}
      statusEl.textContent='🗺️ Google Maps جاهزة — ابحث عن مدينة أو وجهة أو اختر من الخريطة.';
    }catch(e){
      window.RAHAL_MAP_PROVIDER='leaflet';statusEl.textContent='⚠️ تعذر تشغيل Google Maps — تم تشغيل الخريطة البديلة.';if(typeof initRahalLeafletMap==='function')initRahalLeafletMap();
    }
  };
})();
