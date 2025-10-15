// Configuration and Constants
const CONFIG = {
  // Site Information
  site: {
    name: "Alejandro Daniel Villarreal Soto",
    title:
      "Computer Systems Engineering student — Cybersecurity & Network Defense",
    email: "alejandrodcjm@gmail.com",
    linkedin: "https://www.linkedin.com/in/alejandro-villarreal24/",
    github: "https://github.com/Danielv109",
  },

  // Navigation Items
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

// Project Data
const PROJECTS_DATA = [
  {
    id: "perimeter-sdwan",
    title: "Perimeter & SD-WAN with Microsegmentation",
    problem: "Reduce exposed services and improve link reliability.",
    diagram: "assets/images/perimeter-sdwan-diagram.svg",
    steps: [
      "Configured HA cluster with Fortinet FortiGate 600E units",
      "Implemented BGP/OSPF routing for SD-WAN path optimization",
      "Deployed SSL decryption for encrypted traffic inspection",
      "Set up URL filtering and application control policies",
      "Configured IPS with custom signatures for threat detection",
      "Implemented microsegmentation using security zones",
      "Integrated logging with centralized SIEM platform",
      "Established automated failover mechanisms",
    ],
    kpis: [
      "Exposed services by 40%",
      "Inspected traffic by 30%",
      "Latency on SD-WAN paths by 18%",
    ],
    compliance: [
      "ISO 27001 A.13.1.1 - Network controls",
      "ISO 27001 A.12.6.1 - Management of technical vulnerabilities",
      "DORA Art. 11 - ICT risk management framework",
      "NIS2 Art. 21 - Cybersecurity risk management measures",
      "PCI DSS 1.2 - Build firewall configuration",
      "PCI DSS 11.4 - Use intrusion-detection systems",
    ],
    improvements: [
      "Implement AI-driven threat detection using ML models",
      "Add automated policy optimization based on traffic patterns",
    ],
  },
  {
    id: "siem-soar",
    title: "SIEM Detections + SOAR Playbook",
    problem:
      "Reduce mean time to detection and automate incident response workflows.",
    diagram: "assets/images/siem-soar-diagram.svg",
    steps: [
      "Deployed Microsoft Sentinel with custom data connectors",
      "Created KQL queries for advanced threat hunting",
      "Implemented correlation rules for multi-stage attacks",
      "Developed automated playbooks using Logic Apps",
      "Integrated with ServiceNow for ticket automation",
      "Set up threat intelligence feeds (MISP, AlienVault OTX)",
      "Configured dashboard with executive-level metrics",
    ],
    kpis: [
      "Mean time to detection by 65%",
      "Automated response rate by 80%",
      "False positive rate by 45%",
    ],
    compliance: [
      "ISO 27001 A.16.1.2 - Reporting information security events",
      "ISO 27001 A.16.1.5 - Response to information security incidents",
      "DORA Art. 17 - Detection capabilities",
      "NIS2 Art. 23 - Incident reporting",
      "PCI DSS 10.6 - Review logs and security events",
      "PCI DSS 12.10 - Implement an incident response plan",
    ],
    improvements: [
      "Implement UEBA for behavioral analytics",
      "Add automated threat hunting capabilities",
    ],
  },
  {
    id: "pci-hardening",
    title: "PCI-Ready Hardening Implementation",
    problem:
      "Achieve PCI DSS compliance through network segmentation, TLS enforcement, and comprehensive logging.",
    diagram: "assets/images/pci-hardening-diagram.svg",
    steps: [
      "Implemented network segmentation with VLANs and ACLs",
      "Configured TLS 1.2+ enforcement across all services",
      "Deployed centralized logging with 90-day retention",
      "Hardened servers using CIS benchmarks",
      "Implemented strong authentication (MFA) requirements",
      "Set up vulnerability scanning automation",
      "Configured file integrity monitoring (FIM)",
      "Established change management procedures",
    ],
    kpis: [
      "PCI DSS compliance score to 98%",
      "Security vulnerabilities by 75%",
      "Audit readiness by 90%",
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
      "Implement automated compliance monitoring",
      "Add real-time configuration drift detection",
    ],
  },
  {
    id: "ztna-sase",
    title: "ZTNA/SASE Implementation",
    problem:
      "Replace traditional VPN with Zero Trust Network Access and compare performance benefits.",
    diagram: "assets/images/ztna-sase-diagram.svg",
    steps: [
      "Deployed Palo Alto Prisma SASE solution",
      "Configured application-specific access policies",
      "Implemented continuous device verification",
      "Set up cloud-delivered security stack",
      "Migrated users from traditional VPN",
      "Configured global PoP optimization",
      "Implemented user behavior analytics",
    ],
    kpis: [
      "Connection latency by 40% vs VPN",
      "Security posture score by 55%",
      "Help desk tickets by 30%",
    ],
    compliance: [
      "ISO 27001 A.13.1.1 - Network controls",
      "ISO 27001 A.9.1.2 - Access to networks and network services",
      "DORA Art. 8 - Identification and classification",
      "NIS2 Art. 21 - Basic cybersecurity hygiene",
      "NIST Zero Trust Architecture SP 800-207",
    ],
    improvements: [
      "Implement risk-based adaptive authentication",
      "Add integration with identity governance platforms",
    ],
  },
];

// Runbooks Data
const RUNBOOKS_DATA = [
  {
    id: "vpn-bruteforce",
    title: "VPN Brute-Force Incident Response — 10 Steps",
    steps: [
      {
        action: "Immediate Detection",
        responsible: "SOC Analyst",
        duration: "2 mins",
        description: "Identify source IPs with >20 failed attempts",
      },
      {
        action: "Initial Containment",
        responsible: "SOC Analyst",
        duration: "3 mins",
        description: "Block suspicious IPs at perimeter firewall",
      },
      {
        action: "Evidence Collection",
        responsible: "IR Specialist",
        duration: "10 mins",
        description: "Extract authentication logs and network flows",
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
        description: "Alert CISO and affected users",
      },
      {
        action: "Account Review",
        responsible: "Identity Team",
        duration: "15 mins",
        description: "Reset passwords for targeted accounts",
      },
      {
        action: "System Hardening",
        responsible: "Network Team",
        duration: "30 mins",
        description: "Implement account lockout policies",
      },
      {
        action: "Threat Intelligence",
        responsible: "Threat Hunter",
        duration: "20 mins",
        description: "Check IPs against threat feeds",
      },
      {
        action: "Monitoring Enhancement",
        responsible: "SOC Lead",
        duration: "15 mins",
        description: "Update detection rules",
      },
      {
        action: "Incident Documentation",
        responsible: "IR Lead",
        duration: "30 mins",
        description: "Complete incident report and lessons learned",
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
        description: "Submit change via ServiceNow with business justification",
      },
      {
        action: "Security Review",
        responsible: "Security Team",
        duration: "2 hours",
        description: "Analyze risk and compliance impact",
      },
      {
        action: "Technical Validation",
        responsible: "Network Team",
        duration: "1 hour",
        description: "Verify technical feasibility and dependencies",
      },
      {
        action: "CAB Approval",
        responsible: "Change Board",
        duration: "24 hours",
        description: "Review and approve during weekly CAB meeting",
      },
      {
        action: "Implementation Planning",
        responsible: "Network Team",
        duration: "1 hour",
        description: "Create implementation and rollback procedures",
      },
      {
        action: "Change Implementation",
        responsible: "Network Engineer",
        duration: "30 mins",
        description: "Apply changes during maintenance window",
      },
      {
        action: "Testing & Verification",
        responsible: "QA Team",
        duration: "45 mins",
        description: "Validate functionality and connectivity",
      },
      {
        action: "Documentation Update",
        responsible: "Network Team",
        duration: "15 mins",
        description: "Update configuration management database",
      },
      {
        action: "Post-Implementation Review",
        responsible: "Change Manager",
        duration: "1 week",
        description: "Monitor for issues and update change record",
      },
      {
        action: "Policy Expiration",
        responsible: "Automated",
        duration: "90 days",
        description: "Review and renew or remove temporary rules",
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
        description: "Document business need and security risks",
      },
      {
        action: "Security Assessment",
        responsible: "Security Analyst",
        duration: "1 hour",
        description: "Evaluate alternative security controls",
      },
      {
        action: "Risk Analysis",
        responsible: "Risk Team",
        duration: "2 hours",
        description: "Quantify business and security impact",
      },
      {
        action: "Compensating Controls",
        responsible: "Security Architect",
        duration: "1 hour",
        description: "Design alternative security measures",
      },
      {
        action: "CISO Approval",
        responsible: "CISO",
        duration: "24 hours",
        description: "Review and approve exception with conditions",
      },
      {
        action: "Implementation",
        responsible: "Network Team",
        duration: "30 mins",
        description: "Configure firewall bypass rules",
      },
      {
        action: "Monitoring Setup",
        responsible: "SOC Team",
        duration: "1 hour",
        description: "Enable enhanced logging and alerting",
      },
      {
        action: "Quarterly Review",
        responsible: "Security Team",
        duration: "30 mins",
        description: "Reassess exception necessity and controls",
      },
    ],
  },
];

// Skills Data
const SKILLS_DATA = [
  {
    category: "Core Security Technologies",
    skills: [
      "Firewall Administration (Fortinet, Palo Alto/PAN-OS & Panorama)",
      "SD-WAN",
      "SSL/TLS Inspection",
      "IPS/IDS",
      "Zero Trust (ZTNA)",
    ],
  },
  {
    category: "Operations & Response",
    skills: [
      "Incident Response",
      "Troubleshooting",
      "SIEM/SOAR (Microsoft Sentinel / Splunk)",
      "BGP/OSPF",
      "Network Security Monitoring",
    ],
  },
  {
    category: "Compliance & Frameworks",
    skills: ["ISO 27001", "PCI DSS", "LFPDPPP", "DORA", "NIS2"],
  },
];

// Compliance Data
const COMPLIANCE_DATA = {
  checklist: [
    "Comprehensive logging and monitoring systems",
    "Security hardening of systems and applications",
    "Change management procedures and controls",
    "Regular vulnerability assessments and penetration testing",
    "Incident detection and response capabilities",
    "Network segmentation and access controls",
    "Backup and recovery procedures",
    "Cryptographic controls for data protection",
    "Multi-factor authentication implementation",
    "Security awareness and training programs",
  ],
  matrix: [
    {
      requirement: "Network Controls (ISO A.13.1.1)",
      implementation: "Perimeter firewalls + microsegmentation",
      project: "Project 1",
    },
    {
      requirement: "Incident Management (ISO A.16.1.5)",
      implementation: "SIEM/SOAR automated response",
      project: "Project 2",
    },
    {
      requirement: "Cryptographic Controls (PCI 4.1)",
      implementation: "TLS 1.2+ enforcement",
      project: "Project 3",
    },
    {
      requirement: "Access Control (PCI 7.1)",
      implementation: "ZTNA with application-specific policies",
      project: "Project 4",
    },
    {
      requirement: "Vulnerability Management (PCI 11.2)",
      implementation: "Automated scanning + IPS signatures",
      project: "All Projects",
    },
    {
      requirement: "Audit Trails (PCI 10.1)",
      implementation: "Centralized logging + SIEM correlation",
      project: "Project 2",
    },
    {
      requirement: "Secure Network Architecture (PCI 1.2)",
      implementation: "SD-WAN + segmentation",
      project: "Project 1",
    },
    {
      requirement: "Strong Authentication (PCI 8.2)",
      implementation: "MFA + continuous verification",
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


