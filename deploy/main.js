// Full copy of portfolio/main.js — provides client-side behaviors and UI interactions.
document.addEventListener('DOMContentLoaded', () => {
  // Quick local-serve diagnostics: check that styles.css loaded
  const cssBg = getComputedStyle(document.documentElement).getPropertyValue('--bg') || '';
  if (!cssBg.trim()) {
    console.warn('[main.js] styles.css does not appear to be loaded. If you started a local server from a different folder, serve the folder that contains index.html, styles.css and main.js. See top-level index.html or README for guidance.');
    const el = document.createElement('div');
    el.style.position = 'fixed'; el.style.top = '12px'; el.style.left = '12px'; el.style.padding = '10px 12px'; el.style.background = '#ff5c5c'; el.style.color = '#fff'; el.style.borderRadius = '10px'; el.style.zIndex = 9999;
    el.style.boxShadow = '0 8px 28px rgba(0,0,0,0.6)';
    el.textContent = 'Warning: styles.css not loaded. Try running `python -m http.server` inside the folder with this index.html.';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 8000);
  }
  console.log('[main.js] loaded — DOMContentLoaded');
  // Scroll up/down buttons
  const btnUp = document.getElementById('scrollUp');
  const btnDown = document.getElementById('scrollDown');
  btnUp && btnUp.addEventListener('click', () => window.scrollTo({top: 0, behavior: 'smooth'}));
  btnDown && btnDown.addEventListener('click', () => window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'}));

  // Animate progress bars on view
  const skillBars = document.querySelectorAll('.progress');
  const options = { threshold: 0.35 };
  const animateSkill = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const bar = entry.target.querySelector('.bar');
        const percent = parseInt(entry.target.getAttribute('data-percent') || '0', 10);
        bar.style.width = percent + '%';
        observer.unobserve(entry.target);
      }
    });
  };
  const obs = new IntersectionObserver(animateSkill, options);
  skillBars.forEach(s => obs.observe(s));

  // Scroll reveal for general elements
  const revealTargets = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });
  revealTargets.forEach(t => revealObserver.observe(t));

  // Navbar active link switching
  const navLinks = Array.from(document.querySelectorAll('nav a'));
  const sections = navLinks.map(a => document.querySelector(a.getAttribute('href')));
  const navObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const idx = sections.indexOf(entry.target);
        navLinks.forEach(link => link.classList.remove('active'));
        navLinks[idx] && navLinks[idx].classList.add('active');
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(s => s && navObserver.observe(s));

  // Smooth scroller (for nav click)
  navLinks.forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) target.scrollIntoView({behavior: 'smooth', block: 'start'});
    });
  });

  // Year in footer
  document.getElementById('year').textContent = new Date().getFullYear();

  // Avatar subtle hover/pulse - small enjoyment
  const avatar = document.querySelector('.avatar');
  avatar && avatar.addEventListener('mouseenter', () => avatar.style.transform = 'scale(1.05)');
  avatar && avatar.addEventListener('mouseleave', () => avatar.style.transform = '');
  // avatar click gives a playful spin
  avatar && avatar.addEventListener('click', () => {
    avatar.style.transition = 'transform 700ms ease'; avatar.style.transform = 'rotate(360deg) scale(1.04)';
    setTimeout(() => avatar.style.transform = '', 800);
  });

  // Typewriter effect for title
  function runTypewriter(el, speed=60){
    if(!el) return;
    const text = el.textContent.trim();
    el.textContent = '';
    let i = 0;
    const t = setInterval(() => {
      el.textContent += text[i] || '';
      i++;
      if(i > text.length) { clearInterval(t); }
    }, speed);
  }
  runTypewriter(document.querySelector('.title.typewriter'));

  // Mobile nav toggler (show hide small nav)
  const hamb = document.getElementById('hambtn');
  const menu = document.getElementById('menu');
  if (hamb) {
    hamb.style.display = 'flex';
    hamb.addEventListener('click', () => {
      const visible = menu.style.display === 'flex' || menu.style.display === 'block';
      menu.style.display = visible ? 'none' : 'flex';
      menu.style.flexDirection = 'column';
      menu.style.position = 'absolute';
      menu.style.right = '12px';
      menu.style.top = '72px';
      menu.style.background = 'rgba(5,7,24,0.9)';
      menu.style.padding = '12px';
      menu.style.borderRadius = '12px';
      menu.style.zIndex = '999';
    });
  }

  // add header scroll class to gently increase shadow
  const header = document.querySelector('header');
  const onScroll = () => {
    if (window.scrollY > 22) header && header.classList.add('scrolled');
    else header && header.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  // Guard against placeholder social links (prevent accidental 404s)
  const contactSocials = document.querySelectorAll('a.contact-social');
  contactSocials.forEach(a => {
    const href = a.getAttribute('href') || '';
    if (/YOUR_HANDLE|yourname@example.com/i.test(href)){
      console.warn('[main.js] Placeholder contact link found — redirecting to platform root to avoid 404:', href);
      if (href.includes('instagram.com')) a.href = 'https://instagram.com/';
      else if (href.includes('tiktok.com')) a.href = 'https://tiktok.com/';
      else if (href.includes('x.com') || href.includes('twitter.com')) a.href = 'https://facebook.com/';
      // leave mailto as-is but log a dev hint
      else if (href.startsWith('mailto:')) console.warn('[main.js] Please replace mailto: placeholder with an actual email.');
    }
  });
});

// ==========================
// Contact form (dummy submit)
// ==========================
function handleSubmit(e) {
  e.preventDefault();
  const status = document.getElementById('sendStatus');
  status.textContent = 'Sending...';
  setTimeout(() => {
    status.textContent = 'Message sent! I will get back to you shortly.';
  }, 900);
  e.target.reset();
}

// small function to show a subtle modal or go to portfolio, can be replaced
function openPortfolio() {
  document.querySelector('#portfolio').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// debug helper to show that the JS loaded
function showLoadBadge(){
  const badge = document.createElement('div');
  badge.id = 'siteLoaded';
  badge.style.position = 'fixed'; badge.style.right = '12px'; badge.style.bottom = '12px';
  badge.style.background = 'rgba(0,0,0,0.5)'; badge.style.border = '1px solid rgba(0,184,255,0.12)';
  badge.style.color = 'var(--white)'; badge.style.padding = '6px 10px'; badge.style.borderRadius = '999px';
  badge.style.fontSize = '14px'; badge.style.boxShadow = '0 4px 20px rgba(0,0,0,0.6), 0 0 18px rgba(0,184,255,0.08)';
  badge.textContent = 'Site loaded';
  document.body.appendChild(badge);
  setTimeout(()=> badge.remove(), 4000);
}
document.addEventListener('DOMContentLoaded', showLoadBadge);
