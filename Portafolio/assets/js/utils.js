// Utility Functions
const Utils = {
  /**
   * Debounce function to limit function calls
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @returns {Function} Debounced function
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * Throttle function to limit function calls
   * @param {Function} func - Function to throttle
   * @param {number} limit - Time limit in milliseconds
   * @returns {Function} Throttled function
   */
  throttle(func, limit) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  },

  /**
   * Get current viewport width
   * @returns {number} Viewport width
   */
  getViewportWidth() {
    return (
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth
    );
  },

  /**
   * Check if current viewport matches breakpoint
   * @param {string} breakpoint - Breakpoint name (sm, md, lg, xl, xxl)
   * @returns {boolean} True if viewport is at or above breakpoint
   */
  isBreakpoint(breakpoint) {
    const width = this.getViewportWidth();
    return width >= CONFIG.breakpoints[breakpoint];
  },

  /**
   * Check if user prefers reduced motion
   * @returns {boolean} True if user prefers reduced motion
   */
  prefersReducedMotion() {
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  },

  /**
   * Generate unique ID
   * @param {string} prefix - ID prefix
   * @returns {string} Unique ID
   */
  generateId(prefix = "id") {
    return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
  },

  /**
   * Get element's offset from top of document
   * @param {Element} element - DOM element
   * @returns {number} Offset from top
   */
  getElementOffset(element) {
    if (!element) return 0;
    const rect = element.getBoundingClientRect();
    return rect.top + window.pageYOffset;
  },

  /**
   * Smooth scroll to element with offset
   * @param {Element|string} target - Element or selector
   * @param {number} offset - Additional offset
   */
  scrollToElement(target, offset = CONFIG.scroll.offset) {
    const element =
      typeof target === "string" ? document.querySelector(target) : target;
    if (!element) return;

    const targetPosition = this.getElementOffset(element) - offset;

    if (CONFIG.scroll.smooth && !this.prefersReducedMotion()) {
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    } else {
      window.scrollTo(0, targetPosition);
    }
  },

  /**
   * Check if element is in viewport
   * @param {Element} element - DOM element
   * @param {number} threshold - Intersection threshold (0-1)
   * @returns {boolean} True if element is in viewport
   */
  isInViewport(element, threshold = 0.1) {
    if (!element) return false;

    const rect = element.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const windowWidth =
      window.innerWidth || document.documentElement.clientWidth;

    const verticalInView = rect.top <= windowHeight && rect.bottom >= 0;
    const horizontalInView = rect.left <= windowWidth && rect.right >= 0;

    if (!verticalInView || !horizontalInView) return false;

    const visibleHeight =
      Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
    const visibleWidth =
      Math.min(rect.right, windowWidth) - Math.max(rect.left, 0);
    const visibleArea = visibleHeight * visibleWidth;
    const totalArea = rect.height * rect.width;

    return visibleArea / totalArea >= threshold;
  },

  /**
   * Add class with animation delay
   * @param {Element} element - DOM element
   * @param {string} className - Class name to add
   * @param {number} delay - Delay in milliseconds
   */
  addClassWithDelay(element, className, delay = 0) {
    if (!element) return;

    setTimeout(() => {
      element.classList.add(className);
    }, delay);
  },

  /**
   * Remove class with animation delay
   * @param {Element} element - DOM element
   * @param {string} className - Class name to remove
   * @param {number} delay - Delay in milliseconds
   */
  removeClassWithDelay(element, className, delay = 0) {
    if (!element) return;

    setTimeout(() => {
      element.classList.remove(className);
    }, delay);
  },

  /**
   * Format number with commas
   * @param {number} num - Number to format
   * @returns {string} Formatted number
   */
  formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },

  /**
   * Escape HTML to prevent XSS
   * @param {string} text - Text to escape
   * @returns {string} Escaped text
   */
  escapeHtml(text) {
    const div = document.createElement("div");
    div.textContent = text;
    return div.innerHTML;
  },

  /**
   * Validate email address
   * @param {string} email - Email to validate
   * @returns {boolean} True if valid email
   */
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Get URL parameters
   * @param {string} name - Parameter name
   * @returns {string|null} Parameter value or null
   */
  getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  },

  /**
   * Copy text to clipboard
   * @param {string} text - Text to copy
   * @returns {Promise<boolean>} Promise resolving to success status
   */
  async copyToClipboard(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = text;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        const success = document.execCommand("copy");
        document.body.removeChild(textArea);
        return success;
      }
    } catch (error) {
      console.error("Failed to copy to clipboard:", error);
      return false;
    }
  },

  /**
   * Show notification message
   * @param {string} message - Message to show
   * @param {string} type - Message type (success, error, warning, info)
   * @param {number} duration - Duration to show message
   */
  showNotification(message, type = "info", duration = 3000) {
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      color: white;
      font-weight: 500;
      z-index: 10000;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      max-width: 300px;
      word-wrap: break-word;
    `;

    // Set background color based on type
    const colors = {
      success: "#10b981",
      error: "#ef4444",
      warning: "#f59e0b",
      info: "#3b82f6",
    };
    notification.style.backgroundColor = colors[type] || colors.info;

    notification.textContent = message;
    document.body.appendChild(notification);

    // Animate in
    requestAnimationFrame(() => {
      notification.style.transform = "translateX(0)";
    });

    // Auto remove
    setTimeout(() => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        if (notification.parentNode) {
          document.body.removeChild(notification);
        }
      }, 300);
    }, duration);

    // Allow manual close
    notification.addEventListener("click", () => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        if (notification.parentNode) {
          document.body.removeChild(notification);
        }
      }, 300);
    });
  },

  /**
   * Load image with promise
   * @param {string} src - Image source
   * @returns {Promise<HTMLImageElement>} Promise resolving to loaded image
   */
  loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  },

  /**
   * Preload images
   * @param {string[]} sources - Array of image sources
   * @returns {Promise<HTMLImageElement[]>} Promise resolving to loaded images
   */
  preloadImages(sources) {
    return Promise.all(sources.map((src) => this.loadImage(src)));
  },

  /**
   * Get contrast color for background
   * @param {string} hexColor - Hex color code
   * @returns {string} 'black' or 'white'
   */
  getContrastColor(hexColor) {
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? "black" : "white";
  },

  /**
   * Performance monitoring
   */
  performance: {
    /**
     * Mark performance timing
     * @param {string} name - Mark name
     */
    mark(name) {
      if (window.performance && window.performance.mark) {
        window.performance.mark(name);
      }
    },

    /**
     * Measure performance between marks
     * @param {string} name - Measure name
     * @param {string} startMark - Start mark name
     * @param {string} endMark - End mark name
     */
    measure(name, startMark, endMark) {
      if (window.performance && window.performance.measure) {
        try {
          window.performance.measure(name, startMark, endMark);
        } catch (error) {
          console.warn("Performance measurement failed:", error);
        }
      }
    },

    /**
     * Get performance entries
     * @param {string} type - Entry type
     * @returns {PerformanceEntry[]} Performance entries
     */
    getEntries(type) {
      if (window.performance && window.performance.getEntriesByType) {
        return window.performance.getEntriesByType(type);
      }
      return [];
    },
  },
};

// Make Utils available globally
window.Utils = Utils;
