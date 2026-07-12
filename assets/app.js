const fallbackData = {
  profile: {
    name: "Saad",
    brand: "Saad",
    eyebrow: "Technical project manager and AI-assisted product builder",
    headline: "I turn technical complexity into practical digital tools.",
    summary: "I combine real project delivery from energy infrastructure with AI-assisted development to create clearer planning, stronger execution and useful web applications.",
    contactText: "For project roles, product collaboration or practical AI-assisted development, contact me through GitHub.",
    focus: [
      "PlanITNU - project planning product",
      "MV/LV project delivery",
      "AI-assisted full-stack development",
      "Controlled GitHub delivery workflows"
    ],
    links: [
      { label: "Explore my work", url: "#projects", primary: true },
      { label: "View GitHub", url: "https://github.com/AIGenArt", primary: false }
    ]
  },
  projects: [
    {
      name: "PlanITNU",
      type: "Flagship product",
      role: "Product owner / AI-assisted builder",
      status: "In active development",
      summary: "A practical project planning platform built around real execution needs: priorities, dependencies, timelines, follow-up and daily decision support.",
      impact: "Turns hands-on project management experience into a focused digital product instead of another generic planning tool.",
      tags: ["Next.js", "TypeScript", "Supabase", "AI workflow", "Product design"],
      visual: "planitnu"
    },
    {
      name: "Controlled AI development workflow",
      type: "Delivery system",
      role: "Workflow designer / operator",
      status: "Applied in practice",
      summary: "A structured development process using scoped changes, GitHub branches, pull requests, automated checks and AI coding support.",
      impact: "Creates speed without giving up reviewability, ownership or technical control.",
      tags: ["GitHub", "Pull requests", "Codex", "ChatGPT", "Quality checks"]
    },
    {
      name: "MV/LV energy project delivery",
      type: "Professional case",
      role: "Technical project manager",
      status: "Current domain",
      summary: "Planning and execution of 10/0.4 kV infrastructure work involving stakeholders, permits, contractors, procurement, HSE and technical dependencies.",
      impact: "Provides the real-world delivery discipline and technical context behind the digital products I build.",
      tags: ["MV/LV", "Stakeholders", "Permits", "HSE", "Contractors"]
    }
  ],
  competencies: [
    {
      group: "Technical project management",
      level: "Core strength",
      summary: "Planning, coordination and execution across complex technical work with clear priorities and follow-up.",
      items: ["Project planning", "Dependencies", "Contractor follow-up", "Risk and decisions"]
    },
    {
      group: "Energy infrastructure",
      level: "Professional domain",
      summary: "Experience with MV/LV grid projects, switchgear, generators, commissioning and permit systems.",
      items: ["10/0.4 kV projects", "Switchgear", "Commissioning", "HSE and permits"]
    },
    {
      group: "AI-assisted product development",
      level: "Advanced practitioner - DigComp level 5/6",
      summary: "Uses AI as a practical development partner while keeping scope, quality and decisions under human control.",
      items: ["Product prompting", "Code inspection", "Debugging", "Workflow design"]
    },
    {
      group: "Full-stack web applications",
      level: "Practical builder",
      summary: "Builds useful products with modern frontend, database, validation and deployment workflows.",
      items: ["Next.js", "TypeScript", "Supabase", "GitHub Pages / Netlify"]
    },
    {
      group: "Quality and governance",
      level: "Structured approach",
      summary: "Keeps changes small, reviewable and tied to value instead of adding unnecessary complexity.",
      items: ["Scope control", "Diff checks", "Testing mindset", "Documentation"]
    },
    {
      group: "Stakeholder communication",
      level: "Execution focused",
      summary: "Makes technical work understandable and keeps decisions, responsibilities and next steps visible.",
      items: ["Clear priorities", "Simple explanations", "Decision support", "Follow-up"]
    }
  ],
  experience: [
    {
      title: "Project Manager - MV/LV energy infrastructure",
      period: "Current",
      description: "Responsible for planning, coordination and execution of technical infrastructure projects involving stakeholders, contractors, permits, safety and delivery dependencies."
    },
    {
      title: "AI-assisted product and web application builder",
      period: "2025 - present",
      description: "Designs, builds and improves practical software products through structured AI-assisted development, GitHub workflows and modern web technology."
    },
    {
      title: "Technical operations and commissioning background",
      period: "Earlier experience",
      description: "Hands-on technical understanding from generators, switchgear, commissioning, production environments and permit-based work."
    }
  ],
  principles: [
    {
      title: "Practical before impressive",
      description: "A solution should solve a real problem clearly before it becomes visually or technically complicated."
    },
    {
      title: "Controlled delivery",
      description: "Changes are scoped, reviewable and connected to a clear purpose, with checks before they reach production."
    },
    {
      title: "AI with accountability",
      description: "AI creates speed and options. Human judgement remains responsible for quality, relevance and decisions."
    }
  ]
};

async function loadJson(path, fallback) {
  try {
    const response = await fetch(path, { cache: "no-store" });
    if (!response.ok) throw new Error(`Failed to load ${path}`);
    return await response.json();
  } catch (error) {
    console.warn(error.message);
    return fallback;
  }
}

function setText(selector, value) {
  const element = document.querySelector(selector);
  if (element && value) element.textContent = value;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function makeLink(link) {
  const anchor = document.createElement("a");
  anchor.className = `button${link.primary ? " primary" : ""}`;
  anchor.href = link.url;
  anchor.textContent = link.label;
  if (link.url.startsWith("http")) {
    anchor.target = "_blank";
    anchor.rel = "noreferrer";
  }
  return anchor;
}

function renderProfile(profile) {
  document.title = `${profile.name} | Technical Project Manager and Product Builder`;
  setText('[data-profile="brand"]', profile.brand || profile.name);
  setText('[data-profile="eyebrow"]', profile.eyebrow);
  setText('[data-profile="headline"]', profile.headline);
  setText('[data-profile="summary"]', profile.summary);
  setText('[data-profile="contactText"]', profile.contactText);
  setText('[data-profile="footerName"]', profile.name);

  const description = document.querySelector('meta[name="description"]');
  if (description) description.setAttribute("content", profile.summary);

  const focusList = document.querySelector('[data-list="focus"]');
  focusList.innerHTML = "";
  profile.focus.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    focusList.appendChild(li);
  });

  document.querySelectorAll('[data-links="primary"], [data-links="secondary"]').forEach((container) => {
    container.innerHTML = "";
    profile.links.forEach((link) => container.appendChild(makeLink(link)));
  });
}

function createPlanitnuPreview() {
  return `
    <div class="project-preview" aria-label="Abstract PlanITNU interface preview">
      <div class="preview-header"><span>PLANITNU / PROJECT OVERVIEW</span><span>AI-assisted planning</span></div>
      <div class="preview-body">
        <div class="preview-sidebar"><i></i><i></i><i></i><i></i><i></i></div>
        <div class="preview-main">
          <div class="preview-title"><strong>Delivery overview</strong><span>On track</span></div>
          <div class="preview-row">
            <div class="preview-card"><small>Priority work</small><i></i><i></i></div>
            <div class="preview-card"><small>Dependencies</small><i></i><i></i></div>
          </div>
          <div class="preview-row">
            <div class="preview-card"><small>Timeline</small><div class="preview-timeline"><span></span><span></span><span></span></div></div>
            <div class="preview-card"><small>Follow-up</small><i></i><i></i><i></i></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderProjects(projects) {
  const container = document.querySelector("[data-projects]");
  container.innerHTML = "";

  projects.forEach((project, index) => {
    const article = document.createElement("article");
    article.className = `project-card reveal${index === 0 ? " featured" : ""}`;

    const copy = `
      <div class="project-copy">
        <div class="project-topline">
          <span class="project-number">${String(index + 1).padStart(2, "0")}</span>
          ${project.status ? `<span class="project-status">${escapeHtml(project.status)}</span>` : ""}
        </div>
        <p class="project-meta">${escapeHtml(project.type)} / ${escapeHtml(project.role)}</p>
        <h3>${escapeHtml(project.name)}</h3>
        <p>${escapeHtml(project.summary)}</p>
        <p class="project-value"><strong>Value:</strong> ${escapeHtml(project.impact)}</p>
        <ul class="tags">${project.tags.map((tag) => `<li class="tag">${escapeHtml(tag)}</li>`).join("")}</ul>
      </div>
    `;

    article.innerHTML = index === 0 && project.visual === "planitnu"
      ? `${copy}${createPlanitnuPreview()}`
      : copy;

    container.appendChild(article);
  });
}

function renderCompetencies(competencies) {
  const container = document.querySelector("[data-competencies]");
  container.innerHTML = "";

  competencies.forEach((competency, index) => {
    const article = document.createElement("article");
    article.className = "competency-card reveal";
    article.innerHTML = `
      <div class="competency-index"><span>${String(index + 1).padStart(2, "0")}</span><span aria-hidden="true"></span></div>
      <p class="competency-meta">${escapeHtml(competency.level)}</p>
      <h3>${escapeHtml(competency.group)}</h3>
      <p>${escapeHtml(competency.summary)}</p>
      <ul>${competency.items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
    `;
    container.appendChild(article);
  });
}

function renderExperience(items) {
  const container = document.querySelector("[data-experience]");
  container.innerHTML = "";

  items.forEach((item, index) => {
    const article = document.createElement("article");
    article.className = "timeline-item reveal";
    article.dataset.index = String(index + 1).padStart(2, "0");
    article.innerHTML = `
      <p class="timeline-period">${escapeHtml(item.period)}</p>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.description)}</p>
    `;
    container.appendChild(article);
  });
}

function renderPrinciples(items) {
  const container = document.querySelector("[data-principles]");
  container.innerHTML = "";

  items.forEach((item, index) => {
    const article = document.createElement("article");
    article.className = "principle-card reveal";
    article.innerHTML = `
      <span class="principle-number">${String(index + 1).padStart(2, "0")}</span>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.description)}</p>
    `;
    container.appendChild(article);
  });
}

function initRevealAnimations() {
  const elements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  elements.forEach((element) => observer.observe(element));
}

async function init() {
  const [profile, projects, competencies, experience, principles] = await Promise.all([
    loadJson("data/profile.json", fallbackData.profile),
    loadJson("data/projects.json", fallbackData.projects),
    loadJson("data/competencies.json", fallbackData.competencies),
    loadJson("data/experience.json", fallbackData.experience),
    loadJson("data/principles.json", fallbackData.principles)
  ]);

  renderProfile(profile);
  renderProjects(projects);
  renderCompetencies(competencies);
  renderExperience(experience);
  renderPrinciples(principles);
  setText("[data-year]", new Date().getFullYear());
  initRevealAnimations();
}

init();
