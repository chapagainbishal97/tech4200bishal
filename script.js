// this is the contact form that consists of input text, feedback and errot buttion use for validation to submit the form 
const form = document.getElementById('contactForm');
if (form) {
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const msgInput = document.getElementById('msgInput');
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const msgError = document.getElementById('msgError');
    const feedbackDiv = document.getElementById('formFeedback');
    const sendBtn = document.getElementById('sendBtn');

    // this is the function used to clear all the validation error and reset it into the original default color
    function clearFieldErrors() {
        nameError.innerText = '';
        emailError.innerText = '';
        msgError.innerText = '';
        nameInput.style.borderColor = '';
        emailInput.style.borderColor = '';
        msgInput.style.borderColor = '';
    }

    // this is the function used to validate the input text by checking if it has too short input text or empty, it shows error message with border color change to red
    function validateName() {
        const val = nameInput.value.trim();
        if (!val) {
            nameError.innerText = 'Please write full name.';
            nameInput.style.borderColor = '#e53e3e';
            return false;
        } else if (val.length < 2) {
            nameError.innerText = 'Name must be two or more character.';
            nameInput.style.borderColor = '#e53e3e';
            return false;
        } else {
            nameError.innerText = '';
            nameInput.style.borderColor = '#cfdfed';
            return true;
        }
    }
    // this is the function used to validate the email if it has empty or in different format then it shows the error message as border color changer to red 
    function validateEmail() {
        const email = emailInput.value.trim();
        //'[^\s@]' one or more character that doesnot contain space or @ sign on username, next '@' must be contain and ([^\s@]+\.)+ is the domain part followed by . sign
        const pattern = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
        if (!email) {
            emailError.innerText = 'Please write your email.';
            emailInput.style.borderColor = '#e53e3e';
            return false;
        } else if (!pattern.test(email)) {
            emailError.innerText = 'Plesae enter a valid email (e.g., abc@example.com).';
            emailInput.style.borderColor = '#e53e3e';
            return false;
        } else {
            emailError.innerText = '';
            emailInput.style.borderColor = '#cfdfed';
            return true;
        }
    }
    // this is the function used to validate the message text by checking if it has too short input text or empty, it shows error message with border color change to red
    function validateMessage() {
        const msg = msgInput.value.trim();
        if (!msg) {
            msgError.innerText = 'Message cannot be empty.';
            msgInput.style.borderColor = '#e53e3e';
            return false;
        } else if (msg.length < 5) {
            msgError.innerText = 'Message must be at least five or more characters.';
            msgInput.style.borderColor = '#e53e3e';
            return false;
        } else {
            msgError.innerText = '';
            msgInput.style.borderColor = '#cfdfed';
            return true;
        }
    }

    // this is the real-time validation to form (name, email and message) field when user leaves the input or blur
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    msgInput.addEventListener('blur', validateMessage);
    // re-validate name while typing if error exit
    nameInput.addEventListener('input', () => { if (nameError.innerText) validateName(); });
    emailInput.addEventListener('input', () => { if (emailError.innerText) validateEmail(); });
    msgInput.addEventListener('input', () => { if (msgError.innerText) validateMessage(); });

    // Submitting the form by preventing default reload, validating inputs, showing feedback message and opening gmail in new tab and lastly resetting the form in default ways
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        clearFieldErrors();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMsgValid = validateMessage();

        // it shows the error message if any field is empty or invalid
        if (!isNameValid || !isEmailValid || !isMsgValid) {
            feedbackDiv.innerHTML = '<div class="error-message">Please complete the form.</div>';
            setTimeout(() => { if (feedbackDiv) feedbackDiv.innerHTML = ''; }, 3000);
            return;
        }

        // disable the button and shows the sending status 
        sendBtn.disabled = true;
        sendBtn.textContent = 'Sending...';
        feedbackDiv.innerHTML = '<div style="color:#2563eb;">Sending message...</div>';

        try {
            window.open("https://mail.google.com", "_blank");
            feedbackDiv.innerHTML = '<div class="success-message">Gmail opened in a new tab!</div>';
            form.reset();
            clearFieldErrors();
        } catch (error) {
            console.error(error);
            feedbackDiv.innerHTML = '<div class="error-message">Unable to open Gmail.</div>';
        } finally {
            sendBtn.disabled = false;
            sendBtn.textContent = 'Send Message';
        }
    });
}
