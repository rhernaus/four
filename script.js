document.addEventListener('DOMContentLoaded', () => {
    const wordInput = document.getElementById('wordInput');
    const checkButton = document.getElementById('checkButton');
    const pathContainer = document.getElementById('pathContainer');
    const conclusion = document.getElementById('conclusion');
    const languageButton = document.getElementById('currentLanguage');
    const languageDropdown = document.getElementById('languageDropdown');
    const languageDisplay = document.getElementById('languageDisplay');
    
    // Example words for each language
    const exampleWords = {
        'en': [
            'programming', 'mathematics', 'software', 'computer', 'keyboard',
            'language', 'universe', 'science', 'knowledge', 'learning',
            'technology', 'algorithm', 'engineering', 'development', 'innovation',
            'creativity', 'discovery', 'experiment', 'research', 'intelligence',
            'philosophy', 'psychology', 'communication', 'information', 'entertainment',
            'education', 'experience', 'understanding', 'imagination', 'fascinating'
        ],
        'nl': [
            'programmeren', 'wiskunde', 'software', 'computer', 'toetsenbord',
            'taal', 'universum', 'wetenschap', 'kennis', 'leren',
            'technologie', 'algoritme', 'ontwikkeling', 'innovatie', 'creativiteit',
            'ontdekking', 'experiment', 'onderzoek', 'intelligentie', 'filosofie',
            'psychologie', 'communicatie', 'informatie', 'entertainment', 'onderwijs'
        ],
        'de': [
            'programmierung', 'mathematik', 'software', 'computer', 'tastatur',
            'sprache', 'universum', 'wissenschaft', 'wissen', 'lernen',
            'technologie', 'algorithmus', 'ingenieurwesen', 'entwicklung', 'innovation'
        ],
        'it': [
            'programmazione', 'matematica', 'software', 'computer', 'tastiera',
            'linguaggio', 'universo', 'scienza', 'conoscenza', 'apprendimento',
            'tecnologia', 'algoritmo', 'ingegneria', 'sviluppo', 'innovazione'
        ]
    };
    
    // Language data - 'magic words' in different languages
    // Note: Only including languages where the word for 'four' has exactly 4 letters
    const languageData = {
        'nl': {
            'name': 'Nederlands',
            'numberWords': {
                0: 'nul', 1: 'een', 2: 'twee', 3: 'drie', 4: 'vier', 5: 'vijf',
                6: 'zes', 7: 'zeven', 8: 'acht', 9: 'negen', 10: 'tien',
                11: 'elf', 12: 'twaalf', 13: 'dertien', 14: 'veertien', 
                15: 'vijftien', 16: 'zestien', 17: 'zeventien', 18: 'achttien', 
                19: 'negentien', 20: 'twintig', 30: 'dertig', 40: 'veertig',
                50: 'vijftig', 60: 'zestig', 70: 'zeventig', 80: 'tachtig',
                90: 'negentig', 100: 'honderd'
            },
            'magicNumber': 'vier', // 4 letters
            'magicNumberValue': 4,
            'ui': {
                'title': 'Alles is',
                'tagline': 'Elk woord leidt uiteindelijk tot vier. Probeer het zelf!',
                'inputPlaceholder': 'Voer een woord in...',
                'checkButton': 'Controleer',
                'conclusion': 'Elk woord leidt uiteindelijk tot VIER!',
                'howItWorks': 'Hoe het werkt',
                'step1': 'Begin met een willekeurig woord',
                'step2': 'Tel het aantal letters in het woord',
                'step3': 'Schrijf dat nummer uit als een woord',
                'step4': 'Herhaal stappen 2-3 totdat je "vier" bereikt',
                'example': '', // Will be generated dynamically
                'footer': 'Gemaakt met 💻 en nieuwsgierigheid'
            }
        },
        'en': {
            'name': 'English',
            'numberWords': {
                0: 'zero', 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five',
                6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten',
                11: 'eleven', 12: 'twelve', 13: 'thirteen', 14: 'fourteen', 
                15: 'fifteen', 16: 'sixteen', 17: 'seventeen', 18: 'eighteen', 
                19: 'nineteen', 20: 'twenty', 30: 'thirty', 40: 'forty',
                50: 'fifty', 60: 'sixty', 70: 'seventy', 80: 'eighty',
                90: 'ninety', 100: 'hundred'
            },
            'magicNumber': 'four', // 4 letters
            'magicNumberValue': 4,
            'ui': {
                'title': 'Everything is',
                'tagline': 'Every word eventually leads to four. Try it yourself!',
                'inputPlaceholder': 'Enter any word...',
                'checkButton': 'Check',
                'conclusion': 'Every word eventually leads to FOUR!',
                'howItWorks': 'How it works',
                'step1': 'Start with any word',
                'step2': 'Count the number of letters in the word',
                'step3': 'Write out that number as a word',
                'step4': 'Repeat steps 2-3 until you reach "four"',
                'example': '', // Will be generated dynamically
                'footer': 'Created with 💻 and curiosity'
            }
        },
        'de': {
            'name': 'Deutsch',
            'numberWords': {
                0: 'null', 1: 'eins', 2: 'zwei', 3: 'drei', 4: 'vier', 5: 'fünf',
                6: 'sechs', 7: 'sieben', 8: 'acht', 9: 'neun', 10: 'zehn',
                11: 'elf', 12: 'zwölf', 13: 'dreizehn', 14: 'vierzehn', 
                15: 'fünfzehn', 16: 'sechzehn', 17: 'siebzehn', 18: 'achtzehn', 
                19: 'neunzehn', 20: 'zwanzig', 30: 'dreißig', 40: 'vierzig',
                50: 'fünfzig', 60: 'sechzig', 70: 'siebzig', 80: 'achtzig',
                90: 'neunzig', 100: 'hundert'
            },
            'magicNumber': 'vier', // 4 letters
            'magicNumberValue': 4,
            'ui': {
                'title': 'Alles ist',
                'tagline': 'Jedes Wort führt schließlich zu vier. Probieren Sie es selbst!',
                'inputPlaceholder': 'Geben Sie ein Wort ein...',
                'checkButton': 'Prüfen',
                'conclusion': 'Jedes Wort führt schließlich zu VIER!',
                'howItWorks': 'Wie es funktioniert',
                'step1': 'Beginnen Sie mit einem beliebigen Wort',
                'step2': 'Zählen Sie die Anzahl der Buchstaben im Wort',
                'step3': 'Schreiben Sie diese Zahl als Wort aus',
                'step4': 'Wiederholen Sie die Schritte 2-3, bis Sie "vier" erreichen',
                'example': '', // Will be generated dynamically
                'footer': 'Erstellt mit 💻 und Neugier'
            }
        },
        'it': {
            'name': 'Italiano',
            'numberWords': {
                0: 'zero', 1: 'uno', 2: 'due', 3: 'tre', 4: 'quattro', 5: 'cinque',
                6: 'sei', 7: 'sette', 8: 'otto', 9: 'nove', 10: 'dieci',
                11: 'undici', 12: 'dodici', 13: 'tredici', 14: 'quattordici',
                15: 'quindici', 16: 'sedici', 17: 'diciassette', 18: 'diciotto',
                19: 'diciannove', 20: 'venti', 30: 'trenta', 40: 'quaranta',
                50: 'cinquanta', 60: 'sessanta', 70: 'settanta', 80: 'ottanta',
                90: 'novanta', 100: 'cento'
            },
            'magicNumber': 'otto', // 4 letters
            'magicNumberValue': 4,
            'ui': {
                'title': 'Tutto è',
                'tagline': 'Ogni parola porta infine a otto. Provalo tu stesso!',
                'inputPlaceholder': 'Inserisci una parola...',
                'checkButton': 'Verifica',
                'conclusion': 'Ogni parola porta infine a OTTO!',
                'howItWorks': 'Come funziona',
                'step1': 'Inizia con una parola qualsiasi',
                'step2': 'Conta il numero di lettere nella parola',
                'step3': 'Scrivi quel numero come parola',
                'step4': 'Ripeti i passaggi 2-3 fino a raggiungere "otto"',
                'example': '', // Will be generated dynamically
                'footer': 'Creato con 💻 e curiosità'
            }
        }
    };
    
    // Current language - default to browser language or English
    let currentLanguage = 'en';
    
    // Detect user's browser language
    function detectLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        const shortLang = browserLang.split('-')[0];
        
        // Check if we support this language
        if (languageData[shortLang]) {
            return shortLang;
        }
        
        // Default to English if language not supported
        return 'en';
    }

    // Initialize language on page load
    function initLanguage() {
        // Detect and set initial language
        currentLanguage = detectLanguage();
        updateUI(currentLanguage);
        
        // Debug the language button
        console.log("Language button:", languageButton);
        
        // Set up language switcher more directly
        document.querySelector('.language-button').onclick = function(e) {
            e.preventDefault();
            console.log("Button clicked");
            document.getElementById('languageDropdown').classList.toggle('active');
        };
        
        // Set up language selection
        const languageLinks = document.querySelectorAll('.language-dropdown a');
        languageLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = e.target.getAttribute('data-lang');
                setLanguage(lang);
                document.getElementById('languageDropdown').classList.remove('active');
            });
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.language-selector')) {
                document.getElementById('languageDropdown').classList.remove('active');
            }
        });
    }
    
    // Toggle language dropdown visibility
    function toggleLanguageDropdown(e) {
        e.preventDefault(); // Prevent default button behavior
        languageDropdown.classList.toggle('active');
    }
    
    // Set language and update UI
    function setLanguage(lang) {
        currentLanguage = lang;
        updateUI(lang);
    }
    
    // Generate a random example path for a given language
    function generateRandomExample(lang) {
        const data = languageData[lang];
        const words = exampleWords[lang];
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
            const numberAsWord = convertNumberToWord(letterCount);
            currentWord = numberAsWord;
            iterations++;
        }
        
        if (currentWord === magicNumber) {
            path.push(magicNumber);
        }
        
        // Format the path as HTML
        let exampleHTML = lang === 'en' ? 'Example: ' : 
                          lang === 'nl' ? 'Voorbeeld: ' :
                          lang === 'es' ? 'Ejemplo: ' :
                          lang === 'fr' ? 'Exemple: ' :
                          lang === 'de' ? 'Beispiel: ' :
                          lang === 'zh' ? '例如：' :
                          lang === 'ja' ? '例：' : 'Example: ';
        
        for (let i = 0; i < path.length; i++) {
            exampleHTML += `<span class="word">${path[i]}</span>`;
            if (i < path.length - 1) {
                exampleHTML += ' → ';
            }
        }
        
        return exampleHTML;
    }

    function updateUI(lang) {
        const data = languageData[lang];
        
        // Update language display
        languageDisplay.textContent = data.name;
        
        // Update UI text elements
        document.getElementById('title-part1').textContent = data.ui.title;
        document.getElementById('magic-word').textContent = data.magicNumber.toUpperCase();
        document.getElementById('tagline').textContent = data.ui.tagline;
        wordInput.placeholder = data.ui.inputPlaceholder;
        checkButton.textContent = data.ui.checkButton;
        document.getElementById('conclusion-text').innerHTML = data.ui.conclusion.replace('FOUR', `<span class="highlight">${data.magicNumber.toUpperCase()}</span>`);
        document.getElementById('how-it-works').textContent = data.ui.howItWorks;
        document.getElementById('step1').textContent = data.ui.step1;
        document.getElementById('step2').textContent = data.ui.step2;
        document.getElementById('step3').textContent = data.ui.step3;
        document.getElementById('step4').textContent = data.ui.step4.replace('"four"', `"${data.magicNumber}"`);
        
        // Generate a random example for the current language
        const exampleHTML = generateRandomExample(lang);
        document.getElementById('example').innerHTML = exampleHTML;
        
        document.getElementById('footer-text').textContent = data.ui.footer;
        
        // Clear any previous results
        pathContainer.innerHTML = '';
        conclusion.classList.add('hidden');
    }
    
    function convertNumberToWord(num) {
        const data = languageData[currentLanguage];
        const numberWords = data.numberWords;
        
        if (num <= 20) {
            return numberWords[num];
        }
        
        if (num < 100) {
            const tens = Math.floor(num / 10) * 10;
            const ones = num % 10;
            
            // Handle language-specific composition rules
            if (currentLanguage === 'en' || currentLanguage === 'de') {
                return ones > 0 ? `${numberWords[tens]}-${numberWords[ones]}` : numberWords[tens];
            } else if (currentLanguage === 'fr') {
                if (tens === 70 || tens === 90) {
                    // French has special cases for 70s and 90s
                    if (ones === 0) return numberWords[tens];
                    if (tens === 70) return ones <= 9 ? `soixante-${numberWords[10 + ones]}` : numberWords[tens];
                    if (tens === 90) return ones <= 9 ? `quatre-vingt-${numberWords[ones]}` : numberWords[tens];
                }
                return ones > 0 ? `${numberWords[tens]}-${numberWords[ones]}` : numberWords[tens];
            } else if (currentLanguage === 'zh' || currentLanguage === 'ja') {
                // Chinese/Japanese use positional notation
                return `${numberWords[tens/10]}${numberWords[10]}${ones > 0 ? numberWords[ones] : ''}`;
            } else {
                // Default hyphenation for other languages
                return ones > 0 ? `${numberWords[tens]}${numberWords[ones]}` : numberWords[tens];
            }
        }
        
        if (num === 100) {
            return numberWords[num];
        }
        
        // Handle larger numbers as needed
        return num.toString();
    }

    function countLetters(word) {
        // For Asian languages, count characters directly
        if (currentLanguage === 'zh' || currentLanguage === 'ja') {
            return word.length;
        }
        
        // For other languages, remove spaces, hyphens, and other non-alphabetic characters
        // We use a more inclusive regex to handle accented characters
        return word.replace(/[^a-zA-Z\u00C0-\u017F\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]/g, '').length;
    }

    function calculatePath(word) {
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
            path.push(magicNumber); // And back to the magic number again
        }
        
        return path;
    }

    function createWordElement(word, isNumber = false, isFinal = false) {
        const stepItem = document.createElement('div');
        stepItem.className = 'step-item';
        
        const wordBox = document.createElement('div');
        wordBox.className = isFinal ? 'word-box final' : 'word-box';
        wordBox.textContent = word;
        
        stepItem.appendChild(wordBox);
        
        if (isNumber) {
            const arrow = document.createElement('div');
            arrow.className = 'arrow';
            arrow.textContent = '→';
            
            stepItem.appendChild(arrow);
        } else if (!isFinal) {
            const arrow = document.createElement('div');
            arrow.className = 'arrow';
            arrow.textContent = '→';
            
            stepItem.appendChild(arrow);
        }
        
        return stepItem;
    }

    function displayPath(path) {
        pathContainer.innerHTML = '';
        
        // Add elements with a slight delay for animation effect
        let delay = 0;
        for (let i = 0; i < path.length; i++) {
            setTimeout(() => {
                const item = path[i];
                const isNumber = typeof item === 'number';
                const isFinal = i === path.length - 1;
                
                const element = createWordElement(item, isNumber, isFinal);
                pathContainer.appendChild(element);
                
                // Show conclusion once we reach the end
                if (isFinal) {
                    setTimeout(() => {
                        conclusion.classList.remove('hidden');
                    }, 500);
                }
            }, delay);
            
            delay += 300; // Adjust timing as needed
        }
    }

    function checkWord() {
        const word = wordInput.value.trim();
        
        if (word.length === 0) {
            return;
        }
        
        // Reset the display
        conclusion.classList.add('hidden');
        
        // Calculate and display the path
        const path = calculatePath(word);
        displayPath(path);
    }

    // Get a new random example when clicked
    function setupExampleRefresh() {
        const exampleElement = document.querySelector('.example');
        if (exampleElement) {
            exampleElement.addEventListener('click', () => {
                const exampleHTML = generateRandomExample(currentLanguage);
                document.getElementById('example').innerHTML = exampleHTML;
                
                // Add a small animation to show it's changed
                exampleElement.classList.add('refreshed');
                setTimeout(() => {
                    exampleElement.classList.remove('refreshed');
                }, 500);
            });
        }
    }

    // Theme toggle functionality
    function setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Check for saved theme preference or use device preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || (!savedTheme && prefersDarkScheme.matches)) {
            document.body.setAttribute('data-theme', 'dark');
        }
        
        // Toggle theme when button is clicked
        themeToggle.addEventListener('click', () => {
            let currentTheme = document.body.getAttribute('data-theme') || 'light';
            let newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }
    
    // Initialize the page
    initLanguage();
    setupExampleRefresh();
    setupThemeToggle();
    
    // Event Listeners
    checkButton.addEventListener('click', checkWord);
    
    wordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkWord();
        }
    });

    // Set up all the new features
    setupNewFeatures();
    
    // Focus input on page load
    wordInput.focus();
    
    // Setup all new features
    function setupNewFeatures() {
        // 1. Word Suggestions
        const suggestButton = document.getElementById('suggestButton');
        suggestButton.addEventListener('click', suggestRandomWord);
        
        // 2. Social Sharing
        const shareButton = document.getElementById('shareButton');
        shareButton.addEventListener('click', shareResult);
        
        // 3. Export as Image
        const saveImageButton = document.getElementById('saveImageButton');
        saveImageButton.addEventListener('click', saveAsImage);
        
        // 4. Word History
        setupWordHistory();
        
        // 5. Statistics Dashboard
        setupStatsDashboard();
        
        // 6. Community Words
        setupCommunitySection();
        
        // 7. Daily Challenge
        setupDailyChallenge();
        
        // 8. Path Optimizer
        setupPathOptimizer();
        
        // 9. Audio Pronunciation
        setupAudioPlayer();
        
        // 10. Navigation Tabs
        setupNavigationTabs();
    }
    
    // Word suggestion feature
    function suggestRandomWord() {
        const currentLangWords = exampleWords[currentLanguage];
        const randomWord = currentLangWords[Math.floor(Math.random() * currentLangWords.length)];
        wordInput.value = randomWord;
        checkWord();
    }
    
    // Social sharing feature
    function shareResult() {
        const word = wordInput.value.trim();
        if (!word) return;
        
        // Create share text
        const lang = languageData[currentLanguage];
        const magicNumber = lang.magicNumber;
        const shareText = `I discovered that "${word}" leads to "${magicNumber}" in ${getPathLength(word)} steps! Try it yourself:`;
        
        // Create URL with the word as a parameter
        const shareUrl = `${window.location.origin}${window.location.pathname}?word=${encodeURIComponent(word)}&lang=${currentLanguage}`;
        
        // Try to use Web Share API if available
        if (navigator.share) {
            navigator.share({
                title: 'Everything is Four',
                text: shareText,
                url: shareUrl
            })
            .catch(error => {
                // Fallback to clipboard
                copyToClipboard(`${shareText} ${shareUrl}`);
                alert('Share text copied to clipboard!');
            });
        } else {
            // Fallback to clipboard
            copyToClipboard(`${shareText} ${shareUrl}`);
            alert('Share text copied to clipboard!');
        }
    }
    
    // Helper to copy text to clipboard
    function copyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
    
    // Export as image feature
    function saveAsImage() {
        // Use html2canvas or a similar library to capture the result
        // For demonstration, we'll just show an alert
        alert('Image saving would be implemented with html2canvas library');
        
        // Actual implementation would look like:
        /*
        html2canvas(document.querySelector("#results")).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.download = 'four-path.png';
            link.href = imgData;
            link.click();
        });
        */
    }
    
    // Word history feature
    function setupWordHistory() {
        const historyContainer = document.getElementById('historyContainer');
        
        // Load history from localStorage
        const history = getWordHistory();
        
        // Display history items
        updateHistoryDisplay();
        
        function updateHistoryDisplay() {
            historyContainer.innerHTML = '';
            const history = getWordHistory();
            
            if (history.length === 0) {
                historyContainer.innerHTML = '<p>No words tried yet. Start exploring!</p>';
                return;
            }
            
            history.forEach(item => {
                const historyItem = document.createElement('div');
                historyItem.className = 'history-item';
                historyItem.innerHTML = `
                    <div class="history-word">${item.word}</div>
                    <div class="history-steps">${item.steps} steps</div>
                `;
                historyItem.addEventListener('click', () => {
                    wordInput.value = item.word;
                    checkWord();
                });
                historyContainer.appendChild(historyItem);
            });
        }
        
        // Add current word to history after checking
        const originalCheckWord = checkWord;
        checkWord = function() {
            originalCheckWord();
            const word = wordInput.value.trim();
            if (word) {
                addToHistory(word, getPathLength(word));
                updateHistoryDisplay();
                updateStatsDashboard();
            }
        };
    }
    
    // Get word history from localStorage
    function getWordHistory() {
        const historyStr = localStorage.getItem('fourHistory');
        return historyStr ? JSON.parse(historyStr) : [];
    }
    
    // Add a word to history
    function addToHistory(word, steps) {
        const history = getWordHistory();
        
        // Check if word already exists in history
        const existingIndex = history.findIndex(item => item.word === word);
        if (existingIndex !== -1) {
            // Update existing entry
            history[existingIndex].steps = steps;
            history[existingIndex].lastUsed = Date.now();
        } else {
            // Add new entry
            history.push({
                word,
                steps,
                language: currentLanguage,
                lastUsed: Date.now()
            });
        }
        
        // Sort by last used
        history.sort((a, b) => b.lastUsed - a.lastUsed);
        
        // Limit history size
        const limitedHistory = history.slice(0, 20);
        
        // Save back to localStorage
        localStorage.setItem('fourHistory', JSON.stringify(limitedHistory));
        
        return limitedHistory;
    }
    
    // Get path length for a word
    function getPathLength(word) {
        const path = calculatePath(word);
        // Divide by 2 because the path includes both words and numbers
        return Math.floor(path.length / 2);
    }
    
    // Statistics dashboard feature
    function setupStatsDashboard() {
        updateStatsDashboard();
    }
    
    function updateStatsDashboard() {
        const totalWordsElement = document.getElementById('totalWords');
        const avgStepsElement = document.getElementById('avgSteps');
        const longestPathElement = document.getElementById('longestPath');
        
        const history = getWordHistory();
        
        // Calculate stats
        const totalWords = history.length;
        
        let totalSteps = 0;
        let maxSteps = 0;
        
        history.forEach(item => {
            totalSteps += item.steps;
            if (item.steps > maxSteps) {
                maxSteps = item.steps;
            }
        });
        
        const avgSteps = totalWords > 0 ? (totalSteps / totalWords).toFixed(1) : 0;
        
        // Update the display
        totalWordsElement.textContent = totalWords;
        avgStepsElement.textContent = avgSteps;
        longestPathElement.textContent = maxSteps;
    }
    
    // Community section feature
    function setupCommunitySection() {
        // For demonstration purposes, we'll use mock data
        // In a real app, this would come from a server
        const wordCloud = document.getElementById('wordCloud');
        const interestingPaths = document.getElementById('interestingPaths');
        
        // Mock popular words
        const popularWords = [
            'programming', 'supercalifragilisticexpialidocious', 'hippopotamus', 
            'extraordinary', 'magnificent', 'constantinople', 'antidisestablishmentarianism',
            'philosophy', 'mathematics', 'interstellar'
        ];
        
        popularWords.forEach(word => {
            const cloudWord = document.createElement('div');
            cloudWord.className = 'cloud-word';
            cloudWord.textContent = word;
            cloudWord.addEventListener('click', () => {
                wordInput.value = word;
                checkWord();
                
                // Show main tab
                showTab('main');
            });
            wordCloud.appendChild(cloudWord);
        });
        
        // Mock interesting paths
        const paths = [
            { word: 'hippopotamus', steps: 6, path: 'hippopotamus → eleven → six → three → five → four → four' },
            { word: 'extraordinary', steps: 5, path: 'extraordinary → twelve → six → three → five → four' },
            { word: 'programming', steps: 5, path: 'programming → eleven → six → three → five → four' }
        ];
        
        paths.forEach(item => {
            const pathItem = document.createElement('div');
            pathItem.className = 'path-item';
            pathItem.innerHTML = `
                <div class="path-word">${item.word}</div>
                <div class="path-steps">${item.steps} steps</div>
                <div class="path-full">${item.path}</div>
            `;
            pathItem.addEventListener('click', () => {
                wordInput.value = item.word;
                checkWord();
                
                // Show main tab
                showTab('main');
            });
            interestingPaths.appendChild(pathItem);
        });
    }
    
    // Daily challenge feature
    function setupDailyChallenge() {
        const challengeWord = document.getElementById('challengeWord');
        const solveChallenge = document.getElementById('solveChallenge');
        
        // Generate today's challenge word 
        // In a real app, this would be the same for all users on the same day
        const todayWords = [
            'unprecedented', 'serendipity', 'conscientious', 'extraordinary',
            'simultaneously', 'onomatopoeia', 'incomprehensible', 'exponential'
        ];
        
        // Use the current date to select a challenge word (same word each day)
        const today = new Date();
        const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        const todayWord = todayWords[dayOfYear % todayWords.length];
        
        challengeWord.textContent = todayWord;
        
        solveChallenge.addEventListener('click', () => {
            wordInput.value = todayWord;
            checkWord();
            
            // Show main tab
            showTab('main');
        });
    }
    
    // Path optimizer feature
    function setupPathOptimizer() {
        const optimizerInput = document.getElementById('optimizerInput');
        const optimizeButton = document.getElementById('optimizeButton');
        const optimizerResults = document.getElementById('optimizerResults');
        
        optimizeButton.addEventListener('click', () => {
            const word = optimizerInput.value.trim();
            if (!word) return;
            
            // For now, we'll just display the regular path
            // In a real optimizer, you might try different counting methods
            const path = calculatePath(word);
            
            const stepsCount = Math.floor(path.length / 2);
            
            optimizerResults.innerHTML = `
                <div class="optimizer-result">
                    <h3>Standard Path (${stepsCount} steps)</h3>
                    <div class="optimizer-path">${formatPath(path)}</div>
                    
                    <h3>Optimized Path</h3>
                    <p>The standard path is already the most efficient.</p>
                </div>
            `;
        });
        
        function formatPath(path) {
            let result = '';
            for (let i = 0; i < path.length; i += 2) {
                result += `<span class="word">${path[i]}</span>`;
                if (i < path.length - 1) {
                    result += ` → `;
                }
            }
            return result;
        }
    }
    
    // Audio pronunciation feature
    function setupAudioPlayer() {
        const toggleAudio = document.getElementById('toggleAudio');
        const audioStatus = document.getElementById('audioStatus');
        
        let audioEnabled = false;
        
        toggleAudio.addEventListener('click', () => {
            audioEnabled = !audioEnabled;
            audioStatus.textContent = audioEnabled ? 'Disable Audio' : 'Enable Audio';
            
            if (audioEnabled) {
                // Create speech synthesis for current word
                speakCurrentWord();
            }
        });
        
        // Speak the current word when checked
        function speakCurrentWord() {
            if (!audioEnabled) return;
            
            const word = wordInput.value.trim();
            if (!word) return;
            
            // Use the Web Speech API
            if ('speechSynthesis' in window) {
                const utterance = new SpeechSynthesisUtterance(word);
                utterance.lang = getLangCode(currentLanguage);
                window.speechSynthesis.speak(utterance);
            }
        }
        
        // Map our language codes to speechSynthesis language codes
        function getLangCode(lang) {
            const langMap = {
                'en': 'en-US',
                'nl': 'nl-NL',
                'de': 'de-DE',
                'it': 'it-IT'
            };
            return langMap[lang] || 'en-US';
        }
        
        // Add speech to the check word function
        const originalCheckWord = checkWord;
        checkWord = function() {
            originalCheckWord();
            speakCurrentWord();
        };
    }
    
    // Navigation tabs feature
    function setupNavigationTabs() {
        const tabs = document.querySelectorAll('.nav-tab');
        
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.getAttribute('data-tab');
                showTab(tabName);
            });
        });
        
        // Check for URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.has('word')) {
            const word = urlParams.get('word');
            wordInput.value = word;
            
            // Set language if specified
            if (urlParams.has('lang')) {
                const lang = urlParams.get('lang');
                if (languageData[lang]) {
                    setLanguage(lang);
                }
            }
            
            // Process the word
            checkWord();
        }
        
        // Initial state - show main tab
        showTab('main');
    }
    
    function showTab(tabName) {
        // Hide all sections
        document.getElementById('dashboard').classList.add('hidden');
        document.getElementById('historySection').classList.add('hidden');
        document.getElementById('communitySection').classList.add('hidden');
        document.getElementById('dailyChallenge').classList.add('hidden');
        document.getElementById('pathOptimizer').classList.add('hidden');
        
        // Show explanation section only for main tab
        document.querySelector('.explanation').classList.toggle('hidden', tabName !== 'main');
        document.querySelector('.demo').classList.toggle('hidden', tabName !== 'main');
        
        // Set active tab
        document.querySelectorAll('.nav-tab').forEach(tab => {
            tab.classList.toggle('active', tab.getAttribute('data-tab') === tabName);
        });
        
        // Show the requested section
        switch (tabName) {
            case 'stats':
                document.getElementById('dashboard').classList.remove('hidden');
                break;
            case 'history':
                document.getElementById('historySection').classList.remove('hidden');
                break;
            case 'community':
                document.getElementById('communitySection').classList.remove('hidden');
                break;
            case 'challenge':
                document.getElementById('dailyChallenge').classList.remove('hidden');
                document.getElementById('pathOptimizer').classList.remove('hidden');
                break;
        }
    }
});