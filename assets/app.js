(() => {
  const story = document.querySelector('.story');
  const stage = document.querySelector('.story-stage');
  const walker = document.getElementById('walker');
  const track = document.getElementById('storyTrack');
  const path = document.getElementById('walkPath');
  const copies = [...document.querySelectorAll('.step-copy')];
  const groups = [...document.querySelectorAll('.scene-group')];
  const dots = [...document.querySelectorAll('.step-dot')];
  const chapterNumber = document.getElementById('chapterNumber');
  const chapterLabel = document.getElementById('chapterLabel');

  const labels = [
    'TECHNICAL FOUNDATION',
    'PROJECT RESPONSIBILITY',
    'DIGITAL DEVELOPMENT',
    'PLANITNU'
  ];

  const totalLength = track.getTotalLength();
  track.style.strokeDasharray = totalLength;
  track.style.strokeDashoffset = totalLength;

  let current = -1;
  let ticking = false;

  function clamp(v, min, max) {
    return Math.min(Math.max(v, min), max);
  }

  function storyProgress() {
    const rect = story.getBoundingClientRect();
    const scrollable = story.offsetHeight - window.innerHeight;
    return clamp(-rect.top / scrollable, 0, 1);
  }

  function setActive(index) {
    if (index === current) return;
    current = index;

    copies.forEach((el, i) => el.classList.toggle('active', i === index));
    groups.forEach((el, i) => el.classList.toggle('active', i === index));
    dots.forEach((el, i) => el.classList.toggle('active', i === index));

    chapterNumber.textContent = String(index + 1).padStart(2, '0');
    chapterLabel.textContent = labels[index];
  }

  function animateWalker(progress) {
    const point = path.getPointAtLength(totalLength * progress);
    const next = path.getPointAtLength(Math.min(totalLength, totalLength * progress + 3));
    const angle = Math.atan2(next.y - point.y, next.x - point.x) * 180 / Math.PI;
    walker.setAttribute('transform', `translate(${point.x} ${point.y}) rotate(${angle * .18})`);

    const phase = progress * 40;
    const swing = Math.sin(phase) * 15;
    document.getElementById('legLeft').setAttribute('d', `M-16 62 L${-28 + swing} 119`);
    document.getElementById('legRight').setAttribute('d', `M16 62 L${31 - swing} 119`);
    document.getElementById('armLeft').setAttribute('d', `M-20 27 L${-51 - swing * .45} 61`);
    document.getElementById('armRight').setAttribute('d', `M21 28 L${49 + swing * .45} 54`);
  }

  function update() {
    ticking = false;
    const p = storyProgress();
    track.style.strokeDashoffset = totalLength * (1 - p);
    animateWalker(p);

    const index = Math.min(3, Math.floor(p * 4));
    setActive(index);

    const stageScale = 1 + Math.sin(p * Math.PI) * .012;
    stage.style.setProperty('--stage-scale', stageScale.toFixed(3));
  }

  function requestUpdate() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const index = Number(dot.dataset.jump);
      const target = story.offsetTop + (story.offsetHeight - innerHeight) * (index / 3);
      window.scrollTo({ top: target, behavior: 'smooth' });
    });
  });

  addEventListener('scroll', requestUpdate, { passive: true });
  addEventListener('resize', requestUpdate);
  update();
})();
