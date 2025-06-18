import { appendChildren, createElementWithClass } from "./domHelper.js";
import { getContrastTextColor } from "./utils.js";

/**
 * Creates a color card element.
 * @param {Object} params
 * @param {string} params.hex - Hex code.
 * @param {number} params.r - Red value.
 * @param {number} params.g - Green value.
 * @param {number} params.b - Blue value.
 * @param {string} [params.className="color-card"] - Optional class for the card.
 * @param {string} [params.title] - Optional tooltip.
 * @param {boolean} [params.showAddButton=false] - Show "Add to Favorites" button.
 * @param {Function} [params.onClick] - Optional click handler for the card.
 * @param {Function} [params.extraContent] - Function that returns extra DOM elements to add.
 * @returns {HTMLElement}
 */
export function createColorCard({
  hex,
  r,
  g,
  b,
  className = "color-card",
  title = "",
  showAddButton = false,
  onClick = null,
  extraContent = null,
}) {
  const { color: textColor, textShadow } = getContrastTextColor(r, g, b);

  const card = createElementWithClass("div");
  card.className = className;
  card.style.backgroundColor = hex;
  card.role = "region";
  card.ariaLabel = `Color card for ${hex}, RGB: ${r}, ${g}, ${b}`;
  card.style.color = textColor;
  if (title) card.title = title;
  if (onClick) card.style.cursor = "pointer";

  const hexDiv = createElementWithClass("div");
  hexDiv.textContent = hex;
  hexDiv.style.color = textColor;
  hexDiv.style.textShadow = textShadow;
  hexDiv.style.margin = "4px 0";

  const rgbDiv = createElementWithClass("div");
  rgbDiv.textContent = `rgb(${r}, ${g}, ${b})`;
  rgbDiv.style.color = textColor;
  rgbDiv.style.textShadow = textShadow;
  rgbDiv.style.marginBottom = "8px";

  appendChildren(card, hexDiv, rgbDiv);

  if (showAddButton) {
    const btn = createElementWithClass("button");
    btn.className = "add-favorite";
    btn.textContent = "❤️ Add to Favorites";
    btn.style.marginTop = "4px";
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // prevent parent click
      const event = new CustomEvent("addToFavorites", {
        detail: { hex, r, g, b },
      });
      window.dispatchEvent(event);
    });
    appendChildren(card, btn);
  }

  // ✅ Append extra content if provided
  if (extraContent) {
    const extras = extraContent({ hex, r, g, b, textColor, textShadow });
    if (Array.isArray(extras)) {
      extras.forEach((el) => card.appendChild(el));
    } else if (extras instanceof HTMLElement) {
      appendChildren(card, extras);
    }
  }

  if (onClick) {
    card.addEventListener("click", () => onClick({ hex, r, g, b }));
  }

  return card;
}
