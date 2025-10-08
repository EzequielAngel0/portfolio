document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.remove('dark-mode');
  document.body.classList.add('light-mode');
  try { localStorage.removeItem('theme'); } catch(e) {}
});
