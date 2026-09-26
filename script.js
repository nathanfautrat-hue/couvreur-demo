document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Hero : carrousel multi-angle (chantier / toit fini / artisan / charpente)
  const slides = [...document.querySelectorAll('.slide')];
  if (slides.length) {
    const num = document.querySelector('.hero-counter .num');
    const label = document.querySelector('.hero-counter .label');
    const dotsWrap = document.querySelector('.hero-dots');
    let current = 0;
    let timer;

    const dots = slides.map((_, i) => {
      const b = document.createElement('button');
      b.setAttribute('aria-label', 'Photo ' + (i + 1));
      b.addEventListener('click', () => { show(i); restart(); });
      dotsWrap.appendChild(b);
      return b;
    });

    function show(i) {
      slides[current].classList.remove('is-active');
      dots[current].classList.remove('is-active');
      current = i;
      slides[current].classList.add('is-active');
      dots[current].classList.add('is-active');
      num.textContent = String(current + 1).padStart(2, '0');
      label.textContent = slides[current].dataset.label;
    }
    function restart() {
      clearInterval(timer);
      if (!reduceMotion) timer = setInterval(() => show((current + 1) % slides.length), 5500);
    }
    show(0);
    restart();
  }

  // Signature : rangs d'ardoises en écailles qui basculent en place au scroll
  const slateBands = document.querySelectorAll('.slates');
  function buildSlates(band) {
    band.innerHTML = '';
    const count = Math.ceil(band.offsetWidth / 60) + 2;
    for (let r = 0; r < 2; r++) {
      const row = document.createElement('div');
      row.className = 'slates-row';
      for (let i = 0; i < count; i++) {
        const s = document.createElement('div');
        s.className = 'slate';
        s.style.transitionDelay = (r * 120 + i * 18) + 'ms';
        row.appendChild(s);
      }
      band.appendChild(row);
    }
  }
  slateBands.forEach(buildSlates);
  const slateObserver = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('in'); slateObserver.unobserve(e.target); }
    });
  }, { threshold: 0.6 });
  slateBands.forEach((b) => slateObserver.observe(b));
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => slateBands.forEach((b) => {
      const wasIn = b.classList.contains('in');
      buildSlates(b);
      if (wasIn) b.classList.add('in');
    }), 200);
  });

  // Services : la photo suit la prestation survolée
  const srvItems = document.querySelectorAll('.srv-list li');
  const srvImg = document.querySelector('.srv-figure img');
  const srvCap = document.querySelector('.srv-figure figcaption');
  srvItems.forEach((li) => {
    const activate = () => {
      srvItems.forEach((x) => x.classList.remove('is-active'));
      li.classList.add('is-active');
      if (srvImg && srvImg.getAttribute('src') !== li.dataset.img) {
        srvImg.style.opacity = 0;
        setTimeout(() => {
          srvImg.src = li.dataset.img;
          srvImg.alt = li.dataset.alt;
          srvCap.textContent = li.dataset.caption;
          srvImg.style.opacity = 1;
        }, 180);
      }
    };
    li.addEventListener('mouseenter', activate);
    li.addEventListener('focusin', activate);
  });

  // Galerie : filtre par catégorie
  const tabs = document.querySelectorAll('.tabs button');
  const figs = document.querySelectorAll('.gallery figure');
  tabs.forEach((t) => t.addEventListener('click', () => {
    tabs.forEach((x) => x.classList.remove('is-active'));
    t.classList.add('is-active');
    const f = t.dataset.filter;
    figs.forEach((fig) => fig.classList.toggle('is-hidden', f !== 'all' && fig.dataset.cat !== f));
  }));

  // Menu mobile
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
  }
});
