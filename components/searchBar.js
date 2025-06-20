import { createElementWithClass, appendChildren } from "../utils/domHelper.js";
import { debounce } from "../utils/debounce.js";

/**
 * Creates a styled search bar with input and search button.
 * @param {Function} onSearch - Callback with search value.
 * @param {Object} [options]
 * @param {string} [options.placeholder]
 * @param {string} [options.buttonText]
 * @returns {HTMLDivElement}
 */
// components/searchBar.js

export function createSearchBar() {
  const container = createElementWithClass("div", "search-bar");
  const colorPicker = document.getElementById("nativeColorPicker");

  //Input Field
  const input = createElementWithClass("input", "search-input");
  input.type = "text";
  input.ariaLabel = "Search only by hex or rgb code";
  input.id = "colorSearchInput";
  input.name = "colorSearchInput";
  input.placeholder = "Search HEX or RGB";
  input.autofocus = true;

  // Debounced version of searchHandler
  const debouncedSearch = debounce((colorValue) => {
    input.value = colorValue;
    searchHandler(colorValue);
  }, 300);

  // Update text input when color is picked
  colorPicker.addEventListener("input", () => {
    debouncedSearch(colorPicker.value);
  });

  // Keep color picker in sync with typed hex
  input.addEventListener("input", () => {
    const val = input.value.trim();
    if (/^#([0-9A-F]{3}){1,2}$/i.test(val)) {
      colorPicker.value = val;
    }
  });

  // info icon for tooltip

  const infoIconWrapper = createElementWithClass("div", "tooltip-wrapper");
  const infoIcon = document.createElement("i");
  infoIcon.className = "fas fa-info-circle search-info-icon";

  const tooltipText = createElementWithClass("div", "custom-tooltip");
  tooltipText.textContent = "Examples: #3498db or rgb(52,152,219)";

  // Mobile-only: Toggle tooltip on tap/click

  infoIcon.addEventListener("click", (e) => {
    if (window.matchMedia("(hover: none)").matches) {
      e.stopPropagation();
      tooltipText.classList.toggle("visible");
    }
  });

  // Hide tooltip on outside click
  document.addEventListener("click", () => {
    tooltipText.classList.remove("visible");
  });

  appendChildren(infoIconWrapper, infoIcon, tooltipText);

  //Search button
  const button = createElementWithClass("button", "search-button");
  button.innerHTML = `<i class="fas fa-search"></i>`;
  button.id = "searchButton";
  button.ariaLabel = "Search for color";

  // Append everything to the main container
  appendChildren(container, input, button, infoIconWrapper);

  let searchHandler = () => {};

  button.addEventListener("click", () => {
    const value = input.value.trim();
    if (value) {
      searchHandler(value);
    }
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const value = input.value.trim();
      if (value) {
        searchHandler(value);
      }
    }
  });

  return {
    element: container,
    clearInput: () => (input.value = ""),
    onSearch: (cb) => (searchHandler = cb),
    button,
  };
}
