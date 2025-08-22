// Form data storage
let formData = {
    personalInfo: {},
    courseSelection: {},
    schedule: {},
    currentStep: 1
};

// Course data
const courseData = {
    'basic-computer': { name: 'Basic Computer Skills', price: 15000 },
    'microsoft-office': { name: 'Microsoft Office Suite', price: 25000 },
    'graphic-design': { name: 'Graphic Design', price: 35000 },
    'web-development': { name: 'Web Development', price: 45000 },
    'digital-marketing': { name: 'Digital Marketing', price: 30000 },
    'data-analysis': { name: 'Data Analysis', price: 40000 }
};

const scheduleData = {
    'morning': 'Morning (9:00 AM - 12:00 PM)',
    'afternoon': 'Afternoon (1:00 PM - 4:00 PM)',
    'evening': 'Evening (5:00 PM - 8:00 PM)',
    'weekend': 'Weekend (Saturdays 10:00 AM - 4:00 PM)'
};

// Initialize form
document.addEventListener('DOMContentLoaded', function() {
    // Course selection handlers
    document.querySelectorAll('.course-card').forEach(card => {
        card.addEventListener('click', function() {
            document.querySelectorAll('.course-card').forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            formData.courseSelection.course = this.dataset.course;
            hideError('courseError');
        });
    });

    // Schedule selection handlers
    document.querySelectorAll('.schedule-option').forEach(option => {
        option.addEventListener('click', function() {
            document.querySelectorAll('.schedule-option').forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
            formData.schedule.timeSlot = this.dataset.schedule;
            hideError('scheduleError');
        });
    });

    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('startDate').setAttribute('min', today);
    
    // Add input event listeners to clear errors on typing
    document.querySelectorAll('.form-input, .form-select').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('error');
            const errorElement = this.parentNode.querySelector('.error-message');
            if (errorElement) {
                errorElement.style.display = 'none';
            }
        });
    });
    
    // Add hover effects to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Auto-format phone number
    document.getElementById('phone').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 10) {
            value = value.substring(0, 11);
        }
        e.target.value = value;
    });
    
    // Prevent form submission on Enter key
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA') {
            e.preventDefault();
            if (formData.currentStep < 4) {
                nextStep();
            } else if (formData.currentStep === 4) {
                submitForm();
            }
        }
    });
});

function nextStep() {
    if (validateCurrentStep()) {
        const currentStep = formData.currentStep;
        
        // Save current step data
        saveCurrentStepData();
        
        // Move to next step
        formData.currentStep++;
        showStep(formData.currentStep);
        updateProgressBar();
        
        // Update summary if going to step 4
        if (formData.currentStep === 4) {
            updateSummary();
        }
    }
}

function prevStep() {
    if (formData.currentStep > 1) {
        formData.currentStep--;
        showStep(formData.currentStep);
        updateProgressBar();
    }
}

function showStep(stepNumber) {
    // Hide all steps
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.remove('active');
    });
    
    // Show current step
    document.getElementById(`step${stepNumber}`).classList.add('active');
    
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
}

function updateProgressBar() {
    const progress = (formData.currentStep / 4) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
}

function validateCurrentStep() {
    const step = formData.currentStep;
    let isValid = true;

    switch(step) {
        case 1:
            const name = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            
            if (!name) {
                showError('fullNameError', 'Please enter your full name');
                isValid = false;
            }
            
            if (!email) {
                showError('emailError', 'Please enter your email address');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showError('emailError', 'Please enter a valid email address');
                isValid = false;
            }
            
            if (!phone) {
                showError('phoneError', 'Please enter your phone number');
                isValid = false;
            }
            break;
            
        case 2:
            if (!formData.courseSelection.course) {
                showError('courseError', 'Please select a course');
                isValid = false;
            }
            break;
            
        case 3:
            if (!formData.schedule.timeSlot) {
                showError('scheduleError', 'Please select a schedule');
                isValid = false;
            }
            break;
    }
    
    return isValid;
}

function saveCurrentStepData() {
    const step = formData.currentStep;
    
    switch(step) {
        case 1:
            formData.personalInfo = {
                name: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                experience: document.getElementById('experience').value
            };
            break;
            
        case 3:
            formData.schedule.startDate = document.getElementById('startDate').value;
            formData.schedule.notes = document.getElementById('additionalNotes').value;
            break;
    }
}

function updateSummary() {
    // Personal info
    document.getElementById('summaryName').textContent = formData.personalInfo.name;
    document.getElementById('summaryEmail').textContent = formData.personalInfo.email;
    document.getElementById('summaryPhone').textContent = formData.personalInfo.phone;
    document.getElementById('summaryExperience').textContent = 
        formData.personalInfo.experience || 'Not specified';
    
    // Course info
    const selectedCourse = courseData[formData.courseSelection.course];
    document.getElementById('summaryCourse').textContent = selectedCourse.name;
    document.getElementById('summarySchedule').textContent = 
        scheduleData[formData.schedule.timeSlot];
    document.getElementById('summaryStartDate').textContent = 
        formData.schedule.startDate || 'To be determined';
    
    // Total amount
    document.getElementById('totalAmount').textContent = 
        `₦${selectedCourse.price.toLocaleString()}`;
}

function submitForm() {
    const termsAgree = document.getElementById('termsAgree').checked;
    
    if (!termsAgree) {
        showError('termsError', 'Please agree to the terms and conditions');
        return;
    }
    
    // Simulate form submission
    formData.currentStep = 5;
    showStep(5);
    updateProgressBar();
    
    // In a real application, you would send data to a server here
    console.log('Form submitted:', formData);
    
    // Optional: Send email or save to database
    // sendFormDataToServer(formData);
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    const inputElement = errorElement.previousElementSibling;
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    
    if (inputElement && (inputElement.classList.contains('form-input') || inputElement.classList.contains('form-select'))) {
        inputElement.classList.add('error');
    }
}

function hideError(elementId) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Optional: Function to send form data to server
function sendFormDataToServer(data) {
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
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error submitting your form. Please try again.');
    });
    */
}