import { appendChildren, createElementWithClass } from "../utils/domHelper.js";

const TOAST_CLASS = "custom-toast";
const SHOW_CLASS = "show";

const TYPE_CLASSES = {
  success: "toast-success",
  error: "toast-error",
  info: "toast-info",
};

// components/toast.js
function showToast(message, type = "info") {
  let toast = document.querySelector(`.${TOAST_CLASS}`);
  toast.role = "status";
  toast.ariaLive = "polite";

  if (!toast) {
    toast = createElementWithClass("div", TOAST_CLASS);

    appendChildren(document.body, toast);
  }

  toast.textContent = message;

  // Clear previous inline styles (optional if you want to reset)
  toast.style.backgroundColor = "";
  toast.style.color = "";

  // Remove all type classes first
  Object.values(TYPE_CLASSES).forEach((cls) => {
    toast.classList.remove(cls);
  });

  // Add the class for the current type
  const typeClass = TYPE_CLASSES[type] || TYPE_CLASSES.info;
  toast.classList.add(typeClass);

  toast.classList.add(SHOW_CLASS);

  // Remove after duration
  setTimeout(() => {
    toast.classList.remove(SHOW_CLASS);
  }, 2500);
}

export { showToast };
