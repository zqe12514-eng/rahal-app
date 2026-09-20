(function(){
  const KEY='rahal-account';
  const SESSION='rahal-session';
  const read=(k,d=null)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}};
  const write=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
  const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  async function hash(value){const data=new TextEncoder().encode(value);const buf=await crypto.subtle.digest('SHA-256',data);return [...new Uint8Array(buf)].map(b=>b.toString(16).padStart(2,'0')).join('');}
  function account(){return read(KEY,null)}
  function session(){return localStorage.getItem(SESSION)==='1'}
  function saveAccount(a){write(KEY,a)}
  function setSession(v){v?localStorage.setItem(SESSION,'1'):localStorage.removeItem(SESSION)}
  function normalize(v){return String(v||'').trim().toLowerCase()}
  function notify(msg){if(window.toast) window.toast(msg); else alert(msg)}
  window.RahalAuth={account,session,saveAccount,setSession,hash,esc,normalize,notify,logout(){setSession(false);location.href='login.html'}};

  window.addEventListener('DOMContentLoaded',()=>{
    const a=account();
    document.querySelectorAll('[data-account-name]').forEach(el=>el.textContent=a?.name||'زائر');
    document.querySelectorAll('[data-account-email]').forEach(el=>el.textContent=a?.contact||'لم يتم تسجيل الدخول');
    document.querySelectorAll('[data-guest-only]').forEach(el=>el.hidden=!!a&&session());
    document.querySelectorAll('[data-user-only]').forEach(el=>el.hidden=!(a&&session()));
  });
})();
