import React from 'react';
import { languageData } from '../data';
import './Demo.css';

const Demo = ({ 
  word, 
  setWord, 
  checkWord, 
  suggestRandomWord, 
  path, 
  showConclusion,
  shareResult,
  currentLanguage
}) => {
  
  const handleInputChange = (e) => {
    setWord(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      checkWord();
    }
  };

  // Render a step item for the path visualization
  const renderStepItem = (item, index, isLast) => {
    const isNumber = typeof item === 'number';
    
    return (
      <div key={index} className="step-item">
        <div className={`word-box ${isLast ? 'final' : ''}`}>
          {item}
        </div>
        
        {!isLast && (
          <div className="arrow">→</div>
        )}
      </div>
    );
  };

  return (
    <section className="demo">
      <div className="input-container">
        <input 
          type="text" 
          value={word}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder={languageData[currentLanguage].ui.inputPlaceholder}
        />
        <button onClick={checkWord}>
          {languageData[currentLanguage].ui.checkButton}
        </button>
        <button onClick={suggestRandomWord} className="suggest-button">
          {languageData[currentLanguage].ui.suggestButton}
        </button>
      </div>
      
      <div className="results">
        <div className="path-container">
          {path.map((item, index) => 
            renderStepItem(item, index, index === path.length - 1)
          )}
        </div>
        
        {showConclusion && (
          <div className="conclusion">
            <p dangerouslySetInnerHTML={{ 
              __html: languageData[currentLanguage].ui.conclusion.replace(
                languageData[currentLanguage].magicNumber.toUpperCase(),
                `<span class="highlight">${languageData[currentLanguage].magicNumber.toUpperCase()}</span>`
              )
            }} />
            
            <div className="action-buttons">
              <button onClick={shareResult} className="action-btn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                  <polyline points="16 6 12 2 8 6"></polyline>
                  <line x1="12" y1="2" x2="12" y2="15"></line>
                </svg>
                {languageData[currentLanguage].ui.shareButton}
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Demo;