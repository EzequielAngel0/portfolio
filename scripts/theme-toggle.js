export function setupThemeToggle() {
  const body = document.body;
  const themeBtn = document.querySelector(".theme-switch");

  const savedTheme = localStorage.getItem("theme");
  if (savedTheme) {
    body.classList.remove("light-mode", "dark-mode");
    body.classList.add(savedTheme);
    themeBtn.textContent = savedTheme === "dark-mode" ? "🌚" : "🌞";
  } else {
    body.classList.add("light-mode");
  }

  themeBtn.addEventListener("click", () => {
    const newTheme = body.classList.contains("dark-mode") ? "light-mode" : "dark-mode";
    body.classList.remove("light-mode", "dark-mode");
    body.classList.add(newTheme);
    localStorage.setItem("theme", newTheme);
    themeBtn.textContent = newTheme === "dark-mode" ? "🌚" : "🌞";
  });
}
