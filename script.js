// 1. PAGE NAVIGATION
// Select all page divs and navigation buttons
const pages = document.querySelectorAll('.page');
const navBtns = document.querySelectorAll('.nav-btn');

// Function to show only the selected page and update active button style
function showPage(pageId) {
    pages.forEach(page => {
        page.classList.remove('active-page');
        if (page.id === pageId) {
            page.classList.add('active-page');
        }
    });
    navBtns.forEach(btn => {
        btn.classList.remove('active-page');
        if (btn.getAttribute('data-page') === pageId) {
            btn.classList.add('active-page');
        }
    });
    // Update browser title for better UX
    let pageTitle = "Bishal Chapagain";
    switch(pageId) {
        case 'home': pageTitle = "Home | Bishal Chapagain"; break;
        case 'academics': pageTitle = "Academics | Bishal Chapagain"; break;
        case 'experience': pageTitle = "Experience | Bishal Chapagain"; break;
        case 'hobbies': pageTitle = "Hobbies | Bishal Chapagain"; break;
        case 'connect': pageTitle = "Connect | Bishal Chapagain"; break;
    }
    document.title = pageTitle;
}

// Attach click event to each navigation button
navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const pageId = btn.getAttribute('data-page');
        if (pageId) showPage(pageId);
    });
});

// Initially show Home page
showPage('home');

//3. CONTACT FORM: VALIDATION
const form = document.getElementById('contactForm');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const msgInput = document.getElementById('msgInput');
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const msgError = document.getElementById('msgError');
const feedbackDiv = document.getElementById('formFeedback');
const sendBtn = document.getElementById('sendBtn');

// Helper: clear previous field errors
function clearFieldErrors() {
    nameError.innerText = '';
    emailError.innerText = '';
    msgError.innerText = '';
    nameInput.style.borderColor = '';
    emailInput.style.borderColor = '';
    msgInput.style.borderColor = '';
}

// Individual validation functions
function validateName() {
    const val = nameInput.value.trim();
    if (!val) {
        nameError.innerText = 'Full name is required.';
        nameInput.style.borderColor = '#e53e3e';
        return false;
    } else if (val.length < 2) {
        nameError.innerText = 'Name must be at least 2 characters.';
        nameInput.style.borderColor = '#e53e3e';
        return false;
    } else {
        nameError.innerText = '';
        nameInput.style.borderColor = '#cfdfed';
        return true;
    }
}

function validateEmail() {
    const email = emailInput.value.trim();
    const pattern = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/; //[^\s@] one or more character that doesnot contain space or @ sign on username, next @ must be contain and ([^\s@]+\.)+ is the domain part followed by . sign
    if (!email) {
        emailError.innerText = 'Email address is required.';
        emailInput.style.borderColor = '#e53e3e';
        return false;
    } else if (!pattern.test(email)) {
        emailError.innerText = 'Enter a valid email (e.g., abc@example.com).';
        emailInput.style.borderColor = '#e53e3e';
        return false;
    } else {
        emailError.innerText = '';
        emailInput.style.borderColor = '#cfdfed';
        return true;
    }
}

function validateMessage() {
    const msg = msgInput.value.trim();
    if (!msg) {
        msgError.innerText = 'Message cannot be empty.';
        msgInput.style.borderColor = '#e53e3e';
        return false;
    } else if (msg.length < 5) {
        msgError.innerText = 'Message must be at least 5 characters.';
        msgInput.style.borderColor = '#e53e3e';
        return false;
    } else {
        msgError.innerText = '';
        msgInput.style.borderColor = '#cfdfed';
        return true;
    }
}

// Real-time validation on blur/input
nameInput.addEventListener('blur', validateName);
emailInput.addEventListener('blur', validateEmail);
msgInput.addEventListener('blur', validateMessage);
nameInput.addEventListener('input', () => { if (nameError.innerText) validateName(); });
emailInput.addEventListener('input', () => { if (emailError.innerText) validateEmail(); });
msgInput.addEventListener('input', () => { if (msgError.innerText) validateMessage(); });

// submit email 
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearFieldErrors();
    
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMsgValid = validateMessage();
    
    if (!isNameValid || !isEmailValid || !isMsgValid) {
        feedbackDiv.innerHTML = '<div class="error-message">Please complete the form.</div>';
        setTimeout(() => { if (feedbackDiv) feedbackDiv.innerHTML = ''; }, 3000);
        return;
    }
    
    // Disable button and show sending status
    sendBtn.disabled = true;
    sendBtn.textContent = 'Sending...';
    feedbackDiv.innerHTML = '<div style="color:#2563eb;">Sending message...</div>';
    
    const formData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        message: msgInput.value.trim(),
        _subject: `Portfolio message from ${nameInput.value.trim()}`
    };
    
    try {
    // Open Gmail in new tab
    window.open("https://mail.google.com", "_blank");

    // Optional UI feedback
    feedbackDiv.innerHTML = '<div class="success-message">Gmail open in new tab</div>';

    form.reset();
    clearFieldErrors();

} catch (error) {
    console.error(error);
    feedbackDiv.innerHTML = '<div class="error-message">Unable to open Gmail</div>';
} finally {
    sendBtn.disabled = false;
    sendBtn.textContent = 'Send Message';
}
});