import { showToast } from "./toast.js";
import { getFromStorage, saveToStorage } from "../utils/storage.js";

import { createEmptyMessage } from "../utils/emptyMessage.js";
import { createColorCard } from "../utils/dom.js";
import { createElementWithClass, appendChildren } from "../utils/domHelper.js";
import { FAVORITES_KEY } from "../utils/constants.js";
import { animateAction } from "../utils/loader.js";

function addToFavorites(color) {
  // Retrieve existing favorites
  const favorites = getFromStorage(FAVORITES_KEY) || [];

  if (favorites.find((item) => item.hex === color.hex)) {
    return false; // ❌ Already added
  }

  favorites.push(color);
  saveToStorage(FAVORITES_KEY, favorites);

  renderFavorites();

  return true;
}

// remove favorite color
export function removeFromFavorites(hexToRemove) {
  const favorites = getFromStorage(FAVORITES_KEY) || [];
  const updated = favorites.filter((color) => color.hex !== hexToRemove);
  saveToStorage(FAVORITES_KEY, updated);
  renderFavorites(); // re-render after removing

  showToast("Removed from favorites ❌", "error");
}

function renderFavorites() {
  const favoritesList = document.getElementById("favoritesList");
  const downloadSection = document.getElementById("downloadSection");

  if (!favoritesList) return;

  favoritesList.innerHTML = "";

  const favorites = getFromStorage(FAVORITES_KEY) || [];

  if (favorites.length === 0) {
    downloadSection.style.display = "none";

    const emptyMsg = createEmptyMessage("fas fa-heart-broken", [
      "No favorite colors yet.",
      "To add your favorite colors, please search a color and click 'Add to Favorites'.",
    ]);
    appendChildren(favoritesList, emptyMsg);
    return;
  }
  if (downloadSection) downloadSection.style.display = "flex";

  const cards = favorites.map(({ hex, r, g, b }) =>
    createColorCard({
      hex,
      r,
      g,
      b,
      extraContent: ({ textColor }) => {
        const removeBtn = createElementWithClass(
          "button",
          "remove-favorite-btn"
        );
        removeBtn.title = "Remove from favorites";
        removeBtn.style.color = textColor;
        removeBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
        removeBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          animateAction({
            element: removeBtn,
            callback: () => removeFromFavorites(hex),
            loadingText: "",
            finalText: "",
          });
        });

        return removeBtn;
      },
    })
  );

  appendChildren(favoritesList, ...cards);
}

export { addToFavorites, renderFavorites };
