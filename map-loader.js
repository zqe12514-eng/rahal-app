(function(){
  function loadLeafletThenStart(){
    const start=()=>{
      if(window.__rahalMapStarted)return;
      window.__rahalMapStarted=true;
      window.RAHAL_MAP_PROVIDER='leaflet';
      if(typeof initRahalLeafletMap==='function') initRahalLeafletMap();
    };
    if(typeof L!=='undefined'){start();return;}
    let pending=2,failed=false;
    const done=()=>{pending--;if(pending<=0||failed)start();};
    const css=document.createElement('link');
    css.rel='stylesheet';
    css.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    css.onload=done;
    css.onerror=()=>{failed=true;done()};
    document.head.appendChild(css);
    const script=document.createElement('script');
    script.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    script.onload=done;
    script.onerror=()=>{failed=true;done()};
    document.head.appendChild(script);
    setTimeout(start,4500);
  }
  document.addEventListener('DOMContentLoaded',loadLeafletThenStart);
})();
