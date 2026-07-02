/**
 * CV. Rizki Gas Poll - Official Website
 * Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initSmoothScroll();
  initScrollAnimations();
  initContactForm();
  initBackToTop();
});

/**
 * Navbar scroll effect
 */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * Mobile menu toggle
 */
function initMobileMenu() {
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
  });
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });
}

/**
 * Smooth scroll & active nav link
 */
function initSmoothScroll() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  
  const updateActiveLink = () => {
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');
      
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };
  
  window.addEventListener('scroll', updateActiveLink, { passive: true });
}

/**
 * Scroll-triggered animations
 */
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const animateOnScroll = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  };
  
  const observer = new IntersectionObserver(animateOnScroll, observerOptions);
  
  const animatedElements = document.querySelectorAll(
    '.benefit-card, .facility-card, .process-step, .hub-card, .stat-card, .gallery-item'
  );
  
  animatedElements.forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(el);
  });
  
  // Add animate-in styles
  const style = document.createElement('style');
  style.textContent = `
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
}

/**
 * Contact form handling
 */
function initContactForm() {
  const form = document.getElementById('contactForm');
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    
    // Create WhatsApp message
    const message = `Halo CV. Rizki Gas Poll,%0A%0A` +
      `Nama: ${encodeURIComponent(data.name)}%0A` +
      `Perusahaan: ${encodeURIComponent(data.company || '-')}%0A` +
      `Telepon: ${encodeURIComponent(data.phone)}%0A` +
      `Email: ${encodeURIComponent(data.email || '-')}%0A%0A` +
      `Pesan:%0A${encodeURIComponent(data.message)}`;
    
    // Show success message
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Pesan Terkirim!';
    btn.style.background = 'var(--mint)';
    btn.disabled = true;
    
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
    
    window.open(`https://wa.me/6282247848205?text=${message}`, '_blank');
  });
}

/**
 * Back to top button
 */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}