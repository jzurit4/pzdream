
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

beforeEach(() => {
  localStorage.clear();
  sessionStorage.clear();
  document.body.innerHTML = '';
});

const originalWarn = console.warn;
console.warn = (...args) => {
  if (typeof args[0] === 'string' && args[0].includes('No se pudo guardar')) return;
  originalWarn.apply(console, args);
};