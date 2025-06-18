export function getContrastTextColor(r, g, b) {
  // Brightness formula
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  const color = brightness > 128 ? "#000" : "#fff";
  const textShadow = brightness > 128 ? "0 0 2px #fff" : "0 0 2px #000";
  return { color, textShadow };
}
