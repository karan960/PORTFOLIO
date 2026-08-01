/* ==========================================================================
   Karan Sathe — Portfolio JS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Loader ---------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(()=> loader && loader.classList.add('hide'), 500);
  });
  setTimeout(()=> loader && loader.classList.add('hide'), 2000); // fallback

  /* ---------- Theme toggle ---------- */
  const root = document.documentElement;
  const savedTheme = localStorage.getItem('ks-theme');
  if (savedTheme) root.setAttribute('data-theme', savedTheme);
  document.querySelectorAll('.theme-toggle').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
      const next = current === 'light' ? 'dark' : 'light';
      if(next === 'light'){ root.setAttribute('data-theme','light'); } else { root.removeAttribute('data-theme'); }
      localStorage.setItem('ks-theme', next);
    });
  });

  /* ---------- Navbar scroll state ---------- */
  const navbar = document.getElementById('navbar');
  const onScroll = () => {
    if (window.scrollY > 30) navbar?.classList.add('scrolled');
    else navbar?.classList.remove('scrolled');

    // scroll progress
    const h = document.documentElement;
    const scrolled = (h.scrollTop || document.body.scrollTop);
    const height = h.scrollHeight - h.clientHeight;
    const pct = height > 0 ? (scrolled/height)*100 : 0;
    const bar = document.getElementById('scroll-progress');
    if (bar) bar.style.width = pct + '%';

    // to top button
    const top = document.getElementById('to-top');
    if (top) top.classList.toggle('show', scrolled > 500);
  };
  document.addEventListener('scroll', onScroll);
  onScroll();

  /* ---------- Mobile nav burger ---------- */
  const burger = document.getElementById('nav-burger');
  const links = document.getElementById('nav-links');
  burger?.addEventListener('click', ()=>{
    burger.classList.toggle('open');
    links.classList.toggle('open');
  });
  links?.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=>{
    burger?.classList.remove('open'); links?.classList.remove('open');
  }));

  /* ---------- Mark active nav link ---------- */
  const page = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav-links a').forEach(a=>{
    const href = a.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) a.classList.add('active');
  });

  /* ---------- Mouse glow ---------- */
  const glow = document.getElementById('mouse-glow');
  if (glow){
    window.addEventListener('mousemove', e=>{
      glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
    });
  }

  /* ---------- To top ---------- */
  document.getElementById('to-top')?.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

  /* ---------- Ripple buttons ---------- */
  document.querySelectorAll('.btn').forEach(btn=>{
    btn.addEventListener('click', function(e){
      const r = document.createElement('span');
      r.className = 'ripple';
      const rect = this.getBoundingClientRect();
      r.style.left = (e.clientX - rect.left) + 'px';
      r.style.top = (e.clientY - rect.top) + 'px';
      r.style.width = r.style.height = Math.max(rect.width, rect.height) + 'px';
      r.style.marginLeft = r.style.marginTop = -(Math.max(rect.width, rect.height)/2) + 'px';
      this.appendChild(r);
      setTimeout(()=> r.remove(), 650);
    });
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window){
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{
        if (en.isIntersecting){
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, {threshold:.15});
    revealEls.forEach(el=> io.observe(el));
  } else {
    revealEls.forEach(el=> el.classList.add('in'));
  }

  /* ---------- Skill bars fill on reveal ---------- */
  const skillBars = document.querySelectorAll('.skill-bar span');
  if ('IntersectionObserver' in window && skillBars.length){
    const sio = new IntersectionObserver((entries)=>{
      entries.forEach(en=>{
        if (en.isIntersecting){
          en.target.style.width = en.target.dataset.pct + '%';
          sio.unobserve(en.target);
        }
      });
    }, {threshold:.4});
    skillBars.forEach(b=> sio.observe(b));
  }

  /* ---------- Skills tabs ---------- */
  const tabBtns = document.querySelectorAll('.tab-btn');
  tabBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      tabBtns.forEach(b=> b.classList.remove('active'));
      btn.classList.add('active');
      document.querySelectorAll('.skills-panel').forEach(p=> p.classList.remove('active'));
      document.getElementById(btn.dataset.target)?.classList.add('active');
      document.querySelectorAll(`#${btn.dataset.target} .skill-bar span`).forEach(s=>{
        s.style.width = s.dataset.pct + '%';
      });
    });
  });

  /* ---------- Typing animation (hero) ---------- */
  const typedEl = document.getElementById('typed-role');
  if (typedEl){
    const words = ['Web Developer.', 'Python Programmer.', 'Networking Enthusiast.', 'Problem Solver.'];
    let wi = 0, ci = 0, deleting = false;
    const type = () => {
      const word = words[wi];
      if (!deleting){
        ci++;
        typedEl.textContent = word.slice(0, ci);
        if (ci === word.length){ deleting = true; setTimeout(type, 1400); return; }
      } else {
        ci--;
        typedEl.textContent = word.slice(0, ci);
        if (ci === 0){ deleting = false; wi = (wi+1) % words.length; }
      }
      setTimeout(type, deleting ? 40 : 85);
    };
    type();
  }

  /* ---------- Gallery lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  document.querySelectorAll('.gallery-item img').forEach(img=>{
    img.addEventListener('click', ()=>{
      document.getElementById('lightbox-img').src = img.src;
      lightbox?.classList.add('open');
    });
  });
  document.querySelector('.close-lb')?.addEventListener('click', ()=> lightbox.classList.remove('open'));
  lightbox?.addEventListener('click', (e)=>{ if (e.target === lightbox) lightbox.classList.remove('open'); });

  /* ---------- Network node canvas (signature background) ---------- */
  const canvas = document.getElementById('network-canvas');
  if (canvas){
    const ctx = canvas.getContext('2d');
    let w, h, nodes = [];
    const NODE_COUNT = window.innerWidth < 700 ? 34 : 70;

    function resize(){
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    }
    function initNodes(){
      nodes = Array.from({length: NODE_COUNT}, ()=> ({
        x: Math.random()*w, y: Math.random()*h,
        vx: (Math.random()-0.5)*0.35, vy: (Math.random()-0.5)*0.35
      }));
    }
    function isLight(){ return document.documentElement.getAttribute('data-theme') === 'light'; }
    function draw(){
      ctx.clearRect(0,0,w,h);
      const lineColor = isLight() ? '18,23,35' : '150,180,255';
      const dotColor = isLight() ? '79,124,255' : '120,170,255';
      for (let i=0;i<nodes.length;i++){
        const n = nodes[i];
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        for (let j=i+1;j<nodes.length;j++){
          const m = nodes[j];
          const dx = n.x-m.x, dy = n.y-m.y;
          const dist = Math.sqrt(dx*dx+dy*dy);
          if (dist < 130){
            ctx.strokeStyle = `rgba(${lineColor},${0.14*(1-dist/130)})`;
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(n.x,n.y); ctx.lineTo(m.x,m.y); ctx.stroke();
          }
        }
        ctx.fillStyle = `rgba(${dotColor},0.8)`;
        ctx.beginPath(); ctx.arc(n.x,n.y,1.6,0,Math.PI*2); ctx.fill();
      }
      requestAnimationFrame(draw);
    }
    resize(); initNodes(); draw();
    window.addEventListener('resize', ()=>{ resize(); initNodes(); });
  }

});
