// TRIEDGE Industrial Solutions - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
  
  // Mobile Hamburger Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }
  
  // Set active navigation link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    }
  });
  
  // Contact Form Validation and Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Clear previous errors
      document.querySelectorAll('.error-message').forEach(el => {
        el.style.display = 'none';
        el.textContent = '';
      });
      
      let isValid = true;
      
      // Get values
      const fullName = document.getElementById('fullName')?.value.trim() || '';
      const email = document.getElementById('email')?.value.trim() || '';
      const phone = document.getElementById('phone')?.value.trim() || '';
      const subject = document.getElementById('subject')?.value || '';
      const message = document.getElementById('message')?.value.trim() || '';
      const agree = document.getElementById('agree')?.checked || false;
      
      // Validate Full Name
      if (!fullName || fullName.length < 2) {
        showError('nameError', 'Please enter your full name');
        isValid = false;
      }
      
      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        showError('emailError', 'Please enter a valid email address');
        isValid = false;
      }
      
      // Validate Phone
      if (!phone || phone.length < 8) {
        showError('phoneError', 'Please enter a valid phone number');
        isValid = false;
      }
      
      // Validate Subject
      if (!subject || subject === '') {
        showError('subjectError', 'Please select a subject');
        isValid = false;
      }
      
      // Validate Message
      if (!message || message.length < 10) {
        showError('messageError', 'Please enter a message (minimum 10 characters)');
        isValid = false;
      }
      
      // Validate Agreement
      if (!agree) {
        showError('agreeError', 'Please agree to the terms');
        isValid = false;
      }
      
      if (isValid) {
        // Show success message
        const formContainer = document.querySelector('.contact-form-container');
        const successDiv = document.getElementById('formSuccess');
        if (formContainer && successDiv) {
          contactForm.style.display = 'none';
          successDiv.style.display = 'block';
          
          // Reset form for next time
          contactForm.reset();
          
          // Optional: Scroll to success message
          successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        
        // Log form data (replace with actual API call in production)
        console.log('Form submitted:', { fullName, email, phone, subject, message });
      }
    });
  }
  
  function showError(elementId, message) {
    const errorEl = document.getElementById(elementId);
    if (errorEl) {
      errorEl.textContent = message;
      errorEl.style.display = 'block';
    }
  }
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId !== '#' && targetId !== '#/') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
  
  // Counter animation for stats (if any)
  const animateNumbers = () => {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target') || stat.innerText);
      if (!isNaN(target) && !stat.classList.contains('animated')) {
        stat.classList.add('animated');
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            stat.innerText = target + '+';
            clearInterval(timer);
          } else {
            stat.innerText = Math.floor(current) + '+';
          }
        }, 30);
      }
    });
  };
  
  // Intersection Observer for fade-in animations
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe cards for animation
  document.querySelectorAll('.product-card, .highlight-card, .industry-item, .commitment-item, .info-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.5s ease';
    observer.observe(el);
  });
  
  // Add fade-in style
  const style = document.createElement('style');
  style.textContent = `
    .fade-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  document.head.appendChild(style);
  
  console.log('TRIEDGE Industrial Solutions - Website initialized');
});