// utils/colorParser.js
export function parseColor(input) {
  const hexMatch = input.match(/^#?([0-9a-fA-F]{6})$/);
  if (hexMatch) return `#${hexMatch[1].toLowerCase()}`;

  const rgbMatch = input.match(
    /^rgb\s*\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i
  );
  if (rgbMatch) {
    const [_, r, g, b] = rgbMatch;
    const toHex = (n) => parseInt(n).toString(16).padStart(2, "0");
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  return null;
}

export function hexToRgb(hex) {
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}
