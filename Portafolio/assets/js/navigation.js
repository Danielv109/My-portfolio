// Navigation and Scroll Management
const Navigation = {
  elements: {
    header: null,
    navMenu: null,
    navToggle: null,
    navLinks: [],
    sections: [],
  },

  state: {
    isMenuOpen: false,
    currentSection: "home",
    isScrolling: false,
    lastScrollY: 0,
  },

  /**
   * Initialize navigation
   */
  init() {
    this.cacheElements();
    this.bindEvents();
    this.updateActiveSection();
    this.createScrollProgress();
    Utils.performance.mark("navigation-init-complete");
  },

  /**
   * Cache DOM elements
   */
  cacheElements() {
    this.elements.header = document.getElementById("header");
    this.elements.navMenu = document.getElementById("nav-menu");
    this.elements.navToggle = document.getElementById("nav-toggle");
    this.elements.navLinks = Array.from(document.querySelectorAll(".nav-link"));
    this.elements.sections = Array.from(
      document.querySelectorAll("section[id]")
    );
  },

  /**
   * Bind event listeners
   */
  bindEvents() {
    // Mobile menu toggle
    if (this.elements.navToggle) {
      this.elements.navToggle.addEventListener("click", (e) => {
        e.preventDefault();
        this.toggleMobileMenu();
      });
    }

    // Navigation links
    this.elements.navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const targetId = link.getAttribute("href").substring(1);
        this.navigateToSection(targetId);
        this.closeMobileMenu();
      });
    });

    // Scroll events
    const throttledScrollHandler = Utils.throttle(() => {
      this.handleScroll();
    }, CONFIG.scroll.updateThrottle);

    window.addEventListener("scroll", throttledScrollHandler, {
      passive: true,
    });

    // Resize events
    const debouncedResizeHandler = Utils.debounce(() => {
      this.handleResize();
    }, 250);

    window.addEventListener("resize", debouncedResizeHandler);

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
      this.handleKeyboardNavigation(e);
    });

    // Close mobile menu on outside click
    document.addEventListener("click", (e) => {
      if (
        this.state.isMenuOpen &&
        !this.elements.navMenu.contains(e.target) &&
        !this.elements.navToggle.contains(e.target)
      ) {
        this.closeMobileMenu();
      }
    });

    // Handle browser back/forward
    window.addEventListener("popstate", () => {
      this.handlePopState();
    });
  },

  /**
   * Toggle mobile menu
   */
  toggleMobileMenu() {
    this.state.isMenuOpen = !this.state.isMenuOpen;

    this.elements.navToggle.classList.toggle("active", this.state.isMenuOpen);
    this.elements.navMenu.classList.toggle("active", this.state.isMenuOpen);

    // Prevent body scroll when menu is open
    document.body.style.overflow = this.state.isMenuOpen ? "hidden" : "";

    // Update aria attributes
    this.elements.navToggle.setAttribute(
      "aria-expanded",
      this.state.isMenuOpen
    );
    this.elements.navMenu.setAttribute("aria-hidden", !this.state.isMenuOpen);
  },

  /**
   * Close mobile menu
   */
  closeMobileMenu() {
    if (this.state.isMenuOpen) {
      this.state.isMenuOpen = false;
      this.elements.navToggle.classList.remove("active");
      this.elements.navMenu.classList.remove("active");
      document.body.style.overflow = "";

      this.elements.navToggle.setAttribute("aria-expanded", "false");
      this.elements.navMenu.setAttribute("aria-hidden", "true");
    }
  },

  /**
   * Navigate to section
   * @param {string} sectionId - Section ID to navigate to
   */
  navigateToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (!targetSection) return;

    Utils.scrollToElement(targetSection);

    // Update URL without reload
    const newUrl = `${window.location.pathname}#${sectionId}`;
    history.pushState({ section: sectionId }, "", newUrl);

    // Update active section immediately for responsive feedback
    this.setActiveSection(sectionId);
  },

  /**
   * Handle scroll events
   */
  handleScroll() {
    const currentScrollY = window.pageYOffset;

    // Update header appearance based on scroll
    this.updateHeaderOnScroll(currentScrollY);

    // Update scroll progress
    this.updateScrollProgress();

    // Update active section
    this.updateActiveSection();

    // Hide mobile menu on scroll
    if (
      this.state.isMenuOpen &&
      Math.abs(currentScrollY - this.state.lastScrollY) > 100
    ) {
      this.closeMobileMenu();
    }

    this.state.lastScrollY = currentScrollY;
  },

  /**
   * Update header appearance on scroll
   * @param {number} scrollY - Current scroll position
   */
  updateHeaderOnScroll(scrollY) {
    if (!this.elements.header) return;

    const isScrolled = scrollY > 50;
    this.elements.header.classList.toggle("scrolled", isScrolled);
  },

  /**
   * Update scroll progress bar
   */
  updateScrollProgress() {
    const scrollProgress = document.querySelector(".scroll-progress");
    if (!scrollProgress) return;

    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;

    scrollProgress.style.width = scrolled + "%";
  },

  /**
   * Update active section based on scroll position
   */
  updateActiveSection() {
    if (this.state.isScrolling) return;

    const scrollPosition = window.pageYOffset + CONFIG.scroll.offset + 50;
    let activeSection = "home";

    // Find current section
    for (const section of this.elements.sections) {
      const sectionTop = Utils.getElementOffset(section);
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        activeSection = section.id;
        break;
      }
    }

    // Special case for bottom of page
    if (
      window.innerHeight + window.pageYOffset >=
      document.body.offsetHeight - 100
    ) {
      activeSection =
        this.elements.sections[this.elements.sections.length - 1]?.id ||
        activeSection;
    }

    this.setActiveSection(activeSection);
  },

  /**
   * Set active section
   * @param {string} sectionId - Section ID to set as active
   */
  setActiveSection(sectionId) {
    if (this.state.currentSection === sectionId) return;

    this.state.currentSection = sectionId;

    // Update navigation links
    this.elements.navLinks.forEach((link) => {
      const linkSection =
        link.getAttribute("data-section") ||
        link.getAttribute("href").substring(1);
      link.classList.toggle("active", linkSection === sectionId);
    });

    // Update document title
    const sectionTitle = CONFIG.navigation.find(
      (item) => item.id === sectionId
    )?.label;
    if (sectionTitle && sectionTitle !== "Home") {
      document.title = `${sectionTitle} - ${CONFIG.site.name}`;
    } else {
      document.title = `${CONFIG.site.name} - ${CONFIG.site.title}`;
    }
  },

  /**
   * Handle keyboard navigation
   * @param {KeyboardEvent} e - Keyboard event
   */
  handleKeyboardNavigation(e) {
    // Escape key closes mobile menu
    if (e.key === "Escape" && this.state.isMenuOpen) {
      this.closeMobileMenu();
      return;
    }

    // Arrow key navigation
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();

      const currentIndex = CONFIG.navigation.findIndex(
        (item) => item.id === this.state.currentSection
      );
      let nextIndex;

      if (e.key === "ArrowDown") {
        nextIndex = (currentIndex + 1) % CONFIG.navigation.length;
      } else {
        nextIndex =
          currentIndex === 0 ? CONFIG.navigation.length - 1 : currentIndex - 1;
      }

      const nextSection = CONFIG.navigation[nextIndex];
      if (nextSection) {
        this.navigateToSection(nextSection.id);
      }
    }
  },

  /**
   * Handle browser back/forward
   */
  handlePopState() {
    const hash = window.location.hash.substring(1);
    const sectionId = hash || "home";

    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      Utils.scrollToElement(targetSection);
      this.setActiveSection(sectionId);
    }
  },

  /**
   * Handle window resize
   */
  handleResize() {
    // Close mobile menu on desktop
    if (Utils.isBreakpoint("md") && this.state.isMenuOpen) {
      this.closeMobileMenu();
    }

    // Recalculate positions
    this.updateActiveSection();
  },

  /**
   * Create scroll progress bar
   */
  createScrollProgress() {
    const existingProgress = document.querySelector(".scroll-progress");
    if (existingProgress) return;

    const progressBar = Components.createScrollProgress();
    document.body.appendChild(progressBar);
  },

  /**
   * Smooth scroll to top
   */
  scrollToTop() {
    Utils.scrollToElement(document.body, 0);
  },

  /**
   * Get section scroll position
   * @param {string} sectionId - Section ID
   * @returns {number} Scroll position
   */
  getSectionPosition(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return 0;

    return Utils.getElementOffset(section) - CONFIG.scroll.offset;
  },

  /**
   * Check if section is in viewport
   * @param {string} sectionId - Section ID
   * @returns {boolean} True if section is in viewport
   */
  isSectionInViewport(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return false;

    return Utils.isInViewport(section);
  },

  /**
   * Destroy navigation
   */
  destroy() {
    // Remove event listeners
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("popstate", this.handlePopState);

    // Reset state
    this.state = {
      isMenuOpen: false,
      currentSection: "home",
      isScrolling: false,
      lastScrollY: 0,
    };

    // Reset body overflow
    document.body.style.overflow = "";
  },
};

// Make Navigation available globally
window.Navigation = Navigation;
