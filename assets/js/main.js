// Imran Beyan Portfolio - Interactive Script

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initMobileMenu();
  initAgentSimulator();
  initMathDemo();
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
      }, 200);

      thumbnails.forEach(t => t.classList.remove('ring-2', 'ring-orange-500', 'border-transparent'));
      thumb.classList.add('ring-2', 'ring-orange-500');
    });
  });
}

// 4. Interactive LangGraph & AI Agent Simulator
function initAgentSimulator() {
  const runBtn = document.getElementById('run-agent-btn');
  const workflowSelect = document.getElementById('agent-workflow-select');
  const logsContainer = document.getElementById('agent-logs');
  const stepNodes = document.querySelectorAll('.agent-step-node');

  if (!runBtn || !logsContainer) return;

  const workflows = {
    math: [
      { step: 0, text: '📥 [Input]: "Find the eigenvalues & solve system dx/dt = A x for stability..."' },
      { step: 1, text: '🧠 [Planner]: Decomposing into characteristic polynomial det(A - λI) = 0.' },
      { step: 2, text: '⚙️ [Tool: Python/SymPy]: Computing roots λ₁ = -2.5, λ₂ = -0.8 + 1.2i.' },
      { step: 3, text: '🔍 [Critic/Evaluator]: Real parts are negative (Re(λ) < 0) -> Stable focus.' },
      { step: 4, text: '✅ [LangGraph State]: Final solution validated & phase-portrait generated.' }
    ],
    vision: [
      { step: 0, text: '📥 [Input]: Live video feed ingested from camera sensor.' },
      { step: 1, text: '🧠 [Planner]: Routing frames to PyTorch edge detector & YOLO model.' },
      { step: 2, text: '⚙️ [Tool: PyTorch/CV]: Inferred bounding boxes [person: 98%, book: 94%].' },
      { step: 3, text: '🔍 [Critic/Evaluator]: Temporal tracking match verified across 30 fps.' },
      { step: 4, text: '✅ [LangGraph State]: Low latency stream verified at 18ms inference.' }
    ],
    agentic: [
      { step: 0, text: '📥 [Input]: "Analyze student SQL database for top percentile performers."' },
      { step: 1, text: '🧠 [Planner]: Formulating LangGraph multi-table aggregation query plan.' },
      { step: 2, text: '⚙️ [Tool: SQL Engine]: Executing optimized indexed CTEs and window functions.' },
      { step: 3, text: '🔍 [Critic/Evaluator]: Validating against edge cases and null constraints.' },
      { step: 4, text: '✅ [LangGraph State]: Structured JSON response dispatched to Django REST API.' }
    ]
  };

  runBtn.addEventListener('click', async () => {
    const selected = workflowSelect.value;
    const steps = workflows[selected] || workflows.math;
    
    runBtn.disabled = true;
    runBtn.innerHTML = `<span>Executing Agent Graph...</span>`;
    logsContainer.innerHTML = '';

    // Reset step highlighting
    stepNodes.forEach(node => node.classList.remove('active-node'));

    for (let i = 0; i < steps.length; i++) {
      const item = steps[i];
      
      // Highlight active node in diagram
      stepNodes.forEach((node, idx) => {
        if (idx === item.step) {
          node.classList.add('active-node');
        } else {
          node.classList.remove('active-node');
        }
      });

      // Append log entry
      const logLine = document.createElement('div');
      logLine.className = 'font-mono text-xs md:text-sm py-1.5 px-3 rounded bg-black/10 dark:bg-white/5 border-l-2 border-orange-500 animate-fadeIn';
      logLine.innerText = item.text;
      logsContainer.appendChild(logLine);
      logsContainer.scrollTop = logsContainer.scrollHeight;

      await new Promise(r => setTimeout(r, 750));
    }

    runBtn.disabled = false;
    runBtn.innerHTML = `<span>▶ Run Workflow Again</span>`;
  });
}

// 5. Interactive Math & Problem Solver Widget
function initMathDemo() {
  const solveBtn = document.getElementById('math-solve-btn');
  const problemType = document.getElementById('problem-type');
  const resultBox = document.getElementById('math-result');

  if (!solveBtn || !resultBox) return;

  const solutions = {
    quad: {
      title: 'Quadratic Equation Solver (ax² + bx + c = 0)',
      formula: 'x = (-b ± √(b² - 4ac)) / (2a)',
      calc: 'For 2x² - 8x + 6 = 0: Discriminant Δ = (-8)² - 4(2)(6) = 64 - 48 = 16. Roots: x₁ = 3, x₂ = 1.',
      insight: 'Real and distinct solutions. Parabola vertex at x = 2, minimum value y = -2.'
    },
    fib: {
      title: 'Fast Matrix Exponentiation Fibonacci O(log n)',
      formula: '[[1, 1], [1, 0]]ⁿ = [[F(n+1), F(n)], [F(n), F(n-1)]]',
      calc: 'Computing F(50): 12,586,269,025 calculated in 6 matrix multiplications.',
      insight: 'Exponential speedup over naive recursion O(2ⁿ), demonstrating algorithmic efficiency.'
    },
    vision_filter: {
      title: 'Computer Vision Sobel 3x3 Edge Kernel',
      formula: 'G_x = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]] * Image',
      calc: 'Gradient magnitude |G| = √(G_x² + G_y²). Gradient direction θ = atan2(G_y, G_x).',
      insight: 'Extracts spatial intensity gradients fundamental to edge and corner detection in PyTorch.'
    }
  };

  solveBtn.addEventListener('click', () => {
    const val = problemType.value;
    const sol = solutions[val];
    
    resultBox.innerHTML = `
      <div class="space-y-2">
        <div class="font-semibold text-orange-600 dark:text-orange-400 text-sm">${sol.title}</div>
        <div class="font-mono text-xs p-2 rounded bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200">${sol.formula}</div>
        <div class="text-sm text-stone-700 dark:text-stone-300 font-medium">${sol.calc}</div>
        <div class="text-xs text-stone-500 dark:text-stone-400 italic">💡 Mathematical Insight: ${sol.insight}</div>
      </div>
    `;
  });
}

// 6. Contact Form Simulation
function initContactForm() {
  const form = document.getElementById('contact-form');
  const alert = document.getElementById('contact-alert');

  if (!form || !alert) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('sender-name').value;
    const email = document.getElementById('sender-email').value;
    const message = document.getElementById('sender-message').value;

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Sending...</span>`;

    setTimeout(() => {
      alert.classList.remove('hidden');
      alert.innerHTML = `
        <div class="p-4 rounded-xl bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300 text-sm">
          <strong>Thank you, ${name}!</strong> Your message has been prepared. You can also reach Imran directly via LinkedIn or email!
        </div>
      `;
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();

      setTimeout(() => {
        alert.classList.add('hidden');
      }, 6000);
    }, 900);
  });
}

// 7. Scroll Animations & Reveal
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
