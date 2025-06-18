import { createSearchBar } from "./components/searchBar.js";
import { renderColorCard } from "./components/colorCard.js";
import { renderFavorites } from "./components/favorites.js";
import {
  downloadFavoritesAsJson,
  downloadFavoritesAsCsv,
} from "./components/download.js";
import { setupThemeToggle } from "./components/theme.js";
import { renderHistory } from "./components/history.js";
import { attachClearHandler } from "./utils/clearHandler.js";
import { HISTORY_KEY, FAVORITES_KEY } from "./utils/constants.js";

import { animateAction } from "./utils/loader.js";
import { handleSearch } from "./components/searchHandler.js";
import { appendChildren } from "./utils/domHelper.js";

window.addEventListener("historyColorSelected", (e) => {
  const { hex, r, g, b } = e.detail;
  const palette = document.getElementById("paletteDisplay");
  palette.innerHTML = "";

  const card = renderColorCard({ hex, r, g, b });
  appendChildren(palette, card);
});

function main() {
  const searchSection = document.getElementById("searchSection");
  const jsonBtn = document.getElementById("downloadJsonBtn");
  const csvBtn = document.getElementById("downloadCsvBtn");

  // Step 1: Create search bar first
  const {
    element: searchBarEl,
    clearInput,
    onSearch,
    button: searchButton,
  } = createSearchBar();

  // Step 2: Append to DOM
  appendChildren(searchSection, searchBarEl);

  // Step 3: Attach handler after element exists
  onSearch((value) =>
    animateAction({
      element: searchButton,
      callback: () => {
        const isValid = handleSearch(value, clearInput);
        return isValid;
      },
      loadingText: "",
      finalText: "",
      finalTextFail: "",
    })
  );

  // Register service worker
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("service-worker.js")
        .then((reg) => console.log("✅ Service Worker registered:", reg.scope))
        .catch((err) =>
          console.error("❌ Service Worker registration failed:", err)
        );
    });
  }

  // searchSection.appendChild(searchBarEl);

  jsonBtn.addEventListener("click", () =>
    animateAction({
      element: jsonBtn,
      callback: () => {
        downloadFavoritesAsJson();
        return true;
      },
      loadingText: "Downloading...",
    })
  );

  csvBtn.addEventListener("click", () =>
    animateAction({
      element: csvBtn,
      callback: () => {
        downloadFavoritesAsCsv();
        return true;
      },
      loadingText: "Downloading...",
    })
  );

  setupThemeToggle();
  renderFavorites();
  renderHistory();
  attachClearHandler("clearHistoryBtn", HISTORY_KEY, renderHistory);
  attachClearHandler("clearFavoritesBtn", FAVORITES_KEY, renderFavorites);
}

main();
