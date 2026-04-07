/* ══════════════════════════════
   SCROLL REVEAL
══════════════════════════════ */
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => revealObserver.observe(el));

/* ══════════════════════════════
   NAVBAR — active link + shrink
══════════════════════════════ */
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a');
const navbar    = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  // Active link
  let current = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 110) current = s.id;
  });
  navLinks.forEach(a => {
    a.style.color = a.getAttribute('href') === `#${current}` ? '#fff' : '';
  });
  // Shrink
  navbar.style.padding = window.scrollY > 60 ? '10px 48px' : '16px 48px';
});

/* ══════════════════════════════
   HAMBURGER — mobile menu
══════════════════════════════ */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
});

function closeMobileNav() {
  hamburger.classList.remove('open');
  mobileNav.classList.remove('open');
}

/* ══════════════════════════════
   PARALLAX — hero title
══════════════════════════════ */
const heroTitle = document.querySelector('.hero-title');
window.addEventListener('scroll', () => {
  heroTitle.style.transform = `translateX(-50%) translateY(${window.scrollY * 0.28}px)`;
});

/* ══════════════════════════════
   LIGHTBOX
══════════════════════════════ */
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev  = document.getElementById('lightboxPrev');
const lightboxNext  = document.getElementById('lightboxNext');

let currentGroup = [];
let currentIndex = 0;

function openLightbox(imgs, index) {
  currentGroup = imgs;
  currentIndex = index;
  lightboxImg.src = currentGroup[currentIndex].src;
  lightboxImg.alt = currentGroup[currentIndex].alt;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
  setTimeout(() => { lightboxImg.src = ''; }, 300);
}

function showPrev() {
  currentIndex = (currentIndex - 1 + currentGroup.length) % currentGroup.length;
  swapImage();
}

function showNext() {
  currentIndex = (currentIndex + 1) % currentGroup.length;
  swapImage();
}

function swapImage() {
  lightboxImg.style.opacity = '0';
  setTimeout(() => {
    lightboxImg.src = currentGroup[currentIndex].src;
    lightboxImg.alt = currentGroup[currentIndex].alt;
    lightboxImg.style.opacity = '1';
  }, 160);
}
lightboxImg.style.transition = 'opacity 0.16s ease';

// Attach click to all project images
document.querySelectorAll('.proj-img').forEach(img => {
  img.addEventListener('click', () => {
    const group = img.dataset.group;
    const groupImgs = group
      ? [...document.querySelectorAll(`.proj-img[data-group="${group}"]`)]
      : [img];
    openLightbox(groupImgs, groupImgs.indexOf(img));
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrev);
lightboxNext.addEventListener('click', showNext);

// Close on backdrop click
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

// Keyboard nav
document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  showPrev();
  if (e.key === 'ArrowRight') showNext();
});

/* ══════════════════════════════
   CONTACT CARDS — stagger
══════════════════════════════ */
document.querySelectorAll('.contact-card').forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.08}s`;
});