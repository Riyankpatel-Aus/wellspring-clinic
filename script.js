// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}

// Scroll Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

// Observe all elements with slide-up class
document.querySelectorAll('.slide-up').forEach(element => {
    observer.observe(element);
});

// BMI Calculator
const bmiForm = document.getElementById('bmiForm');
const bmiResult = document.getElementById('bmiResult');
const resetBtn = document.getElementById('resetBtn');

if (bmiForm) {
    bmiForm.addEventListener('submit', (e) => {
        e.preventDefault();
        calculateBMI();
    });
}

if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        bmiForm.reset();
        bmiResult.style.display = 'none';
    });
}

function calculateBMI() {
    let height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const heightUnit = document.getElementById('heightUnit').value;

    // Validate inputs
    if (!height || !weight || height <= 0 || weight <= 0) {
        alert('Please enter valid positive numbers for height and weight.');
        return;
    }

    // Convert height to meters if in cm
    if (heightUnit === 'cm') {
        height = height / 100;
    }

    // Calculate BMI using formula: BMI = weight (kg) / height (m)^2
    const bmi = (weight / (height * height)).toFixed(1);

    // Determine category and color
    let category = '';
    let categoryClass = '';
    let advice = '';

    if (bmi < 18.5) {
        category = 'Underweight';
        categoryClass = 'underweight';
        advice = 'You may need to gain weight. Consult with a healthcare provider for personalized advice.';
    } else if (bmi >= 18.5 && bmi <= 24.9) {
        category = 'Normal';
        categoryClass = 'normal';
        advice = 'You have a healthy weight. Maintain your current lifestyle with balanced diet and regular exercise.';
    } else if (bmi >= 25 && bmi <= 29.9) {
        category = 'Overweight';
        categoryClass = 'overweight';
        advice = 'You may benefit from weight loss. Consider a balanced diet and increased physical activity.';
    } else {
        category = 'Obese';
        categoryClass = 'obese';
        advice = 'We recommend consulting with a healthcare provider to discuss a weight management plan.';
    }

    // Display result
    document.getElementById('bmiValue').textContent = bmi;
    document.getElementById('bmiCategory').textContent = category;
    document.getElementById('bmiCategory').className = `bmi-category ${categoryClass}`;
    document.getElementById('bmiAdvice').textContent = advice;
    bmiResult.style.display = 'block';

    // Scroll to result
    bmiResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Appointment Form
const appointmentForm = document.getElementById('appointmentForm');
const appointmentSuccess = document.getElementById('appointmentSuccess');

if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate form
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const date = document.getElementById('date').value;

        if (!name || !email || !phone || !date) {
            alert('Please fill in all required fields.');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Validate phone format (basic)
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(phone)) {
            alert('Please enter a valid phone number.');
            return;
        }

        // Validate date is not in the past
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            alert('Please select a date that is today or in the future.');
            return;
        }

        // Show success message
        appointmentForm.style.display = 'none';
        appointmentSuccess.style.display = 'block';

        // In a real application, you would send this data to a server
        console.log('Appointment Request:', {
            name,
            email,
            phone,
            date,
            service: document.getElementById('service').value,
            message: document.getElementById('message').value
        });

        // Reset form after 5 seconds
        setTimeout(() => {
            appointmentForm.reset();
            appointmentForm.style.display = 'block';
            appointmentSuccess.style.display = 'none';
        }, 5000);
    });
}

// Contact Form
const contactForm = document.getElementById('contactForm');
const contactSuccess = document.getElementById('contactSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate form
        const name = document.getElementById('contactName').value.trim();
        const email = document.getElementById('contactEmail').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('contactMessage').value.trim();

        if (!name || !email || !subject || !message) {
            alert('Please fill in all required fields.');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Show success message
        contactForm.style.display = 'none';
        contactSuccess.style.display = 'block';

        // In a real application, you would send this data to a server
        console.log('Contact Form:', {
            name,
            email,
            phone: document.getElementById('contactPhone').value,
            subject,
            message
        });

        // Reset form after 5 seconds
        setTimeout(() => {
            contactForm.reset();
            contactForm.style.display = 'block';
            contactSuccess.style.display = 'none';
        }, 5000);
    });
}

// Set minimum date for appointment form to today
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
}

// Smooth scrolling for anchor links
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
