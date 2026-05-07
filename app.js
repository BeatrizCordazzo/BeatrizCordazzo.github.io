// ================================
// CONFIG
// ================================
const GITHUB_USERNAME = 'BeatrizCordazzo';

// ================================
// PROJECT DATA (static, bilingual)
// ================================
const PROJECTS = [
  {
    name: 'Moderni Web',
    repo: 'ModerniWeb',
    tags: ['Angular', 'PHP', 'MySQL', 'REST API', 'SCSS'],
    type: { en: 'Final Degree Project (TFG)', es: 'Trabajo Fin de Grado (TFG)' },
    desc: {
      en: 'Full-stack web platform for a carpentry and interior design workshop. Customers can browse a furniture catalog, customize products, manage orders and favorites, and contact the workshop. Includes a complete admin panel for managing quotes, users, and projects.',
      es: 'Plataforma web full-stack para un taller de carpinter\u00eda y dise\u00f1o de interiores. Los clientes pueden explorar el cat\u00e1logo, personalizar productos, gestionar pedidos y favoritos, y contactar con el taller. Incluye un panel de administraci\u00f3n completo para gestionar presupuestos, usuarios y proyectos.'
    },
    highlights: {
      en: ['Angular 19 SPA with standalone components', 'PHP REST API + MySQL backend', 'Shopping cart, checkout and user profiles', 'Admin panel with quotes and SketchUp uploads', 'Leaflet map integration'],
      es: ['SPA en Angular 19 con componentes standalone', 'API REST en PHP + backend MySQL', 'Carrito, checkout y perfiles de usuario', 'Panel admin con presupuestos y subida de SketchUp', 'Integraci\u00f3n de mapa con Leaflet']
    },
    featured: true
  },
  {
    name: 'Mini Social',
    repo: 'mini_social',
    tags: ['Laravel', 'MySQL', 'Blade', 'PHP'],
    type: { en: 'Full-stack App', es: 'App Full-stack' },
    desc: {
      en: 'A lightweight social feed application. Users can register, log in, create posts, browse a feed, delete their own content, and like or unlike posts from others.',
      es: 'Aplicaci\u00f3n de red social ligera. Los usuarios pueden registrarse, iniciar sesi\u00f3n, crear publicaciones, explorar un feed y dar like o quitarlo a publicaciones de otros.'
    },
    highlights: {
      en: ['User authentication with Laravel Breeze', 'Post creation, listing and deletion', 'Like / unlike system', 'Eloquent ORM relationships (User, Post, Like)'],
      es: ['Autenticaci\u00f3n con Laravel Breeze', 'Creaci\u00f3n, listado y eliminaci\u00f3n de posts', 'Sistema de likes', 'Relaciones con Eloquent ORM (User, Post, Like)']
    },
    featured: false
  },
  {
    name: 'ToDo App',
    repo: 'ToDo_App',
    tags: ['PHP', 'MySQL', 'HTML', 'CSS'],
    type: { en: 'Full-stack App', es: 'App Full-stack' },
    desc: {
      en: 'A task management application built with pure PHP and MySQL, without frameworks. Users can register, log in, create tasks, mark them as complete, and delete them.',
      es: 'Aplicaci\u00f3n de gesti\u00f3n de tareas construida con PHP puro y MySQL, sin frameworks. Los usuarios pueden registrarse, iniciar sesi\u00f3n, crear tareas, marcarlas como completadas y eliminarlas.'
    },
    highlights: {
      en: ['User registration and login with sessions', 'Full CRUD for tasks', 'Basic security and input validation', 'Backend structure without frameworks'],
      es: ['Registro e inicio de sesi\u00f3n con sesiones', 'CRUD completo de tareas', 'Seguridad b\u00e1sica y validaci\u00f3n de entradas', 'Estructura backend sin frameworks']
    },
    featured: false
  },
  {
    name: 'SprintOps',
    repo: 'SprintOps',
    tags: ['Spring Boot', 'React', 'Vite', 'Maven', 'Docker Compose'],
    type: { en: 'Full-stack App', es: 'App Full-stack' },
    desc: {
      en: 'Full-stack application structured as a monorepo, with a Spring Boot backend and a React + Vite frontend in the same repository, prepared for unified local development and packaging.',
      es: 'Aplicaci\u00f3n full-stack estructurada como monorepo, con backend en Spring Boot y frontend en React + Vite dentro del mismo repositorio, preparada para desarrollo local y empaquetado unificados.'
    },
    highlights: {
      en: ['Spring Boot backend with optional frontend build skip', 'React + Vite frontend in the same repository', 'Unified run through Maven build lifecycle', 'Package-ready setup and optional Docker Compose flow'],
      es: ['Backend en Spring Boot con opci\u00f3n para omitir la build del frontend', 'Frontend en React + Vite dentro del mismo repositorio', 'Ejecuci\u00f3n unificada mediante el ciclo de build de Maven', 'Configuraci\u00f3n lista para empaquetado y flujo opcional con Docker Compose']
    },
    featured: false
  }
];

// ================================
// LANGUAGE SWITCHER
// ================================
let currentLang = 'en';

function applyLang(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  const btn = document.getElementById('langToggle');
  btn.textContent = lang === 'en' ? 'ES' : 'EN';
  document.querySelectorAll('[data-en]').forEach(el => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) el.textContent = text;
  });
  renderProjects();
}

document.getElementById('langToggle').addEventListener('click', () => {
  applyLang(currentLang === 'en' ? 'es' : 'en');
});

// ================================
// RENDER PROJECTS
// ================================
function renderProjects() {
  const container = document.getElementById('projects-grid');
  if (!container) return;

  container.innerHTML = PROJECTS.map((p, i) => {
    const delay = `animation-delay:${i * 0.12}s`;
    const highlights = p.highlights[currentLang].map(h => `<li>${h}</li>`).join('');

    return `
      <div class="project-card${p.featured ? ' project-card--featured' : ''}" style="${delay}">
        <div class="project-card-top">
          <div>
            <span class="project-type">${p.type[currentLang]}</span>
            <h3 class="project-name">${p.name}</h3>
          </div>
          ${p.featured ? `<span class="project-badge">TFG</span>` : ''}
        </div>

        <p class="project-desc">${p.desc[currentLang]}</p>

        <ul class="project-highlights">
          ${highlights}
        </ul>

        <div class="project-footer">
          <div class="project-tags">
            ${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
          </div>
          <a class="project-github" href="https://github.com/${GITHUB_USERNAME}/${p.repo}" target="_blank" rel="noreferrer">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            ${currentLang === 'en' ? 'View code' : 'Ver c\u00f3digo'}
          </a>
        </div>
      </div>`;
  }).join('');
}

// ================================
// INIT
// ================================
document.addEventListener('DOMContentLoaded', () => {
  renderProjects();

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${e.target.id}` ? 'var(--black)' : '';
        });
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => observer.observe(s));
});

// ================================
// RENDER PROJECTS
// ================================
function renderProjects() {
  const container = document.getElementById('projects-grid');
  if (!container) return;

  container.innerHTML = PROJECTS.map((p, i) => {
    const delay = `animation-delay:${i * 0.12}s`;
    const highlights = p.highlights[currentLang].map(h => `<li>${h}</li>`).join('');

    return `
      <div class="project-card${p.featured ? ' project-card--featured' : ''}" style="${delay}">
        <div class="project-card-top">
          <div>
            <span class="project-type">${p.type[currentLang]}</span>
            <h3 class="project-name">${p.name}</h3>
          </div>
          ${p.featured ? `<span class="project-badge">TFG</span>` : ''}
        </div>

        <p class="project-desc">${p.desc[currentLang]}</p>

        <ul class="project-highlights">
          ${highlights}
        </ul>

        <div class="project-footer">
          <div class="project-tags">
            ${p.tags.map(t => `<span class="project-tag">${t}</span>`).join('')}
          </div>
          <a class="project-github" href="https://github.com/${GITHUB_USERNAME}/${p.repo}" target="_blank" rel="noreferrer">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            ${currentLang === 'en' ? 'View code' : 'Ver código'}
          </a>
        </div>
      </div>`;
  }).join('');
}

// ================================
// INIT
// ================================
document.addEventListener('DOMContentLoaded', () => {
  renderProjects();

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => {
          a.style.color = a.getAttribute('href') === `#${e.target.id}` ? 'var(--black)' : '';
        });
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(s => observer.observe(s));
});