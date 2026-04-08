// Professional script with EmailJS, analytics, enhanced UX
// EmailJS: Replace YOUR_PUBLIC_KEY, YOUR_SERVICE_ID, YOUR_TEMPLATE_ID

const contactForm = document.getElementById('contactForm');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const nav = document.getElementById('nav');

// EmailJS Public Keys (user to replace)
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // e.g. user_abc123
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID'; // e.g. service_xyz
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID'; // e.g. template_def

// Load EmailJS
(function() {
    emailjs.init(EMAILJS_PUBLIC_KEY);
})();

header.addEventListener('scroll', () => {
    if (window.scrollY > 50) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
});

// Enhanced Form Submit with EmailJS
contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Validation
    if (!data.name?.trim() || !data.email?.trim() || !data.message?.trim()) {
        showMessage('Please fill all required fields.', 'error');
        resetForm();
        return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        showMessage('Please enter a valid email.', 'error');
        resetForm();
        return;
    }
    
    try {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, data);
        showMessage('Thank you! Your enquiry has been sent. We\'ll respond within 24 hours.', 'success');
        contactForm.reset();
        gtag('event', 'form_submit', { 'method': 'emailjs' }); // GA event
    } catch (error) {
        console.error('EmailJS error:', error);
        showMessage('Send failed. Please try WhatsApp or call.', 'error');
    }
    
    function resetForm() {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

// Success/Error Modal
function showMessage(msg, type) {
    const modal = document.createElement('div');
    modal.className = `message-modal ${type}`;
    modal.innerHTML = `
        <div class="message-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <p>${msg}</p>
            <button onclick="this.parentElement.parentElement.remove()">OK</button>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.remove(), 5000);
}

// Rest of original script (nav, scroll, etc.)
// ... [previous script code pasted here for completeness]
