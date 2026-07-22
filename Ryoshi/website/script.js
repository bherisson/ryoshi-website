// ===================== RYOSHI site script =====================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Intro ---------- */
  const intro = document.getElementById('intro');
  setTimeout(() => intro.classList.add('hide'), 1900);
  setTimeout(() => intro.remove(), 2600);

  /* ---------- Custom cursor ---------- */
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mx = 0, my = 0, rx = 0, ry = 0;

  window.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
  });

  function ringLoop(){
    rx += (mx - rx) * 0.18;
    ry += (my - ry) * 0.18;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(ringLoop);
  }
  ringLoop();

  document.querySelectorAll('a, button, .band-card, .merch-card').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('link'));
    el.addEventListener('mouseleave', () => ring.classList.remove('link'));
  });
  document.querySelectorAll('.masonry-item img, .band-card img').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('img'));
    el.addEventListener('mouseleave', () => ring.classList.remove('img'));
  });

  /* ---------- Nav ---------- */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

  /* ---------- Hero parallax zoom-out + logo fade ---------- */
  const heroBg = document.getElementById('heroBg');
  const heroLogo = document.getElementById('heroLogo');
  const hero = document.getElementById('hero');

  function onScrollHero(){
    const h = hero.offsetHeight;
    const p = Math.min(window.scrollY / h, 1);
    const scale = 1.15 - (0.15 * p); // zoom out toward 1
    heroBg.style.transform = `scale(${Math.max(scale, 1)}) translateY(${p * 40}px)`;
    heroLogo.style.opacity = Math.max(1 - p * 2.2, 0);
    heroLogo.style.transform = `translateY(${p * -30}px) scale(${1 - p * 0.3})`;
  }
  window.addEventListener('scroll', onScrollHero, { passive: true });
  onScrollHero();

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal-line, .reveal-lines, .reveal-scale');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
  revealEls.forEach(el => io.observe(el));

  /* ---------- Card tilt on mouse move (band + merch) ---------- */
  document.querySelectorAll('.band-card, .merch-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(700px) rotateY(${px * 8}deg) rotateX(${-py * 8}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ---------- Member modal data ---------- */
  const members = {
    felix: {
      name: 'Felix', role: 'Vocals', img: 'assets/felix.jpg',
      bio: 'Front-man and lyricist. Felix brings the raw, guttural energy that anchors Ryoshi\'s live sound, channeling emotion into every performance.',
      gear: 'Shure SM58, in-ear monitors, custom vocal chain.',
      fav: 'Architects, Currents, Bad Omens.'
    },
    alison: {
      name: 'Alison', role: 'Guitar', img: 'assets/alison.jpg',
      bio: 'Riffs, leads, and atmosphere. Alison writes the melodic backbone that gives Ryoshi its progressive edge.',
      gear: '7-string guitar, Neural DSP Quad Cortex, EMG pickups.',
      fav: 'Periphery, Polyphia, Sylosis.'
    },
    bertrand: {
      name: 'Bertrand', role: 'Bass', img: 'assets/bertrand.jpg',
      bio: 'Low-end and groove. Bertrand locks the rhythm section together and drives the heavier passages.',
      gear: '5-string bass, Darkglass preamp, Ampeg cab.',
      fav: 'Spiritbox, Northlane, Meshuggah.'
    },
    william: {
      name: 'William', role: 'Drums', img: 'assets/william.jpg',
      bio: 'Precision and power behind the kit. William\'s dynamic playing shapes every breakdown and blast.',
      gear: 'Custom hybrid kit, triggers, Zildjian cymbals.',
      fav: 'Veil of Maya, The Contortionist, Volumes.'
    }
  };

  const modalBackdrop = document.getElementById('modalBackdrop');
  const modalImg = document.getElementById('modalImg');
  const modalName = document.getElementById('modalName');
  const modalRole = document.getElementById('modalRole');
  const modalBio = document.getElementById('modalBio');
  const modalGear = document.getElementById('modalGear');
  const modalFav = document.getElementById('modalFav');

  function openMember(key){
    const m = members[key];
    if (!m) return;
    modalImg.src = m.img; modalImg.alt = m.name;
    modalName.textContent = m.name;
    modalRole.textContent = m.role;
    modalBio.textContent = m.bio;
    modalGear.textContent = m.gear;
    modalFav.textContent = m.fav;
    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeMember(){
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }
  document.querySelectorAll('.band-card').forEach(card => {
    card.addEventListener('click', () => openMember(card.dataset.member));
    card.addEventListener('keypress', e => { if (e.key === 'Enter') openMember(card.dataset.member); });
  });
  document.getElementById('modalClose').addEventListener('click', closeMember);
  modalBackdrop.addEventListener('click', e => { if (e.target === modalBackdrop) closeMember(); });

  /* ---------- Gallery lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  document.querySelectorAll('.masonry-item').forEach(item => {
    item.addEventListener('click', () => {
      lightboxImg.src = item.dataset.full;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
  function closeLightbox(){
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape'){ closeMember(); closeLightbox(); closeSecret(); }
  });

  /* ---------- Ambient particle background ---------- */
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  function initParticles(){
    const count = Math.min(60, Math.floor(window.innerWidth / 22));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.4,
      vy: -(Math.random() * 0.3 + 0.05),
      vx: (Math.random() - 0.5) * 0.15,
      a: Math.random() * 0.4 + 0.05
    }));
  }
  function drawParticles(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#f2efe9';
    particles.forEach(p => {
      p.y += p.vy; p.x += p.vx;
      if (p.y < -10){ p.y = canvas.height + 10; p.x = Math.random() * canvas.width; }
      if (p.x < -10) p.x = canvas.width + 10;
      if (p.x > canvas.width + 10) p.x = -10;
      ctx.globalAlpha = p.a;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
    requestAnimationFrame(drawParticles);
  }
  resizeCanvas();
  initParticles();
  drawParticles();
  window.addEventListener('resize', () => { resizeCanvas(); initParticles(); });

  /* ---------- Easter egg: toast helper ---------- */
  const toast = document.getElementById('easterToast');
  function showToast(msg){
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2600);
  }

  /* ---------- Easter egg: Konami code -> red theme ---------- */
  const konami = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
  let konamiPos = 0;
  document.addEventListener('keydown', e => {
    const key = e.key;
    if (key === konami[konamiPos]){
      konamiPos++;
      if (konamiPos === konami.length){
        document.documentElement.classList.toggle('theme-red');
        showToast(document.documentElement.classList.contains('theme-red') ? 'BLOOD MODE ENABLED' : 'BLOOD MODE DISABLED');
        konamiPos = 0;
      }
    } else {
      konamiPos = (key === konami[0]) ? 1 : 0;
    }
  });

  /* ---------- Easter egg: click logo x5 -> alternate logo filter + secret page hint ---------- */
  let logoClicks = 0;
  let logoClickTimer = null;
  function handleLogoClick(){
    logoClicks++;
    clearTimeout(logoClickTimer);
    logoClickTimer = setTimeout(() => { logoClicks = 0; }, 1500);
    if (logoClicks >= 5){
      logoClicks = 0;
      document.querySelectorAll('.hero-logo, .nav-logo, .footer-logo').forEach(el => {
        el.style.filter = el.style.filter === 'invert(1) hue-rotate(180deg)' ? '' : 'invert(1) hue-rotate(180deg)';
      });
      showToast('ALTERNATE LOGO UNLOCKED');
      openSecret();
    }
  }
  document.getElementById('navLogo').addEventListener('click', (e) => { e.preventDefault(); handleLogoClick(); });
  document.getElementById('heroLogo').addEventListener('click', handleLogoClick);

  /* ---------- Secret wallpaper page ---------- */
  const secretPage = document.getElementById('secretPage');
  function openSecret(){ secretPage.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeSecret(){ secretPage.classList.remove('open'); document.body.style.overflow = ''; }
  document.getElementById('secretClose').addEventListener('click', closeSecret);

});
