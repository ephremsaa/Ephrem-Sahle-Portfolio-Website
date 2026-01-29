// Form Validation for Contact Form

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    // Form elements
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formMessage = document.getElementById('form-message');
    
    // Error elements
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const messageError = document.getElementById('message-error');
    
    // Validation patterns
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const namePattern = /^[A-Za-z\s]{2,50}$/;
    
    // Validation functions
    function validateName() {
        const name = nameInput.value.trim();
        
        if (!name) {
            showError(nameError, 'Name is required');
            return false;
        }
        
        if (!namePattern.test(name)) {
            showError(nameError, 'Name must be 2-50 letters and spaces only');
            return false;
        }
        
        clearError(nameError);
        return true;
    }
    
    function validateEmail() {
        const email = emailInput.value.trim();
        
        if (!email) {
            showError(emailError, 'Email is required');
            return false;
        }
        
        if (!emailPattern.test(email)) {
            showError(emailError, 'Please enter a valid email address');
            return false;
        }
        
        clearError(emailError);
        return true;
    }
    
    function validateMessage() {
        const message = messageInput.value.trim();
        
        if (!message) {
            showError(messageError, 'Message is required');
            return false;
        }
        
        if (message.length < 10) {
            showError(messageError, 'Message must be at least 10 characters');
            return false;
        }
        
        if (message.length > 1000) {
            showError(messageError, 'Message cannot exceed 1000 characters');
            return false;
        }
        
        clearError(messageError);
        return true;
    }
    
    // Error handling
    function showError(element, message) {
        if (element) {
            element.textContent = message;
            element.style.display = 'block';
        }
    }
    
    function clearError(element) {
        if (element) {
            element.textContent = '';
            element.style.display = 'none';
        }
    }
    
    function showFormMessage(message, type) {
        if (formMessage) {
            formMessage.textContent = message;
            formMessage.className = `form-message ${type}`;
            formMessage.style.display = 'block';
            
            // Scroll to message
            formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
    
    // Real-time validation
    if (nameInput) {
        nameInput.addEventListener('input', validateName);
        nameInput.addEventListener('blur', validateName);
    }
    
    if (emailInput) {
        emailInput.addEventListener('input', validateEmail);
        emailInput.addEventListener('blur', validateEmail);
    }
    
    if (messageInput) {
        messageInput.addEventListener('input', validateMessage);
        messageInput.addEventListener('blur', validateMessage);
    }
    
    // Name input formatting
    if (nameInput) {
        nameInput.addEventListener('input', function() {
            if (this.value.length > 0) {
                let words = this.value.split(' ');
                words = words.map(word => {
                    if (word.length > 0) {
                        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                    }
                    return word;
                });
                this.value = words.join(' ');
            }
        });
    }
    
    // Form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();
        
        if (isNameValid && isEmailValid && isMessageValid) {
            // Show loading state
            const submitButton = contactForm.querySelector('.btn-submit');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Reset form
                contactForm.reset();
                
                // Show success message
                showFormMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon.', 'success');
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Clear all errors
                clearError(nameError);
                clearError(emailError);
                clearError(messageError);
                
                // Save to localStorage (for demo purposes)
                const formData = {
                    name: nameInput.value.trim(),
                    email: emailInput.value.trim(),
                    message: messageInput.value.trim(),
                    timestamp: new Date().toISOString()
                };
                
                const existingSubmissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
                existingSubmissions.push(formData);
                localStorage.setItem('contactSubmissions', JSON.stringify(existingSubmissions));
                
            }, 1500);
        } else {
            showFormMessage('Please fix the errors in the form before submitting.', 'error');
            
            // Focus on first invalid field
            if (!isNameValid) {
                nameInput.focus();
            } else if (!isEmailValid) {
                emailInput.focus();
            } else if (!isMessageValid) {
                messageInput.focus();
            }
        }
    });
});
