import { clearStorageKey } from "../utils/storage.js";
import { animateAction } from "../utils/loader.js";

export function attachClearHandler(buttonId, storageKey, renderCallback) {
  const btn = document.getElementById(buttonId);
  if (!btn) return;

  btn.addEventListener("click", () => {
    animateAction({
      element: btn,
      callback: () => {
        clearStorageKey(storageKey);
        renderCallback();
        return true;
      },
      loadingText: "Clearing...",
      finalText: "Cleared",
      finalIcon: "fas fa-trash",
    });
  });
}
