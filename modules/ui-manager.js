// UI Manager module for the "Everything is Four" application
// Handles DOM manipulation, theme management, and UI state updates

import { convertNumberToWord, countLetters } from './algorithm.js';
import { exampleWords, languageData } from './language-data.js';
import { createArrowSeparator, createPathElement, createWordElement } from './utils.js';

/**
 * Updates the UI for a specific language
 * @param {string} lang - Language code
 */
export function updateUI(lang) {
  const data = languageData[lang];

  // Update document language
  document.documentElement.lang = lang;

  // Update language display
  const languageDisplay = document.getElementById("languageDisplay");
  if (languageDisplay) {
    languageDisplay.textContent = data.name;
  }

  // Update UI text elements
  const titlePart1 = document.getElementById("title-part1");
  if (titlePart1) titlePart1.textContent = data.ui.title;

  const magicWord = document.getElementById("magic-word");
  if (magicWord) magicWord.textContent = data.magicNumber.toUpperCase();

  const tagline = document.getElementById("tagline");
  if (tagline) tagline.textContent = data.ui.tagline;

  const wordInput = document.getElementById("wordInput");
  if (wordInput) wordInput.placeholder = data.ui.inputPlaceholder;

  const checkButton = document.getElementById("checkButton");
  if (checkButton) checkButton.textContent = data.ui.checkButton;

  const suggestButton = document.getElementById("suggestButton");
  if (suggestButton) suggestButton.textContent = data.ui.suggestButton;

  // Update share button with icon
  updateShareButton(data.ui.shareButton);

  // Update conclusion text
  updateConclusionText(data.ui.conclusion, data.magicNumber.toUpperCase());

  // Update how it works section
  const howItWorks = document.getElementById("how-it-works");
  if (howItWorks) howItWorks.textContent = data.ui.howItWorks;

  const step1 = document.getElementById("step1");
  if (step1) step1.textContent = data.ui.step1;

  const step2 = document.getElementById("step2");
  if (step2) step2.textContent = data.ui.step2;

  const step3 = document.getElementById("step3");
  if (step3) step3.textContent = data.ui.step3;

  const step4 = document.getElementById("step4");
  if (step4) step4.textContent = data.ui.step4.replace('"four"', `"${data.magicNumber}"`);

  // Generate and display example
  const exampleData = generateRandomExample(lang);
  displayExample(exampleData);

  // Note: footer-text element ("Created with 💻 and curiosity") remains static
  // Main footer content is handled by data-translate attributes

  // Clear previous results
  const pathContainer = document.getElementById("pathContainer");
  if (pathContainer) {
    pathContainer.textContent = "";
  }

  const conclusion = document.getElementById("conclusion");
  if (conclusion) {
    conclusion.classList.add("hidden");
  }

  // Update share dialog texts
  const shareDialogHeader = document.querySelector(".share-dialog-header h3");
  if (shareDialogHeader) shareDialogHeader.textContent = data.ui.shareDialogTitle;

  const shareDialogBody = document.querySelector(".share-dialog-body p");
  if (shareDialogBody) shareDialogBody.textContent = data.ui.shareDialogText;

  const copyShareUrl = document.getElementById("copyShareUrl");
  if (copyShareUrl) copyShareUrl.textContent = data.ui.copyButton;

  const copySuccess = document.getElementById("copySuccess");
  if (copySuccess) {
    const span = copySuccess.querySelector("span");
    if (span) span.textContent = data.ui.copiedMessage;
  }

  // Update accessibility labels
  updateAccessibilityLabels(data);

  // Update translatable content
  updateTranslatableContent(data);
}

/**
 * Updates aria-label attributes based on data-translate-aria-label attributes
 * @param {Object} data - Language data object
 */
function updateAccessibilityLabels(data) {
  // Find all elements with data-translate-aria-label attributes
  const elementsWithAriaLabels = document.querySelectorAll('[data-translate-aria-label]');

  elementsWithAriaLabels.forEach(element => {
    const translationKey = element.getAttribute('data-translate-aria-label');
    if (translationKey) {
      // Support nested object notation (e.g., 'accessibility.toggleTheme')
      const translatedText = getNestedProperty(data, translationKey);
      if (translatedText) {
        element.setAttribute('aria-label', translatedText);
      }
    }
  });
}

/**
 * Updates textContent for elements with data-translate attributes
 * @param {Object} data - Language data object
 */
function updateTranslatableContent(data) {
  // Find all elements with data-translate attributes
  const elementsWithTranslate = document.querySelectorAll('[data-translate]');

  elementsWithTranslate.forEach(element => {
    const translationKey = element.getAttribute('data-translate');
    if (translationKey) {
      // Support nested object notation (e.g., 'footer.heading')
      const translatedText = getNestedProperty(data, translationKey);
      if (translatedText) {
        element.textContent = translatedText;
      }
    }
  });
}

/**
 * Gets a nested property from an object using dot notation
 * @param {Object} obj - The object to search in
 * @param {string} path - The path to the property (e.g., 'ui.accessibility.toggleTheme')
 * @returns {string|undefined} The property value or undefined if not found
 */
function getNestedProperty(obj, path) {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
}

/**
 * Updates the share button with SVG icon and text
 * @param {string} shareButtonText - The share button text
 */
function updateShareButton(shareButtonText) {
  const shareButton = document.getElementById("shareButton");
  if (!shareButton) return;

  // Clear existing content
  shareButton.textContent = '';

  // Create SVG element safely
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "16");
  svg.setAttribute("height", "16");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("fill", "none");
  svg.setAttribute("stroke", "currentColor");
  svg.setAttribute("stroke-width", "2");

  // Create path elements
  const path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path1.setAttribute("d", "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8");

  const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  polyline.setAttribute("points", "16 6 12 2 8 6");

  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", "12");
  line.setAttribute("y1", "2");
  line.setAttribute("x2", "12");
  line.setAttribute("y2", "15");

  svg.appendChild(path1);
  svg.appendChild(polyline);
  svg.appendChild(line);
  shareButton.appendChild(svg);

  // Add text safely
  const buttonText = document.createTextNode(' ' + shareButtonText);
  shareButton.appendChild(buttonText);
  shareButton.setAttribute("aria-label", shareButtonText);
}

/**
 * Updates the conclusion text with highlighting
 * @param {string} conclusionContent - The conclusion text
 * @param {string} uppercaseMagic - The uppercase magic word
 */
function updateConclusionText(conclusionContent, uppercaseMagic) {
  const conclusionText = document.getElementById("conclusion-text");
  if (!conclusionText) return;

  if (conclusionContent.includes(uppercaseMagic)) {
    // Clear and rebuild with safe DOM methods
    conclusionText.textContent = '';

    const parts = conclusionContent.split(uppercaseMagic);
    for (let i = 0; i < parts.length; i++) {
      if (parts[i]) {
        conclusionText.appendChild(document.createTextNode(parts[i]));
      }
      if (i < parts.length - 1) {
        const highlight = document.createElement('span');
        highlight.className = 'highlight';
        highlight.textContent = uppercaseMagic;
        conclusionText.appendChild(highlight);
      }
    }
  } else {
    conclusionText.textContent = conclusionContent;
  }
}

/**
 * Generates a random example path for a given language
 * @param {string} lang - Language code
 * @returns {Object|null} Example data object or null if error
 */
export function generateRandomExample(lang) {
  try {
    const data = languageData[lang];
    const words = exampleWords[lang];
    if (!data || !words || !Array.isArray(words) || words.length === 0) {
      console.warn('Invalid language data for:', lang);
      return null;
    }

    const magicNumber = data.magicNumber;
    // Select a random word from examples
    const randomWord = words[Math.floor(Math.random() * words.length)];

    // Calculate the path
    const path = [];
    let currentWord = randomWord.toLowerCase();
    let maxIterations = 10;
    let iterations = 0;

    while (currentWord !== magicNumber && iterations < maxIterations) {
      path.push(currentWord);
      const letterCount = countLetters(currentWord, lang);
      path.push(letterCount);
      const numberAsWord = convertNumberToWord(letterCount, lang);
      currentWord = numberAsWord;
      iterations++;
    }

    if (currentWord === magicNumber) {
      path.push(currentWord);
    }

    return { path, lang };
  } catch (e) {
    console.error('Error generating example:', e);
    return null;
  }
}

/**
 * Displays an example using DOM methods
 * @param {Object|null} exampleData - Example data object
 */
export function displayExample(exampleData) {
  const exampleElement = document.getElementById("example");
  if (!exampleElement || !exampleData) return;

  // Clear previous content safely
  exampleElement.textContent = '';

  const { path, lang } = exampleData;
  const examplePrefixMap = { en: "Example: ", nl: "Voorbeeld: ", de: "Beispiel: " };

  // Add prefix text
  const prefixText = document.createTextNode(examplePrefixMap[lang] || "Example: ");
  exampleElement.appendChild(prefixText);

  // Add path elements safely
  for (let i = 0; i < path.length; i++) {
    const item = path[i];
    const element = createPathElement(item, typeof item === 'number');
    exampleElement.appendChild(element);

    if (i < path.length - 1) {
      exampleElement.appendChild(createArrowSeparator());
    }
  }
}

/**
 * Displays the calculation path with animation
 * @param {Array} path - Path array from word to magic number
 */
export function displayPath(path) {
  const pathContainer = document.getElementById("pathContainer");
  const conclusion = document.getElementById("conclusion");

  // Clear safely
  if (pathContainer) {
    pathContainer.textContent = "";
  }

  // Add elements with a slight delay for animation effect
  let delay = 0;
  for (let i = 0; i < path.length; i++) {
    setTimeout(() => {
      const item = path[i];
      const isNumber = typeof item === "number";
      const isFinal = i === path.length - 1;

      const element = createWordElement(item, isNumber, isFinal);
      if (pathContainer) {
        pathContainer.appendChild(element);
      }

      // Show conclusion once we reach the end
      if (isFinal) {
        setTimeout(() => {
          if (conclusion) {
            conclusion.classList.remove("hidden");
            // Move focus for screen readers
            if (typeof conclusion.focus === "function") {
              conclusion.focus();
            }
          }
        }, 500);
      }
    }, delay);

    delay += 300; // Adjust timing as needed
  }
}

/**
 * Shows an error message in the path container
 * @param {string} message - Error message to display
 */
export function showError(message) {
  const pathContainer = document.getElementById("pathContainer");
  if (!pathContainer) return;

  pathContainer.textContent = '';
  const errorDiv = document.createElement('div');
  errorDiv.className = 'error-message';
  errorDiv.style.cssText = 'color: red; padding: 10px; text-align: center;';
  errorDiv.textContent = message;
  pathContainer.appendChild(errorDiv);
}

/**
 * Sets up theme toggle functionality
 */
export function setupThemeToggle() {
  const themeToggle = document.getElementById("themeToggle");
  if (!themeToggle) return;

  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  // Check for saved theme preference or use device preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark" || (!savedTheme && prefersDarkScheme.matches)) {
    document.body.setAttribute("data-theme", "dark");
  } else {
    document.body.setAttribute("data-theme", "light");
  }

  // Sync aria-pressed to current state
  function syncThemeTogglePressed() {
    const isDark = (document.body.getAttribute("data-theme") || "light") === "dark";
    themeToggle.setAttribute("aria-pressed", isDark ? "true" : "false");
  }
  syncThemeTogglePressed();

  // Toggle theme when button is clicked
  themeToggle.addEventListener("click", () => {
    let currentTheme = document.body.getAttribute("data-theme") || "light";
    let newTheme = currentTheme === "light" ? "dark" : "light";

    document.body.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    syncThemeTogglePressed();
  });
}

/**
 * Sets up example refresh functionality
 * @param {string} currentLanguage - Current language code
 */
export function setupExampleRefresh(getCurrentLanguage) {
  const exampleElement = document.querySelector(".example");
  if (!exampleElement) return;

  exampleElement.addEventListener("click", () => {
    try {
      const currentLanguage = getCurrentLanguage();
      const exampleData = generateRandomExample(currentLanguage);
      displayExample(exampleData);

      // Add a small animation to show it's changed
      exampleElement.classList.add("refreshed");
      setTimeout(() => {
        exampleElement.classList.remove("refreshed");
      }, 500);
    } catch (e) {
      console.error('Error refreshing example:', e);
    }
  });
}

/**
 * Sets up language selector functionality
 * @param {Function} setLanguage - Function to set the language
 */
export function setupLanguageSelector(setLanguage) {
  const langButtonEl = document.querySelector(".language-button");
  const languageDropdown = document.getElementById("languageDropdown");

  if (!langButtonEl || !languageDropdown) return;

  langButtonEl.setAttribute("role", "button");
  langButtonEl.setAttribute("tabindex", "0");
  langButtonEl.setAttribute("aria-haspopup", "menu");
  langButtonEl.setAttribute("aria-controls", "languageDropdown");
  langButtonEl.setAttribute("aria-expanded", "false");

  langButtonEl.onclick = function (e) {
    e.preventDefault();
    const willOpen = !languageDropdown.classList.contains("active");
    languageDropdown.classList.toggle("active");
    langButtonEl.setAttribute("aria-expanded", willOpen ? "true" : "false");
    if (willOpen) {
      const firstItem = languageDropdown.querySelector("a");
      if (firstItem) firstItem.focus();
    }
  };

  // Keyboard support
  langButtonEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      langButtonEl.click();
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const firstItem = languageDropdown.querySelector("a");
      if (firstItem) firstItem.focus();
    }
    if (e.key === "Escape") {
      languageDropdown.classList.remove("active");
      langButtonEl.setAttribute("aria-expanded", "false");
    }
  });

  // Set up language selection
  const languageLinks = document.querySelectorAll(".language-dropdown a");
  languageLinks.forEach((link) => {
    link.setAttribute("role", "menuitem");
    link.setAttribute("tabindex", "-1");
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const lang = e.target.getAttribute("data-lang");
      setLanguage(lang);
      languageDropdown.classList.remove("active");
      langButtonEl.setAttribute("aria-expanded", "false");
    });

    link.addEventListener("keydown", (e) => {
      const items = Array.from(document.querySelectorAll(".language-dropdown a"));
      const idx = items.indexOf(e.currentTarget);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = items[(idx + 1) % items.length];
        next && next.focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = items[(idx - 1 + items.length) % items.length];
        prev && prev.focus();
      } else if (e.key === "Escape") {
        languageDropdown.classList.remove("active");
        langButtonEl.setAttribute("aria-expanded", "false");
        langButtonEl.focus();
      }
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".language-selector")) {
      languageDropdown.classList.remove("active");
      langButtonEl.setAttribute("aria-expanded", "false");
    }
  });
}