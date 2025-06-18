import { addToFavorites } from "./favorites.js";
import { getContrastTextColor } from "../utils/utils.js";
import { createElementWithClass } from "../utils/domHelper.js";
import { animateAction } from "../utils/loader.js";

export function renderColorCard({ hex, r, g, b }) {
  const card = createElementWithClass("div", "color-card");

  const { color: textColor } = getContrastTextColor(r, g, b);

  card.style.backgroundColor = hex;
  card.style.color = textColor;
  card.role = "region";
  card.ariaLabel = `Color card for ${hex}, RGB: ${r}, ${g}, ${b}`;

  card.innerHTML = `
    <div>${hex}</div>
    <div>${r},${g},${b}</div>

    <button class="add-favorite" aria-label="Add this color to favorites">
    ❤️ Add to Favorites
    </button>
    
  `;

  // Handle adding to favorites
  const favoriteBtn = card.querySelector(".add-favorite");
  favoriteBtn.addEventListener("click", () => {
    animateAction({
      element: favoriteBtn,
      callback: () => addToFavorites({ hex, r, g, b }),
      loadingText: "Adding....",
      // Change button text to Added when added successfully
      finalText: "Added ❤️",
      // Change button text to Already added ! when it is already there (duplication)
      finalTextFail: "Already added !",
    });
  });

  return card;
}
