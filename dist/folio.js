(() => {
  const dialog = document.querySelector('#folio-dialog');
  const cards = [...document.querySelectorAll('.work .project')];
  const launch = document.querySelector('#open-folio');
  if (!dialog || !cards.length || !launch || typeof dialog.showModal !== 'function') return;

  const projects = cards.map(card => ({
    title: card.querySelector('h3').textContent.trim(),
    subtitle: card.querySelector('.project-heading p').textContent.trim(),
    description: card.querySelector('.project-description').textContent.trim(),
    category: card.querySelector('.project-kicker span:first-child').textContent.trim(),
    image: card.querySelector('.project-image img').getAttribute('src'),
    alt: card.querySelector('.project-image img').getAttribute('alt'),
    tags: [...card.querySelectorAll('.tags span')].map(tag => tag.textContent.trim()),
    url: card.querySelector('.project-heading > a').href,
    linkLabel: card.querySelector('.project-open').textContent.includes('OVERVIEW') ? 'VIEW OVERVIEW' :
      card.querySelector('.project-open').textContent.includes('GITHUB') ? 'VIEW GITHUB' : 'VISIT PROJECT',
  }));
  const image = dialog.querySelector('#folio-image');
  const title = dialog.querySelector('#folio-title');
  const subtitle = dialog.querySelector('#folio-subtitle');
  const description = dialog.querySelector('#folio-description');
  const category = dialog.querySelector('#folio-category');
  const tags = dialog.querySelector('#folio-tags');
  const visit = dialog.querySelector('#folio-visit');
  const counter = dialog.querySelector('#folio-counter');
  const index = dialog.querySelector('#folio-index');
  const artwork = dialog.querySelector('.folio-artwork');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let active = 0;
  let opener = null;
  let closeTimer;
  let openFrame;

  projects.forEach((project, i) => {
    const button = document.createElement('button');
    button.type = 'button';
    const numeral = document.createElement('span');
    numeral.textContent = String(i + 1).padStart(2, '0');
    button.append(numeral, document.createTextNode(' ' + project.title));
    button.setAttribute('aria-label', `Show ${project.title}`);
    button.addEventListener('click', () => show(i));
    index.append(button);
  });

  function show(i) {
    const previous = active;
    active = (i + projects.length) % projects.length;
    const project = projects[active];
    image.src = project.image;
    image.alt = project.alt;
    title.textContent = project.title;
    subtitle.textContent = project.subtitle;
    description.textContent = project.description;
    category.textContent = project.category;
    tags.replaceChildren(...project.tags.map(label => {
      const tag = document.createElement('span');
      tag.textContent = label;
      return tag;
    }));
    visit.href = project.url;
    visit.textContent = project.linkLabel + ' ↗';
    counter.textContent = `${String(active + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`;
    [...index.children].forEach((button, j) => {
      if (j === active) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
    });
    if (dialog.open && previous !== active && !reduced.matches && artwork.animate) {
      const from = active > previous ? 'inset(0 100% 0 0)' : 'inset(0 0 0 100%)';
      artwork.getAnimations().forEach(animation => animation.cancel());
      artwork.animate([{ clipPath: from }, { clipPath: 'inset(0)' }], {
        duration: 360, easing: 'cubic-bezier(.16,1,.3,1)'
      });
    }
  }

  function open(i, trigger) {
    opener = trigger;
    clearTimeout(closeTimer);
    show(i);
    if (!dialog.open) dialog.showModal();
    window.lenis?.stop();
    cancelAnimationFrame(openFrame);
    openFrame = requestAnimationFrame(() => { if (dialog.open) dialog.classList.add('is-visible'); });
    dialog.querySelector('.folio-close').focus();
  }

  function close() {
    if (!dialog.open) return;
    cancelAnimationFrame(openFrame);
    dialog.classList.remove('is-visible');
    clearTimeout(closeTimer);
    const finish = () => {
      if (!dialog.open || dialog.classList.contains('is-visible')) return;
      dialog.close();
      window.lenis?.start();
      opener?.focus();
    };
    if (reduced.matches) finish();
    else closeTimer = setTimeout(finish, 250);
  }

  launch.hidden = false;
  launch.addEventListener('click', () => open(0, launch));
  cards.forEach((card, i) => {
    const link = card.querySelector('.project-image');
    link.setAttribute('aria-haspopup', 'dialog');
    link.setAttribute('aria-label', `Explore ${projects[i].title} in the project folio`);
    link.querySelector('.project-open').textContent = 'EXPLORE PROJECT ↗';
    link.addEventListener('click', event => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      open(i, link);
    });
  });

  dialog.querySelector('.folio-close').addEventListener('click', close);
  dialog.querySelector('[data-folio-prev]').addEventListener('click', () => show(active - 1));
  dialog.querySelector('[data-folio-next]').addEventListener('click', () => show(active + 1));
  dialog.addEventListener('cancel', event => { event.preventDefault(); close(); });
  dialog.addEventListener('click', event => { if (event.target === dialog) close(); });
  dialog.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') { event.preventDefault(); show(active + 1); }
    if (event.key === 'ArrowLeft') { event.preventDefault(); show(active - 1); }
  });
})();
