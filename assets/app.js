const dataFallback = {
  overview: [],
  features: [],
  work: [],
  skills: [],
  experience: []
};

async function loadJson(path, fallback) {
  try {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) throw new Error(`Could not load ${path}`);
    return await response.json();
  } catch (error) {
    console.warn(error.message);
    return fallback;
  }
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function iconSvg(name) {
  const icons = {
    project: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 5h6M9 9h6M9 13h4"/><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 3v2h6V3"/></svg>',
    energy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M13 2 5 14h6l-1 8 8-12h-6l1-8Z"/></svg>',
    product: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 4v5"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/></svg>',
    timeline: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 7h7M4 12h11M4 17h16"/><circle cx="15" cy="7" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="8" cy="17" r="2"/></svg>',
    templates: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="4" y="4" width="12" height="12" rx="2"/><path d="M8 8h12v12H8z"/></svg>'
  };
  return icons[name] || icons.project;
}

function renderCards(containerSelector, items, renderer) {
  const container = document.querySelector(containerSelector);
  if (!container) return;
  container.innerHTML = items.map(renderer).join("");
}

function setupProductTabs() {
  const image = document.querySelector("[data-product-image]");
  const tabs = document.querySelectorAll("[data-image]");
  if (!image || !tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      if (tab.classList.contains("is-active")) return;
      tabs.forEach((item) => {
        item.classList.remove("is-active");
        item.setAttribute("aria-selected", "false");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      image.classList.add("is-switching");
      window.setTimeout(() => {
        image.src = tab.dataset.image;
        image.alt = `PlanITNU ${tab.textContent.trim()} interface`;
        image.classList.remove("is-switching");
      }, 160);
    });
  });
}

function setupScrollAnimations() {
  const nodes = document.querySelectorAll("[data-animate], .overview-card, .feature-card, .work-card, .skill-card, .experience-item");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !("IntersectionObserver" in window)) return;

  nodes.forEach((node) => node.classList.add("reveal-ready"));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove("reveal-ready");
      entry.target.classList.add("animate-fade-up", "animate-once", "animate-fill-both", "animate-duration-700", "reveal-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.10, rootMargin: "0px 0px -35px" });
  nodes.forEach((node) => observer.observe(node));
}

async function init() {
  const [overview, features, work, skills, experience] = await Promise.all([
    loadJson("data/overview.json", dataFallback.overview),
    loadJson("data/features.json", dataFallback.features),
    loadJson("data/work.json", dataFallback.work),
    loadJson("data/skills.json", dataFallback.skills),
    loadJson("data/experience.json", dataFallback.experience)
  ]);

  renderCards("[data-overview]", overview, (item) => `
    <article class="overview-card">
      <span class="icon-box icon-${escapeHtml(item.color)}">${iconSvg(item.icon)}</span>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.text)}</p>
    </article>
  `);

  renderCards("[data-features]", features, (item) => `
    <article class="feature-card">
      <span class="icon-box icon-${escapeHtml(item.color)}">${iconSvg(item.icon)}</span>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.text)}</p>
    </article>
  `);

  renderCards("[data-work]", work, (item, index) => `
    <article class="work-card">
      <span class="work-card-number">0${index + 1}</span>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.text)}</p>
    </article>
  `);

  renderCards("[data-skills]", skills, (item) => `
    <article class="skill-card">
      <h3>${escapeHtml(item.title)}</h3>
      <div class="skill-list">${item.items.map((skill) => `<span class="skill-chip">${escapeHtml(skill)}</span>`).join("")}</div>
    </article>
  `);

  renderCards("[data-experience]", experience, (item) => `
    <article class="experience-item">
      <span class="experience-period">${escapeHtml(item.period)}</span>
      <div>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.text)}</p>
      </div>
    </article>
  `);

  document.querySelector("[data-year]").textContent = new Date().getFullYear();
  setupProductTabs();
  setupScrollAnimations();
}

init();
