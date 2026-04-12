/**
 * TRIEDGE Industrial Solutions
 * Main JavaScript File
 * Handles navigation, form validation, and interactive features
 */

// ============================================
// Navbar Toggle
// ============================================

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("navMenu");

  // Toggle hamburger menu
  if (hamburger) {
    hamburger.addEventListener("click", function () {
      this.classList.toggle("active");
      navMenu.classList.toggle("active");
    });
  }

  // Close menu when a link is clicked
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });

  // Set active nav link
  setActiveNavLink();

  // Contact form validation
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit);
  }
});

/**
 * Set active navigation link based on current page
 */
function setActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });
}

// ============================================
// Form Validation & Submission
// ============================================

/**
 * Validate and submit contact form
 */
function handleFormSubmit(event) {
  event.preventDefault();

  // Clear previous error messages
  clearErrorMessages();

  // Get form values
  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const company = document.getElementById("company").value.trim();
  const subject = document.getElementById("subject").value;
  const message = document.getElementById("message").value.trim();
  const agree = document.getElementById("agree").checked;

  // Validate inputs
  let isValid = true;

  if (!fullName) {
    showError("nameError", "Please enter your full name");
    isValid = false;
  } else if (fullName.length < 3) {
    showError("nameError", "Name must be at least 3 characters");
    isValid = false;
  }

  if (!email) {
    showError("emailError", "Please enter your email address");
    isValid = false;
  } else if (!isValidEmail(email)) {
    showError("emailError", "Please enter a valid email address");
    isValid = false;
  }

  if (!phone) {
    showError("phoneError", "Please enter your phone number");
    isValid = false;
  } else if (!isValidPhone(phone)) {
    showError("phoneError", "Please enter a valid phone number");
    isValid = false;
  }

  if (!subject) {
    showError("subjectError", "Please select a subject");
    isValid = false;
  }

  if (!message) {
    showError("messageError", "Please enter your message");
    isValid = false;
  } else if (message.length < 10) {
    showError("messageError", "Message must be at least 10 characters");
    isValid = false;
  }

  if (!agree) {
    showError("agreeError", "Please agree to our terms and privacy policy");
    isValid = false;
  }

  // Submit form if valid
  if (isValid) {
    submitForm(fullName, email, phone, company, subject, message);
  }
}

/**
 * Validate email format
 */
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone format
 */
function isValidPhone(phone) {
  const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
  return phoneRegex.test(phone);
}

/**
 * Show error message
 */
function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = "block";
  }
}

/**
 * Clear all error messages
 */
function clearErrorMessages() {
  const errorElements = document.querySelectorAll(".error-message");
  errorElements.forEach((element) => {
    element.textContent = "";
    element.style.display = "none";
  });
}

/**
 * Submit form (simulate submission)
 */
function submitForm(fullName, email, phone, company, subject, message) {
  const formData = {
    name: fullName,
    email: email,
    phone: phone,
    company: company,
    subject: subject,
    message: message,
    timestamp: new Date().toISOString(),
  };

  // Log form data (in real scenario, send to server)
  console.log("Form submitted:", formData);

  // Show success message
  const contactForm = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");

  if (contactForm && formSuccess) {
    contactForm.style.display = "none";
    formSuccess.style.display = "block";

    // Reset form
    contactForm.reset();

    // Scroll to success message
    formSuccess.scrollIntoView({ behavior: "smooth", block: "center" });

    // Show form again after 5 seconds
    setTimeout(() => {
      contactForm.style.display = "block";
      formSuccess.style.display = "none";
    }, 5000);
  }
}

// ============================================
// Smooth Scroll
// ============================================

/**
 * Smooth scroll for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#" && document.querySelector(href)) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// ============================================
// Lazy Loading Images
// ============================================

/**
 * Lazy load images for performance
 */
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.add("loaded");
        imageObserver.unobserve(img);
      }
    });
  });

  document
    .querySelectorAll("img[data-src]")
    .forEach((img) => imageObserver.observe(img));
}

// ============================================
// Scroll Animation
// ============================================

/**
 * Add animations to elements on scroll
 */
function observeElements() {
  const options = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
        observer.unobserve(entry.target);
      }
    });
  }, options);

  // Observe service cards, stat cards, etc.
  document
    .querySelectorAll(
      ".service-card, .stat-card, .reason-card, .industry-card, .testimonial-card",
    )
    .forEach((element) => {
      observer.observe(element);
    });
}

// Call animation observer when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", observeElements);
} else {
  observeElements();
}

// ============================================
// Counter Animation for Statistics
// ============================================

/**
 * Animate counter numbers
 */
function animateCounters() {
  const counters = document.querySelectorAll(".stat-card h3");

  const options = {
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains("counted")) {
        const counter = entry.target;
        const target = parseInt(counter.textContent);

        if (!isNaN(target) && typeof target === "number") {
          animateValue(counter, 0, target, 2000);
          counter.classList.add("counted");
        }

        observer.unobserve(entry.target);
      }
    });
  }, options);

  counters.forEach((counter) => observer.observe(counter));
}

/**
 * Animate value from start to end
 */
function animateValue(element, start, end, duration) {
  const range = end - start;
  const increment = range / (duration / 16);
  let current = start;

  const timer = setInterval(() => {
    current += increment;
    if (current >= end) {
      element.textContent =
        end + (element.textContent.match(/[^\d]/g)?.join("") || "");
      clearInterval(timer);
    } else {
      element.textContent =
        Math.floor(current) +
        (element.textContent.match(/[^\d]/g)?.join("") || "");
    }
  }, 16);
}

// Call counter animation when page loads
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", animateCounters);
} else {
  animateCounters();
}

// ============================================
// Accessibility Features
// ============================================

/**
 * Enhance accessibility
 */
document.addEventListener("DOMContentLoaded", function () {
  // Add keyboard navigation for dropdowns
  const selects = document.querySelectorAll("select");
  selects.forEach((select) => {
    select.setAttribute("aria-label", "Select option");
  });

  // Add focus management for buttons
  const buttons = document.querySelectorAll("button, .btn");
  buttons.forEach((button) => {
    button.addEventListener("keypress", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        button.click();
      }
    });
  });
});

// ============================================
// Performance Optimization
// ============================================

/**
 * Defer non-critical JavaScript
 */
window.addEventListener("load", function () {
  // Load non-critical features after page load
  console.log("Page fully loaded");
});

/**
 * Throttle scroll events for better performance
 */
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Throttled scroll handler
window.addEventListener(
  "scroll",
  throttle(() => {
    // Add scroll-based animations here
  }, 100),
);

console.log("TRIEDGE Industrial Solutions - Website initialized successfully");
