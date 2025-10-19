const livelyTranslate = (function() {

    // DOM Elements
    const splashScreen = document.getElementById('splash-screen');
    const splashText = document.getElementById('splash-text');
    const mainContent = document.getElementById('main-content');
    const navButtons = document.querySelectorAll('.nav-button');
    const sections = document.querySelectorAll('.content-section');
    const sourceText = document.getElementById('source-text');
    const rightLanguageSelect = document.getElementById('right-language');

    /**
     * Handles the initial splash screen animation.
     */
    function runSplashScreen() {
        // 1. Fade in the text
        setTimeout(() => {
            splashText.classList.add('fade-in');
        }, 100);

        // 2. Animate the black screen up and remove the text
        setTimeout(() => {
            splashScreen.classList.add('slide-up');
            splashText.style.opacity = '0'; // Smoothly fade text out as screen slides up
        }, 2000); // Wait 2 seconds for text to fully fade in and be visible

        // 3. Show the main content after the slide-up animation is done
        setTimeout(() => {
            splashScreen.style.display = 'none';
            mainContent.classList.add('visible');
        }, 3000); // 1s slide-up animation + 2s initial delay
    }

    /**
     * Placeholder function for detecting language.
     * In a real app, this would use an API or a library.
     */
    function detectLanguage(text) {
        if (!text || text.trim() === '') {
            return 'es'; // Default to Spanish if no text
        }
        // Simplified logic: Assume English is the only other known language
        const cleanedText = text.trim().toLowerCase();
        if (cleanedText.includes('hola') || cleanedText.includes('gracias')) {
            return 'en';
        }
        return 'es'; // Default all other input to Spanish for the *target* language
    }

    /**
     * Placeholder function for translating text.
     */
    function translate(text, targetLang) {
        if (!text || text.trim() === '') {
            return '';
        }

        // Mock translation logic
        if (targetLang === 'en') {
            return `[Accurate English translation of "${text}"]`;
        } else if (targetLang === 'es') {
            return `[Traducción precisa al español de "${text}"]`;
        }
        return `[Translation to ${targetLang} for "${text}"]`;
    }

    /**
     * Detects language and performs translation on input change.
     */
    function detectAndTranslate() {
        const text = sourceText.value;
        const currentTargetLang = rightLanguageSelect.value;
        const detectedLang = detectLanguage(text);

        // Automatic language detection and switch
        if (rightLanguageSelect.querySelector('option[value="auto"]')) {
            // Only auto-switch if the user hasn't explicitly selected another language
            if (currentTargetLang === 'auto' || currentTargetLang === 'es' || currentTargetLang === 'en') {
                const newTarget = (detectedLang === 'en') ? 'es' : 'en'; // Simple flip
                if (newTarget !== currentTargetLang) {
                    rightLanguageSelect.value = newTarget;
                }
            }
        }
        
        // Perform the translation using the currently selected target language
        const finalTargetLang = rightLanguageSelect.value;
        document.getElementById('target-text').textContent = translate(text, finalTargetLang);
    }
    
    /**
     * Handles navigation between "Translate" and "Notes" sections.
     */
    function handleNavigation(event) {
        const targetSectionId = event.target.getAttribute('data-section');
        
        // Update active class for buttons
        navButtons.forEach(btn => btn.classList.remove('active'));
        event.target.classList.add('active');

        // Show/hide sections
        sections.forEach(section => {
            section.classList.remove('active');
            section.classList.add('hidden');
            if (section.id === `${targetSectionId}-section`) {
                section.classList.add('active');
                section.classList.remove('hidden');
            }
        });
    }

    /**
     * Initializes event listeners.
     */
    function setupEventListeners() {
        navButtons.forEach(button => {
            button.addEventListener('click', handleNavigation);
        });

        sourceText.addEventListener('input', detectAndTranslate);
        rightLanguageSelect.addEventListener('change', detectAndTranslate);
    }

    /**
     * Public function to initialize the site.
     */
    function init() {
        runSplashScreen();
        setupEventListeners();
        // Initial setup for document translator and languages
        // Note: left language is always 'English' and disabled per request.
        document.getElementById('left-language').value = 'en';
        
        // Simulating the all language support by adding a few more options
        const allLanguages = {
            'es': 'Spanish',
            'fr': 'French',
            'de': 'German',
            'zh': 'Chinese',
            'ja': 'Japanese',
            'auto': 'Detect language'
        };
        
        // Clear existing options and re-add for all language support
        rightLanguageSelect.innerHTML = '';
        for (const [code, name] of Object.entries(allLanguages)) {
            const option = document.createElement('option');
            option.value = code;
            option.textContent = name;
            rightLanguageSelect.appendChild(option);
        }
        rightLanguageSelect.value = 'es'; // Set default to Spanish
    }

    // Initialize the site when the window loads
    window.addEventListener('load', init);

    // Expose the core translation function globally for the oninput attribute
    return {
        detectAndTranslate: detectAndTranslate
    };

})();
