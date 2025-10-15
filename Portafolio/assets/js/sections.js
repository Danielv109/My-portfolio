// Section Management and Content Loading
const Sections = {
  /**
   * Initialize all sections
   */
  init() {
    this.loadAllSections();
    this.initializeAnimations();
    this.initializeContactForm();
    this.preloadImages();
    Utils.performance.mark("sections-init-complete");
  },

  /**
   * Load all section content
   */
  loadAllSections() {
    // Load header
    const header = document.getElementById("header");
    if (header) {
      header.innerHTML = Components.createNavigation();
    }

    // Load hero section
    const hero = document.querySelector("#home");
    if (hero) {
      hero.innerHTML = Components.createHero();
    }

    // Load about section
    const about = document.querySelector("#about");
    if (about) {
      about.innerHTML = Components.createAbout();
    }

    // Load projects section
    const projects = document.querySelector("#projects");
    if (projects) {
      projects.innerHTML = Components.createProjects();
    }

    // Load runbooks section
    const runbooks = document.querySelector("#runbooks");
    if (runbooks) {
      runbooks.innerHTML = Components.createRunbooks();
    }

    // Load skills section
    const skills = document.querySelector("#skills");
    if (skills) {
      skills.innerHTML = Components.createSkills();
    }

    // Load compliance section
    const compliance = document.querySelector("#compliance");
    if (compliance) {
      compliance.innerHTML = Components.createCompliance();
    }

    // Load contact section
    const contact = document.querySelector("#contact");
    if (contact) {
      contact.innerHTML = Components.createContact();
    }

    // Load footer
    const footer = document.getElementById("footer");
    if (footer) {
      footer.innerHTML = Components.createFooter();
    }
  },

  /**
   * Initialize scroll animations
   */
  initializeAnimations() {
    if (Utils.prefersReducedMotion()) {
      return; // Skip animations for users who prefer reduced motion
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: CONFIG.animations.threshold,
      rootMargin: CONFIG.animations.rootMargin,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          const delay = index * CONFIG.animations.stagger;
          Utils.addClassWithDelay(entry.target, "animate-fade-in-up", delay);
          observer.unobserve(entry.target); // Only animate once
        }
      });
    }, observerOptions);

    // Observe animated elements
    const animatedElements = document.querySelectorAll(`
      .project-card,
      .runbook-card,
      .skill-category,
      .compliance-card,
      .about-content p,
      .hero-text h1,
      .hero-subtitle,
      .hero-buttons
    `);

    animatedElements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = `opacity ${CONFIG.animations.duration}ms ${CONFIG.animations.easing}, transform ${CONFIG.animations.duration}ms ${CONFIG.animations.easing}`;
      observer.observe(el);
    });

    // Stagger animation for navigation items
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach((link, index) => {
      Utils.addClassWithDelay(link, "animate-fade-in-left", index * 100);
    });
  },

  /**
   * Initialize contact form
   */
  initializeContactForm() {
    const contactForm = document.getElementById("contact-form");
    if (!contactForm) return;

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleContactSubmission(contactForm);
    });

    // Real-time validation if enabled
    if (CONFIG.form.validateOnInput) {
      const inputs = contactForm.querySelectorAll("input, textarea");
      inputs.forEach((input) => {
        input.addEventListener("blur", () => {
          this.validateField(input);
        });

        input.addEventListener("input", () => {
          this.clearFieldError(input);
        });
      });
    }
  },

  /**
   * Handle contact form submission
   * @param {HTMLFormElement} form - Contact form element
   */
  handleContactSubmission(form) {
    const formData = new FormData(form);
    const data = {
      name: formData.get("name")?.trim(),
      email: formData.get("email")?.trim(),
      message: formData.get("message")?.trim(),
    };

    // Validate form data
    const validation = this.validateContactForm(data);
    if (!validation.isValid) {
      this.showFormErrors(validation.errors);
      return;
    }

    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = "Enviando...";
    submitButton.disabled = true;

    // Create mailto link (fallback since no backend)
    const subject = encodeURIComponent(`Mensaje de ${data.name} - Portafolio`);
    const body = encodeURIComponent(`
Nombre: ${data.name}
Email: ${data.email}

Mensaje:
${data.message}

---
Enviado desde el portafolio de ${CONFIG.site.name}
    `);

    const mailtoLink = `mailto:${CONFIG.site.email}?subject=${subject}&body=${body}`;

    // Open email client
    window.location.href = mailtoLink;

    // Reset form and show success message
    setTimeout(() => {
      form.reset();
      submitButton.textContent = originalText;
      submitButton.disabled = false;

      if (CONFIG.form.showSuccessMessage) {
        Utils.showNotification(
          "¡Mensaje enviado! Se abrirá tu cliente de email.",
          "success",
          CONFIG.form.successDuration
        );
      }
    }, 1000);
  },

  /**
   * Validate contact form data
   * @param {Object} data - Form data
   * @returns {Object} Validation result
   */
  validateContactForm(data) {
    const errors = [];

    if (!data.name || data.name.length < 2) {
      errors.push({
        field: "name",
        message: "El nombre debe tener al menos 2 caracteres.",
      });
    }

    if (!data.email || !Utils.isValidEmail(data.email)) {
      errors.push({
        field: "email",
        message: "Por favor, ingresa un email válido.",
      });
    }

    if (!data.message || data.message.length < 10) {
      errors.push({
        field: "message",
        message: "El mensaje debe tener al menos 10 caracteres.",
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  },

  /**
   * Validate individual form field
   * @param {HTMLInputElement} field - Form field element
   */
  validateField(field) {
    const value = field.value.trim();
    let isValid = true;
    let message = "";

    switch (field.type) {
      case "email":
        isValid = Utils.isValidEmail(value);
        message = isValid ? "" : "Por favor, ingresa un email válido.";
        break;
      case "text":
        isValid = value.length >= 2;
        message = isValid
          ? ""
          : `${field.name} debe tener al menos 2 caracteres.`;
        break;
      default:
        if (field.tagName === "TEXTAREA") {
          isValid = value.length >= 10;
          message = isValid
            ? ""
            : "El mensaje debe tener al menos 10 caracteres.";
        }
    }

    if (!isValid) {
      this.showFieldError(field, message);
    } else {
      this.clearFieldError(field);
    }

    return isValid;
  },

  /**
   * Show form validation errors
   * @param {Array} errors - Array of error objects
   */
  showFormErrors(errors) {
    errors.forEach((error) => {
      const field = document.querySelector(`[name="${error.field}"]`);
      if (field) {
        this.showFieldError(field, error.message);
      }
    });

    // Focus first error field
    if (errors.length > 0) {
      const firstErrorField = document.querySelector(
        `[name="${errors[0].field}"]`
      );
      if (firstErrorField) {
        firstErrorField.focus();
      }
    }
  },

  /**
   * Show field error
   * @param {HTMLElement} field - Form field element
   * @param {string} message - Error message
   */
  showFieldError(field, message) {
    this.clearFieldError(field);

    field.classList.add("error");

    const errorElement = document.createElement("div");
    errorElement.className = "field-error";
    errorElement.style.cssText = `
      color: var(--color-danger);
      font-size: var(--font-size-sm);
      margin-top: var(--space-1);
    `;
    errorElement.textContent = message;

    field.parentNode.appendChild(errorElement);
  },

  /**
   * Clear field error
   * @param {HTMLElement} field - Form field element
   */
  clearFieldError(field) {
    field.classList.remove("error");

    const existingError = field.parentNode.querySelector(".field-error");
    if (existingError) {
      existingError.remove();
    }
  },

  /**
   * Preload critical images
   */
  async preloadImages() {
    const criticalImages = [
      "assets/images/perimeter-sdwan-diagram.svg",
      "assets/images/siem-soar-diagram.svg",
      "assets/images/pci-hardening-diagram.svg",
      "assets/images/ztna-sase-diagram.svg",
    ];

    try {
      await Utils.preloadImages(criticalImages);
      console.log("Critical images preloaded successfully");
    } catch (error) {
      console.warn("Some images failed to preload:", error);
    }
  },

  /**
   * Handle image loading with fallbacks
   */
  initializeImageHandling() {
    const images = document.querySelectorAll("img[data-src]");

    // Lazy loading observer
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          this.loadImage(img);
          imageObserver.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  },

  /**
   * Load image with fallback
   * @param {HTMLImageElement} img - Image element
   */
  loadImage(img) {
    const src = img.dataset.src || img.src;

    img.addEventListener("load", () => {
      img.style.opacity = "1";
      img.classList.remove("loading");
    });

    img.addEventListener("error", () => {
      img.src = this.getPlaceholderImage();
      img.alt = "Diagrama no disponible";
      img.style.opacity = "1";
      img.classList.remove("loading");
    });

    img.style.opacity = "0";
    img.style.transition = "opacity 0.3s ease";
    img.classList.add("loading");
    img.src = src;
  },

  /**
   * Get placeholder image for failed loads
   * @returns {string} Placeholder image data URI
   */
  getPlaceholderImage() {
    return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIyNSIgdmlld0JveD0iMCAwIDQwMCAyMjUiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjI1IiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTEyLjVMMTYwIDcyLjVIMjQwTDIwMCAxMTIuNVoiIGZpbGw9IiM5Q0EzQUYiLz4KPGNpcmNsZSBjeD0iMjAwIiBjeT0iMTEyLjUiIHI9IjMwIiBzdHJva2U9IiM2QjcyODAiIHN0cm9rZS13aWR0aD0iMiIgZmlsbD0ibm9uZSIvPgo8dGV4dCB4PSIyMDAiIHk9IjE1MCIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjNkI3MjgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5EaWFncmFtYSBubyBkaXNwb25pYmxlPC90ZXh0Pgo8L3N2Zz4K";
  },

  /**
   * Copy project link to clipboard
   * @param {string} projectId - Project ID
   */
  async copyProjectLink(projectId) {
    const url = `${window.location.origin}${window.location.pathname}#projects`;
    const success = await Utils.copyToClipboard(url);

    if (success) {
      Utils.showNotification("Enlace copiado al portapapeles", "success");
    } else {
      Utils.showNotification("Error al copiar enlace", "error");
    }
  },

  /**
   * Toggle project details
   * @param {string} projectId - Project ID
   */
  toggleProjectDetails(projectId) {
    const projectCard = document.querySelector(`[data-project="${projectId}"]`);
    if (!projectCard) return;

    const details = projectCard.querySelector(".project-details");
    const isExpanded = details.style.display !== "none";

    details.style.display = isExpanded ? "none" : "grid";

    // Update aria attributes
    projectCard.setAttribute("aria-expanded", !isExpanded);
  },

  /**
   * Print friendly view
   */
  preparePrintView() {
    document.body.classList.add("printing");

    // Expand all collapsed content for printing
    const collapsedElements = document.querySelectorAll(
      '[style*="display: none"]'
    );
    collapsedElements.forEach((el) => {
      el.style.display = "";
    });
  },

  /**
   * Restore normal view after printing
   */
  restoreNormalView() {
    document.body.classList.remove("printing");
  },
};

// Print event listeners
window.addEventListener("beforeprint", () => {
  Sections.preparePrintView();
});

window.addEventListener("afterprint", () => {
  Sections.restoreNormalView();
});

// Make Sections available globally
window.Sections = Sections;
