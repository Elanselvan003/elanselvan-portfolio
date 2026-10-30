import { Component, OnInit, HostListener, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { IconComponent } from './icon.component';
import { DEVELOPER_PROFILE } from './portfolio.data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, IconComponent],
  template: `
    <!-- Top Scroll Progress Line -->
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
        <a href="#home" (click)="navigateSection($event, 'home')" class="group flex items-center gap-3 cursor-pointer shrink-0" aria-label="Elanselvan S - Angular Developer Homepage">
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
              Angular Front-End Developer
            </span>
          </div>
        </a>

        <!-- Desktop Navigation Links -->
        <div class="hidden lg:flex items-center gap-1 xl:gap-2">
          <a *ngFor="let item of navLinks" 
             [href]="'#' + item.id"
             (click)="navigateSection($event, item.id)"
             [class.text-primary-600]="activeSection === item.id && !isDarkMode"
             [class.text-primary-400]="activeSection === item.id && isDarkMode"
             [class.font-semibold]="activeSection === item.id"
             class="px-3.5 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100/70 dark:hover:bg-navy-800/60 transition-all whitespace-nowrap">
            {{ item.label }}
          </a>
        </div>

        <!-- Right Action Items (Resume + Dark Mode + Mobile Toggle) -->
        <div class="flex items-center gap-1.5 sm:gap-3 shrink-0">
          <!-- Resume Button -->
          <a [href]="profile.resumeUrl" 
             download="Elanselvan_Resume.pdf"
             class="btn-secondary !py-1.5 !px-3 sm:!py-2 sm:!px-4 text-xs sm:text-sm font-semibold group whitespace-nowrap"
             title="Download Elanselvan S Resume PDF"
             aria-label="Download Elanselvan S Resume (PDF)">
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
             (click)="navigateSection($event, item.id); closeMobileMenu()"
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

    <!-- Router Viewport for Prerendered Routes -->
    <router-outlet></router-outlet>

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
              Angular Front-End Developer &bull; Bengaluru, Karnataka, India
            </p>
          </div>

          <!-- Quick Navigation -->
          <div class="flex flex-wrap justify-center gap-6 text-xs font-medium text-slate-600 dark:text-slate-400">
            <a href="#home" (click)="navigateSection($event, 'home')" class="hover:text-primary-500 transition-colors">Home</a>
            <a href="#about" (click)="navigateSection($event, 'about')" class="hover:text-primary-500 transition-colors">About</a>
            <a href="#experience" (click)="navigateSection($event, 'experience')" class="hover:text-primary-500 transition-colors">Experience</a>
            <a href="#skills" (click)="navigateSection($event, 'skills')" class="hover:text-primary-500 transition-colors">Skills</a>
            <a href="#projects" (click)="navigateSection($event, 'projects')" class="hover:text-primary-500 transition-colors">Projects</a>
            <a href="#contact" (click)="navigateSection($event, 'contact')" class="hover:text-primary-500 transition-colors">Contact</a>
          </div>

          <!-- Copyright & Socials -->
          <div class="flex items-center gap-3">
            <a [href]="profile.githubUrl" target="_blank" rel="noopener noreferrer" aria-label="Elanselvan S GitHub Profile" class="text-slate-500 hover:text-primary-500 transition-colors">
              <app-icon name="github" iconClass="w-4 h-4"></app-icon>
            </a>
            <a [href]="profile.linkedinUrl" target="_blank" rel="noopener noreferrer" aria-label="Elanselvan S LinkedIn Profile" class="text-slate-500 hover:text-primary-500 transition-colors">
              <app-icon name="linkedin" iconClass="w-4 h-4"></app-icon>
            </a>
            <a [href]="'mailto:' + profile.email" aria-label="Email Elanselvan S" class="text-slate-500 hover:text-primary-500 transition-colors">
              <app-icon name="email" iconClass="w-4 h-4"></app-icon>
            </a>
          </div>
        </div>

        <div class="mt-8 pt-8 border-t border-slate-200/80 dark:border-slate-800/80 text-center text-xs text-slate-500 dark:text-slate-400">
          <p>© {{ currentYear }} {{ profile.name }}. All rights reserved. Angular Front-End Developer in Bengaluru.</p>
        </div>
      </div>
    </footer>
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
export class AppComponent implements OnInit {
  profile = DEVELOPER_PROFILE;

  navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  isDarkMode = false;
  isScrolled = false;
  isMobileMenuOpen = false;
  activeSection = 'home';
  scrollProgress = 0;
  currentYear = new Date().getFullYear();

  private platformId = inject(PLATFORM_ID);
  private router = inject(Router);

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.initTheme();
      this.onWindowScroll();
    }
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    if (!isPlatformBrowser(this.platformId)) return;

    const scrollY = window.scrollY;
    this.isScrolled = scrollY > 20;

    const winHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    this.scrollProgress = winHeight > 0 ? scrollY / winHeight : 0;

    const sections = this.navLinks.map((l) => document.getElementById(l.id));
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
    this.closeMobileMenu();
  }

  initTheme() {
    if (!isPlatformBrowser(this.platformId)) return;
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.isDarkMode = savedTheme === 'dark';
    } else {
      this.isDarkMode = false;
    }
    this.applyTheme();
  }

  toggleTheme() {
    if (!isPlatformBrowser(this.platformId)) return;
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  private applyTheme() {
    if (!isPlatformBrowser(this.platformId)) return;
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

  navigateSection(event: Event, sectionId: string) {
    event.preventDefault();
    if (!isPlatformBrowser(this.platformId)) return;

    if (this.router.url !== '/' && !this.router.url.startsWith('/#')) {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => this.scrollToId(sectionId), 100);
      });
    } else {
      this.scrollToId(sectionId);
    }
  }

  private scrollToId(sectionId: string) {
    if (!isPlatformBrowser(this.platformId)) return;
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
}
