// Router module for the "Everything is Four" application
// Handles URL routing, parameter parsing, history management, and SEO meta tags

import { getPathLength } from './algorithm.js';
import { languageData, SUPPORTED_LANGS } from './language-data.js';
import { buildWordPath, getBasePath, safeDecodeURIComponent } from './utils.js';

/**
 * Checks URL parameters and loads word/language if present
 * @param {Function} setLanguage - Function to set the language
 * @param {Function} setWordInput - Function to set word input value
 * @param {Function} checkWord - Function to check the word
 * @param {Function} updateMetaTags - Function to update meta tags
 */
export function checkUrlParameters(setLanguage, setWordInput, checkWord, updateMetaTags) {
  // Respect deployments under a base path
  const parts = window.location.pathname.split("/").filter(Boolean);
  const baseParts = getBasePath(SUPPORTED_LANGS).split("/").filter(Boolean);
  const pp = parts.slice(baseParts.length);

  let suppressPushState = true;

  if (pp.length >= 1) {
    let lang = "en";
    let word = "";
    if (pp.length >= 2 && SUPPORTED_LANGS.has(pp[0])) {
      lang = pp[0];
      word = safeDecodeURIComponent(pp[1]);
    } else if (pp.length >= 1) {
      word = safeDecodeURIComponent(pp[0]);
      lang = "en";
    }
    if (languageData[lang] && word) {
      setLanguage(lang);
      setWordInput(word);
      updateMetaTags(lang, word);
      checkWord(suppressPushState);
      return;
    }
  }

  // Fallback: check for traditional query parameters
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("word")) {
    const word = urlParams.get("word");
    setWordInput(word);

    // Set language if specified
    if (urlParams.has("lang")) {
      const lang = urlParams.get("lang");
      if (languageData[lang]) {
        setLanguage(lang);
      }
    }

    checkWord(suppressPushState);
  }
}

/**
 * Updates browser history state
 * @param {string} currentLanguage - Current language code
 * @param {string} word - The word to add to URL
 */
export function updateBrowserHistory(currentLanguage, word) {
  try {
    const siteBase = window.location.origin + getBasePath(SUPPORTED_LANGS);
    const newPath = buildWordPath(currentLanguage, word);
    const newUrl = siteBase + newPath;
    if (window.location.href !== newUrl) {
      history.pushState({ word, lang: currentLanguage }, "", newUrl);
    }
  } catch (e) {
    // Log but don't show user error for URL update failures
    console.debug('Non-critical URL update error (ignored):', e.message);
  }
}

/**
 * Updates meta tags for SEO when navigating to a specific word
 * @param {string} lang - Language code
 * @param {string} word - The word
 */
export function updateMetaTags(lang, word) {
  try {
    const data = languageData[lang];
    const magicNumber = data.magicNumber;
    const pathLength = getPathLength(word, lang);
    const siteBase = window.location.origin + getBasePath(SUPPORTED_LANGS);

    // Construct proper canonical URL
    let canonicalUrl;
    if (lang === "en") {
      canonicalUrl = `${siteBase}/${encodeURIComponent(word)}`;
    } else {
      canonicalUrl = `${siteBase}/${lang}/${encodeURIComponent(word)}`;
    }

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.setAttribute("href", canonicalUrl);
    }

    // Update hreflang alternates - safely remove existing ones
    document
      .querySelectorAll('link[rel="alternate"]')
      .forEach((el) => {
        try {
          if (el && el.parentNode) {
            el.parentNode.removeChild(el);
          }
        } catch (e) {
          // Ignore harmless DOM removal errors
          console.debug('Harmless DOM removal error (ignored):', e.message);
        }
      });

    ["en", "nl", "de"].forEach((code) => {
      const link = document.createElement("link");
      link.setAttribute("rel", "alternate");
      link.setAttribute("hreflang", code);
      link.setAttribute(
        "href",
        siteBase +
          (code === "en"
            ? `/${encodeURIComponent(word)}`
            : `/${code}/${encodeURIComponent(word)}`),
      );
      document.head.appendChild(link);
    });

    const xdef = document.createElement("link");
    xdef.setAttribute("rel", "alternate");
    xdef.setAttribute("hreflang", "x-default");
    xdef.setAttribute("href", siteBase + `/${encodeURIComponent(word)}`);
    document.head.appendChild(xdef);

    // Update meta description
    let description;
    if (lang === "en") {
      description = `The word "${word}" leads to ${magicNumber} in ${pathLength} steps. Every word eventually leads to four through a simple counting algorithm. Try it yourself!`;
    } else if (lang === "nl") {
      description = `Het woord "${word}" leidt tot ${magicNumber} in ${pathLength} stappen. Elk woord leidt uiteindelijk naar vier via een eenvoudig telalgoritme. Probeer het zelf!`;
    } else if (lang === "de") {
      description = `Das Wort "${word}" führt zu ${magicNumber} in ${pathLength} Schritten. Jedes Wort führt schließlich zu vier durch einen einfachen Zählalgorithmus. Probieren Sie es selbst!`;
    }

    // Update meta tags
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }

    // Update Open Graph tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    let ogDescription = document.querySelector('meta[property="og:description"]');
    let ogUrl = document.querySelector('meta[property="og:url"]');
    let ogImage = document.querySelector('meta[property="og:image"]');

    if (ogTitle) {
      ogTitle.setAttribute(
        "content",
        `${word} → ${magicNumber} | Everything is Four`,
      );
    }
    if (ogDescription) {
      ogDescription.setAttribute("content", description);
    }
    if (ogUrl) {
      ogUrl.setAttribute("content", canonicalUrl);
    }
    if (ogImage) {
      ogImage.setAttribute("content", `${siteBase}/og-image.png`);
    }

    // Update Twitter tags
    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    let twitterDescription = document.querySelector('meta[name="twitter:description"]');
    let twitterUrl = document.querySelector('meta[name="twitter:url"]');
    let twitterImage = document.querySelector('meta[name="twitter:image"]');

    if (twitterTitle) {
      twitterTitle.setAttribute(
        "content",
        `${word} → ${magicNumber} | Everything is Four`,
      );
    }
    if (twitterDescription) {
      twitterDescription.setAttribute("content", description);
    }
    if (twitterUrl) {
      twitterUrl.setAttribute("content", canonicalUrl);
    }
    if (twitterImage) {
      twitterImage.setAttribute("content", `${siteBase}/og-image.png`);
    }

    // Update page title
    document.title = `${word} → ${magicNumber} | Everything is Four`;
  } catch (e) {
    // Log but don't show user error for meta tag update failures
    console.debug('Non-critical meta tag update error (ignored):', e.message);
  }
}

/**
 * Sets up browser history navigation (back/forward buttons)
 * @param {Function} setLanguage - Function to set the language
 * @param {Function} setWordInput - Function to set word input value
 * @param {Function} checkWord - Function to check the word
 */
export function setupHistoryNavigation(setLanguage, setWordInput, checkWord) {
  window.onpopstate = (e) => {
    const state = e.state;
    if (state && state.word && state.lang) {
      if (languageData[state.lang]) setLanguage(state.lang);
      setWordInput(state.word);
      checkWord(true); // suppressPushState = true
    }
  };
}