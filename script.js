// Enhanced Multi-Page JavaScript for Jerry Concept Hub

// Main application object
const JerryConceptHub = {
    // Form data storage
    formData: {
        personalInfo: {},
        courseSelection: {},
        schedule: {},
        currentStep: 1
    },

    // Course data
    courseData: {
        'basic-computer': { name: 'Basic Computer Skills', price: 15000, duration: '4 weeks' },
        'microsoft-office': { name: 'Microsoft Office Suite', price: 25000, duration: '6 weeks' },
        'graphic-design': { name: 'Graphic Design', price: 35000, duration: '8 weeks' },
        'web-development': { name: 'Web Development', price: 45000, duration: '12 weeks' },
        'digital-marketing': { name: 'Digital Marketing', price: 30000, duration: '6 weeks' },
        'data-analysis': { name: 'Data Analysis', price: 40000, duration: '10 weeks' }
    },

    // Schedule data
    scheduleData: {
        'morning': 'Morning (9:00 AM - 12:00 PM)',
        'afternoon': 'Afternoon (1:00 PM - 4:00 PM)',
        'evening': 'Evening (5:00 PM - 8:00 PM)',
        'weekend': 'Weekend (Saturdays 10:00 AM - 4:00 PM)'
    },

    // Initialize the application
    init() {
        this.initCommonFeatures();
        this.detectPageAndInit();
    },

    // Common features for both pages
    initCommonFeatures() {
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Handle navigation from index to enrollment with course pre-selection
        this.handleCoursePreSelection();
    },

    // Detect current page and initialize appropriate features
    detectPageAndInit() {
        const isFormPage = document.body.classList.contains('form-page');
        const isIndexPage = !isFormPage;

        if (isIndexPage) {
            this.initIndexPage();
        }

        if (isFormPage) {
            this.initEnrollmentPage();
        }
    },

    // Initialize index page features
    initIndexPage() {
        this.initMobileMenu();
        this.initNavbarScrollEffect();
        this.initScrollAnimations();
        this.initCourseNavigation();
    },

    // Initialize enrollment page features
    initEnrollmentPage() {
        this.initFormHandlers();
        this.initFormValidation();
        this.initFormEnhancements();
        this.handleFormNavigation();
    },

    // Mobile menu functionality
    initMobileMenu() {
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', function() {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
            
            // Close menu when clicking on a link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        }
    },

    // Navbar scroll effect
    initNavbarScrollEffect() {
        let ticking = false;
        
        const updateNavbar = () => {
            const navbar = document.querySelector('.navbar');
            if (navbar) {
                if (window.scrollY > 100) {
                    navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                    navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
                } else {
                    navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                    navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
                }
            }
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        });
    },

    // Scroll animations
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        document.querySelectorAll('.service-card, .course-card, .testimonial-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            card.style.transition = 'all 0.6s ease';
            observer.observe(card);
        });
    },

    // Course navigation from index to enrollment
    initCourseNavigation() {
        document.querySelectorAll('[data-course]').forEach(element => {
            element.addEventListener('click', (e) => {
                if (element.tagName === 'A') return; // Skip if it's already a link
                
                const course = element.dataset.course;
                if (course) {
                    window.location.href = `enrollment.html?course=${course}`;
                }
            });
        });
    },

    // Handle course pre-selection from URL parameters
    handleCoursePreSelection() {
        const urlParams = new URLSearchParams(window.location.search);
        const selectedCourse = urlParams.get('course');
        
        if (selectedCourse && document.body.classList.contains('form-page')) {
            // Wait for DOM to be ready, then pre-select course
            setTimeout(() => {
                const courseCard = document.querySelector(`[data-course="${selectedCourse}"]`);
                if (courseCard) {
                    courseCard.click();
                }
            }, 100);
        }
    },

    // Initialize form handlers
    initFormHandlers() {
        // Course selection handlers
        document.querySelectorAll('.form-course-card').forEach(card => {
            card.addEventListener('click', () => {
                document.querySelectorAll('.form-course-card').forEach(c => c.classList.remove('selected'));
                card.classList.add('selected');
                this.formData.courseSelection.course = card.dataset.course;
                this.hideError('courseError');
            });
        });

        // Schedule selection handlers
        document.querySelectorAll('.schedule-option').forEach(option => {
            option.addEventListener('click', () => {
                document.querySelectorAll('.schedule-option').forEach(o => o.classList.remove('selected'));
                option.classList.add('selected');
                this.formData.schedule.timeSlot = option.dataset.schedule;
                this.hideError('scheduleError');
            });
        });

        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        const startDateInput = document.getElementById('startDate');
        if (startDateInput) {
            startDateInput.setAttribute('min', today);
        }
    },

    // Form validation setup
    initFormValidation() {
        // Clear errors on input
        document.querySelectorAll('.form-input, .form-select').forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('error');
                const errorElement = this.parentNode.querySelector('.error-message');
                if (errorElement) {
                    errorElement.style.display = 'none';
                }
            });
        });

        // Auto-format phone number
        const phoneInput = document.getElementById('phone');
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length >= 10) {
                    value = value.substring(0, 11);
                }
                e.target.value = value;
            });
        }
    },

    // Form enhancements
    initFormEnhancements() {
        // Button hover effects
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
            });
            
            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });

        // Keyboard navigation
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
                e.preventDefault();
                if (this.formData.currentStep < 4) {
                    this.nextStep();
                } else if (this.formData.currentStep === 4) {
                    this.submitForm();
                }
            }
        });
    },

    // Handle form navigation
    handleFormNavigation() {
        // Make functions globally available for onclick handlers
        window.nextStep = () => this.nextStep();
        window.prevStep = () => this.prevStep();
        window.submitForm = () => this.submitForm();
    },

    // Navigate to next step
    nextStep() {
        if (this.validateCurrentStep()) {
            this.saveCurrentStepData();
            this.formData.currentStep++;
            this.showStep(this.formData.currentStep);
            this.updateProgressBar();
            
            if (this.formData.currentStep === 4) {
                this.updateSummary();
            }
        }
    },

    // Navigate to previous step
    prevStep() {
        if (this.formData.currentStep > 1) {
            this.formData.currentStep--;
            this.showStep(this.formData.currentStep);
            this.updateProgressBar();
        }
    },

    // Show specific step
    showStep(stepNumber) {
        // Hide all steps
        document.querySelectorAll('.form-step').forEach(step => {
            step.classList.remove('active');
        });
        
        // Show current step
        const currentStepElement = document.getElementById(`step${stepNumber}`);
        if (currentStepElement) {
            currentStepElement.classList.add('active');
        }
        
        // Update step indicators
        document.querySelectorAll('.step-item').forEach(item => {
            const itemStep = parseInt(item.dataset.step);
            item.classList.remove('active', 'completed');
            
            if (itemStep === stepNumber) {
                item.classList.add('active');
            } else if (itemStep < stepNumber) {
                item.classList.add('completed');
            }
        });

        // Scroll to top of form
        document.querySelector('.main-content').scrollTop = 0;
    },

    // Update progress bar
    updateProgressBar() {
        const progress = (this.formData.currentStep / 4) * 100;
        const progressFill = document.getElementById('progressFill');
        if (progressFill) {
            progressFill.style.width = progress + '%';
        }
    },

    // Validate current step
    validateCurrentStep() {
        const step = this.formData.currentStep;
        let isValid = true;

        switch(step) {
            case 1:
                const name = document.getElementById('fullName').value.trim();
                const email = document.getElementById('email').value.trim();
                const phone = document.getElementById('phone').value.trim();
                
                if (!name) {
                    this.showError('fullNameError', 'Please enter your full name');
                    isValid = false;
                }
                
                if (!email) {
                    this.showError('emailError', 'Please enter your email address');
                    isValid = false;
                } else if (!this.isValidEmail(email)) {
                    this.showError('emailError', 'Please enter a valid email address');
                    isValid = false;
                }
                
                if (!phone) {
                    this.showError('phoneError', 'Please enter your phone number');
                    isValid = false;
                } else if (phone.length < 10) {
                    this.showError('phoneError', 'Please enter a valid phone number');
                    isValid = false;
                }
                break;
                
            case 2:
                if (!this.formData.courseSelection.course) {
                    this.showError('courseError', 'Please select a course');
                    isValid = false;
                }
                break;
                
            case 3:
                if (!this.formData.schedule.timeSlot) {
                    this.showError('scheduleError', 'Please select a schedule');
                    isValid = false;
                }
                break;
        }
        
        return isValid;
    },

    // Save current step data
    saveCurrentStepData() {
        const step = this.formData.currentStep;
        
        switch(step) {
            case 1:
                this.formData.personalInfo = {
                    name: document.getElementById('fullName').value,
                    email: document.getElementById('email').value,
                    phone: document.getElementById('phone').value,
                    experience: document.getElementById('experience').value
                };
                break;
                
            case 3:
                this.formData.schedule.startDate = document.getElementById('startDate').value;
                this.formData.schedule.notes = document.getElementById('additionalNotes').value;
                break;
        }
    },

    // Update form summary
    updateSummary() {
        // Personal info
        document.getElementById('summaryName').textContent = this.formData.personalInfo.name;
        document.getElementById('summaryEmail').textContent = this.formData.personalInfo.email;
        document.getElementById('summaryPhone').textContent = this.formData.personalInfo.phone;
        document.getElementById('summaryExperience').textContent = 
            this.formData.personalInfo.experience || 'Not specified';
        
        // Course info
        const selectedCourse = this.courseData[this.formData.courseSelection.course];
        document.getElementById('summaryCourse').textContent = selectedCourse.name;
        document.getElementById('summarySchedule').textContent = 
            this.scheduleData[this.formData.schedule.timeSlot];
        document.getElementById('summaryStartDate').textContent = 
            this.formData.schedule.startDate || 'To be determined';
        
        // Total amount
        document.getElementById('totalAmount').textContent = 
            `₦${selectedCourse.price.toLocaleString()}`;
    },

    // Submit form
    submitForm() {
        const termsAgree = document.getElementById('termsAgree').checked;
        
        if (!termsAgree) {
            this.showError('termsError', 'Please agree to the terms and conditions');
            return;
        }
        
        // Show loading state
        const submitBtn = document.querySelector('.btn-submit');
        if (submitBtn) {
            submitBtn.textContent = 'Processing...';
            submitBtn.disabled = true;
        }
        
        // Simulate processing delay
        setTimeout(() => {
            this.formData.currentStep = 5;
            this.showStep(5);
            this.updateProgressBar();
            
            // Log form data (in production, send to server)
            console.log('Form submitted:', this.formData);
            
            // Optional: Send to server
            // this.sendFormDataToServer(this.formData);
        }, 1500);
    },

    // Show error message
    showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            const inputElement = errorElement.previousElementSibling;
            
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            
            if (inputElement && (inputElement.classList.contains('form-input') || inputElement.classList.contains('form-select'))) {
                inputElement.classList.add('error');
                inputElement.focus();
            }
        }
    },

    // Hide error message
    hideError(elementId) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    },

    // Validate email format
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    },

    // Send form data to server (for future implementation)
    sendFormDataToServer(data) {
        // Example implementation
        /*
        fetch('/api/enroll', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            console.log('Success:', result);
            // Handle success
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was an error submitting your form. Please try again.');
            // Reset submit button
            const submitBtn = document.querySelector('.btn-submit');
            if (submitBtn) {
                submitBtn.textContent = 'Enroll Now';
                submitBtn.disabled = false;
            }
        });
        */
    }
};

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    JerryConceptHub.init();
});

// Make the main object globally available for debugging
window.JerryConceptHub = JerryConceptHub;