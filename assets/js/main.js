// Imran Beyan Portfolio - Interactive Script

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initPhotoSwitcher();
  initContactForm();
  initScrollAnimations();
});

// 1. Theme Toggle
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const savedTheme = localStorage.getItem('imran-portfolio-theme') || 'light';
  
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('imran-portfolio-theme', nextTheme);
      updateThemeIcon(nextTheme);
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'dark') {
      themeIcon.innerHTML = `<svg class="w-5 h-5 text-amber-300" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"/></svg>`;
    } else {
      themeIcon.innerHTML = `<svg class="w-5 h-5 text-stone-700" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"/></svg>`;
    }
  }
}

// 2. Mobile Navigation
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeBtn = document.getElementById('mobile-menu-close');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.remove('hidden');
    });
  }

  if (closeBtn && mobileMenu) {
    closeBtn.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

// 3. Photo Switcher & Avatar Customizer
function initPhotoSwitcher() {
  const heroImg = document.getElementById('hero-portrait');
  const thumbnails = document.querySelectorAll('.photo-thumb');
  
  if (!heroImg) return;

  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const newSrc = thumb.getAttribute('data-src');
      heroImg.style.opacity = '0.3';
      heroImg.style.transform = 'scale(0.96)';
      
      setTimeout(() => {
        heroImg.src = newSrc;
        heroImg.style.opacity = '1';
        heroImg.style.transform = 'scale(1)';
      }, 150);

      thumbnails.forEach(t => t.classList.remove('ring-2', 'ring-orange-500'));
      thumb.classList.add('ring-2', 'ring-orange-500');
    });
  });
}

// 4. Contact Form
function initContactForm() {
  const form = document.getElementById('contact-form');
  const alert = document.getElementById('contact-alert');

  if (!form || !alert) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('sender-name').value;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Sending...</span>`;

    setTimeout(() => {
      alert.classList.remove('hidden');
      alert.innerHTML = `
        <div class="p-4 rounded-xl bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 text-sm">
          <strong>Thank you, ${name}!</strong> Your message has been received. You can also connect directly on LinkedIn or YouTube.
        </div>
      `;
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();

      setTimeout(() => {
        alert.classList.add('hidden');
      }, 5000);
    }, 700);
  });
}

// 5. Scroll Animations
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
        entry.target.classList.remove('opacity-0', 'translate-y-6');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    el.classList.add('transition-all', 'duration-700', 'opacity-0', 'translate-y-6');
    observer.observe(el);
  });
}
