import { Component, OnInit, OnDestroy, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconComponent } from './icon.component';
import {
  DEVELOPER_PROFILE,
  EXPERIENCES,
  EDUCATION_HISTORY,
  SKILL_CATEGORIES,
  FEATURED_PROJECTS,
  KEY_ACHIEVEMENTS,
  ProjectItem,
  SkillCategory,
  AchievementItem
} from './portfolio.data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, IconComponent],
  template: `
    <!-- Top Progress Line -->
    <div class="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-600 via-sky-400 to-violet-500 z-50 transform origin-left"
         [style.transform]="'scaleX(' + scrollProgress + ')'"></div>

    <!-- Navigation Header -->
    <header class="fixed top-0 left-0 right-0 z-40 transition-all duration-300"
            [class.bg-white_90]="isScrolled && !isDarkMode"
            [class.dark_bg_navy]="isScrolled && isDarkMode"
            [class.shadow-md]="isScrolled"
            [class.backdrop-blur-md]="isScrolled"
            [class.border-b]="isScrolled"
            [class.border-slate-200_80]="isScrolled && !isDarkMode"
            [class.border-slate-800_80]="isScrolled && isDarkMode"
            [class.bg-transparent]="!isScrolled">
      <nav class="container-custom flex items-center justify-between h-20 px-4 sm:px-6 lg:px-8" aria-label="Main Navigation">
        <!-- Logo / Monogram -->
        <a href="#home" (click)="scrollTo($event, 'home')" class="group flex items-center gap-3 cursor-pointer shrink-0">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary-600 to-violet-600 p-[2px] shadow-sm shadow-primary-500/20 group-hover:shadow-primary-500/40 transition-shadow">
            <div class="w-full h-full bg-navy-900 rounded-[10px] flex items-center justify-center font-mono font-bold text-lg text-white">
              E
            </div>
          </div>
          <div class="flex flex-col">
            <span class="font-bold text-slate-900 dark:text-white tracking-tight group-hover:text-primary-500 transition-colors whitespace-nowrap">
              {{ profile.name }}
            </span>
            <span class="text-xs text-slate-500 dark:text-slate-400 font-mono hidden sm:inline whitespace-nowrap">
              Frontend Developer
            </span>
          </div>
        </a>

        <!-- Desktop Navigation Links (Visible on lg and larger screens) -->
        <div class="hidden lg:flex items-center gap-1 xl:gap-2">
          <a *ngFor="let item of navLinks" 
             [href]="'#' + item.id"
             (click)="scrollTo($event, item.id)"
             [class.text-primary-600]="activeSection === item.id && !isDarkMode"
             [class.text-primary-400]="activeSection === item.id && isDarkMode"
             [class.font-semibold]="activeSection === item.id"
             class="px-3.5 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100/70 dark:hover:bg-navy-800/60 transition-all whitespace-nowrap">
            {{ item.label }}
          </a>
        </div>

        <!-- Right Action Items (Resume + Dark Mode + Mobile Toggle) -->
        <div class="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <!-- Resume Button (compact on mobile) -->
          <a [href]="profile.resumeUrl" 
             download="Elanselvan_Resume.pdf"
             class="btn-secondary !py-1.5 !px-3 sm:!py-2 sm:!px-4 text-xs sm:text-sm font-semibold group whitespace-nowrap"
             title="Download Elanselvan Resume PDF">
            <app-icon name="download" iconClass="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary-500 group-hover:translate-y-[1px] transition-transform"></app-icon>
            <span class="hidden sm:inline">Resume</span>
          </a>

          <!-- Dark Mode Toggle -->
          <button (click)="toggleTheme()" 
                  type="button"
                  [attr.aria-label]="isDarkMode ? 'Switch to light theme' : 'Switch to dark theme'"
                  class="p-2 sm:p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-navy-900/70 text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-500 transition-colors">
            <app-icon [name]="isDarkMode ? 'sun' : 'moon'" iconClass="w-4 h-4"></app-icon>
          </button>

          <!-- Mobile / Tablet Menu Hamburger Button -->
          <button (click)="toggleMobileMenu()" 
                  type="button"
                  class="lg:hidden p-2 sm:p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-navy-900/70 text-slate-700 dark:text-slate-300 hover:text-primary-600 transition-colors"
                  [attr.aria-expanded]="isMobileMenuOpen"
                  aria-label="Toggle mobile menu"
                  aria-controls="mobile-navigation">
            <app-icon [name]="isMobileMenuOpen ? 'close' : 'menu'" iconClass="w-4 h-4 sm:w-5 sm:h-5"></app-icon>
          </button>
        </div>
      </nav>

      <!-- Mobile & Tablet Navigation Drawer -->
      <div id="mobile-navigation" 
           *ngIf="isMobileMenuOpen" 
           class="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-navy-900/95 backdrop-blur-xl animate-fade-in shadow-xl">
        <div class="container-custom px-4 py-4 space-y-1">
          <a *ngFor="let item of navLinks" 
             [href]="'#' + item.id"
             (click)="scrollTo($event, item.id); closeMobileMenu()"
             [class.bg-primary-50]="activeSection === item.id && !isDarkMode"
             [class.bg-navy-800]="activeSection === item.id && isDarkMode"
             [class.text-primary-600]="activeSection === item.id"
             class="flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-navy-800 transition-colors">
            <span>{{ item.label }}</span>
            <app-icon name="arrow-right" iconClass="w-4 h-4 opacity-50"></app-icon>
          </a>
        </div>
      </div>
    </header>

    <main id="main-content">
      <!-- HERO SECTION -->
      <section id="home" class="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        <!-- Ambient Background Gradients -->
        <div class="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-primary-600/15 via-violet-600/15 to-transparent blur-3xl pointer-events-none rounded-full"></div>
        <div class="absolute -top-10 right-10 w-72 h-72 bg-sky-500/10 blur-3xl pointer-events-none rounded-full"></div>

        <div class="container-custom px-4 sm:px-6 lg:px-8 relative z-10">
          <div class="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            <!-- Left Hero Content (7 cols) -->
            <div class="lg:col-span-7 space-y-6 text-center lg:text-left">
              <!-- Availability Badge -->
              <div class="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs font-semibold tracking-wide">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{{ profile.status }}</span>
              </div>

              <!-- Main Title & Headline -->
              <div>
                <p class="text-sm sm:text-base font-mono font-medium text-primary-600 dark:text-primary-400 mb-2">
                  Hello, I'm
                </p>
                <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                  {{ profile.name }}
                </h1>
                <p class="text-xl sm:text-2xl font-bold mt-3 text-gradient">
                  Software Developer &amp; Angular Specialist
                </p>
              </div>

              <!-- Value Proposition -->
              <p class="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {{ profile.subheading }}
              </p>

              <!-- CTA Buttons -->
              <div class="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <a href="#projects" 
                   (click)="scrollTo($event, 'projects')" 
                   class="btn-primary">
                  <span>View Featured Projects</span>
                  <app-icon name="arrow-right" iconClass="w-4 h-4"></app-icon>
                </a>
                
                <a [href]="profile.resumeUrl" 
                   download="Elanselvan_Resume.pdf" 
                   class="btn-secondary">
                  <app-icon name="download" iconClass="w-4 h-4"></app-icon>
                  <span>Download Resume</span>
                </a>
              </div>

              <!-- Verified Stats & Direct Socials -->
              <div class="pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 sm:gap-8 text-center lg:text-left max-w-xl mx-auto lg:mx-0">
                <div class="min-w-[100px]">
                  <div class="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">4+</div>
                  <div class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">Years Experience</div>
                </div>
                <div class="min-w-[120px]">
                  <div class="text-xl sm:text-2xl font-extrabold text-primary-600 dark:text-primary-400 font-mono">ConnectSecure</div>
                  <div class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">Angular Developer</div>
                </div>
                <div class="min-w-[100px]">
                  <div class="text-2xl font-extrabold text-slate-900 dark:text-white font-mono">Angular 21</div>
                  <div class="text-xs text-slate-500 dark:text-slate-400 mt-0.5 font-medium">Currently Working</div>
                </div>
              </div>

              <!-- Social Links -->
              <div class="flex items-center justify-center lg:justify-start gap-3 pt-2">
                <a [href]="profile.githubUrl" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   aria-label="Elanselvan GitHub Profile" 
                   class="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-navy-900/70 text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-500 transition-all">
                  <app-icon name="github" iconClass="w-5 h-5"></app-icon>
                </a>

                <a [href]="profile.linkedinUrl" 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   aria-label="Elanselvan LinkedIn Profile" 
                   class="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-navy-900/70 text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-500 transition-all">
                  <app-icon name="linkedin" iconClass="w-5 h-5"></app-icon>
                </a>

                <a [href]="'mailto:' + profile.email" 
                   aria-label="Email Elanselvan" 
                   class="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-navy-900/70 text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-500 transition-all">
                  <app-icon name="email" iconClass="w-5 h-5"></app-icon>
                </a>

                <a [href]="'tel:' + profile.phone" 
                   aria-label="Call Elanselvan" 
                   class="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-navy-900/70 text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-500 transition-all">
                  <app-icon name="phone" iconClass="w-5 h-5"></app-icon>
                </a>
              </div>
            </div>

            <!-- Right Hero Card / Visual Badge (5 cols) -->
            <div class="lg:col-span-5 flex justify-center">
              <div class="relative w-full max-w-sm sm:max-w-md">
                <!-- Glowing Aura -->
                <div class="absolute inset-0 bg-gradient-to-tr from-primary-600/30 to-violet-600/30 rounded-3xl blur-2xl transform scale-95"></div>
                
                <!-- Main Visual Container -->
                <div class="relative rounded-3xl border border-slate-200/80 dark:border-slate-700/60 bg-white/90 dark:bg-navy-900/90 backdrop-blur-xl p-6 sm:p-8 shadow-2xl space-y-6">
                  <!-- Logo Badge with Clean Presentation -->
                  <div class="relative mx-auto w-44 h-44 sm:w-52 sm:h-52 rounded-2xl overflow-hidden border-2 border-primary-500/30 shadow-inner bg-navy-950 flex items-center justify-center group">
                    <img src="assets/logo-dark.png" 
                         alt="Elanselvan - Software Developer Monogram" 
                         width="208"
                         height="208"
                         fetchpriority="high"
                         class="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500" />
                  </div>

                  <!-- Quick Info Card Inside -->
                  <div class="space-y-3 pt-2">
                    <div class="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 pb-2 border-b border-slate-200 dark:border-slate-800">
                      <span>LOCATION</span>
                      <span class="text-slate-800 dark:text-slate-200 font-semibold">{{ profile.location }}</span>
                    </div>
                    <div class="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400 pb-2 border-b border-slate-200 dark:border-slate-800">
                      <span>ROLE</span>
                      <span class="text-slate-800 dark:text-slate-200 font-semibold">Angular Developer</span>
                    </div>
                    <div class="flex items-center justify-between text-xs font-mono text-slate-500 dark:text-slate-400">
                      <span>ORGANIZATION</span>
                      <span class="text-primary-600 dark:text-primary-400 font-semibold">ConnectSecure</span>
                    </div>
                  </div>

                  <!-- Tech Tag Preview -->
                  <div class="flex flex-wrap gap-1.5 pt-2">
                    <span class="badge-primary">Angular 21 (Current)</span>
                    <span class="badge">TypeScript</span>
                    <span class="badge">RxJS &amp; Signals</span>
                    <span class="badge">REST &amp; SaaS</span>
                    <span class="badge">Tailwind CSS</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- ABOUT ME SECTION -->
      <section id="about" class="section-padding bg-slate-100/60 dark:bg-navy-900/60 border-y border-slate-200/80 dark:border-slate-800/80">
        <div class="container-custom">
          <!-- Section Heading -->
          <div class="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span class="text-xs font-mono font-bold tracking-widest text-primary-600 dark:text-primary-400 uppercase">
              // Background &amp; Core Strengths
            </span>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              About Me
            </h2>
            <div class="w-16 h-1 bg-gradient-to-r from-primary-600 to-violet-600 mx-auto rounded-full"></div>
            <p class="text-slate-600 dark:text-slate-300 text-base sm:text-lg pt-2">
              Results-driven Angular Front-End Developer with 4+ years of experience building scalable, high-performance web applications. Proven success at ConnectSecure driving a 30% increase in data processing efficiency and 25% UI/UX satisfaction.
            </p>
          </div>

          <!-- Main About Narrative Grid -->
          <div class="grid lg:grid-cols-12 gap-8 items-start mb-12">
            <div class="lg:col-span-7 space-y-5 text-slate-700 dark:text-slate-300 leading-relaxed text-base">
              <p>
                Currently serving as an <strong class="text-slate-900 dark:text-white">Angular Developer at ConnectSecure</strong> in Bengaluru, and building modern SaaS platforms with <strong class="text-primary-600 dark:text-primary-400">Angular 21</strong>, I specialize in crafting scalable enterprise web applications, SaaS operations systems, real-time cybersecurity dashboards, and vulnerability assessment tools using modern Angular (including Angular 21), TypeScript, and reactive state systems with RxJS and Signals.
              </p>
              <p>
                My frontend philosophy centers around <strong class="text-slate-900 dark:text-white">architectural clarity, user security, and smooth UX</strong>. Whether engineering full-scale SaaS platforms like BizFlow with dynamic settings modules, building offline-capable portals for local vulnerability assessments, optimizing bundle sizes by 25% via route-level lazy loading and ChangeDetectionStrategy.OnPush, or standardizing Git workflows across 20+ developers, I build applications that excel in production.
              </p>
              <p>
                I hold a <strong class="text-slate-900 dark:text-white">Bachelor of Engineering in Electronic Communication Engineering</strong> from Nandha Engineering College. My engineering background provides an analytical edge in debugging complex asynchronous flows, optimizing rendering lifecycles, and mentoring engineering teams.
              </p>
              
              <!-- Key Highlights Badges -->
              <div class="pt-3 flex flex-wrap gap-2.5">
                <span class="badge"><app-icon name="check" iconClass="w-3.5 h-3.5 text-emerald-500"></app-icon> Angular 21 (Currently Working)</span>
                <span class="badge"><app-icon name="check" iconClass="w-3.5 h-3.5 text-emerald-500"></app-icon> Reactive Signals &amp; RxJS</span>
                <span class="badge"><app-icon name="check" iconClass="w-3.5 h-3.5 text-emerald-500"></app-icon> SaaS Operations &amp; Settings</span>
                <span class="badge"><app-icon name="check" iconClass="w-3.5 h-3.5 text-emerald-500"></app-icon> RESTful Microservices</span>
                <span class="badge"><app-icon name="check" iconClass="w-3.5 h-3.5 text-emerald-500"></app-icon> OnPush &amp; CWV Optimization</span>
              </div>
            </div>

            <!-- 4 Core Pillars Cards (5 cols) -->
            <div class="lg:col-span-5 grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
              <div class="p-5 rounded-2xl bg-white dark:bg-navy-850 border border-slate-200 dark:border-slate-800 space-y-2">
                <div class="w-10 h-10 rounded-xl bg-primary-500/10 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                  <app-icon name="layers" iconClass="w-5 h-5"></app-icon>
                </div>
                <h3 class="font-bold text-slate-900 dark:text-white text-base">Reactive Architecture</h3>
                <p class="text-xs text-slate-600 dark:text-slate-400">
                  Orchestrating complex asynchronous data flows and predictable state stores using RxJS operators and NgRx.
                </p>
              </div>

              <div class="p-5 rounded-2xl bg-white dark:bg-navy-850 border border-slate-200 dark:border-slate-800 space-y-2">
                <div class="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center">
                  <app-icon name="shield" iconClass="w-5 h-5"></app-icon>
                </div>
                <h3 class="font-bold text-slate-900 dark:text-white text-base">Cybersecurity &amp; APIs</h3>
                <p class="text-xs text-slate-600 dark:text-slate-400">
                  Real-time vulnerability assessment interfaces, HttpClient microservices communication, and enterprise security.
                </p>
              </div>

              <div class="p-5 rounded-2xl bg-white dark:bg-navy-850 border border-slate-200 dark:border-slate-800 space-y-2">
                <div class="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                  <app-icon name="zap" iconClass="w-5 h-5"></app-icon>
                </div>
                <h3 class="font-bold text-slate-900 dark:text-white text-base">Speed &amp; Optimization</h3>
                <p class="text-xs text-slate-600 dark:text-slate-400">
                  ChangeDetectionStrategy.OnPush, route lazy loading, dynamic imports, and 25% bundle size reduction.
                </p>
              </div>
            </div>
          </div>

          <!-- Key Achievements Section from Resume -->
          <div class="mt-12 pt-10 border-t border-slate-200/80 dark:border-slate-800/80">
            <div class="text-center mb-8 space-y-2">
              <span class="text-xs font-mono font-bold tracking-widest text-primary-600 dark:text-primary-400 uppercase">
                // Proven Business Impact
              </span>
              <h3 class="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                Key Professional Achievements
              </h3>
              <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                Measurable performance, velocity, and satisfaction improvements delivered in production at ConnectSecure.
              </p>
            </div>

            <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div *ngFor="let ach of keyAchievements" 
                   class="card p-5 relative overflow-hidden group hover:border-primary-500/50 transition-all flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between mb-3">
                    <div class="w-10 h-10 rounded-xl bg-primary-500/10 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                      <app-icon [name]="ach.icon" iconClass="w-5 h-5"></app-icon>
                    </div>
                    <span class="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/60">
                      {{ ach.highlight }}
                    </span>
                  </div>
                  <h4 class="font-bold text-slate-900 dark:text-white text-sm mb-2">
                    {{ ach.title }}
                  </h4>
                  <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {{ ach.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- PROFESSIONAL EXPERIENCE & EDUCATION SECTION -->
      <section id="experience" class="section-padding">
        <div class="container-custom">
          <!-- Section Heading -->
          <div class="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span class="text-xs font-mono font-bold tracking-widest text-primary-600 dark:text-primary-400 uppercase">
              // Career History &amp; Education
            </span>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Professional Experience
            </h2>
            <div class="w-16 h-1 bg-gradient-to-r from-primary-600 to-violet-600 mx-auto rounded-full"></div>
            <p class="text-slate-600 dark:text-slate-300 text-base">
              Verified software engineering roles and formal educational qualifications.
            </p>
          </div>

          <div class="grid lg:grid-cols-12 gap-8">
            <!-- Left: Experience Timeline (8 cols) -->
            <div class="lg:col-span-8 space-y-6">
              <div *ngFor="let exp of experiences" 
                   class="card p-6 sm:p-8 relative overflow-hidden group">
                <!-- Side Accent Strip -->
                <div class="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-primary-600 to-violet-600"></div>

                <div class="flex flex-wrap items-start justify-between gap-3 mb-4">
                  <div>
                    <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 border border-primary-200 dark:border-primary-800/60 mb-2">
                      <app-icon name="briefcase" iconClass="w-3 h-3"></app-icon>
                      <span>{{ exp.type }}</span>
                    </div>
                    <h3 class="text-2xl font-bold text-slate-900 dark:text-white">
                      {{ exp.role }}
                    </h3>
                    <p class="text-base font-semibold text-primary-600 dark:text-primary-400">
                      {{ exp.company }} &bull; <span class="text-slate-500 dark:text-slate-400 font-normal">{{ exp.location }}</span>
                    </p>
                  </div>
                  <div class="font-mono text-xs sm:text-sm font-semibold px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-navy-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700/60">
                    {{ exp.period }}
                  </div>
                </div>

                <p class="text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-5">
                  {{ exp.summary }}
                </p>

                <!-- Responsibilities Bullet Points -->
                <div class="space-y-2.5 mb-6">
                  <h4 class="text-xs font-mono font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400">
                    Key Technical Contributions:
                  </h4>
                  <ul class="space-y-2 text-sm text-slate-600 dark:text-slate-300">
                    <li *ngFor="let resp of exp.responsibilities" class="flex items-start gap-2.5">
                      <app-icon name="check" iconClass="w-4 h-4 text-primary-500 shrink-0 mt-0.5"></app-icon>
                      <span>{{ resp }}</span>
                    </li>
                  </ul>
                </div>

                <!-- Technologies Used in Role -->
                <div class="pt-4 border-t border-slate-200 dark:border-slate-800/80">
                  <h4 class="text-xs font-mono font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400 mb-2.5">
                    Stack &amp; Tools:
                  </h4>
                  <div class="flex flex-wrap gap-1.5">
                    <span *ngFor="let tech of exp.technologies" class="badge">
                      {{ tech }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Right: Education Cards (4 cols) -->
            <div class="lg:col-span-4 space-y-6">
              <div class="card p-6 sm:p-7 space-y-6">
                <div class="flex items-center gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
                  <div class="w-10 h-10 rounded-xl bg-primary-500/10 text-primary-600 dark:text-primary-400 flex items-center justify-center">
                    <app-icon name="graduation-cap" iconClass="w-5 h-5"></app-icon>
                  </div>
                  <div>
                    <h3 class="font-bold text-slate-900 dark:text-white text-lg">Education</h3>
                    <p class="text-xs text-slate-500 dark:text-slate-400 font-mono">Academic Background</p>
                  </div>
                </div>

                <div class="space-y-6">
                  <div *ngFor="let edu of education" class="space-y-1.5">
                    <div class="font-mono text-xs text-primary-600 dark:text-primary-400 font-semibold">
                      {{ edu.period }}
                    </div>
                    <h4 class="font-bold text-slate-900 dark:text-white text-sm sm:text-base leading-snug">
                      {{ edu.degree }}
                    </h4>
                    <p class="text-xs text-slate-600 dark:text-slate-300">
                      {{ edu.institution }} &bull; {{ edu.location }}
                    </p>
                    <p *ngIf="edu.grade" class="text-xs text-emerald-600 dark:text-emerald-400 font-mono">
                      {{ edu.grade }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- Quick Verification Box -->
              <div class="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100/70 dark:bg-navy-900/70 space-y-3">
                <div class="flex items-center gap-2 text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                  <app-icon name="shield" iconClass="w-4 h-4 text-emerald-500"></app-icon>
                  <span>VERIFIED CREDENTIALS</span>
                </div>
                <p class="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  All employment dates, duties, and educational records are directly backed by verifiable enterprise references and official transcripts.
                </p>
                <a [href]="profile.resumeUrl" 
                   download="Elanselvan_Resume.pdf" 
                   class="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 dark:text-primary-400 hover:underline">
                  <span>Download Verified Resume PDF</span>
                  <app-icon name="download" iconClass="w-3.5 h-3.5"></app-icon>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- TECHNICAL SKILLS SECTION -->
      <section id="skills" class="section-padding bg-slate-100/60 dark:bg-navy-900/60 border-y border-slate-200/80 dark:border-slate-800/80">
        <div class="container-custom">
          <!-- Section Heading -->
          <div class="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span class="text-xs font-mono font-bold tracking-widest text-primary-600 dark:text-primary-400 uppercase">
              // Competencies &amp; Technologies
            </span>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Technical Skills
            </h2>
            <div class="w-16 h-1 bg-gradient-to-r from-primary-600 to-violet-600 mx-auto rounded-full"></div>
            <p class="text-slate-600 dark:text-slate-300 text-base">
              Categorized technologies and tools genuinely used in production and enterprise projects.
            </p>
          </div>

          <!-- Category Filter Tabs -->
          <div class="flex flex-wrap items-center justify-center gap-2 mb-10" role="tablist" aria-label="Skill categories">
            <button (click)="selectedCategory = 'all'" 
                    [class.btn-primary]="selectedCategory === 'all'"
                    [class.btn-secondary]="selectedCategory !== 'all'"
                    class="!py-1.5 !px-3.5 text-xs sm:text-sm"
                    role="tab"
                    [attr.aria-selected]="selectedCategory === 'all'">
              All Categories
            </button>
            <button *ngFor="let cat of skillCategories" 
                    (click)="selectedCategory = cat.id"
                    [class.btn-primary]="selectedCategory === cat.id"
                    [class.btn-secondary]="selectedCategory !== cat.id"
                    class="!py-1.5 !px-3.5 text-xs sm:text-sm"
                    role="tab"
                    [attr.aria-selected]="selectedCategory === cat.id">
              {{ cat.name }}
            </button>
          </div>

          <!-- Skills Cards Grid -->
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <ng-container *ngFor="let cat of filteredSkillCategories">
              <div class="card p-6 space-y-4">
                <div class="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                  <h3 class="font-bold text-slate-900 dark:text-white text-lg">
                    {{ cat.name }}
                  </h3>
                  <span class="text-xs font-mono text-slate-400">{{ cat.skills.length }} skills</span>
                </div>
                <p class="text-xs text-slate-500 dark:text-slate-400">
                  {{ cat.description }}
                </p>

                <!-- Skill Badges with Proficiency Tag -->
                <div class="space-y-2.5 pt-1">
                  <div *ngFor="let skill of cat.skills" 
                       class="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-navy-900/80 border border-slate-200/80 dark:border-slate-800 hover:border-primary-500/40 transition-colors">
                    <div class="flex items-center gap-2">
                      <span *ngIf="skill.highlight" class="w-1.5 h-1.5 rounded-full bg-primary-500"></span>
                      <span class="text-sm font-semibold text-slate-800 dark:text-slate-200">{{ skill.name }}</span>
                    </div>
                    <span class="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-200/60 dark:bg-navy-800 text-slate-600 dark:text-slate-400">
                      {{ skill.levelLabel }}
                    </span>
                  </div>
                </div>
              </div>
            </ng-container>
          </div>
        </div>
      </section>

      <!-- FEATURED PROJECTS SECTION -->
      <section id="projects" class="section-padding">
        <div class="container-custom">
          <!-- Section Heading -->
          <div class="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span class="text-xs font-mono font-bold tracking-widest text-primary-600 dark:text-primary-400 uppercase">
              // Production Engineering &amp; Case Studies
            </span>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Featured Projects
            </h2>
            <div class="w-16 h-1 bg-gradient-to-r from-primary-600 to-violet-600 mx-auto rounded-full"></div>
            <p class="text-slate-600 dark:text-slate-300 text-base">
              A curated selection of real-world frontend applications, architecture systems, and security tooling.
            </p>
          </div>

          <!-- Project Cards Grid -->
          <div class="grid md:grid-cols-2 gap-8">
            <div *ngFor="let project of projects" 
                 class="card overflow-hidden flex flex-col justify-between group">
              <!-- Card Header / Visual Banner -->
              <div class="p-6 sm:p-7 space-y-4">
                <div class="flex items-center justify-between gap-2">
                  <span class="badge-primary">
                    {{ project.badge }}
                  </span>
                  <div class="flex items-center gap-2 text-slate-400">
                    <a *ngIf="project.githubUrl" 
                       [href]="project.githubUrl" 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       class="hover:text-primary-500 transition-colors"
                       [attr.aria-label]="project.title + ' GitHub source code'">
                      <app-icon name="github" iconClass="w-5 h-5"></app-icon>
                    </a>
                    <a *ngIf="project.liveUrl" 
                       [href]="project.liveUrl" 
                       target="_blank" 
                       rel="noopener noreferrer" 
                       class="hover:text-primary-500 transition-colors"
                       [attr.aria-label]="project.title + ' Live Demo'">
                      <app-icon name="external-link" iconClass="w-5 h-5"></app-icon>
                    </a>
                  </div>
                </div>

                <div>
                  <h3 class="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white group-hover:text-primary-500 transition-colors">
                    {{ project.title }}
                  </h3>
                  <p class="text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
                    {{ project.shortDesc }}
                  </p>
                </div>

                <!-- Key Contributions -->
                <div class="space-y-1.5 pt-2">
                  <h4 class="text-xs font-mono font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400">
                    Highlights:
                  </h4>
                  <ul class="space-y-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                    <li *ngFor="let item of project.keyContributions" class="flex items-start gap-2">
                      <app-icon name="check" iconClass="w-3.5 h-3.5 text-primary-500 shrink-0 mt-0.5"></app-icon>
                      <span>{{ item }}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Card Footer with Tech Stack & Details Trigger -->
              <div class="px-6 sm:px-7 py-4 bg-slate-50 dark:bg-navy-900/80 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div class="flex flex-wrap gap-1.5">
                  <span *ngFor="let tech of project.technologies.slice(0, 4)" class="badge text-[11px]">
                    {{ tech }}
                  </span>
                  <span *ngIf="project.technologies.length > 4" class="text-xs text-slate-400 font-mono self-center">
                    +{{ project.technologies.length - 4 }} more
                  </span>
                </div>

                <div class="flex items-center gap-3">
                  <a *ngIf="project.liveUrl" 
                     [href]="project.liveUrl" 
                     target="_blank" 
                     rel="noopener noreferrer" 
                     class="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 inline-flex items-center gap-1 font-mono">
                    <span>Live App</span>
                    <app-icon name="external-link" iconClass="w-3.5 h-3.5"></app-icon>
                  </a>
                  <button (click)="openProjectModal(project)" 
                          type="button"
                          class="text-xs font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 inline-flex items-center gap-1 cursor-pointer">
                    <span>Details</span>
                    <app-icon name="arrow-right" iconClass="w-3.5 h-3.5"></app-icon>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CONTACT SECTION -->
      <section id="contact" class="section-padding bg-slate-100/60 dark:bg-navy-900/60 border-t border-slate-200/80 dark:border-slate-800/80">
        <div class="container-custom">
          <!-- Section Heading -->
          <div class="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span class="text-xs font-mono font-bold tracking-widest text-primary-600 dark:text-primary-400 uppercase">
              // Let's Connect
            </span>
            <h2 class="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
              Get In Touch
            </h2>
            <div class="w-16 h-1 bg-gradient-to-r from-primary-600 to-violet-600 mx-auto rounded-full"></div>
            <p class="text-slate-600 dark:text-slate-300 text-base">
              Available for full-time frontend developer roles, technical discussions, and innovative projects.
            </p>
          </div>

          <div class="grid lg:grid-cols-12 gap-10 items-start">
            <!-- Left Contact Info (5 cols) -->
            <div class="lg:col-span-5 space-y-6">
              <div class="card p-6 sm:p-8 space-y-6">
                <h3 class="text-xl font-bold text-slate-900 dark:text-white">
                  Direct Contact Information
                </h3>
                <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Feel free to reach out directly via email, phone, or LinkedIn. I typically respond within 24 hours.
                </p>

                <!-- Contact Detail Items -->
                <div class="space-y-4">
                  <!-- Email -->
                  <a [href]="'mailto:' + profile.email" 
                     class="flex items-start gap-4 p-3.5 rounded-xl bg-slate-50 dark:bg-navy-900 hover:border-primary-500 border border-slate-200 dark:border-slate-800 transition-colors group">
                    <div class="w-10 h-10 rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-400 flex items-center justify-center shrink-0">
                      <app-icon name="email" iconClass="w-5 h-5"></app-icon>
                    </div>
                    <div>
                      <div class="text-xs font-mono text-slate-500 dark:text-slate-400">EMAIL</div>
                      <div class="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-primary-500 transition-colors break-all">
                        {{ profile.email }}
                      </div>
                    </div>
                  </a>

                  <!-- Phone -->
                  <a [href]="'tel:' + profile.phone" 
                     class="flex items-start gap-4 p-3.5 rounded-xl bg-slate-50 dark:bg-navy-900 hover:border-primary-500 border border-slate-200 dark:border-slate-800 transition-colors group">
                    <div class="w-10 h-10 rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-400 flex items-center justify-center shrink-0">
                      <app-icon name="phone" iconClass="w-5 h-5"></app-icon>
                    </div>
                    <div>
                      <div class="text-xs font-mono text-slate-500 dark:text-slate-400">PHONE</div>
                      <div class="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-primary-500 transition-colors">
                        {{ profile.phone }}
                      </div>
                    </div>
                  </a>

                  <!-- Location -->
                  <div class="flex items-start gap-4 p-3.5 rounded-xl bg-slate-50 dark:bg-navy-900 border border-slate-200 dark:border-slate-800">
                    <div class="w-10 h-10 rounded-lg bg-primary-500/10 text-primary-600 dark:text-primary-400 flex items-center justify-center shrink-0">
                      <app-icon name="map-pin" iconClass="w-5 h-5"></app-icon>
                    </div>
                    <div>
                      <div class="text-xs font-mono text-slate-500 dark:text-slate-400">LOCATION</div>
                      <div class="text-sm font-semibold text-slate-900 dark:text-white">
                        {{ profile.location }}
                      </div>
                    </div>
                  </div>
                </div>

                <!-- One-click Direct Email Fallback Button -->
                <div class="pt-2">
                  <a [href]="getMailtoLink()" 
                     class="w-full btn-secondary text-center justify-center">
                    <app-icon name="email" iconClass="w-4 h-4"></app-icon>
                    <span>Open in Email Client</span>
                  </a>
                </div>
              </div>
            </div>

            <!-- Right Contact Form (7 cols) -->
            <div class="lg:col-span-7">
              <div class="card p-6 sm:p-8">
                <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Send a Message
                </h3>
                <p class="text-sm text-slate-600 dark:text-slate-400 mb-6">
                  Fill in your details below and I will get back to you promptly.
                </p>

                <!-- Submission Success Message -->
                <div *ngIf="submitStatus === 'success'" 
                     class="mb-6 p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 text-sm flex items-start gap-3 animate-fade-in"
                     role="alert">
                  <app-icon name="check" iconClass="w-5 h-5 text-emerald-500 shrink-0 mt-0.5"></app-icon>
                  <div>
                    <h4 class="font-bold">Message sent successfully!</h4>
                    <p class="mt-0.5 text-xs text-emerald-700 dark:text-emerald-400">
                      Thank you for reaching out. I have received your message and will review it shortly.
                    </p>
                  </div>
                </div>

                <!-- Submission Error / Fallback Notice -->
                <div *ngIf="submitStatus === 'error'" 
                     class="mb-6 p-4 rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-800 dark:text-amber-300 text-sm flex items-start gap-3 animate-fade-in"
                     role="alert">
                  <app-icon name="email" iconClass="w-5 h-5 text-amber-500 shrink-0 mt-0.5"></app-icon>
                  <div class="space-y-1">
                    <h4 class="font-bold">Network or form endpoint issue</h4>
                    <p class="text-xs text-amber-700 dark:text-amber-400">
                      Please click below to launch your default email client with your message pre-filled.
                    </p>
                    <a [href]="getMailtoLink()" class="inline-block font-semibold underline text-xs mt-1">
                      Send via Email Client &rarr;
                    </a>
                  </div>
                </div>

                <!-- Contact Form with Netlify Attributes -->
                <form (ngSubmit)="handleContactSubmit()" #cForm="ngForm" class="space-y-4" novalidate>
                  <div class="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label for="form-name" class="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        Your Name <span class="text-red-500">*</span>
                      </label>
                      <input type="text" 
                             id="form-name" 
                             name="name" 
                             [(ngModel)]="formData.name" 
                             required 
                             placeholder="Jane Doe"
                             class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-navy-900 text-slate-900 dark:text-white text-sm focus:border-primary-500 transition-colors" />
                    </div>

                    <div>
                      <label for="form-email" class="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        Your Email <span class="text-red-500">*</span>
                      </label>
                      <input type="email" 
                             id="form-email" 
                             name="email" 
                             [(ngModel)]="formData.email" 
                             required 
                             email
                             placeholder="jane@example.com"
                             class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-navy-900 text-slate-900 dark:text-white text-sm focus:border-primary-500 transition-colors" />
                    </div>
                  </div>

                  <div>
                    <label for="form-subject" class="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Subject <span class="text-red-500">*</span>
                    </label>
                    <input type="text" 
                           id="form-subject" 
                           name="subject" 
                           [(ngModel)]="formData.subject" 
                           required 
                           placeholder="Frontend Engineering Opportunity"
                           class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-navy-900 text-slate-900 dark:text-white text-sm focus:border-primary-500 transition-colors" />
                  </div>

                  <div>
                    <label for="form-message" class="block text-xs font-mono font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                      Message <span class="text-red-500">*</span>
                    </label>
                    <textarea id="form-message" 
                              name="message" 
                              [(ngModel)]="formData.message" 
                              required 
                              rows="4" 
                              placeholder="Hello Elanselvan, I'd like to discuss an opportunity..."
                              class="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-navy-900 text-slate-900 dark:text-white text-sm focus:border-primary-500 transition-colors resize-y"></textarea>
                  </div>

                  <button type="submit" 
                          [disabled]="!cForm.form.valid || isSubmitting"
                          class="w-full btn-primary !py-3">
                    <span *ngIf="!isSubmitting">Send Message</span>
                    <span *ngIf="isSubmitting" class="inline-flex items-center gap-2">
                      <span class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      <span>Sending securely...</span>
                    </span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- FOOTER -->
    <footer class="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-navy-950 py-12">
      <div class="container-custom px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <!-- Identity -->
          <div>
            <div class="font-bold text-slate-900 dark:text-white text-lg">
              {{ profile.name }}
            </div>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Software Developer &bull; Angular &amp; Frontend Specialist
            </p>
          </div>

          <!-- Quick Navigation -->
          <div class="flex flex-wrap justify-center gap-6 text-xs font-medium text-slate-600 dark:text-slate-400">
            <a href="#home" (click)="scrollTo($event, 'home')" class="hover:text-primary-500 transition-colors">Home</a>
            <a href="#about" (click)="scrollTo($event, 'about')" class="hover:text-primary-500 transition-colors">About</a>
            <a href="#experience" (click)="scrollTo($event, 'experience')" class="hover:text-primary-500 transition-colors">Experience</a>
            <a href="#skills" (click)="scrollTo($event, 'skills')" class="hover:text-primary-500 transition-colors">Skills</a>
            <a href="#projects" (click)="scrollTo($event, 'projects')" class="hover:text-primary-500 transition-colors">Projects</a>
            <a href="#contact" (click)="scrollTo($event, 'contact')" class="hover:text-primary-500 transition-colors">Contact</a>
          </div>

          <!-- Copyright & Socials -->
          <div class="flex items-center gap-3">
            <a [href]="profile.githubUrl" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile" class="text-slate-500 hover:text-primary-500 transition-colors">
              <app-icon name="github" iconClass="w-4 h-4"></app-icon>
            </a>
            <a [href]="profile.linkedinUrl" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile" class="text-slate-500 hover:text-primary-500 transition-colors">
              <app-icon name="linkedin" iconClass="w-4 h-4"></app-icon>
            </a>
            <a [href]="'mailto:' + profile.email" aria-label="Email" class="text-slate-500 hover:text-primary-500 transition-colors">
              <app-icon name="email" iconClass="w-4 h-4"></app-icon>
            </a>
          </div>
        </div>

        <div class="mt-8 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 text-center text-xs text-slate-500 dark:text-slate-400">
          <p>© {{ currentYear }} {{ profile.name }}. All rights reserved. Built with Angular 21 &amp; Tailwind CSS.</p>
        </div>
      </div>
    </footer>

    <!-- PROJECT DETAILS MODAL -->
    <div *ngIf="activeModalProject" 
         class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
         (click)="closeProjectModal()"
         role="dialog"
         aria-modal="true"
         [attr.aria-label]="activeModalProject.title">
      <div class="card max-w-2xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-6 relative"
           (click)="$event.stopPropagation()">
        <!-- Close Button -->
        <button (click)="closeProjectModal()" 
                type="button"
                aria-label="Close project modal"
                class="absolute top-5 right-5 p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-navy-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
          <app-icon name="close" iconClass="w-4 h-4"></app-icon>
        </button>

        <!-- Header -->
        <div class="space-y-2 pr-8">
          <span class="badge-primary">{{ activeModalProject.badge }}</span>
          <h3 class="text-2xl font-bold text-slate-900 dark:text-white">
            {{ activeModalProject.title }}
          </h3>
        </div>

        <!-- Detailed Description -->
        <div class="space-y-4 text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
          <p>{{ activeModalProject.detailedDesc }}</p>

          <div class="space-y-2 pt-2">
            <h4 class="font-mono text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Key Engineering Achievements:
            </h4>
            <ul class="space-y-2 text-sm">
              <li *ngFor="let item of activeModalProject.keyContributions" class="flex items-start gap-2.5">
                <app-icon name="check" iconClass="w-4 h-4 text-primary-500 shrink-0 mt-0.5"></app-icon>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Tech Stack -->
        <div class="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <h4 class="font-mono text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Technology Stack:
          </h4>
          <div class="flex flex-wrap gap-1.5">
            <span *ngFor="let tech of activeModalProject.technologies" class="badge">
              {{ tech }}
            </span>
          </div>
        </div>

        <!-- Action Links -->
        <div class="flex items-center justify-end gap-3 pt-2">
          <a *ngIf="activeModalProject.githubUrl" 
             [href]="activeModalProject.githubUrl" 
             target="_blank" 
             rel="noopener noreferrer" 
             class="btn-secondary !py-2 !px-4 text-xs sm:text-sm">
            <app-icon name="github" iconClass="w-4 h-4"></app-icon>
            <span>View Source</span>
          </a>
          <a *ngIf="activeModalProject.liveUrl" 
             [href]="activeModalProject.liveUrl" 
             target="_blank" 
             rel="noopener noreferrer" 
             class="btn-primary !py-2 !px-4 text-xs sm:text-sm">
            <app-icon name="external-link" iconClass="w-4 h-4"></app-icon>
            <span>Open Demo</span>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .bg-white_90 {
      background-color: rgba(255, 255, 255, 0.9);
    }
    .dark_bg_navy {
      background-color: rgba(6, 10, 18, 0.9);
    }
    .border-slate-200_80 {
      border-color: rgba(226, 232, 240, 0.8);
    }
    .border-slate-800_80 {
      border-color: rgba(30, 41, 59, 0.8);
    }
  `]
})
export class AppComponent implements OnInit, OnDestroy {
  profile = DEVELOPER_PROFILE;
  experiences = EXPERIENCES;
  education = EDUCATION_HISTORY;
  skillCategories = SKILL_CATEGORIES;
  projects = FEATURED_PROJECTS;
  keyAchievements = KEY_ACHIEVEMENTS;

  navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  isDarkMode = true;
  isScrolled = false;
  isMobileMenuOpen = false;
  activeSection = 'home';
  scrollProgress = 0;
  selectedCategory = 'all';

  activeModalProject: ProjectItem | null = null;

  // Form State
  formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };
  isSubmitting = false;
  submitStatus: 'idle' | 'success' | 'error' = 'idle';

  currentYear = new Date().getFullYear();

  get filteredSkillCategories(): SkillCategory[] {
    if (this.selectedCategory === 'all') {
      return this.skillCategories;
    }
    return this.skillCategories.filter(cat => cat.id === this.selectedCategory);
  }

  ngOnInit() {
    this.initTheme();
    this.onWindowScroll();
  }

  ngOnDestroy() {
    // Clean up if needed
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    const scrollY = window.scrollY;
    this.isScrolled = scrollY > 20;

    // Calculate Scroll Progress
    const winHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    this.scrollProgress = winHeight > 0 ? scrollY / winHeight : 0;

    // Determine Active Section based on scroll
    const sections = this.navLinks.map(l => document.getElementById(l.id));
    const scrollPosition = scrollY + 140;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];
      if (section && section.offsetTop <= scrollPosition) {
        this.activeSection = this.navLinks[i].id;
        break;
      }
    }
  }

  @HostListener('window:keydown.escape')
  onEscapeKey() {
    this.closeProjectModal();
    this.closeMobileMenu();
  }

  initTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkMode = savedTheme === 'dark';
    } else {
      this.isDarkMode = true;
    }
    this.applyTheme();
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme() {
    if (this.isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  scrollTo(event: Event, sectionId: string) {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 76;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      this.activeSection = sectionId;
    }
  }

  openProjectModal(project: ProjectItem) {
    this.activeModalProject = project;
  }

  closeProjectModal() {
    this.activeModalProject = null;
  }

  getMailtoLink(): string {
    const subject = encodeURIComponent(this.formData.subject || 'Frontend Engineering Opportunity');
    const body = encodeURIComponent(
      `Hi Elanselvan,\n\nName: ${this.formData.name || ''}\nEmail: ${this.formData.email || ''}\n\n${this.formData.message || ''}`
    );
    return `mailto:${this.profile.email}?subject=${subject}&body=${body}`;
  }

  async handleContactSubmit() {
    if (this.isSubmitting) return;

    if (!this.formData.name || !this.formData.email || !this.formData.message) {
      return;
    }

    this.isSubmitting = true;
    this.submitStatus = 'idle';

    const targetEmail = this.profile.email || 'elanselvan1997@gmail.com';
    const emailSubject = this.formData.subject?.trim()
      ? `Portfolio Inquiry: ${this.formData.subject.trim()}`
      : `Portfolio Message from ${this.formData.name.trim()}`;

    try {
      // Primary Delivery: Direct inbox delivery via FormSubmit.co API
      const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: this.formData.name.trim(),
          email: this.formData.email.trim(),
          _replyto: this.formData.email.trim(),
          _subject: emailSubject,
          _template: 'table',
          _captcha: 'false',
          message: this.formData.message.trim()
        })
      });

      const result = await response.json().catch(() => null);

      if (response.ok && (result?.success === true || result?.success === 'true')) {
        this.submitStatus = 'success';
        const sentName = this.formData.name;
        const sentEmail = this.formData.email;
        const sentSubject = this.formData.subject;
        const sentMessage = this.formData.message;
        this.formData = { name: '', email: '', subject: '', message: '' };

        // Secondary / Backup: Silently trigger Netlify Form logging if deployed on Netlify
        if (typeof window !== 'undefined' && window.location.hostname.includes('netlify.app')) {
          try {
            const netlifyBody = new URLSearchParams({
              'form-name': 'contact',
              name: sentName,
              email: sentEmail,
              subject: sentSubject,
              message: sentMessage
            }).toString();
            fetch('/', {
              method: 'POST',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              body: netlifyBody
            }).catch(() => {});
          } catch {
            // Netlify background log failure ignored
          }
        }
      } else {
        // Fallback for Netlify-only environments if FormSubmit was blocked
        if (typeof window !== 'undefined' && window.location.hostname.includes('netlify.app')) {
          const netlifyBody = new URLSearchParams({
            'form-name': 'contact',
            name: this.formData.name,
            email: this.formData.email,
            subject: this.formData.subject,
            message: this.formData.message
          }).toString();

          const netlifyRes = await fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: netlifyBody
          });

          if (netlifyRes.ok) {
            this.submitStatus = 'success';
            this.formData = { name: '', email: '', subject: '', message: '' };
            return;
          }
        }
        this.submitStatus = 'error';
      }
    } catch (err) {
      // In case of complete network block/offline, show error with mailto fallback
      this.submitStatus = 'error';
    } finally {
      this.isSubmitting = false;
    }
  }
}
