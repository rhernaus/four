// Core algorithm module for the "Everything is Four" application
// Contains the main calculation logic for converting words to the path leading to "four"

import { languageData } from './language-data.js';

/**
 * Converts a number to its word representation in the current language
 * @param {number} num - The number to convert
 * @param {string} currentLanguage - The current language code
 * @returns {string} The word representation of the number
 */
export function convertNumberToWord(num, currentLanguage) {
  try {
    const data = languageData[currentLanguage];
    if (!data || !data.numberWords) {
      console.error('Language data missing for:', currentLanguage);
      return num.toString();
    }

    const numberWords = data.numberWords;

    if (num <= 20) {
      const result = numberWords[num];
      if (!result) {
        console.error('Number word missing for:', num, 'in language:', currentLanguage);
        return num.toString();
      }
      return result;
    }

    if (num < 100) {
      const tens = Math.floor(num / 10) * 10;
      const ones = num % 10;

      // Handle language-specific composition rules
      if (currentLanguage === "en" || currentLanguage === "de") {
        return ones > 0
          ? `${numberWords[tens]}-${numberWords[ones]}`
          : numberWords[tens];
      } else {
        // Default hyphenation for other languages
        return ones > 0
          ? `${numberWords[tens]}${numberWords[ones]}`
          : numberWords[tens];
      }
    }

    if (num === 100) {
      return numberWords[num];
    }

    // Handle larger numbers as needed
    return num.toString();
  } catch (e) {
    console.error('Error in convertNumberToWord:', e, 'num:', num, 'lang:', currentLanguage);
    return num.toString();
  }
}

/**
 * Counts the letters in a word, handling different language requirements
 * @param {string} word - The word to count letters for
 * @param {string} currentLanguage - The current language code
 * @returns {number} The number of letters in the word
 */
export function countLetters(word, currentLanguage) {
  // For Asian languages, count characters directly
  if (currentLanguage === "zh" || currentLanguage === "ja") {
    return word.length;
  }

  // For other languages, remove spaces, hyphens, and other non-alphabetic characters
  // We use a more inclusive regex to handle accented characters
  return word.replace(
    /[^a-zA-Z\u00C0-\u017F\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/g,
    "",
  ).length;
}

/**
 * Calculates the path from a word to the magic number for the current language
 * @param {string} word - The starting word
 * @param {string} currentLanguage - The current language code
 * @returns {Array} Array representing the path from word to magic number
 */
export function calculatePath(word, currentLanguage) {
  const path = [];
  const data = languageData[currentLanguage];
  let currentWord = word.toLowerCase().trim();
  const magicNumber = data.magicNumber;
  const magicValue = data.magicNumberValue;

  // Prevent infinite loops
  const maxIterations = 20;
  let iterations = 0;

  while (currentWord !== magicNumber && iterations < maxIterations) {
    path.push(currentWord);
    const letterCount = countLetters(currentWord, currentLanguage);
    const numberAsWord = convertNumberToWord(letterCount, currentLanguage);
    path.push(letterCount);
    currentWord = numberAsWord;
    iterations++;
  }

  // Add the magic number to the end if not already there
  if (currentWord === magicNumber) {
    path.push(currentWord);
  }

  return path;
}

/**
 * Gets the path length (number of steps) for a word
 * @param {string} word - The word to calculate path length for
 * @param {string} currentLanguage - The current language code
 * @returns {number} The number of steps to reach the magic number
 */
export function getPathLength(word, currentLanguage) {
  const path = calculatePath(word, currentLanguage);
  // Divide by 2 because the path includes both words and numbers
  return Math.floor(path.length / 2);
}