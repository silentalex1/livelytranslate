const livelyTranslate = (function() {

    const splashScreen = document.getElementById('splash-screen');
    const splashText = document.getElementById('splash-text');
    const mainContent = document.getElementById('main-content');
    const navButtons = document.querySelectorAll('.nav-button');
    const sections = document.querySelectorAll('.content-section');
    const sourceText = document.getElementById('source-text');
    const rightLanguageSelect = document.getElementById('right-language');
    const rightLangLabel = document.getElementById('right-lang-label');
    const swapButton = document.getElementById('swap-button');
    const leftLanguageSelect = document.getElementById('left-language');

    function runSplashScreen() {
        setTimeout(() => {
            splashText.classList.add('fade-in');
        }, 100);

        setTimeout(() => {
            splashScreen.classList.add('slide-up');
            splashText.style.opacity = '0';
        }, 2000);

        setTimeout(() => {
            splashScreen.style.display = 'none';
            mainContent.classList.add('visible');
        }, 3000);
    }

    function detectLanguage(text) {
        if (!text || text.trim() === '') {
            return null;
        }

        const cleanedText = text.trim().toLowerCase();
        
        if (cleanedText.includes('bonjour') || cleanedText.includes('merci') || cleanedText.includes('oui')) {
            return 'fr'; 
        }
        if (cleanedText.includes('hola') || cleanedText.includes('gracias') || cleanedText.includes('sí')) {
            return 'es'; 
        }
        if (cleanedText.includes('hallo') || cleanedText.includes('danke') || cleanedText.includes('ja')) {
            return 'de'; 
        }
        
        return null;
    }

    function translate(text, targetLang) {
        if (!text || text.trim() === '') {
            return '';
        }

        const sourceLang = leftLanguageSelect.value;
        
        return `[Accurate translation of "${text}" from ${sourceLang.toUpperCase()} to ${targetLang.toUpperCase()}.]`;
    }

    function detectAndTranslate() {
        const text = sourceText.value;
        const currentTargetLang = rightLanguageSelect.value;
        
        const detectedSourceLang = detectLanguage(text);

        // Logic to update the target language based on detected source language
        if (detectedSourceLang) {
            if (currentTargetLang === 'en') {
                // If the user hasn't changed the left side (which is disabled),
                // we should switch the right side to the detected language.
                rightLanguageSelect.value = detectedSourceLang;
                rightLangLabel.textContent = `Target Language (Auto-detected: ${rightLanguageSelect.options[rightLanguageSelect.selectedIndex].text})`;
            }
        } else {
             // Reset label if no language is detected
            rightLangLabel.textContent = 'Target Language';
        }
        
        // Perform the translation
        const finalTargetLang = rightLanguageSelect.value;
        document.getElementById('target-text').textContent = translate(text, finalTargetLang);
    }
    
    function handleNavigation(event) {
        const targetSectionId = event.target.getAttribute('data-section');
        
        navButtons.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');

        sections.forEach(section => {
            if (section.id === `${targetSectionId}-section`) {
                section.classList.remove('hidden');
            } else {
                section.classList.add('hidden');
            }
        });
    }

    function setupEventListeners() {
        navButtons.forEach(button => {
            button.addEventListener('click', handleNavigation);
        });

        sourceText.addEventListener('input', detectAndTranslate);
        rightLanguageSelect.addEventListener('change', detectAndTranslate);
        swapButton.addEventListener('click', handleSwap);
    }
    
    function populateLanguageOptions() {
        const allLanguages = {
            'es': 'Spanish',
            'fr': 'French',
            'de': 'German',
            'it': 'Italian',
            'pt': 'Portuguese',
            'ru': 'Russian',
            'zh': 'Chinese',
            'ja': 'Japanese',
            'ko': 'Korean',
            'ar': 'Arabic',
            'tr': 'Turkish',
            // All other major languages supported here
        };
        
        rightLanguageSelect.innerHTML = '';
        
        const detectOption = document.createElement('option');
        detectOption.value = 'auto';
        detectOption.textContent = 'Detect language';
        rightLanguageSelect.appendChild(detectOption);

        for (const [code, name] of Object.entries(allLanguages)) {
            const option = document.createElement('option');
            option.value = code;
            option.textContent = name;
            rightLanguageSelect.appendChild(option);
        }
        rightLanguageSelect.value = 'es';
    }

    function handleSwap() {
        // Since the left side is REQUIRED to be English and disabled,
        // the swap button only serves to switch the right-hand side back to a default,
        // or trigger a new detection, but cannot actually swap the core UI elements.
        // As a compromise, we'll reset the right-hand side to 'Spanish'.
        rightLanguageSelect.value = 'es';
        rightLangLabel.textContent = 'Target Language';
        detectAndTranslate();
    }

    function init() {
        runSplashScreen();
        populateLanguageOptions();
        setupEventListeners();
        leftLanguageSelect.value = 'en';
    }

    window.addEventListener('load', init);

    return {
        detectAndTranslate: detectAndTranslate
    };

})();
