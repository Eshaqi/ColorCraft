// components/theme.js

import { getFromStorage, saveToStorage } from "../utils/storage.js";

function setupThemeToggle() {
  const toggleBtn = document.getElementById("themeToggle");
  const currentTheme = getFromStorage("theme");

  if (currentTheme) {
    document.documentElement.setAttribute("data-theme", currentTheme);
  }

  toggleBtn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const newTheme = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", newTheme);
    saveToStorage("theme", newTheme);
  });
}

export { setupThemeToggle };
