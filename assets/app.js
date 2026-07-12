const steps = [...document.querySelectorAll('.story-step')];
const scenes = [...document.querySelectorAll('.scene')];
const walker = document.querySelector('.walker');
const stageNumber = document.querySelector('[data-stage-number]');
const stageTitle = document.querySelector('[data-stage-title]');

const positions = [
  { x: 95, y: 485, title: 'Technical foundation' },
  { x: 320, y: 320, title: 'Project responsibility' },
  { x: 545, y: 420, title: 'Digital development' },
  { x: 790, y: 225, title: 'PlanITNU' },
  { x: 790, y: 225, title: 'Profile today' }
];

function activate(index) {
  steps.forEach((step, i) => step.classList.toggle('is-active', i === index));
  scenes.forEach((scene, i) => scene.classList.toggle('is-active', i === Math.min(index, 3)));
  const pos = positions[index];
  walker.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
  stageNumber.textContent = String(index + 1).padStart(2, '0');
  stageTitle.textContent = pos.title;
}

const observer = new IntersectionObserver((entries) => {
  const visible = entries.filter(entry => entry.isIntersecting).sort((a,b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (visible) activate(Number(visible.target.dataset.step));
}, { rootMargin: '-32% 0px -38% 0px', threshold: [0.05, .25, .55] });

steps.forEach(step => observer.observe(step));
activate(0);
