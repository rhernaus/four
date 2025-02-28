// Example words for each language
export const exampleWords = {
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
export const languageData = {
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
      'footer': 'Erstellt mit 💻 und Neugier',
      'shareButton': 'Teilen',
      'shareDialogTitle': 'Diese Entdeckung teilen',
      'shareDialogText': 'Teilen Sie diesen Link mit anderen:',
      'copyButton': 'Kopieren',
      'copiedMessage': 'In die Zwischenablage kopiert!'
    }
  }
};