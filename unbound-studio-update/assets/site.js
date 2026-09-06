// Unbound Studio — shared behaviour for all pages
(function(){

  // ---- Header shrink + scroll progress bar ----
  const header = document.querySelector('header');
  const progress = document.getElementById('progress');
  function onScroll(){
    if(header) header.classList.toggle('scrolled', window.scrollY > 30);
    if(progress){
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      progress.style.width = pct + '%';
    }
  }
  document.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  // ---- Cursor-tracked iridescent border glow on card grids ----
  document.querySelectorAll('.glow-group').forEach(grid=>{
    grid.addEventListener('mousemove', (e)=>{
      grid.querySelectorAll('.svc-card').forEach(card=>{
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', ((e.clientX - r.left) / r.width) * 100 + '%');
        card.style.setProperty('--my', ((e.clientY - r.top) / r.height) * 100 + '%');
      });
    });
  });

  // ---- Scroll reveal: sections settle into place once, on entry ----
  const revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && revealEls.length){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold:0.15, rootMargin:'0px 0px -60px 0px' });
    revealEls.forEach(el=>io.observe(el));
  } else {
    revealEls.forEach(el=>el.classList.add('in'));
  }

  // ---- FAQ accordion ----
  document.querySelectorAll('.faq-q').forEach(q=>{
    q.addEventListener('click', ()=>{
      const item = q.parentElement;
      document.querySelectorAll('.faq-item').forEach(i=>{ if(i!==item) i.classList.remove('open'); });
      item.classList.toggle('open');
    });
  });

})();
