// SwipeHome - Tinder for Houses
// Interactive JavaScript

// Screen Navigation
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

function showFilterScreen() {
    showScreen('filter-screen');
}

function showSwipeScreen() {
    showScreen('swipe-screen');
}

function showDetailScreen() {
    showScreen('detail-screen');
}

function showLikesScreen() {
    showScreen('likes-screen');
}

// Modal Functions
function contactAgent() {
    document.getElementById('contact-modal').classList.add('active');
}

function closeModal() {
    document.getElementById('contact-modal').classList.remove('active');
}

// Close modal on outside click
document.getElementById('contact-modal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Swipe Actions
function swipeRight() {
    const card = document.querySelector('.card-1');
    if (!card) return;

    // Show like indicator
    card.querySelector('.like-indicator').style.opacity = '1';

    // Animate card
    card.classList.add('swiping-right');

    // Show overlay animation
    showSwipeResult('like');

    // Reset after animation
    setTimeout(() => {
        resetCard(card);
    }, 500);
}

function swipeLeft() {
    const card = document.querySelector('.card-1');
    if (!card) return;

    // Show nope indicator
    card.querySelector('.nope-indicator').style.opacity = '1';

    // Animate card
    card.classList.add('swiping-left');

    // Show overlay animation
    showSwipeResult('nope');

    // Reset after animation
    setTimeout(() => {
        resetCard(card);
    }, 500);
}

function superLike() {
    showSwipeResult('super');

    const card = document.querySelector('.card-1');
    if (card) {
        card.style.transition = 'transform 0.4s ease';
        card.style.transform = 'translateY(-100vh)';

        setTimeout(() => {
            resetCard(card);
        }, 500);
    }
}

function resetCard(card) {
    card.classList.remove('swiping-right', 'swiping-left');
    card.style.transform = '';
    card.querySelector('.like-indicator').style.opacity = '0';
    card.querySelector('.nope-indicator').style.opacity = '0';
}

function showSwipeResult(type) {
    const overlay = document.getElementById('swipe-overlay');
    const result = overlay.querySelector(`.${type}-result`);

    overlay.classList.add('active');
    result.classList.add('show');

    setTimeout(() => {
        result.classList.remove('show');
        overlay.classList.remove('active');
    }, 800);
}

// Pill Selection
document.querySelectorAll('.pill-group').forEach(group => {
    group.addEventListener('click', (e) => {
        if (e.target.classList.contains('pill')) {
            // For single select groups (Bedrooms)
            if (!group.classList.contains('multi-select')) {
                group.querySelectorAll('.pill').forEach(pill => pill.classList.remove('active'));
            }
            e.target.classList.toggle('active');
        }
    });
});

// Touch/Swipe Handling for Cards
let startX = 0;
let startY = 0;
let currentX = 0;
let isDragging = false;

const cardContainer = document.querySelector('.cards-container');
const activeCard = document.getElementById('active-card');

if (activeCard) {
    activeCard.addEventListener('mousedown', startDrag);
    activeCard.addEventListener('touchstart', startDrag);

    document.addEventListener('mousemove', drag);
    document.addEventListener('touchmove', drag);

    document.addEventListener('mouseup', endDrag);
    document.addEventListener('touchend', endDrag);
}

function startDrag(e) {
    isDragging = true;
    startX = e.type === 'mousedown' ? e.clientX : e.touches[0].clientX;
    startY = e.type === 'mousedown' ? e.clientY : e.touches[0].clientY;
    activeCard.style.transition = 'none';
}

function drag(e) {
    if (!isDragging) return;

    e.preventDefault();
    currentX = e.type === 'mousemove' ? e.clientX : e.touches[0].clientX;
    const diffX = currentX - startX;
    const rotation = diffX * 0.1;

    activeCard.style.transform = `translateX(${diffX}px) rotate(${rotation}deg)`;

    // Show indicators based on direction
    const likeIndicator = activeCard.querySelector('.like-indicator');
    const nopeIndicator = activeCard.querySelector('.nope-indicator');

    if (diffX > 50) {
        likeIndicator.style.opacity = Math.min((diffX - 50) / 100, 1);
        nopeIndicator.style.opacity = 0;
    } else if (diffX < -50) {
        nopeIndicator.style.opacity = Math.min((-diffX - 50) / 100, 1);
        likeIndicator.style.opacity = 0;
    } else {
        likeIndicator.style.opacity = 0;
        nopeIndicator.style.opacity = 0;
    }
}

function endDrag() {
    if (!isDragging) return;
    isDragging = false;

    activeCard.style.transition = 'transform 0.3s ease';

    const diffX = currentX - startX;

    if (diffX > 100) {
        swipeRight();
    } else if (diffX < -100) {
        swipeLeft();
    } else {
        // Reset position
        activeCard.style.transform = '';
        activeCard.querySelector('.like-indicator').style.opacity = 0;
        activeCard.querySelector('.nope-indicator').style.opacity = 0;
    }
}

// Quick message selection
document.querySelectorAll('.quick-msg').forEach(btn => {
    btn.addEventListener('click', function() {
        const textarea = document.querySelector('.modal-content textarea');
        textarea.value = this.textContent;
    });
});

// Thumbnail selection in detail view
document.querySelectorAll('.thumb:not(.more)').forEach(thumb => {
    thumb.addEventListener('click', function() {
        document.querySelectorAll('.thumb').forEach(t => t.classList.remove('active'));
        this.classList.add('active');

        const mainImage = document.querySelector('.main-image');
        mainImage.style.backgroundImage = this.style.backgroundImage;
    });
});

// Tab switching in likes screen
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');
    });
});

// Keyboard shortcuts for desktop
document.addEventListener('keydown', (e) => {
    if (document.getElementById('swipe-screen').classList.contains('active')) {
        if (e.key === 'ArrowRight') {
            swipeRight();
        } else if (e.key === 'ArrowLeft') {
            swipeLeft();
        } else if (e.key === 'ArrowUp') {
            superLike();
        } else if (e.key === ' ') {
            e.preventDefault();
            showDetailScreen();
        }
    }
});

// Initialize
console.log('🏠 SwipeHome - Tinder for Houses');
console.log('Keyboard shortcuts (on swipe screen):');
console.log('  → Right Arrow: Like');
console.log('  ← Left Arrow: Nope');
console.log('  ↑ Up Arrow: Super Like');
console.log('  Space: View Details');
