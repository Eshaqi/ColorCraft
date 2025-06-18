#!/bin/bash

# Minify JavaScript
npx terser app.js -o app.min.js --compress --mangle

# Minify CSS
npx clean-css-cli -o style.min.css style.css

echo "✅ Minification complete!"