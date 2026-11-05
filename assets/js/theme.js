(function () {
  'use strict';

  const key = 'apteno-theme';
  const button = document.getElementById('theme-toggle');
  const label = document.getElementById('theme-label');
  const modes = ['auto', 'light', 'dark'];
  let mode = 'auto';

  try {
    const saved = localStorage.getItem(key);
    if (modes.includes(saved)) mode = saved;
  } catch (_) { /* Browser storage is optional. */ }

  function render() {
    if (mode === 'auto') delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = mode;
    label.textContent = mode.charAt(0).toUpperCase() + mode.slice(1);
    const next = modes[(modes.indexOf(mode) + 1) % modes.length];
    button.setAttribute('aria-label', 'Theme: ' + (mode === 'auto' ? 'automatic' : mode) + '. Activate for ' + (next === 'auto' ? 'browser settings' : next + ' mode'));
  }

  button.addEventListener('click', function () {
    mode = modes[(modes.indexOf(mode) + 1) % modes.length];
    try { localStorage.setItem(key, mode); } catch (_) { /* Continue without persistence. */ }
    render();
  });

  render();
}());
