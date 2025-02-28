import React, { useState, useEffect } from 'react';
import './App.css';
import { languageData, exampleWords } from './data';
import Header from './components/Header';
import Demo from './components/Demo';
import Explanation from './components/Explanation';

function App() {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [theme, setTheme] = useState('light');
  const [word, setWord] = useState('');
  const [path, setPath] = useState([]);
  const [showConclusion, setShowConclusion] = useState(false);

  // Initialize theme from local storage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
      setTheme('dark');
      document.body.setAttribute('data-theme', 'dark');
    }
  }, []);

  // Check URL parameters on mount
  useEffect(() => {
    checkUrlParameters();
  }, []);

  // Count letters in a word based on current language
  const countLetters = (word) => {
    // Remove spaces, hyphens, and other non-alphabetic characters
    return word.replace(/[^a-zA-Z\u00C0-\u017F\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/g, '').length;
  };

  // Convert number to word in current language
  const convertNumberToWord = (num) => {
    const numberWords = languageData[currentLanguage].numberWords;
    
    if (num <= 20) {
      return numberWords[num];
    }
    
    if (num < 100) {
      const tens = Math.floor(num / 10) * 10;
      const ones = num % 10;
      
      // Handle language-specific composition rules
      if (currentLanguage === 'en' || currentLanguage === 'de') {
        return ones > 0 ? `${numberWords[tens]}-${numberWords[ones]}` : numberWords[tens];
      } else {
        // Default for other languages
        return ones > 0 ? `${numberWords[tens]}${numberWords[ones]}` : numberWords[tens];
      }
    }
    
    if (num === 100) {
      return numberWords[num];
    }
    
    // Handle larger numbers as needed
    return num.toString();
  };

  // Calculate path for a word
  const calculatePath = (word) => {
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
      const letterCount = countLetters(currentWord);
      const numberAsWord = convertNumberToWord(letterCount);
      path.push(letterCount);
      currentWord = numberAsWord;
      iterations++;
    }
    
    // Add the magic number to the end if not already there
    if (currentWord === magicNumber) {
      path.push(currentWord);
      path.push(magicValue); // The count for the magic number
      path.push(currentWord); // And back to the magic number again
    }
    
    return path;
  };

  // Check a word and calculate its path
  const checkWord = (word) => {
    if (!word || word.trim() === '') return;
    
    // Reset state
    setShowConclusion(false);
    
    // Calculate and set the path
    const newPath = calculatePath(word);
    setPath(newPath);
    
    // Show conclusion with a slight delay
    setTimeout(() => {
      setShowConclusion(true);
    }, newPath.length * 300);
  };

  // Suggest a random word in current language
  const suggestRandomWord = () => {
    const currentLangWords = exampleWords[currentLanguage];
    const randomWord = currentLangWords[Math.floor(Math.random() * currentLangWords.length)];
    setWord(randomWord);
    checkWord(randomWord);
  };

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Check URL parameters
  const checkUrlParameters = () => {
    // First, check if we're using the new URL format
    const pathname = window.location.pathname;
    const pathParts = pathname.split('/').filter(part => part !== '');
    
    if (pathParts.length >= 1) {
      let lang = 'en';  // Default language
      let urlWord = '';
      
      // Check if the first part is a language code
      if (pathParts.length >= 2 && Object.keys(languageData).includes(pathParts[0])) {
        lang = pathParts[0];
        urlWord = decodeURIComponent(pathParts[1]);
      } else {
        // Single part - just the word
        urlWord = decodeURIComponent(pathParts[0]);
      }
      
      // Set language
      if (languageData[lang]) {
        setCurrentLanguage(lang);
      }
      
      // Set and check word
      if (urlWord) {
        setWord(urlWord);
        checkWord(urlWord);
        return; // We've handled the URL, no need to check query params
      }
    }
    
    // Fallback: check for traditional query parameters
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('word')) {
      const urlWord = urlParams.get('word');
      setWord(urlWord);
      
      // Set language if specified
      if (urlParams.has('lang')) {
        const lang = urlParams.get('lang');
        if (languageData[lang]) {
          setCurrentLanguage(lang);
        }
      }
      
      // Process the word
      checkWord(urlWord);
    }
  };

  // Share result
  const shareResult = () => {
    if (!word) return;
    
    // Get language-specific data
    const lang = languageData[currentLanguage];
    const magicNumber = lang.magicNumber;
    
    // Localized share text based on current language
    let shareText;
    if (currentLanguage === 'nl') {
      shareText = `Ik heb ontdekt dat "${word}" leidt tot "${magicNumber}" in ${Math.floor(path.length / 2)} stappen! Probeer het zelf:`;
    } else if (currentLanguage === 'de') {
      shareText = `Ich habe entdeckt, dass "${word}" zu "${magicNumber}" in ${Math.floor(path.length / 2)} Schritten führt! Probieren Sie es selbst:`;
    } else {
      shareText = `I discovered that "${word}" leads to "${magicNumber}" in ${Math.floor(path.length / 2)} steps! Try it yourself:`;
    }
    
    // Create clean URL structure
    let basePath = window.location.origin;
    
    // If currentLanguage is English (default), don't include language in the path
    let shareUrl;
    if (currentLanguage === 'en') {
      shareUrl = `${basePath}/${encodeURIComponent(word)}`;
    } else {
      shareUrl = `${basePath}/${currentLanguage}/${encodeURIComponent(word)}`;
    }
    
    // Share using Web Share API if available, otherwise show custom dialog
    if (navigator.share && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      navigator.share({
        title: currentLanguage === 'de' ? 'Alles ist Vier' : 
               currentLanguage === 'nl' ? 'Alles is Vier' : 
               'Everything is Four',
        text: shareText,
        url: shareUrl
      }).catch(error => {
        // Fallback to copy to clipboard
        navigator.clipboard.writeText(shareUrl);
        alert('URL copied to clipboard!');
      });
    } else {
      // Fallback to copy to clipboard for desktop
      navigator.clipboard.writeText(shareUrl);
      alert('URL copied to clipboard!');
    }
  };

  return (
    <div className="app-container">
      <Header 
        currentLanguage={currentLanguage} 
        setCurrentLanguage={setCurrentLanguage} 
        theme={theme} 
        toggleTheme={toggleTheme}
      />
      <main className="main-content">
        <Demo 
          word={word}
          setWord={setWord}
          checkWord={() => checkWord(word)}
          suggestRandomWord={suggestRandomWord}
          path={path}
          showConclusion={showConclusion}
          shareResult={shareResult}
          currentLanguage={currentLanguage}
        />
        <Explanation currentLanguage={currentLanguage} />
      </main>
      <footer>
        <p>{languageData[currentLanguage].ui.footer}</p>
      </footer>
    </div>
  );
}

export default App;