// ═══════════════════════════════════════════════
// 1. AOS — scroll animations
// ═══════════════════════════════════════════════
AOS.init({
  duration: 900,
  once: true,
  offset: 80,
  easing: 'ease-out-cubic',
});

// ═══════════════════════════════════════════════
// 2. Typed.js — hero typing effect
// ═══════════════════════════════════════════════
if (document.getElementById('typing-text')) {
  new Typed('#typing-text', {
    strings: [
      'AI Engineer',
      'Data Scientist',
      'Machine Learning Expert',
      'Robotics Engineer',
    ],
    typeSpeed: 55,
    backSpeed: 35,
    backDelay: 2200,
    loop: true,
    showCursor: true,
    cursorChar: '|',
  });
}

// ═══════════════════════════════════════════════
// 3. Header — scroll shrink
// ═══════════════════════════════════════════════
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    header.style.background = 'rgba(244,243,240,0.97)';
  } else {
    header.style.background = 'rgba(244,243,240,0.92)';
  }
});

// ═══════════════════════════════════════════════
// 4. Hamburger — mobile nav
// ═══════════════════════════════════════════════
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

hamburger.addEventListener('click', () => {
  mobileNav.classList.toggle('open');
});

// close when clicking a mobile link
document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
  });
});

// ═══════════════════════════════════════════════
// 5. Projects Slider
// ═══════════════════════════════════════════════
let currentSlide = 0;
const track = document.getElementById('projectTrack');
const dots  = document.querySelectorAll('.dot');
const pages = document.querySelectorAll('.project-page');
const totalSlides = dots.length;

function moveSlide(direction) {
  currentSlide += direction;
  if (currentSlide >= totalSlides) currentSlide = 0;
  if (currentSlide < 0) currentSlide = totalSlides - 1;
  updateSlider();
}

function updateSlider() {
  if (!track) return;

  track.style.transform = `translateX(-${currentSlide * 100}%)`;

  pages.forEach((page, i) => {
    page.classList.toggle('active-page', i === currentSlide);
  });

  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlide);
  });
}

// dot click
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    currentSlide = i;
    updateSlider();
  });
});

// keyboard arrows
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') moveSlide(1);
  if (e.key === 'ArrowLeft')  moveSlide(-1);
});

// touch/swipe support
let touchStartX = 0;
let touchEndX   = 0;

if (track) {
  track.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      moveSlide(diff > 0 ? 1 : -1);
    }
  }, { passive: true });
}

// init
updateSlider();

// ═══════════════════════════════════════════════
// 6. Active nav link on scroll
// ═══════════════════════════════════════════════
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.navigation a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === '#' + entry.target.id
        );
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => observer.observe(s));
