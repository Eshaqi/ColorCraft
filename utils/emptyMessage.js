// utils/emptyMessage.js

import { createElementWithClass, appendChildren } from "../utils/domHelper.js";

/**
 * @param {string} iconClass - FontAwesome icon class
 * @param {string[]} lines - array of text lines
 * @param {string} [textClass] - optional extra class for text <p> elements
 */
export function createEmptyMessage(iconClass, lines = [], textClass = "") {
  const wrapper = createElementWithClass("div", "empty-msg-wrapper");

  // Apply custom wrapper styles if provided
  // Object.assign(wrapper.style, styles.wrapper || {});

  const icon = createElementWithClass("i", `${iconClass} empty-msg-icon`);
  const textContainer = createElementWithClass("div", "text-container");

  lines.forEach((line) => {
    const p = createElementWithClass("p", `empty-msg-text ${textClass}`);
    p.textContent = line;
    appendChildren(textContainer, p);
  });

  appendChildren(wrapper, icon, textContainer);
  return wrapper;
}
