# Language-Translator
A sleek, browser‑based translation web app that lets you translate text between English and French (with automatic language detection) using the free MyMemory Translation API. Designed as a full‑stack developer assignment, it includes real‑time translation, language swapping, text‑to‑speech, copy‑to‑clipboard, dark mode, and a fully responsive interface.
✨ Features
✅ Instant translation – type or paste text (max 500 characters) and see the result in real time (debounced).

🔁 Swap languages – one‑click switch between source and target languages.

🔊 Text‑to‑speech – listen to the original or translated text.

📋 Copy with one click – copy source or translated text to clipboard.

🌙 Dark mode – toggle between light and dark themes.

🌐 Language options – English, French, or auto‑detect for source.

⏳ Loading indicator – shows when a request is in progress.

❌ Error handling – user‑friendly messages for API failures or input issues.

📱 Fully responsive – works on desktop, tablet, and mobile.

🛠️ Tech Stack
HTML5 – semantic structure

CSS3 – custom styles, flexbox, backdrop blur, dark mode variables

JavaScript (ES6) – async/await, DOM manipulation, debouncing, AbortController

MyMemory Translation API – free, no API key required

🚀 Setup & Run Locally
Clone the repository

 Open the app 
Simply open index.html in any modern web browser (Chrome, Firefox, Edge, Safari).
No build tools or server required.

Start translating

The default translation ("Hello, how are you" → French) appears on load.

Type your own text or select different languages.

Use the buttons to listen, copy, or swap.

📡 API Reference
The app uses the MyMemory Translated API.

langpair – language pair, e.g. en|fr or |fr (auto‑detect source)

Example request

💡 No API key is needed for limited personal use (daily quota applies).

📂 Folder Structure
text
📦 language-translator
├── 📄 index.html          # main HTML file
├── 🎨 style.css           # all styles (light/dark, layout)
├── 🧠 script.js           # translation logic, events, API calls

🎯 Bonus Features Implemented
✅ Real‑time translation with debounce (600 ms)

✅ Loading spinner during API calls

✅ Friendly error messages (network issues, API errors, character limit)

✅ Responsive design (mobile‑first media queries)

✅ Dark mode toggle with persistent preference (via class)

📄 License
This project is open source and available under the MIT License.

🙏 Acknowledgements
MyMemory for providing a free translation API.

Icons and emojis used for intuitive UI.

Assignment specification by [Zambia University College of Technology].

Built with ❤️ as a full‑stack developer assignment.

