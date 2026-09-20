(function(){
  function init(){
    const body=document.body;
    const sidebar=document.querySelector('.sidebar');
    const toggle=document.getElementById('menuToggle');
    const overlay=document.getElementById('drawerOverlay');
    if(!sidebar||!toggle) return;
    const close=()=>{body.classList.remove('drawer-open');toggle.setAttribute('aria-expanded','false');};
    const open=()=>{body.classList.add('drawer-open');toggle.setAttribute('aria-expanded','true');};
    toggle.addEventListener('click',()=>body.classList.contains('drawer-open')?close():open());
    overlay?.addEventListener('click',close);
    sidebar.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
    document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});
    window.addEventListener('resize',()=>{if(window.innerWidth>850) close()});
  }
  document.addEventListener('DOMContentLoaded',init);
})();
