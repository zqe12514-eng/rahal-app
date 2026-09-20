(function(){
  const add=()=>{
    const logged=!!(window.RahalAuth&&RahalAuth.account&&RahalAuth.account()&&RahalAuth.session&&RahalAuth.session());
    document.querySelectorAll('[data-account-link]').forEach(a=>{a.href=logged?'profile.html':'login.html';});
    document.querySelectorAll('[data-account-avatar]').forEach(el=>{
      const acc=logged?RahalAuth.account():null;
      el.textContent=acc&&acc.avatar?acc.avatar:'👤';
      const parent=el.closest('.account-avatar-btn');
      if(parent) parent.title=logged?(acc.name||'حسابي'):'تسجيل الدخول';
    });
  };
  document.addEventListener('DOMContentLoaded',add);
})();
