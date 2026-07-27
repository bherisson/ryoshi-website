// ===================== RYOSHI site script =====================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Intro ---------- */
  const intro = document.getElementById('intro');
  setTimeout(() => intro.classList.add('hide'), 1900);
  setTimeout(() => intro.remove(), 2600);

  /* ---------- Social links: open native app on mobile, web otherwise ---------- */
  const isMobileDevice = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const socialApps = {
    instagram: 'instagram://user?username=ryoshi.official',
    facebook: 'fb://facewebmodal/f?href=https://www.facebook.com/ryoshi.band',
    youtube: 'youtube://www.youtube.com/@Ryoshi.official',
    spotify: 'spotify://artist/4Uqqi1n97pdr0EM11cyq5P',
    tiktok: 'tiktok://user?username=ryoshi.band'
  };
  if (isMobileDevice){
    document.querySelectorAll('[data-social]').forEach(link => {
      const key = link.dataset.social;
      const appUrl = socialApps[key];
      const webUrl = link.getAttribute('href');
      if (!appUrl || !webUrl) return;
      link.addEventListener('click', (e) => {
        e.preventDefault();
        let redirected = false;
        const markRedirected = () => { redirected = true; };
        document.addEventListener('visibilitychange', markRedirected, { once: true });
        window.location.href = appUrl;
        setTimeout(() => {
          if (!redirected) window.open(webUrl, '_blank');
        }, 1200);
      });
    });
  }

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

  document.querySelectorAll('a, button, .band-card').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('link'));
    el.addEventListener('mouseleave', () => ring.classList.remove('link'));
  });
  document.querySelectorAll('.slider-item img, .band-card img, .timeline-slide img, .news-thumb img').forEach(el => {
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

  if (hero && heroBg && heroLogo){
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
  }

  /* ---------- About hero parallax zoom-out ---------- */
  const aboutHero = document.getElementById('aboutHero');
  const aboutHeroBg = document.getElementById('aboutHeroBg');

  if (aboutHero && aboutHeroBg){
    function onScrollAboutHero(){
      const h = aboutHero.offsetHeight;
      const p = Math.min(window.scrollY / h, 1);
      const scale = 1.18 - (0.18 * p);
      aboutHeroBg.style.transform = `scale(${Math.max(scale, 1)}) translateY(${p * 50}px)`;
    }
    window.addEventListener('scroll', onScrollAboutHero, { passive: true });
    onScrollAboutHero();
  }

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

  /* ---------- Card tilt on mouse move (band cards) ---------- */
  document.querySelectorAll('.band-card').forEach(card => {
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
      name: 'Felix', role: 'Vocals', img: 'assets/felix2.jpg',
      bio: 'Front-man and lyricist. Felix brings the raw, guttural energy that anchors Ryoshi\'s live sound, channeling emotion into every performance.',
      gear: 'Shure SM58, in-ear monitors, custom vocal chain.',
      fav: 'Architects, Currents, Bad Omens.'
    },
    alison: {
      name: 'Alison', role: 'Guitar', img: 'assets/alison4.jpg',
      bio: 'Riffs, leads, and atmosphere. Alison writes the melodic backbone that gives Ryoshi its progressive edge.',
      gear: '7-string guitar, Neural DSP Quad Cortex, EMG pickups.',
      fav: 'Periphery, Polyphia, Sylosis.'
    },
    bertrand: {
      name: 'Bertrand', role: 'Bass', img: 'assets/bertrand2.jpg',
      bio: 'Low-end and groove. Bertrand locks the rhythm section together and drives the heavier passages.',
      gear: '5-string bass, Darkglass preamp, Ampeg cab.',
      fav: 'Spiritbox, Northlane, Meshuggah.'
    },
    william: {
      name: 'William', role: 'Drums', img: 'assets/william2.jpg',
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
    if (!m || !modalBackdrop) return;
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
    if (!modalBackdrop) return;
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (modalBackdrop){
    document.querySelectorAll('.band-card').forEach(card => {
      card.addEventListener('click', () => openMember(card.dataset.member));
      card.addEventListener('keypress', e => { if (e.key === 'Enter') openMember(card.dataset.member); });
    });
    document.getElementById('modalClose').addEventListener('click', closeMember);
    modalBackdrop.addEventListener('click', e => { if (e.target === modalBackdrop) closeMember(); });
  }

  /* ---------- Gallery lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  function closeLightbox(){
    if (!lightbox) return;
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (lightbox){
    document.querySelectorAll('.slider-item').forEach(item => {
      item.addEventListener('click', () => {
        lightboxImg.src = item.dataset.full;
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  }

  /* ---------- Gallery horizontal slider arrows ---------- */
  const sliderTrack = document.getElementById('sliderTrack');
  const sliderPrev = document.getElementById('sliderPrev');
  const sliderNext = document.getElementById('sliderNext');
  if (sliderTrack && sliderPrev && sliderNext){
    function sliderStep(){
      const item = sliderTrack.querySelector('.slider-item');
      return item ? item.getBoundingClientRect().width + 16 : 300;
    }
    sliderPrev.addEventListener('click', () => sliderTrack.scrollBy({ left: -sliderStep(), behavior: 'smooth' }));
    sliderNext.addEventListener('click', () => sliderTrack.scrollBy({ left: sliderStep(), behavior: 'smooth' }));
  }

  /* ---------- Through the Years — horizontal cards, pinned ---------- */
  const thPinWrap = document.getElementById('thPinWrap');
  const timelineViewport = document.getElementById('timelineViewport');
  const timelineTrack = document.getElementById('timelineTrack');
  const yearsTabs = document.getElementById('yearsTabs');

  if (thPinWrap && timelineViewport && timelineTrack && yearsTabs){
    const slides = Array.from(timelineTrack.querySelectorAll('.timeline-slide'));
    const tabs = Array.from(yearsTabs.querySelectorAll('.year-tab'));
    let horizontalDistance = 0;
    let targetX = 0;
    let currentX = 0;

    function setActiveYear(year){
      tabs.forEach(t => t.classList.toggle('active', t.dataset.year === year));
    }

    // center the first slide at the very start, and the last slide at the very end,
    // so slides reveal one-by-one, side by side, as the user scrolls
    function recalc(){
      const viewportWidth = timelineViewport.clientWidth;
      const slideWidth = slides[0] ? slides[0].getBoundingClientRect().width : 0;
      const sidePad = Math.max((viewportWidth - slideWidth) / 2, 20);
      timelineTrack.style.paddingLeft = sidePad + 'px';
      timelineTrack.style.paddingRight = sidePad + 'px';

      const trackWidth = timelineTrack.scrollWidth;
      horizontalDistance = Math.max(trackWidth - viewportWidth, 0);
      thPinWrap.style.height = (window.innerHeight + horizontalDistance) + 'px';
    }

    function updateTarget(){
      if (horizontalDistance <= 0){ targetX = 0; return; }
      const rect = thPinWrap.getBoundingClientRect();
      const progress = Math.min(Math.max(-rect.top / horizontalDistance, 0), 1);
      targetX = -progress * horizontalDistance;
    }

    function updateActiveSlide(x){
      const centerPoint = -x + timelineViewport.clientWidth / 2;
      let current = slides[0];
      let bestDist = Infinity;
      slides.forEach(s => {
        const mid = s.offsetLeft + s.offsetWidth / 2;
        const dist = Math.abs(mid - centerPoint);
        if (dist < bestDist){ bestDist = dist; current = s; }
      });
      slides.forEach(s => s.classList.toggle('is-active', s === current));
      if (current) setActiveYear(current.dataset.year);
    }

    function raf(){
      // ease toward the scroll-driven target for fluid, non-abrupt motion
      currentX += (targetX - currentX) * 0.09;
      if (Math.abs(targetX - currentX) < 0.05) currentX = targetX;
      timelineTrack.style.transform = `translate3d(${currentX}px,0,0)`;
      updateActiveSlide(currentX);
      requestAnimationFrame(raf);
    }

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = slides.find(s => s.dataset.year === tab.dataset.year);
        if (!target || horizontalDistance <= 0) return;
        const slideCenter = target.offsetLeft + target.offsetWidth / 2;
        const desiredX = Math.min(Math.max(slideCenter - timelineViewport.clientWidth / 2, 0), horizontalDistance);
        const desiredProgress = desiredX / horizontalDistance;
        const pinRect = thPinWrap.getBoundingClientRect();
        const absoluteTop = pinRect.top + window.scrollY;
        const targetScrollY = absoluteTop + desiredProgress * horizontalDistance;
        window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
      });
    });

    recalc();
    updateTarget();
    currentX = targetX;
    updateActiveSlide(currentX);
    requestAnimationFrame(raf);
    window.addEventListener('resize', () => { recalc(); updateTarget(); });
    window.addEventListener('scroll', updateTarget, { passive: true });
  }

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
  const navLogoEl = document.getElementById('navLogo');
  if (navLogoEl){
    const navLogoLink = navLogoEl.closest('a');
    navLogoEl.addEventListener('click', (e) => {
      if (navLogoLink && navLogoLink.getAttribute('href') === '#hero') e.preventDefault();
      handleLogoClick();
    });
  }
  if (heroLogo) heroLogo.addEventListener('click', handleLogoClick);

  /* ---------- Secret wallpaper page ---------- */
  const secretPage = document.getElementById('secretPage');
  function openSecret(){ secretPage.classList.add('open'); document.body.style.overflow = 'hidden'; }
  function closeSecret(){ secretPage.classList.remove('open'); document.body.style.overflow = ''; }
  document.getElementById('secretClose').addEventListener('click', closeSecret);

});
