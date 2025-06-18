import { showToast } from "./toast.js";
import { getFromStorage } from "../utils/storage.js";
import {
  createElementWithClass,
  appendChildren,
  removeChildren,
} from "../utils/domHelper.js";

// components/download.js
const FAVORITES_KEY = "color-favorites";

// Download favorite colors in JSON file
function downloadFavoritesAsJson() {
  const favorites = getFromStorage(FAVORITES_KEY);
  const dataStr =
    "data:text/json;charset=utf-8," +
    encodeURIComponent(JSON.stringify(favorites, null, 2));
  const link = createElementWithClass("a");
  link.setAttribute("href", dataStr);
  link.setAttribute("download", "favorites.json");
  appendChildren(link);
  link.click();
  removeChildren(link);
}

//Download favorite colors in CSV file
function downloadFavoritesAsCsv() {
  const favorites = getFromStorage(FAVORITES_KEY);
  const header = "Hex,R,G,B\n";
  const rows = favorites
    .map(({ hex, r, g, b }) => `${hex},${r},${g},${b}`)
    .join("\n");
  const csvContent =
    "data:text/csv;charset=utf-8," + encodeURIComponent(header + rows);
  const link = createElementWithClass("a");
  link.setAttribute("href", csvContent);
  link.setAttribute("download", "favorites.csv");
  appendChildren(link);
  link.click();
  removeChildren(link);
}

export { downloadFavoritesAsJson, downloadFavoritesAsCsv };
