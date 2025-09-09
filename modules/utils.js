// Utility functions module for the "Everything is Four" application
// Contains security, validation, and DOM utility functions

import { languageData } from './language-data.js';

/**
 * HTML sanitization function to prevent XSS attacks
 * @param {string} text - Text to sanitize
 * @returns {string} Sanitized text
 */
export function sanitizeText(text) {
  if (typeof text !== 'string') return '';
  // Create a temporary element to escape HTML
  const tempDiv = document.createElement('div');
  tempDiv.textContent = text;
  return tempDiv.innerHTML;
}

/**
 * Input validation function for user input
 * @param {string} input - Input to validate
 * @returns {boolean} True if input is valid
 */
export function validateInput(input) {
  if (typeof input !== 'string') return false;

  // Length validation
  if (input.length === 0 || input.length > 100) return false;

  // Character validation - allow letters, spaces, hyphens, apostrophes and extended Latin characters
  // More comprehensive regex to support multiple languages including Dutch, German, etc.
  const validCharsRegex = /^[\p{L}\p{M}\s\-']+$/u;
  return validCharsRegex.test(input);
}

/**
 * Safe URL decoding with validation
 * @param {string} str - String to decode
 * @returns {string} Safely decoded string
 */
export function safeDecodeURIComponent(str) {
  try {
    if (typeof str !== 'string') return '';
    // Limit length to prevent DoS
    if (str.length > 200) return '';
    const decoded = decodeURIComponent(str);
    // Additional validation after decoding
    return validateInput(decoded) ? decoded : '';
  } catch (e) {
    console.warn('URL decoding failed:', e);
    return '';
  }
}

/**
 * Safe DOM element creation for path items
 * @param {string|number} item - The item to create element for
 * @param {boolean} isNumber - Whether the item is a number
 * @returns {HTMLElement} DOM element
 */
export function createPathElement(item, isNumber = false) {
  const span = document.createElement('span');
  span.className = isNumber ? 'number' : 'word';
  span.textContent = String(item); // textContent automatically escapes
  return span;
}

/**
 * Safe way to create arrow separator
 * @returns {HTMLElement} Arrow separator element
 */
export function createArrowSeparator() {
  const span = document.createElement('span');
  span.textContent = ' → ';
  return span;
}

/**
 * Validates critical DOM elements and shows error if missing
 * @param {Object} elements - Object containing DOM elements to validate
 * @param {string} language - Current language code for error message translation
 * @returns {Array} Array of missing element names
 */
export function validateCriticalElements(elements, language = 'en') {
  const missingElements = Object.entries(elements)
    .filter(([name, element]) => !element)
    .map(([name]) => name);

  if (missingElements.length > 0) {
    console.error('Critical DOM elements missing:', missingElements);
    // Show user-friendly error if critical elements are missing
    const body = document.body;
    if (body) {
      const errorMessage = languageData[language].ui.errors.loadError;
      const errorDiv = document.createElement('div');
      errorDiv.style.cssText = 'padding: 20px; margin: 20px; border: 2px solid red; background: #ffe6e6; color: red;';
      errorDiv.textContent = errorMessage;
      body.insertBefore(errorDiv, body.firstChild);
    }
  }

  return missingElements;
}

/**
 * Creates a word element for the path display
 * @param {string|number} word - The word or number
 * @param {boolean} isNumber - Whether this is a number
 * @param {boolean} isFinal - Whether this is the final element
 * @returns {HTMLElement} The created word element
 */
export function createWordElement(word, isNumber = false, isFinal = false) {
  const stepItem = document.createElement("div");
  stepItem.className = "step-item";

  const wordBox = document.createElement("div");
  wordBox.className = isFinal ? "word-box final" : "word-box";
  wordBox.textContent = word;

  stepItem.appendChild(wordBox);

  if (isNumber) {
    const arrow = document.createElement("div");
    arrow.className = "arrow";
    arrow.textContent = "→";

    stepItem.appendChild(arrow);
  } else if (!isFinal) {
    const arrow = document.createElement("div");
    arrow.className = "arrow";
    arrow.textContent = "→";

    stepItem.appendChild(arrow);
  }

  return stepItem;
}

/**
 * Gets the base path for URL handling (handles deployments under subpaths)
 * @param {Set} supportedLangs - Set of supported language codes
 * @returns {string} The base path
 */
export function getBasePath(supportedLangs) {
  // Handles deployments under subpaths, e.g. GitHub Pages /four
  const parts = window.location.pathname.split("/").filter(Boolean);
  if (parts.length === 0) return "";
  // If first segment is a known language, we are at root
  if (supportedLangs.has(parts[0])) return "";
  // Otherwise treat the first segment as base path
  return `/${parts[0]}`;
}

/**
 * Builds a word path for URL construction
 * @param {string} lang - Language code
 * @param {string} word - The word
 * @returns {string} The constructed path
 */
export function buildWordPath(lang, word) {
  return lang === "en"
    ? `/${encodeURIComponent(word)}`
    : `/${lang}/${encodeURIComponent(word)}`;
}

/**
 * Detects the user's browser language
 * @param {Object} languageData - Available language data
 * @returns {string} Detected language code or 'en' as fallback
 */
export function detectLanguage(languageData) {
  const browserLang = navigator.language || navigator.userLanguage;
  const shortLang = browserLang.split("-")[0];

  // Check if we support this language
  if (languageData[shortLang]) {
    return shortLang;
  }

  // Default to English if language not supported
  return "en";
}