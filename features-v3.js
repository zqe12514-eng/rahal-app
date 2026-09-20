/* Rahal Explorer V3 Feature Engine */
(function(){
  const KEYS={fav:'rahal-favorites',vis:'rahal-visited',rev:'rahal-reviews',trips:'rahal-trips',prefs:'rahal-prefs',ach:'rahal-achievements'};
  const load=(k,d=[])=>{try{return JSON.parse(localStorage.getItem(k))??d}catch(e){return d}};
  const save=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
  window.RahalV3={
    load,save,keys:KEYS,
    favorites:()=>load(KEYS.fav,[]),
    visited:()=>load(KEYS.vis,[]),
    reviews:()=>load(KEYS.rev,[]),
    trips:()=>load(KEYS.trips,[]),
    score:()=>load(KEYS.fav,[]).length*5+load(KEYS.vis,[]).length*10+load(KEYS.rev,[]).length*5,
    level(){
      const p=this.score(); return p>=300?'خبير سياحي':p>=200?'رحّال محترف':p>=100?'رحّال نشيط':'مبتدئ';
    },
    addTrip(t){const a=this.trips();a.push({...t,id:Date.now()});save(KEYS.trips,a);return a.at(-1)},
    budget(items,budget){const total=items.reduce((s,x)=>s+Number(x.amount||0),0);return {total,budget,remaining:budget-total,over:total>budget}},
    recommend(destinations){
      const fav=this.favorites(),vis=this.visited();
      const seen=new Set([...fav,...vis].map(String));
      return (destinations||[]).filter(x=>!seen.has(String(x.id||x.name))).slice(0,6);
    },
    achievementList(){
      const s=this.score(),v=this.visited().length;
      return [
        ['🌱','أول خطوة',s>=5],['🧭','مستكشف',v>=3],['🏅','رحّال نشيط',s>=100],
        ['🏆','رحّال محترف',s>=200],['👑','خبير سياحي',s>=300]
      ];
    }
  };
})();
/* Rahal Explorer — native web/PWA capabilities integrated without changing the original UI */
(function(){
  const DB_NAME='rahal-explorer-db', DB_VER=1;
  const stores=['photos','offlineActions','meta'];
  function db(){
    return new Promise((resolve,reject)=>{
      if(!window.indexedDB) return reject(new Error('IndexedDB غير مدعوم'));
      const req=indexedDB.open(DB_NAME,DB_VER);
      req.onupgradeneeded=()=>{ const d=req.result; stores.forEach(s=>{if(!d.objectStoreNames.contains(s)) d.createObjectStore(s,{keyPath:'id',autoIncrement:true});}); };
      req.onsuccess=()=>resolve(req.result); req.onerror=()=>reject(req.error);
    });
  }
  async function put(store,value){const d=await db();return new Promise((res,rej)=>{const tx=d.transaction(store,'readwrite');const r=tx.objectStore(store).add(value);r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error);});}
  async function all(store){const d=await db();return new Promise((res,rej)=>{const r=d.transaction(store).objectStore(store).getAll();r.onsuccess=()=>res(r.result||[]);r.onerror=()=>rej(r.error);});}
  window.RahalDevice={
    db,put,all,
    isOnline:()=>navigator.onLine,
    vibrate:(pattern=20)=>navigator.vibrate?navigator.vibrate(pattern):false,
    share:async(data)=>{if(navigator.share){await navigator.share(data);return true} return false},
    gps:()=>new Promise((resolve,reject)=>navigator.geolocation?navigator.geolocation.getCurrentPosition(p=>resolve({lat:p.coords.latitude,lng:p.coords.longitude,accuracy:p.coords.accuracy}),reject,{enableHighAccuracy:true,timeout:12000,maximumAge:60000}):reject(new Error('GPS غير مدعوم'))),
    battery:async()=>navigator.getBattery?await navigator.getBattery():null,
    savePhoto:async(data)=>put('photos',{data,createdAt:Date.now()}),
    photos:()=>all('photos'),
    queue:async(action)=>put('offlineActions',{action,createdAt:Date.now()}),
    sync:async()=>{ if(!navigator.onLine)return; const items=await all('offlineActions'); if(!items.length)return; if(window.RahalV3){RahalV3.save('rahal-pending-sync',items)} },
    installPrompt:null
  };
  window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();RahalDevice.installPrompt=e;});
  window.addEventListener('online',()=>RahalDevice.sync().catch(()=>{}));
  window.addEventListener('offline',()=>{});
})();

/* V12 — رحّال: ملف معلومات الوجهات الذكي */
(function(){
  const DATA={
    taiz:{best:"أكتوبر–مارس",budget:[12000,35000],stay:"إقامة محلية أو فندق متوسط",food:"مطاعم محلية وأكلات تعزية",activities:["جولة في المدينة القديمة","استكشاف الجبال","التصوير وقت الغروب"],tips:"ابدأ الأنشطة الخارجية صباحًا وتحقق من حالة الطريق قبل الانطلاق."},
    ibb:{best:"يوليو–سبتمبر",budget:[10000,30000],stay:"فندق أو شقة محلية",food:"مأكولات يمنية محلية",activities:["استكشاف الطبيعة","زيارة المرتفعات","التصوير بين المدرجات"],tips:"الطقس قد يتغير بسرعة؛ احتفظ بملابس مناسبة للمطر."},
    aden:{best:"نوفمبر–مارس",budget:[15000,45000],stay:"فندق قريب من الواجهة البحرية",food:"مأكولات بحرية وأطباق محلية",activities:["الشاطئ","جولة تاريخية","غروب على الساحل"],tips:"تجنب ساعات الظهيرة الحارة للأنشطة الخارجية."},
    socotra:{best:"أكتوبر–أبريل",budget:[50000,120000],stay:"نزل أو مخيم مرخص",food:"وجبات محلية مرتبة مسبقًا",activities:["دِكسم","الشواطئ","التصوير والطبيعة"],tips:"خطط للنقل والإقامة مسبقًا لأن الخيارات محدودة."},
    shibam:{best:"نوفمبر–فبراير",budget:[18000,50000],stay:"فندق أو نزل محلي",food:"مأكولات حضرمية",activities:["المدينة التاريخية","التصوير المعماري","جولة ثقافية"],tips:"أفضل التصوير صباحًا وقبل الغروب."},
    sanaa:{best:"نوفمبر–فبراير",budget:[15000,45000],stay:"فندق أو بيت ضيافة",food:"مطبخ يمني تقليدي",activities:["صنعاء القديمة","الأسواق","التصوير المعماري"],tips:"خصص وقتًا كافيًا للمشي داخل المدينة القديمة."}
  };
  window.RahalDestinationData=DATA;
  window.destinationIntel=function(d){
    if(!d)return "";
    const x=DATA[d.id]||{best:"بحسب الموسم",budget:[20000,60000],stay:"اختر إقامة موثوقة",food:"مطاعم محلية",activities:["استكشاف المعالم","التصوير","جولة محلية"],tips:"تحقق من الطقس والطرق قبل الانطلاق."};
    return `<div class="intel-grid">
      <div class="intel-box"><b>📅 أفضل وقت</b><span>${x.best}</span></div>
      <div class="intel-box"><b>🏨 الإقامة</b><span>${x.stay}</span></div>
      <div class="intel-box"><b>🍽️ الطعام</b><span>${x.food}</span></div>
    </div>
    <h3>⭐ ماذا تفعل؟</h3><ul class="intel-list">${x.activities.map(a=>`<li>${a}</li>`).join("")}</ul>
    <div class="notice">💡 ${x.tips}</div>`;
  };
  window.smartDestinationScore=function(d){
    const x=DATA[d?.id]; if(!x)return 70;
    return Math.min(99,Math.round((Number(d.rating||4)*18)+10));
  };
})();
