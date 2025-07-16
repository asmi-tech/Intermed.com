// Doctr X Medical Template - Main JavaScript

(function() {
    'use strict';

    // DOM Elements
    const header = document.querySelector('.header');
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const forms = document.querySelectorAll('form');

    // Initialize the app
    function init() {
        setupHeader();
        setupMobileMenu();
        setupSmoothScrolling();
        setupFormHandling();
        setupAnimations();
    }

    // Header scroll effect
    function setupHeader() {
        if (!header) return;

        const isHomePage = document.body.classList.contains('home-page');
        
        if (isHomePage) {
            header.classList.add('transparent');
        }

        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > 100) {
                header.classList.remove('transparent');
                header.style.background = 'rgba(255, 255, 255, 0.95)';
            } else if (isHomePage) {
                header.classList.add('transparent');
                header.style.background = 'rgba(255, 255, 255, 0.05)';
            }
        });
    }

    // Mobile menu functionality
    function setupMobileMenu() {
        if (!mobileMenuButton || !mobileMenu) return;

        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            
            // Toggle button icon
            const icon = mobileMenuButton.querySelector('i') || mobileMenuButton;
            if (mobileMenu.classList.contains('active')) {
                icon.innerHTML = '✕';
            } else {
                icon.innerHTML = '☰';
            }
        });

        // Close mobile menu when clicking on a link
        const mobileNavLinks = mobileMenu.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                mobileMenuButton.innerHTML = '☰';
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!header.contains(event.target)) {
                mobileMenu.classList.remove('active');
                mobileMenuButton.innerHTML = '☰';
            }
        });
    }

    // Smooth scrolling for anchor links
    function setupSmoothScrolling() {
        navLinks.forEach(link => {
            if (link.getAttribute('href').startsWith('#')) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        const headerHeight = header ? header.offsetHeight : 0;
                        const targetPosition = targetElement.offsetTop - headerHeight - 20;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            }
        });
    }

    // Form handling
    function setupFormHandling() {
        forms.forEach(form => {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                handleFormSubmit(this);
            });
        });
    }

    function handleFormSubmit(form) {
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.innerHTML = '<span class="loading"></span> Sending...';
        submitButton.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            // Reset button
            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
            
            // Show success message
            showNotification('Message sent successfully!', 'success');
            
            // Reset form
            form.reset();
        }, 2000);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add notification styles if not already present
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #fff;
                    border-radius: 8px;
                    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                    z-index: 10000;
                    animation: slideInRight 0.3s ease-out;
                    max-width: 400px;
                }
                .notification-success {
                    border-left: 4px solid #4CAF50;
                }
                .notification-error {
                    border-left: 4px solid #f44336;
                }
                .notification-content {
                    padding: 16px 20px;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                .notification-close {
                    background: none;
                    border: none;
                    font-size: 18px;
                    cursor: pointer;
                    color: #999;
                    margin-left: 10px;
                }
                @keyframes slideInRight {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(styles);
        }

        document.body.appendChild(notification);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);

        // Close button functionality
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            notification.remove();
        });
    }

    // Animation on scroll
    function setupAnimations() {
        const animatedElements = document.querySelectorAll('.card, .testimonial, .hero-text, .hero-image');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }

    // Utility functions
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Doctor profile interactions
    function setupDoctorProfile() {
        const contactButton = document.querySelector('.contact-doctor-btn');
        if (contactButton) {
            contactButton.addEventListener('click', function(e) {
                e.preventDefault();
                // Open contact modal or scroll to contact form
                const contactSection = document.querySelector('#contact-form');
                if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                } else {
                    showNotification('Contact form not available on this page');
                }
            });
        }
    }

    // Testimonial carousel (if needed)
    function setupTestimonialCarousel() {
        const testimonialContainer = document.querySelector('.testimonials-grid');
        if (!testimonialContainer) return;

        // Add touch/swipe support for mobile
        let startX = 0;
        let scrollLeft = 0;

        testimonialContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX - testimonialContainer.offsetLeft;
            scrollLeft = testimonialContainer.scrollLeft;
        });

        testimonialContainer.addEventListener('touchmove', (e) => {
            if (!startX) return;
            e.preventDefault();
            const x = e.touches[0].pageX - testimonialContainer.offsetLeft;
            const walk = (x - startX) * 2;
            testimonialContainer.scrollLeft = scrollLeft - walk;
        });

        testimonialContainer.addEventListener('touchend', () => {
            startX = 0;
        });
    }

    // Contact form validation
    function validateForm(form) {
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            const value = field.value.trim();
            const fieldContainer = field.closest('.form-group');
            
            // Remove existing error
            const existingError = fieldContainer.querySelector('.field-error');
            if (existingError) {
                existingError.remove();
            }
            field.classList.remove('error');

            // Validate field
            if (!value) {
                isValid = false;
                showFieldError(field, 'This field is required');
            } else if (field.type === 'email' && !isValidEmail(value)) {
                isValid = false;
                showFieldError(field, 'Please enter a valid email address');
            } else if (field.type === 'tel' && !isValidPhone(value)) {
                isValid = false;
                showFieldError(field, 'Please enter a valid phone number');
            }
        });

        return isValid;
    }

    function showFieldError(field, message) {
        field.classList.add('error');
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.color = '#f44336';
        errorElement.style.fontSize = '14px';
        errorElement.style.marginTop = '5px';
        
        field.parentNode.appendChild(errorElement);
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPhone(phone) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
    }

    // Initialize everything when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Also setup page-specific functionality
    document.addEventListener('DOMContentLoaded', function() {
        setupDoctorProfile();
        setupTestimonialCarousel();
    });

    // Expose useful functions globally
    window.DoctrApp = {
        showNotification,
        validateForm
    };

    



  // Responsive fix
  window.addEventListener('resize', updateCarousel);





})();