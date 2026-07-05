const nav = document.getElementById('siteNav');
const navLinks = document.getElementById('navLinks');
const menuToggle = document.getElementById('menuToggle');
const progress = document.querySelector('.scroll-progress');
const backToTop = document.getElementById('backToTop');
const glow = document.querySelector('.cursor-glow');
const sections = [...document.querySelectorAll('main section[id]')];
const links = [...document.querySelectorAll('.nav-links a')];

document.getElementById('year').textContent = new Date().getFullYear();

menuToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
links.forEach(link => link.addEventListener('click', () => navLinks.classList.remove('open')));

const updateScrollUI = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const value = max > 0 ? (window.scrollY / max) * 100 : 0;
  progress.style.width = `${value}%`;
  backToTop.classList.toggle('show', window.scrollY > 600);
  nav.classList.toggle('scrolled', window.scrollY > 30);

  let current = 'home';
  sections.forEach(section => {
    const top = section.offsetTop - 130;
    if (window.scrollY >= top) current = section.id;
  });
  links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
};

window.addEventListener('scroll', updateScrollUI, { passive: true });
updateScrollUI();

backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

window.addEventListener('mousemove', event => {
  if (!glow) return;
  glow.style.left = `${event.clientX}px`;
  glow.style.top = `${event.clientY}px`;
}, { passive: true });

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach(item => revealObserver.observe(item));
