// Component Generation Functions
const Components = {
  /**
   * Create navigation component
   * @returns {string} Navigation HTML
   */
  createNavigation() {
    const navItems = CONFIG.navigation
      .map(
        (item) => `
      <li>
        <a href="${item.href}" class="nav-link" data-section="${item.id}">
          ${item.label}
        </a>
      </li>
    `
      )
      .join("");

    return `
      <nav class="nav">
        <div class="nav-brand">
          <a href="#home">${CONFIG.site.name}</a>
        </div>
        <ul class="nav-menu" id="nav-menu">
          ${navItems}
        </ul>
        <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    `;
  },

  /**
   * Create hero section
   * @returns {string} Hero HTML
   */
  createHero() {
    return `
      <div class="container">
        <div class="hero-content">
          <div class="hero-text">
            <h1>${CONFIG.site.name}</h1>
            <p class="hero-subtitle">${CONFIG.site.title}</p>
            <div class="hero-buttons">
              <a href="#projects" class="btn btn-primary">View Projects</a>
              <a href="assets/alejandro-portfolio-summary.pdf" class="btn btn-secondary" download>
                Download 1-Page PDF
              </a>
            </div>
          </div>
          <div class="hero-visual">
            <!-- Banner space for breathing room -->
          </div>
        </div>
      </div>
    `;
  },

  /**
   * Create about section (shorter, bullet format)
   * @returns {string} About HTML
   */
  createAbout() {
    return `
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">About</h2>
        </div>
        <div class="about-content">
          <ul class="about-list">
            <li><strong>Focus:</strong> Fortinet, Palo Alto (PAN-OS/Panorama), SD-WAN, SSL/TLS, IPS/IDS, SIEM/SOAR</li>
            <li><strong>Strength:</strong> Incident Response, advanced troubleshooting, BGP/OSPF optimization</li>
            <li><strong>Context:</strong> Computer Systems Engineering student, banking/regulated environments</li>
            <li><strong>Availability:</strong> Open to full-time or internship opportunities (remote/hybrid/on-site)</li>
          </ul>
        </div>
      </div>
    `;
  },

  /**
   * Create project card
   * @param {Object} project - Project data
   * @returns {string} Project card HTML
   */
  createProjectCard(project) {
    const steps = project.steps
      .map(
        (step) => `
      <li>${Utils.escapeHtml(step)}</li>
    `
      )
      .join("");

    const kpis = project.kpis
      .map(
        (kpi) => `
      <li class="kpi-item">↓ ${Utils.escapeHtml(kpi)}</li>
    `
      )
      .join("");

    const compliance = project.compliance
      .map(
        (item) => `
      <li>${Utils.escapeHtml(item)}</li>
    `
      )
      .join("");

    const improvements = project.improvements
      .map(
        (improvement) => `
      <li>${Utils.escapeHtml(improvement)}</li>
    `
      )
      .join("");

    return `
      <div class="project-card" data-project="${project.id}">
        <div class="project-header">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-problem"><strong>Problem:</strong> ${project.problem}</p>
        </div>
        
        <div class="project-details">
          <div class="project-section">
            <h4>Architecture</h4>
                    <img src="${project.diagram}" alt="${project.title} architecture" loading="lazy">
          </div>
          
          <div class="project-section">
            <h4>Implementation Steps</h4>
            <ul class="project-list project-steps">
              ${steps}
            </ul>
          </div>
          
          <div class="project-section">
            <h4>Evidence / KPIs</h4>
            <ul class="kpi-list">
              ${kpis}
            </ul>
          </div>
          
          <div class="project-section">
            <h4>Compliance Mapping</h4>
            <ul class="project-list project-compliance">
              ${compliance}
            </ul>
          </div>
        </div>
        
        <div class="project-footer">
          <h4>What I'd Improve Next</h4>
          <ul class="project-list project-improvements">
            ${improvements}
          </ul>
        </div>
      </div>
    `;
  },

  /**
   * Create projects section
   * @returns {string} Projects HTML
   */
  createProjects() {
    const projects = PROJECTS_DATA.map((project) =>
      this.createProjectCard(project)
    ).join("");

    return `
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Projects</h2>
        </div>
        <div class="projects-grid">
          ${projects}
        </div>
      </div>
    `;
  },

  /**
   * Create runbook card
   * @param {Object} runbook - Runbook data
   * @returns {string} Runbook card HTML
   */
  createRunbookCard(runbook) {
    const steps = runbook.steps
      .map(
        (step) => `
      <li>
        <strong>${step.action}</strong> (${step.responsible}, ${step.duration}) - ${step.description}
      </li>
    `
      )
      .join("");

    return `
      <div class="runbook-card" data-runbook="${runbook.id}">
        <h3 class="runbook-title">${runbook.title}</h3>
        <ol class="runbook-steps">
          ${steps}
        </ol>
      </div>
    `;
  },

  /**
   * Create runbooks section
   * @returns {string} Runbooks HTML
   */
  createRunbooks() {
    const runbooks = RUNBOOKS_DATA.map((runbook) =>
      this.createRunbookCard(runbook)
    ).join("");

    return `
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Runbooks</h2>
        </div>
        <div class="runbooks-grid">
          ${runbooks}
        </div>
      </div>
    `;
  },

  /**
   * Create skill category
   * @param {Object} category - Skill category data
   * @returns {string} Skill category HTML
   */
  createSkillCategory(category) {
    const skills = category.skills
      .map(
        (skill) => `
      <li>${Utils.escapeHtml(skill)}</li>
    `
      )
      .join("");

    return `
      <div class="skill-category">
        <h3>${category.category}</h3>
        <ul class="skill-list">
          ${skills}
        </ul>
      </div>
    `;
  },

  /**
   * Create skills section
   * @returns {string} Skills HTML
   */
  createSkills() {
    const categories = SKILLS_DATA.map((category) =>
      this.createSkillCategory(category)
    ).join("");

    return `
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Skills</h2>
        </div>
        <div class="skills-grid">
          ${categories}
        </div>
      </div>
    `;
  },

  /**
   * Create compliance checklist
   * @returns {string} Checklist HTML
   */
  createComplianceChecklist() {
    const items = COMPLIANCE_DATA.checklist
      .map(
        (item) => `
      <div class="checklist-item">
        <span class="checkmark">✓</span>
        <span>${Utils.escapeHtml(item)}</span>
      </div>
    `
      )
      .join("");

    return `
      <div class="compliance-card">
        <h3 class="compliance-title">DORA/NIS2 Technical Controls Checklist</h3>
        <div class="checklist">
          ${items}
        </div>
      </div>
    `;
  },

  /**
   * Create compliance matrix
   * @returns {string} Matrix HTML
   */
  createComplianceMatrix() {
    const rows = COMPLIANCE_DATA.matrix
      .map(
        (row) => `
      <tr>
        <td>${Utils.escapeHtml(row.requirement)}</td>
        <td>${Utils.escapeHtml(row.implementation)}</td>
        <td>${Utils.escapeHtml(row.project)}</td>
      </tr>
    `
      )
      .join("");

    return `
      <div class="compliance-card">
        <h3 class="compliance-title">ISO 27001/PCI Implementation Matrix</h3>
        <div class="compliance-table">
          <table>
            <thead>
              <tr>
                <th>Requirement</th>
                <th>Implementation</th>
                <th>Project</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  /**
   * Create compliance section with mini-matrices
   * @returns {string} Compliance HTML
   */
  createCompliance() {
    return `
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Compliance</h2>
        </div>
        <div class="compliance-grid">
          ${this.createDoraMatrix()}
          ${this.createIsoMatrix()}
        </div>
      </div>
    `;
  },

  /**
   * Create DORA/NIS2 matrix
   * @returns {string} DORA matrix HTML
   */
  createDoraMatrix() {
    const rows = COMPLIANCE_DATA.doraMatrix
      .map(
        (row) => `
      <tr>
        <td>${Utils.escapeHtml(row.requirement)}</td>
        <td>${Utils.escapeHtml(row.implementation)}</td>
        <td>${Utils.escapeHtml(row.project)}</td>
      </tr>
    `
      )
      .join("");

    return `
      <div class="compliance-card">
        <h3 class="compliance-title">DORA/NIS2 Implementation Matrix</h3>
        <div class="compliance-table">
          <table>
            <thead>
              <tr>
                <th>Requirement</th>
                <th>Implementation</th>
                <th>Project</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  /**
   * Create ISO/PCI matrix
   * @returns {string} ISO matrix HTML
   */
  createIsoMatrix() {
    const rows = COMPLIANCE_DATA.isoMatrix
      .map(
        (row) => `
      <tr>
        <td>${Utils.escapeHtml(row.requirement)}</td>
        <td>${Utils.escapeHtml(row.implementation)}</td>
        <td>${Utils.escapeHtml(row.project)}</td>
      </tr>
    `
      )
      .join("");

    return `
      <div class="compliance-card">
        <h3 class="compliance-title">ISO 27001/PCI Implementation Matrix</h3>
        <div class="compliance-table">
          <table>
            <thead>
              <tr>
                <th>Requirement</th>
                <th>Implementation</th>
                <th>Project</th>
              </tr>
            </thead>
            <tbody>
              ${rows}
            </tbody>
          </table>
        </div>
      </div>
    `;
  },

  /**
   * Create contact section
   * @returns {string} Contact HTML
   */
  createContact() {
    return `
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Contact</h2>
        </div>
        <div class="contact-content">
          <div class="contact-info">
            <div class="contact-buttons">
              <a href="${CONFIG.site.linkedin}" class="btn btn-primary" target="_blank" rel="noopener">
                LinkedIn
              </a>
              <a href="mailto:${CONFIG.site.email}" class="btn btn-secondary">
                Email
              </a>
              <a href="assets/alejandro-portfolio-summary.pdf" class="btn btn-outline" download>
                Download 1-Page PDF
              </a>
            </div>
          </div>
          
          <form class="contact-form" id="contact-form">
            <h3>Send Message</h3>
            <div class="form-group">
              <label for="name" class="form-label">Nombre</label>
              <input type="text" id="name" name="name" class="form-input" placeholder="Tu nombre" required>
            </div>
            <div class="form-group">
              <label for="email" class="form-label">Email</label>
              <input type="email" id="email" name="email" class="form-input" placeholder="tu@email.com" required>
            </div>
            <div class="form-group">
              <label for="message" class="form-label">Mensaje</label>
              <textarea id="message" name="message" class="form-input form-textarea" placeholder="Tu mensaje..." rows="4" required></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Enviar Mensaje</button>
          </form>
        </div>
      </div>
    `;
  },

  /**
   * Create footer (sobrio: © año · LinkedIn · GitHub)
   * @returns {string} Footer HTML
   */
  createFooter() {
    const currentYear = new Date().getFullYear();

    return `
      <div class="container">
        <div class="footer-content">
          <p>&copy; ${currentYear} ${CONFIG.site.name}</p>
          <div class="footer-links">
            <a href="${CONFIG.site.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
            <span>·</span>
            <a href="${CONFIG.site.github}" target="_blank" rel="noopener">GitHub</a>
          </div>
        </div>
      </div>
    `;
  }
  /**
   * Create scroll progress bar
   * @returns {HTMLElement} Progress bar element
   */,
  createScrollProgress() {
    const progressBar = document.createElement("div");
    progressBar.className = "scroll-progress";
    progressBar.setAttribute("aria-hidden", "true");
    return progressBar;
  },

  /**
   * Create loading placeholder
   * @param {string} type - Placeholder type (card, text, image)
   * @returns {string} Placeholder HTML
   */
  createPlaceholder(type = "card") {
    const placeholders = {
      card: `
        <div class="card skeleton">
          <div class="skeleton" style="height: 200px; margin-bottom: 1rem;"></div>
          <div class="skeleton" style="height: 20px; margin-bottom: 0.5rem;"></div>
          <div class="skeleton" style="height: 20px; width: 80%;"></div>
        </div>
      `,
      text: `
        <div class="skeleton" style="height: 20px; margin-bottom: 0.5rem;"></div>
        <div class="skeleton" style="height: 20px; width: 70%;"></div>
      `,
      image: `
        <div class="skeleton" style="height: 200px; width: 100%;"></div>
      `,
    };

    return placeholders[type] || placeholders.card;
  },
};

// Make Components available globally
window.Components = Components;
