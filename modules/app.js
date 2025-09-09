// Main application module for the "Everything is Four" application
// Orchestrates all other modules and handles application lifecycle

import { calculatePath } from './algorithm.js';
import { exampleWords, languageData } from './language-data.js';
import {
  checkUrlParameters,
  setupHistoryNavigation,
  updateBrowserHistory,
  updateMetaTags
} from './router.js';
import { setupShareButton } from './share-manager.js';
import {
  displayPath,
  setupExampleRefresh,
  setupLanguageSelector,
  setupThemeToggle,
  showError,
  updateUI
} from './ui-manager.js';
import { detectLanguage, validateCriticalElements, validateInput } from './utils.js';

/**
 * Main Application class that orchestrates the entire application
 */
class App {
  constructor() {
    this.currentLanguage = "en";
    this.suppressPushState = false;
    this.elements = {};
  }

  /**
   * Initializes the application
   */
  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => this.start());
    } else {
      this.start();
    }
  }

  /**
   * Starts the application after DOM is ready
   */
  start() {
    // Get and validate critical DOM elements
    this.elements = {
      wordInput: document.getElementById("wordInput"),
      checkButton: document.getElementById("checkButton"),
      pathContainer: document.getElementById("pathContainer"),
      conclusion: document.getElementById("conclusion"),
      languageButton: document.getElementById("currentLanguage"),
      languageDropdown: document.getElementById("languageDropdown"),
      languageDisplay: document.getElementById("languageDisplay")
    };

    // Validate critical elements
    const missingElements = validateCriticalElements(this.elements, this.currentLanguage);
    if (missingElements.length > 0) {
      return; // Stop execution if critical elements are missing
    }

    // Initialize language detection
    this.initLanguage();

    // Set up all features
    this.setupEventHandlers();
    this.setupFeatures();

    // Check URL parameters for initial state
    checkUrlParameters(
      (lang) => this.setLanguage(lang),
      (word) => this.setWordInput(word),
      (suppressPushState) => this.checkWord(suppressPushState),
      (lang, word) => updateMetaTags(lang, word)
    );

    // Set up browser history navigation
    setupHistoryNavigation(
      (lang) => this.setLanguage(lang),
      (word) => this.setWordInput(word),
      (suppressPushState) => this.checkWord(suppressPushState)
    );

    // Focus input on page load
    if (this.elements.wordInput) {
      this.elements.wordInput.focus();
    }
  }

  /**
   * Initializes language detection and UI
   */
  initLanguage() {
    // Detect and set initial language
    this.currentLanguage = detectLanguage(languageData);
    updateUI(this.currentLanguage);

    // Set up language switcher
    setupLanguageSelector((lang) => this.setLanguage(lang));
  }

  /**
   * Sets up all application features
   */
  setupFeatures() {
    // Theme toggle
    setupThemeToggle();

    // Example refresh functionality
    setupExampleRefresh(() => this.currentLanguage);

    // Share functionality
    setupShareButton(
      () => this.getCurrentWord(),
      () => this.currentLanguage
    );
  }

  /**
   * Sets up event handlers for user interactions
   */
  setupEventHandlers() {
    // Check button click
    if (this.elements.checkButton) {
      this.elements.checkButton.addEventListener("click", () => this.checkWord());
    }

    // Enter key on input
    if (this.elements.wordInput) {
      this.elements.wordInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          this.checkWord();
        }
      });
    }

    // Word suggestion button
    const suggestButton = document.getElementById("suggestButton");
    if (suggestButton) {
      suggestButton.addEventListener("click", () => this.suggestRandomWord());
    }
  }

  /**
   * Sets the application language
   * @param {string} lang - Language code
   */
  setLanguage(lang) {
    this.currentLanguage = lang;
    updateUI(lang);
  }

  /**
   * Sets the word input value
   * @param {string} word - Word to set
   */
  setWordInput(word) {
    if (this.elements.wordInput) {
      this.elements.wordInput.value = word;
    }
  }

  /**
   * Gets the current word from input
   * @returns {string} Current word
   */
  getCurrentWord() {
    return this.elements.wordInput ? this.elements.wordInput.value.trim() : '';
  }

  /**
   * Processes a word and displays the path to the magic number
   * @param {boolean} suppressPushState - Whether to suppress URL updates
   */
  checkWord(suppressPushState = false) {
    const word = this.getCurrentWord();

    // Input validation
    if (!validateInput(word)) {
      console.warn('Invalid input:', word);
      const errorMessage = languageData[this.currentLanguage].ui.errors.invalidInput;
      showError(errorMessage);
      return;
    }

    if (word.length === 0) {
      return;
    }

    try {
      // Reset the display
      if (this.elements.conclusion) {
        this.elements.conclusion.classList.add("hidden");
      }

      // Calculate and display the path - this is the critical operation
      const path = calculatePath(word, this.currentLanguage);
      displayPath(path);
    } catch (e) {
      console.error('Critical error in word processing:', {
        error: e,
        message: e.message,
        stack: e.stack,
        currentLanguage: this.currentLanguage,
        word: word
      });
      const errorMessage = languageData[this.currentLanguage].ui.errors.generalError;
      showError(errorMessage);
      return; // Don't proceed with URL/meta updates if core processing failed
    }

    // Handle URL and meta updates separately - these are non-critical supplementary operations
    if (!suppressPushState) {
      updateBrowserHistory(this.currentLanguage, word);
      updateMetaTags(this.currentLanguage, word);
    }
  }

  /**
   * Suggests a random word from the current language's example words
   */
  suggestRandomWord() {
    const currentLangWords = exampleWords[this.currentLanguage];
    if (currentLangWords && currentLangWords.length > 0) {
      const randomWord = currentLangWords[Math.floor(Math.random() * currentLangWords.length)];
      this.setWordInput(randomWord);
      this.checkWord();
    }
  }
}

// Create and initialize the application
const app = new App();
app.init();

// Export the app instance for potential external access
export default app;