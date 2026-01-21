// GeorgiaMLS Agent Portal - JavaScript

// Screen Navigation
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
    window.scrollTo(0, 0);
}

// Auth Flow Handlers
function handleLogin(e) {
    e.preventDefault();
    // Simulate login
    showScreen('dashboard-screen');
}

function goToLicenseStep(e) {
    e.preventDefault();
    showScreen('license-screen');
}

function verifyLicense(e) {
    e.preventDefault();

    const btn = document.getElementById('verify-btn');
    const result = document.getElementById('verification-result');

    // Simulate verification
    btn.textContent = 'Verifying...';
    btn.disabled = true;

    setTimeout(() => {
        result.style.display = 'block';
        btn.textContent = 'Continue to Payment →';
        btn.disabled = false;
        btn.onclick = () => showScreen('payment-screen');
    }, 1500);
}

function processPayment(e) {
    e.preventDefault();

    const btn = e.target.querySelector('button[type="submit"]');
    btn.textContent = 'Processing...';
    btn.disabled = true;

    setTimeout(() => {
        document.getElementById('success-modal').classList.add('active');
    }, 2000);
}

function closeSuccessModal() {
    document.getElementById('success-modal').classList.remove('active');
}

// FAQ Toggle
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const item = question.parentElement;
        item.classList.toggle('open');
    });
});

// Plan Selection
document.querySelectorAll('input[name="plan"]').forEach(input => {
    input.addEventListener('change', () => {
        const summary = document.querySelector('.order-summary');
        if (input.value === 'annual') {
            summary.innerHTML = `
                <h4>Order Summary</h4>
                <div class="summary-row">
                    <span>GeorgiaMLS Annual</span>
                    <span>$350.00</span>
                </div>
                <div class="summary-row" style="color: var(--accent);">
                    <span>You save</span>
                    <span>$50.00</span>
                </div>
                <div class="summary-row total">
                    <span>Total due today</span>
                    <span>$350.00</span>
                </div>
            `;
        } else {
            summary.innerHTML = `
                <h4>Order Summary</h4>
                <div class="summary-row">
                    <span>GeorgiaMLS Quarterly</span>
                    <span>$100.00</span>
                </div>
                <div class="summary-row total">
                    <span>Total due today</span>
                    <span>$100.00</span>
                </div>
            `;
        }
    });
});

// Dashboard Tab Navigation
function showDashboardTab(tab) {
    // In a real app, this would show different content
    console.log('Switching to tab:', tab);
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Form validation feedback
document.querySelectorAll('.form-group input').forEach(input => {
    input.addEventListener('blur', function() {
        if (this.value && this.checkValidity()) {
            this.style.borderColor = 'var(--accent)';
        } else if (this.value) {
            this.style.borderColor = 'var(--danger)';
        }
    });

    input.addEventListener('focus', function() {
        this.style.borderColor = 'var(--primary)';
    });
});

// Credit card formatting
const cardInput = document.querySelector('.card-input input');
if (cardInput) {
    cardInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
        let formatted = value.match(/.{1,4}/g)?.join(' ') || value;
        e.target.value = formatted.substring(0, 19);
    });
}

// Expiry date formatting
const expiryInput = document.querySelector('input[placeholder="MM/YY"]');
if (expiryInput) {
    expiryInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
    });
}

// Initialize
console.log('🏠 GeorgiaMLS Agent Portal');
console.log('Screens: landing, login, signup, license, payment, dashboard, billing, profile');
