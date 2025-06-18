// components/searchHandler.js
import { parseColor, hexToRgb } from "../utils/colorParser.js";
import { renderColorCard } from "./colorCard.js";
import { saveToHistory, renderHistory } from "./history.js";
import { appendChildren } from "../utils/domHelper.js";

/**
 * Executes the color search and UI rendering
 */
export function handleSearch(input, clearInputFn) {
  const palette = document.getElementById("paletteDisplay");
  palette.innerHTML = "";

  const hex = parseColor(input);
  if (!hex) {
    palette.innerHTML = `<p style="color:red;">Invalid color code. Please try again.</p>`;
    return false;
  }

  const { r, g, b } = hexToRgb(hex);
  const colorObj = { hex, r, g, b };

  const card = renderColorCard(colorObj);
  appendChildren(palette, card);

  saveToHistory(colorObj);
  renderHistory();

  if (typeof clearInputFn === "function") clearInputFn();

  return true;
}
