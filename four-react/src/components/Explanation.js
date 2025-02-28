import React, { useState, useEffect } from 'react';
import { languageData, exampleWords } from '../data';
import './Explanation.css';

const Explanation = ({ currentLanguage }) => {
  const [examplePath, setExamplePath] = useState('');
  
  // Generate a random example path for the current language
  useEffect(() => {
    generateRandomExample();
  }, [currentLanguage]);
  
  const generateRandomExample = () => {
    const data = languageData[currentLanguage];
    const words = exampleWords[currentLanguage];
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
      const letterCount = countLetters(currentWord);
      const numberAsWord = convertNumberToWord(letterCount, currentLanguage);
      currentWord = numberAsWord;
      iterations++;
    }
    
    if (currentWord === magicNumber) {
      path.push(magicNumber);
    }
    
    // Format the path as HTML
    let exampleHTML = '';
    
    for (let i = 0; i < path.length; i++) {
      exampleHTML += `<span class="word">${path[i]}</span>`;
      if (i < path.length - 1) {
        exampleHTML += ' → ';
      }
    }
    
    setExamplePath(exampleHTML);
  };

  // Count letters in a word
  const countLetters = (word) => {
    return word.replace(/[^a-zA-Z\u00C0-\u017F\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/g, '').length;
  };

  // Convert number to word
  const convertNumberToWord = (num, lang) => {
    const numberWords = languageData[lang].numberWords;
    
    if (num <= 20) {
      return numberWords[num];
    }
    
    if (num < 100) {
      const tens = Math.floor(num / 10) * 10;
      const ones = num % 10;
      
      // Handle language-specific composition rules
      if (lang === 'en' || lang === 'de') {
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

  return (
    <section className="explanation">
      <h2>{languageData[currentLanguage].ui.howItWorks}</h2>
      <div className="steps">
        <div className="step">
          <div className="step-number">1</div>
          <p>{languageData[currentLanguage].ui.step1}</p>
        </div>
        <div className="step">
          <div className="step-number">2</div>
          <p>{languageData[currentLanguage].ui.step2}</p>
        </div>
        <div className="step">
          <div className="step-number">3</div>
          <p>{languageData[currentLanguage].ui.step3}</p>
        </div>
        <div className="step">
          <div className="step-number">4</div>
          <p dangerouslySetInnerHTML={{ 
            __html: languageData[currentLanguage].ui.step4.replace(
              `"${languageData[currentLanguage].magicNumber}"`, 
              `"<span class="highlight">${languageData[currentLanguage].magicNumber}</span>"`
            )
          }} />
        </div>
      </div>
      <div className="example" onClick={generateRandomExample}>
        <p>
          {currentLanguage === 'en' ? 'Example: ' : 
           currentLanguage === 'nl' ? 'Voorbeeld: ' :
           currentLanguage === 'de' ? 'Beispiel: ' : 'Example: '}
          <span dangerouslySetInnerHTML={{ __html: examplePath }} />
        </p>
      </div>
    </section>
  );
};

export default Explanation;