// Configuration and Constants - OPTIMIZED VERSION
const CONFIG = {
  // Site Information
  site: {
    name: "Alejandro Daniel Villarreal Soto",
    title:
      "Computer Systems Engineering student — Cybersecurity & Network Defense",
    email: "alejandro.villarreal@email.com",
    linkedin: "https://linkedin.com/in/alejandro-villarreal",
    github: "https://github.com/alejandrovillarreal",
  },

  // Navigation Items (6 secciones principales)
  navigation: [
    { id: "home", label: "Home", href: "#home" },
    { id: "about", label: "About", href: "#about" },
    { id: "projects", label: "Projects", href: "#projects" },
    { id: "runbooks", label: "Runbooks", href: "#runbooks" },
    { id: "skills", label: "Skills", href: "#skills" },
    { id: "compliance", label: "Compliance", href: "#compliance" },
    { id: "contact", label: "Contact", href: "#contact" },
  ],

  // Animation Settings
  animations: {
    duration: 600,
    easing: "ease-out",
    stagger: 100,
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  },

  // Responsive Breakpoints
  breakpoints: {
    sm: 480,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1536,
  },

  // Scroll Settings
  scroll: {
    offset: 80, // Header height
    smooth: true,
    updateThrottle: 16, // ~60fps
  },

  // Form Settings
  form: {
    validateOnInput: true,
    showSuccessMessage: true,
    successDuration: 3000,
  },
};

// Project Data (4 proyectos optimizados siguiendo el patrón especificado)
const PROJECTS_DATA = [
  {
    id: "perimeter-sdwan",
    title: "Perimeter & SD-WAN with Microsegmentation",
    problem: "Reduce exposed services and improve link reliability.",
    diagram: "./assets/images/perimeter-sdwan-diagram.svg",
    steps: [
      "HA firewalls (Fortinet/PAN), BGP/OSPF, SD-WAN (SLA-based)",
      "SSL/TLS inspection with exception list; URL filtering; IPS",
      "Microsegmentation using security zones and VLANs",
      "Automated failover mechanisms and load balancing",
      "Centralized logging to SIEM (CEF/syslog) and dashboards",
      "Custom IPS signatures for threat detection",
      "Policy optimization based on traffic analysis",
    ],
    kpis: [
      "↓ Exposed services 40%",
      "↑ Inspected traffic 30%",
      "↓ SD-WAN latency 18%",
    ],
    compliance: [
      "ISO 27001 A.13.1.1 - Network controls",
      "ISO 27001 A.12.6.1 - Management of technical vulnerabilities",
      "PCI DSS 1.2 - Build firewall configuration",
      "PCI DSS 11.4 - Use intrusion-detection systems",
      "DORA Art. 11 - ICT risk management framework",
      "NIS2 Art. 21 - Cybersecurity risk management measures",
    ],
    improvements: [
      "Automate policy checks (no any-any), rule owner & expiry via CI",
      "Implement AI-driven threat detection using ML models",
    ],
  },
  {
    id: "siem-soar",
    title: "SIEM Detection + SOAR Automation",
    problem:
      "Reduce mean time to detection and automate incident response workflows.",
    diagram: "./assets/images/siem-soar-diagram.svg",
    steps: [
      "Microsoft Sentinel deployment with custom data connectors",
      "KQL queries for advanced threat hunting and correlation",
      "Automated playbooks using Logic Apps for response",
      "ServiceNow integration for ticket automation",
      "Threat intelligence feeds (MISP, AlienVault OTX)",
      "Executive dashboards with real-time metrics",
      "Custom detection rules for multi-stage attacks",
    ],
    kpis: [
      "↓ Mean time to detection 65%",
      "↑ Automated response rate 80%",
      "↓ False positive rate 45%",
    ],
    compliance: [
      "ISO 27001 A.16.1.2 - Reporting information security events",
      "ISO 27001 A.16.1.5 - Response to information security incidents",
      "PCI DSS 10.6 - Review logs and security events",
      "PCI DSS 12.10 - Implement an incident response plan",
      "DORA Art. 17 - Detection capabilities",
      "NIS2 Art. 23 - Incident reporting",
    ],
    improvements: [
      "Implement UEBA for behavioral analytics",
      "Add automated threat hunting capabilities with machine learning",
    ],
  },
  {
    id: "pci-hardening",
    title: "PCI-Ready Hardening Implementation",
    problem:
      "Achieve PCI DSS compliance through network segmentation, TLS enforcement, and comprehensive logging.",
    diagram: "./assets/images/pci-hardening-diagram.svg",
    steps: [
      "Network segmentation with VLANs, ACLs, and firewall zones",
      "TLS 1.2+ enforcement across all services and applications",
      "Centralized logging with 90-day retention and integrity",
      "Server hardening using CIS benchmarks and security baselines",
      "Multi-factor authentication (MFA) implementation",
      "Automated vulnerability scanning and patch management",
      "File integrity monitoring (FIM) for critical systems",
    ],
    kpis: [
      "↑ PCI DSS compliance score to 98%",
      "↓ Security vulnerabilities 75%",
      "↑ Audit readiness 90%",
    ],
    compliance: [
      "PCI DSS 1.1 - Establish firewall configuration standards",
      "PCI DSS 2.3 - Encrypt all non-console administrative access",
      "PCI DSS 4.1 - Use strong cryptography for data transmission",
      "PCI DSS 10.1 - Implement audit trails",
      "ISO 27001 A.13.1.3 - Segregation in networks",
      "ISO 27001 A.10.1.1 - Cryptographic controls",
    ],
    improvements: [
      "Implement automated compliance monitoring and drift detection",
      "Add real-time configuration validation pipelines",
    ],
  },
  {
    id: "ztna-sase",
    title: "ZTNA/SASE vs Traditional VPN",
    problem:
      "Replace traditional VPN with Zero Trust Network Access and compare performance benefits.",
    diagram: "./assets/images/ztna-sase-diagram.svg",
    steps: [
      "Palo Alto Prisma SASE deployment with global PoPs",
      "Application-specific access policies (no network access)",
      "Continuous device and user verification (identity + risk)",
      "Cloud-delivered security stack (firewall, IPS, DLP)",
      "Phased migration from traditional VPN infrastructure",
      "Global point-of-presence (PoP) optimization",
      "User behavior analytics and risk-based authentication",
    ],
    kpis: [
      "↓ Connection latency 40% vs VPN",
      "↑ Security posture score 55%",
      "↓ Help desk tickets 30%",
    ],
    compliance: [
      "ISO 27001 A.13.1.1 - Network controls",
      "ISO 27001 A.9.1.2 - Access to networks and network services",
      "NIST Zero Trust Architecture SP 800-207",
      "DORA Art. 8 - Identification and classification",
      "NIS2 Art. 21 - Basic cybersecurity hygiene",
    ],
    improvements: [
      "Implement risk-based adaptive authentication algorithms",
      "Add integration with identity governance and administration platforms",
    ],
  },
];

// Runbooks Data (3 runbooks optimizados)
const RUNBOOKS_DATA = [
  {
    id: "vpn-bruteforce",
    title: "VPN Brute-Force Incident Response",
    steps: [
      {
        action: "Immediate Detection",
        responsible: "SOC Analyst",
        duration: "2 mins",
        description:
          "Identify source IPs with >20 failed attempts via SIEM alerts",
      },
      {
        action: "Initial Containment",
        responsible: "SOC Analyst",
        duration: "3 mins",
        description:
          "Block suspicious IPs at perimeter firewall (temporary rule)",
      },
      {
        action: "Evidence Collection",
        responsible: "IR Specialist",
        duration: "10 mins",
        description:
          "Extract authentication logs, network flows, and user activity",
      },
      {
        action: "Impact Assessment",
        responsible: "IR Lead",
        duration: "5 mins",
        description: "Check for successful authentications from blocked IPs",
      },
      {
        action: "Stakeholder Notification",
        responsible: "IR Lead",
        duration: "5 mins",
        description:
          "Alert CISO, IT Manager, and affected users via email/Slack",
      },
      {
        action: "Account Review",
        responsible: "Identity Team",
        duration: "15 mins",
        description:
          "Force password reset for targeted accounts, review MFA status",
      },
      {
        action: "System Hardening",
        responsible: "Network Team",
        duration: "30 mins",
        description:
          "Implement account lockout policies, update firewall rules",
      },
      {
        action: "Threat Intelligence",
        responsible: "Threat Hunter",
        duration: "20 mins",
        description: "Check IPs against threat feeds, update IOC database",
      },
      {
        action: "Monitoring Enhancement",
        responsible: "SOC Lead",
        duration: "15 mins",
        description: "Update detection rules, adjust thresholds if needed",
      },
      {
        action: "Incident Documentation",
        responsible: "IR Lead",
        duration: "30 mins",
        description: "Complete incident report, lessons learned, timeline",
      },
    ],
  },
  {
    id: "firewall-change",
    title: "Firewall Policy Change Control",
    steps: [
      {
        action: "Request Submission",
        responsible: "Requestor",
        duration: "10 mins",
        description:
          "Submit via ServiceNow: business justification, traffic flows, expiry",
      },
      {
        action: "Security Review",
        responsible: "Security Team",
        duration: "2 hours",
        description:
          "Risk analysis, compliance check, least privilege validation",
      },
      {
        action: "Technical Validation",
        responsible: "Network Team",
        duration: "1 hour",
        description: "Verify technical feasibility, routing, dependencies",
      },
      {
        action: "CAB Approval",
        responsible: "Change Board",
        duration: "24 hours",
        description: "Weekly CAB meeting review and formal approval",
      },
      {
        action: "Implementation Planning",
        responsible: "Network Team",
        duration: "1 hour",
        description: "Create implementation steps and rollback procedures",
      },
      {
        action: "Change Implementation",
        responsible: "Network Engineer",
        duration: "30 mins",
        description: "Apply changes during maintenance window with validation",
      },
      {
        action: "Testing & Verification",
        responsible: "QA Team",
        duration: "45 mins",
        description: "Validate functionality, connectivity, and performance",
      },
      {
        action: "Documentation Update",
        responsible: "Network Team",
        duration: "15 mins",
        description: "Update CMDB, network diagrams, and rule documentation",
      },
    ],
  },
  {
    id: "ssl-exception",
    title: "SSL/TLS Decryption Exception Workflow",
    steps: [
      {
        action: "Exception Request",
        responsible: "Business Owner",
        duration: "15 mins",
        description:
          "Document business need, security risks, and compensating controls",
      },
      {
        action: "Security Assessment",
        responsible: "Security Analyst",
        duration: "1 hour",
        description:
          "Evaluate alternative security controls and risk mitigation",
      },
      {
        action: "Risk Analysis",
        responsible: "Risk Team",
        duration: "2 hours",
        description: "Quantify business impact vs security risk exposure",
      },
      {
        action: "Compensating Controls",
        responsible: "Security Architect",
        duration: "1 hour",
        description:
          "Design alternative security measures (DLP, egress filtering)",
      },
      {
        action: "CISO Approval",
        responsible: "CISO",
        duration: "24 hours",
        description:
          "Review and approve exception with conditions and timeline",
      },
      {
        action: "Implementation",
        responsible: "Network Team",
        duration: "30 mins",
        description: "Configure firewall bypass rules with logging",
      },
      {
        action: "Monitoring Setup",
        responsible: "SOC Team",
        duration: "1 hour",
        description:
          "Enable enhanced logging, DLP alerts, and traffic analysis",
      },
      {
        action: "Quarterly Review",
        responsible: "Security Team",
        duration: "30 mins",
        description:
          "Reassess exception necessity and effectiveness of controls",
      },
    ],
  },
];

// Skills Data (Top 10 ordenadas por prioridad)
const SKILLS_DATA = [
  {
    category: "Core Security Technologies",
    skills: [
      "Fortinet (FortiGate, FortiManager, FortiAnalyzer)",
      "Palo Alto (PAN-OS & Panorama, Prisma Cloud)",
      "SD-WAN (SLA-based routing, path optimization)",
      "SSL/TLS Inspection & Certificate Management",
      "IPS/IDS (Snort, Suricata, custom signatures)",
      "Zero Trust Network Access (ZTNA, SASE)",
    ],
  },
  {
    category: "Operations & Response",
    skills: [
      "SIEM/SOAR (Microsoft Sentinel, Splunk, Logic Apps)",
      "Incident Response (NIST framework, forensics)",
      "Advanced Troubleshooting (Wireshark, tcpdump)",
      "BGP/OSPF (routing protocols, network optimization)",
    ],
  },
  {
    category: "Compliance & Frameworks",
    skills: [
      "ISO 27001 (controls implementation and auditing)",
      "PCI DSS (cardholder data environment design)",
      "DORA (digital operational resilience act)",
      "NIS2 (network and information security directive)",
    ],
  },
];

// Compliance Data (Mini-matrices optimizadas)
const COMPLIANCE_DATA = {
  checklist: [
    "Comprehensive logging and monitoring systems (SIEM/SOAR)",
    "Security hardening using CIS benchmarks and baselines",
    "Change management procedures with CAB approval",
    "Regular vulnerability assessments and penetration testing",
    "Incident detection and automated response capabilities",
    "Network segmentation and microsegmentation controls",
    "Backup and disaster recovery procedures with testing",
    "Strong cryptographic controls (TLS 1.2+, AES-256)",
  ],
  doraMatrix: [
    {
      requirement: "DORA Art. 11 - ICT Risk Management",
      implementation: "Perimeter firewalls + risk-based SD-WAN",
      project: "Project 1",
    },
    {
      requirement: "DORA Art. 17 - Detection Capabilities",
      implementation: "SIEM/SOAR with automated response",
      project: "Project 2",
    },
    {
      requirement: "DORA Art. 8 - ICT Systems Classification",
      implementation: "ZTNA with application-specific policies",
      project: "Project 4",
    },
    {
      requirement: "NIS2 Art. 21 - Cybersecurity Measures",
      implementation: "Comprehensive security hardening",
      project: "Project 3",
    },
  ],
  isoMatrix: [
    {
      requirement: "ISO 27001 A.13.1.1 - Network Controls",
      implementation: "Firewall zones + microsegmentation",
      project: "Project 1",
    },
    {
      requirement: "ISO 27001 A.16.1.5 - Incident Response",
      implementation: "Automated SOAR playbooks",
      project: "Project 2",
    },
    {
      requirement: "PCI DSS 4.1 - Strong Cryptography",
      implementation: "TLS 1.2+ enforcement + encryption",
      project: "Project 3",
    },
    {
      requirement: "PCI DSS 7.1 - Access Control",
      implementation: "Zero Trust + least privilege",
      project: "Project 4",
    },
  ],
};

// Export configuration for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    CONFIG,
    PROJECTS_DATA,
    RUNBOOKS_DATA,
    SKILLS_DATA,
    COMPLIANCE_DATA,
  };
}
