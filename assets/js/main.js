// Main Application Entry Point
const App = {
  /**
   * Initialize the application
   */
  async init() {
    try {
      Utils.performance.mark("app-init-start");

      // Wait for DOM to be ready
      if (document.readyState === "loading") {
        await new Promise((resolve) => {
          document.addEventListener("DOMContentLoaded", resolve);
        });
      }

      // Initialize core modules
      await this.initializeModules();

      // Setup global event listeners
      this.setupGlobalEvents();

      // Handle initial URL hash
      this.handleInitialNavigation();

      // Mark app as ready
      document.body.classList.add("app-ready");

      Utils.performance.mark("app-init-end");
      Utils.performance.measure(
        "app-initialization",
        "app-init-start",
        "app-init-end"
      );

      console.log("Portfolio application initialized successfully");

      // Performance logging in development
      if (this.isDevelopment()) {
        this.logPerformanceMetrics();
      }
    } catch (error) {
      console.error("Failed to initialize application:", error);
      this.handleInitializationError(error);
    }
  },

  /**
   * Initialize core modules in order
   */
  async initializeModules() {
    const modules = [
      { name: "Sections", module: Sections },
      { name: "Navigation", module: Navigation },
    ];

    for (const { name, module } of modules) {
      try {
        if (module && typeof module.init === "function") {
          await module.init();
          console.log(`${name} module initialized`);
        }
      } catch (error) {
        console.error(`Failed to initialize ${name} module:`, error);
        throw error;
      }
    }
  },

  /**
   * Setup global event listeners
   */
  setupGlobalEvents() {
    // Error handling
    window.addEventListener("error", this.handleGlobalError.bind(this));
    window.addEventListener(
      "unhandledrejection",
      this.handleUnhandledRejection.bind(this)
    );

    // Visibility change (for performance optimization)
    document.addEventListener(
      "visibilitychange",
      this.handleVisibilityChange.bind(this)
    );

    // Online/offline status
    window.addEventListener("online", this.handleOnlineStatus.bind(this));
    window.addEventListener("offline", this.handleOfflineStatus.bind(this));

    // Performance observer (if supported)
    if ("PerformanceObserver" in window) {
      this.setupPerformanceObserver();
    }

    // Service worker registration (if available)
    if ("serviceWorker" in navigator && this.isProduction()) {
      this.registerServiceWorker();
    }
  },

  /**
   * Handle initial navigation based on URL hash
   */
  handleInitialNavigation() {
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
      // Small delay to ensure everything is rendered
      setTimeout(() => {
        Navigation.navigateToSection(hash);
      }, 100);
    }
  },

  /**
   * Handle global JavaScript errors
   * @param {ErrorEvent} event - Error event
   */
  handleGlobalError(event) {
    console.error("Global error:", event.error);

    // In production, you might want to send this to an error tracking service
    if (this.isProduction()) {
      this.reportError(event.error, "global-error");
    }

    // Show user-friendly error message
    Utils.showNotification(
      "Se produjo un error inesperado. Por favor, recarga la página.",
      "error",
      5000
    );
  },

  /**
   * Handle unhandled promise rejections
   * @param {PromiseRejectionEvent} event - Promise rejection event
   */
  handleUnhandledRejection(event) {
    console.error("Unhandled promise rejection:", event.reason);

    if (this.isProduction()) {
      this.reportError(event.reason, "unhandled-rejection");
    }

    // Prevent the default browser behavior
    event.preventDefault();
  },

  /**
   * Handle visibility change (tab switching)
   */
  handleVisibilityChange() {
    if (document.hidden) {
      // Page is hidden - pause non-essential operations
      this.pauseAnimations();
    } else {
      // Page is visible - resume operations
      this.resumeAnimations();
    }
  },

  /**
   * Handle online status
   */
  handleOnlineStatus() {
    Utils.showNotification("Conexión restaurada", "success", 2000);
    document.body.classList.remove("offline");
  },

  /**
   * Handle offline status
   */
  handleOfflineStatus() {
    Utils.showNotification("Sin conexión a Internet", "warning", 3000);
    document.body.classList.add("offline");
  },

  /**
   * Setup performance observer
   */
  setupPerformanceObserver() {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === "largest-contentful-paint") {
            console.log("LCP:", entry.startTime);
          }
          if (entry.entryType === "first-input") {
            console.log("FID:", entry.processingStart - entry.startTime);
          }
        }
      });

      observer.observe({
        entryTypes: ["largest-contentful-paint", "first-input"],
      });
    } catch (error) {
      console.warn("Performance observer not supported:", error);
    }
  },

  /**
   * Register service worker
   */
  async registerServiceWorker() {
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");
      console.log("Service Worker registered successfully:", registration);

      // Listen for updates
      registration.addEventListener("updatefound", () => {
        console.log("New Service Worker version available");
        // You could show a notification to the user here
      });
    } catch (error) {
      console.warn("Service Worker registration failed:", error);
    }
  },

  /**
   * Pause animations for performance
   */
  pauseAnimations() {
    document.body.classList.add("animations-paused");
  },

  /**
   * Resume animations
   */
  resumeAnimations() {
    document.body.classList.remove("animations-paused");
  },

  /**
   * Handle initialization errors
   * @param {Error} error - Initialization error
   */
  handleInitializationError(error) {
    document.body.innerHTML = `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        padding: 2rem;
        text-align: center;
        font-family: system-ui, sans-serif;
      ">
        <div>
          <h1 style="color: #ef4444; margin-bottom: 1rem;">Error de Inicialización</h1>
          <p style="color: #6b7280; margin-bottom: 2rem;">
            No se pudo cargar el portafolio correctamente.
          </p>
          <button 
            onclick="window.location.reload()" 
            style="
              background: #3b82f6;
              color: white;
              border: none;
              padding: 0.75rem 1.5rem;
              border-radius: 0.5rem;
              cursor: pointer;
              font-size: 1rem;
            "
          >
            Recargar Página
          </button>
        </div>
      </div>
    `;
  },

  /**
   * Report error to external service (placeholder)
   * @param {Error} error - Error to report
   * @param {string} context - Error context
   */
  reportError(error, context) {
    // Placeholder for error reporting service
    // In a real application, you would send this to a service like Sentry, Bugsnag, etc.
    const errorData = {
      message: error.message,
      stack: error.stack,
      context,
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: new Date().toISOString(),
    };

    console.log("Error reported:", errorData);

    // Example: Send to error tracking service
    // fetch('/api/errors', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(errorData)
    // });
  },

  /**
   * Log performance metrics
   */
  logPerformanceMetrics() {
    setTimeout(() => {
      const navigation = performance.getEntriesByType("navigation")[0];
      const paint = performance.getEntriesByType("paint");

      console.group("Performance Metrics");
      console.log(
        "Page Load Time:",
        navigation.loadEventEnd - navigation.fetchStart,
        "ms"
      );
      console.log(
        "DOM Content Loaded:",
        navigation.domContentLoadedEventEnd - navigation.fetchStart,
        "ms"
      );

      paint.forEach((entry) => {
        console.log(`${entry.name}:`, entry.startTime, "ms");
      });

      // Custom marks
      const marks = performance.getEntriesByType("mark");
      marks.forEach((mark) => {
        console.log(`Custom Mark - ${mark.name}:`, mark.startTime, "ms");
      });

      console.groupEnd();
    }, 2000);
  },

  /**
   * Check if running in development mode
   * @returns {boolean} True if development
   */
  isDevelopment() {
    return (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname.includes("github.io")
    );
  },

  /**
   * Check if running in production mode
   * @returns {boolean} True if production
   */
  isProduction() {
    return !this.isDevelopment();
  },

  /**
   * Get application version
   * @returns {string} Application version
   */
  getVersion() {
    return "1.0.0"; // You could read this from package.json in a build process
  },

  /**
   * Clean up resources
   */
  destroy() {
    // Clean up modules
    if (Navigation && typeof Navigation.destroy === "function") {
      Navigation.destroy();
    }

    // Remove global event listeners
    window.removeEventListener("error", this.handleGlobalError);
    window.removeEventListener(
      "unhandledrejection",
      this.handleUnhandledRejection
    );
    document.removeEventListener(
      "visibilitychange",
      this.handleVisibilityChange
    );
    window.removeEventListener("online", this.handleOnlineStatus);
    window.removeEventListener("offline", this.handleOfflineStatus);

    // Clear any timers or intervals
    // (Add any cleanup needed for your specific application)

    document.body.classList.remove("app-ready", "offline", "animations-paused");

    console.log("Application cleaned up");
  },
};

// Initialize the application when the script loads
App.init();

// Make App available globally for debugging
window.App = App;

// Handle browser refresh/navigation away
window.addEventListener("beforeunload", () => {
  App.destroy();
});

// Export for potential module use
if (typeof module !== "undefined" && module.exports) {
  module.exports = App;
}
