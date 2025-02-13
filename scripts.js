document.addEventListener("DOMContentLoaded", function () {
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);
      window.scrollTo({
        top: targetSection.offsetTop - 70,
        behavior: "smooth",
      });
    });
  });

  // Navbar scroll effect
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", function () {
    navbar.classList.toggle("scrolled", window.scrollY > 100);
  });

  // Initialize tooltips
  $('[data-toggle="tooltip"]').tooltip();

  // Carousel settings
  $(".carousel").carousel({
    interval: 3000,
  });

  // Contact form submission
  const contactForm = document.getElementById("contactForm");
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    let valid = validateForm(name, email, subject, message);

    if (valid) {
      submitForm(contactForm);
    }
  });

  // Form validation function
  function validateForm(name, email, subject, message) {
    let valid = true;

    if (!name) {
      showError("name", "Name is required.");
      valid = false;
    } else if (!/^[A-Za-z ]+$/.test(name)) {
      showError("name", "Name should contain only letters and spaces.");
      valid = false;
    }

    if (!email) {
      showError("email", "Email is required.");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError("email", "Enter a valid email address.");
      valid = false;
    }

    if (subject.length < 5) {
      showError("subject", "Subject must be at least 5 characters.");
      valid = false;
    }

    if (message.length < 10) {
      showError("message", "Message must be at least 10 characters.");
      valid = false;
    }

    return valid;
  }

  // Show error message
  function showError(inputId, message) {
    let inputField = document.getElementById(inputId);
    let errorSpan =
      document.getElementById(inputId + "-error") ||
      createErrorSpan(inputField);
    errorSpan.innerText = message;
  }

  // Create error span
  function createErrorSpan(inputField) {
    const errorSpan = document.createElement("span");
    errorSpan.id = inputField.id + "-error";
    errorSpan.style.color = "red";
    inputField.parentNode.appendChild(errorSpan);
    return errorSpan;
  }

  // Clear all error messages
  function clearErrors() {
    document.querySelectorAll("span[id$='-error']").forEach((span) => {
      span.innerText = "";
    });
  }

  // Simulate form submission
  function submitForm(form) {
    const submitButton = form.querySelector("button[type='submit']");
    submitButton.innerHTML = "Sending...";
    submitButton.disabled = true;

    setTimeout(() => {
      alert("Thank you! Your message has been sent successfully.");
      form.reset();
      submitButton.innerHTML = "Submit";
      submitButton.disabled = false;
    }, 2000);
  }
  document
    .getElementById("newsletterForm")
    .addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent the default form submission
      document.getElementById("successMessage").style.display = "block"; // Show success message
      this.reset(); // Reset the form fields
    });
});
