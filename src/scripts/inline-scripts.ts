export const themeBootstrapScript = `(function () {
  function read(key) {
    try { return localStorage.getItem(key); } catch (_) { return null; }
  }
  function applyPreferences() {
    var storedTheme = read('theme');
    var theme = storedTheme === 'light' || storedTheme === 'dark'
      ? storedTheme
      : window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    var reading = read('reading-mode') === 'comfortable' ? 'comfortable' : 'default';
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.readingMode = reading;
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }
  applyPreferences();
  document.addEventListener('astro:after-swap', applyPreferences);
})();`;

export const themeToggleScript = `(function () {
  function readStored() {
    try { return localStorage.getItem('theme'); } catch (_) { return null; }
  }
  function writeStored(theme) {
    try { localStorage.setItem('theme', theme); } catch (_) {}
  }
  function applyTheme(theme) {
    var sun = document.getElementById('sun-icon');
    var moon = document.getElementById('moon-icon');
    var toggle = document.getElementById('theme-toggle');
    var isDark = theme === 'dark';
    document.documentElement.dataset.theme = theme;
    document.documentElement.classList.toggle('dark', isDark);
    sun && sun.classList.toggle('hidden', isDark);
    moon && moon.classList.toggle('hidden', !isDark);
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(isDark));
      var label = isDark ? toggle.dataset.labelLight : toggle.dataset.labelDark;
      toggle.setAttribute('aria-label', label);
      toggle.setAttribute('title', label);
    }
  }
  function currentTheme() {
    var stored = readStored();
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function initToggle() {
    applyTheme(currentTheme());
    var toggle = document.getElementById('theme-toggle');
    if (toggle) toggle.onclick = function () {
      var next = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
      applyTheme(next);
      writeStored(next);
    };
  }
  initToggle();
  document.addEventListener('astro:page-load', initToggle);
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (event) {
    if (!readStored()) applyTheme(event.matches ? 'dark' : 'light');
  });
})();`;

export const readingModeScript = `(function () {
  function preloadReadingFont() {
    var meta = document.querySelector('meta[name="astro-ui-reading-font"]');
    var href = meta && meta.getAttribute('content');
    if (!href || document.querySelector('link[data-astro-ui-reading-font]')) return;
    var link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'font';
    link.type = 'font/woff2';
    link.crossOrigin = 'anonymous';
    link.href = href;
    link.dataset.astroUiReadingFont = '';
    document.head.appendChild(link);
  }
  function readStored() {
    try { return localStorage.getItem('reading-mode'); } catch (_) { return null; }
  }
  function writeStored(enabled) {
    try { localStorage.setItem('reading-mode', enabled ? 'comfortable' : 'default'); } catch (_) {}
  }
  function apply(enabled) {
    var toggle = document.getElementById('reading-mode-toggle');
    document.documentElement.dataset.readingMode = enabled ? 'comfortable' : 'default';
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(enabled));
      var label = enabled ? toggle.dataset.labelOff : toggle.dataset.labelOn;
      toggle.setAttribute('aria-label', label);
      toggle.setAttribute('title', label);
    }
  }
  function init() {
    apply(readStored() === 'comfortable');
    var toggle = document.getElementById('reading-mode-toggle');
    if (toggle) {
      toggle.onpointerenter = preloadReadingFont;
      toggle.onfocus = preloadReadingFont;
      toggle.onclick = function () {
        var enabled = document.documentElement.dataset.readingMode !== 'comfortable';
        apply(enabled);
        writeStored(enabled);
      };
    }
  }
  init();
  document.addEventListener('astro:page-load', init);
})();`;
