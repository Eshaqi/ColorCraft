// components/storage.js
// General getter that works with all types (primitive or object)
function getFromStorage(key) {
  try {
    const value = localStorage.getItem(key);

    // Try parsing; if it fails, return as is
    return JSON.parse(value);
  } catch (e) {
    return localStorage.getItem(key); // fallback to raw string
  }
}

// General setter that stores all types
function saveToStorage(key, data) {
  try {
    const stringified = typeof data === "string" ? data : JSON.stringify(data);
    localStorage.setItem(key, stringified);
  } catch (e) {
    console.error("Failed to save to storage:", e);
  }
}

// ✅ Clear a specific key from localStorage
function clearStorageKey(key) {
  localStorage.removeItem(key);
}

export { getFromStorage, saveToStorage, clearStorageKey };
