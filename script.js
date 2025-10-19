document.addEventListener('DOMContentLoaded', () => {
    const sourceTextarea = document.getElementById('source-text');
    const targetDiv = document.getElementById('target-text');
    const swapIcon = document.querySelector('.swap-icon');
    const sourceLangSelect = document.getElementById('source-lang');
    const targetLangSelect = document.getElementById('target-lang');
    const translateButton = document.getElementById('translate-btn');

    window.livelyTranslate = () => {
        const textToTranslate = sourceTextarea.value.trim();

        if (textToTranslate.length === 0) {
            targetDiv.textContent = '';
            return;
        }

        const sourceLang = sourceLangSelect.value;
        const targetLang = targetLangSelect.value;

        // API INTEGRATION POINT: 
        // A full translation service must be connected here via a backend server.
        // The following code is ready to receive a translation result.
        
        targetDiv.textContent = '';
    };

    translateButton.addEventListener('click', livelyTranslate);

    swapIcon.addEventListener('click', () => {
        const sourceVal = sourceLangSelect.value;
        const targetVal = targetLangSelect.value;

        if (targetVal === 'auto') {
            sourceLangSelect.value = sourceVal;
        } else {
            sourceLangSelect.value = targetVal;
        }
        
        targetLangSelect.value = sourceVal;
        
        livelyTranslate();
    });
});
