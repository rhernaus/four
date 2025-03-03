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
                'suggestButton': 'Stel een woord voor',
                'conclusion': 'Elk woord leidt uiteindelijk tot VIER!',
                'howItWorks': 'Hoe het werkt',
                'step1': 'Begin met een willekeurig woord',
                'step2': 'Tel het aantal letters in het woord',
                'step3': 'Schrijf dat nummer uit als een woord',
                'step4': 'Herhaal stappen 2-3 totdat je "vier" bereikt',
                'example': '', // Will be generated dynamically
                'footer': 'Gemaakt met 💻 en nieuwsgierigheid',
                'shareButton': 'Delen',
                'shareDialogTitle': 'Deel deze ontdekking',
                'shareDialogText': 'Deel deze link met anderen:',
                'copyButton': 'Kopiëren',
                'copiedMessage': 'Gekopieerd naar klembord!'
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
                'suggestButton': 'Suggest a Word',
                'conclusion': 'Every word eventually leads to FOUR!',
                'howItWorks': 'How it works',
                'step1': 'Start with any word',
                'step2': 'Count the number of letters in the word',
                'step3': 'Write out that number as a word',
                'step4': 'Repeat steps 2-3 until you reach "four"',
                'example': '', // Will be generated dynamically
                'footer': 'Created with 💻 and curiosity',
                'shareButton': 'Share',
                'shareDialogTitle': 'Share this discovery',
                'shareDialogText': 'Share this link with others:',
                'copyButton': 'Copy',
                'copiedMessage': 'Copied to clipboard!'
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
                'suggestButton': 'Wort vorschlagen',
                'conclusion': 'Jedes Wort führt schließlich zu VIER!',
                'howItWorks': 'Wie es funktioniert',
                'step1': 'Beginnen Sie mit einem beliebigen Wort',
                'step2': 'Zählen Sie die Anzahl der Buchstaben im Wort',
                'step3': 'Schreiben Sie diese Zahl als Wort aus',
                'step4': 'Wiederholen Sie die Schritte 2-3, bis Sie "vier" erreichen',
                'example': '', // Will be generated dynamically
                'footer': 'Erstellt mit 💻 und Neugier',
                'shareButton': 'Teilen',
                'shareDialogTitle': 'Diese Entdeckung teilen',
                'shareDialogText': 'Teilen Sie diesen Link mit anderen:',
                'copyButton': 'Kopieren',
                'copiedMessage': 'In die Zwischenablage kopiert!'
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
        document.getElementById('suggestButton').textContent = data.ui.suggestButton;
        // Update shareButton while preserving the SVG icon
        const shareButton = document.getElementById('shareButton');
        shareButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                <polyline points="16 6 12 2 8 6"></polyline>
                <line x1="12" y1="2" x2="12" y2="15"></line>
            </svg>
            ${data.ui.shareButton}
        `;
        // Replace the uppercase magic number (FOUR/VIER) with a highlighted span
        const uppercaseMagic = data.magicNumber.toUpperCase();
        document.getElementById('conclusion-text').innerHTML = data.ui.conclusion.replace(uppercaseMagic, `<span class="highlight">${uppercaseMagic}</span>`);
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
        
        // Update share dialog texts
        document.querySelector('.share-dialog-header h3').textContent = data.ui.shareDialogTitle;
        document.querySelector('.share-dialog-body p').textContent = data.ui.shareDialogText;
        document.getElementById('copyShareUrl').textContent = data.ui.copyButton;
        document.getElementById('copySuccess').querySelector('span').textContent = data.ui.copiedMessage;
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
    
    // Check URL parameters for word and language
    checkUrlParameters();
    
    // Focus input on page load
    wordInput.focus();
    
    // Function to set up new features
    function setupNewFeatures() {
        // 1. Word Suggestions
        const suggestButton = document.getElementById('suggestButton');
        suggestButton.addEventListener('click', suggestRandomWord);
        
        // 2. Social Sharing
        const shareButton = document.getElementById('shareButton');
        shareButton.addEventListener('click', shareResult);
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
        
        // Localized share text based on current language
        let shareText;
        if (currentLanguage === 'nl') {
            shareText = `Ik heb ontdekt dat "${word}" leidt tot "${magicNumber}" in ${getPathLength(word)} stappen! Probeer het zelf:`;
        } else if (currentLanguage === 'de') {
            shareText = `Ich habe entdeckt, dass "${word}" zu "${magicNumber}" in ${getPathLength(word)} Schritten führt! Probieren Sie es selbst:`;
        } else {
            shareText = `I discovered that "${word}" leads to "${magicNumber}" in ${getPathLength(word)} steps! Try it yourself:`;
        }
        
        // Create clean URL structure: website.com/nl/longword 
        let basePath = window.location.origin;
        
        // If currentLanguage is English (default), don't include language in the path
        let shareUrl;
        if (currentLanguage === 'en') {
            shareUrl = `${basePath}/${encodeURIComponent(word)}`;
        } else {
            shareUrl = `${basePath}/${currentLanguage}/${encodeURIComponent(word)}`;
        }
        
        // Use custom share dialog on desktop, Web Share API on mobile
        if (navigator.share && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            // Mobile device with Web Share API
            navigator.share({
                title: currentLanguage === 'de' ? 'Alles ist Vier' : 
                       currentLanguage === 'nl' ? 'Alles is Vier' : 
                       'Everything is Four',
                text: shareText,
                url: shareUrl
            })
            .catch(error => {
                showShareDialog(shareText, shareUrl);
            });
        } else {
            // Desktop - show custom dialog
            showShareDialog(shareText, shareUrl);
        }
    }
    
    // Show custom share dialog
    function showShareDialog(shareText, shareUrl) {
        const shareDialog = document.getElementById('shareDialog');
        const shareUrlInput = document.getElementById('shareUrl');
        const closeShareDialog = document.getElementById('closeShareDialog');
        const copyShareUrl = document.getElementById('copyShareUrl');
        const copySuccess = document.getElementById('copySuccess');
        
        // Set the URL in the input field
        shareUrlInput.value = shareUrl;
        
        // Show the dialog
        shareDialog.classList.add('active');
        shareDialog.classList.remove('hidden');
        
        // Handle copy button
        copyShareUrl.onclick = function() {
            shareUrlInput.select();
            document.execCommand('copy');
            copySuccess.classList.remove('hidden');
            setTimeout(() => {
                copySuccess.classList.add('hidden');
            }, 3000);
        };
        
        // Handle close button
        closeShareDialog.onclick = function() {
            shareDialog.classList.remove('active');
            setTimeout(() => {
                shareDialog.classList.add('hidden');
            }, 300);
        };
        
        // Handle social platform buttons
        document.getElementById('shareTwitter').onclick = function() {
            window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
        };
        
        document.getElementById('shareFacebook').onclick = function() {
            window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
        };
        
        document.getElementById('shareEmail').onclick = function() {
            window.location.href = `mailto:?subject=Everything is Four&body=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
        };
        
        // Close on background click
        shareDialog.onclick = function(event) {
            if (event.target === shareDialog) {
                shareDialog.classList.remove('active');
                setTimeout(() => {
                    shareDialog.classList.add('hidden');
                }, 300);
            }
        };
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
    
    // Get path length for a word
    function getPathLength(word) {
        const path = calculatePath(word);
        // Divide by 2 because the path includes both words and numbers
        return Math.floor(path.length / 2);
    }
    
    // Check URL structure and extract parameters
    function checkUrlParameters() {
        // First, check if we're using the new URL format
        const pathname = window.location.pathname;
        const pathParts = pathname.split('/').filter(part => part !== '');
        
        if (pathParts.length >= 1) {
            let lang = 'en';  // Default language
            let word = '';
            
            // Check if the first part is a language code
            if (pathParts.length >= 2 && Object.keys(languageData).includes(pathParts[0])) {
                lang = pathParts[0];
                word = decodeURIComponent(pathParts[1]);
                
                // Update canonical and meta tags for SEO
                updateMetaTags(lang, word);
            } else {
                // Single part - just the word
                word = decodeURIComponent(pathParts[0]);
                
                // Update canonical and meta tags for SEO
                updateMetaTags('en', word);
            }
            
            // Set language
            if (languageData[lang]) {
                setLanguage(lang);
            }
            
            // Set and check word
            if (word) {
                wordInput.value = word;
                checkWord();
                return; // We've handled the URL, no need to check query params
            }
        }
        
        // Fallback: check for traditional query parameters
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
    }
    
    // Update meta tags for SEO when navigating to a specific word
    function updateMetaTags(lang, word) {
        const data = languageData[lang];
        const magicNumber = data.magicNumber;
        const pathLength = getPathLength(word);
        const baseUrl = window.location.origin;
        
        // Construct proper canonical URL
        let canonicalUrl;
        if (lang === 'en') {
            canonicalUrl = `${baseUrl}/${encodeURIComponent(word)}`;
        } else {
            canonicalUrl = `${baseUrl}/${lang}/${encodeURIComponent(word)}`;
        }
        
        // Update canonical link
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (canonicalLink) {
            canonicalLink.setAttribute('href', canonicalUrl);
        }
        
        // Update meta description
        let description;
        if (lang === 'en') {
            description = `The word "${word}" leads to ${magicNumber} in ${pathLength} steps. Every word eventually leads to four through a simple counting algorithm. Try it yourself!`;
        } else if (lang === 'nl') {
            description = `Het woord "${word}" leidt tot ${magicNumber} in ${pathLength} stappen. Elk woord leidt uiteindelijk naar vier via een eenvoudig telalgoritme. Probeer het zelf!`;
        } else if (lang === 'de') {
            description = `Das Wort "${word}" führt zu ${magicNumber} in ${pathLength} Schritten. Jedes Wort führt schließlich zu vier durch einen einfachen Zählalgorithmus. Probieren Sie es selbst!`;
        }
        
        // Update meta tags
        let metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute('content', description);
        }
        
        // Update Open Graph tags
        let ogTitle = document.querySelector('meta[property="og:title"]');
        let ogDescription = document.querySelector('meta[property="og:description"]');
        let ogUrl = document.querySelector('meta[property="og:url"]');
        
        if (ogTitle) {
            ogTitle.setAttribute('content', `${word} → ${magicNumber} | Everything is Four`);
        }
        if (ogDescription) {
            ogDescription.setAttribute('content', description);
        }
        if (ogUrl) {
            ogUrl.setAttribute('content', canonicalUrl);
        }
        
        // Update Twitter tags
        let twitterTitle = document.querySelector('meta[name="twitter:title"]');
        let twitterDescription = document.querySelector('meta[name="twitter:description"]');
        let twitterUrl = document.querySelector('meta[name="twitter:url"]');
        
        if (twitterTitle) {
            twitterTitle.setAttribute('content', `${word} → ${magicNumber} | Everything is Four`);
        }
        if (twitterDescription) {
            twitterDescription.setAttribute('content', description);
        }
        if (twitterUrl) {
            twitterUrl.setAttribute('content', canonicalUrl);
        }
        
        // Update page title
        document.title = `${word} → ${magicNumber} | Everything is Four`;
    }
    
    // checkUrlParameters is called above in the main initialization
});