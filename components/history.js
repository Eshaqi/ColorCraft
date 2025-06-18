import { getFromStorage, saveToStorage } from "../utils/storage.js";
import { createEmptyMessage } from "../utils/emptyMessage.js";
import { createColorCard } from "../utils/dom.js";
import { appendChildren } from "../utils/domHelper.js";
import { HISTORY_KEY, MAX_HISTORY } from "../utils/constants.js";

function saveToHistory(color) {
  const history = getFromStorage(HISTORY_KEY) || [];
  // Avoid duplicate hex entries
  if (!history.some((item) => item.hex === color.hex)) {
    history.unshift(color); // Add to the beginning
    saveToStorage(HISTORY_KEY, history.slice(0, MAX_HISTORY));
  }
}

function renderHistory() {
  const container = document.getElementById("searchHistoryList");
  if (!container) return;

  const history = getFromStorage(HISTORY_KEY) || [];

  container.innerHTML = "";

  if (history.length === 0) {
    const emptyMsg = createEmptyMessage(
      "fas fa-search-minus",
      ["No recent searches yet.", "Start by searching for a hex color."],
      "empty-history-msg"
    );
    appendChildren(container, emptyMsg);
    return;
  }

  const cards = history.map(({ hex, r, g, b }) =>
    createColorCard({
      hex,
      r,
      g,
      b,
      title: `Click to search ${hex}`,
      onClick: ({ hex, r, g, b }) => {
        const event = new CustomEvent("historyColorSelected", {
          detail: { hex, r, g, b },
        });
        window.dispatchEvent(event);
      },
    })
  );

  appendChildren(container, ...cards);
}

export { saveToHistory, renderHistory };
