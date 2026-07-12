const fallback = {
  profile: {
    name: "Saad",
    summary: "Project manager in energy infrastructure and AI-assisted builder behind PlanITNU.",
    links: [
      { label: "View my work", url: "#work", primary: true },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/saadsu/", icon: "linkedin" },
      { label: "GitHub", url: "https://github.com/AIGenArt", icon: "github" }
    ],
    quickOverview: []
  },
  projects: [],
  skills: [],
  experience: []
};

async function loadJson(path, fallbackValue) {
  try {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) throw new Error(`Could not load ${path}`);
    return await response.json();
  } catch (error) {
    console.warn(error.message);
    return fallbackValue;
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

function iconSvg(icon) {
  if (icon === "linkedin") {
    return `<svg aria-hidden="true" viewBox="0 0 24 24" class="h-4 w-4 fill-current"><path d="M6.5 8.3H3.2V19h3.3V8.3ZM4.8 3a1.9 1.9 0 1 0 0 3.8A1.9 1.9 0 0 0 4.8 3ZM19.8 12.9c0-3.2-1.7-4.9-4.1-4.9-1.9 0-2.8 1.1-3.3 1.8V8.3H9.1V19h3.3v-5.3c0-1.4.3-2.8 2-2.8 1.7 0 1.7 1.6 1.7 2.9V19h3.3l.4-6.1Z"/></svg>`;
  }
  if (icon === "github") {
    return `<svg aria-hidden="true" viewBox="0 0 24 24" class="h-4 w-4 fill-current"><path fill-rule="evenodd" d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.2-3.4-1.2-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 0 1.6 1.1 1.6 1.1.9 1.6 2.4 1.1 2.9.9.1-.7.4-1.1.7-1.3-2.2-.3-4.6-1.1-4.6-5A3.9 3.9 0 0 1 6.7 9c-.1-.3-.5-1.3.1-2.6 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 4.9 0c1.9-1.3 2.7-1 2.7-1 .6 1.3.2 2.3.1 2.6a3.9 3.9 0 0 1 1 2.7c0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.8V21c0 .3.2.6.7.5A10 10 0 0 0 12 2Z" clip-rule="evenodd"/></svg>`;
  }
  return `<span aria-hidden="true">↗</span>`;
}

function createLink(link, context) {
  const anchor = document.createElement("a");
  const secondary = !link.primary;
  anchor.className = `button ${link.primary ? "button-primary" : "button-secondary"}`;
  anchor.href = link.url;
  anchor.innerHTML = `${link.icon ? iconSvg(link.icon) : ""}<span>${escapeHtml(link.label)}</span>${!link.icon && secondary ? '<span aria-hidden="true">↗</span>' : ""}`;
  if (link.url.startsWith("http")) {
    anchor.target = "_blank";
    anchor.rel = "noreferrer";
  }
  if (context === "secondary") anchor.classList.add("min-w-[150px]");
  return anchor;
}

function renderProfile(profile) {
  document.querySelectorAll('[data-profile="name"]').forEach((el) => { el.textContent = profile.name; });
  const summary = document.querySelector('[data-profile="summary"]');
  if (summary) summary.textContent = profile.summary;

  document.querySelectorAll('[data-links="primary"]').forEach((container) => {
    container.innerHTML = "";
    profile.links.slice(0, 2).forEach((link) => container.appendChild(createLink(link, "primary")));
  });

  document.querySelectorAll('[data-links="secondary"]').forEach((container) => {
    container.innerHTML = "";
    profile.links.filter((link) => link.url.startsWith("http")).forEach((link) => container.appendChild(createLink(link, "secondary")));
  });

  const overview = document.querySelector("[data-quick-overview]");
  overview.innerHTML = profile.quickOverview.map((item, index) => `
    <article class="quick-card animate-fade-up animate-once animate-fill-both animate-delay-${index === 0 ? "100" : index === 1 ? "300" : "500"}">
      <p class="text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-ink/40">${escapeHtml(item.label)}</p>
      <h2 class="mt-2 font-display text-[1.8rem] leading-none">${escapeHtml(item.value)}</h2>
      <p class="mt-3 text-sm font-bold text-ink/50">${escapeHtml(item.detail)}</p>
    </article>
  `).join("");
}

function planitnuVisual() {
  return `
    <div class="project-grid-line relative min-h-[340px] overflow-hidden rounded-[1.5rem] border border-ink/10 bg-[#F4F8F6] p-5">
      <div class="rounded-[1.2rem] border border-ink/10 bg-white p-4 shadow-card">
        <div class="flex items-center justify-between border-b border-ink/10 pb-3 text-[0.68rem] font-extrabold uppercase tracking-[0.12em] text-ink/45">
          <span>PlanITNU / Project view</span><span class="rounded-full bg-mint px-2 py-1 text-forest">AI plan active</span>
        </div>
        <div class="mt-4 grid grid-cols-[.34fr_.66fr] gap-3">
          <div class="space-y-2 rounded-xl bg-ink p-3">
            <i class="block h-2 w-2/3 rounded-full bg-white/30"></i>
            <i class="block h-2 w-full rounded-full bg-white/15"></i>
            <i class="block h-2 w-4/5 rounded-full bg-white/15"></i>
            <i class="block h-2 w-3/5 rounded-full bg-white/15"></i>
          </div>
          <div class="space-y-3">
            <div class="grid grid-cols-2 gap-2">
              <div class="rounded-xl border border-ink/10 p-3"><small class="font-bold text-ink/40">Priority</small><strong class="mt-3 block text-sm">Critical path</strong></div>
              <div class="rounded-xl border border-ink/10 p-3"><small class="font-bold text-ink/40">Status</small><strong class="mt-3 block text-sm text-forest">On track</strong></div>
            </div>
            <div class="rounded-xl border border-ink/10 p-3">
              <small class="font-bold text-ink/40">Timeline</small>
              <div class="dashboard-line mt-4 h-2 rounded-full"></div>
              <div class="mt-3 grid grid-cols-4 gap-2"><i class="h-8 rounded-lg bg-mint"></i><i class="h-8 rounded-lg bg-mint/70"></i><i class="h-8 rounded-lg bg-cobalt/10"></i><i class="h-8 rounded-lg bg-sand"></i></div>
            </div>
          </div>
        </div>
      </div>
      <div class="absolute -bottom-8 -right-8 h-28 w-28 rounded-full bg-cobalt/10"></div>
    </div>
  `;
}

function renderProjects(projects) {
  const container = document.querySelector("[data-projects]");
  container.innerHTML = projects.map((project, index) => {
    const featured = Boolean(project.featured);
    return `
      <article class="project-card ${featured ? "grid gap-0 lg:grid-cols-[.9fr_1.1fr]" : ""}" data-animate="fade-up">
        <div class="p-7 md:p-9 ${featured ? "lg:p-11" : ""}">
          <div class="flex items-center justify-between gap-4">
            <p class="text-[0.68rem] font-extrabold uppercase tracking-[0.15em] text-forest">${escapeHtml(project.type)}</p>
            <span class="font-display text-3xl italic text-ink/20">0${index + 1}</span>
          </div>
          <h3 class="mt-5 font-display text-[clamp(2.3rem,4vw,4rem)] leading-[.95] tracking-[-.03em]">${escapeHtml(project.name)}</h3>
          <p class="mt-3 text-sm font-extrabold text-ink/45">${escapeHtml(project.role)}</p>
          <p class="mt-5 max-w-xl text-base leading-7 text-ink/65">${escapeHtml(project.summary)}</p>
          <p class="mt-5 border-l-2 border-copper pl-4 text-sm font-bold leading-6 text-ink/70">${escapeHtml(project.result)}</p>
          <div class="skill-row mt-6">${project.tags.map((tag) => `<span class="chip">${escapeHtml(tag)}</span>`).join("")}</div>
        </div>
        ${featured ? `<div class="bg-sand/35 p-5 md:p-8">${planitnuVisual()}</div>` : ""}
      </article>
    `;
  }).join("");
}

function renderSkills(skills) {
  const container = document.querySelector("[data-skills]");
  container.innerHTML = skills.map((skill) => `
    <article class="rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-6 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.08]" data-animate="fade-up">
      <p class="text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-mint/70">${escapeHtml(skill.level)}</p>
      <h3 class="mt-3 font-display text-3xl">${escapeHtml(skill.title)}</h3>
      <div class="mt-5 flex flex-wrap gap-2">${skill.items.map((item) => `<span class="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-bold text-white/70">${escapeHtml(item)}</span>`).join("")}</div>
    </article>
  `).join("");
}

function renderExperience(experience) {
  const container = document.querySelector("[data-experience]");
  container.innerHTML = experience.map((item) => `
    <article class="relative pb-10 last:pb-0" data-animate="fade-left">
      <span class="timeline-dot"></span>
      <p class="text-[0.68rem] font-extrabold uppercase tracking-[0.14em] text-forest">${escapeHtml(item.period)}</p>
      <h3 class="mt-2 font-display text-[clamp(2rem,4vw,3.2rem)] leading-none">${escapeHtml(item.title)}</h3>
      <p class="mt-4 max-w-2xl text-base leading-7 text-ink/60">${escapeHtml(item.description)}</p>
    </article>
  `).join("");
}

function initScrollAnimations() {
  const nodes = document.querySelectorAll("[data-animate]");
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduced || !("IntersectionObserver" in window)) {
    nodes.forEach((node) => node.classList.add("animate-fade-up", "animate-once", "animate-fill-both"));
    return;
  }

  nodes.forEach((node) => node.classList.add("reveal-ready"));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const direction = entry.target.dataset.animate || "fade-up";
      entry.target.classList.remove("reveal-ready");
      entry.target.classList.add(`animate-${direction}`, "animate-once", "animate-fill-both", "animate-duration-700", "reveal-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.13, rootMargin: "0px 0px -40px" });
  nodes.forEach((node) => observer.observe(node));
}

async function init() {
  const [profile, projects, skills, experience] = await Promise.all([
    loadJson("data/profile.json", fallback.profile),
    loadJson("data/projects.json", fallback.projects),
    loadJson("data/skills.json", fallback.skills),
    loadJson("data/experience.json", fallback.experience)
  ]);
  renderProfile(profile);
  renderProjects(projects);
  renderSkills(skills);
  renderExperience(experience);
  document.querySelector("[data-year]").textContent = new Date().getFullYear();
  initScrollAnimations();
}

init();
