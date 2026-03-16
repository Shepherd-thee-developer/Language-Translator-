// DOM elements
const sourceLang = document.getElementById('sourceLang');
const targetLang = document.getElementById('targetLang');
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const translateBtn = document.getElementById('translateBtn');
const swapBtn = document.getElementById('swapLangBtn');
const copySourceBtn = document.getElementById('copySourceBtn');
const copyTargetBtn = document.getElementById('copyTargetBtn');
const speakSourceBtn = document.getElementById('speakSourceBtn');
const speakTargetBtn = document.getElementById('speakTargetBtn');
const sourceCount = document.getElementById('sourceCount');
const loader = document.getElementById('loader');
const statusMessage = document.getElementById('statusMessage');
const errorBox = document.getElementById('errorBox');
const darkToggle = document.getElementById('darkModeToggle');

// State
let debounceTimer = null;
let currentAbortController = null;
const DEBOUNCE_MS = 600;

// Update character count
function updateCharCount() {
    const len = inputText.value.length;
    sourceCount.textContent = `${len} / 500`;
    sourceCount.classList.toggle('error', len > 500);
}
inputText.addEventListener('input', updateCharCount);

// Text-to-speech
function speakText(text, lang) {
    if (!text.trim()) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'fr' ? 'fr-FR' : 'en-US';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
}

// Copy to clipboard
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        statusMessage.textContent = '✓ Copied!';
        setTimeout(() => {
            if (statusMessage.textContent === '✓ Copied!') statusMessage.textContent = '';
        }, 1500);
    } catch {
        statusMessage.textContent = '❌ Copy failed';
    }
}

// Show/hide loader and error
function setLoading(loading) {
    loader.style.display = loading ? 'inline-block' : 'none';
    translateBtn.disabled = loading;
}

function showError(msg) {
    errorBox.textContent = msg;
}

// Core translation function (using GET request – works with MyMemory)
async function performTranslation() {
    const text = inputText.value.trim();
    if (!text) {
        outputText.value = '';
        showError('');
        return;
    }
    if (text.length > 500) {
        showError('Maximum 500 characters');
        return;
    }

    // Cancel previous request if any
    if (currentAbortController) {
        currentAbortController.abort();
    }
    currentAbortController = new AbortController();

    const source = sourceLang.value;
    const target = targetLang.value;
    // Build langpair like "en|fr" or "|fr" for auto-detect
    const langpair = source === 'auto' ? `|${target}` : `${source}|${target}`;

    setLoading(true);
    showError('');
    statusMessage.textContent = 'Translating...';

    try {
        // Use GET request with URL parameters (works perfectly)
        const url = new URL('https://api.mymemory.translated.net/get');
        url.searchParams.append('q', text);
        url.searchParams.append('langpair', langpair);

        const response = await fetch(url, {
            signal: currentAbortController.signal,
            method: 'GET'  // GET is simpler and reliable
        });

        if (!response.ok) throw new Error(`HTTP error ${response.status}`);

        const data = await response.json();
        if (data.responseStatus === 200 && data.responseData) {
            outputText.value = data.responseData.translatedText;
            statusMessage.textContent = 'Translated';
            showError('');
        } else {
            throw new Error(data.responseDetails || 'Translation failed');
        }
    } catch (err) {
        if (err.name === 'AbortError') {
            return; // Ignore abort errors
        }
        showError('Error: ' + err.message);
        statusMessage.textContent = '';
        outputText.value = '';
    } finally {
        setLoading(false);
        currentAbortController = null;
    }
}

// Debounced input handler (real-time)
function debouncedTranslate() {
    if (inputText.value.length > 500) {
        showError('Maximum 500 characters');
        return;
    }
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        performTranslation();
    }, DEBOUNCE_MS);
}

// Event listeners
inputText.addEventListener('input', debouncedTranslate);
translateBtn.addEventListener('click', () => {
    clearTimeout(debounceTimer); // cancel any pending debounce
    performTranslation();
});

// Swap languages
swapBtn.addEventListener('click', () => {
    const src = sourceLang.value;
    const tgt = targetLang.value;
    sourceLang.value = (tgt === 'auto') ? 'en' : tgt;
    targetLang.value = (src === 'auto') ? 'en' : src;
    clearTimeout(debounceTimer);
    performTranslation();
});

// Copy buttons
copySourceBtn.addEventListener('click', () => copyToClipboard(inputText.value));
copyTargetBtn.addEventListener('click', () => copyToClipboard(outputText.value));

// Speak buttons
speakSourceBtn.addEventListener('click', () => speakText(inputText.value, sourceLang.value));
speakTargetBtn.addEventListener('click', () => speakText(outputText.value, targetLang.value));

// Dark mode toggle
darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    darkToggle.textContent = document.body.classList.contains('dark') ? '☀️ Light mode' : '🌙 Dark mode';
});

// Initial translation on page load
window.addEventListener('DOMContentLoaded', () => {
    inputText.value = 'Hello, how are you';
    sourceLang.value = 'en';
    targetLang.value = 'fr';
    updateCharCount();
    performTranslation();
});
