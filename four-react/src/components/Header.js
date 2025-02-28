import React, { useState, useEffect, useRef } from 'react';
import { languageData } from '../data';
import './Header.css';

const Header = ({ currentLanguage, setCurrentLanguage, theme, toggleTheme }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (lang) => {
    setCurrentLanguage(lang);
    setDropdownOpen(false);
  };

  return (
    <header className="header">
      <div className="top-controls">
        <div className="language-selector" ref={dropdownRef}>
          <div 
            className="language-button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <span>{languageData[currentLanguage].name}</span>
            <span className="dropdown-arrow">▼</span>
          </div>
          {dropdownOpen && (
            <div className="language-dropdown">
              {Object.keys(languageData).map(lang => (
                <button 
                  key={lang} 
                  onClick={() => handleLanguageChange(lang)}
                  className={lang === currentLanguage ? 'active' : ''}
                >
                  {languageData[lang].name}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode">
          {theme === 'dark' ? (
            <svg className="sun-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
          ) : (
            <svg className="moon-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          )}
        </button>
      </div>
      
      <div className="title-container">
        <h1>
          <span>{languageData[currentLanguage].ui.title}</span>{' '}
          <span className="highlight">{languageData[currentLanguage].magicNumber.toUpperCase()}</span>
        </h1>
        <p className="tagline">{languageData[currentLanguage].ui.tagline}</p>
      </div>
    </header>
  );
};

export default Header;