/* ============================================================
   ROX ADAMAS România — JavaScript
   ============================================================ */

// ── Navbar scroll effect ───────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

// ── Mobile burger menu ─────────────────────────────────────
const burger   = document.getElementById('navBurger');
const navMob   = document.getElementById('navMobile');
let menuOpen   = false;

burger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  navMob.classList.toggle('open', menuOpen);
  burger.setAttribute('aria-expanded', menuOpen);
  // Animate burger spans
  const spans = burger.querySelectorAll('span');
  if (menuOpen) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity   = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans.forEach(s => {
      s.style.transform = '';
      s.style.opacity   = '';
    });
  }
});

// Close mobile menu on link click
navMob.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    navMob.classList.remove('open');
    const spans = burger.querySelectorAll('span');
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ── Scroll reveal ──────────────────────────────────────────
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Stagger children if needed
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -60px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// ── Exterior color switcher ────────────────────────────────
setupColorSwitcher(
  'colorTabs',
  'colorImg',
  'colorName'
);

// ── Interior color switcher ────────────────────────────────
setupColorSwitcher(
  'intColorTabs',
  'intColorImg',
  'intColorName'
);

function setupColorSwitcher(tabsId, imgId, nameId) {
  const tabs  = document.getElementById(tabsId);
  const img   = document.getElementById(imgId);
  const name  = document.getElementById(nameId);
  if (!tabs || !img || !name) return;

  const btns = tabs.querySelectorAll('.color-btn');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const newSrc  = btn.dataset.img;
      const newName = btn.dataset.name;

      // Fade out → update → fade in
      img.classList.add('fade-out');
      setTimeout(() => {
        img.src = newSrc;
        img.onload = () => img.classList.remove('fade-out');
        // Fallback in case already cached
        if (img.complete) img.classList.remove('fade-out');
        name.textContent = newName;
      }, 350);
    });
  });
}

// ── Contact form ───────────────────────────────────────────
function handleSubmit(e) {
  e.preventDefault();
  const btn     = document.getElementById('submitBtn');
  const success = document.getElementById('formSuccess');
  const form    = document.getElementById('contactForm');

  btn.textContent = 'Se trimite...';
  btn.disabled    = true;

  // Simulate async submission
  setTimeout(() => {
    // Reset form
    form.reset();
    btn.textContent = 'Trimite solicitarea';
    btn.disabled    = false;
    success.style.display = 'block';
    setTimeout(() => {
      success.style.display = 'none';
    }, 6000);
  }, 1200);
}

// ── Smooth anchor offset (fixed nav) ──────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const navH   = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
    const top    = target.getBoundingClientRect().top + window.scrollY - navH;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── Lazy image loading fallback ────────────────────────────
if ('loading' in HTMLImageElement.prototype) {
  // Native lazy loading supported — nothing extra needed
} else {
  // Fallback: load all images immediately
  document.querySelectorAll('img[loading="lazy"]').forEach(img => {
    if (img.dataset.src) img.src = img.dataset.src;
  });
}

// ── Parallax on hero ───────────────────────────────────────
const heroImg = document.querySelector('.hero .hero-img');
if (heroImg && window.matchMedia('(min-width: 769px)').matches) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    heroImg.style.transform = `scale(1.05) translateY(${scrolled * 0.25}px)`;
  }, { passive: true });
}

// ── Gallery items stagger ──────────────────────────────────
document.querySelectorAll('.gallery-grid-2, .gallery-grid-3').forEach(grid => {
  const items = grid.querySelectorAll('.gallery-item');
  items.forEach((item, i) => {
    item.style.transitionDelay = `${i * 0.12}s`;
  });
});

document.querySelectorAll('.sp-grid .sp-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
});

document.querySelectorAll('.specs-grid .spec-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
});
