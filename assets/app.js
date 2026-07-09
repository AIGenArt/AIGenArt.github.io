const fallbackData = {
  profile: {
    name: "Saad",
    brand: "Saad",
    eyebrow: "Portfolio",
    headline: "Technical project manager building practical webapps with AI.",
    summary: "I combine project management, energy infrastructure experience and AI-assisted development to build simple, useful digital tools.",
    contactText: "Reach out through GitHub or LinkedIn. More contact details can be added here later.",
    focus: [
      "AI-assisted programming",
      "Technical project management",
      "Energy infrastructure",
      "Practical web applications"
    ],
    links: [
      { label: "View GitHub", url: "https://github.com/AIGenArt", primary: true },
      { label: "View projects", url: "#projects", primary: false }
    ]
  },
  projects: [
    {
      name: "PlanITNU",
      type: "Web application",
      role: "Founder / builder",
      summary: "A practical project planning tool focused on daily execution, prioritization and project overview. Built through an AI-assisted development workflow.",
      impact: "Shows the ability to turn project management needs into a working digital product.",
      tags: ["Next.js", "TypeScript", "Supabase", "AI workflow", "Project planning"]
    },
    {
      name: "AI-assisted development workflow",
      type: "Development system",
      role: "Designer / operator",
      summary: "A controlled workflow using GitHub, pull requests, scope checks and AI coding support to ship small and large changes safely.",
      impact: "Shows structured technical delivery, governance and quality control.",
      tags: ["GitHub", "PR review", "Codex", "ChatGPT", "Quality checks"]
    },
    {
      name: "MV/LV energy project delivery",
      type: "Infrastructure delivery",
      role: "Project manager",
      summary: "Planning and execution of 10/0.4 kV infrastructure work with stakeholders, permits, contractors, procurement, HSE and technical dependencies.",
      impact: "Shows real delivery responsibility in critical infrastructure projects.",
      tags: ["MV/LV", "Stakeholders", "Permits", "HSE", "Contractors"]
    }
  ],
  competencies: [
    {
      group: "Project management",
      level: "Core strength",
      summary: "Planning, execution, coordination and follow-up across technical projects.",
      items: ["Task prioritization", "Stakeholder coordination", "Contractor follow-up", "Risk and dependency management"]
    },
    {
      group: "Energy infrastructure",
      level: "Professional domain",
      summary: "Experience with MV/LV grid projects, switchgear, generators, commissioning and permit systems.",
      items: ["10/0.4 kV projects", "Switchgear", "Commissioning", "HSE and permits"]
    },
    {
      group: "AI-assisted programming",
      level: "Advanced practitioner - DigComp level 5/6",
      summary: "Uses AI tools to build, inspect and improve practical software with controlled workflows.",
      items: ["Prompting for code", "Debugging with AI", "GitHub PR workflow", "Product thinking"]
    },
    {
      group: "Web applications",
      level: "Practical builder",
      summary: "Builds useful web apps with modern frontend, database and deployment workflows.",
      items: ["Next.js", "TypeScript", "Supabase", "Netlify / GitHub Pages"]
    },
    {
      group: "Quality and governance",
      level: "Structured approach",
      summary: "Keeps changes small, reviewable and connected to value instead of complexity.",
      items: ["Scope control", "Diff checks", "Testing mindset", "Documentation"]
    },
    {
      group: "Communication",
      level: "Execution focused",
      summary: "Communicates clearly with technical and non-technical stakeholders.",
      items: ["Clear priorities", "Simple explanations", "Decision support", "Follow-up"]
    }
  ],
  experience: [
    {
      title: "Project Manager - MV/LV energy infrastructure",
      period: "Current",
      description: "Responsible for planning, coordination and execution of technical infrastructure projects with stakeholders, contractors and safety requirements."
    },
    {
      title: "AI-assisted web application builder",
      period: "2025 - present",
      description: "Builds and improves practical software products using AI-assisted programming, GitHub workflows and modern web technology."
    },
    {
      title: "Technical delivery and commissioning experience",
      period: "Earlier experience",
      description: "Hands-on technical understanding from work with generators, switchgear, commissioning and permit systems."
    }
  ],
  principles: [
    {
      title: "Simple before fancy",
      description: "The solution should be understandable, maintainable and useful before it becomes visually complex."
    },
    {
      title: "Small controlled changes",
      description: "Work is broken into reviewable steps with clear purpose, checks and rollback options."
    },
    {
      title: "Value-focused automation",
      description: "AI and automation are used where they create real speed, clarity or quality."
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
  document.title = `${profile.name} | Portfolio`;
  setText('[data-profile="brand"]', profile.brand || profile.name);
  setText('[data-profile="eyebrow"]', profile.eyebrow);
  setText('[data-profile="headline"]', profile.headline);
  setText('[data-profile="summary"]', profile.summary);
  setText('[data-profile="contactText"]', profile.contactText);
  setText('[data-profile="footerName"]', profile.name);

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

function renderProjects(projects) {
  const container = document.querySelector("[data-projects]");
  container.innerHTML = "";
  projects.forEach((project) => {
    const article = document.createElement("article");
    article.className = "project-card";
    article.innerHTML = `
      <p class="project-meta">${project.type} - ${project.role}</p>
      <h3>${project.name}</h3>
      <p>${project.summary}</p>
      <p><strong>Value:</strong> ${project.impact}</p>
      <ul class="tags">${project.tags.map((tag) => `<li class="tag">${tag}</li>`).join("")}</ul>
    `;
    container.appendChild(article);
  });
}

function renderCompetencies(competencies) {
  const container = document.querySelector("[data-competencies]");
  container.innerHTML = "";
  competencies.forEach((competency) => {
    const article = document.createElement("article");
    article.className = "competency-card";
    article.innerHTML = `
      <p class="competency-meta">${competency.level}</p>
      <h3>${competency.group}</h3>
      <p>${competency.summary}</p>
      <ul>${competency.items.map((item) => `<li>${item}</li>`).join("")}</ul>
    `;
    container.appendChild(article);
  });
}

function renderExperience(items) {
  const container = document.querySelector("[data-experience]");
  container.innerHTML = "";
  items.forEach((item) => {
    const article = document.createElement("article");
    article.className = "timeline-item";
    article.innerHTML = `
      <p class="timeline-period">${item.period}</p>
      <h3>${item.title}</h3>
      <p>${item.description}</p>
    `;
    container.appendChild(article);
  });
}

function renderPrinciples(items) {
  const container = document.querySelector("[data-principles]");
  container.innerHTML = "";
  items.forEach((item) => {
    const article = document.createElement("article");
    article.className = "principle-card";
    article.innerHTML = `<h3>${item.title}</h3><p>${item.description}</p>`;
    container.appendChild(article);
  });
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
}

init();
