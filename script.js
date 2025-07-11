// Simple animation for skill bars when they come into view
const skillBars = document.querySelectorAll('.skill-progress');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.style.width; // Store the initial width
            entry.target.style.width = '0'; // Set to 0 to prepare for animation
            setTimeout(() => {
                entry.target.style.width = width; // Animate to the original width
            }, 100); // Small delay to ensure the 0 width is applied before animation
        }
    });
}, { threshold: 0.5 }); // Trigger when 50% of the element is visible

skillBars.forEach(bar => {
    observer.observe(bar);
});


// Smooth scrolling for navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// AJAX Contact Form Submission with Success Message
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();
        const formData = new FormData(contactForm);
        const formAction = contactForm.getAttribute('action');
        const formMethod = contactForm.getAttribute('method') || 'POST';

        try {
            const response = await fetch(formAction, {
                method: formMethod,
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (response.ok) {
                contactForm.innerHTML = '<div class="success-message" style="text-align:center; color: var(--neon-blue); font-size: 1.2rem; padding: 2rem 0;">Thank you! Your message has been sent.</div>';
            } else {
                contactForm.innerHTML = '<div class="error-message" style="text-align:center; color: red; font-size: 1.2rem; padding: 2rem 0;">Oops! There was a problem sending your message. Please try again later.</div>';
            }
        } catch (error) {
            contactForm.innerHTML = '<div class="error-message" style="text-align:center; color: red; font-size: 1.2rem; padding: 2rem 0;">Oops! There was a problem sending your message. Please try again later.</div>';
        }
    });
}