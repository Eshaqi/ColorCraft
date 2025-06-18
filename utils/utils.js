export function getContrastTextColor(r, g, b) {
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  const isLight = brightness > 150;

  return {
    color: isLight ? "#000" : "#fff",
    textShadow: isLight
      ? "0 1px 2px rgba(255,255,255,0.5)"
      : "0 1px 2px rgba(0,0,0,0.5)",
  };
}
