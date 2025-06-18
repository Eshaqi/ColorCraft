export function createElementWithClass(tag, className) {
  const el = document.createElement(tag);
  el.className = className;
  return el;
}

/**
 * Remove a class name from a given element if it exists
 * @param {HTMLElement} element
 * @param {string} className
 */
export function removeClassFromElement(element, className) {
  if (element && className && element.classList.contains(className)) {
    element.classList.remove(className);
  }
}

export function appendChildren(parent, ...children) {
  children.forEach((child) => parent.appendChild(child));
}

export function removeChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
