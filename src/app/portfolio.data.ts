export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  type: string;
  summary: string;
  responsibilities: string[];
  technologies: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  location: string;
  grade?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: { name: string; levelLabel: string; highlight?: boolean }[];
}

export interface ProjectItem {
  id: string;
  title: string;
  badge: string;
  shortDesc: string;
  detailedDesc: string;
  technologies: string[];
  keyContributions: string[];
  liveUrl?: string;
  githubUrl?: string;
  isFeatured: boolean;
}

export interface AchievementItem {
  title: string;
  description: string;
  highlight: string;
  icon: string;
}

export const DEVELOPER_PROFILE = {
  name: 'Elanselvan S',
  shortName: 'Elanselvan',
  headline: 'Angular 21 & Front-End Developer',
  subheading: 'Results-driven Angular Front-End Developer with 4+ years of experience building scalable, high-performance web applications. Currently working with modern Angular 21, standalone components, reactive signals, and micro-frontends. Proven success at ConnectSecure, driving a 30% increase in data processing efficiency and enhancing UI/UX satisfaction by 25%.',
  location: 'Bengaluru, Karnataka, India',
  email: 'elanselvan1997@gmail.com',
  phone: '+91-8610585062',
  githubUrl: 'https://github.com/Elanselvan003',
  linkedinUrl: 'https://www.linkedin.com/in/elanselvan-s-6b869313a/',
  resumeUrl: '/assets/Elanselvan.pdf',
  experienceYears: '4+ Years',
  status: 'Currently Working with Angular 21'
};

export const KEY_ACHIEVEMENTS: AchievementItem[] = [
  {
    title: 'Project Efficiency Improvement',
    description: 'Reduced project delivery time by 20% by streamlining Angular module structure, adopting lazy loading, and refining Git workflows—boosting team velocity and cross-functional alignment.',
    highlight: '-20% Delivery Time',
    icon: 'zap'
  },
  {
    title: 'Customer Satisfaction Boost',
    description: 'Achieved 95%+ client satisfaction through consistent delivery, UI refinements using Angular Material, and rapid bug resolution via structured code reviews and CI feedback loops.',
    highlight: '95%+ Satisfaction',
    icon: 'check'
  },
  {
    title: 'Performance & Bundle Size Improvement',
    description: 'Implemented ChangeDetectionStrategy.OnPush, code splitting, and dynamic imports to reduce load times by 15% and bundle size by 25%, improving Google Lighthouse scores.',
    highlight: '-25% Bundle Size',
    icon: 'layers'
  },
  {
    title: 'Operational Efficiency Boost',
    description: 'Optimized component reuse and modular architecture using NgRx and custom pipes, reducing code duplication by 40% and easing long-term maintainability.',
    highlight: '-40% Code Duplication',
    icon: 'shield'
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'connectsecure',
    role: 'Angular Developer',
    company: 'ConnectSecure',
    period: '09/2022 — Present',
    location: 'Bengaluru, Karnataka',
    type: 'Full-time',
    summary: 'ConnectSecure is a cybersecurity platform delivering real-time vulnerability assessment, compliance tracking, and threat detection to global enterprise clients.',
    responsibilities: [
      'Developed a new Sales & Marketing portal from scratch, including offline UI for local assessments, enhancing usability and reliability in low-network environments.',
      'Collaborated with UI/UX designers to implement Angular Material and custom reusable components, improving user experience and reducing onboarding time by 20%.',
      'Standardized Git workflows (feature branching, PR reviews) across 20+ developers, improving release reliability and reducing merge conflicts by 75%.',
      'Integrated RESTful APIs using Angular HttpClient for real-time microservices communication.',
      'Enhanced performance by implementing lazy loading, code splitting, and ChangeDetectionStrategy.OnPush, improving page load speed by 20%.',
      'Mentored junior developers and conducted code reviews, reducing bugs by 30% and improving team productivity by 25%.',
      'Delivered 95%+ client satisfaction scores through consistent, on-time delivery and UI/UX excellence.',
      'Developed responsive UI using Angular Flex Layout and custom CSS Grid, achieving 99% cross-browser compatibility.',
      'Utilized NgRx for state management and modularized architecture using lazy loading and route-based splitting to reduce bundle size by 25%.',
      'Regularly participated in sprint planning and client demo calls, contributing to a 95%+ project satisfaction rating from clients and stakeholders.'
    ],
    technologies: [
      'Angular 21',
      'Angular 12+',
      'TypeScript',
      'JavaScript (ES6+)',
      'HTML5',
      'CSS3',
      'RESTful APIs',
      'NgRx',
      'Angular Material',
      'RxJS & Signals',
      'ChangeDetection.OnPush',
      'SQL',
      'Python',
      'Tableau',
      'N8N',
      'Git & CI/CD'
    ]
  }
];

export const EDUCATION_HISTORY: EducationItem[] = [
  {
    degree: 'Bachelor of Engineering in Electronic Communication Engineering',
    institution: 'Nandha Engineering College',
    period: '06/2015 — 03/2019',
    location: 'Erode, Tamil Nadu'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'frontend',
    name: 'Frontend Core (Angular 21)',
    description: 'Modern component-driven web architectures, reactive signals, and state systems',
    skills: [
      { name: 'Angular 21 (Currently Working)', levelLabel: 'Production Mastery', highlight: true },
      { name: 'Angular 12+ through 21', levelLabel: 'Core Mastery', highlight: true },
      { name: 'Reactive Signals & RxJS Streams', levelLabel: 'Advanced', highlight: true },
      { name: 'Standalone & Zoneless Architecture', levelLabel: 'Modern Pattern', highlight: true },
      { name: 'TypeScript', levelLabel: 'Advanced', highlight: true },
      { name: 'NgRx State Management', levelLabel: 'Advanced', highlight: true },
      { name: 'HTML5 & Semantic Web', levelLabel: 'Advanced', highlight: true },
      { name: 'CSS3 & Modern SCSS', levelLabel: 'Advanced' }
    ]
  },
  {
    id: 'styling',
    name: 'UI & Components',
    description: 'Pixel-perfect, accessible, and responsive user interfaces',
    skills: [
      { name: 'Angular Material', levelLabel: 'Production Mastery', highlight: true },
      { name: 'Tailwind CSS', levelLabel: 'Advanced', highlight: true },
      { name: 'Angular Flex Layout', levelLabel: 'Advanced' },
      { name: 'CSS Grid & Flexbox', levelLabel: 'Advanced' },
      { name: 'Responsive Layouts (99% Cross-Browser)', levelLabel: 'Core Focus', highlight: true },
      { name: 'Accessibility (WCAG 2.1)', levelLabel: 'Best Practice' }
    ]
  },
  {
    id: 'apis',
    name: 'APIs & Backend Integration',
    description: 'Data transport, microservices communication, and data handling',
    skills: [
      { name: 'RESTful APIs', levelLabel: 'Production Mastery', highlight: true },
      { name: 'Angular HttpClient', levelLabel: 'Advanced', highlight: true },
      { name: 'Microservices Communication', levelLabel: 'Production', highlight: true },
      { name: 'SQL', levelLabel: 'Proficient', highlight: true },
      { name: 'Python', levelLabel: 'Proficient', highlight: true }
    ]
  },
  {
    id: 'performance',
    name: 'Performance & Architecture',
    description: 'Fast first-load times and smooth client runtime performance',
    skills: [
      { name: 'ChangeDetectionStrategy.OnPush', levelLabel: 'Core Pattern', highlight: true },
      { name: 'Route-Level Lazy Loading', levelLabel: 'Core Pattern', highlight: true },
      { name: 'Code Splitting & Dynamic Imports', levelLabel: 'Advanced', highlight: true },
      { name: 'Bundle Optimization (-25% Size)', levelLabel: 'Proven Impact', highlight: true },
      { name: 'Lighthouse CWV Optimization', levelLabel: 'Core Focus' }
    ]
  },
  {
    id: 'tools',
    name: 'Tools & DevOps',
    description: 'Modern developer toolchains, Cloudflare edge, version control, and automation',
    skills: [
      { name: 'Git & GitHub (Feature Branching & PRs)', levelLabel: 'Standardized Workflows', highlight: true },
      { name: 'Cloudflare Pages & Edge Deploy', levelLabel: 'Production', highlight: true },
      { name: 'Tableau', levelLabel: 'Analytics', highlight: true },
      { name: 'N8N (Workflow Automation)', levelLabel: 'Proficient', highlight: true },
      { name: 'Jira & Agile / Scrum', levelLabel: 'Daily Practice' },
      { name: 'Postman & API Testing', levelLabel: 'Advanced' },
      { name: 'VS Code', levelLabel: 'Primary IDE' }
    ]
  }
];

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: 'bizflow-saas-platform',
    title: 'BizFlow — SaaS Business Management System',
    badge: 'Production SaaS (Angular 21)',
    shortDesc: 'Modern all-in-one SaaS business operations platform unifying customer management (CRM), appointment booking, automated invoicing, payments, and multi-tenant settings.',
    detailedDesc: 'Architected and deployed a modern full-stack business management SaaS platform built with Angular 21 standalone architecture. BizFlow streamlines end-to-end company operations—including client lifecycle management, calendar appointment scheduling, automated invoice generation, payment tracking, real-time KPI metrics, and comprehensive workspace settings. Features an advanced Dynamic Settings module (/settings) for multi-tenant profile management, role-based access control (RBAC), multi-channel notification preferences, and payment gateway configurations. Built with reactive signals, typed forms, custom design tokens, and hosted globally on Cloudflare Pages.',
    technologies: ['Angular 21', 'TypeScript', 'Reactive Signals', 'Tailwind CSS', 'Reactive Forms', 'RESTful APIs', 'Cloudflare Pages', 'SaaS Architecture'],
    keyContributions: [
      'Built complete SaaS operations suite including Client Management (CRM), Appointment Scheduling, Invoicing, and Workspace Settings.',
      'Designed dynamic settings module (/settings) enabling multi-tenant profile management, notification rules, payment gateways, and security preferences.',
      'Implemented modern Angular 21 features: standalone components, reactive signals, typed forms, and route-level lazy loading.',
      'Deployed on Cloudflare Pages edge network ensuring sub-second global page delivery and continuous integration.'
    ],
    liveUrl: 'https://elanselvanbizflow.pages.dev/settings',
    githubUrl: 'https://github.com/Elanselvan003/BizFlow',
    isFeatured: true
  },
  {
    id: 'connectsecure-platform',
    title: 'ConnectSecure Cybersecurity & Assessment Portal',
    badge: 'Enterprise Cybersecurity',
    shortDesc: 'Cybersecurity platform delivering real-time vulnerability assessment, compliance tracking, threat detection, and offline local assessments for enterprise clients.',
    detailedDesc: 'Architected and built the enterprise Sales & Marketing portal from scratch, complete with offline UI for local vulnerability assessments in low-network environments. Features Angular 12+, NgRx state stores, Angular Material component library, and real-time microservices communication.',
    technologies: ['Angular 21', 'TypeScript', 'NgRx', 'Angular Material', 'RESTful APIs', 'RxJS', 'OnPush Strategy', 'Git'],
    keyContributions: [
      'Developed new Sales & Marketing portal from scratch with offline UI for local vulnerability assessments.',
      'Adopted ChangeDetectionStrategy.OnPush, lazy loading, and route splitting to reduce load times by 15% and bundle size by 25%.',
      'Integrated RESTful APIs using Angular HttpClient for real-time microservices communication and standardized Git workflows across 20+ developers.'
    ],
    githubUrl: 'https://github.com/Elanselvan003',
    isFeatured: true
  },
  {
    id: 'portfolio-v2026',
    title: 'Modern Developer Portfolio & Design System',
    badge: 'Production Showcase',
    shortDesc: 'High-performance, accessible developer portfolio built with Angular standalone components, Tailwind CSS, and Cloudflare Pages edge deployment.',
    detailedDesc: 'Engineered from the ground up to eliminate loading bottlenecks, artificial screen delays, and oversized dependencies. Features dark navy visual aesthetics, zero external font/icon CDN dependencies, semantic HTML5 structure, and direct inbox delivery via FormSubmit.',
    technologies: ['Angular 21', 'TypeScript', 'Tailwind CSS', 'Cloudflare Pages', 'FormSubmit API', 'SEO & OpenGraph', 'WCAG 2.1 AA'],
    keyContributions: [
      'Eliminated render-blocking CDN dependencies and fixed loading screen freezing issues.',
      'Implemented seamless theme persistence and responsive layouts across all device form factors.',
      'Configured direct email forwarding to elanselvan1997@gmail.com with instant client-side validation.'
    ],
    liveUrl: 'https://elanselvan.pages.dev',
    githubUrl: 'https://github.com/Elanselvan003/elanselvan-portfolio',
    isFeatured: true
  },
  {
    id: 'workflow-dashboard',
    title: 'Reactive Task & Workflow Automation Dashboard',
    badge: 'Real-Time Web App',
    shortDesc: 'Interactive workspace dashboard providing live status tracking, drag-and-drop workflow kanban, and metrics visualization.',
    detailedDesc: 'A responsive single-page application built to showcase reactive UI principles and N8N workflow integration. Uses RxJS operators to debounce, filter, and stream live updates across dashboard cards without full-page re-renders.',
    technologies: ['Angular 21', 'TypeScript', 'RxJS Streams', 'Tailwind CSS', 'N8N Automation', 'Reactive Forms'],
    keyContributions: [
      'Developed declarative forms with custom asynchronous validators for real-time validation.',
      'Constructed responsive multi-column kanban board with touch and keyboard drag support.',
      'Utilized lightweight SVG micro-charts to provide instant visual performance insights.'
    ],
    githubUrl: 'https://github.com/Elanselvan003',
    isFeatured: true
  },
  {
    id: 'api-security-explorer',
    title: 'RESTful API & Security Workflow Explorer',
    badge: 'Security Tooling',
    shortDesc: 'Interactive developer utility demonstrating secure authentication handshakes, token inspection, and XSS/CSRF mitigation patterns.',
    detailedDesc: 'Built to illustrate enterprise authentication best practices. Provides an interactive playground for exploring token lifecycles, decoding Base64URL claims securely in memory, and simulating secure HTTP interceptor headers.',
    technologies: ['Angular 21', 'TypeScript', 'RESTful APIs', 'JWT Architecture', 'Tailwind CSS'],
    keyContributions: [
      'Built in-memory token inspection and expiration countdown with RxJS interval timers.',
      'Implemented demonstrations of CSRF double-submit cookie patterns and XSS sanitization.',
      'Documented frontend security checklists for enterprise web application audits.'
    ],
    githubUrl: 'https://github.com/Elanselvan003',
    isFeatured: true
  }
];
