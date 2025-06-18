import { showToast } from "../components/toast.js";

export function animateAction({
  element,
  callback,
  loadingText = "Processing...",
  loadingIcon = "fas fa-spinner fa-spin",
  finalText = "Done",
  finalTextFail = "Failed",
  finalIcon = "fas fa-check-circle",
  duration = 500,
  resetAfter = 1000,
}) {
  const originalContent = element.innerHTML;

  element.innerHTML = `<i class="${loadingIcon}"></i> ${loadingText}`;
  element.disabled = true;

  setTimeout(() => {
    const result = callback();

    // Animate result
    element.innerHTML = result
      ? `<i class="${finalIcon}"></i> ${finalText}`
      : `<i class="fas fa-times-circle"></i> ${finalTextFail}`;

    setTimeout(() => {
      element.innerHTML = originalContent;
      element.disabled = false;
    }, resetAfter);
  }, duration);
}
