document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slideCounter = document.getElementById('slideCounter');
    const progressBar = document.getElementById('progressBar');
    
    let currentSlide = 0;
    const totalSlides = slides.length;

    // Initialize
    updateUI();

    // Button Clicks
    nextBtn.addEventListener('click', () => {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateUI();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentSlide > 0) {
            currentSlide--;
            updateUI();
        }
    });

    // Keyboard Navigation (Spacebar, Right Arrow, Left Arrow)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
            if (currentSlide < totalSlides - 1) {
                currentSlide++;
                updateUI();
            }
        } else if (e.key === 'ArrowLeft') {
            if (currentSlide > 0) {
                currentSlide--;
                updateUI();
            }
        }
    });

    // Touch Swipe Support for Mobile (iPhone/Android)
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    document.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swiped Left -> Next
            if (currentSlide < totalSlides - 1) {
                currentSlide++;
                updateUI();
            }
        }
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swiped Right -> Prev
            if (currentSlide > 0) {
                currentSlide--;
                updateUI();
            }
        }
    }

    // Update DOM Elements
    function updateUI() {
        // Toggle active class on slides
        slides.forEach((slide, index) => {
            if (index === currentSlide) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Update counter text
        slideCounter.textContent = `${currentSlide + 1} / ${totalSlides}`;

        // Update progress bar width
        const progressPercentage = ((currentSlide + 1) / totalSlides) * 100;
        progressBar.style.width = `${progressPercentage}%`;

        // Disable buttons if at ends
        prevBtn.disabled = currentSlide === 0;
        nextBtn.disabled = currentSlide === totalSlides - 1;
    }
});
