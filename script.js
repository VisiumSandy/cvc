/* ============================================================
   CVC — Shared Script
============================================================ */

// ── Nav sticky + burger ──────────────────────────────────────
const nav = document.querySelector('.nav');
const burger = document.querySelector('.nav__burger');
const menu = document.querySelector('.nav__menu');

window.addEventListener('scroll', () => {
  nav.classList.toggle('sticky', window.scrollY > 40);
}, { passive: true });

if (burger && menu) {
  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    menu.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
  });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    burger.classList.remove('open');
    menu.classList.remove('open');
    document.body.style.overflow = '';
  }));
}

// ── Scroll reveal (below-fold only) ─────────────────────────
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('on');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.sr').forEach(el => io.observe(el));

// ── Counters ─────────────────────────────────────────────────
function runCounter(el) {
  const target = +el.dataset.target;
  const dur = 1800, step = 16;
  const inc = target / (dur / step);
  let cur = 0;
  const t = setInterval(() => {
    cur = Math.min(cur + inc, target);
    el.textContent = Math.floor(cur);
    if (cur >= target) clearInterval(t);
  }, step);
}

const statsIO = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.stat-num[data-target]').forEach(runCounter);
      statsIO.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.stats').forEach(s => statsIO.observe(s));

// ── FAQ accordion ────────────────────────────────────────────
document.querySelectorAll('.faq-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// ── Contact form ─────────────────────────────────────────────
const form = document.getElementById('contactForm');
const success = document.getElementById('formSuccess');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type=submit]');
    btn.textContent = 'Envoi en cours…'; btn.disabled = true;
    setTimeout(() => {
      form.reset(); btn.textContent = 'Envoyer le message'; btn.disabled = false;
      success.classList.add('show');
      setTimeout(() => success.classList.remove('show'), 5000);
    }, 1200);
  });
}

// ── Smooth anchors ───────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
  });
});