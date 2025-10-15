// Navigation functionality
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const sections = document.querySelectorAll("section[id]");

  // Hamburger menu toggle
  hamburger.addEventListener("click", function () {
    navMenu.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  // Close mobile menu when clicking on a link
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      hamburger.classList.remove("active");
    });
  });

  // Active navigation on scroll
  function updateActiveNav() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => link.classList.remove("active"));
        if (navLink) {
          navLink.classList.add("active");
        }
      }
    });
  }

  // Smooth scrolling for anchor links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Update active nav on scroll
  window.addEventListener("scroll", updateActiveNav);

  // Initialize active nav
  updateActiveNav();

  // Hero buttons smooth scroll
  const heroButtons = document.querySelectorAll('.hero-buttons a[href^="#"]');
  heroButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Contact form functionality
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(this);
      const name = formData.get("name");
      const email = formData.get("email");
      const message = formData.get("message");

      // Simple validation
      if (!name || !email || !message) {
        alert("Por favor, completa todos los campos.");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Por favor, ingresa un email válido.");
        return;
      }

      // Create mailto link (since we don't have a backend)
      const subject = encodeURIComponent(`Mensaje de ${name} - Portafolio`);
      const body = encodeURIComponent(`
Nombre: ${name}
Email: ${email}

Mensaje:
${message}
            `);

      window.location.href = `mailto:alejandro.villarreal@email.com?subject=${subject}&body=${body}`;

      // Reset form
      this.reset();

      // Show success message
      const successMessage = document.createElement("div");
      successMessage.style.cssText = `
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: #10b981;
                color: white;
                padding: 1rem 2rem;
                border-radius: 8px;
                z-index: 10000;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            `;
      successMessage.textContent =
        "¡Mensaje enviado! Se abrirá tu cliente de email.";
      document.body.appendChild(successMessage);

      setTimeout(() => {
        document.body.removeChild(successMessage);
      }, 3000);
    });
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe project cards and other animated elements
  const animatedElements = document.querySelectorAll(
    ".project-card, .runbook-card, .skill-category, .compliance-card"
  );
  animatedElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  // Add loading state for images
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    img.addEventListener("load", function () {
      this.style.opacity = "1";
    });

    img.addEventListener("error", function () {
      // Replace with placeholder if image fails to load
      this.src =
        "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIyNSIgdmlld0JveD0iMCAwIDQwMCAyMjUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjI1IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTEyLjVMMTYwIDcyLjVIMjQwTDIwMCAxMTIuNVoiIGZpbGw9IiM5Q0EzQUYiLz4KPHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDMwQzI1LjUyMjggMzAgMzAgMjUuNTIyOCAzMCAyMEMzMCAxNC40NzcyIDI1LjUyMjggMTAgMjAgMTBDMTQuNDc3MiAxMCAxMCAxNC40NzcyIDEwIDIwQzEwIDI1LjUyMjggMTQuNDc3MiAzMCAyMCAzMFoiIGZpbGw9IiM2QjcyODAiLz4KPHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4K";
      this.alt = "Diagrama no disponible";
    });

    // Set initial opacity for fade-in effect
    img.style.opacity = "0";
    img.style.transition = "opacity 0.3s ease";
  });

  // Scroll progress indicator
  const createScrollProgress = () => {
    const progressBar = document.createElement("div");
    progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #1e40af, #06b6d4);
            z-index: 10000;
            transition: width 0.1s ease;
        `;
    document.body.appendChild(progressBar);

    window.addEventListener("scroll", () => {
      const scrolled =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;
      progressBar.style.width = scrolled + "%";
    });
  };

  createScrollProgress();

  // Add keyboard navigation support
  document.addEventListener("keydown", function (e) {
    // Navigate with arrow keys
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const currentSection = document.querySelector(".nav-link.active");
      if (currentSection) {
        const allNavLinks = Array.from(navLinks);
        const currentIndex = allNavLinks.indexOf(currentSection);
        let nextIndex;

        if (e.key === "ArrowDown") {
          nextIndex = (currentIndex + 1) % allNavLinks.length;
        } else {
          nextIndex =
            currentIndex === 0 ? allNavLinks.length - 1 : currentIndex - 1;
        }

        allNavLinks[nextIndex].click();
      }
    }
  });

  // Add print styles trigger
  window.addEventListener("beforeprint", function () {
    document.body.classList.add("printing");
  });

  window.addEventListener("afterprint", function () {
    document.body.classList.remove("printing");
  });

  // Performance optimization: lazy load sections
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("loaded");
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach((section) => {
    sectionObserver.observe(section);
  });
});

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

// Add resize handler for responsive adjustments
window.addEventListener(
  "resize",
  debounce(() => {
    // Recalculate positions on resize
    const event = new Event("scroll");
    window.dispatchEvent(event);
  }, 250)
);
