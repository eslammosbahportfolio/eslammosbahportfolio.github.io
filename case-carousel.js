{
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const buttonGroups = document.querySelectorAll('.case-carousel-controls');
  for (const group of buttonGroups) {
    const buttons = [...group.querySelectorAll('[data-case-step]')];
    const rail = document.getElementById(buttons[0].getAttribute('aria-controls'));
    const [first, second] = rail.children;
    const englishLabels = buttons.map(button => button.getAttribute('aria-label'));

    function updateButtons() {
      buttons[0].disabled = rail.scrollLeft <= 2;
      buttons[1].disabled = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2;
    }

    function updateLabels() {
      const german = document.documentElement.lang === 'de';
      buttons.forEach((button, index) => {
        button.setAttribute('aria-label', german ? button.dataset.labelDe : englishLabels[index]);
      });
    }

    buttons.forEach(button => button.addEventListener('click', () => {
      const step = Number(button.dataset.caseStep);
      const stride = second.offsetLeft - first.offsetLeft;
      rail.scrollBy({ left: stride * step, behavior: reduceMotion.matches ? 'auto' : 'smooth' });
    }));

    rail.addEventListener('scroll', updateButtons, { passive: true });
    new ResizeObserver(updateButtons).observe(rail);
    new MutationObserver(updateLabels).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang']
    });
    updateButtons();
    updateLabels();
  }
}
