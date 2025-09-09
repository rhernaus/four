// Share Manager module for the "Everything is Four" application
// Handles social sharing functionality, share dialog, and clipboard operations

import { getPathLength } from './algorithm.js';
import { languageData } from './language-data.js';
import { buildWordPath, getBasePath } from './utils.js';

/**
 * Initiates sharing of a word result
 * @param {string} word - The word to share
 * @param {string} currentLanguage - Current language code
 */
export function shareResult(word, currentLanguage) {
  if (!word) return;

  // Create share text
  const lang = languageData[currentLanguage];
  const magicNumber = lang.magicNumber;

  // Localized share text based on current language
  let shareText;
  if (currentLanguage === "nl") {
    shareText = `Ik heb ontdekt dat "${word}" leidt tot "${magicNumber}" in ${getPathLength(word, currentLanguage)} stappen! Probeer het zelf:`;
  } else if (currentLanguage === "de") {
    shareText = `Ich habe entdeckt, dass "${word}" zu "${magicNumber}" in ${getPathLength(word, currentLanguage)} Schritten führt! Probieren Sie es selbst:`;
  } else {
    shareText = `I discovered that "${word}" leads to "${magicNumber}" in ${getPathLength(word, currentLanguage)} steps! Try it yourself:`;
  }

  // Create clean URL structure respecting base path
  const siteBase = window.location.origin + getBasePath(new Set(["en", "nl", "de"]));
  const shareUrl = siteBase + buildWordPath(currentLanguage, word);

  // Use custom share dialog on desktop, Web Share API on mobile
  if (
    navigator.share &&
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    )
  ) {
    // Mobile device with Web Share API
    navigator
      .share({
        title:
          currentLanguage === "de"
            ? "Alles ist Vier"
            : currentLanguage === "nl"
              ? "Alles is Vier"
              : "Everything is Four",
        text: shareText,
        url: shareUrl,
      })
      .catch((error) => {
        showShareDialog(shareText, shareUrl);
      });
  } else {
    // Desktop - show custom dialog
    showShareDialog(shareText, shareUrl);
  }
}

/**
 * Shows the custom share dialog
 * @param {string} shareText - Text to share
 * @param {string} shareUrl - URL to share
 */
export function showShareDialog(shareText, shareUrl) {
  const shareDialog = document.getElementById("shareDialog");
  const shareUrlInput = document.getElementById("shareUrl");
  const closeShareDialog = document.getElementById("closeShareDialog");
  const copyShareUrl = document.getElementById("copyShareUrl");
  const copySuccess = document.getElementById("copySuccess");
  const dialogContent = document.querySelector(".share-dialog-content");

  if (!shareDialog || !shareUrlInput || !closeShareDialog || !copyShareUrl || !copySuccess || !dialogContent) {
    console.warn('Share dialog elements not found');
    return;
  }

  let previouslyFocused = document.activeElement;

  // Set the URL in the input field
  shareUrlInput.value = shareUrl;

  // Show the dialog
  shareDialog.classList.add("active");
  shareDialog.classList.remove("hidden");
  // Focus the close button for accessibility
  closeShareDialog.focus();

  // Handle copy button
  copyShareUrl.onclick = async function () {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(shareUrlInput.value);
      } else {
        // Fallback
        shareUrlInput.select();
        document.execCommand("copy");
      }
      copySuccess.classList.remove("hidden");
      setTimeout(() => {
        copySuccess.classList.add("hidden");
      }, 3000);
    } catch (err) {
      // Fallback on error
      shareUrlInput.select();
      document.execCommand("copy");
      copySuccess.classList.remove("hidden");
      setTimeout(() => {
        copySuccess.classList.add("hidden");
      }, 3000);
    }
  };

  function closeModal() {
    shareDialog.classList.remove("active");
    setTimeout(() => {
      shareDialog.classList.add("hidden");
      if (
        previouslyFocused &&
        typeof previouslyFocused.focus === "function"
      ) {
        previouslyFocused.focus();
      }
    }, 300);
  }

  // Handle close button
  closeShareDialog.onclick = closeModal;

  // Handle social platform buttons
  const shareTwitter = document.getElementById("shareTwitter");
  if (shareTwitter) {
    shareTwitter.onclick = function () {
      const newWin = window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
        "_blank",
        "noopener,noreferrer"
      );
      if (newWin) newWin.opener = null;
    };
  }

  const shareFacebook = document.getElementById("shareFacebook");
  if (shareFacebook) {
    shareFacebook.onclick = function () {
      const newWin = window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
        "_blank",
        "noopener,noreferrer"
      );
      if (newWin) newWin.opener = null;
    };
  }

  const shareEmail = document.getElementById("shareEmail");
  if (shareEmail) {
    shareEmail.onclick = function () {
      window.location.href = `mailto:?subject=Everything is Four&body=${encodeURIComponent(shareText + " " + shareUrl)}`;
    };
  }

  // Close on background click
  shareDialog.onclick = function (event) {
    if (event.target === shareDialog) {
      closeModal();
    }
  };

  // Trap focus inside dialog
  const focusable = dialogContent.querySelectorAll(
    'a[href], button, textarea, input, select, [tabindex]:not([tabindex="-1"])',
  );
  const firstFocusable = focusable[0];
  const lastFocusable = focusable[focusable.length - 1];

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      closeModal();
    }
    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault();
          lastFocusable.focus();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault();
          firstFocusable.focus();
        }
      }
    }
  };

  shareDialog.addEventListener("keydown", handleKeyDown);

  // Clean up event listener when dialog closes
  const originalCloseModal = closeModal;
  closeModal = function() {
    shareDialog.removeEventListener("keydown", handleKeyDown);
    originalCloseModal();
  };
}

/**
 * Sets up share button functionality
 * @param {Function} getCurrentWord - Function to get current word
 * @param {Function} getCurrentLanguage - Function to get current language
 */
export function setupShareButton(getCurrentWord, getCurrentLanguage) {
  const shareButton = document.getElementById("shareButton");
  if (!shareButton) return;

  shareButton.addEventListener("click", () => {
    const word = getCurrentWord();
    const currentLanguage = getCurrentLanguage();
    shareResult(word, currentLanguage);
  });
}