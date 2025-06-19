# 🎨 ColorCraft

**ColorCraft** is a simple and responsive color search tool that allows users to:

- 🎯 Search for colors using HEX or RGB values
- 🖍️ Pick a color using the native browser color picker
- 🔁 Sync color picker with text input (and vice versa)
- ⭐ Save favorite colors
- 📜 View color search history
- ⬇️ Download favorites as JSON or CSV
- 🌗 Toggle between light and dark themes

---

## 🚀 Features

- ✅ Debounced search input
- ✅ HEX & RGB support
- ✅ Native color picker (live sync with input)
- ✅ Responsive layout (mobile-friendly)
- ✅ Search history & favorites
- ✅ CSV & JSON download
- ✅ Dark mode toggle
- ✅ Clean and modular JavaScript structure

---

## 🖥️ Live Demo

You can try the app here:  
👉 [https://color-craft-palette.vercel.app](https://color-craft-palette.vercel.app)

---

## 📂 Project Structure

```
ColorCraft/
├── components/           # JS UI components
│   ├── colorCard.js
│   ├── download.js
│   ├── favorites.js
│   ├── history.js
│   ├── searchBar.js
│   ├── searchHandler.js
│   ├── theme.js
│   └── toast.js
├── utils/                # Utility scripts
│   ├── clearHandler.js
│   ├── colorParser.js
│   ├── constants.js
│   ├── debounce.js
│   ├── dom.js
│   ├── domHelper.js
│   ├── emptyMessage.js
│   └── loader.js
│   └── storage.js
│   └── utils.js
├── .prettierignore
├── 404.html
├── app.js                # App entry point
├── app.min.js
├── favicon.png
├── index.html            # Main HTML file
└── LICENSE               # Open source license
├── manifest.json
├── minify.sh
├── README.md             # Project documentation
├── service-worker.js
├── style.css               # CSS styles
├── style.min.css
```

## ⚠️ Disclaimer

This app is a simple front-end project intended for educational and personal use only.  
It does not include any backend or security features. Use it at your own risk.

This project is licensed under the [MIT License](LICENSE).
