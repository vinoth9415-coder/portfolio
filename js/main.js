/**
 * Vinothkumar V — Personal Portfolio Script
 * Interactive Skills Section Redesign with Filter Tabs & Tech Glow Cards.
 */

document.addEventListener('DOMContentLoaded', () => {
  const data = window.PORTFOLIO_DATA;
  if (!data) {
    console.error('PORTFOLIO_DATA is missing!');
    return;
  }

  // Initialize features
  initPreloader();
  initNavbar();
  initLenisAndGSAP();
  initThreeJSScene();
  initParticles();
  initTypedEffect(data.profile.titles);
  renderAllSections(data);
  initAboutTabs();
  initContactForm();
});

/* ==========================================================================
   1. PRELOADER ANIMATION
   ========================================================================== */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const loaderBar = document.getElementById('loader-bar');
  const loaderText = document.getElementById('loader-text');

  if (!preloader || !loaderBar) return;

  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 20) + 10;
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);

      loaderBar.style.width = '100%';
      if (loaderText) loaderText.textContent = '100% READY';

      setTimeout(() => {
        preloader.classList.add('loaded');
        triggerEntranceAnimations();
      }, 300);
    } else {
      loaderBar.style.width = progress + '%';
      if (loaderText) loaderText.textContent = `INITIALIZING SYSTEM (${progress}%)`;
    }
  }, 50);
}

/* ==========================================================================
   2. NAVBAR BEHAVIORS & SMART SCROLL
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-capsule-link');

  if (!navbar) return;

  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (currentScrollY > 200 && currentScrollY > lastScrollY) {
      navbar.classList.add('nav-hidden');
    } else {
      navbar.classList.remove('nav-hidden');
    }

    lastScrollY = currentScrollY;

    // Active Section Highlight
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 130;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (currentScrollY >= sectionTop && currentScrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      mobileMenu.classList.toggle('hidden');
    });
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }
}

/* ==========================================================================
   3. LENIS SMOOTH SCROLL & GSAP
   ========================================================================== */
let lenis;
function initLenisAndGSAP() {
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0, 0);
    }
  }

  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
      easing: 'ease-out-cubic'
    });
  }
}

/* ==========================================================================
   4. THREE.JS ELEGANT AMBIENT BACKGROUND
   ========================================================================== */
function initThreeJSScene() {
  const container = document.getElementById('canvas-container');
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 7;

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const particlesGeometry = new THREE.BufferGeometry();
  const count = 700;
  const positions = new Float32Array(count * 3);

  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 15;
  }

  particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.035,
    color: 0x00e5ff,
    transparent: true,
    opacity: 0.6
  });

  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 0.8;
    mouseY = (e.clientY / window.innerHeight - 0.5) * 0.8;
  });

  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();
    particlesMesh.rotation.y = elapsedTime * 0.05;
    particlesMesh.rotation.x = elapsedTime * 0.03;

    particlesMesh.rotation.y += mouseX * 0.02;
    particlesMesh.rotation.x += mouseY * 0.02;

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

/* ==========================================================================
   5. TSPARTICLES
   ========================================================================== */
function initParticles() {
  if (typeof tsParticles === 'undefined') return;

  tsParticles.load('tsparticles', {
    fpsLimit: 60,
    particles: {
      number: { value: 45, density: { enable: true, value_area: 900 } },
      color: { value: ['#00E5FF', '#2563EB', '#8B5CF6'] },
      shape: { type: 'circle' },
      opacity: { value: 0.45, random: true },
      size: { value: 2.5, random: true },
      line_linked: {
        enable: true,
        distance: 130,
        color: '#2563EB',
        opacity: 0.18,
        width: 1
      },
      move: {
        enable: true,
        speed: 1,
        direction: 'none',
        random: true,
        straight: false,
        out_mode: 'out'
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'grab' },
        onclick: { enable: false }
      },
      modes: {
        grab: { distance: 140, line_linked: { opacity: 0.5 } }
      }
    },
    retina_detect: true
  });
}

/* ==========================================================================
   6. TYPED EFFECT FOR HERO TITLE
   ========================================================================== */
function initTypedEffect(strings) {
  const target = document.getElementById('typed-output');
  if (!target || typeof Typed === 'undefined') return;

  new Typed('#typed-output', {
    strings: strings,
    typeSpeed: 45,
    backSpeed: 25,
    backDelay: 2200,
    loop: true,
    showCursor: true,
    cursorChar: '|'
  });
}

/* ==========================================================================
   7. DYNAMIC RENDERING SECTIONS
   ========================================================================== */
function renderAllSections(data) {
  renderHeroDetails(data.profile);
  renderAboutStats(data.profile.stats);
  renderRedesignedSkills(data.skills);
  renderInternship(data.internships);
  renderEducation(data.education);
  renderProjects(data.projects);
  renderCertifications(data.certifications);
  renderAchievements(data.achievements);
  renderServices(data.services);
  renderResumeSection(data.profile);
}

function renderHeroDetails(profile) {
  const nameEl = document.getElementById('hero-name');
  const bioEl = document.getElementById('hero-bio');

  if (nameEl) nameEl.textContent = profile.name;
  if (bioEl) bioEl.textContent = profile.bio;
}

function renderAboutStats(stats) {
  const container = document.getElementById('about-stats-grid');
  if (!container) return;

  container.innerHTML = stats.map((stat) => `
    <div class="glass-card text-center p-4" data-aos="zoom-in">
      <div class="stat-number">${stat.value}</div>
      <div class="stat-label">${stat.label}</div>
    </div>
  `).join('');
}

/* Redesigned Interactive Skills Matrix */
function renderRedesignedSkills(skillsCategories) {
  const filterContainer = document.getElementById('skills-filter-container');
  const gridContainer = document.getElementById('skills-grid');

  if (!gridContainer) return;

  // Flatten all items with category tagging
  let allSkillItems = [];
  skillsCategories.forEach((cat) => {
    cat.items.forEach((item) => {
      allSkillItems.push({
        ...item,
        category: cat.category
      });
    });
  });

  // Render Filter Buttons
  if (filterContainer) {
    const categories = ['All Stack', ...skillsCategories.map(c => c.category)];
    filterContainer.innerHTML = categories.map((cat, idx) => `
      <button class="skill-filter-btn ${idx === 0 ? 'active' : ''}" data-filter="${cat}">
        ${cat}
      </button>
    `).join('');

    // Add filter click event
    filterContainer.querySelectorAll('.skill-filter-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        filterContainer.querySelectorAll('.skill-filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');

        const selectedCat = e.target.getAttribute('data-filter');
        displaySkillCards(selectedCat, allSkillItems, gridContainer);
      });
    });
  }

  // Display initial 'All Stack' skills
  displaySkillCards('All Stack', allSkillItems, gridContainer);
}

function displaySkillCards(filterCategory, items, container) {
  const filtered = filterCategory === 'All Stack'
    ? items
    : items.filter(i => i.category === filterCategory);

  container.innerHTML = filtered.map((skill, idx) => {
    const levelLabel = skill.level >= 90 ? 'Expert' : (skill.level >= 84 ? 'Advanced' : 'Proficient');
    return `
      <div class="col-6 col-md-4 col-lg-3 skill-card-item" data-aos="fade-up" data-aos-delay="${idx * 40}">
        <div class="skill-tech-card">
          
          <div class="d-flex align-items-center justify-content-between mb-3">
            <div class="tech-icon-glow" style="color: ${skill.color}">
              <i class="${skill.iconClass}"></i>
            </div>
            <span class="skill-badge-level">${levelLabel}</span>
          </div>

          <h4 class="h6 text-white font-weight-bold mb-1">${skill.name}</h4>
          <div class="d-flex justify-content-between align-items-center mb-3">
            <span class="text-slate-400 small font-mono">${skill.category}</span>
            <span class="text-cyan font-weight-bold small font-mono">${skill.level}%</span>
          </div>

          <div class="skill-card-bar-bg">
            <div class="skill-card-bar-fill" 
                 data-level="${skill.level}" 
                 style="background: linear-gradient(90deg, ${skill.color}, #00E5FF);"></div>
          </div>

        </div>
      </div>
    `;
  }).join('');

  observeSkillCardBars();
}

function observeSkillCardBars() {
  const fills = document.querySelectorAll('.skill-card-bar-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const level = entry.target.getAttribute('data-level');
        entry.target.style.width = `${level}%`;
      }
    });
  }, { threshold: 0.1 });

  fills.forEach((fill) => observer.observe(fill));
}

function renderInternship(internships) {
  const container = document.getElementById('internship-container');
  if (!container) return;

  container.innerHTML = internships.map((intern) => `
    <div class="internship-card" data-aos="fade-up">
      <div class="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-3 mb-4">
        <div class="d-flex align-items-center gap-3">
          <div class="company-logo-box">
            <i class="fa-solid fa-building"></i>
          </div>
          <div>
            <h3 class="h4 text-white font-weight-bold mb-1">${intern.role}</h3>
            <div class="text-cyan font-weight-semibold fs-5">${intern.company}</div>
          </div>
        </div>
        <div class="d-flex flex-column text-md-end">
          <span class="badge bg-primary fs-6 px-3 py-2 rounded-pill mb-1">
            <i class="fa-regular fa-calendar-alt me-1"></i> ${intern.period}
          </span>
          <span class="text-slate-400 small"><i class="fa-solid fa-location-dot me-1"></i> ${intern.location}</span>
        </div>
      </div>

      <p class="text-slate-300 mb-4 fs-6 leading-relaxed">${intern.description}</p>

      <h4 class="h6 text-white font-weight-bold mb-3 text-uppercase tracking-wider">Key Accomplishments & Responsibilities</h4>
      <div class="row g-3 mb-4">
        ${intern.highlights.map((h) => `
          <div class="col-12">
            <div class="bullet-highlight-item">
              <i class="fa-solid fa-circle-check fs-5"></i>
              <span>${h}</span>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="pt-3 border-top border-secondary d-flex align-items-center gap-2 flex-wrap">
        <span class="text-slate-400 small me-2 font-weight-semibold">Tech Stack Used:</span>
        <span class="tech-tag">Python</span>
        <span class="tech-tag">Django</span>
        <span class="tech-tag">JavaScript</span>
        <span class="tech-tag">HTML5/CSS3</span>
        <span class="tech-tag">Bootstrap 5</span>
        <span class="tech-tag">MySQL</span>
        <span class="tech-tag">E-Commerce Architecture</span>
      </div>
    </div>
  `).join('');
}

function renderEducation(education) {
  const container = document.getElementById('education-container');
  if (!container) return;

  container.innerHTML = education.map((edu, idx) => `
    <div class="col-md-6" data-aos="fade-up" data-aos-delay="${idx * 150}">
      <div class="education-card">
        <div class="d-flex align-items-center justify-content-between mb-3">
          <div class="degree-icon-box">
            <i class="fa-solid fa-graduation-cap"></i>
          </div>
          <span class="grade-badge">${edu.grade}</span>
        </div>
        <h3 class="h5 text-white font-weight-bold mb-2">${edu.degree}</h3>
        <div class="text-cyan small mb-2"><i class="fa-solid fa-building-columns me-1"></i> ${edu.institution}</div>
        <div class="text-slate-400 small mb-3"><i class="fa-regular fa-calendar me-1"></i> Academic Period: ${edu.period}</div>
        <p class="text-slate-300 small mb-0 mt-auto">${edu.description}</p>
      </div>
    </div>
  `).join('');
}

function renderProjects(projects) {
  const container = document.getElementById('projects-grid');
  if (!container) return;

  container.innerHTML = projects.map((proj, idx) => `
    <div class="col-md-6 col-lg-6" data-aos="fade-up" data-aos-delay="${idx * 120}">
      <div class="project-card">
        <div class="project-img-wrap" style="background: ${proj.gradient}">
          <div class="project-img-placeholder">
            <i class="fa-solid fa-laptop-code fa-3x"></i>
            <span class="font-mono text-uppercase small">${proj.category}</span>
          </div>
        </div>
        <div class="project-body">
          <span class="text-cyan font-mono small mb-1">${proj.subtitle}</span>
          <h3 class="h4 text-white font-weight-bold mb-2">${proj.title}</h3>
          <p class="text-slate-400 small mb-3 flex-grow-1">${proj.description}</p>
          <div class="mb-4">
            ${proj.tags.map((t) => `<span class="tech-tag">${t}</span>`).join('')}
          </div>
          <div class="d-flex gap-3 mt-auto pt-3 border-top border-secondary border-opacity-25">
            <a href="${proj.github}" target="_blank" rel="noopener noreferrer" class="btn btn-sm flex-fill text-center rounded-pill px-3 py-2 shadow-sm" style="background: #06B6D4 !important; color: #0F172A !important; font-weight: 800 !important; font-size: 0.88rem !important; display: inline-flex !important; align-items: center !important; justify-content: center !important; border: none !important; opacity: 1 !important; visibility: visible !important;">
              <i class="fa-brands fa-github me-2"></i> Source Code
            </a>
            <a href="${proj.demo !== '#' ? proj.demo : 'https://github.com/vinoth9415-coder'}" target="_blank" rel="noopener noreferrer" class="btn btn-sm flex-fill text-center rounded-pill px-3 py-2 shadow-sm" style="background: linear-gradient(135deg, #3B82F6, #8B5CF6) !important; color: #FFFFFF !important; font-weight: 800 !important; font-size: 0.88rem !important; display: inline-flex !important; align-items: center !important; justify-content: center !important; border: none !important; opacity: 1 !important; visibility: visible !important;">
              <i class="fa-solid fa-arrow-up-right-from-square me-2"></i> Live Preview
            </a>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function renderCertifications(certs) {
  const container = document.getElementById('certs-grid');
  if (!container) return;

  container.innerHTML = certs.map((c, idx) => `
    <div class="col-md-6 col-lg-3" data-aos="zoom-in" data-aos-delay="${idx * 80}">
      <div class="glass-card text-center p-4 h-100 d-flex flex-column align-items-center">
        <div class="brand-icon mb-3" style="width:52px; height:52px; font-size:1.4rem; color:${c.color}; border-color:${c.color}">
          <i class="${c.icon}"></i>
        </div>
        <span class="badge bg-secondary mb-2">${c.badge}</span>
        <h4 class="h6 text-white font-weight-bold mb-2">${c.title}</h4>
        <div class="text-slate-400 small mt-auto">${c.issuer} (${c.year})</div>
      </div>
    </div>
  `).join('');
}

function renderAchievements(achievements) {
  const container = document.getElementById('achievements-grid');
  if (!container) return;

  container.innerHTML = achievements.map((a, idx) => `
    <div class="col-md-6" data-aos="fade-up" data-aos-delay="${idx * 120}">
      <div class="glass-card d-flex gap-3 align-items-start p-4">
        <div class="brand-icon flex-shrink-0" style="width:48px; height:48px; font-size:1.3rem;">
          <i class="fa-solid ${a.icon}"></i>
        </div>
        <div>
          <span class="badge bg-warning text-dark font-weight-bold mb-2">${a.highlight}</span>
          <h4 class="h5 text-white font-weight-bold mb-1">${a.title}</h4>
          <p class="text-slate-400 small mb-0">${a.detail}</p>
        </div>
      </div>
    </div>
  `).join('');
}

function renderServices(services) {
  const container = document.getElementById('services-grid');
  if (!container) return;

  container.innerHTML = services.map((s, idx) => `
    <div class="col-md-6 col-lg-4" data-aos="fade-up" data-aos-delay="${idx * 80}">
      <div class="glass-card p-4 h-100 d-flex flex-column">
        <div class="brand-icon mb-3" style="color: ${s.accent}; border-color: ${s.accent}">
          <i class="fa-solid ${s.icon}"></i>
        </div>
        <h4 class="h5 text-white font-weight-bold mb-2">${s.title}</h4>
        <p class="text-slate-400 small flex-grow-1 mb-0">${s.description}</p>
      </div>
    </div>
  `).join('');
}

function renderResumeSection(profile) {
  const resumeContainer = document.getElementById('resume-card-container');
  if (!resumeContainer) return;

  resumeContainer.innerHTML = `
    <div class="glass-card p-5 text-center max-w-2xl mx-auto" data-aos="zoom-in">
      <div class="brand-icon mx-auto mb-3" style="width:65px; height:65px; font-size:1.8rem; background: rgba(6, 182, 212, 0.2); border: 2px solid #06B6D4; color: #06B6D4; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
        <i class="fa-solid fa-file-pdf"></i>
      </div>
      <h3 class="h3 text-white font-weight-bold mb-2">${profile.name} — Resume</h3>
      <p class="text-slate-400 mb-4">${profile.role} | Full Stack Development & IoT Engineering</p>
      
      <div class="d-flex justify-content-center gap-3 flex-wrap">
        <a href="/assets/Vinothkumar_V_Resume.pdf" target="_blank" rel="noopener noreferrer" class="btn btn-primary-glow px-4 py-2" style="background: linear-gradient(135deg, #06B6D4, #3B82F6) !important; color: #0F172A !important; font-weight: 800 !important; border-radius: 30px !important; text-decoration: none !important;">
          <i class="fa-solid fa-eye me-2"></i> View Resume PDF
        </a>
        <a href="/assets/Vinothkumar_V_Resume.pdf" download="Vinothkumar_V_Resume.pdf" onclick="triggerConfetti()" class="btn btn-outline-glow px-4 py-2" style="background: rgba(6, 182, 212, 0.15) !important; border: 1.5px solid #06B6D4 !important; color: #06B6D4 !important; font-weight: 700 !important; border-radius: 30px !important; text-decoration: none !important;">
          <i class="fa-solid fa-download me-2"></i> Download Resume PDF
        </a>
        <a href="https://github.com/vinoth9415-coder" target="_blank" rel="noopener noreferrer" class="btn btn-outline-glow px-4 py-2" style="background: rgba(6, 182, 212, 0.15) !important; border: 1.5px solid #06B6D4 !important; color: #06B6D4 !important; font-weight: 700 !important; border-radius: 30px !important; text-decoration: none !important;">
          <i class="fa-brands fa-github me-2"></i> View GitHub Profile
        </a>
        <a href="https://www.linkedin.com/in/vinothkumar-v-60b0b5343/" target="_blank" rel="noopener noreferrer" class="btn btn-outline-glow px-4 py-2" style="background: rgba(6, 182, 212, 0.15) !important; border: 1.5px solid #06B6D4 !important; color: #06B6D4 !important; font-weight: 700 !important; border-radius: 30px !important; text-decoration: none !important;">
          <i class="fa-brands fa-linkedin-in me-2"></i> View LinkedIn
        </a>
      </div>
    </div>
  `;
}

function triggerEntranceAnimations() {
  if (typeof gsap !== 'undefined') {
    gsap.from('#hero .hero-top-badge', { y: -25, opacity: 0, duration: 0.7, ease: 'power2.out' });
    gsap.from('#hero .hero-title-name', { y: 25, opacity: 0, duration: 0.8, delay: 0.15, ease: 'power2.out' });
    gsap.from('#hero .hero-typed-text', { opacity: 0, duration: 0.8, delay: 0.3 });
    gsap.from('#hero .hero-description', { y: 15, opacity: 0, duration: 0.7, delay: 0.45 });
  }
}

function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');
  const submitBtn = document.getElementById('contact-submit-btn');

  const successAlert = document.getElementById('contact-success-alert');
  const errorAlert = document.getElementById('contact-error-alert');
  const errorText = document.getElementById('contact-error-text');

  const errName = document.getElementById('err-name');
  const errEmail = document.getElementById('err-email');
  const errSubject = document.getElementById('err-subject');
  const errMessage = document.getElementById('err-message');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Real-time input error clearing
  [nameInput, emailInput, subjectInput, messageInput].forEach((input) => {
    if (!input) return;
    input.addEventListener('input', () => {
      input.classList.remove('border-danger');
      if (input === nameInput && errName) errName.classList.add('d-none');
      if (input === emailInput && errEmail) errEmail.classList.add('d-none');
      if (input === subjectInput && errSubject) errSubject.classList.add('d-none');
      if (input === messageInput && errMessage) errMessage.classList.add('d-none');
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Reset error banners
    if (successAlert) successAlert.classList.add('d-none');
    if (errorAlert) errorAlert.classList.add('d-none');

    let isValid = true;

    // Validate Full Name
    const nameVal = nameInput ? nameInput.value.trim() : '';
    if (!nameVal) {
      if (errName) errName.classList.remove('d-none');
      if (nameInput) nameInput.classList.add('border-danger');
      isValid = false;
    } else {
      if (errName) errName.classList.add('d-none');
      if (nameInput) nameInput.classList.remove('border-danger');
    }

    // Validate Email Address
    const emailVal = emailInput ? emailInput.value.trim() : '';
    if (!emailVal || !emailRegex.test(emailVal)) {
      if (errEmail) errEmail.classList.remove('d-none');
      if (emailInput) emailInput.classList.add('border-danger');
      isValid = false;
    } else {
      if (errEmail) errEmail.classList.add('d-none');
      if (emailInput) emailInput.classList.remove('border-danger');
    }

    // Validate Subject
    const subjectVal = subjectInput ? subjectInput.value.trim() : '';
    if (!subjectVal) {
      if (errSubject) errSubject.classList.remove('d-none');
      if (subjectInput) subjectInput.classList.add('border-danger');
      isValid = false;
    } else {
      if (errSubject) errSubject.classList.add('d-none');
      if (subjectInput) subjectInput.classList.remove('border-danger');
    }

    // Validate Message
    const messageVal = messageInput ? messageInput.value.trim() : '';
    if (!messageVal || messageVal.length < 10) {
      if (errMessage) errMessage.classList.remove('d-none');
      if (messageInput) messageInput.classList.add('border-danger');
      isValid = false;
    } else {
      if (errMessage) errMessage.classList.add('d-none');
      if (messageInput) messageInput.classList.remove('border-danger');
    }

    if (!isValid) return;

    // Botcheck Spam Protection
    const botcheck = document.getElementById('botcheck');
    if (botcheck && botcheck.checked) {
      return; // Stop spam bot submissions
    }

    // Web3Forms API Key setup (read from env or standard access key)
    const accessKey = window.WEB3FORMS_ACCESS_KEY || '5d2f7823-9566-4c31-9a74-b5297ff0ca80';

    // Prevent duplicate submission while email is being sent
    const originalBtnText = submitBtn ? submitBtn.innerHTML : '<i class="fa-solid fa-paper-plane me-2"></i> Send Message';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i> Sending Email...';
    }

    let isSuccess = false;
    let errorMessage = 'Failed to send email. Please try again or email vinoth9415@gmail.com directly.';

    try {
      // 1. Primary Backend: Node.js Express / Vercel Serverless Endpoint (/send-mail)
      const backendUrl = '/send-mail';

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout for SMTP delivery

      try {
        const response = await fetch(backendUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name: nameVal,
            email: emailVal,
            subject: subjectVal,
            message: messageVal
          }),
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        const data = await response.json();
        if (response.ok && data.success) {
          isSuccess = true;
        } else {
          errorMessage = data.message || 'Failed to send email via Node.js server.';
        }
      } catch (backendError) {
        clearTimeout(timeoutId);
        console.warn('Primary endpoint unavailable, trying Netlify function / Web3Forms fallback...', backendError);

        // 1b. Netlify Function explicit fallback
        try {
          const netlifyRes = await fetch('/.netlify/functions/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ name: nameVal, email: emailVal, subject: subjectVal, message: messageVal })
          });
          const netlifyData = await netlifyRes.json();
          if (netlifyRes.ok && netlifyData.success) {
            isSuccess = true;
          }
        } catch (nfErr) {
          console.warn('Netlify function endpoint not responding, trying Web3Forms...', nfErr);
        }

        if (!isSuccess) {
          // 2. Fallback Backend: Web3Forms / FormSubmit
          try {
            const accessKey = window.WEB3FORMS_ACCESS_KEY || '86f526f8d416763a63ef497766065762';
            const w3Res = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
              access_key: accessKey,
              name: nameVal,
              email: emailVal,
              subject: subjectVal,
              message: messageVal,
              from_name: 'Vinothkumar V Portfolio'
            })
          });

          if (w3Res.ok) {
            isSuccess = true;
          } else {
            // 3. Fallback: FormSubmit
            const formPayload = new FormData();
            formPayload.append('name', nameVal);
            formPayload.append('email', emailVal);
            formPayload.append('subject', subjectVal);
            formPayload.append('message', messageVal);
            formPayload.append('_captcha', 'false');

            const fsRes = await fetch('https://formsubmit.co/ajax/vinoth9415@gmail.com', {
              method: 'POST',
              body: formPayload
            });

            if (fsRes.ok) {
              isSuccess = true;
            }
          }
        } catch (fallbackError) {
          console.error('Fallback email services also failed:', fallbackError);
        }
      }
    }

      if (isSuccess) {
        // On Success: Display success message, clear form, re-enable button, trigger confetti
        if (successAlert) successAlert.classList.remove('d-none');
        form.reset();

        if (typeof confetti !== 'undefined') {
          confetti({
            particleCount: 90,
            spread: 70,
            origin: { y: 0.6 }
          });
        }
      } else {
        // On Failure: Display professional error message, keep entered data in form, re-enable button
        if (errorAlert) {
          if (errorText) errorText.innerText = errorMessage;
          errorAlert.classList.remove('d-none');
        }
      }
    } catch (err) {
      console.error('Contact Form Submission Error:', err);
      if (errorAlert) {
        if (errorText) errorText.innerText = 'Failed to send email. Please check connection or email vinoth9415@gmail.com.';
        errorAlert.classList.remove('d-none');
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    }
  });
}

function triggerConfetti() {
  if (typeof confetti !== 'undefined') {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

function downloadResumeModal() {
  triggerConfetti();
  const link = document.createElement('a');
  link.href = '/assets/Vinothkumar_V_Resume.pdf';
  link.download = 'Vinothkumar_V_Resume.pdf';
  link.target = '_blank';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function initAboutTabs() {
  const tabBtns = document.querySelectorAll('.about-tab-btn');
  const tabContents = document.querySelectorAll('.about-tab-content');

  tabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      tabBtns.forEach((b) => b.classList.remove('active'));
      tabContents.forEach((c) => c.classList.add('hidden'));

      btn.classList.add('active');
      const targetTab = document.getElementById(btn.getAttribute('data-tab'));
      if (targetTab) {
        targetTab.classList.remove('hidden');
      }
    });
  });
}
